/**
 * UTILITY FUNCTIONS
 * Helper functions for the application
 */

// ========== TEXT TO SPEECH ==========
/**
 * Speak a word using Web Speech API
 * @param {string} text - Text to speak
 * @param {string} lang - Language code (default: 'en-US')
 */
function speakWord(text, lang = 'en-US') {
    // Check if speech synthesis is supported
    if (!('speechSynthesis' in window)) {
        console.warn('Speech synthesis not supported');
        showNotification('🔇 Audio tidak tersedia di browser ini');
        return;
    }
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Create utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    utterance.rate = 0.8; // Slower for learning
    utterance.pitch = 1;
    utterance.volume = 1;
    
    // Error handling
    utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event);
    };
    
    // Speak
    window.speechSynthesis.speak(utterance);
    
    console.log(`🔊 Speaking: "${text}"`);
}

// ========== READ STORY ==========
/**
 * Read story aloud
 */
function readStory() {
    if (!appState.currentUnit || !appState.currentUnit.story) {
        console.warn('No story available');
        return;
    }
    
    // Get story text
    const story = appState.currentUnit.story;
    const storyText = story.content.map(line => line.en).join(' ');
    
    // Check if speech synthesis is supported
    if (!('speechSynthesis' in window)) {
        showNotification('🔇 Audio tidak tersedia di browser ini');
        return;
    }
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Create utterance
    const utterance = new SpeechSynthesisUtterance(storyText);
    utterance.lang = 'en-US';
    utterance.rate = 0.7; // Even slower for stories
    utterance.pitch = 1;
    utterance.volume = 1;
    
    // Visual feedback
    const audioBtn = document.querySelector('.audio-btn');
    if (audioBtn) {
        audioBtn.textContent = '⏸️';
        audioBtn.style.animation = 'pulse 1s infinite';
    }
    
    // When finished
    utterance.onend = () => {
        if (audioBtn) {
            audioBtn.textContent = '🔊';
            audioBtn.style.animation = 'none';
        }
        showNotification('✅ Selesai membaca cerita!');
    };
    
    // Error handling
    utterance.onerror = (event) => {
        console.error('Speech error:', event);
        if (audioBtn) {
            audioBtn.textContent = '🔊';
            audioBtn.style.animation = 'none';
        }
    };
    
    // Speak
    window.speechSynthesis.speak(utterance);
    
    showNotification('📖 Membaca cerita...');
    console.log('📖 Reading story:', story.title);
}

// ========== STOP SPEECH ==========
/**
 * Stop any ongoing speech
 */
function stopSpeech() {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        console.log('🔇 Speech stopped');
    }
}

// ========== HTML ESCAPING ==========
/**
 * Escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// ========== RANDOM ELEMENT ==========
/**
 * Get random element from array
 * @param {Array} array - Input array
 * @returns {*} Random element
 */
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// ========== SHUFFLE ARRAY ==========
/**
 * Shuffle array using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// ========== FORMAT DATE ==========
/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date
 */
function formatDate(date) {
    const d = new Date(date);
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return d.toLocaleDateString('id-ID', options);
}

// ========== DEBOUNCE ==========
/**
 * Debounce function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ========== THROTTLE ==========
/**
 * Throttle function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in ms
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========== COPY TO CLIPBOARD ==========
/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 */
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('📋 Copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy:', err);
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showNotification('📋 Copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy:', err);
        }
        document.body.removeChild(textArea);
    }
}

// ========== DOWNLOAD PROGRESS ==========
/**
 * Download progress as JSON file
 */
