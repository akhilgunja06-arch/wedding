/**
 * ─────────────────────────────────────────────────────────────
 *  WEDDING CONFIGURATION — edit everything about the wedding here
 * ─────────────────────────────────────────────────────────────
 *  Every name, date, venue, message, photograph and music track used
 *  across the invitation is defined in this single file.
 */

export type PhotoGroup = 'story' | 'groom' | 'bride' | 'couple';

export interface PhotoSlot {
  id: string;
  label: string;
  caption?: string;
  /** Permanent image path (place the file in /public). Leave empty for a frame only. */
  src?: string;
  group: PhotoGroup;
  orientation?: 'portrait' | 'landscape' | 'square';
}

export interface SaptaPadhiStep {
  number: string;
  title: string;
  titleTelugu: string;
  /** Traditional vow word chanted with the step, in Telugu script and transliteration. */
  vowWord: string;
  vowWordLatin: string;
  /** Short traditional Telugu sentence for the step. */
  vowTelugu: string;
  /** Simple Telugu meaning of the vow. */
  meaningTelugu: string;
  meaningEnglish: string;
  icon: 'grain' | 'strength' | 'prosperity' | 'happiness' | 'family' | 'friendship' | 'forever';
}

export interface Deity {
  id: string;
  name: string;
  teluguName: string;
  mantraTelugu: string;
  mantraLatin: string;
  description: string;
  image: string;
  alt: string;
  credit: string;
  creditUrl: string;
}

const venkateswaraImage = '/images/venkateswara.jpg';
const padmavathiImage = '/images/padmavathi.jpg';

