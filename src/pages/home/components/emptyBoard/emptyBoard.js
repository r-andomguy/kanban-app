class EmptyBoard extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <div class="empty-board overflow-x-hidden overflow-y-hidden text-center p-5 border rounded shadow-sm bg-light">
        <h4 class="mb-3">Nenhum board criado ainda</h4>
        <p class="mb-4 text-muted">Comece criando um novo board para organizar suas tarefas.</p>
        <button 
          class="btn btn-primary" 
          id="create-board-btn" 
          data-bs-toggle="modal" 
          data-bs-target="#createBoardModal"
        >
          Criar Board
        </button>
      </div>
    `;
  }
}
customElements.define('empty-board', EmptyBoard);