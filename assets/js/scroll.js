let window_height;
let header_height;
let height_s2;
let doc_height;
let doc_width;
let posTop_s1;
let posBottom_s1;
let posTop_s2;
let posBottom_s2;
let rtime;
let timeout = false;
let delta = 200;

getHeightValues = () => {
  window_height = window.innerHeight;
  doc_height = document.body.clientHeight;
  doc_width = document.body.clientWidth;
  header_height = __('header').getBoundingClientRect().height;

  //get heights first
  let height_s1 = __('#about').getBoundingClientRect().height;
  height_s2 = __('#projects').getBoundingClientRect().height;
  let height_footer = __('#contact').getBoundingClientRect().height;

  //get top position second
  posTop_s1 = header_height;
  posTop_s2 = posTop_s1 + height_s1;

  //get bottom position 3rd
  posBottom_s1 = posTop_s2 - header_height;
  posBottom_s2 = posTop_s2 + height_s2 - height_footer;
  posBottom_s2 = (window.innerWidth > 800) ? posTop_s2 + height_s2 - height_footer : posTop_s2 + height_s2;
};

resizeEnd = () => {
  if (new Date() - rtime < delta) {
    setTimeout(resizeEnd, delta);
  } else {
    timeout = false;
    getHeightValues();
  }
};

initHalfScroll = () => {
  getHeightValues();
  handleScroll();
  window.addEventListener('scroll', handleScroll);

  window.addEventListener('resize', () => {
    rtime = new Date();
    if (timeout === false) {
      timeout = true;
      setTimeout(resizeEnd, delta);
    }
  });
};

handleScroll = () => {
  const rmClasses = () => {
    _('.image-cart .passkeep .image').removeClass('active');
    _('.image-cart .voozzle .image').removeClass('active');
    _('.image-cart .passkeep').removeClass('scrolled');
    _('.image-cart .voozzle').removeClass('scrolled');
    _('.sticky').removeClass('fixed');
    _('.sticky').removeClass('bottom');
  };

  let scroll = window.scrollY || window.scrollTop;
  if (scroll < posTop_s1) {
    rmClasses();
  }

  console.log(scroll);
  if (!scroll || scroll < 20) {
    _('.back-to-top').css('opacity', 0);
  } else {
    _('.back-to-top').css('opacity', 1);
  }

  if (scroll > posTop_s1) {
    rmClasses();
    _('#about .sticky').addClass('fixed');
  }

  if (doc_width > 800) {
    if (scroll > posBottom_s1) {
      rmClasses();
      _('#about .sticky').addClass('bottom');
      _('.bottom').css('max-height', `${window_height}px`);
    }
  }

  if (scroll > posTop_s2 && scroll < (posBottom_s2 + header_height)) {
    rmClasses();
    if (scroll > posTop_s2 && scroll < posBottom_s2) {
      _('#projects .sticky').addClass('fixed');
    }

    if (scroll < (posTop_s2 + (height_s2 / 2)))
      _('.image-cart .passkeep .image').addClass('active');

    if (scroll < (posTop_s2 + (height_s2 / 2) + header_height)) {
      let percent;
      if (doc_width > 800)
        percent = ((scroll - posTop_s2) / (height_s2 / 2)) * 200;
      else
        percent = ((scroll - posTop_s2) / (height_s2 / 2)) * 400;

      if ((percent < 50 && doc_width > 800) || (percent < 100 && doc_width < 800)) {
        _('.image-cart .passkeep .image').removeClass('fixed');
        _('.image-cart .passkeep .container:first-child, .image-cart .passkeep .container:last-of-type').hide();
      } else {
        _('.image-cart .passkeep .image').addClass('fixed');
        _('.image-cart .passkeep .container:first-child, .image-cart .passkeep .container:last-of-type').show('flex');
      }

      _('.image-cart .passkeep').addClass('scrolled');
      if (doc_width > 800)
        _('.image-cart .passkeep').css('left', `${50 - percent}%`);
      else
        _('.image-cart .passkeep').css('left', `${-percent}%`);
    }

    if (scroll > (posTop_s2 + (height_s2 / 2))) {
      let percent;
      if (doc_width > 800)
        percent = ((scroll - posTop_s2 - (height_s2 / 2)) / (height_s2 / 2)) * 200;
      else
        percent = ((scroll - posTop_s2 - (height_s2 / 2)) / (height_s2 / 2)) * 400;

      _('.image-cart .voozzle .image').addClass('active');
      if ((percent < 50 && doc_width > 800) || (percent < 100 && doc_width < 800)) {
        _('.image-cart .voozzle .image').removeClass('fixed');
        _('.image-cart .voozzle .container:first-child, .image-cart .voozzle .container:last-of-type').hide();
      } else {
        _('.image-cart .voozzle .image').addClass('fixed');
        _('.image-cart .voozzle .container:first-child, .image-cart .voozzle .container:last-of-type').show('flex');
      }

      _('.image-cart .voozzle').addClass('scrolled');
      if (doc_width > 800)
        _('.image-cart .voozzle').css('left', `${50 - percent}%`);
      else
        _('.image-cart .voozzle').css('left', `${-percent}%`);
    }
  }

  if (window.innerWidth < 800 && scroll > (posBottom_s2 - 1) && scroll < posBottom_s2 + header_height) {
    rmClasses();
    _('#contact .sticky').addClass('fixed');
  }

  if (doc_width > 800) {
    if (scroll > posBottom_s2) {
      rmClasses();
      _('#projects .sticky').addClass('bottom');
      _('.bottom').css('max-height', `${window_height}px`);

      if (scroll < (posBottom_s2 + header_height))
        _('.image-cart .voozzle').addClass('scrolled');
    }
  }
};
