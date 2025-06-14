import $ from 'jquery';

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
  const $email = $(this).find('#email');
  const $password = $(this).find('#password');
  const $submitBtn = $form.find('button[type="submit"]');
  const $emailAlert = $(this).find('#email-alert');

  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const updateValidationUI = ($input, $alert, isValid, message = '') => {
    const value = $input.val().trim();

    if (!value) {
      $input.removeClass('is-valid is-invalid');
      $alert.addClass('d-none').text('');
      return;
    }

    $input.toggleClass('is-valid', isValid);
    $input.toggleClass('is-invalid', !isValid);

    if (!isValid && message) {
      $alert.text(message).removeClass('d-none');
    } else {
      $alert.addClass('d-none').text('');
    }
  };


  const toggleSubmitButtonState = () => {
    const emailVal = $email.val().trim();
    const passVal = $password.val().trim();
    const isFormValid = validateEmail(emailVal) && passVal.length > 0;
    $submitBtn.prop('disabled', !isFormValid);
  };

  $email.on('input', () => {
    const emailVal = $email.val().trim();
    if (!emailVal) {
      updateValidationUI($email, $emailAlert, true);
    } else {
      updateValidationUI($email, $emailAlert, validateEmail(emailVal), 'Por favor, insira um e-mail válido.');
    }
    toggleSubmitButtonState();
  });

  $password.on('input', toggleSubmitButtonState);

  $form.on('submit', e => {
    e.preventDefault();

    const emailVal = $email.val().trim();
    const passVal = $password.val();

    if (!emailVal) {
      updateValidationUI($email, $emailAlert, false, 'Por favor, insira seu e-mail.');
      return;
    }

    if (!validateEmail(emailVal)) {
      updateValidationUI($email, $emailAlert, false, 'Por favor, insira um e-mail válido.');
      return;
    }

    updateValidationUI($email, $emailAlert, true);

    this.dispatchEvent(new CustomEvent('login-submitted', {
      detail: { email: emailVal, password: passVal },
      bubbles: true,
    }));
  });

  $(this).find('#to-register').on('click', e => {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent('show-register', { bubbles: true }));
  });

  toggleSubmitButtonState();
}
}

customElements.define('login-form', LoginForm);