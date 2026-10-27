/* Solo.Pov — konfiguracija / конфигурация
   Prazno polje = element se NE prikaže. Nikoli ne vpisujemo izmišljenih kontaktov. */

window.SOLO_CONFIG = {
  langs: {
    default: 'sl',
    available: ['sl', 'ru'],
    planned: ['en', 'de', 'hr']
  },
  contact: {
    telegram: '',
    email: '',
    phone: ''
  },
  legal: {
    companyName: '',
    address: '',
    taxId: '',
    privacyUrl: ''
  },
  routes: {
    create:  'pages/izdelava-spletnih-strani.html',
    improve: 'pages/izboljsanje-spletnih-strani.html',
    ai:      'pages/ai-avtomatizacija.html',
    ads:     'pages/reklama-in-promocija.html'
  },
  /* Resnični projekti. Prazen seznam = prikaže se pošteno obvestilo "v pripravi".
     Primer vnosa:
     { title: {sl:'', ru:''}, sector: {sl:'', ru:''}, task: {sl:'', ru:''},
       img: 'assets/img/projects/ime.jpg', url: 'https://...' }
     Objavljamo samo projekte, za katere imamo dovoljenje. */
  projects: [
    {
      title: { sl: 'Zeleni pomočnik', ru: 'Zeleni pomočnik' },
      sector: { sl: 'Čiščenje in barvanje streh ter fasad', ru: 'Очистка и покраска крыш и фасадов' },
      task: {
        sl: 'Spletna stran storitev čiščenja in barvanja streh ter fasad. Strani storitev, obrazci za povpraševanje, večjezičnost, posodabljanje vsebine in razvoj s pomočjo AI.',
        ru: 'Сайт услуг по очистке и покраске крыш и фасадов. Страницы услуг, формы заявок, мультиязычность, обновление содержимого и развитие через AI.'
      },
      img: 'assets/img/works/zeleni-pomocnik.jpg',
      url: 'https://zelenipomocnik.si/',
      host: 'zelenipomocnik.si',
      tags: ['SL · DE · EN']
    },
    {
      title: { sl: 'Solopova Makeup', ru: 'Solopova Makeup' },
      sector: { sl: 'Vizažistka · Maribor', ru: 'Визажист · Марибор' },
      task: {
        sl: 'Spletna stran vizažistke. Predstavitev storitev, nastavitev trajanja storitev, spletne rezervacije in upravljanje vsebine.',
        ru: 'Сайт визажиста. Презентация услуг, настройка продолжительности процедур, онлайн-запись и управление содержимым.'
      },
      img: 'assets/img/works/solopova-makeup.jpg',
      url: 'https://solopovamakeup.si/index.html',
      host: 'solopovamakeup.si',
      tags: ['SL · EN · RU']
    }
  ],
  submit: {
    enabled: false,
    endpoint: ''
  },
  /* Prihodnja hitra diagnoza in obdelava zahtev za izboljšave. Trenutno izklopljeno. */
  express: {
    enabled: false,
    endpoint: ''
  },
  improve: {
    enabled: false,
    endpoint: ''
  },
  ai: {
    enabled: false,
    endpoint: ''
  },
  /* Prihodnja CRM / zbirka potencialnih strank. Trenutno izklopljeno. */
  crm: {
    enabled: true,
    endpoint: 'https://script.google.com/macros/s/AKfycbySsK0ke-H_p0atwXPSfOYVm805fbdB2Jy1Gh4nPNp9rJoHFEXbgdXVpGIZqibddzFY/exec'
  }
};
