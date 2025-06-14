class LoginForm extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
      <form id="login-form" class="p-3">
        <div class="mb-3">
          <label for="email">Email</label>
          <input type="text" id="email" class="form-control" placeholder="Digite seu email" />
        </div>
        <div class="mb-4">
          <label for="password">Senha</label>
          <input type="password" id="password" class="form-control" placeholder="Digite sua senha" />
        </div>
        <button type="submit" class="btn btn-primary w-100">Entrar</button>
        <div class="mt-3">
            <div class="register-link-wrapper"> 
                <p class="text-center fst-italic">Ou</p>
                <p class="text-center">
                    <a href="#" id="to-register"class="link-primary">Cadastre-se aqui</a>
                </p>
            </div>
        </div>
      </form>
    `;

   this.querySelector('#login-form').addEventListener('submit', e => {
      e.preventDefault();
      const email = this.querySelector('#email').value;
      const password = this.querySelector('#password').value;
      this.dispatchEvent(new CustomEvent('login-submitted', {
        detail: { email, password },
        bubbles: true,
      }));
    });

    this.querySelector('#to-register').addEventListener('click', e => {
      e.preventDefault();
      this.dispatchEvent(new CustomEvent('show-register', { bubbles: true }));
    });
  }
}

customElements.define('login-form', LoginForm);