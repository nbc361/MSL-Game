// MSL Simulator - Game Data

const GameData = {
    // Education backgrounds with stat modifiers
    educationOptions: {
        phd: {
            name: "PhD (Biomedical Sciences)",
            description: "Deep research expertise with strong publication background. Excellent for evidence-based discussions but may need to develop clinical perspective.",
            stats: {
                scientificKnowledge: 85,
                communication: 60,
                strategicThinking: 70,
                complianceAwareness: 65
            }
        },
        pharmd: {
            name: "PharmD",
            description: "Strong understanding of drug interactions, pharmacokinetics, and clinical applications. Well-suited for discussions with prescribers.",
            stats: {
                scientificKnowledge: 75,
                communication: 75,
                strategicThinking: 70,
                complianceAwareness: 70
            }
        },
        md: {
            name: "MD",
            description: "Clinical credibility with physicians. Strong patient care perspective but may need to develop industry-specific knowledge.",
            stats: {
                scientificKnowledge: 80,
                communication: 80,
                strategicThinking: 65,
                complianceAwareness: 60
            }
        },
        dnp: {
            name: "DNP",
            description: "Nursing perspective with advanced practice experience. Excellent rapport with nursing staff and practical clinical insights.",
            stats: {
                scientificKnowledge: 70,
                communication: 85,
                strategicThinking: 65,
                complianceAwareness: 70
            }
        }
    },

    // Therapeutic areas with context for scenario generation
    therapeuticAreas: {
        oncology: {
            name: "Oncology",
            description: "High-science therapeutic area with rapidly evolving treatment landscape. Complex regimens and significant unmet needs.",
            complexity: "high",
            kolDensity: "high",
            context: {
                drugName: "VELORIX",
                drugClass: "anti-PD-L1 monoclonal antibody",
                mechanism: "PD-L1 checkpoint inhibitor that reactivates T-cell mediated antitumor immunity",
                indication: "locally advanced or metastatic non-small cell lung cancer (NSCLC)",
                shortIndication: "advanced NSCLC",
                primaryEndpoint: "overall survival (OS)",
                secondaryEndpoints: ["progression-free survival (PFS)", "objective response rate (ORR)", "duration of response (DoR)"],
                pivotalTrial: "VELORA-301",
                conference: "ASCO",
                guidelines: "NCCN Clinical Practice Guidelines in Oncology",
                competitors: ["pembrolizumab (Keytruda)", "nivolumab (Opdivo)", "atezolizumab (Tecentriq)"],
                competitorShort: "pembrolizumab",
                sideEffects: ["immune-related pneumonitis", "colitis", "hepatitis", "thyroid dysfunction", "fatigue"],
                commonAE: "immune-related pneumonitis",
                biomarkers: ["PD-L1 expression (TPS)", "tumor mutational burden (TMB)", "microsatellite instability (MSI)"],
                patientPopulation: "patients with PD-L1 TPS >=50% who have not received prior systemic therapy",
                relatedCondition: "small cell lung cancer",
                dosing: "200mg IV every 3 weeks",
                trialResult: "median OS of 22.1 months vs 14.3 months with chemotherapy (HR 0.68, p<0.001)",
                durability: "median duration of response of 18.4 months",
                subgroupBenefit: "PD-L1 high expressors (TPS >=50%)",
                realWorldConcern: "managing immune-related adverse events in elderly patients"
            }
        },
        immunology: {
            name: "Immunology",
            description: "Autoimmune and inflammatory conditions with biologic therapies. Growing competitive landscape.",
            complexity: "medium-high",
            kolDensity: "medium",
            context: {
                drugName: "RHEUMAVEX",
                drugClass: "selective JAK1/JAK3 inhibitor",
                mechanism: "selective Janus kinase inhibitor that modulates the signaling of multiple cytokines involved in inflammation",
                indication: "moderate-to-severe active rheumatoid arthritis in adults who have had an inadequate response to methotrexate",
                shortIndication: "moderate-to-severe RA",
                primaryEndpoint: "ACR50 response rate at week 24",
                secondaryEndpoints: ["DAS28-CRP remission rate", "HAQ-DI change from baseline", "radiographic progression (mTSS)"],
                pivotalTrial: "RHEUMAX-FLEX",
                conference: "ACR Convergence",
                guidelines: "ACR/EULAR Guidelines for Management of Rheumatoid Arthritis",
                competitors: ["adalimumab (Humira)", "tofacitinib (Xeljanz)", "upadacitinib (Rinvoq)", "baricitinib (Olumiant)"],
                competitorShort: "adalimumab",
                sideEffects: ["serious infections", "elevated LDL cholesterol", "lymphopenia", "herpes zoster reactivation", "venous thromboembolism"],
                commonAE: "upper respiratory tract infections and elevated cholesterol",
                biomarkers: ["CRP levels", "ESR", "anti-CCP antibodies", "rheumatoid factor"],
                patientPopulation: "patients with inadequate response or intolerance to at least one DMARD",
                relatedCondition: "psoriatic arthritis",
                dosing: "15mg oral once daily",
                trialResult: "ACR50 response of 48% vs 28% with placebo at week 24 (p<0.001)",
                durability: "sustained ACR50 response maintained through week 52 in 71% of responders",
                subgroupBenefit: "anti-CCP positive patients with high disease activity (DAS28-CRP >5.1)",
                realWorldConcern: "cardiovascular safety signals seen with JAK inhibitor class"
            }
        },
        neurology: {
            name: "Neurology",
            description: "CNS disorders with challenging trial endpoints. Long development cycles and high unmet needs.",
            complexity: "high",
            kolDensity: "medium",
            context: {
                drugName: "NEUROVANT",
                drugClass: "anti-CGRP monoclonal antibody",
                mechanism: "monoclonal antibody that binds to calcitonin gene-related peptide (CGRP) ligand, blocking its receptor interaction",
                indication: "preventive treatment of episodic and chronic migraine in adults",
                shortIndication: "migraine prevention",
                primaryEndpoint: "change from baseline in monthly migraine days (MMD) at weeks 1-12",
                secondaryEndpoints: [">=50% responder rate", "change in monthly acute medication days", "Migraine-Specific Quality of Life (MSQ) score"],
                pivotalTrial: "NEUROGUARD-1",
                conference: "AAN Annual Meeting",
                guidelines: "AAN/AHS Practice Guidelines for Migraine Prevention",
                competitors: ["erenumab (Aimovig)", "fremanezumab (Ajovy)", "galcanezumab (Emgality)"],
                competitorShort: "erenumab",
                sideEffects: ["injection site reactions", "constipation", "hypersensitivity reactions", "antibody development"],
                commonAE: "injection site reactions and constipation",
                biomarkers: ["CGRP serum levels", "migraine frequency at baseline", "prior preventive treatment failures"],
                patientPopulation: "adults with >=4 migraine days per month who have failed at least one prior preventive treatment",
                relatedCondition: "cluster headache",
                dosing: "225mg subcutaneous monthly or 675mg quarterly",
                trialResult: "reduction of 4.7 monthly migraine days vs 2.2 with placebo (p<0.001)",
                durability: "sustained efficacy through 52 weeks with no evidence of tolerance",
                subgroupBenefit: "patients with chronic migraine (>=15 headache days/month)",
                realWorldConcern: "long-term effects of CGRP pathway blockade on cardiovascular and wound healing"
            }
        },
        cardiology: {
            name: "Cardiology",
            description: "Cardiovascular disease with established guidelines. Large patient populations and outcome-driven evidence.",
            complexity: "medium",
            kolDensity: "high",
            context: {
                drugName: "CARDIVEX",
                drugClass: "PCSK9 inhibitor",
                mechanism: "monoclonal antibody targeting PCSK9 that significantly reduces LDL cholesterol by increasing hepatic LDL receptor recycling",
                indication: "adults with established atherosclerotic cardiovascular disease (ASCVD) or heterozygous familial hypercholesterolemia (HeFH) requiring additional LDL lowering",
                shortIndication: "ASCVD with inadequate LDL control",
                primaryEndpoint: "percent change in LDL-C from baseline at week 12",
                secondaryEndpoints: ["MACE (major adverse cardiovascular events)", "change in apolipoprotein B", "change in non-HDL cholesterol"],
                pivotalTrial: "CARDIOGUARD-OUTCOMES",
                conference: "ACC Scientific Session",
                guidelines: "ACC/AHA Guidelines on Management of Blood Cholesterol",
                competitors: ["evolocumab (Repatha)", "alirocumab (Praluent)", "inclisiran (Leqvio)"],
                competitorShort: "evolocumab",
                sideEffects: ["injection site reactions", "nasopharyngitis", "myalgia", "neurocognitive effects (under monitoring)"],
                commonAE: "injection site reactions and upper respiratory infections",
                biomarkers: ["LDL-C levels", "Lp(a)", "apolipoprotein B", "hsCRP"],
                patientPopulation: "patients with ASCVD on maximally tolerated statin therapy with LDL-C >=70 mg/dL",
                relatedCondition: "homozygous familial hypercholesterolemia",
                dosing: "150mg subcutaneous every 2 weeks or 300mg monthly",
                trialResult: "58% reduction in LDL-C from baseline vs 2% with placebo; 15% relative risk reduction in MACE",
                durability: "sustained LDL-C reduction maintained through 4 years of follow-up",
                subgroupBenefit: "patients with baseline LDL-C >=100 mg/dL on high-intensity statins",
                realWorldConcern: "very low LDL-C levels and potential neurocognitive effects"
            }
        },
        "rare-disease": {
            name: "Rare Disease",
            description: "Small patient populations with limited treatment options. Close-knit KOL community and unique challenges.",
            complexity: "high",
            kolDensity: "low",
            context: {
                drugName: "RAREVIX",
                drugClass: "enzyme replacement therapy (ERT)",
                mechanism: "recombinant enzyme that replaces deficient alpha-galactosidase A, reducing substrate accumulation in lysosomes",
                indication: "confirmed Fabry disease in adults and pediatric patients aged 8 years and older",
                shortIndication: "Fabry disease",
                primaryEndpoint: "change from baseline in plasma globotriaosylsphingosine (lyso-Gb3) at week 24",
                secondaryEndpoints: ["eGFR slope", "cardiac MRI (LVMi)", "patient-reported pain scores (BPI-SF)"],
                pivotalTrial: "RAREWARD-301",
                conference: "WORLDSymposium",
                guidelines: "Expert Consensus Guidelines on Management of Fabry Disease",
                competitors: ["agalsidase beta (Fabrazyme)", "migalastat (Galafold)"],
                competitorShort: "agalsidase beta",
                sideEffects: ["infusion-related reactions", "antibody development", "hypersensitivity", "headache"],
                commonAE: "infusion-related reactions including rigors and fever",
                biomarkers: ["plasma lyso-Gb3", "eGFR", "cardiac biomarkers (NT-proBNP, troponin)"],
                patientPopulation: "patients with genetically confirmed Fabry disease with measurable substrate elevation",
                relatedCondition: "other lysosomal storage disorders",
                dosing: "1 mg/kg IV infusion every 2 weeks",
                trialResult: "72% reduction in plasma lyso-Gb3 vs 8% with placebo at week 24 (p<0.001)",
                durability: "continued substrate reduction and stabilization of renal function through 3 years",
                subgroupBenefit: "treatment-naive patients with classic Fabry phenotype",
                realWorldConcern: "long-term antibody development reducing efficacy and managing infusion reactions at home"
            }
        }
    },

    // Territories with state-based KOL distribution
    territories: {
        northeast: {
            name: "Northeast Academic Hub",
            region: "Boston - NYC - Philadelphia",
            difficulty: "hard",
            description: "Dense concentration of academic medical centers and research institutions. Highly sophisticated KOLs who expect deep scientific engagement.",
            states: [
                {
                    name: "Massachusetts",
                    abbrev: "MA",
                    cities: ["Boston", "Cambridge", "Worcester"],
                    institutions: ["Harvard Medical School", "Massachusetts General Hospital", "Dana-Farber Cancer Institute", "Beth Israel Deaconess", "Brigham and Women's Hospital"]
                },
                {
                    name: "New York",
                    abbrev: "NY",
                    cities: ["New York City", "Rochester", "Buffalo"],
                    institutions: ["Memorial Sloan Kettering", "Mount Sinai", "Columbia University Medical Center", "NYU Langone", "Weill Cornell"]
                },
                {
                    name: "Pennsylvania",
                    abbrev: "PA",
                    cities: ["Philadelphia", "Pittsburgh"],
                    institutions: ["Penn Medicine", "UPMC", "Fox Chase Cancer Center", "Thomas Jefferson University"]
                }
            ],
            homeBase: { city: "Boston", state: "MA" },
            characteristics: {
                academicCenters: 12,
                communityHospitals: 8,
                privatePractices: 15,
                researchInstitutions: 6,
                kolCount: 32,
                tier1Kols: 10,
                competitorPresence: "Very High",
                travelRequirement: "Moderate"
            },
            challenges: [
                "Time-constrained KOLs with packed schedules",
                "High expectations for scientific depth",
                "Multiple competing MSLs seeking same KOLs"
            ],
            advantages: [
                "Access to thought leaders",
                "Major congress attendance",
                "Clinical trial site opportunities"
            ]
        },
        midwest: {
            name: "Great Lakes Region",
            region: "Chicago - Detroit - Minneapolis",
            difficulty: "medium",
            description: "Mix of major academic centers and community practices. Strong focus on practical, real-world evidence.",
            states: [
                {
                    name: "Illinois",
                    abbrev: "IL",
                    cities: ["Chicago", "Springfield", "Peoria"],
                    institutions: ["Northwestern Medicine", "University of Chicago Medicine", "Rush University Medical Center", "Loyola Medicine"]
                },
                {
                    name: "Michigan",
                    abbrev: "MI",
                    cities: ["Detroit", "Ann Arbor", "Grand Rapids"],
                    institutions: ["Michigan Medicine", "Henry Ford Health", "Beaumont Health", "Karmanos Cancer Institute"]
                },
                {
                    name: "Minnesota",
                    abbrev: "MN",
                    cities: ["Minneapolis", "Rochester", "St. Paul"],
                    institutions: ["Mayo Clinic", "University of Minnesota Health", "Allina Health", "HealthPartners"]
                },
                {
                    name: "Ohio",
                    abbrev: "OH",
                    cities: ["Cleveland", "Columbus", "Cincinnati"],
                    institutions: ["Cleveland Clinic", "Ohio State Wexner Medical Center", "Cincinnati Children's", "University Hospitals"]
                }
            ],
            homeBase: { city: "Chicago", state: "IL" },
            characteristics: {
                academicCenters: 6,
                communityHospitals: 14,
                privatePractices: 20,
                researchInstitutions: 3,
                kolCount: 32,
                tier1Kols: 6,
                competitorPresence: "Moderate",
                travelRequirement: "High"
            },
            challenges: [
                "Large geographic spread requiring extensive travel",
                "Weather-related scheduling disruptions",
                "Mix of urban and rural settings"
            ],
            advantages: [
                "Strong community practice engagement",
                "Less competitive pressure",
                "Longer appointment times"
            ]
        },
        southeast: {
            name: "Southeast Region",
            region: "Atlanta - Miami - Nashville",
            difficulty: "medium",
            description: "Growing healthcare market with expanding academic programs. Diverse patient populations.",
            states: [
                {
                    name: "Georgia",
                    abbrev: "GA",
                    cities: ["Atlanta", "Augusta", "Savannah"],
                    institutions: ["Emory Healthcare", "Winship Cancer Institute", "Piedmont Healthcare", "Augusta University Medical Center"]
                },
                {
                    name: "Florida",
                    abbrev: "FL",
                    cities: ["Miami", "Tampa", "Jacksonville", "Orlando"],
                    institutions: ["Moffitt Cancer Center", "Sylvester Comprehensive Cancer Center", "Mayo Clinic Florida", "UF Health"]
                },
                {
                    name: "Tennessee",
                    abbrev: "TN",
                    cities: ["Nashville", "Memphis", "Knoxville"],
                    institutions: ["Vanderbilt University Medical Center", "St. Jude Children's Research Hospital", "UT Medical Center"]
                },
                {
                    name: "North Carolina",
                    abbrev: "NC",
                    cities: ["Durham", "Chapel Hill", "Charlotte"],
                    institutions: ["Duke University Hospital", "UNC Medical Center", "Atrium Health", "Wake Forest Baptist Health"]
                }
            ],
            homeBase: { city: "Atlanta", state: "GA" },
            characteristics: {
                academicCenters: 5,
                communityHospitals: 18,
                privatePractices: 25,
                researchInstitutions: 2,
                kolCount: 32,
                tier1Kols: 5,
                competitorPresence: "Moderate",
                travelRequirement: "High"
            },
            challenges: [
                "Diverse practice settings",
                "Variable institutional protocols",
                "Large geographic coverage"
            ],
            advantages: [
                "Growing market opportunity",
                "Emerging KOL development",
                "Receptive to new therapies"
            ]
        },
        southwest: {
            name: "Texas Triangle",
            region: "Houston - Dallas - San Antonio",
            difficulty: "easy",
            description: "Large, growing healthcare market with major medical centers. Strong focus on value-based care.",
            states: [
                {
                    name: "Texas",
                    abbrev: "TX",
                    cities: ["Houston", "Dallas", "San Antonio", "Austin", "Fort Worth"],
                    institutions: ["MD Anderson Cancer Center", "UT Southwestern", "Baylor Scott & White", "Methodist Hospital", "Texas Children's Hospital"]
                },
                {
                    name: "Oklahoma",
                    abbrev: "OK",
                    cities: ["Oklahoma City", "Tulsa"],
                    institutions: ["OU Health", "Stephenson Cancer Center", "Saint Francis Health System"]
                },
                {
                    name: "Louisiana",
                    abbrev: "LA",
                    cities: ["New Orleans", "Baton Rouge"],
                    institutions: ["Ochsner Health", "LSU Health", "Tulane Medical Center"]
                }
            ],
            homeBase: { city: "Houston", state: "TX" },
            characteristics: {
                academicCenters: 4,
                communityHospitals: 12,
                privatePractices: 30,
                researchInstitutions: 3,
                kolCount: 32,
                tier1Kols: 4,
                competitorPresence: "Low-Moderate",
                travelRequirement: "Moderate"
            },
            challenges: [
                "Large distances between cities",
                "Varying healthcare systems",
                "Value-conscious environment"
            ],
            advantages: [
                "Growing patient populations",
                "Less saturated market",
                "Strong MD Anderson presence"
            ]
        },
        westcoast: {
            name: "Pacific Coast",
            region: "San Francisco - Los Angeles - Seattle",
            difficulty: "hard",
            description: "Innovation hub with leading research institutions. Early adopters but skeptical of pharma.",
            states: [
                {
                    name: "California",
                    abbrev: "CA",
                    cities: ["San Francisco", "Los Angeles", "San Diego", "Sacramento"],
                    institutions: ["UCSF Medical Center", "Stanford Health Care", "Cedars-Sinai", "UCLA Health", "City of Hope", "UC San Diego Health"]
                },
                {
                    name: "Washington",
                    abbrev: "WA",
                    cities: ["Seattle", "Spokane", "Tacoma"],
                    institutions: ["Fred Hutchinson Cancer Center", "UW Medicine", "Seattle Children's", "Virginia Mason"]
                },
                {
                    name: "Oregon",
                    abbrev: "OR",
                    cities: ["Portland", "Eugene"],
                    institutions: ["OHSU Knight Cancer Institute", "Providence Health", "Legacy Health"]
                }
            ],
            homeBase: { city: "San Francisco", state: "CA" },
            characteristics: {
                academicCenters: 8,
                communityHospitals: 10,
                privatePractices: 18,
                researchInstitutions: 7,
                kolCount: 32,
                tier1Kols: 10,
                competitorPresence: "High",
                travelRequirement: "High"
            },
            challenges: [
                "Skeptical of pharmaceutical industry",
                "High evidence standards",
                "Traffic and scheduling challenges"
            ],
            advantages: [
                "Early adopter community",
                "Innovation-focused",
                "Strong research partnerships"
            ]
        },
        mountain: {
            name: "Mountain West",
            region: "Denver - Phoenix - Salt Lake City",
            difficulty: "easy",
            description: "Emerging healthcare market with growing populations. Strong integrated health systems.",
            states: [
                {
                    name: "Colorado",
                    abbrev: "CO",
                    cities: ["Denver", "Aurora", "Colorado Springs"],
                    institutions: ["UCHealth", "University of Colorado Hospital", "National Jewish Health", "Children's Hospital Colorado"]
                },
                {
                    name: "Arizona",
                    abbrev: "AZ",
                    cities: ["Phoenix", "Tucson", "Scottsdale"],
                    institutions: ["Mayo Clinic Arizona", "Banner Health", "HonorHealth", "University of Arizona Medical Center"]
                },
                {
                    name: "Utah",
                    abbrev: "UT",
                    cities: ["Salt Lake City", "Provo"],
                    institutions: ["Huntsman Cancer Institute", "University of Utah Health", "Intermountain Healthcare"]
                },
                {
                    name: "Nevada",
                    abbrev: "NV",
                    cities: ["Las Vegas", "Reno"],
                    institutions: ["Cleveland Clinic Nevada", "Comprehensive Cancer Centers", "Renown Health"]
                }
            ],
            homeBase: { city: "Denver", state: "CO" },
            characteristics: {
                academicCenters: 3,
                communityHospitals: 10,
                privatePractices: 22,
                researchInstitutions: 2,
                kolCount: 32,
                tier1Kols: 3,
                competitorPresence: "Low",
                travelRequirement: "Very High"
            },
            challenges: [
                "Very large geographic territory",
                "Limited Tier 1 KOL access",
                "Smaller patient populations",
                "Altitude and weather challenges"
            ],
            advantages: [
                "Low competition",
                "Accessible physicians",
                "Growing healthcare systems",
                "Quality of life"
            ]
        }
    },

    // KOL templates that will be generated based on territory
    kolTemplates: {
        academic: [
            {
                titleTemplate: "Professor of {TA}",
                institutionTypes: ["University Medical Center", "Academic Hospital", "Medical School"],
                interests: ["Clinical Research", "Medical Education", "Guideline Development"],
                personality: ["Data-driven", "Time-constrained", "Intellectually curious"],
                dominantPersonality: "analytical",
                preferredInteraction: "Scheduled meetings with prepared data presentations"
            },
            {
                titleTemplate: "Division Chief, {TA}",
                institutionTypes: ["University Hospital", "Academic Medical Center"],
                interests: ["Department Leadership", "Residency Training", "Quality Improvement"],
                personality: ["Strategic thinker", "Politically aware", "Results-oriented"],
                dominantPersonality: "pragmatic",
                preferredInteraction: "Brief, efficient meetings with clear objectives"
            },
            {
                titleTemplate: "Director of Clinical Research",
                institutionTypes: ["Research Institute", "Academic Center"],
                interests: ["Trial Design", "Biomarkers", "Translational Research"],
                personality: ["Methodical", "Detail-oriented", "Skeptical"],
                dominantPersonality: "skeptic",
                preferredInteraction: "Deep scientific discussions with primary data"
            }
        ],
        community: [
            {
                titleTemplate: "{TA} Specialist",
                institutionTypes: ["Community Hospital", "Regional Medical Center"],
                interests: ["Patient Outcomes", "Practical Application", "Cost-effectiveness"],
                personality: ["Practical", "Patient-focused", "Accessible"],
                dominantPersonality: "practical",
                preferredInteraction: "Informal discussions between patients"
            },
            {
                titleTemplate: "Medical Director, {TA} Services",
                institutionTypes: ["Community Health System", "Regional Hospital Network"],
                interests: ["Protocol Development", "Staff Education", "Quality Metrics"],
                personality: ["Administrative", "Team-oriented", "Efficiency-focused"],
                dominantPersonality: "pragmatic",
                preferredInteraction: "Lunch meetings with team involvement"
            }
        ],
        private: [
            {
                titleTemplate: "{TA} Physician",
                institutionTypes: ["Private Practice", "Specialty Clinic", "Medical Group"],
                interests: ["Patient Care", "Practice Efficiency", "Reimbursement"],
                personality: ["Entrepreneurial", "Relationship-driven", "Time-conscious"],
                dominantPersonality: "practical",
                preferredInteraction: "Brief office visits with samples/resources"
            }
        ]
    },

    // Personality types with characteristics and tips
    personalityTypes: {
        analytical: {
            name: "Analytical",
            description: "Data-driven and intellectually rigorous",
            traits: ["Asks detailed questions about study methodology", "Values primary data over summaries", "May challenge statistical significance"],
            tips: [
                "Come prepared with detailed trial data and statistics",
                "Be ready to discuss study limitations openly",
                "Provide peer-reviewed publications for reference"
            ],
            responseStyle: "formal",
            followUpStyle: "detailed"
        },
        skeptic: {
            name: "Skeptic",
            description: "Cautious and questioning",
            traits: ["Questions company-sponsored research", "Wants to see head-to-head data", "May compare unfavorably to competitors"],
            tips: [
                "Acknowledge limitations proactively",
                "Don't oversell - let the data speak for itself",
                "Be prepared for challenging questions"
            ],
            responseStyle: "guarded",
            followUpStyle: "challenging"
        },
        pragmatic: {
            name: "Pragmatic",
            description: "Results-oriented and efficient",
            traits: ["Values concise presentations", "Focuses on practical outcomes", "Time-conscious"],
            tips: [
                "Get to the point quickly",
                "Focus on actionable information",
                "Respect their time - be concise"
            ],
            responseStyle: "efficient",
            followUpStyle: "direct"
        },
        practical: {
            name: "Practical",
            description: "Patient-focused and accessibility-minded",
            traits: ["Cares about real-world applicability", "Considers cost and access issues", "Values patient-friendly approaches"],
            tips: [
                "Emphasize real-world evidence when available",
                "Be ready to discuss patient support programs",
                "Connect data to actual patient impact"
            ],
            responseStyle: "warm",
            followUpStyle: "patient-focused"
        },
        enthusiastic: {
            name: "Enthusiastic",
            description: "Open and engaged",
            traits: ["Early adopter mentality", "Interested in novel approaches", "May be too eager to try new treatments"],
            tips: [
                "Build on their enthusiasm appropriately",
                "Gently remind of proper patient selection",
                "Good candidate for research collaboration"
            ],
            responseStyle: "engaged",
            followUpStyle: "curious"
        }
    },

    // First and last names for generating KOLs
    names: {
        firstNames: ["James", "Sarah", "Michael", "Jennifer", "David", "Lisa", "Robert", "Michelle", "William", "Amanda", "Richard", "Emily", "Thomas", "Jessica", "Christopher", "Ashley", "Daniel", "Elizabeth", "Matthew", "Stephanie", "Andrew", "Nicole", "Joseph", "Rachel", "Mark", "Lauren", "Steven", "Katherine", "Paul", "Megan", "Kevin", "Christina", "Brian", "Rebecca", "Edward", "Maria", "Ronald", "Diana", "Timothy", "Samantha", "Raj", "Priya", "Wei", "Mei", "Carlos", "Ana", "Ahmed", "Fatima", "Kenji", "Yuki"],
        lastNames: ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Thompson", "White", "Harris", "Sanchez", "Clark", "Patel", "Kumar", "Chen", "Wang", "Kim", "Nguyen", "Yamamoto", "Tanaka", "Singh", "Shah", "Cohen", "Goldstein", "Murphy", "O'Brien", "Sullivan"]
    },

    // Scientific exchange scenarios - uses {tokens} replaced with TA context
    scenarios: {
        efficacy: [
            {
                id: "efficacy_001",
                trigger: "KOL asks about clinical trial results",
                kolQuestion: "I saw your poster at {conference}. Can you walk me through the {primaryEndpoint} data from the {pivotalTrial} study in {shortIndication}?",
                options: [
                    {
                        text: "Walk through the {pivotalTrial} results: {trialResult}. Then review the key secondary endpoints including {secondaryEndpoint1} and {secondaryEndpoint2}.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 10,
                        insightOpportunity: true,
                        feedback: "Excellent response. You stayed within approved labeling while providing comprehensive, TA-specific information."
                    },
                    {
                        text: "Go beyond the approved indication to discuss unpublished subgroup analyses from {pivotalTrial} showing even better results in {subgroupBenefit}.",
                        complianceStatus: "violation",
                        outcome: "compliance_issue",
                        relationshipChange: -5,
                        complianceHit: 25,
                        feedback: "Compliance violation. Discussing unpublished data or unapproved subgroup analyses proactively is off-label promotion."
                    },
                    {
                        text: "Deflect by saying you can't discuss clinical data and offer to send the approved prescribing information for {drugName}.",
                        complianceStatus: "safe",
                        outcome: "neutral",
                        relationshipChange: -5,
                        feedback: "While compliant, you missed an opportunity for scientific exchange. MSLs can and should discuss approved clinical data."
                    },
                    {
                        text: "Compare {drugName}'s {primaryEndpoint} directly to {competitorShort}, claiming superiority without head-to-head data.",
                        complianceStatus: "violation",
                        outcome: "compliance_issue",
                        relationshipChange: -10,
                        complianceHit: 30,
                        feedback: "Serious violation. Making comparative claims without head-to-head data is misleading and promotional."
                    },
                    {
                        text: "Present the data objectively and then ask what specific aspects of {primaryEndpoint} outcomes matter most for their patient population.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 15,
                        insightOpportunity: true,
                        insightType: "clinical",
                        feedback: "Outstanding. You shared approved data and gathered insight about what drives their clinical decisions.",
                        skillRequirement: { category: "communication", skill: "Active Listening", minLevel: 2 }
                    }
                ]
            },
            {
                id: "efficacy_002",
                trigger: "KOL questions durability of response",
                kolQuestion: "The initial response rates with {drugName} look promising, but what about durability? My {shortIndication} patients need sustained disease control. What does the long-term data show?",
                options: [
                    {
                        text: "Present the long-term follow-up data: {durability}. Note the patient population studied was {patientPopulation}.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 10,
                        insightOpportunity: true,
                        feedback: "Good approach. You addressed the concern with relevant, approved data specific to the therapeutic area."
                    },
                    {
                        text: "Acknowledge the importance of durability and mention an ongoing extension study of {pivotalTrial}, noting you can share results when published.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 5,
                        feedback: "Appropriate response. You acknowledged limitations while setting expectations for future data."
                    },
                    {
                        text: "Share preliminary data from the ongoing extension study since it looks very promising for {subgroupBenefit}.",
                        complianceStatus: "violation",
                        outcome: "compliance_issue",
                        complianceHit: 20,
                        relationshipChange: 0,
                        feedback: "Violation. Sharing unpublished preliminary data proactively constitutes off-label promotion."
                    },
                    {
                        text: "Discuss the known mechanism of {drugClass} and how it supports sustained efficacy, while being transparent about what data gaps remain.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 12,
                        feedback: "Strong scientific approach. Connecting mechanism to clinical outcomes within approved information.",
                        skillRequirement: { category: "scientific", skill: "Mechanism of Action Mastery", minLevel: 2 }
                    },
                    {
                        text: "Honestly say that long-term data beyond 2 years is limited and ask what duration of response would be clinically meaningful in their practice.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 8,
                        insightOpportunity: true,
                        insightType: "unmet-need",
                        feedback: "Good transparency. Acknowledging limitations builds trust and the question generated a valuable insight."
                    }
                ]
            },
            {
                id: "efficacy_003",
                trigger: "KOL challenges trial design",
                kolQuestion: "I've looked at {pivotalTrial} closely. The study population - {patientPopulation} - doesn't reflect my real-world patients. How applicable are these results to a broader population?",
                options: [
                    {
                        text: "Acknowledge the limitation of trial inclusion criteria. Discuss the baseline characteristics of enrolled patients and how they compare to real-world demographics. Offer to share any published real-world evidence.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 15,
                        insightOpportunity: true,
                        insightType: "clinical",
                        feedback: "Excellent handling. You acknowledged limitations transparently and gathered insight about their patient population."
                    },
                    {
                        text: "Argue that the trial population is actually quite representative and the results should generalize well.",
                        complianceStatus: "risk",
                        outcome: "neutral",
                        relationshipChange: -5,
                        feedback: "Risky. Overstating generalizability beyond what the data supports can erode credibility with sophisticated KOLs."
                    },
                    {
                        text: "Pivot to discussing the subgroup analyses that show benefit across different patient populations, including some not in the approved label.",
                        complianceStatus: "violation",
                        outcome: "compliance_issue",
                        complianceHit: 20,
                        relationshipChange: 0,
                        feedback: "Violation. Proactively sharing subgroup data to expand perceived applicability beyond the approved indication is promotional."
                    },
                    {
                        text: "Discuss the statistical methodology including sensitivity analyses and how the trial was powered to detect clinically meaningful differences.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 12,
                        feedback: "Strong scientific response. Demonstrating deep trial design knowledge builds credibility.",
                        skillRequirement: { category: "scientific", skill: "Clinical Trial Interpretation", minLevel: 3 }
                    },
                    {
                        text: "Tell them you understand their concern and suggest they could explore this question through an investigator-initiated study with their patient population.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 10,
                        feedback: "Good pivot to a compliant collaboration opportunity that addresses their scientific question."
                    }
                ]
            }
        ],
        safety: [
            {
                id: "safety_001",
                trigger: "KOL concerned about adverse events",
                kolQuestion: "I've had a few patients with {commonAE} on {drugName}. Is this consistent with the trial data? How are other physicians managing it?",
                options: [
                    {
                        text: "Review the safety profile from {pivotalTrial}: the incidence, severity grading, and management recommendations in the prescribing information.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 10,
                        insightOpportunity: true,
                        insightType: "safety",
                        feedback: "Excellent response. You addressed the safety concern with approved information from the relevant trial."
                    },
                    {
                        text: "Tell them that in your experience talking to other physicians, most manage {commonAE} with standard supportive care and it resolves quickly.",
                        complianceStatus: "risk",
                        outcome: "neutral",
                        relationshipChange: 0,
                        feedback: "Risky approach. Sharing anecdotal management strategies could be seen as practice recommendations outside your role."
                    },
                    {
                        text: "Downplay the adverse events by saying they're much less severe than with {competitorShort}.",
                        complianceStatus: "violation",
                        outcome: "compliance_issue",
                        complianceHit: 15,
                        relationshipChange: -10,
                        feedback: "Violation. Minimizing safety concerns and making unsupported comparative safety claims is misleading."
                    },
                    {
                        text: "Ask clarifying questions about the severity, timing, and patient characteristics to better understand their specific experience. Document as a potential safety insight.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 15,
                        insightOpportunity: true,
                        insightType: "safety",
                        feedback: "Outstanding. You gathered valuable safety insight while showing genuine interest in their clinical experience."
                    },
                    {
                        text: "Walk through the published risk mitigation framework including monitoring recommendations, dose modification guidelines, and when to consider treatment discontinuation.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 12,
                        feedback: "Strong response. Providing practical, label-consistent management guidance adds real value.",
                        skillRequirement: { category: "compliance", skill: "Fair Balance", minLevel: 2 }
                    }
                ]
            },
            {
                id: "safety_002",
                trigger: "KOL reports potential adverse event",
                kolQuestion: "I had a patient develop a serious adverse event that might be related to {drugName}. It was unexpected - not something I've seen in the trial data. Who should I report this to?",
                options: [
                    {
                        text: "Thank them for reporting. Explain that you're required to collect initial details about any adverse event. Walk them through the reporting process and take down the key information now.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 10,
                        feedback: "Correct response. MSLs must take adverse event reports seriously and facilitate proper reporting."
                    },
                    {
                        text: "Say you'll look into it and get back to them, then move on to your planned discussion about {pivotalTrial} data.",
                        complianceStatus: "violation",
                        outcome: "compliance_issue",
                        complianceHit: 40,
                        relationshipChange: -15,
                        feedback: "Serious violation. Failing to properly handle adverse event reports is a major compliance issue with regulatory consequences."
                    },
                    {
                        text: "Suggest the adverse event is probably due to other medications or the underlying {shortIndication} rather than {drugName}.",
                        complianceStatus: "violation",
                        outcome: "compliance_issue",
                        complianceHit: 30,
                        relationshipChange: -20,
                        feedback: "Major violation. Never minimize or dismiss potential adverse events. All reports must be taken seriously regardless of suspected causality."
                    },
                    {
                        text: "Immediately collect the initial details, provide the pharmacovigilance hotline number, and explain the expected timeline for follow-up. Ask if they've reported to the FDA MedWatch program as well.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 15,
                        feedback: "Exemplary response. Thorough AE handling demonstrates both competence and genuine concern for patient safety.",
                        skillRequirement: { category: "compliance", skill: "Adverse Event Reporting", minLevel: 2 }
                    },
                    {
                        text: "Express concern and ask for more clinical details to understand the event. Explain you'll work with pharmacovigilance to see if this represents a new safety signal.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 12,
                        insightOpportunity: true,
                        insightType: "safety",
                        feedback: "Good approach. You showed concern, gathered details, and positioned yourself as a safety partner."
                    }
                ]
            },
            {
                id: "safety_003",
                trigger: "KOL asks about long-term safety",
                kolQuestion: "What do we know about the long-term safety of {drugName}? I'm particularly worried about {realWorldConcern}. Is there enough data to feel comfortable keeping patients on it indefinitely?",
                options: [
                    {
                        text: "Review the available long-term safety data from the extension phase of {pivotalTrial}. Be transparent about the duration of follow-up and acknowledge where data gaps exist.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 12,
                        insightOpportunity: true,
                        insightType: "safety",
                        feedback: "Good balanced approach. Transparency about data limitations builds credibility."
                    },
                    {
                        text: "Reassure them that the drug is very safe long-term based on the mechanism of action, even though long-term data is limited.",
                        complianceStatus: "risk",
                        outcome: "neutral",
                        relationshipChange: -5,
                        feedback: "Risky. Making safety assurances beyond what the data supports can backfire and erode trust."
                    },
                    {
                        text: "Acknowledge their concern about {realWorldConcern} specifically. Share what the label says about monitoring recommendations and suggest this could be an important area for future research.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 15,
                        insightOpportunity: true,
                        insightType: "safety",
                        feedback: "Excellent. You validated their concern, provided practical guidance, and identified a research opportunity.",
                        skillRequirement: { category: "scientific", skill: "Real-World Evidence", minLevel: 2 }
                    },
                    {
                        text: "Dismiss their concern by pointing out that the class has been around for years with other agents.",
                        complianceStatus: "risk",
                        outcome: "neutral",
                        relationshipChange: -8,
                        feedback: "Dismissing legitimate safety concerns damages trust. Each drug has its own safety profile."
                    },
                    {
                        text: "Present the safety monitoring protocol from the label and discuss how you can help connect their institution with the ongoing pharmacovigilance registry.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 10,
                        feedback: "Practical approach that adds value while keeping the discussion within approved information."
                    }
                ]
            }
        ],
        offlabel: [
            {
                id: "offlabel_001",
                trigger: "KOL asks about unapproved use",
                kolQuestion: "I have patients with {relatedCondition} who aren't responding to current treatment. Has anyone studied {drugName} in that population? The mechanism of {drugClass} seems like it could be relevant.",
                options: [
                    {
                        text: "Clarify that the question is unsolicited, confirm {drugName} is only approved for {shortIndication}, and offer to provide any published peer-reviewed literature if available.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 10,
                        feedback: "Perfect handling. You responded to an unsolicited request appropriately while maintaining compliance."
                    },
                    {
                        text: "Proactively share all the off-label data you have since the physician clearly needs it for patient care in {relatedCondition}.",
                        complianceStatus: "violation",
                        outcome: "compliance_issue",
                        complianceHit: 35,
                        relationshipChange: -5,
                        feedback: "Violation. Even with good intentions, proactively sharing off-label information is promotional."
                    },
                    {
                        text: "Refuse to discuss anything related to off-label use of {drugName} under any circumstances.",
                        complianceStatus: "safe",
                        outcome: "negative",
                        relationshipChange: -15,
                        feedback: "Overly restrictive. MSLs can respond to unsolicited requests for off-label information with appropriate disclosures."
                    },
                    {
                        text: "Say 'I can't officially talk about that' but suggest there's promising data they should search for on PubMed.",
                        complianceStatus: "violation",
                        outcome: "compliance_issue",
                        complianceHit: 25,
                        relationshipChange: -10,
                        feedback: "Violation. Indirect suggestions or 'wink-and-nod' references to off-label data are still considered promotion."
                    },
                    {
                        text: "Confirm the request is unsolicited, then provide a balanced summary of published literature including study limitations. Clearly state the drug is not approved for {relatedCondition} and document the interaction.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 15,
                        insightOpportunity: true,
                        insightType: "unmet-need",
                        feedback: "Exemplary handling. Thorough, balanced, compliant response to an unsolicited medical information request.",
                        skillRequirement: { category: "compliance", skill: "Off-label Boundaries", minLevel: 3 }
                    }
                ]
            }
        ],
        competitive: [
            {
                id: "competitive_001",
                trigger: "KOL asks for competitive comparison",
                kolQuestion: "How does {drugName} compare to {competitorShort}? I'm trying to decide treatment sequencing for my {shortIndication} patients. What differentiates your product?",
                options: [
                    {
                        text: "Explain there's no head-to-head trial data between {drugName} and {competitorShort}. Offer to review the individual trial designs and patient populations so they can understand differences in the evidence base.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 10,
                        feedback: "Excellent approach. You provided context without making unsupported comparative claims."
                    },
                    {
                        text: "Pull out a comparison chart showing {drugName} is clearly superior across all measures compared to {competitorShort}.",
                        complianceStatus: "violation",
                        outcome: "compliance_issue",
                        complianceHit: 30,
                        relationshipChange: -10,
                        feedback: "Violation. Cross-trial comparisons presented as superiority claims are misleading and promotional."
                    },
                    {
                        text: "Decline to discuss {competitorShort} at all, saying you can only talk about {drugName}.",
                        complianceStatus: "safe",
                        outcome: "neutral",
                        relationshipChange: -5,
                        feedback: "Compliant but missed opportunity. You can discuss publicly available competitor data in a balanced, fair way."
                    },
                    {
                        text: "Discuss the key differences in mechanism, dosing ({dosing}), and trial populations without making comparative efficacy claims. Let the data speak for itself.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 12,
                        insightOpportunity: true,
                        insightType: "competitive",
                        feedback: "Strong approach. Objective comparison of approved information helps physicians make informed decisions.",
                        skillRequirement: { category: "scientific", skill: "Competitive Landscape", minLevel: 2 }
                    },
                    {
                        text: "Offer to share what you've heard from other physicians about their preferences and switching patterns between {drugName} and {competitorShort}.",
                        complianceStatus: "risk",
                        outcome: "neutral",
                        relationshipChange: 0,
                        feedback: "Risky. Sharing anecdotal physician opinions could be seen as testimonials or influencing prescribing decisions."
                    }
                ]
            }
        ],
        iis: [
            {
                id: "iis_001",
                trigger: "KOL expresses research interest",
                kolQuestion: "I have an idea for a study using {drugName} in a unique patient population with {shortIndication}. I think there's a real evidence gap here. Does your company support investigator-initiated research?",
                options: [
                    {
                        text: "Explain the IIS program exists, describe the submission process, and offer to facilitate their connection with the grants office without guaranteeing approval.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 15,
                        feedback: "Perfect response. You facilitated appropriately without influencing the research direction or making promises."
                    },
                    {
                        text: "Get excited and start discussing study designs and endpoints that would be most useful for the {drugName} marketing team's key messages.",
                        complianceStatus: "violation",
                        outcome: "compliance_issue",
                        complianceHit: 40,
                        relationshipChange: -15,
                        feedback: "Serious violation. MSLs must never influence IIS design for commercial purposes. Studies must be truly investigator-initiated."
                    },
                    {
                        text: "Promise them funding approval if they design the study to show specific outcomes favorable to {drugName}.",
                        complianceStatus: "violation",
                        outcome: "compliance_issue",
                        complianceHit: 50,
                        relationshipChange: -20,
                        feedback: "Major violation with potential legal consequences. This constitutes kickback and scientific fraud."
                    },
                    {
                        text: "Say the company doesn't support IIS to avoid any potential compliance issues.",
                        complianceStatus: "safe",
                        outcome: "negative",
                        relationshipChange: -10,
                        feedback: "Missed opportunity. If an IIS program exists, you should facilitate appropriately."
                    },
                    {
                        text: "Listen to their research question, ask clarifying questions about their proposed methodology, and explain how the IIS submission committee evaluates scientific merit independently from commercial interests.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 20,
                        insightOpportunity: true,
                        insightType: "clinical",
                        feedback: "Excellent. You engaged scientifically, facilitated appropriately, and gathered valuable insight about evidence gaps.",
                        skillRequirement: { category: "strategic", skill: "Insight Synthesis", minLevel: 2 }
                    }
                ]
            }
        ],
        guideline: [
            {
                id: "guideline_001",
                trigger: "KOL discusses treatment guidelines",
                kolQuestion: "The {guidelines} were just updated. Where does {drugName} fit in the treatment algorithm for {shortIndication} now? I'm on the committee and want to hear your perspective.",
                options: [
                    {
                        text: "Accurately describe {drugName}'s current positioning in the guidelines, citing the specific evidence ({pivotalTrial}) that supports the recommendation level.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 10,
                        feedback: "Good response. Discussing approved positioning in published guidelines with supporting evidence is appropriate."
                    },
                    {
                        text: "Suggest the guidelines should have placed {drugName} higher and that the committee underweighted the {pivotalTrial} data.",
                        complianceStatus: "risk",
                        outcome: "neutral",
                        relationshipChange: -5,
                        feedback: "Risky. Criticizing guideline committees or suggesting {drugName} deserves better positioning is promotional behavior."
                    },
                    {
                        text: "Ask about their committee experience and whether they see evidence gaps that might inform future guideline updates. This is a rare opportunity to understand the guideline development process.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 15,
                        insightOpportunity: true,
                        insightType: "clinical",
                        feedback: "Outstanding approach. You gathered high-value strategic insight about guideline development from a committee member."
                    },
                    {
                        text: "Present a comprehensive evidence landscape including {drugName}'s data alongside competitor data, letting the evidence speak for itself within the context of the guideline criteria.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 12,
                        feedback: "Strong scientific approach. Presenting balanced evidence helps guideline committee members make informed assessments.",
                        skillRequirement: { category: "scientific", skill: "Clinical Trial Interpretation", minLevel: 3 }
                    },
                    {
                        text: "Lobby them to upgrade {drugName}'s positioning in the next guideline revision, offering to provide materials to support the case.",
                        complianceStatus: "violation",
                        outcome: "compliance_issue",
                        complianceHit: 35,
                        relationshipChange: -15,
                        feedback: "Serious violation. Attempting to influence guideline committee members constitutes improper promotional activity."
                    }
                ]
            }
        ],
        access: [
            {
                id: "access_001",
                trigger: "KOL frustrated about access issues",
                kolQuestion: "My patients keep getting denied coverage for {drugName}. The prior authorization process is a nightmare. What can you do to help?",
                options: [
                    {
                        text: "Acknowledge the frustration, explain you can connect them with the reimbursement support team, and ask about specific denial scenarios to understand the access landscape.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 10,
                        insightOpportunity: true,
                        insightType: "access",
                        feedback: "Appropriate response. You offered resources while gathering valuable access insights."
                    },
                    {
                        text: "Coach them on specific ICD-10 coding strategies and what clinical language to use in prior authorization appeals for {drugName}.",
                        complianceStatus: "violation",
                        outcome: "compliance_issue",
                        complianceHit: 25,
                        relationshipChange: 5,
                        feedback: "Violation. Providing specific reimbursement coding advice is outside the MSL role and may be seen as inducement."
                    },
                    {
                        text: "Say access issues aren't your department and you can only discuss medical and scientific topics related to {drugName}.",
                        complianceStatus: "safe",
                        outcome: "negative",
                        relationshipChange: -10,
                        feedback: "Missed opportunity. While access isn't your primary focus, you should acknowledge concerns and connect them with appropriate resources."
                    },
                    {
                        text: "Document the specific access barriers they're experiencing, connect them with the patient access team, and explain how their insights will be shared internally to help address systemic issues.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 15,
                        insightOpportunity: true,
                        insightType: "access",
                        feedback: "Excellent. You showed empathy, took action, gathered insight, and demonstrated how field intelligence drives change.",
                        skillRequirement: { category: "strategic", skill: "Cross-functional Collaboration", minLevel: 2 }
                    },
                    {
                        text: "Offer to personally call the insurance companies on behalf of their patients to get {drugName} approved.",
                        complianceStatus: "violation",
                        outcome: "compliance_issue",
                        complianceHit: 20,
                        relationshipChange: 0,
                        feedback: "Violation. MSLs should not directly intervene in individual patient coverage decisions. This crosses into promotional territory."
                    }
                ]
            }
        ],
        realWorld: [
            {
                id: "realworld_001",
                trigger: "KOL discusses real-world experience",
                kolQuestion: "The clinical trial data for {drugName} is one thing, but I'm seeing different patterns in my clinic. My {shortIndication} patients are older, have more comorbidities, and the response doesn't seem as robust. What's your take?",
                options: [
                    {
                        text: "Acknowledge that real-world populations often differ from trial populations. Ask specific questions about their patient demographics and outcomes to understand the gap between trial data and clinical practice.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 15,
                        insightOpportunity: true,
                        insightType: "clinical",
                        feedback: "Excellent response. You validated their observation and gathered high-value real-world insight."
                    },
                    {
                        text: "Insist that the {pivotalTrial} data should be generalizable and suggest they may not be selecting patients correctly.",
                        complianceStatus: "risk",
                        outcome: "neutral",
                        relationshipChange: -15,
                        feedback: "Poor approach. Questioning a physician's clinical judgment damages trust. Real-world-trial gaps are expected."
                    },
                    {
                        text: "Share any published real-world evidence studies for {drugName} and discuss how their observations align or differ from what has been reported in the literature.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 12,
                        feedback: "Good approach. Using published RWE data to contextualize their experience.",
                        skillRequirement: { category: "scientific", skill: "Real-World Evidence", minLevel: 3 }
                    },
                    {
                        text: "Suggest they should have used {drugName} at a higher dose than recommended in the label.",
                        complianceStatus: "violation",
                        outcome: "compliance_issue",
                        complianceHit: 25,
                        relationshipChange: -10,
                        feedback: "Violation. Suggesting off-label dosing recommendations is a serious compliance breach."
                    },
                    {
                        text: "Discuss the published subgroup analyses from {pivotalTrial} that are relevant to older or comorbid patients, staying within approved information.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 10,
                        feedback: "Good use of available data to address their specific concern within approved information."
                    }
                ]
            }
        ],
        biomarker: [
            {
                id: "biomarker_001",
                trigger: "KOL asks about biomarker data",
                kolQuestion: "I'm very interested in the biomarker data from {pivotalTrial}. Specifically, how does {biomarker1} predict response to {drugName}? And are there patients we should be testing differently?",
                options: [
                    {
                        text: "Walk through the published biomarker analyses: how {biomarker1} was used in patient selection for {pivotalTrial}, the response rates by biomarker subgroup, and the testing methodology recommended.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 15,
                        insightOpportunity: true,
                        insightType: "clinical",
                        feedback: "Excellent. Deep biomarker knowledge demonstrates scientific credibility and generated a valuable insight."
                    },
                    {
                        text: "Suggest that all patients should be tested for {biomarker1} before starting {drugName}, even though this isn't in the approved label.",
                        complianceStatus: "violation",
                        outcome: "compliance_issue",
                        complianceHit: 15,
                        relationshipChange: -5,
                        feedback: "Violation. Recommending testing beyond what the label requires is outside the MSL scope and potentially promotional."
                    },
                    {
                        text: "Acknowledge the importance of biomarker-guided therapy and discuss what the current label says about patient selection. Ask what biomarker testing challenges they face in practice.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 12,
                        insightOpportunity: true,
                        insightType: "unmet-need",
                        feedback: "Good approach. You stayed compliant while identifying practical barriers to optimal patient selection.",
                        skillRequirement: { category: "scientific", skill: "Biomarker Knowledge", minLevel: 2 }
                    },
                    {
                        text: "Share unpublished exploratory biomarker analyses that suggest additional predictive markers beyond those in the approved label.",
                        complianceStatus: "violation",
                        outcome: "compliance_issue",
                        complianceHit: 20,
                        relationshipChange: 0,
                        feedback: "Violation. Sharing unpublished analyses proactively is off-label promotion, regardless of scientific interest."
                    },
                    {
                        text: "Discuss the evolving landscape of biomarker testing in {shortIndication} using published literature, and how precision medicine approaches may shape future treatment decisions.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 10,
                        feedback: "Good scientific discussion that contextualizes biomarker utility within the broader treatment landscape."
                    }
                ]
            }
        ]
    },

    // Skill tree with bonuses that unlock dialogue options and gameplay effects
    skills: {
        scientific: {
            name: "Scientific Expertise",
            icon: "🔬",
            description: "Deep knowledge of therapeutic area and clinical data",
            skills: [
                { name: "Clinical Trial Interpretation", maxLevel: 5, description: "Ability to critically analyze and present clinical trial data",
                  bonuses: ["Lv2: Unlock trial design dialogue options", "Lv3: +5% relationship from efficacy discussions", "Lv5: Unlock expert-level debate responses"] },
                { name: "Mechanism of Action Mastery", maxLevel: 5, description: "Deep understanding of drug mechanisms and pharmacology",
                  bonuses: ["Lv2: Unlock MoA-based responses", "Lv3: +10% XP from scientific exchanges", "Lv5: Impress skeptical KOLs more easily"] },
                { name: "Real-World Evidence", maxLevel: 5, description: "Knowledge of RWE and its application in medical practice",
                  bonuses: ["Lv2: Unlock RWE discussion options", "Lv3: Better responses to trial-vs-practice gaps", "Lv5: +15% insight generation chance"] },
                { name: "Biomarker Knowledge", maxLevel: 5, description: "Understanding of predictive and prognostic biomarkers",
                  bonuses: ["Lv2: Unlock biomarker dialogue options", "Lv4: +10% relationship with academic KOLs", "Lv5: Unlock precision medicine discussions"] },
                { name: "Competitive Landscape", maxLevel: 5, description: "Comprehensive knowledge of competitive therapies",
                  bonuses: ["Lv2: Unlock balanced comparison options", "Lv3: Better handling of competitive challenges", "Lv5: Earn insights from competitor discussions"] }
            ]
        },
        communication: {
            name: "Communication Skills",
            icon: "💬",
            description: "Ability to effectively engage with diverse stakeholders",
            skills: [
                { name: "Scientific Storytelling", maxLevel: 5, description: "Presenting complex data in compelling narratives",
                  bonuses: ["Lv2: +5% relationship gain per interaction", "Lv3: Unlock narrative-based responses", "Lv5: +20% congress presentation XP"] },
                { name: "Active Listening", maxLevel: 5, description: "Understanding unspoken needs and concerns",
                  bonuses: ["Lv2: Unlock probing question options", "Lv3: +15% insight generation", "Lv5: Reveal hidden KOL preferences"] },
                { name: "Objection Handling", maxLevel: 5, description: "Addressing concerns with balanced information",
                  bonuses: ["Lv2: Better responses to hostile KOLs", "Lv3: Reduced relationship loss from tough scenarios", "Lv5: Turn objections into rapport-building"] },
                { name: "Presentation Skills", maxLevel: 5, description: "Delivering impactful presentations to diverse audiences",
                  bonuses: ["Lv2: +25% congress XP", "Lv3: Unlock advisory board lead options", "Lv5: +30% XP from presentations"] },
                { name: "Written Communication", maxLevel: 5, description: "Clear, compliant written responses and documentation",
                  bonuses: ["Lv2: +10% CRM quality score", "Lv3: Faster CRM documentation", "Lv5: CRM entries automatically rated higher"] }
            ]
        },
        strategic: {
            name: "Strategic Acumen",
            icon: "🎯",
            description: "Ability to think strategically and drive medical objectives",
            skills: [
                { name: "KOL Mapping", maxLevel: 5, description: "Identifying and prioritizing key stakeholders",
                  bonuses: ["Lv2: See KOL influence scores", "Lv3: +1 AP per week", "Lv5: Unlock KOL network referrals"] },
                { name: "Territory Planning", maxLevel: 5, description: "Efficient allocation of time and resources",
                  bonuses: ["Lv2: -1 AP cost for same-state travel", "Lv4: Virtual calls cost 0 AP", "Lv5: +2 AP per week"] },
                { name: "Insight Synthesis", maxLevel: 5, description: "Connecting field observations to business strategy",
                  bonuses: ["Lv2: Unlock strategic dialogue options", "Lv3: Insights worth double XP", "Lv5: Auto-generate quarterly insight reports"] },
                { name: "Cross-functional Collaboration", maxLevel: 5, description: "Working effectively with internal teams",
                  bonuses: ["Lv2: Unlock collaboration options", "Lv3: +15% advisory board success", "Lv5: Access to medical affairs resources"] },
                { name: "Conference Strategy", maxLevel: 5, description: "Maximizing impact at medical congresses",
                  bonuses: ["Lv2: +25% congress XP", "Lv3: Extra congress activities", "Lv5: KOL meetings at congresses cost 0 AP"] }
            ]
        },
        compliance: {
            name: "Compliance Mastery",
            icon: "🛡️",
            description: "Understanding and applying regulatory requirements",
            skills: [
                { name: "Promotional vs Non-promotional", maxLevel: 5, description: "Distinguishing compliant scientific exchange",
                  bonuses: ["Lv2: Warning before risky options", "Lv3: Reduced compliance hit from mistakes", "Lv5: Compliance never drops below 85%"] },
                { name: "Off-label Boundaries", maxLevel: 5, description: "Properly handling off-label requests",
                  bonuses: ["Lv2: Unlock nuanced off-label responses", "Lv3: +10% relationship from off-label handling", "Lv5: Turn off-label situations into IIS leads"] },
                { name: "Adverse Event Reporting", maxLevel: 5, description: "Correct identification and reporting of AEs",
                  bonuses: ["Lv2: Unlock thorough AE response options", "Lv3: AE reports never missed", "Lv5: +50 XP for each AE properly handled"] },
                { name: "Documentation Excellence", maxLevel: 5, description: "Timely, accurate CRM documentation",
                  bonuses: ["Lv2: +15% CRM quality", "Lv3: CRM deadline extended to 72 hours", "Lv5: Auto-complete CRM for routine interactions"] },
                { name: "Fair Balance", maxLevel: 5, description: "Presenting benefits and risks appropriately",
                  bonuses: ["Lv2: Unlock balanced safety discussion options", "Lv3: Skeptical KOLs more receptive", "Lv5: +10% relationship with all KOL types"] }
            ]
        }
    },

    // Congress/Conference events
    // Congresses with specific scheduled weeks (1 every ~2 months)
    // Week numbers are within the 52-week year
    congresses: {
        asco: {
            name: "ASCO Annual Meeting",
            type: "Major International",
            therapeuticArea: "oncology",
            scheduledWeek: 5,
            duration: 5,
            kolAttendance: "Very High",
            activities: ["booth", "poster", "symposium", "networking", "competitive"],
            activityAPCosts: { booth: 1, poster: 1, symposium: 1, networking: 2, competitive: 1 }
        },
        ash: {
            name: "ASH Annual Meeting",
            type: "Major International",
            therapeuticArea: "oncology",
            scheduledWeek: 49,
            duration: 4,
            kolAttendance: "High",
            activities: ["booth", "poster", "symposium", "networking", "competitive"],
            activityAPCosts: { booth: 1, poster: 1, symposium: 1, networking: 2, competitive: 1 }
        },
        acr: {
            name: "ACR Convergence",
            type: "Major International",
            therapeuticArea: "immunology",
            scheduledWeek: 11,
            duration: 5,
            kolAttendance: "High",
            activities: ["booth", "poster", "symposium", "networking", "competitive"],
            activityAPCosts: { booth: 1, poster: 1, symposium: 1, networking: 2, competitive: 1 }
        },
        eular: {
            name: "EULAR Congress",
            type: "Major International",
            therapeuticArea: "immunology",
            scheduledWeek: 24,
            duration: 4,
            kolAttendance: "High",
            activities: ["booth", "poster", "symposium", "networking", "competitive"],
            activityAPCosts: { booth: 1, poster: 1, symposium: 1, networking: 2, competitive: 1 }
        },
        aan: {
            name: "AAN Annual Meeting",
            type: "Major International",
            therapeuticArea: "neurology",
            scheduledWeek: 16,
            duration: 5,
            kolAttendance: "High",
            activities: ["booth", "poster", "symposium", "networking", "competitive"],
            activityAPCosts: { booth: 1, poster: 1, symposium: 1, networking: 2, competitive: 1 }
        },
        acc: {
            name: "ACC Scientific Session",
            type: "Major International",
            therapeuticArea: "cardiology",
            scheduledWeek: 9,
            duration: 4,
            kolAttendance: "Very High",
            activities: ["booth", "poster", "symposium", "networking", "competitive"],
            activityAPCosts: { booth: 1, poster: 1, symposium: 1, networking: 2, competitive: 1 }
        },
        aha: {
            name: "AHA Scientific Sessions",
            type: "Major International",
            therapeuticArea: "cardiology",
            scheduledWeek: 45,
            duration: 4,
            kolAttendance: "Very High",
            activities: ["booth", "poster", "symposium", "networking", "competitive"],
            activityAPCosts: { booth: 1, poster: 1, symposium: 1, networking: 2, competitive: 1 }
        },
        nord: {
            name: "NORD Rare Disease Summit",
            type: "Specialty",
            therapeuticArea: "rare-disease",
            scheduledWeek: 20,
            duration: 3,
            kolAttendance: "Medium",
            activities: ["booth", "networking", "symposium"],
            activityAPCosts: { booth: 1, symposium: 1, networking: 2 }
        },
        world: {
            name: "WORLDSymposium",
            type: "Specialty",
            therapeuticArea: "rare-disease",
            scheduledWeek: 36,
            duration: 4,
            kolAttendance: "High",
            activities: ["booth", "poster", "symposium", "networking"],
            activityAPCosts: { booth: 1, poster: 1, symposium: 1, networking: 2 }
        },
        // Cross-TA congresses everyone can attend
        diaGlobal: {
            name: "DIA Global Annual Meeting",
            type: "Cross-TA",
            therapeuticArea: "all",
            scheduledWeek: 30,
            duration: 3,
            kolAttendance: "Medium",
            activities: ["symposium", "networking", "competitive"],
            activityAPCosts: { symposium: 1, networking: 2, competitive: 1 }
        },
        ispor: {
            name: "ISPOR Annual Conference",
            type: "Cross-TA",
            therapeuticArea: "all",
            scheduledWeek: 42,
            duration: 3,
            kolAttendance: "Medium",
            activities: ["symposium", "networking", "competitive"],
            activityAPCosts: { symposium: 1, networking: 2, competitive: 1 }
        }
    },

    // Action Points configuration
    actionPoints: {
        maxPerDay: 5,
        costs: {
            sameCity: 1,      // KOL in same city as home base
            sameState: 2,     // KOL in same state but different city
            differentState: 3 // KOL in different state
        },
        activities: {
            kolMeeting: 1,    // Base cost, modified by location
            congress: 2,
            advisory: 2,
            training: 1,
            iis: 1,
            crm: 0            // CRM doesn't cost AP
        }
    },

    // XP rewards for various activities
    xpRewards: {
        kolMeeting: 25,
        kolMeetingWithInsight: 40,
        kolMeetingExcellent: 60,      // All objectives achieved
        crmEntry: 10,
        crmEntryHighQuality: 25,      // 80%+ quality score
        trainingModule: 30,
        conferenceAttendance: 50,
        advisoryBoard: 75,
        iisSupport: 60,
        quarterlyReviewBonus: 100,    // Excellent quarterly review
        promotionBonus: 200           // On promotion
    },

    // Career progression with level-based system
    // MSL I: Levels 1-4 (starting position)
    // MSL II: Levels 5-9 (first major milestone)
    // Senior MSL: Level 10 (WIN CONDITION)
    careerLevels: [
        { level: 1, title: "MSL I", xpRequired: 0, rank: "MSL I", description: "Entry-level Medical Science Liaison" },
        { level: 2, title: "MSL I", xpRequired: 100, rank: "MSL I", description: "Developing your foundation" },
        { level: 3, title: "MSL I", xpRequired: 250, rank: "MSL I", description: "Building your network" },
        { level: 4, title: "MSL I", xpRequired: 450, rank: "MSL I", description: "Ready for advancement" },
        { level: 5, title: "MSL II", xpRequired: 700, rank: "MSL II", description: "Promoted! Expanded responsibilities", isPromotion: true },
        { level: 6, title: "MSL II", xpRequired: 1000, rank: "MSL II", description: "Establishing expertise" },
        { level: 7, title: "MSL II", xpRequired: 1350, rank: "MSL II", description: "Regional recognition" },
        { level: 8, title: "MSL II", xpRequired: 1750, rank: "MSL II", description: "Mentoring juniors" },
        { level: 9, title: "MSL II", xpRequired: 2200, rank: "MSL II", description: "Leadership potential identified" },
        { level: 10, title: "Senior MSL", xpRequired: 2700, rank: "Senior MSL", description: "Congratulations! You've reached Senior MSL!", isPromotion: true, isVictory: true }
    ],

    // Promotion ceremony messages
    promotionCeremonies: {
        msl2: {
            title: "🎉 Promotion to MSL II!",
            message: "Congratulations! Your exceptional performance in scientific engagement, KOL relationship building, and compliance adherence has earned you a promotion to MSL II.",
            achievements: [
                "Demonstrated strong scientific expertise",
                "Built meaningful KOL relationships",
                "Maintained excellent compliance standards"
            ],
            newResponsibilities: [
                "Expanded territory coverage",
                "Mentoring new MSL team members",
                "Leading regional medical initiatives"
            ],
            bonusSkillPoints: 3
        },
        seniorMsl: {
            title: "🏆 Senior MSL - Victory!",
            message: "Outstanding achievement! You have demonstrated exceptional scientific expertise, built a world-class network of KOL relationships, and maintained impeccable compliance standards. You are now a Senior MSL!",
            achievements: [
                "Mastered scientific exchange and data communication",
                "Developed strong relationships with key opinion leaders",
                "Maintained perfect compliance record",
                "Generated valuable field insights",
                "Demonstrated leadership potential"
            ],
            victoryMessage: "You have completed your journey from entry-level MSL to Senior MSL. Your expertise and relationships will shape the future of medical education in your therapeutic area.",
            bonusSkillPoints: 5
        }
    },

    // Legacy career levels (kept for backwards compatibility)
    legacyCareerLevels: [
        { title: "Associate MSL", minQuarters: 0, requirements: {} },
        { title: "MSL", minQuarters: 4, requirements: { kolEngagement: 70, compliance: 95 } },
        { title: "Senior MSL", minQuarters: 8, requirements: { kolEngagement: 80, insights: 75, compliance: 98 } },
        { title: "Principal MSL", minQuarters: 12, requirements: { kolEngagement: 85, insights: 80, compliance: 100 } },
        { title: "MSL Director", minQuarters: 16, requirements: { kolEngagement: 90, insights: 85, compliance: 100 } }
    ],

    // Random events that can occur
    randomEvents: [
        {
            id: "compliance_audit",
            name: "Compliance Audit",
            description: "Your region has been selected for a routine compliance audit. Review of your CRM documentation and interaction records.",
            type: "challenge",
            probability: 0.1,
            effect: function(gameState) {
                if (gameState.metrics.crmCompliance < 90) {
                    return {
                        message: "Audit findings: Several documentation gaps identified. Compliance warning issued.",
                        complianceHit: 10,
                        outcome: "negative"
                    };
                }
                return {
                    message: "Audit complete: No issues found. Documentation meets all requirements.",
                    outcome: "positive",
                    reward: { skillPoints: 2 }
                };
            }
        },
        {
            id: "breaking_news",
            name: "Breaking Clinical Data",
            description: "Major new data released for a competitive product. KOLs will have questions.",
            type: "opportunity",
            probability: 0.15,
            effect: function(gameState) {
                return {
                    message: "Be prepared to discuss competitive landscape in upcoming interactions.",
                    temporaryBuff: { competitiveQuestions: true }
                };
            }
        },
        {
            id: "safety_signal",
            name: "Safety Signal Investigation",
            description: "Pharmacovigilance has identified a potential safety signal requiring field investigation.",
            type: "challenge",
            probability: 0.08,
            effect: function(gameState) {
                return {
                    message: "You need to gather additional safety information from your KOLs. Handle with care.",
                    mission: "safety_investigation"
                };
            }
        },
        {
            id: "publication_release",
            name: "New Publication",
            description: "A major peer-reviewed publication featuring new clinical data has been released.",
            type: "opportunity",
            probability: 0.12,
            effect: function(gameState) {
                return {
                    message: "New data available for scientific exchange. KOLs may be more receptive to meetings.",
                    temporaryBuff: { meetingAcceptance: 20 }
                };
            }
        },
        {
            id: "competitor_launch",
            name: "Competitor Drug Launch",
            description: "A new competitor has launched in your therapeutic area.",
            type: "challenge",
            probability: 0.1,
            effect: function(gameState) {
                return {
                    message: "KOLs will have questions about the new competitive landscape.",
                    temporaryBuff: { competitiveQuestions: true }
                };
            }
        },
        {
            id: "kol_speaker_request",
            name: "Speaker Bureau Inquiry",
            description: "A KOL has been invited to join the speaker bureau. Medical must validate scientific expertise.",
            type: "opportunity",
            probability: 0.1,
            effect: function(gameState) {
                return {
                    message: "Prepare a KOL assessment for the speaker evaluation committee.",
                    mission: "speaker_assessment"
                };
            }
        }
    ],

    // MSL title progression messages
    progressionMessages: {
        promotion: {
            msl: "Congratulations! Based on your strong performance in KOL engagement and compliance, you have been promoted to MSL. Your territory responsibilities are expanding.",
            senior: "Outstanding work! Your insight generation and strategic thinking have earned you a promotion to Senior MSL. You will now mentor junior team members.",
            principal: "Exceptional performance! You have been promoted to Principal MSL. You will now lead key strategic initiatives and serve as a regional expert.",
            director: "Remarkable achievement! You have been promoted to MSL Director. You will now oversee a team of MSLs and shape regional medical strategy."
        },
        warning: {
            engagement: "Your KOL engagement metrics are below target. Focus on increasing meaningful scientific interactions.",
            compliance: "Compliance concerns have been noted. Please review company policies and ensure all activities meet regulatory requirements.",
            documentation: "Your CRM documentation is falling behind. Remember that timely documentation is required within 24-48 hours.",
            insights: "Insight generation is below expectations. Focus on gathering meaningful medical intelligence from your interactions."
        },
        termination: {
            compliance: "Due to repeated compliance violations, your employment has been terminated. Regulatory compliance is non-negotiable in the MSL role.",
            performance: "Due to consistently below-target performance across multiple metrics, we have made the difficult decision to end your employment.",
            documentation: "Failure to maintain required documentation standards has resulted in termination. CRM compliance is a fundamental requirement."
        }
    },

    // Branching dialogue scenarios - multi-turn conversations with consequences
    branchingScenarios: {
        offLabelRequest: {
            id: "branch_offlabel_001",
            name: "Off-Label Question",
            description: "KOL asks about unapproved use",
            difficulty: "medium",
            stages: [
                {
                    id: "stage_1",
                    kolDialogue: "I've been seeing some patients with {relatedCondition} who haven't responded to standard therapy. Has anyone looked at using {drugName} in that population? I'm wondering if there's any data out there.",
                    options: [
                        {
                            text: "That's an interesting clinical question. Before I respond, I want to clarify - is this an unsolicited request for information about off-label use?",
                            nextStage: "stage_2a",
                            relationshipChange: 5,
                            complianceStatus: "safe",
                            feedback: "Good practice to clarify the nature of the request."
                        },
                        {
                            text: "Yes, actually we have some exciting data from an investigator-initiated study that shows really promising results in that population.",
                            nextStage: "stage_2b_violation",
                            relationshipChange: 5,
                            complianceStatus: "violation",
                            complianceHit: 30,
                            feedback: "Proactively sharing off-label data without confirming unsolicited request is promotional."
                        },
                        {
                            text: "I can't discuss off-label uses at all. Let's change the topic.",
                            nextStage: "end_negative",
                            relationshipChange: -15,
                            complianceStatus: "safe",
                            feedback: "While compliant, this is overly restrictive and damages the relationship."
                        }
                    ]
                },
                {
                    id: "stage_2a",
                    kolDialogue: "Yes, this is coming from my own clinical curiosity. I have a specific patient in mind who has failed everything else. I'd really appreciate any published literature you could share.",
                    options: [
                        {
                            text: "Thank you for confirming. Since this is an unsolicited request, I can provide published peer-reviewed literature. There is one small study published in [Journal]. I'll send you the reference, though I should note {drugName} isn't approved for this indication.",
                            nextStage: "stage_3a_success",
                            relationshipChange: 15,
                            complianceStatus: "safe",
                            insightOpportunity: true,
                            insightType: "unmet-need",
                            feedback: "Excellent handling of unsolicited off-label request with appropriate disclosures."
                        },
                        {
                            text: "I have a great slide deck from our internal medical team showing all the off-label data. Let me email that to you.",
                            nextStage: "stage_3a_violation",
                            relationshipChange: 5,
                            complianceStatus: "violation",
                            complianceHit: 35,
                            feedback: "Sharing internal promotional materials for off-label use is a serious violation."
                        },
                        {
                            text: "There's limited published data. Would you be interested in our IIS program? If you're seeing a pattern of patients with this condition, perhaps a formal study would be valuable.",
                            nextStage: "stage_3a_iis",
                            relationshipChange: 20,
                            complianceStatus: "safe",
                            feedback: "Good pivot to appropriate scientific collaboration opportunity."
                        }
                    ]
                },
                {
                    id: "stage_2b_violation",
                    kolDialogue: "That's interesting. Can you send me that study? Also, what doses were they using?",
                    options: [
                        {
                            text: "Actually, I should step back. I apologize - I should have first confirmed this was an unsolicited request. Let me start over and handle this properly.",
                            nextStage: "stage_2a",
                            relationshipChange: -5,
                            complianceStatus: "safe",
                            feedback: "Good recovery, but the initial violation still occurred."
                        },
                        {
                            text: "Sure, they were using higher doses than approved, around 2x the standard dose. I'll email you the details.",
                            nextStage: "end_major_violation",
                            relationshipChange: 5,
                            complianceStatus: "violation",
                            complianceHit: 40,
                            feedback: "Compounding the violation by providing specific off-label dosing recommendations."
                        }
                    ]
                },
                {
                    id: "stage_3a_success",
                    kolDialogue: "I appreciate that. While we're on the topic, would the company be interested in supporting a small pilot study? I think there's real potential here.",
                    options: [
                        {
                            text: "We do have an IIS program. I'd be happy to explain the process and connect you with our grants team - though I should be clear I can't promise approval or influence the research direction.",
                            nextStage: "end_positive",
                            relationshipChange: 15,
                            complianceStatus: "safe",
                            feedback: "Perfect response - facilitating without promising or influencing."
                        },
                        {
                            text: "Absolutely! I can almost guarantee approval if you design the study to show certain outcomes.",
                            nextStage: "end_major_violation",
                            relationshipChange: 10,
                            complianceStatus: "violation",
                            complianceHit: 50,
                            feedback: "Promising IIS approval and directing outcomes is potentially illegal (kickback)."
                        }
                    ]
                },
                {
                    id: "stage_3a_iis",
                    kolDialogue: "That's an interesting thought. I do have a registry of these patients. What would the process look like?",
                    options: [
                        {
                            text: "Our IIS program accepts investigator-initiated proposals. I can connect you with the grants office who can explain requirements. The key is that the research question and design come from you - we provide support but don't direct the research.",
                            nextStage: "end_positive",
                            relationshipChange: 20,
                            complianceStatus: "safe",
                            insightOpportunity: true,
                            insightType: "clinical",
                            feedback: "Excellent - proper facilitation of IIS with appropriate boundaries."
                        }
                    ]
                },
                {
                    id: "stage_3a_violation",
                    kolDialogue: "I appreciate the materials, but I'm a bit concerned - should you be sharing this with me?",
                    options: [
                        {
                            text: "You're right to be concerned. I apologize - I should not have offered internal materials. Let me instead point you to the published literature.",
                            nextStage: "end_neutral",
                            relationshipChange: -10,
                            complianceStatus: "safe",
                            feedback: "Good recovery, but trust may be damaged."
                        },
                        {
                            text: "Don't worry about it, we share this all the time. It's fine.",
                            nextStage: "end_major_violation",
                            relationshipChange: -20,
                            complianceStatus: "violation",
                            complianceHit: 20,
                            feedback: "Dismissing compliance concerns compounds the violation."
                        }
                    ]
                },
                {
                    id: "end_positive",
                    kolDialogue: "This has been very helpful. I appreciate you handling this professionally. Let's schedule a follow-up once I've reviewed the literature.",
                    isEnding: true,
                    outcome: "positive",
                    relationshipChange: 10
                },
                {
                    id: "end_neutral",
                    kolDialogue: "Alright, let's move on. I have some other questions about the approved indication.",
                    isEnding: true,
                    outcome: "neutral",
                    relationshipChange: 0
                },
                {
                    id: "end_negative",
                    kolDialogue: "I see. Well, I have limited time today. Perhaps we can reschedule when you have more flexibility to discuss clinical questions.",
                    isEnding: true,
                    outcome: "negative",
                    relationshipChange: -10
                },
                {
                    id: "end_major_violation",
                    kolDialogue: "I appreciate the information, but I'm going to document this conversation. I think your compliance team should know about this.",
                    isEnding: true,
                    outcome: "compliance_crisis",
                    relationshipChange: -30,
                    triggerComplianceReview: true
                }
            ]
        },
        competitorChallenge: {
            id: "branch_competitive_001",
            name: "Data Challenge",
            description: "KOL challenges your data with competitor evidence",
            difficulty: "hard",
            stages: [
                {
                    id: "stage_1",
                    kolDialogue: "I read the {competitorShort} study that just came out. Their response rates are higher than yours, and frankly, I'm thinking of switching my next patients to their product. Can you explain why I shouldn't?",
                    options: [
                        {
                            text: "I understand the interest in that data. Those are different trials with different patient populations and endpoints, so direct comparison is challenging. Would it help if we reviewed the trial designs side by side?",
                            nextStage: "stage_2a",
                            relationshipChange: 10,
                            complianceStatus: "safe",
                            feedback: "Good approach - acknowledging the data while noting comparison limitations."
                        },
                        {
                            text: "That study is flawed. Our drug is clearly superior - the competitor cherry-picked their patient population to inflate their numbers.",
                            nextStage: "stage_2b_risky",
                            relationshipChange: -10,
                            complianceStatus: "risk",
                            feedback: "Disparaging competitor data without evidence is unprofessional and potentially misleading."
                        },
                        {
                            text: "Our drug is definitely better. Look at the overall survival data - we beat them by 2 months.",
                            nextStage: "stage_2c_violation",
                            relationshipChange: 0,
                            complianceStatus: "violation",
                            complianceHit: 25,
                            feedback: "Making superiority claims without head-to-head data is promotional and misleading."
                        }
                    ]
                },
                {
                    id: "stage_2a",
                    kolDialogue: "Sure, walk me through it. But I've been in this field for 20 years - I know how to read a trial. Convince me {drugName} has a place in my practice.",
                    options: [
                        {
                            text: "Of course. Looking at patient selection: our trial enrolled more refractory patients with a higher median prior therapies. The competitor included more treatment-naive patients. So the populations aren't directly comparable.",
                            nextStage: "stage_3a_scientific",
                            relationshipChange: 15,
                            complianceStatus: "safe",
                            feedback: "Excellent scientific discussion staying within appropriate bounds."
                        },
                        {
                            text: "I wouldn't presume to tell you how to practice medicine. I can share the data and you can draw your own conclusions. What specific aspects would be most helpful to review?",
                            nextStage: "stage_3a_humble",
                            relationshipChange: 10,
                            complianceStatus: "safe",
                            insightOpportunity: true,
                            insightType: "competitive",
                            feedback: "Respectful approach that acknowledges the KOL's expertise."
                        },
                        {
                            text: "Trust me, once you see our real-world data, you'll change your mind. Patients do much better on our drug.",
                            nextStage: "stage_3a_risky",
                            relationshipChange: -5,
                            complianceStatus: "risk",
                            feedback: "Vague superiority claims without specific data are unprofessional."
                        }
                    ]
                },
                {
                    id: "stage_2b_risky",
                    kolDialogue: "That's quite an accusation. Do you have evidence that they manipulated their trial, or is that just your company's talking point?",
                    options: [
                        {
                            text: "I apologize - that was poorly phrased. I don't have evidence of manipulation. What I meant to highlight are the differences in trial design that make direct comparison difficult. Let me be more specific about those differences.",
                            nextStage: "stage_3a_scientific",
                            relationshipChange: 0,
                            complianceStatus: "safe",
                            feedback: "Good recovery - admitting the overreach and redirecting appropriately."
                        },
                        {
                            text: "I've heard from other physicians that patients don't do as well on the competitor as the trial suggests. Real-world experience is different.",
                            nextStage: "stage_3b_anecdotal",
                            relationshipChange: -10,
                            complianceStatus: "risk",
                            feedback: "Sharing anecdotal hearsay about competitor performance is unprofessional."
                        }
                    ]
                },
                {
                    id: "stage_2c_violation",
                    kolDialogue: "Hold on - do you have head-to-head data showing that? Because I haven't seen any published comparison.",
                    options: [
                        {
                            text: "You're right, there's no head-to-head trial. I overstated that - I apologize. What I can say is that our trial showed specific survival outcomes in our patient population.",
                            nextStage: "stage_3a_recovery",
                            relationshipChange: -5,
                            complianceStatus: "safe",
                            feedback: "Good correction, but the initial claim was inappropriate."
                        },
                        {
                            text: "No direct comparison, but the numbers speak for themselves. Any physician can see our drug is better.",
                            nextStage: "end_major_violation",
                            relationshipChange: -20,
                            complianceStatus: "violation",
                            complianceHit: 30,
                            feedback: "Doubling down on unsupported superiority claims is a serious violation."
                        }
                    ]
                },
                {
                    id: "stage_3a_scientific",
                    kolDialogue: "That's a fair point about the patient populations. What about the safety profile? I've heard some concerns about {drugName}'s tolerability.",
                    options: [
                        {
                            text: "Our safety data shows specific rates for common adverse events. The most frequent were [specific events] at [specific rates]. We also have management guidance in the label. Would you like to review the full safety section?",
                            nextStage: "end_positive",
                            relationshipChange: 15,
                            complianceStatus: "safe",
                            insightOpportunity: true,
                            insightType: "safety",
                            feedback: "Comprehensive, balanced discussion of safety data."
                        },
                        {
                            text: "Our safety is actually much better than the competitor's. Patients tolerate our drug much better.",
                            nextStage: "end_risky",
                            relationshipChange: -5,
                            complianceStatus: "violation",
                            complianceHit: 15,
                            feedback: "Comparative safety claims without data are misleading."
                        }
                    ]
                },
                {
                    id: "stage_3a_humble",
                    kolDialogue: "I'm most interested in understanding the durability of response. My patients need long-term disease control.",
                    options: [
                        {
                            text: "That's a critical consideration. Our follow-up data at 24 months shows [specific data]. We also have an ongoing extension study. When that publishes, I'll make sure to share those results with you.",
                            nextStage: "end_positive",
                            relationshipChange: 15,
                            complianceStatus: "safe",
                            insightOpportunity: true,
                            insightType: "clinical",
                            feedback: "Good response addressing the specific clinical question with available data."
                        }
                    ]
                },
                {
                    id: "stage_3a_risky",
                    kolDialogue: "I need to see specific data, not general claims. This conversation isn't very helpful.",
                    options: [
                        {
                            text: "You're absolutely right. Let me be more specific. Our trial showed [specific data point] in the intent-to-treat population. The subgroup with [specific characteristic] showed [specific outcome].",
                            nextStage: "end_neutral",
                            relationshipChange: 0,
                            complianceStatus: "safe",
                            feedback: "Recovery by providing specific, approved data."
                        }
                    ]
                },
                {
                    id: "stage_3a_recovery",
                    kolDialogue: "I appreciate you correcting that. Let's focus on what the data actually shows.",
                    options: [
                        {
                            text: "Thank you for understanding. Let me walk through our pivotal trial results specifically, without comparison. Our primary endpoint showed [specific result] with [confidence interval].",
                            nextStage: "end_neutral",
                            relationshipChange: 5,
                            complianceStatus: "safe",
                            feedback: "Good recovery focusing on own data without inappropriate comparison."
                        }
                    ]
                },
                {
                    id: "stage_3b_anecdotal",
                    kolDialogue: "That's hearsay, not data. I expected a more scientific discussion from an MSL. I think we're done here.",
                    options: [
                        {
                            text: "You're right, I apologize. That was unprofessional of me. If you're willing, I'd like to restart this conversation with actual data.",
                            nextStage: "end_negative",
                            relationshipChange: -10,
                            complianceStatus: "safe",
                            feedback: "Appropriate apology, but significant relationship damage."
                        }
                    ]
                },
                {
                    id: "end_positive",
                    kolDialogue: "This has been a good scientific discussion. I appreciate you staying focused on the data. I'll keep {drugName} in consideration for appropriate patients.",
                    isEnding: true,
                    outcome: "positive",
                    relationshipChange: 15
                },
                {
                    id: "end_neutral",
                    kolDialogue: "Alright, I have a better sense of where {drugName} fits now. I'll review the data further on my own.",
                    isEnding: true,
                    outcome: "neutral",
                    relationshipChange: 0
                },
                {
                    id: "end_negative",
                    kolDialogue: "I think we should end here. Please have your manager contact me if there are other matters to discuss.",
                    isEnding: true,
                    outcome: "negative",
                    relationshipChange: -15
                },
                {
                    id: "end_risky",
                    kolDialogue: "I don't find comparative claims without data convincing. Let's wrap up for today.",
                    isEnding: true,
                    outcome: "negative",
                    relationshipChange: -10
                },
                {
                    id: "end_major_violation",
                    kolDialogue: "This conversation has been inappropriate. I'm going to report this to your company.",
                    isEnding: true,
                    outcome: "compliance_crisis",
                    relationshipChange: -30,
                    triggerComplianceReview: true
                }
            ]
        },
        dismissiveKOL: {
            id: "branch_dismissive_001",
            name: "Skeptical KOL",
            description: "KOL is dismissive and you need to provide value",
            difficulty: "hard",
            stages: [
                {
                    id: "stage_1",
                    kolDialogue: "Look, I have about 5 minutes. I see MSLs from every company and honestly, you all say the same things. What do you have that's actually going to help my patients?",
                    options: [
                        {
                            text: "I understand your time is valuable. Rather than talking at you, I'd like to understand - what's your biggest challenge with your current treatment approach? I may be able to help, or I may not, but I won't waste your time.",
                            nextStage: "stage_2a_engaged",
                            relationshipChange: 15,
                            complianceStatus: "safe",
                            feedback: "Excellent - focusing on the physician's needs rather than pushing a message."
                        },
                        {
                            text: "Our drug has great efficacy data. Let me show you our latest poster presentation.",
                            nextStage: "stage_2b_generic",
                            relationshipChange: -10,
                            complianceStatus: "safe",
                            feedback: "This generic approach confirms the KOL's skepticism about MSLs."
                        },
                        {
                            text: "I have some speaker program opportunities that might interest you...",
                            nextStage: "stage_2c_inappropriate",
                            relationshipChange: -15,
                            complianceStatus: "violation",
                            complianceHit: 20,
                            feedback: "Leading with speaker programs is promotional and inappropriate."
                        }
                    ]
                },
                {
                    id: "stage_2a_engaged",
                    kolDialogue: "Alright, I'll bite. My challenge is patient selection. Half my patients don't respond to first-line therapy, and I can't predict who will fail. I'm wasting months on ineffective treatment.",
                    options: [
                        {
                            text: "That's a common challenge. There's emerging data on predictive biomarkers - some recent publications suggest [specific markers] may identify likely non-responders. I can share those papers. Also, may I ask - are you seeing patterns in which patients tend to fail?",
                            nextStage: "stage_3a_value",
                            relationshipChange: 20,
                            complianceStatus: "safe",
                            insightOpportunity: true,
                            insightType: "unmet-need",
                            feedback: "Providing real value while gathering insights - excellent MSL work."
                        },
                        {
                            text: "Our drug works in those patients who fail first-line. You should use our drug instead.",
                            nextStage: "stage_3b_pushy",
                            relationshipChange: -15,
                            complianceStatus: "risk",
                            feedback: "Reverting to promotional messaging after building rapport."
                        }
                    ]
                },
                {
                    id: "stage_2b_generic",
                    kolDialogue: "I've seen the poster. Response rates in selected trial patients. How does that help me with my real-world patients who have multiple comorbidities?",
                    options: [
                        {
                            text: "You raise a valid point about generalizability. What specific patient characteristics are you seeing that differ from trial populations? Understanding your practice could help me find more relevant data, if it exists.",
                            nextStage: "stage_3a_recovery",
                            relationshipChange: 5,
                            complianceStatus: "safe",
                            feedback: "Good recovery - pivoting to understand their actual needs."
                        },
                        {
                            text: "The trial inclusion criteria were designed to show the drug works. Your patients should respond similarly.",
                            nextStage: "stage_3b_pushy",
                            relationshipChange: -15,
                            complianceStatus: "risk",
                            feedback: "Dismissing valid clinical concerns is unprofessional."
                        }
                    ]
                },
                {
                    id: "stage_2c_inappropriate",
                    kolDialogue: "I'm not interested in speaker programs. I don't need your company's money. Is there actual scientific value in this conversation or not?",
                    options: [
                        {
                            text: "I apologize - that wasn't the right approach. Let me reset. What clinical questions do you have that I might be able to help answer with published data or medical resources?",
                            nextStage: "stage_3a_recovery",
                            relationshipChange: -5,
                            complianceStatus: "safe",
                            feedback: "Good recovery acknowledging the misstep."
                        },
                        {
                            text: "I understand. Let me know if you change your mind about opportunities.",
                            nextStage: "end_negative",
                            relationshipChange: -20,
                            complianceStatus: "risk",
                            feedback: "Failing to recover from the misstep."
                        }
                    ]
                },
                {
                    id: "stage_3a_value",
                    kolDialogue: "Actually, I've noticed patients with [specific characteristic] tend to do worse. Has anyone looked at that? And yes, send me those biomarker papers.",
                    options: [
                        {
                            text: "That's a really interesting observation. I haven't seen published data on that specific characteristic, but this is exactly the kind of insight that helps inform research directions. Would you mind if I documented this observation? And I'll get you those papers within 24 hours.",
                            nextStage: "end_positive",
                            relationshipChange: 25,
                            complianceStatus: "safe",
                            insightOpportunity: true,
                            insightType: "clinical",
                            feedback: "Perfect - providing value, gathering insights, and maintaining compliance."
                        }
                    ]
                },
                {
                    id: "stage_3a_recovery",
                    kolDialogue: "Fine. I want to know about managing toxicity. The label says to hold for Grade 3 events, but I need practical guidance on when to rechallenge.",
                    options: [
                        {
                            text: "That's a great clinical question. The label provides general guidance, but I understand you're looking for practical experience. I can share what's in the prescribing information about rechallenge, and I can also connect you with our medical information team for more detailed questions.",
                            nextStage: "end_neutral",
                            relationshipChange: 10,
                            complianceStatus: "safe",
                            feedback: "Appropriate response staying within bounds while being helpful."
                        },
                        {
                            text: "Most physicians just rechallenge at a lower dose once symptoms resolve. That usually works fine.",
                            nextStage: "end_risky",
                            relationshipChange: 0,
                            complianceStatus: "risk",
                            feedback: "Providing practice recommendations outside the label is risky."
                        }
                    ]
                },
                {
                    id: "stage_3b_pushy",
                    kolDialogue: "I don't think you're listening. We're done here. I have patients waiting.",
                    options: [
                        {
                            text: "I understand. I appreciate your time, and I apologize if I wasn't as helpful as you needed. If there's ever a specific question I can help with, please reach out.",
                            nextStage: "end_negative",
                            relationshipChange: -5,
                            complianceStatus: "safe",
                            feedback: "Graceful exit, but opportunity was missed."
                        }
                    ]
                },
                {
                    id: "end_positive",
                    kolDialogue: "You know what, this has actually been useful. Most MSLs just pitch at me. You actually listened. Let's schedule a longer meeting next month - I have more questions.",
                    isEnding: true,
                    outcome: "positive",
                    relationshipChange: 20,
                    scheduleFollowUp: true
                },
                {
                    id: "end_neutral",
                    kolDialogue: "Alright, that's helpful. I'll reach out if I have other questions. Thanks for your time.",
                    isEnding: true,
                    outcome: "neutral",
                    relationshipChange: 5
                },
                {
                    id: "end_negative",
                    kolDialogue: "Goodbye.",
                    isEnding: true,
                    outcome: "negative",
                    relationshipChange: -10
                },
                {
                    id: "end_risky",
                    kolDialogue: "I appreciate the perspective, but I'll check the label myself. Thanks.",
                    isEnding: true,
                    outcome: "neutral",
                    relationshipChange: -5
                }
            ]
        },
        adverseEventReport: {
            id: "branch_ae_001",
            name: "Adverse Event",
            description: "KOL reports an adverse event mid-conversation",
            difficulty: "high",
            urgency: "critical",
            stages: [
                {
                    id: "stage_1",
                    kolDialogue: "Before we continue - I need to tell you about a patient. She started on {drugName} two weeks ago and was just hospitalized with severe hepatotoxicity. Her LFTs are 10 times the upper limit of normal. She's in the ICU.",
                    options: [
                        {
                            text: "I'm sorry to hear about your patient. This is important - as an MSL, I'm required to collect and report adverse events. Can I ask you some questions about this case to ensure proper documentation?",
                            nextStage: "stage_2a_proper",
                            relationshipChange: 10,
                            complianceStatus: "safe",
                            feedback: "Correct response - prioritizing AE collection as required."
                        },
                        {
                            text: "That's concerning. Let me check the label - hepatotoxicity is a known risk. Was she being monitored according to the recommendations?",
                            nextStage: "stage_2b_deflecting",
                            relationshipChange: -10,
                            complianceStatus: "risk",
                            feedback: "Deflecting to monitoring compliance before collecting the AE is inappropriate."
                        },
                        {
                            text: "I understand. Let's table that for now and I'll have someone follow up. So, about the new data I wanted to share...",
                            nextStage: "stage_2c_violation",
                            relationshipChange: -20,
                            complianceStatus: "violation",
                            complianceHit: 40,
                            feedback: "Failing to immediately collect an AE report is a serious violation."
                        }
                    ]
                },
                {
                    id: "stage_2a_proper",
                    kolDialogue: "Yes, of course. What do you need to know?",
                    options: [
                        {
                            text: "Thank you. I'll need the patient's initials, age, and sex. The date the event started, the current status, and any other medications she's taking. I also need to understand if you believe the event is related to our drug.",
                            nextStage: "stage_3a_collecting",
                            relationshipChange: 10,
                            complianceStatus: "safe",
                            feedback: "Proper AE collection process."
                        },
                        {
                            text: "I need her full name and medical record number so we can follow up directly with the hospital.",
                            nextStage: "stage_3b_privacy",
                            relationshipChange: -5,
                            complianceStatus: "risk",
                            feedback: "Requesting unnecessary PHI is inappropriate. Initials and basic info are sufficient."
                        }
                    ]
                },
                {
                    id: "stage_2b_deflecting",
                    kolDialogue: "Are you blaming me for this? She was monitored appropriately. I'm reporting a serious adverse event and you're questioning my clinical care?",
                    options: [
                        {
                            text: "I apologize - that's not what I intended. You're absolutely right to report this, and I need to collect the information properly. Let me start over with the adverse event report.",
                            nextStage: "stage_3a_collecting",
                            relationshipChange: -5,
                            complianceStatus: "safe",
                            feedback: "Good recovery, but initial response was inappropriate."
                        },
                        {
                            text: "I wasn't questioning your care. I was just noting that monitoring is important. But yes, let's report this.",
                            nextStage: "stage_3a_collecting",
                            relationshipChange: -10,
                            complianceStatus: "safe",
                            feedback: "Still somewhat defensive. Focus should be entirely on the patient."
                        }
                    ]
                },
                {
                    id: "stage_2c_violation",
                    kolDialogue: "Excuse me? My patient is in the ICU and you want to talk about data? I'm ending this conversation and reporting this to your company.",
                    isEnding: true,
                    outcome: "compliance_crisis",
                    relationshipChange: -40,
                    triggerComplianceReview: true,
                    complianceHit: 50,
                    feedback: "Failing to collect an AE is a serious regulatory violation."
                },
                {
                    id: "stage_3a_collecting",
                    kolDialogue: "She's 62, female. Started the drug on the 5th, was admitted on the 18th. She was also on [other medication] but had been stable on that for years. I believe this is drug-related.",
                    options: [
                        {
                            text: "Thank you for this information. I'll submit this to our pharmacovigilance team today with a follow-up request. Can I call you tomorrow for any updates on her condition? The safety of patients is our priority.",
                            nextStage: "stage_4a_followup",
                            relationshipChange: 15,
                            complianceStatus: "safe",
                            feedback: "Excellent - complete collection with appropriate follow-up plan."
                        },
                        {
                            text: "Got it, I'll report this. These events are rare - most patients do fine on the drug.",
                            nextStage: "stage_4b_minimizing",
                            relationshipChange: -15,
                            complianceStatus: "risk",
                            feedback: "Minimizing the event after collection is insensitive and inappropriate."
                        }
                    ]
                },
                {
                    id: "stage_3b_privacy",
                    kolDialogue: "I'm not giving you her full name. What do you actually need for the report?",
                    options: [
                        {
                            text: "You're right, I apologize. We only need initials, age, and the clinical details - not identifying information. Let me collect those appropriately.",
                            nextStage: "stage_3a_collecting",
                            relationshipChange: -5,
                            complianceStatus: "safe",
                            feedback: "Good correction on privacy requirements."
                        }
                    ]
                },
                {
                    id: "stage_4a_followup",
                    kolDialogue: "Yes, please follow up. I want to make sure this is properly documented. She has family members asking questions and they need to know this is being taken seriously.",
                    options: [
                        {
                            text: "Absolutely. I'll ensure our medical team is aware and available if you or the family have questions about the reported adverse events and safety profile. Is there anything else I can help with regarding this patient?",
                            nextStage: "end_positive",
                            relationshipChange: 15,
                            complianceStatus: "safe",
                            feedback: "Professional handling with appropriate support offered."
                        }
                    ]
                },
                {
                    id: "stage_4b_minimizing",
                    kolDialogue: "My patient is in the ICU and you're giving me statistics? I expected more from a medical professional.",
                    options: [
                        {
                            text: "I apologize, that was insensitive. I'll ensure this is reported promptly and we follow up appropriately. Your patient's situation is the priority.",
                            nextStage: "end_neutral",
                            relationshipChange: -5,
                            complianceStatus: "safe",
                            feedback: "Late recovery but damage to relationship is done."
                        }
                    ]
                },
                {
                    id: "end_positive",
                    kolDialogue: "Thank you for handling this appropriately. I know these reports are important. Let's continue our conversation another time - I need to get back to the hospital.",
                    isEnding: true,
                    outcome: "positive",
                    relationshipChange: 10,
                    aeReported: true
                },
                {
                    id: "end_neutral",
                    kolDialogue: "Fine. Just make sure this gets reported. Goodbye.",
                    isEnding: true,
                    outcome: "neutral",
                    relationshipChange: -5,
                    aeReported: true
                }
            ]
        },
        guidelineDiscussion: {
            id: "branch_guideline_001",
            name: "Guidelines Discussion",
            description: "KOL questions drug's place in treatment guidelines",
            difficulty: "medium",
            stages: [
                {
                    id: "stage_1",
                    kolDialogue: "The new NCCN guidelines just came out and {drugName} is only listed as a Category 2B recommendation. The competitor got Category 1. Why should I use a drug with lower-level evidence?",
                    options: [
                        {
                            text: "That's a great observation. The category difference reflects the type and level of evidence available at the time of the guideline update. Our pivotal trial published after the last review deadline. Are you familiar with the specific data that was considered?",
                            nextStage: "stage_2a",
                            relationshipChange: 10,
                            complianceStatus: "safe",
                            feedback: "Good approach - acknowledging the guideline while providing context."
                        },
                        {
                            text: "The guidelines committee got it wrong. Our data is just as strong as the competitor's.",
                            nextStage: "stage_2b",
                            relationshipChange: -10,
                            complianceStatus: "risk",
                            feedback: "Criticizing guideline committees is unprofessional and inappropriate."
                        },
                        {
                            text: "Guidelines are just recommendations. Many physicians use our drug first-line regardless of what the guidelines say.",
                            nextStage: "stage_2c",
                            relationshipChange: -5,
                            complianceStatus: "risk",
                            feedback: "Encouraging deviation from guidelines is inappropriate."
                        }
                    ]
                },
                {
                    id: "stage_2a",
                    kolDialogue: "I know the recent trial data. But the fact remains that right now, the guidelines don't support using {drugName} first. How do you respond to that?",
                    options: [
                        {
                            text: "You're right - we need to work within the current guideline framework. For now, our drug is recommended in specific situations outlined in the guidelines. I expect the next update will incorporate the new data. In the meantime, I can share what the current labeling supports.",
                            nextStage: "stage_3a",
                            relationshipChange: 15,
                            complianceStatus: "safe",
                            insightOpportunity: true,
                            insightType: "clinical",
                            feedback: "Excellent - honest acknowledgment while setting expectations."
                        },
                        {
                            text: "There are ongoing discussions with the guidelines committee to upgrade our recommendation.",
                            nextStage: "stage_3b",
                            relationshipChange: 0,
                            complianceStatus: "risk",
                            feedback: "Implying insider information about guideline updates is inappropriate."
                        }
                    ]
                },
                {
                    id: "stage_2b",
                    kolDialogue: "I serve on the regional guidelines committee. I can assure you the review process is rigorous. Do you have specific concerns about the methodology?",
                    options: [
                        {
                            text: "I apologize - I shouldn't have characterized it that way. I have full respect for the guidelines process. What I should have said is that there's additional data that wasn't available for the last review cycle. May I walk through that data?",
                            nextStage: "stage_3a",
                            relationshipChange: 0,
                            complianceStatus: "safe",
                            feedback: "Good recovery with appropriate apology."
                        },
                        {
                            text: "I'm just saying that different committees might weigh the evidence differently.",
                            nextStage: "end_negative",
                            relationshipChange: -15,
                            complianceStatus: "risk",
                            feedback: "Doubling down damages the relationship further."
                        }
                    ]
                },
                {
                    id: "stage_2c",
                    kolDialogue: "I practice evidence-based medicine. I'm not interested in what 'many physicians' do - I want to know what the evidence supports.",
                    options: [
                        {
                            text: "You're absolutely right, and I apologize for that framing. Let me focus on the evidence. Our Phase 3 trial showed [specific outcomes]. The label supports use in [specific population]. That's what the data shows.",
                            nextStage: "stage_3a",
                            relationshipChange: 0,
                            complianceStatus: "safe",
                            feedback: "Good recovery returning to evidence-based discussion."
                        }
                    ]
                },
                {
                    id: "stage_3a",
                    kolDialogue: "Fair enough. I'm on the guidelines panel for the next review. What data would be most important for me to consider when we meet?",
                    options: [
                        {
                            text: "I can share the published data that's available since the last update. I should be clear that I'm not trying to influence your panel's decision - just ensuring you have access to all published evidence. The committee should weigh the data independently.",
                            nextStage: "end_positive",
                            relationshipChange: 20,
                            complianceStatus: "safe",
                            insightOpportunity: true,
                            insightType: "clinical",
                            feedback: "Perfect - facilitating access to evidence without influencing the process."
                        },
                        {
                            text: "I'll put together a package of all our data that supports a Category 1 recommendation. Let me know how I can help make the case.",
                            nextStage: "end_violation",
                            relationshipChange: -10,
                            complianceStatus: "violation",
                            complianceHit: 35,
                            feedback: "Offering to help 'make the case' to guidelines committees is attempting to improperly influence."
                        }
                    ]
                },
                {
                    id: "stage_3b",
                    kolDialogue: "What discussions? I'm on the committee and haven't heard anything.",
                    options: [
                        {
                            text: "I misspoke - I don't have any insider information about committee discussions. I meant that as new data publishes, it will be available for future reviews. I apologize for the confusion.",
                            nextStage: "end_neutral",
                            relationshipChange: -5,
                            complianceStatus: "safe",
                            feedback: "Appropriate correction of misleading statement."
                        }
                    ]
                },
                {
                    id: "end_positive",
                    kolDialogue: "I appreciate that approach. Send me the recent publications and I'll review them before our next committee meeting. And I'll form my own conclusions.",
                    isEnding: true,
                    outcome: "positive",
                    relationshipChange: 15
                },
                {
                    id: "end_neutral",
                    kolDialogue: "Alright. Let's move on.",
                    isEnding: true,
                    outcome: "neutral",
                    relationshipChange: 0
                },
                {
                    id: "end_negative",
                    kolDialogue: "I think this conversation has run its course. Thank you for your time.",
                    isEnding: true,
                    outcome: "negative",
                    relationshipChange: -10
                },
                {
                    id: "end_violation",
                    kolDialogue: "That's inappropriate. The guidelines process needs to be independent. I'm going to document this conversation.",
                    isEnding: true,
                    outcome: "compliance_crisis",
                    relationshipChange: -25,
                    triggerComplianceReview: true
                }
            ]
        },

        // Objection handling scenario - skeptical KOL
        skepticalKol: {
            id: "branch_skeptic_001",
            name: "The Skeptic",
            description: "KOL is dismissive and skeptical about your product",
            difficulty: "hard",
            stages: [
                {
                    id: "stage_1",
                    kolDialogue: "Look, I've seen a lot of drugs come and go. What makes yours any different? I'm not convinced the data justifies the cost to patients.",
                    options: [
                        {
                            text: "I appreciate your healthy skepticism - it's important for patient care. Rather than trying to convince you, could you share what specific concerns you have about the data? I'd like to understand your perspective.",
                            nextStage: "stage_2a_listen",
                            relationshipChange: 15,
                            complianceStatus: "safe",
                            insightOpportunity: true,
                            insightType: "competitive",
                            feedback: "Excellent - validating skepticism and seeking to understand concerns."
                        },
                        {
                            text: "Well, our Phase 3 data is pretty compelling. Let me walk you through the results - I think you'll see why we're excited.",
                            nextStage: "stage_2b_data",
                            relationshipChange: 0,
                            complianceStatus: "safe",
                            feedback: "Acceptable, but jumping to data without understanding objections may not address underlying concerns."
                        },
                        {
                            text: "With all due respect, all the major thought leaders are already using our drug. You might be falling behind current practice.",
                            nextStage: "stage_2c_pushback",
                            relationshipChange: -20,
                            complianceStatus: "risk",
                            feedback: "Using peer pressure and implying incompetence is unprofessional and potentially promotional."
                        }
                    ]
                },
                {
                    id: "stage_2a_listen",
                    kolDialogue: "Fine. My issue is that your primary endpoint was a surrogate marker. I want to see overall survival data, not just tumor shrinkage. My patients want to live longer, not just have smaller scans.",
                    options: [
                        {
                            text: "That's a fair point. While ORR was the primary endpoint for approval, we do have follow-up survival data I can share. The median OS was [X months] in the trial. I can also discuss the ongoing confirmatory study if you're interested.",
                            nextStage: "stage_3a_address",
                            relationshipChange: 15,
                            complianceStatus: "safe",
                            feedback: "Good acknowledgment of concern followed by relevant approved data."
                        },
                        {
                            text: "Response rate is actually well-correlated with survival in this tumor type. The FDA accepted it as an endpoint for good reason.",
                            nextStage: "stage_3b_defend",
                            relationshipChange: 5,
                            complianceStatus: "safe",
                            feedback: "Technically correct but may come across as dismissive of valid concern."
                        },
                        {
                            text: "Between us, the survival data looks even better but hasn't been published yet. Patients are doing really well long-term.",
                            nextStage: "stage_3c_violation",
                            relationshipChange: 5,
                            complianceStatus: "violation",
                            complianceHit: 30,
                            feedback: "Sharing unpublished survival data proactively is off-label promotion."
                        }
                    ]
                },
                {
                    id: "stage_2b_data",
                    kolDialogue: "*Sighs* Alright, but make it quick. I've heard this pitch before.",
                    options: [
                        {
                            text: "Actually, rather than a pitch, let me ask - what would change your mind? What data would you need to see to consider this drug for your patients?",
                            nextStage: "stage_3d_redirect",
                            relationshipChange: 10,
                            complianceStatus: "safe",
                            insightOpportunity: true,
                            feedback: "Smart pivot - understanding needs rather than pushing data."
                        },
                        {
                            text: "I'll be brief. The response rate was 65% with a median duration of 14 months. The safety profile was manageable with most AEs being Grade 1-2.",
                            nextStage: "stage_3b_defend",
                            relationshipChange: 5,
                            complianceStatus: "safe",
                            feedback: "Straightforward data presentation, though didn't address underlying skepticism."
                        }
                    ]
                },
                {
                    id: "stage_2c_pushback",
                    kolDialogue: "Excuse me? I've been practicing oncology for 25 years. I don't need a drug rep telling me I'm behind the times.",
                    options: [
                        {
                            text: "I sincerely apologize. That was inappropriate of me. I'm not here to tell you how to practice medicine - I'm here to share data and answer questions. I respect your experience and judgment.",
                            nextStage: "stage_3e_recover",
                            relationshipChange: -5,
                            complianceStatus: "safe",
                            feedback: "Good recovery. The relationship is damaged but salvageable."
                        },
                        {
                            text: "I didn't mean any offense. I'm just saying the data speaks for itself.",
                            nextStage: "end_negative",
                            relationshipChange: -15,
                            complianceStatus: "safe",
                            feedback: "Inadequate apology. The relationship is significantly damaged."
                        }
                    ]
                },
                {
                    id: "stage_3a_address",
                    kolDialogue: "Hmm. That OS data is more interesting. What about quality of life? I've heard the toxicity profile isn't trivial.",
                    options: [
                        {
                            text: "You're right to consider quality of life. The trial did include PRO measures. While there were Grade 3+ toxicities in about 25% of patients, most were manageable with dose modifications. I can share the detailed safety data if helpful.",
                            nextStage: "end_positive",
                            relationshipChange: 20,
                            complianceStatus: "safe",
                            insightOpportunity: true,
                            insightType: "safety",
                            feedback: "Excellent - balanced presentation of both efficacy and safety data."
                        },
                        {
                            text: "The toxicity is actually much better than chemotherapy alternatives. Patients tolerate it very well.",
                            nextStage: "end_neutral",
                            relationshipChange: 0,
                            complianceStatus: "risk",
                            feedback: "Making comparative claims without proper context is risky."
                        }
                    ]
                },
                {
                    id: "stage_3b_defend",
                    kolDialogue: "Numbers don't always tell the whole story. How are patients actually doing in the real world?",
                    options: [
                        {
                            text: "We're starting to see real-world data presented at recent congresses. I can share those abstracts with you. Though I should note real-world populations often differ from trial populations.",
                            nextStage: "end_positive",
                            relationshipChange: 15,
                            complianceStatus: "safe",
                            feedback: "Good - pointing to published real-world evidence with appropriate caveats."
                        },
                        {
                            text: "From what I hear informally from other physicians, patients are doing great. Way better than trial suggested.",
                            nextStage: "end_neutral",
                            relationshipChange: -5,
                            complianceStatus: "risk",
                            feedback: "Anecdotal claims without data are unprofessional."
                        }
                    ]
                },
                {
                    id: "stage_3c_violation",
                    kolDialogue: "That's interesting. Can you share that unpublished data? I'd like to see the specifics.",
                    options: [
                        {
                            text: "I apologize - I shouldn't have mentioned unpublished data. Let me stick to what's in the approved label and published literature. I can share those materials today.",
                            nextStage: "end_neutral",
                            relationshipChange: -10,
                            complianceStatus: "safe",
                            feedback: "Good recovery, but the initial violation still occurred."
                        },
                        {
                            text: "Sure, I'll send it to you. Just keep it between us.",
                            nextStage: "end_major_violation",
                            relationshipChange: 5,
                            complianceStatus: "violation",
                            complianceHit: 40,
                            feedback: "Sharing confidential unpublished data is a serious violation."
                        }
                    ]
                },
                {
                    id: "stage_3d_redirect",
                    kolDialogue: "That's actually a good question. I suppose if I saw convincing PFS benefit in the biomarker-positive subgroup, I might consider it for those specific patients.",
                    options: [
                        {
                            text: "That's helpful to know. Actually, we do have biomarker subgroup data in the label. In the [biomarker]-positive population, the PFS was [X months] vs [Y months]. Would you like me to walk through that analysis?",
                            nextStage: "end_positive",
                            relationshipChange: 25,
                            complianceStatus: "safe",
                            insightOpportunity: true,
                            feedback: "Excellent - matching data to specific stated needs."
                        }
                    ]
                },
                {
                    id: "stage_3e_recover",
                    kolDialogue: "Alright. Let's start over. What can you tell me about the approved indication specifically?",
                    options: [
                        {
                            text: "I appreciate you giving me another chance. The approved indication is [indication]. Would you like me to focus on the efficacy data, safety profile, or patient selection criteria?",
                            nextStage: "end_neutral",
                            relationshipChange: 10,
                            complianceStatus: "safe",
                            feedback: "Good recovery - letting the KOL direct the conversation."
                        }
                    ]
                },
                {
                    id: "end_positive",
                    kolDialogue: "This has been a better conversation than I expected. I'm still not fully convinced, but I'll review the data you've shared. Let's plan a follow-up.",
                    isEnding: true,
                    outcome: "positive",
                    relationshipChange: 10,
                    scheduleFollowUp: true
                },
                {
                    id: "end_neutral",
                    kolDialogue: "Alright, thanks for the information. I'll think about it.",
                    isEnding: true,
                    outcome: "neutral",
                    relationshipChange: 0
                },
                {
                    id: "end_negative",
                    kolDialogue: "I think we're done here. I'll reach out if I have questions.",
                    isEnding: true,
                    outcome: "negative",
                    relationshipChange: -10
                },
                {
                    id: "end_major_violation",
                    kolDialogue: "I think your company needs to review their training program. This conversation was inappropriate.",
                    isEnding: true,
                    outcome: "compliance_crisis",
                    relationshipChange: -30,
                    triggerComplianceReview: true
                }
            ]
        },

        // Cost/value objection scenario
        costObjection: {
            id: "branch_cost_001",
            name: "Cost Concerns",
            description: "KOL raises cost-effectiveness objections",
            difficulty: "medium",
            stages: [
                {
                    id: "stage_1",
                    kolDialogue: "Your drug costs $15,000 a month. How am I supposed to justify that to my patients when there are cheaper options available?",
                    options: [
                        {
                            text: "That's an important consideration for patient care. I can share the clinical data that supported the value assessment, and I can also connect you with our patient support programs that help with access. Would either of those be helpful?",
                            nextStage: "stage_2a_support",
                            relationshipChange: 10,
                            complianceStatus: "safe",
                            feedback: "Good approach - acknowledging concern and offering appropriate resources."
                        },
                        {
                            text: "The cost actually reflects the clinical benefit. When you factor in the improved outcomes, it's very cost-effective compared to the alternatives.",
                            nextStage: "stage_2b_value",
                            relationshipChange: 0,
                            complianceStatus: "risk",
                            feedback: "MSLs should be careful with economic/value claims - this is often promotional territory."
                        },
                        {
                            text: "I understand, but cost isn't really something I can discuss. I'm focused on the clinical data.",
                            nextStage: "stage_2c_redirect",
                            relationshipChange: -5,
                            complianceStatus: "safe",
                            feedback: "While boundaries are appropriate, completely dismissing a real patient care concern is unhelpful."
                        }
                    ]
                },
                {
                    id: "stage_2a_support",
                    kolDialogue: "What kind of patient support? I have patients who've already struggled to afford their current medications.",
                    options: [
                        {
                            text: "We have copay assistance for commercially insured patients, and a separate patient assistance program for those who are uninsured or underinsured. I can provide the contact information and eligibility criteria. We also have a dedicated nurse navigator program.",
                            nextStage: "stage_3a_helpful",
                            relationshipChange: 15,
                            complianceStatus: "safe",
                            insightOpportunity: true,
                            insightType: "access",
                            feedback: "Good - providing factual information about support resources."
                        },
                        {
                            text: "Between us, most patients end up paying very little out of pocket. We make sure cost isn't a barrier.",
                            nextStage: "stage_3b_risky",
                            relationshipChange: 5,
                            complianceStatus: "risk",
                            feedback: "Making broad financial guarantees is inappropriate and potentially misleading."
                        }
                    ]
                },
                {
                    id: "stage_2b_value",
                    kolDialogue: "That sounds like a company talking point. Do you have published pharmacoeconomic data to support that claim?",
                    options: [
                        {
                            text: "You're right to push back. I shouldn't have made that claim without published data. Let me focus on the clinical efficacy and safety data, which I can speak to directly.",
                            nextStage: "stage_3c_recover",
                            relationshipChange: 0,
                            complianceStatus: "safe",
                            feedback: "Good recovery - acknowledging the overreach."
                        },
                        {
                            text: "Yes, there's a cost-effectiveness analysis published in [journal] that shows favorable value. I can share that paper.",
                            nextStage: "stage_3a_helpful",
                            relationshipChange: 10,
                            complianceStatus: "safe",
                            feedback: "If peer-reviewed pharmacoeconomic data exists, sharing it is appropriate."
                        }
                    ]
                },
                {
                    id: "stage_2c_redirect",
                    kolDialogue: "Well, clinical data doesn't help my patients if they can't afford the treatment. That's a real-world consideration.",
                    options: [
                        {
                            text: "You're absolutely right, and I apologize for being dismissive. Access is critical. Let me share information about our patient support programs - that's something I can help with.",
                            nextStage: "stage_3a_helpful",
                            relationshipChange: 10,
                            complianceStatus: "safe",
                            feedback: "Good course correction - recognizing the importance of the question."
                        },
                        {
                            text: "I can have our account manager reach out to discuss pricing options.",
                            nextStage: "end_neutral",
                            relationshipChange: -5,
                            complianceStatus: "safe",
                            feedback: "Appropriate referral, but opportunity missed to provide helpful information."
                        }
                    ]
                },
                {
                    id: "stage_3a_helpful",
                    kolDialogue: "That's actually useful. Can you send me those program details? I have some patients who might benefit.",
                    options: [
                        {
                            text: "Absolutely. I'll send you the patient support information today. If you have specific patients in mind, I can also have our patient access specialist reach out to your office to help navigate the process.",
                            nextStage: "end_positive",
                            relationshipChange: 15,
                            complianceStatus: "safe",
                            feedback: "Excellent - providing practical help while maintaining appropriate boundaries."
                        }
                    ]
                },
                {
                    id: "stage_3b_risky",
                    kolDialogue: "That sounds too good to be true. What's the catch?",
                    options: [
                        {
                            text: "You're right to be skeptical. Eligibility does depend on insurance status and income. Let me give you the specific criteria rather than making general statements.",
                            nextStage: "end_neutral",
                            relationshipChange: 5,
                            complianceStatus: "safe",
                            feedback: "Good recovery - being more specific and accurate."
                        }
                    ]
                },
                {
                    id: "stage_3c_recover",
                    kolDialogue: "Fair enough. So what's the actual clinical benefit for my patients?",
                    options: [
                        {
                            text: "The key efficacy endpoints from the pivotal trial showed [specific approved data]. For safety, the most common adverse events were [specific approved data]. Would you like me to focus on any particular aspect?",
                            nextStage: "end_positive",
                            relationshipChange: 10,
                            complianceStatus: "safe",
                            feedback: "Good - staying within approved clinical data."
                        }
                    ]
                },
                {
                    id: "end_positive",
                    kolDialogue: "This has been helpful. I have a better understanding of the options now.",
                    isEnding: true,
                    outcome: "positive",
                    relationshipChange: 10
                },
                {
                    id: "end_neutral",
                    kolDialogue: "Okay, let me know if anything changes with the pricing.",
                    isEnding: true,
                    outcome: "neutral",
                    relationshipChange: 0
                }
            ]
        },

        // Adverse event reporting scenario
        adverseEventReport: {
            id: "branch_ae_001",
            name: "Safety Signal",
            description: "KOL reports a potential adverse event during conversation",
            difficulty: "medium",
            stages: [
                {
                    id: "stage_1",
                    kolDialogue: "Before we continue, I need to mention something. One of my patients on {drugName} was hospitalized last week with severe liver enzyme elevations. I've reported it to the FDA, but I thought you should know too.",
                    options: [
                        {
                            text: "Thank you for sharing that - this is exactly the kind of information our safety team needs to hear. I need to document this as an adverse event. Can you provide some additional details about the patient and the event?",
                            nextStage: "stage_2a_proper",
                            relationshipChange: 15,
                            complianceStatus: "safe",
                            insightOpportunity: true,
                            insightType: "safety",
                            feedback: "Excellent - recognizing and properly escalating a safety signal."
                        },
                        {
                            text: "I'm sorry to hear that. Liver enzyme elevations are listed in the prescribing information though, so it's not unexpected. Let's move on to discuss the efficacy data.",
                            nextStage: "stage_2b_dismissive",
                            relationshipChange: -15,
                            complianceStatus: "risk",
                            feedback: "Dismissing safety concerns is inappropriate. All AEs should be documented regardless of expectedness."
                        },
                        {
                            text: "That's concerning. How sure are you it was related to our drug? The patient was probably on other medications too.",
                            nextStage: "stage_2c_defensive",
                            relationshipChange: -10,
                            complianceStatus: "risk",
                            feedback: "Appearing defensive about safety reports damages trust. AEs must be reported regardless of causality."
                        }
                    ]
                },
                {
                    id: "stage_2a_proper",
                    kolDialogue: "Sure. The patient is a 62-year-old male, had been on {drugName} for about 3 months. ALT and AST were 5 times the upper limit of normal. They stopped the drug and the enzymes are improving. I have the labs if you need them.",
                    options: [
                        {
                            text: "I appreciate the detail. I'll document this carefully and ensure it's reported through our pharmacovigilance system within 24 hours. Would you be willing to be contacted by our medical safety team for follow-up if they have additional questions?",
                            nextStage: "end_ae_positive",
                            relationshipChange: 15,
                            complianceStatus: "safe",
                            feedback: "Perfect handling - gathering details, committing to proper reporting, and requesting consent for follow-up."
                        },
                        {
                            text: "Got it. I'll make a note. Was there anything else you wanted to discuss about the drug?",
                            nextStage: "stage_3_incomplete",
                            relationshipChange: -5,
                            complianceStatus: "risk",
                            feedback: "The response is inadequate - proper AE documentation requires more detail and a clear commitment to reporting."
                        }
                    ]
                },
                {
                    id: "stage_2b_dismissive",
                    kolDialogue: "Whether it's expected or not isn't the point. This was a serious event - the patient was hospitalized. Don't you need to report these things?",
                    options: [
                        {
                            text: "You're absolutely right, and I apologize. Let me correct my approach. Yes, all serious adverse events must be reported regardless of expectedness. Can you share the details so I can document this properly?",
                            nextStage: "end_ae_recovered",
                            relationshipChange: 5,
                            complianceStatus: "safe",
                            feedback: "Good recovery - acknowledging the mistake and getting back on track."
                        },
                        {
                            text: "We do have processes for reporting, but I'm the medical liaison, not the safety team. You should contact our drug safety department directly.",
                            nextStage: "end_ae_negative",
                            relationshipChange: -20,
                            complianceStatus: "violation",
                            complianceHit: 20,
                            feedback: "MSLs are obligated to collect and report AEs they become aware of. Deflecting is a compliance failure."
                        }
                    ]
                },
                {
                    id: "stage_2c_defensive",
                    kolDialogue: "Look, I've been practicing for 30 years. I know what a drug-induced liver injury looks like. The timing and pattern fit perfectly. I'm not accusing {drugName} of anything, but this needs to be on record.",
                    options: [
                        {
                            text: "I apologize - I didn't mean to question your clinical judgment. You're right that this needs to be documented properly. Can you share the patient details so I can report this through our pharmacovigilance system?",
                            nextStage: "end_ae_recovered",
                            relationshipChange: -5,
                            complianceStatus: "safe",
                            feedback: "Adequate recovery, though the initial defensiveness may have damaged trust."
                        },
                        {
                            text: "I understand. I'm just trying to make sure we have the complete picture before making any conclusions.",
                            nextStage: "end_ae_negative",
                            relationshipChange: -15,
                            complianceStatus: "risk",
                            feedback: "Still appearing defensive. The KOL is unlikely to report future AEs to you."
                        }
                    ]
                },
                {
                    id: "stage_3_incomplete",
                    kolDialogue: "That's it? This is a serious safety concern. I expected a more thorough response from someone in your position.",
                    options: [
                        {
                            text: "You're right, I should take this more seriously. Let me document this properly - I need the patient demographics, the specific lab values, timeline, and outcome. Our safety team may also want to follow up. What's the best contact for that?",
                            nextStage: "end_ae_recovered",
                            relationshipChange: 5,
                            complianceStatus: "safe",
                            feedback: "Good course correction after initial inadequate response."
                        }
                    ]
                },
                {
                    id: "end_ae_positive",
                    kolDialogue: "Good. I appreciate you taking this seriously. That's exactly how these things should be handled. I feel better knowing the information is getting to the right people.",
                    isEnding: true,
                    outcome: "positive",
                    relationshipChange: 15,
                    aeReported: true
                },
                {
                    id: "end_ae_recovered",
                    kolDialogue: "Okay, thank you. Here are the details. I'm glad we got this documented properly.",
                    isEnding: true,
                    outcome: "neutral",
                    relationshipChange: 0,
                    aeReported: true
                },
                {
                    id: "end_ae_negative",
                    kolDialogue: "I see. Well, I'll make sure the FDA has all the information they need. I'm disappointed in how this was handled.",
                    isEnding: true,
                    outcome: "negative",
                    relationshipChange: -20
                }
            ]
        }
    },

    // Gray-area compliance scenarios - situations where the right answer isn't obvious
    grayAreaScenarios: {
        urgentPatientNeed: {
            id: "gray_urgent_001",
            name: "Urgent Patient Need",
            description: "Physician needs information urgently for patient care",
            difficulty: "hard",
            moralComplexity: "high",
            stages: [
                {
                    id: "stage_1",
                    kolDialogue: "I have a patient in the hospital right now who isn't responding to standard treatment. I've heard {drugName} might help in this situation, but it's not the approved indication. I need to make a decision today. Can you help me?",
                    contextNote: "This is an urgent unsolicited medical information request. The physician is desperate to help their patient.",
                    options: [
                        {
                            text: "I understand the urgency. Since you're asking about an unapproved use, I can provide published literature if any exists. Let me check what peer-reviewed data is available and I'll call you back within the hour.",
                            nextStage: "stage_2a_literature",
                            relationshipChange: 15,
                            complianceStatus: "safe",
                            feedback: "Good approach - responding to unsolicited request with published literature on an appropriate timeline."
                        },
                        {
                            text: "I really want to help. Off the record, I've heard from other physicians that it works well in this situation. Here's what they typically do...",
                            nextStage: "stage_2b_informal",
                            relationshipChange: 10,
                            complianceStatus: "violation",
                            complianceHit: 25,
                            feedback: "There's no 'off the record' in MSL work. Sharing anecdotal practice recommendations is off-label promotion."
                        },
                        {
                            text: "I'm sorry, but I can only discuss approved indications. You should contact medical information for off-label questions.",
                            nextStage: "stage_2c_redirect",
                            relationshipChange: -10,
                            complianceStatus: "safe",
                            feedback: "Technically compliant, but you can respond to unsolicited requests - this was overly restrictive."
                        },
                        {
                            text: "Given the urgency, let me connect you directly with our medical director who can provide a more complete scientific perspective on this situation.",
                            nextStage: "stage_2d_escalate",
                            relationshipChange: 10,
                            complianceStatus: "safe",
                            feedback: "Appropriate escalation for a complex situation while acknowledging urgency."
                        }
                    ]
                },
                {
                    id: "stage_2a_literature",
                    kolDialogue: "Thank you. Is there anything at all in the literature? Even case reports?",
                    options: [
                        {
                            text: "I found two case reports and one small retrospective study. I'll send these to you now with the caveat that this represents limited evidence and {drugName} isn't approved for this use. The decision is yours as the treating physician.",
                            nextStage: "end_positive",
                            relationshipChange: 20,
                            complianceStatus: "safe",
                            insightOpportunity: true,
                            insightType: "unmet-need",
                            feedback: "Excellent - provided appropriate response to unsolicited request with proper context."
                        }
                    ]
                },
                {
                    id: "stage_2b_informal",
                    kolDialogue: "I appreciate that. What dose are they using?",
                    options: [
                        {
                            text: "I shouldn't have offered that information informally. Let me step back and provide you with the published literature instead, which is the appropriate way to handle this.",
                            nextStage: "end_neutral",
                            relationshipChange: -5,
                            complianceStatus: "safe",
                            feedback: "Good recovery, but the initial informal advice was inappropriate."
                        },
                        {
                            text: "Usually about 1.5 times the standard dose, but monitor closely for toxicity.",
                            nextStage: "end_major_violation",
                            relationshipChange: 5,
                            complianceStatus: "violation",
                            complianceHit: 35,
                            feedback: "Providing specific off-label dosing recommendations is a serious violation."
                        }
                    ]
                },
                {
                    id: "stage_2c_redirect",
                    kolDialogue: "The medical information line takes 48 hours. My patient doesn't have 48 hours. I thought MSLs were supposed to be scientific resources.",
                    options: [
                        {
                            text: "You're right, and I apologize. Since this is an unsolicited request, I can actually help. Let me search the published literature and get back to you within the hour with what's available.",
                            nextStage: "stage_2a_literature",
                            relationshipChange: 5,
                            complianceStatus: "safe",
                            feedback: "Good recovery - recognizing that you can respond to unsolicited requests."
                        }
                    ]
                },
                {
                    id: "stage_2d_escalate",
                    kolDialogue: "That would be helpful. Can they call me in the next hour?",
                    options: [
                        {
                            text: "I'll contact them immediately and explain the urgency. In the meantime, let me also search for any published literature I can send you right away.",
                            nextStage: "end_positive",
                            relationshipChange: 15,
                            complianceStatus: "safe",
                            feedback: "Excellent - multi-pronged approach to help within appropriate boundaries."
                        }
                    ]
                },
                {
                    id: "end_positive",
                    kolDialogue: "Thank you for being responsive and helpful while staying professional. I really appreciate it.",
                    isEnding: true,
                    outcome: "positive",
                    relationshipChange: 15
                },
                {
                    id: "end_neutral",
                    kolDialogue: "Understood. I'll review what you can send.",
                    isEnding: true,
                    outcome: "neutral",
                    relationshipChange: 0
                },
                {
                    id: "end_major_violation",
                    kolDialogue: "Thanks. I'll try that approach.",
                    isEnding: true,
                    outcome: "compliance_crisis",
                    relationshipChange: 5,
                    triggerComplianceReview: true,
                    noteToPlayer: "Even when trying to help patients, providing off-label dosing guidance exposes both you and your company to significant legal and regulatory risk."
                }
            ]
        },
        speakerInvitation: {
            id: "gray_speaker_001",
            name: "Speaker Opportunity",
            description: "KOL asks about speaker bureau opportunities",
            difficulty: "medium",
            moralComplexity: "high",
            stages: [
                {
                    id: "stage_1",
                    kolDialogue: "I really enjoy working with your company. I've been wondering - how do I get invited to be a speaker for your programs? I hear they pay quite well.",
                    contextNote: "The KOL is inquiring about paid speaker opportunities. The motivation (genuine interest vs. financial) is unclear.",
                    options: [
                        {
                            text: "Speaker selection is handled by a separate team based on scientific expertise and regional needs. I can let them know you're interested, but I don't have influence over the selection process.",
                            nextStage: "stage_2a_appropriate",
                            relationshipChange: 5,
                            complianceStatus: "safe",
                            feedback: "Appropriate response - informative without promising or appearing to create quid pro quo."
                        },
                        {
                            text: "You've been a great advocate for our science. I'll definitely put in a good word for you. Keep up the support and I'm sure something will come through.",
                            nextStage: "stage_2b_quidproquo",
                            relationshipChange: 15,
                            complianceStatus: "violation",
                            complianceHit: 40,
                            feedback: "This implies a quid pro quo relationship between advocacy and financial reward - a serious anti-kickback concern."
                        },
                        {
                            text: "Speaker programs are managed separately from the MSL function. I focus purely on scientific exchange. But I can provide contact information for that team if you're interested.",
                            nextStage: "stage_2c_boundary",
                            relationshipChange: 0,
                            complianceStatus: "safe",
                            feedback: "Clear boundary-setting while still being helpful."
                        },
                        {
                            text: "I'm curious - what draws you to the speaker programs? Is it the educational mission or primarily the compensation?",
                            nextStage: "stage_2d_probe",
                            relationshipChange: 0,
                            complianceStatus: "safe",
                            insightOpportunity: true,
                            insightType: "clinical",
                            feedback: "Insightful question that helps understand motivation without committing."
                        }
                    ]
                },
                {
                    id: "stage_2a_appropriate",
                    kolDialogue: "I understand. Is there anything I should do to increase my chances?",
                    options: [
                        {
                            text: "The program values physicians who have genuine clinical experience and can speak authentically about the disease state. Publication record and teaching experience are typically considered. But ultimately it's their decision based on regional program needs.",
                            nextStage: "end_positive",
                            relationshipChange: 10,
                            complianceStatus: "safe",
                            feedback: "Factual information about typical criteria without promising anything."
                        },
                        {
                            text: "Just keep prescribing our drug and giving positive feedback. The more you use it, the more likely you'll be noticed.",
                            nextStage: "end_major_violation",
                            relationshipChange: 10,
                            complianceStatus: "violation",
                            complianceHit: 50,
                            feedback: "This directly links prescribing behavior to speaker opportunities - a clear kickback violation."
                        }
                    ]
                },
                {
                    id: "stage_2b_quidproquo",
                    kolDialogue: "That's great to hear. So if I keep supporting {drugName}, you'll get me on the speaker list?",
                    options: [
                        {
                            text: "I apologize - I misspoke. There's no connection between prescribing or advocacy and speaker selection. Let me clarify that the selection process is based on scientific credentials and is completely independent of any commercial relationship.",
                            nextStage: "end_neutral",
                            relationshipChange: -10,
                            complianceStatus: "safe",
                            feedback: "Important correction, but the initial implication was problematic."
                        },
                        {
                            text: "Exactly. We take care of people who take care of us.",
                            nextStage: "end_major_violation",
                            relationshipChange: 15,
                            complianceStatus: "violation",
                            complianceHit: 60,
                            feedback: "This is a clear kickback statement with potentially criminal implications."
                        }
                    ]
                },
                {
                    id: "stage_2c_boundary",
                    kolDialogue: "Fair enough. So what value do you actually provide as an MSL if not connecting me to opportunities?",
                    options: [
                        {
                            text: "My role is scientific exchange - answering clinical questions, sharing data, gathering insights about practice patterns, and supporting research collaboration through our IIS program. I can add tremendous scientific value, just not commercial opportunities.",
                            nextStage: "end_positive",
                            relationshipChange: 10,
                            complianceStatus: "safe",
                            feedback: "Clear articulation of the MSL role and value proposition."
                        }
                    ]
                },
                {
                    id: "stage_2d_probe",
                    kolDialogue: "Honestly? Both. I enjoy teaching, but the extra income doesn't hurt. Medical education is valuable, and compensation recognizes that value.",
                    options: [
                        {
                            text: "That's a fair perspective. Speakers provide valuable education to their peers. If you're genuinely interested, I can share the contact information for our speaker programs team. They evaluate candidates based on expertise and regional needs.",
                            nextStage: "end_positive",
                            relationshipChange: 10,
                            complianceStatus: "safe",
                            insightOpportunity: true,
                            feedback: "Acknowledging their perspective while maintaining appropriate boundaries."
                        }
                    ]
                },
                {
                    id: "end_positive",
                    kolDialogue: "I appreciate the honest conversation. Let's focus on the science for now.",
                    isEnding: true,
                    outcome: "positive",
                    relationshipChange: 10
                },
                {
                    id: "end_neutral",
                    kolDialogue: "I see. Thanks for clarifying.",
                    isEnding: true,
                    outcome: "neutral",
                    relationshipChange: -5
                },
                {
                    id: "end_major_violation",
                    kolDialogue: "Good to know the arrangement.",
                    isEnding: true,
                    outcome: "compliance_crisis",
                    relationshipChange: 15,
                    triggerComplianceReview: true,
                    noteToPlayer: "Creating any appearance of pay-for-prescribe or quid pro quo can result in criminal charges under anti-kickback statutes."
                }
            ]
        },
        competitorBashing: {
            id: "gray_competitor_001",
            name: "Competitor Criticism",
            description: "KOL shares negative competitor experience and invites you to agree",
            difficulty: "medium",
            moralComplexity: "medium",
            stages: [
                {
                    id: "stage_1",
                    kolDialogue: "I've had three patients fail on [Competitor Drug] this month. Terrible drug if you ask me. I bet you see this all the time - surely {drugName} is better for these patients, right?",
                    contextNote: "The KOL is inviting you to criticize a competitor and make comparative claims.",
                    options: [
                        {
                            text: "I appreciate you sharing that experience. I'm not in a position to comment on competitor performance, but I'd be interested to understand what outcomes you were hoping to see and what happened with these patients.",
                            nextStage: "stage_2a_redirect",
                            relationshipChange: 5,
                            complianceStatus: "safe",
                            insightOpportunity: true,
                            insightType: "competitive",
                            feedback: "Good deflection that gathers insight without disparaging competitors."
                        },
                        {
                            text: "Yes, we hear that a lot. [Competitor Drug] has a lot of problems. Our drug is definitely the better choice.",
                            nextStage: "stage_2b_agree",
                            relationshipChange: 10,
                            complianceStatus: "violation",
                            complianceHit: 20,
                            feedback: "Disparaging competitors and making unsupported superiority claims is promotional and potentially defamatory."
                        },
                        {
                            text: "I can only speak to our own data. Without head-to-head trials, I can't make direct comparisons. What I can do is walk you through our clinical evidence and let you draw your own conclusions.",
                            nextStage: "stage_2c_neutral",
                            relationshipChange: 5,
                            complianceStatus: "safe",
                            feedback: "Appropriate response that stays within evidence-based discussion."
                        },
                        {
                            text: "Those are interesting cases. Would you be willing to share more details about what happened? Understanding these patterns could be valuable for the medical community.",
                            nextStage: "stage_2d_insight",
                            relationshipChange: 10,
                            complianceStatus: "safe",
                            insightOpportunity: true,
                            insightType: "competitive",
                            feedback: "Excellent - turning the situation into an insight-gathering opportunity."
                        }
                    ]
                },
                {
                    id: "stage_2a_redirect",
                    kolDialogue: "They expected durable responses but progressed within three months. Do you see longer responses with {drugName}?",
                    options: [
                        {
                            text: "Our pivotal trial showed specific duration of response data. The median DOR was X months in patients with [characteristics]. I can share that data with you, though every patient is different.",
                            nextStage: "end_positive",
                            relationshipChange: 10,
                            complianceStatus: "safe",
                            feedback: "Focused on your own data without comparative claims."
                        }
                    ]
                },
                {
                    id: "stage_2b_agree",
                    kolDialogue: "See, I knew it! What specifically makes {drugName} better?",
                    options: [
                        {
                            text: "Let me step back - I shouldn't have characterized it that way. Without head-to-head data, I can't make comparative claims. Let me focus on what our data does show.",
                            nextStage: "end_neutral",
                            relationshipChange: -5,
                            complianceStatus: "safe",
                            feedback: "Good correction, but initial comment was inappropriate."
                        },
                        {
                            text: "Better efficacy, better safety, better dosing. Honestly, there's no comparison.",
                            nextStage: "end_major_violation",
                            relationshipChange: 15,
                            complianceStatus: "violation",
                            complianceHit: 30,
                            feedback: "Multiple unsupported superiority claims compounding the violation."
                        }
                    ]
                },
                {
                    id: "stage_2c_neutral",
                    kolDialogue: "Fair enough. Show me what you've got.",
                    options: [
                        {
                            text: "Here's our Phase 3 data. You'll see the response rates, duration of response, and safety profile. I'm happy to discuss any questions about our specific data.",
                            nextStage: "end_positive",
                            relationshipChange: 10,
                            complianceStatus: "safe",
                            feedback: "Staying focused on your own evidence - appropriate approach."
                        }
                    ]
                },
                {
                    id: "stage_2d_insight",
                    kolDialogue: "Sure. All three had prior checkpoint inhibitor exposure and progressed on standard doses. I'm seeing more of these refractory patients lately.",
                    options: [
                        {
                            text: "That's a really valuable observation about the refractory patient population. This is exactly the kind of insight that helps inform research priorities. May I document this for our medical team? It could help shape future clinical development.",
                            nextStage: "end_positive",
                            relationshipChange: 15,
                            complianceStatus: "safe",
                            insightOpportunity: true,
                            insightType: "clinical",
                            feedback: "Excellent insight capture while building relationship."
                        }
                    ]
                },
                {
                    id: "end_positive",
                    kolDialogue: "This is the kind of scientific discussion I value. Let's stay in touch.",
                    isEnding: true,
                    outcome: "positive",
                    relationshipChange: 10
                },
                {
                    id: "end_neutral",
                    kolDialogue: "Alright, show me the data.",
                    isEnding: true,
                    outcome: "neutral",
                    relationshipChange: 0
                },
                {
                    id: "end_major_violation",
                    kolDialogue: "That's bold! I like the confidence.",
                    isEnding: true,
                    outcome: "compliance_crisis",
                    relationshipChange: 10,
                    triggerComplianceReview: true,
                    noteToPlayer: "Making comparative efficacy or safety claims without head-to-head data is false or misleading promotion."
                }
            ]
        },
        socialBoundary: {
            id: "gray_social_001",
            name: "Social Invitation",
            description: "KOL invites you to an event that blurs professional boundaries",
            difficulty: "medium",
            moralComplexity: "medium",
            stages: [
                {
                    id: "stage_1",
                    kolDialogue: "Hey, I'm having a birthday party at my house next weekend. Nothing work-related, just friends and colleagues. You should come! You've been so helpful, and I'd like to get to know you better outside of work.",
                    contextNote: "A KOL is inviting you to a personal social event. The relationship benefit is clear, but there are gift/entertainment policy considerations.",
                    options: [
                        {
                            text: "I appreciate the invitation, and I genuinely enjoy working with you. However, our company's policies around social interactions with healthcare providers are pretty strict. I wouldn't want to put either of us in an awkward position.",
                            nextStage: "stage_2a_decline",
                            relationshipChange: 0,
                            complianceStatus: "safe",
                            feedback: "Appropriate boundary-setting while preserving the relationship."
                        },
                        {
                            text: "That sounds great! I'd love to come. What should I bring?",
                            nextStage: "stage_2b_accept",
                            relationshipChange: 15,
                            complianceStatus: "risk",
                            feedback: "Accepting personal invitations from KOLs can create perceived conflicts of interest."
                        },
                        {
                            text: "That's very kind. I need to check our company guidelines on attending personal events with healthcare providers. Can I get back to you?",
                            nextStage: "stage_2c_check",
                            relationshipChange: 5,
                            complianceStatus: "safe",
                            feedback: "Appropriate response - checking policy before committing."
                        }
                    ]
                },
                {
                    id: "stage_2a_decline",
                    kolDialogue: "I understand. I didn't mean to put you in an uncomfortable position. Maybe we can grab coffee sometime instead - more neutral territory?",
                    options: [
                        {
                            text: "Coffee to discuss science would be perfectly appropriate. I'd enjoy that. Let's find a time that works.",
                            nextStage: "end_positive",
                            relationshipChange: 10,
                            complianceStatus: "safe",
                            feedback: "Finding appropriate alternatives to maintain relationship."
                        }
                    ]
                },
                {
                    id: "stage_2b_accept",
                    kolDialogue: "Great! It'll be casual - bring whatever you like. My wife makes amazing cocktails.",
                    options: [
                        {
                            text: "Actually, let me check our company guidelines first. I want to make sure this is something I can do appropriately. I'll get back to you.",
                            nextStage: "stage_2c_check",
                            relationshipChange: -5,
                            complianceStatus: "safe",
                            feedback: "Good to reconsider before fully committing."
                        },
                        {
                            text: "Perfect! I'll bring a nice bottle of wine.",
                            nextStage: "end_risky",
                            relationshipChange: 20,
                            complianceStatus: "risk",
                            feedback: "Accepting invitation and bringing a gift further blurs professional boundaries."
                        }
                    ]
                },
                {
                    id: "stage_2c_check",
                    kolDialogue: "Of course, no pressure. Let me know what you find out.",
                    options: [
                        {
                            text: "I checked and while it's not strictly prohibited, I think it's best to keep our relationship professional. How about we schedule a meeting at your office instead? I have some new data that might interest you.",
                            nextStage: "end_positive",
                            relationshipChange: 5,
                            complianceStatus: "safe",
                            feedback: "Appropriate redirection to professional context."
                        }
                    ]
                },
                {
                    id: "end_positive",
                    kolDialogue: "I respect that professionalism. Let's definitely find time to meet.",
                    isEnding: true,
                    outcome: "positive",
                    relationshipChange: 5
                },
                {
                    id: "end_risky",
                    kolDialogue: "See you Saturday!",
                    isEnding: true,
                    outcome: "neutral",
                    relationshipChange: 15,
                    noteToPlayer: "While not always prohibited, personal social relationships with KOLs can create perceived conflicts of interest and should be carefully considered."
                }
            ]
        },
        dataRequest: {
            id: "gray_data_001",
            name: "Unpublished Data Request",
            description: "KOL requests access to unpublished clinical trial data",
            difficulty: "hard",
            moralComplexity: "high",
            stages: [
                {
                    id: "stage_1",
                    kolDialogue: "I'm writing a review article on treatments in this space. I know you have interim data from your ongoing Phase 3 study. Can you share that with me for the publication? It would really strengthen my paper.",
                    contextNote: "The KOL wants unpublished data for their publication. This raises data embargo and fair balance concerns.",
                    options: [
                        {
                            text: "I understand the interest, but interim data from ongoing studies isn't something I can share. Once the data is published or presented at congress, I'd be happy to discuss it. I can share all currently published data on our program.",
                            nextStage: "stage_2a_decline",
                            relationshipChange: -5,
                            complianceStatus: "safe",
                            feedback: "Appropriate response - protecting data integrity and embargo."
                        },
                        {
                            text: "I can't give you the official data, but let me tell you off the record - the results are very positive. The response rate is looking like about 65%.",
                            nextStage: "stage_2b_leak",
                            relationshipChange: 10,
                            complianceStatus: "violation",
                            complianceHit: 40,
                            feedback: "Disclosing unpublished interim data is a serious violation with potential SEC and regulatory implications."
                        },
                        {
                            text: "Our policy is that all data requests go through our data sharing committee. I can provide you with the contact information and the process for requesting access to clinical trial data.",
                            nextStage: "stage_2c_process",
                            relationshipChange: 0,
                            complianceStatus: "safe",
                            feedback: "Appropriate referral to formal data request process."
                        },
                        {
                            text: "I can share the study design and what endpoints we're looking at. That's public information from clinicaltrials.gov. The results will need to wait for publication.",
                            nextStage: "stage_2d_partial",
                            relationshipChange: 5,
                            complianceStatus: "safe",
                            feedback: "Good balance - helpful with public information while protecting unpublished data."
                        }
                    ]
                },
                {
                    id: "stage_2a_decline",
                    kolDialogue: "That's frustrating. When will the data be published? My review has a deadline.",
                    options: [
                        {
                            text: "I understand the time pressure. The data is expected to be presented at [upcoming congress] and published shortly after. Your review could reference the study design as ongoing with results expected. I can alert you as soon as it's public.",
                            nextStage: "end_positive",
                            relationshipChange: 10,
                            complianceStatus: "safe",
                            feedback: "Helpful within appropriate boundaries."
                        }
                    ]
                },
                {
                    id: "stage_2b_leak",
                    kolDialogue: "That's great news! Can you give me any more details? What about the safety data?",
                    options: [
                        {
                            text: "I've already said too much. Please don't include any of this in your paper - this is embargoed data and I shouldn't have shared it. Let me point you to the published information only.",
                            nextStage: "end_neutral",
                            relationshipChange: -10,
                            complianceStatus: "safe",
                            feedback: "Attempting to walk back, but the disclosure already occurred."
                        },
                        {
                            text: "Safety looks clean too. Around 15% Grade 3+ events, mostly manageable. You could say 'preliminary data suggests a favorable profile.'",
                            nextStage: "end_major_violation",
                            relationshipChange: 15,
                            complianceStatus: "violation",
                            complianceHit: 50,
                            feedback: "Compounding the violation by sharing more unpublished data and suggesting how to use it."
                        }
                    ]
                },
                {
                    id: "stage_2c_process",
                    kolDialogue: "That sounds bureaucratic. Can't you just help me out as a colleague?",
                    options: [
                        {
                            text: "I understand it's not ideal, but these processes exist for good reasons - data integrity, patient privacy, and scientific rigor. I'm genuinely trying to be helpful by pointing you to the right channel.",
                            nextStage: "end_positive",
                            relationshipChange: 5,
                            complianceStatus: "safe",
                            feedback: "Standing firm on process while being respectful."
                        }
                    ]
                },
                {
                    id: "stage_2d_partial",
                    kolDialogue: "That's helpful for context. Can you at least tell me if the trial is on track? No details, just a sense of whether it's going well?",
                    options: [
                        {
                            text: "I can tell you the trial is enrolling on schedule and we haven't announced any changes to the design or endpoints. Beyond that, I need to wait for the official data release.",
                            nextStage: "end_positive",
                            relationshipChange: 10,
                            complianceStatus: "safe",
                            feedback: "Carefully limited response with only public information."
                        },
                        {
                            text: "Between us, yes, it's going very well. The company wouldn't be planning the launch if it wasn't.",
                            nextStage: "end_risky",
                            relationshipChange: 10,
                            complianceStatus: "risk",
                            feedback: "Providing positive sentiment about unpublished data is still problematic."
                        }
                    ]
                },
                {
                    id: "end_positive",
                    kolDialogue: "I appreciate your professionalism. Let me know when the data is available.",
                    isEnding: true,
                    outcome: "positive",
                    relationshipChange: 10
                },
                {
                    id: "end_neutral",
                    kolDialogue: "Understood. I'll work with what's published.",
                    isEnding: true,
                    outcome: "neutral",
                    relationshipChange: -5
                },
                {
                    id: "end_risky",
                    kolDialogue: "Good to know. I'll keep that in mind.",
                    isEnding: true,
                    outcome: "neutral",
                    relationshipChange: 5,
                    noteToPlayer: "Even vague positive statements about unpublished data can influence investment decisions and publication integrity."
                },
                {
                    id: "end_major_violation",
                    kolDialogue: "This is very helpful for my review. Thanks for being so open.",
                    isEnding: true,
                    outcome: "compliance_crisis",
                    relationshipChange: 15,
                    triggerComplianceReview: true,
                    noteToPlayer: "Disclosing unpublished clinical trial data can violate SEC regulations, publication ethics, and company data integrity policies."
                }
            ]
        }
    },

    // Insight categories
    insightCategories: {
        "unmet-need": {
            name: "Unmet Medical Need",
            description: "Gaps in current treatment options or patient care",
            value: "high",
            examples: ["Patients failing current therapies", "Need for better tolerability", "Desire for oral formulations"]
        },
        "competitive": {
            name: "Competitive Intelligence",
            description: "Information about competitor products or strategies",
            value: "high",
            examples: ["Switching patterns", "Competitor clinical experience", "Pipeline awareness"]
        },
        "clinical": {
            name: "Clinical Practice Pattern",
            description: "How physicians are using therapies in practice",
            value: "medium",
            examples: ["Treatment sequencing", "Combination approaches", "Dosing modifications"]
        },
        "safety": {
            name: "Safety Observation",
            description: "Real-world safety signals or management strategies",
            value: "high",
            examples: ["Adverse event reports", "Management protocols", "Long-term tolerability"]
        },
        "access": {
            name: "Access/Reimbursement",
            description: "Insurance coverage and access barriers",
            value: "medium",
            examples: ["Prior authorization challenges", "Step therapy requirements", "Regional variations"]
        }
    }
};

// Export for use in main game
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GameData;
}
