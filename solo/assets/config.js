/* SOLO — konfiguracija / конфигурация
   Vrednosti, ki jih še nimamo, pustimo prazne. Prazno polje = element se NE prikaže.
   Nikoli ne vpisujemo izmišljenih kontaktov ali podatkov o podjetju. */

window.SOLO_CONFIG = {
  langs: {
    default: 'sl',
    available: ['sl', 'ru'],
    planned: ['en', 'de', 'hr']
  },
  // Kontakti: vpiše lastnik, ko so znani. Prazno => skrito.
  contact: {
    telegram: '',   // npr. 'https://t.me/uporabniskoime'
    email: '',      // npr. 'info@example.com'
    phone: ''       // npr. '+386 ...'
  },
  // Pravne informacije: prazno => skrito.
  legal: {
    companyName: '',
    address: '',
    taxId: '',
    privacyUrl: ''
  },
  // Poti do podstrani (struktura pripravljena vnaprej).
  routes: {
    create:  'pages/izdelava-spletnih-strani.html',
    improve: 'pages/izboljsanje-spletnih-strani.html',
    ai:      'pages/ai-avtomatizacija.html'
  },
  // Integracija za oddajo povpraševanja še ni nastavljena.
  // Dokler je false, stran NE sme trditi, da je bilo sporočilo poslano.
  submit: {
    enabled: false,
    endpoint: ''
  }
};
