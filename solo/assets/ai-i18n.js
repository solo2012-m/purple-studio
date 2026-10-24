/* Solo.Pov — AI assistant and automation page data (v3, 2026-10-24) */
window.SOLO_AI = {
  sl: {
    hero: {
      eyebrow: 'Solo.Pov · AI-asistent in avtomatizacija',
      title: 'Vaša stran. Vaš Telegram. Vaš AI-pomočnik.',
      sub: [
        'Upravljajte stran s preprostimi sporočili v Telegramu.',
        'Avtomatizirajte povpraševanja in ponavljajoče se naloge.'
      ],
      cards: [
        { id: 'ai', title: 'AI-asistent prek Telegrama', desc: 'Upravljajte stran z običajnimi sporočili. Spreminjajte besedila, dodajajte storitve, fotografije in članke. Rezultat preverite pred objavo.', cta: 'Poglej predstavitev in pakete →' },
        { id: 'automation', title: 'Avtomatizacija poslovanja', desc: 'Povežemo stran, povpraševanja, obvestila in delovne storitve. Nastavimo procese, ki se izvajajo samodejno.', cta: 'Poglej katalog avtomatizacij →' }
      ]
    },
    ai: {
      eyebrow: 'AI-asistent',
      title: 'AI-asistent prek Telegrama',
      sub: 'Upravljajte stran z običajnimi sporočili. Spreminjajte besedila, dodajajte storitve, fotografije in članke ter preverite rezultat pred objavo.',
      offer: {
        accent: 'Preizkusite brezplačno. Plačajte, če vam ustreza.',
        cta: 'Preizkusite brezplačno →',
        note: 'Brezplačna predstavitev vam pokaže princip dela. Preizkus na vaši strani se dogovori individualno — po preverjanju tehničnih možnosti in dostopov. Samodejne povezave bota s poljubno stranjo ne obljubljamo.'
      },
      scenarios: {
        label: 'Primeri uporabe',
        title: 'Kako to deluje v praksi',
        note: 'Običajna sporočila v Telegramu — od naloge do pripravljenega rezultata.',
        afterNote: 'AI pripravi spremembe in pokaže rezultat. Objava in druga dovoljena dejanja se izvedejo po vaši potrditvi.',
        disclaimer: 'Predstavitve temeljijo na resničnih delovnih scenarijih, vendar niso posnetki zaslona klepeta. Podatki so ponazoritveni.',
        items: [
          {
            id: 'service', tab: 'Dodajanje storitve', project: 'Zeleni pomočnik', bot: 'Zeleni pomočnik', avatar: '../assets/img/works/zeleni-pomocnik.jpg',
            messages: [
              { who: 'client', text: 'Dodaj na stran storitev čiščenja žlebov. Pripravi opis in predlagaj ceno.' },
              { who: 'ai', text: 'Pripravil sem novo storitev:\n\nČiščenje žlebov\n\nČiščenje strešnih žlebov pred listjem, umazanijo in ostanki.\n\nCena — po ogledu.\n\nPokažem predhodno različico?' },
              { who: 'client', text: 'Da, pokaži.' },
              { who: 'ai', text: 'Predogled je pripravljen. Objavim?' },
              { who: 'client', text: 'Da.' },
              { who: 'ai', text: 'Končano ✓ Storitev je dodana na stran.' }
            ]
          },
          {
            id: 'research', tab: 'Raziskava konkurence', project: 'Zeleni pomočnik', bot: 'Zeleni pomočnik', avatar: '../assets/img/works/zeleni-pomocnik.jpg',
            messages: [
              { who: 'client', text: 'Poglej, katere storitve čiščenja streh ponujajo konkurenti in kakšne so njihove cene.' },
              { who: 'ai', text: 'Preveril sem razpoložljive ponudbe.\n\nPogosto se pojavljajo:\n• pranje streh;\n• odstranjevanje mahu;\n• zaščitna obdelava.\n\nPo najdenih javnih ponudbah se cene in pogoji razlikujejo.\n\nPripravim novo storitev za vašo stran?' },
              { who: 'client', text: 'Da, pripravi.' },
              { who: 'ai', text: 'Pripravil sem opis storitve in priporočila. Pogledate?' }
            ],
            note: 'Primer je skrajšan. Raziskava poteka po dostopnih virih in v okviru ustreznega paketa; ponazoritveni podatki niso predstavljeni kot potrjeni rezultati raziskave.'
          },
          {
            id: 'booking', tab: 'Spletne rezervacije', project: 'SOLO.POV Makeup', bot: 'SOLO.POV Makeup', avatar: '../assets/img/works/solopova-makeup.jpg',
            messages: [
              { who: 'client', text: 'Spremeni trajanje večernega ličenja na 90 minut.' },
              { who: 'ai', text: 'Našel sem storitev »Večerno ličenje«.\n\nTrenutno trajanje: 60 minut.\n\nNovo trajanje: 90 minut.\n\nPotrdim spremembo?' },
              { who: 'client', text: 'Potrjujem.' },
              { who: 'ai', text: 'Končano ✓ Trajanje je posodobljeno.\n\nPreverim ustrezno nastavitev v koledarju rezervacij?' }
            ],
            note: 'Scenarij je predstavitven. Prikaz ne pomeni, da je določena koledarska integracija že povezana.'
          }
        ]
      },
      tariffsEyebrow: 'Paketi',
      tariffsTitle: 'Paketi AI-asistenta za Telegram',
      tariffs: [
        { id: 'ai-start', name: 'AI START', price: 'od 29 €/mesec', monthly: 29, features: [
          'Priprava besedil in opisov.',
          'Predlogi sprememb obstoječe vsebine.',
          'Ena povezana stran.',
          'Predogled pred objavo.',
          'Omejen obseg zahtev.',
          'Nastavitev povezave se obračuna posebej.'
        ] },
        { id: 'ai-business', name: 'AI BUSINESS', price: 'od 59 €/mesec', monthly: 59, features: [
          'Vse iz AI START.',
          'Priprava objav in člankov.',
          'Delo s fotografijami in opisi.',
          'Priprava novih kartic storitev.',
          'Dodatni scenariji upravljanja strani.',
          'Razširjen mesečni limit operacij.'
        ] },
        { id: 'ai-control', name: 'AI CONTROL', price: 'od 99 €/mesec', monthly: 99, badge: 'Priporočamo', features: [
          'Spreminjanje obstoječih besedil in slik.',
          'Dodajanje kartic storitev in posodabljanje cen.',
          'Priprava člankov in objava po potrditvi.',
          'Dodajanje dogovorjenih strani po obstoječih predlogah.',
          'Posodabljanje galerij in fotografij.',
          'Predogled sprememb in potrditev objave.',
          'Zgodovina sprememb.',
          'Osnovni tehnični nadzor podprtih funkcij.',
          'Do 20 standardnih operacij na mesec.'
        ] },
        { id: 'ai-research', name: 'AI RESEARCH PRO', price: 'od 159 €/mesec', monthly: 159, badge: 'Razširjeno', features: [
          'Vse iz AI CONTROL.',
          'Raziskava javno dostopnih podatkov o konkurentih.',
          'Analiza storitev in ponudb konkurentov.',
          'Priprava novih storitev na podlagi raziskave.',
          'Predlogi strukture storitev in strani.',
          'Priprava SEO-usmerjene vsebine.',
          'Priporočila za razvoj strani.',
          'Priprava tematskih člankov.',
          'Do 20 operacij upravljanja in do 3 raziskave na mesec.'
        ] }
      ],
      tariffNote: 'Cene in limiti so predhodni. Ne obljubljamo neomejenih dejanj ali neomejenega števila člankov. Zahtevno ročno programiranje ni vključeno. Pred začetkom se dokončno določijo stroški povezave, mesečni limiti, dovoljeni stroški zunanjih AI-storitev in dodatna dela.',
      tariffFootnote: 'Paket se začne po potrditvi tehnične združljivosti strani in nastavitvi povezave. Avtomatizacija poslovanja je ločena storitev z individualno oceno.',
      cta: 'Izberi AI-asistenta →'
    },
    automation: {
      eyebrow: 'Avtomatizacija poslovanja',
      title: 'Manj ročnega dela. Več avtomatizacije.',
      desc: 'Povežemo vašo stran z ustreznimi orodji, da se povpraševanja, obvestila in ponavljajoči se procesi izvajajo samodejno.',
      cards: [
        { id: 'telegram', title: 'Povpraševanja v Telegram', desc: 'Obvestilo o novem povpraševanju s strani.', tip: 'Ko obiskovalec odda obrazec na strani, lastnik prejme sporočilo v Telegramu s podatki o povpraševanju.' },
        { id: 'reply', title: 'Samodejni odgovori', desc: 'Potrditev prejema sporočila stranki.', tip: 'Po oddaji povpraševanja stranka samodejno prejme potrditev, da je bila zahteva sprejeta.' },
        { id: 'booking', title: 'Spletne rezervacije', desc: 'Povezava strani s sistemom za rezervacijo terminov.', tip: 'Obiskovalec izbere prost termin, informacija o rezervaciji pa se prenese v dogovorjeni sistem.' },
        { id: 'crm', title: 'CRM in preglednice', desc: 'Prenos povpraševanj v izbrano evidenco.', tip: 'Nova povpraševanja se samodejno vnesejo v sistem za upravljanje strank ali preglednico.' },
        { id: 'ai-process', title: 'AI-obdelava povpraševanj', desc: 'Predhodna razvrstitev sporočil in priprava odgovorov.', tip: 'AI pomaga razvrstiti povpraševanja in pripravi odgovore po dogovorjenih pravilih.' },
        { id: 'publish', title: 'Objava vsebine', desc: 'Pomoč pri pripravi in objavi člankov ter posodobitev.', tip: 'Pripravljeno gradivo se pregleda in lahko objavi v izbranih razdelkih strani.' }
      ],
      priceNote: 'Avtomatizacij ne združujemo v en paket s popustom. Končna cena se določi po oceni naloge.',
      prices: [
        { title: 'Preprosta avtomatizacija', price: 'od 50 €' },
        { title: 'Več povezanih dejanj', price: 'od 150 €' },
        { title: 'Individualna avtomatizacija', price: 'individualni izračun' }
      ],
      integrationNote: 'Če prek AI-asistenta zahtevate zahtevnejšo integracijo, bot pripravi opis naloge in predlaga, da se obrnete na SOLO.POV za ločeno oceno.',
      footnote: 'Cene so okvirne. Naročnine zunanjih storitev in stroški API se plačajo posebej, razen če je dogovorjeno drugače.',
      cta: 'Pogovorimo se o avtomatizaciji →'
    },
    form: {
      title: 'Povejte nam, kaj potrebujete. Predlagali bomo rešitev.',
      desc: 'Izberite AI-paket ali avtomatizacijo, ali opišite svojo nalogo. Pripravili bomo predlog.',
      help: 'Preučili bomo vašo nalogo, preverili tehnično združljivost ter predlagali ustrezen način povezave, ceno in roke. Pošiljanje zahteve vas k ničemur ne obvezuje.',
      summaryTitle: 'Vaš izbor SOLO.POV',
      aiLabel: 'AI-asistent',
      automationLabel: 'Avtomatizacija',
      monthlyLabel: 'Predhodni mesečni paket',
      oneTimeLabel: 'Enkratni strošek avtomatizacije',
      afterEstimate: 'določi se po oceni',
      none: 'Nič ni izbrano — opišite nalogo in predlagali bomo možnost.',
      remove: 'Odstrani',
      siteLabel: 'Naslov obstoječe strani (neobvezno)',
      sitePh: 'https://primer.si',
      commentLabel: 'Kratko opišite nalogo',
      commentPh: 'Na primer: želim, da nova povpraševanja pridejo v Telegram in da stranka samodejno obvesti o prejemu.',
      emailLabel: 'Email za odgovor',
      emailPh: 'ime@primer.si',
      telegramLabel: 'Telegram kontakt (neobvezno)',
      telegramPh: '@uporabnisko_ime',
      consent: 'Želim prejemati novice in ponudbe SOLO.POV',
      consentNote: 'Neobvezno. Odjava je mogoča kadarkoli.',
      privacy: 'Politika zasebnosti',
      submit: 'Pridobite osebno ponudbo',
      note: 'Pošiljanje zahtev še ni povezano. Prikazali bomo besedilo, ki ga lahko kopirate.',
      notSentTitle: 'Pošiljanje še ni povezano',
      notSentText: 'Zahteva <b>ni bila poslana</b>, ker obdelava zahtev še ni povezana. Kopirajte besedilo spodaj in nam ga pošljite.',
      copy: 'Kopiraj besedilo',
      copied: 'Kopirano',
      back: 'Nazaj na obrazec',
      errEmail: 'Vnesite veljaven email.',
      errUrl: 'Vnesite veljaven naslov strani.',
      errEmpty: 'Izberite paket ali avtomatizacijo, ali opišite nalogo.'
    },
    faq: {
      title: 'Pogosta vprašanja',
      items: [
        { q: 'Ali potrebujem novo stran za povezavo AI?', a: 'Ni vedno treba. Možnost je odvisna od obstoječe strani, njene platforme in dostopov.' },
        { q: 'Ali AI lahko sam spremeni mojo stran?', a: 'AI pripravi spremembe in predogled. Objava se izvede po vaši potrditvi in v okviru nastavljenih pravic.' },
        { q: 'Kako poteka brezplačna predstavitev?', a: 'Prikažemo princip dela na demo primerih. Preizkus na vaši strani se dogovori individualno po preverjanju tehničnih možnosti in dostopov.' },
        { q: 'Kaj vključuje nastavitev povezave?', a: 'Preverjanje združljivosti, dostopov in načina objave. Obseg in cena se določita pred začetkom.' },
        { q: 'Ali je avtomatizacija del mesečnega paketa?', a: 'Ne. Avtomatizacija poslovanja je ločena storitev z individualno nastavitvijo in oceno.' },
        { q: 'Kaj, če nimam strani?', a: 'Najprej lahko izdelamo stran, nato povežemo AI-asistenta ali avtomatizacijo.' }
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
      eyebrow: 'Solo.Pov · AI-ассистент и автоматизация',
      title: 'Ваш сайт. Ваш Telegram. Ваш AI-помощник.',
      sub: [
        'Управляйте сайтом обычными сообщениями в Telegram.',
        'Автоматизируйте заявки и повторяющиеся задачи.'
      ],
      cards: [
        { id: 'ai', title: 'AI-ассистент через Telegram', desc: 'Управляйте сайтом обычными сообщениями. Меняйте тексты, добавляйте услуги, фотографии и статьи. Проверяйте результат перед публикацией.', cta: 'Посмотреть демонстрацию и тарифы →' },
        { id: 'automation', title: 'Автоматизация бизнеса', desc: 'Соединяем сайт, заявки, уведомления и рабочие сервисы. Настраиваем процессы, которые выполняются автоматически.', cta: 'Посмотреть каталог автоматизаций →' }
      ]
    },
    ai: {
      eyebrow: 'AI-ассистент',
      title: 'AI-ассистент через Telegram',
      sub: 'Управляйте сайтом обычными сообщениями. Меняйте тексты, добавляйте услуги, фотографии и статьи, проверяйте результат перед публикацией.',
      offer: {
        accent: 'Попробуйте бесплатно. Оплачивайте, если подходит.',
        cta: 'Попробовать бесплатно →',
        note: 'Бесплатная демонстрация знакомит с принципом работы. Тестирование на вашем сайте возможно индивидуально — после согласования технических возможностей и доступа. Автоматическое подключение бота к любому сайту не обещаем.'
      },
      scenarios: {
        label: 'Примеры использования',
        title: 'Как это работает на практике',
        note: 'Обычные сообщения в Telegram — от задачи до готового результата.',
        afterNote: 'AI подготавливает изменения и показывает результат. Публикация и другие разрешённые действия выполняются после вашего подтверждения.',
        disclaimer: 'Демонстрации основаны на реальных рабочих сценариях, но не являются скриншотами переписки. Данные приведены для примера.',
        items: [
          {
            id: 'service', tab: 'Добавление услуги', project: 'Zeleni pomočnik', bot: 'Zeleni pomočnik', avatar: '../assets/img/works/zeleni-pomocnik.jpg',
            messages: [
              { who: 'client', text: 'Добавь на сайт услугу чистки водостоков. Подготовь описание и предложи цену.' },
              { who: 'ai', text: 'Подготовил новую услугу:\n\nČiščenje žlebov\n\nОчистка водосточных желобов от листьев, грязи и мусора.\n\nЦена — после осмотра.\n\nПоказать предварительную версию?' },
              { who: 'client', text: 'Да, покажи.' },
              { who: 'ai', text: 'Предпросмотр готов. Опубликовать?' },
              { who: 'client', text: 'Да.' },
              { who: 'ai', text: 'Готово ✓ Услуга добавлена на сайт.' }
            ]
          },
          {
            id: 'research', tab: 'Исследование конкурентов', project: 'Zeleni pomočnik', bot: 'Zeleni pomočnik', avatar: '../assets/img/works/zeleni-pomocnik.jpg',
            messages: [
              { who: 'client', text: 'Посмотри, какие услуги по очистке крыш предлагают конкуренты и какие у них цены.' },
              { who: 'ai', text: 'Проверил доступные предложения.\n\nЧасто встречаются:\n• мойка крыш;\n• удаление мха;\n• защитная обработка.\n\nПо найденным открытым предложениям цены и условия различаются.\n\nПодготовить новую услугу для вашего сайта?' },
              { who: 'client', text: 'Да, подготовь.' },
              { who: 'ai', text: 'Подготовил описание услуги и рекомендации. Посмотреть?' }
            ],
            note: 'Пример сокращён. Исследование выполняется по доступным источникам и в рамках соответствующего тарифа; условные данные не представлены как подтверждённые результаты.'
          },
          {
            id: 'booking', tab: 'Онлайн-запись', project: 'SOLO.POV Makeup', bot: 'SOLO.POV Makeup', avatar: '../assets/img/works/solopova-makeup.jpg',
            messages: [
              { who: 'client', text: 'Измени длительность вечернего макияжа на 90 минут.' },
              { who: 'ai', text: 'Нашёл услугу «Вечерний макияж».\n\nТекущая длительность: 60 минут.\n\nНовая длительность: 90 минут.\n\nПодтвердить изменение?' },
              { who: 'client', text: 'Подтверждаю.' },
              { who: 'ai', text: 'Готово ✓ Длительность обновлена.\n\nПроверить соответствующую настройку в календаре записи?' }
            ],
            note: 'Сценарий демонстрационный. Он не означает, что конкретная календарная интеграция уже подключена.'
          }
        ]
      },
      tariffsEyebrow: 'Тарифы',
      tariffsTitle: 'Тарифы AI-ассистента для Telegram',
      tariffs: [
        { id: 'ai-start', name: 'AI START', price: 'от 29 €/месяц', monthly: 29, features: [
          'Подготовка текстов и описаний.',
          'Предложения по изменению существующего содержимого.',
          'Один подключённый сайт.',
          'Предпросмотр перед публикацией.',
          'Ограниченный объём запросов.',
          'Стоимость настройки подключения отдельно.'
        ] },
        { id: 'ai-business', name: 'AI BUSINESS', price: 'от 59 €/месяц', monthly: 59, features: [
          'Всё из AI START.',
          'Подготовка публикаций и статей.',
          'Работа с фотографиями и описаниями.',
          'Подготовка новых карточек услуг.',
          'Дополнительные сценарии управления сайтом.',
          'Расширенный месячный лимит операций.'
        ] },
        { id: 'ai-control', name: 'AI CONTROL', price: 'от 99 €/месяц', monthly: 99, badge: 'Рекомендуем', features: [
          'Изменение существующих текстов и изображений.',
          'Добавление карточек услуг и обновление цен.',
          'Подготовка статей и публикация после подтверждения.',
          'Добавление согласованных страниц по существующим шаблонам.',
          'Обновление галерей и фотографий.',
          'Предпросмотр изменений и подтверждение публикации.',
          'История изменений.',
          'Базовый технический контроль поддерживаемых функций.',
          'До 20 стандартных операций в месяц.'
        ] },
        { id: 'ai-research', name: 'AI RESEARCH PRO', price: 'от 159 €/месяц', monthly: 159, badge: 'Расширенный', features: [
          'Всё из AI CONTROL.',
          'Исследование открытых данных о конкурентах.',
          'Анализ услуг и предложений конкурентов.',
          'Подготовка новых услуг с учётом исследования.',
          'Предложения по структуре услуг и страниц.',
          'Подготовка SEO-ориентированного содержимого.',
          'Рекомендации по развитию сайта.',
          'Подготовка тематических статей.',
          'До 20 операций управления и до 3 исследований в месяц.'
        ] }
      ],
      tariffNote: 'Цены и лимиты предварительные. Мы не обещаем безлимитные действия или неограниченное количество статей. Сложная ручная разработка не входит в стоимость. До начала работ согласуются стоимость подключения, месячные лимиты, допустимые расходы на сторонние AI-сервисы и дополнительные работы.',
      tariffFootnote: 'Тариф начинается после подтверждения технической совместимости сайта и настройки подключения. Автоматизация бизнеса — отдельная услуга с индивидуальной оценкой.',
      cta: 'Выбрать AI-ассистента →'
    },
    automation: {
      eyebrow: 'Автоматизация бизнеса',
      title: 'Меньше ручной работы. Больше автоматизации.',
      desc: 'Соединим ваш сайт с нужными инструментами, чтобы заявки, уведомления и повторяющиеся процессы выполнялись автоматически.',
      cards: [
        { id: 'telegram', title: 'Заявки в Telegram', desc: 'Уведомление о новой заявке с сайта.', tip: 'Когда посетитель отправляет форму на сайте, владельцу приходит сообщение в Telegram с информацией о заявке.' },
        { id: 'reply', title: 'Автоматические ответы', desc: 'Подтверждение получения обращения клиенту.', tip: 'После отправки обращения клиент автоматически получает подтверждение, что его заявка принята.' },
        { id: 'booking', title: 'Онлайн-запись', desc: 'Интеграция сайта с системой бронирования времени.', tip: 'Посетитель выбирает свободное время, а информация о записи передаётся в согласованную систему.' },
        { id: 'crm', title: 'CRM и таблицы', desc: 'Передача заявок в выбранную систему учёта.', tip: 'Новые заявки автоматически заносятся в систему учёта клиентов или таблицу.' },
        { id: 'ai-process', title: 'AI-обработка заявок', desc: 'Предварительная классификация обращений и подготовка ответов.', tip: 'AI помогает классифицировать обращения и подготавливает ответы по согласованным правилам.' },
        { id: 'publish', title: 'Публикация содержимого', desc: 'Помощь в подготовке и размещении статей и обновлений.', tip: 'Подготовленные материалы проходят согласование и могут публиковаться в выбранных разделах сайта.' }
      ],
      priceNote: 'Автоматизации не объединяются в единый пакет со скидкой. Итоговая стоимость определяется после оценки задачи.',
      prices: [
        { title: 'Простая автоматизация', price: 'от 50 €' },
        { title: 'Несколько связанных действий', price: 'от 150 €' },
        { title: 'Индивидуальная автоматизация', price: 'индивидуальный расчёт' }
      ],
      integrationNote: 'Если через AI-ассистента запрашивается сложная интеграция, бот может подготовить описание задачи и предложить обратиться в SOLO.POV за отдельной оценкой.',
      footnote: 'Цены ориентировочные. Подписки сторонних сервисов и расходы на API оплачиваются отдельно, если не согласовано иное.',
      cta: 'Обсудить автоматизацию →'
    },
    form: {
      title: 'Расскажите о своей задаче. Мы предложим решение.',
      desc: 'Выберите AI-тариф или автоматизацию либо опишите задачу. Подготовим предложение.',
      help: 'Мы изучим вашу задачу, проверим техническую совместимость и предложим подходящий вариант подключения, стоимость и сроки. Отправка заявки ни к чему вас не обязывает.',
      summaryTitle: 'Ваш выбор SOLO.POV',
      aiLabel: 'AI-ассистент',
      automationLabel: 'Автоматизация',
      monthlyLabel: 'Предварительный месячный тариф',
      oneTimeLabel: 'Разовая стоимость автоматизации',
      afterEstimate: 'определяется после оценки',
      none: 'Ничего не выбрано — опишите задачу, и мы предложим вариант.',
      remove: 'Убрать',
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
      privacy: 'Политика конфиденциальности',
      submit: 'Получить персональное предложение',
      note: 'Отправка заявок пока не подключена. Мы покажем готовый текст для копирования.',
      notSentTitle: 'Отправка пока не подключена',
      notSentText: 'Заявка <b>не была отправлена</b>, потому что обработка заявок ещё не подключена. Скопируйте текст ниже и пришлите нам.',
      copy: 'Скопировать текст',
      copied: 'Скопировано',
      back: 'Вернуться к форме',
      errEmail: 'Укажите корректный email.',
      errUrl: 'Укажите корректный адрес сайта.',
      errEmpty: 'Выберите тариф или автоматизацию либо опишите задачу.'
    },
    faq: {
      title: 'Частые вопросы',
      items: [
        { q: 'Нужен ли мне новый сайт для подключения AI?', a: 'Не всегда. Возможность подключения зависит от существующего сайта, его платформы и доступов.' },
        { q: 'Может ли AI самостоятельно менять мой сайт?', a: 'AI подготавливает изменения и предпросмотр. Публикация выполняется после вашего подтверждения и в рамках настроенных прав.' },
        { q: 'Как проходит бесплатная демонстрация?', a: 'Мы показываем принцип работы на демонстрационных примерах. Тестирование на вашем сайте обсуждается индивидуально после проверки технических возможностей и доступов.' },
        { q: 'Что входит в настройку подключения?', a: 'Проверка совместимости, доступов и способа публикации. Объём и стоимость согласуются до начала работ.' },
        { q: 'Входит ли автоматизация в месячный тариф?', a: 'Нет. Автоматизация бизнеса — отдельная услуга с индивидуальной настройкой и оценкой.' },
        { q: 'Что, если у меня нет сайта?', a: 'Сначала можем создать сайт, а затем подключить AI-ассистента или автоматизацию.' }
      ]
    },
    cross: {
      title: 'Нужно больше возможностей?',
      link: 'Создание и улучшение сайтов →',
      future: 'Реклама, SEO и аналитика — скоро'
    }
  }
};
