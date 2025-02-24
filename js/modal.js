// TODO 모달 닫기
const modalCloseBtnClick = (ifModalWrap, modalCloseBtn) => {
  isModal = false;

  modalCloseBtn.removeEventListener('click', modalCloseBtnClick);
  ifModalWrap.style.opacity = 0;
  setTimeout(() => {
    ifModalWrap.remove();
  }, 300);
  winBody.style.overflow = '';
};

// TODO 모달 열기
const modalOpenBtnClick = (modalContent, linkList) => {
  if (isModal) return;
  isModal = true;

  ifModalContent = modalContent;
  ifModalCodeUpdate();
  if (ifModalContent == undefined) {
    console.error(`modalContent undefined`);
    return;
  }

  const ifModalWrap = document.createElement('div');
  ifModalWrap.classList.add('if-modal-wrap');
  winBody.appendChild(ifModalWrap);
  ifModalWrap.style.opacity = 0;
  ifModalWrap.style.transition = 'opacity 0.3s';
  ifModalWrap.innerHTML = ifModalCode;
  setTimeout(() => {
    ifModalWrap.style.opacity = 1;
  }, 100);
  winBody.style.overflow = 'hidden';

  if (linkList === 'function') linkList();

  const modalCloseBtn = winDocument.querySelector('.if-modal__close');
  modalCloseBtn.addEventListener('click', () => modalCloseBtnClick(ifModalWrap, modalCloseBtn));
};

// TODO 모달 세팅
const ifModal = (openBtn, modalContent, linkList) => {
  const modalOpenBtn = window.document.querySelector(openBtn);

  if (modalOpenBtn == null) {
    console.error(`${openBtn} is not defined`);
    return;
  }
  modalOpenBtn.addEventListener('click', () => modalOpenBtnClick(modalContent, linkList));
};
