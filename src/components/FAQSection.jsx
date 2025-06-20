
import FAQItem from './FAQItem';

import React, { useState } from 'react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const faqs = [
    {
      question: 'Is my data safe and private?',
      answer:
        'Yes, we take your privacy seriously. All your data is encrypted and we never share your personal information with third parties.',
    },
    {
      question: 'Can I use SheSync if I have irregular cycles?',
      answer:
        'SheSync is designed to accommodate all types of cycles, including irregular ones. Our AI adapts to your unique patterns over time.',
    },
    {
      question: 'How often should I log my symptoms?',
      answer:
        'For the best results, we recommend logging your symptoms daily. However, even logging a few times a week can provide valuable insights.',
    },
    {
      question: 'How does SheSync protect my privacy?',
      answer:
        'We use state-of-the-art encryption and follow strict data protection protocols. Your personal information is never sold or shared with third parties without your explicit consent.',
    },
    {
      question: "Can I use SheSync if I'm not menstruating?",
      answer:
        'SheSync offers features for all aspects of women\'s health, including general wellness tracking, nutritional guidance, and mental health support.',
    },
    {
      question: 'Are the health articles on SheSync written by professionals?',
      answer:
        'Yes, all our educational content is created or reviewed by qualified healthcare professionals to ensure accuracy and relevance.',
    },
  ];

  return (
    <div className="hover:!bg-transparent hover:!shadow-none hover:!scale-100 transition-none transform-none focus:outline-none focus:ring focus:ring-pink-300">
      <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
        Frequently Asked Questions
      </h3>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={() => toggleIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
