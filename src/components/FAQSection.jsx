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
        "SheSync offers features for all aspects of women's health, including general wellness tracking, nutritional guidance, and mental health support.",
    },
    {
      question: 'Are the health articles on SheSync written by professionals?',
      answer:
        'Yes, all our educational content is created or reviewed by qualified healthcare professionals to ensure accuracy and relevance.',
    },
  ];

  return (
    <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-indigo-100 dark:from-pink-600 dark:via-purple-700 dark:to-indigo-800 rounded-2xl p-8 shadow-lg">
      <h3 className="text-3xl font-extrabold mb-8 text-center text-gray-900 dark:text-white tracking-tight">
        Frequently Asked Questions
      </h3>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="transition-transform transform hover:scale-105 hover:shadow-xl rounded-xl overflow-hidden"
          >
            <FAQItem
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => toggleIndex(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
