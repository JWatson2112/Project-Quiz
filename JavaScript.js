let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let quizTimer;
let shuffledQuestions = [];
let incorrectAnswers = [];

const quizApp = document.createElement('div');
quizApp.className = 'quiz-app';
document.body.appendChild(quizApp);

const quizHeader = document.createElement('div');
quizHeader.className = 'quiz-header';
quizApp.appendChild(quizHeader);

const quizTitle = document.createElement('h1');
quizTitle.className = 'quiz-title';
quizTitle.textContent = 'New York Quiz';
quizHeader.appendChild(quizTitle);

const timerDisplay = document.createElement('div');
timerDisplay.className = 'timer-display';
quizApp.appendChild(timerDisplay);

const questionContainer = document.createElement('div');
questionContainer.className = 'question-container';
quizApp.appendChild(questionContainer);

const questionText = document.createElement('h2');
questionText.className = 'question-text';
questionContainer.appendChild(questionText);

const optionsContainer = document.createElement('div');
optionsContainer.className = 'options-container';
quizApp.appendChild(optionsContainer);

const resultsContainer = document.createElement('div');
resultsContainer.className = 'results-container';
quizApp.appendChild(resultsContainer);

const resultsText = document.createElement('p');
resultsText.className = 'results-text';
resultsContainer.appendChild(resultsText);


const questions = [
    {
        question: "What is the capital of New York State?",
        options: ["New York City", "Albany", "Buffalo", "Syracuse"],
        answer: "Albany"
    },
    {
        question: "Which iconic statue is located in New York Harbor?",
        options: ["The Statue of Liberty", "The Lincoln Memorial", "Mount Rushmore", "The Washington Monument"],
        answer: "The Statue of Liberty"
    },
    {
        question: "What is the nickname of New York City?",
        options: ["The Windy City", "The Big Apple", "The City of Angels", "The Motor City"],
        answer: "The Big Apple"
    },
    {
        question: "Which famous park is located in the center of Manhattan?",
        options: ["Yosemite National Park", "Central Park", "Prospect Park", "Hyde Park"],
        answer: "Central Park"
    },
    {
        question: "Which river separates New York from New Jersey?",
        options: ["Mississippi River", "Hudson River", "East River", "Delaware River"],
        answer: "Hudson River"
    },
    {
        question: "What is the name of the famous theater district in NYC known for Broadway shows?",
        options: ["Times Square", "SoHo", "Greenwich Village", "Tribeca"],
        answer: "Times Square"
    },
    {
        question: "Which New York-based stock exchange is the largest in the world by market capitalization?",
        options: ["NASDAQ", "New York Stock Exchange (NYSE)", "Chicago Mercantile Exchange", "London Stock Exchange"],
        answer: "New York Stock Exchange (NYSE)"
    },
    {
        question: "Which famous university is located in Ithaca, New York?",
        options: ["Harvard University", "Cornell University", "Columbia University", "New York University (NYU)"],
        answer: "Cornell University"
    },
    {
        question: "What was the original name of New York City when it was a Dutch colony?",
        options: ["New Rotterdam", "New Holland", "New Amsterdam", "New Haarlem"],
        answer: "New Amsterdam"
    },
    {
        question: "Which New York landmark was once the tallest building in the world?",
        options: ["One World Trade Center", "Chrysler Building", "Empire State Building", "Statue of Liberty"],
        answer: "Empire State Building"
    },
];


function initQuiz() {
    shuffleQuestions();
    loadQuestion();
}


function shuffleQuestions() {
    shuffledQuestions = [...questions];
    for (let i = shuffledQuestions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
    }
}


function startTimer() {
    clearInterval(quizTimer);
    timeLeft = 10;
    updateTimerDisplay();
    
    quizTimer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(quizTimer);
            checkAnswer(null);
        }
    }, 1000);
}

function updateTimerDisplay() {
    timerDisplay.textContent = `Time left: ${timeLeft} seconds`;
    if (timeLeft < 5) {
        timerDisplay.style.color = '#e74c3c';
    } else {
        timerDisplay.style.color = '#7f8c8d';
    }
}


function loadQuestion() {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';
    
    currentQuestion.options.forEach(option => {
        const optionBtn = document.createElement('button');
        optionBtn.className = 'option-btn';
        optionBtn.textContent = option;
        optionBtn.addEventListener('click', () => {
            clearInterval(quizTimer);
            checkAnswer(option);
        });
        optionsContainer.appendChild(optionBtn);
    });
    
    startTimer();
}


function checkAnswer(selectedAnswer) {
    clearInterval(quizTimer);
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const optionButtons = document.querySelectorAll('.option-btn');
    
    optionButtons.forEach(button => {
        button.disabled = true;
        if (button.textContent === currentQuestion.answer) {
            button.classList.add('correct-answer');
        } else {
            button.classList.add('incorrect-answer');
        }
    });
    
    if (selectedAnswer === currentQuestion.answer) {
        score++;
    }
    

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < shuffledQuestions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 1500);
}


function showResults() {
    questionContainer.style.display = 'none';
    optionsContainer.style.display = 'none';
    timerDisplay.style.display = 'none';
    
    resultsContainer.style.display = 'block';
    resultsText.textContent = `You scored ${score} out of ${shuffledQuestions.length}!`;
}


initQuiz();