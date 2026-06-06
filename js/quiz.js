/**
 * QUIZ CONTROLLER
 * Handles all quiz functionality with detailed score recap
 */

// ========== QUIZ STATE ==========
const quizState = {
    currentQuizData: [],
    currentQuestionIndex: 0,
    score: 0,
    totalQuestions: 0,
    answeredQuestions: [],
    isAnswering: false,
    startTime: null,
    endTime: null
};

// ========== INITIALIZE QUIZ ==========
/**
 * Initialize quiz with questions
 * @param {Array} quizData - Array of quiz questions
 */
function initializeQuiz(quizData) {
    console.log('🎯 Initializing quiz with', quizData.length, 'questions');
    
    // Reset quiz state
    quizState.currentQuizData = quizData;
    quizState.currentQuestionIndex = 0;
    quizState.score = 0;
    quizState.totalQuestions = quizData.length;
    quizState.answeredQuestions = [];
    quizState.isAnswering = false;
    quizState.startTime = new Date();
    quizState.endTime = null;
    
    // Update score display
    updateQuizScore();
    
    // Show first question
    showQuestion();
}

// ========== SHOW QUESTION ==========
/**
 * Display current question
 */
function showQuestion() {
    const container = document.getElementById('quizContainer');
    
    if (!container) {
        console.error('Quiz container not found');
        return;
    }
    
    // Check if quiz is complete
    if (quizState.currentQuestionIndex >= quizState.totalQuestions) {
        quizState.endTime = new Date();
        showQuizResults();
        return;
    }
    
    const question = quizState.currentQuizData[quizState.currentQuestionIndex];
    
    // Build question HTML
    container.innerHTML = `
        <div class="question-box">
            <div class="question-number" style="font-size: 1.2em; margin-bottom: 10px; opacity: 0.9;">
                Question ${quizState.currentQuestionIndex + 1} of ${quizState.totalQuestions}
            </div>
            <div>${question.question}</div>
            <div class="question-image">${question.emoji}</div>
        </div>
        <div class="options-grid" id="optionsGrid">
            ${question.options.map((option, index) => `
                <button 
                    class="option-btn" 
                    data-option="${escapeHtml(option)}"
                    data-index="${index}"
                    onclick="handleAnswer('${escapeHtml(option)}', '${escapeHtml(question.correct)}')"
                >
                    ${option}
                </button>
            `).join('')}
        </div>
        <div class="quiz-progress-dots" style="text-align: center; margin-top: 20px;">
            ${Array.from({ length: quizState.totalQuestions }, (_, i) => {
                let dotClass = 'quiz-dot';
                if (i < quizState.currentQuestionIndex) {
                    dotClass += ' answered';
                } else if (i === quizState.currentQuestionIndex) {
                    dotClass += ' current';
                }
                return `<span class="${dotClass}"></span>`;
            }).join('')}
        </div>
    `;
    
    // Add styles for progress dots
    addQuizDotStyles();
    
    console.log(`❓ Showing question ${quizState.currentQuestionIndex + 1}`);
}

// ========== HANDLE ANSWER ==========
/**
 * Handle user's answer selection
 * @param {string} selectedAnswer - User's selected answer
 * @param {string} correctAnswer - Correct answer
 */
