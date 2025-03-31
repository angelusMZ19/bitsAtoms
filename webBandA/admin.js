document.addEventListener("DOMContentLoaded", function () {
    if (sessionStorage.getItem("isLoggedIn") === "true") {
        showAdminPanel();
    }

    loadCampusPhotos();
    loadMedia();
    loadPodcasts();
    loadTestimonials();
    loadMentors();
});

/* ==========================
   Autenticación
   ========================== */
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === "playerone" && password === "007") {
        sessionStorage.setItem("isLoggedIn", "true");
        showAdminPanel();
    } else {
        document.getElementById("login-error").style.display = "block";
    }
}

function showAdminPanel() {
    document.getElementById("login-container").style.display = "none";
    document.getElementById("admin-panel").style.display = "block";
}

function logout() {
    sessionStorage.removeItem("isLoggedIn");
    location.reload();
}

/* ==========================
   Función para subir fotos del Campus

   ========================== */
   function addCampusPhoto() {
    let fileInput = document.getElementById("new-campus-file");
    let file = fileInput.files[0];

    if (!file) return;

    let reader = new FileReader();
    reader.onload = function (event) {
        let img = new Image();
        img.src = event.target.result;

        img.onload = function () {
            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");

            // Definir tamaño de la imagen reducida (ej. máximo 500px de ancho)
            let maxWidth = 500;
            let scale = maxWidth / img.width;
            canvas.width = maxWidth;
            canvas.height = img.height * scale;

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            
            let compressedData = canvas.toDataURL("image/jpeg", 0.7); // Comprimir a JPEG 70%

            let photos = JSON.parse(localStorage.getItem("campusPhotos")) || [];
            photos.push(compressedData);
            localStorage.setItem("campusPhotos", JSON.stringify(photos));

            loadCampusPhotos();
        };
    };

    reader.readAsDataURL(file);
    fileInput.value = "";
}


function loadCampusPhotos() {
    let photos = JSON.parse(localStorage.getItem("campusPhotos")) || [];
    let container = document.getElementById("campus-gallery");
    container.innerHTML = "";

    photos.forEach((photo, index) => {
        let div = document.createElement("div");
        div.innerHTML = `<img src="${photo}" class="gallery-img"><button onclick="deleteCampusPhoto(${index})">Eliminar</button>`;
        container.appendChild(div);
    });
}

function deleteCampusPhoto(index) {
    let photos = JSON.parse(localStorage.getItem("campusPhotos")) || [];
    photos.splice(index, 1);
    localStorage.setItem("campusPhotos", JSON.stringify(photos));
    loadCampusPhotos();
}

/* ==========================
   Función para subir Multimedia (Fotos/Videos)
   ========================== */
   function addMedia() {
    let input = document.getElementById("media-file-input");
    if (input.files.length === 0) return;
    
    let reader = new FileReader();
    reader.onload = function (e) {
        let media = JSON.parse(localStorage.getItem("multimedia")) || [];
        media.push(e.target.result);
        localStorage.setItem("multimedia", JSON.stringify(media));
        loadMedia();
    };
    reader.readAsDataURL(input.files[0]);
}

function loadMedia() {
    let media = JSON.parse(localStorage.getItem("multimedia")) || [];
    let container = document.getElementById("media-gallery");
    container.innerHTML = "";

    media.forEach((item, index) => {
        let mediaElement = document.createElement(item.includes("video") ? "video" : "img");
        mediaElement.src = item;
        if (item.includes("video")) mediaElement.controls = true;

        let btn = document.createElement("button");
        btn.innerText = "Eliminar";
        btn.onclick = () => deleteMedia(index);

        let div = document.createElement("div");
        div.appendChild(mediaElement);
        div.appendChild(btn);
        container.appendChild(div);
    });
}

function deleteMedia(index) {
    let media = JSON.parse(localStorage.getItem("multimedia")) || [];
    media.splice(index, 1);
    localStorage.setItem("multimedia", JSON.stringify(media));
    loadMedia();
}

function uploadMedia() {
    let url = prompt("Ingresa la URL del archivo multimedia:");
    if (!url) return;

    let media = JSON.parse(localStorage.getItem("multimedia")) || [];
    media.push(url);
    localStorage.setItem("multimedia", JSON.stringify(media));

    loadMedia();
}
/* ==========================
   Función para subir Podcasts
   ========================== */


   function addPodcast() {
    let title = document.getElementById("new-podcast-title").value.trim();
    let url = document.getElementById("new-podcast-cover").value.trim();
    if (!title || !url) return;

    let podcasts = JSON.parse(localStorage.getItem("podcasts")) || [];
    podcasts.push({ title, url });
    localStorage.setItem("podcasts", JSON.stringify(podcasts));
    loadPodcasts();
}

function loadPodcasts() {
    let podcasts = JSON.parse(localStorage.getItem("podcasts")) || [];
    let container = document.getElementById("podcast-list");
    container.innerHTML = "";

    podcasts.forEach((podcast, index) => {
        let div = document.createElement("div");
        div.innerHTML = `<strong>${podcast.title}</strong> - <a href="${podcast.url}" target="_blank">Escuchar</a> <button onclick="deletePodcast(${index})">Eliminar</button>`;
        container.appendChild(div);
    });
}

function deletePodcast(index) {
    let podcasts = JSON.parse(localStorage.getItem("podcasts")) || [];
    podcasts.splice(index, 1);
    localStorage.setItem("podcasts", JSON.stringify(podcasts));
    loadPodcasts();
}




