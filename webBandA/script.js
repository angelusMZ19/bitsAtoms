let clickCount = 0;
const maxClicks = 15; // Límite de clics antes de bloquearse
const maxParticles = 150; // Número máximo de partículas permitidas en total
let clicksEnabled = true; // Bandera para habilitar/deshabilitar clics

particlesJS("particles-js", {
    particles: {
        number: { value: 100, density: { enable: true, value_area: 400 } },
        color: { value: "#FFFFFF" },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 1, sync: false } },
        line_linked: { enable: true, distance: 150, color: "#becacf", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 8, direction: "none", out_mode: "out" }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "grab" },
            onclick: {
                enable: true,
                mode: "push"
            }
        },
        modes: {
            grab: { distance: 200, line_linked: { opacity: 1 } },
            push: {
                particles_nb: 10,
                out_mode: "destroy"
            }
        }
    },
    retina_detect: true
});

// Función para manejar los clics y el reinicio del conteo
document.getElementById("particles-js").addEventListener("click", function () {
    if (!clicksEnabled) return; // Si los clics están deshabilitados, no hacer nada

    clickCount++; // Aumenta el contador de clics

    if (clickCount >= maxClicks) {
        console.log("Límite alcanzado, deshabilitando clics por 10 segundos.");
        clicksEnabled = false; 
        window.pJSDom[0].pJS.interactivity.events.onclick.enable = false; 

        // Esperar 10 segundos antes de reiniciar el conteo
        setTimeout(() => {
            console.log("Clics habilitados nuevamente.");
            clickCount = 0;
            clicksEnabled = true;
            window.pJSDom[0].pJS.interactivity.events.onclick.enable = true;
        }, 10000);
    }
});





// Función para cambiar la barra de "Nosotros"
function showContent(type) {
    const contentBox = document.getElementById("content-text");
    if (type === "mision") {
        contentBox.innerText = "Nuestra misión es formar líderes digitales...Lorem ipsum dolor sit amet consectetur adipiscing elit felis donec odio, neque inceptos massa aliquam pharetra molestie cum penatibus Accumsan ridiculus sapien eu ut metus morbi mi donec pellentesque, fermentum id luctus bibendum maecenas viverra a litora, eget placerat massa praesent urna inceptos fusce penatibus Parturient commodo suscipit ut turpis fusce consequat sodales id curae maecenas, dapibus faucibus quisque nascetur ligula mi euismod sagittis urna, duis nam vulputate dictum erat potenti eu interdum diam";
    } else if (type === "vision") {
        contentBox.innerText = "Nuestra visión es ser un referente en IA e IoT...Lorem ipsum dolor sit amet consectetur adipiscing elit felis donec odio, neque inceptos massa aliquam pharetra molestie cum penatibus Accumsan ridiculus sapien eu ut metus morbi mi donec pellentesque, fermentum id luctus bibendum maecenas viverra a litora, eget placerat massa praesent urna inceptos fusce penatibus Parturient commodo suscipit ut turpis fusce consequat sodales id curae maecenas, dapibus faucibus quisque nascetur ligula mi euismod sagittis urna, duis nam vulputate dictum erat potenti eu interdum diam";
    } else if (type === "valores") {
        contentBox.innerText = "Nuestros valores son innovación, ética y trabajo en equipo....Lorem ipsum dolor sit amet consectetur adipiscing elit felis donec odio, neque inceptos massa aliquam pharetra molestie cum penatibus Accumsan ridiculus sapien eu ut metus morbi mi donec pellentesque, fermentum id luctus bibendum maecenas viverra a litora, eget placerat massa praesent urna inceptos fusce penatibus Parturient commodo suscipit ut turpis fusce consequat sodales id curae maecenas, dapibus faucibus quisque nascetur ligula mi euismod sagittis urna, duis nam vulputate dictum erat potenti eu interdum diam";
    }
}

// FAQ Toggle
document.addEventListener("DOMContentLoaded", function() {
    const questions = document.querySelectorAll(".faq-question");
    questions.forEach(q => {
        q.addEventListener("click", function() {
            const answer = this.nextElementSibling;
            answer.style.display = answer.style.display === "block" ? "none" : "block";
        });
    });
});
