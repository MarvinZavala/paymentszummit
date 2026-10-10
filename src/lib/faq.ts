export type FAQ = { question: string; answer: string };

export const faqData = {
  general: [
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards including Visa, MasterCard, American Express, and Discover. We also support digital wallets like Apple Pay, Google Pay, and Samsung Pay.'
    },
    {
      question: 'How quickly can I start processing payments?',
      answer: 'Most merchants can start processing payments within 24-48 hours after approval. Our streamlined onboarding process ensures you get up and running as quickly as possible.'
    },
    {
      question: 'What are your processing fees?',
      answer: 'Our processing fees start as low as 0% for qualifying merchants. We offer competitive rates tailored to your business volume and industry. Contact us for a personalized quote.'
    },
    {
      question: 'Do you provide equipment?',
      answer: 'Yes, we provide a full range of payment processing equipment including POS systems, mobile card readers, and e-commerce gateways. All equipment comes with training and ongoing support.'
    }
  ],
  technical: [
    {
      question: 'What if my terminal stops working?',
      answer: 'We provide 24/7 technical support. If your terminal malfunctions, we can troubleshoot remotely or send a replacement device within 24 hours.'
    },
    {
      question: 'How do I integrate with my existing POS system?',
      answer: 'Our payment solutions integrate with most popular POS systems. Our technical team will assist with the integration process and provide ongoing support.'
    },
    {
      question: 'What security measures are in place?',
      answer: 'We maintain PCI DSS compliance and use end-to-end encryption for all transactions. Our systems include advanced fraud detection and prevention tools.'
    },
    {
      question: 'Can I process payments offline?',
      answer: 'Yes, our terminals can store transactions when offline and process them automatically when connectivity is restored.'
    }
  ],
  billing: [
    {
      question: 'When do I receive my funds?',
      answer: 'Standard funding is next business day. We also offer same-day funding for qualifying merchants at competitive rates.'
    },
    {
      question: 'Are there any hidden fees?',
      answer: 'No hidden fees. We provide transparent pricing with all costs clearly outlined in your merchant agreement. What you see is what you pay.'
    },
    {
      question: 'How do chargebacks work?',
      answer: 'We provide comprehensive chargeback management including dispute resolution assistance and prevention tools to minimize chargeback occurrences.'
    },
    {
      question: 'Can I get detailed transaction reports?',
      answer: 'Yes, our merchant portal provides detailed real-time reporting including transaction history, settlement reports, and business analytics.'
    }
  ],
  account: [
    {
      question: 'How do I update my account information?',
      answer: 'You can update your account information through our secure merchant portal or by contacting your dedicated account manager directly.'
    },
    {
      question: 'Who is my account manager?',
      answer: 'Every merchant is assigned a dedicated account manager who serves as your primary point of contact for all account-related matters.'
    },
    {
      question: 'Can I add additional locations?',
      answer: 'Yes, we support multi-location businesses. Your account manager can help you add new locations and manage them from a single dashboard.'
    },
    {
      question: 'What if I want to cancel my account?',
      answer: 'We offer flexible terms with no long-term contracts for most merchants. Contact your account manager to discuss any concerns before making a decision.'
    }
  ]
};

export const allFaqs: FAQ[] = Object.values(faqData).flat();
