export interface PressRelease {
  id: string;
  title: string;
  publication: string;
  date: string;
  image: string;
  excerpt: string;
  link: string;
}

export const pressReleases: PressRelease[] = [
  {
    id: '1',
    title: 'Amit Kumar Sood CEO Tivoli Hospitality',
    publication: 'Today\'s Traveller',
    date: 'Recent',
    image: 'https://www.todaystraveller.net/wp-content/uploads/2025/04/WhatsApp-Image-2025-04-28-at-12.53.38-PM.jpeg',
    excerpt: 'An exclusive interview with Amit Kumar Sood, CEO of Tivoli Hospitality, discussing the company\'s vision and growth strategies.',
    link: 'https://www.todaystraveller.net/amit-kumar-sood-ceo-tivoli-hospitality/'
  },
  {
    id: '2',
    title: 'Tivoli Hospitality Group Launches Omnia by Tivoli',
    publication: 'Economic Times Hospitality',
    date: 'Recent',
    image: 'https://lh3.googleusercontent.com/gps-cs-s/AC9h4no1tDxyj-fCv6jCFGoketlznO9oqWHCqYJT65sDOCGmKwSJW8uUwMjrrLi04p8XdJDk0V6kZPMMGKzI_wpqAlafbQLKCX06bfyzgCZcgTHGvMKvJaeHgKA20G6czXGBOgBrnDi3VdT_VtHs=s1360-w1360-h1020-rw',
    excerpt: 'Tivoli Hospitality Group launches Omnia by Tivoli, a premier luxury event venue in Dwarka, Delhi.',
    link: 'https://hospitality.economictimes.indiatimes.com/news/operations/food-and-beverages/tivoli-hospitality-group-launches-omnia-by-tivoli-a-premier-luxury-event-venue-in-dwarka-delhi/121724426'
  }
];