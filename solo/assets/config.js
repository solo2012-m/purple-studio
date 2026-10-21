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
      sector: { sl: 'Čiščenje streh, fasad in sončnih panelov', ru: 'Чистка крыш, фасадов и солнечных панелей' },
      task: {
        sl: 'Predstavitev storitev, galerija izvedenih del, izračun in povpraševanje — v treh jezikih.',
        ru: 'Услуги, галерея выполненных работ, расчёт стоимости и заявка — на трёх языках.'
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
        sl: 'Osebna blagovna znamka, storitve, galerija, tečaji in rezervacija termina.',
        ru: 'Личный бренд, услуги, галерея, курсы и онлайн-запись.'
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
    enabled: false,
    endpoint: ''
  }
};
