import React from 'react';
import { Telescope as Mail, MapPin, Phone } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
  return (
    <>
      <SEO
        title="Contact - Get in Touch | Three From The Corner"
        description="Get in touch with the Three From The Corner team. Have questions about the fantasy league, podcast, or want to become part of our community? Contact us!"
        keywords="contact three from the corner, basketball podcast contact, fantasy league contact, basketball podcast contact"
        url="/contact"
      />

      <div className="pt-24 pb-16">
      <div className="container">
        <AnimatedSection className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">Contact</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have a question or suggestion? Contact us!
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <AnimatedSection className="order-2 md:order-1">
            <div className="bg-white rounded-lg shadow-lg p-8 h-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a message</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label htmlFor="name" className="form-label">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="form-input"
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="form-control">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="form-input"
                      placeholder="Your email address"
                    />
                  </div>
                </div>
                
                <div className="form-control">
                  <label htmlFor="subject" className="form-label">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    className="form-input"
                    placeholder="Subject of your message"
                  />
                </div>

                <div className="form-control">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="form-input resize-none"
                    placeholder="Enter your message..."
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="btn-primary w-full sm:w-auto"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </AnimatedSection>
          
          <AnimatedSection className="order-1 md:order-2">
            <div className="bg-blue-600 text-white rounded-lg shadow-lg p-8 h-full">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mt-1">
                    <MapPin className="w-6 h-6 text-orange-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Address</h3>
                    <p className="mt-1 text-blue-100">
                      Sportska 123<br />
                      11000 Belgrade<br />
                      Serbia
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1">
                    <Phone className="w-6 h-6 text-orange-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Phone</h3>
                    <p className="mt-1 text-blue-100">
                      +381 11 123 4567<br />
                      +381 63 789 4561
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1">
                    <Mail className="w-6 h-6 text-orange-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Email</h3>
                    <p className="mt-1 text-blue-100">
                      info@basketliga.rs<br />
                      podrska@basketliga.rs
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h3 className="text-lg font-semibold mb-4">Office Hours</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span>09:00 - 17:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Saturday:</span>
                    <span>10:00 - 14:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Sunday:</span>
                    <span>Closed</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-10">
                <h3 className="text-lg font-semibold mb-4">About Three From The Corner</h3>
                <p className="text-blue-100">
                  Three From The Corner is a basketball podcast founded in 2025 with the goal of promoting and developing basketball. Through episodes, the podcast has grown into a prestigious platform that brings together the best basketball analysis and fantasy league.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
      </div>
    </>
  );
};

export default Contact;