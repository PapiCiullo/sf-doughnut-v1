// AI Chat interface for Doughnut Economics research
// Provides a conversational chat panel that knows about the loaded city data

const AgentChat = (() => {
    let isOpen = false;
    let messages = [];
    let isStreaming = false;

    const SYSTEM_PROMPT = `You are a Doughnut Economics research assistant. You help users explore and understand their city's social foundation and ecological ceiling data.

You have access to the California Doughnut targets as reference benchmarks:

SOCIAL FOUNDATION TARGETS:
- Food: <10% food insecurity rate
- Health: Universal coverage (0% uninsured)
- Education: 95%+ graduation rate
- Income & Work: <10% poverty rate; living wage
- Housing: <30% cost-burdened; functional zero homelessness
- Water: 100% compliance with drinking water standards
- Energy: 100% clean energy; <6% energy burden
- Social Equity: Gini coefficient <0.30; Racial Equity Index = 100
- Peace & Justice: Violent crime below 300/100K
- Political Voice: >75% voter participation
- Gender Equality: 1:1 pay ratio
- Networks: Universal broadband; <30% driving alone

ECOLOGICAL CEILING TARGETS:
- Climate Change: Net zero GHG; <2.5 MT CO2e/person by 2030
- Air Pollution: WHO guideline PM2.5 <5 ug/m3
- Biodiversity: No net species loss; 30% land protected
- Freshwater: Sustainable yield; per-capita use trending down

When the user asks about a dimension or data, use real sources and provide actionable guidance. If you don't know something, say so. Keep responses concise and practical.`;

    function getConfig() {
        return (typeof AgentUI !== 'undefined') ? AgentUI.getConfig() : {
            apiKey: localStorage.getItem('agent_api_key') || '',
            baseURL: localStorage.getItem('agent_base_url') || '',
            model: localStorage.getItem('agent_model') || '',
        };
    }

    function isConfigured() {
        return (typeof AgentUI !== 'undefined') ? AgentUI.isConfigured() : !!(getConfig().baseURL && getConfig().model);
    }

    function createChatUI() {
        if (document.getElementById('agentChatPanel')) return;

        const panel = document.createElement('div');
        panel.id = 'agentChatPanel';
        panel.innerHTML = `
            <div class="chat-header">
                <span class="chat-title">AI Research Assistant</span>
                <span class="chat-model" id="chatModelName"></span>
                <button class="chat-close" onclick="AgentChat.toggle()">&times;</button>
            </div>
            <div class="chat-messages" id="chatMessages">
                <div class="chat-msg chat-msg-ai">
                    <div class="chat-msg-content">Hi! I'm your Doughnut Economics research assistant. I can help you:
                    <ul>
                        <li>Research any dimension for your city</li>
                        <li>Find data sources and indicators</li>
                        <li>Compare against CA Doughnut targets</li>
                        <li>Suggest actions for community involvement</li>
                    </ul>
                    What would you like to explore?</div>
                </div>
            </div>
            <div class="chat-input-area">
                <div class="chat-config-bar" id="chatConfigBar"></div>
                <div class="chat-input-row">
                    <input type="text" id="chatInput" placeholder="Ask about any dimension, data source, or target..."
                           onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();AgentChat.send();}">
                    <button class="chat-send" onclick="AgentChat.send()" id="chatSendBtn">Send</button>
                </div>
            </div>
        `;
        document.body.appendChild(panel);
        updateConfigBar();
    }

    function updateConfigBar() {
        const bar = document.getElementById('chatConfigBar');
        if (!bar) return;
        const c = getConfig();
        if (!c.apiKey) {
            bar.innerHTML = `<span class="chat-config-warn" onclick="AgentUI.showSettings()">&#9888; No API key set — click to configure</span>`;
        } else {
            bar.innerHTML = `<span class="chat-config-ok">${c.model}</span>`;
            const modelEl = document.getElementById('chatModelName');
            if (modelEl) modelEl.textContent = c.model;
        }
    }

    function toggle() {
        createChatUI();
        isOpen = !isOpen;
        const panel = document.getElementById('agentChatPanel');
        panel.classList.toggle('chat-open', isOpen);
        const fab = document.getElementById('chatFab');
        if (fab) fab.classList.toggle('chat-fab-hidden', isOpen);
        if (isOpen) {
            updateConfigBar();
            document.getElementById('chatInput').focus();
        }
    }

    function addMessage(role, content) {
        messages.push({ role, content });
        const container = document.getElementById('chatMessages');
        const div = document.createElement('div');
        div.className = `chat-msg chat-msg-${role === 'user' ? 'user' : 'ai'}`;
        div.innerHTML = `<div class="chat-msg-content">${formatContent(content)}</div>`;
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
        return div;
    }

    function formatContent(text) {
        // Basic markdown-ish formatting
        return text
            .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n- /g, '\n• ')
            .replace(/\n/g, '<br>');
    }

    async function send() {
        const input = document.getElementById('chatInput');
        const text = input.value.trim();
        if (!text || isStreaming) return;

        if (!isConfigured()) {
            AgentUI.showSettings();
            return;
        }

        input.value = '';
        addMessage('user', text);

        // Build context from current city data
        let context = '';
        if (typeof currentData !== 'undefined' && currentData) {
            context = `\n\nCurrent city: ${currentData.name} (pop. ${currentData.population}). ${currentData.description}\n`;
            const dims = [...(currentData.social || []), ...(currentData.ecological || [])];
            context += 'Current data summary:\n';
            dims.forEach(d => {
                context += `- ${d.name}: ${d.value} (${d.year || '?'}) — ${d.source || 'no source'}\n`;
            });
        }

        const config = getConfig();
        isStreaming = true;
        const sendBtn = document.getElementById('chatSendBtn');
        sendBtn.disabled = true;
        sendBtn.textContent = '...';

        // Add thinking indicator
        const aiDiv = addMessage('assistant', '');
        const contentEl = aiDiv.querySelector('.chat-msg-content');
        contentEl.innerHTML = '<span class="chat-typing">Thinking...</span>';

        try {
            const apiMessages = [
                { role: "system", content: SYSTEM_PROMPT + context },
                ...messages.filter(m => m.role !== 'system').slice(-10) // Keep last 10 messages for context
            ];

            const body = {
                model: config.model,
                messages: apiMessages,
                temperature: 0.3,
                max_tokens: 1024,
            };

            const headers = { 'Content-Type': 'application/json' };
            if (config.apiKey && config.apiKey !== 'ollama') {
                headers['Authorization'] = `Bearer ${config.apiKey}`;
            }
            const resp = await fetch(`${config.baseURL}/chat/completions`, {
                method: 'POST',
                headers,
                body: JSON.stringify(body),
            });

            if (!resp.ok) {
                const err = await resp.text();
                throw new Error(`API ${resp.status}: ${err.substring(0, 150)}`);
            }

            const result = await resp.json();
            const reply = result.choices[0].message.content;

            // Update the message in our history
            messages[messages.length - 1].content = reply;
            contentEl.innerHTML = formatContent(reply);

        } catch (err) {
            contentEl.innerHTML = `<span style="color:#ef4444">Error: ${err.message}</span>`;
            messages.pop(); // Remove failed message from history
        }

        isStreaming = false;
        sendBtn.disabled = false;
        sendBtn.textContent = 'Send';
        document.getElementById('chatMessages').scrollTop = document.getElementById('chatMessages').scrollHeight;
    }

    // Inject a message about a specific dimension (called from detail panel)
    function askAbout(dimName, ring) {
        if (!isOpen) toggle();
        setTimeout(() => {
            const input = document.getElementById('chatInput');
            const cityName = (typeof currentData !== 'undefined' && currentData) ? currentData.name : 'this city';
            input.value = `Research the "${dimName}" ${ring} dimension for ${cityName}. Find the latest data from official sources, compare to CA Doughnut targets, and suggest actions.`;
            input.focus();
        }, 100);
    }

    return { toggle, send, askAbout, isConfigured, updateConfigBar };
})();
