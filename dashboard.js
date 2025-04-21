document.addEventListener('DOMContentLoaded', function() {
    // Initialize user data if not exists
    if (!localStorage.getItem('currentUser')) {
        localStorage.setItem('currentUser', JSON.stringify({
            name: 'Ankit',
            email: 'ankit@example.com',
            coins: 120
        }));
    }

    // Initialize tasks if not exists
    if (!localStorage.getItem('userTasks')) {
        localStorage.setItem('userTasks', JSON.stringify([
            {
                id: 'task1',
                title: 'Morning Meditation',
                description: '10 minutes of mindfulness meditation',
                time: '8:00 AM',
                completed: true,
                proof: 'Submitted'
            },
            {
                id: 'task2',
                title: 'Reading Session',
                description: 'Read 20 pages of "Atomic Habits"',
                time: '12:30 PM',
                completed: false
            },
            {
                id: 'task3',
                title: 'Evening Workout',
                description: '30-minute strength training session',
                time: '6:00 PM',
                completed: false
            }
        ]));
    }

    // Initialize goals if not exists
    if (!localStorage.getItem('userGoals')) {
        localStorage.setItem('userGoals', JSON.stringify([
            {
                id: 'goal1',
                title: 'Morning Meditation',
                description: 'Meditate for 10 minutes each morning to start the day with focus and clarity.',
                target: 30,
                progress: 22
            },
            {
                id: 'goal2',
                title: 'Read Daily',
                description: 'Read 20 pages of a book every day to improve knowledge and vocabulary.',
                target: 30,
                progress: 18
            },
            {
                id: 'goal3',
                title: 'Exercise Routine',
                description: 'Complete a 30-minute workout session 4 times per week for better health.',
                target: 16,
                progress: 6
            }
        ]));
    }

    // User Authentication and Profile
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    document.getElementById('sidebarUserName').textContent = currentUser.name;
    document.getElementById('sidebarCoinCount').textContent = currentUser.coins;

    // Sidebar Toggle
    const sidebar = document.querySelector('.sidebar');
    const toggleSidebar = document.querySelector('.toggle-sidebar');
    
    if (toggleSidebar) {
        toggleSidebar.addEventListener('click', function() {
            sidebar.classList.toggle('active');
        });
    }

    // Logout Functionality
    const logoutBtn = document.querySelector('#logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    }

    // Add Goal Button
    const addGoalBtn = document.querySelector('.add-goal');
    if (addGoalBtn) {
        addGoalBtn.addEventListener('click', function() {
            showModal('goal');
        });
    }

    // Add Task Button
    const addTaskBtn = document.querySelector('.add-task');
    if (addTaskBtn) {
        addTaskBtn.addEventListener('click', function() {
            showModal('task');
        });
    }

    // Function to show modal
    function showModal(type) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        
        if (type === 'goal') {
            modal.innerHTML = `
                <div class="modal-content">
                    <h3>Add New Goal</h3>
                    <form id="addGoalForm">
                        <div class="form-group">
                            <label for="goalTitle">Goal Title</label>
                            <input type="text" id="goalTitle" required>
                        </div>
                        <div class="form-group">
                            <label for="goalDescription">Description</label>
                            <textarea id="goalDescription" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="goalTarget">Target (days)</label>
                            <input type="number" id="goalTarget" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Add Goal</button>
                    </form>
                </div>
            `;
        } else {
            modal.innerHTML = `
                <div class="modal-content">
                    <h3>Add New Task</h3>
                    <form id="addTaskForm">
                        <div class="form-group">
                            <label for="taskTitle">Task Title</label>
                            <input type="text" id="taskTitle" required>
                        </div>
                        <div class="form-group">
                            <label for="taskDescription">Description</label>
                            <textarea id="taskDescription" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="taskTime">Time</label>
                            <input type="time" id="taskTime" required>
                        </div>
                        <button type="submit" class="btn btn-primary">Add Task</button>
                    </form>
                </div>
            `;
        }
        
        document.body.appendChild(modal);
        
        // Handle form submission
        const form = modal.querySelector('form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (type === 'goal') {
                addNewGoal();
            } else {
                addNewTask();
            }
            modal.remove();
        });
    }

    // Function to add new goal
    function addNewGoal() {
        const title = document.getElementById('goalTitle').value;
        const description = document.getElementById('goalDescription').value;
        const target = document.getElementById('goalTarget').value;
        
        const goals = JSON.parse(localStorage.getItem('userGoals')) || [];
        const newGoal = {
            id: `goal-${Date.now()}`,
            title,
            description,
            target: parseInt(target),
            progress: 0
        };
        goals.push(newGoal);
        localStorage.setItem('userGoals', JSON.stringify(goals));
        
        const goalsContainer = document.querySelector('.goals-container');
        const newGoalElement = document.createElement('div');
        newGoalElement.className = 'goal-item';
        newGoalElement.innerHTML = `
            <div class="goal-header">
                <h3>${title}</h3>
                <div class="goal-actions">
                    <button class="btn-icon edit-goal"><i class="fas fa-edit"></i></button>
                    <button class="btn-icon delete-goal"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <p class="goal-description">${description}</p>
            <div class="goal-progress">
                <div class="progress-bar">
                    <div class="progress" style="width: 0%"></div>
                </div>
                <span class="progress-text">0/${target} days completed</span>
            </div>
        `;
        
        goalsContainer.insertBefore(newGoalElement, document.querySelector('.add-goal'));
    }

    // Function to add new task
    function addNewTask() {
        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;
        const time = document.getElementById('taskTime').value;
        
        const tasks = JSON.parse(localStorage.getItem('userTasks')) || [];
        const newTask = {
            id: `task-${Date.now()}`,
            title,
            description,
            time,
            completed: false
        };
        tasks.push(newTask);
        localStorage.setItem('userTasks', JSON.stringify(tasks));
        
        const tasksContainer = document.querySelector('.tasks-container');
        const newTaskElement = document.createElement('div');
        newTaskElement.className = 'task-item in-progress';
        newTaskElement.innerHTML = `
            <div class="task-checkbox">
                <input type="checkbox" id="${newTask.id}">
                <label for="${newTask.id}"></label>
            </div>
            <div class="task-details">
                <h3>${title}</h3>
                <p>${description}</p>
            </div>
            <div class="task-time">${time}</div>
            <div class="task-proof">
                <button class="btn btn-primary btn-sm"><i class="fas fa-upload"></i> Upload Proof</button>
            </div>
        `;
        
        tasksContainer.insertBefore(newTaskElement, document.querySelector('.add-task'));
    }

    // Task Checkbox Functionality
    const taskCheckboxes = document.querySelectorAll('.task-checkbox input[type="checkbox"]');
    taskCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const taskItem = this.closest('.task-item');
            if (this.checked) {
                taskItem.classList.add('completed');
                taskItem.classList.remove('in-progress');
                updateTaskCompletion(this.id, true);
            } else {
                taskItem.classList.remove('completed');
                taskItem.classList.add('in-progress');
                updateTaskCompletion(this.id, false);
            }
        });
    });

    // Function to update task completion status
    function updateTaskCompletion(taskId, isCompleted) {
        let tasks = JSON.parse(localStorage.getItem('userTasks')) || [];
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            tasks[taskIndex].completed = isCompleted;
            localStorage.setItem('userTasks', JSON.stringify(tasks));
        }
    }

    // File Upload Functionality
    const uploadAreas = document.querySelectorAll('.upload-area');
    uploadAreas.forEach(area => {
        const fileInput = area.querySelector('.file-input');
        area.addEventListener('click', function() {
            fileInput.click();
        });
        
        fileInput.addEventListener('change', function() {
            const fileName = this.files[0]?.name;
            if (fileName) {
                area.querySelector('p').textContent = fileName;
                area.classList.add('uploaded');
            }
        });
    });

    // Submit for Verification Button
    const submitButton = document.querySelector('.upload-actions .btn-primary');
    if (submitButton) {
        submitButton.addEventListener('click', function() {
            const uploadAreas = document.querySelectorAll('.upload-area');
            const allUploaded = Array.from(uploadAreas).every(area => area.classList.contains('uploaded'));
            
            if (allUploaded) {
                const currentUser = JSON.parse(localStorage.getItem('currentUser'));
                currentUser.coins += 10;
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                document.querySelector('.coin-balance span').textContent = `${currentUser.coins} coins`;
                
                alert('Proof submitted successfully! You earned 10 coins!');
                
                uploadAreas.forEach(area => {
                    area.classList.remove('uploaded');
                    area.querySelector('p').textContent = 'Click to upload';
                });
            } else {
                alert('Please upload all required images before submitting.');
            }
        });
    }

    // Responsive Sidebar
    function handleResize() {
        if (window.innerWidth > 992) {
            sidebar.classList.remove('active');
        }
    }
    
    window.addEventListener('resize', handleResize);

    // Check if this is the user's first visit
    if (!localStorage.getItem('hasVisited')) {
        showWelcomeModal();
    }
    
    // Initialize theme
    initializeTheme();
    
    // Initialize AI Assistant
    initializeAIAssistant();
    
    // Initialize task manager
    initializeTaskManager();
    
    // Initialize progress tracker
    initializeProgressTracker();
    
    // Initialize settings
    initializeSettings();

    // Initialize target cards
    initializeTargetCards();
    updateCoinsDisplay();
    updateProgressDisplay();
    
    // Update date and time
    function updateDateTime() {
        const now = new Date(); // Use current date instead of hardcoded date
        const dateDisplay = document.getElementById('currentDate');
        const timeDisplay = document.getElementById('currentTime');
        
        if (dateDisplay) {
            dateDisplay.textContent = now.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
        
        if (timeDisplay) {
            timeDisplay.textContent = now.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        }
    }
    
    updateDateTime();
    setInterval(updateDateTime, 1000);
    
    // Initialize calendar
    initializeCalendar();
    
    // Initialize performance chart
    initializePerformanceChart();

    // Initialize rewards section
    initializeRewards();
});

