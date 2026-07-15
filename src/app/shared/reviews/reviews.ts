/* CONSTANTS / SETTINGS */
export const MAX_REVIEW_RATING = 5;
export const REVIEW_ROTATION_INTERVAL_MS = 10000;

export interface Review {
  id: number;
  quote: string;
  attribution: string;
  rating: number;
  source?: string;
  year?: string;
  featured?: boolean;
}

export const REVIEWS: Review[] = [
  {
    id: 1,
    quote: "My mother-in-law resides at The Shepherds Inn and very much enjoys it. They have attentive staff and " +
    "many activities, a games night, jigsaw puzzles, an aviary with darling birds to entertain the residents, a " +
    "beautiful garden patio to name a few. Very pleased with how she is cared for and tended to. Nice place. Highly recommend!",
    attribution: 'Loving Family',
    rating: 5,
    source: 'Senior Advice',
    year: '2019',
    featured: true
  },
  {
    id: 2,
    quote: "I'm very pleased with this facility. It's calm and very nice - residents seem happy, the staff are consistently " +
    "caring and helpful, and my mom gets excellent dementia support and care; the food is very good and gives me confidence " +
    "she's well looked after.",
    attribution: 'Loved one of resident',
    rating: 4,
    source: 'Mirador Living',
    year: '2026'
  },
  {
    id: 3,
    quote: "My mother is getting excellent care here. The staff is so caring. The food is very good. My mom has dementia, and " +
    "they are working with that and helping her cope and function to the best of her ability, She seems happy!",
    attribution: 'R.V.',
    rating: 5,
    source: 'Google',
    year: '2023'
  },
  {
    id: 4,
    quote: "Calm, very nice, retirement facility. Happy residents. Helpful, caring staff.",
    attribution: 'K.S.',
    rating: 5,
    source: 'Google',
    year: '2023'
  },
  {
    id: 5,
    quote: "",
    attribution: 'F.J.',
    rating: 5,
    source: 'Google',
    year: '2022'
  }
];