class SideBar extends HTMLElement {
  constructor() {
    super();
    this.boards = [];
    this.currentBoardId = null;
  }

  connectedCallback() {
    this.render();
  }

  setBoards(boards) {
    this.boards = boards;
    this.render();
    this.setupEventListeners();
  }

  setCurrentBoard(boardId) {
    this.currentBoardId = boardId;
    this.highlightCurrentBoard();
    this.dispatchEvent(new CustomEvent('board-changed', { 
      detail: { boardId } 
    }));
  }

  highlightCurrentBoard() {
    this.querySelectorAll('.board-link').forEach(link => {
      link.classList.toggle('active', 
        link.dataset.boardId === this.currentBoardId);
    });
  }

  render() {
    this.innerHTML = `
      <nav class="navbar bg-body-tertiary fixed-top">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Kanban App</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" 
            data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar">
            <div class="offcanvas-header">
              <h5 class="offcanvas-title">Meus Boards</h5>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav flex-grow-1 pe-3">
                <li class="nav-item">
                </li>
                <li class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="#" role="button" 
                    data-bs-toggle="dropdown">
                    Todos os Boards
                  </a>
                  <ul class="dropdown-menu" id="boards-dropdown">
                    ${this.boards.map(board => `
                      <li>
                        <a class="dropdown-item board-link" href="#" 
                          data-board-id="${board.id}">
                          ${board.title}
                        </a>
                      </li>
                    `).join('')}
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    `;
  }

  setupEventListeners() {
    this.querySelectorAll('.board-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.setCurrentBoard(e.target.dataset.boardId);
        bootstrap.Offcanvas.getInstance(
          this.querySelector('#offcanvasNavbar')
        ).hide();
      });
    });
  }
}

customElements.define('side-bar', SideBar);