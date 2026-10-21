/* Solo.Pov — AI, support and automation page data (v2) */
window.SOLO_AI = {
  sl: {
    hero: {
      eyebrow: 'Solo.Pov · AI in tehnična podpora',
      title: 'Vaša stran deluje. Pomagamo ji rasti.',
      sub: [
        'Tehnična podpora, AI-asistenti in avtomatizacija vsakodnevnih nalog.',
        'Manj rutine — več časa za vaše poslovanje.'
      ],
      cards: [
        { id: 'support', n: '01', title: 'Tehnična podpora', desc: 'Želite, da stran deluje, se posodablja in imate vedno koga vprašati?', cta: 'Poglej pakete →' },
        { id: 'ai', n: '02', title: 'AI-asistent', desc: 'Upravljajte vsebino strani prek Telegrama. Prosite AI, da pripravi besedilo, spremeni podatke ali ustvari novo objavo.', cta: 'Kako deluje →' },
        { id: 'automation', n: '03', title: 'Avtomatizacija poslovanja', desc: 'Avtomatizirajte povpraševanja, obvestila, spletne rezervacije in druge ponavljajoče se naloge.', cta: 'Poglej možnosti →' }
      ]
    },
    support: {
      eyebrow: 'Tehnična podpora',
      title: 'Vaša stran pod nadzorom',
      explainer: 'Tehnična podpora je pomoč pri ohranjanju delovanja vaše strani. Preverjamo dosegljivost strani in osnovnih funkcij, pomagamo pri težavah in rešujemo tehnična vprašanja. AI-asistenta ni treba vklopiti.',
      tariffs: [
        { id: 'start', name: 'START', price: 'od 19 €/mesec', monthly: 19, desc: 'Za manjše statične strani.', features: [
          'Osnovni nadzor dosegljivosti strani.',
          'Mesečni pregled osnovnih funkcij.',
          'Svetovanje po e-pošti.',
          'Obvestilo o odkritih težavah.',
          'Priporočila za potrebne posodobitve.'
        ] },
        { id: 'business', name: 'BUSINESS', price: 'od 49 €/mesec', monthly: 49, desc: 'Za strani, ki jih redno uporabljate v poslovanju.', features: [
          'Vse iz START.',
          'Redni pregled strani.',
          'Do 30 minut manjših sprememb na mesec.',
          'Preverjanje delovanja obrazcev.',
          'Prednostna obravnava v delovnem času.'
        ] },
        { id: 'pro', name: 'PRO', price: 'od 99 €/mesec', monthly: 99, desc: 'Za aktivno razvijajoče se strani.', features: [
          'Vse iz BUSINESS.',
          'Pogostejši tehnični nadzor.',
          'Do 90 minut manjših sprememb na mesec.',
          'Nadzor dogovorjenih integracij.',
          'Pomoč pri posodabljanju vsebine.',
          'Prednostna tehnična podpora.'
        ] }
      ],
      details: [
        { title: 'Kaj vključuje paket?', body: [
          'START: nadzor dosegljivosti, mesečni pregled funkcij, svetovanje po e-pošti, obvestila in priporočila.',
          'BUSINESS: vse iz START, redni pregled, do 30 minut manjših sprememb, preverjanje obrazcev in prednostna obravnava v delovnem času.',
          'PRO: vse iz BUSINESS, pogostejši nadzor, do 90 minut manjših sprememb, nadzor integracij, pomoč pri vsebini in prednostna podpora.'
        ] },
        { title: 'Kaj šteje kot manjša sprememba?', body: [
          'Zamenjava besedila, fotografije, kontaktnih podatkov, popravek manjšega elementa ali druga preprosta sprememba v okviru obstoječe strukture strani.',
          'Izdelava novih strani, zahtevne integracije in bistvene spremembe videza se ocenijo posebej.'
        ] },
        { title: 'Pogoji tehničnega spremljanja', body: [
          'Paketi so okvirni in odvisni od platforme, zahtevnosti strani in povezanih storitev.',
          'Neizkoriščen čas sprememb se ne prenaša v naslednji mesec.',
          'Nove strani, zahtevne funkcije, redizajn, oglaševalske kampanje in večje izboljšave niso vključene v mesečno vzdrževanje.',
          'Dela nad limitom se dogovorijo posebej.',
          'Odzivni časi in seznam preverjanj se določijo pred vklopom paketa.',
          'Ne obljubljamo podpore 24/7 ali takojšnje odprave vseh napak.'
        ] }
      ],
      cta: 'Vklopi podporo →',
      hint: 'Najprej izberite paket zgoraj.'
    },
    ai: {
      eyebrow: 'AI-asistent',
      title: 'Vaša stran. Vaš Telegram. Vaš AI-pomočnik.',
      sub: 'Upravljajte stran s preprostimi sporočili. Dodajajte storitve, spreminjajte cene, objavljajte članke in posodabljajte podatke brez zapletenih nadzornih plošč.',
      offer: {
        accent: 'Preizkusite AI-pomočnika brezplačno — plačajte, če vam ustreza.',
        cta: 'Preizkusite AI-pomočnika →',
        note: 'Predstavitev je brezplačna. Možnost preizkusa na vaši strani se dogovori individualno.'
      },
      scenarios: {
        label: 'Primeri dela AI-pomočnika',
        title: 'Kako to izgleda v praksi',
        note: 'Resnične naloge in prikaz možnosti.',
        disclaimer: 'Prikazani pogovori so rekonstruirani primeri za predstavitev. Ne gre za dobesedne posnetke, rezultati pa so odvisni od dogovorjenega obsega.',
        items: [
          {
            id: 'service', tab: 'Dodajanje storitve', bot: 'Zeleni pomočnik', project: 'Zeleni pomočnik', kind: 'site',
            messages: [
              { who: 'client', text: 'Živjo! Prosim, dodaj na stran novo storitev: čiščenje in pranje žlebov ter odtočnih sistemov. Preveri, kako to predstavljajo konkurenti, in pripravi koristen članek.' },
              { who: 'ai', text: 'Seveda. Pregledal sem javno dostopne ponudbe lokalnih konkurentov. Večina poudarja preventivno vzdrževanje in cene okvirno 3–7 €/m.' },
              { who: 'ai', text: 'Pripravil sem nov blok storitve: opis, ključne prednosti, gumb za povpraševanje in ikone.' },
              { who: 'ai', text: 'Pripravil sem tudi članek »Zakaj je redno čiščenje žlebov pomembno?« z nasveti za vzdrževanje.' },
              { who: 'client', text: 'Super. Pokaži, kako bo izgledalo na strani.' },
              { who: 'ai', text: 'Tukaj je predogled. Spremembe so pripravljene za pregled — objavimo jih po vaši potrditvi.' }
            ],
            result: {
              label: 'Predogled na strani', url: 'zelenipomocnik.si', kicker: 'Nova storitev',
              title: 'Čiščenje in pranje žlebov ter odtočnih sistemov',
              desc: 'Profesionalno odstranimo listje, umazanijo in zamašitve ter poskrbimo za nemoten odtok meteornih voda.',
              meta: 'od 3–7 €/m', button: 'Povprašaj za ponudbo'
            }
          },
          {
            id: 'research', tab: 'Raziskava konkurence', bot: 'Zeleni pomočnik', project: 'Zeleni pomočnik', kind: 'research',
            messages: [
              { who: 'client', text: 'Preveri, kaj ponujajo konkurenti za čiščenje streh in fasad ter kakšne cene objavljajo.' },
              { who: 'ai', text: 'Pregledal sem javno dostopne ponudbe. Prevladujejo paketi za redno vzdrževanje; cene se gibljejo okvirno 3–7 €/m² glede na dostopnost in stopnjo umazanije.' },
              { who: 'ai', text: 'Večina izpostavlja preprečevanje poškodb fasade in strehe ter možnost letnega pregleda.' },
              { who: 'ai', text: 'Priporočam, da na strani jasno navedete obseg, ceno po m² in primer izračuna. To zmanjša število vprašanj pred povpraševanjem.' },
              { who: 'client', text: 'Dobro. Pripravi povzetek, da ga uporabimo pri novi storitvi.' }
            ],
            result: {
              label: 'Povzetek raziskave', url: 'javno dostopni podatki',
              title: 'Kaj ponujajo konkurenti',
              rows: [
                { k: 'Storitve', v: 'Čiščenje streh, fasad in žlebov' },
                { k: 'Cene', v: 'okvirno 3–7 €/m²' },
                { k: 'Poudarek', v: 'preventiva in redno vzdrževanje' },
                { k: 'Priložnost', v: 'jasen obseg in primer izračuna' }
              ],
              note: 'Informativni pregled javno dostopnih podatkov. Ni zagotovilo tržnih cen.'
            }
          },
          {
            id: 'booking', tab: 'Upravljanje rezervacij', bot: 'Solopova Makeup', project: 'SOLO.POV Makeup', kind: 'booking',
            messages: [
              { who: 'client', text: 'Živjo! Želim, da so spletni termini povezani z mojim koledarjem in da se prosti termini prikažejo samodejno, brez dvojnih rezervacij. Kako to nastavimo?' },
              { who: 'ai', text: 'Povezavo lahko uredimo. Spletne rezervacije se povežejo z Google Koledarjem, prosti termini pa se prikažejo glede na razpoložljivost.' },
              { who: 'ai', text: 'Sistem upošteva trajanje posameznih storitev in blokira potrebne intervale. Po rezervaciji stranka prejme potrditev.' },
              { who: 'ai', text: 'Povezali bi: rezervacije, koledar, trajanje storitev in potrditev termina. Nastavitev se izvede po vaši potrditvi.' },
              { who: 'client', text: 'Odlično, pripravi predogled.' },
              { who: 'ai', text: 'Tukaj je primer, kako so storitve in termini prikazani na strani.' }
            ],
            result: {
              label: 'Predogled rezervacij', url: 'solopovamakeup.si',
              title: 'Spletni termini in storitve',
              services: [
                { name: 'Večerno ličenje', dur: '60 min' },
                { name: 'Poročno ličenje', dur: '90 min' },
                { name: 'Ličenje za fotografiranje', dur: '75 min' }
              ],
              note: 'Primer prikaza storitev in trajanja. Povezava s koledarjem se nastavi posebej.'
            }
          }
        ]
      },
      trial: {
        eyebrow: 'Brezplačni preizkus',
        title: 'Preizkusite sami. Prepričajte se, kako priročno je.',
        desc: 'Spoznajte AI-pomočnika v brezplačni predstavitvi. Za zainteresirane stranke lahko dogovorimo individualni preizkus na njihovi strani.',
        steps: [
          { t: 'Povežemo', d: 'Preverimo združljivost strani in pripravimo povezavo z AI-pomočnikom.' },
          { t: 'Preizkusite', d: 'Dodajte storitev, uredite besedilo ali izvedite drugo dogovorjeno nalogo.' },
          { t: 'Odločite se', d: 'Nadaljujete le, če vam preizkus ustreza. Brez samodejnega podaljšanja.' }
        ],
        note: 'Predhodna zasnova individualnega preizkusa je 4 ure po dogovorjeni aktivaciji, z omejitvami uporabe. Preizkus na dejanski strani je odvisen od tehnične združljivosti in dogovorjenih pogojev. Spremembe na delujoči strani izvajamo le z dovoljenji in po potrditvi stranke.',
        cta: 'Dogovorite se za preizkus →',
        interest: 'Preizkus AI-pomočnika',
        interestLabel: 'Interes'
      },
      tariffsEyebrow: 'Paketi',
      tariffsTitle: 'Paketi AI-asistenta za Telegram',
      phones: [
        { id: 'service', title: 'Nova storitev', chat: [
          { who: 'client', text: 'Dodaj na stran novo storitev — čiščenje fasad. Cena od 5 € za m².' },
          { who: 'ai', text: 'Pripravil sem opis storitve in novo kartico. Poglejte predhodno različico.' },
          { who: 'ai', text: 'Objavim spremembe?' },
          { who: 'client', text: 'Da, objavi.' }
        ], previewAfter: 1, preview: { type: 'service', title: 'Čiščenje fasad', desc: 'Profesionalno čiščenje fasad od umazanije in izcedkov.', price: 'Od 5 €/m²', button: 'Naroči' }, status: 'Objava potrjena. To je predstavitev — stran se ni spremenila.' },
        { id: 'article', title: 'Priprava članka', chat: [
          { who: 'client', text: 'Pripravi članek o tem, zakaj je pomembno redno čistiti streho pred mahom.' },
          { who: 'ai', text: 'Pripravil sem članek z naslovom, razdelki in priporočili. Želite pogledati?' },
          { who: 'client', text: 'Da, objavi.' }
        ], previewAfter: 1, preview: { type: 'article', title: 'Zakaj je pomembno redno čistiti streho pred mahom', excerpt: 'Mah zadržuje vlago, pospešuje obrabo kritine in lahko vpliva na življenjsko dobo strehe.' }, status: 'Objava potrjena. To je predstavitev — stran se ni spremenila.' },
        { id: 'info', title: 'Posodobitev podatkov', chat: [
          { who: 'client', text: 'Spremeni delovni čas na strani. Zdaj delamo od 8:00 do 17:00.' },
          { who: 'ai', text: 'Pripravil sem posodobitev delovnega časa. Potrdite spremembo.' },
          { who: 'client', text: 'Potrjujem.' }
        ], previewAfter: 1, preview: { type: 'hours', title: 'Delovni čas', lines: ['Pon–pet: 8:00–17:00', 'Sobota–nedelja: zaprto'] }, status: 'Sprememba potrjena. To je predstavitev — stran se ni spremenila.' }
      ],
      note: 'To je primer delovanja AI-asistenta. Dejansko upravljanje strani je na voljo po nastavitvi povezave in potrditvi lastnika sprememb.',
      tariffs: [
        { id: 'ai-start', name: 'AI START', price: 'od 29 €/mesec', monthly: 29, features: [
          'Priprava besedil in opisov.',
          'Predlogi za spremembe obstoječe vsebine.',
          'Ena povezana stran.',
          'Predogled sprememb.',
          'Omejen obseg zahtev.',
          'Nastavitev povezave se obračuna posebej.'
        ] },
        { id: 'ai-business', name: 'AI BUSINESS', price: 'od 59 €/mesec', monthly: 59, features: [
          'Vse iz AI START.',
          'Priprava objav.',
          'Delo s fotografijami in opisi.',
          'Priprava novih kartic storitev.',
          'Dodatni scenariji upravljanja strani.',
          'Razširjen limit uporabe.'
        ] },
        { id: 'ai-control', name: 'AI CONTROL', price: 'od 99 €/mesec', monthly: 99, badge: 'Priporočamo', features: [
          'Spreminjanje obstoječih besedil in slik.',
          'Dodajanje kartic storitev.',
          'Posodabljanje cen.',
          'Priprava in objava člankov.',
          'Dodajanje dogovorjenih strani po obstoječih predlogah.',
          'Posodabljanje galerij in fotografij.',
          'Predogled sprememb in potrditev objave.',
          'Zgodovina sprememb.',
          'Osnovni tehnični nadzor podprtih funkcij.',
          'Do 20 standardnih operacij na mesec.'
        ] },
        { id: 'ai-research', name: 'AI RESEARCH PRO', price: 'od 159 €/mesec', monthly: 159, badge: 'Razširjeno', features: [
          'Vse iz AI CONTROL.',
          'AI-raziskava javnih podatkov o konkurentih.',
          'Analiza storitev in ponudb konkurentov.',
          'Priprava novih storitev na podlagi raziskave.',
          'Predlogi strukture storitev in strani.',
          'Priprava SEO-usmerjene vsebine.',
          'Priporočila za razvoj strani.',
          'Priprava tematskih člankov.',
          'Predhodna priporočila za pozicioniranje.',
          'Do 20 operacij upravljanja in do 3 raziskave na mesec.'
        ] }
      ],
      tariffNote: 'Cene in limity so predhodni. Ne obljubljamo neomejenih dejanj ali neomejenega števila člankov. Zahtevno ročno programiranje ni vključeno. Pred komercialnim zagonom se dokončno določijo stroški povezave, mesečni limity in dovoljeni stroški AI API.',
      tariffFootnote: 'Vse AI-pakete je mogoče vklopiti neodvisno od tehnične podpore, če je združljivost strani potrjena.',
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
      priceNote: 'Ne seštevamo vseh avtomatizacij v en paket s popustom. Končna cena se določi po oceni naloge.',
      prices: [
        { title: 'Preprosta avtomatizacija', price: 'od 50 €' },
        { title: 'Več povezanih dejanj', price: 'od 150 €' },
        { title: 'Individualna avtomatizacija', price: 'individualni izračun' }
      ],
      footnote: 'Cene so okvirne. Naročnine zunanjih storitev in stroški API se plačajo posebej, razen če je dogovorjeno drugače.',
      cta: 'Pogovorimo se o avtomatizaciji →'
    },
    form: {
      title: 'Povejte nam, kaj potrebujete. Predlagali bomo rešitev.',
      desc: 'Izberite storitve zgoraj ali opišite svojo nalogo. Pripravili bomo predlog za podporo, AI ali avtomatizacijo.',
      help: 'Preučili bomo vašo nalogo, preverili tehnično združljivost ter predlagali ustrezen način povezave, ceno in roke. Pošiljanje zahteve vas k ničemur ne obvezuje.',
      summaryTitle: 'Vaš izbor SOLO.POV',
      supportLabel: 'Tehnična podpora',
      aiLabel: 'AI-asistent',
      automationLabel: 'Avtomatizacija',
      monthlyLabel: 'Predhodni mesečni tarifi',
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
      errEmpty: 'Izberite storitev ali opišite nalogo.'
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
      title: 'Ваш сайт работает. Мы помогаем ему развиваться.',
      sub: [
        'Техническая поддержка, AI-ассистенты и автоматизация повседневных задач.',
        'Меньше рутины — больше времени для вашего бизнеса.'
      ],
      cards: [
        { id: 'support', n: '01', title: 'Техническая поддержка', desc: 'Хотите, чтобы ваш сайт оставался в рабочем состоянии, обновлялся и всегда было к кому обратиться?', cta: 'Посмотреть тарифы →' },
        { id: 'ai', n: '02', title: 'AI-ассистент', desc: 'Управляйте содержимым сайта через Telegram. Попросите AI подготовить текст, изменить информацию или создать новую публикацию.', cta: 'Как это работает →' },
        { id: 'automation', n: '03', title: 'Автоматизация бизнеса', desc: 'Автоматизируйте заявки, уведомления, онлайн-запись и другие повторяющиеся задачи.', cta: 'Посмотреть возможности →' }
      ]
    },
    support: {
      eyebrow: 'Техническая поддержка',
      title: 'Ваш сайт под присмотром',
      explainer: 'Техническая поддержка — это помощь в поддержании работоспособности вашего сайта. Мы проверяем доступность сайта и основных функций, помогаем при сбоях и решаем технические вопросы. Вам не обязательно подключать AI-ассистента.',
      tariffs: [
        { id: 'start', name: 'START', price: 'от 19 €/месяц', monthly: 19, desc: 'Для небольших статических сайтов.', features: [
          'Базовый контроль доступности сайта.',
          'Проверка основных функций раз в месяц.',
          'Консультации по электронной почте.',
          'Уведомление об обнаруженных проблемах.',
          'Рекомендации по необходимым обновлениям.'
        ] },
        { id: 'business', name: 'BUSINESS', price: 'от 49 €/месяц', monthly: 49, desc: 'Для сайтов, которые регулярно используются в бизнесе.', features: [
          'Всё из START.',
          'Регулярная проверка сайта.',
          'До 30 минут небольших изменений в месяц.',
          'Проверка работоспособности форм.',
          'Приоритетная обработка в рабочее время.'
        ] },
        { id: 'pro', name: 'PRO', price: 'от 99 €/месяц', monthly: 99, desc: 'Для активно развивающихся сайтов.', features: [
          'Всё из BUSINESS.',
          'Более частый технический контроль.',
          'До 90 минут небольших изменений в месяц.',
          'Контроль согласованных интеграций.',
          'Помощь с обновлением содержимого.',
          'Приоритетная техническая поддержка.'
        ] }
      ],
      details: [
        { title: 'Что входит в тариф?', body: [
          'START: контроль доступности, ежемесячная проверка функций, консультации по email, уведомления и рекомендации.',
          'BUSINESS: всё из START, регулярная проверка, до 30 минут небольших изменений, проверка форм и приоритет в рабочее время.',
          'PRO: всё из BUSINESS, более частый контроль, до 90 минут изменений, контроль интеграций, помощь с контентом и приоритетная поддержка.'
        ] },
        { title: 'Что считается небольшим изменением?', body: [
          'Замена текста, фотографии, контактной информации, исправление небольшого элемента или другое простое изменение в рамках существующей структуры сайта.',
          'Создание новых страниц, сложные интеграции и существенные изменения дизайна оцениваются отдельно.'
        ] },
        { title: 'Условия технического сопровождения', body: [
          'Тарифы ориентировочные и зависят от платформы, сложности сайта и подключённых сервисов.',
          'Неиспользованное время изменений не переносится на следующий месяц.',
          'Новые страницы, сложные функции, редизайн, рекламные кампании и крупные доработки не входят в ежемесячное обслуживание.',
          'Работы сверх лимита согласовываются отдельно.',
          'Сроки реакции и перечень проверок уточняются до подключения тарифа.',
          'Не обещаем круглосуточную поддержку или мгновенное устранение любых неисправностей.'
        ] }
      ],
      cta: 'Подключить поддержку →',
      hint: 'Сначала выберите тариф выше.'
    },
    ai: {
      eyebrow: 'AI-ассистент',
      title: 'Ваш сайт. Ваш Telegram. Ваш AI-помощник.',
      sub: 'Управляйте своим сайтом обычными сообщениями. Добавляйте услуги, меняйте цены, публикуйте статьи и обновляйте информацию без сложных панелей управления.',
      offer: {
        accent: 'Попробуйте AI-помощника бесплатно — оплачивайте, если вам подходит.',
        cta: 'Попробовать AI-помощника →',
        note: 'Демонстрация бесплатно. Возможность тестирования на вашем сайте обсуждается индивидуально.'
      },
      scenarios: {
        label: 'Примеры работы AI-ассистента',
        title: 'Как это выглядит на практике',
        note: 'Реальные задачи и демонстрация возможностей.',
        disclaimer: 'Показанные диалоги реконструированы для демонстрации. Это не дословные скриншоты, а результат зависит от согласованного объёма работ.',
        items: [
          {
            id: 'service', tab: 'Добавление услуги', bot: 'Zeleni pomočnik', project: 'Zeleni pomočnik', kind: 'site',
            messages: [
              { who: 'client', text: 'Привет! Добавь на сайт новую услугу: чистка и промывка водостоков и водосточных систем. Проверь, как это подают конкуренты, и подготовь полезную статью.' },
              { who: 'ai', text: 'Проверил открытые предложения местных конкурентов. Большинство делает акцент на профилактическом обслуживании, цены ориентировочно 3–7 €/м.' },
              { who: 'ai', text: 'Подготовил новый блок услуги: описание, ключевые преимущества, кнопку заявки и иконки.' },
              { who: 'ai', text: 'Также подготовил статью «Почему важна регулярная чистка водостоков?» с советами по уходу.' },
              { who: 'client', text: 'Отлично. Покажи, как это будет выглядеть на сайте.' },
              { who: 'ai', text: 'Вот предпросмотр. Изменения готовы к проверке — опубликуем после вашего подтверждения.' }
            ],
            result: {
              label: 'Предпросмотр на сайте', url: 'zelenipomocnik.si', kicker: 'Новая услуга',
              title: 'Чистка и промывка водостоков и водосточных систем',
              desc: 'Профессионально убираем листья, загрязнения и засоры, обеспечиваем свободный отток дождевой воды.',
              meta: 'от 3–7 €/м', button: 'Оставить заявку'
            }
          },
          {
            id: 'research', tab: 'Исследование конкурентов', bot: 'Zeleni pomočnik', project: 'Zeleni pomočnik', kind: 'research',
            messages: [
              { who: 'client', text: 'Проверь, что предлагают конкуренты по чистке крыш и фасадов и какие цены публикуют.' },
              { who: 'ai', text: 'Изучил открытые предложения. Преобладают пакеты регулярного обслуживания; цены ориентировочно 3–7 €/м² в зависимости от доступа и степени загрязнения.' },
              { who: 'ai', text: 'Большинство подчёркивает профилактику повреждений фасада и крыши, а также возможность ежегодного осмотра.' },
              { who: 'ai', text: 'Рекомендую на сайте явно указать объём, цену за м² и пример расчёта. Это снимет часть вопросов до заявки.' },
              { who: 'client', text: 'Хорошо. Подготовь сводку, используем её в новой услуге.' }
            ],
            result: {
              label: 'Сводка исследования', url: 'открытые данные',
              title: 'Что предлагают конкуренты',
              rows: [
                { k: 'Услуги', v: 'чистка крыш, фасадов и водостоков' },
                { k: 'Цены', v: 'ориентировочно 3–7 €/м²' },
                { k: 'Акцент', v: 'профилактика и регулярный уход' },
                { k: 'Возможность', v: 'понятный объём и пример расчёта' }
              ],
              note: 'Информационный обзор открытых данных. Не гарантия рыночных цен.'
            }
          },
          {
            id: 'booking', tab: 'Управление записью', bot: 'Solopova Makeup', project: 'SOLO.POV Makeup', kind: 'booking',
            messages: [
              { who: 'client', text: 'Привет! Хочу, чтобы онлайн-запись была связана с моим календарём и свободные слоты показывались автоматически, без двойных записей. Как это настроить?' },
              { who: 'ai', text: 'Это можно настроить. Онлайн-запись связывается с Google Календарём, а свободные слоты показываются с учётом занятости.' },
              { who: 'ai', text: 'Система учитывает длительность каждой услуги и блокирует нужные интервалы. После записи клиент получает подтверждение.' },
              { who: 'ai', text: 'Подключаем: запись, календарь, длительность услуг и подтверждение. Настройка выполняется после вашего подтверждения.' },
              { who: 'client', text: 'Отлично, подготовь предпросмотр.' },
              { who: 'ai', text: 'Вот пример того, как услуги и слоты будут показаны на сайте.' }
            ],
            result: {
              label: 'Предпросмотр записи', url: 'solopovamakeup.si',
              title: 'Онлайн-запись и услуги',
              services: [
                { name: 'Вечерний макияж', dur: '60 мин' },
                { name: 'Свадебный макияж', dur: '90 мин' },
                { name: 'Макияж для фотосессии', dur: '75 мин' }
              ],
              note: 'Пример отображения услуг и длительности. Подключение календаря настраивается отдельно.'
            }
          }
        ]
      },
      trial: {
        eyebrow: 'Бесплатное тестирование',
        title: 'Попробуйте сами. Убедитесь, насколько это удобно.',
        desc: 'Познакомьтесь с AI-ассистентом в бесплатной демонстрации. Для заинтересованных клиентов можем согласовать индивидуальное тестирование на их собственном сайте.',
        steps: [
          { t: 'Подключаем', d: 'Проверяем совместимость сайта и готовим подключение AI-помощника.' },
          { t: 'Вы пробуете', d: 'Добавляете услугу, меняете текст или выполняете другую согласованную задачу.' },
          { t: 'Вы решаете', d: 'Продолжаете только если тест подошёл. Без автоматического продления.' }
        ],
        note: 'Предварительная концепция индивидуального теста — 4 часа после согласованной активации, с ограничениями использования. Тест на реальном сайте зависит от технической совместимости и согласованных условий. Изменения на действующем сайте выполняем только с разрешениями и после подтверждения клиента.',
        cta: 'Обсудить пробное подключение →',
        interest: 'Пробное подключение AI-ассистента',
        interestLabel: 'Интерес'
      },
      tariffsEyebrow: 'Тарифы',
      tariffsTitle: 'Тарифы AI-ассистента для Telegram',
      phones: [
        { id: 'service', title: 'Новая услуга', chat: [
          { who: 'client', text: 'Добавь на сайт новую услугу — чистка фасадов. Цена от 5 € за м².' },
          { who: 'ai', text: 'Подготовил описание услуги и новую карточку. Посмотрите предварительную версию.' },
          { who: 'ai', text: 'Опубликовать изменения?' },
          { who: 'client', text: 'Да, публикуй.' }
        ], previewAfter: 1, preview: { type: 'service', title: 'Чистка фасадов', desc: 'Профессиональная очистка фасадов от загрязнений и высолов.', price: 'От 5 €/м²', button: 'Заказать' }, status: 'Публикация подтверждена. Это демонстрация — сайт не изменялся.' },
        { id: 'article', title: 'Подготовка статьи', chat: [
          { who: 'client', text: 'Подготовь статью о том, почему важно регулярно очищать крышу от мха.' },
          { who: 'ai', text: 'Подготовил статью с заголовком, разделами и рекомендациями. Хотите посмотреть?' },
          { who: 'client', text: 'Да, публикуй.' }
        ], previewAfter: 1, preview: { type: 'article', title: 'Почему важно регулярно очищать крышу от мха', excerpt: 'Мох задерживает влагу, ускоряет износ кровли и может влиять на срок службы крыши.' }, status: 'Публикация подтверждена. Это демонстрация — сайт не изменялся.' },
        { id: 'info', title: 'Обновление информации', chat: [
          { who: 'client', text: 'Измени часы работы на сайте. Теперь работаем с 8:00 до 17:00.' },
          { who: 'ai', text: 'Подготовил обновление часов работы. Подтвердите изменение.' },
          { who: 'client', text: 'Подтверждаю.' }
        ], previewAfter: 1, preview: { type: 'hours', title: 'Часы работы', lines: ['Пн–Пт: 8:00–17:00', 'Сб–Вс: закрыто'] }, status: 'Изменение подтверждено. Это демонстрация — сайт не изменялся.' }
      ],
      note: 'Это пример работы AI-ассистента. Реальное управление сайтом доступно после настройки подключения и подтверждения владельцем изменений.',
      tariffs: [
        { id: 'ai-start', name: 'AI START', price: 'от 29 €/месяц', monthly: 29, features: [
          'Подготовка текстов и описаний.',
          'Предложения по изменению существующего содержимого.',
          'Один подключённый сайт.',
          'Предпросмотр изменений.',
          'Ограниченный объём запросов.',
          'Стоимость настройки подключения отдельно.'
        ] },
        { id: 'ai-business', name: 'AI BUSINESS', price: 'от 59 €/месяц', monthly: 59, features: [
          'Всё из AI START.',
          'Подготовка публикаций.',
          'Работа с фотографиями и описаниями.',
          'Подготовка новых карточек услуг.',
          'Дополнительные сценарии управления сайтом.',
          'Расширенный лимит использования.'
        ] },
        { id: 'ai-control', name: 'AI CONTROL', price: 'от 99 €/месяц', monthly: 99, badge: 'Рекомендуем', features: [
          'Изменение существующих текстов и изображений.',
          'Добавление карточек услуг.',
          'Обновление цен.',
          'Подготовка и публикация статей.',
          'Добавление согласованных страниц по существующим шаблонам.',
          'Обновление галерей и фотографий.',
          'Предпросмотр изменений и подтверждение публикации.',
          'История изменений.',
          'Базовый технический контроль поддерживаемых функций.',
          'До 20 стандартных операций в месяц.'
        ] },
        { id: 'ai-research', name: 'AI RESEARCH PRO', price: 'от 159 €/месяц', monthly: 159, badge: 'Расширенный', features: [
          'Всё из AI CONTROL.',
          'AI-исследование открытых данных о конкурентах.',
          'Анализ услуг и предложений конкурентов.',
          'Подготовка новых услуг с учётом исследования.',
          'Предложения по структуре услуг и страниц.',
          'Подготовка SEO-ориентированного содержимого.',
          'Рекомендации по развитию сайта.',
          'Подготовка тематических статей.',
          'Предварительные рекомендации по позиционированию.',
          'До 20 операций управления и до 3 исследований в месяц.'
        ] }
      ],
      tariffNote: 'Цены и лимиты предварительные. Мы не обещаем безлимитные действия или неограниченное количество статей. Сложная ручная разработка в стоимость не входит. До коммерческого запуска окончательно определяются стоимость подключения, месячные лимиты и допустимые расходы на AI API.',
      tariffFootnote: 'Все AI-тарифы можно подключить независимо от технической поддержки, если совместимость сайта подтверждена.',
      cta: 'Подобрать AI-ассистента →'
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
      priceNote: 'Не суммируем все автоматизации в единый пакет со скидкой. Итоговая стоимость определяется после оценки задачи.',
      prices: [
        { title: 'Простая автоматизация', price: 'от 50 €' },
        { title: 'Несколько связанных действий', price: 'от 150 €' },
        { title: 'Индивидуальная автоматизация', price: 'индивидуальный расчёт' }
      ],
      footnote: 'Цены ориентировочные. Подписки сторонних сервисов и расходы на API оплачиваются отдельно, если не согласовано иное.',
      cta: 'Обсудить автоматизацию →'
    },
    form: {
      title: 'Расскажите о своей задаче. Мы предложим решение.',
      desc: 'Выберите услуги выше или опишите задачу. Подготовим предложение по поддержке, AI или автоматизации.',
      help: 'Мы изучим вашу задачу, проверим техническую совместимость и предложим подходящий вариант подключения, стоимость и сроки. Отправка заявки ни к чему вас не обязывает.',
      summaryTitle: 'Ваш выбор SOLO.POV',
      supportLabel: 'Техническая поддержка',
      aiLabel: 'AI-ассистент',
      automationLabel: 'Автоматизация',
      monthlyLabel: 'Предварительные ежемесячные тарифы',
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
      errEmpty: 'Выберите услугу или опишите задачу.'
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
