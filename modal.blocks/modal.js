const modal = function ({ title, closable, content, width, footerButtons }) {

  const ANIMATION_SPEED = 200;

  const $modalNode = _createModal({ title, closable, content, width, footerButtons });

  let isClosed = false;
  let isDestroed = false;

  const modal = {
    open() {
      if (isDestroed) {
        return console.log('Modal is destored');
      }
      !isClosed && $modalNode.classList.add('modal_open');
    },
    close() {
      isClosed = true;
      $modalNode.classList.remove('modal_open');
      $modalNode.classList.add('modal_hide');
      setTimeout(() => {
        $modalNode.classList.remove('modal_hide');
        isClosed = false;
      }, ANIMATION_SPEED);
    },
    destroy() {
      $modalNode.parentNode.removeChild($modalNode);
      $modalNode.removeEventListener('click', _handleClick);
      isDestroed = true;
    },
    setContent(html) {
      $modalNode.querySelector('[data-content]').innerHTML = html;
    }
  };

  $modalNode.addEventListener('click', _handleClick);

  function _handleClick(event) {
    if (event.target.dataset.close) {
      modal.close();
    };
  }

  function _noop() { }

  function _createModalFooter(buttons = []) {
    if (buttons.length === 0) {
      return document.createElement('div');
    }
    const wrap = document.createElement('div');
    wrap.classList.add('modal-footer');

    buttons.forEach(button => {
      const $btn = document.createElement('button');
      $btn.textContent = button.text;
      $btn.classList.add(`${button.type || 'secondary'}`);
      $btn.addEventListener('click', button.handler || _noop);

      wrap.appendChild($btn);
    })
    return wrap;
  }

  function _createModal({ title, closable, content, width, footerButtons }) {

    const DEFAULT_WIDTH = '600px';
    const div = document.createElement('div');
    div.classList.add('modal');
    div.insertAdjacentHTML('afterbegin', `
      <div class="modal-overlay" data-close="true">
        <div class="modal-window" style="width: ${width || DEFAULT_WIDTH}">
          <div class="modal-header">
            <span class="modal-header__title">${title || 'Окно'}</span>
            ${closable ? `<span class="modal-header__close" data-close="true">&times;</span>` : ''}
          </div>
          <div class="modal-body" data-content>
            ${content || ''}
          </div>
        </div>
      </div>
    `);

    const footer = _createModalFooter(footerButtons);
    const dataContent = div.querySelector('[data-content]');

    dataContent.parentNode.insertBefore(footer, dataContent.nextSibling);
    document.body.appendChild(div);
    return div;
  };

  return modal;
} 