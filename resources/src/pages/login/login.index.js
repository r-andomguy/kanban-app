import $ from 'jquery';
import './components/loginForm/loginForm.js';
import './components/registerForm/registerForm.js';
import './components/authWrapper/authWrapper.js';
import './login.style.scss';

export function loadLogin() {
  fetch('./pages/login/login.index.html')
    .then(response => response.text())
    .then(html => {
      $('#app').html(html);
      console.log('Página de login carregada');
    })
    .catch(error => {
      console.error('Erro ao carregar login:', error);
      $('#app').html('<p>Erro ao carregar a página de login</p>');
    });
}