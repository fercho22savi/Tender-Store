// Simulación de usuario con cuenta
const user = {
  name: "Fernando Saldaña",
  email: "fernando@example.com",
  active: true,
};

// Mostrar nombre en la ventana
document.getElementById("username").textContent = user.name;

// Eventos de los botones
document.getElementById("btnProfile").addEventListener("click", () => {
  alert(`👤 Perfil de ${user.name}\n📧 Email: ${user.email}`);
});

document.getElementById("btnSettings").addEventListener("click", () => {
  alert("⚙️ Aquí iría la configuración de la cuenta.");
});

document.getElementById("btnLogout").addEventListener("click", () => {
  const confirmLogout = confirm("¿Seguro que deseas cerrar sesión?");
  if (confirmLogout) {
    alert("Sesión cerrada. ¡Hasta pronto!");
    // Aquí podrías redirigir a login.html, por ejemplo:
    // window.location.href = "login.html";
  }
});
