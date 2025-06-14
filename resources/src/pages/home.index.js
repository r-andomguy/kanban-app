import $ from 'jquery';

export function loadHome() {
  fetch('./pages/home/home.index.html')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(html => {
      $('#app').html(html);
      console.log('Página Home carregada com sucesso');
    })
}