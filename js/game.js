// MSL Simulator - Main Game Logic

class MSLGame {
    constructor() {
        this.state = {
            screen: 'loading',
            player: null,
            territory: null,
            kols: [],
            currentWeek: 1,
            currentQuarter: 1,
            currentYear: 2024,
            metrics: {
                kolEngagement: 0,
                scientificExchange: 0,
                insightGeneration: 0,
                crmCompliance: 100,
                regulatoryCompliance: 100,
                internalCollaboration: 0
            },
            interactions: [],
            insights: [],
            pendingCRM: [],
            completedCRM: [],
            skillPoints: 3,
            skills: {},
            advisoryBoards: [],
            iisProjects: [],
            events: [],
            currentKOL: null,
            currentScenario: null,
            dialogueHistory: [],
            quarterlyReviews: [],
            warnings: 0,
            gameOver: false
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.initSkills();
        this.showLoadingScreen();
    }

    initSkills() {
        // Initialize all skills at level 0
        Object.keys(GameData.skills).forEach(category => {
            this.state.skills[category] = {};
            GameData.skills[category].skills.forEach(skill => {
                this.state.skills[category][skill.name] = 0;
            });
        });
    }

    bindEvents() {
        // Title screen
        document.getElementById('new-game-btn')?.addEventListener('click', () => this.startNewGame());
        document.getElementById('continue-btn')?.addEventListener('click', () => this.continueGame());
        document.getElementById('tutorial-btn')?.addEventListener('click', () => this.showScreen('tutorial-screen'));
        document.getElementById('back-to-title')?.addEventListener('click', () => this.showScreen('title-screen'));

        // Character creation
        document.querySelectorAll('.education-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectEducation(e.target.dataset.value));
        });
        document.querySelectorAll('.ta-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.selectTherapeuticArea(e.target.dataset.value));
        });
        document.getElementById('proceed-territory')?.addEventListener('click', () => this.proceedToTerritory());

        // Territory selection
        document.getElementById('start-career')?.addEventListener('click', () => this.startCareer());

