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
        question: "Which of these would typically NOT made of cast iron?",
        answers: {
        a: "Dutch oven",
        b: "Skillet",
        c: "Ladle",
        d: "Loaf pan"
        },
        correctAnswer: "c"
    },
    {
        question: "You can heat cast iron to temperatures over 450 degrees.",
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
        c: "5-20 years",
        d: "More than 20 years"
        },
        correctAnswer: "d"
    },
    {
        question: "The \"seasoning\" is a layer of hardened oil on the cast iron.",
        answers: {
        a: "True",
        b: "False"
        },
        correctAnswer: "a"
    },
    {
        question: "When was cast iron first used for cooking?",
        answers: {
        a: "Early 1900s",
        b: "Late 1400s",
        c: "Mid 1500s",
        d: "Over 1000 years ago"
        },
        correctAnswer: "d"
    },
    {
        question: "What is the purpose of the seasoning layer?",
        answers: {
        a: "To create a non-stick surface",
        b: "To protect against rust",
        c: "Both A and B",
        d: "Neither A or B"
        },
        correctAnswer: "c"
    },
    {
        question: "Cast iron cookware should NEVER be put in an oven.",
        answers: {
        a: "True",
        b: "False"
        },
        correctAnswer: "b"
    }
];

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const finishButton = document.getElementById('finish');

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

    quizContent.forEach( (currentQuestion, questionNumber) => {

        // Find selected answer
        const answerContainer = answerContainers[questionNumber];
        const selector = 'input[name=question'+questionNumber+']:checked';
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if(getCookieValue("TakenQuiz")=="")
        {
            db.ref(getUUID()+'/quiz/'+questionNumber).set({
                response: userAnswer
            });
        }

        var answerNumber = 0;
        for(var currentAnswer in currentQuestion.answers) 
        {
            if(currentAnswer===currentQuestion.correctAnswer)
            {
                answerContainers[questionNumber].children[answerNumber].style.color = 'green';
            }
            else if(currentAnswer===userAnswer)
            {
                answerContainers[questionNumber].children[answerNumber].style.color = 'red';
            }
            answerNumber++;
        }

        if(userAnswer===currentQuestion.correctAnswer)
        {
            numCorrect++;
        }
    });

    finishButton.style.display="inline";
    resultsContainer.innerHTML = numCorrect + ' out of ' + quizContent.length;

    if(getCookieValue("TakenQuiz")=="")
    {
        setCookie("TakenQuiz", true);
        recordLessonEnd("Quiz");
    }
}

submitButton.addEventListener('click', showResults);
buildQuiz();
