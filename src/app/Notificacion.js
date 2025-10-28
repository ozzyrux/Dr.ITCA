

//Función para mostrar mensaje
export function NotificacionAuth(Mensaje, tipo = "Correcto"){
//Codigo de libreria TOASTIFY
Toastify({
  text: Mensaje,
  duration: 3000,
  destination: "https://github.com/apvarun/toastify-js",
  newWindow: true,
  close: true,
  gravity: "botton", // `top` or `bottom`
  position: "left", // `left`, `center` or `right`
  stopOnFocus: true, // Prevents dismissing of toast on hover
  style: {
    //Ternario para manejar colores
    background: tipo === "Correcto" ? "green" : "red"
  },
  onClick: function () {}, // Callback after click
}).showToast();

}