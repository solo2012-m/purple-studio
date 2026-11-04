window.SOLO_TARIFFS = {
  "sl": {
    "tariffs": [
      {
        "id": "start",
        "name": "START",
        "price": 300,
        "priceLabel": "od 300 €",
        "desc": "Za eno glavno storitev, specialista ali manjše podjetje.",
        "features": [
          "Enostranska spletna stran.",
          "Odzivno oblikovanje na osnovi pripravljene strukture.",
          "Nekaj ključnih vsebinskih sklopov na eni strani.",
          "Preprost obrazec za povpraševanje.",
          "Kontakti in gumbi za stik.",
          "Zemljevid, če je potreben.",
          "Osnovna SEO priprava.",
          "Povezava domene in objava.",
          "Dva kroga popravkov."
        ],
        "includes": [],
        "cta": "Izberite START"
      },
      {
        "id": "business",
        "name": "BUSINESS",
        "price": 600,
        "priceLabel": "od 600 €",
        "desc": "Za podjetje z več dejavnostmi.",
        "features": [
          "Do pet spletnih strani.",
          "Oblikovanje po meri.",
          "Prikaz na mobilnih napravah.",
          "Obrazci za povpraševanje.",
          "Galerija ali portfelj.",
          "Osnovna SEO priprava vsake spletne strani.",
          "Nastavitev osnovne analitike.",
          "Pomoč pri nastavitvi Google Business Profile v dogovorjenem obsegu.",
          "Trije krogi popravkov."
        ],
        "includes": [
          "analytics",
          "gbp"
        ],
        "cta": "Izberite BUSINESS"
      },
      {
        "id": "pro",
        "name": "PRO",
        "price": 1000,
        "priceLabel": "od 1 000 €",
        "desc": "Za podjetje, ki želi spletno stran razvijati.",
        "features": [
          "Do deset spletnih strani.",
          "Razširjena struktura in dizajn.",
          "Do dveh jezikovnih različic.",
          "Razdelek za članke.",
          "Napredni obrazci.",
          "Analitika in spremljanje dogovorjenih konverzij.",
          "Ena preprosta integracija.",
          "Štirje krogi popravkov."
        ],
        "includes": [
          "language",
          "blog",
          "form",
          "analytics",
          "tracking"
        ],
        "cta": "Izberite PRO"
      },
      {
        "id": "custom",
        "name": "CUSTOM",
        "price": null,
        "priceLabel": "Individualni izračun",
        "desc": "Za trgovine, portale, rezervacije in posebne funkcije.",
        "features": [
          "Spletne trgovine.",
          "Uporabniški portali.",
          "Zahtevni sistemi za rezervacije.",
          "Nestandardne funkcije.",
          "Spletne aplikacije.",
          "Cena po dogovoru.",
          "Krogi popravkov po dogovoru."
        ],
        "includes": [],
        "cta": "Pogovorimo se"
      }
    ],
    "table": {
      "columns": [
        "START",
        "BUSINESS",
        "PRO"
      ],
      "rows": [
        {
          "label": "Število spletnih strani",
          "values": [
            "1",
            "do 5",
            "do 10"
          ]
        },
        {
          "label": "Oblikovanje",
          "values": [
            "Osnovna struktura",
            "Prilagojen",
            "Razširjen"
          ]
        },
        {
          "label": "Mobilna različica",
          "values": [
            true,
            true,
            true
          ]
        },
        {
          "label": "Obrazci",
          "values": [
            "Preprost",
            "Več obrazcev",
            "Napredni"
          ]
        },
        {
          "label": "Galerija",
          "values": [
            false,
            true,
            true
          ]
        },
        {
          "label": "SEO",
          "values": [
            "Osnovno",
            "Osnovno po straneh",
            "Napredno"
          ]
        },
        {
          "label": "Dodatni jeziki",
          "values": [
            "1",
            "1",
            "do 2"
          ]
        },
        {
          "label": "Google Analytics",
          "values": [
            false,
            true,
            true
          ]
        },
        {
          "label": "Google Business Profile",
          "values": [
            false,
            "Po dogovoru",
            false
          ]
        },
        {
          "label": "Priprava na oglaševanje",
          "values": [
            false,
            false,
            "Po dogovoru"
          ]
        },
        {
          "label": "Blog",
          "values": [
            false,
            false,
            true
          ]
        },
        {
          "label": "Integracije",
          "values": [
            false,
            false,
            "1 preprosta"
          ]
        },
        {
          "label": "Krogi popravkov",
          "key": "revisions",
          "values": [
            "2",
            "3",
            "4"
          ]
        },
        {
          "label": "Podpora",
          "values": [
            "Po dogovoru",
            "Po dogovoru",
            "Po dogovoru"
          ]
        }
      ]
    },
    "addons": [
      {
        "id": "page",
        "title": "Dodatna spletna stran",
        "price": 50
      },
      {
        "id": "language",
        "title": "Dodatni jezik",
        "price": 100
      },
      {
        "id": "blog",
        "title": "Blog",
        "price": 120
      },
      {
        "id": "form",
        "title": "Obrazec z dodatnimi vprašanji",
        "price": 70
      },
      {
        "id": "booking",
        "title": "Spletna rezervacija prek pripravljene rešitve",
        "price": 120
      },
      {
        "id": "analytics",
        "title": "Google Analytics",
        "price": 60
      },
      {
        "id": "tracking",
        "title": "Sledenje povpraševanjem za oglaševanje",
        "price": 90
      },
      {
        "id": "gbp",
        "title": "Pomoč pri Google Business Profile",
        "price": 70
      },
      {
        "id": "calculator",
        "title": "Preprost kalkulator cene",
        "price": 150
      },
      {
        "id": "integrations",
        "title": "Druge integracije",
        "price": null,
        "individual": true
      }
    ],
    "ui": {
      "selected": "Izbran",
      "included": "Vključeno",
      "includedInTariff": "Vključeno v paket",
      "individual": "Individualna ocena",
      "from": "od",
      "calcTitle": "Vaš izbor",
      "calcEmpty": "Najprej izberite paket.",
      "calcBase": "Osnovni paket",
      "calcAddons": "Dodatne možnosti",
      "calcTotal": "Približna cena od",
      "reset": "Ponastavi dodatne možnosti",
      "payTitle": "Najprej stran. Potem plačilo.",
      "payLead": "Izdelamo stran in vam pokažemo končno različico. Vi preverite rezultat, se dogovorite o popravkih in šele po potrditvi plačate izdelavo. Nato stran objavimo in predamo dostope.",
      "paySteps": [
        "Izdelamo stran.",
        "Vi preverite.",
        "Plačilo in predaja."
      ],
      "payNote": "Brez predplačila za izdelavo pri standardnih paketih START in BUSINESS. Za PRO in individualne projekte se pogoji dogovorijo posebej. Domena in plačljive storitve se plačajo posebej.",
      "payDetailsTitle": "Podrobni pogoji plačila in predaje strani",
      "payDetails": [
        "Priporočamo, da domeno registrirate na ime lastnika podjetja.",
        "Naročnik lahko domeno kupi sam ali zaprosi za pomoč.",
        "Po plačilu predamo dogovorjene dostope in gradivo.",
        "Pravice do kode, oblikovanja in drugega gradiva se določijo s pogoji naročila.",
        "Plačljive zunanje storitve in redno vzdrževanje se plačajo posebej.",
        "Dodatna dela nad potrjenim obsegom se dogovorijo posebej."
      ],
      "payNote1": "Za standardna projekta START in BUSINESS predplačilo za izdelavo ni potrebno.",
      "payNote2": "Za zahtevne in individualne projekte se pogoji plačila določijo posebej.",
      "payNote3": "Domena in plačljive zunanje storitve se plačajo posebej.",
      "rightsTitle": "Domena in pravice do spletne strani",
      "rightsLead": "Priporočamo, da domeno takoj registrirate na ime naročnika. Po plačilu predamo dogovorjene dostope in gradivo strani.",
      "rightsBullets": [
        "Naročnik lahko domeno kupi sam ali zaprosi SOLO.POV za pomoč pri registraciji.",
        "Predamo dostope in gradivo, dogovorjeno v naročilu.",
        "Ne predajamo tujih licenc, zaprtih storitev in komponent, katerih pravice niso v lasti SOLO.POV.",
        "Pogoji predaje pravic so zapisani v pogodbi ali dogovorjenem naročilu."
      ],
      "payExtra": [
        "Izdelava spletne strani se plača ločeno od rednega vzdrževanja.",
        "Dodatne spremembe nad dogovorjenim obsegom se obračunajo posebej.",
        "Pogoji podpore se dogovorijo posebej."
      ],
      "calcNote": "Predračun je okviren. Končno ceno in roke potrdimo pred začetkom dela.",
      "revInfoLabel": "Pojasnilo o krogih popravkov",
      "revHintDesktop": "Pomaknite se do ⓘ ali kliknite, da izveste, kako se upoštevajo krogi popravkov.",
      "revHintMobile": "Kliknite ⓘ za pojasnilo.",
      "revTooltip": [
        "En krog popravkov je en dogovorjen sklop pripomb naročnika po pregledu različice strani.",
        "Na primer: zamenjava fotografije, popravek besedila, premik bloka in uskladitev videza — vse to je lahko del enega kroga.",
        "Odprava tehničnih napak in neskladij z dogovorjenim naročilom ni omejena s številom krogov in se ne zaračunava dodatno.",
        "Nove strani, dodatne funkcije in bistvene spremembe potrjene zasnove se dogovorijo posebej."
      ],
      "calcCustom": "Individualni izračun",
      "calcIndividual": "+ individualna ocena",
      "discuss": "Pogovorimo se o izbiri",
      "unsure": "Ne vem, kaj izbrati",
      "choose": "Izberite paket",
      "compareMobile": "Prikažite paket",
      "addonsNote": "Končna cena je odvisna od obsega in tehničnih zahtev.",
      "paymentTitle": "O plačilu",
      "payment": [
        "Izdelava spletne strani se plača ločeno od rednega vzdrževanja.",
        "Domena in plačljive zunanje storitve se lahko plačajo dodatno.",
        "Končno ceno in roke potrdimo pred začetkom dela.",
        "Dodatne spremembe nad dogovorjenim obsegom se obračunajo posebej.",
        "Pogoji podpore se dogovorijo posebej."
      ],
      "vatNote": "Davčni režim bo potrjen pred objavo."
    }
  },
  "ru": {
    "tariffs": [
      {
        "id": "start",
        "name": "START",
        "price": 300,
        "priceLabel": "от 300 €",
        "desc": "Для одного основного предложения, специалиста или небольшого бизнеса.",
        "features": [
          "Одностраничный сайт.",
          "Адаптивный дизайн на основе готовой структуры.",
          "Несколько смысловых секций в пределах одной страницы.",
          "Простая форма заявки.",
          "Контакты и кнопки связи.",
          "Карта при необходимости.",
          "Базовая SEO-подготовка.",
          "Подключение домена и публикация.",
          "Два раунда правок."
        ],
        "includes": [],
        "cta": "Выбрать START"
      },
      {
        "id": "business",
        "name": "BUSINESS",
        "price": 600,
        "priceLabel": "от 600 €",
        "desc": "Для компании с несколькими направлениями.",
        "features": [
          "До пяти страниц.",
          "Персонализированный дизайн.",
          "Мобильная адаптация.",
          "Формы заявок.",
          "Галерея или портфолио.",
          "Основная SEO-подготовка каждой страницы.",
          "Настройка базовой аналитики.",
          "Помощь с Google Business Profile в согласованном объёме.",
          "Три раунда правок."
        ],
        "includes": [
          "analytics",
          "gbp"
        ],
        "cta": "Выбрать BUSINESS"
      },
      {
        "id": "pro",
        "name": "PRO",
        "price": 1000,
        "priceLabel": "от 1 000 €",
        "desc": "Для компании, которая хочет развивать сайт.",
        "features": [
          "До десяти страниц.",
          "Расширенная структура и дизайн.",
          "До двух языковых версий.",
          "Раздел статей.",
          "Расширенные формы.",
          "Аналитика и отслеживание согласованных конверсий.",
          "Одна простая интеграция.",
          "Четыре раунда правок."
        ],
        "includes": [
          "language",
          "blog",
          "form",
          "analytics",
          "tracking"
        ],
        "cta": "Выбрать PRO"
      },
      {
        "id": "custom",
        "name": "CUSTOM",
        "price": null,
        "priceLabel": "Индивидуальный расчёт",
        "desc": "Для интернет-магазинов, личных кабинетов, сложных систем бронирования и нестандартных функций.",
        "features": [
          "Интернет-магазины.",
          "Личные кабинеты.",
          "Сложные системы бронирования.",
          "Нестандартные функции.",
          "Веб-приложения.",
          "Цена после обсуждения задачи.",
          "Раунды правок по договорённости."
        ],
        "includes": [],
        "cta": "Обсудить задачу"
      }
    ],
    "table": {
      "columns": [
        "START",
        "BUSINESS",
        "PRO"
      ],
      "rows": [
        {
          "label": "Количество страниц",
          "values": [
            "1",
            "до 5",
            "до 10"
          ]
        },
        {
          "label": "Дизайн",
          "values": [
            "Базовая структура",
            "Индивидуальный",
            "Расширенный"
          ]
        },
        {
          "label": "Мобильная версия",
          "values": [
            true,
            true,
            true
          ]
        },
        {
          "label": "Формы",
          "values": [
            "Простая",
            "Несколько форм",
            "Расширенные"
          ]
        },
        {
          "label": "Галерея",
          "values": [
            false,
            true,
            true
          ]
        },
        {
          "label": "SEO",
          "values": [
            "Базовая",
            "Базовая по страницам",
            "Расширенная"
          ]
        },
        {
          "label": "Дополнительные языки",
          "values": [
            "1",
            "1",
            "до 2"
          ]
        },
        {
          "label": "Google Analytics",
          "values": [
            false,
            true,
            true
          ]
        },
        {
          "label": "Google Business Profile",
          "values": [
            false,
            "По договорённости",
            false
          ]
        },
        {
          "label": "Подготовка к рекламе",
          "values": [
            false,
            false,
            "По договорённости"
          ]
        },
        {
          "label": "Блог",
          "values": [
            false,
            false,
            true
          ]
        },
        {
          "label": "Интеграции",
          "values": [
            false,
            false,
            "1 простая"
          ]
        },
        {
          "label": "Раунды правок",
          "key": "revisions",
          "values": [
            "2",
            "3",
            "4"
          ]
        },
        {
          "label": "Поддержка",
          "values": [
            "По договорённости",
            "По договорённости",
            "По договорённости"
          ]
        }
      ]
    },
    "addons": [
      {
        "id": "page",
        "title": "Дополнительная страница",
        "price": 50
      },
      {
        "id": "language",
        "title": "Дополнительный язык",
        "price": 100
      },
      {
        "id": "blog",
        "title": "Блог",
        "price": 120
      },
      {
        "id": "form",
        "title": "Форма с дополнительными вопросами",
        "price": 70
      },
      {
        "id": "booking",
        "title": "Онлайн-запись через готовый сервис",
        "price": 120
      },
      {
        "id": "analytics",
        "title": "Google Analytics",
        "price": 60
      },
      {
        "id": "tracking",
        "title": "Отслеживание заявок для рекламы",
        "price": 90
      },
      {
        "id": "gbp",
        "title": "Помощь с Google Business Profile",
        "price": 70
      },
      {
        "id": "calculator",
        "title": "Простой калькулятор стоимости",
        "price": 150
      },
      {
        "id": "integrations",
        "title": "Другие интеграции",
        "price": null,
        "individual": true
      }
    ],
    "ui": {
      "selected": "Выбран",
      "included": "Включено",
      "includedInTariff": "Включено в тариф",
      "individual": "Индивидуальная оценка",
      "from": "от",
      "calcTitle": "Ваш выбор",
      "calcEmpty": "Сначала выберите тариф.",
      "calcBase": "Базовый тариф",
      "calcAddons": "Дополнительные функции",
      "calcTotal": "Ориентировочная стоимость от",
      "reset": "Сбросить дополнительные функции",
      "payTitle": "Сначала сайт. Потом оплата.",
      "payLead": "Мы создаём сайт и показываем готовую версию. Вы проверяете результат, согласовываете правки и только после утверждения оплачиваете разработку. Затем мы запускаем сайт и передаём доступы.",
      "paySteps": [
        "Создаём сайт.",
        "Вы проверяете.",
        "Оплата и передача."
      ],
      "payNote": "Без предоплаты за разработку для стандартных START и BUSINESS. Для PRO и индивидуальных проектов условия согласовываются отдельно. Домен и платные сервисы оплачиваются отдельно.",
      "payDetailsTitle": "Подробные условия оплаты и передачи сайта",
      "payDetails": [
        "Домен рекомендуем оформлять на владельца бизнеса.",
        "Клиент может купить домен самостоятельно либо попросить помощь.",
        "После оплаты передаём согласованные доступы и материалы.",
        "Права на код, дизайн и другие материалы определяются условиями заказа.",
        "Платные сторонние сервисы и регулярное обслуживание оплачиваются отдельно.",
        "Дополнительные работы сверх утверждённого задания согласовываются отдельно."
      ],
      "payNote1": "Для стандартных проектов START и BUSINESS предоплата за разработку не требуется.",
      "payNote2": "Для сложных и индивидуальных проектов условия оплаты определяются отдельно.",
      "payNote3": "Домен и платные сторонние сервисы оплачиваются отдельно.",
      "rightsTitle": "Домен и права на сайт",
      "rightsLead": "Домен рекомендуем оформлять сразу на имя клиента. После оплаты передаём согласованные доступы и материалы сайта.",
      "rightsBullets": [
        "Клиент может купить домен самостоятельно или обратиться за помощью к SOLO.POV.",
        "Передаём доступы и материалы, согласованные в заказе.",
        "Не передаём чужие лицензии, закрытые сервисы и компоненты, права на которые не принадлежат SOLO.POV.",
        "Условия передачи прав фиксируются в договоре или согласованном заказе."
      ],
      "payExtra": [
        "Создание сайта оплачивается отдельно от регулярного обслуживания.",
        "Дополнительные изменения сверх согласованного объёма рассчитываются отдельно.",
        "Условия поддержки оговариваются отдельно."
      ],
      "calcNote": "Расчёт предварительный. Итоговую стоимость и сроки согласуем до начала работы.",
      "revInfoLabel": "Пояснение о раундах правок",
      "revHintDesktop": "Наведите на ⓘ или нажмите, чтобы узнать, как учитываются раунды правок.",
      "revHintMobile": "Нажмите ⓘ для пояснения.",
      "revTooltip": [
        "Один раунд правок — это один согласованный пакет замечаний клиента после просмотра версии сайта.",
        "Например, изменить фотографию, поправить текст, переместить блок и скорректировать оформление — всё это может входить в один раунд.",
        "Исправление технических ошибок и несоответствий утверждённому заданию не ограничивается количеством раундов и не оплачивается дополнительно.",
        "Новые страницы, дополнительные функции и существенные изменения утверждённой концепции согласовываются отдельно."
      ],
      "calcCustom": "Индивидуальный расчёт",
      "calcIndividual": "+ индивидуальная оценка",
      "discuss": "Обсудить выбранный вариант",
      "unsure": "Не знаю, что выбрать",
      "choose": "Выбрать тариф",
      "compareMobile": "Показать тариф",
      "addonsNote": "Итоговая стоимость зависит от объёма и технических требований.",
      "paymentTitle": "Об оплате",
      "payment": [
        "Создание сайта оплачивается отдельно от регулярного обслуживания.",
        "Домен и платные внешние сервисы могут оплачиваться дополнительно.",
        "Итоговая стоимость и сроки согласовываются до начала работы.",
        "Дополнительные изменения сверх согласованного объёма рассчитываются отдельно.",
        "Условия поддержки оговариваются отдельно."
      ],
      "vatNote": "Налоговый режим будет подтверждён перед публикацией."
    }
  },
  "en": {
    "tariffs": [
      {
        "id": "start",
        "name": "START",
        "price": 300,
        "priceLabel": "from €300",
        "desc": "For one main offer, specialist or small business.",
        "features": [
          "Single page website.",
          "Responsive design based on ready-made structure.",
          "Some sensible sets on one side.",
          "Simple inquiry form.",
          "Contacts and contact buttons.",
          "Map if needed.",
          "Basic SEO preparation.",
          "Domain linking and publishing.",
          "Two rounds of corrections."
        ],
        "includes": [],
        "cta": "Select START"
      },
      {
        "id": "business",
        "name": "BUSINESS",
        "price": 600,
        "priceLabel": "from €600",
        "desc": "For a business with multiple activities.",
        "features": [
          "Up to five pages.",
          "Customized design.",
          "Mobile adaptation.",
          "Inquiry forms.",
          "Gallery or portfolio.",
          "Basic SEO preparation of each page.",
          "Setting up basic analytics.",
          "Help with Google Business Profile to the agreed extent.",
          "Three rounds of corrections."
        ],
        "includes": [
          "analytics",
          "gbp"
        ],
        "cta": "Select BUSINESS"
      },
      {
        "id": "pro",
        "name": "PRO",
        "price": 1000,
        "priceLabel": "from €1,000",
        "desc": "For a company that wants to develop the site.",
        "features": [
          "Up to ten pages.",
          "Advanced structure and design.",
          "Up to two language versions.",
          "Articles section.",
          "Advanced Forms.",
          "Analytics and tracking of agreed conversions.",
          "One simple integration.",
          "Four rounds of corrections."
        ],
        "includes": [
          "language",
          "blog",
          "form",
          "analytics",
          "tracking"
        ],
        "cta": "Select PRO"
      },
      {
        "id": "custom",
        "name": "CUSTOM",
        "price": null,
        "priceLabel": "Individual calculation",
        "desc": "For shops, portals, reservations and special functions.",
        "features": [
          "Online stores.",
          "Personal portals.",
          "Demanding reservation systems.",
          "Non-standard functions.",
          "Web applications.",
          "Price after negotiation.",
          "Rounds of corrections by appointment."
        ],
        "includes": [],
        "cta": "Let's talk"
      }
    ],
    "table": {
      "columns": [
        "START",
        "BUSINESS",
        "PRO"
      ],
      "rows": [
        {
          "label": "Number of pages",
          "values": [
            "1",
            "until 5",
            "until 10"
          ]
        },
        {
          "label": "Design",
          "values": [
            "Basic structure",
            "Adapted",
            "Expanded"
          ]
        },
        {
          "label": "Mobile version",
          "values": [
            true,
            true,
            true
          ]
        },
        {
          "label": "Forms",
          "values": [
            "Simple",
            "More forms",
            "Advanced"
          ]
        },
        {
          "label": "Gallery",
          "values": [
            false,
            true,
            true
          ]
        },
        {
          "label": "SEO",
          "values": [
            "Basic",
            "Basic by pages",
            "Advanced"
          ]
        },
        {
          "label": "Additional languages",
          "values": [
            "1",
            "1",
            "until 2"
          ]
        },
        {
          "label": "Google Analytics",
          "values": [
            false,
            true,
            true
          ]
        },
        {
          "label": "Google Business Profile",
          "values": [
            false,
            "By arrangement",
            false
          ]
        },
        {
          "label": "Preparation for advertising",
          "values": [
            false,
            false,
            "By arrangement"
          ]
        },
        {
          "label": "Blog",
          "values": [
            false,
            false,
            true
          ]
        },
        {
          "label": "Integrations",
          "values": [
            false,
            false,
            "1 simple"
          ]
        },
        {
          "label": "Rounds of fixes",
          "key": "revisions",
          "values": [
            "2",
            "3",
            "4"
          ]
        },
        {
          "label": "Support",
          "values": [
            "By arrangement",
            "By arrangement",
            "By arrangement"
          ]
        }
      ]
    },
    "addons": [
      {
        "id": "page",
        "title": "Additional page",
        "price": 50
      },
      {
        "id": "language",
        "title": "Additional language",
        "price": 100
      },
      {
        "id": "blog",
        "title": "Blog",
        "price": 120
      },
      {
        "id": "form",
        "title": "Additional questions form",
        "price": 70
      },
      {
        "id": "booking",
        "title": "Online reservation through a ready service",
        "price": 120
      },
      {
        "id": "analytics",
        "title": "Google Analytics",
        "price": 60
      },
      {
        "id": "tracking",
        "title": "Tracking of advertising requests",
        "price": 90
      },
      {
        "id": "gbp",
        "title": "Help with Google Business Profile",
        "price": 70
      },
      {
        "id": "calculator",
        "title": "Simple price calculator",
        "price": 150
      },
      {
        "id": "integrations",
        "title": "Other integrations",
        "price": null,
        "individual": true
      }
    ],
    "ui": {
      "selected": "Chosen",
      "included": "On",
      "includedInTariff": "Included in the package",
      "individual": "Individual assessment",
      "from": "from",
      "calcTitle": "Your selection",
      "calcEmpty": "First, select a package.",
      "calcBase": "Basic package",
      "calcAddons": "Additional options",
      "calcTotal": "Approximate price from",
      "reset": "Reset advanced options",
      "payTitle": "First off. Then payment.",
      "payLead": "We build the page and show you the final version. You check the result, agree on the corrections and only pay for the production after confirmation. Then we publish the page and hand over the accesses.",
      "paySteps": [
        "We are making a page.",
        "You check.",
        "Payment and delivery."
      ],
      "payNote": "No advance payment for production with standard START and BUSINESS packages. For PRO and individual projects, the conditions are agreed separately. Domain and paid services are paid for separately.",
      "payDetailsTitle": "Detailed terms of payment and delivery of the site",
      "payDetails": [
        "We recommend that you register the domain in the name of the business owner.",
        "The subscriber can buy the domain himself or ask for help.",
        "After payment, we hand over the agreed access and material.",
        "Rights to code, design and other material are determined by the terms of the order.",
        "Paid external services and regular maintenance are paid for separately.",
        "Additional work above the confirmed scope is agreed separately."
      ],
      "payNote1": "For standard START and BUSINESS projects, no advance payment is required for production.",
      "payNote2": "For demanding and individual projects, payment terms are determined separately.",
      "payNote3": "The domain and paid external services are paid for separately.",
      "rightsTitle": "Domain and site rights",
      "rightsLead": "We recommend that you register the domain immediately in the name of the client. After payment, we hand over the agreed access and site material.",
      "rightsBullets": [
        "The subscriber can buy the domain himself or ask SOLO.POV for help with registration.",
        "We hand over the access and material agreed in the order.",
        "We do not transfer foreign licenses, closed services and components whose rights are not owned by SOLO.POV.",
        "The conditions for the transfer of rights are written in the contract or agreed order."
      ],
      "payExtra": [
        "Site development is billed separately from regular maintenance.",
        "Additional changes above the agreed scope are billed separately.",
        "Support conditions are agreed separately."
      ],
      "calcNote": "The estimate is indicative. We confirm the final price and deadlines before starting the work.",
      "revInfoLabel": "An explanation of patch rounds",
      "revHintDesktop": "Scroll to ⓘ or click to learn how patch rounds are accounted for.",
      "revHintMobile": "Click ⓘ for clarification.",
      "revTooltip": [
        "One round of revisions is one agreed package of client comments after reviewing a version of the page.",
        "For example, changing the photo, correcting the text, moving the block and matching the appearance — these can all be part of a single round.",
        "The elimination of technical errors and discrepancies with the agreed order is not limited by the number of rounds and is not charged additionally.",
        "New pages, additional functions and significant changes to the approved design are agreed separately."
      ],
      "calcCustom": "Individual calculation",
      "calcIndividual": "+ individual assessment",
      "discuss": "Let's talk about the chosen one",
      "unsure": "I don't know what to choose",
      "choose": "Select a package",
      "compareMobile": "Show package",
      "addonsNote": "The final price depends on the scope and technical requirements.",
      "paymentTitle": "About payment",
      "payment": [
        "Site development is billed separately from regular maintenance.",
        "Domain and paid external services can be paid additionally.",
        "We confirm the final price and deadlines before starting the work.",
        "Additional changes above the agreed scope are billed separately.",
        "Support conditions are agreed separately."
      ],
      "vatNote": "The tax regime will be confirmed before publication."
    }
  },
  "de": {
    "tariffs": [
      {
        "id": "start",
        "name": "START",
        "price": 300,
        "priceLabel": "ab 300 €",
        "desc": "Für ein Hauptangebot, einen Spezialisten oder ein Kleinunternehmen.",
        "features": [
          "Einseitige Website.",
          "Responsives Design basierend auf einer vorgefertigten Struktur.",
          "Einige sinnvolle Sets auf der einen Seite.",
          "Einfaches Anfrageformular.",
          "Kontakte und Kontaktschaltflächen.",
          "Karte bei Bedarf.",
          "Grundlegende SEO-Vorbereitung.",
          "Domain-Verknüpfung und Veröffentlichung.",
          "Zwei Korrekturrunden."
        ],
        "includes": [],
        "cta": "Wählen Sie STARTEN"
      },
      {
        "id": "business",
        "name": "BUSINESS",
        "price": 600,
        "priceLabel": "ab 600 €",
        "desc": "Für ein Unternehmen mit mehreren Aktivitäten.",
        "features": [
          "Bis zu fünf Seiten.",
          "Individuelles Design.",
          "Mobile Anpassung.",
          "Anfrageformulare.",
          "Galerie oder Portfolio.",
          "Grundlegende SEO-Vorbereitung jeder Seite.",
          "Einrichten grundlegender Analysen.",
          "Hilfe bei Google Business Profile im vereinbarten Umfang.",
          "Drei Korrekturrunden."
        ],
        "includes": [
          "analytics",
          "gbp"
        ],
        "cta": "Wählen Sie GESCHÄFT"
      },
      {
        "id": "pro",
        "name": "PRO",
        "price": 1000,
        "priceLabel": "ab 1.000 €",
        "desc": "Für ein Unternehmen, das die Website entwickeln möchte.",
        "features": [
          "Bis zu zehn Seiten.",
          "Fortschrittliche Struktur und Design.",
          "Bis zu zwei Sprachversionen.",
          "Abschnitt „Artikel“.",
          "Erweiterte Formulare.",
          "Analyse und Verfolgung vereinbarter Conversions.",
          "Eine einfache Integration.",
          "Vier Korrekturrunden."
        ],
        "includes": [
          "language",
          "blog",
          "form",
          "analytics",
          "tracking"
        ],
        "cta": "Wählen Sie PRO"
      },
      {
        "id": "custom",
        "name": "CUSTOM",
        "price": null,
        "priceLabel": "Individuelle Berechnung",
        "desc": "Für Shops, Portale, Reservierungen und Sonderfunktionen.",
        "features": [
          "Online-Shops.",
          "Persönliche Portale.",
          "Anspruchsvolle Reservierungssysteme.",
          "Nicht standardmäßige Funktionen.",
          "Webanwendungen.",
          "Preis nach Verhandlung.",
          "Korrekturrunden nach Vereinbarung."
        ],
        "includes": [],
        "cta": "Lass uns reden"
      }
    ],
    "table": {
      "columns": [
        "START",
        "BUSINESS",
        "PRO"
      ],
      "rows": [
        {
          "label": "Anzahl der Seiten",
          "values": [
            "1",
            "bis 5",
            "bis 10"
          ]
        },
        {
          "label": "Design",
          "values": [
            "Grundstruktur",
            "Angepasst",
            "Erweitert"
          ]
        },
        {
          "label": "Mobile Version",
          "values": [
            true,
            true,
            true
          ]
        },
        {
          "label": "Formulare",
          "values": [
            "Einfach",
            "Weitere Formulare",
            "Fortgeschritten"
          ]
        },
        {
          "label": "Galerie",
          "values": [
            false,
            true,
            true
          ]
        },
        {
          "label": "SEO",
          "values": [
            "Einfach",
            "Basic nach Seiten",
            "Fortgeschritten"
          ]
        },
        {
          "label": "Zusätzliche Sprachen",
          "values": [
            "1",
            "1",
            "bis 2"
          ]
        },
        {
          "label": "Google Analytics",
          "values": [
            false,
            true,
            true
          ]
        },
        {
          "label": "Google-Unternehmensprofil",
          "values": [
            false,
            "Nach Vereinbarung",
            false
          ]
        },
        {
          "label": "Vorbereitung für Werbung",
          "values": [
            false,
            false,
            "Nach Vereinbarung"
          ]
        },
        {
          "label": "Blog",
          "values": [
            false,
            false,
            true
          ]
        },
        {
          "label": "Integrationen",
          "values": [
            false,
            false,
            "1 einfach"
          ]
        },
        {
          "label": "Runden von Korrekturen",
          "key": "revisions",
          "values": [
            "2",
            "3",
            "4"
          ]
        },
        {
          "label": "Unterstützung",
          "values": [
            "Nach Vereinbarung",
            "Nach Vereinbarung",
            "Nach Vereinbarung"
          ]
        }
      ]
    },
    "addons": [
      {
        "id": "page",
        "title": "Zusätzliche Seite",
        "price": 50
      },
      {
        "id": "language",
        "title": "Zusätzliche Sprache",
        "price": 100
      },
      {
        "id": "blog",
        "title": "Blog",
        "price": 120
      },
      {
        "id": "form",
        "title": "Formular für zusätzliche Fragen",
        "price": 70
      },
      {
        "id": "booking",
        "title": "Online-Reservierung über einen Bereitschaftsdienst",
        "price": 120
      },
      {
        "id": "analytics",
        "title": "Google Analytics",
        "price": 60
      },
      {
        "id": "tracking",
        "title": "Verfolgung von Werbeanfragen",
        "price": 90
      },
      {
        "id": "gbp",
        "title": "Hilfe zum Google Unternehmensprofil",
        "price": 70
      },
      {
        "id": "calculator",
        "title": "Einfacher Preisrechner",
        "price": 150
      },
      {
        "id": "integrations",
        "title": "Andere Integrationen",
        "price": null,
        "individual": true
      }
    ],
    "ui": {
      "selected": "Ausgewählt",
      "included": "Auf",
      "includedInTariff": "Im Paket enthalten",
      "individual": "Individuelle Beurteilung",
      "from": "ab",
      "calcTitle": "Ihre Auswahl",
      "calcEmpty": "Wählen Sie zunächst ein Paket aus.",
      "calcBase": "Basispaket",
      "calcAddons": "Zusätzliche Optionen",
      "calcTotal": "Ungefährer Preis ab",
      "reset": "Erweiterte Optionen zurücksetzen",
      "payTitle": "Zunächst einmal. Dann Zahlung.",
      "payLead": "Wir erstellen die Seite und zeigen Ihnen die endgültige Version. Sie prüfen das Ergebnis, vereinbaren die Korrekturen und bezahlen die Produktion erst nach Bestätigung. Anschließend veröffentlichen wir die Seite und übergeben die Zugriffe.",
      "paySteps": [
        "Wir erstellen eine Seite.",
        "Sie überprüfen.",
        "Zahlung und Lieferung."
      ],
      "payNote": "Keine Vorauszahlung für die Produktion bei den Standardpaketen START und BUSINESS. Für PRO- und Einzelprojekte werden die Konditionen gesondert vereinbart. Domain- und kostenpflichtige Dienste werden separat bezahlt.",
      "payDetailsTitle": "Detaillierte Zahlungs- und Lieferbedingungen der Website",
      "payDetails": [
        "Wir empfehlen Ihnen, die Domain auf den Namen des Geschäftsinhabers zu registrieren.",
        "Der Abonnent kann die Domain selbst kaufen oder um Hilfe bitten.",
        "Nach Zahlungseingang übergeben wir den vereinbarten Zugang und das Material.",
        "Rechte an Code, Design und anderem Material werden durch die Bedingungen der Bestellung bestimmt.",
        "Bezahlte Fremdleistungen und regelmäßige Wartungen werden gesondert vergütet.",
        "Darüber hinausgehende Arbeiten über den bestätigten Umfang hinaus werden gesondert vereinbart."
      ],
      "payNote1": "Für Standard-START- und BUSINESS-Projekte ist keine Vorauszahlung für die Produktion erforderlich.",
      "payNote2": "Für anspruchsvolle und individuelle Projekte werden die Zahlungsbedingungen gesondert festgelegt.",
      "payNote3": "Die Domain und kostenpflichtige Fremdleistungen werden gesondert vergütet.",
      "rightsTitle": "Domain- und Site-Rechte",
      "rightsLead": "Wir empfehlen Ihnen, die Domain umgehend auf den Namen des Kunden zu registrieren. Nach Zahlungseingang übergeben wir Ihnen den vereinbarten Zugang und das Geländematerial.",
      "rightsBullets": [
        "Der Abonnent kann die Domain selbst kaufen oder SOLO.POV um Hilfe bei der Registrierung bitten.",
        "Wir übergeben den in der Bestellung vereinbarten Zugang und das Material.",
        "Wir übertragen keine ausländischen Lizenzen, geschlossenen Dienste und Komponenten, deren Rechte nicht bei SOLO.POV liegen.",
        "Die Bedingungen für die Übertragung der Rechte sind im Vertrag oder in der vereinbarten Bestellung festgelegt."
      ],
      "payExtra": [
        "Die Website-Entwicklung wird getrennt von der regulären Wartung abgerechnet.",
        "Darüber hinausgehende Änderungen über den vereinbarten Umfang hinaus werden gesondert in Rechnung gestellt.",
        "Supportbedingungen werden gesondert vereinbart."
      ],
      "calcNote": "Die Schätzung ist indikativ. Wir bestätigen den endgültigen Preis und die Fristen vor Beginn der Arbeiten.",
      "revInfoLabel": "Eine Erklärung der Patch-Runden",
      "revHintDesktop": "Scrollen Sie zu ⓘ oder klicken Sie, um zu erfahren, wie Patch-Runden berücksichtigt werden.",
      "revHintMobile": "Klicken Sie zur Erläuterung auf ⓘ.",
      "revTooltip": [
        "Eine Überarbeitungsrunde ist ein vereinbartes Paket von Kundenkommentaren nach Überprüfung einer Version der Seite.",
        "Zum Beispiel das Foto ändern, den Text korrigieren, den Block verschieben und das Erscheinungsbild anpassen – das alles kann Teil einer einzigen Runde sein.",
        "Die Beseitigung technischer Fehler und Abweichungen vom vereinbarten Auftrag ist nicht durch die Anzahl der Runden begrenzt und wird nicht zusätzlich berechnet.",
        "Neue Seiten, zusätzliche Funktionen und wesentliche Änderungen am genehmigten Design werden gesondert vereinbart."
      ],
      "calcCustom": "Individuelle Berechnung",
      "calcIndividual": "+ individuelle Beurteilung",
      "discuss": "Reden wir über den Auserwählten",
      "unsure": "Ich weiß nicht, was ich wählen soll",
      "choose": "Wählen Sie ein Paket aus",
      "compareMobile": "Paket anzeigen",
      "addonsNote": "Der Endpreis richtet sich nach Umfang und technischen Anforderungen.",
      "paymentTitle": "Über die Zahlung",
      "payment": [
        "Die Website-Entwicklung wird getrennt von der regulären Wartung abgerechnet.",
        "Domain- und kostenpflichtige externe Dienste können zusätzlich bezahlt werden.",
        "Wir bestätigen den endgültigen Preis und die Fristen vor Beginn der Arbeiten.",
        "Darüber hinausgehende Änderungen über den vereinbarten Umfang hinaus werden gesondert in Rechnung gestellt.",
        "Supportbedingungen werden gesondert vereinbart."
      ],
      "vatNote": "Die Steuerregelung wird vor der Veröffentlichung bestätigt."
    }
  }
};
