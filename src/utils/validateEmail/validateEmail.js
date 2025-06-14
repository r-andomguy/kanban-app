/**
 * Valida se uma string é um e-mail válido.
 * 
 * @param {string} email - O e-mail a ser validado.
 * @returns {boolean} - Retorna true se o e-mail for válido.
 */
export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}