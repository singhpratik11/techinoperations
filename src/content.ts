// Every word and number shown in the deck lives here. Edit text in this file only;
// the components read from it and never hard-code copy.

export const deck = {
  title: 'Seeing the Shelf',
  total: 6,
}

export const title = {
  heading: 'Seeing the Shelf',
  subheading: 'What computer vision does to the way a grocery store runs',
  byline: 'Operations Management | BITSoM | Pratik Singh and team',
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

// Shared by screens 3 and 4 so both draw the same axis at the same scale.
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
  source:
    'DeHoratius & Raman (2008); 64.7% at a UK grocer, Rekik et al. (2025). Patrol timing (every 4–5 h) is our assumption.',
  notes:
    'The last unit sells and nobody is told. Staff check aisles every four to five hours, so a gap waits on average about two and a half hours. If the backroom is empty too, the record still says in stock, so the automatic reorder never fires, and the shelf can stay empty until the next full stock count. Records are mostly wrong: 65% in a US chain, 64.7% at a UK grocer. About 8% of items are missing at any moment, costing around 4% of sales, for a business that keeps about 5 rupees of every 100. Brands send people to check shelves and checkout lanes open by eye for the same reason: nobody can see the store in real time.',
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

export const changes = {
  headline: 'What changes for the store, its staff and its suppliers',
  columns: ['Today', 'With cameras'],
  rows: [
    { label: 'Empty shelf to refilled', today: 'about 2.5 hours', after: 'about 30 minutes' },
    { label: 'Sales lost to empty shelves', today: 'about 4% of sales', after: 'a quarter of that recovered' },
    { label: 'Safety stock', today: 'extra buffer for blind spots', after: 'about 5% less' },
    { label: 'Staff time', today: 'walking aisles looking for gaps', after: 'fixing what the camera found' },
    { label: 'Brands', today: 'pay for shelf access, unmeasured', after: 'pay for measured results' },
  ],
  closing: 'It only works for everyone if the cameras watch shelves, not people.',
  notes:
    "In this course's terms: throughput time for refilling drops from about 2.5 hours to 30 minutes. Throughput rate rises because fewer sales are lost to empty shelves; we assume a quarter of that 4% comes back. Assets: by Little's Law, inventory = throughput rate × throughput time, so a shorter, reliable cycle needs about 5% less safety stock, offset by about ₹7 lakh of cameras per store. People: the technology automates the looking and augments the doing; Lowe's freed 80 hours of staff time per store a week and shared the gains as bonuses. Brands lose about $23M for every $1B of sales to empty shelves, so they can pay for proof instead of access. Win-win-win-win holds only if footage is never used to discipline staff and shoppers are counted, not identified.",
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
    'We would start with five stores and compare them against five without cameras.',
  ],
  source:
    'Our model: stockouts cut 25%, 15% gross margin; costs are our estimates as vendors do not publish prices. Details in the report.',
  notes:
    'Does it pay on a thin margin? A store selling ₹100 crore keeps about ₹5 crore as profit. The system costs about ₹8.8 lakh a year. The biggest gain is recovered sales: cutting stockouts by a quarter brings back ₹15 lakh of gross profit. Add lower shrink, less safety stock, freed staff time and some brand money, and the store nets about ₹23 lakh a year, 4.6% more profit, with capex back in about three months. Even in the cautious case it still makes ₹3.2 lakh. Rollout: a five-store pilot against five matched stores, scale only if empty-shelf hours fall at least 15%, then sell shelf data and media to brands in year two. Thank you.',
}
