// Every word and number shown in the deck lives here. Edit text in this file only;
// the components read from it and never hard-code copy.


export const industry = {
  headline: 'Indian grocery keeps about 5 rupees of every 100 it sells',
  revenueCr: 57790,
  profitCr: 2927,
  revenueLabel: (cr: string) => `₹${cr} crore of revenue`,
  profitLabel: (cr: string) => `₹${cr} crore kept as profit`,
  who: 'DMart, FY25',
  gap: ['Stores already run ERP, POS and automatic reordering. What they lack is ', 'a reliable view of the shelf.'],
  source: 'Avenue Supermarts (DMart) FY25 results, via Angel One.',
  notes:
    "Our industry is modern grocery in India: DMart, Reliance Smart Bazaar, More, Spencer's. Margins are thin. DMart earned a 5.1% net margin in FY25: ₹2,927 crore of profit on ₹57,790 crore of revenue. On a margin that thin, small operational leaks decide whether a store makes money. Our technology is computer vision: software that reads camera images and turns them into facts, like a facing is empty or twelve people are queuing at lane 4. The pairing fits because grocery's main gap is sensing. Stores already have ERP, POS and automatic reordering. What they lack is a reliable view of the shelf.",
}

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
  tags: {
    stocked: 'stocked 97%',
    empty: 'empty 94%',
    low: 'low 81%',
  },
  paragraphs: [
    'Point a camera at the fast-moving aisles. Most stores already have CCTV.',
    'A detection model (YOLO) labels every spot as stocked, low or empty. It runs on a small box inside the store, so video never leaves.',
    'It starts rough and improves. Staff confirm each alert, and every answer becomes training data (the SOSA method).',
  ],
  notes:
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
    "Same clock, same empty shelf, with cameras. The camera catches the gap at its next scan, about 15 minutes in on average. A task goes to the nearest associate's phone; they refill it, the camera confirms, and if the backroom was empty the bare shelf overrides the wrong record so the reorder goes out. Empty to refilled drops from about two and a half hours to about thirty minutes. Schnucks reported 20 to 30% fewer out-of-stocks with this kind of system.",
}

export const stakeholders = {
  headline: 'Retailer, staff, shoppers and brands can all come out ahead',
  columns: ['What they gain', 'Condition for a win'],
  rows: [
    { label: 'Retailer', gain: 'recovered sales, accurate records, brand revenue', condition: 'start on fast-moving aisles, reuse existing CCTV' },
    { label: 'Employees', gain: 'less searching, clearer tasks, a share of the gains', condition: 'footage is never used for discipline' },
    { label: 'Shoppers', gain: 'items on the shelf, shorter queues', condition: 'counts, not faces; clear signage' },
    { label: 'Brands', gain: 'fewer lost sales, proof their products are on the shelf', condition: 'pay for measured results, not flat fees' },
  ],
  closing: 'It only works for everyone if the cameras watch shelves, not people.',
  source: "Table D2. Brand losses: Gruen & Corsten via Drug Store News. Privacy: India's DPDP Act, 2023.",
  notes:
    "Is win-win-win-win possible? Yes, under two conditions: the gains are shared, and the cameras watch shelves rather than people. The retailer gains sales, accurate records and brand revenue. Employees lose drudgery and share bonuses. Shoppers find items and wait less, provided the system stores counts, not faces, which also keeps it within India's Digital Personal Data Protection Act, 2023. Brands are the least obvious winner and the most important for a thin-margin chain: out-of-stocks cost manufacturers about $23 million per $1 billion of sales, so a brand already paying for slotting and field merchandisers has reason to pay for proof that its products are on the shelf.",
}

export const littlesLaw = {
  headline: "By Little's Law, a faster, surer cycle needs less stock",
  terms: [
    { symbol: 'I', name: 'Inventory', before: '', after: 'about 5% less safety stock', extra: '+ about ₹7 lakh of cameras per store' },
    { symbol: 'R', name: 'Throughput rate', before: '', after: 'more sold per shelf-hour', extra: 'lanes open on measured queues' },
    { symbol: 'T', name: 'Throughput time', before: 'about 2.5 hours', after: 'about 30 minutes', extra: '' },
  ],
  source: 'Table B1. Timings assume a 14-hour trading day; 5% less safety stock is our assumption.',
  notes:
    "In this course's terms. Throughput time for the replenishment cycle, shelf empty to refilled, falls from about 2.5 hours to about 30 minutes, and a frozen record now corrects at the next scan instead of the next stock count. Throughput rate rises in two places: units sold per shelf-hour, because fewer hours are lost to empty shelves, about 1% of sales in our base case; and shoppers served per peak hour, because lanes open on measured queues. Assets move both ways. By Little's Law, inventory equals throughput rate times throughput time, so a shorter, more reliable cycle holds the same availability with less safety stock; we assume 5% less. Fixed assets rise by about ₹7 lakh per store for cameras, edge devices and installation.",
}

