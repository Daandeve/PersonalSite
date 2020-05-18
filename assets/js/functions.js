const __ = (selector, multiple) => {
  let element;
  if (multiple)
    element = document.querySelectorAll(selector);
  else
    element = document.querySelector(selector);

  if (element)
    return element;
  else
    return null;
};

const fadeOut = (target) => {
  return new Promise(function (resolve, reject) {
    target.style.opacity = 1;

    const fadeEffect = setInterval(function () {
      if (target.style.opacity > 0) {
        target.style.opacity -= 0.05;
      } else {
        target.style.display = 'none';
        clearInterval(fadeEffect);
        resolve();
      }
    }, 20);
  });
};

const fadeIn = (target, display) => {
  return new Promise(function (resolve, reject) {
    target.style.display = display ? display : 'block';
    target.style.opacity = 0;

    const fadeEffect = setInterval(function () {
      let opacity = parseFloat(target.style.opacity);
      if (opacity < 1) {
        target.style.opacity = opacity + 0.05;
      } else {
        clearInterval(fadeEffect);
        resolve();
      }
    }, 20);
  });
};


const initParallax = () => {
  window.addEventListener('scroll', function (e) {
    const nav = __('.navigation');
    const scrolled = window.pageYOffset;
    const elements = __('.parallax', true);
    for (let i = 0; i < elements.length; i++) {
      elements[i].style.top = (scrolled * 0.2) + 'px';
    }
  })
};

const togglePageLoader = () => {
  const loader = __('.page-loader');
  const html = __('html');
  const visible = loader.getAttribute('data-visible');
  if (visible === "true") {
    initHalfScroll();
    fadeOut(loader).then(function () {
      html.style.overflowY = 'auto';
      loader.setAttribute('data-visible', 'false');
    });
  } else {
    fadeIn(loader, 'flex').then(function () {
      loader.setAttribute('data-visible', 'true');
    });
    html.style.overflowY = 'hidden';
  }
};

const toggleNavBar = () => {
  const navContainer = __('.nav-content');
  const visibility = navContainer.getAttribute('data-visible');
  if (visibility === "true") {
    navContainer.classList.add('hidden');
    navContainer.setAttribute('data-visible', 'false');
  } else {
    navContainer.classList.remove('hidden');
    navContainer.setAttribute('data-visible', 'true');
  }
};

const initNavBar = () => {
  const menuIcons = __('.menu-icon', true);
  for (let i = 0; i < menuIcons.length; i++) {
    menuIcons[i].addEventListener('click', toggleNavBar);
  }
};

const smoothScroll = (elementY, duration) => {
  const startingY = window.pageYOffset;
  const diff = elementY - startingY;
  let start;

  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    const time = timestamp - start;
    const percent = Math.min(time / duration, 1);

    window.scrollTo(0, startingY + diff * percent);

    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  })
};

window._ = function (selector, cb) {
  const self = {
    element: document.querySelectorAll(selector),
    removeAttr: (attr) => {
      for (let i = 0; i < self.element.length; i++) {
        self.element[i].removeAttribute(attr);
      }
    },
    prepend: (html) => {
      if (typeof html === "string")
        html = window.createElementFromHTML(html);

      for (let i = 0; i < self.element.length; i++) {
        self.element[i].prepend(html);
      }
    },
    html: (html) => {
      if (html === null)
        return self.element[0].innerHTML;
      else
        self.element[0].innerHTML = html;

    },
    text: (text) => {
      if (text === null || text === undefined)
        return self.element[0].innerText;
      else
        self.element[0].innerText = text;

    },
    val: (value) => {
      for (let i = 0; i < self.element.length; i++) {
        self.element[i].value = value;
      }
    },
    addClass: (className) => {
      for (let i = 0; i < self.element.length; i++) {
        if (!self.element[i].classList.contains(className))
          self.element[i].classList.add(className);
      }
    },
    removeClass: (className) => {
      for (let i = 0; i < self.element.length; i++) {
        if (self.element[i].classList.contains(className))
          self.element[i].classList.remove(className);
      }
    },
    css: (property, value) => {
      for (let i = 0; i < self.element.length; i++) {
        self.element[i].style[property] = value;
      }
    },
    on: (events, callback) => {
      for (let i = 0; i < self.element.length; i++) {
        let event = events.split(" ");
        for (let ii = 0; ii < event.length; ii++) {
          self.element[i].addEventListener(event[ii], callback);
        }
      }
    },
    hide: () => {
      for (let i = 0; i < self.element.length; i++) {
        self.element[i].style.display = 'none';
      }
    },
    show: (display) => {
      for (let i = 0; i < self.element.length; i++) {
        if (display) {
          self.element[i].style.display = display;
        } else {
          self.element[i].style.display = 'block';
        }
      }
    },
    attr: (name, value) => {
      self.element[0].setAttribute(name, value);
    },
    is: (selector) => {
      let to_return;
      if (selector.nodeType) {
        return elem === selector;
      }

      let qa = (typeof (selector) === 'string' ? document.querySelectorAll(selector) : selector),
        length = qa.length,
        returnArr = [];

      for (let i = 0; i < self.element.length; i++) {
        while (length--) {
          console.log(qa[length], self.element[i]);
          if (qa[length] === self.element[i]) {
            to_return = true;
          } else {
            return false;
          }
        }
      }

      if (to_return) {
        return to_return;
      }
      return false;
    },
    replaceWith: (str) => {
      if (self.element[0].outerHTML) {
        self.element[0].outerHTML = str;
      } else {
        console.error('Browser Not Supported');
      }
    },
    readonly: (state) => {
      if (state) {
        for (let i = 0; i < self.element[0].elements.length; i++) {
          self.element[0].elements[i].readOnly = true;
        }
      } else {
        for (let i = 0; i < self.element[0].elements.length; i++) {
          self.element[0].elements[i].readOnly = false;
        }
      }
    },
    data: (key, val) => {
      let obj = self.element[0];
      let _data = {};
      if (!obj) {
        return _data;
      } else if (!key) {
        if (!(obj in _data)) {
          return {};
        }
        return this._data[obj];
      } else if (arguments.length < 3) {
        if (!(obj in _data)) {
          return undefined;
        }
        return _data[obj][key];
      } else {
        if (!(obj in _data)) {
          _data[obj] = {};
        }
        _data[obj][key] = val;
      }
    }
  };
  return self;
};
