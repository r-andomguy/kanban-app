import $ from 'jquery';

class EditTaskModal extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = `
      <div class="modal fade" id="editTaskModal" tabindex="-1" aria-labelledby="editTaskLabel" aria-hidden="true">
        <div class="modal-dialog">
          <form class="modal-content" id="edit-task-form">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="editTaskLabel">Editar Tarefa</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
            </div>
            <div class="modal-body">
              <input type="text" id="task-title" class="form-control mb-3" placeholder="Nome da tarefa" required />
              <input type="text" id="task-description" class="form-control mb-3" placeholder="Descrição" />
              <label for="task-status" class="form-label">Status</label>
              <select id="task-status" class="form-select" required>
                <option value="" disabled>Selecione o status</option>
                <option value="pendente">Pendente</option>
                <option value="em andamento">Em andamento</option>
                <option value="concluído">Concluído</option>
              </select>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary" disabled data-bs-modal="dismiss">Atualizar</button>
            </div>
          </form>
        </div>
      </div>
    `;

    this.$form = null;
    this.$title = null;
    this.$description = null;
    this.$status = null;
    this.$submitBtn = null;
  }

  connectedCallback() {
    this.$form = $(this).find('#edit-task-form');
    this.$title = this.$form.find('#task-title');
    this.$description = this.$form.find('#task-description');
    this.$status = this.$form.find('#task-status');
    this.$submitBtn = this.$form.find('button[type="submit"]');

    this.$form.on('input change', () => {
      const valid = this.$title.val().trim() && this.$status.val();
      this.$submitBtn.prop('disabled', !valid);
    });

    this.$form.on('submit', (e) => {
      e.preventDefault();

      const title = this.$title.val().trim();
      const description = this.$description.val().trim();
      const status = this.$status.val();

      this.dispatchEvent(new CustomEvent('submit-edit', {
        detail: { title, description, status },
        bubbles: true,
      }));

    });
  }

  setTaskData({ title, description, status }) {
    this.$title.val(title || '');
    this.$description.val(description || '');
    this.$status.val(status || '');
    this.$submitBtn.prop('disabled', !(title && status));
  }
}

customElements.define('edit-task-modal', EditTaskModal);