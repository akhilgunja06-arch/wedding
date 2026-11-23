export interface SlideLink {
  /** Section id used as the scroll target. */
  id: string;
  number: string;
  label: string;
  telugu: string;
  /** Short line shown beside the deck progress. */
  hint: string;
}

/**
 * The eight chapters of the invitation. Every section rendered with a
 * matching `data-slide` attribute belongs to that chapter.
 */
export const slides: SlideLink[] = [
  {
    id: 'blessings',
    number: '01',
    label: 'Divine Welcome',
    telugu: 'దివ్య స్వాగతం',
    hint: 'Venkateswara Swamy & Padmavathi Ammavaru',
  },
  {
    id: 'invitation',
    number: '02',
    label: 'Wedding Invitation',
    telugu: 'వివాహ ఆహ్వానం',
    hint: 'Tanusha & Mahesh',
  },
  {
    id: 'couple',
    number: '03',
    label: 'Bride & Groom',
    telugu: 'వధూవరులు',
    hint: 'Two hearts, one promise',
  },
  {
    id: 'details',
    number: '04',
    label: 'Date & Muhurtham',
    telugu: 'తేదీ మరియు ముహూర్తం',
    hint: '13 December 2026 · 08:22 AM IST',
  },
  {
    id: 'saptapadhi',
    number: '05',
    label: 'Sapta Padi',
    telugu: 'సప్తపది',
    hint: 'Seven steps, seven promises',
  },
  {
    id: 'venue',
    number: '06',
    label: 'Wedding Venue',
    telugu: 'వివాహ వేదిక',
    hint: 'Lingala · Mandavalli Mandal',
  },
  {
    id: 'gallery',
    number: '07',
    label: 'Wedding Memories',
    telugu: 'వివాహ జ్ఞాపకాలు',
    hint: 'Moments of us',
  },
  {
    id: 'finale',
    number: '08',
    label: 'Final Blessings',
    telugu: 'ముగింపు ఆశీర్వాదాలు',
    hint: 'With love, Tanusha & Mahesh',
  },
];
