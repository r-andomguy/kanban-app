class Board extends HTMLElement {
  constructor() {
    super();
    this.boardId = this.getAttribute('board-id');
    this.title = this.getAttribute('title') || 'Board sem título';
    this.columns = []; // Array para armazenar colunas
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  render() {
    this.innerHTML = `
      <div class="card h-100">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="card-title mb-0">${this.title}</h5>
            <button class="btn btn-sm btn-outline-primary" id="create-column-btn">
              + Coluna
            </button>
          </div>
          
          <div class="columns-container" style="min-height: 200px;">
            ${this.columns.length === 0 ? `
              <div class="text-center py-4 text-muted">
                Nenhuma coluna criada ainda
              </div>
            ` : `
              <!-- Colunas serão renderizadas aqui -->
            `}
          </div>
        </div>
      </div>
    `;
  }

  setupEventListeners() {
    this.querySelector('#create-column-btn').addEventListener('click', () => {
      this.createNewColumn();
    });
  }

  createNewColumn() {
    const columnName = prompt("Digite o nome da nova coluna:");
    if (columnName && columnName.trim()) {
      this.columns.push({
        id: Date.now(),
        name: columnName.trim(),
        cards: []
      });
      this.render();
    }
  }
}

customElements.define('board-component', Board);