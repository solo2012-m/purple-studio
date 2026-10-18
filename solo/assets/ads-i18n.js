/* Solo.Pov — advertising and promotion page data */
window.SOLO_ADS = {
  sl: {
    hero: {
      eyebrow: 'SOLO.POV · OGLAŠEVANJE IN PROMOCIJA',
      title: 'Pomagamo, da vas stranke najdejo.',
      sub: 'Nastavimo oglaševanje, izboljšamo vidnost v iskalnikih in pomagamo razumeti, kateri kanali prinašajo povpraševanja.'
    },
    scenarios: [
      { id: 'start', n: '01', title: 'Želim začeti promocijo', desc: 'Oglaševanja še nimam ali želim dodati nov kanal za pridobivanje strank.' },
      { id: 'running', n: '02', title: 'Že oglašujem', desc: 'Oglaševanje deluje, vendar želim razumeti rezultate in možnosti izboljšav.' }
    ],
    catalog: {
      title: 'Kako lahko pomagamo vašemu podjetju?',
      sub: 'Izberite potrebne storitve. Končno ceno in obseg potrdimo po pregledu vaše situacije.',
      groups: [
        { id: 'paid', num: '01', title: 'Plačljivo oglaševanje', sub: 'Nastavimo oglaševanje v Googlu, Facebooku in Instagramu, da potencialne stranke spoznajo vaše storitve.' },
        { id: 'search', num: '02', title: 'Iskalna promocija', sub: 'Pomagamo potencialnim strankam najti informacije o vašem podjetju prek iskalnikov in sodobnih AI-sistemov.' },
        { id: 'analytics', num: '03', title: 'Analitika in konverzije', sub: 'Pomagamo razumeti, od kod prihajajo obiskovalci, kaj počnejo in kateri kanali prinašajo povpraševanja.' },
        { id: 'development', num: '04', title: 'Preverjanje in razvoj', sub: 'Pregledamo obstoječe oglaševanje in pomagamo določiti naslednje korake.' }
      ],
      categories: [
        { id: 'google', letter: 'A', title: 'Google Ads', desc: 'Pokažemo vaše oglase ljudem, ki v Googleu iščejo ustrezne izdelke ali storitve.', features: [
          'Začetna nastavitev oglaševalskega računa.',
          'Izbira iskalnih poizvedb.',
          'Ustvarjanje iskalnih kampanj.',
          'Nastavitev oglasov.',
          'Nastavitev ciljev in konverzij.',
          'Spremljanje rezultatov.',
          'Optimizacija dogovorjenih kampanj.'
        ], options: [
          { id: 'google_setup', title: 'Nastavitev in zagon', price: 'od 150 €', type: 'once' },
          { id: 'google_monthly', title: 'Vodenje kampanj', price: 'od 120 €/mesec', type: 'monthly' }
        ] },
        { id: 'meta', letter: 'B', title: 'Oglaševanje na Facebooku in Instagramu', desc: 'Nastavimo oglaševanje prek Meta Ads, da potencialne stranke spoznajo vašo ponudbo in oddajo povpraševanje.', features: [
          'Nastavitev oglaševalskega računa.',
          'Povezava strani Facebook in računa Instagram.',
          'Povezava Meta Pixel.',
          'Nastavitev razpoložljivih konverzijskih dogodkov.',
          'Priprava strukture kampanj.',
          'Nastavitev občinstva.',
          'Zagon oglasov.',
          'Analiza in optimizacija rezultatov.'
        ], options: [
          { id: 'meta_setup', title: 'Nastavitev in zagon', price: 'od 150 €', type: 'once' },
          { id: 'meta_monthly', title: 'Vodenje kampanj', price: 'od 120 €/mesec', type: 'monthly' }
        ] },
        { id: 'seo', letter: 'C', title: 'SEO in vidnost v AI-iskanju', desc: 'Pomagamo iskalnikom bolje razumeti vašo stran, potencialnim strankam pa najti informacije o vaših storitvah.', options: [
          { id: 'seo_basic', title: 'SEO', price: 'od 100 €', type: 'once', features: [
            'Analiza strukture strani.',
            'Naslovi in metaopisi.',
            'Optimizacija obstoječih strani.',
            'Iskalne poizvedbe.',
            'Tehnična priporočila.',
            'Vsebina in notranje povezave.'
          ] },
          { id: 'seo_local', title: 'Lokalno SEO', price: 'od 80 €', type: 'once', features: [
            'Google Business Profile.',
            'Podatki podjetja.',
            'Kategorije storitev.',
            'Lokalne iskalne poizvedbe.',
            'Usklajenost kontaktnih podatkov.',
            'Priporočila za lokalno prisotnost.'
          ] },
          { id: 'seo_geo', title: 'GEO (Generative Engine Optimization)', price: 'individualno', type: 'individual', features: [
            'Strukturiranje informacij o podjetju.',
            'Jasni opisi storitev.',
            'Tematski članki in uporabna gradiva.',
            'Preverjanje kakovosti in celovitosti informacij.',
            'Analiza predstavitve v dostopnih AI-iskanjih.',
            'Priporočila za vidnost v AI-iskanju.'
          ], note: 'GEO ne zagotavlja omemb, citatov ali določenih mest v odgovorih AI. SEO in GEO se delno prekrivata.' }
        ], note: 'SEO in GEO se delno prekrivata. Ne obljubljamo avtomatskega vstopa v ChatGPT, Gemini ali druge AI-sisteme.' },
        { id: 'analytics', letter: 'D', title: 'Analitika in konverzije', desc: 'Ugotovite, od kod prihajajo vaše stranke.', features: [
          'Google Analytics 4.',
          'Google Tag Manager.',
          'Meta Pixel.',
          'Dogodki oddaje obrazcev.',
          'Spremljanje dogovorjenih dejanj na strani.',
          'Povezava Google Ads konverzij.',
          'Preverjanje pravilnosti prenosa podatkov.',
          'Razumljiva poročila.'
        ], options: [
          { id: 'analytics_basic', title: 'Osnovna nastavitev analitike', price: 'od 50 €', type: 'once' },
          { id: 'analytics_pixel', title: 'Meta Pixel in dogodki', price: 'od 60 €', type: 'once' },
          { id: 'analytics_complex', title: 'Zahtevne integracije', price: 'individualno', type: 'individual' }
        ], note: 'Namestitev orodij in uporaba podatkov morata upoštevati zahteve glede zasebnosti in soglasja obiskovalcev, vključno s pravili GDPR in piškotkov.' }
      ]
    },
    issues: {
      title: 'Oglaševanje že poteka, rezultati pa vas ne zadovoljijo?',
      sub: 'Pregledali bomo razpoložljive kazalnike, strukturo kampanj in nastavitve sledenja. Pomagali bomo določiti naslednje korake.',
      items: [
        { id: 'clicks', label: 'Veliko klikov, malo povpraševanj.' },
        { id: 'cost', label: 'Oglaševanje je predrago.' },
        { id: 'ads', label: 'Ne razumem, kateri oglasi delujejo.' },
        { id: 'analytics', label: 'Analitika ni nastavljena.' },
        { id: 'improve', label: 'Želim izboljšati obstoječe kampanje.' },
        { id: 'consult', label: 'Potrebujem posvet.' }
      ],
      note: 'Za globljo oceno učinkovitosti potrebujemo dostop do podatkov oglaševalskega računa in analitike. Brez tega so mogoča le predhodna priporočila.',
      cta: 'Pridobite oceno oglaševanja →'
    },
    explainer: {
      title: 'Kateri kanal je pravi za vas?',
      items: [
        { title: 'Google Ads in Meta Ads', desc: 'Plačljivo oglaševanje za pridobivanje prometa v času kampanj.' },
        { title: 'SEO', desc: 'Dolgoročno delo na organski vidnosti v iskalnikih.' },
        { title: 'Lokalno SEO', desc: 'Prisotnost podjetja v lokalnih rezultatih in na zemljevidih.' },
        { title: 'GEO', desc: 'Boljša razumljivost in dostopnost informacij o podjetju za generativno iskanje.' }
      ],
      note: 'Ne veste, kaj ustreza vašemu podjetju? Pomagamo izbrati smer glede na cilje, konkurenco in proračun.'
    },
    form: {
      title: 'Povejte nam o svojem podjetju. Izbrali bomo promocijo.',
      desc: 'Izberite storitve ali težave zgoraj ali opišite svojo nalogo.',
      help: 'Preučili bomo vašo nalogo in predlagali ustrezne kanale, predhodno ceno in naslednje korake. Pošiljanje zahteve vas k ničemur ne obvezuje.',
      summaryTitle: 'Vaša zahteva SOLO.POV',
      setup: 'Enkratna nastavitev',
      monthly: 'Mesečno spremljanje',
      individual: 'Individualna ocena',
      issue: 'Dodatna naloga',
      none: 'Nič ni izbrano — opišite nalogo in predlagali bomo možnost.',
      remove: 'Odstrani',
      siteLabel: 'Naslov strani (če obstaja)',
      sitePh: 'https://primer.si',
      businessLabel: 'S čim se ukvarja vaše podjetje?',
      businessPh: 'Na primer: storitve čiščenja fasad in streh.',
      regionLabel: 'Kje je vaše ciljno občinstvo / regija promocije?',
      regionPh: 'Na primer: Ljubljana in okolica.',
      budgetLabel: 'Okvirni oglaševalski proračun (neobvezno)',
      budgetPh: 'Na primer: 300 €/mesec',
      budgetNote: 'Oglaševalski proračun se plača posebej in ni del cene storitev SOLO.POV.',
      commentLabel: 'Dodatne želje',
      commentPh: 'Na primer: želim več povpraševanj za čiščenje fasad v Ljubljani.',
      emailLabel: 'Email za odgovor',
      emailPh: 'ime@primer.si',
      telegramLabel: 'Telegram kontakt (neobvezno)',
      telegramPh: '@uporabnisko_ime',
      consent: 'Želim prejemati gradiva in ponudbe SOLO.POV',
      consentNote: 'Neobvezno. Odjava je mogoča kadarkoli.',
      privacy: 'Politika zasebnosti',
      submit: 'Pridobite ponudbo',
      note: 'Pošiljanje zahtev še ni povezano. Prikazali bomo besedilo, ki ga lahko kopirate.',
      notSentTitle: 'Pošiljanje še ni povezano',
      notSentText: 'Zahteva <b>ni bila poslana</b>, ker obdelava zahtev še ni povezana. Kopirajte besedilo spodaj in nam ga pošljite.',
      copy: 'Kopiraj besedilo',
      copied: 'Kopirano',
      back: 'Nazaj na obrazec',
      errEmail: 'Vnesite veljaven email.',
      errSite: 'Vnesite veljaven naslov strani.',
      errEmpty: 'Izberite storitev ali opišite nalogo.'
    },
    process: {
      title: 'Kako delamo',
      steps: [
        'Preučimo podjetje, cilje in izhodiščne podatke.',
        'Predlagamo kanale in uskladimo proračun.',
        'Nastavimo analitiko in oglaševalska orodja.',
        'Zaženemo dogovorjene kampanje.',
        'Analiziramo podatke in predlagamo prilagoditve.'
      ],
      note: 'Oglaševalski računi in povezani profili so, kadar je mogoče, v lasti naročnika. SOLO.POV prejme delovne dostope v dogovorjenem obsegu. Ne obljubljamo zagotovljenega števila povpraševanj ali prodaje.'
    },
    faq: {
      title: 'Pogosta vprašanja',
      items: [
        { q: 'Ali lahko naročim oglaševanje brez izdelave strani?', a: 'Da, če imate stran ali drug kanal, na katerega lahko usmerimo promet.' },
        { q: 'Kakšen proračun potrebujem za začetek?', a: 'Odvisno od panoge, konkurence in ciljev. Predlagali bomo realen okvir in ga uskladili z vami.' },
        { q: 'Kakšna je razlika med Google Ads in oglaševanjem na Facebooku ter Instagramu?', a: 'Google Ads pogosto zajame ljudi z aktivnim iskanjem, Meta Ads pa omogoča ciljanje po interesih in občinstvih.' },
        { q: 'Ali je treba posebej plačati oglaševalski proračun?', a: 'Da. Proračun se plača oglaševalski platformi in ni del cene storitev SOLO.POV.' },
        { q: 'Kdaj lahko SEO prinese rezultate?', a: 'SEO je dolgoročna dejavnost. Časovni okvir je odvisen od stanja strani, konkurence in obsega dela; zagotovljenih pozicij ne obljubljamo.' },
        { q: 'Kaj je GEO-promocija?', a: 'GEO je delo na tem, da so informacije o podjetju jasne, celovite in dostopne sistemom generativnega iskanja. Ne zagotavlja omemb ali citatov.' },
        { q: 'Ali lahko izboljšate že delujoče oglaševanje?', a: 'Da, če imamo dostop do podatkov kampanj in analitike. Najprej pregledamo stanje in določimo prioritete.' },
        { q: 'Kdo je lastnik oglaševalskih računov in podatkov?', a: 'Kadar je mogoče, so računi in profili v lasti naročnika. SOLO.POV prejme le dogovorjene delovne dostope.' }
      ]
    }
  },
  ru: {
    hero: {
      eyebrow: 'SOLO.POV · РЕКЛАМА И ПРОДВИЖЕНИЕ',
      title: 'Поможем вашим клиентам найти вас',
      sub: 'Настроим рекламу, улучшим поисковую видимость и поможем понять, какие каналы приводят обращения.'
    },
    scenarios: [
      { id: 'start', n: '01', title: 'Хочу запустить продвижение', desc: 'У меня ещё нет рекламы или я хочу подключить новый канал привлечения клиентов.' },
      { id: 'running', n: '02', title: 'Уже рекламируюсь', desc: 'Реклама работает, но хочу разобраться в результатах и возможностях улучшения.' }
    ],
    catalog: {
      title: 'Как мы можем помочь вашему бизнесу?',
      sub: 'Выберите необходимые услуги. Итоговую стоимость и объём согласуем после оценки вашей ситуации.',
      groups: [
        { id: 'paid', num: '01', title: 'Платная реклама', sub: 'Настроим рекламу в Google, Facebook и Instagram, чтобы знакомить потенциальных клиентов с вашими услугами.' },
        { id: 'search', num: '02', title: 'Поисковое продвижение', sub: 'Поможем потенциальным клиентам находить информацию о вашем бизнесе через поиск и современные AI-системы.' },
        { id: 'analytics', num: '03', title: 'Аналитика и конверсии', sub: 'Поможем понять, откуда приходят посетители, какие действия они совершают и какие каналы приносят обращения.' },
        { id: 'development', num: '04', title: 'Проверка и развитие', sub: 'Проверим текущую рекламу и поможем определить следующие шаги.' }
      ],
      categories: [
        { id: 'google', letter: 'A', title: 'Google Ads', desc: 'Покажем ваши объявления людям, которые ищут соответствующие товары или услуги в Google.', features: [
          'Первоначальная настройка рекламного кабинета.',
          'Подбор поисковых запросов.',
          'Создание поисковых кампаний.',
          'Настройка объявлений.',
          'Настройка целей и конверсий.',
          'Контроль результатов.',
          'Оптимизация согласованных кампаний.'
        ], options: [
          { id: 'google_setup', title: 'Настройка и запуск', price: 'от 150 €', type: 'once' },
          { id: 'google_monthly', title: 'Ведение кампаний', price: 'от 120 €/мес.', type: 'monthly' }
        ] },
        { id: 'meta', letter: 'B', title: 'Реклама Facebook и Instagram', desc: 'Настроим рекламу через Meta Ads, чтобы знакомить потенциальных клиентов с вашим предложением и получать обращения.', features: [
          'Настройка рекламного кабинета.',
          'Подключение страницы Facebook и аккаунта Instagram.',
          'Подключение Meta Pixel.',
          'Настройка доступных событий конверсий.',
          'Подготовка структуры кампаний.',
          'Настройка аудитории.',
          'Запуск рекламных объявлений.',
          'Анализ и оптимизация результатов.'
        ], options: [
          { id: 'meta_setup', title: 'Настройка и запуск', price: 'от 150 €', type: 'once' },
          { id: 'meta_monthly', title: 'Ведение кампаний', price: 'от 120 €/мес.', type: 'monthly' }
        ] },
        { id: 'seo', letter: 'C', title: 'SEO и видимость в AI-поиске', desc: 'Поможем поисковым системам лучше понимать ваш сайт, а потенциальным клиентам — находить информацию о ваших услугах.', options: [
          { id: 'seo_basic', title: 'SEO', price: 'от 100 €', type: 'once', features: [
            'Анализ структуры сайта.',
            'Заголовки и метаописания.',
            'Оптимизация существующих страниц.',
            'Поисковые запросы.',
            'Технические рекомендации.',
            'Работа с содержимым и внутренними ссылками.'
          ] },
          { id: 'seo_local', title: 'Локальное SEO', price: 'от 80 €', type: 'once', features: [
            'Google Business Profile.',
            'Данные компании.',
            'Категории услуг.',
            'Локальные поисковые запросы.',
            'Согласованность контактной информации.',
            'Рекомендации по локальному присутствию.'
          ] },
          { id: 'seo_geo', title: 'GEO (Generative Engine Optimization)', price: 'индивидуально', type: 'individual', features: [
            'Структурирование информации о компании.',
            'Понятное описание услуг.',
            'Тематические статьи и полезные материалы.',
            'Проверка качества и полноты информации.',
            'Анализ представления в доступных AI-поисковых системах.',
            'Рекомендации по присутствию в AI-поиске.'
          ], note: 'GEO не гарантирует упоминаний, цитирований или определённых позиций в ответах AI. SEO и GEO частично пересекаются.' }
        ], note: 'SEO и GEO частично пересекаются. Мы не обещаем автоматического попадания в ChatGPT, Gemini или другие AI-системы.' },
        { id: 'analytics', letter: 'D', title: 'Аналитика и конверсии', desc: 'Узнайте, откуда приходят ваши клиенты.', features: [
          'Google Analytics 4.',
          'Google Tag Manager.',
          'Meta Pixel.',
          'События отправки форм.',
          'Отслеживание согласованных действий на сайте.',
          'Подключение Google Ads-конверсий.',
          'Проверка корректности передачи данных.',
          'Понятные отчёты.'
        ], options: [
          { id: 'analytics_basic', title: 'Базовое подключение аналитики', price: 'от 50 €', type: 'once' },
          { id: 'analytics_pixel', title: 'Meta Pixel и события', price: 'от 60 €', type: 'once' },
          { id: 'analytics_complex', title: 'Сложные интеграции', price: 'индивидуально', type: 'individual' }
        ], note: 'Установка инструментов отслеживания и использование данных должны учитывать требования к конфиденциальности и согласию посетителей, включая применимые правила GDPR и cookies.' }
      ]
    },
    issues: {
      title: 'Реклама уже запущена, но результаты не устраивают?',
      sub: 'Проверим доступные показатели, структуру кампаний и настройки отслеживания. Поможем определить следующие шаги.',
      items: [
        { id: 'clicks', label: 'Много кликов, мало заявок.' },
        { id: 'cost', label: 'Реклама слишком дорогая.' },
        { id: 'ads', label: 'Не понимаю, какие объявления работают.' },
        { id: 'analytics', label: 'Не настроена аналитика.' },
        { id: 'improve', label: 'Хочу улучшить существующие кампании.' },
        { id: 'consult', label: 'Нужна консультация.' }
      ],
      note: 'Глубокая оценка эффективности требует доступа к данным рекламного кабинета и аналитики. Без них можно дать только предварительные рекомендации.',
      cta: 'Получить оценку рекламы →'
    },
    explainer: {
      title: 'Какой канал подойдёт вам?',
      items: [
        { title: 'Google Ads и Meta Ads', desc: 'Платная реклама для привлечения трафика в период проведения кампаний.' },
        { title: 'SEO', desc: 'Долгосрочная работа над органической видимостью в поиске.' },
        { title: 'Локальное SEO', desc: 'Присутствие бизнеса в локальных результатах поиска и на картах.' },
        { title: 'GEO', desc: 'Повышение понятности и доступности информации о компании для генеративного поиска.' }
      ],
      note: 'Не знаете, что подойдёт вашему бизнесу? Мы поможем выбрать направление с учётом задач, конкуренции и бюджета.'
    },
    form: {
      title: 'Расскажите о вашем бизнесе. Подберём продвижение.',
      desc: 'Выберите услуги или проблемы выше либо опишите задачу.',
      help: 'Мы изучим вашу задачу и предложим подходящие рекламные каналы, предварительную стоимость и следующие шаги. Отправка заявки ни к чему вас не обязывает.',
      summaryTitle: 'Ваш запрос SOLO.POV',
      setup: 'Разовая настройка',
      monthly: 'Ежемесячное сопровождение',
      individual: 'Индивидуальная оценка',
      issue: 'Дополнительная задача',
      none: 'Ничего не выбрано — опишите задачу, и мы предложим вариант.',
      remove: 'Убрать',
      siteLabel: 'Адрес сайта (если есть)',
      sitePh: 'https://primer.si',
      businessLabel: 'Чем занимается ваш бизнес?',
      businessPh: 'Например: услуги чистки фасадов и крыш.',
      regionLabel: 'Где находится целевая аудитория / регион продвижения?',
      regionPh: 'Например: Любляна и окрестности.',
      budgetLabel: 'Ориентировочный рекламный бюджет (необязательно)',
      budgetPh: 'Например: 300 €/мес.',
      budgetNote: 'Рекламный бюджет оплачивается отдельно и не входит в стоимость услуг SOLO.POV.',
      commentLabel: 'Дополнительные пожелания',
      commentPh: 'Например: хочу больше заявок на чистку фасадов в Любляне.',
      emailLabel: 'Email для ответа',
      emailPh: 'name@example.com',
      telegramLabel: 'Telegram-контакт (необязательно)',
      telegramPh: '@username',
      consent: 'Хочу получать материалы и предложения SOLO.POV',
      consentNote: 'Необязательно. Отписаться можно в любой момент.',
      privacy: 'Политика конфиденциальности',
      submit: 'Получить предложение',
      note: 'Отправка заявок пока не подключена. Мы покажем готовый текст для копирования.',
      notSentTitle: 'Отправка пока не подключена',
      notSentText: 'Заявка <b>не была отправлена</b>, потому что обработка заявок ещё не подключена. Скопируйте текст ниже и пришлите нам.',
      copy: 'Скопировать текст',
      copied: 'Скопировано',
      back: 'Вернуться к форме',
      errEmail: 'Укажите корректный email.',
      errSite: 'Укажите корректный адрес сайта.',
      errEmpty: 'Выберите услугу или опишите задачу.'
    },
    process: {
      title: 'Как мы работаем',
      steps: [
        'Изучаем бизнес, цели и исходные данные.',
        'Предлагаем каналы и согласовываем бюджет.',
        'Настраиваем аналитику и рекламные инструменты.',
        'Запускаем согласованные кампании.',
        'Анализируем данные и предлагаем корректировки.'
      ],
      note: 'Рекламные кабинеты и подключённые аккаунты по возможности принадлежат клиенту. SOLO.POV получает рабочие доступы в согласованном объёме. Мы не обещаем гарантированное количество заявок или продаж.'
    },
    faq: {
      title: 'Частые вопросы',
      items: [
        { q: 'Можно ли заказать рекламу без создания сайта?', a: 'Да, если у вас есть сайт или другой канал, на который можно направлять трафик.' },
        { q: 'Какой бюджет нужен для начала?', a: 'Зависит от отрасли, конкуренции и целей. Предложим реалистичный ориентир и согласуем его с вами.' },
        { q: 'Чем Google Ads отличается от рекламы Facebook и Instagram?', a: 'Google Ads часто захватывает людей с активным поисковым запросом, а Meta Ads позволяет работать с интересами и аудиториями.' },
        { q: 'Нужно ли платить отдельно за рекламный бюджет?', a: 'Да. Бюджет оплачивается рекламной платформе и не входит в стоимость услуг SOLO.POV.' },
        { q: 'Через какое время SEO может дать результат?', a: 'SEO — долгосрочная работа. Срок зависит от состояния сайта, конкуренции и объёма работ; гарантированных позиций мы не обещаем.' },
        { q: 'Что такое GEO-продвижение?', a: 'GEO — работа над понятностью, полнотой и доступностью информации о компании для систем генеративного поиска. Это не гарантирует упоминаний или цитирований.' },
        { q: 'Можно ли улучшить уже запущенную рекламу?', a: 'Да, если есть доступ к данным кампаний и аналитике. Сначала изучаем текущее состояние и определяем приоритеты.' },
        { q: 'Кому будут принадлежать рекламные кабинеты и данные?', a: 'По возможности кабинеты и профили принадлежат клиенту. SOLO.POV получает только согласованные рабочие доступы.' }
      ]
    }
  }
};
