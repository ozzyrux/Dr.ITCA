
const usuarioLogueado = JSON.parse(sessionStorage.getItem("usuarioLogueado")) || {
    id: "Sin CARNET",
    nombre: "Sin NOMBRE",
    email: "Sin EMAIL",
};


const form = document.querySelector("form");
const btnCancelar = document.querySelector(".btn-danger");
const btnConfirmarCancelar = document.getElementById("confirmarCancelar");


const campos = {
    nombre: document.getElementById("nombre"),
    carnet: document.getElementById("carnet"),
    telefono: document.getElementById("telefono"),
    carrera: document.getElementById("carrera"),
    anio: document.getElementById("año"),
    direccion: document.getElementById("direccion"),
    alergias: document.getElementById("alergias"),
};


const profileName = document.getElementById("profileName");
const profileCarnet = document.getElementById("profileCarnet");
const profileEmail = document.getElementById("profileEmail");
const profilePhone = document.getElementById("profilePhone");


function cargarPerfil() {
    const perfilGuardado = localStorage.getItem(`perfil_${usuarioLogueado.id}`);

    if (perfilGuardado) {
        const datos = JSON.parse(perfilGuardado);
        campos.nombre.value = datos.nombre || "";
        campos.carnet.value = datos.carnet || "";
        campos.telefono.value = datos.telefono || "";
        campos.carrera.value = datos.carrera || "";
        campos.anio.value = datos.anio || "";
        campos.direccion.value = datos.direccion || "";
        campos.alergias.value = datos.alergias || "";
    }

    mostrarDatosCard(); 
}


function mostrarDatosCard() {

    const perfilGuardado = JSON.parse(localStorage.getItem(`perfil_${usuarioLogueado.id}`));
    console.log("Perfil guardado:", perfilGuardado);

    profileName.textContent = perfilGuardado.nombre;
    profileEmail.textContent = usuarioLogueado.email;

    if (perfilGuardado) {
        profileCarnet.textContent = perfilGuardado.carnet || "Carnet no registrado";
        profilePhone.textContent = perfilGuardado.telefono || "Teléfono no registrado";
    } else {
        profileCarnet.textContent = "Carnet no registrado";
        profilePhone.textContent = "Teléfono no registrado";
    }
}


form.addEventListener("submit", (e) => {
    e.preventDefault();

    const perfil = {
        idUsuario: usuarioLogueado.id,
        nombre: campos.nombre.value,
        carnet: campos.carnet.value,
        telefono: campos.telefono.value,
        carrera: campos.carrera.value,
        anio: campos.anio.value,
        direccion: campos.direccion.value,
        alergias: campos.alergias.value,
    };

    localStorage.setItem(`perfil_${usuarioLogueado.id}`, JSON.stringify(perfil));

    Toastify({
        text: "✅ Cambios guardados correctamente",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#28a745",
    }).showToast();

    mostrarDatosCard(); 
});


btnCancelar.addEventListener("click", () => {
    const modal = new bootstrap.Modal(document.getElementById("modalConfirmarCancelar"));
    modal.show();
});

btnConfirmarCancelar.addEventListener("click", () => {
    Object.values(campos).forEach((campo) => (campo.value = ""));
    localStorage.removeItem(`perfil_${usuarioLogueado.id}`);

    const modal = bootstrap.Modal.getInstance(document.getElementById("modalConfirmarCancelar"));
    modal.hide();

    Toastify({
        text: "🗑️ Datos eliminados correctamente",
        duration: 3000,
        gravity: "top",
        position: "right",
        backgroundColor: "#dc3545",
    }).showToast();

    mostrarDatosCard(); 
});

document.addEventListener("DOMContentLoaded", cargarPerfil);
