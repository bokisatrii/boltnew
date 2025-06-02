import React, { useEffect } from 'react';
import { Telescope as Mail, MapPin, Phone } from 'lucide-react';
import AnimatedSection from '../components/ui/AnimatedSection';

const Contact: React.FC = () => {
  useEffect(() => {
    document.title = 'BasketLiga - Kontakt';
  }, []);

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <AnimatedSection className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">Kontakt</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Imate pitanje ili predlog? Kontaktirajte nas!
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <AnimatedSection className="order-2 md:order-1">
            <div className="bg-white rounded-lg shadow-lg p-8 h-full">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Pošaljite nam poruku</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="form-control">
                    <label htmlFor="name" className="form-label">
                      Ime i prezime
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="form-input"
                      placeholder="Vaše ime i prezime"
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
                      placeholder="Vaša email adresa"
                    />
                  </div>
                </div>
                
                <div className="form-control">
                  <label htmlFor="subject" className="form-label">
                    Naslov
                  </label>
                  <input
                    id="subject"
                    type="text"
                    className="form-input"
                    placeholder="Naslov vaše poruke"
                  />
                </div>
                
                <div className="form-control">
                  <label htmlFor="message" className="form-label">
                    Poruka
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="form-input resize-none"
                    placeholder="Unesite vašu poruku..."
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="btn-primary w-full sm:w-auto"
                  >
                    Pošalji poruku
                  </button>
                </div>
              </form>
            </div>
          </AnimatedSection>
          
          <AnimatedSection className="order-1 md:order-2">
            <div className="bg-blue-600 text-white rounded-lg shadow-lg p-8 h-full">
              <h2 className="text-2xl font-bold mb-6">Informacije o kontaktu</h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mt-1">
                    <MapPin className="w-6 h-6 text-orange-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Adresa</h3>
                    <p className="mt-1 text-blue-100">
                      Sportska 123<br />
                      11000 Beograd<br />
                      Srbija
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mt-1">
                    <Phone className="w-6 h-6 text-orange-400" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">Telefon</h3>
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
                <h3 className="text-lg font-semibold mb-4">Radno vreme</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Ponedeljak - Petak:</span>
                    <span>09:00 - 17:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Subota:</span>
                    <span>10:00 - 14:00</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Nedelja:</span>
                    <span>Zatvoreno</span>
                  </li>
                </ul>
              </div>
              
              <div className="mt-10">
                <h3 className="text-lg font-semibold mb-4">O BasketLigi</h3>
                <p className="text-blue-100">
                  BasketLiga je profesionalna košarkaška liga osnovana 2025. godine sa ciljem da promoviše i razvija košarku u regionu. Kroz godine, liga je izrasla u prestižno takmičenje koje okuplja najbolje košarkaške ekipe i talente.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
};

export default Contact;