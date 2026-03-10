/**
 * Room catalogue.
 * TODO (API): Replace with GET /api/rooms or GET /api/rooms?checkIn=&checkOut=&guests=
 * Each room maps 1:1 to a room type in the PMS (Property Management System).
 * The `pmsCode` field is the PMS room type identifier to use when creating reservations.
 */
const ROOMS = [
  {
    id:           'kozi-twin',
    slug:         'kozi-twin',
    pmsCode:      'KZT',             // TODO: confirm PMS room type code
    name:         'Kozi Twin',
    category:     'Twin Rooms',
    price:        128,
    currency:     'RM',
    size:         '24 m² / 255 ft²',
    maxGuests:    2,
    maxAdults:    2,
    maxChildren:  1,
    bedType:      '2 Single Beds (Slumberland)',
    floor:        'Various',
    totalUnits:   71,
    badge:        'AVAILABLE',
    badgeColor:   '#2D6A4F',
    rating:       4.7,
    reviewCount:  312,
    shortDescription:
      'Designed for comfort and convenience, the Twin Room features two single beds, elegant interiors, and essential amenities for a relaxing stay. From RM 128/night.',
    longDescription:
      'The Kozi Twin room features fashionable interiors designed with relaxation in mind. Two premium Slumberland twin beds dressed in fresh linen offer a restful night\'s sleep, while city-facing windows let natural light fill the 24 m² space. Ideal for friends, colleagues, or guests who prefer separate sleeping arrangements.',
    amenities: [
      'Free Wireless Internet',
      'Sharp Aquos LED TV (40")',
      'Independent A/C Controls',
      'Mini Fridge',
      'Safe Deposit Box',
      'Cable TV Channels',
      'Electric Water Boiler',
      'Slumberland Mattress',
      'Daily Housekeeping',
      'Complimentary Toiletries',
    ],
    images: [
      'https://www.regattasuites.com.my/wp-content/uploads/2020/02/Deluxe-Twin-Bed-2.jpg',
      'https://www.regattasuites.com.my/wp-content/uploads/2020/02/Deluxe-Twin-Bed-3.jpg',
      'https://www.regattasuites.com.my/wp-content/uploads/2024/05/Deluxe-Twin-Bed.jpg',
    ],
    checkIn:  '2:00 PM',
    checkOut: '12:00 Noon',
  },
  {
    id:           'kozi-queen',
    slug:         'kozi-queen',
    pmsCode:      'KZQ',
    name:         'Kozi Queen',
    category:     'Queen Rooms',
    price:        148,
    currency:     'RM',
    size:         '24 m² / 255 ft²',
    maxGuests:    2,
    maxAdults:    2,
    maxChildren:  1,
    bedType:      '1 Queen Bed (Slumberland)',
    floor:        'Various',
    totalUnits:   71,
    badge:        'POPULAR',
    badgeColor:   '#1D4ED8',
    rating:       4.8,
    reviewCount:  489,
    shortDescription:
      'Experience elevated comfort in our Kozi Queen room, offering a plush queen bed with crisp linens in a refined 24 m² space. From RM 148/night.',
    longDescription:
      'The Kozi Queen room combines understated elegance with all the comforts of home. A premium Slumberland queen bed anchors the room while the city view and warm ambient lighting create an inviting atmosphere. Perfect for couples or solo travellers seeking a cosy yet stylish retreat.',
    amenities: [
      'Free Wireless Internet',
      'Sharp Aquos LED TV (40")',
      'Independent A/C Controls',
      'Mini Fridge',
      'Safe Deposit Box',
      'Cable TV Channels',
      'Electric Water Boiler',
      'Slumberland Mattress',
      'Daily Housekeeping',
      'Complimentary Toiletries',
    ],
    images: [
      'https://www.regattasuites.com.my/wp-content/uploads/2024/05/Deluxe-Queen-Bed.jpg',
      'https://www.regattasuites.com.my/wp-content/uploads/2020/02/Kozi-Queen-1.jpg',
      'https://www.regattasuites.com.my/wp-content/uploads/2020/02/Kozi-Queen-3.jpg',
    ],
    checkIn:  '2:00 PM',
    checkOut: '12:00 Noon',
  },
  {
    id:           'balcony-suites',
    slug:         'balcony-suites',
    pmsCode:      'BKS',
    name:         'Balcony Suites',
    category:     'Balcony Suites',
    price:        188,
    currency:     'RM',
    size:         '24 m² / 255 ft²',
    maxGuests:    3,
    maxAdults:    3,
    maxChildren:  1,
    bedType:      '1 King Bed (Slumberland) + Sofa Bed',
    floor:        'Upper Floors',
    totalUnits:   null,          // select units — confirm with PMS
    badge:        'BEST VALUE',
    badgeColor:   '#B45309',
    rating:       4.9,
    reviewCount:  276,
    shortDescription:
      'Experience elevated comfort in our Balcony Suites, featuring elegant interiors and a private balcony perfect for relaxing moments. From RM 188/night.',
    longDescription:
      'Step into the Balcony Suites and enjoy the luxury of your own private balcony overlooking the cityscape. The spacious king bed and sofa bed provide flexible sleeping arrangements while floor-to-ceiling windows bathe the room in natural light. A refined retreat for guests who appreciate the finer details.',
    amenities: [
      'Private Balcony',
      'Free Wireless Internet',
      'Sharp Aquos LED TV (40")',
      'Independent A/C Controls',
      'Mini Fridge',
      'Safe Deposit Box',
      'Cable TV Channels',
      'Electric Water Boiler',
      'Slumberland Mattress',
      'Sofa Bed',
      'Daily Housekeeping',
      'Complimentary Toiletries',
    ],
    images: [
      'https://www.regattasuites.com.my/wp-content/uploads/2024/05/Balcony-King.jpg',
      'https://www.regattasuites.com.my/wp-content/uploads/2020/02/King-Bed-6.jpg',
      'https://www.regattasuites.com.my/wp-content/uploads/2020/02/King-Bed-3.jpg',
    ],
    checkIn:  '2:00 PM',
    checkOut: '12:00 Noon',
  },
  {
    id:           'rentap-family',
    slug:         'rentap-family',
    pmsCode:      'RTF',
    name:         'Family Room',
    category:     'Family Room',
    price:        238,
    currency:     'RM',
    size:         '24 m² / 255 ft²',
    maxGuests:    6,
    maxAdults:    4,
    maxChildren:  4,
    bedType:      '1 Queen Bed + Fun Bunk Bed with Slide',
    floor:        'Select Floors',
    totalUnits:   24,
    badge:        'FAMILY',
    badgeColor:   '#6D28D9',
    rating:       4.9,
    reviewCount:  198,
    shortDescription:
      'Designed for families, this room includes a cosy main bed and bunk beds, creating a comfortable space for both parents and children. From RM 238/night.',
    longDescription:
      'Inspired by the legendary Iban warrior Rentap, the Family Room is an adventure in itself. A queen bed for parents and a fun bunk bed complete with a slide for the kids make this the most memorable room in the hotel. Ideal for families seeking both comfort and a unique experience that the little ones will talk about long after checkout.',
    amenities: [
      'Fun Bunk Bed with Slide',
      'Free Wireless Internet',
      'Sharp Aquos LED TV (40")',
      'Independent A/C Controls',
      'Mini Fridge',
      'Safe Deposit Box',
      'Cable TV Channels',
      'Electric Water Boiler',
      'Slumberland Mattress',
      'Daily Housekeeping',
      'Complimentary Toiletries',
    ],
    images: [
      'https://www.regattasuites.com.my/wp-content/uploads/2024/05/Rentap-Family-Room.jpg',
      'https://www.regattasuites.com.my/wp-content/uploads/2020/02/Rentap-Family-Room-2.jpg',
      'https://www.regattasuites.com.my/wp-content/uploads/2020/02/Rentap-Family-Room-4.jpg',
    ],
    checkIn:  '2:00 PM',
    checkOut: '12:00 Noon',
  },
];

/** Filter categories matching the Booking page filter tabs */
const ROOM_CATEGORIES = ['All Rooms', 'Twin Rooms', 'Queen Rooms', 'Balcony Suites', 'Family Room'];

/** Guest options for the search bar dropdown */
/**
 * Guest options for the search bar dropdown.
 * `value` must be "adults,children" numeric format — the SearchBar
 * splits on "," and parses each part as Number to store in BookingContext.
 */
const GUEST_OPTIONS = [
  { label: '1 Adult',              value: '1,0' },
  { label: '2 Adults',             value: '2,0' },
  { label: '2 Adults, 1 Child',    value: '2,1' },
  { label: '2 Adults, 2 Children', value: '2,2' },
  { label: '3 Adults',             value: '3,0' },
  { label: '4–6 Guests (Family)',  value: '4,2' },
];

export { ROOMS, ROOM_CATEGORIES, GUEST_OPTIONS };
