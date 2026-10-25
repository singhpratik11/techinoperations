// Every word and number shown in the deck lives here. Edit text in this file only;
// the components read from it and never hard-code copy.


export const title = {
  heading: 'Seeing the Shelf',
  subheading: 'What computer vision does to the way a grocery store runs',
  course: 'Operations Management | BITSoM',
  team: ['Shreya Maheshwari', 'Pratik Singh', 'Koyena Das', 'Vaishnavi Dhake', 'Prabhudatta Panda'],
  tag: 'empty 94%',
  notes:
    "Our project pairs one industry with one technology: brick-and-mortar grocery and computer vision. Picture an aisle like this. Most of it is fine, but one spot has run out. The question: what changes in a store's operations when that empty spot can report itself?",
}

export const technology = {
  headline: 'A camera that can tell when a shelf is empty',
  industry: {
    lead: 'Indian grocery keeps about 5 rupees of every 100 it sells.',
    revenueCr: 57790,
    profitCr: 2927,
    caption: (profit: string, revenue: string, pct: string) => `₹${profit} of ₹${revenue} crore kept as profit, ${pct} (DMart, FY25)`,
  },
  source: 'DMart FY25 results via Angel One; Yilmazer & Birant (2021), SOSA; NVIDIA Jetson Orin Nano, $249 (Phoronix).',
  tags: {
    stocked: 'stocked 97%',
    empty: 'empty 94%',
    low: 'low 81%',
  },
  paragraphs: [
    'Point a camera at the fast-moving aisles. Most stores already have CCTV.',
    'A detection model (YOLO) labels every spot as stocked, low or empty. The images are captured and processed through in-store digital infrastructure.',
    'It starts rough and improves. Staff confirm each alert, and every answer becomes training data (the SOSA method).',
  ],
  notes:
    "Our industry is modern grocery in India: DMart, Reliance Smart Bazaar, More, Spencer's. Margins are thin: DMart kept 5.1% in FY25, ₹2,927 crore of profit on ₹57,790 crore of revenue. Stores already run ERP, POS and automatic reordering; what they lack is a reliable view of the shelf. That is what computer vision adds. " +
    'Cameras on fast-moving aisles; most stores already own CCTV. A detection model called YOLO labels every part of the shelf with a confidence score. It runs on a small in-store computer, about the price of a phone, so video never leaves the building. To avoid labelling thousands of images by hand we use SOSA, a semi-supervised method: label a few, the model labels the rest. Accuracy starts modest, 0.72 mAP with 20% of labels and 0.89 with 80%, so a person confirms every alert and those confirmations keep training it. Walmart Canada already runs shelf cameras in all its stores. Our cost estimate: about ₹7 lakh per store upfront plus ₹6.5 lakh a year.',
}

export const valueModel = {
  headline: 'Every way the old store made money ran through the shelf',
  streams: [
    { name: 'Front margin', detail: 'about 15% markup on every item' },
    { name: 'Stock turns', detail: 'sell before supplier invoices fall due' },
    { name: 'Back margin', detail: 'brands pay for shelf space, unmeasured' },
    { name: 'Lean labour', detail: 'a small team runs a large store' },
  ],
  stat: '10%+',
  statText: 'of profit lost to record errors and misplaced stock',
  source: 'Raman, DeHoratius & Ton (2001). The 15% markup is our assumption (Appendix J).',
  notes:
    "The traditional store creates value by putting thousands of everyday goods in one place at low prices. It captures that value four ways: a thin front margin on each item, fast stock turns that let supplier credit fund inventory, back margin from brands for shelf access and displays, and a small team running a large store. All four leak at the shelf. An item that is not on the shelf earns nothing. A wrong record breaks automatic reordering. Brand payments were priced on habit: slotting fees buy access but measure nothing, and India's earlier in-store TV networks, such as TAG Media at 62 Spencer's stores, could count stores but not attention. Raman, DeHoratius and Ton estimated that record errors and misplaced items cut profit by more than 10%.",
}

// Shared by the two timeline screens so both draw the same axis at the same scale.
export const timeAxis = {
  hours: 5,
  ticks: ['shelf empties', '1 hour', '2 hours', '3 hours', '4 hours', '5 hours'],
}

