// * tab variable [S]
const ifTabMenu = window.document.querySelector('.tab-menu--fixed');
const ifTabBtn = ifTabMenu.querySelectorAll('.tab-btn');
const tabArea = window.document.querySelectorAll('.tabArea');
const parentTabMenuWrap = winDocument.querySelector('.if-tab-clone-wrap');
const parentTabMenu = winDocument.querySelector('.tab-menu--fixed--clone');
const parentTabBtn = window.parent.document.querySelectorAll('.tab-menu--fixed--clone .tab-btn');
let parentUtilH;
let parentHeaderContainerH;
let parentHeaderH;
// * tab variable [E]

const tabFn = () => {
  // TODO Kiosk tabArea Init
  const kioskTabAreaInit = () => {
    tabArea.forEach((element, idx) => {
      if (idx == 0) return;
      element.style.display = 'none';
    });
  };
  if (winBody.classList.contains('kiosk')) {
    kioskTabAreaInit();
  }

  // TODO parentTabMenu show/hide - PC, APP
  const tabMenuToggle = (scollTop) => {
    if (
      winScrollTop >= scollTop + basicTopResult &&
      winScrollTop < window.document.body.offsetHeight * 0.9 + basicTopResult
    ) {
      // parentTabMenu show
      parentTabMenu.style.display = 'flex';
    } else {
      // parentTabMenu hide
      parentTabMenu.style.display = 'none';
    }
  };

  // TODO tabActive - PC, APP
  const tabActive = (element, idx, winScrollTop, sectionTop, sectionHeight) => {
    element.forEach((el) => {
      if (!winBody.classList.contains('kiosk')) {
        // PC
        if (window.parent != window.self && !winDocument.querySelector('.snb')) {
          if (typeof parentUtilH !== 'number') {
            parentUtilH = winDocument.querySelector('.util').offsetHeight;
            parentHeaderContainerH = winDocument.querySelector('.header__container').offsetHeight;
            parentHeaderH = parentUtilH + parentHeaderContainerH; // Header 높이
          }

          if (winBody.className === 'up') {
            // Scroll Up
            if (
              winScrollTop >= sectionTop - parentHeaderH &&
              winScrollTop != sectionTop &&
              winScrollTop < sectionTop + sectionHeight
            ) {
              el.classList.remove('on');
              element[idx].classList.add('on');
            }
          } else {
            // Scroll Down
            if (winScrollTop >= sectionTop && winScrollTop < sectionTop + sectionHeight) {
              el.classList.remove('on');
              element[idx].classList.add('on');
            }
          }
          return;
        }

        // APP, 로컬
        if (winScrollTop >= sectionTop - 3 && winScrollTop < sectionTop + sectionHeight) {
          el.classList.remove('on');
          element[idx].classList.add('on');
        }
      }
    });
  };

  // TODO tabActiveKiosk - KIOSK
  const tabActiveKiosk = (elementBtn, elementTab, idx) => {
    elementBtn.forEach((el) => {
      el.classList.remove('on');
    });
    elementBtn[idx - 1].classList.add('on');
    elementTab.forEach((el) => {
      el.style.display = 'none';
    });
    elementTab[idx - 1].style.display = 'block';

    if (typeof audioObj !== 'undefined') {
      audioObj.forEach((el) => {
        const playBtn = el.element.querySelector('.playBtn');
        const pauseBtn = el.element.querySelector('.pauseBtn');

        audioPause(el.audio, el.isPaused, playBtn, pauseBtn);
      });
    }

    setHeight();
  };

  // TODO tabClickAction
  const tabClickAction = (idx) => {
    if (!winBody.classList.contains('kiosk')) {
      // PC
      if (window.parent != window.self && !winDocument.querySelector('.snb')) {
        winScrollTop = window.parent.scrollY;

        if (typeof parentUtilH !== 'number') {
          parentUtilH = winDocument.querySelector('.util').offsetHeight;
          parentHeaderContainerH = winDocument.querySelector('.header__container').offsetHeight;
          parentHeaderH = parentUtilH + parentHeaderContainerH; // Header 높이
        }

        if (
          winScrollTop >=
            tabArea[idx - 1].offsetTop - parentHeaderH - ifTabMenu.offsetHeight + basicTopResult &&
          winScrollTop != tabArea[idx - 1].offsetTop - ifTabMenu.offsetHeight + basicTopResult
        ) {
          moveScroll(tabArea[idx - 1].offsetTop - ifTabMenu.offsetHeight - parentHeaderH);
        } else {
          moveScroll(tabArea[idx - 1].offsetTop - ifTabMenu.offsetHeight);
        }
        return;
      }

      // APP, 로컬
      moveScroll(tabArea[idx - 1].offsetTop - ifTabMenu.offsetHeight);
    } else {
      // KIOSK
      tabActiveKiosk(ifTabBtn, tabArea, idx);
    }
  };

  // TODO tabClick
  const tabClick = (element) => {
    element.forEach((el, idx) => {
      el.addEventListener('click', () => tabClickAction(idx + 1));
    });
  };

  // TODO tabBtn 클릭 이벤트
  tabClick(ifTabBtn);
  if (parentTabBtn) {
    tabClick(parentTabBtn);
  }

  // TODO tabScroll Fn
  const tabScroll = () => {
    if (!winBody.classList.contains('kiosk')) {
      winScrollTop = window.parent.scrollY; // 현재 스크롤 위치

      // ACTIVE
      tabArea.forEach((section, idx) => {
        const sectionTop = section.offsetTop + basicTopResult - ifTabMenu.offsetHeight; // Section 위치
        const sectionHeight = section.offsetHeight; // Section 높이

        tabActive(ifTabBtn, idx, winScrollTop, sectionTop, sectionHeight);
        if (parentTabBtn) {
          tabActive(parentTabBtn, idx, winScrollTop, sectionTop, sectionHeight);
        }
      });

      // PC
      if (window.parent != window.self && !winDocument.querySelector('.snb')) {
        if (typeof parentUtilH !== 'number') {
          parentUtilH = winDocument.querySelector('.util').offsetHeight;
          parentHeaderContainerH = winDocument.querySelector('.header__container').offsetHeight;
          parentHeaderH = parentUtilH + parentHeaderContainerH; // Header 높이
        }

        if (winBody.className === 'up') {
          // Scroll Up
          tabMenuToggle(ifTabMenu.offsetTop - parentHeaderH);
        } else {
          // Scroll Down
          tabMenuToggle(ifTabMenu.offsetTop);
        }

        // scroll 방향에 따른 탭 위치 세팅
        winBody.className === 'up'
          ? (parentTabMenuWrap.style.top = `${parentHeaderH}px`)
          : (parentTabMenuWrap.style.top = 0);
        return;
      }

      // APP, 로컬
      tabMenuToggle(ifTabMenu.offsetTop);
    }
  };

  // TODO 윈도우 스크롤 이벤트
  window.parent.removeEventListener('scroll', tabScroll);
  window.parent.addEventListener('scroll', tabScroll);
};

tabFn();
if (winDocument.querySelector('.snb')) {
  const tabResize = () => {
    basicTopSet();
    tabFn();
    setHeight();
  };
  window.parent.removeEventListener('resize', tabResize);
  window.parent.addEventListener('resize', tabResize);
}
