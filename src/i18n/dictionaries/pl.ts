import type { Dictionary } from './en';

/**
 * Polish dictionary. Typed against the English one so a missing or renamed
 * key fails the build instead of silently falling back.
 */
export const pl: Dictionary = {
  meta: {
    siteTitle: 'BodyKit Shop — dokładki, spoilery i tuning karoserii',
    siteDescription:
      'Dokładki, splittery, spoilery i elementy karbonowe dopasowane do konkretnych modeli aut. Sprawdzone materiały, komplet montażowy i instrukcje po polsku.',
    keywords: [
      'dokładki',
      'splitter przedni',
      'spoiler tylny',
      'dyfuzor tylny',
      'nakładki progowe',
      'elementy karbonowe',
      'tuning karoserii',
      'felgi aluminiowe',
    ],
  },

  nav: {
    catalog: 'Katalog',
    about: 'O nas',
    business: 'Dla firm',
    help: 'Pomoc',
    contact: 'Kontakt',
    search: 'Szukaj produktów',
    account: 'Panel klienta',
    cart: 'Koszyk',
    cartEmpty: 'Koszyk, pusty',
    cartCount: (count: number) => `Koszyk, produktów: ${count}`,
    openMenu: 'Otwórz menu',
    closeMenu: 'Zamknij menu',
    home: 'BodyKit Shop — strona główna',
    mobileNav: 'Nawigacja mobilna',
    mainNav: 'Nawigacja główna',
    categoriesLabel: 'Kategorie',
    skipToContent: 'Przejdź do treści',
    breadcrumb: 'Ścieżka nawigacyjna',
    homeLabel: 'Strona główna',
  },

  topBar: {
    shipping: 'Darmowa dostawa od 500 zł · Wysyłka w 24 h',
    hours: 'pn–pt 8:00–17:00',
  },

  theme: {
    toLight: 'Włącz motyw jasny',
    toDark: 'Włącz motyw ciemny',
  },

  language: {
    label: 'Język',
    switchTo: (name: string) => `Zmień język na ${name}`,
  },

  home: {
    badge: 'Nowa kolekcja 2026',
    headlineTop: 'Dokładki, które',
    headlineAccent: 'pasują za pierwszym razem',
    lead: 'Splittery, spoilery i dyfuzory projektowane pod konkretne roczniki i wersje nadwozia. Do każdego elementu dostajesz komplet montażowy i instrukcję po polsku — bez dopasowywania na miejscu.',
    ctaPrimary: 'Przeglądaj katalog',
    ctaSecondary: 'Jak dobrać część?',
    stats: [
      { value: '2 400+', label: 'zrealizowanych zamówień' },
      { value: '38', label: 'obsługiwanych modeli aut' },
      { value: '24 h', label: 'wysyłka z magazynu' },
    ],
    categoriesEyebrow: 'Katalog',
    categoriesHeading: 'Wybierz kategorię',
    categoriesLink: 'Wszystkie kategorie',
    featuredEyebrow: 'Najczęściej wybierane',
    featuredHeading: 'Polecane produkty',
    featuredLink: 'Zobacz wszystkie',
    processEyebrow: 'Jak to działa',
    processHeading: 'Trzy kroki do nowej sylwetki auta',
    processLead:
      'Najczęstszy problem z dokładkami to montaż: element nie przylega, trzeba szpachlować albo dowiercać otwory. Dlatego każdy produkt opisujemy przez konkretne roczniki, a nie „uniwersalne dopasowanie”.',
    processSteps: [
      {
        number: '01',
        title: 'Podaj model i rocznik',
        text: 'Filtr dopasowania pokazuje wyłącznie części pasujące do Twojej wersji nadwozia — bez zgadywania.',
      },
      {
        number: '02',
        title: 'Wybierz materiał',
        text: 'ABS pod lakier, lekkie FRP albo pełny karbon. Przy każdym wariancie podajemy wagę i sposób montażu.',
      },
      {
        number: '03',
        title: 'Zamontuj według instrukcji',
        text: 'W zestawie znajdziesz komplet mocowań, taśmę przyciętą na wymiar i instrukcję krok po kroku.',
      },
    ],
    processCta: 'Sprawdź poradnik montażu',
    ctaBannerHeading: 'Nie wiesz, co pasuje do Twojego auta?',
    ctaBannerText:
      'Napisz markę, model i rocznik — odpiszemy z listą pasujących elementów i podpowiemy, co ma sens montować razem.',
    ctaBannerButton: 'Zapytaj o dopasowanie',
    processImageAlt:
      'Samochód sportowy w hali warsztatowej przygotowany do montażu elementów karoserii',
  },

  product: {
    available: 'Dostępny',
    unavailable: 'Chwilowo niedostępny',
    outOfStockShort: 'Niedostępny',
    listPrice: 'Cena katalogowa:',
    materialAndFinish: 'Materiał i wykończenie',
    quantity: 'Ilość',
    decrease: 'Zmniejsz ilość',
    increase: 'Zwiększ ilość',
    total: 'Razem',
    addToCart: 'Dodaj do koszyka',
    goToCart: 'Przejdź do koszyka',
    addedToCart: (name: string, qty: number) => `Dodano do koszyka: ${name} (${qty} szt.)`,
    specs: 'Dane techniczne',
    fitment: 'Pasuje do',
    years: 'Roczniki:',
    included: 'W zestawie',
    availableMaterials: 'Dostępne materiały:',
    notListed: 'Nie widzisz swojego modelu?',
    notListedLink: 'Napisz do nas',
    notListedSuffix: '— sprawdzimy dopasowanie.',
    related: 'Z tej samej kategorii',
    gallery: 'Miniatury zdjęć produktu',
    galleryAlt: (name: string, index: number, total: number) =>
      `${name} — zdjęcie ${index} z ${total}`,
    showImage: (index: number) => `Pokaż zdjęcie ${index}`,
    imageAlt: (name: string) => `${name} — zdjęcie produktu`,
    view: 'Zobacz',
    from: 'od',
    rating: 'Ocena:',
    reviews: (count: number) => {
      const lastTwo = count % 100;
      const last = count % 10;
      if (count === 1) return '1 opinia';
      if (lastTwo >= 12 && lastTwo <= 14) return `${count} opinii`;
      if (last >= 2 && last <= 4) return `${count} opinie`;
      return `${count} opinii`;
    },
    warranty: '24 miesiące gwarancji',
    instructions: 'Instrukcja montażu PL',
  },

  shipping: {
    fast: 'Wysyłka w 24–48 h',
    days: (days: number) => `Wysyłka w ${days} dni roboczych`,
    leadTime: (days: number) => `Realizacja ${days} dni roboczych`,
  },

  catalog: {
    title: 'Katalog',
    description:
      'Osiem kategorii części do modyfikacji nadwozia i podwozia. Każdy produkt ma podaną listę pasujących modeli i roczników.',
    productCount: (count: number) => {
      const lastTwo = count % 100;
      const last = count % 10;
      if (count === 1) return '1 produkt';
      if (lastTwo >= 12 && lastTwo <= 14) return `${count} produktów`;
      if (last >= 2 && last <= 4) return `${count} produkty`;
      return `${count} produktów`;
    },
    goToCategory: 'Przejdź do kategorii',
    seeProducts: 'Zobacz produkty',
    filters: 'Filtry',
    material: 'Materiał',
    carMake: 'Marka auta',
    availability: 'Dostępność',
    inStockOnly: 'Tylko dostępne od ręki',
    clearFilters: 'Wyczyść filtry',
    sortBy: 'Sortuj:',
    sortOptions: {
      featured: 'Polecane',
      priceAsc: 'Cena: od najniższej',
      priceDesc: 'Cena: od najwyższej',
      rating: 'Najwyżej oceniane',
      name: 'Nazwa A–Z',
    },
    noResults: 'Żaden produkt nie pasuje do wybranych filtrów',
    noResultsHint: 'Spróbuj usunąć część kryteriów albo zajrzyj do innej kategorii.',
  },

  search: {
    title: 'Wyszukiwarka',
    description: 'Szukaj po nazwie części, materiale albo marce i modelu auta.',
    placeholder: 'Wpisz nazwę części, markę lub model auta…',
    examples: 'Przykłady:',
    exampleTerms: ['splitter BMW', 'karbon', 'GR86', 'dyfuzor'],
    label: 'Szukaj produktów',
    results: (count: number, query: string) => {
      const lastTwo = count % 100;
      const last = count % 10;
      let noun = 'wyników';
      if (count === 1) noun = 'wynik';
      else if (lastTwo < 12 || lastTwo > 14) {
        if (last >= 2 && last <= 4) noun = 'wyniki';
      }
      return `${count} ${noun} dla „${query}”`;
    },
    noResults: (query: string) => `Brak wyników dla „${query}”`,
    noResultsHint: 'Spróbuj ogólniejszej frazy albo przejrzyj katalog według kategorii.',
    clear: 'Wyczyść wyszukiwanie',
    browseByCategory: 'Przeglądaj według kategorii',
  },

  cart: {
    title: 'Koszyk',
    metaDescription: 'Zawartość koszyka w BodyKit Shop.',
    loading: 'Wczytywanie koszyka',
    empty: 'Twój koszyk jest pusty',
    emptyHint:
      'Wybierz części z katalogu — przy każdej znajdziesz listę pasujących modeli i roczników.',
    browse: 'Przeglądaj katalog',
    itemsHeading: 'Produkty w koszyku',
    remove: (name: string) => `Usuń z koszyka: ${name}`,
    decrease: (name: string) => `Zmniejsz ilość: ${name}`,
    increase: (name: string) => `Zwiększ ilość: ${name}`,
    quantityLabel: (qty: number) => `Ilość: ${qty}`,
    perUnit: '/ szt.',
    continueShopping: 'Kontynuuj zakupy',
    clearCart: 'Wyczyść koszyk',
    summary: 'Podsumowanie',
    products: (count: number) => `Produkty (${count} szt.)`,
    delivery: 'Dostawa',
    free: 'Gratis',
    grandTotal: 'Razem',
    freeShippingGap: (amount: string) => `Do darmowej dostawy brakuje ${amount}.`,
    checkout: 'Przejdź do zamówienia',
    demoNote:
      'To sklep demonstracyjny — zamówienia nie są realizowane, a płatności nie są pobierane.',
  },

  checkout: {
    title: 'Zamówienie',
    description: 'Wypełnij dane do wysyłki. Pola oznaczone gwiazdką są wymagane.',
    emptyCart: 'Koszyk jest pusty',
    emptyCartHint: 'Dodaj produkty do koszyka, żeby złożyć zamówienie.',
    errorSummary: (count: number) => {
      const lastTwo = count % 100;
      const last = count % 10;
      let noun = 'błędów';
      if (count === 1) noun = 'błąd';
      else if (lastTwo < 12 || lastTwo > 14) {
        if (last >= 2 && last <= 4) noun = 'błędy';
      }
      return `Formularz zawiera ${count} ${noun} do poprawienia:`;
    },
    step1: '1. Dane kontaktowe',
    step2: '2. Adres dostawy',
    step3: '3. Sposób dostawy',
    step4: '4. Podsumowanie',
    firstName: 'Imię',
    lastName: 'Nazwisko',
    email: 'E-mail',
    phone: 'Telefon',
    phoneHint: 'Kurier zadzwoni przed dostawą',
    street: 'Ulica i numer',
    postalCode: 'Kod pocztowy',
    city: 'Miejscowość',
    wantInvoice: 'Chcę fakturę VAT na firmę',
    company: 'Nazwa firmy',
    taxId: 'NIP',
    acceptTerms: 'Akceptuję',
    termsLink: 'regulamin',
    andPrivacy: 'i politykę prywatności',
    submit: 'Złóż zamówienie',
    yourOrder: 'Twoje zamówienie',
    demoNote:
      'Sklep demonstracyjny — zamówienie nie zostanie zrealizowane, a dane nie są nigdzie wysyłane.',
    deliveryOptions: {
      courier: { label: 'Kurier', time: '1–2 dni robocze' },
      locker: { label: 'Paczkomat', time: '1–2 dni robocze' },
      pickup: { label: 'Odbiór osobisty (Rzeszów)', time: 'Po potwierdzeniu' },
    },
    validation: {
      required: 'To pole jest wymagane',
      email: 'Podaj poprawny adres e-mail, np. jan@example.pl',
      phone: 'Podaj 9-cyfrowy numer telefonu',
      postalCode: 'Kod pocztowy w formacie 00-000',
      taxId: 'NIP powinien mieć 10 cyfr',
      terms: 'Musisz zaakceptować regulamin, żeby złożyć zamówienie',
    },
  },

  thankYou: {
    title: 'Dziękujemy za zamówienie',
    lead: 'Zamówienie zostało przyjęte. Poniżej znajdziesz numer referencyjny — przyda się, gdybyś chciał dopytać o status.',
    orderNumber: 'Numer zamówienia',
    demoNote:
      'Zamówienie nie zostało nigdzie wysłane, żadne dane nie zostały zapisane i nie pobrano żadnej płatności.',
    demoNoteStrong: 'To sklep demonstracyjny.',
    steps: [
      {
        title: 'Potwierdzenie na e-mail',
        text: 'W ciągu kilku minut wyślemy podsumowanie zamówienia wraz z fakturą proforma.',
      },
      {
        title: 'Kompletacja i wysyłka',
        text: 'Produkty z magazynu pakujemy tego samego dnia roboczego. Numer przesyłki dostaniesz SMS-em.',
      },
      {
        title: 'Wsparcie przy montażu',
        text: 'Instrukcja jest w zestawie, a w razie pytań nasz dział techniczny odbiera telefon do 17:00.',
      },
    ],
    step: 'Krok',
    backToCatalog: 'Wróć do katalogu',
    accountPanel: 'Panel klienta',
  },

  notFound: {
    title: 'Ta strona wypadła z zakrętu',
    lead: 'Nie znaleźliśmy strony, której szukasz. Mogła zostać przeniesiona albo adres zawiera literówkę.',
    home: 'Strona główna',
    search: 'Szukaj produktu',
    popular: 'Popularne kategorie',
  },

  about: {
    title: 'O BodyKit Shop',
    description:
      'Zaczęliśmy od własnych aut i frustracji, że zamówiona dokładka nie przylegała do zderzaka. Dziś prowadzimy sklep, w którym dopasowanie jest opisane, a nie obiecane.',
    imageAlt: 'Samochody z poszerzeniami nadwozia w hali warsztatowej',
    storyHeading: 'Jak to się zaczęło',
    story: [
      'W 2019 roku zamówiliśmy splitter do prywatnego auta. Opis mówił „pasuje do serii 3”. Po rozpakowaniu okazało się, że element zaprojektowano pod inny wariant zderzaka — różnica wynosiła kilkanaście milimetrów, ale wystarczyła, żeby dokładka nie przylegała na całej długości.',
      'Warsztat wycenił dopasowanie na więcej niż kosztowała sama część. Wtedy zrozumieliśmy, na czym polega problem tej branży: sprzedaje się kształt, a nie dopasowanie. Opisy są ogólne, bo ogólny opis pasuje do większej liczby wyszukiwań.',
      'BodyKit Shop zbudowaliśmy odwrotnie. Każdy produkt ma listę konkretnych modeli i przedziałów rocznikowych. Jeśli części nie testowaliśmy na danym aucie, nie ma go na liście — nawet jeśli teoretycznie mogłaby pasować.',
    ],
    valuesHeading: 'Czym się kierujemy',
    values: [
      {
        title: 'Dopasowanie zamiast „uniwersalności”',
        text: 'Każdy produkt ma listę modeli i roczników. Jeśli czegoś nie ma na liście, mówimy o tym wprost, zamiast pisać „pasuje do większości aut”.',
      },
      {
        title: 'Opis, który mówi prawdę o montażu',
        text: 'Podajemy, czy trzeba wiercić, ile trwa montaż i co jest w zestawie. Wiercenie w belce zderzaka to nie to samo co taśma 3M — i klient powinien wiedzieć o tym przed zakupem.',
      },
      {
        title: 'Materiał dobrany do zastosowania',
        text: 'ABS na co dzień, FRP na tor, karbon gdy liczy się masa i wygląd. Nie sprzedajemy karbonu tam, gdzie nie ma z niego korzyści.',
      },
    ],
    milestonesHeading: 'Kamienie milowe',
    milestones: [
      { year: '2019', text: 'Pierwsze zamówienia realizowane z garażu w Rzeszowie.' },
      { year: '2021', text: 'Własny magazyn i stała współpraca z trzema producentami z UE.' },
      { year: '2023', text: 'Uruchomienie działu technicznego i instrukcji montażu po polsku.' },
      { year: '2026', text: 'Ponad 2 400 zrealizowanych zamówień i 38 obsługiwanych modeli.' },
    ],
    asideText:
      'Masz auto, którego nie ma na naszych listach dopasowania? Napisz — sprawdzimy u producenta i odpiszemy nawet, jeśli okaże się, że nic nie pasuje.',
    asideCta: 'Napisz do nas',
  },

  help: {
    title: 'Centrum pomocy',
    description:
      'Najczęstsze pytania o dobór części, materiały, montaż i zwroty. Jeśli nie znajdziesz odpowiedzi — napisz albo zadzwoń.',
    onThisPage: 'Na tej stronie',
    noQuestion: 'Nie ma Twojego pytania?',
    noQuestionText: 'Dział techniczny odbiera telefon do 17:00.',
    contact: 'Kontakt',
    usefulLinks: 'Przydatne linki',
    links: {
      terms: 'Regulamin, zwroty i reklamacje',
      business: 'Współpraca dla warsztatów',
      packages: 'Gotowe pakiety montażowe',
      contactForm: 'Formularz kontaktowy',
    },
  },

  contact: {
    title: 'Kontakt',
    description:
      'Napisz, z czym masz problem — im więcej szczegółów o aucie, tym konkretniej odpowiemy.',
    formHeading: 'Formularz kontaktowy',
    directContact: 'Kontakt bezpośredni',
    openingHours: 'Godziny pracy',
    hoursValue: 'Poniedziałek – piątek, 8:00 – 17:00',
    hoursNote: 'W weekendy odpisujemy na e-maile w pierwszy dzień roboczy.',
    address: 'Adres',
    departmentsHeading: 'Piszesz w konkretnej sprawie?',
    name: 'Imię i nazwisko',
    email: 'E-mail',
    topic: 'Temat',
    topicPlaceholder: 'Wybierz temat…',
    car: 'Auto (marka, model, rocznik)',
    carHint: 'Np. BMW Seria 3 G20, 2021, M-Pakiet — pomoże nam odpowiedzieć precyzyjnie',
    message: 'Wiadomość',
    privacy: 'Zgadzam się na przetwarzanie moich danych w celu udzielenia odpowiedzi',
    submit: 'Wyślij wiadomość',
    fixFields: (count: number) => {
      const lastTwo = count % 100;
      const last = count % 10;
      let noun = 'pól';
      if (count === 1) noun = 'pole';
      else if (lastTwo < 12 || lastTwo > 14) {
        if (last >= 2 && last <= 4) noun = 'pola';
      }
      return `Popraw ${count} ${noun}:`;
    },
    sentHeading: 'Formularz wypełniony poprawnie',
    sentText:
      'To jest sklep demonstracyjny, więc wiadomość nie została nigdzie wysłana ani zapisana. W działającym sklepie w tym miejscu pojawiłoby się potwierdzenie z numerem zgłoszenia.',
    sentContactPrefix: 'Jeśli chcesz się z nami skontaktować naprawdę, napisz na',
    fillAgain: 'Wypełnij ponownie',
    validation: {
      required: 'To pole jest wymagane',
      email: 'Podaj poprawny adres e-mail',
      message: (length: number) => `Opisz sprawę nieco szerzej (min. 20 znaków, masz ${length})`,
      privacy: 'Zgoda na przetwarzanie danych jest wymagana',
    },
    topics: [
      'Dobór części do mojego auta',
      'Pytanie o dostępność i termin',
      'Montaż i instrukcja',
      'Reklamacja lub zwrot',
      'Współpraca B2B',
      'Inne',
    ],
    departments: [
      {
        title: 'Dział techniczny',
        text: 'Dobór części, dopasowanie do modelu, pytania o montaż.',
        email: 'tech@bodykitshop.pl',
      },
      {
        title: 'Zamówienia i wysyłka',
        text: 'Status zamówienia, zmiana adresu, terminy realizacji.',
        email: 'orders@bodykitshop.pl',
      },
      {
        title: 'Reklamacje i zwroty',
        text: 'Zgłoszenia gwarancyjne i odstąpienie od umowy.',
        email: 'returns@bodykitshop.pl',
      },
    ],
  },

  business: {
    title: 'Współpraca B2B',
    description:
      'Program partnerski dla warsztatów, studiów detailingu i firm zajmujących się modyfikacją nadwozia.',
    imageAlt: 'Samochody przygotowane do modyfikacji w profesjonalnym warsztacie',
    tiersHeading: 'Progi rabatowe',
    tiersLead:
      'Rabat naliczamy na podstawie obrotu z poprzedniego kwartału. Nie ma opłat wstępnych ani zobowiązania do minimalnych zamówień.',
    mostPopular: 'Najczęściej wybierany',
    discountLabel: 'rabatu',
    benefitsHeading: 'Co jeszcze dostajesz',
    applyHeading: 'Jak dołączyć',
    applySteps: [
      'Napisz do nas z formularza kontaktowego, podając NIP i profil działalności.',
      'Odsyłamy formularz rejestracyjny i cennik partnerski w ciągu jednego dnia roboczego.',
      'Po weryfikacji dostajesz dostęp do panelu z cenami netto i historią zamówień.',
    ],
    applyCta: 'Złóż wniosek o współpracę',
    tiers: [
      {
        name: 'Partner',
        threshold: 'od 5 000 zł / kwartał',
        discount: '8%',
        perks: [
          'Rabat 8% na cały asortyment',
          'Priorytetowa wysyłka',
          'Wsparcie techniczne e-mail',
        ],
      },
      {
        name: 'Partner Plus',
        threshold: 'od 15 000 zł / kwartał',
        discount: '14%',
        perks: [
          'Rabat 14% na cały asortyment',
          'Odroczony termin płatności 14 dni',
          'Dedykowany opiekun handlowy',
          'Materiały ekspozycyjne do warsztatu',
        ],
      },
      {
        name: 'Dystrybutor',
        threshold: 'indywidualnie',
        discount: 'do 25%',
        perks: [
          'Warunki ustalane indywidualnie',
          'Odroczony termin płatności 30 dni',
          'Dostęp do produktów przed premierą',
          'Wsparcie przy zamówieniach specjalnych',
        ],
      },
    ],
    benefits: [
      {
        title: 'Wysyłka bezpośrednio do klienta',
        text: 'Możemy wysłać zamówienie pod adres Twojego klienta, w neutralnym opakowaniu i z Twoimi dokumentami.',
      },
      {
        title: 'Wsparcie przy nietypowym montażu',
        text: 'Jeśli trafisz na auto po wcześniejszych modyfikacjach, nasz dział techniczny pomoże dobrać rozwiązanie.',
      },
      {
        title: 'Uproszczona ścieżka reklamacji',
        text: 'Zgłoszenia od partnerów rozpatrujemy w 3 dni robocze, bez konieczności odsyłania towaru przed decyzją.',
      },
    ],
  },

  account: {
    title: 'Panel klienta',
    description: 'Podgląd zamówień, zapisane auta i dane do wysyłki.',
    demoNoticeStrong: 'Widok demonstracyjny.',
    demoNotice:
      'Panel pokazuje przykładowe dane — w tym projekcie nie ma logowania ani zapisu po stronie serwera.',
    orderHistory: 'Historia zamówień',
    deliveryDetails: 'Dane do wysyłki',
    changeDetails: 'Zmień dane',
    savedCars: 'Zapisane auta',
    orderedParts: 'Zamówione części:',
    savedCarsNote: 'Zapisane auto pozwala filtrować katalog tylko do pasujących części.',
    goToCatalog: 'Przejdź do katalogu',
    statuses: {
      inTransit: 'W drodze',
      delivered: 'Dostarczone',
    },
  },

  packages: {
    title: 'Pakiety montażowe',
    description:
      'Zestawy złożone z elementów, które projektowano razem — ten sam kąt załamania krawędzi i spójna grubość materiału na całej długości nadwozia.',
    save: (amount: string) => `Oszczędzasz ${amount}`,
    fits: 'Pasuje do',
    fitting: 'Montaż',
    ask: 'Zapytaj o pakiet',
    footer:
      'Chcesz zestaw pod inny model? Napisz, jakim autem jeździsz i jaki efekt chcesz osiągnąć — złożymy propozycję z dostępnych elementów.',
    items: [
      {
        name: 'Street Line — komplet',
        tagline: 'Spójna linia boczna bez ingerencji w nadwozie',
        fits: 'Volkswagen Golf VII/VIII, Audi A3 8V/8Y',
        note: 'Montaż bez wiercenia, ok. 2 godziny w warsztacie.',
        contents: [
          'Splitter przedni Street GT',
          'Nakładki progowe Street Line (para)',
          'Dyfuzor tylny Race Fin',
          'Komplet mocowań i taśmy 3M',
        ],
      },
      {
        name: 'Carbon Touch',
        tagline: 'Detale z karbonu, które widać z bliska',
        fits: 'BMW Seria 3 G20, BMW Seria 4 G22',
        note: 'Wszystkie elementy w jednym splocie 2x2 twill.',
        contents: [
          'Obudowy lusterek karbonowe (para)',
          'Końcówki wydechu Carbon 101 (para)',
          'Listwy progowe karbonowe LED',
          'Zestaw pielęgnacyjny do karbonu',
        ],
      },
      {
        name: 'Track Day',
        tagline: 'Aerodynamika pod jazdę torową',
        fits: 'Toyota GR86, Subaru BRZ ZD8',
        note: 'Wymaga wiercenia w belce zderzaka i klapie bagażnika.',
        contents: [
          'Splitter Track Lip Aero z regulacją kąta',
          'Skrzydło GT Wing 1400',
          'Canardy boczne Aero Fin',
          'Instrukcja ustawienia balansu aero',
        ],
      },
    ],
  },

  terms: {
    title: 'Regulamin i polityka prywatności',
    description: 'Warunki sprzedaży, zwrotów i przetwarzania danych osobowych.',
    demoStrong: 'Dokument demonstracyjny.',
    demoNotice:
      'Treść przygotowano na potrzeby projektu portfolio. Nie stanowi wzorca umownego ani porady prawnej i nie powinna być wykorzystywana w działającym sklepie bez konsultacji z prawnikiem.',
    tableOfContents: 'Spis treści',
    lastUpdated: 'Ostatnia aktualizacja:',
    tocLabel: 'Spis treści regulaminu',
  },

  styleGuide: {
    title: 'Design system',
    description:
      'Dokumentacja tokenów i komponentów użytych w BodyKit Shop. Wszystkie pary kolorów przetestowano pod kątem WCAG 2.2 AA w obu motywach.',
    sections: 'Sekcje',
    brandMark: 'Znak marki',
    brandMarkNote:
      'Monogram zbudowany jest z ukośnego splittera. Ten sam kąt wraca w narzędziu .clip-slant i w kaflach kategorii.',
    colors: 'Kolory',
    brandScale: 'Marka — elektryczny pomarańcz',
    carbonScale: 'Carbon — baza neutralna',
    semanticTokens: 'Tokeny semantyczne',
    tokenUsage: {
      '--bg-base': 'Tło strony',
      '--surface': 'Tło kart i paneli',
      '--text-primary': 'Tekst główny (>=16:1)',
      '--text-secondary': 'Tekst uzupełniający (>=7:1)',
      '--text-muted': 'Podpisy i metadane (>=5:1)',
      '--accent': 'Tło elementów akcji',
      '--text-on-brand': 'Tekst na akcencie (6.6:1)',
      '--border-subtle': 'Linie rozdzielające',
      '--focus-ring': 'Pierścień fokusu',
    },
    tokenTableCaption: 'Tokeny semantyczne i ich zastosowanie',
    token: 'Token',
    usage: 'Zastosowanie',
    typography: 'Typografia',
    typographyNote:
      'Nagłówki: Barlow Condensed (700–800). Tekst: Barlow (400–600). Obie rodziny ładowane lokalnie przez next/font.',
    spacing: 'Odstępy i promienie',
    spacingScale: 'Skala odstępów',
    radii: 'Promienie',
    buttons: 'Przyciski',
    variants: 'Warianty',
    sizes: 'Rozmiary',
    onDark: 'Na ciemnym tle',
    forms: 'Formularze',
    badges: 'Plakietki i oceny',
    icons: 'Ikony',
    iconsNote:
      'Ikony rysowane są currentColor. Bez atrybutu title są dekoracyjne i ukryte przed czytnikami ekranu.',
    cards: 'Karty produktu',
    accessibility: 'Dostępność',
    accessibilityFooter:
      'Pełny opis architektury znajdziesz w pliku README projektu, a wszystkie komponenty w działaniu — na',
    homePage: 'stronie głównej',
    sampleField: 'Pole tekstowe',
    sampleError: 'Pole z błędem',
    sampleErrorMessage: 'Podaj poprawny adres e-mail',
    sampleSelect: 'Lista wyboru',
    sampleSelectHint: 'Wskazówka pod etykietą',
    sampleDisabled: 'Pole wyłączone',
    sampleDisabledValue: 'Niedostępne',
    sampleTextarea: 'Obszar tekstowy',
    sampleCheckbox: 'Pole wyboru z etykietą',
    samplePlaceholder: 'Wpisz tekst…',
    sampleChoose: 'Wybierz…',
    sampleDescribe: 'Opisz sprawę…',
    a11yItems: [
      {
        title: 'Kontrast',
        text: 'Każda para tekst/tło osiąga minimum 4.5:1, a elementy interfejsu 3:1. Biały tekst na pomarańczu dawał tylko 2.8:1, dlatego na powierzchniach akcentu używamy ciemnego atramentu (6.6:1).',
      },
      {
        title: 'Fokus',
        text: 'Jednolity pierścień 2px z odstępem 2px, wspólna klasa .focus-ring. Widoczny tylko przy nawigacji klawiaturą (:focus-visible).',
      },
      {
        title: 'Ruch',
        text: 'Wszystkie animacje respektują prefers-reduced-motion — przy włączonym ograniczeniu czas trwania spada do 0.01 ms.',
      },
      {
        title: 'Formularze',
        text: 'Każde pole ma powiązaną etykietę, błędy są ogłaszane przez role="alert", a po nieudanej wysyłce fokus przechodzi na podsumowanie błędów.',
      },
      {
        title: 'Nawigacja klawiaturą',
        text: 'Link pomijający treść, Escape zamyka panele i przywraca fokus, menu i lista kategorii obsługują aria-expanded.',
      },
    ],
  },

  footer: {
    tagline:
      'Dokładki, spoilery i elementy karbonowe dopasowane do konkretnych modeli aut. Każdy produkt opisujemy tak, żebyś wiedział, co dostajesz, zanim klikniesz „do koszyka”.',
    guarantees: [
      { title: 'Wysyłka w 24 h', text: 'Produkty z magazynu wysyłamy tego samego dnia.' },
      { title: '24 miesiące gwarancji', text: 'Na wady materiałowe i wykonanie.' },
      { title: 'Wsparcie montażu', text: 'Instrukcje PL i pomoc techniczna telefoniczna.' },
    ],
    columns: {
      shop: 'Sklep',
      customerService: 'Obsługa klienta',
      company: 'Firma',
    },
    links: {
      allCategories: 'Wszystkie kategorie',
      search: 'Wyszukiwarka',
      packages: 'Pakiety montażowe',
      businessOffer: 'Oferta dla warsztatów',
      help: 'Centrum pomocy',
      contact: 'Kontakt',
      account: 'Panel klienta',
      terms: 'Regulamin i zwroty',
      about: 'O BodyKit Shop',
      business: 'Współpraca B2B',
      styleGuide: 'Design system',
    },
    copyright: (year: number) => `© ${year} BodyKit Shop. Projekt demonstracyjny.`,
    demoNote: 'Sklep prezentacyjny — zamówienia nie są realizowane, a płatności nie są pobierane.',
  },

  materials: {
    abs: 'ABS',
    carbon: 'Karbon',
    frp: 'FRP',
    pu: 'Poliuretan',
    aluminium: 'Aluminium',
  },

  finishes: {
    'gloss-black': 'Czarny połysk',
    'matte-black': 'Czarny mat',
    'carbon-gloss': 'Karbon połysk',
    'carbon-matte': 'Karbon mat',
    primed: 'Pod lakier',
  },

  badges: {
    new: 'Nowość',
    bestseller: 'Bestseller',
    sale: 'Promocja',
    lastUnits: 'Ostatnie sztuki',
  },

  common: {
    required: '(pole wymagane)',
    currency: 'PLN',
  },
};