// Welcome Modal
function showWelcomeModal() {
    const modal = document.querySelector('.welcome-modal');
    modal.classList.add('active');
    
    // Store that user has visited
    localStorage.setItem('hasVisited', 'true');
}

function closeWelcomeModal() {
    const modal = document.querySelector('.welcome-modal');
    modal.classList.remove('active');
}

// Theme Toggle
function initializeTheme() {
    const themeToggle = document.querySelector('.theme-toggle button');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    }
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        const isDark = body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
}

// AI Assistant
function initializeAIAssistant() {
    const aiAssistant = document.querySelector('.ai-assistant');
    const toggleBtn = document.querySelector('.toggle-ai-btn');
    const sendBtn = document.querySelector('.send-btn');
    const aiInput = document.querySelector('.ai-input input');
    
    toggleBtn.addEventListener('click', () => {
        aiAssistant.classList.toggle('minimized');
    });
    
    sendBtn.addEventListener('click', sendMessage);
    aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

function sendMessage() {
    const aiInput = document.querySelector('.ai-input input');
    const message = aiInput.value.trim();
    
    if (message) {
        addMessage(message, 'user');
        // Simulate AI response
        setTimeout(() => {
            const response = getAIResponse(message);
            addMessage(response, 'ai');
        }, 1000);
        
        aiInput.value = '';
    }
}

function addMessage(message, type) {
    const messagesContainer = document.querySelector('.ai-messages');
    const messageElement = document.createElement('div');
    messageElement.className = `ai-message ${type}-message`;
    
    if (type === 'ai') {
        messageElement.innerHTML = `
            <div class="ai-avatar">
                <i class="fas fa-robot"></i>
            </div>
            <div class="message-content">${message}</div>
        `;
    } else {
        messageElement.innerHTML = `
            <div class="message-content">${message}</div>
        `;
    }
    
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getAIResponse(message) {
    // Simple response logic - can be expanded with actual AI integration
    const responses = [
        "I'm here to help you build better habits!",
        "That's a great goal to work on!",
        "Remember to stay consistent with your habits.",
        "You're making progress! Keep going!",
        "I believe in you! You can do this!"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
}

// Goal Manager
function initializeTaskManager() {
    const addGoalBtn = document.querySelector('#addTaskBtn');
    const goalCard = document.querySelector('.goal-card');
    const markCompleteBtn = document.querySelector('.goal-actions .btn-primary');
    const adjustPaceBtn = document.querySelector('.goal-actions .btn-outline');
    
    // Add goal button
    if (addGoalBtn) {
        addGoalBtn.addEventListener('click', () => {
            // Show goal creation modal
            showGoalModal();
        });
    }
    
    // Mark lecture complete button
    if (markCompleteBtn) {
        markCompleteBtn.addEventListener('click', () => {
            updateGoalProgress();
        });
    }
    
    // Adjust pace button
    if (adjustPaceBtn) {
        adjustPaceBtn.addEventListener('click', () => {
            showPaceAdjustmentModal();
        });
    }
}

function updateGoalProgress() {
    const progressValue = document.querySelector('.progress-value');
    const progressBar = document.querySelector('.progress');
    const timelineProgress = document.querySelector('.timeline-progress');
    
    // Get current progress
    const currentText = progressValue.textContent;
    const match = currentText.match(/(\d+)\/(\d+) lectures/);
    
    if (match) {
        const current = parseInt(match[1]);
        const total = parseInt(match[2]);
        
        // Update progress
        const newCurrent = current + 1;
        const newPercentage = (newCurrent / total) * 100;
        
        // Update UI
        progressValue.textContent = `${newCurrent}/${total} lectures (${newPercentage.toFixed(1)}%)`;
        progressBar.style.width = `${newPercentage}%`;
        timelineProgress.style.width = `${newPercentage}%`;
        
        // Update current date marker
        const currentDate = new Date();
        const currentMarker = document.querySelector('.timeline-marker.current');
        if (currentMarker) {
            currentMarker.textContent = `${currentDate.toLocaleString('default', { month: 'short' })} ${currentDate.getDate()}`;
        }
        
        // Check if goal is completed
        if (newCurrent >= total) {
            const goalStatus = document.querySelector('.goal-status');
            goalStatus.textContent = 'Completed';
            goalStatus.classList.remove('active');
            goalStatus.classList.add('completed');
            
            // Show completion celebration
            showGoalCompletionCelebration();
        }
    }
}

function showPaceAdjustmentModal() {
    // Create modal for pace adjustment
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Adjust Your Learning Pace</h3>
                <button class="close-modal">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="pace-options">
                    <div class="pace-option">
                        <input type="radio" id="pace1" name="pace" value="1" checked>
                        <label for="pace1">
                            <span class="pace-label">1 lecture/day</span>
                            <span class="pace-detail">Complete in 3 months (August 30, 2023)</span>
                        </label>
                    </div>
                    <div class="pace-option">
                        <input type="radio" id="pace2" name="pace" value="2">
                        <label for="pace2">
                            <span class="pace-label">2 lectures/day</span>
                            <span class="pace-detail">Complete in 1.5 months (July 15, 2023)</span>
                        </label>
                    </div>
                    <div class="pace-option">
                        <input type="radio" id="pace3" name="pace" value="3">
                        <label for="pace3">
                            <span class="pace-label">3 lectures/day</span>
                            <span class="pace-detail">Complete in 1 month (July 1, 2023)</span>
                        </label>
                    </div>
                </div>
                <button class="btn btn-primary" id="savePaceBtn">Save Pace</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.remove();
    });
    
    // Save pace functionality
    const saveBtn = modal.querySelector('#savePaceBtn');
    saveBtn.addEventListener('click', () => {
        const selectedPace = document.querySelector('input[name="pace"]:checked').value;
        updateGoalPace(selectedPace);
        modal.remove();
    });
}

function updateGoalPace(pace) {
    const paceValue = document.querySelector('.timeline-item:last-child .timeline-value');
    const targetDate = document.querySelector('.timeline-item:nth-child(2) .timeline-value');
    const insightText = document.querySelector('.insight-card:first-child p');
    
    // Update pace display
    paceValue.textContent = `${pace} lecture${pace > 1 ? 's' : ''}/day`;
    
    // Calculate new target date
    const startDate = new Date('2023-06-01');
    const totalLectures = 90;
    const completedLectures = 15;
    const remainingLectures = totalLectures - completedLectures;
    const daysToComplete = Math.ceil(remainingLectures / pace);
    
    const newTargetDate = new Date(startDate);
    newTargetDate.setDate(startDate.getDate() + daysToComplete);
    
    // Format date
    const formattedDate = newTargetDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Update target date
    targetDate.textContent = formattedDate;
    
    // Update insight text
    const monthsToComplete = (daysToComplete / 30).toFixed(1);
    insightText.textContent = `At your current pace of ${pace} lecture${pace > 1 ? 's' : ''}/day, you'll complete the course on ${formattedDate} (${monthsToComplete} months total).`;
    
    // Update end marker
    const endMarker = document.querySelector('.timeline-marker.end');
    if (endMarker) {
        endMarker.textContent = `${newTargetDate.toLocaleString('default', { month: 'short' })} ${newTargetDate.getDate()}`;
    }
}

function showGoalCompletionCelebration() {
    // Create celebration modal
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content celebration-modal">
            <div class="celebration-icon">
                <i class="fas fa-trophy"></i>
            </div>
            <h2>Congratulations!</h2>
            <p>You've successfully completed the English Speaking Course!</p>
            <div class="celebration-stats">
                <div class="stat-item">
                    <span class="stat-value">90</span>
                    <span class="stat-label">Lectures Completed</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">3</span>
                    <span class="stat-label">Months</span>
                </div>
                <div class="stat-item">
                    <span class="stat-value">100%</span>
                    <span class="stat-label">Goal Achieved</span>
                </div>
            </div>
            <button class="btn btn-primary" id="celebrateBtn">Celebrate!</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Celebration button functionality
    const celebrateBtn = modal.querySelector('#celebrateBtn');
    celebrateBtn.addEventListener('click', () => {
        modal.remove();
        // Add coins or other rewards here
        updateUserCoins(50); // Award 50 coins for completing the goal
    });
}

function updateUserCoins(amount) {
    const coinCount = document.querySelector('#coinCount');
    const currentCoins = parseInt(coinCount.textContent);
    const newCoins = currentCoins + amount;
    
    coinCount.textContent = newCoins;
    
    // Show coin animation
    const coinAnimation = document.createElement('div');
    coinAnimation.className = 'coin-animation';
    coinAnimation.innerHTML = `
        <div class="coin">+${amount}</div>
    `;
    
    document.body.appendChild(coinAnimation);
    
    // Remove animation after it completes
    setTimeout(() => {
        coinAnimation.remove();
    }, 2000);
}

// Progress Tracker
function initializeProgressTracker() {
    // Initialize calendar
    const calendar = document.querySelector('.calendar-grid');
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    days.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.innerHTML = `
            <span class="day-label">${day}</span>
            <div class="day-status"></div>
        `;
        calendar.appendChild(dayElement);
    });
    
    // Initialize performance chart
    const chartContainer = document.querySelector('.chart-container');
    const data = [
        { day: 'Mon', value: 75 },
        { day: 'Tue', value: 85 },
        { day: 'Wed', value: 65 },
        { day: 'Thu', value: 90 },
        { day: 'Fri', value: 80 },
        { day: 'Sat', value: 95 },
        { day: 'Sun', value: 70 }
    ];
    
    data.forEach(item => {
        const bar = document.createElement('div');
        bar.className = 'chart-bar';
        bar.style.height = `${item.value}%`;
        bar.setAttribute('data-label', item.day);
        chartContainer.appendChild(bar);
    });
}

