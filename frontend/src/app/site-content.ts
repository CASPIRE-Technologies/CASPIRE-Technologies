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
      full: 'No 18th, 7th Cross Lane, Borupana road, Rathmalana, Sri Lanka',
      street: '7th Cross Lane, Borupana road, Rathmalana',
      locality: 'Rathmalana',
      region: 'Western Province',
      country: 'LK',
    },
    email: {
      label: 'Primary Email',
      value: 'caspiretechnologies@gmail.com',
      href: 'mailto:caspiretechnologies@gmail.com',
    },
    telephone: {
      label: 'Office Telephone',
      value: '+94 75 651 9837',
      href: 'tel:+94756519837',
      schemaValue: '+94-75-651-9837',
    },
    whatsapp: {
      label: 'WhatsApp Business',
      value: '+94 75 651 9837',
      href: 'https://wa.me/94756519837',
      linkText: 'Chat Direct on WhatsApp (+94 75 651 9837) ->',
    },
    linkedin: {
      label: 'Official LinkedIn Page',
      display: 'linkedin.com/company/CASPIRE-software-lk ->',
      href: 'https://www.linkedin.com/company/CASPIRE-software-lk',
    },
  },
  seo: {
    defaultTitle: 'CASPIRE Technologies | Sri Lankan IT & Digital Transformation Partner',
    defaultDescription: 'An end-to-end software engineering and digital transformation partner delivering secure, reliable and scalable business solutions for Sri Lankan enterprises and international clients.',
    siteUrl: 'https://www.caspiretechnologies.lk',
    organizationDescription: 'End-to-end software engineering and digital transformation partner in Sri Lanka.',
  },
} as const;
