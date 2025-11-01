import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { auth } from "./firebase.js";
import { obtenerRol } from "./obtenerRol.js"; // Tu módulo para obtener el rol

async function verificar() {
  // Esperar a que el componente personalizado `app-navbar` esté definido
  try {
    await customElements.whenDefined("app-navbar");
  } catch (err) {
    // Si algo falla, seguimos igual; `whenDefined` puede fallar en navegadores antiguos
    console.warn("customElements.whenDefined falló o no está disponible:", err);
  }

  onAuthStateChanged(auth, (user) => {
    // 1. Encontrar el componente de la navbar (la etiqueta personalizada)
    const navbarComponente = document.querySelector("app-navbar");

    if (navbarComponente) {
      // 2. Encontrar el ítem de administración DENTRO del componente
      const adminNavItem = navbarComponente.querySelector("#nav-item-admin");

      if (!user) {
        // Si no hay usuario, ocultar todo
        if (adminNavItem) adminNavItem.style.display = "none";
        return;
      }

      // Si hay usuario, obtener el rol
      obtenerRol(user.uid)
        .then((rol) => {
          if (adminNavItem) {
            // 3. Mostrar el ítem SOLO si el rol NO es "usuario" (asumiendo que "administrador" es el rol que debe verlo)
            if (rol === "admin") {
              // O si quieres que lo vea, cambia la lógica
              adminNavItem.style.display = "list-item"; // O 'block'
            } else {
              adminNavItem.style.display = "none";
            }
          }
        })
        .catch((error) => {
          console.error(
            "Error al obtener el rol, ocultando por precaución:",
            error
          );
          if (adminNavItem) adminNavItem.style.display = "none";
        });
    }
  });
}

// Inicia la verificación cuando la página cargue o inmediatamente si ya se cargó
function startVerification() {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", verificar);
  } else {
    // Ya cargado
    verificar();
  }
}

startVerification();
