/**
 * English dictionary. This file defines the shape every other locale must
 * satisfy, so adding a key here surfaces a type error in the translations
 * until they catch up.
 */
export const en = {
  meta: {
    siteTitle: 'BodyKit Shop — body kits, spoilers and styling parts',
    siteDescription:
      'Front splitters, spoilers, diffusers and carbon parts matched to specific car models. Verified materials, complete fitting kits and clear instructions.',
    keywords: [
      'body kit',
      'front splitter',
      'rear spoiler',
      'rear diffuser',
      'side skirts',
      'carbon fibre parts',
      'car styling',
      'alloy wheels',
    ],
  },

  nav: {
    catalog: 'Catalog',
    about: 'About',
    business: 'For business',
    help: 'Help',
    contact: 'Contact',
    search: 'Search products',
    account: 'Customer panel',
    cart: 'Cart',
    cartEmpty: 'Cart, empty',
    cartCount: (count: number) => `Cart, ${count} ${count === 1 ? 'item' : 'items'}`,
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    home: 'BodyKit Shop — home page',
    mobileNav: 'Mobile navigation',
    mainNav: 'Main navigation',
    categoriesLabel: 'Categories',
    skipToContent: 'Skip to content',
    breadcrumb: 'Breadcrumb',
    homeLabel: 'Home',
  },

  topBar: {
    shipping: 'Free delivery over 500 zł · Ships within 24 h',
    hours: 'Mon–Fri 8:00–17:00',
  },

  theme: {
    toLight: 'Switch to light theme',
    toDark: 'Switch to dark theme',
  },

  language: {
    label: 'Language',
    switchTo: (name: string) => `Switch language to ${name}`,
  },

  home: {
    badge: 'New collection 2026',
    headlineTop: 'Body kits that',
    headlineAccent: 'fit on the first try',
    lead: 'Splitters, spoilers and diffusers designed for specific model years and body variants. Every part ships with its fitting kit and step-by-step instructions — no shimming or trimming on site.',
    ctaPrimary: 'Browse the catalog',
    ctaSecondary: 'How to pick a part',
    stats: [
      { value: '2,400+', label: 'orders delivered' },
      { value: '38', label: 'car models supported' },
      { value: '24 h', label: 'dispatch from stock' },
    ],
    categoriesEyebrow: 'Catalog',
    categoriesHeading: 'Pick a category',
    categoriesLink: 'All categories',
    featuredEyebrow: 'Most popular',
    featuredHeading: 'Featured products',
    featuredLink: 'See all',
    processEyebrow: 'How it works',
    processHeading: 'Three steps to a new stance',
    processLead:
      'The usual problem with body kits is fitment: the part does not sit flush, needs filler or extra holes. That is why every product here is described by concrete model years rather than "universal fit".',
    processSteps: [
      {
        number: '01',
        title: 'Give us your model and year',
        text: 'The fitment filter shows only parts that match your body variant — no guessing.',
      },
      {
        number: '02',
        title: 'Choose the material',
        text: 'ABS ready for paint, lightweight FRP or full carbon. Each variant lists weight and mounting method.',
      },
      {
        number: '03',
        title: 'Fit it by the instructions',
        text: 'The box contains all fasteners, pre-cut tape and a step-by-step guide.',
      },
    ],
    processCta: 'Read the fitting guide',
    ctaBannerHeading: 'Not sure what fits your car?',
    ctaBannerText:
      'Send us the make, model and year — we will reply with a list of matching parts and tell you which ones work well together.',
    ctaBannerButton: 'Ask about fitment',
    processImageAlt: 'Sports car in a workshop bay prepared for body part installation',
  },

  product: {
    available: 'In stock',
    unavailable: 'Currently unavailable',
    outOfStockShort: 'Out of stock',
    listPrice: 'List price:',
    materialAndFinish: 'Material and finish',
    quantity: 'Quantity',
    decrease: 'Decrease quantity',
    increase: 'Increase quantity',
    total: 'Total',
    addToCart: 'Add to cart',
    goToCart: 'Go to cart',
    addedToCart: (name: string, qty: number) => `Added to cart: ${name} (${qty} pcs)`,
    specs: 'Specifications',
    fitment: 'Fits',
    years: 'Model years:',
    included: "What's in the box",
    availableMaterials: 'Available materials:',
    notListed: 'Cannot find your model?',
    notListedLink: 'Contact us',
    notListedSuffix: '— we will check the fitment for you.',
    related: 'From the same category',
    gallery: 'Product image thumbnails',
    galleryAlt: (name: string, index: number, total: number) =>
      `${name} — image ${index} of ${total}`,
    showImage: (index: number) => `Show image ${index}`,
    imageAlt: (name: string) => `${name} — product photo`,
    view: 'View',
    from: 'from',
    rating: 'Rating:',
    reviews: (count: number) => `${count} ${count === 1 ? 'review' : 'reviews'}`,
    warranty: '24-month warranty',
    instructions: 'Fitting instructions included',
  },

  shipping: {
    fast: 'Ships within 24–48 h',
    days: (days: number) => `Ships in ${days} business days`,
    leadTime: (days: number) => `${days} business days lead time`,
  },

  catalog: {
    title: 'Catalog',
    description:
      'Eight categories of body and chassis parts. Every product lists the exact models and model years it fits.',
    productCount: (count: number) => `${count} ${count === 1 ? 'product' : 'products'}`,
    goToCategory: 'Go to category',
    seeProducts: 'See products',
    filters: 'Filters',
    material: 'Material',
    carMake: 'Car make',
    availability: 'Availability',
    inStockOnly: 'In stock only',
    clearFilters: 'Clear filters',
    sortBy: 'Sort:',
    sortOptions: {
      featured: 'Featured',
      priceAsc: 'Price: low to high',
      priceDesc: 'Price: high to low',
      rating: 'Highest rated',
      name: 'Name A–Z',
    },
    noResults: 'No products match the selected filters',
    noResultsHint: 'Try removing some criteria or browse another category.',
  },

  search: {
    title: 'Search',
    description: 'Search by part name, material, or your car make and model.',
    placeholder: 'Type a part name, make or model…',
    examples: 'Examples:',
    /** Sample queries. Model names stay as-is; part names follow the locale. */
    exampleTerms: ['splitter BMW', 'carbon', 'GR86', 'diffuser'],
    label: 'Search products',
    results: (count: number, query: string) =>
      `${count} ${count === 1 ? 'result' : 'results'} for “${query}”`,
    noResults: (query: string) => `No results for “${query}”`,
    noResultsHint: 'Try a broader phrase or browse the catalog by category.',
    clear: 'Clear search',
    browseByCategory: 'Browse by category',
  },

  cart: {
    title: 'Cart',
    metaDescription: 'The contents of your BodyKit Shop cart.',
    loading: 'Loading cart',
    empty: 'Your cart is empty',
    emptyHint: 'Pick parts from the catalog — each one lists the models and years it fits.',
    browse: 'Browse the catalog',
    itemsHeading: 'Products in cart',
    remove: (name: string) => `Remove from cart: ${name}`,
    decrease: (name: string) => `Decrease quantity: ${name}`,
    increase: (name: string) => `Increase quantity: ${name}`,
    quantityLabel: (qty: number) => `Quantity: ${qty}`,
    perUnit: '/ pc',
    continueShopping: 'Continue shopping',
    clearCart: 'Clear cart',
    summary: 'Summary',
    products: (count: number) => `Products (${count} pcs)`,
    delivery: 'Delivery',
    free: 'Free',
    grandTotal: 'Total',
    freeShippingGap: (amount: string) => `You are ${amount} away from free delivery.`,
    checkout: 'Proceed to checkout',
    demoNote: 'This is a demo shop — orders are not fulfilled and no payments are taken.',
  },

  checkout: {
    title: 'Checkout',
    description: 'Fill in your delivery details. Fields marked with an asterisk are required.',
    emptyCart: 'Your cart is empty',
    emptyCartHint: 'Add products to your cart to place an order.',
    errorSummary: (count: number) =>
      `The form has ${count} ${count === 1 ? 'error' : 'errors'} to fix:`,
    step1: '1. Contact details',
    step2: '2. Delivery address',
    step3: '3. Delivery method',
    step4: '4. Confirmation',
    firstName: 'First name',
    lastName: 'Last name',
    email: 'Email',
    phone: 'Phone',
    phoneHint: 'The courier will call before delivery',
    street: 'Street and number',
    postalCode: 'Postal code',
    city: 'City',
    wantInvoice: 'I need a VAT invoice',
    company: 'Company name',
    taxId: 'Tax ID',
    acceptTerms: 'I accept the',
    termsLink: 'terms and conditions',
    andPrivacy: 'and privacy policy',
    submit: 'Place order',
    yourOrder: 'Your order',
    demoNote: 'Demo shop — the order will not be fulfilled and no data leaves your browser.',
    deliveryOptions: {
      courier: { label: 'Courier', time: '1–2 business days' },
      locker: { label: 'Parcel locker', time: '1–2 business days' },
      pickup: { label: 'Local pickup (Rzeszów)', time: 'After confirmation' },
    },
    validation: {
      required: 'This field is required',
      email: 'Enter a valid email address, e.g. jan@example.com',
      phone: 'Enter a 9-digit phone number',
      postalCode: 'Postal code in 00-000 format',
      taxId: 'Tax ID must be 10 digits',
      terms: 'You must accept the terms to place an order',
    },
  },

  thankYou: {
    title: 'Thank you for your order',
    lead: 'Your order has been received. Below is the reference number — handy if you want to ask about its status.',
    orderNumber: 'Order number',
    demoNote:
      'This is a demo shop. Nothing was sent anywhere, no data was stored and no payment was taken.',
    demoNoteStrong: 'This is a demo shop.',
    steps: [
      {
        title: 'Email confirmation',
        text: 'Within a few minutes we send an order summary together with a proforma invoice.',
      },
      {
        title: 'Picking and dispatch',
        text: 'Items in stock are packed the same business day. You get the tracking number by SMS.',
      },
      {
        title: 'Fitting support',
        text: 'Instructions are in the box, and our technical desk answers the phone until 17:00.',
      },
    ],
    step: 'Step',
    backToCatalog: 'Back to the catalog',
    accountPanel: 'Customer panel',
  },

  notFound: {
    title: 'This page went off track',
    lead: 'We could not find the page you are looking for. It may have moved, or the address contains a typo.',
    home: 'Home page',
    search: 'Search products',
    popular: 'Popular categories',
  },

  about: {
    title: 'About BodyKit Shop',
    description:
      'We started with our own cars and the frustration of a body kit that would not sit flush against the bumper. Today we run a shop where fitment is documented, not promised.',
    imageAlt: 'Cars with widebody arches inside a workshop hall',
    storyHeading: 'How it started',
    story: [
      'In 2019 we ordered a front splitter for a private car. The listing said "fits the 3 Series". Once unpacked it turned out the part had been designed for a different bumper variant — the gap was a dozen millimetres, but that was enough to keep the splitter from sitting flush along its whole length.',
      'The workshop quoted more for the fitting work than the part itself had cost. That is when we understood the problem with this industry: it sells a shape, not a fitment. Descriptions stay vague because a vague description matches more searches.',
      'We built BodyKit Shop the other way round. Every product lists specific models and model-year ranges. If we have not tested a part on a given car, that car is not on the list — even when it theoretically could fit.',
    ],
    valuesHeading: 'What we stand by',
    values: [
      {
        title: 'Fitment over "universal"',
        text: 'Every product lists models and years. If something is missing from the list, we say so instead of writing "fits most cars".',
      },
      {
        title: 'Honest fitting descriptions',
        text: 'We state whether drilling is needed, how long the job takes and what is in the box. Drilling into a bumper beam is not the same as 3M tape — and the customer should know that before buying.',
      },
      {
        title: 'Material matched to purpose',
        text: 'ABS for daily driving, FRP for track use, carbon when weight and looks matter. We do not sell carbon where it brings no benefit.',
      },
    ],
    milestonesHeading: 'Milestones',
    milestones: [
      { year: '2019', text: 'First orders shipped from a garage in Rzeszów.' },
      { year: '2021', text: 'Own warehouse and steady cooperation with three EU manufacturers.' },
      { year: '2023', text: 'Technical desk launched, with fitting instructions in Polish.' },
      { year: '2026', text: 'Over 2,400 orders delivered across 38 supported models.' },
    ],
    asideText:
      'Driving something that is not on our fitment lists? Write to us — we will check with the manufacturer and reply even if it turns out nothing fits.',
    asideCta: 'Get in touch',
  },

  help: {
    title: 'Help centre',
    description:
      'Common questions about choosing parts, materials, fitting and returns. If you cannot find your answer, write or call us.',
    onThisPage: 'On this page',
    noQuestion: 'Question not covered?',
    noQuestionText: 'Our technical desk answers the phone until 17:00.',
    contact: 'Contact',
    usefulLinks: 'Useful links',
    links: {
      terms: 'Terms, returns and complaints',
      business: 'Workshop partnership',
      packages: 'Ready-made fitting packages',
      contactForm: 'Contact form',
    },
  },

  contact: {
    title: 'Contact',
    description:
      'Tell us what you need — the more detail about your car, the more precise our answer.',
    formHeading: 'Contact form',
    directContact: 'Direct contact',
    openingHours: 'Opening hours',
    hoursValue: 'Monday – Friday, 8:00 – 17:00',
    hoursNote: 'Emails sent over the weekend are answered on the next business day.',
    address: 'Address',
    departmentsHeading: 'Writing about something specific?',
    name: 'Full name',
    email: 'Email',
    topic: 'Topic',
    topicPlaceholder: 'Choose a topic…',
    car: 'Car (make, model, year)',
    carHint: 'E.g. BMW 3 Series G20, 2021, M Sport — helps us answer precisely',
    message: 'Message',
    privacy: 'I agree to my data being processed so you can reply',
    submit: 'Send message',
    fixFields: (count: number) => `Fix ${count} ${count === 1 ? 'field' : 'fields'}:`,
    sentHeading: 'Form filled in correctly',
    sentText:
      'This is a demo shop, so the message was not sent or stored anywhere. In a live shop this is where a confirmation with a ticket number would appear.',
    sentContactPrefix: 'If you want to reach us for real, write to',
    fillAgain: 'Fill in again',
    validation: {
      required: 'This field is required',
      email: 'Enter a valid email address',
      message: (length: number) =>
        `Please add a bit more detail (min. 20 characters, you have ${length})`,
      privacy: 'Consent to data processing is required',
    },
    topics: [
      'Choosing parts for my car',
      'Availability and lead time',
      'Fitting and instructions',
      'Complaint or return',
      'Business partnership',
      'Other',
    ],
    departments: [
      {
        title: 'Technical desk',
        text: 'Part selection, model fitment, fitting questions.',
        email: 'tech@bodykitshop.pl',
      },
      {
        title: 'Orders and shipping',
        text: 'Order status, address changes, lead times.',
        email: 'orders@bodykitshop.pl',
      },
      {
        title: 'Complaints and returns',
        text: 'Warranty claims and withdrawal from contract.',
        email: 'returns@bodykitshop.pl',
      },
    ],
  },

  business: {
    title: 'Business partnership',
    description:
      'A partner programme for workshops, detailing studios and companies working on car body modifications.',
    imageAlt: 'Cars prepared for modification in a professional workshop',
    tiersHeading: 'Discount tiers',
    tiersLead:
      'Discounts are based on the previous quarter turnover. There are no entry fees and no minimum order commitments.',
    mostPopular: 'Most popular',
    discountLabel: 'discount',
    benefitsHeading: 'What else you get',
    applyHeading: 'How to join',
    applySteps: [
      'Send us a message through the contact form with your tax ID and line of business.',
      'We reply with the registration form and partner price list within one business day.',
      'Once verified you get access to a panel with net prices and order history.',
    ],
    applyCta: 'Apply for partnership',
    tiers: [
      {
        name: 'Partner',
        threshold: 'from 5,000 zł / quarter',
        discount: '8%',
        perks: ['8% off the entire range', 'Priority dispatch', 'Technical support by email'],
      },
      {
        name: 'Partner Plus',
        threshold: 'from 15,000 zł / quarter',
        discount: '14%',
        perks: [
          '14% off the entire range',
          '14-day payment terms',
          'Dedicated account manager',
          'Display materials for your workshop',
        ],
      },
      {
        name: 'Distributor',
        threshold: 'individual terms',
        discount: 'up to 25%',
        perks: [
          'Terms agreed individually',
          '30-day payment terms',
          'Early access to new products',
          'Support with special orders',
        ],
      },
    ],
    benefits: [
      {
        title: 'Drop-shipping to your customer',
        text: 'We can ship an order straight to your customer, in neutral packaging and with your paperwork.',
      },
      {
        title: 'Support for unusual fitments',
        text: 'If you run into a car with previous modifications, our technical desk helps you find a solution.',
      },
      {
        title: 'Simplified complaints path',
        text: 'Partner claims are reviewed within 3 business days, with no need to return goods before a decision.',
      },
    ],
  },

  account: {
    title: 'Customer panel',
    description: 'Order history, delivery details and saved cars.',
    demoNoticeStrong: 'Demo view.',
    demoNotice:
      'The panel shows sample data — this project has no sign-in and no server-side storage.',
    orderHistory: 'Order history',
    deliveryDetails: 'Delivery details',
    changeDetails: 'Change details',
    savedCars: 'Saved cars',
    orderedParts: 'Parts ordered:',
    savedCarsNote: 'A saved car lets you filter the catalog down to matching parts.',
    goToCatalog: 'Go to the catalog',
    statuses: {
      inTransit: 'In transit',
      delivered: 'Delivered',
    },
  },

  packages: {
    title: 'Fitting packages',
    description:
      'Sets built from parts designed together — the same edge break angle and consistent material thickness along the whole body.',
    save: (amount: string) => `Save ${amount}`,
    fits: 'Fits',
    fitting: 'Fitting',
    ask: 'Ask about this package',
    footer:
      'Want a set for a different model? Tell us what you drive and the look you are after — we will put together a proposal from the parts we stock.',
    items: [
      {
        name: 'Street Line — complete set',
        tagline: 'A consistent side profile with no bodywork changes',
        fits: 'Volkswagen Golf VII/VIII, Audi A3 8V/8Y',
        note: 'No drilling, about 2 hours at a workshop.',
        contents: [
          'Street GT front splitter',
          'Street Line side skirt extensions (pair)',
          'Race Fin rear diffuser',
          'Complete fasteners and 3M tape',
        ],
      },
      {
        name: 'Carbon Touch',
        tagline: 'Carbon details that hold up close',
        fits: 'BMW 3 Series G20, BMW 4 Series G22',
        note: 'All parts share a single 2x2 twill weave.',
        contents: [
          'Carbon mirror caps (pair)',
          'Carbon 101 exhaust tips (pair)',
          'Carbon LED door sills',
          'Carbon care kit',
        ],
      },
      {
        name: 'Track Day',
        tagline: 'Aero built for track use',
        fits: 'Toyota GR86, Subaru BRZ ZD8',
        note: 'Requires drilling into the bumper beam and boot lid.',
        contents: [
          'Track Lip Aero splitter with angle adjustment',
          'GT Wing 1400',
          'Aero Fin side canards',
          'Aero balance setup guide',
        ],
      },
    ],
  },

  terms: {
    title: 'Terms and privacy policy',
    description: 'Conditions of sale, returns and personal data processing.',
    demoStrong: 'Demonstration document.',
    demoNotice:
      'This text was written for a portfolio project. It is not a contractual template or legal advice and should not be used in a live shop without consulting a lawyer.',
    tableOfContents: 'Contents',
    lastUpdated: 'Last updated:',
    tocLabel: 'Terms table of contents',
  },

  styleGuide: {
    title: 'Design system',
    description:
      'Documentation of the tokens and components used in BodyKit Shop. Every colour pair was tested against WCAG 2.2 AA in both themes.',
    sections: 'Sections',
    brandMark: 'Brand mark',
    brandMarkNote:
      'The monogram is built from an angled splitter. The same angle returns in the .clip-slant utility and in the category tiles.',
    colors: 'Colours',
    brandScale: 'Brand — electric orange',
    carbonScale: 'Carbon — neutral base',
    semanticTokens: 'Semantic tokens',
    tokenUsage: {
      '--bg-base': 'Page background',
      '--surface': 'Card and panel background',
      '--text-primary': 'Primary text (>=16:1)',
      '--text-secondary': 'Supporting text (>=7:1)',
      '--text-muted': 'Captions and metadata (>=5:1)',
      '--accent': 'Action element surface',
      '--text-on-brand': 'Text on the accent (6.6:1)',
      '--border-subtle': 'Divider lines',
      '--focus-ring': 'Focus ring',
    },
    tokenTableCaption: 'Semantic tokens and their usage',
    token: 'Token',
    usage: 'Usage',
    typography: 'Typography',
    typographyNote:
      'Headings: Barlow Condensed (700–800). Body: Barlow (400–600). Both families are self-hosted through next/font.',
    spacing: 'Spacing and radii',
    spacingScale: 'Spacing scale',
    radii: 'Radii',
    buttons: 'Buttons',
    variants: 'Variants',
    sizes: 'Sizes',
    onDark: 'On a dark surface',
    forms: 'Forms',
    badges: 'Badges and ratings',
    icons: 'Icons',
    iconsNote:
      'Icons are drawn with currentColor. Without a title attribute they are decorative and hidden from screen readers.',
    cards: 'Product cards',
    accessibility: 'Accessibility',
    accessibilityFooter:
      'The full architecture write-up lives in the project README, and every component in context on the',
    homePage: 'home page',
    sampleField: 'Text field',
    sampleError: 'Field with an error',
    sampleErrorMessage: 'Enter a valid email address',
    sampleSelect: 'Select',
    sampleSelectHint: 'Hint under the label',
    sampleDisabled: 'Disabled field',
    sampleDisabledValue: 'Unavailable',
    sampleTextarea: 'Textarea',
    sampleCheckbox: 'Checkbox with a label',
    samplePlaceholder: 'Type something…',
    sampleChoose: 'Choose…',
    sampleDescribe: 'Describe your case…',
    a11yItems: [
      {
        title: 'Contrast',
        text: 'Every text/background pair reaches at least 4.5:1 and UI elements 3:1. White on orange gave only 2.8:1, which is why brand surfaces use dark ink instead (6.6:1).',
      },
      {
        title: 'Focus',
        text: 'A single 2px ring with a 2px offset, shared through the .focus-ring class. Visible only for keyboard navigation (:focus-visible).',
      },
      {
        title: 'Motion',
        text: 'All animations respect prefers-reduced-motion — with the preference on, durations drop to 0.01 ms.',
      },
      {
        title: 'Forms',
        text: 'Every field has a bound label, errors are announced through role="alert", and a failed submit moves focus to the error summary.',
      },
      {
        title: 'Keyboard navigation',
        text: 'Skip link, Escape closes panels and restores focus, menus and disclosures expose aria-expanded.',
      },
    ],
  },

  footer: {
    tagline:
      'Body kits, spoilers and carbon parts matched to specific car models. We describe every product so you know what you are getting before you click "add to cart".',
    guarantees: [
      { title: 'Ships within 24 h', text: 'Items in stock leave our warehouse the same day.' },
      { title: '24-month warranty', text: 'Covering material and workmanship defects.' },
      { title: 'Fitting support', text: 'Written instructions and technical help by phone.' },
    ],
    columns: {
      shop: 'Shop',
      customerService: 'Customer service',
      company: 'Company',
    },
    links: {
      allCategories: 'All categories',
      search: 'Search',
      packages: 'Fitting packages',
      businessOffer: 'Workshop offer',
      help: 'Help centre',
      contact: 'Contact',
      account: 'Customer panel',
      terms: 'Terms and returns',
      about: 'About BodyKit Shop',
      business: 'Business partnership',
      styleGuide: 'Design system',
    },
    copyright: (year: number) => `© ${year} BodyKit Shop. Demonstration project.`,
    demoNote: 'Demo shop — orders are not fulfilled and no payments are taken.',
  },

  materials: {
    abs: 'ABS',
    carbon: 'Carbon',
    frp: 'FRP',
    pu: 'Polyurethane',
    aluminium: 'Aluminium',
  },

  finishes: {
    'gloss-black': 'Gloss black',
    'matte-black': 'Matte black',
    'carbon-gloss': 'Carbon gloss',
    'carbon-matte': 'Carbon matte',
    primed: 'Primed for paint',
  },

  badges: {
    new: 'New',
    bestseller: 'Bestseller',
    sale: 'Sale',
    lastUnits: 'Last units',
  },

  common: {
    required: '(required field)',
    currency: 'PLN',
  },
} as const;

/**
 * Widens string literals to `string` while keeping the object shape and any
 * formatter functions intact. Without this, `as const` above would force every
 * translation to repeat the exact English wording.
 */
type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends (...args: infer A) => infer R
      ? (...args: A) => R
      : T extends readonly (infer E)[]
        ? readonly Widen<E>[]
        : { readonly [K in keyof T]: Widen<T[K]> };

export type Dictionary = Widen<typeof en>;
