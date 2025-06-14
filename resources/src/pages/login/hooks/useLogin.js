import { loginAPI } from '../../../core/api';


export async function handleLogin({ email, password }) {
    if (!email || !password) throw new Error('Preencha todos os campos');
    if (!email.includes('@')) throw new Error('Email inválido');

  const data = await loginAPI({ email, password });
  

  localStorage.setItem('user', JSON.stringify(data.user));

  location.hash = '#/home';
}