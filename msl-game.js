// MSL Career Simulator - Game Engine
// A realistic Medical Science Liaison training simulation

// ==================== GAME DATA ====================

const TERRITORIES = [
    {
        id: 'northeast-academic',
        name: 'Northeast Academic Hub',
        region: 'Boston, MA / New York, NY',
        difficulty: 'medium',
        description: 'Dense concentration of prestigious academic medical centers and research institutions. High volume of clinical trials and demanding KOLs who expect deep scientific knowledge.',
        stats: {
            kolCount: 24,
            academicRatio: '85%',
            travelIntensity: 'Moderate',
            competitorPresence: 'High'
        },
        challenges: [
            'KOLs have limited time and high expectations',
            'Intense competitor activity in the region',
            'Complex institutional access requirements',
            'High publication and research focus'
        ],
        modifiers: {
            kolDifficulty: 1.2,
            insightBonus: 1.3,
            complianceRisk: 1.1,
            conferenceFrequency: 1.4
        }
    },
    {
        id: 'midwest-community',
        name: 'Midwest Community Network',
        region: 'Chicago, IL / Minneapolis, MN',
        difficulty: 'easy',
        description: 'Mix of academic centers and large community practices. More accessible KOLs and focus on real-world evidence and practical treatment approaches.',
        stats: {
            kolCount: 18,
            academicRatio: '45%',
            travelIntensity: 'High',
            competitorPresence: 'Moderate'
        },
        challenges: [
            'Large geographic territory requires extensive travel',
            'Balancing academic and community KOL needs',
            'Limited local conference opportunities',
            'Formulary and access challenges'
        ],
        modifiers: {
            kolDifficulty: 0.8,
            insightBonus: 1.0,
            complianceRisk: 0.9,
            conferenceFrequency: 0.8
        }
    },
    {
        id: 'west-coast-biotech',
        name: 'West Coast Biotech Corridor',
        region: 'San Francisco, CA / Seattle, WA',
        difficulty: 'hard',
        description: 'Innovation-focused region with biotech startups, tech-savvy KOLs, and cutting-edge research. High expectations for novel data and digital engagement.',
        stats: {
            kolCount: 20,
            academicRatio: '70%',
            travelIntensity: 'Moderate',
            competitorPresence: 'Very High'
        },
        challenges: [
            'Extremely competitive landscape',
            'KOLs expect cutting-edge scientific discussion',
            'Rapid pace of new data and publications',
            'High cost of living affects budgets'
        ],
        modifiers: {
            kolDifficulty: 1.4,
            insightBonus: 1.5,
            complianceRisk: 1.2,
            conferenceFrequency: 1.2
        }
    },
    {
        id: 'southeast-network',
        name: 'Southeast Regional Network',
        region: 'Atlanta, GA / Miami, FL / Houston, TX',
        difficulty: 'easy',
        description: 'Growing healthcare market with expanding academic programs and diverse patient populations. Good opportunities for evidence generation and IIS programs.',
        stats: {
            kolCount: 22,
            academicRatio: '55%',
            travelIntensity: 'High',
            competitorPresence: 'Low'
        },
        challenges: [
            'Very large geographic territory',
            'Diverse healthcare systems and cultures',
            'Variable institutional support',
            'Hurricane season travel disruptions'
        ],
        modifiers: {
            kolDifficulty: 0.7,
            insightBonus: 0.9,
            complianceRisk: 0.8,
            conferenceFrequency: 0.9
        }
    },
    {
        id: 'global-kol',
        name: 'Global KOL Team',
        region: 'National / International',
        difficulty: 'expert',
        description: 'Elite position managing relationships with top-tier global thought leaders. Involves international travel, major congress presence, and high-stakes advisory boards.',
        stats: {
            kolCount: 12,
            academicRatio: '95%',
            travelIntensity: 'Very High',
            competitorPresence: 'Extreme'
        },
        challenges: [
            'Managing world-renowned experts',
            'International travel and time zones',
            'Highest compliance scrutiny',
            'Complex global regulatory requirements'
        ],
        modifiers: {
            kolDifficulty: 1.8,
            insightBonus: 2.0,
            complianceRisk: 1.5,
            conferenceFrequency: 2.0
        }
    }
];

const EDUCATION_OPTIONS = [
    {
        id: 'phd',
        title: 'Ph.D. in Life Sciences',
        description: 'Doctoral degree in pharmacology, biology, or related field',
        bonus: '+20% Scientific Credibility, +10% Research Skills',
        effects: { scientificKnowledge: 2, researchSkills: 1, clinicalExperience: 0 }
    },
    {
        id: 'pharmd',
        title: 'Pharm.D.',
        description: 'Doctor of Pharmacy with clinical training',
        bonus: '+15% Clinical Knowledge, +15% Drug Information Skills',
        effects: { scientificKnowledge: 1, researchSkills: 1, clinicalExperience: 1 }
    },
    {
        id: 'md',
        title: 'M.D.',
        description: 'Medical degree with clinical practice experience',
        bonus: '+25% Clinical Credibility, +10% KOL Rapport',
        effects: { scientificKnowledge: 1, researchSkills: 0, clinicalExperience: 3 }
    },
    {
        id: 'masters',
        title: 'M.S. in Life Sciences',
        description: 'Master\'s degree with industry experience',
        bonus: '+10% All Skills, Faster Learning Rate',
        effects: { scientificKnowledge: 1, researchSkills: 1, clinicalExperience: 0 }
    }
];

const EXPERIENCE_OPTIONS = [
    {
        id: 'clinical-research',
        title: 'Clinical Research',
        description: '3+ years in clinical trials or CRO',
        bonus: '+20% Trial Knowledge, +15% Site Relationships',
        effects: { trialKnowledge: 2, siteRelationships: 2, salesExperience: 0 }
    },
    {
        id: 'medical-affairs',
        title: 'Medical Affairs',
        description: 'Prior MSL or Medical Information experience',
        bonus: '+25% MSL Skills, +15% Compliance Awareness',
        effects: { trialKnowledge: 1, siteRelationships: 1, salesExperience: 0, complianceBonus: 1 }
    },
    {
        id: 'pharma-sales',
        title: 'Pharmaceutical Sales',
        description: 'Sales representative transitioning to MSL',
        bonus: '+20% Communication, Higher Compliance Risk',
        effects: { trialKnowledge: 0, siteRelationships: 1, salesExperience: 2, complianceRisk: 1 }
    },
    {
        id: 'academia',
        title: 'Academic Research',
        description: 'Post-doc or faculty position',
        bonus: '+25% Scientific Credibility, +20% Publication Knowledge',
        effects: { trialKnowledge: 1, siteRelationships: 0, salesExperience: 0, academicBonus: 2 }
    }
];

const SKILL_TREE = {
    scientific: {
        name: 'Scientific Expertise',
        skills: [
            { id: 'disease-knowledge', name: 'Disease State Knowledge', maxLevel: 5, description: 'Deep understanding of therapeutic area pathophysiology' },
            { id: 'clinical-data', name: 'Clinical Data Interpretation', maxLevel: 5, description: 'Ability to analyze and present clinical trial results' },
            { id: 'competitive-intel', name: 'Competitive Intelligence', maxLevel: 3, description: 'Knowledge of competitor products and pipelines' },
            { id: 'publication-literacy', name: 'Publication Literacy', maxLevel: 4, description: 'Skill in reading and discussing medical literature' },
            { id: 'moa-expertise', name: 'Mechanism of Action Expert', maxLevel: 3, description: 'Deep understanding of drug mechanisms' }
        ]
    },
    communication: {
        name: 'Communication & Engagement',
        skills: [
            { id: 'presentation', name: 'Presentation Skills', maxLevel: 5, description: 'Ability to deliver compelling scientific presentations' },
            { id: 'active-listening', name: 'Active Listening', maxLevel: 4, description: 'Skill in understanding KOL needs and concerns' },
            { id: 'objection-handling', name: 'Objection Handling', maxLevel: 4, description: 'Addressing scientific concerns professionally' },
            { id: 'networking', name: 'Professional Networking', maxLevel: 3, description: 'Building relationships at conferences and events' },
            { id: 'virtual-engagement', name: 'Virtual Engagement', maxLevel: 3, description: 'Effective remote communication skills' }
        ]
    },
    strategic: {
        name: 'Strategic & Business Acumen',
        skills: [
            { id: 'territory-planning', name: 'Territory Planning', maxLevel: 4, description: 'Strategic management of KOL priorities' },
            { id: 'insight-generation', name: 'Insight Generation', maxLevel: 5, description: 'Identifying valuable medical insights' },
            { id: 'cross-functional', name: 'Cross-functional Collaboration', maxLevel: 3, description: 'Working with sales, marketing, and medical teams' },
            { id: 'kol-development', name: 'KOL Development', maxLevel: 4, description: 'Building long-term KOL relationships' },
            { id: 'compliance-mastery', name: 'Compliance Mastery', maxLevel: 5, description: 'Understanding and applying regulatory guidelines' }
        ]
    }
};

// KOL Database - Generated per territory
function generateKOLs(territory) {
    const firstNames = ['James', 'Sarah', 'Michael', 'Jennifer', 'David', 'Emily', 'Robert', 'Lisa', 'William', 'Amanda', 'Richard', 'Michelle', 'Thomas', 'Jessica', 'Christopher', 'Ashley', 'Daniel', 'Stephanie', 'Matthew', 'Nicole', 'Andrew', 'Elizabeth', 'Joseph', 'Heather'];
    const lastNames = ['Chen', 'Williams', 'Patel', 'Rodriguez', 'Kim', 'Thompson', 'Garcia', 'Martinez', 'Anderson', 'Taylor', 'Wilson', 'Moore', 'Jackson', 'Martin', 'Lee', 'White', 'Harris', 'Clark', 'Lewis', 'Young', 'Walker', 'Hall', 'Allen', 'King'];
    const institutions = {
        'northeast-academic': ['Harvard Medical School', 'Memorial Sloan Kettering', 'Johns Hopkins', 'Yale School of Medicine', 'Mount Sinai', 'Columbia University Medical Center', 'Dana-Farber Cancer Institute', 'Massachusetts General Hospital'],
        'midwest-community': ['Mayo Clinic', 'Northwestern Medicine', 'Cleveland Clinic', 'University of Michigan', 'University of Chicago Medicine', 'Advocate Health', 'Mercy Health System', 'SSM Health'],
        'west-coast-biotech': ['UCSF Medical Center', 'Stanford Health Care', 'UCLA Health', 'Fred Hutchinson Cancer Center', 'Cedars-Sinai', 'City of Hope', 'UC San Diego Health', 'Oregon Health & Science University'],
        'southeast-network': ['MD Anderson Cancer Center', 'Emory Healthcare', 'Duke University Hospital', 'University of Miami Health', 'Moffitt Cancer Center', 'Vanderbilt University Medical Center', 'Baptist Health', 'Memorial Healthcare System'],
        'global-kol': ['World Health Organization Advisor', 'ASCO Leadership', 'ESMO Board Member', 'International Research Consortium', 'Global Clinical Trial Network', 'WHO Cancer Initiative']
    };

    const specialties = {
        'oncology': ['Medical Oncology', 'Hematology-Oncology', 'Radiation Oncology', 'Surgical Oncology', 'Gynecologic Oncology', 'Neuro-Oncology'],
        'immunology': ['Rheumatology', 'Clinical Immunology', 'Allergy & Immunology', 'Transplant Immunology'],
        'neurology': ['Movement Disorders', 'Multiple Sclerosis', 'Epilepsy', 'Neurodegenerative Disease', 'Neuro-Oncology'],
        'cardiology': ['Interventional Cardiology', 'Heart Failure', 'Electrophysiology', 'Preventive Cardiology'],
        'rare-disease': ['Medical Genetics', 'Metabolic Disease', 'Rare Disease Specialist', 'Pediatric Genetics']
    };

    const titles = ['Professor', 'Associate Professor', 'Assistant Professor', 'Director', 'Chief', 'Department Head', 'Senior Physician', 'Research Director'];

    const kols = [];
    const count = territory.stats.kolCount;
    const institutionList = institutions[territory.id] || institutions['northeast-academic'];

    for (let i = 0; i < count; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const isAcademic = Math.random() < (parseInt(territory.stats.academicRatio) / 100);

        kols.push({
            id: `kol-${i}`,
            name: `Dr. ${firstName} ${lastName}`,
            initials: `${firstName[0]}${lastName[0]}`,
            institution: institutionList[Math.floor(Math.random() * institutionList.length)],
            specialty: 'Medical Oncology', // Will be set based on therapeutic area
            title: isAcademic ? titles[Math.floor(Math.random() * 4)] : titles[Math.floor(Math.random() * 4) + 4],
            isAcademic: isAcademic,
            influence: Math.floor(Math.random() * 40) + 60, // 60-100
            accessibility: Math.floor(Math.random() * 50) + 30, // 30-80
            relationship: Math.floor(Math.random() * 20), // 0-20 starting
            interactions: 0,
            priority: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)],
            interests: generateKOLInterests(),
            personality: generateKOLPersonality(),
            lastContact: null,
            insights: [],
            iisInterest: Math.random() > 0.7,
            adboardParticipant: Math.random() > 0.8
        });
    }

    return kols.sort((a, b) => b.influence - a.influence);
}

