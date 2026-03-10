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
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=700&q=80',
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
    image: 'https://images.unsplash.com/photo-1559526324-593bc073d938?auto=format&fit=crop&w=700&q=80',
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
    image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&w=700&q=80',
    featured:    false,
  },
];

export { DINING };