// Settings
function initializeSettings() {
    const settingsForm = document.querySelector('#settingsForm');
    const notificationToggle = document.querySelector('#notificationToggle');
    const emailToggle = document.querySelector('#emailToggle');
    
    // Load saved settings
    const savedSettings = JSON.parse(localStorage.getItem('settings') || '{}');
    if (savedSettings.notifications !== undefined) {
        notificationToggle.checked = savedSettings.notifications;
    }
    if (savedSettings.emailUpdates !== undefined) {
        emailToggle.checked = savedSettings.emailUpdates;
    }
    
    // Save settings on change
    settingsForm.addEventListener('change', () => {
        const settings = {
            notifications: notificationToggle.checked,
            emailUpdates: emailToggle.checked
        };
        localStorage.setItem('settings', JSON.stringify(settings));
    });
}

// Daily Notes
const dailyNotes = document.querySelector('#dailyNotes');
if (dailyNotes) {
    // Load saved notes
    const savedNotes = localStorage.getItem('dailyNotes');
    if (savedNotes) {
        dailyNotes.value = savedNotes;
    }
    
    // Save notes on change
    dailyNotes.addEventListener('input', () => {
        localStorage.setItem('dailyNotes', dailyNotes.value);
    });
}

// Premium Features
function showPremiumFeatures() {
    const premiumSection = document.querySelector('.premium-unlock');
    premiumSection.scrollIntoView({ behavior: 'smooth' });
}