export const today = {
  headline: 'Today, an empty shelf waits about 2.5 hours to be noticed',
  noticedAtHours: 2.5,
  barText: 'empty, and nobody knows',
  marker: 'a staff member on patrol finally spots it',
  phantom: "if the backroom is empty too, the system still thinks it's in stock, so nothing gets reordered",
  bigNumber: '65%',
  bigNumberText: 'of store stock records are wrong. Stores run on what the system says, not what is on the shelf.',
  secondNumber: '31%',
  secondNumberText: 'of shoppers who meet an empty shelf buy the item at another store.',
  source:
    'DeHoratius & Raman (2008); 64.7% at a UK grocer, Rekik et al. (2025); 31%: Corsten & Gruen. Patrol timing (every 4–5 h) is our assumption.',
  notes:
    'The last unit sells and nobody is told. Staff check aisles every four to five hours, so a gap waits on average about two and a half hours. If the backroom is empty too, the record still says in stock, so the automatic reorder never fires, and the shelf can stay empty until the next full stock count. Records are mostly wrong: 65% in a US chain, 64.7% at a UK grocer. About 8% of items are missing at any moment, costing around 4% of sales, for a business that keeps about 5 rupees of every 100. Brands send people to check shelves and checkout lanes open by eye for the same reason: nobody can see the store in real time. And the shopper does not wait: 31% of those who meet a gap buy the item at another store.',
}

export const withCameras = {
  headline: 'With cameras, the same gap is fixed in about 30 minutes',
  fixedAtHours: 0.5,
  barText: '30 min',
  ghostText: 'two hours of empty shelf that no longer happen',
  flow: [
    'The camera spots the gap',
    'the nearest associate gets a task on their phone',
    'the shelf is refilled, and the stock record is corrected so the reorder goes out.',
  ],
  aside:
    'The same cameras can also time checkout lanes to real queues and show brands whether their products are on the shelf.',
  source:
    'Assumes a camera scan every 30 minutes. In use at Walmart Canada (Focal Systems); Schnucks reported 20–30% fewer out-of-stocks.',
  notes:
    "Same clock, same empty shelf, with cameras. The camera catches the gap at its next scan, about 15 minutes in on average. A task goes to the nearest associate's phone; they refill it, the camera confirms, and if the backroom was empty the bare shelf overrides the wrong record so the reorder goes out. Empty to refilled drops from about two and a half hours to about thirty minutes. Schnucks reported 20 to 30% fewer out-of-stocks with this kind of system. Three mechanisms drive it: accuracy, since a single store-wide stocktake at a UK grocer lifted sales 11.2% in two months; speed, since when stock is in the backroom the fix is just noticing; and better-placed people, since one associate recovering misplaced stock lifted sales over 22% at two apparel retailers. Those are single studies, so our model assumes only about 1% of sales recovered.",
}

export const stakeholders = {
  headline: 'Retailer, staff, shoppers and brands can all come out ahead',
  columns: ['What they gain', 'Condition for a win'],
  rows: [
    { label: 'Retailer', gain: 'recovered sales, accurate records, brand revenue', condition: 'start on fast-moving aisles, reuse existing CCTV' },
    { label: 'Employees', gain: 'Less manual checking; more time for replenishment and customer service', condition: 'footage is never used for discipline' },
    { label: 'Shoppers', gain: 'Better product availability, potentially shorter queues', condition: 'counts, not faces; clear signage' },
    { label: 'Brands', gain: 'Fewer lost sales; better visibility into product availability on shelves', condition: 'Pay for verified results, not flat fees' },
  ],
  roles:
    'Cameras identify stock issues; employees verify alerts, replenish shelves and resolve problems. Lowe’s reported saving 80 staff hours per store each week.',
  closing: 'The goal: solve stock problems faster and create value for everyone.',
  source: "Tables D1 and D2; Lowe's via AI News. Brand losses: Gruen & Corsten via Drug Store News. Privacy: India's DPDP Act, 2023.",
  notes:
    "Is win-win-win-win possible? Yes, under two conditions: the gains are shared, and the cameras watch shelves rather than people. The retailer gains sales, accurate records and brand revenue. Employees lose drudgery and share bonuses. Shoppers find items and wait less, provided the system stores counts, not faces, which also keeps it within India's Digital Personal Data Protection Act, 2023. Brands are the least obvious winner and the most important for a thin-margin chain: out-of-stocks cost manufacturers about $23 million per $1 billion of sales, so a brand already paying for slotting and field merchandisers has reason to pay for proof that its products are on the shelf. On jobs: the cameras automate the looking and augment the doing. Auditor roles shrink; associates get tasks with location and quantity; merchandisers shift from checking shelves to fixing them. Lowe's freed 80 hours of staff time per store a week and paid store managers $5,000 bonuses from the gains. And the future: once every shelf is measured, the shelf can be sold. Onsite retail media earns about 70% gross margins against a 5% net margin on groceries, and Indian retail media, about ₹24,280 crore in 2025, is almost all online today.",
}

