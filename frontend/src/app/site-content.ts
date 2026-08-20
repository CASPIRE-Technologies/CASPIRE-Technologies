export const siteContent = {
  brand: {
    name: ' CASPIRE Technologies',
    shortName: 'CASPIRE',
    tagline: 'CREATE. ASPIRE. GROW.',
    legalName: 'CASPIRE Technologies (Pvt) Ltd',
    homepageAriaLabel: 'CASPIRE Technologies Homepage',
    logo: {
      src: '/assets/brand/caspire-logo.jpg',
      alt: 'CASPIRE Technologies logo',
    },
  },
  contact: {
    intro: 'Our business office and engineering center are located at the World Trade Center in Colombo.',
    address: {
      label: 'Headquarters Address',
      full: 'Level 12, West Tower, World Trade Center, Colombo 01, Sri Lanka',
      street: 'Level 12, West Tower, World Trade Center',
      locality: 'Colombo 01',
      region: 'Western Province',
      country: 'LK',
    },
    email: {
      label: 'Primary Email',
      value: 'caspiretechnologies@gmail.com',
      href: 'mailto:contact@apexsoftware.lk',
    },
    telephone: {
      label: 'Office Telephone',
      value: '+94 11 234 5678',
      href: 'tel:+94112345678',
      schemaValue: '+94-11-234-5678',
    },
    whatsapp: {
      label: 'WhatsApp Business',
      value: '+94 77 123 4567',
      href: 'https://wa.me/94771234567',
      linkText: 'Chat Direct on WhatsApp (+94 77 123 4567) ->',
    },
    linkedin: {
      label: 'Official LinkedIn Page',
      display: 'linkedin.com/company/apex-software-lk ->',
      href: 'https://www.linkedin.com/company/apex-software-lk',
    },
  },
  seo: {
    defaultTitle: 'CASPIRE Technologies | Sri Lankan IT & Digital Transformation Partner',
    defaultDescription: 'An end-to-end software engineering and digital transformation partner delivering secure, reliable and scalable business solutions for Sri Lankan enterprises and international clients.',
    siteUrl: 'https://www.apexsoftware.lk',
    organizationDescription: 'End-to-end software engineering and digital transformation partner in Sri Lanka.',
  },
} as const;