// Logout
function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Welcome modal buttons
    const continueFreeBtn = document.querySelector('.continue-free');
    const goPremiumBtn = document.querySelector('.go-premium');
    
    if (continueFreeBtn) {
        continueFreeBtn.addEventListener('click', closeWelcomeModal);
    }
    
    if (goPremiumBtn) {
        goPremiumBtn.addEventListener('click', () => {
            closeWelcomeModal();
            showPremiumFeatures();
        });
    }
    
    // Logout button
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
});

// Function to load saved data from localStorage
function loadSavedData() {
    // Load goals
    const goals = JSON.parse(localStorage.getItem('userGoals')) || [];
    const goalsContainer = document.querySelector('.goals-container');
    goals.forEach(goal => {
        const goalElement = document.createElement('div');
        goalElement.className = 'goal-item';
        goalElement.innerHTML = `
            <div class="goal-header">
                <h3>${goal.title}</h3>
                <div class="goal-actions">
                    <button class="edit-goal"><i class="fas fa-edit"></i></button>
                    <button class="delete-goal"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <p class="goal-description">${goal.description}</p>
            <div class="progress-bar">
                <div class="progress" style="width: ${(goal.progress / goal.target) * 100}%"></div>
            </div>
            <p class="progress-text">${goal.progress}/${goal.target} days completed</p>
        `;
        goalsContainer.insertBefore(goalElement, document.querySelector('.add-goal'));
    });

    // Load tasks
    const tasks = JSON.parse(localStorage.getItem('userTasks')) || [];
    const tasksContainer = document.querySelector('.tasks-container');
    tasks.forEach(task => {
        const taskElement = document.createElement('div');
        taskElement.className = `task-item ${task.completed ? 'completed' : 'in-progress'}`;
        taskElement.innerHTML = `
            <div class="task-checkbox">
                <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''}>
                <label for="${task.id}"></label>
            </div>
            <div class="task-details">
                <h3>${task.title}</h3>
                <p>${task.description}</p>
            </div>
            <div class="task-time">${task.time}</div>
            <div class="task-proof">
                <button class="btn btn-outline-primary">${task.proof ? 'View Proof' : 'Upload Proof'}</button>
            </div>
        `;
        tasksContainer.insertBefore(taskElement, document.querySelector('.add-task'));
    });
} 