export const evidence = {
  headline: 'The research shows large effects; our model assumes a small one',
  axis: [0, 10, 20, 30],
  rows: [
    { mechanism: 'Accuracy', text: 'One store-wide stocktake at a UK grocer', lo: 11.2, hi: 11.2, label: '+11.2% sales in two months' },
    { mechanism: 'Speed', text: 'Shelf scanning at Schnucks', lo: 20, hi: 30, label: '20–30% fewer out-of-stocks' },
    { mechanism: 'Resource allocation', text: 'One associate recovering misplaced stock', lo: 22.4, hi: 22.7, label: '+22.4–22.7% sales' },
  ],
  ours: { mechanism: 'Our base case', text: 'Sales recovered in our model', lo: 1, hi: 1, label: 'about 1% of sales' },
  source:
    'Rekik et al. (2025), one store pair; Schnucks via NACS (2021), company-reported; Lee, Kesavan & Deshpande (2021), apparel retailers. See Appendix L.',
  notes:
    "Why does it work? Three mechanisms. Accuracy: a camera is an independent count every 30 minutes instead of once a quarter; at a UK grocer a single store-wide stocktake raised sales 11.2% over two months against a control store. Speed: when stock is already in the backroom, the fix is simply noticing; Schnucks reported its shelf scanning was 14 times as efficient as manual scans and cut out-of-stocks 20 to 30%. Resource allocation: conversion falls as traffic rises, so footfall data tells managers which hours need people; one associate assigned to recover misplaced stock raised sales over 22% at two apparel retailers. These are single studies and company reports, so our base case assumes only about 1% of sales recovered.",
}

export const people = {
  headline: 'Cameras automate the looking; people keep the doing',
  ends: [
    { name: 'Automated', detail: 'machine work' },
    { name: 'Augmented', detail: 'people, better directed' },
  ],
  roles: [
    { name: 'Inventory auditor', detail: 'counts confirmed by camera', at: 0.08, tier: 'up' },
    { name: 'Brand merchandiser', detail: 'from checking shelves to fixing them', at: 0.5, tier: 'down' },
    { name: 'Checkout supervisor', detail: 'opens lanes on queue alerts', at: 0.7, tier: 'upFar' },
    { name: 'Shelf associate', detail: 'a task with location and quantity', at: 0.85, tier: 'down' },
    { name: 'Store manager', detail: 'reviews weekly gap reports', at: 0.98, tier: 'up' },
  ] as { name: string; detail: string; at: number; tier: 'up' | 'upFar' | 'down' }[],
  proof: "Lowe's freed 80 hours of staff time per store each week, and paid store managers $5,000 bonuses from the gains.",
  source: "Table D1. Lowe's figures via AI News; Pierce, Snow & McAfee (2015).",
  notes:
    "Automate or augment? Both. Searching for gaps, counting stock and checking planograms become machine work, so auditor roles shrink. Refilling, helping shoppers and fixing problems stay human and become better directed: the associate gets a task with location and quantity, the supervisor opens lanes on queue alerts, the manager reviews weekly reports, and brand merchandisers shift from checking shelves to fixing them. US deployments point to redeployment, not layoffs: Schnucks did not count labour savings in its rollout decision, and Lowe's freed 80 non-productive hours per store a week and paid bonuses tied to the gains. The risk is cameras that watch people. In 392 restaurants, monitoring raised productivity by changing behaviour, which supports monitoring the process, not scoring individuals. So we recommend a written rule that shelf footage is never used for discipline.",
}

