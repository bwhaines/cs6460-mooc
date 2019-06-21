// The code for this quiz was based on a writeup on
// https://www.sitepoint.com/simple-javascript-quiz/

const quizContent = [
{
    question: "You can let cast iron pans soak overnight to clean them.",
    answers: {
    a: "True",
    b: "False"
    },
    correctAnswer: "b"
},
{
    question: "Which of these would NOT made of cast iron?",
    answers: {
    a: "Dutch oven",
    b: "Skillet",
    c: "Ladle",
    d: "Loaf pan"
    },
    correctAnswer: "c"
},
{
    question: "You can heat cast iron to temperatures over 400 degrees.",
    answers: {
    a: "True",
    b: "False"
    },
    correctAnswer: "a"
},
{
    question: "When is it OK to use soap on cast iron?",
    answers: {
    a: "Immediately before cooking",
    b: "When removing rust",
    c: "Both A and B",
    d: "Neither A or B"
    },
    correctAnswer: "b"
},
{
    question: "How long will cast iron last if it's well taken care of?",
    answers: {
    a: "1-3 years",
    b: "3-5 years",
    c: "5-10 years",
    d: "More than 10 years"
    },
    correctAnswer: "d"
},
{
    question: "",
    answers: {
    a: "",
    b: "",
    c: "",
    d: ""
    },
    correctAnswer: ""
},
{
    question: "",
    answers: {
    a: "",
    b: "",
    c: "",
    d: ""
    },
    correctAnswer: ""
},
{
    question: "",
    answers: {
    a: "",
    b: "",
    c: "",
    d: ""
    },
    correctAnswer: ""
}
];

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');

function buildQuiz()
{
    const output = [];

    quizContent.forEach( (currentQuestion, questionNumber) => {

        const answers = [];

        // For each available answer...
        for(letter in currentQuestion.answers)
        {
            // ...add an HTML radio button
            answers.push(
            `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
            </label>`
            );
        }

        // add this question and its answers to the output
        output.push(
            `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>`
        );
    }
    );
    quizContainer.innerHTML = output.join('');
}

function showResults()
{
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;
    let db = firebase.database();

    myQuestions.forEach( (currentQuestion, questionNumber) => {

        // Find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = 'input[name=question'+questionNumber+']:checked';
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if(getCookieValue("TakenQuiz")=="")
        {
            db.ref(getUUID()+'/quiz/'+questionNumber).set({
                response: userAnswer
            })
        }

        if(userAnswer===currentQuestion.correctAnswer)
        {
            numCorrect++;
            answerContainers[questionNumber].style.color = 'lightgreen';
        }
        else
        {
            answerContainers[questionNumber].style.color = 'red';
        }
    });

    resultsContainer.innerHTML = numCorrect + ' out of ' + myQuestions.length;

    setCookie("TakenQuiz", true);
}

submitButton.addEventListener('click', showResults);
