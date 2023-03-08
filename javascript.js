const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'RESTART!'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        /* math */
        question: 'What is 2+2?',
        answers: [
            { text: '4', correct: true },
            { text: '22', correct: false }
        ]
    },
    {
        /* geography */
        question: 'Which Italian town is the setting for Romeo and Juliet?',
        answers: [
            { text: 'Verona', correct: true },
            { text: 'Florence', correct: false },
            { text: 'Milan', correct: false },
            { text: 'Venice', correct: false },
        ]
    },
    {
        /* random */
        question: 'It is estimated that there are about ______ different languages.',
        answers: [
            { text: '3200', correct: false },
            { text: '4500', correct: false },
            { text: '7000', correct: true },
            { text: '9000', correct: false },
        ]
    },
    {
        /* history */
        question: 'What was the first message sent by morse code?',
        answers: [
            { text: 'what hast God hath brought', correct: false },
            { text: 'What hath God wrought?', correct: true },
            { text: "God pow'rs me", correct: false },
            { text: 'He endues lighteth', correct: false },
        ]
    },
    {
        /* science */
        question: 'How many moons does Neptune have?',
        answers: [
            { text: '15', correct: false },
            { text: '12', correct: false },
            { text: '14', correct: true },
            { text: '13', correct: false },
        ]
    },
    {
        question: 'What year was the first Batman comic book published?',
        answers: [
            { text: '1940', correct: false },
            { text: '1937', correct: false },
            { text: '1941', correct: false },
            { text: '1939', correct: true },
        ]
    },
]