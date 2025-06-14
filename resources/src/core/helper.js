import $ from 'jquery';

export function apiCall({ url, method = 'GET', data = null }) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url,
      method,
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