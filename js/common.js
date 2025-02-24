// * common variable [S]
const winDocument = window.parent.document;
const winBody = winDocument.querySelector('body');
const winContainer =
  window.parent == window.self ? window.document.body : winDocument.querySelector('#container');
let basicTopResult;
let winScrollTop;
// common variable [E]

// * swiper optional [S]
const swiperBasicOption = {
  observer: true,
  observeParents: true,
};

const swiperFadeOption = {
  observer: true,
  observeParents: true,
  effect: 'fade',
  fadeEffect: {
    crossFade: true,
  },
  loop: true,
};
// swiper optional [E]

// * PC에서 제거 [S]
const pcDelete = () => {
  const hiddenContent = window.document.querySelectorAll('.pcDel');
  if (hiddenContent.length == 0) return;
  for (const iterator of hiddenContent) {
    iterator.remove();
  }
};
// PC에서 제거 [E]

// * MOWEB에서 제거 [S]
const mowebDelete = () => {
  const hiddenContent = window.document.querySelectorAll('.mowebDel');
  if (hiddenContent.length == 0) return;
  for (const iterator of hiddenContent) {
    iterator.remove();
  }
};
// MOWEB에서 제거 [E]

// * 키오스크에서 제거 [S]
const kioskDelete = () => {
  const hiddenContent = window.document.querySelectorAll('.kioskDel');
  if (hiddenContent.length == 0) return;
  for (const iterator of hiddenContent) {
    iterator.remove();
  }
};
// 키오스크에서 제거 [E]

// * basicTopSet [S]
const basicTopSet = () => {
  // [로컬] / [테스트] 분기 [S]
  if (window.parent == window.self) {
    // 로컬

    basicTopResult = 0;
  } else {
    // 테스트

    // [PC] / [APP] / [KIOSK] 분기 [S]
    if (!winBody.classList.contains('kiosk')) {
      if (!winDocument.querySelector('.snb')) {
        // PC

        basicTopResult =
          winDocument.querySelector('.__head').offsetHeight +
          winDocument.querySelector('.__detail__').offsetTop +
          1;
      } else {
        // APP

        basicTopResult =
          winDocument.querySelector('.__head').offsetHeight -
          winDocument.querySelector('.snb').offsetHeight +
          winDocument.querySelector('.__detail__').offsetTop +
          1;
      }
    } else {
      // KIOSK

      basicTopResult =
        winDocument.querySelector('.__head').offsetHeight -
        winDocument.querySelector('#kiosk-snb').offsetHeight +
        winDocument.querySelector('.__detail__').offsetTop;
    }
    // [PC] / [APP] / [KIOSK] 분기 [E]
  }
  // [로컬] / [테스트] 분기 [E]
};
// basicTopSet [E]

// * moveScroll Fn [S]
const moveScroll = (scollTop) => {
  winScrollTop = window.parent.scrollY;

  if (winScrollTop == basicTopResult + scollTop) return; // 중복 클릭 체크

  setTimeout(() => {
    window.parent.scrollTo({
      top: basicTopResult + scollTop,
      behavior: 'smooth',
    });
  }, 200);
};
// moveScroll Fn [E]

// TODO [PC, APP] / [KIOSK] 분기 & 컨텐츠 초기화 [S]
const contentsInit = () => {
  basicTopSet();
  if (!winBody.classList.contains('kiosk')) {
    if (!winDocument.querySelector('.snb')) {
      // * PC
      pcDelete();
    } else {
      const browserInfo = navigator.userAgent;

      if (browserInfo.indexOf('LD_Android') > -1 || browserInfo.indexOf('LD_iOS') > -1) {
        // * APP
      } else {
        // * MOWEB
        mowebDelete();
      }
    }
  } else {
    // * KIOSK
    kioskDelete();
  }
};
contentsInit();
// TODO [PC, APP] / [KIOSK] 분기 & 컨텐츠 초기화 [E]

// * toggle-box [S]
$('.toggle-box__btns').on('click', function () {
  $(this).closest('.toggle-box').toggleClass('on');

  setHeight();
});
// toggle-box [E]

// * 높이값 세팅 [S]
function setHeight() {
  var parentIframe = $('#container', parent.document).find('iframe');
  var iframeHeight = $('.eventBox').innerHeight();

  $(parentIframe)
    .height(iframeHeight + 17)
    .css('min-height', 'auto');
}
// 높이값 세팅 [E]
