# MSL Simulator - Medical Science Liaison Training Game

An interactive, educational simulation game designed to teach the complexities of the Medical Science Liaison (MSL) role in the pharmaceutical/biotech industry.

## Overview

MSL Simulator is a comprehensive training tool that allows users to experience realistic MSL scenarios, learn about compliance requirements, develop strategic thinking skills, and understand the multifaceted nature of the MSL profession.

## Features

### Character Creation
- **Educational Background Options**: PhD, PharmD, MD, or DNP - each with unique stat modifiers
- **Therapeutic Area Selection**: Oncology, Immunology, Neurology, Cardiology, or Rare Disease
- **Starting Stats**: Scientific Knowledge, Communication, Strategic Thinking, and Compliance Awareness

### Territory Selection
Choose from 6 unique territories, each with different difficulty levels and characteristics:

| Territory | Difficulty | Key Characteristics |
|-----------|------------|---------------------|
| Northeast Corridor (Boston-NYC-Philadelphia) | Hard | High academic density, sophisticated KOLs, competitive environment |
| Great Lakes Region (Chicago-Detroit-Minneapolis) | Medium | Mix of academic/community, relationship-focused, large geographic spread |
| Southeast Region (Atlanta-Miami-Nashville) | Medium | Growing market, diverse patient populations |
| Texas Triangle (Houston-Dallas-San Antonio) | Easy | Growing market, accessible KOLs, less competition |
| Pacific Coast (SF-LA-Seattle) | Hard | Innovation hub, skeptical of pharma, high evidence standards |
| Mountain West (Denver-Phoenix-SLC) | Easy | Emerging market, low competition, large territory |

### Core Gameplay Mechanics

#### KOL Engagement & Scientific Exchange
- **Dynamic Dialogue System**: Realistic conversations with KOLs based on relationship level
- **Scenario-Based Interactions**: Efficacy discussions, safety questions, off-label requests, competitive intelligence, guideline discussions
- **Relationship Building**: Progress through relationship stages (New → Developing → Established → Advocate)

#### Compliance System
- **Real-Time Compliance Tracking**: Monitor your compliance score throughout interactions
- **Violation Detection**: Learn what constitutes promotional vs. non-promotional activity
- **Consequences**: Compliance violations affect your score and can lead to termination
- **Key Compliance Rules**:
  - On-label only for proactive discussions
  - Off-label only in response to unsolicited requests
  - No promotional claims or comparative superiority statements
  - Proper adverse event reporting

#### CRM Documentation
- **Mandatory Documentation**: All interactions must be documented within 24-48 hours
- **Documentation Elements**: Interaction type, discussion topics, off-label disclosure, insights, follow-up actions
- **Compliance Impact**: Late or missing documentation affects your CRM compliance score

#### Insight Gathering
- **Insight Categories**:
  - Unmet Medical Needs
  - Competitive Intelligence
  - Clinical Practice Patterns
  - Safety Observations
  - Access/Reimbursement Issues
- **Insight Value**: Quality insights contribute to your performance metrics

#### Skill Tree System
Four skill categories with 5 skills each:

**Scientific Expertise**
- Clinical Trial Interpretation
- Mechanism of Action Mastery
- Real-World Evidence
- Biomarker Knowledge
- Competitive Landscape

**Communication Skills**
- Scientific Storytelling
- Active Listening
- Objection Handling
- Presentation Skills
- Written Communication

**Strategic Acumen**
- KOL Mapping
- Territory Planning
- Insight Synthesis
- Cross-functional Collaboration
- Conference Strategy

**Compliance Mastery**
- Promotional vs Non-promotional
- Off-label Boundaries
- Adverse Event Reporting
- Documentation Excellence
- Fair Balance

#### Congresses & Conferences
- Attend major medical meetings (ASCO, ASH, ACR, AAN, ACC, NORD)
- Activities: Staff medical booth, support poster presentations, attend symposia, network with KOLs, gather competitive intelligence

#### Advisory Boards
- Plan and organize KOL advisory board meetings
- Select appropriate advisors (3-8 recommended)
- Choose topics and meeting formats

#### IIS (Investigator-Initiated Studies) Management
- Facilitate IIS inquiries and submissions
- Track studies through pipeline stages
- Conduct site visits (without influencing study design)

#### Internal Training
- Sales team education
- Marketing material review
- Medical affairs collaboration

### Performance & Progression

#### Quarterly Performance Reviews
Metrics evaluated:
- KOL Engagement (Target: 80%)
- Scientific Exchange Quality (Target: 85%)
- Insight Generation (Target: 75%)
- CRM Compliance (Target: 95%)
- Regulatory Compliance (Target: 100%)
- Internal Collaboration (Target: 70%)

#### Career Progression
- Associate MSL → MSL → Senior MSL → Principal MSL → MSL Director

#### Consequences
- **Warnings**: Issued for below-target performance
- **Termination**: Results from severe compliance violations or persistent underperformance

### Random Events
- Compliance audits
- Breaking competitive news
- Safety signal investigations
- New publications
- Competitor launches
- Speaker bureau requests

## Educational Value

This game is designed to teach:

1. **Role Understanding**: What MSLs actually do day-to-day
2. **Compliance Awareness**: Critical regulatory boundaries
3. **Scientific Exchange**: How to share clinical data appropriately
4. **Relationship Building**: Strategic KOL engagement
5. **Documentation**: Importance of timely, accurate CRM entries
6. **Strategic Thinking**: Territory management and prioritization
7. **Insight Generation**: Gathering valuable medical intelligence
8. **Cross-functional Work**: Collaborating with internal teams

## How to Play

1. Open `index.html` in a modern web browser
2. Click "New Career" to start
3. Create your MSL profile (name, education, therapeutic area)
4. Select your territory
5. Begin engaging with KOLs and building your career

### Controls
- Navigate using the dashboard tabs
- Click on KOLs on the map or in the database to initiate interactions
- Choose dialogue options carefully - compliance matters!
- Document interactions in CRM after each engagement
- Advance time to progress through weeks and quarters

## Technical Details

- **Built with**: HTML5, CSS3, Vanilla JavaScript
- **No dependencies**: Runs entirely in the browser
- **Save System**: Progress is saved to localStorage
- **Responsive Design**: Works on desktop and tablet devices

## File Structure

```
MSL-Game/
├── index.html          # Main game HTML
├── css/
│   └── styles.css      # Game styling
├── js/
│   ├── game.js         # Main game logic
│   └── data/
│       └── gameData.js # Game data (territories, KOLs, scenarios, etc.)
└── README.md           # This file
```

## Disclaimer

This is an educational simulation for learning purposes. It does not represent any specific pharmaceutical company's policies or practices. The scenarios and compliance guidelines are general representations based on industry standards and regulatory frameworks (FDA, OIG).

## Future Enhancements

Potential additions:
- More therapeutic area-specific scenarios
- Multiplayer/competitive modes
- Mobile app version
- Additional territories (international)
- More complex IIS management
- Publication support scenarios
- Medical education grant scenarios

## License

Educational use - not for commercial distribution.

---

*Built to help aspiring MSLs master the art and science of medical affairs.*
