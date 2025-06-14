import $ from 'jquery';
import { updateValidationUI } from '../../../../utils/updateValidationUI/updateValidationUI';
import { validateEmail } from '../../../../utils/validateEmail/validateEmail';

class LoginForm extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.setupEvents();
  }

  render() {
    this.innerHTML = `
      <form id="login-form" class="p-3 needs-validation" novalidate>
        <div class="mb-3">
          <label for="email">Email</label>
          <input type="email" id="email" class="form-control" placeholder="Digite seu email" required />
          <div class="alert alert-danger mt-2 d-none" role="alert" id="email-alert"></div>
        </div>
        <div class="mb-4">
          <label for="password">Senha</label>
          <input type="password" id="password" class="form-control" placeholder="Digite sua senha" />
        </div>
        <button type="submit" class="btn btn-primary w-100">Entrar</button>
        <div class="mt-3 text-center fst-italic">Ou</div>
        <div class="mt-2 text-center">
          <a href="#" id="to-register" class="link-primary">Cadastre-se aqui</a>
        </div>
      </form>
    `;
  }

  setupEvents() {
    const $form = $(this).find('#login-form');

    const $fields = {
      email: $('#email', this),
      password: $('#password', this),
      submitBtn: $('button[type="submit"]', $form),
      emailAlert: $('#email-alert', this),
      toRegisterLink: $('#to-register', this),
    };

    const getTrimmedValues = () => ({
      email: $fields.email.val().trim(),
      password: $fields.password.val().trim(),
    });

    const toggleSubmitButtonState = () => {
      const { email, password } = getTrimmedValues();
      const isFormValid = validateEmail(email) && password.length > 0;
      $fields.submitBtn.prop('disabled', !isFormValid);
    };

    const validateEmailInput = () => {
      const { email } = getTrimmedValues();
      const isValid = !email || validateEmail(email);
      const message = email ? 'Por favor, insira um e-mail válido.' : '';
      updateValidationUI($fields.email, $fields.emailAlert, isValid, message);
    };

    $fields.email.on('input', () => {
      validateEmailInput();
      toggleSubmitButtonState();
    });

    $fields.password.on('input', toggleSubmitButtonState);

    $form.on('submit', e => {
      e.preventDefault();
      const { email, password } = getTrimmedValues();

      if (!email) {
        updateValidationUI($fields.email, $fields.emailAlert, false, 'Por favor, insira seu e-mail.');
        return;
      }

      if (!validateEmail(email)) {
        updateValidationUI($fields.email, $fields.emailAlert, false, 'Por favor, insira um e-mail válido.');
        return;
      }

      updateValidationUI($fields.email, $fields.emailAlert, true);

      this.dispatchEvent(new CustomEvent('login-submitted', {
        detail: { email, password },
        bubbles: true,
      }));
    });

    $fields.toRegisterLink.on('click', e => {
      e.preventDefault();
      this.dispatchEvent(new CustomEvent('show-register', { bubbles: true }));
    });

    toggleSubmitButtonState();
  }
}

customElements.define('login-form', LoginForm);