function generateKOLInterests() {
    const interests = [
        'Clinical trial design', 'Real-world evidence', 'Biomarker research',
        'Patient outcomes', 'Health economics', 'Translational research',
        'Combination therapies', 'Precision medicine', 'Quality of life',
        'Treatment sequencing', 'Novel mechanisms', 'Resistance mechanisms'
    ];
    const count = Math.floor(Math.random() * 3) + 2;
    const selected = [];
    while (selected.length < count) {
        const interest = interests[Math.floor(Math.random() * interests.length)];
        if (!selected.includes(interest)) selected.push(interest);
    }
    return selected;
}

function generateKOLPersonality() {
    const personalities = [
        { type: 'Data-driven', description: 'Focuses on hard data and statistics', preference: 'clinical-data' },
        { type: 'Patient-focused', description: 'Prioritizes patient outcomes and QoL', preference: 'outcomes' },
        { type: 'Research-oriented', description: 'Interested in mechanism and science', preference: 'research' },
        { type: 'Practical', description: 'Wants real-world applicability', preference: 'practical' },
        { type: 'Skeptical', description: 'Questions everything, needs strong evidence', preference: 'evidence' },
        { type: 'Collaborative', description: 'Values partnership and dialogue', preference: 'relationship' }
    ];
    return personalities[Math.floor(Math.random() * personalities.length)];
}

// Dialogue Scenarios
const DIALOGUE_SCENARIOS = {
    'scientific-exchange': [
        {
            id: 'phase3-question',
            context: 'Scientific Exchange - Clinical Data Discussion',
            message: "I've been reviewing the Phase III data for your compound. The primary endpoint looks good, but I'm concerned about the secondary endpoint results in the prior-treatment subgroup. Can you walk me through that data?",
            options: [
                {
                    text: "Absolutely. In the prior-treatment subgroup, we saw a hazard ratio of 0.72 with a confidence interval that crossed 1.0. While not statistically significant in this pre-specified subgroup, the trend favored treatment, and when we look at the forest plot across all subgroups, the treatment effect was consistent.",
                    outcome: 'success',
                    feedback: "Excellent response. You provided specific data, acknowledged limitations honestly, and contextualized the results appropriately.",
                    effects: { relationship: 10, reputation: 5, xp: 50, insight: true },
                    complianceRisk: 0
                },
                {
                    text: "The subgroup data strongly supports using our drug in prior-treatment patients. The overall survival benefit we saw should translate to this population as well.",
                    outcome: 'failure',
                    feedback: "This response overstates the evidence. You implied efficacy in a subgroup where data was not conclusive, which is off-label promotion.",
                    effects: { relationship: -10, compliance: -15, xp: 10 },
                    complianceRisk: 1
                },
                {
                    text: "That's a great question. I'd need to look at the specific data for that subgroup. Would it be helpful if I followed up with our Medical Information team to get you the detailed analysis?",
                    outcome: 'neutral',
                    feedback: "A safe response, but KOLs expect MSLs to have this data readily available. This may affect your credibility.",
                    effects: { relationship: 0, reputation: -5, xp: 20 },
                    complianceRisk: 0
                },
                {
                    text: "Between us, we're expecting updated data from our extension study that should address those concerns. I can share some preliminary findings with you.",
                    outcome: 'failure',
                    feedback: "Critical compliance violation. You cannot share unpublished data or create expectations about future data. This could result in termination.",
                    effects: { relationship: 5, compliance: -30, jobSecurity: -20, xp: 5 },
                    complianceRisk: 2
                }
            ]
        },
        {
            id: 'competitor-comparison',
            context: 'Scientific Exchange - Competitive Discussion',
            message: "How does your drug compare to [Competitor Drug]? I've seen their head-to-head data and it looks pretty compelling.",
            options: [
                {
                    text: "I can only speak to our own clinical data. Our pivotal trial demonstrated [specific efficacy and safety data]. If you're interested in comparative effectiveness, I'd recommend looking at the published meta-analyses and real-world studies. Would you like me to send you those publications?",
                    outcome: 'success',
                    feedback: "Perfect response. You stayed compliant by focusing on your own data while being helpful about resources for comparison.",
                    effects: { relationship: 5, reputation: 5, compliance: 5, xp: 45 },
                    complianceRisk: 0
                },
                {
                    text: "Our drug has a better safety profile and the efficacy is at least comparable. The competitor's trial had some methodological issues you should be aware of.",
                    outcome: 'failure',
                    feedback: "Making comparative claims without proper evidence and criticizing competitor trials is both off-label and unprofessional.",
                    effects: { relationship: -5, compliance: -20, reputation: -10, xp: 10 },
                    complianceRisk: 2
                },
                {
                    text: "That's outside my area - you should talk to our sales representative about competitive positioning.",
                    outcome: 'failure',
                    feedback: "MSLs should be prepared to discuss the scientific landscape. Deflecting to sales is inappropriate and undermines your scientific role.",
                    effects: { relationship: -15, reputation: -15, xp: 5 },
                    complianceRisk: 0
                },
                {
                    text: "There are important differences in trial design that make direct comparisons challenging. Our trial enrolled [patient characteristics] while theirs enrolled [different characteristics]. I can walk you through the nuances if that would be helpful.",
                    outcome: 'success',
                    feedback: "Excellent scientific approach. You acknowledged the complexity while offering to provide educational context.",
                    effects: { relationship: 10, reputation: 10, xp: 55, insight: true },
                    complianceRisk: 0
                }
            ]
        },
        {
            id: 'off-label-request',
            context: 'Scientific Exchange - Off-Label Question',
            message: "I have a patient who doesn't fit your approved indication but might benefit from your drug. What can you tell me about using it in this situation?",
            options: [
                {
                    text: "I appreciate you thinking of our therapy. While I can't discuss off-label use, I can share that there are some published case reports and small studies in that population. Would you like me to compile those publications for your review?",
                    outcome: 'success',
                    feedback: "Excellent handling. You maintained compliance while being helpful by pointing to legitimate published literature.",
                    effects: { relationship: 5, compliance: 10, reputation: 5, xp: 50 },
                    complianceRisk: 0
                },
                {
                    text: "We've seen some promising results in that population. Let me tell you what other physicians have reported.",
                    outcome: 'failure',
                    feedback: "This is off-label promotion. Sharing anecdotal reports or implying efficacy in unapproved populations is a serious violation.",
                    effects: { relationship: 5, compliance: -35, jobSecurity: -25, xp: 5 },
                    complianceRisk: 2
                },
                {
                    text: "I'm not able to discuss that. Our drug is only indicated for the approved population.",
                    outcome: 'neutral',
                    feedback: "While compliant, this response misses an opportunity to be helpful. You could have offered published literature.",
                    effects: { relationship: -5, reputation: -5, compliance: 5, xp: 15 },
                    complianceRisk: 0
                },
                {
                    text: "That's a clinical decision between you and your patient. However, I can share the published literature on the mechanism of action that might help inform your thinking. I should also mention our Medical Information team can provide a comprehensive response to unsolicited questions.",
                    outcome: 'success',
                    feedback: "Optimal response. You respected clinical autonomy, offered appropriate resources, and mentioned proper channels for medical information.",
                    effects: { relationship: 10, compliance: 10, reputation: 10, xp: 60, insight: true },
                    complianceRisk: 0
                }
            ]
        }
    ],
    'conference-interaction': [
        {
            id: 'poster-discussion',
            context: 'Medical Conference - Poster Session',
            message: "I saw your company's poster on the biomarker analysis. The sample size seems small. How confident are you in these results?",
            options: [
                {
                    text: "You raise a valid point about sample size. This was an exploratory analysis, and we've acknowledged that limitation in our poster. The hypothesis-generating findings are being evaluated in a larger prospective study. The signal we're seeing is biologically plausible given what we know about the mechanism.",
                    outcome: 'success',
                    feedback: "Excellent response. You acknowledged the limitation, provided context about ongoing research, and explained the scientific rationale.",
                    effects: { relationship: 10, reputation: 10, xp: 50 },
                    complianceRisk: 0
                },
                {
                    text: "The results are actually quite robust. Biomarker studies don't need large sample sizes when the effect is this clear.",
                    outcome: 'failure',
                    feedback: "Dismissing valid scientific criticism reflects poorly on your credibility. MSLs should acknowledge limitations honestly.",
                    effects: { relationship: -10, reputation: -15, xp: 10 },
                    complianceRisk: 0
                },
                {
                    text: "I'll be honest - I just joined and haven't fully reviewed this data yet. Can I connect you with our medical director who led this research?",
                    outcome: 'neutral',
                    feedback: "Honesty is appreciated, but you should be prepared to discuss your company's presentations at conferences.",
                    effects: { relationship: 0, reputation: -5, xp: 15 },
                    complianceRisk: 0
                }
            ]
        },
        {
            id: 'symposium-question',
            context: 'Medical Conference - Industry Symposium',
            message: "During the Q&A after your company's symposium presentation, a challenging question arises about adverse events in a specific patient population.",
            options: [
                {
                    text: "Thank you for that question. The safety profile in [specific population] showed [specific data from prescribing information]. We continue to monitor safety through our pharmacovigilance program, and I'd be happy to discuss the details with you after the session.",
                    outcome: 'success',
                    feedback: "Professional handling. You provided specific, on-label safety information and offered follow-up discussion.",
                    effects: { relationship: 5, reputation: 10, compliance: 5, xp: 45 },
                    complianceRisk: 0
                },
                {
                    text: "Those adverse events are rare and usually manageable. The benefits clearly outweigh the risks for most patients.",
                    outcome: 'failure',
                    feedback: "Making benefit-risk assessments publicly is inappropriate and potentially promotional. You should stick to the data.",
                    effects: { relationship: -5, compliance: -15, reputation: -10, xp: 10 },
                    complianceRisk: 1
                }
            ]
        }
    ],
    'advisory-board': [
        {
            id: 'adboard-facilitation',
            context: 'KOL Advisory Board - Discussion Facilitation',
            message: "During an advisory board you're facilitating, two KOLs have opposing views on the clinical relevance of your data. The discussion is getting heated.",
            options: [
                {
                    text: "Thank you both for your perspectives. Dr. [A], you've raised important points about [their concern], and Dr. [B], your clinical experience provides valuable context. Could we explore what specific evidence would help resolve this question? This is exactly the kind of insight that helps inform our medical strategy.",
                    outcome: 'success',
                    feedback: "Excellent facilitation. You validated both perspectives, refocused on evidence, and highlighted the value of their input.",
                    effects: { relationship: 15, reputation: 10, xp: 60, insight: true },
                    complianceRisk: 0
                },
                {
                    text: "I think Dr. [A]'s point is more aligned with what we're seeing in our data. Let me show you the supporting evidence.",
                    outcome: 'failure',
                    feedback: "Taking sides undermines the purpose of an advisory board and can appear as attempting to influence opinions.",
                    effects: { relationship: -10, compliance: -10, reputation: -10, xp: 10 },
                    complianceRisk: 1
                },
                {
                    text: "Let's move on to the next agenda item. We can revisit this if time permits.",
                    outcome: 'neutral',
                    feedback: "While this avoids conflict, it wastes a valuable opportunity for insight generation. Advisory board debates often yield important information.",
                    effects: { relationship: -5, xp: 15 },
                    complianceRisk: 0
                }
            ]
        }
    ],
    'iis-discussion': [
        {
            id: 'iis-proposal',
            context: 'Investigator Initiated Study - Initial Discussion',
            message: "I'm interested in conducting an investigator-initiated study with your compound. I want to study it in a population that's not in your current label. Can your company provide drug supply and funding?",
            options: [
                {
                    text: "Thank you for your interest in researching our compound. I can discuss our IIS program and process with you. However, I need to emphasize that IIS support decisions are made by our medical affairs committee based on scientific merit and alignment with our research priorities. Could you tell me more about your proposed study design and endpoints?",
                    outcome: 'success',
                    feedback: "Perfect handling. You showed interest, set appropriate expectations about the process, and gathered information to assess the proposal.",
                    effects: { relationship: 10, reputation: 5, xp: 50, insight: true },
                    complianceRisk: 0
                },
                {
                    text: "Absolutely! We're always looking to expand our evidence base. I'll fast-track this through our system and get you approved quickly.",
                    outcome: 'failure',
                    feedback: "You cannot make promises about IIS approval or timeline. This creates inappropriate expectations and potential compliance issues.",
                    effects: { relationship: 5, compliance: -25, reputation: -10, xp: 10 },
                    complianceRisk: 2
                },
                {
                    text: "I'd need to check if we support studies in that population. Let me connect you with our grants department.",
                    outcome: 'neutral',
                    feedback: "While appropriate to involve grants, MSLs should understand their IIS program well enough to have initial discussions.",
                    effects: { relationship: 0, reputation: -5, xp: 15 },
                    complianceRisk: 0
                }
            ]
        }
    ],
    'compliance-challenge': [
        {
            id: 'sales-pressure',
            context: 'Internal Challenge - Sales Team Request',
            message: "A sales representative approaches you: 'I have a key account that's not prescribing our drug. Can you go talk to them and help me get them to use it more?'",
            options: [
                {
                    text: "I appreciate you thinking of medical affairs, but I can't be involved in activities designed to increase prescribing. If the HCP has scientific questions or if there's a legitimate educational need, I'm happy to engage. What specific scientific gaps has the account expressed?",
                    outcome: 'success',
                    feedback: "Perfect compliance response. You clearly stated boundaries while offering appropriate support.",
                    effects: { compliance: 15, reputation: 5, xp: 45 },
                    complianceRisk: 0
                },
                {
                    text: "Sure, I'll set up a meeting to discuss the clinical data. That should help get them prescribing.",
                    outcome: 'failure',
                    feedback: "Critical compliance violation. You agreed to promotional activity disguised as scientific exchange. This could result in termination.",
                    effects: { compliance: -40, jobSecurity: -30, xp: 5 },
                    complianceRisk: 2
                },
                {
                    text: "That's not what MSLs do. Talk to your manager about sales strategies.",
                    outcome: 'neutral',
                    feedback: "While the boundary is correct, the delivery was dismissive. Building internal relationships requires more collaborative responses.",
                    effects: { compliance: 5, reputation: -5, xp: 20 },
                    complianceRisk: 0
                }
            ]
        },
        {
            id: 'gift-request',
            context: 'Compliance Challenge - KOL Gift Request',
            message: "A KOL you've built a great relationship with mentions: 'I'm presenting at a conference next month. It would be great if your company could cover my hotel and some expenses since I'll be discussing your drug in my talk.'",
            options: [
                {
                    text: "I appreciate your support in presenting the data. However, I can't arrange speaker support outside of our official speaker bureau program, which has its own selection and contracting process. If you're interested in being considered for our speaker program, I can connect you with the appropriate team.",
                    outcome: 'success',
                    feedback: "Excellent response. You maintained the relationship while clearly explaining the appropriate process.",
                    effects: { relationship: 5, compliance: 10, reputation: 5, xp: 50 },
                    complianceRisk: 0
                },
                {
                    text: "Let me see what I can do. Your support has been valuable and I want to help.",
                    outcome: 'failure',
                    feedback: "This implies you might circumvent proper processes, which is a compliance violation. Support must go through official channels.",
                    effects: { relationship: 10, compliance: -30, jobSecurity: -20, xp: 10 },
                    complianceRisk: 2
                },
                {
                    text: "I'm sorry, but that's not something I can help with at all.",
                    outcome: 'neutral',
                    feedback: "While the refusal is appropriate, you missed the opportunity to redirect to legitimate programs.",
                    effects: { relationship: -10, compliance: 5, xp: 15 },
                    complianceRisk: 0
                }
            ]
        }
    ]
};

