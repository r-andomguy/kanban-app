import { loginAPI } from '../../../core/api';


export async function handleLogin({ email, password }) {
  const data = await loginAPI({ email, password });
  

  localStorage.setItem('user', JSON.stringify(data.user));

  location.hash = '#/home';
}