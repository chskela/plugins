const modal = function (options) {
  function _createModal(options) {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.insertAdjacentHTML('afterbegin', `
      <div class="modal-overlay">
        <div class="modal-window">
          <div class="modal-header">
            <span class="modal-header__title">Modal title</span>
            <span class="modal-header__close">&times;</span>
          </div>
          <div class="modal-body">
            <p>Ex et dolor laboris veniam nisi ea.</p>
            <p>Ex et dolor laboris veniam nisi ea.</p>
          </div>
          <div class="modal-footer">
            <button>Ok</button>
            <button>Cancel</button>
          </div>
        </div>
      </div>
    `);
    document.body.appendChild(modal);
    return modal;
  };
  const ANIMATION_SPEED = 200;
  const $modal = _createModal(options);
  let isClosed = false;
  return {
    open() {
      !isClosed && $modal.classList.add('modal_open');
    },
    close() {
      isClosed = true;
      $modal.classList.remove('modal_open');
      $modal.classList.add('modal_hide');
      setTimeout(() => {
        $modal.classList.remove('modal_hide');
        isClosed = false;
      }, ANIMATION_SPEED);
    },
    destroy() { }
  }
} 