        // Dashboard navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchPanel(e.target.dataset.panel));
        });

        // Dashboard actions
        document.getElementById('action-visit-kol')?.addEventListener('click', () => this.showKOLSelection());
        document.getElementById('action-congress')?.addEventListener('click', () => this.showCongressScreen());
        document.getElementById('action-advisory')?.addEventListener('click', () => this.showAdvisoryScreen());
        document.getElementById('action-training')?.addEventListener('click', () => this.showTrainingScreen());
        document.getElementById('action-iis')?.addEventListener('click', () => this.showIISScreen());
        document.getElementById('advance-time')?.addEventListener('click', () => this.advanceWeek());

        // Interaction screen
        document.getElementById('end-interaction')?.addEventListener('click', () => this.endInteraction());

        // CRM Modal
        document.getElementById('submit-crm')?.addEventListener('click', () => this.submitCRM());
        document.getElementById('save-draft-crm')?.addEventListener('click', () => this.saveCRMDraft());

        // Back buttons
        document.getElementById('back-to-dashboard')?.addEventListener('click', () => this.showScreen('dashboard-screen'));
        document.getElementById('back-from-iis')?.addEventListener('click', () => this.showScreen('dashboard-screen'));
        document.getElementById('back-from-training')?.addEventListener('click', () => this.showScreen('dashboard-screen'));
        document.getElementById('leave-congress')?.addEventListener('click', () => this.leaveCongress());

        // Review screen
        document.getElementById('continue-after-review')?.addEventListener('click', () => this.continueAfterReview());

        // Game over
        document.getElementById('try-again')?.addEventListener('click', () => this.startNewGame());
        document.getElementById('main-menu')?.addEventListener('click', () => this.showScreen('title-screen'));

        // Insight category filters
        document.querySelectorAll('.insight-cat-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.filterInsights(e.target.dataset.cat));
        });

        // KOL filters
        document.getElementById('kol-filter-tier')?.addEventListener('change', () => this.filterKOLs());
        document.getElementById('kol-filter-relationship')?.addEventListener('change', () => this.filterKOLs());

        // Training cards
        document.querySelectorAll('.training-card').forEach(card => {
            card.addEventListener('click', (e) => this.startTraining(e.currentTarget.dataset.training));
        });

        // Congress activities
        document.querySelectorAll('.activity-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.startCongressActivity(e.currentTarget.dataset.activity));
        });

        // Close modals on background click
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.closeModal(modal.id);
            });
        });

        // Close modal buttons
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', () => {
                const modal = btn.closest('.modal');
                if (modal) this.closeModal(modal.id);
            });
        });
    }

    // Screen Management
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId)?.classList.add('active');
        this.state.screen = screenId;
    }

    showLoadingScreen() {
        this.showScreen('loading-screen');
        setTimeout(() => {
            this.showScreen('title-screen');
            this.checkForSavedGame();
        }, 2500);
    }

    checkForSavedGame() {
        const saved = localStorage.getItem('mslSimulatorSave');
        if (saved) {
            document.getElementById('continue-btn').disabled = false;
        }
    }

    // Game Start
    startNewGame() {
        this.resetState();
        this.showScreen('character-screen');
    }

    continueGame() {
        const saved = localStorage.getItem('mslSimulatorSave');
        if (saved) {
            this.state = JSON.parse(saved);
            this.showScreen('dashboard-screen');
            this.updateDashboard();
        }
    }

    resetState() {
        this.state = {
            screen: 'character-screen',
            player: {
                name: '',
                education: null,
                therapeuticArea: null,
                title: 'Associate MSL',
                stats: {
                    scientificKnowledge: 50,
                    communication: 50,
                    strategicThinking: 50,
                    complianceAwareness: 50
                }
            },
            territory: null,
            kols: [],
            currentWeek: 1,
            currentQuarter: 1,
            currentYear: 2024,
            metrics: {
                kolEngagement: 0,
                scientificExchange: 0,
                insightGeneration: 0,
                crmCompliance: 100,
                regulatoryCompliance: 100,
                internalCollaboration: 0
            },
            interactions: [],
            insights: [],
            pendingCRM: [],
            completedCRM: [],
            skillPoints: 3,
            skills: {},
            advisoryBoards: [],
            iisProjects: [],
            events: [],
            currentKOL: null,
            currentScenario: null,
            dialogueHistory: [],
            quarterlyReviews: [],
            warnings: 0,
            gameOver: false
        };
        this.initSkills();
    }

    // Character Creation
    selectEducation(education) {
        document.querySelectorAll('.education-btn').forEach(btn => btn.classList.remove('selected'));
        document.querySelector(`.education-btn[data-value="${education}"]`)?.classList.add('selected');

        this.state.player.education = education;
        const eduData = GameData.educationOptions[education];

        document.getElementById('education-desc').textContent = eduData.description;

        // Update stats preview
        Object.assign(this.state.player.stats, eduData.stats);
        this.updateStatsPreview();
        this.checkCharacterComplete();
    }

    selectTherapeuticArea(ta) {
        document.querySelectorAll('.ta-btn').forEach(btn => btn.classList.remove('selected'));
        document.querySelector(`.ta-btn[data-value="${ta}"]`)?.classList.add('selected');

        this.state.player.therapeuticArea = ta;
        const taData = GameData.therapeuticAreas[ta];

        document.getElementById('ta-desc').textContent = taData.description;
        this.checkCharacterComplete();
    }

    updateStatsPreview() {
        const stats = this.state.player.stats;
        document.getElementById('preview-science').style.width = `${stats.scientificKnowledge}%`;
        document.getElementById('preview-comm').style.width = `${stats.communication}%`;
        document.getElementById('preview-strategy').style.width = `${stats.strategicThinking}%`;
        document.getElementById('preview-compliance').style.width = `${stats.complianceAwareness}%`;
    }

    checkCharacterComplete() {
        const nameInput = document.getElementById('player-name');
        const name = nameInput?.value.trim();
        const hasEducation = this.state.player.education !== null;
        const hasTA = this.state.player.therapeuticArea !== null;

        document.getElementById('proceed-territory').disabled = !(name && hasEducation && hasTA);
    }

    proceedToTerritory() {
        this.state.player.name = document.getElementById('player-name').value.trim();
        this.populateTerritories();
        this.showScreen('territory-screen');
    }

    // Territory Selection
    populateTerritories() {
        const grid = document.getElementById('territory-grid');
        grid.innerHTML = '';

        Object.entries(GameData.territories).forEach(([key, territory]) => {
            const card = document.createElement('div');
            card.className = 'territory-card';
            card.dataset.territory = key;
            card.innerHTML = `
                <h4>${territory.name}</h4>
                <p>${territory.region}</p>
                <span class="difficulty ${territory.difficulty}">${territory.difficulty.toUpperCase()}</span>
            `;
            card.addEventListener('click', () => this.selectTerritory(key));
            grid.appendChild(card);
        });
    }

    selectTerritory(territoryKey) {
        document.querySelectorAll('.territory-card').forEach(card => card.classList.remove('selected'));
        document.querySelector(`.territory-card[data-territory="${territoryKey}"]`)?.classList.add('selected');

        this.state.territory = territoryKey;
        const territory = GameData.territories[territoryKey];

        document.getElementById('territory-name').textContent = territory.name;
        document.getElementById('territory-description').textContent = territory.description;

        // Populate stats
        const statsContainer = document.getElementById('territory-stats');
        statsContainer.innerHTML = `
            <div class="territory-stat">
                <div class="value">${territory.characteristics.academicCenters}</div>
                <div class="label">Academic Centers</div>
            </div>
            <div class="territory-stat">
                <div class="value">${territory.characteristics.kolCount}</div>
                <div class="label">Total KOLs</div>
            </div>
            <div class="territory-stat">
                <div class="value">${territory.characteristics.tier1Kols}</div>
                <div class="label">Tier 1 KOLs</div>
            </div>
            <div class="territory-stat">
                <div class="value">${territory.characteristics.competitorPresence}</div>
                <div class="label">Competition</div>
            </div>
        `;

        document.getElementById('start-career').disabled = false;
    }

    startCareer() {
        this.generateKOLs();
        this.generateIISProjects();
        this.showScreen('dashboard-screen');
        this.updateDashboard();
        this.showNotification('Welcome to ' + GameData.territories[this.state.territory].name + '!',
            'Your MSL career begins. Start by engaging with KOLs in your territory.', 'info');
    }

    // KOL Generation
    generateKOLs() {
        const territory = GameData.territories[this.state.territory];
        const ta = GameData.therapeuticAreas[this.state.player.therapeuticArea].name;

        this.state.kols = [];

        // Generate Tier 1 KOLs (academic)
        for (let i = 0; i < territory.characteristics.tier1Kols; i++) {
            this.state.kols.push(this.generateKOL(1, 'academic', ta));
        }

        // Generate Tier 2 KOLs (mix)
        const tier2Count = Math.floor((territory.characteristics.kolCount - territory.characteristics.tier1Kols) * 0.4);
        for (let i = 0; i < tier2Count; i++) {
            const type = Math.random() > 0.5 ? 'academic' : 'community';
            this.state.kols.push(this.generateKOL(2, type, ta));
        }

        // Generate Tier 3 KOLs (mostly community/private)
        const tier3Count = territory.characteristics.kolCount - territory.characteristics.tier1Kols - tier2Count;
        for (let i = 0; i < tier3Count; i++) {
            const type = Math.random() > 0.3 ? 'community' : 'private';
            this.state.kols.push(this.generateKOL(3, type, ta));
        }
    }

    generateKOL(tier, type, therapeuticArea) {
        const templates = GameData.kolTemplates[type] || GameData.kolTemplates.community;
        const template = templates[Math.floor(Math.random() * templates.length)];

        const firstName = GameData.names.firstNames[Math.floor(Math.random() * GameData.names.firstNames.length)];
        const lastName = GameData.names.lastNames[Math.floor(Math.random() * GameData.names.lastNames.length)];
        const institution = template.institutionTypes[Math.floor(Math.random() * template.institutionTypes.length)];

        return {
            id: `kol_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: `Dr. ${firstName} ${lastName}`,
            title: template.titleTemplate.replace('{TA}', therapeuticArea),
            institution: `${this.generateInstitutionName()} ${institution}`,
            tier: tier,
            type: type,
            relationship: 'new',
            relationshipScore: 0,
            interests: template.interests,
            personality: template.personality,
            preferredInteraction: template.preferredInteraction,
            lastContact: null,
            interactionCount: 0,
            insightsProvided: 0,
            avatar: this.getRandomAvatar()
        };
    }

    generateInstitutionName() {
        const prefixes = ['Memorial', 'University', 'Regional', 'City', 'Community', 'St. Mary\'s', 'Presbyterian', 'Methodist'];
        return prefixes[Math.floor(Math.random() * prefixes.length)];
    }

    getRandomAvatar() {
        const avatars = ['👨‍⚕️', '👩‍⚕️', '🧑‍⚕️', '👨‍🔬', '👩‍🔬', '🧑‍🔬'];
        return avatars[Math.floor(Math.random() * avatars.length)];
    }

    // Dashboard
    updateDashboard() {
        // Update header
        document.getElementById('player-display-name').textContent = this.state.player.name;
        document.getElementById('player-title').textContent = this.state.player.title;
        document.getElementById('player-ta').textContent = GameData.therapeuticAreas[this.state.player.therapeuticArea].name;

        // Update date
        document.getElementById('current-date').textContent =
            `Week ${this.state.currentWeek}, Q${this.state.currentQuarter} ${this.state.currentYear}`;

        // Update quick stats
        document.getElementById('kol-interactions').textContent = this.state.interactions.length;
        document.getElementById('insights-count').textContent = this.state.insights.length;
        document.getElementById('compliance-score').textContent = `${Math.round(this.state.metrics.regulatoryCompliance)}%`;

        // Update compliance color
        const complianceStat = document.querySelector('.compliance-stat');
        if (this.state.metrics.regulatoryCompliance >= 95) {
            complianceStat.style.borderColor = '#10b981';
        } else if (this.state.metrics.regulatoryCompliance >= 80) {
            complianceStat.style.borderColor = '#f59e0b';
        } else {
            complianceStat.style.borderColor = '#ef4444';
        }

        this.updateMap();
        this.updateCalendar();
        this.updateKOLList();
        this.updateCRMPanel();
        this.updateSkillTree();
        this.updateInsightsPanel();
        this.updatePerformancePanel();
    }

    updateMap() {
        const container = document.getElementById('map-container');
        container.innerHTML = '';

        // Create simple visual representation of KOL locations
        this.state.kols.forEach((kol, index) => {
            const location = document.createElement('div');
            location.className = `map-location ${kol.type}`;

            // Pseudo-random positioning based on index
            const row = Math.floor(index / 6);
            const col = index % 6;
            location.style.left = `${10 + col * 15 + Math.random() * 5}%`;
            location.style.top = `${10 + row * 20 + Math.random() * 10}%`;

            location.innerHTML = kol.avatar;
            location.title = `${kol.name}\n${kol.institution}\nTier ${kol.tier}`;

            location.addEventListener('click', () => this.startInteraction(kol.id));

            container.appendChild(location);
        });
    }

    updateCalendar() {
        const grid = document.getElementById('calendar-grid');
        grid.innerHTML = '';

        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

        days.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'calendar-day';
            dayElement.innerHTML = `<div class="day-header">${day}</div>`;

            // Add any scheduled events
            const events = this.state.events.filter(e => e.day === day && e.week === this.state.currentWeek);
            events.forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.className = `calendar-event ${event.type}`;
                eventElement.textContent = event.name;
                dayElement.appendChild(eventElement);
            });

            grid.appendChild(dayElement);
        });

        // Update upcoming events
        const eventsList = document.getElementById('events-list');
        eventsList.innerHTML = this.getUpcomingEvents();
    }

    getUpcomingEvents() {
        // Check for congresses this quarter
        const ta = this.state.player.therapeuticArea;
        const congresses = Object.values(GameData.congresses).filter(c =>
            c.therapeuticArea === ta || c.type === 'Major International'
        );

        let html = '';
        if (this.state.currentQuarter === 2 && congresses.length > 0) {
            html += `<div class="event-item">${congresses[0].name} - Coming soon!</div>`;
        }

        if (this.state.currentWeek === 12) {
            html += `<div class="event-item">Quarterly Performance Review - End of quarter</div>`;
        }

        if (html === '') {
            html = '<p>No upcoming events scheduled</p>';
        }

        return html;
    }

    updateKOLList() {
        const list = document.getElementById('kol-list');
        list.innerHTML = '';

        const tierFilter = document.getElementById('kol-filter-tier').value;
        const relationshipFilter = document.getElementById('kol-filter-relationship').value;

        let filteredKOLs = this.state.kols;

        if (tierFilter !== 'all') {
            filteredKOLs = filteredKOLs.filter(k => k.tier === parseInt(tierFilter));
        }

        if (relationshipFilter !== 'all') {
            filteredKOLs = filteredKOLs.filter(k => k.relationship === relationshipFilter);
        }

        filteredKOLs.forEach(kol => {
            const card = document.createElement('div');
            card.className = 'kol-card';
            card.innerHTML = `
                <div class="kol-card-header">
                    <div class="kol-avatar">${kol.avatar}</div>
                    <div class="kol-card-info">
                        <h4>${kol.name}</h4>
                        <p>${kol.title}</p>
                        <p>${kol.institution}</p>
                    </div>
                </div>
                <div class="kol-card-stats">
                    <span class="kol-tier tier-${kol.tier}">Tier ${kol.tier}</span>
                    <span class="kol-relationship ${kol.relationship}">${this.capitalizeFirst(kol.relationship)}</span>
                </div>
            `;
            card.addEventListener('click', () => this.startInteraction(kol.id));
            list.appendChild(card);
        });
    }

    filterKOLs() {
        this.updateKOLList();
    }

    updateCRMPanel() {
        document.getElementById('pending-docs').textContent = this.state.pendingCRM.length;

        // Check for overdue (interactions more than 2 weeks old without documentation)
        const overdue = this.state.pendingCRM.filter(crm => {
            const weekDiff = this.state.currentWeek - crm.week;
            return weekDiff > 0;
        });
        document.getElementById('overdue-docs').textContent = overdue.length;

        const entriesList = document.getElementById('crm-entries');
        entriesList.innerHTML = '';

        [...this.state.pendingCRM, ...this.state.completedCRM.slice(-5)].forEach(entry => {
            const entryElement = document.createElement('div');
            entryElement.className = `crm-entry ${entry.status === 'overdue' ? 'overdue' : ''}`;
            entryElement.innerHTML = `
                <div>
                    <strong>${entry.kolName}</strong>
                    <span> - Week ${entry.week}</span>
                </div>
                <span class="crm-entry-status ${entry.status}">${this.capitalizeFirst(entry.status)}</span>
            `;

            if (entry.status === 'pending' || entry.status === 'overdue') {
                entryElement.addEventListener('click', () => this.openCRMForm(entry));
            }

            entriesList.appendChild(entry);
        });

        if (this.state.pendingCRM.length === 0 && this.state.completedCRM.length === 0) {
            entriesList.innerHTML = '<p style="padding: 20px; text-align: center; color: var(--text-muted);">No CRM entries yet. Document your KOL interactions here.</p>';
        }
    }

    updateSkillTree() {
        const container = document.getElementById('skill-tree');
        container.innerHTML = '';

        document.getElementById('available-skill-points').textContent = this.state.skillPoints;

        Object.entries(GameData.skills).forEach(([categoryKey, category]) => {
            const categoryElement = document.createElement('div');
            categoryElement.className = 'skill-category';

            let skillsHTML = '';
            category.skills.forEach(skill => {
                const currentLevel = this.state.skills[categoryKey][skill.name] || 0;
                const pips = Array(skill.maxLevel).fill(0).map((_, i) =>
                    `<span class="skill-pip ${i < currentLevel ? 'filled' : ''}"></span>`
                ).join('');

                const canUpgrade = this.state.skillPoints > 0 && currentLevel < skill.maxLevel;

                skillsHTML += `
                    <div class="skill-item">
                        <span class="skill-name" title="${skill.description}">${skill.name}</span>
                        <div class="skill-level">${pips}</div>
                        <button class="skill-upgrade"
                                data-category="${categoryKey}"
                                data-skill="${skill.name}"
                                ${canUpgrade ? '' : 'disabled'}>+</button>
                    </div>
                `;
            });

            categoryElement.innerHTML = `
                <h4>${category.name}</h4>
                ${skillsHTML}
            `;

            container.appendChild(categoryElement);
        });

        // Bind upgrade buttons
        document.querySelectorAll('.skill-upgrade').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.upgradeSkill(btn.dataset.category, btn.dataset.skill);
            });
        });
    }

    upgradeSkill(category, skillName) {
        if (this.state.skillPoints <= 0) return;

        const skill = GameData.skills[category].skills.find(s => s.name === skillName);
        if (!skill) return;

        const currentLevel = this.state.skills[category][skillName] || 0;
        if (currentLevel >= skill.maxLevel) return;

        this.state.skills[category][skillName] = currentLevel + 1;
        this.state.skillPoints--;

        this.updateSkillTree();
        this.showNotification('Skill Upgraded!', `${skillName} is now level ${currentLevel + 1}`, 'success');
        this.saveGame();
    }

    updateInsightsPanel() {
        const list = document.getElementById('insights-list');
        list.innerHTML = '';

        if (this.state.insights.length === 0) {
            list.innerHTML = '<p style="text-align: center; color: var(--text-muted);">No insights gathered yet. Engage with KOLs to collect medical insights.</p>';
            return;
        }

        const activeFilter = document.querySelector('.insight-cat-btn.active')?.dataset.cat || 'all';

        let filteredInsights = this.state.insights;
        if (activeFilter !== 'all') {
            filteredInsights = filteredInsights.filter(i => i.category === activeFilter);
        }

        filteredInsights.forEach(insight => {
            const item = document.createElement('div');
            item.className = 'insight-item';
            item.innerHTML = `
                <div class="insight-header">
                    <span class="insight-category-tag ${insight.category}">${GameData.insightCategories[insight.category]?.name || insight.category}</span>
                    <span class="insight-source">From: ${insight.source} - Week ${insight.week}</span>
                </div>
                <p class="insight-text">${insight.text}</p>
            `;
            list.appendChild(item);
        });
    }

    filterInsights(category) {
        document.querySelectorAll('.insight-cat-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.insight-cat-btn[data-cat="${category}"]`)?.classList.add('active');
        this.updateInsightsPanel();
    }

    updatePerformancePanel() {
        const metrics = this.state.metrics;

        document.getElementById('metric-kol').textContent = `${Math.round(metrics.kolEngagement)}%`;
        document.getElementById('metric-exchange').textContent = `${Math.round(metrics.scientificExchange)}%`;
        document.getElementById('metric-insights').textContent = `${Math.round(metrics.insightGeneration)}%`;
        document.getElementById('metric-crm').textContent = `${Math.round(metrics.crmCompliance)}%`;
        document.getElementById('metric-compliance').textContent = `${Math.round(metrics.regulatoryCompliance)}%`;
        document.getElementById('metric-collab').textContent = `${Math.round(metrics.internalCollaboration)}%`;

        document.getElementById('next-review').textContent = `End of Q${this.state.currentQuarter}`;
    }

    switchPanel(panelId) {
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.nav-btn[data-panel="${panelId}"]`)?.classList.add('active');

        document.querySelectorAll('.panel').forEach(panel => panel.classList.remove('active'));
        document.getElementById(panelId)?.classList.add('active');
    }

    // KOL Interaction
    showKOLSelection() {
        this.switchPanel('kol-database');
    }

    startInteraction(kolId) {
        const kol = this.state.kols.find(k => k.id === kolId);
        if (!kol) return;

        this.state.currentKOL = kol;
        this.state.dialogueHistory = [];

        // Update interaction screen
        document.getElementById('interaction-kol-name').textContent = kol.name;
        document.getElementById('interaction-kol-title').textContent = kol.title;
        document.getElementById('interaction-kol-institution').textContent = kol.institution;
        document.getElementById('interaction-avatar').textContent = kol.avatar;

        // Update relationship bar
        const fillPercent = Math.min(100, (kol.relationshipScore / 100) * 100);
        document.getElementById('relationship-fill').style.width = `${fillPercent}%`;
        document.getElementById('relationship-label').textContent = this.capitalizeFirst(kol.relationship);

        this.showScreen('interaction-screen');
        this.startDialogue();
    }

    startDialogue() {
        const kol = this.state.currentKOL;
        const dialogueHistory = document.getElementById('dialogue-history');
        dialogueHistory.innerHTML = '';

        // KOL greeting based on relationship
        let greeting;
        switch (kol.relationship) {
            case 'new':
                greeting = `Hello, I don't think we've met before. I'm ${kol.name}. What brings you to ${kol.institution.split(' ')[0]}?`;
                break;
            case 'developing':
                greeting = `Good to see you again. I had a few questions come up since our last conversation about the clinical data.`;
                break;
            case 'established':
                greeting = `Always a pleasure. I've been thinking about some interesting cases and wanted to get your perspective.`;
                break;
            case 'advocate':
                greeting = `Great timing! I was just preparing for a presentation and had some questions about the latest data.`;
                break;
            default:
                greeting = `Hello! How can I help you today?`;
        }

        this.addDialogueMessage(kol.name, greeting, 'kol');
        this.presentScenario();
    }

    presentScenario() {
        // Select a random scenario based on interaction history
        const scenarioTypes = Object.keys(GameData.scenarios);
        const randomType = scenarioTypes[Math.floor(Math.random() * scenarioTypes.length)];
        const scenarios = GameData.scenarios[randomType];
        const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];

        this.state.currentScenario = scenario;

        // Add KOL's question
        setTimeout(() => {
            this.addDialogueMessage(this.state.currentKOL.name, scenario.kolQuestion, 'kol');
            this.showDialogueOptions(scenario.options);
        }, 1500);
    }

    addDialogueMessage(speaker, text, type) {
        const dialogueHistory = document.getElementById('dialogue-history');

        const message = document.createElement('div');
        message.className = `dialogue-message ${type}`;
        message.innerHTML = `
            <div class="speaker">${speaker}</div>
            <div class="text">${text}</div>
        `;

        dialogueHistory.appendChild(message);
        dialogueHistory.scrollTop = dialogueHistory.scrollHeight;

        this.state.dialogueHistory.push({ speaker, text, type });
    }

    showDialogueOptions(options) {
        const optionsContainer = document.getElementById('dialogue-options');
        optionsContainer.innerHTML = '';

        options.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = `dialogue-option ${option.complianceStatus === 'violation' ? 'compliance-violation' : ''} ${option.complianceStatus === 'risk' ? 'compliance-risk' : ''}`;

            let tagHTML = '';
            if (option.complianceStatus === 'violation') {
                tagHTML = '<span class="option-tag violation">Compliance Risk</span>';
            } else if (option.complianceStatus === 'risk') {
                tagHTML = '<span class="option-tag risk">Caution</span>';
            }

            button.innerHTML = `${option.text}${tagHTML}`;
            button.addEventListener('click', () => this.selectDialogueOption(option));
            optionsContainer.appendChild(button);
        });

        // Update compliance indicator
        this.updateComplianceIndicator('green', 'Reviewing options...');
    }

    selectDialogueOption(option) {
        const kol = this.state.currentKOL;

        // Add player's response
        this.addDialogueMessage('You', option.text, 'player');

        // Clear options
        document.getElementById('dialogue-options').innerHTML = '';

        // Handle compliance violations
        if (option.complianceStatus === 'violation') {
            this.handleComplianceViolation(option);
        } else if (option.complianceStatus === 'risk') {
            this.showNotification('Compliance Note', 'This response walks a fine line. Be careful with similar situations.', 'warning');
        }

        // Apply relationship changes
        kol.relationshipScore += option.relationshipChange || 0;
        kol.relationshipScore = Math.max(0, Math.min(100, kol.relationshipScore));
        this.updateRelationshipLevel(kol);

        // Update metrics
        if (option.outcome === 'positive') {
            this.state.metrics.scientificExchange = Math.min(100, this.state.metrics.scientificExchange + 5);
        }

        if (option.complianceHit) {
            this.state.metrics.regulatoryCompliance = Math.max(0, this.state.metrics.regulatoryCompliance - option.complianceHit);
        }

        // Handle insight opportunity
        if (option.insightOpportunity) {
            this.gatherInsight(option.insightType || 'clinical');
        }

        // Show feedback
        setTimeout(() => {
            this.addDialogueMessage('System', `[Feedback: ${option.feedback}]`, 'kol');

            // Ask if player wants to continue or end
            setTimeout(() => {
                this.showContinueOptions();
            }, 2000);
        }, 1000);

        // Update UI
        const fillPercent = Math.min(100, (kol.relationshipScore / 100) * 100);
        document.getElementById('relationship-fill').style.width = `${fillPercent}%`;
        document.getElementById('relationship-label').textContent = this.capitalizeFirst(kol.relationship);
    }

    handleComplianceViolation(option) {
        this.state.metrics.regulatoryCompliance -= option.complianceHit || 20;

        this.updateComplianceIndicator('red', 'Compliance Violation Detected');

        this.showNotification('Compliance Violation', option.feedback, 'error');

        // Check for termination threshold
        if (this.state.metrics.regulatoryCompliance <= 50) {
            this.state.warnings++;
            if (this.state.warnings >= 3 || this.state.metrics.regulatoryCompliance <= 30) {
                this.triggerTermination('compliance');
            }
        }
    }

    updateComplianceIndicator(status, text) {
        const indicator = document.getElementById('compliance-indicator');
        indicator.innerHTML = `
            <span class="status-dot ${status}"></span>
            <span>${text}</span>
        `;
    }

    showContinueOptions() {
        const optionsContainer = document.getElementById('dialogue-options');
        optionsContainer.innerHTML = `
            <button class="dialogue-option" id="continue-interaction">Continue the conversation</button>
            <button class="dialogue-option" id="end-interaction-btn">End the interaction</button>
        `;

        document.getElementById('continue-interaction').addEventListener('click', () => {
            this.presentScenario();
        });

        document.getElementById('end-interaction-btn').addEventListener('click', () => {
            this.endInteraction();
        });
    }

    updateRelationshipLevel(kol) {
        if (kol.relationshipScore >= 80) {
            kol.relationship = 'advocate';
        } else if (kol.relationshipScore >= 50) {
            kol.relationship = 'established';
        } else if (kol.relationshipScore >= 20) {
            kol.relationship = 'developing';
        } else {
            kol.relationship = 'new';
        }
    }

    gatherInsight(type) {
        const kol = this.state.currentKOL;
        const insightTexts = {
            'unmet-need': [
                'Patients are struggling with the side effect profile of current treatments.',
                'There\'s a significant need for oral formulations in this patient population.',
                'Many patients are failing to achieve adequate response with first-line therapy.'
            ],
            'competitive': [
                'I\'ve been seeing increased use of the competitor\'s drug in certain patient subgroups.',
                'Some colleagues are switching patients due to dosing convenience.',
                'The competitive product\'s real-world data looks different from trial results.'
            ],
            'clinical': [
                'In my practice, I\'ve found that dose modifications can help with tolerability.',
                'The patient selection criteria in practice differ from trial inclusion criteria.',
                'We\'re seeing good responses in patients who were undertreated previously.'
            ],
            'safety': [
                'I\'m monitoring patients more closely for this specific adverse event.',
                'The safety profile in elderly patients requires careful consideration.',
                'We\'ve developed institutional protocols for managing certain side effects.'
            ],
            'access': [
                'Prior authorization requirements are creating treatment delays.',
                'Step therapy requirements are particularly challenging for certain patients.',
                'Some insurers are requiring specific documentation that\'s difficult to obtain.'
            ]
        };

        const texts = insightTexts[type] || insightTexts['clinical'];
        const insightText = texts[Math.floor(Math.random() * texts.length)];

        this.state.insights.push({
            id: `insight_${Date.now()}`,
            category: type,
            text: insightText,
            source: kol.name,
            week: this.state.currentWeek,
            quarter: this.state.currentQuarter
        });

        kol.insightsProvided++;
        this.state.metrics.insightGeneration = Math.min(100, this.state.metrics.insightGeneration + 10);

        this.showNotification('Insight Captured!', `${GameData.insightCategories[type]?.name || type} insight gathered from ${kol.name}`, 'success');
    }

    endInteraction() {
        const kol = this.state.currentKOL;
        kol.interactionCount++;
        kol.lastContact = { week: this.state.currentWeek, quarter: this.state.currentQuarter };

        // Record interaction
        this.state.interactions.push({
            kolId: kol.id,
            kolName: kol.name,
            week: this.state.currentWeek,
            quarter: this.state.currentQuarter,
            dialogueHistory: [...this.state.dialogueHistory]
        });

        // Add to pending CRM
        this.state.pendingCRM.push({
            id: `crm_${Date.now()}`,
            kolId: kol.id,
            kolName: kol.name,
            week: this.state.currentWeek,
            status: 'pending'
        });

        // Update KOL engagement metric
        const engagedKOLs = this.state.kols.filter(k => k.interactionCount > 0).length;
        this.state.metrics.kolEngagement = Math.round((engagedKOLs / this.state.kols.length) * 100);

        // Show CRM modal
        this.openCRMModal(kol);
    }

    // CRM Documentation
    openCRMModal(kol) {
        document.getElementById('crm-kol-name').value = kol.name;
        document.getElementById('crm-modal').classList.add('active');
    }

    openCRMForm(entry) {
        const kol = this.state.kols.find(k => k.id === entry.kolId);
        if (kol) {
            this.openCRMModal(kol);
        }
    }

    submitCRM() {
        const offLabelValue = document.querySelector('input[name="off-label"]:checked')?.value;
        const aeValue = document.querySelector('input[name="ae"]:checked')?.value;
        const insights = document.getElementById('crm-insights').value;
        const insightCategory = document.getElementById('crm-insight-category').value;

        // Check for compliance issues in documentation
        if (offLabelValue === 'yes-proactive') {
            this.state.metrics.regulatoryCompliance -= 15;
            this.showNotification('Compliance Alert', 'Documenting proactive off-label discussion. This may be reviewed.', 'warning');
        }

        if (aeValue === 'yes') {
            this.showNotification('AE Reporting', 'Remember to submit the adverse event report through the proper channel within 24 hours.', 'info');
        }

        // Add insight if provided
        if (insights && insightCategory) {
            const kol = this.state.currentKOL;
            this.state.insights.push({
                id: `insight_${Date.now()}`,
                category: insightCategory,
                text: insights,
                source: kol?.name || 'Unknown',
                week: this.state.currentWeek,
                quarter: this.state.currentQuarter
            });
        }

        // Move from pending to completed
        const pendingIndex = this.state.pendingCRM.findIndex(c => c.kolId === this.state.currentKOL?.id);
        if (pendingIndex >= 0) {
            const entry = this.state.pendingCRM.splice(pendingIndex, 1)[0];
            entry.status = 'completed';
            this.state.completedCRM.push(entry);
        }

        // Update CRM compliance
        this.updateCRMCompliance();

        this.closeModal('crm-modal');
        this.showScreen('dashboard-screen');
        this.updateDashboard();
        this.showNotification('CRM Updated', 'Interaction documented successfully.', 'success');
        this.saveGame();
    }

    saveCRMDraft() {
        this.closeModal('crm-modal');
        this.showScreen('dashboard-screen');
        this.updateDashboard();
        this.showNotification('Draft Saved', 'Remember to complete documentation within 48 hours.', 'info');
    }

    updateCRMCompliance() {
        const total = this.state.interactions.length;
        const documented = this.state.completedCRM.length;
        const overdue = this.state.pendingCRM.filter(c => (this.state.currentWeek - c.week) > 0).length;

        if (total === 0) {
            this.state.metrics.crmCompliance = 100;
        } else {
            const onTimeRate = (documented / total) * 100;
            const penalty = overdue * 5;
            this.state.metrics.crmCompliance = Math.max(0, Math.min(100, onTimeRate - penalty));
        }
    }

    closeModal(modalId) {
        document.getElementById(modalId)?.classList.remove('active');
    }

    // Congress/Conference
    showCongressScreen() {
        const ta = this.state.player.therapeuticArea;
        const availableCongresses = Object.entries(GameData.congresses).filter(([key, congress]) =>
            congress.therapeuticArea === ta || congress.type === 'Major International'
        );

        if (availableCongresses.length === 0) {
            this.showNotification('No Congresses', 'No relevant congresses available this quarter.', 'info');
            return;
        }

        const [key, congress] = availableCongresses[0];

        document.getElementById('congress-name').textContent = congress.name;
        document.getElementById('congress-dates').textContent = `Q${this.state.currentQuarter} ${this.state.currentYear}`;

        // Populate KOLs at congress
        const kolList = document.getElementById('congress-kol-list');
        kolList.innerHTML = '';

        // Show some tier 1 and 2 KOLs as attending
        const attendingKOLs = this.state.kols.filter(k => k.tier <= 2).slice(0, 5);
        attendingKOLs.forEach(kol => {
            const item = document.createElement('div');
            item.className = 'kol-card';
            item.innerHTML = `
                <div class="kol-card-header">
                    <div class="kol-avatar">${kol.avatar}</div>
                    <div class="kol-card-info">
                        <h4>${kol.name}</h4>
                        <p>${kol.title}</p>
                    </div>
                </div>
            `;
            item.addEventListener('click', () => this.startInteraction(kol.id));
            kolList.appendChild(item);
        });

        this.showScreen('congress-screen');
    }

    startCongressActivity(activity) {
        let reward = { relationship: 0, insight: false, collaboration: 0 };
        let message = '';

        switch (activity) {
            case 'booth':
                message = 'You staffed the medical booth and answered several HCP questions about your product\'s clinical data.';
                reward = { relationship: 5, insight: true, collaboration: 5 };
                break;
            case 'poster':
                message = 'You supported an investigator presenting company-sponsored research. Good opportunity to discuss methodology.';
                reward = { relationship: 10, insight: true, collaboration: 10 };
                break;
            case 'symposium':
                message = 'You attended the scientific symposium and gained valuable knowledge about emerging research in your therapeutic area.';
                reward = { relationship: 0, insight: true, collaboration: 0 };
                this.state.skillPoints++;
                break;
            case 'networking':
                message = 'You connected with several KOLs during the networking reception. Great opportunity for informal scientific discussion.';
                reward = { relationship: 15, insight: true, collaboration: 5 };
                break;
            case 'competitive':
                message = 'You gathered valuable competitive intelligence from competitor presentations and booth activities.';
                reward = { relationship: 0, insight: true, collaboration: 15 };
                if (Math.random() > 0.5) {
                    this.state.insights.push({
                        id: `insight_${Date.now()}`,
                        category: 'competitive',
                        text: 'Competitor presented new data showing different efficacy in specific patient subgroup.',
                        source: 'Congress observation',
                        week: this.state.currentWeek,
                        quarter: this.state.currentQuarter
                    });
                }
                break;
        }

        // Apply rewards
        this.state.kols.forEach(kol => {
            if (kol.tier <= 2 && Math.random() > 0.5) {
                kol.relationshipScore += reward.relationship;
                this.updateRelationshipLevel(kol);
            }
        });

        this.state.metrics.internalCollaboration = Math.min(100, this.state.metrics.internalCollaboration + reward.collaboration);

        if (reward.insight && Math.random() > 0.3) {
            this.state.metrics.insightGeneration = Math.min(100, this.state.metrics.insightGeneration + 5);
        }

        this.showNotification('Congress Activity', message, 'success');
    }

    leaveCongress() {
        this.showScreen('dashboard-screen');
        this.updateDashboard();
    }

    // Advisory Board
    showAdvisoryScreen() {
        this.populateAdvisorSelection();
        this.showScreen('advisory-screen');
    }

    populateAdvisorSelection() {
        const container = document.getElementById('advisor-selection');
        container.innerHTML = '';

        // Show tier 1 and 2 KOLs as potential advisors
        const potentialAdvisors = this.state.kols.filter(k => k.tier <= 2);

        potentialAdvisors.forEach(kol => {
            const option = document.createElement('div');
            option.className = 'advisor-option';
            option.dataset.kolId = kol.id;
            option.innerHTML = `
                <input type="checkbox" id="advisor-${kol.id}">
                <label for="advisor-${kol.id}">
                    ${kol.avatar} ${kol.name} - ${kol.title}
                </label>
            `;
            option.addEventListener('click', () => {
                option.classList.toggle('selected');
                this.updateAdvisoryPreview();
            });
            container.appendChild(option);
        });
    }

    updateAdvisoryPreview() {
        const selected = document.querySelectorAll('.advisor-option.selected');
        const preview = document.getElementById('advisory-preview-content');
        const submitBtn = document.getElementById('submit-advisory');

        if (selected.length >= 3 && selected.length <= 8) {
            submitBtn.disabled = false;
            preview.innerHTML = `
                <p><strong>${selected.length} advisors selected</strong></p>
                <p>Projected insights: ${selected.length * 2}-${selected.length * 3}</p>
                <p>Relationship impact: +${selected.length * 5} with participants</p>
            `;
        } else {
            submitBtn.disabled = true;
            preview.innerHTML = `<p>Select 3-8 advisors to proceed. Currently selected: ${selected.length}</p>`;
        }
    }

    // IIS Management
    showIISScreen() {
        this.updateIISPipeline();
        this.showScreen('iis-screen');
    }

    generateIISProjects() {
        // Generate some initial IIS projects in various stages
        const stages = ['inquiry', 'review', 'approved', 'active'];

        for (let i = 0; i < 3; i++) {
            const stage = stages[Math.floor(Math.random() * stages.length)];
            const kol = this.state.kols.find(k => k.tier <= 2);

            this.state.iisProjects.push({
                id: `iis_${Date.now()}_${i}`,
                title: `Study of ${GameData.therapeuticAreas[this.state.player.therapeuticArea].name} Treatment Outcomes`,
                investigator: kol?.name || 'Dr. External Investigator',
                stage: stage,
                submittedWeek: Math.max(1, this.state.currentWeek - Math.floor(Math.random() * 10))
            });
        }
    }

    updateIISPipeline() {
        const stages = ['inquiry', 'review', 'approved', 'active', 'completed'];

        stages.forEach(stage => {
            const container = document.getElementById(`iis-${stage}`);
            if (!container) return;

            container.innerHTML = '';

            const projects = this.state.iisProjects.filter(p => p.stage === stage);
            projects.forEach(project => {
                const item = document.createElement('div');
                item.className = 'iis-item';
                item.textContent = project.title.substring(0, 30) + '...';
                item.title = project.title;
                item.addEventListener('click', () => this.showIISDetails(project));
                container.appendChild(item);
            });
        });
    }

    showIISDetails(project) {
        const container = document.getElementById('iis-details');
        container.innerHTML = `
            <h3>Study Details</h3>
            <p><strong>Title:</strong> ${project.title}</p>
            <p><strong>Principal Investigator:</strong> ${project.investigator}</p>
            <p><strong>Status:</strong> ${this.capitalizeFirst(project.stage)}</p>
            <p><strong>Submitted:</strong> Week ${project.submittedWeek}</p>
        `;
    }

    // Training
    showTrainingScreen() {
        document.getElementById('training-scenario').style.display = 'none';
        this.showScreen('training-screen');
    }

    startTraining(type) {
        let result = { message: '', reward: {} };

        switch (type) {
            case 'sales':
                result.message = 'You conducted a disease state education session for the sales team. They appreciated the clinical context.';
                result.reward = { internalCollaboration: 10 };
                break;
            case 'marketing':
                result.message = 'You reviewed promotional materials and provided medical accuracy feedback. Several corrections were made.';
                result.reward = { compliance: 5, internalCollaboration: 5 };
                break;
            case 'medical':
                result.message = 'You shared field insights with the medical affairs team. Your observations will inform medical strategy.';
                result.reward = { insightValue: 15, internalCollaboration: 10 };
                break;
        }

        // Apply rewards
        this.state.metrics.internalCollaboration = Math.min(100,
            this.state.metrics.internalCollaboration + (result.reward.internalCollaboration || 0));

        if (result.reward.compliance) {
            this.state.metrics.regulatoryCompliance = Math.min(100,
                this.state.metrics.regulatoryCompliance + result.reward.compliance);
        }

        if (result.reward.insightValue) {
            this.state.metrics.insightGeneration = Math.min(100,
                this.state.metrics.insightGeneration + result.reward.insightValue);
        }

        this.showNotification('Training Complete', result.message, 'success');
        this.showScreen('dashboard-screen');
        this.updateDashboard();
    }

    // Time Advancement
    advanceWeek() {
        this.state.currentWeek++;

        // Check for overdue CRM entries
        this.state.pendingCRM.forEach(entry => {
            if (this.state.currentWeek - entry.week > 0) {
                entry.status = 'overdue';
            }
        });

        // Update CRM compliance
        this.updateCRMCompliance();

        // Random events
        this.checkRandomEvents();

        // Quarter end check
        if (this.state.currentWeek > 12) {
            this.state.currentWeek = 1;
            this.triggerQuarterlyReview();
        }

        this.updateDashboard();
        this.saveGame();

        this.showNotification('Week Advanced',
            `Now in Week ${this.state.currentWeek}, Q${this.state.currentQuarter} ${this.state.currentYear}`, 'info');
    }

    checkRandomEvents() {
        GameData.randomEvents.forEach(event => {
            if (Math.random() < event.probability) {
                const result = event.effect(this.state);
                this.showNotification(event.name, result.message, event.type === 'opportunity' ? 'info' : 'warning');
            }
        });
    }

    // Performance Review
    triggerQuarterlyReview() {
        const metrics = this.state.metrics;

        // Calculate overall performance
        const overallScore = (
            metrics.kolEngagement * 0.25 +
            metrics.scientificExchange * 0.20 +
            metrics.insightGeneration * 0.15 +
            metrics.crmCompliance * 0.15 +
            metrics.regulatoryCompliance * 0.20 +
            metrics.internalCollaboration * 0.05
        );

        // Determine outcome
        let outcome = 'continue';
        let feedback = {};

        if (metrics.regulatoryCompliance < 60) {
            outcome = 'termination';
            feedback.message = GameData.progressionMessages.termination.compliance;
        } else if (overallScore < 50 && this.state.warnings >= 2) {
            outcome = 'termination';
            feedback.message = GameData.progressionMessages.termination.performance;
        } else if (metrics.crmCompliance < 60) {
            outcome = 'warning';
            feedback.message = GameData.progressionMessages.warning.documentation;
            this.state.warnings++;
        } else if (overallScore >= 80 && this.canPromote()) {
            outcome = 'promotion';
            feedback.message = this.getPromotionMessage();
            this.promotePlayer();
        } else if (overallScore < 60) {
            outcome = 'warning';
            feedback.message = this.getWarningMessage();
            this.state.warnings++;
        }

        // Show review screen
        this.showReviewScreen(metrics, outcome, feedback);

        // Advance quarter
        this.state.currentQuarter++;
        if (this.state.currentQuarter > 4) {
            this.state.currentQuarter = 1;
            this.state.currentYear++;
        }

        // Award skill points for surviving the quarter
        if (outcome !== 'termination') {
            this.state.skillPoints += 2;
        }

        this.state.quarterlyReviews.push({
            quarter: this.state.currentQuarter,
            year: this.state.currentYear,
            metrics: { ...metrics },
            outcome: outcome
        });
    }

    showReviewScreen(metrics, outcome, feedback) {
        document.getElementById('review-period').textContent = `Q${this.state.currentQuarter} ${this.state.currentYear}`;

        // Update metric displays
        document.getElementById('review-kol-fill').style.width = `${metrics.kolEngagement}%`;
        document.getElementById('review-kol-score').textContent = `${Math.round(metrics.kolEngagement)}%`;
        document.getElementById('review-kol-feedback').textContent =
            metrics.kolEngagement >= 80 ? 'Excellent KOL coverage' :
            metrics.kolEngagement >= 60 ? 'Adequate engagement, room for improvement' :
            'Below target - increase meaningful interactions';

        document.getElementById('review-exchange-fill').style.width = `${metrics.scientificExchange}%`;
        document.getElementById('review-exchange-score').textContent = `${Math.round(metrics.scientificExchange)}%`;

        document.getElementById('review-insights-fill').style.width = `${metrics.insightGeneration}%`;
        document.getElementById('review-insights-score').textContent = `${Math.round(metrics.insightGeneration)}%`;

        document.getElementById('review-compliance-fill').style.width = `${metrics.regulatoryCompliance}%`;
        document.getElementById('review-compliance-score').textContent = `${Math.round(metrics.regulatoryCompliance)}%`;

        document.getElementById('review-crm-fill').style.width = `${metrics.crmCompliance}%`;
        document.getElementById('review-crm-score').textContent = `${Math.round(metrics.crmCompliance)}%`;

        // Show outcome
        const outcomeContainer = document.getElementById('review-outcome');
        outcomeContainer.className = `review-outcome ${outcome}`;

        let outcomeIcon = '';
        let outcomeTitle = '';

        switch (outcome) {
            case 'promotion':
                outcomeIcon = '🎉';
                outcomeTitle = 'Promotion!';
                break;
            case 'warning':
                outcomeIcon = '⚠️';
                outcomeTitle = 'Performance Improvement Needed';
                break;
            case 'termination':
                outcomeIcon = '❌';
                outcomeTitle = 'Employment Terminated';
                break;
            default:
                outcomeIcon = '✓';
                outcomeTitle = 'Satisfactory Performance';
        }

        outcomeContainer.innerHTML = `
            <div class="outcome-icon">${outcomeIcon}</div>
            <h3 class="outcome-title">${outcomeTitle}</h3>
            <p class="outcome-message">${feedback.message || 'Continue your good work into the next quarter.'}</p>
        `;

        if (outcome === 'termination') {
            this.state.gameOver = true;
        }

        this.showScreen('review-screen');
    }

    continueAfterReview() {
        if (this.state.gameOver) {
            this.showGameOver('termination');
        } else {
            this.showScreen('dashboard-screen');
            this.updateDashboard();
        }
    }

    canPromote() {
        const currentTitleIndex = GameData.careerLevels.findIndex(l => l.title === this.state.player.title);
        if (currentTitleIndex >= GameData.careerLevels.length - 1) return false;

        const totalQuarters = this.state.quarterlyReviews.length + 1;
        const nextLevel = GameData.careerLevels[currentTitleIndex + 1];

        return totalQuarters >= nextLevel.minQuarters;
    }

    promotePlayer() {
        const currentTitleIndex = GameData.careerLevels.findIndex(l => l.title === this.state.player.title);
        if (currentTitleIndex < GameData.careerLevels.length - 1) {
            this.state.player.title = GameData.careerLevels[currentTitleIndex + 1].title;
            this.state.skillPoints += 5; // Bonus skill points for promotion
        }
    }

    getPromotionMessage() {
        const title = this.state.player.title;
        if (title === 'Associate MSL') return GameData.progressionMessages.promotion.msl;
        if (title === 'MSL') return GameData.progressionMessages.promotion.senior;
        if (title === 'Senior MSL') return GameData.progressionMessages.promotion.principal;
        if (title === 'Principal MSL') return GameData.progressionMessages.promotion.director;
        return 'Congratulations on your excellent performance!';
    }

    getWarningMessage() {
        const metrics = this.state.metrics;
        if (metrics.kolEngagement < 60) return GameData.progressionMessages.warning.engagement;
        if (metrics.regulatoryCompliance < 80) return GameData.progressionMessages.warning.compliance;
        if (metrics.crmCompliance < 80) return GameData.progressionMessages.warning.documentation;
        if (metrics.insightGeneration < 50) return GameData.progressionMessages.warning.insights;
        return 'Overall performance needs improvement. Focus on all metrics next quarter.';
    }

    triggerTermination(reason) {
        this.state.gameOver = true;
        this.showGameOver(reason);
    }

    showGameOver(reason) {
        let title, icon, message;

        switch (reason) {
            case 'compliance':
                title = 'Career Ended';
                icon = '⚠️';
                message = GameData.progressionMessages.termination.compliance;
                break;
            case 'performance':
                title = 'Career Ended';
                icon = '📉';
                message = GameData.progressionMessages.termination.performance;
                break;
            case 'documentation':
                title = 'Career Ended';
                icon = '📋';
                message = GameData.progressionMessages.termination.documentation;
                break;
            default:
                title = 'Game Over';
                icon = '🏁';
                message = 'Your MSL career has concluded.';
        }

        document.getElementById('gameover-title').textContent = title;
        document.getElementById('gameover-icon').textContent = icon;
        document.getElementById('gameover-message').textContent = message;

        // Show final stats
        const stats = document.getElementById('gameover-stats');
        stats.innerHTML = `
            <div class="gameover-stat">
                <span>Total KOL Interactions</span>
                <span>${this.state.interactions.length}</span>
            </div>
            <div class="gameover-stat">
                <span>Insights Gathered</span>
                <span>${this.state.insights.length}</span>
            </div>
            <div class="gameover-stat">
                <span>Final Title</span>
                <span>${this.state.player.title}</span>
            </div>
            <div class="gameover-stat">
                <span>Quarters Survived</span>
                <span>${this.state.quarterlyReviews.length}</span>
            </div>
            <div class="gameover-stat">
                <span>Final Compliance Score</span>
                <span>${Math.round(this.state.metrics.regulatoryCompliance)}%</span>
            </div>
        `;

        this.showScreen('gameover-screen');
        localStorage.removeItem('mslSimulatorSave');
    }

    // Utility Functions
    showNotification(title, message, type = 'info') {
        const container = document.getElementById('notification-container');

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;

        const icons = {
            success: '✓',
            warning: '⚠️',
            error: '❌',
            info: 'ℹ️'
        };

        notification.innerHTML = `
            <span class="notification-icon">${icons[type]}</span>
            <div class="notification-content">
                <div class="notification-title">${title}</div>
                <div class="notification-message">${message}</div>
            </div>
        `;

        container.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    saveGame() {
        localStorage.setItem('mslSimulatorSave', JSON.stringify(this.state));
    }
}

// Add fadeOut animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(100%); }
    }
`;
document.head.appendChild(style);

// Initialize game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.game = new MSLGame();
});

// Also handle player name input for character creation
document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('player-name');
    if (nameInput) {
        nameInput.addEventListener('input', () => {
            if (window.game) {
                window.game.checkCharacterComplete();
            }
        });
    }
});
