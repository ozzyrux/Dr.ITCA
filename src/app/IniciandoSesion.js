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

      console.log(credenciales);

      //Cerrando el modal despues de Iniciar Sesión
      const signupModal = document.querySelector("#InicioSesionModal");
      const modal = bootstrap.Modal.getInstance(signupModal) ||new bootstrap.Modal(signupModal);
      modal.hide();

      //Enviando notificacion de bienvenida
      NotificacionAuth("Bienvenido " + credenciales.user.email);
      // Redirigir a inicio.html después del registro exitoso
      setTimeout(() => {
        window.location.href = "../pages/inicio.html";
      }, 3000);

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