// ==================== GAME STATE ====================

let gameState = {
    screen: 'loading',
    player: {
        name: '',
        education: null,
        experience: null,
        therapeuticArea: 'oncology',
        level: 1,
        xp: 0,
        xpToNextLevel: 100,
        title: 'MSL I',
        skillPoints: 0
    },
    territory: null,
    metrics: {
        compliance: 100,
        reputation: 50,
        productivity: 50,
        jobSecurity: 75
    },
    stats: {
        totalInteractions: 0,
        insightsGathered: 0,
        crmEntries: 0,
        conferencesAttended: 0,
        advisoryBoards: 0,
        iisSupported: 0,
        trainingsCompleted: 0
    },
    time: {
        week: 1,
        quarter: 1,
        year: 2024
    },
    kols: [],
    skills: {},
    activities: [],
    notifications: [],
    crmHistory: [],
    iisProjects: [],
    upcomingConferences: [],
    warnings: 0,
    gameOver: false
};

// ==================== INITIALIZATION ====================

function initializeGame() {
    // Initialize skills from skill tree
    Object.keys(SKILL_TREE).forEach(branch => {
        SKILL_TREE[branch].skills.forEach(skill => {
            gameState.skills[skill.id] = 0;
        });
    });

    // Setup event listeners
    setupEventListeners();

    // Show main menu after loading
    setTimeout(() => {
        document.getElementById('loading-screen').style.display = 'none';
        document.getElementById('main-menu').style.display = 'flex';
        gameState.screen = 'menu';
    }, 2500);
}

function setupEventListeners() {
    // Topic tags in CRM
    document.querySelectorAll('.insight-tag').forEach(tag => {
        tag.addEventListener('click', () => {
            tag.classList.toggle('selected');
        });
    });
}

// ==================== SCREEN NAVIGATION ====================

function showMainMenu() {
    hideAllScreens();
    document.getElementById('main-menu').style.display = 'flex';
    gameState.screen = 'menu';
}

function showTerritorySelect() {
    hideAllScreens();
    document.getElementById('territory-select').style.display = 'block';
    gameState.screen = 'territory';
    renderTerritories();
}

function showCharacterCreation() {
    hideAllScreens();
    document.getElementById('character-creation').style.display = 'block';
    gameState.screen = 'character';
    renderCharacterOptions();
}

function showGameScreen() {
    hideAllScreens();
    document.getElementById('game-screen').style.display = 'block';
    gameState.screen = 'game';
    updateAllDisplays();
}

function hideAllScreens() {
    document.getElementById('loading-screen').style.display = 'none';
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('territory-select').style.display = 'none';
    document.getElementById('character-creation').style.display = 'none';
    document.getElementById('game-screen').style.display = 'none';
}

// ==================== TERRITORY SELECTION ====================

function renderTerritories() {
    const grid = document.getElementById('territory-grid');
    grid.innerHTML = TERRITORIES.map(t => `
        <div class="territory-card" data-territory="${t.id}" onclick="selectTerritory('${t.id}')">
            <span class="difficulty-badge difficulty-${t.difficulty}">${t.difficulty}</span>
            <div class="territory-name">${t.name}</div>
            <div class="territory-region">${t.region}</div>
            <div class="territory-description">${t.description}</div>
            <div class="territory-stats">
                <div class="territory-stat">
                    <div class="territory-stat-label">KOLs</div>
                    <div class="territory-stat-value">${t.stats.kolCount}</div>
                </div>
                <div class="territory-stat">
                    <div class="territory-stat-label">Academic</div>
                    <div class="territory-stat-value">${t.stats.academicRatio}</div>
                </div>
                <div class="territory-stat">
                    <div class="territory-stat-label">Travel</div>
                    <div class="territory-stat-value">${t.stats.travelIntensity}</div>
                </div>
                <div class="territory-stat">
                    <div class="territory-stat-label">Competition</div>
                    <div class="territory-stat-value">${t.stats.competitorPresence}</div>
                </div>
            </div>
            <div class="territory-challenges">
                <h4>Key Challenges</h4>
                <ul>
                    ${t.challenges.map(c => `<li>${c}</li>`).join('')}
                </ul>
            </div>
        </div>
    `).join('');
}

function selectTerritory(territoryId) {
    document.querySelectorAll('.territory-card').forEach(card => {
        card.classList.remove('selected');
    });
    document.querySelector(`[data-territory="${territoryId}"]`).classList.add('selected');
    gameState.territory = TERRITORIES.find(t => t.id === territoryId);
    document.getElementById('confirm-territory-btn').disabled = false;
}

function confirmTerritory() {
    if (gameState.territory) {
        showCharacterCreation();
    }
}

// ==================== CHARACTER CREATION ====================

function renderCharacterOptions() {
    const eduContainer = document.getElementById('education-options');
    eduContainer.innerHTML = EDUCATION_OPTIONS.map(opt => `
        <div class="background-option" data-education="${opt.id}" onclick="selectEducation('${opt.id}')">
            <h4>${opt.title}</h4>
            <p>${opt.description}</p>
            <div class="background-bonus">${opt.bonus}</div>
        </div>
    `).join('');

    const expContainer = document.getElementById('experience-options');
    expContainer.innerHTML = EXPERIENCE_OPTIONS.map(opt => `
        <div class="background-option" data-experience="${opt.id}" onclick="selectExperience('${opt.id}')">
            <h4>${opt.title}</h4>
            <p>${opt.description}</p>
            <div class="background-bonus">${opt.bonus}</div>
        </div>
    `).join('');
}

function selectEducation(educationId) {
    document.querySelectorAll('[data-education]').forEach(el => el.classList.remove('selected'));
    document.querySelector(`[data-education="${educationId}"]`).classList.add('selected');
    gameState.player.education = EDUCATION_OPTIONS.find(e => e.id === educationId);
}

