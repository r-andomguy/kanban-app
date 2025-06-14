import { registerAPI } from '../../../core/api';


export async function handleRegister({ name, email, password, passwordConfirmation }) {
  await registerAPI({ name, email, password, passwordConfirmation });

  location.hash = '#login';
}