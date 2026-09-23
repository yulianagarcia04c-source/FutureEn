const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

const nextButton = document.getElementById("nextBtn");
const prevButton = document.getElementById("prevBtn");

let currentSlide = 0;


// Verificar que existan los elementos
if (slides.length > 0 && nextButton && prevButton) {

    // Mostrar un slide
    function showSlide(index) {

        // Si llegamos al último
        if (index >= slides.length) {
            index = 0;
        }

        // Si retrocedemos desde el primero
        if (index < 0) {
            index = slides.length - 1;
        }

        // Ocultar todos los slides
        slides.forEach((slide) => {
            slide.classList.remove("active-slide");
        });

        // Quitar estado activo de los puntos
        dots.forEach((dot) => {
            dot.classList.remove("active-dot");
        });

        // Mostrar slide actual
        slides[index].classList.add("active-slide");

        // Activar punto correspondiente
        if (dots[index]) {
            dots[index].classList.add("active-dot");
        }

        currentSlide = index;
    }


    // Botón siguiente
    nextButton.addEventListener("click", function () {
        showSlide(currentSlide + 1);
    });


    // Botón anterior
    prevButton.addEventListener("click", function () {
        showSlide(currentSlide - 1);
    });


    // Puntos del slider
    dots.forEach((dot, index) => {

        dot.addEventListener("click", function () {
            showSlide(index);
        });

    });


    // Cambio automático cada 5 segundos
    setInterval(function () {
        showSlide(currentSlide + 1);
    }, 5000);


    // Mostrar el primer slide
    showSlide(0);
}
