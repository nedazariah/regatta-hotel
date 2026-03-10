import bitmeImg from '../assets/bite-me.png';
import relaxImg from '../assets/relax-unwind.png';
import cuisineImg from '../assets/local-cuisine.png';
/**
 * Dining & F&B outlets.
 * TODO (API): Replace with GET /api/dining
 * TODO (Images): Replace Unsplash placeholders with actual hotel photography
 */
const DINING = [
  {
    id:          'local-cuisine',
    name:        'Local Cuisine',
    label:       'LOCAL CUISINE',
    subtitle:    'Authentic Sarawak Flavours',
    description: 'Savour the rich, spicy flavours of authentic Sarawak cuisine prepared by our talented culinary team. A true taste of Borneo.',
    hours:       '7:00 AM – 10:00 PM',
    type:        'Restaurant',
    // TODO: Replace with actual local cuisine photo (Sarawak laksa, kolo mee, etc.)
    image: cuisineImg,
    featured:    false,
  },
  {
    id:          'tabas-lounge-bar',
    name:        'Relax and Unwind',
    label:       'RELAX AND UNWIND',
    subtitle:    'Tabas Lounge',
    description: 'Relax at Tabas Lounge by Regatta Suites, where cosy ambiance meets refined comfort.',
    hours:       '11:00 AM – 12:00 AM',
    type:        'Lounge & Bar',
    // TODO: Replace with actual Tabas Lounge bartender/staff photo
    image: relaxImg,
    featured:    true,
  },
  {
    id:          'bite-me-cafe',
    name:        'Bite Me Cafe',
    label:       'BITE ME CAFE',
    subtitle:    'Artisan Coffee & Bites',
    description: 'Start your morning right at Bite Me Cafe with handcrafted coffee and freshly made bites.',
    hours:       '8:00 AM – 6:00 PM',
    type:        'Café',
    // TODO: Replace with actual Bite Me Cafe photo
    image: bitmeImg,
    featured:    false,
  },
];

export { DINING };
