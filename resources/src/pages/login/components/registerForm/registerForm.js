import $ from 'jquery';
import { validateEmail } from '../../../../utils/validateEmail/validateEmail';
import { updateValidationUI } from '../../../../utils/updateValidationUI/updateValidationUI';

class RegisterForm extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.setupEvents();
  }

  render() {
    this.innerHTML = `
      <form id="register-form" class="p-3 needs-validation" novalidate>
        <div class="mb-3">
          <label for="register-name">Nome</label>
          <input type="text" id="register-name" class="form-control" placeholder="Digite seu nome" />
        </div>
        <div class="mb-3">
          <label for="register-email">Email</label>
          <input type="text" id="register-email" class="form-control" placeholder="Digite seu email" />
          <div class="alert alert-danger mt-2 d-none" role="alert" id="email-alert"></div>
        </div>
        <div class="mb-3">
          <label for="register-password">Senha</label>
          <input type="password" id="register-password" class="form-control" placeholder="Digite sua senha" />
        </div>
        <div class="mb-4">
          <label for="register-confirm-password">Confirme a senha</label>
          <input type="password" id="register-confirm-password" class="form-control" placeholder="Confirme sua senha" />
        </div>
        <div class="alert alert-danger mt-2 d-none" role="alert" id="password-alert"></div>
        <button type="submit" class="btn btn-primary w-100" disabled>Cadastrar</button>
        <p class="text-center mt-3">
          <a href="#" id="to-login" class="link-primary">Já tenho conta</a>
        </p>
      </form>
    `;
  }

  setupEvents() {
    const $form = $(this).find('#register-form');
    const $fields = {
      name: $('#register-name', $form),
      email: $('#register-email', $form),
      password: $('#register-password', $form),
      confirm: $('#register-confirm-password', $form),
      emailAlert: $('#email-alert', $form),
      passAlert: $('#password-alert', $form),
      submitBtn: $('button[type="submit"]', $form),
    };

    const validateForm = () => {
      const name = $fields.name.val().trim();
      const email = $fields.email.val().trim();
      const password = $fields.password.val();
      const confirmPassword = $fields.confirm.val();

      const emailValid = validateEmail(email);
      const passwordLengthValid = password.length >= 6;
      const passwordMatch = password === confirmPassword;

      updateValidationUI($fields.email, $fields.emailAlert, emailValid, 'Email inválido.');
      updateValidationUI($fields.confirm, $fields.passAlert, passwordMatch, 'As senhas não conferem.');
      if (!passwordLengthValid) {
        updateValidationUI($fields.password, $fields.passAlert, false, 'A senha deve ter pelo menos 6 caracteres.');
      } else if (passwordMatch) {
        updateValidationUI($fields.password, $fields.passAlert, true);
      }

      const allFilled = name && email && password && confirmPassword;
      const formValid = emailValid && passwordLengthValid && passwordMatch && allFilled;

      $fields.submitBtn.prop('disabled', !formValid);
      return formValid;
    };

    $form.on('input', '#register-name, #register-email, #register-password, #register-confirm-password', validateForm);

    $form.on('submit', e => {
      e.preventDefault();
      if (!validateForm()) return;

      const name = $fields.name.val().trim();
      const email = $fields.email.val().trim();
      const password = $fields.password.val();
      const confirmPassword = $fields.confirm.val();

      this.dispatchEvent(new CustomEvent('register-submitted', {
        detail: { name, email, password, passwordConfirmation: confirmPassword },
        bubbles: true,
      }));
    });

    $form.find('#to-login').on('click', e => {
      e.preventDefault();
      this.dispatchEvent(new CustomEvent('show-login', { bubbles: true }));
    });
  }
}

customElements.define('register-form', RegisterForm);