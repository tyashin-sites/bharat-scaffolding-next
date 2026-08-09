/**
 * All brand strings in ONE place (Tyashin addendum rule). Components read from
 * here — no scattered copies of name/contact details.
 *
 * Facts sourced from the approved sales brochure v6.2 (precedence) and
 * preetbharat.com (gaps only). See docs/BUILD-PLAN.md facts ledger.
 */
export const siteConfig = {
  name: 'Bharat Scaffolding',
  legalName: 'Bharat Scaffolding Pvt. Ltd.',
  tagline: 'Built on Trust. Backed by Strength. Delivering Since 1981.',
  description:
    'One of India’s most trusted names in scaffolding, shuttering, centering and formwork — on hire and manufactured in-house. 45+ years, 5 manufacturing units, 750 tonnes/day capacity, serving metro rail, industrial, commercial and high-rise projects pan-India.',
  services: ['Shuttering', 'Scaffolding', 'Centering', 'Formwork'],
  copyrightHolder: 'Bharat Scaffolding Pvt. Ltd.',
  contact: {
    email: 'hire@preetbharat.com',
    phone: '+91-9990560300',
    phoneHref: 'tel:+919990560300',
    phone2: '+91-9811560300',
    phone2Href: 'tel:+919811560300',
    landline: '011-43090300',
    landlineHref: 'tel:+911143090300',
    /** See ASSET-DEBT #1 — WhatsApp availability to be confirmed by customer. */
    whatsappHref: 'https://wa.me/919990560300',
  },
  cities: ['Delhi', 'Gurugram', 'Mohali', 'Bengaluru', 'Mumbai', 'Ahmedabad'],
  headOffice: 'DSO-309, 3rd Floor, DLF South Court, Saket, New Delhi – 110017',
  social: {
    linkedin: 'https://www.linkedin.com/company/preet-bharat-group',
  },
  catalogue: {
    path: '/bharat-scaffolding-catalogue-v6.2.pdf',
    label: 'Product Catalogue (PDF)',
  },
  nav: [
    { label: 'Products', href: '/products' },
    { label: 'Projects', href: '/projects' },
    { label: 'About', href: '/about' },
    { label: 'Catalogue', href: '/catalog' },
    { label: 'Contact', href: '/contact' },
  ],
};