// Initialize target cards
function initializeTargetCards() {
    const targetCards = document.querySelectorAll('.target-card');
    
    targetCards.forEach(card => {
        const uploadAreas = card.querySelectorAll('.upload-area');
        const fileInputs = card.querySelectorAll('.file-input');
        const completeBtn = card.querySelector('.complete-btn');
        
        // Handle file uploads
        uploadAreas.forEach((area, index) => {
            area.addEventListener('click', () => {
                fileInputs[index].click();
            });
            
            fileInputs[index].addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    
                    reader.onload = (event) => {
                        area.classList.add('uploaded');
                        area.innerHTML = `
                            <img src="${event.target.result}" alt="Uploaded image" style="max-width: 100%; max-height: 120px; object-fit: cover;">
                            <p>Click to change</p>
                        `;
                    };
                    
                    reader.readAsDataURL(file);
                }
            });
        });
        
        // Handle complete button
        if (completeBtn) {
            completeBtn.addEventListener('click', () => {
                const category = card.dataset.category;
                const allUploaded = Array.from(uploadAreas).every(area => area.classList.contains('uploaded'));
                
                if (!allUploaded) {
                    alert('Please upload both before and after images to complete the task.');
                    return;
                }
                
                completeBtn.classList.add('verifying');
                completeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Verifying...';
                
                // Simulate verification process
                setTimeout(() => {
                    completeBtn.classList.remove('verifying');
                    completeBtn.classList.add('completed');
                    completeBtn.innerHTML = '<i class="fas fa-check"></i> Completed';
                    
                    // Update status badge
                    const statusBadge = card.querySelector('.target-status');
                    if (statusBadge) {
                        statusBadge.className = 'target-status completed';
                        statusBadge.textContent = 'Completed';
                    }
                    
                    // Add coins or update progress
                    updateUserProgress(category);
                }, 2000);
            });
        }
    });
}

