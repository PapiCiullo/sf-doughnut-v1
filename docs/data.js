// Doughnut data for San Francisco County
// Level scale: -100 = no problem, -50 = under control, 0 = on track, 50 = not good, 100 = out of control, 150 = severe, NaN = unknown

const JURISDICTIONS = {
    "san_francisco_county": {
        name: "San Francisco County",
        population: "~810,000",
        description: "Consolidated city-county region. High-density urban landscape with localized environmental justice frameworks, facing sharp multi-capital socioeconomic splits.",
        ecological: [
            {
                name: "climate change",
                level: 150,
                indicator: "Consumption-based CO2e per capita",
                value: "4.4 metric tons CO2e/person",
                year: 2022,
                target: "2.5 metric tons CO2e/person (safe planetary boundary)",
                context: "San Francisco's consumption footprint significantly overshoots the targeted sustainability standard.",
                source: "SF Environment Department (SFE) GHG Inventory",
                sourceUrl: "https://www.sfenvironment.org/climateplan",
                screenshot: null,
                actions: [
                    "Enforce commercial building decarbonization pathways",
                    "Accelerate public electric vehicle regional infrastructure",
                    "Transition away from high-impact consumer purchasing options"
                ]
            },
            {
                name: "nitrogen & phosphorus loading",
                level: 100,
                indicator: "Aggregate Bayside nutrient discharges",
                value: "17.3 tons/day load allocation",
                year: 2024,
                target: "10.4 tons/day target threshold ceiling",
                context: "Current urban discharges represent a 66% to 68% total nutrient loading overshoot into the Bayside aggregate basin.",
                source: "Bay Area Clean Water Agencies (BACWA) / SFPUC Summary",
                sourceUrl: "https://bacwa.org",
                screenshot: null,
                actions: [
                    "Fund and install tertiary nutrient-removal retrofits at wastewater plants",
                    "Optimize local industrial runoff treatment loops before discharge"
                ]
            },
            {
                name: "freshwater withdrawals",
                level: -100,
                indicator: "Residential water consumption efficiency",
                value: "43 Gallons Per Capita per Day (GPCD)",
                year: 2025,
                target: "Maintain optimal conservation footprints",
                context: "San Francisco is optimized for residential use, though total macro system withdrawal boundaries require continuous management.",
                source: "SFPUC Annual Water Quality Report",
                sourceUrl: "https://www.sfpuc.org",
                screenshot: null,
                actions: [
                    "Implement home graywater recovery loop retrofits",
                    "Promote advanced industrial graywater reuse cycles"
                ]
            },
            {
                name: "land conversion",
                level: 100,
                indicator: "Citywide impermeable surface coverage",
                value: "60% impermeable surface matrix",
                year: 2024,
                target: "Maximum target ceiling of 40%",
                context: "High urban concrete concentration significantly restricts baseline soil, filtration, and biological functionality.",
                source: "SF Environment Department",
                sourceUrl: "https://www.sfenvironment.org",
                screenshot: null,
                actions: [
                    "Swap out concrete surfaces for permeable infrastructure alternatives",
                    "Expand street-level bioswales and neighborhood catchment paths"
                ]
            },
            {
                name: "biodiversity loss",
                level: 100,
                indicator: "Estuary indicator species status",
                value: "50% of indicator birds and fish in active decline",
                year: 2025,
                target: "0% indicator species in structural decline",
                context: "Half of the key indicator species within the San Francisco Estuary register in poor or declining ecological condition.",
                source: "The State of Our Estuary Report",
                sourceUrl: "https://www.sfestuary.org/state-of-the-estuary-report/",
                screenshot: null,
                actions: [
                    "Fund and support active shoreline marsh ecological restorations",
                    "Plant native flora corridors throughout localized urban park networks"
                ]
            },
            {
                name: "air pollution",
                level: 100,
                indicator: "Annual Mean PM2.5 concentrations",
                value: "7.2 \u00b5g/m\u00b3 exposure",
                year: 2023,
                target: "WHO guideline limit: 5 \u00b5g/m\u00b3",
                context: "Current particulate levels operate at 144% of the healthy WHO guideline ceiling.",
                source: "BAAQMD / World Health Organization Database",
                sourceUrl: "https://www.baaqmd.gov",
                screenshot: null,
                actions: [
                    "Establish zero-emission commercial transport and freight corridors",
                    "Expand street-level urban forest canopy filters"
                ]
            },
            {
                name: "ozone layer depletion",
                level: -100,
                indicator: "Stratospheric ozone performance",
                value: "Operating within safe bounds",
                year: 2026,
                target: "Complete planetary ozone tracking restoration",
                context: "Managed safely through global chemical compliance frameworks.",
                source: "NOAA Stratospheric Ozone Monitoring",
                sourceUrl: "https://www.epa.gov/ozone-layer-protection",
                screenshot: null,
                actions: [
                    "Ensure rigid local recovery and recycling of commercial refrigerants",
                    "Audit corporate facilities for old cooling unit leakage profiles"
                ]
            },
            {
                name: "waste & materials",
                level: 100,
                indicator: "Urban organic waste and landfilled streams",
                value: "60% impermeable soil sealing constraint",
                year: 2024,
                target: "Accelerate SB 1383 organic diversion pathways",
                context: "High surface sealing directly interfaces with the organic processing loops of the city metabolism.",
                source: "SF Environment Zero Waste Blueprint",
                sourceUrl: "https://www.sfenvironment.org",
                screenshot: null,
                actions: [
                    "Enforce strict localized commercial composting mandates",
                    "Deploy decentralized community food rescue processing hubs"
                ]
            }
        ],
        social: [
            {
                name: "food",
                level: 150,
                indicator: "Low-income household food security",
                value: "67% food insecurity rate below 200% FPL",
                year: 2024,
                target: "100% stable food security across populations",
                context: "Only 43% of adults below the 200% Federal Poverty Level maintain dependable food security access loops.",
                source: "SF Dept of Public Health Biennial Report / FSTF",
                sourceUrl: "https://www.sf.gov/information--biennial-food-security-and-equity-report",
                screenshot: null,
                actions: [
                    "Enshrine protected food distribution zoning into municipal plans",
                    "Restore funding structures for the Citywide Food Access Teams"
                ]
            },
            {
                name: "health",
                level: 50,
                indicator: "Neighborhood baseline wellness splits",
                value: "32% of neighborhoods below global baselines",
                year: 2024,
                target: "100% of neighborhoods matching baseline security",
                context: "Average life expectancy stands high at 82.9 years, but deep neighborhood-level disparities exist across zip codes.",
                source: "SF Department of Public Health / UCLA CHIS",
                sourceUrl: "https://www.sf.gov/departments/department-public-health",
                screenshot: null,
                actions: [
                    "Direct community health funding blocks to vulnerable zip codes",
                    "Remediate industrial environmental health hazards in EJ communities"
                ]
            },
            {
                name: "education",
                level: 50,
                indicator: "K-12 chronic absenteeism & literacy levels",
                value: "21% chronic absence / 50% 3rd-grade reading proficiency",
                year: 2024,
                target: "100% non-absenteeism baseline tracking",
                context: "Though 70% of older adults hold post-secondary degrees, foundational early literacy splits remain highly polarized.",
                source: "SFUSD / California Department of Education",
                sourceUrl: "https://www.sfusd.edu",
                screenshot: null,
                actions: [
                    "Deploy neighborhood-based early literacy and reading cohorts",
                    "Expand student wrap-around social and transit support access networks"
                ]
            },
            {
                name: "income & work",
                level: 50,
                indicator: "Real Cost Self-Sufficiency household thresholds",
                value: "27% of households earn below the sufficiency limit",
                year: 2022,
                target: "100% of active working households above sufficiency limits",
                context: "Labor participation rate sits at 69.6%, yet over a quarter of households fail to meet the localized $136,872 'Real Cost' standard.",
                source: "US Census Bureau (ACS) / Insight Center",
                sourceUrl: "https://www.census.gov/programs-surveys/acs",
                screenshot: null,
                actions: [
                    "Tie municipal minimum wage standards to local cost-of-living metrics",
                    "Develop targeted workforce training initiatives for marginalized earners"
                ]
            },
            {
                name: "housing",
                level: 150,
                indicator: "Renter household housing cost burdens",
                value: "38.4% of renter households are rent-burdened",
                year: 2022,
                target: "0% of renting households paying >30% income",
                context: "More than a third of renting households spend over 30% of their gross earnings directly on monthly housing bills.",
                source: "US Census Bureau (ACS 5-Year)",
                sourceUrl: "https://sfplanning.org/housing-element",
                screenshot: null,
                actions: [
                    "Enforce affordable housing production goals in the SF Housing Element",
                    "Expand city financing structures for community land trusts"
                ]
            },
            {
                name: "water & sanitation",
                level: 0,
                indicator: "Utility-driven water access affordability",
                value: "15% utility cost burden shortfall",
                year: 2024,
                target: "100% non-burdened domestic water accessibility",
                context: "85% of households meet the safe baseline; the remainder experience extreme economic stress from localized water utility costs.",
                source: "SFPUC Customer Survey Synthesis",
                sourceUrl: "https://www.sfpuc.org",
                screenshot: null,
                actions: [
                    "Scale up tiered income-qualified utility discount programs",
                    "Protect regional public water distribution assets from cost spikes"
                ]
            },
            {
                name: "energy",
                level: 0,
                indicator: "Low-income household domestic energy burdens",
                value: "11.2% of households spend >6% gross on home energy",
                year: 2024,
                target: "0% household grid energy cost over-burdens",
                context: "Lower-income brackets experience immediate financial strain from fixed baseline power costs.",
                source: "US DOE LEAD Data / SFPUC Records",
                sourceUrl: "https://www.energy.gov/sali/low-income-energy-affordability-data-lead-tool",
                screenshot: null,
                actions: [
                    "Target efficiency retrofits directly to low-income multifamily housing units",
                    "Deploy local solar microgrids to insulate communities from rate hikes"
                ]
            },
            {
                name: "social equity",
                level: 50,
                indicator: "Racial Equity and inclusion metrics",
                value: "Pronounced wage polarization indicators",
                year: 2026,
                target: "100% parity on local community access indices",
                context: "Marked splits persist between high-earning technology clusters and service sector work forces.",
                source: "National Equity Atlas / Regional Indicators",
                sourceUrl: "https://caldec.org/ca-doughnut-snapshot/",
                screenshot: null,
                actions: [
                    "Incentivize living wage workforce loops within local supplier contracts",
                    "Expand targeted small business grants to historically redlined zones"
                ]
            },
            {
                name: "peace & justice",
                level: 50,
                indicator: "Inverse violent crime and nighttime safety indices",
                value: "83% safety index / 52% comfortable walking alone at night",
                year: 2026,
                target: "100% justice and fear-free neighborhood safety",
                context: "Perceptions of localized safety vary significantly across neighborhoods and distinct city sectors.",
                source: "Projected City Survey Records Compilation",
                sourceUrl: "https://www.sf.gov/city-survey",
                screenshot: null,
                actions: [
                    "Fund non-carceral community safety teams and neighborhood responders",
                    "Invest in localized restorative justice and mediation centers"
                ]
            },
            {
                name: "political voice",
                level: 50,
                indicator: "Off-cycle municipal voter turnouts",
                value: "55.6% local election turnout vs 78.9% general",
                year: 2024,
                target: "Equalized high voter turnout across all cycles",
                context: "Local voter turnout drops significantly off-cycle, and residents directly dictate less than 0.01% of the municipal budget.",
                source: "San Francisco Department of Elections",
                sourceUrl: "https://www.sf.gov/departments/department-elections",
                screenshot: null,
                actions: [
                    "Establish participatory budgeting assemblies within supervisorial districts",
                    "Support broad civic outreach tools to lower voter barriers"
                ]
            },
            {
                name: "gender equality",
                level: 50,
                indicator: "Full-time year-round gender wage parity ratios",
                value: "Women earn 87 cents per $1 earned by men",
                year: 2022,
                target: "1:1 complete gender wage compensation parity",
                context: "Occupational segregation and wage variances leave full-time female workers at a structural disadvantage.",
                source: "US Census Bureau (ACS Data)",
                sourceUrl: "https://www.census.gov/programs-surveys/acs",
                screenshot: null,
                actions: [
                    "Enforce strict localized salary and corporate compensation transparency rules",
                    "Support access paths for women entering technical or trade fields"
                ]
            },
            {
                name: "networks",
                level: 0,
                indicator: "Broadband internet household subscriptions",
                value: "89.1% household connectivity penetration",
                year: 2022,
                target: "100% universal digital connection accessibility",
                context: "Roughly 11% of the city ecosystem remains locked out of modern residential high-speed fiber infrastructure blocks.",
                source: "ACS 5-Year / SF Digital Equity Report",
                sourceUrl: "https://www.sf.gov/digital-equity-san-francisco",
                screenshot: null,
                actions: [
                    "Build out municipal public broadband fiber lines across public developments",
                    "Distribute connected mobile hardware nodes to low-income seniors"
                ]
            }
        ]
    }
};
