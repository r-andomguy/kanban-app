import $ from 'jquery';
import { apiCall } from './helper';

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
    data: { name, email, password, passwordConfirmation },
  });
}