function uploadPodcast() {
    let title = prompt("Ingrese el título del podcast:");
    let url = prompt("...y la URL del podcast:");

    if (!title || !url) return;

    let podcasts = JSON.parse(localStorage.getItem("podcasts")) || [];
    podcasts.push({ title, url });
    localStorage.setItem("podcasts", JSON.stringify(podcasts));

    loadPodcasts();
}

/* ==========================
   Función para subir Testimonios
   ========================== */
   function addTestimonial() {
    let text = document.getElementById("new-testimonial").value.trim();
    let user = document.getElementById("new-author").value.trim();

    if (!text || !user) return;

    let testimonials = JSON.parse(localStorage.getItem("testimonials")) || [];
    testimonials.push({ text, user });
    localStorage.setItem("testimonials", JSON.stringify(testimonials));

    document.getElementById("new-testimonial").value = ""; // Limpiar campos
    document.getElementById("new-author").value = "";

    loadTestimonials();
}

// Función para subir un testimonio manualmente
function uploadTestimonial() {
    let text = prompt("Escribe el testimonio:");
    let user = prompt("Nombre del usuario:");

    if (!text || !user) return;

    let testimonials = JSON.parse(localStorage.getItem("testimonials")) || [];
    testimonials.push({ text, user });
    localStorage.setItem("testimonials", JSON.stringify(testimonials));

    loadTestimonials();
}

// Función para cargar testimonios tanto en la página pública como en la interfaz de administración
function loadTestimonials() {
    let testimonials = JSON.parse(localStorage.getItem("testimonials")) || [];
    
    // Mostrar en el carrusel de testimonios de la página pública
    let publicContainer = document.getElementById("testimonial-carousel");
    if (publicContainer) {
        publicContainer.innerHTML = "";
        testimonials.forEach(testimonial => {
            let div = document.createElement("div");
            div.classList.add("testimonial");
            div.innerHTML = `<p>"${testimonial.text}"</p><span>${testimonial.user}</span>`;
            publicContainer.appendChild(div);
        });
    }

    // Mostrar en la interfaz de administración con opciones de edición y eliminación
    let adminContainer = document.getElementById("testimonials-container");
    if (adminContainer) {
        adminContainer.innerHTML = "";
        testimonials.forEach((testimonial, index) => {
            let div = document.createElement("div");
            div.classList.add("testimonial-item");
            div.innerHTML = `
                <p><strong>${testimonial.user}</strong>: ${testimonial.text}</p>
                <button onclick="editTestimonial(${index})">Editar</button>
                <button onclick="deleteTestimonial(${index})">Eliminar</button>
            `;
            adminContainer.appendChild(div);
        });
    }
}

// Función para eliminar testimonios
function deleteTestimonial(index) {
    let testimonials = JSON.parse(localStorage.getItem("testimonials")) || [];
    testimonials.splice(index, 1);
    localStorage.setItem("testimonials", JSON.stringify(testimonials));
    loadTestimonials();
}

// Función para editar testimonios
function editTestimonial(index) {
    let testimonials = JSON.parse(localStorage.getItem("testimonials")) || [];
    let newText = prompt("Edita el testimonio:", testimonials[index].text);
    let newUser = prompt("Edita el autor:", testimonials[index].user);

    if (newText !== null && newUser !== null) {
        testimonials[index] = { text: newText, user: newUser };
        localStorage.setItem("testimonials", JSON.stringify(testimonials));
        loadTestimonials();
    }
}

/* ==========================
   Función para subir Mentores
   ========================== */

function addMentor() {
    let name = document.getElementById("new-mentor-name").value.trim();
    let bio = document.getElementById("new-mentor-expertise").value.trim();
    let photo = prompt("Ingrese la URL de la foto del mentor:");

    if (!name || !bio || !photo) return;

    let mentors = JSON.parse(localStorage.getItem("mentors")) || [];
    mentors.push({ name, photo, bio });
    localStorage.setItem("mentors", JSON.stringify(mentors));

    document.getElementById("new-mentor-name").value = ""; // Limpiar campos
    document.getElementById("new-mentor-expertise").value = "";

    loadMentors();
}

function uploadMentor() {
    let name = prompt("Ingrese el nombre del mentor:");
    let photo = prompt("Ingrese la URL de la foto del mentor:");
    let bio = prompt("Ingrese una breve biografía:");

    if (!name || !photo || !bio) return;

    let mentors = JSON.parse(localStorage.getItem("mentors")) || [];
    mentors.push({ name, photo, bio });
    localStorage.setItem("mentors", JSON.stringify(mentors));

    loadMentors();
}

function loadMentors() {
    let mentors = JSON.parse(localStorage.getItem("mentors")) || [];
    let container = document.getElementById("mentor-list");

    if (!container) return;
    container.innerHTML = "";

    mentors.forEach((mentor, index) => {
        let div = document.createElement("div");
        div.classList.add("mentor");
        div.innerHTML = `
            <img src="${mentor.photo}" alt="Mentor">
            <h4>${mentor.name}</h4>
            <p>${mentor.bio}</p>
        `;

        let btn = document.createElement("button");
        btn.innerText = "Eliminar";
        btn.onclick = () => deleteMentor(index);

        div.appendChild(btn);
        container.appendChild(div);
    });
}
