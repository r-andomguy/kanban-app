import $ from 'jquery';
import { handleCreateColumn, useGetAllColumns } from '../../hooks/useCreateColumns';

class BoardComponent extends HTMLElement {
  constructor() {
    super();
    this.boardId = null;
    this.title = 'Board sem título';
    this.columns = [];
  }

  static get observedAttributes() {
    return ['board-id', 'title'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    if (name === 'board-id') {
      this.boardId = newValue;
      this.loadColumns().then(() => {
        this.render();
        this.setupEventListeners();
      });
    }

    if (name === 'title') {
      this.title = newValue;
      this.render();
    }
  }

  async connectedCallback() {
    this.boardId = this.getAttribute('board-id');
    this.title = this.getAttribute('title') || 'Board sem título';

    if (this.boardId) {
      await this.loadColumns();
      this.render();
      this.setupEventListeners();
    }
  }

  async loadColumns() {
    try {
      this.columns = await useGetAllColumns({ id: this.boardId });
    } catch (error) {
      console.error('Erro ao carregar colunas:', error);
      this.columns = [];
    }
  }

  render() {
    const columnsHtml = this.columns.length === 0
      ? `<div class="text-center py-4 text-muted w-100">
           Nenhuma categoria criada ainda
         </div>`
      : this.columns.map(column => `
          <board-column title="${column.title}" column-id="${column.id}" board-id="${this.boardId}"></board-column>
        `).join('');

    const html = `
      <div class="board p-4">
        <div class="card-body mt-2 h-100">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="card-title mb-0">${this.title}</h5>
            <button class="btn btn-sm btn-outline-primary" id="create-column-btn" data-bs-toggle="modal" data-bs-target="#createCategoryModal">
              + Categoria
            </button>
          </div>
          <div class="columns-container d-flex flex-row overflow-auto gap-2" style="min-height: 200px; white-space: nowrap;">
            ${columnsHtml}
          </div>
        </div>
      </div>
      <create-category-modal></create-category-modal>
    `;

    $(this).html(html);
  }

  setupEventListeners() {
    const $createBtn = $(this).find('#create-column-btn');
    $createBtn.off('click');
    $createBtn.on('click', () => {});

    this.removeEventListener('category-created', this._categoryHandler);

    this._categoryHandler = async (event) => {
      const columnName = event.detail.title;
      if (!columnName) return;

      try {
        await handleCreateColumn({ id: this.boardId, title: columnName });
        await this.loadColumns();
        this.render();
        this.setupEventListeners();
      } catch (error) {
        console.error('Erro ao criar coluna:', error);
      }
    };

    this.addEventListener('category-created', this._categoryHandler);
  }

}

customElements.define('board-component', BoardComponent);