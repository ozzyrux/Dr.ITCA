import { OAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { auth } from "./firebase.js";
import { NotificacionAuth } from "./Notificacion.js";

// Crear el proveedor de Microsoft
const proveedorMicrosoft = new OAuthProvider('microsoft.com');

// Configurar el proveedor
// Configurar el proveedor: solo parámetros genéricos (tenant lo manejamos en Azure)
proveedorMicrosoft.setCustomParameters({
    // Forzar selección de cuenta
    prompt: "select_account",
    // Sugerencia de inicio de sesión (opcional)
    login_hint: "user@itca.edu.sv",
});

// Pedir scopes necesarios en Microsoft Graph / OpenID
// Nota: 'User.Read' es un scope común para obtener info del perfil
proveedorMicrosoft.addScope('openid');
proveedorMicrosoft.addScope('profile');
proveedorMicrosoft.addScope('email');
proveedorMicrosoft.addScope('User.Read');

// Función para iniciar sesión con Microsoft
export async function iniciarSesionConMicrosoft() {
    try {
        const result = await signInWithPopup(auth, proveedorMicrosoft);
        
        // El usuario ha iniciado sesión correctamente
        console.log("Usuario Microsoft:", result.user);
        
        // Mostrar notificación de éxito
        NotificacionAuth(`Bienvenido ${result.user.displayName || result.user.email}`);
        
        // Redirigir a inicio.html después del registro exitoso
        setTimeout(() => {
            window.location.href = "../pages/inicio.html";
        }, 2000);

    } catch (error) {
        console.error("Error al iniciar sesión con Microsoft:", error);
        
        // Manejar errores específicos
        switch (error.code) {
            case 'auth/popup-blocked':
                NotificacionAuth("Por favor permite las ventanas emergentes para iniciar sesión", "Error");
                break;
            case 'auth/popup-closed-by-user':
                NotificacionAuth("Inicio de sesión cancelado", "Error");
                break;
            case 'auth/account-exists-with-different-credential':
                NotificacionAuth("Ya existe una cuenta con este email", "Error");
                break;
            default:
                NotificacionAuth("Error al iniciar sesión con Microsoft", "Error");
        }
    }
}

// Agregar el evento click al botón de Microsoft cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    const btnMicrosoft = document.querySelector('#btnMicrosoft');
    if (btnMicrosoft) {
        btnMicrosoft.addEventListener('click', iniciarSesionConMicrosoft);
    }
});