// Update user progress
function updateUserProgress(category) {
    const userData = JSON.parse(localStorage.getItem('userData')) || {
        coins: 0,
        progress: {}
    };
    
    // Add coins based on category
    const coinRewards = {
        study: 50,
        fitness: 40,
        yoga: 30,
        mental: 35,
        free: 25
    };
    
    userData.coins += coinRewards[category] || 0;
    
    // Update progress
    if (!userData.progress[category]) {
        userData.progress[category] = 0;
    }
    userData.progress[category]++;
    
    // Save updated data
    localStorage.setItem('userData', JSON.stringify(userData));
    
    // Update UI
    updateCoinsDisplay();
    updateProgressDisplay();
}

// Update coins display
function updateCoinsDisplay() {
    const userData = JSON.parse(localStorage.getItem('userData')) || { coins: 0 };
    const coinsDisplay = document.querySelector('.coins-display');
    if (coinsDisplay) {
        coinsDisplay.textContent = userData.coins;
    }
    
    // Also update sidebar coin count
    const sidebarCoinCount = document.getElementById('sidebarCoinCount');
    if (sidebarCoinCount) {
        sidebarCoinCount.textContent = userData.coins;
    }
    
    // Update rewards coin count
    updateRewardsCoinCount();
}

// Update progress display
function updateProgressDisplay() {
    const userData = JSON.parse(localStorage.getItem('userData')) || { progress: {} };
    const progressDisplay = document.querySelector('.progress-display');
    if (progressDisplay) {
        const totalProgress = Object.values(userData.progress).reduce((a, b) => a + b, 0);
        progressDisplay.textContent = totalProgress;
    }
}

// Calendar Implementation
function initializeCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    const currentMonthElement = document.getElementById('currentMonth');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    
    // Set to April 2025
    let currentDate = new Date(2025, 3, 1); // April 2025 (month is 0-based)
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    function updateCalendar() {
        // Clear existing calendar
        calendarGrid.innerHTML = '';
        
        // Update month display
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                          'July', 'August', 'September', 'October', 'November', 'December'];
        currentMonthElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;
        
        // Get first day of month and total days
        const firstDay = new Date(currentYear, currentMonth, 1);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const totalDays = lastDay.getDate();
        const startingDay = firstDay.getDay();
        
        // Add day headers
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        dayNames.forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            calendarGrid.appendChild(dayHeader);
        });
        
        // Add empty cells for days before start of month
        for (let i = 0; i < startingDay; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-day empty';
            calendarGrid.appendChild(emptyCell);
        }
        
        // Add days of the month
        const today = new Date();
        for (let day = 1; day <= totalDays; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';
            
            // Check if this is today
            if (day === today.getDate() && 
                currentMonth === today.getMonth() && 
                currentYear === today.getFullYear()) {
                dayCell.classList.add('today');
            }
            
            // Check if this day has passed (for April 2025)
            const currentDayDate = new Date(currentYear, currentMonth, day);
            if (currentDayDate < today) {
                dayCell.classList.add('passed');
            }
            
            dayCell.textContent = day;
            calendarGrid.appendChild(dayCell);
        }
    }
    
    // Event listeners for month navigation
    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        updateCalendar();
    });
    
    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        updateCalendar();
    });
    
    // Initial calendar update
    updateCalendar();
}

