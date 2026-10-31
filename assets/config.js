/* Solo.Pov — konfiguracija / конфигурация
   Prazno polje = element se NE prikaže. Nikoli ne vpisujemo izmišljenih kontaktov. */

window.SOLO_CONFIG = {
  langs: {
    default: 'sl',
    available: ['sl', 'ru'],
    planned: ['en', 'de', 'hr']
  },
  contact: {
    telegram: 'https://t.me/solo_pov',
    email: 'info@solopov.si',
    facebook: 'https://www.facebook.com/people/SoloPov/61595780889754/',
    phone: ''
  },
  legal: {
    companyName: 'ZEPO, Mykhailo Solopov s.p.',
    address: 'Vodovodna ulica 16, 2312 Orehova vas, Slovenija',
    taxId: '16357728',
    privacyUrl: '/pages/zasebnost.html'
  },
  analytics: {
    ga4: 'G-1CY1DLCCV9',
    /* Meta Pixel ID (Events Manager). Prazen niz = pixel se ne nalaga. */
    metaPixel: ''
  },
  routes: {
    create:  'pages/izdelava-spletnih-strani.html',
    improve: 'pages/izboljsanje-spletnih-strani.html',
    ai:      'pages/ai-avtomatizacija.html',
    ads:     'pages/reklama-in-promocija.html',
    analiza: 'pages/brezplacna-analiza.html'
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
    endpoint: 'https://script.google.com/macros/s/AKfycbwHLxBkbmfv8vw9XelsQdwY2Lkzm9cOUlm-c7wTqhR7dO12eMoEZjU-xiGonSz64vsr/exec'
  },
  /* Prihodnja hitra diagnoza in obdelava zahtev za izboljšave. Trenutno izklopljeno. */
  express: {
    enabled: false,
    endpoint: 'https://script.google.com/macros/s/AKfycbwHLxBkbmfv8vw9XelsQdwY2Lkzm9cOUlm-c7wTqhR7dO12eMoEZjU-xiGonSz64vsr/exec'
  },
  improve: {
    enabled: false,
    endpoint: 'https://script.google.com/macros/s/AKfycbwHLxBkbmfv8vw9XelsQdwY2Lkzm9cOUlm-c7wTqhR7dO12eMoEZjU-xiGonSz64vsr/exec'
  },
  ai: {
    enabled: false,
    endpoint: 'https://script.google.com/macros/s/AKfycbwHLxBkbmfv8vw9XelsQdwY2Lkzm9cOUlm-c7wTqhR7dO12eMoEZjU-xiGonSz64vsr/exec'
  },
  /* Prihodnja CRM / zbirka potencialnih strank. Trenutno izklopljeno. */
  crm: {
    enabled: true,
    endpoint: 'https://script.google.com/macros/s/AKfycbwHLxBkbmfv8vw9XelsQdwY2Lkzm9cOUlm-c7wTqhR7dO12eMoEZjU-xiGonSz64vsr/exec'
  }
};