function handleAnswer(selectedAnswer, correctAnswer) {
    // Prevent multiple clicks
    if (quizState.isAnswering) return;
    quizState.isAnswering = true;
    
    console.log('Selected:', selectedAnswer, 'Correct:', correctAnswer);
    
    // Get all option buttons
    const buttons = document.querySelectorAll('.option-btn');
    
    // Disable all buttons
    buttons.forEach(btn => btn.disabled = true);
    
    // Find the clicked button
    let clickedButton = null;
    buttons.forEach(btn => {
        if (btn.dataset.option === selectedAnswer) {
            clickedButton = btn;
        }
    });
    
    // Check if answer is correct
    const isCorrect = selectedAnswer === correctAnswer;
    
    if (isCorrect) {
        // Correct answer
        if (clickedButton) {
            clickedButton.classList.add('correct');
        }
        quizState.score++;
        updateQuizScore();
        playCorrectSound();
        
        // Show encouragement
        showQuizFeedback('correct');
    } else {
        // Incorrect answer
        if (clickedButton) {
            clickedButton.classList.add('incorrect');
        }
        
        // Highlight correct answer
        buttons.forEach(btn => {
            if (btn.dataset.option === correctAnswer) {
                btn.classList.add('correct');
            }
        });
        
        playIncorrectSound();
        showQuizFeedback('incorrect');
    }
    
    // Record answer with detailed info
    quizState.answeredQuestions.push({
        questionNumber: quizState.currentQuestionIndex + 1,
        question: quizState.currentQuizData[quizState.currentQuestionIndex].question,
        emoji: quizState.currentQuizData[quizState.currentQuestionIndex].emoji,
        selected: selectedAnswer,
        correct: correctAnswer,
        isCorrect: isCorrect,
        allOptions: quizState.currentQuizData[quizState.currentQuestionIndex].options
    });
    
    // Move to next question after delay
    setTimeout(() => {
        quizState.currentQuestionIndex++;
        quizState.isAnswering = false;
        showQuestion();
    }, 2000);
}

// ========== QUIZ FEEDBACK ==========
/**
 * Show feedback message
 * @param {string} type - 'correct' or 'incorrect'
 */
