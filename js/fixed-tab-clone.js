if (!winBody.classList.contains('kiosk')) {
  // TODO 탭 이미지 세팅
  const img1Off = new Image();
  const img1On = new Image();
  const img2Off = new Image();
  const img2On = new Image();
  const img3Off = new Image();
  const img3On = new Image();
  const img4Off = new Image();
  const img4On = new Image();
  img1Off.src = './images/tab/tab1_off.jpg';
  img1On.src = './images/tab/tab1_on.jpg';
  img2Off.src = './images/tab/tab2_off.jpg';
  img2On.src = './images/tab/tab2_on.jpg';
  img3Off.src = './images/tab/tab3_off.jpg';
  img3On.src = './images/tab/tab3_on.jpg';
  img4Off.src = './images/tab/tab4_off.jpg';
  img4On.src = './images/tab/tab4_on.jpg';

  const imgArr = [
    img1Off.src,
    img1On.src,
    img2Off.src,
    img2On.src,
    img3Off.src,
    img3On.src,
    img4Off.src,
    img4On.src,
  ];

  // TODO parentTabMenuTop 세팅
  if (winDocument.querySelector('.snb')) {
    parentTabMenuMinWidth = 'auto';
    parentTabMenuMaxWidth = 'none';
    parentTabMenuTop = winDocument.querySelector('.snb').offsetHeight;
  } else if (winDocument.querySelector('#kiosk-snb')) {
    parentTabMenuMinWidth = 'auto';
    parentTabMenuMaxWidth = 'none';
    parentTabMenuTop = winDocument.querySelector('#kiosk-snb').offsetHeight;
  } else {
    const str = window.location.href;

    str.includes('127.0.0.1') || str.includes('file:')
      ? ((parentTabMenuMinWidth = 'auto'), (parentTabMenuMaxWidth = 'none'))
      : ((parentTabMenuMinWidth = '759px'), (parentTabMenuMaxWidth = '759px'));
    parentTabMenuTop = 0;
  }

  // TODO tab-menu--fixed--clone html, css 세팅
  const ifTabCloneCss = `
  <style>
  /* tab-menu--fixed--clone [S] */
  .if-tab-clone-wrap{
    width: 100%;
    min-width: ${parentTabMenuMinWidth};
    max-width: ${parentTabMenuMaxWidth};
    position: fixed;
    top: ${parentTabMenuTop}px;
    transition: top 0.6s;
    z-index: 10;
  }
  .tab-menu--fixed--clone {
    display:none;
    flex-wrap:wrap;
    width:100%;
  }
  .tab-menu--fixed--clone .tab-btn img {
    display:block;
    width:100%;
  }
  .tab-menu--fixed--clone .tab-btn {
    width: 25%;
  }
  .tab-menu--fixed--clone .tab-btn img:last-of-type {
    display: none;
  }
  .tab-menu--fixed--clone .tab-btn.on img:first-of-type {
    display: none;
  }
  .tab-menu--fixed--clone .tab-btn.on img:last-of-type {
    display: block;
  }
  .hidden-area {
    display: none;
  }
  .hidden-area.on {
    display: block;
  }
  /* tab-menu--fixed--clone [E] */
  </style>
  <div class="tab-menu--fixed--clone">
    <div class="tab-btn on">
      <img src="${imgArr[0]}" alt="" />
      <img src="${imgArr[1]}" alt="" />
    </div>

    <div class="tab-btn">
      <img src="${imgArr[2]}" alt="" />
      <img src="${imgArr[3]}" alt="" />
    </div>

    <div class="tab-btn">
      <img src="${imgArr[4]}" alt="" />
      <img src="${imgArr[5]}" alt="" />
    </div>

    <div class="tab-btn">
      <img src="${imgArr[6]}" alt="" />
      <img src="${imgArr[7]}" alt="" />
    </div>
  </div>
  `;

  // TODO div 생성 > 클래스 추가 > div 삽입 > div에 세팅된 html, css 삽입

  const ifTabCloneWrap = document.createElement('div'); // div 생성
  ifTabCloneWrap.classList.add('if-tab-clone-wrap'); // 생성된 div에 if-tab-clone-wrap 클래스 추가
  winContainer.appendChild(ifTabCloneWrap); // 로컬 : winContainer에 ifTabCloneWrap 삽입
  ifTabCloneWrap.innerHTML = ifTabCloneCss; // ifTabCloneWrap에 세팅 된 tab-menu--fixed--clone html, css 삽입

  // TODO resize
  const parentTabMenuWrap = winDocument.querySelector('.if-tab-clone-wrap');
  const resize = () => {
    if (winDocument.querySelector('.snb')) {
      setHeight();

      parentTabMenuTop = winDocument.querySelector('.snb').offsetHeight;
      parentTabMenuWrap.style.top = `${parentTabMenuTop}px`;
    }
  };
  window.parent.addEventListener('resize', resize);
}
