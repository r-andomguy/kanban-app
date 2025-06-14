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

      const $bgLogin = $('#app').find('.bg-login');
      const $loginError = $bgLogin.find('#login-error');
      const $loginSuccess = $bgLogin.find('#login-success');

      const showAlert = ($el, message) => {
        $el.text(message).removeClass('d-none');
      };

      const hideAlerts = () => {
        $loginError.addClass('d-none');
        $loginSuccess.addClass('d-none');
      };

      $bgLogin.on('login-result', (event) => {
        hideAlerts();
        const { success, message } = event.originalEvent.detail;

        if (success) {
          showAlert($loginSuccess, message);
        } else {
          showAlert($loginError, message);
        }
      });

      $bgLogin.on('register-result', (e) => {
        const { success, message } = e.originalEvent.detail;

        const $error = $('#login-error');
        const $success = $('#login-sucess');

        if (success) {
          $error.addClass('d-none');
          $success.removeClass('d-none').text(message);
        } else {
          $success.addClass('d-none');
          $error.removeClass('d-none').text(message);
        }
      });

    })
    .catch(error => {
      console.error('Erro ao carregar login:', error);
      $('#app').html('<p>Erro ao carregar a página de login</p>');
    });
}