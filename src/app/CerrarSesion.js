//Importaciones de firebase
import { signOut } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { auth } from "./firebase.js";
import { NotificacionAuth } from "./Notificacion.js";

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    //Guardando en constante el boton
    const salirSesion = document.querySelector("#salir");

    //Verficandod que el boton este cargado
    if (salirSesion) {
        //Saliendo de la sesion
        salirSesion.addEventListener("click", async (e) => {
            e.preventDefault();
            await signOut(auth);
            console.log("Usuario Saliendo");

            //Notificando
            NotificacionAuth("Saliendo del sistema");
            sessionStorage.removeItem("usuarioLogueado");

            setTimeout(() => {
                //Redirigiendo al index
                window.location.href = "../src/index.html";
            }, 1000);
        });
    } else {
        console.log("El botón de salir no se encontró en la página");
    }
});
