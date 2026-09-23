const questions = [

    {
        question: "I think it _____ rain tomorrow.",
        options: ["will", "am going to", "am", "going"],
        answer: "will"
    },

    {
        question: "Look at those clouds! It _____ rain.",
        options: ["will", "is going to", "is", "going"],
        answer: "is going to"
    },

    {
        question: "We _____ our friends tonight.",
        options: ["are meeting", "will meeting", "going meet", "meet will"],
        answer: "are meeting"
    },

    {
        question: "The train _____ at 8:00 PM.",
        options: ["will leaves", "is leaving", "leaves", "going to leave"],
        answer: "leaves"
    },

    {
        question: "Don't worry. I _____ help you.",
        options: ["am going to", "will", "am", "going"],
        answer: "will"
    },

    {
        question: "She has bought a dress because she _____ go to the party.",
        options: ["will", "is going to", "is", "going"],
        answer: "is going to"
    },

    {
        question: "We _____ dinner with our teacher tomorrow.",
        options: ["are having", "will having", "going having", "have will"],
        answer: "are having"
    },

    {
        question: "The movie _____ at 9:30 PM.",
        options: ["will starts", "is going start", "starts", "starting"],
        answer: "starts"
    }

];


let currentQuestion = 0;
let score = 0;


// Elementos HTML
const questionText = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const checkButton = document.getElementById("checkBtn");
const nextButton = document.getElementById("nextBtn");
const resultContainer = document.getElementById("result");


// Verificar que estamos en la página correcta
if (
    questionText &&
    optionsContainer &&
    checkButton &&
    nextButton
) {

    // Cargar pregunta
    function loadQuestion() {

        const question = questions[currentQuestion];

        questionText.textContent = question.question;

        optionsContainer.innerHTML = "";

        resultContainer.textContent = "";

        nextButton.style.display = "none";

        checkButton.style.display = "inline-block";


        question.options.forEach(function (option) {

            const button = document.createElement("button");

            button.textContent = option;

            button.classList.add("answer-option");

            button.addEventListener("click", function () {

                document.querySelectorAll(".answer-option").forEach(function (btn) {
                    btn.classList.remove("selected");
                });

                button.classList.add("selected");

            });

            optionsContainer.appendChild(button);

        });
    }


    // Comprobar respuesta
    checkButton.addEventListener("click", function () {

        const selected = document.querySelector(".answer-option.selected");

        if (!selected) {

            resultContainer.textContent = "Please select an answer.";

            resultContainer.style.color = "#ff9f43";

            return;
        }


        const correctAnswer = questions[currentQuestion].answer;

        if (selected.textContent === correctAnswer) {

            selected.classList.add("correct");

            resultContainer.textContent = "Correct! 🎉";

            resultContainer.style.color = "#20bf6b";

            score++;

        } else {

            selected.classList.add("incorrect");

            resultContainer.textContent =
                "Incorrect. The correct answer is: " + correctAnswer;

            resultContainer.style.color = "#e74c3c";

        }


        // Desactivar respuestas
        document.querySelectorAll(".answer-option").forEach(function (btn) {
            btn.disabled = true;
        });


        checkButton.style.display = "none";

        nextButton.style.display = "inline-block";

    });


    // Siguiente pregunta
    nextButton.addEventListener("click", function () {

        currentQuestion++;

        if (currentQuestion < questions.length) {

            loadQuestion();

        } else {

            showFinalResult();

        }

    });


    // Mostrar resultado final
    function showFinalResult() {

        questionText.textContent = "Practice completed! 🎉";

        optionsContainer.innerHTML = "";

        resultContainer.textContent =
            "Your score: " + score + " / " + questions.length;

        resultContainer.style.color = "#6c63ff";

        checkButton.style.display = "none";

        nextButton.style.display = "none";

    }


    // Iniciar
    loadQuestion();

}