export const wedding = {
  couple: {
    groom: {
      name: 'Mahesh',
      teluguName: 'మహేష్',
      role: 'PELIKODUKU',
      roleTelugu: 'పెళ్లికొడుకు',
      roleEnglish: 'The Groom',
    },
    bride: {
      name: 'Tanusha',
      teluguName: 'తనుష',
      role: 'PELLIKUTHURU',
      roleTelugu: 'పెళ్లికూతురు',
      roleEnglish: 'The Bride',
    },
    /** Order used in the headline: TANUSHA ❤️ MAHESH */
    display: 'TANUSHA ❤️ MAHESH',
    monogram: 'T & M',
  },

  wedding: {
    /** Countdown target — 13 December 2026, 08:22 AM IST */
    dateISO: '2026-12-13T08:22:00+05:30',
    timeZone: 'Asia/Kolkata',
    /** Displayed date and time (edit together with dateISO) */
    dateDisplay: '13-12-2026',
    dateLong: '13 December 2026',
    timeDisplay: '08:22 AM',
    muhurthamLabel: 'Muhurtham',
    dayOverride: '', // leave empty to calculate the weekday automatically
  },

  venue: {
    name: 'Lingala',
    lines: ['Lingala', 'Mandavalli Mandal', 'Eluru District', 'Andhra Pradesh, India'],
    address: 'Lingala, Mandavalli Mandal, Eluru District, Andhra Pradesh, India',
  },

  families: {
    /** Leave empty to show a neutral family label instead of invented names. */
    groomParents: '',
    brideParents: '',
    groomLabel: "Groom's Family",
    brideLabel: "Bride's Family",
  },

  messages: {
    blessingTelugu: 'శ్రీ వెంకటేశ్వర స్వామి వారి ఆశీస్సులతో',
    blessingEnglish:
      'With the divine blessings of Lord Venkateswara, we invite you to celebrate the wedding of Tanusha and Mahesh.',
    welcomeTelugu: 'శుభ వివాహ ఆహ్వానం',
    welcomeSubtitle: 'With the blessings of our families',
    welcomeEnglish:
      'With immense joy and happiness, we cordially invite you and your family to celebrate our wedding ceremony.',
    welcomeTeluguMessage:
      'మా వివాహ మహోత్సవానికి విచ్చేసి నూతన వధూవరులను ఆశీర్వదించవలసిందిగా మనస్ఫూర్తిగా ఆహ్వానిస్తున్నాము.',
    deitiesEyebrow: 'Divine Blessings',
    deitiesTitle: 'WITH THE GRACE OF THE DIVINE',
    deitiesTelugu: 'శ్రీ వేంకటేశ్వర స్వామి · శ్రీ పద్మావతి అమ్మవారు ఆశీస్సులతో',
    deitiesIntro:
      'We begin our celebrations at the lotus feet of Lord Venkateswara and Goddess Padmavathi, seeking their blessings for the couple.',
    deitiesBlessingTelugu: 'శ్రీ వేంకటేశ్వర స్వామి కరుణతో · శ్రీ పద్మావతి అమ్మవారి ఆశీస్సులతో',
    deitiesBlessingEnglish:
      'May the divine couple bless Tanusha and Mahesh with love, harmony and a lifetime of togetherness.',
    detailsHeading: 'Wedding Celebration',
    detailsTelugu: 'వివాహ వేడుక',
    storyQuote:
      'Two hearts, one promise — sealed before our families, the sacred fire and the seven steps of a lifetime.',
    storyTelugu: 'రెండు హృదయాలు... ఒకే వాగ్దానం... జీవితాంతం ఒకే ప్రయాణం.',
    saptaTitle: 'THE SEVEN SACRED STEPS',
    saptaTelugu: 'సప్తపది – జీవితాంతం కలిసి నడిచే ఏడు అడుగులు',
    saptaIntro:
      'Before the sacred fire, the bride and groom take seven steps together. Each step is a vow that shapes a shared life.',
    saptaFinalHeading: 'SEVEN STEPS · SEVEN PROMISES · ONE LIFETIME',
    saptaFinalLine: 'SEVEN STEPS, ONE BEAUTIFUL JOURNEY, FOREVER.',
    saptaFinalTelugu:
      'ఏడు పవిత్ర వాగ్దానాలు... ఒకే అందమైన ప్రయాణం... జీవితాంతం కలిసి.',
    galleryHeading: 'Moments of Us',
    galleryTelugu: 'మా అందమైన క్షణాలు',
    familyHeading: 'Together With Our Families',
    familyTelugu: 'మా కుటుంబాలతో కలిసి',
    familyMessage:
      'Your gracious presence and blessings will make our special day even more memorable. We warmly invite you and your family to join our celebration.',
    finaleHeading: 'WE CORDIALLY INVITE YOU',
    finaleSubheading: 'Join Us To Celebrate The Beginning Of A Beautiful Journey.',
    finaleTelugu:
      'మీ రాకే మా ఆనందానికి మరింత అందం. తప్పక విచ్చేసి నూతన వధూవరులను ఆశీర్వదించండి.',
    footerNote: 'Thank you for celebrating with us.',
  },

  /** Background music. The included track is a public-domain nadaswaram recording. */
  music: {
    src: '/audio/wedding-theme.mp3',
    title: 'Nadaswaram — Traditional Wedding Instrumental',
    credit: 'Karukurichi P. Arunachalam · “Tamadamen Swami” · Public Domain Mark 1.0',
    creditUrl: 'https://archive.org/details/thodi-karukurichi-p.-arunachalam',
    /** Comfortable background level; the player starts at this volume. */
    defaultVolume: 0.5,
    /** If no file is found, a soft, generated tanpura ambience is used instead. */
    allowGeneratedFallback: true,
  },

  /** Devotional artwork used by the blessing and deity sections. */
  artwork: {
    venkateswaraImage,
    padmavathiImage,
    mandapImage: '/images/mandap.jpg',
  },

  /** The divine couple honoured in the devotional section. */
  deities: [
    {
      id: 'venkateswara',
      name: 'Sri Venkateswara Swamy',
      teluguName: 'శ్రీ వేంకటేశ్వర స్వామి',
      mantraTelugu: 'శ్రీ వెంకటేశ్వరాయ నమః',
      mantraLatin: 'Om Namo Venkatesaya',
      description:
        'The presiding deity of Tirumala, worshipped as Lord Vishnu, the protector of the universe.',
      image: venkateswaraImage,
      alt: 'Sri Venkateswara Swamy adorned with golden ornaments and colourful flower garlands',
      credit: 'Photo: Megala Shankar · CC BY-SA 4.0 · Wikimedia Commons',
      creditUrl: 'https://commons.wikimedia.org/wiki/File:Lord_Venkateswara_Swamy.jpg',
    },
    {
      id: 'padmavathi',
      name: 'Sri Padmavathi Ammavaru',
      teluguName: 'శ్రీ పద్మావతి అమ్మవారు',
      mantraTelugu: 'శ్రీ పద్మావత్యై నమః',
      mantraLatin: 'Om Sri Padmavatyai Namah',
      description:
        'Goddess Padmavathi, the consort of Lord Venkateswara, worshipped at Tiruchanur.',
      image: padmavathiImage,
      alt: 'Goddess Sri Padmavathi Ammavaru seated beneath an ornate golden temple arch',
      credit: 'Artwork: Banksboomer · CC BY-SA 4.0 · Wikimedia Commons',
      creditUrl: 'https://commons.wikimedia.org/wiki/File:Goddess_Padmavati.jpg',
    },
  ] as Deity[],

  /**
   * Photograph slots. Put your originals in /public/photos using these exact
   * file names, or upload them in the invitation itself via the photo manager.
   */
  photos: [
    {
      id: 'hero',
      label: 'Welcome Portrait',
      caption: 'Welcome',
      src: '/photos/couple-hero.jpg',
      group: 'story',
      orientation: 'portrait',
    },
    {
      id: 'stage',
      label: 'Couple — Decorated Stage',
      caption: 'On our wedding stage',
      src: '/photos/couple-stage.jpg',
      group: 'story',
      orientation: 'landscape',
    },
    {
      id: 'romantic',
      label: 'Couple — Romantic Portrait',
      caption: 'Our story',
      src: '/photos/couple-romantic.jpg',
      group: 'story',
      orientation: 'portrait',
    },

    { id: 'groom-1', label: 'Groom Portrait 1', src: '/photos/groom-portrait-1.jpg', group: 'groom', orientation: 'portrait' },
    { id: 'groom-2', label: 'Groom Portrait 2', src: '/photos/groom-portrait-2.jpg', group: 'groom', orientation: 'portrait' },
    { id: 'groom-3', label: 'Groom Traditional Dress Photo', src: '/photos/groom-traditional.jpg', group: 'groom', orientation: 'portrait' },
    { id: 'groom-4', label: 'Groom Family Photo', src: '/photos/groom-family.jpg', group: 'groom', orientation: 'landscape' },
    { id: 'groom-5', label: 'Groom Special Photo', src: '/photos/groom-special.jpg', group: 'groom', orientation: 'portrait' },

    { id: 'bride-1', label: 'Bride Portrait 1', src: '/photos/bride-portrait-1.jpg', group: 'bride', orientation: 'portrait' },
    { id: 'bride-2', label: 'Bride Portrait 2', src: '/photos/bride-portrait-2.jpg', group: 'bride', orientation: 'portrait' },
    { id: 'bride-3', label: 'Bride Traditional Dress Photo', src: '/photos/bride-traditional.jpg', group: 'bride', orientation: 'portrait' },
    { id: 'bride-4', label: 'Bride Family Photo', src: '/photos/bride-family.jpg', group: 'bride', orientation: 'landscape' },
    { id: 'bride-5', label: 'Bride Special Photo', src: '/photos/bride-special.jpg', group: 'bride', orientation: 'portrait' },

    { id: 'couple-1', label: 'Couple Photo 1', src: '/photos/couple-1.jpg', group: 'couple', orientation: 'portrait' },
    { id: 'couple-2', label: 'Couple Photo 2', src: '/photos/couple-2.jpg', group: 'couple', orientation: 'portrait' },
    { id: 'couple-3', label: 'Couple Photo 3', src: '/photos/couple-3.jpg', group: 'couple', orientation: 'portrait' },
    { id: 'engagement', label: 'Engagement Photo', src: '/photos/engagement.jpg', group: 'couple', orientation: 'landscape' },
    { id: 'pre-wedding', label: 'Pre-Wedding Photo', src: '/photos/pre-wedding.jpg', group: 'couple', orientation: 'landscape' },
  ] as PhotoSlot[],

  /**
   * The seven Sapta Padhi vows in their traditional order:
   * nourishment, strength, prosperity, happiness, family, seasons, friendship.
   */
  saptaPadhi: [
    {
      number: '01',
      title: 'Nourishment',
      titleTelugu: 'ఆహారం – పోషణ',
      vowWord: 'ఇషే',
      vowWordLatin: 'Iṣe',
      vowTelugu: 'ఇషే పాదం — ఆహారం, పోషణ కోసం ఒక అడుగు.',
      meaningTelugu:
        'మనం కలిసి ఆహారాన్ని పంచుకుంటూ, ఒకరికొకరం పోషణ అందిస్తాము.',
      meaningEnglish:
        'We take this step for nourishment, sharing food and caring for each other.',
      icon: 'grain',
    },
    {
      number: '02',
      title: 'Strength',
      titleTelugu: 'బలం – ధైర్యం',
      vowWord: 'ఊర్జే',
      vowWordLatin: 'Ūrje',
      vowTelugu: 'ఊర్జే పాదం — బలం, ధైర్యం కోసం ఒక అడుగు.',
      meaningTelugu:
        'శారీరక, మానసిక బలాన్ని ఒకరికొకరం ఇస్తూ, ప్రతి సవాలును కలిసి ఎదుర్కొంటాము.',
      meaningEnglish:
        'We take this step for strength, supporting each other through every challenge.',
      icon: 'strength',
    },
    {
      number: '03',
      title: 'Prosperity',
      titleTelugu: 'సంపద – వృద్ధి',
      vowWord: 'రాయస్పోషాయ',
      vowWordLatin: 'Rāyaspoṣāya',
      vowTelugu: 'రాయస్పోషాయ పాదం — సంపద, వృద్ధి కోసం ఒక అడుగు.',
      meaningTelugu:
        'ధర్మంగా సంపదను సమార్జించి, కలిసి అభివృద్ధి చెందుతాము.',
      meaningEnglish:
        'We take this step for prosperity, building a secure and meaningful future together.',
      icon: 'prosperity',
    },
    {
      number: '04',
      title: 'Happiness',
      titleTelugu: 'సుఖం – శాంతి',
      vowWord: 'మాయోభవాయ',
      vowWordLatin: 'Māyobhavāya',
      vowTelugu: 'మాయోభవాయ పాదం — సుఖం, శాంతి కోసం ఒక అడుగు.',
      meaningTelugu:
        'సుఖదుఃఖాలను పంచుకుంటూ, ప్రేమతో, నవ్వుతో జీవిస్తాము.',
      meaningEnglish:
        'We take this step for happiness, sharing joy and sorrow in equal measure.',
      icon: 'happiness',
    },
    {
      number: '05',
      title: 'Family',
      titleTelugu: 'కుటుంబం – సంతానం',
      vowWord: 'ప్రజాభ్యః',
      vowWordLatin: 'Prajābhyaḥ',
      vowTelugu: 'ప్రజాభ్యః పాదం — కుటుంబం, సంతానం కోసం ఒక అడుగు.',
      meaningTelugu:
        'మన కుటుంబాన్ని, సంతానాన్ని ప్రేమతో, సంస్కారంతో పెంచుతాము.',
      meaningEnglish:
        'We take this step for family, nurturing our home and future generations with love.',
      icon: 'family',
    },
    {
      number: '06',
      title: 'Seasons',
      titleTelugu: 'ఋతువులు – కాలం',
      vowWord: 'ఋతుభ్యః',
      vowWordLatin: 'Ṛtubhyaḥ',
      vowTelugu: 'ఋతుభ్యః పాదం — ఋతువులు, కాలం కోసం ఒక అడుగు.',
      meaningTelugu:
        'ఋతువులు మారినా, కాలం మారినా ఒకరికొకరం తోడుగా ఉంటాము.',
      meaningEnglish:
        'We take this step for all seasons, remaining together as time and circumstances change.',
      icon: 'friendship',
    },
    {
      number: '07',
      title: 'Friendship',
      titleTelugu: 'స్నేహం – తోడు',
      vowWord: 'సఖే',
      vowWordLatin: 'Sakhe',
      vowTelugu: 'సఖే పాదం — స్నేహం, తోడు కోసం ఒక అడుగు.',
      meaningTelugu:
        'జీవితాంతం స్నేహితులుగా, నమ్మకంతో, గౌరవంతో కలిసి నడుస్తాము.',
      meaningEnglish:
        'We take this final step as friends, walking together with trust and respect for life.',
      icon: 'forever',
    },
  ] as SaptaPadhiStep[],
} as const;

export const photoById = (id: string): PhotoSlot | undefined =>
  wedding.photos.find((photo) => photo.id === id);

export const photosByGroup = (group: PhotoGroup): PhotoSlot[] =>
  wedding.photos.filter((photo) => photo.group === group);

export const weddingDate = new Date(wedding.wedding.dateISO);

export const weddingDay = (() => {
  if (wedding.wedding.dayOverride) return wedding.wedding.dayOverride;
  try {
    return new Intl.DateTimeFormat('en-GB', {
      weekday: 'long',
      timeZone: wedding.wedding.timeZone,
    }).format(weddingDate);
  } catch {
    return '';
  }
})();

const mapsQuery = encodeURIComponent(wedding.venue.address);

export const mapsLinks = {
  search: `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`,
};
