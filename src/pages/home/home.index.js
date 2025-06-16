import $ from 'jquery';
import './home.style.scss'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/sidebar/sidebar.js'
import './components/emptyBoard/emptyBoard.js'
import './components/createBoardModal/createBoardModal.js'
import './components/createTaskModal/createTaskModal.js'
import './components/createCategoryModal/createCategoryModal.js'
import './components/userBoard/userBoardWrapper.js'
import './components/boardComponent/boardComponent.js'
import './components/boardColumn/boardColumn.js'
import './components/taskComponent/taskComponent.js'
import './components/editTaskModal/editTaskModal.js'

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