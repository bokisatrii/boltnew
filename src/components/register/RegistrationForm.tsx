import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import AnimatedSection from '../ui/AnimatedSection';

interface FormData {
  teamName: string;
  captainName: string;
  email: string;
  phone: string;
  playerCount: string;
  experience: string;
  message: string;
}

const RegistrationForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form submitted:', data);
    setSubmitSuccess(true);
    reset();
    setIsSubmitting(false);
    
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  return (
    <AnimatedSection>
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {submitSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg">
              <p className="font-medium">Registration submitted successfully!</p>
              <p className="text-sm">We'll contact you soon with more information.</p>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label htmlFor="teamName" className="form-label">Team Name *</label>
                <input
                  id="teamName"
                  type="text"
                  className={`form-input ${errors.teamName ? 'border-red-500' : ''}`}
                  placeholder="Enter your team name"
                  {...register('teamName', { required: 'Team name is required' })}
                />
                {errors.teamName && (
                  <span className="text-red-500 text-sm mt-1">{errors.teamName.message}</span>
                )}
              </div>

              <div className="form-control">
                <label htmlFor="captainName" className="form-label">Captain Name *</label>
                <input
                  id="captainName"
                  type="text"
                  className={`form-input ${errors.captainName ? 'border-red-500' : ''}`}
                  placeholder="Enter captain's name"
                  {...register('captainName', { required: 'Captain name is required' })}
                />
                {errors.captainName && (
                  <span className="text-red-500 text-sm mt-1">{errors.captainName.message}</span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label htmlFor="email" className="form-label">Email *</label>
                <input
                  id="email"
                  type="email"
                  className={`form-input ${errors.email ? 'border-red-500' : ''}`}
                  placeholder="your@email.com"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm mt-1">{errors.email.message}</span>
                )}
              </div>

              <div className="form-control">
                <label htmlFor="phone" className="form-label">Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  className="form-input"
                  placeholder="+1 234 567 8900"
                  {...register('phone')}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label htmlFor="playerCount" className="form-label">Number of Players *</label>
                <select
                  id="playerCount"
                  className={`form-input ${errors.playerCount ? 'border-red-500' : ''}`}
                  {...register('playerCount', { required: 'Please select number of players' })}
                >
                  <option value="">Select...</option>
                  <option value="5-7">5-7 players</option>
                  <option value="8-10">8-10 players</option>
                  <option value="11-15">11-15 players</option>
                  <option value="15+">15+ players</option>
                </select>
                {errors.playerCount && (
                  <span className="text-red-500 text-sm mt-1">{errors.playerCount.message}</span>
                )}
              </div>

              <div className="form-control">
                <label htmlFor="experience" className="form-label">Experience Level</label>
                <select
                  id="experience"
                  className="form-input"
                  {...register('experience')}
                >
                  <option value="">Select...</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="pro">Professional</option>
                </select>
              </div>
            </div>

            <div className="form-control">
              <label htmlFor="message" className="form-label">Additional Message</label>
              <textarea
                id="message"
                rows={4}
                className="form-input resize-none"
                placeholder="Any additional information about your team..."
                {...register('message')}
              ></textarea>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">* Required fields</p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Register Team'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default RegistrationForm;
