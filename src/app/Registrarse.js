import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import {auth} from "./firebase.js"
import { NotificacionAuth } from "./Notificacion.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    //Constante con el formulario
    const signupForm = document.querySelector("#Registrarse-form");

    if (signupForm) {
        let userCredencial = null;
        //Escuchando el evento submit de forma asincrona
        const siguientePasobtn = document.querySelector('#siguientePaso');
            if (siguientePasobtn) {
            siguientePasobtn.addEventListener("click", async (e) => {
            //cancelando la carga
            e.preventDefault();

            //constantes de los inputs de email y password
            const email = signupForm["Registrar-Email"].value;
            const password = signupForm["Registrar-Password"].value;

            if(!email || !password) {
                NotificacionAuth("Por favor complete todos los campos", "Error");
                return;
            }
            console.log(email, password);

            //Enviando los objetos, email y contraseña
            try {
                userCredencial = await createUserWithEmailAndPassword(auth, email, password);
                console.log(userCredencial);

                document.querySelector("#paso1").style.display = "none";
                document.querySelector("#paso2").style.display = "block";
            }catch (error) {
                if(error.code === "auth/email-already-in-use") {
                    NotificacionAuth("El correo ya esta en uso", "Error");
                } else if(error.code === "auth/invalid-email") {
                    NotificacionAuth("Correo Invalido", "Error");
                } else if(error.code === "auth/weak-password") {
                    NotificacionAuth("La contraseña es muy debil", "Error");
                } else if(error.code) {
                    NotificacionAuth("Error desconocido", "Error");
                }
            }
            });
        }

        //listening al evento submit del form
        signupForm.addEventListener("submit",  async (e) => {
            e.preventDefault();

            if (!userCredencial) {
                NotificacionAuth("Por favor complete el primer paso del registro", "Error");
                return;
            }

            //traer los datos del paso 2
            const nombre = signupForm["Registrar-Nombre"].value;
            const carnet = signupForm["Registrar-Carnet"].value;
            const telefono = signupForm["Registrar-Telefono"].value;
            const carrera = signupForm["Registrar-Carrera"].value;
            const anio = signupForm["Registrar-Anio"].value;
            const direccion = signupForm["Registrar-Direccion"].value;
            const email = signupForm["Registrar-Email"].value;
            
            //validar
            if(!nombre || !carnet || !telefono || !carrera || !anio || !direccion) {
                NotificacionAuth("Por favor complete todos los campos", "Error");
                return;
            }

            // Guardar documento de usuario en Firestore con rol por defecto
            const rol = "usuario";
                try {
                    const db = getFirestore();
                    const userDocRef = doc(db, "usuarios", userCredencial.user.uid);
                    await setDoc(userDocRef, { email, rol, nombre, carnet, telefono, carrera, anio, direccion });
                } catch (err) {
                    console.warn("No se pudo crear el documento de usuario en Firestore:", err);
                    NotificacionAuth("Error al guardar los datos del usuario", "Error");
                    return;
                }

                // Guardar en el localStorage
                const perfil = {
                    uid: userCredencial.user.uid,
                    email,
                    nombre,
                    carnet,
                    telefono,
                    carrera,
                    anio,
                    direccion,
                    rol
                };
                localStorage.setItem(`perfil_${userCredencial.user.uid}`, JSON.stringify(perfil));

                //guardar sesion
                const usuarioLogueado = {
                    id: userCredencial.user.uid,
                    email,
                    rol
                };
                sessionStorage.setItem("usuarioLogueado", JSON.stringify(usuarioLogueado));


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
            });
    } else {
        console.log("El formulario de registro no se encontró en la página");
    }
});