export const future = {
  headline: 'Once every shelf is measured, the shelf itself can be sold',
  loop: ['Cameras see every shelf', 'Data on gaps, footfall and placement', 'Brands pay for audits, media and placement priced on lift', 'That revenue helps pay for the system'],
  margins: [
    { label: 'Retail media, gross margin', value: 70 },
    { label: 'Grocery, net margin', value: 5 },
  ],
  india: 'Indian retail media: about ₹24,280 crore in 2025, almost all of it online.',
  source: 'Coresight via BW Marketing World; exchange4media; Chandon et al. (2009); Kroger in 500 stores via Supermarket News.',
  notes:
    "Once cameras see every shelf, the retailer can sell what it measures. Shelf space can be priced on performance: going from 4 to 12 facings lifted choice from 7.7% to 8.8%, while eye-level drew attention but did not significantly change choice, so placement should be priced on measured lift, not habit. Layout can be redesigned on evidence: move a fixture, measure for two weeks, keep or revert. And in-store media becomes sellable. Onsite retail media earns about 70% gross margins, against a 5% net margin on groceries. Indian retail media is about ₹24,280 crore in 2025, almost all online, because marketers see in-store media as a black box. Kroger is adding ad screens in 500 stores tied to its data. Measured footfall opens that budget to physical grocery.",
}

export const rollout = {
  headline: 'Start with five stores, and let the numbers decide each next step',
  phases: [
    { name: 'Pilot', detail: '3 months, 5 stores against 5 matched stores', from: 0, to: 0.31 },
    { name: 'Scale', detail: 'more stores, fast-moving aisles first', from: 0.37, to: 0.64 },
    { name: 'Sell to brands', detail: 'shelf data and in-store media', from: 0.7, to: 1 },
  ],
  gates: [
    { at: 0.34, question: 'Out-of-stock hours down at least 15%?' },
    { at: 0.67, question: 'Does it pay without brand money?' },
  ],
  risk: 'The trap is over-automating. Amazon pulled Just Walk Out from its US Fresh grocery stores in 2024. We keep people in charge and use cameras to direct them.',
  source: 'Figure 5 and Table G1. Amazon: Supermarket News (2024).',
  notes:
    "How we would roll it out. A three-month pilot in five stores against five matched control stores. Scale only if out-of-stock hours fall by at least 15%. Sell data and media to brands only once the case works without them. The main risk is over-automating: Amazon removed Just Walk Out from its US Fresh grocery stores after shoppers said they wanted to see deals and receipts as they shopped. Our design keeps people central and uses cameras to direct them. Other risks: detection errors on dense local packaging, handled by staff confirming every alert, which also trains the model; privacy, handled by processing video in the store and storing counts, not faces; staff distrust, handled by the no-discipline rule and shared bonuses; and data nobody acts on, handled by turning every alert into a task with an owner and a closing photo. Thank you.",
}

export type ScenarioKey = 'conservative' | 'base' | 'upside'

export const businessCase = {
  // The headline is filled from the chart's computed net and the scenario's payback.
  headline: (net: string, payback: string) => `₹${net} lakh a year per store, paid back in about ${payback}`,
  unit: '₹ lakh per store per year',
  steps: ['Recovered profit', 'Lower shrink', 'Less stock', 'Labour freed', 'Brand revenue', 'System cost'],
  netLabel: 'Net',
  scenarios: {
    conservative: { label: 'Cautious', values: [6.0, 0, 4.2, 1.8, 0, -8.8], payback: '15 months' },
    base: { label: 'Base', values: [15.0, 4.0, 4.2, 1.8, 7.0, -8.8], payback: '3 months' },
    upside: { label: 'Optimistic', values: [18.0, 8.0, 4.2, 1.8, 14.0, -8.8], payback: '2 months' },
  } as Record<ScenarioKey, { label: string; values: number[]; payback: string }>,
  order: ['conservative', 'base', 'upside'] as ScenarioKey[],
  paragraphs: [
    'For a store selling ₹100 crore a year, the system costs about ₹8.8 lakh a year.',
    'Even with no money from brands and a smaller drop in stockouts, the store still comes out ahead.',
    'Across 400 such stores, the base case is worth about ₹93 crore a year.',
  ],
  source:
    'Our model: stockouts cut 25%, 15% gross margin; costs are our estimates as vendors do not publish prices. Details in the report.',
  notes:
    'Does it pay on a thin margin? The system costs ₹7 lakh of capex written off over three years plus ₹6.5 lakh a year to run. A store selling ₹100 crore keeps about ₹5 crore as profit. The system costs about ₹8.8 lakh a year. The biggest gain is recovered sales: cutting stockouts by a quarter brings back ₹15 lakh of gross profit. Add lower shrink, less safety stock, freed staff time and some brand money, and the store nets about ₹23 lakh a year, 4.6% more profit, with capex back in about three months. Even in the cautious case it still makes ₹3.2 lakh. Rollout: a five-store pilot against five matched stores, scale only if empty-shelf hours fall at least 15%, then sell shelf data and media to brands in year two.',
}
