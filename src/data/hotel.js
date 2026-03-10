/**
 * Hotel metadata.
 * TODO (API): Replace with GET /api/hotel/info
 */
const HOTEL_INFO = {
  name:        'Regatta Suites Kuching',
  tagline:     'Urban living redefined. A cosy home away from home in the heart of Kuching city, Sarawak.',
  owner:       'Kozi Square Sdn Bhd',
  address:     'Unit G-31, Ground Floor, LD Legenda, Jalan Tun Abang Haji Openg, 93000 Kuching, Sarawak.',
  phone1:      '+60 82-230099',
  phone2:      '+60 82-231999',
  whatsapp:    '+60169200847',
  email:       'reservation@regattasuites.com.my',
  totalRooms:  144,
  checkIn:     '2:00 PM',
  checkOut:    '12:00 Noon',
  deposit:     'RM 200 (refundable)',
  coordinates: { lat: 1.5498, lng: 110.3523 },
};

import logo from "../assets/logo.png"

/**
 * New Regatta crest logo (oval badge with sailing illustration + REGATTA wordmark).
 * NOTE: Facebook CDN URLs expire — replace with a self-hosted asset for production.
 * TODO: Save logo to /public/logo.png and use process.env.PUBLIC_URL + '/logo.png'
 */
const LOGO_URL = logo;

const NAV_LINKS = [
  { label: 'Home',       path: '/' },
  { label: 'Rooms',       path: '/#rooms' },
  { label: 'Facilities', path: '/#facilities' },
  { label: 'Contact',    path: '/#contact' },
];

const FOOTER_LINKS = {
  worldOfRegatta: [
    { label: 'About Us',         href: '#' },
    { label: 'Rosewood Impacts', href: '#' },
    { label: 'Developers',       href: '#' },
    { label: 'Careers',          href: '#' },
    { label: 'Media',            href: '#' },
  ],
  hotelServices: [
    { label: 'Infinity Pool',      href: '#' },
    { label: 'Sky Gym',            href: '#' },
    { label: 'Theatre Restaurant', href: '#' },
    { label: 'Meetings & Banquet', href: '#' },
    { label: 'MICE Events',        href: '#' },
    { label: 'Career',             href: '#' },
  ],
};

export { HOTEL_INFO, NAV_LINKS, FOOTER_LINKS, LOGO_URL };
