/* Solo.Pov — concept page texts (stage 1) */
(function () {
  var I = window.SOLO_I18N || (window.SOLO_I18N = {});
  function add(lang, pack) {
    I[lang] = I[lang] || {};
    for (var k in pack) if (pack.hasOwnProperty(k)) I[lang][k] = pack[k];
  }
  add('sl', {
    'meta.title': 'Solo.Pov — Izdelava spletnih strani',
    'create.nav.home': 'Domov',
    'create.nav.create': 'Izdelava',
    'create.nav.improve': 'Izboljšave',
    'create.nav.ai': 'AI in podpora',
    'create.badge': 'Koncept prvega zaslona · 1. etapa',
    'create.eyebrow': 'Solo.Pov · izdelava spletnih strani',
    'create.h1a': 'Ustvarimo spletno stran,',
    'create.h1b': 'ki dela za vaše podjetje.',
    'create.sub': 'Od preproste strani storitev do polnopravne spletne trgovine. Strukturo, obliko in funkcije prilagodimo vašim resničnim ciljem.',
    'create.cta1': 'Izberite spletno stran',
    'create.cta2': 'Pogovorimo se o projektu',
    'create.meta': 'Približno 1 minuta · Brez klicev · Predlog brez obveznosti',
    'mock.hero': 'Vaše podjetje',
    'mock.cta': 'Kontakt',
    'mock.service.t': 'Spletna stran',
    'mock.service.d': 'Landing page',
    'mock.form.t': 'Povpraševanje',
    'mock.form.name': 'Ime',
    'mock.form.email': 'Email',
    'mock.form.btn': 'Pošlji',
    'mock.cal.t': 'Rezervacija',
    'mock.cal.d': 'Izberite termin',
    'mock.product.t': 'Izdelek',
    'mock.product.p': '60 €',
    'mock.phone.cta': 'Pokliči',
    'mock.nav.services': 'Storitve'
  });
  add('ru', {
    'meta.title': 'Solo.Pov — Создание сайтов',
    'create.nav.home': 'Главная',
    'create.nav.create': 'Создание',
    'create.nav.improve': 'Улучшение',
    'create.nav.ai': 'AI и поддержка',
    'create.badge': 'Концепция первого экрана · этап 1',
    'create.eyebrow': 'Solo.Pov · создание сайтов',
    'create.h1a': 'Создадим сайт,',
    'create.h1b': 'который работает на ваш бизнес.',
    'create.sub': 'От простой страницы услуг до полноценного интернет-магазина. Подберём структуру, дизайн и функции под ваши реальные задачи.',
    'create.cta1': 'Подобрать сайт',
    'create.cta2': 'Обсудить проект',
    'create.meta': 'Около 1 минуты · Без звонков · Предложение без обязательств',
    'mock.hero': 'Ваш бизнес',
    'mock.cta': 'Контакты',
    'mock.service.t': 'Сайт',
    'mock.service.d': 'Landing page',
    'mock.form.t': 'Заявка',
    'mock.form.name': 'Имя',
    'mock.form.email': 'Email',
    'mock.form.btn': 'Отправить',
    'mock.cal.t': 'Запись',
    'mock.cal.d': 'Выберите слот',
    'mock.product.t': 'Товар',
    'mock.product.p': '60 €',
    'mock.phone.cta': 'Позвонить',
    'mock.nav.services': 'Услуги'
  });
})();
