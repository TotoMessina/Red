// utils.js
function verificarLogin() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) {
      window.location.href = "login.html";
    }
  }
  
  function cerrarSesion() {
    localStorage.removeItem("usuario");
    window.location.href = "login.html";
  }
  