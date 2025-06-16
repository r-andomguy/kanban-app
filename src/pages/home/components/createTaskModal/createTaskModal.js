import $ from 'jquery';

class CreateTaskModal extends HTMLElement {
  constructor() {
    super();
    this.isEditMode = false;
    this.taskId = null;

    this.innerHTML = `
      <div class="modal fade" id="createTaskModal" tabindex="-1" aria-labelledby="createtaskLabel" aria-hidden="true">
        <div class="modal-dialog">
          <form class="modal-content" id="create-task-form">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="createtaskLabel">Criar Tarefa</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fechar"></button>
            </div>
            <div class="modal-body">
              <input type="text" id="task-title" class="form-control mb-3" placeholder="Nome da tarefa" required />
              <input type="text" id="task-description" class="form-control mb-3" placeholder="Descrição"/>
              <label for="task-status" class="form-label">Status</label>
              <select id="task-status" class="form-select" required>
                <option value="" disabled selected>Selecione o status</option>
                <option value="1">A fazer</option>
                <option value="2">Em desenvolvimento</option>
                <option value="3">Concluído</option>
              </select>
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
    const $form = $('#create-task-form');
    const $titleInput = $form.find('#task-title');
    const $descInput = $form.find('#task-description');
    const $statusSelect = $form.find('#task-status');
    const $submitBtn = $form.find('button[type="submit"]');
    const $modalTitle = $form.find('.modal-title');

    const resetForm = () => {
      this.isEditMode = false;
      this.taskId = null;
      $form[0].reset();
      $submitBtn.prop('disabled', true);
      $submitBtn.text('Criar');
      $modalTitle.text('Criar Tarefa');
    };

    const checkFormValidity = () => {
      const hasTitle = $titleInput.val().trim().length > 0;
      const hasStatus = $statusSelect.val() !== null && $statusSelect.val() !== "";
      $submitBtn.prop('disabled', !(hasTitle && hasStatus));
    };

    $form.on('hidden.bs.modal', resetForm);
    $titleInput.on('input', checkFormValidity);
    $statusSelect.on('change', checkFormValidity);

    $form.on('submit', e => {
      e.preventDefault();

      const title = $titleInput.val().trim();
      const description = $descInput.val().trim();
      const statusId = Number($statusSelect.val());

      if (!title || !statusId) return;

      const eventName = this.isEditMode ? 'task-updated' : 'task-created';

      this.dispatchEvent(new CustomEvent(eventName, {
        detail: {
          title,
          description,
          statusId,
          taskId: this.taskId
        },
        bubbles: true,
      }));
    });

  }
}

customElements.define('create-task-modal', CreateTaskModal);
