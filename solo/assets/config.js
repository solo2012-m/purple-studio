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
    ai:      'pages/ai-avtomatizacija.html'
  },
  /* Resnični projekti. Prazen seznam = prikaže se pošteno obvestilo "v pripravi".
     Primer vnosa:
     { title: {sl:'', ru:''}, sector: {sl:'', ru:''}, task: {sl:'', ru:''},
       img: 'assets/img/projects/ime.jpg', url: 'https://...' }
     Objavljamo samo projekte, za katere imamo dovoljenje. */
  projects: [],
  submit: {
    enabled: false,
    endpoint: ''
  }
};
