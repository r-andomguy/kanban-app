import $ from 'jquery';
import 'jqueryrouter';
import { loadHome } from "../pages/home/home.index";
import { loadLogin } from "../pages/login/login.index";

export function initRouter() {
  $.route('/login', () => {
    loadLogin();
  });

  $.route('/home', () => {
    loadHome();
  });

  $.route('*', (e) => {
    if (e.route !== '/login' && e.route !== '/home') {
      $('#app').html('<h2>Página não encontrada</h2>');
    }
  });

  document.addEventListener('DOMContentLoaded', () => {
    $.router.init();
    if (!location.hash || location.hash === '#/') {
      $.router.set('/login');
    }
  })
}