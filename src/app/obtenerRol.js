// Importar autenticacion de firebase
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.4.0/firebase-auth.js";
import { auth } from "./firebase.js";
import {getFirestore,doc,getDoc,} from "https://www.gstatic.com/firebasejs/12.4.0/firebase-firestore.js";

export async function obtenerRol(uid) {
  //Obteniendo la base de dato
  const db = getFirestore();

  // creando referencia al documento
  const docRef = doc(db, "usuarios", uid);

  // obteniendo el documento
  const documento = await getDoc(docRef);

  //Verificacion del documento
  if (documento.exists()) {
    // Guardando el rol
    const informacion = documento.data().rol;
    return informacion;
  } else {
    console.warn(`No se encontró el documento de usuario para UID: ${uid}`);
    return null; // Devuelve null o un rol por defecto si no existe
  }
}


try {
  onAuthStateChanged(auth, (user) => {
    if (user) {
        //Imprimiendo el usuario
      console.log("Usuario autenticado:", user);

      // Pasando el id y manejando la promesa
      obtenerRol(user.uid)
        .then((rol) => {
          const Data = {
            id: user.uid,
            email: user.email,
            rol: rol,
          };

          // imprimiendo los datos completos
          console.log("Datos del usuario:", Data);
          sessionStorage.setItem("usuarioLogueado", JSON.stringify(Data));
        })
        .catch((error) => {

          // Capturando errores
          console.error("Error al obtener el rol:", error);
        });
    } else {
      console.log("Sesión cerrada/No autenticado.");
    }

   
    

  });
} catch (error) {
  console.error("Error al configurar el observador de autenticación:", error);
}


