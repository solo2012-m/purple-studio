/* Solo.Pov — tariffs and add-ons data (page concept) */
window.SOLO_TARIFFS = {
  sl: {
    tariffs: [
      {
        id: 'start', name: 'START', price: 300, priceLabel: 'od 300 €',
        desc: 'Za eno glavno ponudbo, specialista ali manjše podjetje.',
        features: [
          'Enostranska spletna stran.',
          'Odziven dizajn na osnovi pripravljene strukture.',
          'Nekaj smiselnih sklopov na eni strani.',
          'Preprost obrazec za povpraševanje.',
          'Kontakti in gumbi za stik.',
          'Zemljevid, če je potreben.',
          'Osnovna SEO priprava.',
          'Povezava domene in objava.',
          'Dva kroga popravkov.'
        ],
        includes: [], cta: 'Izberite START'
      },
      {
        id: 'business', name: 'BUSINESS', price: 600, priceLabel: 'od 600 €',
        desc: 'Za podjetje z več dejavnostmi.',
        features: [
          'Do pet strani.',
          'Prilagojen dizajn.',
          'Mobilna prilagoditev.',
          'Obrazci za povpraševanja.',
          'Galerija ali portfelj.',
          'Osnovna SEO priprava vsake strani.',
          'Nastavitev osnovne analitike.',
          'Pomoč pri Google Business Profile v dogovorjenem obsegu.',
          'Trije krogi popravkov.'
        ],
        includes: ['analytics', 'gbp'], cta: 'Izberite BUSINESS'
      },
      {
        id: 'pro', name: 'PRO', price: 1000, priceLabel: 'od 1 000 €',
        desc: 'Za podjetje, ki želi stran razvijati.',
        features: [
          'Do deset strani.',
          'Razširjena struktura in dizajn.',
          'Do dve jezikovni različici.',
          'Razdelek s članki.',
          'Napredni obrazci.',
          'Analitika in sledenje dogovorjenih konverzij.',
          'Ena preprosta integracija.',
          'Štirje krogi popravkov.'
        ],
        includes: ['language', 'blog', 'form', 'analytics', 'tracking'], cta: 'Izberite PRO'
      },
      {
        id: 'custom', name: 'CUSTOM', price: null, priceLabel: 'Individualni izračun',
        desc: 'Za trgovine, portale, rezervacije in posebne funkcije.',
        features: [
          'Spletne trgovine.',
          'Osebni portali.',
          'Zahtevni sistemi rezervacij.',
          'Nestandardne funkcije.',
          'Spletne aplikacije.',
          'Cena po pogovoru.',
          'Krogi popravkov po dogovoru.'
        ],
        includes: [], cta: 'Pogovorimo se'
      }
    ],
    table: {
      columns: ['START', 'BUSINESS', 'PRO'],
      rows: [
        { label: 'Število strani', values: ['1', 'do 5', 'do 10'] },
        { label: 'Dizajn', values: ['Osnovna struktura', 'Prilagojen', 'Razširjen'] },
        { label: 'Mobilna različica', values: [true, true, true] },
        { label: 'Obrazci', values: ['Preprost', 'Več obrazcev', 'Napredni'] },
        { label: 'Galerija', values: [false, true, true] },
        { label: 'SEO', values: ['Osnovno', 'Osnovno po straneh', 'Napredno'] },
        { label: 'Dodatni jeziki', values: ['1', '1', 'do 2'] },
        { label: 'Google Analytics', values: [false, true, true] },
        { label: 'Google Business Profile', values: [false, 'Po dogovoru', false] },
        { label: 'Priprava na oglaševanje', values: [false, false, 'Po dogovoru'] },
        { label: 'Blog', values: [false, false, true] },
        { label: 'Integracije', values: [false, false, '1 preprosta'] },
        { label: 'Krogi popravkov', key: 'revisions', values: ['2', '3', '4'] },
        { label: 'Podpora', values: ['Po dogovoru', 'Po dogovoru', 'Po dogovoru'] }
      ]
    },
    addons: [
      { id: 'page', title: 'Dodatna stran', price: 50 },
      { id: 'language', title: 'Dodatni jezik', price: 100 },
      { id: 'blog', title: 'Blog', price: 120 },
      { id: 'form', title: 'Obrazec z dodatnimi vprašanji', price: 70 },
      { id: 'booking', title: 'Spletna rezervacija prek pripravljene storitve', price: 120 },
      { id: 'analytics', title: 'Google Analytics', price: 60 },
      { id: 'tracking', title: 'Sledenje povpraševanjem za oglaševanje', price: 90 },
      { id: 'gbp', title: 'Pomoč pri Google Business Profile', price: 70 },
      { id: 'calculator', title: 'Preprost kalkulator cene', price: 150 },
      { id: 'integrations', title: 'Druge integracije', price: null, individual: true }
    ],
    ui: {
      selected: 'Izbran',
      included: 'Vključeno',
      includedInTariff: 'Vključeno v paket',
      individual: 'Individualna ocena',
      from: 'od',
      calcTitle: 'Vaš izbor',
      calcEmpty: 'Najprej izberite paket.',
      calcBase: 'Osnovni paket',
      calcAddons: 'Dodatne možnosti',
      calcTotal: 'Približna cena od',
      reset: 'Ponastavi dodatne možnosti',
      payTitle: 'Najprej stran. Potem plačilo.',
      payLead: 'Izdelamo stran in vam pokažemo končno različico. Vi preverite rezultat, se dogovorite o popravkih in šele po potrditvi plačate izdelavo. Nato stran objavimo in predamo dostope.',
      paySteps: ['Izdelamo stran.', 'Vi preverite.', 'Plačilo in predaja.'],
      payNote: 'Brez predplačila za izdelavo pri standardnih paketih START in BUSINESS. Za PRO in individualne projekte se pogoji dogovorijo posebej. Domena in plačljive storitve se plačajo posebej.',
      payDetailsTitle: 'Podrobni pogoji plačila in predaje strani',
      payDetails: [
        'Domeno priporočamo, da registrirate na ime lastnika podjetja.',
        'Naročnik lahko domeno kupi sam ali zaprosi za pomoč.',
        'Po plačilu predamo dogovorjene dostope in gradivo.',
        'Pravice do kode, oblikovanja in drugega gradiva se določijo s pogoji naročila.',
        'Plačljive zunanje storitve in redno vzdrževanje se plačajo posebej.',
        'Dodatna dela nad potrjenim obsegom se dogovorijo posebej.'
      ],
      payNote1: 'Za standardna projekta START in BUSINESS predplačilo za izdelavo ni potrebno.',
      payNote2: 'Za zahtevne in individualne projekte se pogoji plačila določijo posebej.',
      payNote3: 'Domena in plačljive zunanje storitve se plačajo posebej.',
      rightsTitle: 'Domena in pravice do strani',
      rightsLead: 'Domeno priporočamo, da takoj registrirate na ime naročnika. Po plačilu predamo dogovorjene dostope in gradivo strani.',
      rightsBullets: [
        'Naročnik lahko domeno kupi sam ali zaprosi SOLO.POV za pomoč pri registraciji.',
        'Predamo dostope in gradivo, dogovorjeno v naročilu.',
        'Ne predajamo tujih licenc, zaprtih storitev in komponent, katerih pravice niso v lasti SOLO.POV.',
        'Pogoji predaje pravic so zapisani v pogodbi ali dogovorjenem naročilu.'
      ],
      payExtra: [
        'Izdelava strani se plača ločeno od rednega vzdrževanja.',
        'Dodatne spremembe nad dogovorjenim obsegom se obračunajo posebej.',
        'Pogoji podpore se dogovorijo posebej.'
      ],
      calcNote: 'Predračun je orientacijski. Končno ceno in roke potrdimo pred začetkom dela.',
      revInfoLabel: 'Pojasnilo o krogih popravkov',
      revHintDesktop: 'Pomaknite se na ⓘ ali kliknite, da izveste, kako se upoštevajo krogi popravkov.',
      revHintMobile: 'Kliknite ⓘ za pojasnilo.',
      revTooltip: [
        'En krog popravkov je en dogovorjen paket pripomb naročnika po pregledu različice strani.',
        'Na primer, zamenjati fotografijo, popraviti besedilo, premakniti blok in uskladiti videz — vse to je lahko del enega kroga.',
        'Odprava tehničnih napak in neskladij z dogovorjenim naročilom ni omejena s številom krogov in se ne zaračuna dodatno.',
        'Nove strani, dodatne funkcije in bistvene spremembe potrjene zasnove se dogovorijo posebej.'
      ],
      calcCustom: 'Individualni izračun',
      calcIndividual: '+ individualna ocena',
      discuss: 'Pogovorimo se o izbranem',
      unsure: 'Ne vem, kaj izbrati',
      choose: 'Izberite paket',
      compareMobile: 'Prikaži paket',
      addonsNote: 'Končna cena je odvisna od obsega in tehničnih zahtev.',
      paymentTitle: 'O plačilu',
      payment: [
        'Izdelava strani se plača ločeno od rednega vzdrževanja.',
        'Domena in plačljive zunanje storitve se lahko plačajo dodatno.',
        'Končno ceno in roke potrdimo pred začetkom dela.',
        'Dodatne spremembe nad dogovorjenim obsegom se obračunajo posebej.',
        'Pogoji podpore se dogovorijo posebej.'
      ],
      vatNote: 'Davčni režim bo potrjen pred objavo.'
    }
  },
  ru: {
    tariffs: [
      {
        id: 'start', name: 'START', price: 300, priceLabel: 'от 300 €',
        desc: 'Для одного основного предложения, специалиста или небольшого бизнеса.',
        features: [
          'Одностраничный сайт.',
          'Адаптивный дизайн на основе готовой структуры.',
          'Несколько смысловых секций в пределах одной страницы.',
          'Простая форма заявки.',
          'Контакты и кнопки связи.',
          'Карта при необходимости.',
          'Базовая SEO-подготовка.',
          'Подключение домена и публикация.',
          'Два раунда правок.'
        ],
        includes: [], cta: 'Выбрать START'
      },
      {
        id: 'business', name: 'BUSINESS', price: 600, priceLabel: 'от 600 €',
        desc: 'Для компании с несколькими направлениями.',
        features: [
          'До пяти страниц.',
          'Персонализированный дизайн.',
          'Мобильная адаптация.',
          'Формы заявок.',
          'Галерея или портфолио.',
          'Основная SEO-подготовка каждой страницы.',
          'Настройка базовой аналитики.',
          'Помощь с Google Business Profile в согласованном объёме.',
          'Три раунда правок.'
        ],
        includes: ['analytics', 'gbp'], cta: 'Выбрать BUSINESS'
      },
      {
        id: 'pro', name: 'PRO', price: 1000, priceLabel: 'от 1 000 €',
        desc: 'Для компании, которая хочет развивать сайт.',
        features: [
          'До десяти страниц.',
          'Расширенная структура и дизайн.',
          'До двух языковых версий.',
          'Раздел статей.',
          'Расширенные формы.',
          'Аналитика и отслеживание согласованных конверсий.',
          'Одна простая интеграция.',
          'Четыре раунда правок.'
        ],
        includes: ['language', 'blog', 'form', 'analytics', 'tracking'], cta: 'Выбрать PRO'
      },
      {
        id: 'custom', name: 'CUSTOM', price: null, priceLabel: 'Индивидуальный расчёт',
        desc: 'Для интернет-магазинов, личных кабинетов, сложных систем бронирования и нестандартных функций.',
        features: [
          'Интернет-магазины.',
          'Личные кабинеты.',
          'Сложные системы бронирования.',
          'Нестандартные функции.',
          'Веб-приложения.',
          'Цена после обсуждения задачи.',
          'Раунды правок по договорённости.'
        ],
        includes: [], cta: 'Обсудить задачу'
      }
    ],
    table: {
      columns: ['START', 'BUSINESS', 'PRO'],
      rows: [
        { label: 'Количество страниц', values: ['1', 'до 5', 'до 10'] },
        { label: 'Дизайн', values: ['Базовая структура', 'Индивидуальный', 'Расширенный'] },
        { label: 'Мобильная версия', values: [true, true, true] },
        { label: 'Формы', values: ['Простая', 'Несколько форм', 'Расширенные'] },
        { label: 'Галерея', values: [false, true, true] },
        { label: 'SEO', values: ['Базовая', 'Базовая по страницам', 'Расширенная'] },
        { label: 'Дополнительные языки', values: ['1', '1', 'до 2'] },
        { label: 'Google Analytics', values: [false, true, true] },
        { label: 'Google Business Profile', values: [false, 'По договорённости', false] },
        { label: 'Подготовка к рекламе', values: [false, false, 'По договорённости'] },
        { label: 'Блог', values: [false, false, true] },
        { label: 'Интеграции', values: [false, false, '1 простая'] },
        { label: 'Раунды правок', key: 'revisions', values: ['2', '3', '4'] },
        { label: 'Поддержка', values: ['По договорённости', 'По договорённости', 'По договорённости'] }
      ]
    },
    addons: [
      { id: 'page', title: 'Дополнительная страница', price: 50 },
      { id: 'language', title: 'Дополнительный язык', price: 100 },
      { id: 'blog', title: 'Блог', price: 120 },
      { id: 'form', title: 'Форма с дополнительными вопросами', price: 70 },
      { id: 'booking', title: 'Онлайн-запись через готовый сервис', price: 120 },
      { id: 'analytics', title: 'Google Analytics', price: 60 },
      { id: 'tracking', title: 'Отслеживание заявок для рекламы', price: 90 },
      { id: 'gbp', title: 'Помощь с Google Business Profile', price: 70 },
      { id: 'calculator', title: 'Простой калькулятор стоимости', price: 150 },
      { id: 'integrations', title: 'Другие интеграции', price: null, individual: true }
    ],
    ui: {
      selected: 'Выбран',
      included: 'Включено',
      includedInTariff: 'Включено в тариф',
      individual: 'Индивидуальная оценка',
      from: 'от',
      calcTitle: 'Ваш выбор',
      calcEmpty: 'Сначала выберите тариф.',
      calcBase: 'Базовый тариф',
      calcAddons: 'Дополнительные функции',
      calcTotal: 'Ориентировочная стоимость от',
      reset: 'Сбросить дополнительные функции',
      payTitle: 'Сначала сайт. Потом оплата.',
      payLead: 'Мы создаём сайт и показываем готовую версию. Вы проверяете результат, согласовываете правки и только после утверждения оплачиваете разработку. Затем мы запускаем сайт и передаём доступы.',
      paySteps: ['Создаём сайт.', 'Вы проверяете.', 'Оплата и передача.'],
      payNote: 'Без предоплаты за разработку для стандартных START и BUSINESS. Для PRO и индивидуальных проектов условия согласовываются отдельно. Домен и платные сервисы оплачиваются отдельно.',
      payDetailsTitle: 'Подробные условия оплаты и передачи сайта',
      payDetails: [
        'Домен рекомендуем оформлять на владельца бизнеса.',
        'Клиент может купить домен самостоятельно либо попросить помощь.',
        'После оплаты передаём согласованные доступы и материалы.',
        'Права на код, дизайн и другие материалы определяются условиями заказа.',
        'Платные сторонние сервисы и регулярное обслуживание оплачиваются отдельно.',
        'Дополнительные работы сверх утверждённого задания согласовываются отдельно.'
      ],
      payNote1: 'Для стандартных проектов START и BUSINESS предоплата за разработку не требуется.',
      payNote2: 'Для сложных и индивидуальных проектов условия оплаты определяются отдельно.',
      payNote3: 'Домен и платные сторонние сервисы оплачиваются отдельно.',
      rightsTitle: 'Домен и права на сайт',
      rightsLead: 'Домен рекомендуем оформлять сразу на имя клиента. После оплаты передаём согласованные доступы и материалы сайта.',
      rightsBullets: [
        'Клиент может купить домен самостоятельно или обратиться за помощью к SOLO.POV.',
        'Передаём доступы и материалы, согласованные в заказе.',
        'Не передаём чужие лицензии, закрытые сервисы и компоненты, права на которые не принадлежат SOLO.POV.',
        'Условия передачи прав фиксируются в договоре или согласованном заказе.'
      ],
      payExtra: [
        'Создание сайта оплачивается отдельно от регулярного обслуживания.',
        'Дополнительные изменения сверх согласованного объёма рассчитываются отдельно.',
        'Условия поддержки оговариваются отдельно.'
      ],
      calcNote: 'Расчёт предварительный. Итоговую стоимость и сроки согласуем до начала работы.',
      revInfoLabel: 'Пояснение о раундах правок',
      revHintDesktop: 'Наведите на ⓘ или нажмите, чтобы узнать, как учитываются раунды правок.',
      revHintMobile: 'Нажмите ⓘ для пояснения.',
      revTooltip: [
        'Один раунд правок — это один согласованный пакет замечаний клиента после просмотра версии сайта.',
        'Например, изменить фотографию, поправить текст, переместить блок и скорректировать оформление — всё это может входить в один раунд.',
        'Исправление технических ошибок и несоответствий утверждённому заданию не ограничивается количеством раундов и не оплачивается дополнительно.',
        'Новые страницы, дополнительные функции и существенные изменения утверждённой концепции согласовываются отдельно.'
      ],
      calcCustom: 'Индивидуальный расчёт',
      calcIndividual: '+ индивидуальная оценка',
      discuss: 'Обсудить выбранный вариант',
      unsure: 'Не знаю, что выбрать',
      choose: 'Выбрать тариф',
      compareMobile: 'Показать тариф',
      addonsNote: 'Итоговая стоимость зависит от объёма и технических требований.',
      paymentTitle: 'Об оплате',
      payment: [
        'Создание сайта оплачивается отдельно от регулярного обслуживания.',
        'Домен и платные внешние сервисы могут оплачиваться дополнительно.',
        'Итоговая стоимость и сроки согласовываются до начала работы.',
        'Дополнительные изменения сверх согласованного объёма рассчитываются отдельно.',
        'Условия поддержки оговариваются отдельно.'
      ],
      vatNote: 'Налоговый режим будет подтверждён перед публикацией.'
    }
  }
};
