class BoardColumn extends HTMLElement {
  constructor() {
    super();
    const title = this.getAttribute('title') || 'Novo Board';
    this.innerHTML = `
      <div class="card category m-2" style="width: 20rem;">
        <div class="card-header bg-primary text-white">
          ${title}
        </div>
        <div class="card-body">
          <p class="card-text">Nada por aqui ainda</p>
        </div>
      </div>
    `;
  }
}
customElements.define('board-column', BoardColumn);