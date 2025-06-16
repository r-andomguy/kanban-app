import $ from 'jquery';
import { handleCreateBoard } from '../../hooks/useCreateBoard.js';
import '../boardComponent/boardComponent.js'
import { useGetBoards, useGetBoard } from '../../hooks/useGetBoards'; 

class UserBoardWrapper extends HTMLElement {
  constructor() {
    super();
    this.boards = [];
    this.render();
    this.setupListeners();
  }

  async connectedCallback() {
    await this.loadBoards();
  }

  async loadBoards() {
    try {
      this.boards = await useGetBoards();
      console.log(this.boards);
      this.clearError();
      const $sidebar = $(this).find('side-bar');

      if ($sidebar.length) {
        $sidebar[0].setBoards(this.boards);
      }

      const $container = $(this).find('.board-wrapper-container');
      const $containerEmpty = $(this).find('.empty-state');
      const $empty = $containerEmpty.find('empty-board');
      const $board = $container.find('board-component');

      if (this.boards.length > 0) {
        const firstBoard = this.boards[0];
        $empty.hide();
        $board
          .attr('title', firstBoard.title || 'Board sem título')
          .attr('board-id', firstBoard.id || '')
          .css('display', 'block');

        if ($sidebar.length) {
          $sidebar[0].setCurrentBoard(firstBoard.id);
        }
      } else {
        $empty.show();
        $board.css('display', 'none');
      }
    } catch (error) {
      this.showError('Erro ao carregar boards iniciais: ' + (error.message || error));
      console.error('Erro ao carregar boards iniciais:', error);
    }
  }

  render() {
    this.innerHTML = `
      <side-bar></side-bar>
        <div class="board-wrapper-container">
          <board-component style="display: none;"></board-component>
        </div>
        <div class="alert alert-danger mt-2 d-none position-absolute top-0 end-0" role="alert" id="login-error"></div>
        <div class="position-absolute top-50 start-50 translate-middle empty-state">
          <empty-board></empty-board>
        </div>
        <create-board-modal></create-board-modal>
    `;
  }

  setupListeners() {
    this.addEventListener('board-created', async e => {
      const { title } = e.detail;

      try {
        const createdBoard = await handleCreateBoard({ title });
        this.clearError();
        this.showBoard(createdBoard);
      } catch (error) {
        this.showError('Erro ao criar board: ' + (error.message || error));
        console.error('Erro ao criar board:', error);
      }
    });

    this.addEventListener('board-changed', async e => {
      const { boardId } = e.detail;

      try {
        const boardData = await useGetBoard({ id: boardId });
        this.clearError();
        this.showBoard(boardData);
      } catch (error) {
        this.showError('Erro ao carregar board: ' + (error.message || error));
        console.error('Erro ao carregar board', error);
      }
    });
  }

  async showBoard(boardData) {
    await customElements.whenDefined('board-component');

    const $container = $(this).find('.board-wrapper-container');
    const $empty = $container.find('empty-board');
    const $board = $container.find('board-component');

    $empty.hide();

    $board
      .attr('title', boardData.title || 'Board sem tÃ­tulo')
      .attr('board-id', boardData.id || '')
      .css('display', 'block');

    if (typeof $board[0].connectedCallback === 'function') {
      $board[0].connectedCallback();
    }
  }

  showError(message) {
    const $alert = $(this).find('#login-error');
    $alert.text(message).removeClass('d-none');
  }

  clearError() {
    const $alert = $(this).find('#login-error');
    $alert.text('').addClass('d-none');
  }
}

customElements.define('user-board-wrapper', UserBoardWrapper);