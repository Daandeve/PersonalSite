document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        togglePageLoader();
    }, 500);

    initParallax();
    initNavBar();
    initNav();
});

initNav = () => {
    $('.navElement').on('click', function () {
        scrollToItem(this.getAttribute('data-href'));
    });
};

scrollToItem = (href) => {
    const headerHeight = _('header').getBoundingClientRect().height;
    const aboutHeight = _('#about').getBoundingClientRect().height;
    const projectsHeight = _('#projects').getBoundingClientRect().height;
    if (!href) return false;
    if (href === 'about') {
        smoothScroll(headerHeight, 1000);
    } else if (href === 'projects') {
        const height = headerHeight + aboutHeight;
        smoothScroll(height, 1000);
    } else if (href === 'contact') {
        const height = headerHeight + aboutHeight + projectsHeight;
        smoothScroll(height, 1000);
    } else {
        smoothScroll(0, 1000);
    }
};
