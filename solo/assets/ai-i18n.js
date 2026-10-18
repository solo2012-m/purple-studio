/* Solo.Pov — AI, support and automation page data */
window.SOLO_AI = {
  sl: {
    hero: {
      eyebrow: 'Solo.Pov · AI in tehnična podpora',
      title: 'Vaša stran deluje. Pomagamo, da deluje še bolje.',
      sub: 'Tehnična podpora, AI-asistenti in avtomatizacija vsakodnevnih nalog. Manj rutine — več časa za vaše poslovanje.',
      badge: 'Predstavitveni način',
      cards: [
        { id: 'support', n: '01', title: 'Tehnična podpora', desc: 'Želite, da stran deluje, se posodablja in imate vedno koga vprašati?', cta: 'Poglej pakete →' },
        { id: 'ai', n: '02', title: 'AI-asistent', desc: 'Upravljajte vsebino strani prek Telegrama. Prosite AI, da pripravi besedilo, spremeni podatke ali ustvari novo objavo.', cta: 'Kako deluje →' },
        { id: 'automation', n: '03', title: 'Avtomatizacija poslovanja', desc: 'Avtomatizirajte povpraševanja, obvestila, spletne rezervacije in druge ponavljajoče se naloge.', cta: 'Poglej možnosti →' }
      ]
    },
    support: {
      eyebrow: 'Tehnična podpora',
      title: 'Vaša stran pod nadzorom',
      desc: 'Ni se treba spoznati na tehnične podrobnosti. Pomagamo vzdrževati stran, odpravljati težave in vnašati manjše spremembe.',
      tariffs: [
        { name: 'START', price: 'od 19 €/mesec', desc: 'Za manjše statične strani.', features: [
          'Osnovni nadzor dosegljivosti strani.',
          'Mesečni pregled osnovnih funkcij.',
          'Svetovanje po e-pošti.',
          'Obvestilo o odkritih težavah.',
          'Priporočila za potrebne posodobitve.'
        ], note: 'Spremembe vsebine in odprava napak, ki niso povezane z našim delom, se obračunajo posebej.' },
        { name: 'BUSINESS', price: 'od 49 €/mesec', desc: 'Za strani, ki jih redno uporabljate v poslovanju.', features: [
          'Vse iz START.',
          'Redni pregled strani.',
          'Do 30 minut manjših sprememb na mesec.',
          'Preverjanje delovanja obrazcev za povpraševanja.',
          'Prednostna obravnava v delovnem času.',
          'Kratko mesečno poročilo.'
        ] },
        { name: 'PRO', price: 'od 99 €/mesec', desc: 'Za aktivno razvijajoče se strani.', features: [
          'Vse iz BUSINESS.',
          'Pogostejši tehnični nadzor.',
          'Do 90 minut manjših sprememb na mesec.',
          'Nadzor dogovorjenih integracij.',
          'Pomoč pri posodabljanju vsebine.',
          'Prednostna tehnična podpora.',
          'Priporočila za nadaljnji razvoj strani.'
        ] }
      ],
      conditionsTitle: 'Pomembni pogoji',
      conditions: [
        'Paketi so okvirni in odvisni od platforme, zahtevnosti strani in povezanih storitev.',
        'Neizkoriščen čas sprememb se ne prenaša v naslednji mesec.',
        'Nove strani, zahtevne funkcije, redizajn, oglaševalske kampanje in večje izboljšave niso vključene v mesečno vzdrževanje.',
        'Dela nad limitom se dogovorijo posebej.',
        'Odzivni časi in seznam preverjanj se določijo pred vklopom paketa.',
        'Ne obljubljamo podpore 24/7 ali takojšnje odprave vseh napak.'
      ],
      smallTitle: 'Kaj šteje kot manjša sprememba?',
      smallText: 'Zamenjava besedila, fotografije, kontaktnih podatkov, popravek manjšega elementa ali druga preprosta sprememba v okviru obstoječe strukture strani. Izdelava novih strani, zahtevne integracije in bistvene spremembe videza se ocenijo posebej.',
      cta: 'Vklopi podporo →'
    },
    ai: {
      eyebrow: 'AI-asistent',
      title: 'Upravljajte stran s preprostimi sporočili',
      sub: 'Namesto zapletenih nadzornih plošč — znan Telegram. Napišite, kaj želite spremeniti, AI pa pomaga pripraviti rezultat.',
      demoLabel: 'Primer pogovora. To ni povezan bot.',
      demos: [
        { id: 'service', label: 'Nova storitev', chat: [
          { who: 'client', text: 'Na stran dodaj novo storitev — čiščenje fasad. Cena od 5 € za m².' },
          { who: 'ai', text: 'Pripravil sem opis storitve in predlog umestitve na stran. Želite videti predhodno različico?' },
          { who: 'client', text: 'Da, pokaži.' },
          { who: 'ai', text: 'Predhodna različica je pripravljena. Po vaši potrditvi je spremembo mogoče objaviti.' }
        ] },
        { id: 'article', label: 'Objava članka', chat: [
          { who: 'client', text: 'Pripravi nov članek o pripravi fasade na zimo.' },
          { who: 'ai', text: 'Pripravil sem osnutek članka ter predlagal naslov in strukturo. Želite pregled?' },
          { who: 'client', text: 'Da, pošlji osnutek.' },
          { who: 'ai', text: 'Osnutek je pripravljen. Po potrditvi ga je mogoče objaviti.' }
        ] },
        { id: 'info', label: 'Sprememba podatkov', chat: [
          { who: 'client', text: 'Spremeni delovni čas: pon–pet 8:00–17:00, sobota zaprto.' },
          { who: 'ai', text: 'Našel sem podatke o delovnem času. Pripravil sem predhodno spremembo za potrditev.' },
          { who: 'client', text: 'Potrdi.' },
          { who: 'ai', text: 'Sprememba je pripravljena za objavo po nastavljenem postopku potrditve.' }
        ] }
      ],
      note: 'Dejanska objava je možna le po nastavitvi integracije, ustreznih pravic dostopa in potrditvi naročnika. AI pripravi predlog, ne spreminja strani brez potrditve.',
      tariffs: [
        { name: 'AI START', price: 'od 29 €/mesec', features: [
          'AI-pomočnik za pripravo besedil in sprememb.',
          'Ena povezana stran.',
          'Delo prek dogovorjenega vmesnika, na primer Telegrama.',
          'Predhodni pregled pripravljenih sprememb.',
          'Uporaba v skladu z dogovorjenimi pogoji.'
        ] },
        { name: 'AI BUSINESS', price: 'od 59 €/mesec', features: [
          'Vse iz START.',
          'Priprava novih objav in razdelkov.',
          'Delo z več vrstami vsebine.',
          'Avtomatizacija preprostih ponavljajočih se nalog.',
          'Dodatni scenariji upravljanja strani.',
          'Razširjen limit uporabe.'
        ] },
        { name: 'AI PRO', price: 'individualno', features: [
          'Več strani ali poslovnih procesov.',
          'Individualni AI-scenariji.',
          'Povezovanje zunanjih storitev.',
          'Dodatni agenti in avtomatizacije.',
          'Individualni limiti in pogoji storitve.'
        ] }
      ],
      tariffNote: 'Stroški povezovanja, nastavitve in uporabe zunanjih AI-storitev se lahko obračunajo posebej. Razpoložljive funkcije so odvisne od tehničnih možnosti strani in izbrane integracije.',
      tariffFootnote: 'Cene so predhodni komercialni okviri; končni pogoji bodo potrjeni pred začetkom prodaje.',
      cta: 'Izberi AI-asistenta →'
    },
    automation: {
      eyebrow: 'Avtomatizacija poslovanja',
      title: 'Manj ročnega dela. Več avtomatizacije.',
      desc: 'Povežemo vašo stran z ustreznimi orodji, da se povpraševanja, obvestila in ponavljajoči se procesi izvajajo samodejno.',
      cards: [
        { title: 'Povpraševanja v Telegram', desc: 'Obvestilo o novem povpraševanju s strani.' },
        { title: 'Samodejni odgovori', desc: 'Potrditev prejema sporočila stranki.' },
        { title: 'Spletne rezervacije', desc: 'Povezava strani s sistemom za rezervacijo terminov.' },
        { title: 'CRM in preglednice', desc: 'Prenos povpraševanj v izbrano evidenco.' },
        { title: 'AI-obdelava povpraševanj', desc: 'Predhodna razvrstitev sporočil in priprava odgovorov.' },
        { title: 'Objava vsebine', desc: 'Pomoč pri pripravi in objavi člankov ter posodobitev.' }
      ],
      priceNote: 'Stroški avtomatizacije so odvisni od števila povezanih storitev, zahtevnosti scenarija in potrebnega vzdrževanja.',
      prices: [
        { title: 'Preprosta avtomatizacija', price: 'od 50 €' },
        { title: 'Več povezanih dejanj', price: 'od 150 €' },
        { title: 'Individualna avtomatizacija', price: 'po oceni projekta' }
      ],
      footnote: 'Cene so okvirne. Naročnine zunanjih storitev in stroški API se plačajo posebej, razen če je dogovorjeno drugače.',
      cta: 'Pogovorimo se o avtomatizaciji →'
    },
    form: {
      title: 'Povejte nam, kaj potrebujete. Predlagali bomo rešitev.',
      desc: 'Odgovorite na nekaj vprašanj — pripravili bomo predlog za podporo, AI ali avtomatizacijo.',
      topicLabel: 'Kaj vas zanima?',
      topics: [
        { value: 'support', label: 'Tehnična podpora strani' },
        { value: 'ai', label: 'AI-asistent za stran' },
        { value: 'automation_leads', label: 'Avtomatizacija povpraševanj' },
        { value: 'automation_other', label: 'Avtomatizacija drugih nalog' },
        { value: 'consult', label: 'Ne vem, želim posvet' }
      ],
      siteLabel: 'Naslov obstoječe strani (neobvezno)',
      sitePh: 'https://primer.si',
      commentLabel: 'Na kratko opišite nalogo',
      commentPh: 'Na primer: želim, da nova povpraševanja pridejo v Telegram in da se stranka samodejno obvesti.',
      emailLabel: 'Email za odgovor',
      emailPh: 'ime@primer.si',
      telegramLabel: 'Telegram kontakt (neobvezno)',
      telegramPh: '@uporabnisko_ime',
      consent: 'Želim prejemati novice in ponudbe SOLO.POV',
      consentNote: 'Neobvezno. Odjava je mogoča kadarkoli.',
      submit: 'Pridobite predlog',
      note: 'Pošiljanje zahtev še ni povezano. Prikazali bomo besedilo, ki ga lahko kopirate.',
      privacy: 'Politika zasebnosti',
      notSentTitle: 'Pošiljanje še ni povezano',
      notSentText: 'Zahteva <b>ni bila poslana</b>, ker obdelava zahtev še ni povezana. Kopirajte besedilo spodaj in nam ga pošljite.',
      copy: 'Kopiraj besedilo',
      copied: 'Kopirano',
      back: 'Nazaj na obrazec',
      errEmail: 'Vnesite veljaven email.',
      errUrl: 'Vnesite veljaven naslov strani.',
      errTopic: 'Izberite, kaj vas zanima.'
    },
    faq: {
      title: 'Pogosta vprašanja',
      items: [
        { q: 'Ali potrebujem novo stran za povezavo AI?', a: 'Ni vedno treba. Možnost povezave je odvisna od obstoječe strani, njene platforme in dostopov.' },
        { q: 'Ali AI lahko sam spremeni mojo stran?', a: 'AI lahko pripravi spremembe. Možnost objave je odvisna od nastavljenih pravic in dogovorjenega postopka potrditve.' },
        { q: 'Ali moram kupiti mesečno podporo?', a: 'Ne. Veliko del je mogoče naročiti enkratno.' },
        { q: 'Ali lahko povežem AI brez tehnične podpore?', a: 'Da, če stran in potrebne integracije to omogočajo.' },
        { q: 'Kaj pa, če nimam strani?', a: 'Najprej lahko izdelamo stran, nato povežemo potrebne funkcije.' }
      ]
    },
    cross: {
      title: 'Potrebujete več?',
      link: 'Izdelava in izboljšanje strani →',
      future: 'Oglaševanje, SEO in analitika — kmalu'
    }
  },
  ru: {
    hero: {
      eyebrow: 'Solo.Pov · AI и техническая поддержка',
      title: 'Ваш сайт работает. А мы поможем ему работать ещё лучше.',
      sub: 'Техническая поддержка, AI-ассистенты и автоматизация повседневных задач. Меньше рутины — больше времени для вашего бизнеса.',
      badge: 'Демонстрационный режим',
      cards: [
        { id: 'support', n: '01', title: 'Техническая поддержка', desc: 'Хотите, чтобы ваш сайт оставался в рабочем состоянии, обновлялся и всегда было к кому обратиться?', cta: 'Посмотреть тарифы →' },
        { id: 'ai', n: '02', title: 'AI-ассистент', desc: 'Управляйте содержимым сайта через Telegram. Попросите AI подготовить текст, изменить информацию или создать новую публикацию.', cta: 'Как это работает →' },
        { id: 'automation', n: '03', title: 'Автоматизация бизнеса', desc: 'Автоматизируйте заявки, уведомления, онлайн-запись и другие повторяющиеся задачи.', cta: 'Посмотреть возможности →' }
      ]
    },
    support: {
      eyebrow: 'Техническая поддержка',
      title: 'Ваш сайт под присмотром',
      desc: 'Не обязательно разбираться в технических деталях. Мы поможем поддерживать сайт, исправлять возникающие проблемы и вносить небольшие изменения.',
      tariffs: [
        { name: 'START', price: 'от 19 €/месяц', desc: 'Для небольших статических сайтов.', features: [
          'Базовый контроль доступности сайта.',
          'Проверка основных функций раз в месяц.',
          'Консультации по электронной почте.',
          'Уведомление об обнаруженных проблемах.',
          'Рекомендации по необходимым обновлениям.'
        ], note: 'Изменения содержимого и устранение неисправностей, не связанных с нашей работой, оплачиваются отдельно.' },
        { name: 'BUSINESS', price: 'от 49 €/месяц', desc: 'Для сайтов, которые регулярно используются в бизнесе.', features: [
          'Всё из START, плюс:',
          'Регулярная проверка сайта.',
          'До 30 минут небольших изменений в месяц.',
          'Проверка работоспособности форм заявок.',
          'Приоритетная обработка обращений в рабочее время.',
          'Краткий ежемесячный отчёт.'
        ] },
        { name: 'PRO', price: 'от 99 €/месяц', desc: 'Для активно развивающихся сайтов.', features: [
          'Всё из BUSINESS, плюс:',
          'Более частый технический контроль.',
          'До 90 минут небольших изменений в месяц.',
          'Контроль согласованных интеграций.',
          'Помощь с обновлением содержимого.',
          'Приоритетная техническая поддержка.',
          'Рекомендации по дальнейшему развитию сайта.'
        ] }
      ],
      conditionsTitle: 'Важные условия',
      conditions: [
        'Тарифы ориентировочные и зависят от платформы, сложности сайта и подключённых сервисов.',
        'Неиспользованное время изменений не переносится на следующий месяц.',
        'Новые страницы, сложные функции, редизайн, рекламные кампании и крупные доработки не входят в ежемесячное обслуживание.',
        'Работы сверх лимита согласовываются отдельно.',
        'Сроки реакции и перечень проверок уточняются до подключения тарифа.',
        'Не обещаем круглосуточную поддержку или мгновенное устранение любых неисправностей.'
      ],
      smallTitle: 'Что считается небольшим изменением?',
      smallText: 'Замена текста, фотографии, контактной информации, исправление небольшого элемента или другое простое изменение в рамках существующей структуры сайта. Создание новых страниц, сложные интеграции и существенные изменения дизайна оцениваются отдельно.',
      cta: 'Подключить поддержку →'
    },
    ai: {
      eyebrow: 'AI-ассистент',
      title: 'Управляйте сайтом обычными сообщениями',
      sub: 'Вместо сложных панелей управления — привычный Telegram. Напишите, что нужно изменить, а AI поможет подготовить результат.',
      demoLabel: 'Пример переписки. Это не подключённый бот.',
      demos: [
        { id: 'service', label: 'Новая услуга', chat: [
          { who: 'client', text: 'Добавь на сайт новую услугу — чистка фасадов. Цена от 5 € за м².' },
          { who: 'ai', text: 'Подготовил описание услуги и предложение по размещению на сайте. Хотите посмотреть предварительную версию?' },
          { who: 'client', text: 'Да, покажи.' },
          { who: 'ai', text: 'Предварительная версия готова. После вашего подтверждения изменения можно опубликовать.' }
        ] },
        { id: 'article', label: 'Публикация статьи', chat: [
          { who: 'client', text: 'Подготовь новую статью о подготовке фасада к зиме.' },
          { who: 'ai', text: 'Подготовил черновик статьи и предложил заголовок и структуру. Хотите посмотреть?' },
          { who: 'client', text: 'Да, покажи черновик.' },
          { who: 'ai', text: 'Черновик готов. После подтверждения его можно опубликовать.' }
        ] },
        { id: 'info', label: 'Изменение информации', chat: [
          { who: 'client', text: 'Измени часы работы: пн–пт 8:00–17:00, суббота закрыто.' },
          { who: 'ai', text: 'Нашёл информацию о часах работы. Подготовил предварительное изменение для подтверждения.' },
          { who: 'client', text: 'Подтверждаю.' },
          { who: 'ai', text: 'Изменение готово к публикации после настроенного подтверждения.' }
        ] }
      ],
      note: 'Реальная публикация возможна только после настройки интеграции, необходимых прав доступа и подтверждения клиента. AI готовит изменения, но не публикует их без подтверждения.',
      tariffs: [
        { name: 'AI START', price: 'от 29 €/месяц', features: [
          'AI-помощник для подготовки текстов и изменений.',
          'Один подключённый сайт.',
          'Работа через согласованный интерфейс, например Telegram.',
          'Предварительный просмотр подготовленных изменений.',
          'Лимит использования согласно согласованным условиям.'
        ] },
        { name: 'AI BUSINESS', price: 'от 59 €/месяц', features: [
          'Всё из START, плюс:',
          'Подготовка новых публикаций и разделов.',
          'Работа с несколькими типами содержимого.',
          'Автоматизация простых повторяющихся задач.',
          'Дополнительные сценарии управления сайтом.',
          'Расширенный лимит использования.'
        ] },
        { name: 'AI PRO', price: 'индивидуально', features: [
          'Несколько сайтов или бизнес-процессов.',
          'Индивидуальные AI-сценарии.',
          'Подключение внешних сервисов.',
          'Дополнительные агенты и автоматизации.',
          'Индивидуальные ограничения и условия обслуживания.'
        ] }
      ],
      tariffNote: 'Стоимость подключения, настройки и использования внешних AI-сервисов может рассчитываться отдельно. Доступные функции зависят от технических возможностей сайта и выбранной интеграции.',
      tariffFootnote: 'Указанные цены — предварительные коммерческие ориентиры, окончательные условия будут утверждены перед запуском продаж.',
      cta: 'Подобрать AI-ассистента →'
    },
    automation: {
      eyebrow: 'Автоматизация бизнеса',
      title: 'Меньше ручной работы. Больше автоматизации.',
      desc: 'Соединим ваш сайт с нужными инструментами, чтобы заявки, уведомления и повторяющиеся процессы выполнялись автоматически.',
      cards: [
        { title: 'Заявки в Telegram', desc: 'Уведомление о новой заявке с сайта.' },
        { title: 'Автоматические ответы', desc: 'Подтверждение получения обращения клиенту.' },
        { title: 'Онлайн-запись', desc: 'Интеграция сайта с системой бронирования времени.' },
        { title: 'CRM и таблицы', desc: 'Передача заявок в выбранную систему учёта.' },
        { title: 'AI-обработка заявок', desc: 'Предварительная классификация обращений и подготовка ответов.' },
        { title: 'Публикация содержимого', desc: 'Помощь в подготовке и размещении статей и обновлений.' }
      ],
      priceNote: 'Стоимость автоматизации зависит от количества подключённых сервисов, сложности сценария и необходимого обслуживания.',
      prices: [
        { title: 'Простая автоматизация', price: 'от 50 €' },
        { title: 'Несколько связанных действий', price: 'от 150 €' },
        { title: 'Индивидуальная автоматизация', price: 'по оценке проекта' }
      ],
      footnote: 'Цены ориентировочные. Подписки сторонних сервисов и расходы на API оплачиваются отдельно, если не согласовано иное.',
      cta: 'Обсудить автоматизацию →'
    },
    form: {
      title: 'Расскажите о своей задаче. Мы предложим решение.',
      desc: 'Ответьте на несколько вопросов — подготовим предложение по поддержке, AI или автоматизации.',
      topicLabel: 'Что вас интересует?',
      topics: [
        { value: 'support', label: 'Техническая поддержка сайта' },
        { value: 'ai', label: 'AI-ассистент для сайта' },
        { value: 'automation_leads', label: 'Автоматизация заявок' },
        { value: 'automation_other', label: 'Автоматизация других задач' },
        { value: 'consult', label: 'Не знаю, хочу консультацию' }
      ],
      siteLabel: 'Адрес существующего сайта (необязательно)',
      sitePh: 'https://primer.si',
      commentLabel: 'Кратко опишите задачу',
      commentPh: 'Например: хочу, чтобы новые заявки приходили в Telegram, а клиент получал автоматическое подтверждение.',
      emailLabel: 'Email для ответа',
      emailPh: 'name@example.com',
      telegramLabel: 'Telegram-контакт (необязательно)',
      telegramPh: '@username',
      consent: 'Хочу получать новости и предложения SOLO.POV',
      consentNote: 'Необязательно. Отписаться можно в любой момент.',
      submit: 'Получить предложение',
      note: 'Отправка заявок пока не подключена. Мы покажем готовый текст для копирования.',
      privacy: 'Политика конфиденциальности',
      notSentTitle: 'Отправка пока не подключена',
      notSentText: 'Заявка <b>не была отправлена</b>, потому что обработка заявок ещё не подключена. Скопируйте текст ниже и пришлите нам.',
      copy: 'Скопировать текст',
      copied: 'Скопировано',
      back: 'Вернуться к форме',
      errEmail: 'Укажите корректный email.',
      errUrl: 'Укажите корректный адрес сайта.',
      errTopic: 'Выберите, что вас интересует.'
    },
    faq: {
      title: 'Частые вопросы',
      items: [
        { q: 'Нужен ли мне новый сайт для подключения AI?', a: 'Не всегда. Возможность подключения зависит от устройства существующего сайта, его платформы и доступов.' },
        { q: 'Может ли AI самостоятельно менять мой сайт?', a: 'AI может подготавливать изменения. Возможность их публикации зависит от настроенных прав и согласованного процесса подтверждения.' },
        { q: 'Обязательно ли покупать ежемесячную поддержку?', a: 'Нет. Многие работы можно заказать разово.' },
        { q: 'Можно ли подключить AI без технического сопровождения?', a: 'Да, если сайт и необходимые интеграции позволяют это сделать.' },
        { q: 'Что, если у меня нет сайта?', a: 'Мы можем сначала создать сайт, а затем подключить необходимые функции.' }
      ]
    },
    cross: {
      title: 'Нужно больше возможностей?',
      link: 'Создание и улучшение сайтов →',
      future: 'Реклама, SEO и аналитика — скоро'
    }
  }
};
