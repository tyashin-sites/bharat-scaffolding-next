/**
 * Company facts — sourced from the approved brochure v6.2 (precedence) with
 * gaps filled from preetbharat.com. Do not add facts from anywhere else.
 */

export const stats = [
  { value: 45, suffix: '+', label: 'Years of legacy', note: 'Delivering since 1981' },
  { value: 750, suffix: '', label: 'Tonnes/day capacity', note: 'Combined manufacturing' },
  { value: 5, suffix: '', label: 'Manufacturing units', note: 'Purpose-built facilities' },
  { value: 6, suffix: '', label: 'Cities, pan-India', note: 'Depots & offices' },
];

export const secondaryStats = [
  { value: 250, suffix: '+', label: 'Employees' },
  { value: 50, suffix: '+', label: 'Clients served' },
  { value: 3, suffix: '', label: 'Generations' },
];

export const whyChooseUs = [
  {
    title: 'Extensive rental inventory',
    body: 'A large, continuously maintained stock of Cuplock scaffolding, shuttering material, props, walkway planks and formwork systems — ready for immediate deployment.',
  },
  {
    title: 'Quality & safety first',
    body: 'All equipment is manufactured using quality-controlled processes and compliant materials, meeting the demanding standards of infrastructure projects across India.',
  },
  {
    title: 'Rapid project mobilisation',
    body: 'Quick dispatch, structured delivery and on-site installation support — engineered to minimise delays and protect your construction timelines.',
  },
  {
    title: 'End-to-end solutions',
    body: 'From manufacturing and rental to site planning, logistics coordination and technical support — everything under one roof, one relationship, one point of contact.',
  },
  {
    title: 'Trusted by India’s leading companies',
    body: 'A client roster that spans metro rail authorities, defence establishments, national infrastructure bodies, and India’s top real estate and industrial developers.',
  },
  {
    title: 'Engineering support at every stage',
    body: 'Site assessment, BOQ quantity planning, material optimisation to cut wastage, and technical guidance for safe usage, loading and dismantling.',
  },
];

export const sectors = [
  {
    title: 'Construction & Infrastructure',
    body: 'Roads, flyovers, bridges and civil structures demanding reliable formwork and shuttering at scale.',
  },
  {
    title: 'Metro Rail & Government Infrastructure',
    body: 'Proven track record with DMRC, BMRCL, CMRL, MPMRCL and NHAI on some of India’s most critical infrastructure projects.',
  },
  {
    title: 'Industrial Plants & Refineries',
    body: 'High-load scaffolding for maintenance, expansion and new construction at industrial and process facilities.',
  },
  {
    title: 'Commercial Buildings',
    body: 'Office towers, retail complexes and mixed-use developments requiring precise, fast-deployed scaffolding systems.',
  },
  {
    title: 'Real Estate & Residential Projects',
    body: 'High-rise residential towers, housing complexes and plotted developments across India’s fastest-growing cities.',
  },
  {
    title: 'Warehousing & Logistics Facilities',
    body: 'Large-span scaffolding and shuttering for warehouse roofing, mezzanines and structural works.',
  },
  {
    title: 'Manufacturing Facilities',
    body: 'Plant construction, equipment erection support and maintenance scaffolding for manufacturing environments.',
  },
  {
    title: 'Maintenance & Renovation',
    body: 'Facade work, painting, plaster, waterproofing and repair projects where safe, flexible access is non-negotiable.',
  },
];

export const process = [
  {
    step: 'Enquiry',
    body: 'You reach out with project requirements by call, email or site enquiry.',
  },
  {
    step: 'Site visit',
    body: 'Our technical team visits to assess site conditions, access and load needs.',
  },
  {
    step: 'Material planning',
    body: 'We prepare quantity estimates, BOQ and an optimised material plan.',
  },
  {
    step: 'Delivery',
    body: 'Quality-checked material dispatched from the nearest depot to your site.',
  },
  {
    step: 'Installation support',
    body: 'On-site guidance for safe erection, loading and structural setup.',
  },
  {
    step: 'Pickup',
    body: 'Scheduled dismantling and collection once your project phase completes.',
  },
];

export const rentVsBuy = {
  owning: [
    'High capital investment upfront',
    'Storage yard required between projects',
    'Maintenance, inspection and repair costs',
    'Equipment degrades and depreciates',
    'Idle inventory during low-volume periods',
    'Management overhead for inventory tracking',
  ],
  renting: [
    'No capital expenditure — pay only for what you use',
    'No storage burden — we depot and manage all inventory',
    'All maintenance and inspection handled by our team',
    'Always receive quality-checked, field-ready material',
    'Scale up or down based on your project pipeline',
  ],
};

