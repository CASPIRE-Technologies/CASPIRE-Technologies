
import { PrismaClient, RoleType } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Seed Site Settings
  const settings = [
    { key: 'company_name', value: 'Caspire Technologies (Pvt) Ltd', description: 'Official registered company name' },
    { key: 'company_email', value: 'caspiretechnologies@gmail.com', description: 'Primary contact email' },
    { key: 'company_phone', value: '+94 11 234 5678', description: 'Primary office telephone' },
    { key: 'company_whatsapp', value: '+94 77 123 4567', description: 'WhatsApp business contact' },
    { key: 'company_address', value: 'Level 12, West Tower, World Trade Center, Colombo 01, Sri Lanka', description: 'Headquarters physical address' },
    { key: 'company_linkedin', value: 'https://www.linkedin.com/company/apex-software-lk', description: 'Official LinkedIn page' },
    { key: 'meta_default_title', value: 'Apex Software Engineering | Sri Lankan IT & Digital Transformation Partner', description: 'Default homepage title' },
    { key: 'meta_default_description', value: 'An end-to-end software engineering and digital transformation partner delivering secure, reliable and scalable business solutions for Sri Lankan enterprises and international clients.', description: 'Default homepage description' },
  ];

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value, description: setting.description },
      create: setting,
    });
  }
  console.log('✅ Site settings seeded');

  // 2. Seed Admin User
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@apexsoftware.lk';
  const adminPassword = process.env.ADMIN_PASSWORD || 'AdminPass123!';
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash, role: RoleType.SUPERADMIN },
    create: {
      email: adminEmail,
      name: 'System Administrator',
      passwordHash,
      role: RoleType.SUPERADMIN,
      status: 'ACTIVE',
    },
  });
  console.log(`✅ Admin user seeded: ${admin.email}`);

  // 3. Seed Primary Services
  const services = [
    {
      slug: 'custom-web-applications',
      title: 'Custom Web Applications',
      icon: 'code',
      shortDesc: 'Tailor-made web applications designed for high performance, enterprise security, and long-term scalability.',
      fullDesc: 'We architect and build bespoke web applications engineered for complex business requirements. Moving beyond generic templates, our software is structured for high availability, security compliance, and seamless multi-system integrations.',
      customerProblem: 'Off-the-shelf software often forces businesses into rigid workflows, lacks essential local integrations, and incurs high recurring licensing fees without delivering full fit.',
      proposedSolution: 'Custom-engineered web platforms built on modern frontend and backend frameworks that exactly match your operational processes and scale with your growth.',
      mainCapabilities: JSON.stringify(['Modern SPA & SSR Architecture', 'Modular Micro-Frontends & APIs', 'Multi-tenant Enterprise Portals', 'Role-based Security & Audit Trails']),
      typicalDeliverables: JSON.stringify(['Web Application Architecture Document', 'Production-ready Source Code & CI/CD', 'Automated Test Suites', 'User Manuals & Admin Training']),
      suitableIndustries: JSON.stringify(['SMEs & Corporates', 'Financial & Professional Services', 'Education & Logistics']),
      deliveryApproach: 'Iterative Agile delivery with two-week sprints, independent quality engineering validation, and continuous client review.',
      displayOrder: 1,
    },
    {
      slug: 'sme-digital-transformation',
      title: 'SME Workflow Digitization',
      icon: 'cpu',
      shortDesc: 'Automate manual paper processes, eliminate spreadsheet errors, and digitize core business operations.',
      fullDesc: 'Empower Sri Lankan small and medium enterprises to transition from manual registers and fragmented spreadsheets to centralized, cloud-accessible workflow management systems.',
      customerProblem: 'Growing SMEs face data silos, lost paperwork, delayed customer responses, and difficulty generating accurate management reports.',
      proposedSolution: 'Unified digital workflow platforms for order processing, approval hierarchies, inventory control, and customer management.',
      mainCapabilities: JSON.stringify(['Custom Workflow & Approval Routing', 'Digital Record Keeping & Document Management', 'Real-time Operations Dashboards', 'SMS & WhatsApp Customer Notifications']),
      typicalDeliverables: JSON.stringify(['Process Audit & Gap Analysis', 'Custom Web Portal', 'Local Payment & Billing Modules', 'Staff Training & Onboarding']),
      suitableIndustries: JSON.stringify(['Retail & Distribution', 'Logistics', 'Construction & Engineering', 'Education']),
      deliveryApproach: 'Phase-by-phase rollout prioritizing high-impact quick wins to minimize operational disruption during transition.',
      displayOrder: 2,
    },
    {
      slug: 'backend-api-development',
      title: 'Backend & API Development',
      icon: 'server',
      shortDesc: 'Robust RESTful and GraphQL APIs, microservices architecture, and secure enterprise integration layers.',
      fullDesc: 'We construct high-throughput, fault-tolerant backend infrastructures that power web platforms, mobile apps, and third-party partner integrations.',
      customerProblem: 'Legacy backend systems struggle with peak user concurrency, lack proper security headers, and crash during high-volume transactions.',
      proposedSolution: 'Scalable NestJS / Node.js backend services with structured logging, rate limiting, tokenized authentication, and automated database connection pooling.',
      mainCapabilities: JSON.stringify(['RESTful & GraphQL API Design', 'Swagger / OpenAPI Specification', 'JWT Auth & Refresh Token Rotation', 'Payment Gateway & ERP Integrations']),
      typicalDeliverables: JSON.stringify(['OpenAPI Documentation', 'Postman Collection Suites', 'Containerized Backend Services', 'Database Migration Scripts']),
      suitableIndustries: JSON.stringify(['FinTech', 'E-Commerce', 'Logistics', 'Digital Agencies']),
      deliveryApproach: 'Domain-Driven Design (DDD) with rigorous unit testing, DTO validation, and automated swagger contract testing.',
      displayOrder: 3,
    },
    {
      slug: 'qa-and-test-automation',
      title: 'QA & Test Automation',
      icon: 'shield-check',
      shortDesc: 'Independent quality engineering, automated regression testing, performance profiling, and security testing.',
      fullDesc: 'Protect your brand reputation and software quality with independent software testing services. We eliminate bugs before deployment through comprehensive manual testing and automated test frameworks.',
      customerProblem: 'Releasing unverified software leads to unexpected downtime, security vulnerabilities, customer complaints, and expensive emergency patches.',
      proposedSolution: 'Independent QA validation embedding regression test suites, API functional tests, cross-browser compatibility checks, and load stress testing.',
      mainCapabilities: JSON.stringify(['Automated End-to-End Testing', 'API & Integration Testing', 'Security Vulnerability Scanning', 'Load & Stress Performance Testing']),
      typicalDeliverables: JSON.stringify(['Master Test Plan & Strategy', 'Automated Test Scripts', 'Bug Traceability Reports', 'Release Readiness Certificate']),
      suitableIndustries: JSON.stringify(['Software Startups', 'Corporate IT Departments', 'E-Commerce Platforms']),
      deliveryApproach: 'Independent QA pipeline integration, running automated test gates before staging and production deployments.',
      displayOrder: 4,
    },
    {
      slug: 'cloud-deployment-devops',
      title: 'Cloud Deployment & DevOps',
      icon: 'cloud',
      shortDesc: 'Automated CI/CD pipelines, Docker containerization, cloud infrastructure management, and monitoring.',
      fullDesc: 'We help teams deploy software with speed, reliability, and security using modern DevOps practices and managed cloud environments.',
      customerProblem: 'Manual server deployments are error-prone, cause unexpected downtime, and leave servers vulnerable due to missing security configurations.',
      proposedSolution: 'Automated containerized deployment pipelines with Docker, zero-downtime rolling updates, automated backups, and 24/7 uptime health checks.',
      mainCapabilities: JSON.stringify(['Docker Containerization', 'Automated CI/CD Pipelines', 'Infrastructure as Code', 'SSL & Firewall Security Setup']),
      typicalDeliverables: JSON.stringify(['Docker Compose & Deployment Manifests', 'CI/CD Workflow Scripts', 'Server Monitoring Dashboards', 'Disaster Recovery Runbooks']),
      suitableIndustries: JSON.stringify(['Digital Agencies', 'Enterprise IT', 'SME Software Platforms']),
      deliveryApproach: 'Infrastructure setup paired with developer training and automated health monitoring alerts.',
      displayOrder: 5,
    },
    {
      slug: 'seo',
      title: 'SEO',
      icon: 'search',
      shortDesc: 'Technical, on-page, and local SEO improvements that help customers find your business through organic search.',
      fullDesc: 'We improve search visibility through technical SEO audits, search-intent mapping, on-page optimization, local SEO guidance, and content recommendations that help qualified customers discover your business organically.',
      customerProblem: 'A polished website still loses qualified leads when search engines cannot understand the site structure, content, local relevance, or technical quality.',
      proposedSolution: 'A practical SEO program covering technical fixes, keyword-led content improvements, local business visibility, metadata, internal linking, and performance hygiene.',
      mainCapabilities: JSON.stringify(['Technical SEO Audits', 'Keyword & Search Intent Mapping', 'On-page Metadata Improvements', 'Local SEO & Google Business Profile Guidance']),
      typicalDeliverables: JSON.stringify(['SEO Audit Report', 'Keyword Plan', 'Optimized Page Titles & Meta Descriptions', 'Monthly Organic Visibility Recommendations']),
      suitableIndustries: JSON.stringify(['SMEs & Corporates', 'Tourism & Hospitality', 'Retail & Distribution', 'Professional Services']),
      deliveryApproach: 'We prioritize search improvements that compound over time, starting with technical health and high-intent pages before expanding content coverage.',
      displayOrder: 6,
    },
    {
      slug: 'social-media-marketing',
      title: 'Social Media Marketing',
      icon: 'social',
      shortDesc: 'Organic social media planning, content calendars, creative posts, and profile management without paid boosting.',
      fullDesc: 'We plan and manage organic social media activity with consistent messaging, content calendars, creative post concepts, captions, and profile improvements. This service does not include paid boosting or ad spend management.',
      customerProblem: 'Many businesses post inconsistently, use unclear messaging, or rely on disconnected visuals that do not build trust with their target audience.',
      proposedSolution: 'Organic social media marketing focused on content planning, brand-aligned messaging, post design, caption writing, scheduling, and profile consistency without paid boosting.',
      mainCapabilities: JSON.stringify(['Organic Content Strategy', 'Monthly Content Calendars', 'Post Copy & Creative Direction', 'Profile Optimization']),
      typicalDeliverables: JSON.stringify(['Social Media Content Plan', 'Designed Post Concepts', 'Captions & Hashtag Sets', 'Monthly Performance Review']),
      suitableIndustries: JSON.stringify(['SMEs & Corporates', 'Tourism & Hospitality', 'Education & Training', 'Retail & Distribution']),
      deliveryApproach: 'We build consistent organic visibility with planned content themes, clear messaging, and review cycles that keep posts aligned with business goals.',
      displayOrder: 7,
    },
  ];

  for (const s of services) {
    await prisma.service.upsert({
      where: { slug: s.slug },
      update: s,
      create: s,
    });
  }
  await prisma.service.deleteMany({ where: { slug: 'dedicated-engineering-teams' } });
  console.log('✅ Services seeded');

  // 4. Seed Industries
  const industries = [
    {
      slug: 'construction-engineering',
      title: 'Construction & Engineering',
      icon: 'building',
      shortDesc: 'Project tracking, material inventory, subcontractor approvals, and site progress monitoring.',
      fullDesc: 'Digitize field operations, material requisition workflows, project milestone tracking, and quotation approvals for construction firms in Sri Lanka.',
      useCases: JSON.stringify([
        'Material Requisition & Purchase Order Approval Workflows',
        'Daily Subcontractor Site Progress & Labour Logging',
        'Client Payment Milestone Tracking & Variation Orders',
        'Centralized Architectural Document & Drawing Versioning'
      ]),
      displayOrder: 1,
    },
    {
      slug: 'tourism-hospitality',
      title: 'Tourism & Hospitality',
      icon: 'compass',
      shortDesc: 'Direct booking engines, tour itinerary builders, guest management, and local payment gateways.',
      fullDesc: 'Elevate Sri Lankan boutique hotels, tour operators, and hospitality providers with custom web platforms, automated booking calendars, and direct payment processing.',
      useCases: JSON.stringify([
        'Boutique Hotel Direct Reservation Engine with PayHere/LankaPay',
        'Tailor-made Tour Itinerary Builder & Invoicing Platform',
        'Guest Registration & Multi-currency Voucher Management',
        'Channel Manager & Property Management System API Integrations'
      ]),
      displayOrder: 2,
    },
    {
      slug: 'education-training',
      title: 'Education & Training',
      icon: 'book-open',
      shortDesc: 'Student enrollment portals, course management, automated billing, and certificate generation.',
      fullDesc: 'Streamline operations for vocational institutes, corporate training providers, and educational organizations with complete digital portals.',
      useCases: JSON.stringify([
        'Online Student Registration & Course Fee Instalment Scheduling',
        'Batch Scheduling & Lecturer Timetable Management',
        'Automated QR Code Student Attendance & Digital Certificates',
        'Student Assignment Submission & Results Portal'
      ]),
      displayOrder: 3,
    },
    {
      slug: 'retail-distribution',
      title: 'Retail & Distribution',
      icon: 'shopping-cart',
      shortDesc: 'B2B ordering portals, stock control, sales representative field tracking, and multi-store billing.',
      fullDesc: 'Empower Sri Lankan distributors and retailers to manage high-volume stock movements, representative orders, and customer accounts with ease.',
      useCases: JSON.stringify([
        'Sales Representative Mobile B2B Order Entry Portal',
        'Multi-warehouse Inventory Balance & Low Stock Alerts',
        'Credit Limit Enforcement & Invoice Settlement Tracking',
        'Integration with Local E-Commerce Storefronts'
      ]),
      displayOrder: 4,
    },
    {
      slug: 'startups-digital-agencies',
      title: 'Startups & Digital Agencies',
      icon: 'rocket',
      shortDesc: 'Outsourced engineering, MVP development, backend microservices, and dedicated QA teams.',
      fullDesc: 'Accelerate your product roadmap by pairing your product strategy with reliable Sri Lankan engineering and QA execution teams.',
      useCases: JSON.stringify([
        'Rapid MVP Architecture & Prototype Delivery',
        'Scalable Backend API & Database Infrastructure',
        'Independent QA Regression & Release Validation',
        'Long-term Feature Enhancements & Cloud Maintenance'
      ]),
      displayOrder: 5,
    },
  ];

  for (const ind of industries) {
    await prisma.industry.upsert({
      where: { slug: ind.slug },
      update: ind,
      create: ind,
    });
  }
  console.log('✅ Industries seeded');

  // 5. Seed Portfolio Projects (Demonstration projects)
  const portfolio = [
    {
      slug: 'lankalogistics-erp-tracking-platform',
      title: 'LankaLogistics ERP & Fleet Management System',
      summary: 'Demonstration Case Study: A centralized web portal digitizing dispatch schedules, waypoint tracking, and driver payout management.',
      clientIndustry: 'Logistics & Distribution',
      challenges: 'Manual phone coordination for 120+ daily freight runs resulted in billing delays and untracked trip expenses.',
      solution: 'Architected a custom Angular SSR web platform with NestJS backend, role-based dispatcher views, automated invoicing, and SMS notifications.',
      outcomes: JSON.stringify([
        'Reduced freight dispatch turnaround time by 65%',
        'Eliminated paper consignment notes across 4 regional hubs',
        'Automated daily trip reconciliation and invoice generation'
      ]),
      technologies: JSON.stringify(['Angular', 'NestJS', 'MySQL', 'Prisma', 'Docker', 'SMS Gateway']),
      isFeatured: true,
      displayOrder: 1,
    },
    {
      slug: 'ceylonstay-hospitality-booking-engine',
      title: 'CeylonStay Boutique Hotel Direct Booking Engine',
      summary: 'Demonstration Case Study: Direct guest booking and payment platform with multi-currency support and real-time room availability calendar.',
      clientIndustry: 'Tourism & Hospitality',
      challenges: 'High commission fees paid to international OTAs combined with slow instant booking confirmations.',
      solution: 'Built a high-converting web booking engine integrated with local payment gateways (PayHere, LankaPay) and instant WhatsApp confirmation alerts.',
      outcomes: JSON.stringify([
        'Increased direct online booking volume by 42%',
        'Saved over 15% in OTA commission costs per booking',
        'Achieved sub-1.2s page load speed across mobile devices'
      ]),
      technologies: JSON.stringify(['Angular SSR', 'TypeScript', 'NestJS', 'PayHere IPG', 'SCSS']),
      isFeatured: true,
      displayOrder: 2,
    },
    {
      slug: 'buildtrack-construction-quotation-manager',
      title: 'BuildTrack Construction Project & Material Tracker',
      summary: 'Demonstration Case Study: Quotation workflow and material requisition portal for mid-sized engineering contractors.',
      clientIndustry: 'Construction & Engineering',
      challenges: 'Uncontrolled cost variations and slow site material approval chains led to project margin erosion.',
      solution: 'Implemented a structured multi-level approval portal for material requisitions with automated budget limit checks and PO generation.',
      outcomes: JSON.stringify([
        'Reduced site material approval cycle from 4 days to 4 hours',
        'Provided real-time cost variance tracking per project milestone',
        'Standardized quotation templates for commercial tenders'
      ]),
      technologies: JSON.stringify(['Angular', 'NestJS', 'Prisma', 'MySQL', 'PDF Generator']),
      isFeatured: true,
      displayOrder: 3,
    },
  ];

  for (const p of portfolio) {
    await prisma.portfolioProject.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
  console.log('✅ Portfolio seeded');

  // 6. Seed Blog Categories & Posts
  const catSme = await prisma.blogCategory.upsert({
    where: { slug: 'sme-digitization' },
    update: { name: 'SME Digitization', description: 'Practical insights on software adoption for Sri Lankan SMEs.' },
    create: { slug: 'sme-digitization', name: 'SME Digitization', description: 'Practical insights on software adoption for Sri Lankan SMEs.' },
  });

  const catQa = await prisma.blogCategory.upsert({
    where: { slug: 'quality-engineering' },
    update: { name: 'Quality Engineering', description: 'Software testing, QA strategies, and bug prevention.' },
    create: { slug: 'quality-engineering', name: 'Quality Engineering', description: 'Software testing, QA strategies, and bug prevention.' },
  });

  const catCloud = await prisma.blogCategory.upsert({
    where: { slug: 'cloud-security' },
    update: { name: 'Cloud & Security', description: 'Application maintenance, cloud deployment, and data protection.' },
    create: { slug: 'cloud-security', name: 'Cloud & Security', description: 'Application maintenance, cloud deployment, and data protection.' },
  });

  const posts = [
    {
      slug: 'modernizing-legacy-systems-sri-lankan-smes',
      title: 'Modernizing Legacy Systems for Sri Lankan SMEs: A Practical Roadmap',
      excerpt: 'How growing business enterprises can replace error-prone manual spreadsheets with secure, scalable custom web applications.',
      content: `
Many established businesses in Sri Lanka rely heavily on legacy spreadsheets, physical paper ledgers, or disconnected software tools. While these methods may work in the initial years, they create significant bottlenecks as operations expand across locations and staff counts grow.

### Common Signs Your Business Has Outgrown Manual Tools
1. **Data Inconsistencies**: Different departments maintain conflicting versions of inventory, customer pricing, or project status.
2. **Delayed Invoicing**: Approval cycles take days due to physical signature requirements.
3. **Lack of Management Visibility**: Generating monthly revenue or stock balance reports requires hours of manual compilation.

### The Phased Digitization Approach
Transitioning to custom digital workflows does not require replacing everything overnight. A phased modernization approach ensures operational continuity:
- **Phase 1: High-Impact Pain Point**: Digitize the most urgent process first (e.g., customer order intake or material requisitions).
- **Phase 2: Data Consolidation**: Unify customer, inventory, and transaction records into a single relational database.
- **Phase 3: Integration & Reporting**: Add digital payment gateways, SMS notifications, and real-time executive dashboards.

By adopting a modular architecture, Sri Lankan SMEs achieve digital maturity with predictable investment and zero operational downtime.
      `,
      categoryId: catSme.id,
      tags: JSON.stringify(['SME', 'Digital Transformation', 'Software Modernization', 'Sri Lanka']),
      authorName: 'Apex Engineering Team',
      readTimeMinutes: 5,
    },
    {
      slug: 'why-independent-qa-saves-maintenance-costs',
      title: 'Why Independent Quality Engineering Saves 40% of Software Maintenance Costs',
      excerpt: 'Discover why separating software development from testing prevents production failures and reduces emergency code hotfixes.',
      content: `
In software development, there is a natural cognitive bias when developers test their own code. Because a developer understands how the feature *should* work, edge cases and unhandled user inputs frequently slip into production unnoticed.

### The Cost of Bugs at Different Stages
Software engineering research consistently shows that fixing a defect in production costs up to 10 to 30 times more than catching it during the initial testing phase.

### Key Benefits of Independent QA
1. **Unbiased Validation**: QA engineers evaluate software strictly against business requirements and real-world user scenarios.
2. **Automated Regression Suites**: Automated tests verify that new features do not break existing functionality.
3. **Security & Performance Readiness**: Dedicated testing ensures applications remain resilient under heavy user loads and resist malicious input injections.

Embedding independent QA into your software delivery lifecycle guarantees that releases are reliable, stable, and ready for end users.
      `,
      categoryId: catQa.id,
      tags: JSON.stringify(['Software Testing', 'QA as a Service', 'Test Automation', 'Quality Assurance']),
      authorName: 'Apex QA Practice Lead',
      readTimeMinutes: 6,
    },
    {
      slug: 'securing-digital-payments-for-south-asian-e-commerce',
      title: 'Securing Digital Payments & Compliance for South Asian E-Commerce',
      excerpt: 'Best practices for integrating PayHere, LankaPay, and international payment gateways with secure backend security tokenization.',
      content: `
E-commerce adoption in Sri Lanka and South Asia is accelerating rapidly. However, customer confidence depends directly on how securely payment transactions and personal data are handled.

### Core Security Practices for Digital Payment Integration
- **Tokenization Over Storage**: Never store raw credit card numbers or sensitive CVV codes on your internal database. Rely on gateway tokenization.
- **Server-Side Verification**: Validate transaction status via direct server-to-server IPG webhooks rather than relying solely on client-side redirect responses.
- **Encrypted Transmission**: Enforce strict HTTPS/TLS 1.3 encryption across all communication endpoints.

Adhering to security-first architecture ensures full compliance while building lasting trust with your digital customers.
      `,
      categoryId: catCloud.id,
      tags: JSON.stringify(['E-Commerce', 'Payment Gateways', 'Security', 'LankaPay', 'PayHere']),
      authorName: 'Apex Security Team',
      readTimeMinutes: 4,
    },
  ];

  for (const post of posts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
  console.log('✅ Blog posts seeded');

  // 7. Seed Team Capability Profiles
  const team = [
    {
      name: 'Frontend Engineering Practice',
      title: 'Senior Frontend Architecture Pod',
      roleCategory: 'Frontend',
      bio: 'Specialized in building high-performance Angular applications with standalone components, Signals state management, SSR for optimal SEO, and accessible WCAG 2.1 AA design systems.',
      capabilityArea: 'Angular, TypeScript, SCSS, Web Vitals Optimization',
      displayOrder: 1,
    },
    {
      name: 'Backend & API Practice',
      title: 'Enterprise Backend Engineering Pod',
      roleCategory: 'Backend',
      bio: 'Focused on designing scalable NestJS microservices, relational database design with Prisma/MySQL, secure RESTful APIs, JWT refresh token rotation, and third-party ERP/IPG integrations.',
      capabilityArea: 'Node.js, NestJS, Prisma, MySQL 8, Swagger, Security Headers',
      displayOrder: 2,
    },
    {
      name: 'Quality Engineering Practice',
      title: 'Independent QA & Automation Pod',
      roleCategory: 'QA',
      bio: 'Delivering end-to-end automated testing frameworks, manual functional verification, API security audits, and performance stress testing for web and mobile platforms.',
      capabilityArea: 'Test Automation, API Testing, Regression Suites, Security Audits',
      displayOrder: 3,
    },
  ];

  for (const t of team) {
    const existing = await prisma.teamMember.findFirst({ where: { name: t.name } });
    if (existing) {
      await prisma.teamMember.update({ where: { id: existing.id }, data: t });
    } else {
      await prisma.teamMember.create({ data: t });
    }
  }
  console.log('✅ Team capability profiles seeded');

  // 8. Seed Initial Sample Enquiry
  const sampleEnquiry = await prisma.enquiry.findFirst({ where: { email: 'client@example.lk' } });
  if (!sampleEnquiry) {
    await prisma.enquiry.create({
      data: {
        name: 'Kusal Perera',
        company: 'Lanka Construction & Engineering Ltd',
        email: 'client@example.lk',
        telephone: '+94 77 987 6543',
        country: 'Sri Lanka',
        serviceOfInterest: 'SME Workflow Digitization',
        budgetRange: '$5,000 - $10,000',
        preferredContactMethod: 'Email',
        description: 'We are seeking to digitize our site material requisition and subcontractor billing workflow across 5 construction sites.',
        status: EnquiryStatus.NEW,
        consent: true,
      },
    });
    console.log('✅ Sample enquiry seeded');
  }

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
