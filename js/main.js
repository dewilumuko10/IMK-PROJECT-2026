/**
 * MAIN APPLICATION CONTROLLER
 * English Learning App - Kurikulum Merdeka
 */

// ========== STATE MANAGEMENT ==========
const appState = {
    currentClass: 3,
    currentUnit: null,
    totalStars: 0,
    completedUnits: [],
    currentProgress: 0,
    isLoading: true
};

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎓 English Learning App Starting...');
    
    // Show loading screen
    showLoading();
    
    // Initialize app after brief delay
    setTimeout(() => {
        initializeApp();
        hideLoading();
    }, 1500);
});

/**
 * Initialize the application
 */
function initializeApp() {
    console.log('✅ Initializing application...');
    
    // Load saved progress from localStorage
    loadProgress();
    
    // Set random teacher message
    setTeacherMessage('welcome');
    
    // Load units for current class
    loadJourneyMap(appState.currentClass);
    
    // Update UI
    updateProgressBar();
    updateStarCount();
    
    // Add event listeners
    setupEventListeners();
    
    console.log('🚀 Application ready!');
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
    // Close achievement popup when clicking outside
    const achievementPopup = document.getElementById('achievementPopup');
    if (achievementPopup) {
        achievementPopup.addEventListener('click', function(e) {
            if (e.target === achievementPopup) {
                closeAchievement();
            }
        });
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (achievementPopup && achievementPopup.classList.contains('active')) {
                closeAchievement();
            } else if (!document.getElementById('mainMenu').style.display === 'none') {
                backToMenu();
            }
        }
    });
}

// ========== CLASS SELECTION ==========
/**
 * Select class (3 or 4)
 * @param {number} classNum - Class number
 */
