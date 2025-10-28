import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import {auth} from "./firebase.js"
import { NotificacionAuth } from "./Notificacion.js";

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    //Constante con el formulario
    const signupForm = document.querySelector("#Registrarse-form");

    if (signupForm) {
        //Escuchando el evento submit de forma asincrona
        signupForm.addEventListener("submit", async (e) => {
            //cancelando la carga
            e.preventDefault();

            //constantes de los inputs de email y password
            const email = signupForm["Registrar-Email"].value;
            const password = signupForm["Registrar-Password"].value;

            console.log(email, password);

            //Enviando los objetos, email y contraseña
            try {
                const userCredencial = await createUserWithEmailAndPassword(auth, email, password);
                console.log(userCredencial);

                //Cerrando el modal despues de registrarme
                const signupModal = document.querySelector("#registrarModal");
                const modal = bootstrap.Modal.getInstance(signupModal) || new bootstrap.Modal(signupModal);
                modal.hide();

                NotificacionAuth("Bienvenido " + userCredencial.user.email);
                // Redirigir a inicio.html después del registro exitoso
                setTimeout(() => {
                    window.location.href = "../pages/inicio.html";
                }, 3000);
            } catch(error) {
                //Mostrando notificacion de errores
                if(error.code === "auth/email-already-in-use") {
                    NotificacionAuth("El correo ya esta en uso", "Error");
                } else if(error.code === "auth/invalid-email") {
                    NotificacionAuth("Correo Invalido", "Error");
                } else if(error.code === "auth/weak-password") {
                    NotificacionAuth("La contraseña es demasiado debil. Por favor, usa más de 6 caracteres", "Error");
                } else if(error.code) {
                    NotificacionAuth("Error desconocido", "Error");
                }
            }
        });
    } else {
        console.log("El formulario de registro no se encontró en la página");
    }
});

