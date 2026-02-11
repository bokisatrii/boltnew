import React from 'react';
import RegistrationForm from '../components/register/RegistrationForm';
import AnimatedSection from '../components/ui/AnimatedSection';
import SEO from '../components/SEO';

const Register: React.FC = () => {
  return (
    <>
      <SEO
        title="Team Registration - Join Fantasy League | Three From The Corner"
        description="Register your team for the Three From The Corner fantasy basketball league. Compete with the best players and win prizes."
        keywords="team registration, fantasy league registration, basketball league, three from the corner registration, fantasy basketball registration"
        url="/register"
      />

      <div className="pt-24 pb-16">
      <div className="container">
        <AnimatedSection className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">Team Registration</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fill out the form to register your team for competition in Three From The Corner
          </p>
        </AnimatedSection>

        <RegistrationForm />
      </div>
      </div>
    </>
  );
};

export default Register;