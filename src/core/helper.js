import $ from 'jquery';
import { getToken } from './auth';

export function apiCall({ url, method = 'GET', data = null }) {
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return new Promise((resolve, reject) => {
    $.ajax({
      url,
      method,
      headers,
      contentType: 'application/json',
      data: data ? JSON.stringify(data) : undefined,
      xhrFields: {
        withCredentials: true,
      },
      success: resolve,
      error: (xhr) => {
        const errorData = xhr.responseJSON || { message: 'Erro no sistema' };
        reject(new Error(errorData.message));
      },
    });
  });
}