function downloadProgress() {
    const progressData = {
        currentClass: appState.currentClass,
        totalStars: appState.totalStars,
        completedUnits: appState.completedUnits,
        currentProgress: appState.currentProgress,
        exportDate: new Date().toISOString(),
        appVersion: '1.0.0'
    };
    
    const dataStr = JSON.stringify(progressData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `english-learning-progress-${new Date().getTime()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showNotification('💾 Progress downloaded!');
    console.log('📥 Progress downloaded');
}

// ========== IMPORT PROGRESS ==========
/**
 * Import progress from JSON file
 */
function importProgress() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const progressData = JSON.parse(event.target.result);
                
                // Validate data
                if (progressData.currentClass && progressData.completedUnits) {
                    appState.currentClass = progressData.currentClass;
                    appState.totalStars = progressData.totalStars || 0;
                    appState.completedUnits = progressData.completedUnits || [];
                    appState.currentProgress = progressData.currentProgress || 0;
                    
                    // Save to localStorage
                    saveProgress();
                    
                    // Update UI
                    updateProgressBar();
                    updateStarCount();
                    loadJourneyMap(appState.currentClass);
                    
                    showNotification('✅ Progress imported successfully!');
                    console.log('📤 Progress imported:', progressData);
                } else {
                    throw new Error('Invalid progress file');
                }
            } catch (error) {
                console.error('Import error:', error);
                showNotification('❌ Failed to import progress');
            }
        };
        reader.readAsText(file);
    };
    
    input.click();
}

// ========== PRINT CERTIFICATE ==========
/**
 * Generate and print completion certificate
 */
function printCertificate() {
    const studentName = prompt('Masukkan nama siswa:', 'Student Name');
    if (!studentName) return;
    
    const certificateWindow = window.open('', '', 'width=800,height=600');
    
    const certificateHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Certificate of Completion</title>
            <style>
                body {
                    font-family: 'Georgia', serif;
                    text-align: center;
                    padding: 50px;
                    background: linear-gradient(135deg, #87CEEB, #90EE90);
                }
                .certificate {
                    background: white;
                    padding: 60px;
                    border: 10px solid #FFD700;
                    border-radius: 20px;
                    max-width: 700px;
                    margin: 0 auto;
                    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
                }
                h1 {
                    color: #2C3E50;
                    font-size: 3em;
                    margin-bottom: 20px;
                }
                .student-name {
                    font-size: 2.5em;
                    color: #1890FF;
                    font-weight: bold;
                    margin: 30px 0;
                    text-decoration: underline;
                }
                .details {
                    font-size: 1.2em;
                    color: #555;
                    line-height: 2;
                    margin: 30px 0;
                }
                .signature {
                    margin-top: 50px;
                    display: flex;
                    justify-content: space-around;
                }
                .signature div {
                    font-size: 1em;
                }
                @media print {
                    body { background: white; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <div class="certificate">
                <h1>🏆 Certificate of Completion 🏆</h1>
                <div style="font-size: 3em; margin: 20px 0;">⭐🎓⭐</div>
                <p style="font-size: 1.3em; color: #666;">This is to certify that</p>
                <div class="student-name">${studentName}</div>
                <div class="details">
                    has successfully completed<br>
                    <strong>English Learning Journey</strong><br>
                    Kurikulum Merdeka - SD Kelas 3-4<br>
                    <br>
                    Total Stars Earned: <strong>${appState.totalStars} ⭐</strong><br>
                    Completion: <strong>${appState.currentProgress}%</strong><br>
                    Date: <strong>${formatDate(new Date())}</strong>
                </div>
                <div class="signature">
                    <div>
                        __________________<br>
                        Teacher Signature
                    </div>
                    <div>
                        __________________<br>
                        Principal Signature
                    </div>
                </div>
            </div>
            <div class="no-print" style="margin-top: 30px;">
                <button onclick="window.print()" style="padding: 15px 30px; font-size: 1.1em; cursor: pointer; background: #FFD700; border: none; border-radius: 10px;">
                    🖨️ Print Certificate
                </button>
                <button onclick="window.close()" style="padding: 15px 30px; font-size: 1.1em; cursor: pointer; background: #E0E0E0; border: none; border-radius: 10px; margin-left: 10px;">
                    ❌ Close
                </button>
            </div>
        </body>
        </html>
    `;
    
    certificateWindow.document.write(certificateHTML);
    certificateWindow.document.close();
    
    console.log('📜 Certificate generated for:', studentName);
}

// ========== CHECK BROWSER COMPATIBILITY ==========
/**
 * Check browser feature support
 * @returns {Object} Compatibility report
 */
function checkBrowserCompatibility() {
    const features = {
        localStorage: typeof(Storage) !== 'undefined',
        speechSynthesis: 'speechSynthesis' in window,
        audioContext: typeof(AudioContext) !== 'undefined' || typeof(webkitAudioContext) !== 'undefined',
        flexbox: CSS.supports('display', 'flex'),
        grid: CSS.supports('display', 'grid'),
        animations: CSS.supports('animation', 'fadeIn 1s')
    };
    
    console.log('🔍 Browser Compatibility:', features);
    
    return features;
}

// ========== PERFORMANCE MONITOR ==========
/**
 * Log performance metrics
 */
function logPerformance() {
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        
        console.log('⚡ Performance Metrics:');
        console.log(`  - Page Load Time: ${loadTime}ms`);
        console.log(`  - DOM Ready: ${timing.domContentLoadedEventEnd - timing.navigationStart}ms`);
        console.log(`  - Resources Loaded: ${timing.loadEventEnd - timing.responseEnd}ms`);
    }
}

// Run performance check after page load
window.addEventListener('load', () => {
    setTimeout(logPerformance, 1000);
});

// ========== KEYBOARD SHORTCUTS ==========
/**
 * Setup keyboard shortcuts
 */
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + S: Save progress
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            saveProgress();
            showNotification('💾 Progress saved!');
        }
        
        // Ctrl/Cmd + R: Reset progress (with confirmation)
        if ((e.ctrlKey || e.metaKey) && e.key === 'r' && e.shiftKey) {
            e.preventDefault();
            resetProgress();
        }
        
        // Ctrl/Cmd + P: Print certificate
        if ((e.ctrlKey || e.metaKey) && e.key === 'p' && appState.currentProgress >= 50) {
            e.preventDefault();
            printCertificate();
        }
    });
}

// Initialize shortcuts
setupKeyboardShortcuts();

// ========== EXPORT UTILITIES ==========
window.utils = {
    speakWord,
    readStory,
    stopSpeech,
    escapeHtml,
    getRandomElement,
    shuffleArray,
    formatDate,
    downloadProgress,
    importProgress,
    printCertificate,
    checkBrowserCompatibility,
    copyToClipboard
};

console.log('🛠️ Utility functions loaded');