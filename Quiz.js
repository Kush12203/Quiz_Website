const questions = [
    {
        question: "How many grand slams has Novak Djokovic won?",
        answers: [
            { text: 21, correct: false },
            { text: 22, correct: false },
            { text: 23, correct: false },
            { text: 24, correct: true },
        ]
    },
    {
        question: "How many centuries does Virat Kohli have now?",
        answers: [
            { text: 81, correct: true },
            { text: 82, correct: false },
            { text: 83, correct: false },
            { text: 84, correct: false },
        ]
    },
    {
        question: "Who has the most centuries in cricket history?",
        answers: [
            { text: "Sachin Tendulkar", correct: true },
            { text: "Virat Kohli", correct: false },
            { text: "Ricky Ponting", correct: false },
            { text: "Kumar Sangakara", correct: false },
        ]
    },
    {
        question: "Who won the 2019 cricket world cup?",
        answers: [
            { text: "India", correct: false },
            { text: "Australia", correct: false },
            { text: "England", correct: true },
            { text: "New Zealand", correct: false },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const total = document.getElementById("total");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState()
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
    total.innerHTML=`Question ${questionNo}/4 `;
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild)
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }
    else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;

    });

    
    nextButton.style.display = "block";

}
function showScore(){
    resetState();
    total.innerHTML='';
    if(score===4){
    questionElement.innerHTML = `Congratulations!! You scored ${score} out of ${questions.
    length}!`; 
    }
    else if(score===3){
        questionElement.innerHTML = `Good,You scored ${score} out of ${questions.
            length}!`; 
    }
    else if(score===2){
        questionElement.innerHTML = `You scored ${score} out of ${questions.
            length}! `; 
    }
    else{
        questionElement.innerHTML = `Better luck next time,You scored ${score} out of ${questions.
            length}!`; 
    }
    nextButton.innerHTML = "Play Again";
    nextButton.style.display="block"; 
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}
nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }

});

startQuiz();