function showQuizFeedback(type) {
    const messages = {
        correct: [
            '🎉 Correct! Hebat!',
            '⭐ Great job! Luar biasa!',
            '✨ Excellent! Sempurna!',
            '🌟 Well done! Bagus sekali!',
            '💫 Perfect! Tepat sekali!'
        ],
        incorrect: [
            '💪 Good try! Coba lagi!',
            '🌈 Almost! Hampir benar!',
            '📚 Keep learning! Terus belajar!',
            '😊 Don\'t worry! Jangan khawatir!',
            '🎯 Try again! Coba lagi ya!'
        ]
    };
    
    const feedbackMessages = messages[type];
    const randomMessage = feedbackMessages[Math.floor(Math.random() * feedbackMessages.length)];
    
    // Create feedback element
    const feedback = document.createElement('div');
    feedback.className = 'quiz-feedback';
    feedback.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        background: ${type === 'correct' ? 'linear-gradient(135deg, #52C41A, #73D13D)' : 'linear-gradient(135deg, #FF4D4F, #FF7875)'};
        color: white;
        padding: 30px 50px;
        border-radius: 20px;
        font-size: 2em;
        font-weight: 700;
        z-index: 9999;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        animation: feedbackPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        text-align: center;
    `;
    feedback.textContent = randomMessage;
    
    document.body.appendChild(feedback);
    
    // Remove after animation
    setTimeout(() => {
        feedback.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => feedback.remove(), 300);
    }, 1500);
}

// ========== UPDATE SCORE ==========
/**
 * Update score display
 */
function updateQuizScore() {
    const scoreElement = document.getElementById('quizScore');
    const totalElement = document.getElementById('quizTotal');
    
    if (scoreElement) {
        scoreElement.textContent = quizState.score;
        
        // Animate score update
        scoreElement.style.animation = 'none';
        setTimeout(() => {
            scoreElement.style.animation = 'pulse 0.5s ease';
        }, 10);
    }
    
    if (totalElement) {
        totalElement.textContent = quizState.totalQuestions;
    }
}

// ========== SHOW RESULTS ==========
/**
 * Display quiz results with detailed recap
 */
function showQuizResults() {
    const container = document.getElementById('quizContainer');
    
    if (!container) return;
    
    const percentage = Math.round((quizState.score / quizState.totalQuestions) * 100);
    const timeTaken = calculateTimeTaken();
    
    // Determine performance level
    let performanceData = getPerformanceData(percentage);
    
    // Build detailed recap HTML
    const recapHTML = buildDetailedRecap();
    
    // Build results HTML
    container.innerHTML = `
        <div class="quiz-results">
            <!-- Performance Header -->
            <div class="result-header" style="text-align: center; margin-bottom: 30px;">
                <div class="result-emoji" style="font-size: 120px; margin-bottom: 20px; animation: starSpin 1s ease;">
                    ${performanceData.emoji}
                </div>
                
                <h2 style="font-size: 2.5em; color: #2C3E50; margin-bottom: 15px; font-family: 'Fredoka', sans-serif;">
                    ${performanceData.title}
                </h2>
                
                <div class="result-score" style="font-size: 3em; font-weight: 800; color: ${performanceData.color}; margin: 20px 0;">
                    ${quizState.score} / ${quizState.totalQuestions}
                </div>
                
                <div class="result-percentage" style="font-size: 2em; color: #7f8c8d; margin-bottom: 10px;">
                    ${percentage}% Correct
                </div>
                
                <div class="result-time" style="font-size: 1.2em; color: #95a5a6; margin-bottom: 20px;">
                    ⏱️ Time: ${timeTaken}
                </div>
                
                <div class="result-message" style="font-size: 1.3em; color: #2C3E50; margin-bottom: 30px; line-height: 1.6; padding: 20px; background: linear-gradient(135deg, #FFF9C4, #FFE082); border-radius: 15px;">
                    ${performanceData.message}
                </div>
            </div>

            <!-- Statistics Summary -->
            <div class="statistics-summary" style="background: white; border-radius: 20px; padding: 25px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                <h3 style="text-align: center; color: #2C3E50; margin-bottom: 20px; font-size: 1.8em;">
                    📊 Statistik Jawaban
                </h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px;">
                    <div class="stat-card" style="background: linear-gradient(135deg, #52C41A, #73D13D); color: white; padding: 20px; border-radius: 15px; text-align: center;">
                        <div style="font-size: 2.5em; margin-bottom: 5px;">✅</div>
                        <div style="font-size: 2em; font-weight: 700;">${quizState.score}</div>
                        <div style="font-size: 1em; opacity: 0.9;">Benar</div>
                    </div>
                    <div class="stat-card" style="background: linear-gradient(135deg, #FF4D4F, #FF7875); color: white; padding: 20px; border-radius: 15px; text-align: center;">
                        <div style="font-size: 2.5em; margin-bottom: 5px;">❌</div>
                        <div style="font-size: 2em; font-weight: 700;">${quizState.totalQuestions - quizState.score}</div>
                        <div style="font-size: 1em; opacity: 0.9;">Salah</div>
                    </div>
                    <div class="stat-card" style="background: linear-gradient(135deg, #1890FF, #40A9FF); color: white; padding: 20px; border-radius: 15px; text-align: center;">
                        <div style="font-size: 2.5em; margin-bottom: 5px;">📝</div>
                        <div style="font-size: 2em; font-weight: 700;">${quizState.totalQuestions}</div>
                        <div style="font-size: 1em; opacity: 0.9;">Total Soal</div>
                    </div>
                    <div class="stat-card" style="background: linear-gradient(135deg, #FFD700, #FFA500); color: white; padding: 20px; border-radius: 15px; text-align: center;">
                        <div style="font-size: 2.5em; margin-bottom: 5px;">🎯</div>
                        <div style="font-size: 2em; font-weight: 700;">${percentage}%</div>
                        <div style="font-size: 1em; opacity: 0.9;">Akurasi</div>
                    </div>
                </div>
            </div>

            <!-- Detailed Recap -->
            ${recapHTML}

            <!-- Action Buttons -->
            <div class="result-actions" style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; margin-top: 30px;">
                <button 
                    onclick="retryQuiz()" 
                    class="back-btn"
                    style="background: linear-gradient(135deg, #87CEEB, #90EE90);"
                >
                    🔄 Coba Lagi
                </button>
                <button 
                    onclick="reviewAnswers()" 
                    class="back-btn"
                    style="background: linear-gradient(135deg, #1890FF, #40A9FF);"
                >
                    📖 Review Jawaban
                </button>
                <button 
                    onclick="finishQuiz()" 
                    class="back-btn"
                    style="background: linear-gradient(135deg, #FFD700, #FFA500);"
                >
                    ✨ Selesai
                </button>
            </div>
        </div>
    `;
    
    // If perfect score or high score, complete the unit
    if (percentage >= 70 && appState.currentUnit) {
        completeUnit(appState.currentUnit.id);
    }
    
    // Show confetti for perfect score
    if (percentage === 100) {
        showConfetti();
    }
    
    console.log(`📊 Quiz completed: ${quizState.score}/${quizState.totalQuestions} (${percentage}%)`);
}

// ========== BUILD DETAILED RECAP ==========
/**
 * Build detailed answer recap
 * @returns {string} HTML string
 */
function buildDetailedRecap() {
    return `
        <div class="detailed-recap" style="background: white; border-radius: 20px; padding: 25px; margin-bottom: 25px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
            <h3 style="text-align: center; color: #2C3E50; margin-bottom: 20px; font-size: 1.8em;">
                📝 Rekap Detail Jawaban
            </h3>
            <div class="recap-list" style="display: grid; gap: 15px;">
                ${quizState.answeredQuestions.map((answer, index) => `
                    <div class="recap-item" style="
                        background: ${answer.isCorrect ? 'linear-gradient(135deg, #F0FFF4, #C6F6D5)' : 'linear-gradient(135deg, #FFF5F5, #FED7D7)'};
                        border-left: 5px solid ${answer.isCorrect ? '#52C41A' : '#FF4D4F'};
                        border-radius: 12px;
                        padding: 20px;
                        transition: transform 0.3s ease;
                    " onmouseover="this.style.transform='translateX(5px)'" onmouseout="this.style.transform='translateX(0)'">
                        <div style="display: flex; gap: 15px; align-items: start;">
                            <!-- Question Number Badge -->
                            <div style="
                                background: ${answer.isCorrect ? '#52C41A' : '#FF4D4F'};
                                color: white;
                                width: 40px;
                                height: 40px;
                                border-radius: 50%;
                                display: flex;
                                align-items: center;
                                justify-content: center;
                                font-weight: 700;
                                font-size: 1.2em;
                                flex-shrink: 0;
                            ">
                                ${answer.questionNumber}
                            </div>
                            
                            <!-- Question Content -->
                            <div style="flex: 1;">
                                <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                                    <span style="font-size: 2em;">${answer.emoji}</span>
                                    <strong style="font-size: 1.1em; color: #2C3E50;">${answer.question}</strong>
                                </div>
                                
                                <!-- User Answer -->
                                <div style="margin: 10px 0; padding: 12px; background: white; border-radius: 8px;">
                                    <div style="font-size: 0.9em; color: #7f8c8d; margin-bottom: 5px;">
                                        Jawabanmu:
                                    </div>
                                    <div style="display: flex; align-items: center; gap: 8px;">
                                        <span style="font-size: 1.5em;">${answer.isCorrect ? '✅' : '❌'}</span>
                                        <strong style="color: ${answer.isCorrect ? '#52C41A' : '#FF4D4F'}; font-size: 1.1em;">
                                            ${answer.selected}
                                        </strong>
                                    </div>
                                </div>
                                
                                <!-- Correct Answer (if wrong) -->
                                ${!answer.isCorrect ? `
                                    <div style="margin: 10px 0; padding: 12px; background: #E8F5E9; border-radius: 8px; border: 2px solid #52C41A;">
                                        <div style="font-size: 0.9em; color: #2E7D32; margin-bottom: 5px;">
                                            Jawaban yang benar:
                                        </div>
                                        <div style="display: flex; align-items: center; gap: 8px;">
                                            <span style="font-size: 1.5em;">✅</span>
                                            <strong style="color: #2E7D32; font-size: 1.1em;">
                                                ${answer.correct}
                                            </strong>
                                        </div>
                                    </div>
                                ` : ''}
                                
                                <!-- Status Badge -->
                                <div style="margin-top: 10px;">
                                    <span style="
                                        display: inline-block;
                                        padding: 6px 15px;
                                        border-radius: 20px;
                                        font-size: 0.9em;
                                        font-weight: 600;
                                        background: ${answer.isCorrect ? '#52C41A' : '#FF4D4F'};
                                        color: white;
                                    ">
                                        ${answer.isCorrect ? '✓ BENAR' : '✗ SALAH'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// ========== REVIEW ANSWERS ==========
/**
 * Show review mode with all questions and answers
 */
function reviewAnswers() {
    const container = document.getElementById('quizContainer');
    
    container.innerHTML = `
        <div class="review-mode">
            <div style="text-align: center; margin-bottom: 30px;">
                <h2 style="font-size: 2em; color: #2C3E50; margin-bottom: 10px;">
                    📖 Review Mode
                </h2>
                <p style="color: #7f8c8d; font-size: 1.1em;">
                    Pelajari kembali semua soal dan jawabannya
                </p>
            </div>
            
            ${buildDetailedRecap()}
            
            <div style="text-align: center; margin-top: 30px;">
                <button 
                    onclick="showQuizResults()" 
                    class="back-btn"
                    style="background: linear-gradient(135deg, #FFD700, #FFA500);"
                >
                    ← Kembali ke Hasil
                </button>
            </div>
        </div>
    `;
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========== CALCULATE TIME TAKEN ==========
/**
 * Calculate time taken for quiz
 * @returns {string} Formatted time
 */
function calculateTimeTaken() {
    if (!quizState.startTime || !quizState.endTime) return 'N/A';
    
    const timeDiff = quizState.endTime - quizState.startTime;
    const minutes = Math.floor(timeDiff / 60000);
    const seconds = Math.floor((timeDiff % 60000) / 1000);
    
    if (minutes > 0) {
        return `${minutes} menit ${seconds} detik`;
    } else {
        return `${seconds} detik`;
    }
}

// ========== PERFORMANCE DATA ==========
/**
 * Get performance data based on percentage
 * @param {number} percentage - Score percentage
 * @returns {Object} Performance data
 */
function getPerformanceData(percentage) {
    if (percentage === 100) {
        return {
            emoji: '🏆',
            title: 'PERFECT SCORE!',
            color: '#FFD700',
            message: '🌟 Luar biasa! Kamu menjawab SEMUA soal dengan BENAR! Kamu adalah bintang kelas! Pertahankan terus ya! 🌟'
        };
    } else if (percentage >= 80) {
        return {
            emoji: '⭐',
            title: 'EXCELLENT!',
            color: '#52C41A',
            message: '🎉 Hebat sekali! Kamu sangat memahami materinya! Hanya sedikit lagi untuk sempurna! 🎉'
        };
    } else if (percentage >= 70) {
        return {
            emoji: '👍',
            title: 'GREAT JOB!',
            color: '#1890FF',
            message: '💪 Bagus! Kamu sudah paham banyak materi! Pelajari lagi bagian yang salah dan kamu pasti bisa lebih baik! 💪'
        };
    } else if (percentage >= 50) {
        return {
            emoji: '📚',
            title: 'GOOD TRY!',
            color: '#FAAD14',
            message: '🌈 Tidak buruk! Coba pelajari lagi vocabulary dan kamu pasti bisa lebih baik! Semangat belajar! 🌈'
        };
    } else if (percentage > 0) {
        return {
            emoji: '💪',
            title: 'KEEP LEARNING!',
            color: '#FF4D4F',
            message: '🔥 Jangan menyerah! Belajar lagi vocabulary-nya dengan teliti. Kamu pasti bisa! Ayo coba lagi! 🔥'
        };
    } else {
        return {
            emoji: '📖',
            title: 'LET\'S LEARN AGAIN!',
            color: '#FF4D4F',
            message: '🌱 Ayo belajar lagi dari awal! Baca vocabulary dengan teliti dan coba lagi. Kamu pasti bisa! Semangat! 🌱'
        };
    }
}

// ========== CONFETTI EFFECT ==========
/**
 * Show confetti animation for perfect score
 */
function showConfetti() {
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}vw;
                top: -20px;
                opacity: ${Math.random() * 0.7 + 0.3};
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                z-index: 10000;
                pointer-events: none;
                animation: confetti-fall ${Math.random() * 3 + 2}s linear forwards;
            `;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }, i * 30);
    }
}

