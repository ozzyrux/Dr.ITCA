import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import {auth} from "./firebase.js"
import { NotificacionAuth } from "./Notificacion.js";


//Esperando a que cargue el DOM
document.addEventListener('DOMContentLoaded', () => {
//Capturando el formulario
const InicioSesion = document.querySelector("#sesion-form");

if(InicioSesion){
  //Capturando el evento
  InicioSesion.addEventListener("submit", async (e) => {
    //detiendo el submit parcialmente
    e.preventDefault();

    //capturando datos
    const email = InicioSesion["InicioSesion-email"].value;
    const password = InicioSesion["InicioSesion-password"].value;

    try {
      //Ejecutando la funcion y enviando credenciales
      const credenciales = await signInWithEmailAndPassword(auth,email,password);

      console.log('LAS CREDENCIAAAALES: '+credenciales);

      //Cerrando el modal despues de Iniciar Sesión (sólo si existe y bootstrap está cargado)
      const signupModal = document.querySelector("#InicioSesionModal");
      if (signupModal && window.bootstrap && bootstrap.Modal) {
        const modal = bootstrap.Modal.getInstance(signupModal) || new bootstrap.Modal(signupModal);
        if (modal && typeof modal.hide === 'function') modal.hide();
      }

      //Enviando notificacion de bienvenida
      NotificacionAuth("Bienvenido " + credenciales.user.email);
      console.log("Usuario IniciadOOOOOOOOOOOOOOOOOOOOO");

      sessionStorage.setItem("usuarioLogueado", credenciales);
      // Redirigir a inicio.html después del registro exitoso
      setTimeout(() => {
        window.location.href = "../pages/inicio.html";
      }, 1000);

      //Capturando errores
    } catch (error) {
        console.error('Error completo:', error);
        
        if(error.code === "auth/invalid-credential"){
            NotificacionAuth("Credenciales Invalidas", "Error");
        
        }else if(error.code){
            NotificacionAuth("Error desconocido", "Error");
        }else if(error.code = "auth/too-many-requests"){
            NotificacionAuth("Demasiado intentos. Prueba mas tarde", "Error")
        }
        
}
  });

}else{
 console.log("No se encontro el formulario");
 
}
});