/**
 * Product catalogue — every fact typed verbatim from the approved sales
 * brochure v6.2 (spec-sheet pages 9–22). Do NOT add sizes, grades, codes or
 * claims that are not printed there.
 */

export type ProductGroup =
  | 'Cuplock System'
  | 'Shuttering & Formwork'
  | 'Access & Safety'
  | 'Components';

export interface Product {
  slug: string;
  name: string;
  shortName: string;
  group: ProductGroup;
  summary: string;
  description: string;
  applications: string[];
  features: string[];
  specs: { label: string; value: string }[];
  sizes: { columns: string[]; rows: string[][] };
  sizesNote?: string;
  /** Brochure spec-card image in /public/products/ */
  image: string;
}

export const PRODUCT_GROUPS: ProductGroup[] = [
  'Cuplock System',
  'Shuttering & Formwork',
  'Access & Safety',
  'Components',
];

export const products: Product[] = [
  {
    slug: 'cuplock-vertical-standard',
    name: 'Cuplock Vertical Standard',
    shortName: 'Cuplock Vertical',
    group: 'Cuplock System',
    summary:
      'High-strength Cuplock vertical with integral cups at 500 mm centres for secure, quick connections.',
    description:
      'The backbone of the Cuplock scaffolding system: high-strength verticals with integral top and bottom cups at 500 mm centres, giving secure and fast node connections without loose fittings.',
    applications: [
      'Cuplock scaffolding structures',
      'Access and support scaffolds',
      'Infrastructure and industrial projects',
    ],
    features: ['Integrated spigot', 'Quick cup-node connections', 'Durable & reusable'],
    specs: [
      { label: 'Pipe', value: '40 NB B-Class (48.3 mm OD)' },
      { label: 'Top cup', value: 'Forged EN8 steel' },
      { label: 'Bottom cup', value: 'Pressed steel' },
      { label: 'Cup spacing', value: '500 mm' },
      { label: 'Integrated spigot', value: 'Yes' },
      { label: 'Material', value: 'High tensile steel' },
      { label: 'Finish', value: 'Painted (Red)' },
      { label: 'Construction', value: 'Precision manufactured' },
    ],
    sizes: {
      columns: ['Size (m)', 'Nominal height (mm)', 'No. of cups', 'Weight (kg)'],
      rows: [
        ['0.5', '500', '1', '2.25'],
        ['1.0', '1000', '2', '4.50'],
        ['1.5', '1500', '3', '6.75'],
        ['2.0', '2000', '4', '9.00'],
        ['2.5', '2500', '5', '11.00'],
        ['3.0', '3000', '6', '13.50'],
      ],
    },
    image: '/products/cuplock-vertical-standard.jpg',
  },
  {
    slug: 'cuplock-horizontal-ledger',
    name: 'Cuplock Horizontal Ledger',
    shortName: 'Cuplock Ledger',
    group: 'Cuplock System',
    summary:
      'High-strength horizontal ledger with pressed steel blades for secure and quick connections.',
    description:
      'Horizontal members of the Cuplock system with pressed steel forged-end blades that lock into the vertical cups — used for horizontal alignment and load distribution across the scaffold.',
    applications: [
      'Horizontal alignment in Cuplock scaffolding',
      'Load distribution across bays',
    ],
    features: ['Pressed steel blade (BHARAT)', 'Quick blade-to-cup locking', 'Durable & reusable'],
    specs: [
      { label: 'Tube', value: '48.3 × 3.20 mm' },
      { label: 'Blade', value: 'Pressed steel (BHARAT)' },
      { label: 'Material grade', value: 'As per site requirement' },
      { label: 'Finish', value: 'Red oxide + top coat (Post Office Red)' },
    ],
    sizes: {
      columns: ['Size (m)', 'Blade-to-blade length (mm)', 'Tube size (mm)', 'Weight (kg)'],
      rows: [
        ['0.55', '500', '48.3 × 3.20', '2.60'],
        ['0.60', '550', '48.3 × 3.20', '2.75'],
        ['0.90', '850', '48.3 × 3.20', '3.90'],
        ['1.00', '950', '48.3 × 3.20', '4.30'],
        ['1.20', '1150', '48.3 × 3.20', '5.10'],
        ['1.50', '1450', '48.3 × 3.20', '6.30'],
        ['1.80', '1750', '48.3 × 3.20', '7.40'],
        ['2.00', '1950', '48.3 × 3.20', '8.20'],
      ],
    },
    image: '/products/cuplock-horizontal-ledger.jpg',
  },
  {
    slug: 'spigot-pin',
    name: 'Spigot Pin',
    shortName: 'Spigot Pin',
    group: 'Cuplock System',
    summary:
      'Secure alignment and connection between Cuplock vertical standards for safe height extension.',
    description:
      'Spigot pins provide secure alignment and connection between Cuplock vertical standards, ensuring proper load transfer and safe scaffold height extension. Precision manufactured for a secure fit, durable, reusable and fully compatible with standard Cuplock scaffolding systems.',
    applications: [
      'Vertical connections',
      'Scaffold height extension',
      'Cuplock scaffolding',
      'Industrial construction',
      'Infrastructure projects',
    ],
    features: [
      'Precision engineered',
      'Secure alignment',
      'High strength',
      'Durable & reusable',
      'Easy installation',
    ],
    specs: [
      { label: 'Material', value: 'YST210 steel pipe' },
      { label: 'Length', value: '300 mm' },
      { label: 'Outside diameter', value: '28 mm' },
      { label: 'Finish', value: 'Painted (Red)' },
      { label: 'Compatibility', value: 'Cuplock vertical standards' },
      { label: 'Construction', value: 'Precision fabricated' },
    ],
    sizes: { columns: ['Available size'], rows: [['300 mm']] },
    image: '/products/spigot-pin.jpg',
  },
  {
    slug: 'adjustable-telescopic-prop',
    name: 'Adjustable Telescopic Prop',
    shortName: 'Telescopic Prop',
    group: 'Shuttering & Formwork',
    summary:
      'The most economical and reliable support for formwork, slabs, beams, walls and columns.',
    description:
      'Telescopic props are one of the most economical and reliable methods of support for all kinds of formwork, slabs, beams, walls and columns — ensuring efficient load distribution and structural stability across residential, commercial, industrial and infrastructure projects.',
    applications: [
      'Slab formwork',
      'Beam & column support',
      'Wall formwork',
      'Centering',
      'Temporary support',
    ],
    features: ['Easy to install', 'Reusable', 'Precise structure', 'Excellent durability'],
    specs: [
      { label: 'Material', value: 'High grade mild steel' },
      { label: 'Outer tube', value: '60.3 mm OD' },
      { label: 'Inner tube', value: '48.3 mm OD' },
      { label: 'Base plate', value: '150 × 150 × 6 mm' },
      { label: 'Top plate options', value: 'U Head · Triangular Head · Flat Head · Square Plate Head' },
      { label: 'Nut type', value: 'Heavy duty cast nut (BHARAT)' },
      { label: 'Locking system', value: 'Pin type' },
      { label: 'Finish', value: 'Painted' },
    ],
    sizes: {
      columns: ['Size', 'Adjustable height (mm)'],
      rows: [
        ['2 × 2 m', '2100 – 3650'],
        ['2 × 3 m', '3100 – 4650'],
        ['2 × 4 m', '4100 – 5500'],
        ['3 × 3 m', '3100 – 5650'],
      ],
    },
    image: '/products/adjustable-telescopic-prop.jpg',
  },
  {
    slug: 'adjustable-acro-span',
    name: 'Adjustable Acro Span',
    shortName: 'Acro Span',
    group: 'Shuttering & Formwork',
    summary:
      'Self-supporting adjustable beam spans installed under shuttering plates and floor form panels.',
    description:
      'Acro spans are ideal as self-supporting runners in shuttering systems. Adjustable beam spans are installed under shuttering plates or floor form panels for long-span formwork without intermediate propping.',
    applications: [
      'Slab formwork',
      'Beam & deck shuttering',
      'Long span formwork',
      'Industrial projects',
    ],
    features: [
      'Self supporting',
      'Adjustable',
      'High load capacity',
      'Durable & reusable',
      'Easy to install',
    ],
    specs: [
      { label: 'Standard size', value: '2350 × 2350 mm (2.5 × 2.5 m)' },
      { label: 'Type', value: 'Adjustable' },
      { label: 'Material', value: 'High grade mild steel' },
      { label: 'Finish', value: 'Painted' },
      { label: 'Load capacity', value: 'High load bearing' },
    ],
    sizes: { columns: ['Standard size'], rows: [['2350 × 2350 mm (2.5 × 2.5 m)']] },
    image: '/products/adjustable-acro-span.jpg',
  },
  {
    slug: 'adjustable-base-jack',
    name: 'Adjustable Base Jack',
    shortName: 'Base Jack',
    group: 'Shuttering & Formwork',
    summary:
      'Stable foundation for Cuplock scaffolding and formwork through precise height adjustment.',
    description:
      'Adjustable base jacks provide a stable foundation for Cuplock scaffolding and formwork systems through precise height adjustment at ground level.',
    applications: ['Foundation levelling', 'Scaffolding', 'Formwork'],
    features: ['Heavy duty', 'Adjustable', 'High load capacity'],
    specs: [
      { label: 'Threaded bar', value: '28/30/32 mm solid or 38 mm hollow' },
      { label: 'Base plate', value: '150 × 150 × 6 mm' },
      { label: 'Nut', value: 'Heavy duty (BHARAT branding)' },
      { label: 'Finish', value: 'Painted' },
    ],
    sizes: {
      columns: ['Size (mm)', 'Threaded length (mm)'],
      rows: [
        ['350', '275'],
        ['450', '375'],
        ['600', '550'],
      ],
    },
    image: '/products/adjustable-jacks.jpg',
  },
  {
    slug: 'adjustable-u-head-jack',
    name: 'Adjustable U-Head Jack',
    shortName: 'U-Head Jack',
    group: 'Shuttering & Formwork',
    summary:
      'Secure adjustable top support for beams, timber runners and formwork systems.',
    description:
      'Adjustable U-head jacks provide secure adjustable support for beams, timber runners and formwork systems at the top of scaffolding and propping assemblies.',
    applications: ['Beam formwork', 'Slab formwork', 'Scaffolding'],
    features: ['Heavy duty', 'Adjustable', 'High load capacity'],
    specs: [
      { label: 'Threaded bar', value: '28/30/32 mm solid or 38 mm hollow' },
      { label: 'U head', value: '100 × 100 × 100 mm' },
      { label: 'Plate thickness', value: '6 mm' },
      { label: 'Finish', value: 'Painted' },
    ],
    sizes: {
      columns: ['Size (mm)', 'Threaded length (mm)'],
      rows: [
        ['350', '275'],
        ['450', '375'],
        ['600', '550'],
      ],
    },
    image: '/products/adjustable-jacks.jpg',
  },
  {
    slug: 'ms-shuttering-plate',
    name: 'M.S. Shuttering Plate',
    shortName: 'Shuttering Plate',
    group: 'Shuttering & Formwork',
    summary:
      'Strong, reusable facing surface for wall, column and slab formwork.',
    description:
      'M.S. shuttering plates provide a strong and reliable facing surface for wall, column and slab formwork. Manufactured from high grade mild steel, they deliver excellent strength, durability and reusability for all construction applications.',
    applications: [
      'Wall formwork',
      'Column formwork',
      'Slab formwork',
      'Beam & deck shuttering',
      'Foundation & footing formwork',
      'Infrastructure projects',
    ],
    features: [
      'High strength & stability',
      'Smooth & flat surface',
      'Precise dimensions',
      'Pre-drilled for easy assembly',
      'Corrosion resistant finish',
      'Cost effective & long lasting',
    ],
    specs: [
      { label: 'Type', value: 'M.S. shuttering plate' },
      { label: 'Construction', value: 'Welded steel plate' },
      { label: 'Plate thickness', value: '3 mm (nominal)' },
      { label: 'Edge frame options', value: '35 × 35 × 5 mm angle · 25 × 25 × 5 mm angle' },
      { label: 'Finish', value: 'Painted' },
    ],
    sizes: {
      columns: ['Size (length × width)', 'Thickness'],
      rows: [
        ['3 ft × 2 ft', '3 mm'],
        ['3 ft × 1.5 ft', '3 mm'],
        ['3 ft × 1.0 ft', '3 mm'],
      ],
      // eslint-disable-next-line no-irregular-whitespace
    },
    sizesNote: 'Other sizes may be available on request.',
    image: '/products/ms-shuttering-plate.jpg',
  },
  {
    slug: 'ms-channel-ismc',
    name: 'M.S. Channel (ISMC)',
    shortName: 'M.S. Channel',
    group: 'Shuttering & Formwork',
    summary:
      'ISMC 100 × 50 × 5 mm channels for robust slab formwork, shuttering and scaffolding support.',
    description:
      'Our ISMC 100 × 50 × 5 mm M.S. channels provide robust and dependable support for slab formwork, shuttering and scaffolding applications. Designed for use with adjustable props and Cuplock systems, they ensure efficient load distribution and reliable structural stability.',
    applications: [
      'Slab formwork support',
      'Beam & deck shuttering',
      'Cuplock scaffolding systems',
      'Adjustable prop systems',
      'General structural support',
    ],
    features: [
      'High strength',
      'Reliable load distribution',
      'Durable & reusable',
      'Compatible with standard formwork systems',
    ],
    specs: [
      { label: 'Section', value: 'ISMC 100 × 50 × 5 mm' },
      { label: 'Material', value: 'High grade mild steel' },
      { label: 'Steel standard', value: 'IS 1161 / YST 210/240/355' },
      { label: 'Finish', value: 'Natural / mill finish' },
      { label: 'Manufactured', value: 'As per IS standards' },
    ],
    sizes: {
      columns: ['Size', 'Length (mm)'],
      rows: [
        ['2.5 m', '2500'],
        ['2.75 m', '2750'],
        ['3 m', '3000'],
        ['4 m', '4000'],
        ['5 m', '5000'],
        ['5.5 m', '5500'],
        ['6 m', '6000'],
      ],
    },
    image: '/products/ms-channel-ismc.jpg',
  },
  {
    slug: 'ms-pipe',
    name: 'M.S. Pipe',
    shortName: 'M.S. Pipe',
    group: 'Shuttering & Formwork',
    summary:
      '40 NB B-Class pipe on hire for all infrastructural and construction projects.',
    description:
      'M.S. pipes are available on hire for all infrastructural and construction projects, made of 40 NB "B Class pipe" to IS 1161 — the highest standard — in YST 210/240/355 grades.',
    applications: [
      'Scaffolding systems',
      'Shuttering & formwork',
      'Structural support',
      'Infrastructure projects',
      'Industrial construction',
    ],
    features: [
      'High strength & durability',
      'Corrosion resistant',
      'Uniform thickness',
      'Easy to handle & install',
      'Cost efficient solution',
      'Long service life',
    ],
    specs: [
      { label: 'Pipe type', value: 'M.S. pipe (B Class)' },
      { label: 'Standard', value: 'IS 1161 compliant' },
      { label: 'Grade', value: 'YST 210 / YST 240 / YST 355' },
      { label: 'Size', value: '40 NB' },
      { label: 'Material', value: 'High grade mild steel' },
      { label: 'Finish', value: 'Painted' },
    ],
    sizes: {
      columns: ['Size', 'Length (mm)'],
      rows: [
        ['3 meter', '3000'],
        ['6 meter', '6000'],
      ],
    },
    sizesNote: 'Other lengths may be available on request.',
    image: '/products/ms-pipe.jpg',
  },
  {
    slug: 'steel-walkway-platform',
    name: 'Steel Walkway Platform',
    shortName: 'Walkway Platform',
    group: 'Access & Safety',
    summary:
      'Safe, strong working surface for access, scaffolding and maintenance applications.',
    description:
      'Our steel walkway platforms provide a safe, strong and reliable working surface for access, scaffolding and maintenance applications — pressed steel plate with anti-skid punching and open-curvature hooks that lock securely on scaffold pipe.',
    applications: [
      'Scaffolding walkways',
      'Access platforms',
      'Construction sites',
      'Industrial maintenance',
      'Elevated work platforms',
    ],
    features: [
      'Anti-skid surface',
      'High strength & durability',
      'Easy to install & remove',
      'Secure Cuplock compatibility',
      'Corrosion resistant finish',
      'Safe & reliable working surface',
    ],
    specs: [
      { label: 'Material', value: 'High grade mild steel' },
      { label: 'Top plate', value: 'Pressed steel plate with anti-skid punching' },
      { label: 'Side channel', value: 'Pressed steel channel' },
      { label: 'Thickness', value: '2.0 mm (nominal)' },
      { label: 'Hook type', value: 'Pressed steel, open curvature (Cuplock compatible)' },
      { label: 'Finish', value: 'Painted' },
    ],
    sizes: {
      columns: ['Size', 'Length'],
      rows: [
        ['300 mm (W) platform', '1.2 m'],
        ['300 mm (W) platform', '1.5 m'],
        ['300 mm (W) platform', '1.8 m'],
        ['300 mm (W) platform', '2.0 m'],
      ],
    },
    sizesNote: 'Other lengths may be available on request.',
    image: '/products/steel-walkway-platform.jpg',
  },
  {
    slug: 'steel-toe-board',
    name: 'Steel Toe Board',
    shortName: 'Toe Board',
    group: 'Access & Safety',
    summary:
      'Essential edge protection that keeps tools, debris and materials from falling.',
    description:
      'Our steel toe boards provide an essential edge protection solution for scaffolding and working platforms, helping prevent tools, debris and materials from falling and ensuring a safer work environment.',
    applications: [
      'Scaffolding edge protection',
      'Construction sites',
      'Access platforms',
      'Industrial maintenance',
      'Prevents tools & debris fall',
    ],
    features: [
      'Provides edge safety',
      'High strength & durability',
      'Easy to install & remove',
      'Secure Cuplock compatibility',
      'Corrosion resistant finish',
    ],
    specs: [
      { label: 'Material', value: 'High grade mild steel' },
      { label: 'Board type', value: 'Pressed steel plate' },
      { label: 'Thickness', value: '1.6 mm to 2.0 mm (nominal)' },
      { label: 'Height', value: '150 mm (nominal)' },
      { label: 'Hook type', value: 'Pressed steel, open hole type (Cuplock compatible)' },
      { label: 'Finish', value: 'Painted' },
    ],
    sizes: {
      columns: ['Size (height)', 'Length'],
      rows: [
        ['150 mm (H) toe board', '1.2 m'],
        ['150 mm (H) toe board', '1.5 m'],
        ['150 mm (H) toe board', '1.8 m'],
        ['150 mm (H) toe board', '2.0 m'],
      ],
    },
    sizesNote: 'Other lengths may be available on request.',
    image: '/products/steel-toe-board.jpg',
  },
  {
    slug: 'steel-access-ladder',
    name: 'Steel Access Ladder',
    shortName: 'Access Ladder',
    group: 'Access & Safety',
    summary:
      'Safe, reliable vertical access for scaffolding, formwork and construction sites.',
    description:
      'Our steel access ladders provide safe and reliable vertical access for scaffolding, formwork and construction sites. Built from high grade steel with welded rungs and an open hook at the top end for secure hanging on scaffold platforms.',
    applications: [
      'Scaffolding access',
      'Formwork & shuttering',
      'Construction sites',
      'Industrial platforms',
      'General vertical access',
    ],
    features: [
      'Safe & easy access',
      'Strong & durable construction',
      'High strength & stability',
      'Anti-slip rungs for safety',
      'Corrosion resistant finish',
      'Easy to handle & install',
    ],
    specs: [
      { label: 'Material', value: 'High grade mild steel' },
      { label: 'Ladder type', value: 'Welded steel ladder' },
      { label: 'Side channel', value: 'Flat bar / MS section' },
      { label: 'Rung type', value: 'Round / MS solid bar' },
      { label: 'Rung spacing', value: '250 mm (approx.)' },
      { label: 'Thickness', value: '2 mm to 3 mm (nominal)' },
      { label: 'Hook type', value: 'Open hook at top end' },
      { label: 'Finish', value: 'Painted' },
    ],
    sizes: {
      columns: ['Size (length)', 'Width (approx.)'],
      rows: [['3.0 m', '400 mm']],
    },
    sizesNote: 'Other lengths may be available on request.',
    image: '/products/steel-access-ladder.jpg',
  },
  {
    slug: 'plastering-plank-challi-jalli',
    name: 'Plastering Plank (Challi / Jalli)',
    shortName: 'Plastering Plank',
    group: 'Access & Safety',
    summary:
      'Strong, stable working platform for plastering, masonry and construction tasks at height.',
    description:
      'Our plastering planks (Challi / Jalli) provide a strong and stable working platform for plastering, masonry and construction tasks at height. Built from high grade steel in a welded slat design, they ensure safety, durability and ease of use on all types of scaffolding systems.',
    applications: [
      'Plastering work',
      'Masonry work',
      'Brickwork construction',
      'Facade access',
      'General construction work',
      'Building maintenance',
    ],
    features: [
      'Strong & rigid construction',
      'High strength & durability',
      'Safe & stable working platform',
      'Anti-slip open slat design',
      'Corrosion resistant finish',
      'Easy to handle & install',
    ],
    specs: [
      { label: 'Material', value: 'High grade mild steel' },
      { label: 'Construction', value: 'Welded steel slat type' },
      { label: 'Top frame', value: 'Flat bar section' },
      { label: 'Slats', value: 'Flat bar section' },
      { label: 'Slat spacing', value: '75 mm (approx.)' },
      { label: 'Thickness', value: '2 mm to 3 mm (nominal)' },
      { label: 'Finish', value: 'Painted' },
    ],
    sizes: {
      columns: ['Size (length × width)'],
      rows: [['6.5 ft × 1.5 ft (1.98 m × 0.45 m)']],
    },
    sizesNote: 'Other sizes may be available on request.',
    image: '/products/plastering-plank-challi-jalli.jpg',
  },
  {
    slug: 'coupler',
    name: 'Coupler (Fixed & Swivel)',
    shortName: 'Coupler',
    group: 'Components',
    summary:
      'Forged steel couplers that securely connect scaffold tubes for stable, safe structures.',
    description:
      'Our couplers — fixed and swivel — are designed to securely connect scaffold tubes, ensuring a strong, stable and safe scaffolding structure for all types of construction and industrial applications. The swivel type provides 360° flexibility at any angle.',
    applications: [
      'Scaffolding',
      'Angular connections',
      'Complex structures',
      'Access scaffolding',
      'Industrial applications',
    ],
    features: [
      'High strength forged steel',
      '360° swivel function (swivel type)',
      'Easy & fast installation',
      'Durable & reusable',
      'Corrosion resistant finish',
    ],
    specs: [
      { label: 'Material', value: 'High grade forged steel' },
      { label: 'Types', value: 'Fixed coupler · Swivel coupler' },
      { label: 'Construction', value: 'Drop forged / pressed' },
      { label: 'Pipe size', value: '48.3 mm (suitable for 40 NB pipes)' },
      { label: 'Coupler type', value: 'Pressed' },
      { label: 'Bolt & nut', value: 'High tensile steel' },
      { label: 'Finish', value: 'Painted' },
    ],
    sizes: {
      columns: ['Available size'],
      rows: [['48.3 mm (suitable for 40 NB pipes)']],
    },
    image: '/products/coupler.jpg',
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function relatedProducts(slug: string, limit = 4): Product[] {
  const current = getProduct(slug);
  if (!current) return products.slice(0, limit);
  const sameGroup = products.filter((p) => p.slug !== slug && p.group === current.group);
  const rest = products.filter((p) => p.slug !== slug && p.group !== current.group);
  return [...sameGroup, ...rest].slice(0, limit);
}
