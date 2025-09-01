import React, { useEffect } from 'react';
import RegistrationForm from '../components/register/RegistrationForm';
import AnimatedSection from '../components/ui/AnimatedSection';

const Register: React.FC = () => {
  useEffect(() => {
    document.title = 'Trojka iz ćoška - Prijava ekipe';
  }, []);

  return (
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
  );
};

export default Register;