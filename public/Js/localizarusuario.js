document.addEventListener('DOMContentLoaded', function() {
    const loginLink = document.getElementById('login-link');
    const cartLink = document.getElementById('cart-link');
    const user = JSON.parse(sessionStorage.getItem('user'));
    console.log("Usuario recuperado en index.html:", user);

    if (user) {
      loginLink.href = 'Miperfil.html';
      loginLink.innerHTML = `<i class="fas fa-user"></i> Mi Perfil`;
    } else {
      cartLink.href = 'login.html';
    }
  });