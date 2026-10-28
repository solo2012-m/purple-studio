/* Solo.Pov — нижняя рамка: на конце страницы тянется на высоту подвала */
(function () {
  var html = document.documentElement;
  var footer = null;
  function measure() {
    footer = footer || document.querySelector('footer');
    if (footer) html.style.setProperty('--footer-h', footer.offsetHeight + 'px');
  }
  function check() {
    var atBottom = (window.innerHeight + window.pageYOffset) >= (html.scrollHeight - 4);
    html.classList.toggle('at-bottom', atBottom);
    footer = footer || document.querySelector('footer');
    if (footer) {
      var r = footer.getBoundingClientRect();
      html.classList.toggle('footer-in', r.top <= window.innerHeight - 8);
    }
  }
  function all() { measure(); check(); }
  window.addEventListener('load', all);
  window.addEventListener('resize', all);
  window.addEventListener('scroll', check, { passive: true });
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', all); else all();
})();