function selectClass(classNum) {
    console.log(`📚 Switching to Class ${classNum}`);
    
    appState.currentClass = classNum;
    
    // Update button states
    const buttons = document.querySelectorAll('.class-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.closest('.class-btn').classList.add('active');
    
    // Load new journey map
    loadJourneyMap(classNum);
    
    // Update teacher message
    setTeacherMessage('welcome');
    
    // Save progress
    saveProgress();
    
    // Show main menu if in content view
    if (document.getElementById('learningContent').classList.contains('active')) {
        backToMenu();
    }
}

// ========== JOURNEY MAP ==========
/**
 * Load and display journey map
 * @param {number} classNum - Class number
 */
function loadJourneyMap(classNum) {
    const journeyMap = document.getElementById('journeyMap');
    const units = classNum === 3 ? curriculumData.class3 : curriculumData.class4;
    
    journeyMap.innerHTML = '';
    
    units.forEach((unit, index) => {
        const isCompleted = appState.completedUnits.includes(unit.id);
        const isLocked = index > 0 && !appState.completedUnits.includes(units[index - 1].id);
        
        const stationDiv = document.createElement('div');
        stationDiv.className = `journey-station ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''}`;
        stationDiv.setAttribute('data-unit-id', unit.id);
        
        stationDiv.innerHTML = `
            <div class="station-number">${unit.number}</div>
            <div class="station-icon">${unit.icon}</div>
            <div class="station-title">${unit.title}</div>
            <div class="station-desc">${unit.description}</div>
            <div class="station-topics">
                <strong>📍 Area: ${unit.area}</strong>
                <strong style="margin-top: 10px; display: block;">📝 Topics:</strong>
                <ul>
                    ${unit.topics.map(topic => `<li>${topic}</li>`).join('')}
                </ul>
            </div>
            ${isCompleted ? `
                <div class="station-status">
                    ✅ Completed! ⭐
                </div>
            ` : ''}
            ${isLocked ? `
                <div class="station-status" style="background: #95a5a6;">
                    🔒 Complete previous unit first
                </div>
            ` : ''}
        `;
        
        // Add click handler if not locked
        if (!isLocked) {
            stationDiv.style.cursor = 'pointer';
            stationDiv.addEventListener('click', () => showUnit(unit));
        } else {
            stationDiv.style.cursor = 'not-allowed';
            stationDiv.addEventListener('click', () => {
                showNotification('🔒 Selesaikan unit sebelumnya terlebih dahulu!');
            });
        }
        
        journeyMap.appendChild(stationDiv);
    });
    
    console.log(`📍 Loaded ${units.length} units for Class ${classNum}`);
}

// ========== SHOW UNIT CONTENT ==========
/**
 * Display unit content
 * @param {Object} unit - Unit data
 */
function showUnit(unit) {
    console.log(`📖 Opening unit: ${unit.title}`);
    
    appState.currentUnit = unit;
    
    // Hide main menu, show content
    document.getElementById('mainMenu').style.display = 'none';
    const contentDiv = document.getElementById('learningContent');
    contentDiv.classList.add('active');
    
    // Set title
    document.getElementById('contentTitle').innerHTML = `${unit.icon} ${unit.title}`;
    
    // Build content
    let contentHTML = '';
    
    // Vocabulary Section
    if (unit.vocabulary && unit.vocabulary.length > 0) {
        contentHTML += buildVocabularySection(unit.vocabulary);
    }
    
    // Story Section
    if (unit.story) {
        contentHTML += buildStorySection(unit.story);
    }
    
    // Quiz Section
    if (unit.quiz && unit.quiz.length > 0) {
        contentHTML += buildQuizSection(unit);
    }
    
    // Set content
    document.getElementById('contentArea').innerHTML = contentHTML;
    
    // Initialize quiz if present
    if (unit.quiz) {
        setTimeout(() => initializeQuiz(unit.quiz), 300);
    }
    
    // Update teacher message
    setTeacherMessage('encouragement');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========== BUILD CONTENT SECTIONS ==========
/**
 * Build vocabulary section HTML
 * @param {Array} vocabulary - Vocabulary items
 * @returns {string} HTML string
 */
function buildVocabularySection(vocabulary) {
    return `
        <div class="vocab-section">
            <h3>📖 Vocabulary (Kosakata)</h3>
            <p style="text-align: center; color: #7f8c8d; margin-bottom: 20px;">
                Klik kartu untuk mendengar pronunciation! 🔊
            </p>
            <div class="vocab-grid">
                ${vocabulary.map(item => `
                    <div class="vocab-card" onclick="speakWord('${item.english.replace(/'/g, "\\'")}')">
                        <div class="vocab-image">${item.emoji}</div>
                        <div class="vocab-english">${item.english}</div>
                        <div class="vocab-indonesian">${item.indonesian}</div>
                        <div class="vocab-pronunciation">${item.pronunciation}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

/**
 * Build story section HTML
 * @param {Object} story - Story data
 * @returns {string} HTML string
 */
function buildStorySection(story) {
    return `
        <div class="vocab-section">
            <h3>📚 Reading Story</h3>
            <div class="story-container">
                <div class="story-image-main">${story.emoji}</div>
                <h3 class="story-title">${story.title}</h3>
                
                <div class="audio-controls">
                    <button class="audio-btn" onclick="readStory()" title="Read Story Aloud">
                        🔊
                    </button>
                </div>
                
                ${story.content.map((line, index) => `
                    <div class="story-text" data-line="${index}">
                        ${line.en}
                        <div class="story-translation">${line.id}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

/**
 * Build quiz section HTML
 * @param {Object} unit - Unit data
 * @returns {string} HTML string
 */
function buildQuizSection(unit) {
    return `
        <div class="vocab-section">
            <h3>✏️ Quiz Time - Test Your Knowledge!</h3>
            <div class="score-display">
                <div class="score-emoji">🎯</div>
                <div>
                    Score: <span id="quizScore">0</span> / <span id="quizTotal">${unit.quiz.length}</span>
                </div>
            </div>
            <div class="quiz-container" id="quizContainer">
                <!-- Quiz will be populated here -->
            </div>
        </div>
    `;
}

// ========== BACK TO MENU ==========
/**
 * Return to main menu
 */
function backToMenu() {
    console.log('🔙 Returning to main menu');
    
    // Show main menu, hide content
    document.getElementById('mainMenu').style.display = 'block';
    const contentDiv = document.getElementById('learningContent');
    contentDiv.classList.remove('active');
    
    // Clear content
    document.getElementById('contentArea').innerHTML = '';
    
    // Reset current unit
    appState.currentUnit = null;
    
    // Update teacher message
    setTeacherMessage('welcome');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========== PROGRESS MANAGEMENT ==========
/**
 * Mark unit as completed
 * @param {string} unitId - Unit ID
 */
function completeUnit(unitId) {
    if (!appState.completedUnits.includes(unitId)) {
        appState.completedUnits.push(unitId);
        appState.totalStars += 3; // Award 3 stars per unit
        
        // Calculate progress percentage
        const totalUnits = curriculumData.class3.length + curriculumData.class4.length;
        appState.currentProgress = Math.round((appState.completedUnits.length / totalUnits) * 100);
        
        // Update UI
        updateProgressBar();
        updateStarCount();
        
        // Save progress
        saveProgress();
        
        // Reload journey map to show completion
        loadJourneyMap(appState.currentClass);
        
        // Show achievement
        showAchievement(unitId);
        
        console.log(`✅ Unit completed: ${unitId}`);
    }
}

/**
 * Update progress bar
 */
function updateProgressBar() {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    if (progressFill && progressText) {
        progressFill.style.width = appState.currentProgress + '%';
        progressText.textContent = appState.currentProgress;
    }
}

/**
 * Update star count display
 */
function updateStarCount() {
    const starCount = document.getElementById('starCount');
    if (starCount) {
        starCount.textContent = appState.totalStars;
    }
}

// ========== ACHIEVEMENT SYSTEM ==========
/**
 * Show achievement popup
 * @param {string} unitId - Completed unit ID
 */
function showAchievement(unitId) {
    const popup = document.getElementById('achievementPopup');
    const achievementText = document.getElementById('achievementText');
    
    if (popup && achievementText) {
        const unit = findUnitById(unitId);
        
        achievementText.innerHTML = `
            <div style="font-size: 60px; margin: 15px 0;">${unit.icon}</div>
            <strong>Kamu telah menyelesaikan:</strong><br>
            ${unit.title}<br>
            <div style="margin-top: 15px; font-size: 1.5em;">+3 ⭐</div>
        `;
        
        popup.classList.add('active');
        
        // Play celebration sound
        playCelebrationSound();
        
        // Update teacher message
        setTeacherMessage('encouragement');
    }
}

/**
 * Close achievement popup
 */
function closeAchievement() {
    const popup = document.getElementById('achievementPopup');
    if (popup) {
        popup.classList.remove('active');
    }
}

// ========== TEACHER MESSAGES ==========
/**
 * Set random teacher message
 * @param {string} type - Message type (welcome, encouragement, retry)
 */
function setTeacherMessage(type) {
    const messageElement = document.getElementById('teacherMessage');
    if (messageElement && teacherMessages[type]) {
        const messages = teacherMessages[type];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        messageElement.textContent = randomMessage;
        
        // Animate message
        messageElement.style.animation = 'none';
        setTimeout(() => {
            messageElement.style.animation = 'fadeIn 0.5s ease';
        }, 10);
    }
}

// ========== UTILITY FUNCTIONS ==========
/**
 * Find unit by ID
 * @param {string} unitId - Unit ID
 * @returns {Object|null} Unit object or null
 */
function findUnitById(unitId) {
    const allUnits = [...curriculumData.class3, ...curriculumData.class4];
    return allUnits.find(unit => unit.id === unitId) || null;
}

/**
 * Show notification
 * @param {string} message - Notification message
 */
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #FFD700, #FFA500);
        color: white;
        padding: 20px 30px;
        border-radius: 15px;
        font-size: 1.1em;
        font-weight: 700;
        box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideDown 0.5s ease;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// ========== LOADING SCREEN ==========
/**
 * Show loading screen
 */
function showLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.style.display = 'flex';
    }
}

/**
 * Hide loading screen
 */
function hideLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// ========== LOCAL STORAGE ==========
/**
 * Save progress to localStorage
 */
function saveProgress() {
    const progressData = {
        currentClass: appState.currentClass,
        totalStars: appState.totalStars,
        completedUnits: appState.completedUnits,
        currentProgress: appState.currentProgress,
        lastUpdated: new Date().toISOString()
    };
    
    try {
        localStorage.setItem('englishLearningProgress', JSON.stringify(progressData));
        console.log('💾 Progress saved');
    } catch (error) {
        console.error('❌ Error saving progress:', error);
    }
}

/**
 * Load progress from localStorage
 */
function loadProgress() {
    try {
        const savedData = localStorage.getItem('englishLearningProgress');
        
        if (savedData) {
            const progressData = JSON.parse(savedData);
            
            appState.currentClass = progressData.currentClass || 3;
            appState.totalStars = progressData.totalStars || 0;
            appState.completedUnits = progressData.completedUnits || [];
            appState.currentProgress = progressData.currentProgress || 0;
            
            console.log('📂 Progress loaded:', progressData);
        } else {
            console.log('📝 No saved progress found, starting fresh');
        }
    } catch (error) {
        console.error('❌ Error loading progress:', error);
    }
}

/**
 * Reset all progress (for testing)
 */
function resetProgress() {
    if (confirm('⚠️ Apakah kamu yakin ingin menghapus semua progress? Ini tidak bisa dibatalkan!')) {
        localStorage.removeItem('englishLearningProgress');
        appState.totalStars = 0;
        appState.completedUnits = [];
        appState.currentProgress = 0;
        
        updateProgressBar();
        updateStarCount();
        loadJourneyMap(appState.currentClass);
        
        showNotification('🔄 Progress telah direset!');
        console.log('🗑️ Progress reset');
    }
}

// ========== SOUND EFFECTS ==========
/**
 * Play celebration sound
 */
function playCelebrationSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // Create a simple celebratory melody
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C, E, G, C (higher octave)
        
        notes.forEach((frequency, index) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            const startTime = audioContext.currentTime + (index * 0.15);
            const duration = 0.2;
            
            gainNode.gain.setValueAtTime(0.3, startTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
            
            oscillator.start(startTime);
            oscillator.stop(startTime + duration);
        });
    } catch (error) {
        console.log('Sound not available:', error);
    }
}

/**
 * Play correct answer sound
 */
function playCorrectSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
        console.log('Sound not available:', error);
    }
}

/**
 * Play incorrect answer sound
 */
function playIncorrectSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 200;
        oscillator.type = 'sawtooth';
        
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    } catch (error) {
        console.log('Sound not available:', error);
    }
}

// ========== EXPORT FOR DEBUGGING ==========
// Make certain functions available in console for debugging
window.appDebug = {
    resetProgress,
    saveProgress,
    loadProgress,
    state: appState,
    completeUnit,
    showAchievement
};

console.log('💡 Debug functions available: window.appDebug');