// ========== RETRY QUIZ ==========
/**
 * Restart the quiz
 */
function retryQuiz() {
    console.log('🔄 Retrying quiz');
    
    if (appState.currentUnit && appState.currentUnit.quiz) {
        initializeQuiz(appState.currentUnit.quiz);
        setTeacherMessage('encouragement');
    }
}

// ========== FINISH QUIZ ==========
/**
 * Finish quiz and return to menu
 */
function finishQuiz() {
    console.log('✅ Finishing quiz');
    
    // Update teacher message based on performance
    const percentage = Math.round((quizState.score / quizState.totalQuestions) * 100);
    
    if (percentage === 100) {
        setTeacherMessage('encouragement');
        showNotification('🏆 Perfect! Kamu hebat sekali!');
    } else if (percentage >= 70) {
        setTeacherMessage('encouragement');
        showNotification('⭐ Great job! Terus tingkatkan!');
    } else {
        setTeacherMessage('retry');
        showNotification('💪 Ayo belajar lagi dan coba ulang!');
    }
    
    // Return to main menu
    setTimeout(() => {
        backToMenu();
    }, 500);
}

// ========== QUIZ DOT STYLES ==========
/**
 * Add styles for quiz progress dots
 */
function addQuizDotStyles() {
    // Check if styles already exist
    if (document.getElementById('quiz-dot-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'quiz-dot-styles';
    style.textContent = `
        .quiz-dot {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: #E0E0E0;
            margin: 0 5px;
            transition: all 0.3s ease;
        }
        
        .quiz-dot.answered {
            background: #52C41A;
            transform: scale(1.2);
        }
        
        .quiz-dot.current {
            background: #1890FF;
            transform: scale(1.4);
            animation: pulse 1s infinite;
        }
        
        @keyframes feedbackPop {
            0% {
                transform: translate(-50%, -50%) scale(0);
            }
            50% {
                transform: translate(-50%, -50%) scale(1.1);
            }
            100% {
                transform: translate(-50%, -50%) scale(1);
            }
        }
        
        @keyframes fadeOut {
            to {
                opacity: 0;
                transform: translate(-50%, -50%) scale(0.8);
            }
        }
    `;
    
    document.head.appendChild(style);
}

// ========== QUIZ STATISTICS ==========
/**
 * Get quiz statistics
 * @returns {Object} Quiz statistics
 */
function getQuizStatistics() {
    return {
        totalQuestions: quizState.totalQuestions,
        answeredQuestions: quizState.answeredQuestions.length,
        correctAnswers: quizState.score,
        incorrectAnswers: quizState.answeredQuestions.length - quizState.score,
        percentage: Math.round((quizState.score / quizState.totalQuestions) * 100),
        currentQuestion: quizState.currentQuestionIndex + 1,
        timeTaken: calculateTimeTaken()
    };
}

// ========== EXPORT QUIZ DATA ==========
/**
 * Export quiz results to JSON
 */
function exportQuizResults() {
    const results = {
        unitId: appState.currentUnit?.id,
        unitTitle: appState.currentUnit?.title,
        score: quizState.score,
        totalQuestions: quizState.totalQuestions,
        percentage: Math.round((quizState.score / quizState.totalQuestions) * 100),
        timeTaken: calculateTimeTaken(),
        answers: quizState.answeredQuestions,
        completedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(results, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `quiz-results-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    showNotification('📥 Quiz results downloaded!');
}

// Export for debugging
window.quizDebug = {
    state: quizState,
    stats: getQuizStatistics,
    retry: retryQuiz,
    finish: finishQuiz,
    review: reviewAnswers,
    export: exportQuizResults
};

console.log('🎯 Quiz controller loaded with detailed recap');