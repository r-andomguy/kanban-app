import $ from "jquery";
import { useGetTask, handleUpdateTask } from "../../hooks/useCreateTasks";

class TaskComponent extends HTMLElement {
  constructor() {
    super();
    this.isExpanded = false;

    this.taskId = this.getAttribute('task-id');
    this.categoryId = this.getAttribute('category-id');
    this.boardId = this.getAttribute('board-id');
    this.title = this.getAttribute('title') || 'Tarefa sem título';
    this.description = this.getAttribute('description') || 'Sem descrição';
    this.status = this.getAttribute('status') || 'pendente';

    this.innerHTML = `
      <div class="card my-2" task-id="${this.taskId}">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h6 class="mb-0">${this.title}</h6>
            <span class="badge bg-secondary text-capitalize">${this.status}</span>
          </div>
          <div class="description" style="display: none;">
            <p class="mb-2">${this.description}</p>
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-sm btn-outline-primary" id="toggle-description-btn">Expandir</button>
            <button 
              class="btn btn-sm btn-outline-success open-task-modal" 
              id="edit-task-btn" 
              data-bs-toggle="modal" 
              data-bs-target="#editTaskModal"
            >Editar</button>
            <button class="btn btn-sm btn-outline-danger" id="delete-task-btn">Deletar</button>
          </div>
        </div>
      </div>
      <edit-task-modal></edit-task-modal>
    `;

    this.setupEvents();
  }

  setupEvents() {
    const toggleBtn = this.querySelector('#toggle-description-btn');
    const editBtn = this.querySelector('#edit-task-btn');
    const deleteBtn = this.querySelector('#delete-task-btn');
    const descEl = this.querySelector('.description');

    toggleBtn.addEventListener('click', () => {
      this.isExpanded = !this.isExpanded;
      descEl.style.display = this.isExpanded ? 'block' : 'none';
      toggleBtn.textContent = this.isExpanded ? 'Recolher' : 'Expandir';
    });

    deleteBtn.addEventListener('click', () => {
      this.remove();
    });

    editBtn.addEventListener('click', async () => {
      const modal = this.querySelector('edit-task-modal');

      try {
        const taskData = await useGetTask({
          id: this.boardId,
          category_id: this.categoryId,
          task_id: this.taskId,
        });

        modal.setTaskData({
          title: taskData.title,
          description: taskData.description,
          status: taskData.status,
        });

        if (!this._submitBound) {
          modal.addEventListener('submit-edit', this.handleEditSubmit.bind(this));
          this._submitBound = true;
        }
      } catch (error) {
        console.error('Erro ao carregar dados da tarefa:', error);
      }
    });
  }

  async handleEditSubmit(e) {
    const { title, description, status } = e.detail;

    try {
      await handleUpdateTask({
        id: this.boardId,
        category_id: this.categoryId,
        task_id: this.taskId,
        title,
        description,
        status,
      });

      this.querySelector('h6').textContent = title;
      this.querySelector('.description p').textContent = description;
      this.querySelector('.badge').textContent = status;

      this.setAttribute('title', title);
      this.setAttribute('description', description);
      this.setAttribute('status', status);
    } catch (err) {
      console.error('Erro ao atualizar a tarefa:', err);
    }
  }
}

customElements.define('task-component', TaskComponent);
