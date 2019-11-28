let window_height;
let header_height;
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
    header_height = _('header').getBoundingClientRect().height;

    //get heights first
    let height_s1 = _('#about').getBoundingClientRect().height;
    let height_s2 = _('#projects').getBoundingClientRect().height;
    let height_footer = _('#contact').getBoundingClientRect().height;

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
    window.addEventListener('scroll', function (event) {
        let scroll = window.scrollY || window.scrollTop;
        if (scroll < posTop_s1) {
            rmClasses();
        }

        if (scroll > posTop_s1) {
            rmClasses();
            $('#about .sticky').addClass('fixed');
        }

        if (doc_width > 800) {
            if (scroll > posBottom_s1) {
                rmClasses();
                $('#about .sticky').addClass('bottom');
                $('.bottom').css('max-height', `${window_height}px`);
            }
        }

        if (scroll > posTop_s2 && scroll < posBottom_s2) {
            rmClasses();
            $('#projects .sticky').addClass('fixed');
        }

        if (window.innerWidth < 800 && scroll > posBottom_s2 && scroll < posBottom_s2 + header_height) {
            rmClasses();
            $('#contact .sticky').addClass('fixed');
        }

        if (doc_width > 800) {
            if (scroll > posBottom_s2) {
                rmClasses();
                $('#projects .sticky').addClass('bottom');
                $('.bottom').css('max-height', `${window_height}px`);
            }
        }

        function rmClasses() {
            $('.sticky').removeClass('fixed');
            $('.sticky').removeClass('bottom');
        }
    });

    window.addEventListener('resize', function () {
        rtime = new Date();
        if (timeout === false) {
            timeout = true;
            setTimeout(resizeEnd, delta);
        }
    });
};