function selectExperience(experienceId) {
    document.querySelectorAll('[data-experience]').forEach(el => el.classList.remove('selected'));
    document.querySelector(`[data-experience="${experienceId}"]`).classList.add('selected');
    gameState.player.experience = EXPERIENCE_OPTIONS.find(e => e.id === experienceId);
}

function startGame() {
    const playerName = document.getElementById('player-name').value.trim();
    if (!playerName) {
        alert('Please enter your name');
        return;
    }
    if (!gameState.player.education) {
        alert('Please select your educational background');
        return;
    }
    if (!gameState.player.experience) {
        alert('Please select your previous experience');
        return;
    }

    gameState.player.name = playerName;
    gameState.player.therapeuticArea = document.getElementById('therapeutic-area').value;

    // Apply education bonuses to skills
    if (gameState.player.education.effects) {
        Object.entries(gameState.player.education.effects).forEach(([key, value]) => {
            // These would translate to skill bonuses
        });
    }

    // Generate KOLs for territory
    gameState.kols = generateKOLs(gameState.territory);

    // Generate initial activities
    generateWeeklyActivities();

    // Generate initial conferences
    generateUpcomingConferences();

    // Add welcome notification
    addNotification('Welcome to ' + gameState.territory.name + '!', 'Your MSL journey begins. Start by reviewing your KOL list and scheduling introductory meetings.', 'info');

    showGameScreen();
}

// ==================== GAME DISPLAY UPDATES ====================

function updateAllDisplays() {
    updatePlayerDisplay();
    updateMetersDisplay();
    updateDashboard();
    updateNotifications();
    updateUpcomingEvents();
    updateQuickStats();
    populateCRMDropdown();
}

function updatePlayerDisplay() {
    document.getElementById('display-player-name').textContent = gameState.player.name;
    document.getElementById('display-player-title').textContent = `${gameState.player.title} - ${capitalizeFirst(gameState.player.therapeuticArea)}`;
    document.getElementById('stat-xp').textContent = gameState.player.xp;
    document.getElementById('stat-level').textContent = gameState.player.level;
    document.getElementById('stat-interactions').textContent = gameState.stats.totalInteractions;
    document.getElementById('stat-insights').textContent = gameState.stats.insightsGathered;
    document.getElementById('current-week').textContent = `Week ${gameState.time.week}`;
    document.getElementById('current-quarter').textContent = `Q${gameState.time.quarter} ${gameState.time.year}`;
    document.getElementById('territory-display').textContent = gameState.territory.name;
    document.getElementById('skill-points').textContent = gameState.player.skillPoints;
}

function updateMetersDisplay() {
    const metrics = gameState.metrics;

    document.getElementById('compliance-value').textContent = `${metrics.compliance}%`;
    document.getElementById('compliance-bar').style.width = `${metrics.compliance}%`;

    document.getElementById('reputation-value').textContent = `${metrics.reputation}%`;
    document.getElementById('reputation-bar').style.width = `${metrics.reputation}%`;

    document.getElementById('productivity-value').textContent = `${metrics.productivity}%`;
    document.getElementById('productivity-bar').style.width = `${metrics.productivity}%`;

    document.getElementById('job-security-value').textContent = `${metrics.jobSecurity}%`;
    document.getElementById('job-security-bar').style.width = `${metrics.jobSecurity}%`;

    // Check for game over conditions
    checkGameOverConditions();
}

function checkGameOverConditions() {
    if (gameState.metrics.compliance <= 0) {
        triggerGameOver('terminated', 'Your employment has been terminated due to severe compliance violations.');
    } else if (gameState.metrics.jobSecurity <= 0) {
        triggerGameOver('terminated', 'Your employment has been terminated due to poor performance and multiple warnings.');
    } else if (gameState.metrics.compliance < 30) {
        if (gameState.warnings < 2) {
            gameState.warnings++;
            addNotification('Compliance Warning', `You have received a formal warning (${gameState.warnings}/2) for compliance concerns. Another violation may result in termination.`, 'urgent');
        }
    }
}

function triggerGameOver(type, reason) {
    gameState.gameOver = true;
    const gameOverScreen = document.getElementById('game-over');
    const title = document.getElementById('game-over-title');
    const reasonEl = document.getElementById('game-over-reason');
    const statsEl = document.getElementById('game-over-stats');

    if (type === 'terminated') {
        title.textContent = 'Career Ended';
        title.className = 'game-over-title fired';
    } else if (type === 'promoted') {
        title.textContent = 'Congratulations!';
        title.className = 'game-over-title promoted';
    }

    reasonEl.textContent = reason;
    statsEl.innerHTML = `
        <h4 style="margin-bottom: 1rem;">Career Summary</h4>
        <p>Time Served: ${gameState.time.week} weeks (${Math.floor(gameState.time.week/13)} quarters)</p>
        <p>Final Level: ${gameState.player.level}</p>
        <p>Total XP: ${gameState.player.xp}</p>
        <p>KOL Interactions: ${gameState.stats.totalInteractions}</p>
        <p>Insights Gathered: ${gameState.stats.insightsGathered}</p>
        <p>Advisory Boards: ${gameState.stats.advisoryBoards}</p>
        <p>IIS Supported: ${gameState.stats.iisSupported}</p>
        <p>Conferences Attended: ${gameState.stats.conferencesAttended}</p>
    `;

    gameOverScreen.style.display = 'flex';
}

// ==================== DASHBOARD ====================

