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

    // Therapeutic areas
    therapeuticAreas: {
        oncology: {
            name: "Oncology",
            description: "High-science therapeutic area with rapidly evolving treatment landscape. Complex regimens and significant unmet needs.",
            complexity: "high",
            kolDensity: "high"
        },
        immunology: {
            name: "Immunology",
            description: "Autoimmune and inflammatory conditions with biologic therapies. Growing competitive landscape.",
            complexity: "medium-high",
            kolDensity: "medium"
        },
        neurology: {
            name: "Neurology",
            description: "CNS disorders with challenging trial endpoints. Long development cycles and high unmet needs.",
            complexity: "high",
            kolDensity: "medium"
        },
        cardiology: {
            name: "Cardiology",
            description: "Cardiovascular disease with established guidelines. Large patient populations and outcome-driven evidence.",
            complexity: "medium",
            kolDensity: "high"
        },
        "rare-disease": {
            name: "Rare Disease",
            description: "Small patient populations with limited treatment options. Close-knit KOL community and unique challenges.",
            complexity: "high",
            kolDensity: "low"
        }
    },

    // Territories with different difficulties and characteristics
    territories: {
        northeast: {
            name: "Northeast Corridor",
            region: "Boston - NYC - Philadelphia",
            difficulty: "hard",
            description: "Dense concentration of academic medical centers and research institutions. Highly sophisticated KOLs who expect deep scientific engagement. Competitive environment with many pharma companies vying for attention.",
            characteristics: {
                academicCenters: 12,
                communityHospitals: 8,
                privatePractices: 15,
                researchInstitutions: 6,
                kolCount: 45,
                tier1Kols: 12,
                competitorPresence: "Very High",
                travelRequirement: "Moderate"
            },
            challenges: [
                "Time-constrained KOLs with packed schedules",
                "High expectations for scientific depth",
                "Multiple competing MSLs seeking same KOLs",
                "Urban traffic and scheduling complexity"
            ],
            advantages: [
                "Access to thought leaders",
                "Major congress attendance",
                "Clinical trial site opportunities",
                "High insight generation potential"
            ]
        },
        midwest: {
            name: "Great Lakes Region",
            region: "Chicago - Detroit - Minneapolis",
            difficulty: "medium",
            description: "Mix of major academic centers and community practices. Strong focus on practical, real-world evidence. KOLs value relationship building and consistent presence.",
            characteristics: {
                academicCenters: 6,
                communityHospitals: 14,
                privatePractices: 20,
                researchInstitutions: 3,
                kolCount: 35,
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
                "Longer appointment times",
                "Genuine relationship building"
            ]
        },
        southeast: {
            name: "Southeast Region",
            region: "Atlanta - Miami - Nashville",
            difficulty: "medium",
            description: "Growing healthcare market with expanding academic programs. Diverse patient populations and evolving treatment patterns.",
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
                "Hurricane season disruptions"
            ],
            advantages: [
                "Growing market opportunity",
                "Emerging KOL development",
                "Strong community connections",
                "Receptive to new therapies"
            ]
        },
        southwest: {
            name: "Texas Triangle",
            region: "Houston - Dallas - San Antonio",
            difficulty: "easy",
            description: "Large, growing healthcare market with major medical centers. Strong focus on value-based care and diverse populations.",
            characteristics: {
                academicCenters: 4,
                communityHospitals: 12,
                privatePractices: 30,
                researchInstitutions: 3,
                kolCount: 28,
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
                "Strong MD Anderson presence",
                "Accessible KOLs"
            ]
        },
        westcoast: {
            name: "Pacific Coast",
            region: "San Francisco - Los Angeles - Seattle",
            difficulty: "hard",
            description: "Innovation hub with leading research institutions. Early adopters of new therapies but skeptical of pharma. Strong focus on evidence-based medicine.",
            characteristics: {
                academicCenters: 8,
                communityHospitals: 10,
                privatePractices: 18,
                researchInstitutions: 7,
                kolCount: 38,
                tier1Kols: 10,
                competitorPresence: "High",
                travelRequirement: "High"
            },
            challenges: [
                "Skeptical of pharmaceutical industry",
                "High evidence standards",
                "Expensive operating environment",
                "Traffic and scheduling challenges"
            ],
            advantages: [
                "Early adopter community",
                "Innovation-focused",
                "Strong research partnerships",
                "Influential publications"
            ]
        },
        mountain: {
            name: "Mountain West",
            region: "Denver - Phoenix - Salt Lake City",
            difficulty: "easy",
            description: "Emerging healthcare market with growing populations. Strong outdoor lifestyle focus and integrated health systems.",
            characteristics: {
                academicCenters: 3,
                communityHospitals: 10,
                privatePractices: 22,
                researchInstitutions: 2,
                kolCount: 22,
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
                preferredInteraction: "Scheduled meetings with prepared data presentations"
            },
            {
                titleTemplate: "Division Chief, {TA}",
                institutionTypes: ["University Hospital", "Academic Medical Center"],
                interests: ["Department Leadership", "Residency Training", "Quality Improvement"],
                personality: ["Strategic thinker", "Politically aware", "Results-oriented"],
                preferredInteraction: "Brief, efficient meetings with clear objectives"
            },
            {
                titleTemplate: "Director of Clinical Research",
                institutionTypes: ["Research Institute", "Academic Center"],
                interests: ["Trial Design", "Biomarkers", "Translational Research"],
                personality: ["Methodical", "Detail-oriented", "Skeptical"],
                preferredInteraction: "Deep scientific discussions with primary data"
            }
        ],
        community: [
            {
                titleTemplate: "{TA} Specialist",
                institutionTypes: ["Community Hospital", "Regional Medical Center"],
                interests: ["Patient Outcomes", "Practical Application", "Cost-effectiveness"],
                personality: ["Practical", "Patient-focused", "Accessible"],
                preferredInteraction: "Informal discussions between patients"
            },
            {
                titleTemplate: "Medical Director, {TA} Services",
                institutionTypes: ["Community Health System", "Regional Hospital Network"],
                interests: ["Protocol Development", "Staff Education", "Quality Metrics"],
                personality: ["Administrative", "Team-oriented", "Efficiency-focused"],
                preferredInteraction: "Lunch meetings with team involvement"
            }
        ],
        private: [
            {
                titleTemplate: "{TA} Physician",
                institutionTypes: ["Private Practice", "Specialty Clinic", "Medical Group"],
                interests: ["Patient Care", "Practice Efficiency", "Reimbursement"],
                personality: ["Entrepreneurial", "Relationship-driven", "Time-conscious"],
                preferredInteraction: "Brief office visits with samples/resources"
            }
        ]
    },

    // First and last names for generating KOLs
    names: {
        firstNames: ["James", "Sarah", "Michael", "Jennifer", "David", "Lisa", "Robert", "Michelle", "William", "Amanda", "Richard", "Emily", "Thomas", "Jessica", "Christopher", "Ashley", "Daniel", "Elizabeth", "Matthew", "Stephanie", "Andrew", "Nicole", "Joseph", "Rachel", "Mark", "Lauren", "Steven", "Katherine", "Paul", "Megan", "Kevin", "Christina", "Brian", "Rebecca", "Edward", "Maria", "Ronald", "Diana", "Timothy", "Samantha", "Raj", "Priya", "Wei", "Mei", "Carlos", "Ana", "Ahmed", "Fatima", "Kenji", "Yuki"],
        lastNames: ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin", "Lee", "Thompson", "White", "Harris", "Sanchez", "Clark", "Patel", "Kumar", "Chen", "Wang", "Kim", "Nguyen", "Yamamoto", "Tanaka", "Singh", "Shah", "Cohen", "Goldstein", "Murphy", "O'Brien", "Sullivan"]
    },

    // Scientific exchange scenarios
    scenarios: {
        efficacy: [
            {
                id: "efficacy_001",
                trigger: "KOL asks about clinical trial results",
                kolQuestion: "I saw your poster at ASCO. Can you walk me through the primary endpoint data from your Phase 3 trial?",
                options: [
                    {
                        text: "Share the approved efficacy data from the pivotal trial, focusing on the primary endpoint and key secondary endpoints.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 10,
                        insightOpportunity: true,
                        feedback: "Excellent response. You stayed within approved labeling while providing comprehensive information."
                    },
                    {
                        text: "Go beyond the approved indication to discuss unpublished subgroup analyses that show even better results.",
                        complianceStatus: "violation",
                        outcome: "compliance_issue",
                        relationshipChange: -5,
                        complianceHit: 25,
                        feedback: "This is a compliance violation. Discussing unpublished data or unapproved uses proactively is off-label promotion."
                    },
                    {
                        text: "Deflect by saying you can't discuss clinical data and offer to send approved materials.",
                        complianceStatus: "safe",
                        outcome: "neutral",
                        relationshipChange: -5,
                        feedback: "While compliant, you missed an opportunity for scientific exchange. MSLs can and should discuss approved clinical data."
                    },
                    {
                        text: "Compare your drug's efficacy directly to competitors, claiming superiority without head-to-head data.",
                        complianceStatus: "violation",
                        outcome: "compliance_issue",
                        relationshipChange: -10,
                        complianceHit: 30,
                        feedback: "Serious violation. Making comparative claims without head-to-head data is misleading and promotional."
                    }
                ]
            },
            {
                id: "efficacy_002",
                trigger: "KOL questions durability of response",
                kolQuestion: "The response rates look good, but what about durability? My patients need long-term disease control.",
                options: [
                    {
                        text: "Present the long-term follow-up data from the approved label, including duration of response and progression-free survival data.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 10,
                        insightOpportunity: true,
                        feedback: "Good approach. You addressed the concern with relevant, approved data."
                    },
                    {
                        text: "Acknowledge the importance of durability and mention an ongoing extension study, noting you can share results when published.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 5,
                        feedback: "Appropriate response. You acknowledged limitations while setting expectations for future data."
                    },
                    {
                        text: "Share preliminary data from the ongoing extension study since it looks very promising.",
                        complianceStatus: "violation",
                        outcome: "compliance_issue",
                        complianceHit: 20,
                        relationshipChange: 0,
                        feedback: "Violation. Sharing unpublished preliminary data proactively constitutes off-label promotion."
                    }
                ]
            }
        ],
        safety: [
            {
                id: "safety_001",
                trigger: "KOL concerned about adverse events",
                kolQuestion: "I've had a few patients with significant fatigue on your drug. Is this common? How do other physicians manage it?",
                options: [
                    {
                        text: "Review the safety profile from clinical trials, including incidence of fatigue, and share the management recommendations from the prescribing information.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 10,
                        insightOpportunity: true,
                        insightType: "safety",
                        feedback: "Excellent response. You addressed the safety concern with approved information."
                    },
                    {
                        text: "Tell them that in your experience talking to other physicians, most just tell patients to push through it.",
                        complianceStatus: "risk",
                        outcome: "neutral",
                        relationshipChange: 0,
                        feedback: "Risky approach. Sharing anecdotal management strategies could be seen as practice recommendations outside your role."
                    },
                    {
                        text: "Downplay the fatigue by saying it's much less than with chemotherapy alternatives.",
                        complianceStatus: "violation",
                        outcome: "compliance_issue",
                        complianceHit: 15,
                        relationshipChange: -10,
                        feedback: "Violation. Minimizing safety concerns and making unsupported comparative claims is misleading."
                    },
                    {
                        text: "Ask clarifying questions about the fatigue severity and timing to better understand their experience and document as a potential insight.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 15,
                        insightOpportunity: true,
                        insightType: "safety",
                        feedback: "Outstanding. You gathered valuable insight while showing genuine interest in the physician's experience."
                    }
                ]
            },
            {
                id: "safety_002",
                trigger: "KOL reports potential adverse event",
                kolQuestion: "I had a patient develop severe liver toxicity that might be related to your drug. Who should I report this to?",
                options: [
                    {
                        text: "Thank them for reporting, explain you're required to collect adverse event information, and walk them through the reporting process while taking initial details.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 10,
                        feedback: "Correct response. MSLs must take adverse event reports seriously and facilitate proper reporting."
                    },
                    {
                        text: "Say you'll look into it and get back to them, then move on to your planned discussion topics.",
                        complianceStatus: "violation",
                        outcome: "compliance_issue",
                        complianceHit: 40,
                        relationshipChange: -15,
                        feedback: "Serious violation. Failing to properly handle adverse event reports is a major compliance issue with potential regulatory consequences."
                    },
                    {
                        text: "Suggest the liver toxicity is probably due to other medications the patient was taking.",
                        complianceStatus: "violation",
                        outcome: "compliance_issue",
                        complianceHit: 30,
                        relationshipChange: -20,
                        feedback: "Major violation. Never minimize or dismiss potential adverse events. All reports must be taken seriously."
                    }
                ]
            }
        ],
        offlabel: [
            {
                id: "offlabel_001",
                trigger: "KOL asks about unapproved use",
                kolQuestion: "I have patients with [related but unapproved condition]. Has anyone studied your drug in this population?",
                options: [
                    {
                        text: "Clarify that the question is unsolicited, confirm your drug is not approved for that indication, and offer to provide published peer-reviewed literature if available.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 10,
                        feedback: "Perfect handling. You responded to an unsolicited request appropriately while maintaining compliance."
                    },
                    {
                        text: "Proactively share all the off-label data you have since the physician clearly needs it for patient care.",
                        complianceStatus: "violation",
                        outcome: "compliance_issue",
                        complianceHit: 35,
                        relationshipChange: -5,
                        feedback: "Violation. Even with good intentions, proactively sharing off-label information is promotional."
                    },
                    {
                        text: "Refuse to discuss anything related to off-label use under any circumstances.",
                        complianceStatus: "safe",
                        outcome: "negative",
                        relationshipChange: -15,
                        feedback: "Overly restrictive. MSLs can respond to unsolicited requests for off-label information with appropriate disclosures."
                    },
                    {
                        text: "Say 'I can't talk about that' but then hint that there's promising data they should look for online.",
                        complianceStatus: "violation",
                        outcome: "compliance_issue",
                        complianceHit: 25,
                        relationshipChange: -10,
                        feedback: "Violation. Indirect suggestions about off-label uses are still considered promotion."
                    }
                ]
            }
        ],
        competitive: [
            {
                id: "competitive_001",
                trigger: "KOL asks for competitive comparison",
                kolQuestion: "How does your drug compare to [Competitor Drug]? I'm trying to decide which to use first-line.",
                options: [
                    {
                        text: "Explain there's no head-to-head trial data, but offer to review the individual trial designs and patient populations to help them understand differences in the evidence base.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 10,
                        feedback: "Excellent approach. You provided context without making unsupported comparative claims."
                    },
                    {
                        text: "Pull out a comparison chart showing your drug is clearly superior across all measures.",
                        complianceStatus: "violation",
                        outcome: "compliance_issue",
                        complianceHit: 30,
                        relationshipChange: -10,
                        feedback: "Violation. Cross-trial comparisons presented as superiority claims are misleading and promotional."
                    },
                    {
                        text: "Decline to discuss competitors at all, saying you can only talk about your own product.",
                        complianceStatus: "safe",
                        outcome: "neutral",
                        relationshipChange: -5,
                        feedback: "Compliant but missed opportunity. You can discuss publicly available competitor data in a balanced, fair way."
                    },
                    {
                        text: "Offer to share what you've heard from other physicians about their preferences and experiences with both drugs.",
                        complianceStatus: "risk",
                        outcome: "neutral",
                        relationshipChange: 0,
                        feedback: "Risky. Sharing anecdotal physician opinions could be seen as testimonials or influencing prescribing."
                    }
                ]
            }
        ],
        iis: [
            {
                id: "iis_001",
                trigger: "KOL expresses research interest",
                kolQuestion: "I have an idea for a study using your drug in a unique patient population. Does your company support investigator-initiated research?",
                options: [
                    {
                        text: "Explain the IIS program exists, describe the submission process, and offer to facilitate their connection with the grants office without guaranteeing approval.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 15,
                        feedback: "Perfect response. You facilitated appropriately without influencing the research direction or making promises."
                    },
                    {
                        text: "Get excited and start discussing potential study designs and endpoints that would be most useful for your marketing team.",
                        complianceStatus: "violation",
                        outcome: "compliance_issue",
                        complianceHit: 40,
                        relationshipChange: -15,
                        feedback: "Serious violation. MSLs must never influence IIS design for commercial purposes. Studies must be truly investigator-initiated."
                    },
                    {
                        text: "Promise them funding approval if they design the study to show specific outcomes.",
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
                        feedback: "Missed opportunity. If an IIS program exists, you should facilitate appropriately. Being overly restrictive harms relationships."
                    }
                ]
            }
        ],
        guideline: [
            {
                id: "guideline_001",
                trigger: "KOL discusses treatment guidelines",
                kolQuestion: "The new NCCN guidelines just came out. Where does your drug fit in the treatment algorithm now?",
                options: [
                    {
                        text: "Accurately describe your drug's positioning in the current guidelines, noting the evidence that supports the recommendation level.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 10,
                        feedback: "Good response. Discussing approved positioning in published guidelines is appropriate."
                    },
                    {
                        text: "Suggest the guidelines should have placed your drug higher and the committee got it wrong.",
                        complianceStatus: "risk",
                        outcome: "neutral",
                        relationshipChange: -5,
                        feedback: "Risky. Criticizing guideline committees or suggesting your drug deserves better positioning is promotional."
                    },
                    {
                        text: "Ask about their involvement in guideline development and whether they have insights on future updates.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 10,
                        insightOpportunity: true,
                        insightType: "clinical",
                        feedback: "Good approach. You gathered valuable insight about guideline development while showing interest in their expertise."
                    }
                ]
            }
        ],
        access: [
            {
                id: "access_001",
                trigger: "KOL frustrated about access issues",
                kolQuestion: "My patients keep getting denied coverage for your drug. What's going on?",
                options: [
                    {
                        text: "Acknowledge the frustration, explain you can connect them with your reimbursement support team, and ask about specific scenarios to understand the landscape.",
                        complianceStatus: "safe",
                        outcome: "positive",
                        relationshipChange: 10,
                        insightOpportunity: true,
                        insightType: "access",
                        feedback: "Appropriate response. You offered resources while gathering valuable access insights."
                    },
                    {
                        text: "Coach them on specific coding strategies and what to write in prior authorization appeals.",
                        complianceStatus: "violation",
                        outcome: "compliance_issue",
                        complianceHit: 25,
                        relationshipChange: 5,
                        feedback: "Violation. Providing specific reimbursement coding advice is outside the MSL role and may be seen as inducement."
                    },
                    {
                        text: "Say access issues aren't your department and you can only discuss medical and scientific topics.",
                        complianceStatus: "safe",
                        outcome: "negative",
                        relationshipChange: -10,
                        feedback: "Missed opportunity. While access isn't your primary focus, you should acknowledge concerns and connect them with appropriate resources."
                    }
                ]
            }
        ]
    },

    // Skill tree
    skills: {
        scientific: {
            name: "Scientific Expertise",
            description: "Deep knowledge of therapeutic area and clinical data",
            skills: [
                { name: "Clinical Trial Interpretation", maxLevel: 5, description: "Ability to critically analyze and present clinical trial data" },
                { name: "Mechanism of Action Mastery", maxLevel: 5, description: "Deep understanding of drug mechanisms and pharmacology" },
                { name: "Real-World Evidence", maxLevel: 5, description: "Knowledge of RWE and its application in medical practice" },
                { name: "Biomarker Knowledge", maxLevel: 5, description: "Understanding of predictive and prognostic biomarkers" },
                { name: "Competitive Landscape", maxLevel: 5, description: "Comprehensive knowledge of competitive therapies" }
            ]
        },
        communication: {
            name: "Communication Skills",
            description: "Ability to effectively engage with diverse stakeholders",
            skills: [
                { name: "Scientific Storytelling", maxLevel: 5, description: "Presenting complex data in compelling narratives" },
                { name: "Active Listening", maxLevel: 5, description: "Understanding unspoken needs and concerns" },
                { name: "Objection Handling", maxLevel: 5, description: "Addressing concerns with balanced information" },
                { name: "Presentation Skills", maxLevel: 5, description: "Delivering impactful presentations to diverse audiences" },
                { name: "Written Communication", maxLevel: 5, description: "Clear, compliant written responses and documentation" }
            ]
        },
        strategic: {
            name: "Strategic Acumen",
            description: "Ability to think strategically and drive medical objectives",
            skills: [
                { name: "KOL Mapping", maxLevel: 5, description: "Identifying and prioritizing key stakeholders" },
                { name: "Territory Planning", maxLevel: 5, description: "Efficient allocation of time and resources" },
                { name: "Insight Synthesis", maxLevel: 5, description: "Connecting field observations to business strategy" },
                { name: "Cross-functional Collaboration", maxLevel: 5, description: "Working effectively with internal teams" },
                { name: "Conference Strategy", maxLevel: 5, description: "Maximizing impact at medical congresses" }
            ]
        },
        compliance: {
            name: "Compliance Mastery",
            description: "Understanding and applying regulatory requirements",
            skills: [
                { name: "Promotional vs Non-promotional", maxLevel: 5, description: "Distinguishing compliant scientific exchange" },
                { name: "Off-label Boundaries", maxLevel: 5, description: "Properly handling off-label requests" },
                { name: "Adverse Event Reporting", maxLevel: 5, description: "Correct identification and reporting of AEs" },
                { name: "Documentation Excellence", maxLevel: 5, description: "Timely, accurate CRM documentation" },
                { name: "Fair Balance", maxLevel: 5, description: "Presenting benefits and risks appropriately" }
            ]
        }
    },

    // Congress/Conference events
    congresses: {
        asco: {
            name: "ASCO Annual Meeting",
            type: "Major International",
            therapeuticArea: "oncology",
            duration: 5,
            kolAttendance: "Very High",
            activities: ["booth", "poster", "symposium", "networking", "competitive"]
        },
        ash: {
            name: "ASH Annual Meeting",
            type: "Major International",
            therapeuticArea: "oncology",
            duration: 4,
            kolAttendance: "High",
            activities: ["booth", "poster", "symposium", "networking", "competitive"]
        },
        acr: {
            name: "ACR Convergence",
            type: "Major International",
            therapeuticArea: "immunology",
            duration: 5,
            kolAttendance: "High",
            activities: ["booth", "poster", "symposium", "networking", "competitive"]
        },
        aan: {
            name: "AAN Annual Meeting",
            type: "Major International",
            therapeuticArea: "neurology",
            duration: 5,
            kolAttendance: "High",
            activities: ["booth", "poster", "symposium", "networking", "competitive"]
        },
        acc: {
            name: "ACC Scientific Session",
            type: "Major International",
            therapeuticArea: "cardiology",
            duration: 4,
            kolAttendance: "Very High",
            activities: ["booth", "poster", "symposium", "networking", "competitive"]
        },
        nord: {
            name: "NORD Rare Disease Summit",
            type: "Specialty",
            therapeuticArea: "rare-disease",
            duration: 3,
            kolAttendance: "Medium",
            activities: ["booth", "networking", "symposium"]
        }
    },

    // Career progression titles
    careerLevels: [
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
            description: "A major peer-reviewed publication featuring your drug's data has been released.",
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
