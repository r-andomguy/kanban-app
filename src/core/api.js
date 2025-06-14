import $ from 'jquery';
import { apiCall } from './helper';

const BASE_URL = 'http://127.0.0.1:8000/api';

export function loginAPI({ email, password }) {
  return apiCall({
    url: `${BASE_URL}/login`,
    method: 'POST',
    data: { email, password },
  });
}

export function registerAPI({ name, email, password, passwordConfirmation }) {
  return apiCall({
    url: `${BASE_URL}/register`,
    method: 'POST',
    data: { name, email, password, passwordConfirmation: passwordConfirmation },
  });
}

export function createBoardAPI({ title }) {
  return apiCall({
    url: `${BASE_URL}/boards`,
    method: 'POST',
    data: { title},
  });
}

export function getAllBoardsAPI({}) {
  return apiCall({
    url: `${BASE_URL}/boards`,
    method: 'GET',
  });
}

export function getBoardAPI({id}) {
  return apiCall({
    url: `${BASE_URL}/boards/${id}`,
    method: 'GET',
  });
}
