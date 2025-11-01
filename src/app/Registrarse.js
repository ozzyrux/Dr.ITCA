import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import {auth} from "./firebase.js"
import { NotificacionAuth } from "./Notificacion.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

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

                // Guardar documento de usuario en Firestore con rol por defecto
                try {
                    const db = getFirestore();
                    const userDocRef = doc(db, "usuarios", userCredencial.user.uid);
                    const rol = "usuario";
                    await setDoc(userDocRef, { email, rol });
                } catch (err) {
                    console.warn("No se pudo crear el documento de usuario en Firestore:", err);
                }

                //Cerrando el modal despues de registrarme
                const signupModal = document.querySelector("#registrarModal");
                if (signupModal && window.bootstrap && bootstrap.Modal) {
                    const modal = bootstrap.Modal.getInstance(signupModal) || new bootstrap.Modal(signupModal);
                    if (modal && typeof modal.hide === 'function') modal.hide();
                }

                NotificacionAuth("Bienvenido " + userCredencial.user.email);
                // Redirigir a inicio.html después del registro exitoso
                setTimeout(() => {
                    window.location.href = "../pages/inicio.html";
                }, 1500);
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

