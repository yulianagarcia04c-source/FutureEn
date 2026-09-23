const examQuestions = [

    {
        question: "I think people _____ live on Mars one day.",
        options: ["will", "are going to", "are", "going"],
        answer: "will"
    },

    {
        question: "Look at the sky! It _____ rain.",
        options: ["will", "is going to", "is", "going"],
        answer: "is going to"
    },

    {
        question: "We _____ our grandparents next Sunday.",
        options: ["are visiting", "will visiting", "going visit", "visit will"],
        answer: "are visiting"
    },

    {
        question: "The bus _____ at 7:30 tomorrow morning.",
        options: ["will leaves", "is going to leaves", "leaves", "leaving"],
        answer: "leaves"
    },

    {
        question: "I promise I _____ call you later.",
        options: ["am going to", "will", "am", "going"],
        answer: "will"
    },

    {
        question: "She has planned everything. She _____ study medicine next year.",
        options: ["will", "is going to", "is", "going"],
        answer: "is going to"
    },

    {
        question: "They _____ married next month. The wedding is already organized.",
        options: ["are getting", "will get", "going get", "get will"],
        answer: "are getting"
    },

    {
        question: "The semester _____ on Monday.",
        options: ["will starts", "is starting", "starts", "going to start"],
        answer: "starts"
    },

    {
        question: "The phone is ringing. I _____ answer it.",
        options: ["am going to", "will", "am", "going"],
        answer: "will"
    },

    {
        question: "Watch out! You _____ fall!",
        options: ["will", "are going to", "are", "going"],
        answer: "are going to"
    }

];


let examCurrentQuestion = 0;
let examScore = 0;


// Elementos HTML
const examQuestion = document.getElementById("examQuestion");
const examOptions = document.getElementById("examOptions");
const examNextButton = document.getElementById("examNextBtn");
const examResult = document.getElementById("examResult");
const examProgress = document.getElementById("examProgress");


// Verificar que estamos en examen.html
if (
    examQuestion &&
    examOptions &&
    examNextButton
) {


    // Cargar pregunta
    function loadExamQuestion() {

        const question = examQuestions[examCurrentQuestion];

        examQuestion.textContent = question.question;

        examOptions.innerHTML = "";

        examResult.textContent = "";

        examNextButton.style.display = "none";


        // Mostrar progreso
        if (examProgress) {

            examProgress.textContent =
                "Question " +
                (examCurrentQuestion + 1) +
                " of " +
                examQuestions.length;

        }


        // Crear opciones
        question.options.forEach(function (option) {

            const button = document.createElement("button");

            button.textContent = option;

            button.classList.add("exam-option");


            button.addEventListener("click", function () {

                document.querySelectorAll(".exam-option").forEach(function (btn) {

                    btn.classList.remove("selected");

                });

                button.classList.add("selected");

            });


            examOptions.appendChild(button);

        });

    }


    // Comprobar respuesta
    examNextButton.addEventListener("click", function () {

        const selected =
            document.querySelector(".exam-option.selected");


        if (!selected) {

            examResult.textContent =
                "Please select an answer.";

            examResult.style.color = "#ff9f43";

            return;

        }


        const correctAnswer =
            examQuestions[examCurrentQuestion].answer;


        // Evitar avanzar dos veces
        if (examNextButton.dataset.checked === "true") {

            examCurrentQuestion++;

            examNextButton.dataset.checked = "false";


            if (examCurrentQuestion < examQuestions.length) {

                loadExamQuestion();

            } else {

                showExamResult();

            }

            return;
        }


        // Comprobar respuesta
        if (selected.textContent === correctAnswer) {

            selected.classList.add("correct");

            examResult.textContent =
                "Correct! 🎉";

            examResult.style.color =
                "#20bf6b";

            examScore++;

        } else {

            selected.classList.add("incorrect");

            examResult.textContent =
                "Incorrect. Correct answer: " +
                correctAnswer;

            examResult.style.color =
                "#e74c3c";


            // Mostrar respuesta correcta
            document.querySelectorAll(".exam-option").forEach(function (btn) {

                if (btn.textContent === correctAnswer) {

                    btn.classList.add("correct");

                }

            });

        }


        // Bloquear botones
        document.querySelectorAll(".exam-option").forEach(function (btn) {

            btn.disabled = true;

        });


        examNextButton.dataset.checked = "true";

        examNextButton.textContent = "Next Question";

    });


    // Resultado final
    function showExamResult() {

        examQuestion.textContent =
            "Final Exam Completed! 🎓";

        examOptions.innerHTML = "";


        const percentage =
            Math.round(
                (examScore / examQuestions.length) * 100
            );


        let message;


        if (percentage >= 90) {

            message =
                "Excellent work! You have a very good understanding of future forms.";

        } else if (percentage >= 70) {

            message =
                "Good job! You understand most of the future forms.";

        } else if (percentage >= 50) {

            message =
                "Not bad! Review the lessons and try again.";

        } else {

            message =
                "Keep practicing! Review the Learn section and try the exam again.";

        }


        examResult.innerHTML =
            "<strong>Your score: " +
            examScore +
            " / " +
            examQuestions.length +
            " (" +
            percentage +
            "%)</strong><br><br>" +
            message;


        examNextButton.style.display =
            "none";


        if (examProgress) {

            examProgress.textContent =
                "Exam finished";

        }

    }


    // Iniciar examen
    loadExamQuestion();

}
