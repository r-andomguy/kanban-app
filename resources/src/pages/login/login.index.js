import $ from 'jquery';

export function loadLogin() {
  fetch('./pages/login/login.index.html')
    .then(response => response.text())
    .then(html => {
      $('#app').html(html);
      console.log('Página de login carregada');
      
      $('#loginForm').on('submit', (e) => {
        e.preventDefault();
        const email = $('#email').val();
        const password = $('#password').val();
        if (email === 'admin' && password === '123') {
          location.hash = '#/home';
        } else {
          alert('Credenciais inválidas');
        }
      });
    })
    .catch(error => {
      console.error('Erro ao carregar login:', error);
      $('#app').html('<p>Erro ao carregar a página de login</p>');
    });
}