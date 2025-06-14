class RegisterForm extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <form id="register-form" class="p-3">
        <div class="mb-3">
          <label for="register-email">Email</label>
          <input type="text" id="register-email" class="form-control" placeholder="Digite seu email" />
        </div>
        <div class="mb-3">
          <label for="register-password">Senha</label>
          <input type="password" id="register-password" class="form-control" placeholder="Digite sua senha" />
        </div>
        <div class="mb-4">
          <label for="register-confirm-password">Confirme a senha</label>
          <input type="password" id="register-confirm-password" class="form-control" placeholder="Confirme sua senha" />
        </div>
        <button type="submit" class="btn btn-primary w-100">Cadastrar</button>
        <p class="text-center mt-3">
          <a href="#" id="to-login" class="link-primary">Já tenho conta</a>
        </p>
      </form>
    `;

    this.querySelector('#register-form').addEventListener('submit', e => {
      e.preventDefault();
      const email = this.querySelector('#register-email').value;
      const password = this.querySelector('#register-password').value;
      const confirmPassword = this.querySelector('#register-confirm-password').value;

      if (password !== confirmPassword) {
        alert('As senhas não conferem!');
        return;
      }

      this.dispatchEvent(new CustomEvent('register-submitted', {
        detail: { email, password },
        bubbles: true,
      }));
    });

    this.querySelector('#to-login').addEventListener('click', e => {
      e.preventDefault();
      this.dispatchEvent(new CustomEvent('show-login', { bubbles: true }));
    });
  }
}
customElements.define('register-form', RegisterForm);