function updateDashboard() {
    const content = document.getElementById('dashboard-content');

    const weeklyGoals = getWeeklyGoals();
    const recentActivity = gameState.crmHistory.slice(0, 3);

    content.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">
            <div class="activity-card">
                <h3 style="color: var(--secondary); margin-bottom: 1rem;">Weekly Goals</h3>
                ${weeklyGoals.map(goal => `
                    <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid var(--bg-lighter);">
                        <span>${goal.name}</span>
                        <span style="color: ${goal.current >= goal.target ? 'var(--success)' : 'var(--text-secondary)'}">
                            ${goal.current}/${goal.target}
                        </span>
                    </div>
                `).join('')}
            </div>
            <div class="activity-card">
                <h3 style="color: var(--secondary); margin-bottom: 1rem;">Territory Overview</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div>
                        <div style="color: var(--text-muted); font-size: 0.8rem;">Total KOLs</div>
                        <div style="font-size: 1.5rem; font-weight: bold;">${gameState.kols.length}</div>
                    </div>
                    <div>
                        <div style="color: var(--text-muted); font-size: 0.8rem;">High Priority</div>
                        <div style="font-size: 1.5rem; font-weight: bold;">${gameState.kols.filter(k => k.priority === 'high').length}</div>
                    </div>
                    <div>
                        <div style="color: var(--text-muted); font-size: 0.8rem;">Avg Relationship</div>
                        <div style="font-size: 1.5rem; font-weight: bold;">${Math.round(gameState.kols.reduce((a, k) => a + k.relationship, 0) / gameState.kols.length)}%</div>
                    </div>
                    <div>
                        <div style="color: var(--text-muted); font-size: 0.8rem;">Pending Activities</div>
                        <div style="font-size: 1.5rem; font-weight: bold;">${gameState.activities.length}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="activity-card" style="margin-top: 1.5rem;">
            <h3 style="color: var(--secondary); margin-bottom: 1rem;">Priority Actions</h3>
            ${getPriorityActions().map(action => `
                <div style="background: var(--bg-lighter); padding: 1rem; border-radius: 8px; margin-bottom: 0.5rem; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="font-weight: bold;">${action.title}</div>
                        <div style="font-size: 0.85rem; color: var(--text-secondary);">${action.description}</div>
                    </div>
                    <button class="btn btn-small btn-primary" onclick="${action.action}">${action.buttonText}</button>
                </div>
            `).join('')}
        </div>
    `;
}

function getWeeklyGoals() {
    return [
        { name: 'KOL Interactions', current: gameState.stats.totalInteractions % 5, target: 5 },
        { name: 'CRM Documentation', current: gameState.stats.crmEntries % 5, target: 5 },
        { name: 'Insights Gathered', current: gameState.stats.insightsGathered % 2, target: 2 },
        { name: 'High-Priority KOL Contact', current: Math.min(2, gameState.kols.filter(k => k.priority === 'high' && k.interactions > 0).length), target: 2 }
    ];
}

function getPriorityActions() {
    const actions = [];

    // Check for KOLs needing contact
    const needsContact = gameState.kols.filter(k => k.priority === 'high' && k.interactions === 0);
    if (needsContact.length > 0) {
        actions.push({
            title: `Contact ${needsContact[0].name}`,
            description: 'High-priority KOL has not been contacted yet',
            buttonText: 'View KOL',
            action: `showPanel('kol-management')`
        });
    }

    // Check for pending activities
    if (gameState.activities.length > 0) {
        actions.push({
            title: 'Complete Scheduled Activity',
            description: `${gameState.activities.length} activities pending this week`,
            buttonText: 'View Schedule',
            action: `showPanel('schedule')`
        });
    }

    // Add training recommendation
    if (gameState.player.level < 3) {
        actions.push({
            title: 'Complete Training Module',
            description: 'Improve your skills and earn XP',
            buttonText: 'Training',
            action: `showPanel('training')`
        });
    }

    return actions;
}

// ==================== PANEL NAVIGATION ====================

function showPanel(panelId) {
    // Update nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    event.currentTarget?.classList.add('active');

    // Update panels
    document.querySelectorAll('.content-panel').forEach(panel => {
        panel.classList.remove('active');
    });
    document.getElementById(`panel-${panelId}`).classList.add('active');

    // Render content for the panel
    switch(panelId) {
        case 'schedule':
            renderSchedule();
            break;
        case 'kol-management':
            renderKOLManagement();
            break;
        case 'skills':
            renderSkillTree();
            break;
        case 'career':
            renderCareerPath();
            break;
        case 'advisory-boards':
            renderAdvisoryBoards();
            break;
        case 'iis':
            renderIIS();
            break;
        case 'conferences':
            renderConferences();
            break;
        case 'training':
            renderTraining();
            break;
    }
}

// ==================== WEEKLY ACTIVITIES ====================

function generateWeeklyActivities() {
    const activities = [];
    const activityTypes = [
        {
            type: 'kol-meeting',
            title: 'KOL Scientific Exchange',
            description: 'Scheduled meeting to discuss clinical data and gather insights',
            xpReward: 30,
            time: '2 hours'
        },
        {
            type: 'site-visit',
            title: 'Clinical Site Visit',
            description: 'Visit to clinical trial site for investigator support',
            xpReward: 40,
            time: '4 hours'
        },
        {
            type: 'medical-education',
            title: 'Medical Education Program',
            description: 'Present at or attend a medical education event',
            xpReward: 35,
            time: '3 hours'
        },
        {
            type: 'internal-meeting',
            title: 'Cross-functional Team Meeting',
            description: 'Collaborate with commercial, clinical, and medical teams',
            xpReward: 20,
            time: '1 hour'
        }
    ];

    // Generate 3-5 activities per week based on territory
    const count = Math.floor(Math.random() * 3) + 3;
    for (let i = 0; i < count; i++) {
        const actType = activityTypes[Math.floor(Math.random() * activityTypes.length)];
        const kol = gameState.kols[Math.floor(Math.random() * gameState.kols.length)];

        activities.push({
            id: `activity-${Date.now()}-${i}`,
            ...actType,
            kol: actType.type === 'kol-meeting' || actType.type === 'site-visit' ? kol : null,
            day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'][Math.floor(Math.random() * 5)],
            completed: false
        });
    }

    gameState.activities = activities;
    document.getElementById('schedule-badge').textContent = activities.length;
}

function renderSchedule() {
    const content = document.getElementById('schedule-content');

    if (gameState.activities.length === 0) {
        content.innerHTML = '<p style="color: var(--text-secondary);">No activities scheduled this week. Click "Refresh Activities" to generate new activities.</p>';
        return;
    }

    content.innerHTML = gameState.activities.map(activity => `
        <div class="activity-card">
            <div class="activity-header">
                <div>
                    <div class="activity-type">${activity.type.replace('-', ' ')}</div>
                    <div class="activity-title">${activity.title}</div>
                </div>
                <div class="activity-time">
                    <div>${activity.day}</div>
                    <div>${activity.time}</div>
                </div>
            </div>
            <div class="activity-description">
                ${activity.description}
                ${activity.kol ? `<br><strong>KOL:</strong> ${activity.kol.name} - ${activity.kol.institution}` : ''}
            </div>
            <div class="activity-rewards">
                <span class="reward-item positive">+${activity.xpReward} XP</span>
                ${activity.kol ? '<span class="reward-item positive">+Relationship</span>' : ''}
                <span class="reward-item positive">+Productivity</span>
            </div>
            <div class="activity-actions">
                <button class="btn btn-small btn-primary" onclick="startActivity('${activity.id}')">Start Activity</button>
                <button class="btn btn-small btn-secondary" onclick="skipActivity('${activity.id}')">Skip</button>
            </div>
        </div>
    `).join('');
}

function startActivity(activityId) {
    const activity = gameState.activities.find(a => a.id === activityId);
    if (!activity) return;

    if (activity.kol) {
        // Start dialogue scenario
        startDialogue(activity.kol, 'scientific-exchange');
    } else {
        // Complete internal activity directly
        completeActivity(activityId, true);
    }
}

function skipActivity(activityId) {
    gameState.activities = gameState.activities.filter(a => a.id !== activityId);
    gameState.metrics.productivity = Math.max(0, gameState.metrics.productivity - 5);
    updateMetersDisplay();
    renderSchedule();
    document.getElementById('schedule-badge').textContent = gameState.activities.length;
}

function completeActivity(activityId, success = true) {
    const activity = gameState.activities.find(a => a.id === activityId);
    if (!activity) return;

    if (success) {
        addXP(activity.xpReward);
        gameState.metrics.productivity = Math.min(100, gameState.metrics.productivity + 5);
        gameState.stats.totalInteractions++;

        if (activity.kol) {
            const kolIndex = gameState.kols.findIndex(k => k.id === activity.kol.id);
            if (kolIndex !== -1) {
                gameState.kols[kolIndex].relationship = Math.min(100, gameState.kols[kolIndex].relationship + 5);
                gameState.kols[kolIndex].interactions++;
                gameState.kols[kolIndex].lastContact = `Week ${gameState.time.week}`;
            }
        }

        addNotification('Activity Completed', `Successfully completed: ${activity.title}`, 'success');
    }

    gameState.activities = gameState.activities.filter(a => a.id !== activityId);
    document.getElementById('schedule-badge').textContent = gameState.activities.length;
    updateAllDisplays();
}

// ==================== DIALOGUE SYSTEM ====================

function startDialogue(kol, scenarioType) {
    const scenarios = DIALOGUE_SCENARIOS[scenarioType];
    if (!scenarios || scenarios.length === 0) return;

    const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];

    // Store current dialogue state
    gameState.currentDialogue = {
        kol: kol,
        scenario: scenario,
        scenarioType: scenarioType
    };

    // Update dialogue UI
    document.getElementById('dialogue-context').textContent = scenario.context;
    document.getElementById('dialogue-avatar').textContent = kol.initials;
    document.getElementById('dialogue-kol-name').textContent = kol.name;
    document.getElementById('dialogue-kol-title').textContent = `${kol.title}, ${kol.specialty}`;
    document.getElementById('dialogue-speaker').textContent = kol.name;
    document.getElementById('dialogue-text').textContent = `"${scenario.message}"`;

    // Render options
    const optionsContainer = document.getElementById('dialogue-options');
    optionsContainer.innerHTML = scenario.options.map((opt, idx) => `
        <div class="dialogue-option" onclick="selectDialogueOption(${idx})">
            <div class="dialogue-option-text">${opt.text}</div>
            <div class="dialogue-option-hint">
                ${opt.complianceRisk === 0 ? '<span class="hint-compliance">Low Risk</span>' :
                  opt.complianceRisk === 1 ? '<span style="color: var(--warning);">Moderate Risk</span>' :
                  '<span class="hint-risk">High Risk</span>'}
            </div>
        </div>
    `).join('');

    // Hide result, show options
    document.getElementById('dialogue-result').style.display = 'none';
    document.getElementById('dialogue-options').style.display = 'flex';

    // Show dialogue overlay
    document.getElementById('dialogue-overlay').style.display = 'flex';
}

function selectDialogueOption(optionIndex) {
    const dialogue = gameState.currentDialogue;
    const option = dialogue.scenario.options[optionIndex];

    // Hide options
    document.getElementById('dialogue-options').style.display = 'none';

    // Show result
    const resultContainer = document.getElementById('dialogue-result');
    resultContainer.innerHTML = `
        <div class="result-header ${option.outcome}">${
            option.outcome === 'success' ? 'Excellent Response!' :
            option.outcome === 'failure' ? 'Poor Response' : 'Acceptable Response'
        }</div>
        <p style="color: var(--text-secondary); line-height: 1.6;">${option.feedback}</p>
        <div class="result-effects">
            ${Object.entries(option.effects).map(([key, value]) => {
                if (key === 'insight' && value) return '<span class="effect-badge effect-positive">+1 Medical Insight</span>';
                if (value > 0) return `<span class="effect-badge effect-positive">+${value} ${formatEffectName(key)}</span>`;
                if (value < 0) return `<span class="effect-badge effect-negative">${value} ${formatEffectName(key)}</span>`;
                return '';
            }).join('')}
        </div>
        <button class="btn btn-primary" style="margin-top: 1.5rem;" onclick="closeDialogue()">Continue</button>
    `;
    resultContainer.style.display = 'block';

    // Apply effects
    applyDialogueEffects(option.effects, dialogue.kol);
}

function applyDialogueEffects(effects, kol) {
    if (effects.xp) addXP(effects.xp);
    if (effects.relationship) {
        const kolIndex = gameState.kols.findIndex(k => k.id === kol.id);
        if (kolIndex !== -1) {
            gameState.kols[kolIndex].relationship = Math.max(0, Math.min(100,
                gameState.kols[kolIndex].relationship + effects.relationship));
        }
    }
    if (effects.reputation) {
        gameState.metrics.reputation = Math.max(0, Math.min(100,
            gameState.metrics.reputation + effects.reputation));
    }
    if (effects.compliance) {
        gameState.metrics.compliance = Math.max(0, Math.min(100,
            gameState.metrics.compliance + effects.compliance));
    }
    if (effects.jobSecurity) {
        gameState.metrics.jobSecurity = Math.max(0, Math.min(100,
            gameState.metrics.jobSecurity + effects.jobSecurity));
    }
    if (effects.insight) {
        gameState.stats.insightsGathered++;
        addNotification('Medical Insight Gathered', 'You identified a valuable insight that could inform medical strategy.', 'success');
    }

    gameState.stats.totalInteractions++;
    updateAllDisplays();
}

function closeDialogue() {
    document.getElementById('dialogue-overlay').style.display = 'none';

    // Complete the associated activity if there was one
    const activity = gameState.activities.find(a => a.kol && a.kol.id === gameState.currentDialogue.kol.id);
    if (activity) {
        completeActivity(activity.id, true);
    }

    gameState.currentDialogue = null;
}

function formatEffectName(key) {
    const names = {
        relationship: 'Relationship',
        reputation: 'Reputation',
        compliance: 'Compliance',
        jobSecurity: 'Job Security',
        xp: 'XP'
    };
    return names[key] || key;
}

// ==================== KOL MANAGEMENT ====================

function renderKOLManagement() {
    const filter = document.getElementById('kol-filter').value;
    let filteredKOLs = [...gameState.kols];

    if (filter === 'high') {
        filteredKOLs = filteredKOLs.filter(k => k.priority === 'high');
    } else if (filter === 'engaged') {
        filteredKOLs = filteredKOLs.filter(k => k.relationship >= 30);
    } else if (filter === 'new') {
        filteredKOLs = filteredKOLs.filter(k => k.interactions === 0);
    }

    const grid = document.getElementById('kol-grid');
    grid.innerHTML = filteredKOLs.map(kol => `
        <div class="kol-card">
            <div class="kol-header">
                <div class="kol-avatar">${kol.initials}</div>
                <div class="kol-info">
                    <h3>${kol.name}</h3>
                    <div class="kol-specialty">${kol.specialty}</div>
                    <div class="kol-institution">${kol.institution}</div>
                </div>
            </div>
            <div class="kol-metrics">
                <div class="kol-metric">
                    <div class="kol-metric-value">${kol.influence}</div>
                    <div class="kol-metric-label">Influence</div>
                </div>
                <div class="kol-metric">
                    <div class="kol-metric-value">${kol.accessibility}</div>
                    <div class="kol-metric-label">Access</div>
                </div>
                <div class="kol-metric">
                    <div class="kol-metric-value">${kol.interactions}</div>
                    <div class="kol-metric-label">Meetings</div>
                </div>
            </div>
            <div class="kol-relationship-bar">
                <div class="relationship-label">
                    <span>Relationship</span>
                    <span>${kol.relationship}%</span>
                </div>
                <div class="relationship-bar">
                    <div class="relationship-fill" style="width: ${kol.relationship}%"></div>
                </div>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 1rem;">
                <strong>Interests:</strong> ${kol.interests.join(', ')}
            </div>
            <div style="display: flex; gap: 0.5rem;">
                <button class="btn btn-small btn-primary" onclick="initiateKOLMeeting('${kol.id}')">Schedule Meeting</button>
                <button class="btn btn-small btn-secondary" onclick="viewKOLProfile('${kol.id}')">Profile</button>
            </div>
        </div>
    `).join('');
}

function filterKOLs() {
    renderKOLManagement();
}

function initiateKOLMeeting(kolId) {
    const kol = gameState.kols.find(k => k.id === kolId);
    if (!kol) return;

    // Randomly select a scenario type
    const scenarioTypes = ['scientific-exchange', 'compliance-challenge'];
    const type = scenarioTypes[Math.floor(Math.random() * scenarioTypes.length)];

    startDialogue(kol, type);
}

function viewKOLProfile(kolId) {
    const kol = gameState.kols.find(k => k.id === kolId);
    if (!kol) return;

    alert(`KOL Profile: ${kol.name}\n\nInstitution: ${kol.institution}\nSpecialty: ${kol.specialty}\nTitle: ${kol.title}\n\nPersonality: ${kol.personality.type}\n${kol.personality.description}\n\nInterests: ${kol.interests.join(', ')}\n\nIIS Interest: ${kol.iisInterest ? 'Yes' : 'No'}\nAd Board Participant: ${kol.adboardParticipant ? 'Yes' : 'No'}`);
}

// ==================== CRM SYSTEM ====================

function populateCRMDropdown() {
    const select = document.getElementById('crm-kol');
    select.innerHTML = gameState.kols.map(kol =>
        `<option value="${kol.id}">${kol.name} - ${kol.institution}</option>`
    ).join('');
}

function submitCRMEntry() {
    const kolId = document.getElementById('crm-kol').value;
    const type = document.getElementById('crm-type').value;
    const summary = document.getElementById('crm-summary').value;
    const insights = document.getElementById('crm-insights').value;
    const followup = document.getElementById('crm-followup').value;

    const selectedTags = Array.from(document.querySelectorAll('.insight-tag.selected'))
        .map(tag => tag.dataset.tag);

    if (!summary.trim()) {
        alert('Please provide an interaction summary');
        return;
    }

    const kol = gameState.kols.find(k => k.id === kolId);

    const entry = {
        id: `crm-${Date.now()}`,
        kol: kol,
        type: type,
        topics: selectedTags,
        summary: summary,
        insights: insights,
        followup: followup,
        date: `Week ${gameState.time.week}, Q${gameState.time.quarter} ${gameState.time.year}`
    };

    gameState.crmHistory.unshift(entry);
    gameState.stats.crmEntries++;

    // Award XP for documentation
    addXP(15);
    gameState.metrics.productivity = Math.min(100, gameState.metrics.productivity + 3);

    // If insights were documented, count it
    if (insights.trim().length > 50) {
        gameState.stats.insightsGathered++;
        addXP(10);
        addNotification('Insight Documented', 'Your insight has been recorded and will be shared with the medical strategy team.', 'success');
    }

    // Clear form
    document.getElementById('crm-summary').value = '';
    document.getElementById('crm-insights').value = '';
    document.querySelectorAll('.insight-tag').forEach(tag => tag.classList.remove('selected'));

    addNotification('CRM Entry Submitted', `Interaction with ${kol.name} has been documented.`, 'info');

    updateAllDisplays();
    renderCRMHistory();
}

function renderCRMHistory() {
    const container = document.getElementById('crm-history');
    if (gameState.crmHistory.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary);">No interactions documented yet.</p>';
        return;
    }

    container.innerHTML = gameState.crmHistory.slice(0, 5).map(entry => `
        <div class="activity-card" style="padding: 1rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <strong>${entry.kol.name}</strong>
                <span style="color: var(--text-muted); font-size: 0.85rem;">${entry.date}</span>
            </div>
            <div style="font-size: 0.85rem; color: var(--secondary); margin-bottom: 0.5rem;">${entry.type.replace('-', ' ').toUpperCase()}</div>
            <p style="font-size: 0.9rem; color: var(--text-secondary);">${entry.summary.substring(0, 150)}${entry.summary.length > 150 ? '...' : ''}</p>
            ${entry.topics.length > 0 ? `
                <div style="margin-top: 0.5rem;">
                    ${entry.topics.map(t => `<span class="insight-tag">${t}</span>`).join(' ')}
                </div>
            ` : ''}
        </div>
    `).join('');
}

// ==================== SKILL TREE ====================

function renderSkillTree() {
    const container = document.getElementById('skill-tree');

    container.innerHTML = Object.entries(SKILL_TREE).map(([branchKey, branch]) => `
        <div class="skill-branch">
            <div class="skill-branch-title">${branch.name}</div>
            ${branch.skills.map(skill => {
                const currentLevel = gameState.skills[skill.id] || 0;
                const isMaxed = currentLevel >= skill.maxLevel;
                const canUpgrade = gameState.player.skillPoints > 0 && !isMaxed;

                return `
                    <div class="skill-item ${isMaxed ? 'maxed' : ''} ${canUpgrade ? '' : 'locked'}"
                         onclick="${canUpgrade ? `upgradeSkill('${skill.id}')` : ''}"
                         title="${skill.description}">
                        <div>
                            <div class="skill-name">${skill.name}</div>
                            <div style="font-size: 0.75rem; color: var(--text-muted);">${skill.description}</div>
                        </div>
                        <div class="skill-level">
                            ${Array(skill.maxLevel).fill(0).map((_, i) =>
                                `<div class="skill-dot ${i < currentLevel ? 'filled' : ''}"></div>`
                            ).join('')}
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `).join('');
}

function upgradeSkill(skillId) {
    if (gameState.player.skillPoints <= 0) return;

    let skill = null;
    Object.values(SKILL_TREE).forEach(branch => {
        const found = branch.skills.find(s => s.id === skillId);
        if (found) skill = found;
    });

    if (!skill) return;

    const currentLevel = gameState.skills[skillId] || 0;
    if (currentLevel >= skill.maxLevel) return;

    gameState.skills[skillId] = currentLevel + 1;
    gameState.player.skillPoints--;

    addNotification('Skill Upgraded', `${skill.name} is now level ${currentLevel + 1}!`, 'success');
    updateAllDisplays();
    renderSkillTree();
}

// ==================== CAREER PATH ====================

const CAREER_LEVELS = [
    { title: 'MSL I', minLevel: 1, requirements: 'Entry level position' },
    { title: 'MSL II', minLevel: 5, requirements: '50+ KOL interactions, 10+ insights' },
    { title: 'Senior MSL', minLevel: 10, requirements: '100+ interactions, advisory board experience' },
    { title: 'Lead MSL', minLevel: 15, requirements: 'Regional leadership, IIS support, mentoring' },
    { title: 'Regional Medical Director', minLevel: 20, requirements: 'Strategic planning, team management' },
    { title: 'Medical Director', minLevel: 25, requirements: 'Cross-functional leadership, global experience' }
];

function renderCareerPath() {
    const content = document.getElementById('career-content');

    const currentCareerIndex = CAREER_LEVELS.findIndex(c => c.title === gameState.player.title);

    content.innerHTML = `
        <div class="activity-card">
            <h3 style="color: var(--secondary); margin-bottom: 1rem;">Current Position</h3>
            <div style="font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem;">${gameState.player.title}</div>
            <div style="color: var(--text-secondary); margin-bottom: 1rem;">Level ${gameState.player.level}</div>
            <div class="meter" style="max-width: 100%;">
                <div class="meter-header">
                    <span class="meter-label">Progress to Next Level</span>
                    <span class="meter-value">${gameState.player.xp % gameState.player.xpToNextLevel}/${gameState.player.xpToNextLevel} XP</span>
                </div>
                <div class="meter-bar">
                    <div class="meter-fill reputation" style="width: ${(gameState.player.xp % gameState.player.xpToNextLevel) / gameState.player.xpToNextLevel * 100}%"></div>
                </div>
            </div>
        </div>

        <h3 style="margin: 1.5rem 0 1rem;">Career Progression</h3>
        <div style="display: flex; flex-direction: column; gap: 1rem;">
            ${CAREER_LEVELS.map((career, idx) => {
                const isCurrent = career.title === gameState.player.title;
                const isPast = idx < currentCareerIndex;
                const isFuture = idx > currentCareerIndex;

                return `
                    <div class="activity-card" style="border-left: 4px solid ${isCurrent ? 'var(--secondary)' : isPast ? 'var(--success)' : 'var(--bg-lighter)'}; ${isCurrent ? 'background: rgba(87, 197, 182, 0.1);' : ''}">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <div style="font-weight: bold; ${isFuture ? 'color: var(--text-muted);' : ''}">${career.title}</div>
                                <div style="font-size: 0.85rem; color: var(--text-secondary);">Level ${career.minLevel}+</div>
                            </div>
                            ${isCurrent ? '<span style="background: var(--secondary); color: var(--bg-dark); padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.8rem; font-weight: bold;">CURRENT</span>' : ''}
                            ${isPast ? '<span style="color: var(--success);">✓ Achieved</span>' : ''}
                        </div>
                        <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.5rem;">${career.requirements}</div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

// ==================== ADVISORY BOARDS ====================

function renderAdvisoryBoards() {
    const content = document.getElementById('advisory-boards-content');

    content.innerHTML = `
        <div class="activity-card">
            <h3 style="color: var(--secondary); margin-bottom: 1rem;">What are Advisory Boards?</h3>
            <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
                Advisory boards bring together Key Opinion Leaders to provide expert input on medical strategy,
                clinical development, educational initiatives, and scientific communication. As an MSL, you play
                a crucial role in identifying appropriate advisors, facilitating discussions, and gathering insights.
            </p>
            <h4 style="margin-top: 1rem; margin-bottom: 0.5rem;">Key Compliance Considerations:</h4>
            <ul style="color: var(--text-secondary); margin-left: 1.5rem; line-height: 1.8;">
                <li>Fair market value compensation for KOL time</li>
                <li>Legitimate business need for the advisory board</li>
                <li>Balanced selection of advisors (not based on prescription volume)</li>
                <li>No promotional intent - focus on gathering input</li>
                <li>Proper documentation of insights and follow-up actions</li>
            </ul>
        </div>

        <div class="activity-card" style="margin-top: 1rem;">
            <h3 style="color: var(--secondary); margin-bottom: 1rem;">Advisory Board Opportunities</h3>
            ${gameState.kols.filter(k => k.adboardParticipant && k.relationship >= 30).length > 0 ? `
                <p style="color: var(--text-secondary); margin-bottom: 1rem;">
                    You have ${gameState.kols.filter(k => k.adboardParticipant && k.relationship >= 30).length} KOLs
                    with sufficient relationship levels who are potential advisory board participants.
                </p>
                <button class="btn btn-primary" onclick="startAdBoardScenario()">Plan Advisory Board</button>
            ` : `
                <p style="color: var(--text-secondary);">
                    Build stronger relationships with KOLs (30%+ relationship score) to unlock advisory board planning.
                </p>
            `}
        </div>

        <div class="activity-card" style="margin-top: 1rem;">
            <h3 style="color: var(--secondary); margin-bottom: 1rem;">Advisory Board History</h3>
            <p style="color: var(--text-secondary);">Total Advisory Boards: ${gameState.stats.advisoryBoards}</p>
        </div>
    `;
}

function startAdBoardScenario() {
    const eligibleKOLs = gameState.kols.filter(k => k.adboardParticipant && k.relationship >= 30);
    if (eligibleKOLs.length < 3) {
        alert('You need at least 3 eligible KOLs to plan an advisory board.');
        return;
    }

    // Start advisory board dialogue scenario
    startDialogue(eligibleKOLs[0], 'advisory-board');
    gameState.stats.advisoryBoards++;
}

// ==================== IIS SYSTEM ====================

function renderIIS() {
    const content = document.getElementById('iis-content');

    const iisInterestKOLs = gameState.kols.filter(k => k.iisInterest && k.relationship >= 40);

    content.innerHTML = `
        <div class="activity-card">
            <h3 style="color: var(--secondary); margin-bottom: 1rem;">About Investigator Initiated Studies</h3>
            <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
                IIS programs support independent research conducted by external investigators. MSLs serve as
                the scientific interface, helping investigators understand the IIS process and providing
                scientific support while maintaining appropriate boundaries.
            </p>
            <h4 style="margin-top: 1rem; margin-bottom: 0.5rem;">MSL Role in IIS:</h4>
            <ul style="color: var(--text-secondary); margin-left: 1.5rem; line-height: 1.8;">
                <li>Identify potential investigators with research interest</li>
                <li>Explain the IIS process and requirements</li>
                <li>Provide scientific input on study design (when requested)</li>
                <li>Facilitate proposal submission to grants committee</li>
                <li>Support ongoing studies with scientific information</li>
            </ul>
        </div>

        <div class="activity-card" style="margin-top: 1rem;">
            <h3 style="color: var(--secondary); margin-bottom: 1rem;">Potential IIS Investigators</h3>
            ${iisInterestKOLs.length > 0 ? `
                <div style="display: grid; gap: 1rem;">
                    ${iisInterestKOLs.map(kol => `
                        <div style="background: var(--bg-lighter); padding: 1rem; border-radius: 8px; display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <strong>${kol.name}</strong>
                                <div style="font-size: 0.85rem; color: var(--text-secondary);">${kol.institution}</div>
                                <div style="font-size: 0.8rem; color: var(--text-muted);">Interests: ${kol.interests.slice(0, 2).join(', ')}</div>
                            </div>
                            <button class="btn btn-small btn-primary" onclick="startIISDiscussion('${kol.id}')">Discuss IIS</button>
                        </div>
                    `).join('')}
                </div>
            ` : `
                <p style="color: var(--text-secondary);">
                    Build relationships with KOLs (40%+ relationship) who have expressed IIS interest to unlock discussions.
                </p>
            `}
        </div>

        <div class="activity-card" style="margin-top: 1rem;">
            <h3 style="color: var(--secondary); margin-bottom: 1rem;">IIS Statistics</h3>
            <p style="color: var(--text-secondary);">Studies Supported: ${gameState.stats.iisSupported}</p>
        </div>
    `;
}

function startIISDiscussion(kolId) {
    const kol = gameState.kols.find(k => k.id === kolId);
    if (!kol) return;

    startDialogue(kol, 'iis-discussion');
    gameState.stats.iisSupported++;
}

// ==================== CONFERENCES ====================

function generateUpcomingConferences() {
    const conferences = [
        { name: 'ASCO Annual Meeting', type: 'Major Congress', location: 'Chicago, IL', weeks: 8 },
        { name: 'Regional Oncology Symposium', type: 'Regional Meeting', location: 'Local', weeks: 3 },
        { name: 'ESMO Congress', type: 'Major Congress', location: 'Barcelona, Spain', weeks: 16 },
        { name: 'State Medical Society Meeting', type: 'Local Meeting', location: 'In Territory', weeks: 5 }
    ];

    gameState.upcomingConferences = conferences.map(conf => ({
        ...conf,
        id: `conf-${Date.now()}-${Math.random()}`,
        attended: false
    }));
}

function renderConferences() {
    const content = document.getElementById('conferences-content');

    content.innerHTML = `
        <div class="activity-card">
            <h3 style="color: var(--secondary); margin-bottom: 1rem;">Conference Strategy</h3>
            <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
                Medical conferences are prime opportunities for scientific exchange, relationship building,
                and insight gathering. Plan your conference attendance strategically to maximize impact.
            </p>
            <h4 style="margin-top: 1rem; margin-bottom: 0.5rem;">Conference Activities:</h4>
            <ul style="color: var(--text-secondary); margin-left: 1.5rem; line-height: 1.8;">
                <li>Attend scientific sessions relevant to your therapeutic area</li>
                <li>Network with KOLs at poster sessions and receptions</li>
                <li>Support company booth with scientific expertise</li>
                <li>Gather competitive intelligence from presentations</li>
                <li>Identify new KOLs and research opportunities</li>
            </ul>
        </div>

        <h3 style="margin: 1.5rem 0 1rem;">Upcoming Conferences</h3>
        <div class="conference-schedule">
            ${gameState.upcomingConferences.map(conf => `
                <div class="schedule-item" onclick="attendConference('${conf.id}')">
                    <div class="schedule-time">Week ${gameState.time.week + conf.weeks}</div>
                    <div class="schedule-info">
                        <h4>${conf.name}</h4>
                        <p>${conf.type} - ${conf.location}</p>
                    </div>
                    ${!conf.attended ? '<button class="btn btn-small btn-primary">Attend</button>' : '<span style="color: var(--success);">✓ Attended</span>'}
                </div>
            `).join('')}
        </div>

        <div class="activity-card" style="margin-top: 1.5rem;">
            <h3 style="color: var(--secondary); margin-bottom: 1rem;">Conference Statistics</h3>
            <p style="color: var(--text-secondary);">Conferences Attended: ${gameState.stats.conferencesAttended}</p>
        </div>
    `;
}

function attendConference(confId) {
    const conf = gameState.upcomingConferences.find(c => c.id === confId);
    if (!conf || conf.attended) return;

    conf.attended = true;
    gameState.stats.conferencesAttended++;

    // Conference benefits
    addXP(75);
    gameState.metrics.reputation = Math.min(100, gameState.metrics.reputation + 10);
    gameState.metrics.productivity = Math.min(100, gameState.metrics.productivity + 5);

    // Chance to gather insights
    if (Math.random() > 0.5) {
        gameState.stats.insightsGathered++;
        addNotification('Conference Insight', `You gathered valuable competitive intelligence at ${conf.name}.`, 'success');
    }

    // Start a conference interaction scenario
    const randomKOL = gameState.kols[Math.floor(Math.random() * gameState.kols.length)];
    startDialogue(randomKOL, 'conference-interaction');

    renderConferences();
}

// ==================== TRAINING ====================

function renderTraining() {
    const content = document.getElementById('training-content');

    const trainingModules = [
        { id: 'compliance-101', name: 'Compliance Fundamentals', description: 'FDA regulations, OIG guidelines, and company policies', xp: 50, duration: '2 hours', completed: false },
        { id: 'scientific-comm', name: 'Scientific Communication', description: 'Presenting clinical data effectively to HCPs', xp: 40, duration: '1.5 hours', completed: false },
        { id: 'kol-management', name: 'KOL Relationship Management', description: 'Best practices for building professional relationships', xp: 45, duration: '2 hours', completed: false },
        { id: 'disease-deep-dive', name: 'Disease State Deep Dive', description: 'Advanced pathophysiology and treatment landscape', xp: 60, duration: '3 hours', completed: false },
        { id: 'iis-process', name: 'IIS Program Training', description: 'Supporting investigator-initiated studies', xp: 35, duration: '1 hour', completed: false },
        { id: 'crm-documentation', name: 'CRM Best Practices', description: 'Effective documentation of medical interactions', xp: 30, duration: '1 hour', completed: false }
    ];

    content.innerHTML = `
        <div class="activity-card">
            <h3 style="color: var(--secondary); margin-bottom: 1rem;">Training & Development</h3>
            <p style="color: var(--text-secondary); line-height: 1.6;">
                Continuous learning is essential for MSL success. Complete training modules to improve your
                skills and earn XP. Training also helps ensure compliance with regulations and company policies.
            </p>
        </div>

        <h3 style="margin: 1.5rem 0 1rem;">Available Training Modules</h3>
        <div style="display: grid; gap: 1rem;">
            ${trainingModules.map(module => `
                <div class="activity-card">
                    <div style="display: flex; justify-content: space-between; align-items: start;">
                        <div>
                            <h4>${module.name}</h4>
                            <p style="font-size: 0.9rem; color: var(--text-secondary); margin: 0.5rem 0;">${module.description}</p>
                            <div style="font-size: 0.85rem; color: var(--text-muted);">Duration: ${module.duration}</div>
                        </div>
                        <div style="text-align: right;">
                            <div style="color: var(--success); font-weight: bold; margin-bottom: 0.5rem;">+${module.xp} XP</div>
                            <button class="btn btn-small btn-primary" onclick="completeTraining('${module.id}', ${module.xp})">Complete</button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="activity-card" style="margin-top: 1.5rem;">
            <h3 style="color: var(--secondary); margin-bottom: 1rem;">Training Statistics</h3>
            <p style="color: var(--text-secondary);">Trainings Completed: ${gameState.stats.trainingsCompleted}</p>
        </div>
    `;
}

function completeTraining(moduleId, xp) {
    addXP(xp);
    gameState.stats.trainingsCompleted++;
    gameState.metrics.compliance = Math.min(100, gameState.metrics.compliance + 3);

    addNotification('Training Completed', `You've completed a training module and earned ${xp} XP!`, 'success');
    updateAllDisplays();
}

// ==================== TIME MANAGEMENT ====================

function advanceWeek() {
    gameState.time.week++;

    // Check for quarter end
    if (gameState.time.week % 13 === 0) {
        gameState.time.quarter++;
        if (gameState.time.quarter > 4) {
            gameState.time.quarter = 1;
            gameState.time.year++;
        }
        triggerQuarterlyReview();
    }

    // Generate new activities
    generateWeeklyActivities();

    // Decay relationships slightly if not contacted
    gameState.kols.forEach(kol => {
        if (!kol.lastContact || parseInt(kol.lastContact.split(' ')[1]) < gameState.time.week - 4) {
            kol.relationship = Math.max(0, kol.relationship - 1);
        }
    });

    // Random events
    if (Math.random() > 0.7) {
        triggerRandomEvent();
    }

    // Productivity decay if activities not completed
    gameState.metrics.productivity = Math.max(0, gameState.metrics.productivity - 2);

    addNotification('New Week', `Week ${gameState.time.week} has begun. Check your schedule for new activities.`, 'info');
    updateAllDisplays();
}

function triggerQuarterlyReview() {
    const reviewModal = document.getElementById('review-modal');
    const reviewBody = document.getElementById('review-body');

    document.getElementById('review-quarter').textContent = `Q${gameState.time.quarter === 1 ? 4 : gameState.time.quarter - 1} ${gameState.time.quarter === 1 ? gameState.time.year - 1 : gameState.time.year}`;

    // Calculate performance scores
    const metrics = [
        { name: 'KOL Interactions', score: Math.min(100, gameState.stats.totalInteractions * 5), target: 'Regular engagement' },
        { name: 'Compliance Record', score: gameState.metrics.compliance, target: 'Maintain >80%' },
        { name: 'Insight Generation', score: Math.min(100, gameState.stats.insightsGathered * 10), target: 'Valuable intelligence' },
        { name: 'CRM Documentation', score: Math.min(100, gameState.stats.crmEntries * 5), target: 'Timely documentation' },
        { name: 'Territory Coverage', score: gameState.metrics.productivity, target: 'Strategic prioritization' },
        { name: 'Professional Development', score: Math.min(100, gameState.stats.trainingsCompleted * 15), target: 'Continuous learning' }
    ];

    const avgScore = Math.round(metrics.reduce((a, m) => a + m.score, 0) / metrics.length);

    let outcome = 'meets';
    let outcomeClass = 'warning';
    let outcomeText = 'Meets Expectations';
    let outcomeDescription = 'Continue developing your skills and building KOL relationships.';

    if (avgScore >= 80 && gameState.metrics.compliance >= 90) {
        outcome = 'promotion';
        outcomeClass = 'promotion';
        outcomeText = 'Exceeds Expectations!';
        outcomeDescription = 'Outstanding performance! You are being considered for advancement.';
        gameState.player.skillPoints += 2;
        addXP(100);
    } else if (avgScore < 40 || gameState.metrics.compliance < 50) {
        outcome = 'warning';
        outcomeClass = 'termination';
        outcomeText = 'Performance Improvement Required';
        outcomeDescription = 'You have been placed on a performance improvement plan. Significant improvement is required.';
        gameState.metrics.jobSecurity = Math.max(0, gameState.metrics.jobSecurity - 25);
        gameState.warnings++;

        if (gameState.warnings >= 2) {
            setTimeout(() => triggerGameOver('terminated', 'Your employment has been terminated following two consecutive performance warnings.'), 2000);
        }
    }

    reviewBody.innerHTML = `
        ${metrics.map(m => `
            <div class="review-metric">
                <div>
                    <div class="review-metric-name">${m.name}</div>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">${m.target}</div>
                </div>
                <div class="review-metric-score ${m.score >= 70 ? 'good' : m.score >= 40 ? 'warning' : 'bad'}">${m.score}%</div>
            </div>
        `).join('')}

        <div class="review-outcome ${outcomeClass}">
            <h3>${outcomeText}</h3>
            <p style="color: var(--text-secondary);">${outcomeDescription}</p>
            ${outcome === 'promotion' ? '<p style="color: var(--success); margin-top: 0.5rem;">+2 Skill Points, +100 XP</p>' : ''}
        </div>

        <button class="btn btn-primary" style="margin-top: 1.5rem; width: 100%;" onclick="closeReviewModal()">Continue</button>
    `;

    reviewModal.style.display = 'flex';
}

function closeReviewModal() {
    document.getElementById('review-modal').style.display = 'none';
    checkPromotion();
}

function checkPromotion() {
    const currentIndex = CAREER_LEVELS.findIndex(c => c.title === gameState.player.title);
    if (currentIndex < CAREER_LEVELS.length - 1) {
        const nextLevel = CAREER_LEVELS[currentIndex + 1];
        if (gameState.player.level >= nextLevel.minLevel) {
            gameState.player.title = nextLevel.title;
            addNotification('Promotion!', `Congratulations! You have been promoted to ${nextLevel.title}!`, 'success');
            addXP(200);
        }
    }

    // Check for game win
    if (gameState.player.title === 'Medical Director') {
        triggerGameOver('promoted', 'Congratulations! You have reached the pinnacle of the MSL career path and been promoted to Medical Director!');
    }
}

function triggerRandomEvent() {
    const events = [
        {
            title: 'Urgent Medical Information Request',
            description: 'A physician needs urgent scientific information about your product.',
            effect: () => {
                addXP(25);
                gameState.metrics.reputation += 5;
            }
        },
        {
            title: 'Competitor Launch',
            description: 'A competitor has launched a new product. KOLs have questions.',
            effect: () => {
                gameState.kols.forEach(k => k.relationship = Math.max(0, k.relationship - 3));
            }
        },
        {
            title: 'Positive Publication',
            description: 'A favorable study has been published about your product.',
            effect: () => {
                gameState.metrics.reputation += 10;
                addXP(30);
            }
        },
        {
            title: 'Compliance Audit',
            description: 'Your region is undergoing a compliance audit.',
            effect: () => {
                if (gameState.metrics.compliance >= 80) {
                    addNotification('Audit Passed', 'Your compliance records are exemplary.', 'success');
                    addXP(50);
                } else {
                    addNotification('Audit Concerns', 'The audit found some documentation gaps.', 'warning');
                    gameState.metrics.jobSecurity -= 10;
                }
            }
        }
    ];

    const event = events[Math.floor(Math.random() * events.length)];
    addNotification(event.title, event.description, 'warning');
    event.effect();
    updateAllDisplays();
}

// ==================== XP & LEVELING ====================

function addXP(amount) {
    gameState.player.xp += amount;

    while (gameState.player.xp >= gameState.player.xpToNextLevel) {
        gameState.player.xp -= gameState.player.xpToNextLevel;
        gameState.player.level++;
        gameState.player.xpToNextLevel = Math.floor(gameState.player.xpToNextLevel * 1.2);
        gameState.player.skillPoints++;

        addNotification('Level Up!', `You are now level ${gameState.player.level}! You earned 1 skill point.`, 'success');
    }

    updatePlayerDisplay();
}

// ==================== NOTIFICATIONS ====================

function addNotification(title, text, type = 'info') {
    gameState.notifications.unshift({
        id: `notif-${Date.now()}`,
        title: title,
        text: text,
        type: type,
        time: `Week ${gameState.time.week}`
    });

    // Keep only last 10 notifications
    if (gameState.notifications.length > 10) {
        gameState.notifications = gameState.notifications.slice(0, 10);
    }

    updateNotifications();
}

function updateNotifications() {
    const container = document.getElementById('notifications-list');
    container.innerHTML = gameState.notifications.slice(0, 5).map(notif => `
        <div class="notification-item ${notif.type === 'urgent' ? 'urgent' : notif.type === 'warning' ? 'warning' : ''}">
            <div class="notification-title">${notif.title}</div>
            <div class="notification-text">${notif.text}</div>
            <div class="notification-time">${notif.time}</div>
        </div>
    `).join('');
}

function updateUpcomingEvents() {
    const container = document.getElementById('upcoming-events');
    const events = gameState.upcomingConferences
        .filter(c => !c.attended)
        .slice(0, 3)
        .map(conf => `
            <div class="notification-item">
                <div class="notification-title">${conf.name}</div>
                <div class="notification-text">${conf.type}</div>
                <div class="notification-time">Week ${gameState.time.week + conf.weeks}</div>
            </div>
        `).join('');

    container.innerHTML = events || '<p style="color: var(--text-muted); font-size: 0.85rem;">No upcoming events</p>';
}

function updateQuickStats() {
    const container = document.getElementById('quick-stats');
    container.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
            <div style="background: var(--bg-lighter); padding: 0.5rem; border-radius: 6px; text-align: center;">
                <div style="font-size: 1.2rem; font-weight: bold; color: var(--secondary);">${gameState.stats.totalInteractions}</div>
                <div style="font-size: 0.7rem; color: var(--text-muted);">Interactions</div>
            </div>
            <div style="background: var(--bg-lighter); padding: 0.5rem; border-radius: 6px; text-align: center;">
                <div style="font-size: 1.2rem; font-weight: bold; color: var(--secondary);">${gameState.stats.insightsGathered}</div>
                <div style="font-size: 0.7rem; color: var(--text-muted);">Insights</div>
            </div>
            <div style="background: var(--bg-lighter); padding: 0.5rem; border-radius: 6px; text-align: center;">
                <div style="font-size: 1.2rem; font-weight: bold; color: var(--secondary);">${gameState.stats.crmEntries}</div>
                <div style="font-size: 0.7rem; color: var(--text-muted);">CRM Entries</div>
            </div>
            <div style="background: var(--bg-lighter); padding: 0.5rem; border-radius: 6px; text-align: center;">
                <div style="font-size: 1.2rem; font-weight: bold; color: var(--secondary);">${gameState.kols.filter(k => k.relationship >= 50).length}</div>
                <div style="font-size: 0.7rem; color: var(--text-muted);">Strong KOLs</div>
            </div>
        </div>
    `;
}

// ==================== TUTORIAL ====================

const TUTORIAL_PAGES = [
    {
        title: 'Welcome to MSL Career Simulator',
        content: `
            <p>This simulation will help you understand the role of a Medical Science Liaison (MSL)
            through realistic scenarios and challenges.</p>
            <h3>What is an MSL?</h3>
            <p>MSLs are field-based scientific experts who work for pharmaceutical and biotech companies.
            They serve as the scientific bridge between their company and the healthcare community.</p>
            <h3>Key Responsibilities:</h3>
            <ul>
                <li>Scientific exchange with Key Opinion Leaders (KOLs)</li>
                <li>Medical education and clinical support</li>
                <li>Gathering medical insights</li>
                <li>Supporting clinical trials and IIS programs</li>
                <li>Conference attendance and networking</li>
            </ul>
        `
    },
    {
        title: 'Compliance is Critical',
        content: `
            <p>As an MSL, you must operate within strict regulatory and compliance boundaries.</p>
            <h3>Key Compliance Rules:</h3>
            <ul>
                <li><strong>No promotional activity</strong> - MSLs provide scientific information, not sales messages</li>
                <li><strong>On-label discussions only</strong> - Unless responding to unsolicited requests</li>
                <li><strong>Fair balanced information</strong> - Present both benefits and risks</li>
                <li><strong>Proper documentation</strong> - Record all interactions in CRM</li>
                <li><strong>Appropriate KOL engagement</strong> - Based on scientific need, not prescription volume</li>
            </ul>
            <p style="color: var(--danger);">Warning: Compliance violations can result in termination!</p>
        `
    },
    {
        title: 'Building KOL Relationships',
        content: `
            <p>KOL relationships are built on trust, scientific credibility, and consistent value delivery.</p>
            <h3>Tips for Success:</h3>
            <ul>
                <li>Know your data inside and out</li>
                <li>Understand each KOL's interests and communication style</li>
                <li>Follow up promptly on information requests</li>
                <li>Respect their time and priorities</li>
                <li>Be honest about limitations of your data</li>
            </ul>
            <h3>Relationship Levels:</h3>
            <p>Build relationships from 0-100%. Higher relationships unlock advisory board and IIS opportunities.</p>
        `
    },
    {
        title: 'Career Progression',
        content: `
            <p>Your MSL career can advance based on performance, skills, and experience.</p>
            <h3>Career Path:</h3>
            <ul>
                <li>MSL I → MSL II → Senior MSL → Lead MSL → Regional Medical Director → Medical Director</li>
            </ul>
            <h3>How to Advance:</h3>
            <ul>
                <li>Complete KOL interactions and document in CRM</li>
                <li>Gather valuable medical insights</li>
                <li>Maintain high compliance scores</li>
                <li>Complete training modules</li>
                <li>Support advisory boards and IIS programs</li>
            </ul>
            <h3>Quarterly Reviews:</h3>
            <p>Every 13 weeks, you'll receive a performance review. Poor reviews can lead to termination.</p>
        `
    },
    {
        title: 'Game Controls',
        content: `
            <h3>Navigation:</h3>
            <ul>
                <li><strong>Dashboard</strong> - Overview of your territory and priorities</li>
                <li><strong>Schedule</strong> - Weekly activities to complete</li>
                <li><strong>KOL Management</strong> - View and engage with your KOLs</li>
                <li><strong>CRM</strong> - Document your interactions</li>
                <li><strong>Programs</strong> - Advisory boards, IIS, conferences, training</li>
                <li><strong>Skills</strong> - Upgrade your abilities with skill points</li>
                <li><strong>Career</strong> - Track your progression</li>
            </ul>
            <h3>Time Management:</h3>
            <p>Click "End Week" to advance time. Complete activities before ending the week for maximum productivity.</p>
            <p style="color: var(--success);">Good luck with your MSL career!</p>
        `
    }
];

let currentTutorialPage = 0;

function showTutorial() {
    currentTutorialPage = 0;
    renderTutorialPage();
    document.getElementById('tutorial-overlay').style.display = 'flex';
}

function renderTutorialPage() {
    const page = TUTORIAL_PAGES[currentTutorialPage];
    document.getElementById('tutorial-title').textContent = page.title;
    document.getElementById('tutorial-content').innerHTML = page.content;

    // Update progress dots
    document.getElementById('tutorial-progress').innerHTML = TUTORIAL_PAGES.map((_, idx) =>
        `<div class="tutorial-dot ${idx === currentTutorialPage ? 'active' : ''}"></div>`
    ).join('');

    // Update buttons
    document.getElementById('tutorial-prev').style.visibility = currentTutorialPage === 0 ? 'hidden' : 'visible';
    document.getElementById('tutorial-next').textContent = currentTutorialPage === TUTORIAL_PAGES.length - 1 ? 'Start Game' : 'Next';
}

function nextTutorial() {
    if (currentTutorialPage < TUTORIAL_PAGES.length - 1) {
        currentTutorialPage++;
        renderTutorialPage();
    } else {
        document.getElementById('tutorial-overlay').style.display = 'none';
        showTerritorySelect();
    }
}

function prevTutorial() {
    if (currentTutorialPage > 0) {
        currentTutorialPage--;
        renderTutorialPage();
    }
}

function showAbout() {
    alert('MSL Career Simulator\n\nThis educational game simulates the role of a Medical Science Liaison (MSL) in the pharmaceutical industry.\n\nMSLs are field-based medical/scientific experts who:\n• Engage with healthcare professionals and researchers\n• Provide scientific and clinical information\n• Support clinical trials and medical education\n• Gather insights to inform medical strategy\n\nThis game will help you understand the MSL role, practice compliance scenarios, and prepare for MSL interviews.\n\nGood luck!');
}

// ==================== UTILITY FUNCTIONS ====================

function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).replace('-', ' ');
}

// ==================== INITIALIZE ====================

document.addEventListener('DOMContentLoaded', initializeGame);