export const landmarkProjects = [
  { name: 'BMRCL', location: 'Bengaluru', kind: 'Metro rail' },
  { name: 'CMRL', location: 'Chennai', kind: 'Metro rail' },
  { name: 'MPMRCL', location: 'Bhopal', kind: 'Metro rail' },
  { name: 'Gwalior Airport', location: 'Gwalior', kind: 'Aviation' },
  { name: 'GIFT City', location: 'Gandhinagar', kind: 'Urban infrastructure' },
  { name: 'Foxconn', location: 'Bengaluru', kind: 'Industrial' },
  { name: 'Siemens', location: 'Bengaluru', kind: 'Industrial' },
  { name: 'BWSSB', location: 'Bengaluru', kind: 'Public utility' },
  { name: 'IOCL', location: 'Chennai', kind: 'Energy' },
];

export const clients = {
  metroAndGovernment: ['DMRC', 'BMRCL', 'CMRL', 'MPMRCL', 'NHAI', 'BWSSB'],
  institutions: ['ISRO', 'Indian Navy', 'HPCL', 'IOCL', 'IIT', 'AIIMS'],
  privateSector: ['DLF', 'M3M', 'Prestige Group', 'Siemens', 'Foxconn'],
};

export const allClients = [
  ...clients.metroAndGovernment,
  ...clients.institutions,
  ...clients.privateSector,
];

export const manufacturing = {
  intro:
    'Behind every reliable scaffolding rental is manufacturing infrastructure that can be trusted. Bharat Scaffolding operates five modern manufacturing facilities across India — each equipped with purpose-built machinery for producing Cuplock systems, ledgers, props, MS plates and all ancillary scaffolding components.',
  capacity:
    'Our combined manufacturing capacity of 750 tonnes per day ensures that large-scale infrastructure projects receive uninterrupted supply — regardless of project size, location or timeline pressure.',
  machines: [
    'Base jack welding machine',
    'Ledger machine',
    'Power press machine',
    'Chaser thread machine',
    'Cuplock machine',
    'Thread machine',
  ],
};

export const sustainability = [
  {
    title: 'Refurbish & reuse',
    body: 'Steel components are cleaned, inspected, repaired where necessary and returned to inventory after every site use. Each tonne rented, returned and redeployed is a tonne that does not end up as waste.',
  },
  {
    title: 'Energy-efficient manufacturing',
    body: 'Steel recycling is central to what we do — modern steel production using recycled scrap cuts energy use and CO₂ emissions by approximately 80% compared to virgin production.',
  },
  {
    title: 'Optimised logistics',
    body: 'Our pan-India depot network means scaffolding travels shorter distances to reach your site — reducing fuel consumption, logistics emissions and delivery timelines simultaneously.',
  },
];

export const offices = [
  {
    city: 'Delhi',
    label: 'Head Office',
    address: 'DSO-309, 3rd Floor, DLF South Court, Saket, New Delhi – 110017',
    lat: 28.528,
    lng: 77.2175,
  },
  {
    city: 'Gurugram',
    label: '',
    address: 'Darbaripur Road, Kherki Daula, Gurugram, Haryana – 122101',
    lat: 28.4043,
    lng: 76.9838,
  },
  {
    city: 'Mohali',
    label: '',
    address: 'P. No. 1057, JLPL, Sec-82, Mohali, Punjab – 140306',
    lat: 30.655,
    lng: 76.733,
  },
  {
    city: 'Bengaluru',
    label: '',
    address: 'Sy. No. 72, Vijayapura Road, Devanahalli, Bengaluru, Karnataka – 562110',
    lat: 13.2569,
    lng: 77.7273,
  },
  {
    city: 'Mumbai',
    label: '',
    address: 'Sy. No. 25/1, Kolkhe, Panvel, Raigad, Maharashtra – 410221',
    lat: 18.9895,
    lng: 73.1222,
  },
  {
    city: 'Ahmedabad',
    label: '',
    address: 'Sy. No. 189/2, Sanand, Ahmedabad, Gujarat – 382170',
    lat: 23.0239,
    lng: 72.3852,
  },
];

export const chairmansDesk = {
  names: 'Jhujhar Singh & Chandeep Singh',
  quote:
    'Over four and a half decades, we have built this company on a single principle: when our clients commit to a deadline, it becomes our deadline. Our role is to ensure that scaffolding, shuttering and formwork — the very framework on which great structures rise — is never the reason a project slows down.',
  body: 'We have had the privilege of supporting India’s most landmark projects: its metros, its airports, its institutions of national importance, and its defining commercial landmarks. As we pass this legacy to the next generation, our commitment only deepens — we continue to invest in manufacturing capacity, in our rental inventory, in technology, and above all in the people and clients who have made Bharat Scaffolding what it is today.',
};
