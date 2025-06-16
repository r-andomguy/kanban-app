import $ from 'jquery';

class CreatecategoryModal extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <div class="modal fade" id="createCategoryModal" tabindex="-1" aria-labelledby="createcategoryLabel" aria-hidden="true">
        <div class="modal-dialog">
          <form class="modal-content" id="create-category-form">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="createcategoryLabel">Criar</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
            </div>
            <div class="modal-body">
              <input type="text" id="category-title" class="form-control" placeholder="Nome da categoria" required />
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary" data-bs-dismiss="modal" disabled>Criar</button>
            </div>
          </form>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    const $form = $('#create-category-form');
    const $input = $form.find('#category-title');
    const $submitBtn = $form.find('button[type="submit"]');

    $submitBtn.prop('disabled', true);

    $input.on('input', () => {
      const hasValue = $input.val().trim().length > 0;
      $submitBtn.prop('disabled', !hasValue);
    });

    $form.on('submit', e => {
      e.preventDefault();
      const title = $input.val().trim();
      if (!title) return;

      this.dispatchEvent(new CustomEvent('category-created', {
        detail: { title },
        bubbles: true,
      }));

      $input.val('');
      $submitBtn.prop('disabled', true);
    });
  }
}

customElements.define('create-category-modal', CreatecategoryModal);