// Initialize performance chart
function initializePerformanceChart() {
    const ctx = document.getElementById('performanceChart').getContext('2d');
    
    // Sample data
    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Task Completion',
            data: [75, 85, 65, 90, 80, 95, 70],
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true
        }]
    };
    
    // Chart configuration
    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    };
    
    // Create chart
    new Chart(ctx, config);
    
    // Calculate and display performance analysis
    updatePerformanceAnalysis(data.datasets[0].data);
    
    // Add event listener for refresh button
    const refreshBtn = document.getElementById('refreshAnalysis');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            // Simulate refreshing data with slight variations
            const newData = data.datasets[0].data.map(value => {
                // Add or subtract up to 5 points
                const variation = Math.floor(Math.random() * 10) - 5;
                return Math.max(0, Math.min(100, value + variation));
            });
            
            // Update chart data
            data.datasets[0].data = newData;
            new Chart(ctx, config);
            
            // Update analysis
            updatePerformanceAnalysis(newData);
            
            // Show refresh animation
            refreshBtn.innerHTML = '<i class="fas fa-sync-alt fa-spin"></i> Refreshing...';
            setTimeout(() => {
                refreshBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Refresh';
            }, 1000);
        });
    }
}

// Update performance analysis with new data
function updatePerformanceAnalysis(data) {
    // Calculate average
    const average = data.reduce((sum, value) => sum + value, 0) / data.length;
    document.getElementById('avgPerformance').textContent = `${Math.round(average)}%`;
    
    // Find best day
    const maxValue = Math.max(...data);
    const bestDayIndex = data.indexOf(maxValue);
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    document.getElementById('bestDay').textContent = `${dayNames[bestDayIndex]} (${maxValue}%)`;
    
    // Calculate improvement (comparing first and last day)
    const firstDay = data[0];
    const lastDay = data[data.length - 1];
    const improvement = lastDay - firstDay;
    const improvementElement = document.getElementById('performanceImprovement');
    improvementElement.textContent = `${improvement >= 0 ? '+' : ''}${improvement}%`;
    improvementElement.className = `stat-value ${improvement >= 0 ? 'positive' : 'negative'}`;
    
    // Generate insights
    const insights = [];
    
    // Weekend performance insight
    const weekdayAvg = (data[0] + data[1] + data[2] + data[3] + data[4]) / 5;
    const weekendAvg = (data[5] + data[6]) / 2;
    if (weekendAvg > weekdayAvg + 5) {
        insights.push('You perform best on weekends');
    } else if (weekdayAvg > weekendAvg + 5) {
        insights.push('You perform best on weekdays');
    }
    
    // Find lowest day
    const minValue = Math.min(...data);
    const lowestDayIndex = data.indexOf(minValue);
    insights.push(`${dayNames[lowestDayIndex]} shows a dip in performance`);
    
    // Overall trend
    if (improvement > 0) {
        insights.push('Overall trend is improving');
    } else if (improvement < 0) {
        insights.push('Overall trend is declining');
    } else {
        insights.push('Performance is stable');
    }
    
    // Update insights in the UI
    const insightsList = document.getElementById('performanceInsights');
    if (insightsList) {
        insightsList.innerHTML = '';
        insights.forEach(insight => {
            const li = document.createElement('li');
            li.textContent = insight;
            insightsList.appendChild(li);
        });
    }
}

// Modal functionality
const newTaskModal = document.getElementById('newTaskModal');
const setNewTargetBtn = document.getElementById('setNewTargetBtn');
const closeModal = document.getElementById('closeModal');
const cancelTask = document.getElementById('cancelTask');
const newTaskForm = document.getElementById('newTaskForm');

// Open modal
setNewTargetBtn.addEventListener('click', () => {
    newTaskModal.classList.add('active');
});

// Close modal functions
function closeModalHandler() {
    newTaskModal.classList.remove('active');
    newTaskForm.reset();
}

closeModal.addEventListener('click', closeModalHandler);
cancelTask.addEventListener('click', closeModalHandler);

// Close modal when clicking outside
newTaskModal.addEventListener('click', (e) => {
    if (e.target === newTaskModal) {
        closeModalHandler();
    }
});

// Handle form submission
newTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const category = document.getElementById('taskCategory').value;
    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    
    // Create new task card
    const taskCard = createTaskCard(category, title, description);
    
    // Add to the beginning of the target cards container
    const targetCards = document.querySelector('.target-cards');
    targetCards.insertBefore(taskCard, targetCards.firstChild);
    
    // Close modal and reset form
    closeModalHandler();
});

