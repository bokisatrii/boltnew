import React from 'react';
import RegistrationForm from '../components/register/RegistrationForm';
import AnimatedSection from '../components/ui/AnimatedSection';
import SEO from '../components/SEO';

const Register: React.FC = () => {
  return (
    <>
      <SEO
        title="Prijava Ekipe - Pridružite se Fantasy Ligi | Trojka iz ćoška"
        description="Prijavite svoju ekipu za fantasy košarkašku ligu Trojka iz ćoška. Takmičite se sa najboljim igračima u regionu i osvajajte nagrade."
        keywords="prijava ekipe, fantasy liga registracija, košarkaška liga, trojka iz ćoška prijava, fantasy basketball registration"
        url="/register"
      />

      <div className="pt-24 pb-16">
      <div className="container">
        <AnimatedSection className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">Prijava ekipe</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Popunite formular da prijavite svoju ekipu za takmičenje u Trojka iz ćoška
          </p>
        </AnimatedSection>

        <RegistrationForm />
      </div>
      </div>
    </>
  );
};

export default Register;