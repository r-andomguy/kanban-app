class AuthWrapper extends HTMLElement {
  constructor() {
    super();
    this.renderLogin();
  }

  renderLogin() {
    this.innerHTML = `<login-form></login-form>`;
    this.querySelector('login-form').addEventListener('show-register', () => {
      this.renderRegister();
    });

    this.querySelector('login-form').addEventListener('login-submitted', e => {
      console.log('Login submitted:', e.detail);
    location.hash = '#/home';
    });
  }

  renderRegister() {
    this.innerHTML = `<register-form></register-form>`;
    this.querySelector('register-form').addEventListener('show-login', () => {
      this.renderLogin();
    });

    this.querySelector('register-form').addEventListener('register-submitted', e => {
      console.log('Register submitted:', e.detail);
    });
  }
}

customElements.define('auth-wrapper', AuthWrapper);