// * modal variable [S]
let ifModalContent;
let isModal = false;
let parentUtilH;
let parentHeaderContainerH;
let parentHeaderH;
let modalContainerH;
// modal variable [E]

// TODO 모달 이미지 세팅
const modalClose = new Image();
modalClose.src = './images/modal/close.png';

const imgArr = [modalClose.src];

const ifModalCodeUpdate = () => {
  const deviceHeight = window.parent.innerHeight;
  console.log(deviceHeight);

  if (window.parent != window.self && !winDocument.querySelector('.snb')) {
    if (typeof parentUtilH !== 'number') {
      parentUtilH = winDocument.querySelector('.util').offsetHeight;
      parentHeaderContainerH = winDocument.querySelector('.header__container').offsetHeight;
      parentHeaderH = parentUtilH + parentHeaderContainerH; // Header 높이
    }

    if (winBody.className === 'up') {
      // Scroll Up
      modalContainerH = parentHeaderH;
    } else {
      // Scroll Down
      modalContainerH = 0;
    }
  } else if (window.parent != window.self && winDocument.querySelector('.snb')) {
    // APP
    modalContainerH = winDocument.querySelector('.snb').offsetHeight;
  } else {
    // 로컬
    modalContainerH = 0;
  }

  return (ifModalCode = `
    <style>
      .if-modal,
      .if-modal div,
      .if-modal img{
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
      }
      .if-modal img {
        display: block;
        width: 100%;
        vertical-align: middle;
      }
      .if-modal{
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.3);
        position: fixed;
        left: 0;
        top: 0;
        z-index: 100;
      }

      /* modal-custom [S] */
      .if-modal .if-modal__container{
        display: flex;
        flex-direction: column;
        width: 90%;
        max-width: 750px;
        min-height: 50%;
        max-height:  ${deviceHeight - deviceHeight / 10 - modalContainerH}px;
        position: absolute;
        left: 50%;
        top: ${deviceHeight / 2 + modalContainerH / 2}px;
        transform: translate(-50%, -50%);
        
        // background-color: #fff;
        // border-radius: 0.5em;
      }
      .if-modal .if-modal__header{
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 100%;
        position: relative;
        background-color:#fff;
      }
      .if-modal .if-modal__close{
        width: 10%;
      }
      .if-modal .if-modal__content{
        flex-grow: 1;
        width: 100%;
        background-color:#fff;
        overflow: auto;
      }
      .if-modal .if-modal__content img{
        -webkit-mask-image: -webkit-radial-gradient(white, black);    -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
      }
      /* modal-custom [E] */
    </style>

    <div class="if-modal">
      <div class="if-modal__container">  
        <div class="if-modal__header">
          <div class="if-modal__close">
            <img src="${imgArr[0]}" alt="" />
          </div>
        </div>
        <div class="if-modal__content">
          ${ifModalContent}
        </div>
      </div>
    </div>
  `);
};
