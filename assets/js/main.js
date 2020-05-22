document.addEventListener('DOMContentLoaded', function () {
  setTimeout(function () {
    togglePageLoader();
  }, 500);

  initParallax();
  initNavBar();
  initNav();
});

initNav = () => {
  _('.navElement').on('click', function () {
    scrollToItem(this.getAttribute('data-href'));
  });
};

scrollToItem = (href) => {
  const headerHeight = __('header').getBoundingClientRect().height;
  const aboutHeight = __('#about').getBoundingClientRect().height;
  const projectsHeight = __('#projects').getBoundingClientRect().height;
  if (!href) return false;
  if (href === 'about') {
    smoothScroll(headerHeight, 1000);
  } else if (href === 'projects') {
    const height = headerHeight + aboutHeight + 1;
    smoothScroll(height, 1000);
  } else if (href === 'contact') {
    const height = headerHeight + aboutHeight + projectsHeight + 1;
    smoothScroll(height, 1000);
  } else {
    smoothScroll(0, 1000);
  }
};
