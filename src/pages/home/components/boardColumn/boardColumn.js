import { handleCreateTask, useGetAllTasks, useGetTask } from "../../hooks/useCreateTasks";

class BoardColumn extends HTMLElement {
  constructor() {
    super();
    this.categoryId = this.getAttribute('column-id') || null;
    this.title = this.getAttribute('title') || 'Novo Board';
    this.tasks = [];
    this.boardId = this.getAttribute('board-id') || null;
    this.render();
  }

  render() {
    this.innerHTML = `
      <div class="card category m-2" style="min-width: 250px; max-width: 500px; flex: 0 0 auto;">
        <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <span class="text-wrap">${this.title}</span>
          <button class="btn btn-sm btn-outline-light open-task-modal" data-bs-toggle="modal" data-bs-target="#createTaskModal">+ Criar Tarefa</button>
        </div>
        <div class="card-body tasks-container">
        </div>
      </div>
      <create-task-modal id="global-task-modal"></create-task-modal>
    `;
  }

  connectedCallback() {
    const createTaskBtn = this.querySelector('.open-task-modal');

    createTaskBtn.addEventListener('click', () => {
      const modal = document.getElementById('global-task-modal');
      modal.dataset.boardId = this.boardId;
      modal.dataset.categoryId = this.categoryId;
    });

    document.getElementById('global-task-modal').addEventListener('task-created', async (e) => {
      const { title, statusId, description = '' } = e.detail;
      const board_id = e.target.dataset.boardId;
      const category_id = e.target.dataset.categoryId;

      if (this.categoryId !== category_id) return;

      try {
        await handleCreateTask({
          id: board_id,
          category_id,
          title,
          description,
          status: statusId,
        });

        await this.loadTasks();
      } catch (error) {
        console.error('Erro ao criar task', error);
      }
    });

    document.getElementById('global-task-modal').addEventListener('task-updated', async (e) => {
      const { title, statusId, description = '', taskId } = e.detail;
      const board_id = e.target.dataset.boardId;
      const category_id = e.target.dataset.categoryId;

      try {
        await updateTask({
          id: board_id,
          category_id,
          title,
          description,
          status: statusId,
          task_id: taskId,
        });

        await this.loadTasks();
      } catch (error) {
        console.error('Erro ao atualizar task', error);
      }
    });
    this.loadTasks();
  }
  async loadTasks() {
    if (this.categoryId) {
      try {
        const response = await useGetAllTasks({ id: this.boardId, category_id: this.categoryId });

        this.tasks = response.map(task => ({
          id: task.id,
          title: task.title,
          description: task.description,
          statusId: task.status,
          statusText: this.getStatusText(task.status),
        }));
        this.renderTasks();
      } catch (error) {
        console.error('Erro ao carregar tasks:', error);
        this.tasks = [];
        this.renderTasks();
      }
    }
  }


  getStatusText(statusId) {
    switch (statusId) {
      case 1: return 'A fazer';
      case 2: return 'Em desenvolvimento';
      case 3: return 'Concluído';
      default: return 'Desconhecido';
    }
  }

  renderTasks() {
    const container = this.querySelector('.tasks-container');
    if (!container) return;

    if (this.tasks.length === 0) {
      container.innerHTML = `<p class="card-text">Nada por aqui ainda</p>`;
    } else {
      container.innerHTML = this.tasks.map((task) => `
      <div class="mb-2">
        <task-component
          task-id="${task.id}" 
          title="${task.title}" 
          description="${task.description}" 
          status="${task.statusText}"
          category-id="${this.categoryId}"
          board-id="${this.boardId}">
        </task-component>
      </div>
    `).join('');
    }

  }
}

customElements.define('board-column', BoardColumn);