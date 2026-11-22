/**
 * Copy for /scaffolding-on-rent — final wording supplied with the handoff
 * (tyashin-platform#98). Every fact here is from the brochure v6.2; no prices,
 * load ratings, certifications or delivery-time promises.
 */

export const rentHero = {
  h1: 'Scaffolding on rent, across India',
  sub: 'Set your bay size and working height. Watch the scaffold build itself, get the component list and tonnage, and send it to us for a quotation. Manufactured in our own five units and inspected before every dispatch.',
};

export const rentEstimator = {
  heading: 'Work out what your site needs',
  helper:
    'Change the numbers and the scaffold rebuilds. The list below is indicative — our technical team confirms quantities after a site visit.',
};

export const rentComponents = {
  heading: 'How a Cuplock scaffold is put together',
  intro:
    'Six component types do almost all the work. Knowing what each one does makes it much easier to tell us what you need.',
  items: [
    {
      name: 'Vertical standard',
      body: 'The post. Integral cups every 500 mm, so ledgers lock in without loose fittings. Comes in 0.5 m to 3.0 m, stacked with a spigot to reach your height.',
      links: [{ label: 'Cuplock vertical standard', href: '/products/cuplock-vertical-standard' }],
    },
    {
      name: 'Horizontal ledger',
      body: 'The span between posts. Pressed steel blades drop into the cups and lock with a hammer. Blade-to-blade lengths run 0.55 m to 2.0 m, and that length is your bay size.',
      links: [{ label: 'Cuplock horizontal ledger', href: '/products/cuplock-horizontal-ledger' }],
    },
    {
      name: 'Base jack',
      body: 'Sits under every post and takes out the level difference in the ground. Threaded, so you adjust it after the first bay is set.',
      links: [{ label: 'Adjustable base jack', href: '/products/adjustable-base-jack' }],
    },
    {
      name: 'U-head jack',
      body: 'The top of the post when you are propping formwork. Holds the beam or runner over the slab.',
      links: [{ label: 'Adjustable U-head jack', href: '/products/adjustable-u-head-jack' }],
    },
    {
      name: 'Walkway platform',
      body: 'The deck. Pressed steel with anti-skid punching and open-curvature hooks that sit over the ledger.',
      links: [{ label: 'Steel walkway platform', href: '/products/steel-walkway-platform' }],
    },
    {
      name: 'Toe board and access ladder',
      body: 'Edge protection so nothing falls off the deck, and a safe way up.',
      links: [
        { label: 'Steel toe board', href: '/products/steel-toe-board' },
        { label: 'Steel access ladder', href: '/products/steel-access-ladder' },
      ],
    },
  ],
};

export const rentProcessHeading = 'What happens after you send the list';

export const rentFaq: { q: string; a: string }[] = [
  {
    q: 'Which cities do you supply from?',
    a: 'Delhi (head office), Gurugram, Mohali, Bengaluru, Mumbai and Ahmedabad. Material ships from whichever depot is nearest your site.',
  },
  {
    q: 'How is the hire priced?',
    a: 'By written quotation, once we understand the material, the quantity and how long you need it. The estimator on this page gives you the component list to quote against.',
  },
  {
    q: 'Do you help put it up?',
    a: 'Yes. We give on-site guidance for safe erection, loading and dismantling, and we collect the material when the phase finishes.',
  },
  {
    q: 'Is the material checked before it reaches me?',
    a: 'Every rental component is inspected and maintained before dispatch.',
  },
  {
    q: 'How accurate is the estimate on this page?',
    a: 'Close enough to quote against, and not a design. The real quantities come out of a site visit, where our team looks at ground conditions, access and load before we finalise the material plan.',
  },
  {
    q: 'What sizes do you carry?',
    a: 'Cuplock verticals from 0.5 m to 3.0 m, ledgers from 0.55 m to 2.0 m, platforms and toe boards from 1.2 m to 2.0 m. Full specifications are on each product page.',
  },
];

export const rentMeta = {
  title: 'Scaffolding on Rent in India | Cuplock Hire | Bharat Scaffolding',
  description:
    'Hire Cuplock scaffolding, shuttering and formwork from six depots across India. Work out your material list and tonnage on the page, then send it to us for a quotation.',
};
