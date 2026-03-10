import poolImg from '../assets/pool.png';
import gymImg from '../assets/gym.png';
import tabasImg from '../assets/tabas.png';
import meetingImg from '../assets/meeting.png';
/**
 * Hotel facilities.
 * TODO (API): Replace with GET /api/facilities
 * TODO (Images): Replace Unsplash placeholders with actual hotel photography
 */
const FACILITIES = [
  {
    id:          'infinity-pool',
    name:        'Infinity Pool',
    label:       'INFINITY POOL',
    category:    'Leisure',
    description: 'Take a dip in our stunning rooftop infinity pool and soak in sweeping views of Kuching city as the sun sets over the horizon.',
    hours:       '7:00 AM – 10:00 PM',
    floor:       'Rooftop',
    // TODO: Replace with actual hotel pool photo
    image: poolImg,
  },
  {
    id:          'sky-gym',
    name:        'Sky Gym',
    label:       'FITNESS',
    category:    'Fitness',
    description: 'Stay active at our fully-equipped Sky Gym with panoramic city views to keep you motivated.',
    hours:       '6:00 AM – 11:00 PM',
    floor:       'Upper Level',
    // TODO: Replace with actual hotel gym photo
    image: gymImg,
  },
  {
    id:          'tabas-lounge',
    name:        'Tabas Lounge',
    label:       'TABAS LOUNGE',
    category:    'Dining & Drinks',
    description: 'Relax at Tabas Lounge by Regatta Suites, where cosy ambiance meets refined comfort.',
    hours:       '11:00 AM – 12:00 AM',
    floor:       'Ground Floor',
    // TODO: Replace with actual Tabas Lounge photo
    image: tabasImg,
  },
  {
    id:          'meetings-banquet',
    name:        'Meetings & Banquet',
    label:       'MEETINGS',
    category:    'Business',
    description: 'Host your next corporate event or celebration in our versatile meeting and banquet spaces.',
    hours:       'By appointment',
    floor:       'Ground Floor',
    // TODO: Replace with actual banquet hall photo
    image: meetingImg,
  },
];

export { FACILITIES };
