import $ from 'jquery';
import { handleLogin } from '../../hooks/useLogin';
import { handleRegister } from '../../hooks/useRegister';

class AuthWrapper extends HTMLElement {
  constructor() {
    super();
    this.renderLogin();
  }

  renderLogin() {
    this.innerHTML = `<login-form></login-form>`;

    const loginForm = this.querySelector('login-form');

    loginForm.addEventListener('show-register', () => {
      this.renderRegister();
    });

    loginForm.addEventListener('login-submitted', async (e) => {
      const { email, password } = e.detail;

      const container = this.closest('.container');

      try {
        await handleLogin({ email, password });

        container.dispatchEvent(new CustomEvent('login-result', {
          detail: { success: true, message: 'Login efetuado com sucesso!' },
          bubbles: true,
          composed: true,
        }));

        location.hash = '#/home';
      } catch (err) {
        container.dispatchEvent(new CustomEvent('login-result', {
          detail: { success: false, message: err.message || 'Erro ao efetuar login.' },
          bubbles: true,
          composed: true,
        }));
      }
    });
  }


  renderRegister() {
    this.innerHTML = `<register-form></register-form>`;
    this.querySelector('register-form').addEventListener('register-submitted', async e => {
      const { name, email, password, passwordConfirmation } = e.detail;
      const container = this.closest('.container');

      try {
        await handleRegister({ name, email, password, passwordConfirmation });

        container.dispatchEvent(new CustomEvent('register-result', {
          detail: { success: true, message: 'Cadastro realizado com sucesso!' },
          bubbles: true,
          composed: true,
        }));

        this.renderLogin();
      } catch (err) {
        container.dispatchEvent(new CustomEvent('register-result', {
          detail: { success: false, message: err.message || 'Erro ao cadastrar usuário.' },
          bubbles: true,
          composed: true,
        }));
      }
    });
  }
}

customElements.define('auth-wrapper', AuthWrapper);
