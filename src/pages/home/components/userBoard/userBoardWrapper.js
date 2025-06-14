import $ from 'jquery';
import { handleCreateBoard } from '../../hooks/userCreateBoard';
import { useGetBoards, useGetBoard } from '../../hooks/userGetBoards'; 

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

      this.clearError();

      const $sidebar = $(this).find('side-bar');
      if ($sidebar.length) {
        $sidebar[0].setBoards(this.boards);
      }

      if (this.boards.length > 0) {
        const firstBoard = this.boards[0];
        this.showBoard(firstBoard);

        $sidebar[0].setCurrentBoard(firstBoard.id);
      }
    } catch (error) {
      this.showError('Erro ao carregar boards iniciais: ' + (error.message || error));
      console.error('Erro ao carregar boards iniciais:', error);
    }
  }

  render() {
    this.innerHTML = `
      <side-bar></side-bar>
      <div class="board-wrapper-container position-absolute top-50 start-50 translate-middle">
        <div class="alert alert-danger mt-2 d-none position-absolute top-0 end-0" role="alert" id="login-error"></div>    
        <empty-board></empty-board>
      </div>
      <create-board-modal></create-board-modal>
    `;
  }

  setupListeners() {
    this.addEventListener('board-created', async e => {
      const { title } = e.detail;

      try {
        await handleCreateBoard({ title });
        this.clearError();
        this.showBoard({ title });
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

  showBoard(boardData) {
    const $container = $(this).find('.board-wrapper-container');
    $container.empty();

    const board = document.createElement('board-component');
    board.setAttribute('title', boardData.title || 'Board sem título');
    board.setAttribute('board-id', boardData.id || '');
    $container.append(board);
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