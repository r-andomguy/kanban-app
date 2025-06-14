/**
 * Atualiza os estados visuais de validação de um input com alerta.
 * 
 * @param {jQuery} $input 
 * @param {jQuery} $alert
 * @param {boolean} isValid
 * @param {string} message
 */
export function updateValidationUI($input, $alert, isValid, message = '') {
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
}