export const littlesLaw = {
  headline: "By Little's Law, a faster, surer cycle needs less stock",
  terms: [
    { symbol: 'I', name: 'Inventory', before: '', after: 'about 5% less safety stock', extra: '+ about ₹7 lakh of cameras per store' },
    { symbol: 'R', name: 'Throughput rate', before: '', after: 'more sold per shelf-hour', extra: 'lanes open on measured queues' },
    { symbol: 'T', name: 'Throughput time', before: 'about 2.5 hours', after: 'about 30 minutes', extra: '' },
  ],
  evidence: {
    lead: 'The research shows large effects; our model assumes a small one.',
    axis: [0, 10, 20, 30],
    rows: [
      { text: 'Accuracy: one stocktake at a UK grocer', lo: 11.2, hi: 11.2, label: '+11.2% sales' },
      { text: 'Speed: shelf scanning at Schnucks', lo: 20, hi: 30, label: '20–30% fewer out-of-stocks' },
      { text: 'People: one associate recovering stock', lo: 22.4, hi: 22.7, label: '+22.4–22.7% sales' },
    ],
    ours: { text: 'Our base case', lo: 1, hi: 1, label: 'about 1% of sales recovered' },
  },
  source:
    'Table B1; timings assume a 14-hour day. Rekik et al. (2025), one store pair; Schnucks via NACS (2021), company-reported; Lee, Kesavan & Deshpande (2021).',
  notes:
    "In this course's terms. Throughput time for the replenishment cycle, shelf empty to refilled, falls from about 2.5 hours to about 30 minutes, and a frozen record now corrects at the next scan instead of the next stock count. Throughput rate rises in two places: units sold per shelf-hour, because fewer hours are lost to empty shelves, about 1% of sales in our base case; and shoppers served per peak hour, because lanes open on measured queues. Assets move both ways. By Little's Law, inventory equals throughput rate times throughput time, so a shorter, more reliable cycle holds the same availability with less safety stock; we assume 5% less. Fixed assets rise by about ₹7 lakh per store for cameras, edge devices and installation.",
}

export type ScenarioKey = 'conservative' | 'base' | 'upside'

export const businessCase = {
  // The headline is filled from the chart's computed net and the scenario's payback.
  headline: (net: string, payback: string) => `₹${net} lakh a year per store, paid back in about ${payback}`,
  unit: '₹ lakh per store per year',
  steps: ['Recovered profit', 'Lower shrink', 'Less stock', 'Labour freed', 'Brand revenue', 'System cost'],
  netLabel: 'Net',
  stockoutLabel: 'Stockouts cut by',
  scenarios: {
    conservative: { label: 'Cautious', stockoutCut: '10%', values: [6.0, 0, 4.2, 1.8, 0, -8.8], payback: '15 months' },
    base: { label: 'Base', stockoutCut: '25%', values: [15.0, 4.0, 4.2, 1.8, 7.0, -8.8], payback: '3 months' },
    upside: { label: 'Optimistic', stockoutCut: '30%', values: [18.0, 8.0, 4.2, 1.8, 14.0, -8.8], payback: '2 months' },
  } as Record<ScenarioKey, { label: string; stockoutCut: string; values: number[]; payback: string }>,
  order: ['conservative', 'base', 'upside'] as ScenarioKey[],
  paragraphs: [
    'For a store selling ₹100 crore a year, the system costs about ₹8.8 lakh a year.',
    'Even with no money from brands and a smaller drop in stockouts, the store still comes out ahead.',
  ],
  rollout: [
    { kind: 'step', text: 'Pilot five stores against five matched ones for three months.' },
    { kind: 'gate', text: 'Scale only if out-of-stock hours fall at least 15%.' },
    { kind: 'step', text: 'Then sell shelf data and in-store media to brands: about 70% gross margin, against 5% net on groceries.' },
  ] as { kind: 'step' | 'gate'; text: string }[],
  source:
    'Our model: 15% gross margin; costs are our estimates as vendors do not publish prices. Retail media margin: Coresight via BW Marketing World.',
  notes:
    'Does it pay on a thin margin? The system costs ₹7 lakh of capex written off over three years plus ₹6.5 lakh a year to run. A store selling ₹100 crore keeps about ₹5 crore as profit. The system costs about ₹8.8 lakh a year. The biggest gain is recovered sales: cutting stockouts by a quarter brings back ₹15 lakh of gross profit. Add lower shrink, less safety stock, freed staff time and some brand money, and the store nets about ₹23 lakh a year, 4.6% more profit, with capex back in about three months. Even in the cautious case it still makes ₹3.2 lakh. Rollout: a five-store pilot against five matched stores, scale only if empty-shelf hours fall at least 15%, then sell shelf data and media to brands in year two. Across 400 such stores the base case is worth about ₹93 crore a year. The trap is over-automating: Amazon pulled Just Walk Out from its US Fresh grocery stores in 2024, so we keep people in charge and use cameras to direct them.',
}

export const thanks = {
  heading: 'Thank you',
  subheading: 'Questions welcome',
  tag: 'stocked 97%',
  notes: 'Thank you. Happy to take questions.',
}
