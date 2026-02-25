import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../../components/SEO';
import { DollarSign, Users, FileText, AlertTriangle, CheckCircle, HelpCircle } from 'lucide-react';

const WhatIsNIL: React.FC = () => {
  const faqs = [
    {
      question: 'What does NIL stand for?',
      answer: 'NIL stands for Name, Image, and Likeness. It refers to the right of college athletes to profit from their personal brand while maintaining amateur status.',
    },
    {
      question: 'When did NIL rules change?',
      answer: 'The NCAA adopted an interim NIL policy on July 1, 2021, allowing student-athletes to monetize their name, image, and likeness without violating NCAA rules.',
    },
    {
      question: 'What can athletes do under NIL?',
      answer: 'Athletes can sign endorsement deals, create social media sponsored content, sell autographs, run camps/clinics, start businesses, and more.',
    },
    {
      question: 'Are there any restrictions?',
      answer: 'Yes, athletes cannot use school logos without permission, and deals cannot be used as recruiting inducements. Rules vary by state and school.',
    },
  ];

  return (
    <>
      <SEO
        title="What is NIL? - Understanding Name, Image, Likeness | Corner Three"
        description="Learn everything about NIL (Name, Image, Likeness) in college sports. How it works, what athletes can do, and how it's changing college basketball."
        keywords="NIL college sports, name image likeness, NCAA NIL, college athlete endorsements, NIL rules"
        url="/ncaa/what-is-nil"
      />

      <div className="pt-28 pb-16 bg-white">
        <div className="container">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <span className="inline-block px-3 py-1 text-xs font-bold uppercase text-white bg-blue-500 rounded mb-4">
              NCAA
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">What is NIL?</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding Name, Image, and Likeness in College Sports
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-8 mb-12"
            >
              <div className="flex items-center gap-4 mb-4">
                <DollarSign className="w-12 h-12" />
                <h2 className="text-2xl font-bold">The NIL Revolution</h2>
              </div>
              <p className="text-lg text-blue-100">
                NIL (Name, Image, and Likeness) refers to the ability of college athletes to monetize their personal brand. 
                Since July 2021, NCAA athletes can earn money from endorsements, sponsorships, social media, and other activities 
                without losing their eligibility.
              </p>
            </motion.section>

            {/* Key Points */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Things to Know</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: CheckCircle,
                    title: 'What Athletes CAN Do',
                    items: [
                      'Sign endorsement deals',
                      'Create sponsored social media content',
                      'Sell autographs and merchandise',
                      'Appear in commercials and ads',
                      'Host camps and clinics',
                      'Start their own businesses',
                    ],
                    color: 'green',
                  },
                  {
                    icon: AlertTriangle,
                    title: 'Restrictions to Know',
                    items: [
                      'Cannot use school logos without permission',
                      'Cannot conflict with school sponsors',
                      'Cannot be used for recruiting inducements',
                      'Must follow state-specific regulations',
                      'Must disclose deals to compliance office',
                      'Cannot interfere with team activities',
                    ],
                    color: 'red',
                  },
                ].map((section, index) => (
                  <motion.div
                    key={section.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-${section.color}-50 rounded-xl p-6`}
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <section.icon className={`w-6 h-6 text-${section.color}-500`} />
                      <h3 className="font-bold text-gray-900">{section.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {section.items.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-gray-700 text-sm">
                          <span className={`w-1.5 h-1.5 rounded-full bg-${section.color}-500 mt-2 flex-shrink-0`} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Impact on Basketball */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Impact on College Basketball</h2>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { icon: Users, label: 'Recruiting Changed', desc: 'NIL deals now factor into recruitment decisions' },
                    { icon: DollarSign, label: 'Big Money Deals', desc: 'Top players earning 6-7 figure deals' },
                    { icon: FileText, label: 'Transfer Portal Impact', desc: 'NIL opportunities influence transfers' },
                  ].map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="text-center"
                    >
                      <item.icon className="w-10 h-10 mx-auto text-blue-500 mb-3" />
                      <h4 className="font-bold text-gray-900 mb-1">{item.label}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* FAQs */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <HelpCircle className="w-7 h-7 text-blue-500" />
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={faq.question}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="border border-gray-200 rounded-xl p-6"
                  >
                    <h3 className="font-bold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </motion.div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhatIsNIL;
