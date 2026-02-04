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
            // XP and Level System
            xp: 0,
            level: 1,
            xpToNextLevel: 100,
            totalXpEarned: 0,
            // Action Points System
            actionPoints: {
                current: 5,
                max: 5
            },
            homeBase: null, // Set when territory selected
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
            gameOver: false,
            gameWon: false,
            // CRM Quality Tracking
            crmQuality: {
                totalEntries: 0,
                averageScore: 0,
                grades: { A: 0, 'B+': 0, B: 0, 'C+': 0, C: 0, D: 0 }
            },
            // Adverse Event Tracking
            adverseEvents: {
                pending: [],      // AEs detected but not yet reported
                reported: [],     // Successfully reported AEs
                missed: [],       // AEs that weren't reported in time
                totalDetected: 0,
                totalReported: 0,
                totalMissed: 0
            }
        };

        // Double-click prevention tracker
        this.processingActions = new Set();

        this.init();
    }

    // Prevent double-clicks on actions
    preventDoubleClick(actionId, callback, delay = 500) {
        if (this.processingActions.has(actionId)) {
            console.log(`Action ${actionId} blocked - already processing`);
            return false;
        }
        this.processingActions.add(actionId);
        setTimeout(() => this.processingActions.delete(actionId), delay);
        callback();
        return true;
    }

    init() {
        try {
            this.bindEvents();
            this.initSkills();
            this.initTutorial();
            this.showLoadingScreen();
        } catch (error) {
            console.error('Error initializing game:', error);
            this.showErrorMessage('Failed to initialize game. Please refresh the page.');
        }
    }

    showErrorMessage(message) {
        const container = document.getElementById('game-container');
        if (container) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'game-error-message';
            errorDiv.innerHTML = `
                <div class="error-content">
                    <h3>⚠️ Error</h3>
                    <p>${message}</p>
                    <button onclick="location.reload()">Refresh Page</button>
                </div>
            `;
            container.appendChild(errorDiv);
        }
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
        document.getElementById('new-game-btn')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('New Game clicked');
            this.startNewGame();
        });
        document.getElementById('continue-btn')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Continue clicked');
            this.continueGame();
        });
        document.getElementById('tutorial-btn')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Tutorial clicked');
            this.showScreen('tutorial-screen');
        });
        document.getElementById('back-to-title')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.showScreen('title-screen');
        });

        // Character creation
        document.querySelectorAll('.education-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const value = e.currentTarget.dataset.value;
                console.log('Education selected:', value);
                this.selectEducation(value);
            });
        });
        document.querySelectorAll('.ta-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const value = e.currentTarget.dataset.value;
                console.log('TA selected:', value);
                this.selectTherapeuticArea(value);
            });
        });
        document.getElementById('proceed-territory')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Proceed to territory clicked');
            this.proceedToTerritory();
        });

        // Territory selection
        document.getElementById('start-career')?.addEventListener('click', () => this.startCareer());

        // Dashboard navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                const panel = e.currentTarget.dataset.panel;
                console.log('Switching panel to:', panel);
                this.switchPanel(panel);
            });
        });

        // Action Menu Toggle
        document.getElementById('action-menu-toggle')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleActionMenu();
        });
        document.getElementById('close-action-menu')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.closeActionMenu();
        });

        // Dashboard actions
        document.getElementById('action-visit-kol')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Visit KOL clicked');
            this.closeActionMenu();
            this.showKOLSelection();
        });
        document.getElementById('action-congress')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Congress clicked');
            this.closeActionMenu();
            this.showCongressScreen();
        });
        document.getElementById('action-advisory')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Advisory clicked');
            this.closeActionMenu();
            this.showAdvisoryScreen();
        });
        document.getElementById('action-training')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Training clicked');
            this.closeActionMenu();
            this.showTrainingScreen();
        });
        document.getElementById('action-iis')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('IIS clicked');
            this.closeActionMenu();
            this.showIISScreen();
        });
        document.getElementById('advance-time')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Advance week clicked');
            this.closeActionMenu();
            this.advanceWeek();
        });

        // Interaction screen
        document.getElementById('end-interaction')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.preventDoubleClick('end-interaction', () => {
                console.log('End interaction clicked');
                this.endInteraction();
            });
        });
        document.getElementById('back-from-interaction')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.preventDoubleClick('back-from-interaction', () => {
                console.log('Back from interaction clicked');
                this.exitInteractionWithoutSaving();
            });
        });

        // CRM Modal
        document.getElementById('submit-crm')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.preventDoubleClick('submit-crm', () => {
                console.log('Submit CRM clicked');
                this.submitCRM();
            });
        });
        document.getElementById('save-draft-crm')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.preventDoubleClick('save-draft-crm', () => {
                console.log('Save CRM draft clicked');
                this.saveCRMDraft();
            });
        });

        // Back buttons - bind all of them
        document.querySelectorAll('[id^="back-to-dashboard"], [id^="back-from-"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Back button clicked:', btn.id);
                this.showScreen('dashboard-screen');
            });
        });
        document.getElementById('leave-congress')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Leave congress clicked');
            this.leaveCongress();
        });

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

        // Advisory board submit
        document.getElementById('submit-advisory')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.submitAdvisoryBoard();
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

        // Pre-call planning
        document.getElementById('start-meeting')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.preventDoubleClick('start-meeting', () => this.startMeetingFromPlanning());
        });
        document.getElementById('cancel-planning')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.preventDoubleClick('cancel-planning', () => this.cancelPlanning());
        });

        // Objective checkboxes - limit to 3
        document.querySelectorAll('input[name="objectives"]').forEach(checkbox => {
            checkbox.addEventListener('change', () => this.enforceObjectiveLimit());
        });

        // CRM quality scoring
        this.bindCRMScoringEvents();

        // Next action prompt button (dynamically handled in updateNextActionPrompt)
        document.getElementById('prompt-action-btn')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            // Action is set dynamically via onclick in updateNextActionPrompt
        });
    }

    bindCRMScoringEvents() {
        // All scored fields
        document.querySelectorAll('.crm-scored-field').forEach(field => {
            field.addEventListener('change', () => this.updateCRMQualityScore());
            field.addEventListener('input', () => this.updateCRMQualityScore());
        });

        // Character counts
        const summaryField = document.getElementById('crm-discussion-summary');
        const insightsField = document.getElementById('crm-insights');

        summaryField?.addEventListener('input', () => {
            const count = summaryField.value.length;
            const countEl = document.getElementById('summary-char-count');
            if (countEl) {
                countEl.textContent = count;
                countEl.parentElement.classList.toggle('met', count >= 50);
            }
            this.updateCRMQualityScore();
        });

        insightsField?.addEventListener('input', () => {
            const count = insightsField.value.length;
            const countEl = document.getElementById('insights-char-count');
            if (countEl) countEl.textContent = count;
            this.updateCRMQualityScore();
        });

        // Off-label toggle
        document.querySelectorAll('input[name="off-label"]').forEach(radio => {
            radio.addEventListener('change', () => {
                const details = document.getElementById('off-label-details');
                if (details) {
                    details.style.display = radio.value !== 'no' && radio.checked ? 'block' : 'none';
                }
            });
        });

        // AE toggle
        document.querySelectorAll('input[name="ae"]').forEach(radio => {
            radio.addEventListener('change', () => {
                const details = document.getElementById('ae-details');
                if (details) {
                    details.style.display = radio.value === 'yes' && radio.checked ? 'block' : 'none';
                }
            });
        });

        // AE Modal events
        document.getElementById('submit-ae')?.addEventListener('click', () => this.submitAEReport());
        document.getElementById('cancel-ae')?.addEventListener('click', () => this.closeModal('ae-modal'));
    }

    // ========================
    // Adverse Event System
    // ========================

    detectAdverseEvent(dialogueText, kol) {
        // AE trigger phrases that suggest an adverse event was mentioned
        const aeTriggers = [
            'side effect', 'adverse event', 'adverse reaction',
            'stopped taking', 'discontinued', 'couldn\'t tolerate',
            'hospitalized', 'emergency room', 'ER visit',
            'severe reaction', 'allergic reaction', 'anaphylaxis',
            'died', 'death', 'fatal', 'life-threatening',
            'rash', 'swelling', 'bleeding', 'infection',
            'liver problems', 'kidney problems', 'heart problems',
            'couldn\'t walk', 'collapsed', 'seizure',
            'my patient had', 'one of my patients experienced'
        ];

        const lowerText = dialogueText.toLowerCase();
        const triggered = aeTriggers.some(trigger => lowerText.includes(trigger));

        if (triggered) {
            return {
                detected: true,
                source: kol?.name || 'Unknown',
                dialogue: dialogueText,
                timestamp: Date.now()
            };
        }
        return { detected: false };
    }

    triggerAEDetection(aeInfo) {
        // Create pending AE entry
        const aeEntry = {
            id: `ae_${Date.now()}`,
            kolId: this.state.currentKOL?.id,
            kolName: aeInfo.source,
            detectedWeek: this.state.currentWeek,
            detectedQuarter: this.state.currentQuarter,
            dialogue: aeInfo.dialogue,
            deadline: this.state.currentWeek + 1, // Due by next week
            status: 'pending'
        };

        if (!this.state.adverseEvents) {
            this.state.adverseEvents = { pending: [], reported: [], missed: [], totalDetected: 0, totalReported: 0, totalMissed: 0 };
        }
        this.state.adverseEvents.pending.push(aeEntry);
        this.state.adverseEvents.totalDetected++;

        // Show alert notification
        this.showNotification(
            '⚠️ Adverse Event Detected',
            'An adverse event was mentioned. Complete the AE report within 24 hours.',
            'warning'
        );

        // Auto-open AE form if not in middle of conversation
        if (!this.state.currentScenario && !this.state.currentBranchingScenario) {
            setTimeout(() => this.openAEModal(aeEntry), 1500);
        }
    }

    openAEModal(aeEntry = null) {
        const modal = document.getElementById('ae-modal');
        if (!modal) return;

        // Set the current AE being reported
        this.state.currentAE = aeEntry || this.state.adverseEvents.pending[0];

        // Reset form
        document.getElementById('ae-source').value = '';
        document.getElementById('ae-description').value = '';
        document.getElementById('ae-reporter-name').value = '';
        document.getElementById('ae-reporter-contact').value = '';
        document.getElementById('ae-additional-notes').value = '';
        document.querySelectorAll('input[name="ae-severity"]').forEach(r => r.checked = false);
        document.querySelectorAll('input[name="ae-expected"]').forEach(r => r.checked = false);

        // Pre-fill if we have context
        if (this.state.currentAE) {
            document.getElementById('ae-reporter-name').value = this.state.currentAE.kolName || '';
            if (this.state.currentAE.dialogue) {
                document.getElementById('ae-description').value =
                    `KOL mentioned: "${this.state.currentAE.dialogue.substring(0, 200)}..."`;
            }
        }

        // Update deadline display
        this.updateAETimer();

        modal.classList.add('active');
    }

    updateAETimer() {
        const timerEl = document.getElementById('ae-time-remaining');
        const timerContainer = document.getElementById('ae-timer');
        if (!timerEl) return;

        // For simplicity, show deadline in weeks (since we use weeks as time unit)
        if (this.state.currentAE) {
            const weeksRemaining = this.state.currentAE.deadline - this.state.currentWeek;
            if (weeksRemaining <= 0) {
                timerEl.textContent = 'OVERDUE!';
                timerContainer?.classList.add('urgent');
            } else if (weeksRemaining === 1) {
                timerEl.textContent = 'Due this week!';
                timerContainer?.classList.add('urgent');
            } else {
                timerEl.textContent = `${weeksRemaining} weeks`;
                timerContainer?.classList.remove('urgent');
            }
        } else {
            timerEl.textContent = '24:00:00';
        }
    }

    submitAEReport() {
        const source = document.getElementById('ae-source').value;
        const description = document.getElementById('ae-description').value;
        const severity = document.querySelector('input[name="ae-severity"]:checked')?.value;
        const expected = document.querySelector('input[name="ae-expected"]:checked')?.value;
        const reporterName = document.getElementById('ae-reporter-name').value;
        const reporterContact = document.getElementById('ae-reporter-contact').value;
        const additionalNotes = document.getElementById('ae-additional-notes').value;

        // Validation
        if (!source || !description || !severity) {
            this.showNotification('Incomplete Report', 'Please fill in all required fields: Source, Description, and Severity.', 'warning');
            return;
        }

        if (description.length < 30) {
            this.showNotification('More Detail Needed', 'Please provide a more detailed description of the adverse event.', 'warning');
            return;
        }

        // Create completed AE report
        const report = {
            id: this.state.currentAE?.id || `ae_${Date.now()}`,
            source,
            description,
            severity,
            expected,
            reporterName,
            reporterContact,
            additionalNotes,
            reportedWeek: this.state.currentWeek,
            reportedQuarter: this.state.currentQuarter,
            timely: true // Reported on time
        };

        // Move from pending to reported
        if (this.state.currentAE) {
            const pendingIndex = this.state.adverseEvents.pending.findIndex(
                ae => ae.id === this.state.currentAE.id
            );
            if (pendingIndex >= 0) {
                const wasOverdue = this.state.currentAE.deadline <= this.state.currentWeek;
                report.timely = !wasOverdue;
                this.state.adverseEvents.pending.splice(pendingIndex, 1);
            }
        }

        this.state.adverseEvents.reported.push(report);
        this.state.adverseEvents.totalReported++;

        // Calculate XP reward based on quality
        let xpReward = GameData.xpRewards.crmEntry; // Base XP
        let bonusMessage = '';

        if (severity === 'serious' || severity === 'severe') {
            xpReward += 15; // Bonus for handling serious AEs
            bonusMessage = ' (Serious AE properly documented)';
        }

        if (report.timely) {
            xpReward += 10; // Bonus for timely reporting
            bonusMessage += ' (Timely submission)';

            // Boost compliance
            this.state.metrics.regulatoryCompliance = Math.min(100,
                this.state.metrics.regulatoryCompliance + 5
            );
        }

        this.awardXP(xpReward, `AE Report Submitted${bonusMessage}`);

        this.closeModal('ae-modal');
        this.state.currentAE = null;

        this.showNotification(
            'AE Report Submitted',
            `Adverse event has been documented and forwarded to pharmacovigilance.${bonusMessage}`,
            'success'
        );

        this.updateDashboard();
        this.saveGame();
    }

    checkOverdueAEs() {
        if (!this.state.adverseEvents || !this.state.adverseEvents.pending) return;
        // Check for overdue AEs during week advancement
        const overdue = this.state.adverseEvents.pending.filter(
            ae => ae.deadline <= this.state.currentWeek
        );

        overdue.forEach(ae => {
            // Move to missed
            const index = this.state.adverseEvents.pending.findIndex(p => p.id === ae.id);
            if (index >= 0) {
                this.state.adverseEvents.pending.splice(index, 1);
                ae.missedWeek = this.state.currentWeek;
                this.state.adverseEvents.missed.push(ae);
                this.state.adverseEvents.totalMissed++;

                // Compliance penalty
                this.state.metrics.regulatoryCompliance = Math.max(0,
                    this.state.metrics.regulatoryCompliance - 15
                );

                // Warning
                this.state.warnings++;

                this.showNotification(
                    '⚠️ Missed AE Deadline',
                    `You failed to report an adverse event in time. This is a serious regulatory violation. (-15% Compliance)`,
                    'danger'
                );

                // Check for termination
                if (this.state.adverseEvents.totalMissed >= 3) {
                    this.triggerComplianceCrisis();
                }
            }
        });
    }

    getPendingAECount() {
        if (!this.state.adverseEvents || !this.state.adverseEvents.pending) return 0;
        return this.state.adverseEvents.pending.length;
    }

    updatePendingAEDisplay() {
        const alertEl = document.getElementById('pending-ae-alert');
        const messageEl = document.getElementById('pending-ae-message');
        if (!alertEl) return;

        // Ensure adverseEvents exists
        if (!this.state.adverseEvents) {
            this.state.adverseEvents = { pending: [], reported: [], missed: [], totalDetected: 0, totalReported: 0, totalMissed: 0 };
        }

        const pendingCount = this.getPendingAECount();

        if (pendingCount > 0) {
            alertEl.style.display = 'flex';

            // Check for urgent AEs
            const urgentAEs = (this.state.adverseEvents.pending || []).filter(
                ae => ae.deadline - this.state.currentWeek <= 1
            );

            if (urgentAEs.length > 0) {
                messageEl.textContent = `URGENT: ${urgentAEs.length} adverse event${urgentAEs.length > 1 ? 's' : ''} due this week!`;
                alertEl.classList.add('urgent');
            } else {
                messageEl.textContent = `${pendingCount} adverse event${pendingCount > 1 ? 's' : ''} require${pendingCount === 1 ? 's' : ''} documentation`;
                alertEl.classList.remove('urgent');
            }
        } else {
            alertEl.style.display = 'none';
        }
    }

    updateCRMQualityScore() {
        let score = 0;
        let maxScore = 50; // Simplified scoring
        let hasPromotional = false;

        // Check interaction type (10 points)
        const typeField = document.getElementById('crm-interaction-type');
        if (typeField && typeField.value !== '') score += 10;

        // Check duration (5 points)
        const durationField = document.getElementById('crm-duration');
        if (durationField && durationField.value !== '') score += 5;

        // Check topics selected (10 points)
        const topicsChecked = document.querySelectorAll('input[name="topics"]:checked').length;
        if (topicsChecked > 0) {
            score += 10;
            if (topicsChecked >= 2) score += 5; // Bonus for multiple topics
        }

        // Check summary (15 points) with promotional language check
        const summaryField = document.getElementById('crm-discussion-summary');
        const summaryText = summaryField?.value || '';
        const summaryComplete = summaryText.length >= 50;

        // Check for promotional language (COMPLIANCE WARNING)
        const promotionalPhrases = [
            'best', 'superior', 'better than', 'recommend', 'should use',
            'amazing', 'excellent drug', 'first-line', 'preferred',
            'works great', 'outperforms', 'beats', 'destroys', 'miracle'
        ];
        hasPromotional = promotionalPhrases.some(phrase =>
            summaryText.toLowerCase().includes(phrase)
        );

        if (hasPromotional) {
            score -= 15; // Penalty for promotional language
        } else if (summaryComplete) {
            score += 15;
        }

        // Check sentiment (10 points)
        const sentimentField = document.getElementById('crm-sentiment');
        if (sentimentField && sentimentField.value !== '') score += 10;

        // Check follow-up/insights (bonus 10 points)
        const followupField = document.getElementById('crm-followup');
        if (followupField && followupField.value.length >= 10) {
            score += 10;
            maxScore += 10;
        }

        // Calculate percentage (ensure minimum 0)
        const percentage = Math.max(0, Math.round((score / maxScore) * 100));

        // Determine grade
        const grade = this.getCRMGrade(percentage);

        // Update UI
        const fillEl = document.getElementById('crm-quality-fill');
        const scoreEl = document.getElementById('crm-quality-score');
        const gradeEl = document.getElementById('crm-quality-grade');
        const feedbackEl = document.getElementById('crm-quality-feedback');

        if (fillEl) fillEl.style.width = `${percentage}%`;
        if (scoreEl) {
            scoreEl.textContent = `${percentage}%`;
            scoreEl.className = 'quality-score';
            if (percentage >= 80) scoreEl.classList.add('excellent');
            else if (percentage >= 60) scoreEl.classList.add('good');
            else if (percentage >= 40) scoreEl.classList.add('fair');
            else scoreEl.classList.add('poor');
        }

        if (gradeEl) {
            gradeEl.textContent = grade.letter;
            gradeEl.style.color = grade.color;
        }

        // Check required fields for submit button
        const typeComplete = typeField && typeField.value !== '';
        const topicsComplete = topicsChecked > 0;
        const requiredComplete = typeComplete && topicsComplete && summaryComplete;

        // Enable/disable submit button
        const submitBtn = document.getElementById('submit-crm');
        if (submitBtn) {
            submitBtn.disabled = !requiredComplete;
        }

        return { score, percentage, requiredComplete, grade, hasPromotional };
    }

    getCRMGrade(percentage) {
        if (percentage >= 90) return { letter: 'A', color: 'var(--success-color)' };
        if (percentage >= 80) return { letter: 'B+', color: '#22c55e' };
        if (percentage >= 70) return { letter: 'B', color: '#84cc16' };
        if (percentage >= 60) return { letter: 'C+', color: 'var(--warning-color)' };
        if (percentage >= 50) return { letter: 'C', color: '#f59e0b' };
        return { letter: 'D', color: 'var(--danger-color)' };
    }

    updateChecklistItem(itemId, complete, isBonus = false, isWarning = false) {
        const item = document.getElementById(itemId);
        if (item) {
            item.classList.remove('complete', 'incomplete', 'compliance-warning');
            if (isWarning) {
                item.classList.add('compliance-warning');
            } else {
                item.classList.add(complete ? 'complete' : 'incomplete');
            }
            if (isBonus) item.classList.add('bonus');
        }
    }

    // Screen Management
    showScreen(screenId) {
        console.log('Navigating to screen:', screenId);

        // Close any open modals first
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });

        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Show target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.state.screen = screenId;

            // Scroll to top of the screen
            window.scrollTo(0, 0);
        } else {
            console.error('Screen not found:', screenId);
        }
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
            try {
                this.state = JSON.parse(saved);

                // Validate saved game has required data
                if (!this.state.territory || !GameData.territories[this.state.territory]) {
                    console.error('Invalid saved game - missing territory');
                    this.showNotification('Save Error', 'Your saved game is corrupted. Starting a new game.', 'warning');
                    this.startNewGame();
                    return;
                }

                // Regenerate KOLs if missing (for old saves)
                if (!this.state.kols || this.state.kols.length === 0) {
                    console.log('Regenerating KOLs for saved game');
                    this.generateKOLs();
                }

                // Set home base if missing
                if (!this.state.homeBase) {
                    const territory = GameData.territories[this.state.territory];
                    this.state.homeBase = territory.homeBase;
                }

                this.showScreen('dashboard-screen');
                setTimeout(() => {
                    this.updateDashboard();
                }, 50);
            } catch (e) {
                console.error('Error loading saved game:', e);
                this.showNotification('Save Error', 'Could not load saved game. Starting a new game.', 'warning');
                this.startNewGame();
            }
        }
    }

    resetState() {
        this.state = {
            screen: 'character-screen',
            player: {
                name: '',
                education: null,
                therapeuticArea: null,
                title: 'MSL I',
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
            // XP and Level System
            xp: 0,
            level: 1,
            xpToNextLevel: 100,
            totalXpEarned: 0,
            // Action Points System
            actionPoints: {
                current: 5,
                max: 5
            },
            homeBase: null,
            // Time management
            weeklyTimeTotal: 40,
            weeklyTimeRemaining: 40,
            lastVisitedLocation: null,
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
            gameOver: false,
            gameWon: false,
            // CRM Quality Tracking
            crmQuality: {
                totalEntries: 0,
                averageScore: 0,
                grades: { A: 0, 'B+': 0, B: 0, 'C+': 0, C: 0, D: 0 }
            },
            // Adverse Event Tracking
            adverseEvents: {
                pending: [],
                reported: [],
                missed: [],
                totalDetected: 0,
                totalReported: 0,
                totalMissed: 0
            },
            // Weekly activity tracking
            trainingCompletedThisWeek: [],
            congressAttendedThisWeek: false,
            congressActivitiesThisSession: [],
            advisoryBoardThisWeek: false
        };
        this.initSkills();
    }

    // Time Management Methods
    getActivityTimeCost(activityType, kol = null) {
        const baseCosts = {
            'kol-visit': 2,       // Base 2 hours for KOL meeting
            'congress': 8,        // Full day at congress
            'advisory': 6,        // Advisory board participation
            'training': 3,        // Internal training session
            'iis': 2,            // IIS coordination
            'crm': 0.5           // CRM documentation
        };

        let cost = baseCosts[activityType] || 1;

        // Add travel time for KOL visits
        if (activityType === 'kol-visit' && kol) {
            cost += this.calculateTravelTime(kol);
        }

        return cost;
    }

    calculateTravelTime(kol) {
        // Base travel time depends on KOL type
        let baseTravelTime = 0.5; // 30 minutes base

        if (kol.type === 'academic') {
            baseTravelTime = 1; // Academic centers often in city centers
        } else if (kol.type === 'community') {
            baseTravelTime = 1.5; // Community hospitals spread out
        } else if (kol.type === 'private') {
            baseTravelTime = 1; // Private practices variable
        }

        // If we visited this KOL or nearby location recently, reduce travel time
        if (this.state.lastVisitedLocation === kol.institution) {
            baseTravelTime = 0;
        } else if (this.state.lastVisitedLocation &&
                   kol.institution.includes(this.state.lastVisitedLocation.split(' ')[0])) {
            baseTravelTime *= 0.5; // Same area, reduced travel
        }

        // Territory difficulty affects travel
        const territory = GameData.territories[this.state.territory];
        if (territory) {
            if (territory.characteristics.travelRequirement === 'Very High') {
                baseTravelTime *= 1.5;
            } else if (territory.characteristics.travelRequirement === 'High') {
                baseTravelTime *= 1.25;
            }
        }

        return Math.round(baseTravelTime * 10) / 10; // Round to 1 decimal
    }

    canAffordTime(cost) {
        return this.state.weeklyTimeRemaining >= cost;
    }

    spendTime(cost, activity, kol = null) {
        this.state.weeklyTimeRemaining = Math.max(0, this.state.weeklyTimeRemaining - cost);

        // Update last visited location
        if (kol) {
            this.state.lastVisitedLocation = kol.institution;
        }

        this.updateTimeBudgetDisplay();
    }

    updateTimeBudgetDisplay() {
        const remaining = this.state.weeklyTimeRemaining;
        const total = this.state.weeklyTimeTotal;
        const percentage = (remaining / total) * 100;

        const fillEl = document.getElementById('time-budget-fill');
        const remainingEl = document.getElementById('time-remaining');
        const textEl = document.querySelector('.time-budget-text');

        if (fillEl) {
            fillEl.style.width = `${percentage}%`;
            fillEl.classList.remove('low', 'medium');
            if (percentage <= 25) {
                fillEl.classList.add('low');
            } else if (percentage <= 50) {
                fillEl.classList.add('medium');
            }
        }

        if (remainingEl) {
            remainingEl.textContent = remaining.toFixed(1);
        }

        if (textEl) {
            textEl.classList.toggle('low', percentage <= 25);
        }
    }

    showTimeWarning(requiredTime) {
        this.showNotification('Not Enough Time',
            `This activity requires ${requiredTime} hours, but you only have ${this.state.weeklyTimeRemaining.toFixed(1)} hours remaining this week. Advance to next week to reset your time budget.`,
            'warning');
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

        // Show states covered
        const statesCovered = territory.states.map(s => s.abbrev).join(', ');
        const homeBase = `${territory.homeBase.city}, ${territory.homeBase.state}`;
        document.getElementById('territory-description').innerHTML = `
            <p>${territory.description}</p>
            <p class="territory-states"><strong>States Covered:</strong> ${statesCovered}</p>
            <p class="territory-homebase"><strong>Home Base:</strong> 📍 ${homeBase}</p>
        `;

        // Populate stats
        const statsContainer = document.getElementById('territory-stats');
        statsContainer.innerHTML = `
            <div class="territory-stat">
                <div class="value">${territory.states.length}</div>
                <div class="label">States</div>
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
        // Set home base from territory
        const territory = GameData.territories[this.state.territory];
        this.state.homeBase = territory.homeBase;

        this.generateKOLs();
        this.generateIISProjects();
        this.showScreen('dashboard-screen');

        // Use setTimeout to ensure DOM is fully rendered before updating
        setTimeout(() => {
            this.updateDashboard();

            // Force refresh of KOL list and map after initial render
            setTimeout(() => {
                this.updateMap();
                this.updateKOLList();
            }, 100);
        }, 50);

        // Show tutorial for new players
        if (this.shouldShowTutorial()) {
            setTimeout(() => {
                this.showTutorial();
            }, 600);
        } else {
            setTimeout(() => {
                this.showNotification('Welcome to ' + territory.name + '!',
                    `Your home base is ${territory.homeBase.city}, ${territory.homeBase.state}. Start by engaging with KOLs in your territory.`, 'info');
            }, 200);
        }
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
        const territory = GameData.territories[this.state.territory];

        const firstName = GameData.names.firstNames[Math.floor(Math.random() * GameData.names.firstNames.length)];
        const lastName = GameData.names.lastNames[Math.floor(Math.random() * GameData.names.lastNames.length)];

        // Get location from territory's states
        const state = territory.states[Math.floor(Math.random() * territory.states.length)];
        const city = state.cities[Math.floor(Math.random() * state.cities.length)];
        const institution = state.institutions[Math.floor(Math.random() * state.institutions.length)];

        return {
            id: `kol_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: `Dr. ${firstName} ${lastName}`,
            title: template.titleTemplate.replace('{TA}', therapeuticArea),
            institution: institution,
            tier: tier,
            type: type,
            // Location info
            location: {
                state: state.name,
                stateAbbrev: state.abbrev,
                city: city
            },
            relationship: 'new',
            relationshipScore: 0,
            interests: template.interests,
            personality: template.personality,
            dominantPersonality: template.dominantPersonality || 'analytical',
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

    // ==========================================
    // ACTION POINTS SYSTEM
    // ==========================================

    calculateTravelCost(kol) {
        if (!this.state.homeBase || !kol.location) return 1;

        const homeBase = this.state.homeBase;
        const kolLocation = kol.location;
        const costs = GameData.actionPoints.costs;

        // Same city = 1 AP
        if (kolLocation.city === homeBase.city && kolLocation.stateAbbrev === homeBase.state) {
            return costs.sameCity;
        }

        // Same state = 2 AP
        if (kolLocation.stateAbbrev === homeBase.state) {
            return costs.sameState;
        }

        // Different state = 3 AP
        return costs.differentState;
    }

    getTravelCostLabel(kol) {
        const cost = this.calculateTravelCost(kol);
        if (cost === 1) return { cost, label: 'Local', class: 'local' };
        if (cost === 2) return { cost, label: 'In-State', class: 'in-state' };
        return { cost, label: 'Travel Required', class: 'travel' };
    }

    canAffordActionPoints(cost) {
        return this.state.actionPoints.current >= cost;
    }

    spendActionPoints(cost, reason = '') {
        if (!this.canAffordActionPoints(cost)) {
            return false;
        }
        this.state.actionPoints.current -= cost;
        this.updateActionPointsDisplay();
        if (reason) {
            console.log(`Spent ${cost} AP: ${reason}`);
        }
        return true;
    }

    resetActionPoints() {
        this.state.actionPoints.current = this.state.actionPoints.max;
        this.updateActionPointsDisplay();
    }

    updateActionPointsDisplay() {
        const apDisplay = document.getElementById('action-points-display');
        if (apDisplay) {
            const current = this.state.actionPoints.current;
            const max = this.state.actionPoints.max;
            apDisplay.innerHTML = `
                <span class="ap-icon">⚡</span>
                <span class="ap-value">${current}/${max}</span>
                <span class="ap-label">AP</span>
            `;

            // Color based on remaining AP
            if (current <= 1) {
                apDisplay.classList.add('low');
                apDisplay.classList.remove('medium');
            } else if (current <= 2) {
                apDisplay.classList.add('medium');
                apDisplay.classList.remove('low');
            } else {
                apDisplay.classList.remove('low', 'medium');
            }
        }
    }

    showInsufficientAPMessage(required) {
        const current = this.state.actionPoints.current;
        this.showNotification(
            'Not Enough Action Points',
            `This activity requires ${required} AP, but you only have ${current}. End the week to refresh your action points.`,
            'warning'
        );
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

        // Update time budget
        this.updateTimeBudgetDisplay();

        // Update XP and Level display
        this.updateXPDisplay();
        this.updateLevelDisplay();

        // Update Action Points display
        this.updateActionPointsDisplay();

        // Update pending AE display
        this.updatePendingAEDisplay();

        this.updateMap();
        this.updateCalendar();
        this.updateKOLList();
        this.updateCRMPanel();
        this.updateSkillTree();
        this.updateInsightsPanel();
        this.updatePerformancePanel();
    }

    updateLevelDisplay() {
        const levelContainer = document.getElementById('level-display');
        if (!levelContainer) return;

        const currentLevel = this.state.level;
        const currentLevelData = GameData.careerLevels.find(l => l.level === currentLevel);
        const nextLevelData = GameData.careerLevels.find(l => l.level === currentLevel + 1);

        let xpProgress = 100;
        let xpText = 'MAX LEVEL';

        if (nextLevelData) {
            const xpIntoLevel = this.state.xp - (currentLevelData?.xpRequired || 0);
            const xpNeeded = nextLevelData.xpRequired - (currentLevelData?.xpRequired || 0);
            xpProgress = Math.min(100, Math.max(0, (xpIntoLevel / xpNeeded) * 100));
            xpText = `${this.state.xp} / ${nextLevelData.xpRequired} XP`;
        }

        levelContainer.innerHTML = `
            <div class="level-info">
                <span class="level-badge">Lv.${currentLevel}</span>
                <span class="level-title">${currentLevelData?.rank || 'MSL I'}</span>
            </div>
            <div class="xp-bar-container">
                <div class="xp-bar">
                    <div class="xp-bar-fill" style="width: ${xpProgress}%"></div>
                </div>
                <span class="xp-text">${xpText}</span>
            </div>
        `;
    }

    updateMap() {
        try {
            const container = document.getElementById('map-container');
            if (!container) {
                console.error('Map container not found');
                return;
            }
            container.innerHTML = '';

            console.log('updateMap called, territory:', this.state.territory);
            console.log('KOLs count:', this.state.kols?.length);
            console.log('GameData.territories:', Object.keys(GameData.territories || {}));

            const territory = GameData.territories[this.state.territory];
            if (!territory) {
                console.error('Territory not found:', this.state.territory);
                container.innerHTML = `
                    <div class="map-error-state">
                        <div class="error-icon">🗺️</div>
                        <h4>No Territory Selected</h4>
                        <p>Territory key: ${this.state.territory || 'undefined'}</p>
                        <p>Please start a new game to select your territory.</p>
                        <button class="menu-btn primary" onclick="game.startNewGame()">Start New Game</button>
                    </div>
                `;
                return;
            }

            console.log('Territory found:', territory.name);
            console.log('Territory states:', territory.states?.length);

            // Regenerate KOLs if missing
            if (!this.state.kols || this.state.kols.length === 0) {
                console.warn('No KOLs generated, regenerating...');
                this.generateKOLs();
                console.log('KOLs after regeneration:', this.state.kols?.length);
            }

        // Create territory-focused map showing only the states in this territory
        const mapWrapper = document.createElement('div');
        mapWrapper.className = 'territory-map-wrapper';

        // Create header with territory name and home base info
        const mapHeader = document.createElement('div');
        mapHeader.className = 'map-header';
        mapHeader.innerHTML = `
            <div class="map-title">
                <h4>${territory.name}</h4>
                <span class="home-base-badge">
                    <span class="home-icon">🏠</span>
                    Home: ${this.state.homeBase?.city || territory.homeBase.city}, ${this.state.homeBase?.state || territory.homeBase.state}
                </span>
            </div>
        `;
        mapWrapper.appendChild(mapHeader);

        // Create states container - a grid of state boxes
        const statesGrid = document.createElement('div');
        statesGrid.className = 'states-grid';

        // Group KOLs by state
        const kolsByState = {};
        territory.states.forEach(state => {
            kolsByState[state.abbrev] = this.state.kols.filter(
                kol => kol.location && kol.location.stateAbbrev === state.abbrev
            );
        });

        // Create a card for each state in the territory
        territory.states.forEach(state => {
            const stateCard = document.createElement('div');
            stateCard.className = 'state-card';

            const isHomeState = (this.state.homeBase?.state || territory.homeBase.state) === state.abbrev;
            if (isHomeState) {
                stateCard.classList.add('home-state');
            }

            const stateKols = kolsByState[state.abbrev] || [];
            const kolCount = stateKols.length;

            // State header
            const stateHeader = document.createElement('div');
            stateHeader.className = 'state-header';
            stateHeader.innerHTML = `
                <span class="state-name">${state.abbrev}</span>
                <span class="state-full-name">${state.name}</span>
                ${isHomeState ? '<span class="home-marker">🏠</span>' : ''}
            `;
            stateCard.appendChild(stateHeader);

            // State stats
            const stateStats = document.createElement('div');
            stateStats.className = 'state-stats';
            stateStats.innerHTML = `
                <span class="kol-count">${kolCount} KOLs</span>
                <span class="city-list">${state.cities.slice(0, 2).join(', ')}${state.cities.length > 2 ? '...' : ''}</span>
            `;
            stateCard.appendChild(stateStats);

            // KOL dots container
            const kolContainer = document.createElement('div');
            kolContainer.className = 'state-kols';

            stateKols.forEach(kol => {
                const kolDot = document.createElement('div');
                kolDot.className = `kol-dot ${kol.type}`;
                if (kol.interactionCount > 0) kolDot.classList.add('visited');

                const travelInfo = this.getTravelCostLabel(kol);
                kolDot.innerHTML = `<span class="dot-avatar">${kol.avatar}</span>`;
                kolDot.title = `${kol.name}\n${kol.institution}\n${kol.location.city}\nTier ${kol.tier} | ${this.capitalizeFirst(kol.relationship)}\n⚡${travelInfo.cost} AP`;

                kolDot.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.preventDoubleClick(`map-kol-${kol.id}`, () => this.startInteraction(kol.id));
                });

                kolContainer.appendChild(kolDot);
            });

            stateCard.appendChild(kolContainer);
            statesGrid.appendChild(stateCard);
        });

        mapWrapper.appendChild(statesGrid);
        container.appendChild(mapWrapper);

        // Update the legend to show state-specific info
        this.updateMapLegend();

        console.log('Map rendered successfully');
        } catch (error) {
            console.error('Error in updateMap:', error);
            const container = document.getElementById('map-container');
            if (container) {
                container.innerHTML = `
                    <div class="map-error-state">
                        <div class="error-icon">⚠️</div>
                        <h4>Error Loading Map</h4>
                        <p>${error.message}</p>
                        <button class="menu-btn primary" onclick="game.updateMap()">Retry</button>
                    </div>
                `;
            }
        }
    }

    updateMapLegend() {
        const legendContainer = document.querySelector('.map-legend');
        if (!legendContainer) return;

        legendContainer.innerHTML = `
            <div class="legend-item"><span class="dot academic"></span> Academic Medical Center</div>
            <div class="legend-item"><span class="dot community"></span> Community Hospital</div>
            <div class="legend-item"><span class="dot practice"></span> Private Practice</div>
            <div class="legend-item"><span class="dot visited-indicator"></span> Visited</div>
            <div class="legend-item"><span class="home-icon-legend">🏠</span> Home State</div>
        `;
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

            // Get travel cost info
            const travelInfo = this.getTravelCostLabel(kol);
            const locationText = kol.location ?
                `${kol.location.city}, ${kol.location.stateAbbrev}` :
                'Unknown';

            // Get personality info
            const personality = kol.dominantPersonality || 'analytical';
            const personalityData = GameData.personalityTypes[personality];
            const personalityIcon = {
                analytical: '🔬',
                skeptic: '🤔',
                pragmatic: '⚡',
                practical: '👥',
                enthusiastic: '✨'
            }[personality] || '👤';

            card.innerHTML = `
                <div class="kol-card-header">
                    <div class="kol-avatar">${kol.avatar}</div>
                    <div class="kol-card-info">
                        <h4>${kol.name}</h4>
                        <p>${kol.title}</p>
                        <p>${kol.institution}</p>
                        <p class="kol-location">📍 ${locationText}</p>
                    </div>
                </div>
                <div class="kol-card-stats">
                    <span class="kol-tier tier-${kol.tier}">Tier ${kol.tier}</span>
                    <span class="kol-relationship ${kol.relationship}">${this.capitalizeFirst(kol.relationship)}</span>
                    <span class="kol-personality ${personality}">${personalityIcon} ${personalityData?.name || 'Unknown'}</span>
                    <span class="kol-travel-cost ${travelInfo.class}">⚡${travelInfo.cost} AP</span>
                </div>
            `;
            card.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.preventDoubleClick(`kol-card-${kol.id}`, () => this.startInteraction(kol.id));
            });
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
                entryElement.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.preventDoubleClick(`crm-entry-${entry.id}`, () => this.openCRMForm(entry));
                });
            }

            entriesList.appendChild(entryElement);
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

        // Update CRM Quality stats
        this.updateCRMQualityDisplay();

        document.getElementById('next-review').textContent = `End of Q${this.state.currentQuarter}`;

        // Update next action prompt
        this.updateNextActionPrompt();
    }

    updateCRMQualityDisplay() {
        const quality = this.state.crmQuality;
        const avgEl = document.getElementById('metric-crm-avg');
        const gradeAEl = document.getElementById('crm-grade-a');
        const gradeBEl = document.getElementById('crm-grade-b');
        const gradeCEl = document.getElementById('crm-grade-c');

        if (avgEl) {
            if (quality.totalEntries > 0) {
                const grade = this.getCRMGrade(quality.averageScore);
                avgEl.textContent = grade.letter;
                avgEl.style.color = grade.color;
            } else {
                avgEl.textContent = '-';
                avgEl.style.color = 'var(--text-muted)';
            }
        }

        // Count A grades (A only)
        const gradeA = quality.grades.A || 0;
        // Count B grades (B+ and B)
        const gradeB = (quality.grades['B+'] || 0) + (quality.grades.B || 0);
        // Count C grades (C+, C, and D)
        const gradeC = (quality.grades['C+'] || 0) + (quality.grades.C || 0) + (quality.grades.D || 0);

        if (gradeAEl) gradeAEl.textContent = gradeA;
        if (gradeBEl) gradeBEl.textContent = gradeB;
        if (gradeCEl) gradeCEl.textContent = gradeC;
    }

    updateNextActionPrompt() {
        const prompt = this.calculateNextActionPrompt();

        const promptEl = document.getElementById('next-action-prompt');
        const iconEl = document.getElementById('prompt-icon');
        const titleEl = document.getElementById('prompt-title');
        const messageEl = document.getElementById('prompt-message');
        const actionTextEl = document.getElementById('prompt-action-text');
        const actionBtnEl = document.getElementById('prompt-action-btn');

        if (!promptEl) return;

        // Update classes
        promptEl.className = 'next-action-prompt';
        if (prompt.type) promptEl.classList.add(prompt.type);

        // Update content
        if (iconEl) iconEl.textContent = prompt.icon;
        if (titleEl) titleEl.textContent = prompt.title;
        if (messageEl) messageEl.textContent = prompt.message;
        if (actionTextEl) actionTextEl.textContent = prompt.actionText;

        // Set up action button
        if (actionBtnEl) {
            actionBtnEl.onclick = () => this.executePromptAction(prompt.action);
        }
    }

    calculateNextActionPrompt() {
        // Priority 1: Critical compliance warning
        if (this.state.metrics.regulatoryCompliance < 70) {
            return {
                icon: '⚠️',
                title: 'Compliance Alert',
                message: 'Your compliance score is critical. Focus on compliant interactions to avoid termination.',
                actionText: 'View Performance',
                action: 'view-performance',
                type: 'warning'
            };
        }

        // Priority 2: Overdue CRM documentation
        const overdueCRM = this.state.pendingCRM.filter(c => c.status === 'overdue').length;
        if (overdueCRM > 0) {
            return {
                icon: '📝',
                title: 'Overdue Documentation',
                message: `You have ${overdueCRM} overdue CRM ${overdueCRM === 1 ? 'entry' : 'entries'}. Document interactions within 48 hours to maintain compliance.`,
                actionText: 'Open CRM',
                action: 'open-crm',
                type: 'warning'
            };
        }

        // Priority 3: Low time remaining
        if (this.state.weeklyTimeRemaining < 4) {
            return {
                icon: '⏰',
                title: 'Low Time Budget',
                message: `Only ${this.state.weeklyTimeRemaining.toFixed(1)} hours remaining this week. Consider advancing to next week.`,
                actionText: 'Advance Week',
                action: 'advance-week',
                type: 'warning'
            };
        }

        // Priority 4: Pending CRM
        if (this.state.pendingCRM.length > 0) {
            return {
                icon: '📋',
                title: 'Pending Documentation',
                message: `You have ${this.state.pendingCRM.length} pending CRM ${this.state.pendingCRM.length === 1 ? 'entry' : 'entries'}. Complete documentation for full credit.`,
                actionText: 'Open CRM',
                action: 'open-crm'
            };
        }

        // Priority 5: Low KOL engagement (new game)
        const engagedKOLs = this.state.kols.filter(k => k.interactionCount > 0).length;
        if (engagedKOLs < 3) {
            return {
                icon: '👤',
                title: 'Build Your Network',
                message: `You've met ${engagedKOLs} of ${this.state.kols.length} KOLs. Start building relationships with key opinion leaders.`,
                actionText: 'Visit a KOL',
                action: 'visit-kol'
            };
        }

        // Priority 6: Low insight count
        if (this.state.insights.length < 5) {
            return {
                icon: '💡',
                title: 'Gather Insights',
                message: 'Focus on gathering medical insights from your KOL interactions. Insights are valuable for your metrics.',
                actionText: 'Visit a KOL',
                action: 'visit-kol'
            };
        }

        // Priority 7: Follow up with existing KOLs
        const needsFollowUp = this.state.kols.filter(k =>
            k.interactionCount > 0 &&
            k.relationship !== 'advocate' &&
            (!k.lastContact || (this.state.currentWeek - k.lastContact.week) > 2)
        );
        if (needsFollowUp.length > 0) {
            return {
                icon: '🔄',
                title: 'Follow Up',
                message: `${needsFollowUp[0].name} hasn't been contacted recently. Follow up to maintain the relationship.`,
                actionText: 'Visit KOL',
                action: 'visit-kol'
            };
        }

        // Priority 8: Quarter review approaching
        if (this.state.currentWeek >= 10) {
            return {
                icon: '📊',
                title: 'Review Approaching',
                message: 'Quarterly review is approaching. Focus on improving any lagging metrics.',
                actionText: 'View Performance',
                action: 'view-performance'
            };
        }

        // Default: Continue KOL engagement
        return {
            icon: '🎯',
            title: 'Keep Engaging',
            message: 'Continue building relationships with KOLs and gathering insights. Quality interactions lead to career advancement.',
            actionText: 'Visit a KOL',
            action: 'visit-kol',
            type: 'success'
        };
    }

    executePromptAction(action) {
        switch (action) {
            case 'visit-kol':
                this.showKOLSelection();
                break;
            case 'open-crm':
                this.switchPanel('crm');
                break;
            case 'view-performance':
                this.switchPanel('performance');
                break;
            case 'advance-week':
                this.advanceWeek();
                break;
            default:
                this.showKOLSelection();
        }
    }

    // Interactive Tutorial System
    initTutorial() {
        this.tutorialSteps = [
            {
                icon: '🎓',
                title: 'Welcome to MSL Simulator!',
                content: 'You\'re about to start your career as a Medical Science Liaison. This tutorial will guide you through the key aspects of the game.',
                tips: [
                    'MSLs are scientific experts who engage with healthcare professionals',
                    'Your goal is to build relationships, gather insights, and maintain compliance',
                    'Performance reviews determine career advancement'
                ],
                highlight: null
            },
            {
                icon: '🗺️',
                title: 'Territory Map',
                content: 'The Territory Map shows your assigned region with KOLs organized by state. Each colored dot represents a KOL you can visit. Your home state is highlighted.',
                tips: [
                    'Blue dots = Academic Medical Centers (usually Tier 1-2)',
                    'Green dots = Community Hospitals',
                    'Orange dots = Private Practices',
                    'Click any KOL dot to start an interaction'
                ],
                highlight: 'territory-map'
            },
            {
                icon: '👥',
                title: 'KOL Database',
                content: 'The KOL Database lists all Key Opinion Leaders in your territory. Filter by tier or relationship status. Each KOL has a unique personality and interests.',
                tips: [
                    'Tier 1 KOLs are national experts - high value but demanding',
                    'Check personality types to tailor your approach',
                    'AP cost shows travel time needed (1 = local, 3 = different state)',
                    'Build relationships gradually - trust takes time'
                ],
                highlight: 'kol-database'
            },
            {
                icon: '⚡',
                title: 'Action Points (AP)',
                content: 'You have 5 Action Points per week. Every activity costs AP based on travel distance. Local visits cost 1 AP, same-state 2 AP, different state 3 AP.',
                tips: [
                    'Plan your week to maximize KOL interactions',
                    'Cluster visits in the same state to save AP',
                    'AP resets when you advance to the next week',
                    'Running out of AP? Advance the week!'
                ],
                highlight: 'action-points-display'
            },
            {
                icon: '▶️',
                title: 'Actions Menu',
                content: 'Click the Actions tab on the right side to open the activities menu. Here you can visit KOLs, attend congresses, run advisory boards, and more.',
                tips: [
                    'Visit KOL - Start a scientific exchange meeting',
                    'Congress - Attend medical conferences for networking',
                    'Advisory Board - Organize expert panels',
                    'Advance Week - Move to next week and reset AP'
                ],
                highlight: 'action-menu-toggle'
            },
            {
                icon: '💬',
                title: 'KOL Conversations',
                content: 'When meeting a KOL, you\'ll engage in realistic dialogue scenarios. Your responses affect relationship building, compliance score, and insight gathering.',
                tips: [
                    'Always stay within approved labeling when proactive',
                    'You CAN respond to unsolicited off-label questions',
                    'Never make comparative claims without data',
                    'Report adverse events immediately - this is mandatory'
                ],
                highlight: null
            },
            {
                icon: '📝',
                title: 'CRM Documentation',
                content: 'After each KOL interaction, document it in the CRM within 48 hours. Quality documentation improves your metrics and compliance score.',
                tips: [
                    'Complete all required fields for best grades',
                    'Record any insights gathered from the conversation',
                    'Flag off-label discussions and adverse events',
                    'Late documentation hurts your CRM compliance score'
                ],
                highlight: 'crm'
            },
            {
                icon: '📅',
                title: 'Calendar & Time',
                content: 'The Calendar shows your weekly schedule. Each quarter has 12 weeks, and you\'ll have a performance review at the end of each quarter.',
                tips: [
                    'Plan ahead for upcoming congresses and events',
                    'Track your scheduled meetings and activities',
                    'Performance reviews determine promotions or warnings',
                    'Reach Level 10 to win the game!'
                ],
                highlight: 'calendar'
            },
            {
                icon: '🎯',
                title: 'Your Goal',
                content: 'Build relationships with KOLs, gather valuable insights, maintain compliance, and advance your career from MSL I to Senior Director. Good luck!',
                tips: [
                    'Focus on Tier 1-2 KOLs for faster XP gains',
                    'Keep compliance above 70% to avoid termination',
                    'Document interactions promptly for CRM compliance',
                    'Earn XP through successful KOL interactions'
                ],
                highlight: 'level-display'
            }
        ];

        this.currentTutorialStep = 0;
        this.bindTutorialEvents();
    }

    bindTutorialEvents() {
        document.getElementById('tutorial-next')?.addEventListener('click', () => this.nextTutorialStep());
        document.getElementById('tutorial-prev')?.addEventListener('click', () => this.prevTutorialStep());
        document.getElementById('tutorial-skip')?.addEventListener('click', () => this.endTutorial());
    }

    showTutorial() {
        this.currentTutorialStep = 0;
        this.renderTutorialStep();
        document.getElementById('tutorial-overlay').classList.add('active');
    }

    renderTutorialStep() {
        const step = this.tutorialSteps[this.currentTutorialStep];
        const totalSteps = this.tutorialSteps.length;

        // Update content
        document.getElementById('tutorial-step-icon').textContent = step.icon;
        document.getElementById('tutorial-step-title').textContent = step.title;
        document.getElementById('tutorial-step-content').textContent = step.content;

        // Update tips
        const tipsList = document.getElementById('tutorial-tips-list');
        tipsList.innerHTML = '';
        step.tips.forEach(tip => {
            const li = document.createElement('li');
            li.textContent = tip;
            tipsList.appendChild(li);
        });

        // Update progress dots
        const dotsContainer = document.getElementById('tutorial-progress-dots');
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSteps; i++) {
            const dot = document.createElement('div');
            dot.className = 'progress-dot';
            if (i < this.currentTutorialStep) dot.classList.add('completed');
            if (i === this.currentTutorialStep) dot.classList.add('active');
            dotsContainer.appendChild(dot);
        }

        // Update progress text
        document.getElementById('tutorial-progress-text').textContent =
            `Step ${this.currentTutorialStep + 1} of ${totalSteps}`;

        // Show/hide navigation buttons
        document.getElementById('tutorial-prev').style.display =
            this.currentTutorialStep > 0 ? 'block' : 'none';

        const nextBtn = document.getElementById('tutorial-next');
        if (this.currentTutorialStep === totalSteps - 1) {
            nextBtn.textContent = 'Start Playing';
        } else {
            nextBtn.textContent = 'Next';
        }

        // Handle UI element highlighting
        this.clearTutorialHighlights();
        if (step.highlight) {
            this.highlightElement(step.highlight);
        }
    }

    clearTutorialHighlights() {
        document.querySelectorAll('.tutorial-highlight').forEach(el => {
            el.classList.remove('tutorial-highlight');
        });
        // Remove any highlight overlays
        document.querySelectorAll('.tutorial-highlight-overlay').forEach(el => {
            el.remove();
        });
    }

    highlightElement(elementId) {
        // Try to find the element - could be an ID or a nav button panel
        let element = document.getElementById(elementId);

        // If it's a panel, we might need to switch to it first
        const panelNames = ['territory-map', 'calendar', 'kol-database', 'crm', 'skills', 'insights-panel', 'performance'];
        if (panelNames.includes(elementId)) {
            this.switchPanel(elementId);
            element = document.getElementById(elementId);
        }

        // Special handling for action menu
        if (elementId === 'action-menu-toggle') {
            this.openActionMenu();
            element = document.getElementById('action-menu-container');
        }

        if (element) {
            element.classList.add('tutorial-highlight');

            // Scroll element into view if needed
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    nextTutorialStep() {
        if (this.currentTutorialStep < this.tutorialSteps.length - 1) {
            this.currentTutorialStep++;
            this.renderTutorialStep();
        } else {
            this.endTutorial();
        }
    }

    prevTutorialStep() {
        if (this.currentTutorialStep > 0) {
            this.currentTutorialStep--;
            this.renderTutorialStep();
        }
    }

    endTutorial() {
        // Clear any highlights
        this.clearTutorialHighlights();

        // Close action menu if open
        this.closeActionMenu();

        // Switch to default panel
        this.switchPanel('territory-map');

        document.getElementById('tutorial-overlay').classList.remove('active');

        // Mark tutorial as completed
        localStorage.setItem('mslSimulatorTutorialCompleted', 'true');

        this.showNotification('Tutorial Complete', 'You\'re ready to start your MSL career! Click the Actions tab on the right to visit KOLs.', 'success');
    }

    shouldShowTutorial() {
        return !localStorage.getItem('mslSimulatorTutorialCompleted');
    }

    switchPanel(panelId) {
        document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.nav-btn[data-panel="${panelId}"]`)?.classList.add('active');

        document.querySelectorAll('.panel').forEach(panel => panel.classList.remove('active'));
        document.getElementById(panelId)?.classList.add('active');
    }

    // Action Menu Controls
    toggleActionMenu() {
        const container = document.getElementById('action-menu-container');
        if (container) {
            container.classList.toggle('open');
        }
    }

    closeActionMenu() {
        const container = document.getElementById('action-menu-container');
        if (container) {
            container.classList.remove('open');
        }
    }

    openActionMenu() {
        const container = document.getElementById('action-menu-container');
        if (container) {
            container.classList.add('open');
        }
    }

    // KOL Interaction
    showKOLSelection() {
        this.switchPanel('kol-database');
    }

    startInteraction(kolId) {
        const kol = this.state.kols.find(k => k.id === kolId);
        if (!kol) return;

        // Calculate travel/action point cost
        const apCost = this.calculateTravelCost(kol);

        // Check if we have enough action points
        if (!this.canAffordActionPoints(apCost)) {
            this.showInsufficientAPMessage(apCost);
            return;
        }

        // Calculate time cost for this visit
        const timeCost = this.getActivityTimeCost('kol-visit', kol);

        // Check if we have enough time
        if (!this.canAffordTime(timeCost)) {
            this.showTimeWarning(timeCost);
            return;
        }

        // Spend action points
        this.spendActionPoints(apCost, `Meeting with ${kol.name}`);

        this.state.currentKOL = kol;
        this.state.currentMeetingTimeCost = timeCost;
        this.state.dialogueHistory = [];
        this.state.meetingObjectives = [];
        this.state.meetingMaterials = [];
        this.state.objectiveProgress = {};

        // Show pre-call planning modal
        this.showPreCallPlanning(kol);
    }

    showPreCallPlanning(kol) {
        // Populate KOL info
        document.getElementById('precall-avatar').textContent = kol.avatar;
        document.getElementById('precall-kol-name').textContent = kol.name;
        document.getElementById('precall-kol-title').textContent = kol.title;
        document.getElementById('precall-kol-institution').textContent = kol.institution;
        document.getElementById('precall-tier').textContent = kol.tier;
        document.getElementById('precall-relationship').textContent = this.capitalizeFirst(kol.relationship);

        // Last contact
        if (kol.lastContact) {
            document.getElementById('precall-last-contact').textContent =
                `Week ${kol.lastContact.week}, Q${kol.lastContact.quarter}`;
        } else {
            document.getElementById('precall-last-contact').textContent = 'Never';
        }

        // Add time cost information to planning modal
        const timeCost = this.state.currentMeetingTimeCost;
        const travelTime = this.calculateTravelTime(kol);
        const meetingTime = 2; // Base meeting time

        // Create or update time info section
        let timeInfo = document.getElementById('precall-time-info');
        if (!timeInfo) {
            timeInfo = document.createElement('div');
            timeInfo.id = 'precall-time-info';
            timeInfo.className = 'precall-time-info';
            const kolInfo = document.querySelector('.precall-kol-info');
            if (kolInfo) {
                kolInfo.after(timeInfo);
            }
        }

        timeInfo.innerHTML = `
            <div class="time-breakdown">
                <span class="time-label">Travel time:</span>
                <span class="time-value">${travelTime} hrs</span>
            </div>
            <div class="time-breakdown">
                <span class="time-label">Meeting time:</span>
                <span class="time-value">${meetingTime} hrs</span>
            </div>
            <div class="time-breakdown total">
                <span class="time-label">Total:</span>
                <span class="time-value">${timeCost} hrs</span>
            </div>
            <div class="time-remaining-note">
                You have ${this.state.weeklyTimeRemaining.toFixed(1)} hours remaining this week
            </div>
        `;

        // Populate interests
        const interestsContainer = document.getElementById('precall-interests');
        interestsContainer.innerHTML = '';
        (kol.interests || ['Research', 'Clinical Practice']).forEach(interest => {
            const tag = document.createElement('span');
            tag.className = 'interest-tag';
            tag.textContent = interest;
            interestsContainer.appendChild(tag);
        });

        // Add location info
        const locationInfo = document.getElementById('precall-location');
        if (locationInfo && kol.location) {
            locationInfo.textContent = `${kol.location.city}, ${kol.location.stateAbbrev}`;
        }

        // Add personality info
        const personalityInfo = document.getElementById('precall-personality');
        if (personalityInfo && kol.personality) {
            personalityInfo.innerHTML = `<strong>${kol.personality.type || 'Unknown'}</strong>`;
        }

        // Populate recent publications
        const publicationsContainer = document.getElementById('precall-publications');
        if (publicationsContainer) {
            const publications = this.generateFakePublications(kol);
            if (publications.length > 0) {
                publicationsContainer.innerHTML = '<ul>' +
                    publications.map(pub => `<li>${pub}</li>`).join('') +
                    '</ul>';
            } else {
                publicationsContainer.innerHTML = '<p>No recent publications found.</p>';
            }
        }

        // Populate previous interaction notes
        const previousNotesContainer = document.getElementById('precall-previous-notes');
        if (previousNotesContainer) {
            const previousNotes = this.getLastInteractionNotes(kol);
            if (previousNotes) {
                previousNotesContainer.innerHTML = previousNotes;
            } else {
                previousNotesContainer.innerHTML = '<p>No previous interactions recorded.</p>';
            }
        }

        // Generate tips based on KOL
        this.generatePreCallTips(kol);

        // Reset checkboxes
        document.querySelectorAll('input[name="objectives"]').forEach(cb => cb.checked = false);
        document.querySelectorAll('input[name="materials"]').forEach(cb => cb.checked = false);
        document.getElementById('precall-questions').value = '';

        // Show modal
        document.getElementById('precall-modal').classList.add('active');
    }

    generatePreCallTips(kol) {
        const tipsList = document.getElementById('precall-tips-list');
        tipsList.innerHTML = '';

        const tips = [];

        // Get personality-specific tips from gameData
        const personality = kol.dominantPersonality || 'analytical';
        const personalityData = GameData.personalityTypes[personality];

        if (personalityData) {
            // Add personality header
            tips.push(`🎯 ${personalityData.name} Personality: ${personalityData.description}`);

            // Add specific personality tips
            personalityData.tips.forEach(tip => {
                tips.push(`💡 ${tip}`);
            });
        }

        // Tips based on relationship
        if (kol.relationship === 'new') {
            tips.push('📌 First meeting: Focus on understanding their practice and interests');
        } else if (kol.relationship === 'developing') {
            tips.push('📌 Reference previous conversations to show you listened');
        } else if (kol.relationship === 'established' || kol.relationship === 'advocate') {
            tips.push('📌 Consider discussing research collaboration opportunities');
        }

        // Tips based on tier
        if (kol.tier === 1) {
            tips.push('⭐ Tier 1 KOL: Come prepared with deep scientific data');
        } else if (kol.tier === 3) {
            tips.push('👥 Focus on practical, real-world application of data');
        }

        // Tips based on type
        if (kol.type === 'academic') {
            tips.push('🏛️ Academic setting: Discuss clinical trial data and methodology');
        } else if (kol.type === 'community') {
            tips.push('🏥 Community practice: Address real-world effectiveness');
        }

        // Populate tips list (max 6)
        tips.slice(0, 6).forEach(tip => {
            const li = document.createElement('li');
            li.textContent = tip;
            tipsList.appendChild(li);
        });
    }

    generateFakePublications(kol) {
        const ta = GameData.therapeuticAreas[this.state.player.therapeuticArea];
        const taName = ta ? ta.name : 'oncology';
        const year = this.state.currentYear;

        // Publication templates based on KOL type
        const templates = {
            academic: [
                `${kol.name.split(' ').pop()} et al. "Real-world outcomes in ${taName}: A retrospective cohort study." J Clin Med ${year};`,
                `"Novel biomarkers for treatment response in ${taName}." Cancer Research ${year - 1};`,
                `"Long-term follow-up of patients treated with immunotherapy in ${taName}." NEJM ${year - 1};`
            ],
            community: [
                `${kol.name.split(' ').pop()} et al. "Community practice patterns in ${taName} management." Am J Med ${year};`,
                `"Patient adherence challenges in ${taName} treatment." Patient Preference and Adherence ${year - 1};`
            ],
            private: [
                `"Quality of life outcomes in ${taName} patients." Quality of Life Research ${year};`,
                `"Treatment decision-making in community ${taName} practice." Curr Oncol ${year - 1};`
            ]
        };

        const pubs = templates[kol.type] || templates.community;
        return pubs.slice(0, Math.min(2, pubs.length));
    }

    getLastInteractionNotes(kol) {
        // Find the last interaction with this KOL
        const interactions = this.state.interactions.filter(i => i.kolId === kol.id);
        if (interactions.length === 0) return null;

        const lastInteraction = interactions[interactions.length - 1];

        // Get CRM notes for this interaction
        const crmEntry = this.state.completedCRM.find(c => c.kolId === kol.id);

        let notes = `<strong>Last Meeting:</strong> Week ${lastInteraction.week}, Q${lastInteraction.quarter}<br>`;

        if (lastInteraction.meetingScore) {
            notes += `<strong>Meeting Quality:</strong> ${this.capitalizeFirst(lastInteraction.meetingScore.rating)} `;
            notes += `(${lastInteraction.meetingScore.percentage}%)<br>`;
        }

        if (lastInteraction.objectives && lastInteraction.objectives.length > 0) {
            notes += `<strong>Objectives Discussed:</strong> ${lastInteraction.objectives.join(', ')}<br>`;
        }

        if (crmEntry && crmEntry.summary) {
            notes += `<strong>Summary:</strong> ${crmEntry.summary}`;
        }

        return notes;
    }

    enforceObjectiveLimit() {
        const checked = document.querySelectorAll('input[name="objectives"]:checked');
        const unchecked = document.querySelectorAll('input[name="objectives"]:not(:checked)');

        if (checked.length >= 3) {
            unchecked.forEach(cb => cb.disabled = true);
        } else {
            unchecked.forEach(cb => cb.disabled = false);
        }
    }

    startMeetingFromPlanning() {
        const kol = this.state.currentKOL;
        const timeCost = this.state.currentMeetingTimeCost;

        // Spend time for this meeting
        this.spendTime(timeCost, 'kol-visit', kol);

        // Collect objectives
        this.state.meetingObjectives = Array.from(
            document.querySelectorAll('input[name="objectives"]:checked')
        ).map(cb => cb.value);

        // Collect materials
        this.state.meetingMaterials = Array.from(
            document.querySelectorAll('input[name="materials"]:checked')
        ).map(cb => cb.value);

        // Initialize objective tracking
        this.state.objectiveProgress = {};
        this.state.meetingObjectives.forEach(obj => {
            this.state.objectiveProgress[obj] = { achieved: false, attempts: 0 };
        });

        // Store questions for later reference
        this.state.plannedQuestions = document.getElementById('precall-questions').value;

        // Close modal
        this.closeModal('precall-modal');

        // Now start the actual interaction
        this.beginInteraction(kol);
    }

    beginInteraction(kol) {
        // Update interaction screen
        document.getElementById('interaction-kol-name').textContent = kol.name;
        document.getElementById('interaction-kol-title').textContent = kol.title;
        document.getElementById('interaction-kol-institution').textContent = kol.institution;
        document.getElementById('interaction-avatar').textContent = kol.avatar;

        // Update KOL details in sidebar
        const specialty = document.getElementById('kol-specialty');
        const interests = document.getElementById('kol-interests');
        const prevInteractions = document.getElementById('kol-prev-interactions');

        if (specialty) specialty.textContent = kol.title;
        if (interests) interests.textContent = kol.interests ? kol.interests.join(', ') : 'Research, Clinical Practice';
        if (prevInteractions) prevInteractions.textContent = kol.interactionCount || 0;

        // Update relationship bar
        const fillPercent = Math.min(100, (kol.relationshipScore / 100) * 100);
        document.getElementById('relationship-fill').style.width = `${fillPercent}%`;
        document.getElementById('relationship-label').textContent = this.capitalizeFirst(kol.relationship);

        // Clear notes field
        const notesField = document.getElementById('interaction-notes');
        if (notesField) notesField.value = '';

        // Show objectives in UI if they were set
        if (this.state.meetingObjectives.length > 0) {
            this.showMeetingObjectives();
        }

        this.showScreen('interaction-screen');
        this.startDialogue();
    }

    showMeetingObjectives() {
        // Find or create objectives display
        let objectivesDisplay = document.getElementById('meeting-objectives-display');
        if (!objectivesDisplay) {
            objectivesDisplay = document.createElement('div');
            objectivesDisplay.id = 'meeting-objectives-display';
            objectivesDisplay.className = 'meeting-objectives';

            // Insert at top of dialogue container
            const dialogueContainer = document.querySelector('.dialogue-container');
            if (dialogueContainer) {
                dialogueContainer.insertBefore(objectivesDisplay, dialogueContainer.firstChild);
            }
        }

        const objectiveNames = {
            'scientific-exchange': 'Scientific Exchange',
            'gather-insights': 'Gather Insights',
            'build-relationship': 'Build Relationship',
            'discuss-research': 'Discuss Research',
            'address-concerns': 'Address Concerns',
            'competitive-intel': 'Competitive Landscape'
        };

        let html = '<div class="objectives-header">Meeting Objectives</div>';
        html += '<div class="objectives-list">';
        this.state.meetingObjectives.forEach(obj => {
            const achieved = this.state.objectiveProgress[obj]?.achieved;
            html += `<span class="objective-badge ${achieved ? 'achieved' : ''}" data-objective="${obj}">
                ${achieved ? '✓' : '○'} ${objectiveNames[obj] || obj}
            </span>`;
        });
        html += '</div>';

        objectivesDisplay.innerHTML = html;
    }

    updateObjectiveProgress(objective) {
        if (this.state.objectiveProgress[objective]) {
            this.state.objectiveProgress[objective].achieved = true;
            this.showMeetingObjectives(); // Update display
            this.showNotification('Objective Achieved!', `You've achieved your objective: ${objective.replace('-', ' ')}`, 'success');
        }
    }

    cancelPlanning() {
        this.closeModal('precall-modal');
        this.state.currentKOL = null;
    }

    exitInteractionWithoutSaving() {
        // Confirm if there was any dialogue
        if (this.state.dialogueHistory.length > 2) {
            if (!confirm('You have an ongoing conversation. Are you sure you want to leave without completing the interaction?')) {
                return;
            }
        }
        this.state.currentKOL = null;
        this.state.dialogueHistory = [];
        this.state.currentScenario = null;
        this.showScreen('dashboard-screen');
        this.updateDashboard();
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
        // Decide whether to use branching scenario or simple scenario
        // Branching scenarios happen more often for established relationships
        const kol = this.state.currentKOL;
        const useBranching = Math.random() < 0.6; // 60% chance for branching scenarios

        if (useBranching && GameData.branchingScenarios) {
            this.startBranchingScenario();
        } else {
            this.startSimpleScenario();
        }
    }

    startSimpleScenario() {
        // Select a random scenario based on interaction history
        const scenarioTypes = Object.keys(GameData.scenarios);
        const randomType = scenarioTypes[Math.floor(Math.random() * scenarioTypes.length)];
        const scenarios = GameData.scenarios[randomType];
        const scenario = scenarios[Math.floor(Math.random() * scenarios.length)];

        this.state.currentScenario = scenario;
        this.state.isBranchingScenario = false;

        // Show thinking indicator, then KOL's question
        this.showThinkingIndicator(this.state.currentKOL.name);
        const delay = this.calculateResponseDelay(scenario.kolQuestion);

        setTimeout(() => {
            this.hideThinkingIndicator();
            this.addDialogueMessage(this.state.currentKOL.name, scenario.kolQuestion, 'kol');
            this.showDialogueOptions(scenario.options);
        }, delay);
    }

    startBranchingScenario() {
        // Combine regular branching scenarios with gray area scenarios
        let allScenarios = [];

        if (GameData.branchingScenarios) {
            Object.entries(GameData.branchingScenarios).forEach(([key, scenario]) => {
                allScenarios.push({ ...scenario, key, type: 'branching' });
            });
        }

        if (GameData.grayAreaScenarios) {
            Object.entries(GameData.grayAreaScenarios).forEach(([key, scenario]) => {
                allScenarios.push({ ...scenario, key, type: 'grayArea' });
            });
        }

        // Select a random scenario
        const randomIndex = Math.floor(Math.random() * allScenarios.length);
        const scenario = allScenarios[randomIndex];

        this.state.currentBranchingScenario = scenario;
        this.state.currentBranchingStage = 'stage_1';
        this.state.isBranchingScenario = true;
        this.state.branchingConsequences = {
            totalRelationshipChange: 0,
            totalComplianceHit: 0,
            insightsGathered: [],
            violations: []
        };

        // Get the first stage
        const firstStage = scenario.stages.find(s => s.id === 'stage_1');
        if (firstStage) {
            // Show thinking indicator
            this.showThinkingIndicator(this.state.currentKOL.name);
            const delay = this.calculateResponseDelay(firstStage.kolDialogue);

            setTimeout(() => {
                this.hideThinkingIndicator();
                this.addDialogueMessage(this.state.currentKOL.name, firstStage.kolDialogue, 'kol');
                this.showBranchingOptions(firstStage.options);
            }, delay);
        }
    }

    showBranchingOptions(options) {
        const optionsContainer = document.getElementById('dialogue-options');
        optionsContainer.innerHTML = '';

        // Shuffle options to randomize order
        const shuffledOptions = [...options].sort(() => Math.random() - 0.5);

        shuffledOptions.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'dialogue-option';
            button.innerHTML = option.text;
            button.addEventListener('click', () => this.selectBranchingOption(option));
            optionsContainer.appendChild(button);
        });

        this.updateComplianceIndicator('green', 'Active conversation');
    }

    selectBranchingOption(option) {
        const kol = this.state.currentKOL;
        const scenario = this.state.currentBranchingScenario;

        // Add player's response
        this.addDialogueMessage('You', option.text, 'player');

        // Clear options
        document.getElementById('dialogue-options').innerHTML = '';

        // Track cumulative consequences
        this.state.branchingConsequences.totalRelationshipChange += option.relationshipChange || 0;

        // Handle compliance
        if (option.complianceStatus === 'violation') {
            this.state.branchingConsequences.totalComplianceHit += option.complianceHit || 20;
            this.state.branchingConsequences.violations.push(option.feedback);
            this.updateComplianceIndicator('red', 'Compliance concern detected');
            this.showNotification('Compliance Issue', option.feedback, 'warning');
        } else if (option.complianceStatus === 'risk') {
            this.showNotification('Compliance Note', option.feedback, 'warning');
        }

        // Handle insight opportunity
        if (option.insightOpportunity) {
            this.state.branchingConsequences.insightsGathered.push(option.insightType || 'clinical');
            this.checkObjectiveProgress('gather-insights');
        }

        // Track objectives from branching responses
        this.trackObjectivesFromResponse(option);

        // Track discuss-research for IIS-related scenarios
        if (scenario.id && scenario.id.includes('iis')) {
            this.checkObjectiveProgress('discuss-research');
        }

        // Determine next stage
        if (option.nextStage) {
            const nextStage = scenario.stages.find(s => s.id === option.nextStage);

            if (nextStage) {
                this.state.currentBranchingStage = nextStage.id;

                // Show thinking indicator while KOL processes
                this.showThinkingIndicator(kol.name);
                const delay = this.calculateResponseDelay(nextStage.kolDialogue);

                setTimeout(() => {
                    this.hideThinkingIndicator();

                    // Add KOL's response
                    this.addDialogueMessage(kol.name, nextStage.kolDialogue, 'kol');

                    // Apply any stage-level changes
                    if (nextStage.relationshipChange) {
                        this.state.branchingConsequences.totalRelationshipChange += nextStage.relationshipChange;
                    }
                    if (nextStage.complianceHit) {
                        this.state.branchingConsequences.totalComplianceHit += nextStage.complianceHit;
                    }

                    // Check if this is an ending stage
                    if (nextStage.isEnding) {
                        this.completeBranchingScenario(nextStage);
                    } else if (nextStage.options) {
                        // Show next options after a delay
                        setTimeout(() => {
                            this.showBranchingOptions(nextStage.options);
                        }, 1000);
                    }
                }, delay);
            }
        } else {
            // No next stage specified, show feedback and continue options
            setTimeout(() => {
                if (option.feedback) {
                    this.addDialogueMessage('System', `[${option.feedback}]`, 'system');
                }
                setTimeout(() => {
                    this.showContinueOptions();
                }, 1000);
            }, 800);
        }

        // Update relationship bar in real-time
        const currentChange = this.state.branchingConsequences.totalRelationshipChange;
        const tempScore = Math.max(0, Math.min(100, kol.relationshipScore + currentChange));
        const fillPercent = Math.min(100, (tempScore / 100) * 100);
        document.getElementById('relationship-fill').style.width = `${fillPercent}%`;
    }

    completeBranchingScenario(endStage) {
        const kol = this.state.currentKOL;
        const consequences = this.state.branchingConsequences;

        // Apply all accumulated consequences
        kol.relationshipScore += consequences.totalRelationshipChange;
        kol.relationshipScore = Math.max(0, Math.min(100, kol.relationshipScore));
        this.updateRelationshipLevel(kol);

        // Apply compliance hits
        if (consequences.totalComplianceHit > 0) {
            this.state.metrics.regulatoryCompliance = Math.max(0,
                this.state.metrics.regulatoryCompliance - consequences.totalComplianceHit);
        }

        // Gather insights
        consequences.insightsGathered.forEach(insightType => {
            this.gatherInsight(insightType);
        });

        // Handle special outcomes
        if (endStage.outcome === 'compliance_crisis' || endStage.triggerComplianceReview) {
            this.triggerComplianceCrisis();
        }

        if (endStage.aeReported) {
            this.showNotification('AE Documented', 'Adverse event has been recorded for pharmacovigilance review.', 'info');
            this.state.metrics.regulatoryCompliance = Math.min(100, this.state.metrics.regulatoryCompliance + 5);
        }

        if (endStage.scheduleFollowUp) {
            this.showNotification('Follow-up Scheduled', `${kol.name} wants to meet again. This is a strong relationship signal.`, 'success');
        }

        // Show note to player for gray area scenarios
        if (endStage.noteToPlayer) {
            setTimeout(() => {
                this.showNotification('Reflection', endStage.noteToPlayer, 'info');
            }, 500);
        }

        // Update metrics based on outcome
        if (endStage.outcome === 'positive') {
            this.state.metrics.scientificExchange = Math.min(100, this.state.metrics.scientificExchange + 10);
            this.state.metrics.kolEngagement = Math.min(100, this.state.metrics.kolEngagement + 5);
        } else if (endStage.outcome === 'negative') {
            this.state.metrics.scientificExchange = Math.max(0, this.state.metrics.scientificExchange - 5);
        }

        // Show summary
        setTimeout(() => {
            this.showBranchingScenarioSummary(endStage);
        }, 2000);
    }

    showBranchingScenarioSummary(endStage) {
        const consequences = this.state.branchingConsequences;
        const kol = this.state.currentKOL;

        let summaryHtml = '<div class="scenario-summary">';
        summaryHtml += '<h4>Conversation Summary</h4>';

        // Relationship change
        const relChange = consequences.totalRelationshipChange;
        if (relChange > 0) {
            summaryHtml += `<p class="positive">Relationship: +${relChange} (${kol.relationship})</p>`;
        } else if (relChange < 0) {
            summaryHtml += `<p class="negative">Relationship: ${relChange} (${kol.relationship})</p>`;
        } else {
            summaryHtml += `<p>Relationship: No change</p>`;
        }

        // Compliance
        if (consequences.totalComplianceHit > 0) {
            summaryHtml += `<p class="negative">Compliance Score: -${consequences.totalComplianceHit}</p>`;
            if (consequences.violations.length > 0) {
                summaryHtml += '<p class="violation-note">Issues: ' + consequences.violations.join('; ') + '</p>';
            }
        } else {
            summaryHtml += '<p class="positive">Compliance: No issues</p>';
        }

        // Insights
        if (consequences.insightsGathered.length > 0) {
            summaryHtml += `<p class="positive">Insights gathered: ${consequences.insightsGathered.length}</p>`;
        }

        summaryHtml += '</div>';

        this.addDialogueMessage('System', summaryHtml, 'system');

        // Update UI
        const fillPercent = Math.min(100, (kol.relationshipScore / 100) * 100);
        document.getElementById('relationship-fill').style.width = `${fillPercent}%`;
        document.getElementById('relationship-label').textContent = this.capitalizeFirst(kol.relationship);

        // Show continue/end options
        setTimeout(() => {
            this.showContinueOptions();
        }, 1000);
    }

    triggerComplianceCrisis() {
        this.state.warnings++;

        this.showNotification('Compliance Alert',
            'A serious compliance concern has been flagged. This will be reviewed by compliance leadership.',
            'error');

        // Check for termination
        if (this.state.warnings >= 3 || this.state.metrics.regulatoryCompliance <= 30) {
            setTimeout(() => {
                this.triggerTermination('compliance');
            }, 3000);
        }
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

        // Check for adverse event mentions in KOL dialogue
        if (type === 'kol' && this.state.currentKOL) {
            const aeDetection = this.detectAdverseEvent(text, this.state.currentKOL);
            if (aeDetection.detected) {
                // Delay the AE trigger to not interrupt conversation flow
                setTimeout(() => this.triggerAEDetection(aeDetection), 2000);
            }
        }
    }

    showThinkingIndicator(speaker) {
        const dialogueHistory = document.getElementById('dialogue-history');

        // Remove any existing thinking indicator
        this.hideThinkingIndicator();

        const indicator = document.createElement('div');
        indicator.className = 'dialogue-message kol thinking-indicator';
        indicator.id = 'kol-thinking';
        indicator.innerHTML = `
            <div class="speaker">${speaker}</div>
            <div class="thinking-dots">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
            </div>
        `;

        dialogueHistory.appendChild(indicator);
        dialogueHistory.scrollTop = dialogueHistory.scrollHeight;
    }

    hideThinkingIndicator() {
        const indicator = document.getElementById('kol-thinking');
        if (indicator) {
            indicator.remove();
        }
    }

    // Calculate delay based on response complexity
    calculateResponseDelay(text) {
        const baseDelay = 1000;
        const wordsPerSecond = 3; // Average reading speed for thinking
        const wordCount = text ? text.split(/\s+/).length : 10;
        const readingTime = (wordCount / wordsPerSecond) * 1000;

        // Add some randomness for natural feel
        const randomFactor = 0.8 + Math.random() * 0.4; // 0.8 to 1.2

        return Math.min(Math.max(baseDelay + readingTime * randomFactor, 1500), 4000);
    }

    // Generate KOL follow-up based on player's response and KOL personality
    generateKOLFollowUp(option, kol) {
        const personality = kol.dominantPersonality || 'analytical';

        // Get personality-specific response pools
        const personalityResponses = this.getPersonalityResponses(personality);

        // Positive outcomes - personality-adjusted engaged follow-ups
        if (option.outcome === 'positive') {
            const pool = personalityResponses.positive;
            return pool[Math.floor(Math.random() * pool.length)];
        }

        // Compliance violations - personality-adjusted concerned responses
        if (option.complianceStatus === 'violation') {
            const pool = personalityResponses.violation;
            return pool[Math.floor(Math.random() * pool.length)];
        }

        // Risky responses - personality-adjusted skeptical follow-ups
        if (option.complianceStatus === 'risk') {
            const pool = personalityResponses.risk;
            return pool[Math.floor(Math.random() * pool.length)];
        }

        // Neutral outcomes - personality-adjusted polite responses
        if (option.outcome === 'neutral') {
            const pool = personalityResponses.neutral;
            return pool[Math.floor(Math.random() * pool.length)];
        }

        // Default follow-up
        const pool = personalityResponses.default;
        return pool[Math.floor(Math.random() * pool.length)];
    }

    getPersonalityResponses(personality) {
        const responsesByPersonality = {
            analytical: {
                positive: [
                    "The methodology appears sound. I'd like to see the full publication when you have a chance.",
                    "Interesting data. What were the confidence intervals on that primary endpoint?",
                    "That's a rigorous analysis. I appreciate you sharing the specifics.",
                    "Good. The statistical approach is appropriate for this population.",
                    "I'll need to review this more carefully, but the primary endpoint data is encouraging."
                ],
                violation: [
                    "That doesn't appear to be in the approved labeling. Let's stay focused on the published data.",
                    "I'm familiar with the regulations here. That seems to cross a line.",
                    "Hold on - I'd prefer we discuss only the peer-reviewed evidence.",
                    "That claim needs a citation. Do you have published data to support it?"
                ],
                risk: [
                    "I'd want to see the raw data before accepting that conclusion.",
                    "That's a bold interpretation. What's the p-value?",
                    "The methodology would need to be reviewed before I'd accept that claim.",
                    "Interesting hypothesis, but is it supported by controlled trial data?"
                ],
                neutral: [
                    "Noted. Let's look at the next data point.",
                    "I'll take that into consideration.",
                    "Understood. What else is in the dataset?",
                    "Fair enough. Continue."
                ],
                default: [
                    "I see. Show me the supporting data.",
                    "That's consistent with what I've read.",
                    "I'll review the publication.",
                    "Alright. Let's proceed methodically."
                ]
            },
            skeptic: {
                positive: [
                    "Alright, that's more convincing than I expected. But I'll need to verify it independently.",
                    "Okay. That addresses some of my concerns, though I remain cautious.",
                    "Fair point. I'm still not fully convinced, but this helps.",
                    "That's reasonable. Let me think about this more.",
                    "Hmm. Better than I thought. What about the long-term data?"
                ],
                violation: [
                    "That's exactly the kind of overreach I was worried about. Let's reset.",
                    "I knew it. You're going beyond the approved indication.",
                    "This is why I'm skeptical of industry-sponsored conversations.",
                    "That's promotional language. I've heard this pitch before."
                ],
                risk: [
                    "I'm not buying it. Show me head-to-head data.",
                    "That sounds like marketing. What do the real numbers say?",
                    "I've seen competitors make similar claims that didn't pan out.",
                    "I'll believe it when I see independent confirmation."
                ],
                neutral: [
                    "We'll see.",
                    "I reserve judgment.",
                    "Time will tell if that holds up.",
                    "Noted, but I'm still skeptical."
                ],
                default: [
                    "I'll need to see more evidence.",
                    "I've been burned before. I'm cautious.",
                    "Let's see if the data holds up in real-world use.",
                    "I'll review this with a critical eye."
                ]
            },
            pragmatic: {
                positive: [
                    "Good. That's actionable. What's the next step?",
                    "Efficient answer. I can work with that.",
                    "Perfect - that's exactly what I needed to know.",
                    "Excellent. Let's move forward.",
                    "That's useful information. Thank you."
                ],
                violation: [
                    "Let's stay on track. I only need the approved information.",
                    "I don't have time for gray areas. What does the label say?",
                    "That's not helpful. What can you actually support with data?"
                ],
                risk: [
                    "Get to the point. Is there data or not?",
                    "I need facts, not interpretations.",
                    "That's vague. Give me specifics.",
                    "I don't have time for hedging. What are the numbers?"
                ],
                neutral: [
                    "Okay. Moving on.",
                    "Fine. Next topic.",
                    "Understood. What else?",
                    "Alright. Let's keep going."
                ],
                default: [
                    "Got it. Next point?",
                    "Brief but helpful.",
                    "That works.",
                    "I appreciate you being direct."
                ]
            },
            practical: {
                positive: [
                    "That's helpful for my patients. I appreciate the practical perspective.",
                    "Good. That's something I can actually use in clinic.",
                    "Perfect - that addresses a real need in my patient population.",
                    "Thank you. This will help me counsel patients better.",
                    "That's practical advice I can implement tomorrow."
                ],
                violation: [
                    "My patients need reliable information. Let's stick to what's proven.",
                    "I can't base treatment decisions on unproven claims.",
                    "That's concerning. I need to be able to trust what you tell me.",
                    "Let's focus on what's actually in the prescribing information."
                ],
                risk: [
                    "How does this apply to a typical patient in my practice?",
                    "I'm less interested in statistics and more interested in real patients.",
                    "That sounds theoretical. How does it work in practice?",
                    "My patients are different from clinical trial populations."
                ],
                neutral: [
                    "Okay. How does this affect my day-to-day practice?",
                    "I understand. What about patient-specific considerations?",
                    "That's noted. Any practical tips for implementation?",
                    "Alright. My patients would want to know the impact on their daily lives."
                ],
                default: [
                    "That's good to know for patient counseling.",
                    "I'll keep that in mind for my next patient.",
                    "Helpful. Thank you.",
                    "I can see how that applies to my practice."
                ]
            },
            enthusiastic: {
                positive: [
                    "Excellent! This is exactly what I was hoping to hear!",
                    "Fantastic data. I'm excited to try this approach.",
                    "This is great news for patients. When can I start using this?",
                    "I love it! Tell me more.",
                    "Wonderful! This could really change how I treat patients."
                ],
                violation: [
                    "Oh... I'm very interested, but should you be telling me this?",
                    "Wait, is that on-label? I want to do this right.",
                    "I appreciate the enthusiasm, but let's make sure we're compliant."
                ],
                risk: [
                    "Interesting! Though I should probably verify that before changing practice.",
                    "That's exciting, but I want to be sure the evidence is solid.",
                    "I love new approaches, but let me review the data first.",
                    "That's promising! What's the level of evidence?"
                ],
                neutral: [
                    "Okay, that's reasonable. Anything more exciting in the pipeline?",
                    "I understand. What about newer data?",
                    "Fair enough. Is there anything novel coming up?",
                    "Alright. I'm always looking for new approaches."
                ],
                default: [
                    "I'm always eager to learn more!",
                    "This is interesting - tell me more.",
                    "I appreciate you sharing this with me.",
                    "Great discussion! What else can you tell me?"
                ]
            }
        };

        return responsesByPersonality[personality] || responsesByPersonality.analytical;
    }

    showDialogueOptions(options) {
        const optionsContainer = document.getElementById('dialogue-options');
        optionsContainer.innerHTML = '';

        // Shuffle options to randomize order (so "best" answer isn't always first)
        const shuffledOptions = [...options].sort(() => Math.random() - 0.5);

        shuffledOptions.forEach((option, index) => {
            const button = document.createElement('button');
            button.className = 'dialogue-option';
            // No compliance indicators - player must use their judgment
            button.innerHTML = option.text;
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.preventDoubleClick(`dialogue-option-${index}`, () => this.selectDialogueOption(option));
            });
            optionsContainer.appendChild(button);
        });

        // Update compliance indicator to neutral state
        this.updateComplianceIndicator('green', 'Active conversation');
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
            // Track gather-insights objective
            this.checkObjectiveProgress('gather-insights');
        }

        // Track objectives based on response type
        this.trackObjectivesFromResponse(option);

        // KOL follow-up response based on player's answer
        this.showThinkingIndicator(kol.name);
        const kolFollowUp = this.generateKOLFollowUp(option, kol);
        const delay = this.calculateResponseDelay(kolFollowUp);

        setTimeout(() => {
            this.hideThinkingIndicator();
            this.addDialogueMessage(kol.name, kolFollowUp, 'kol');

            // Show feedback after KOL response
            setTimeout(() => {
                this.addDialogueMessage('System', `[${option.feedback}]`, 'system');

                // Ask if player wants to continue or end
                setTimeout(() => {
                    this.showContinueOptions();
                }, 1500);
            }, 1000);
        }, delay);

        // Update UI
        const fillPercent = Math.min(100, (kol.relationshipScore / 100) * 100);
        document.getElementById('relationship-fill').style.width = `${fillPercent}%`;
        document.getElementById('relationship-label').textContent = this.capitalizeFirst(kol.relationship);
    }

    trackObjectivesFromResponse(option) {
        // Track scientific-exchange objective
        if (option.outcome === 'positive' && option.complianceStatus === 'safe') {
            this.checkObjectiveProgress('scientific-exchange');
        }

        // Track build-relationship objective
        if (option.relationshipChange >= 10) {
            this.checkObjectiveProgress('build-relationship');
        }

        // Track address-concerns objective
        if (option.insightType === 'safety' || option.insightType === 'access') {
            this.checkObjectiveProgress('address-concerns');
        }

        // Track competitive-intel objective
        if (option.insightType === 'competitive') {
            this.checkObjectiveProgress('competitive-intel');
        }
    }

    checkObjectiveProgress(objectiveKey) {
        if (this.state.objectiveProgress && this.state.objectiveProgress[objectiveKey]) {
            if (!this.state.objectiveProgress[objectiveKey].achieved) {
                this.updateObjectiveProgress(objectiveKey);
            }
        }
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

        document.getElementById('continue-interaction').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.preventDoubleClick('continue-interaction', () => this.presentScenario());
        });

        document.getElementById('end-interaction-btn').addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            this.preventDoubleClick('end-interaction-btn', () => this.endInteraction());
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

        // Save immediately to persist the interaction count
        this.saveGame();

        // Calculate meeting score if objectives were set
        let meetingScore = null;
        if (this.state.meetingObjectives && this.state.meetingObjectives.length > 0) {
            meetingScore = this.calculateMeetingScore();
        }

        // Record interaction
        this.state.interactions.push({
            kolId: kol.id,
            kolName: kol.name,
            week: this.state.currentWeek,
            quarter: this.state.currentQuarter,
            dialogueHistory: [...this.state.dialogueHistory],
            objectives: this.state.meetingObjectives || [],
            objectiveProgress: this.state.objectiveProgress || {},
            meetingScore: meetingScore
        });

        // Add to pending CRM with objective data
        this.state.pendingCRM.push({
            id: `crm_${Date.now()}`,
            kolId: kol.id,
            kolName: kol.name,
            week: this.state.currentWeek,
            status: 'pending',
            meetingScore: meetingScore,
            objectivesAchieved: meetingScore ? meetingScore.achieved : 0,
            totalObjectives: meetingScore ? meetingScore.total : 0
        });

        // Update KOL engagement metric
        const engagedKOLs = this.state.kols.filter(k => k.interactionCount > 0).length;
        this.state.metrics.kolEngagement = Math.round((engagedKOLs / this.state.kols.length) * 100);

        // Award XP based on meeting performance
        let xpEarned = GameData.xpRewards.kolMeeting;
        let xpReason = 'KOL meeting completed';

        if (meetingScore) {
            if (meetingScore.percentage >= 80) {
                xpEarned = GameData.xpRewards.kolMeetingExcellent;
                xpReason = 'Excellent KOL meeting - all objectives achieved!';
            } else if (meetingScore.percentage >= 50) {
                xpEarned = GameData.xpRewards.kolMeetingWithInsight;
                xpReason = 'Good KOL meeting with insights';
            }
        }

        // Bonus XP for first interaction with a KOL
        if (kol.interactionCount === 1) {
            xpEarned += 10;
            xpReason += ' (New KOL bonus!)';
        }

        this.awardXP(xpEarned, xpReason);

        // Show meeting summary if objectives were set, then CRM
        if (meetingScore) {
            this.showMeetingSummary(kol, meetingScore);
        } else {
            this.openCRMModal(kol);
        }
    }

    calculateMeetingScore() {
        const objectives = this.state.meetingObjectives || [];
        const progress = this.state.objectiveProgress || {};

        let achieved = 0;
        objectives.forEach(obj => {
            if (progress[obj] && progress[obj].achieved) {
                achieved++;
            }
        });

        const percentage = objectives.length > 0 ? Math.round((achieved / objectives.length) * 100) : 0;

        let rating;
        if (percentage >= 80) rating = 'excellent';
        else if (percentage >= 60) rating = 'good';
        else if (percentage >= 40) rating = 'fair';
        else rating = 'poor';

        return {
            achieved,
            total: objectives.length,
            percentage,
            rating
        };
    }

    showMeetingSummary(kol, score) {
        // Create summary modal content
        const dialogueHistory = document.getElementById('dialogue-history');

        const objectiveNames = {
            'scientific-exchange': 'Scientific Exchange',
            'gather-insights': 'Gather Insights',
            'build-relationship': 'Build Relationship',
            'discuss-research': 'Discuss Research',
            'address-concerns': 'Address Concerns',
            'competitive-intel': 'Competitive Landscape'
        };

        let summaryHtml = '<div class="meeting-summary">';
        summaryHtml += '<h4>Meeting Summary</h4>';

        // Score display
        summaryHtml += '<div class="score-display">';
        summaryHtml += `<div class="score-circle ${score.rating}">${score.percentage}%</div>`;
        summaryHtml += '<div class="score-label">';
        summaryHtml += `<span class="title">${this.capitalizeFirst(score.rating)} Meeting</span>`;
        summaryHtml += `<span class="subtitle">${score.achieved} of ${score.total} objectives achieved</span>`;
        summaryHtml += '</div></div>';

        // Objectives breakdown
        summaryHtml += '<div class="summary-section">';
        summaryHtml += '<h5>Objective Results</h5>';

        this.state.meetingObjectives.forEach(obj => {
            const achieved = this.state.objectiveProgress[obj]?.achieved;
            const icon = achieved ? '✓' : '✗';
            const status = achieved ? 'achieved' : 'missed';
            summaryHtml += `<div class="objective-result">
                <span class="icon">${icon}</span>
                <span class="label">${objectiveNames[obj] || obj}</span>
                <span class="status ${status}">${achieved ? 'Achieved' : 'Not Achieved'}</span>
            </div>`;
        });

        summaryHtml += '</div>';

        // Bonus metrics
        if (score.percentage >= 60) {
            this.state.skillPoints += 1;
            summaryHtml += '<div class="summary-section bonus">';
            summaryHtml += '<p>+1 Skill Point for achieving most objectives!</p>';
            summaryHtml += '</div>';
        }

        summaryHtml += '</div>';

        this.addDialogueMessage('System', summaryHtml, 'system');

        // After a delay, show CRM modal
        setTimeout(() => {
            this.showNotification('Document Interaction', 'Please complete the CRM documentation for this meeting.', 'info');
            this.openCRMModal(kol);
        }, 3000);
    }

    // CRM Documentation
    openCRMModal(kol) {
        // Reset all form fields
        document.getElementById('crm-kol-name').value = kol.name;
        document.getElementById('crm-interaction-type').value = '';
        document.getElementById('crm-duration').value = '';
        document.getElementById('crm-discussion-summary').value = '';
        document.getElementById('crm-sentiment').value = '';
        document.getElementById('crm-insight-category').value = '';
        document.getElementById('crm-followup').value = '';

        // Reset hidden fields
        const insightsField = document.getElementById('crm-insights');
        const nextStepsField = document.getElementById('crm-next-steps');
        if (insightsField) insightsField.value = '';
        if (nextStepsField) nextStepsField.value = '';

        // Reset checkboxes
        document.querySelectorAll('input[name="topics"]').forEach(cb => cb.checked = false);

        // Reset flag checkboxes
        const offlabelFlag = document.getElementById('crm-offlabel-flag');
        const aeFlag = document.getElementById('crm-ae-flag');
        if (offlabelFlag) offlabelFlag.checked = false;
        if (aeFlag) aeFlag.checked = false;

        // Reset character counts
        const summaryCount = document.getElementById('summary-char-count');
        if (summaryCount) summaryCount.textContent = '0';

        // Reset quality score
        this.updateCRMQualityScore();

        document.getElementById('crm-modal').classList.add('active');
    }

    openCRMForm(entry) {
        const kol = this.state.kols.find(k => k.id === entry.kolId);
        if (kol) {
            this.openCRMModal(kol);
        }
    }

    submitCRM() {
        const qualityResult = this.updateCRMQualityScore();
        const offLabelFlag = document.getElementById('crm-offlabel-flag')?.checked || false;
        const aeFlag = document.getElementById('crm-ae-flag')?.checked || false;
        const insightCategory = document.getElementById('crm-insight-category').value;
        const discussionSummary = document.getElementById('crm-discussion-summary').value;
        const followup = document.getElementById('crm-followup').value;
        const sentiment = document.getElementById('crm-sentiment').value;

        // Handle off-label flag
        if (offLabelFlag) {
            this.showNotification('Off-Label Noted', 'Off-label discussion documented.', 'info');
        }

        // Handle AE flag - open AE modal if checked
        if (aeFlag) {
            this.showNotification('AE Reporting', 'Please complete the adverse event report.', 'info');
            setTimeout(() => this.openAEModal(), 500);
        }

        // Add insight if category selected and followup has content
        if (insightCategory && followup && followup.length >= 10) {
            const kol = this.state.currentKOL;
            this.state.insights.push({
                id: `insight_${Date.now()}`,
                category: insightCategory,
                text: followup,
                source: kol?.name || 'Unknown',
                week: this.state.currentWeek,
                quarter: this.state.currentQuarter,
                quality: followup.length >= 50 ? 'high' : 'standard'
            });

            this.state.metrics.insightGeneration = Math.min(100, this.state.metrics.insightGeneration + 3);
        }

        // Calculate CRM quality impact on metrics
        const qualityBonus = Math.floor((qualityResult.percentage - 50) / 10);
        this.state.metrics.crmCompliance = Math.min(100, this.state.metrics.crmCompliance + qualityBonus);

        // Track CRM quality grades
        if (!this.state.crmQuality) {
            this.state.crmQuality = { totalEntries: 0, averageScore: 0, grades: { A: 0, 'B+': 0, B: 0, 'C+': 0, C: 0, D: 0 } };
        }
        this.state.crmQuality.totalEntries++;
        const gradeLetter = qualityResult.grade.letter;
        // Map B+ to B and C+ to C for simplified tracking, or track them separately
        if (gradeLetter === 'A') this.state.crmQuality.grades.A++;
        else if (gradeLetter === 'B+') this.state.crmQuality.grades['B+']++;
        else if (gradeLetter === 'B') this.state.crmQuality.grades.B++;
        else if (gradeLetter === 'C+') this.state.crmQuality.grades['C+']++;
        else if (gradeLetter === 'C') this.state.crmQuality.grades.C++;
        else this.state.crmQuality.grades.D++;

        // Update average score
        const totalScore = (this.state.crmQuality.averageScore * (this.state.crmQuality.totalEntries - 1)) + qualityResult.percentage;
        this.state.crmQuality.averageScore = Math.round(totalScore / this.state.crmQuality.totalEntries);

        // Award XP for CRM documentation
        if (qualityResult.percentage >= 80) {
            this.awardXP(GameData.xpRewards.crmEntryHighQuality, 'High-quality CRM documentation');
            this.state.skillPoints += 0.5; // Fractional skill points
        } else {
            this.awardXP(GameData.xpRewards.crmEntry, 'CRM documentation completed');
        }

        // Move from pending to completed
        const pendingIndex = this.state.pendingCRM.findIndex(c => c.kolId === this.state.currentKOL?.id);
        if (pendingIndex >= 0) {
            const entry = this.state.pendingCRM.splice(pendingIndex, 1)[0];
            entry.status = 'completed';
            entry.qualityScore = qualityResult.percentage;
            entry.summary = discussionSummary.substring(0, 100);
            entry.sentiment = sentiment;
            entry.hasInsight = insightCategory !== '';
            entry.hasFollowup = followup.length >= 10;
            this.state.completedCRM.push(entry);
        }

        // Update CRM compliance
        this.updateCRMCompliance();

        this.closeModal('crm-modal');
        this.showScreen('dashboard-screen');
        this.updateDashboard();

        // Different notifications based on quality with grade
        const grade = qualityResult.grade.letter;
        if (qualityResult.hasPromotional) {
            this.showNotification('CRM Warning', `Documentation submitted with compliance concerns. Grade: ${grade}. Review promotional language guidelines.`, 'warning');
        } else if (qualityResult.percentage >= 80) {
            this.showNotification('CRM Updated', `Excellent documentation! Grade: ${grade} (${qualityResult.percentage}%)`, 'success');
        } else if (qualityResult.percentage >= 60) {
            this.showNotification('CRM Updated', `Good documentation. Grade: ${grade} (${qualityResult.percentage}%)`, 'success');
        } else {
            this.showNotification('CRM Updated', `Grade: ${grade}. Consider adding more detail to improve documentation quality.`, 'info');
        }

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

        // When CRM modal is closed by any means, ensure dashboard is updated
        if (modalId === 'crm-modal') {
            this.showScreen('dashboard-screen');
            this.updateDashboard();
        }
    }

    // Congress/Conference
    showCongressScreen() {
        // Congress costs 3 AP
        const congressAPCost = 3;
        if (!this.canAffordActionPoints(congressAPCost)) {
            this.showInsufficientAPMessage(congressAPCost);
            return;
        }

        const ta = this.state.player.therapeuticArea;
        const availableCongresses = Object.entries(GameData.congresses).filter(([key, congress]) =>
            congress.therapeuticArea === ta || congress.type === 'Major International'
        );

        if (availableCongresses.length === 0) {
            this.showNotification('No Congresses', 'No relevant congresses available this quarter.', 'info');
            return;
        }

        // Check if already attended congress this week
        if (this.state.congressAttendedThisWeek) {
            this.showNotification('Already Attended', 'You can only attend one congress per week.', 'warning');
            return;
        }

        // Spend AP to attend congress
        this.spendActionPoints(congressAPCost, 'Congress attendance');

        // Track congress attendance
        this.state.congressAttendedThisWeek = true;
        this.state.congressActivitiesThisSession = [];

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
            item.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.preventDoubleClick(`congress-kol-${kol.id}`, () => this.startInteraction(kol.id));
            });
            kolList.appendChild(item);
        });

        this.showScreen('congress-screen');
        this.updateCongressActivityButtons();
    }

    updateCongressActivityButtons() {
        // Disable buttons for activities already done
        const activities = ['booth', 'poster', 'symposium', 'networking', 'competitive'];
        activities.forEach(activity => {
            const btn = document.querySelector(`[onclick*="startCongressActivity('${activity}')"]`);
            if (btn) {
                const done = this.state.congressActivitiesThisSession?.includes(activity);
                btn.disabled = done;
                if (done) {
                    btn.style.opacity = '0.5';
                    btn.title = 'Already completed this activity';
                }
            }
        });
    }

    startCongressActivity(activity) {
        // Check if already done this activity
        if (!this.state.congressActivitiesThisSession) {
            this.state.congressActivitiesThisSession = [];
        }

        if (this.state.congressActivitiesThisSession.includes(activity)) {
            this.showNotification('Already Done', 'You\'ve already completed this activity at this congress.', 'warning');
            return;
        }

        // Mark activity as done
        this.state.congressActivitiesThisSession.push(activity);

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

        // Award XP for congress activity
        this.awardXP(GameData.xpRewards.conferenceAttendance, 'Congress activity completed');

        this.showNotification('Congress Activity', message, 'success');
        this.updateCongressActivityButtons();
    }

    leaveCongress() {
        this.showScreen('dashboard-screen');
        this.updateDashboard();
    }

    // Advisory Board
    showAdvisoryScreen() {
        // Advisory board costs 2 AP
        const advisoryAPCost = 2;
        if (!this.canAffordActionPoints(advisoryAPCost)) {
            this.showInsufficientAPMessage(advisoryAPCost);
            return;
        }

        // Check if already held advisory board this week
        if (this.state.advisoryBoardThisWeek) {
            this.showNotification('Already Scheduled', 'You can only organize one advisory board per week.', 'warning');
            return;
        }

        this.populateAdvisorSelection();
        this.showScreen('advisory-screen');
    }

    populateAdvisorSelection() {
        const container = document.getElementById('advisor-selection');
        container.innerHTML = '';

        // Show tier 1 and 2 KOLs as potential advisors
        const potentialAdvisors = this.state.kols.filter(k => k.tier <= 2);

        if (potentialAdvisors.length === 0) {
            container.innerHTML = '<p style="color: var(--text-muted); text-align: center;">No KOLs available for advisory board. Engage with more Tier 1-2 KOLs first.</p>';
            return;
        }

        potentialAdvisors.forEach(kol => {
            const option = document.createElement('div');
            option.className = 'advisor-option';
            option.dataset.kolId = kol.id;

            // Calculate likelihood of accepting based on relationship
            const acceptChance = this.calculateAdvisoryAcceptChance(kol);
            const statusClass = acceptChance >= 70 ? 'likely' : acceptChance >= 40 ? 'uncertain' : 'unlikely';
            const statusText = acceptChance >= 70 ? 'Likely to accept' : acceptChance >= 40 ? 'May decline' : 'Unlikely to accept';

            option.innerHTML = `
                <input type="checkbox" id="advisor-${kol.id}">
                <label for="advisor-${kol.id}">
                    <span class="advisor-avatar">${kol.avatar}</span>
                    <span class="advisor-info">
                        <strong>${kol.name}</strong>
                        <span class="advisor-title">${kol.title}</span>
                        <span class="advisor-relationship">${this.capitalizeFirst(kol.relationship)} | Score: ${kol.relationshipScore}</span>
                    </span>
                    <span class="accept-chance ${statusClass}">${statusText} (${acceptChance}%)</span>
                </label>
            `;
            option.addEventListener('click', () => {
                option.classList.toggle('selected');
                const checkbox = option.querySelector('input');
                checkbox.checked = option.classList.contains('selected');
                this.updateAdvisoryPreview();
            });
            container.appendChild(option);
        });
    }

    calculateAdvisoryAcceptChance(kol) {
        let chance = 30; // Base chance

        // Relationship affects acceptance
        if (kol.relationship === 'trusted') chance += 50;
        else if (kol.relationship === 'engaged') chance += 35;
        else if (kol.relationship === 'familiar') chance += 20;
        else if (kol.relationship === 'new') chance -= 10;

        // Relationship score bonus
        chance += Math.floor(kol.relationshipScore / 10);

        // Personality affects willingness
        if (kol.dominantPersonality === 'enthusiastic') chance += 15;
        else if (kol.dominantPersonality === 'skeptic') chance -= 15;

        // Previous interactions
        if (kol.interactionCount > 0) chance += kol.interactionCount * 5;

        return Math.max(5, Math.min(95, chance));
    }

    updateAdvisoryPreview() {
        const selected = document.querySelectorAll('.advisor-option.selected');
        const preview = document.getElementById('advisory-preview-content');
        const submitBtn = document.getElementById('submit-advisory');

        if (selected.length >= 3 && selected.length <= 8) {
            // Calculate success probability
            let totalAcceptChance = 0;
            selected.forEach(opt => {
                const kolId = opt.dataset.kolId;
                const kol = this.state.kols.find(k => k.id === kolId);
                if (kol) {
                    totalAcceptChance += this.calculateAdvisoryAcceptChance(kol);
                }
            });
            const avgChance = Math.round(totalAcceptChance / selected.length);

            submitBtn.disabled = false;
            preview.innerHTML = `
                <p><strong>${selected.length} advisors selected</strong></p>
                <p>Average acceptance likelihood: <strong>${avgChance}%</strong></p>
                <p>Potential insights: ${selected.length * 2}-${selected.length * 3}</p>
                <p>Relationship impact: +${selected.length * 5} with participants who attend</p>
                <p class="warning-text">${avgChance < 50 ? '⚠️ Some KOLs may decline - strengthen relationships first!' : ''}</p>
            `;
        } else {
            submitBtn.disabled = true;
            preview.innerHTML = `<p>Select 3-8 advisors to proceed. Currently selected: ${selected.length}</p>`;
        }
    }

    submitAdvisoryBoard() {
        const selected = document.querySelectorAll('.advisor-option.selected');
        if (selected.length < 3) {
            this.showNotification('Not Enough Advisors', 'Select at least 3 advisors.', 'warning');
            return;
        }

        // Spend AP
        this.spendActionPoints(2, 'Advisory Board');
        this.state.advisoryBoardThisWeek = true;

        // Determine which KOLs accept
        const acceptedKOLs = [];
        const declinedKOLs = [];

        selected.forEach(opt => {
            const kolId = opt.dataset.kolId;
            const kol = this.state.kols.find(k => k.id === kolId);
            if (kol) {
                const acceptChance = this.calculateAdvisoryAcceptChance(kol);
                if (Math.random() * 100 < acceptChance) {
                    acceptedKOLs.push(kol);
                } else {
                    declinedKOLs.push(kol);
                }
            }
        });

        // Check if enough KOLs accepted
        if (acceptedKOLs.length < 2) {
            this.showNotification('Advisory Board Cancelled',
                `Not enough KOLs accepted your invitation. ${declinedKOLs.length} declined. Build stronger relationships first.`,
                'warning');
            this.showScreen('dashboard-screen');
            this.updateDashboard();
            return;
        }

        // Run the advisory board
        let message = `Advisory board held with ${acceptedKOLs.length} KOLs.`;
        if (declinedKOLs.length > 0) {
            message += ` (${declinedKOLs.length} declined)`;
        }

        // Generate insights from the advisory board
        const insightCount = Math.floor(acceptedKOLs.length * (0.5 + Math.random()));
        for (let i = 0; i < insightCount; i++) {
            const categories = ['unmet-need', 'clinical', 'competitive', 'safety'];
            const category = categories[Math.floor(Math.random() * categories.length)];
            const kol = acceptedKOLs[Math.floor(Math.random() * acceptedKOLs.length)];

            this.state.insights.push({
                id: `insight_${Date.now()}_${i}`,
                category: category,
                text: this.generateAdvisoryInsight(category, kol),
                source: `Advisory Board - ${kol.name}`,
                week: this.state.currentWeek,
                quarter: this.state.currentQuarter
            });
        }

        // Improve relationships with attending KOLs
        acceptedKOLs.forEach(kol => {
            kol.relationshipScore += 15;
            this.updateRelationshipLevel(kol);
        });

        // Slightly damage relationships with declined KOLs (they felt they weren't ready)
        declinedKOLs.forEach(kol => {
            kol.relationshipScore = Math.max(0, kol.relationshipScore - 5);
        });

        // Update metrics
        this.state.metrics.kolEngagement = Math.min(100, this.state.metrics.kolEngagement + acceptedKOLs.length * 3);
        this.state.metrics.insightGeneration = Math.min(100, this.state.metrics.insightGeneration + insightCount * 5);

        // Award XP
        this.awardXP(GameData.xpRewards.advisoryBoard || 40, 'Advisory Board completed');

        this.showNotification('Advisory Board Complete',
            `${message} Generated ${insightCount} valuable insights!`,
            'success');

        this.showScreen('dashboard-screen');
        this.updateDashboard();
        this.saveGame();
    }

    generateAdvisoryInsight(category, kol) {
        const insights = {
            'unmet-need': [
                'Patients need better options for managing treatment side effects.',
                'There\'s a significant gap in therapies for elderly patients with comorbidities.',
                'Physicians want better tools for predicting treatment response.'
            ],
            'clinical': [
                'Real-world outcomes differ significantly from clinical trial populations.',
                'Combination therapies are showing promise in treatment-resistant cases.',
                'Earlier intervention leads to better long-term outcomes.'
            ],
            'competitive': [
                'Competitor product has supply chain issues affecting availability.',
                'New competitor entering market with different dosing schedule.',
                'Physicians considering switching due to formulary changes.'
            ],
            'safety': [
                'Rare adverse events may be underreported in specific populations.',
                'Drug interactions with common medications need more study.',
                'Long-term safety data would increase prescriber confidence.'
            ]
        };
        const categoryInsights = insights[category] || insights['clinical'];
        return categoryInsights[Math.floor(Math.random() * categoryInsights.length)];
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
        // Training costs 1 AP
        const trainingAPCost = 1;
        if (!this.canAffordActionPoints(trainingAPCost)) {
            this.showInsufficientAPMessage(trainingAPCost);
            return;
        }

        // Initialize training tracking for this week if needed
        if (!this.state.trainingCompletedThisWeek) {
            this.state.trainingCompletedThisWeek = [];
        }

        document.getElementById('training-scenario').style.display = 'none';
        this.updateTrainingCards();
        this.showScreen('training-screen');
    }

    updateTrainingCards() {
        const trainingTypes = ['sales', 'marketing', 'medical'];
        trainingTypes.forEach(type => {
            const card = document.querySelector(`.training-card[data-training="${type}"]`);
            if (card) {
                const completed = this.state.trainingCompletedThisWeek?.includes(type);
                if (completed) {
                    card.classList.add('completed');
                    card.style.opacity = '0.5';
                    card.style.pointerEvents = 'none';
                    // Add completed badge
                    if (!card.querySelector('.completed-badge')) {
                        const badge = document.createElement('span');
                        badge.className = 'completed-badge';
                        badge.textContent = '✓ Done this week';
                        badge.style.cssText = 'position:absolute;top:10px;right:10px;background:var(--success-color);color:white;padding:4px 8px;border-radius:4px;font-size:0.7rem;';
                        card.style.position = 'relative';
                        card.appendChild(badge);
                    }
                } else {
                    card.classList.remove('completed');
                    card.style.opacity = '1';
                    card.style.pointerEvents = 'auto';
                    const badge = card.querySelector('.completed-badge');
                    if (badge) badge.remove();
                }
            }
        });
    }

    startTraining(type) {
        // Check if already done this training this week
        if (!this.state.trainingCompletedThisWeek) {
            this.state.trainingCompletedThisWeek = [];
        }

        if (this.state.trainingCompletedThisWeek.includes(type)) {
            this.showNotification('Already Completed', 'You\'ve already done this training this week.', 'warning');
            return;
        }

        // Check AP
        if (!this.canAffordActionPoints(1)) {
            this.showInsufficientAPMessage(1);
            return;
        }

        // Spend AP
        this.spendActionPoints(1, `Internal Training: ${type}`);

        // Mark as completed this week
        this.state.trainingCompletedThisWeek.push(type);

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

        // Award XP for training
        this.awardXP(GameData.xpRewards.trainingModule, 'Training completed');

        this.showNotification('Training Complete', result.message, 'success');
        this.showScreen('dashboard-screen');
        this.updateDashboard();
        this.saveGame();
    }

    // Time Advancement
    advanceWeek() {
        console.log('advanceWeek called');

        this.state.currentWeek++;

        // Reset weekly time budget
        this.state.weeklyTimeRemaining = this.state.weeklyTimeTotal;
        this.state.lastVisitedLocation = null;

        // Reset action points
        this.resetActionPoints();

        // Reset weekly activity tracking
        this.state.trainingCompletedThisWeek = [];
        this.state.congressAttendedThisWeek = false;
        this.state.congressActivitiesThisSession = [];
        this.state.advisoryBoardThisWeek = false;

        // Check for overdue CRM entries
        this.state.pendingCRM.forEach(entry => {
            if (this.state.currentWeek - entry.week > 0) {
                entry.status = 'overdue';
            }
        });

        // Check for overdue AE reports
        this.checkOverdueAEs();

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
        this.updateTimeBudgetDisplay();
        this.saveGame();

        this.showNotification('Week Advanced',
            `Now in Week ${this.state.currentWeek}, Q${this.state.currentQuarter} ${this.state.currentYear}. Time budget reset to ${this.state.weeklyTimeTotal} hours.`, 'info');
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

        // Award skill points and XP for surviving the quarter
        if (outcome !== 'termination') {
            this.state.skillPoints += 2;

            // Award XP based on quarterly performance
            if (overallScore >= 80) {
                this.awardXP(GameData.xpRewards.quarterlyReviewBonus, 'Excellent quarterly review!');
            } else if (overallScore >= 60) {
                this.awardXP(Math.floor(GameData.xpRewards.quarterlyReviewBonus * 0.5), 'Good quarterly review');
            } else {
                this.awardXP(Math.floor(GameData.xpRewards.quarterlyReviewBonus * 0.25), 'Quarter survived');
            }
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

    // ==========================================
    // XP AND LEVEL SYSTEM
    // ==========================================

    awardXP(amount, reason = '') {
        if (this.state.gameWon || this.state.gameOver) return;

        this.state.xp += amount;
        this.state.totalXpEarned += amount;

        // Show XP notification
        if (reason) {
            this.showNotification('XP Earned!', `+${amount} XP - ${reason}`, 'success');
        }

        // Check for level up
        this.checkLevelUp();

        // Update XP display
        this.updateXPDisplay();
        this.saveGame();
    }

    checkLevelUp() {
        const levels = GameData.careerLevels;
        let leveledUp = false;
        let newLevel = this.state.level;

        // Find the highest level we qualify for
        for (let i = levels.length - 1; i >= 0; i--) {
            if (this.state.xp >= levels[i].xpRequired) {
                newLevel = levels[i].level;
                break;
            }
        }

        if (newLevel > this.state.level) {
            const oldLevel = this.state.level;
            this.state.level = newLevel;

            // Find the new level data
            const newLevelData = levels.find(l => l.level === newLevel);
            const oldLevelData = levels.find(l => l.level === oldLevel);

            // Update XP to next level
            const nextLevel = levels.find(l => l.level === newLevel + 1);
            this.state.xpToNextLevel = nextLevel ? nextLevel.xpRequired - this.state.xp : 0;

            // Update player title
            this.state.player.title = newLevelData.title;

            // Check if this is a promotion milestone
            if (newLevelData.isPromotion) {
                this.triggerPromotionCeremony(newLevelData);
            } else {
                // Regular level up
                this.showLevelUpNotification(newLevelData);
            }

            // Check for victory condition
            if (newLevelData.isVictory) {
                this.triggerVictory();
            }

            leveledUp = true;
        }

        return leveledUp;
    }

    showLevelUpNotification(levelData) {
        this.state.skillPoints += 1; // Bonus skill point for leveling up

        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.id = 'level-up-modal';
        modal.innerHTML = `
            <div class="modal-content level-up-content">
                <h2>⬆️ Level Up!</h2>
                <div class="level-up-badge">
                    <span class="level-number">${levelData.level}</span>
                </div>
                <h3>${levelData.title}</h3>
                <p>${levelData.description}</p>
                <p class="level-reward">+1 Skill Point</p>
                <button class="action-btn" onclick="document.getElementById('level-up-modal').remove()">Continue</button>
            </div>
        `;
        document.body.appendChild(modal);

        // Auto-close after 5 seconds
        setTimeout(() => {
            modal.remove();
        }, 5000);
    }

    triggerPromotionCeremony(levelData) {
        let ceremonyData;

        if (levelData.level === 5) {
            ceremonyData = GameData.promotionCeremonies.msl2;
        } else if (levelData.level === 10) {
            ceremonyData = GameData.promotionCeremonies.seniorMsl;
        }

        if (!ceremonyData) return;

        // Award bonus skill points
        this.state.skillPoints += ceremonyData.bonusSkillPoints;

        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.id = 'promotion-modal';

        const achievementsList = ceremonyData.achievements.map(a => `<li>${a}</li>`).join('');
        const responsibilitiesList = ceremonyData.newResponsibilities ?
            ceremonyData.newResponsibilities.map(r => `<li>${r}</li>`).join('') : '';

        modal.innerHTML = `
            <div class="modal-content promotion-content">
                <div class="promotion-header">
                    <h2>${ceremonyData.title}</h2>
                </div>
                <p class="promotion-message">${ceremonyData.message}</p>

                <div class="promotion-section">
                    <h4>Your Achievements</h4>
                    <ul class="achievement-list">${achievementsList}</ul>
                </div>

                ${responsibilitiesList ? `
                <div class="promotion-section">
                    <h4>New Responsibilities</h4>
                    <ul class="responsibility-list">${responsibilitiesList}</ul>
                </div>
                ` : ''}

                <p class="promotion-reward">+${ceremonyData.bonusSkillPoints} Skill Points!</p>

                <button class="action-btn primary" onclick="document.getElementById('promotion-modal').remove()">
                    ${levelData.isVictory ? 'Celebrate!' : 'Accept Promotion'}
                </button>
            </div>
        `;
        document.body.appendChild(modal);
    }

    triggerVictory() {
        this.state.gameWon = true;

        // Calculate final stats
        const totalWeeks = ((this.state.currentQuarter - 1) * 13) + this.state.currentWeek;
        const totalKOLsMet = this.state.kols.filter(k => k.interactionCount > 0).length;
        const totalInteractions = this.state.interactions.length;

        // Create victory screen
        const victoryScreen = document.getElementById('game-over');
        if (victoryScreen) {
            document.getElementById('game-over-icon').textContent = '🏆';
            document.getElementById('game-over-title').textContent = 'Congratulations!';
            document.getElementById('game-over-title').className = 'game-over-title victory';
            document.getElementById('game-over-reason').innerHTML = `
                <p>You have been promoted to <strong>Senior MSL</strong>!</p>
                <p>You've demonstrated exceptional scientific expertise, built strong KOL relationships,
                and maintained impeccable compliance standards.</p>

                <div class="victory-stats">
                    <h4>Your Journey</h4>
                    <div class="stat-row">
                        <span>Total Weeks:</span>
                        <span>${totalWeeks}</span>
                    </div>
                    <div class="stat-row">
                        <span>KOLs Engaged:</span>
                        <span>${totalKOLsMet} of ${this.state.kols.length}</span>
                    </div>
                    <div class="stat-row">
                        <span>Total Interactions:</span>
                        <span>${totalInteractions}</span>
                    </div>
                    <div class="stat-row">
                        <span>Total XP Earned:</span>
                        <span>${this.state.totalXpEarned}</span>
                    </div>
                    <div class="stat-row">
                        <span>Final Compliance:</span>
                        <span>${this.state.metrics.regulatoryCompliance}%</span>
                    </div>
                </div>
            `;

            // Update try again button
            const tryAgainBtn = document.getElementById('try-again');
            if (tryAgainBtn) {
                tryAgainBtn.textContent = 'Play Again';
            }

            this.showScreen('game-over');
        }

        this.saveGame();
    }

    updateXPDisplay() {
        // Update XP bar in header/dashboard if it exists
        const xpBar = document.getElementById('xp-bar-fill');
        const xpText = document.getElementById('xp-text');
        const levelText = document.getElementById('level-text');

        if (xpBar) {
            const currentLevelData = GameData.careerLevels.find(l => l.level === this.state.level);
            const nextLevelData = GameData.careerLevels.find(l => l.level === this.state.level + 1);

            if (currentLevelData && nextLevelData) {
                const xpIntoLevel = this.state.xp - currentLevelData.xpRequired;
                const xpNeededForLevel = nextLevelData.xpRequired - currentLevelData.xpRequired;
                const percentage = Math.min(100, (xpIntoLevel / xpNeededForLevel) * 100);
                xpBar.style.width = `${percentage}%`;
            } else if (this.state.level >= 10) {
                xpBar.style.width = '100%';
            }
        }

        if (xpText) {
            const nextLevelData = GameData.careerLevels.find(l => l.level === this.state.level + 1);
            if (nextLevelData) {
                xpText.textContent = `${this.state.xp} / ${nextLevelData.xpRequired} XP`;
            } else {
                xpText.textContent = `${this.state.xp} XP (MAX)`;
            }
        }

        if (levelText) {
            levelText.textContent = `Level ${this.state.level}`;
        }
    }

    getCurrentLevelData() {
        return GameData.careerLevels.find(l => l.level === this.state.level) || GameData.careerLevels[0];
    }

    getXPForNextLevel() {
        const nextLevel = GameData.careerLevels.find(l => l.level === this.state.level + 1);
        return nextLevel ? nextLevel.xpRequired : this.state.xp;
    }

    saveGame() {
        try {
            localStorage.setItem('mslSimulatorSave', JSON.stringify(this.state));
        } catch (error) {
            console.error('Error saving game:', error);
            // Storage might be full or disabled
            if (error.name === 'QuotaExceededError') {
                this.showNotification('Save Warning', 'Storage full. Some progress may not be saved.', 'warning');
            }
        }
    }

    loadGame() {
        try {
            const saved = localStorage.getItem('mslSimulatorSave');
            if (saved) {
                const parsedState = JSON.parse(saved);
                // Merge with default state to handle new properties added in updates
                this.state = { ...this.state, ...parsedState };
                return true;
            }
            return false;
        } catch (error) {
            console.error('Error loading game:', error);
            this.showNotification('Load Error', 'Failed to load saved game. Starting fresh.', 'warning');
            return false;
        }
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

// Warn before leaving if game is in progress
window.addEventListener('beforeunload', (e) => {
    if (window.game && window.game.state.player && !window.game.state.gameOver) {
        // Save game before leaving
        window.game.saveGame();
        // Don't show warning, just auto-save
    }
});

// Global error handler
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.error('Game error:', { msg, url, lineNo, columnNo, error });
    // Don't show to user unless it's critical
    return false;
};