// Function to create a new task card
function createTaskCard(category, title, description) {
    const card = document.createElement('div');
    card.className = 'target-card';
    card.setAttribute('data-category', category);
    
    // Get category icon
    const iconClass = getCategoryIcon(category);
    
    card.innerHTML = `
        <div class="target-header">
            <div class="target-icon">
                <i class="${iconClass}"></i>
            </div>
            <div class="target-info">
                <h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
                <h4>${title}</h4>
                <p>${description}</p>
            </div>
            <span class="target-status pending">Pending</span>
        </div>
        <div class="target-content">
            <div class="target-upload">
                <div class="upload-section">
                    <h5>Before Task</h5>
                    <div class="upload-area">
                        <i class="fas fa-camera"></i>
                        <p>Click to upload</p>
                        <input type="file" class="file-input" accept="image/*">
                    </div>
                    <button class="btn btn-outline submit-btn">Submit</button>
                </div>
                <div class="upload-section">
                    <h5>After Task (5 images)</h5>
                    <div class="upload-area">
                        <i class="fas fa-camera"></i>
                        <p>Click to upload</p>
                        <input type="file" class="file-input" accept="image/*" multiple>
                    </div>
                    <button class="btn btn-outline submit-btn">Submit</button>
                </div>
            </div>
        </div>
    `;
    
    // Initialize upload functionality for the new card
    initializeUploadAreas(card);
    
    return card;
}

// Function to get category icon
function getCategoryIcon(category) {
    const icons = {
        study: 'fas fa-book',
        fitness: 'fas fa-dumbbell',
        yoga: 'fas fa-pray',
        mental: 'fas fa-brain',
        free: 'fas fa-star'
    };
    return icons[category] || 'fas fa-star';
}

// Function to initialize upload areas
function initializeUploadAreas(card) {
    const uploadAreas = card.querySelectorAll('.upload-area');
    const submitButtons = card.querySelectorAll('.submit-btn');
    
    uploadAreas.forEach((area, index) => {
        const fileInput = area.querySelector('.file-input');
        const submitBtn = submitButtons[index];
        
        area.addEventListener('click', () => {
            fileInput.click();
        });
        
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                area.classList.add('has-file');
                submitBtn.classList.add('verifying');
                submitBtn.textContent = 'Verifying...';
                
                // Simulate verification process
                setTimeout(() => {
                    submitBtn.classList.remove('verifying');
                    submitBtn.textContent = 'Submit';
                    area.classList.add('verified');
                }, 2000);
            }
        });
    });
}

// Initialize upload areas for existing cards
document.querySelectorAll('.target-card').forEach(card => {
    initializeUploadAreas(card);
});

// Initialize rewards section
function initializeRewards() {
    // Update rewards coin count
    updateRewardsCoinCount();
    
    // Add event listeners for redeem buttons
    const redeemButtons = document.querySelectorAll('.reward-item .btn');
    redeemButtons.forEach(button => {
        button.addEventListener('click', function() {
            const rewardItem = this.closest('.reward-item');
            const rewardName = rewardItem.querySelector('h5').textContent;
            const rewardCost = parseInt(rewardItem.querySelector('.reward-cost').textContent);
            
            // Check if user has enough coins
            const userData = JSON.parse(localStorage.getItem('userData')) || { coins: 0 };
            if (userData.coins >= rewardCost) {
                // Deduct coins
                userData.coins -= rewardCost;
                localStorage.setItem('userData', JSON.stringify(userData));
                
                // Update displays
                updateCoinsDisplay();
                updateRewardsCoinCount();
                
                // Show success message
                alert(`Congratulations! You've redeemed "${rewardName}" for ${rewardCost} coins.`);
                
                // Disable button
                this.disabled = true;
                this.textContent = 'Redeemed';
            } else {
                alert(`You don't have enough coins to redeem this reward. You need ${rewardCost} coins.`);
            }
        });
    });
    
    // Add event listener for redeem rewards button
    const redeemRewardsBtn = document.getElementById('redeemRewardsBtn');
    if (redeemRewardsBtn) {
        redeemRewardsBtn.addEventListener('click', function() {
            // Scroll to rewards section
            const rewardsSection = document.querySelector('.rewards-section');
            rewardsSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Add event listener for premium upgrade button
    const premiumUpgradeBtn = document.querySelector('.btn-premium');
    if (premiumUpgradeBtn) {
        premiumUpgradeBtn.addEventListener('click', function() {
            // Show premium upgrade modal or redirect to premium page
            alert('Redirecting to premium upgrade page...');
            // In a real application, you would redirect to the premium page
            // window.location.href = 'premium.html';
        });
    }
}

// Update rewards coin count
function updateRewardsCoinCount() {
    const userData = JSON.parse(localStorage.getItem('userData')) || { coins: 0 };
    const rewardsCoinCount = document.getElementById('rewardsCoinCount');
    if (rewardsCoinCount) {
        rewardsCoinCount.textContent = userData.coins;
    }
} 