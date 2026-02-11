import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Upload, X } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';
import { TeamRegistration } from '../../types';

const RegistrationForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<TeamRegistration>();

  const onSubmit = (data: TeamRegistration) => {
    // In a real app, you would send this data to your backend
    console.log(data);
    
    // Show success message
    setIsSubmitted(true);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <AnimatePresence>
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-green-50 border-l-4 border-green-500 p-6 rounded-lg shadow-md mb-8"
          >
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Check className="h-8 w-8 text-green-500" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-green-800">Successful Registration!</h3>
                <p className="mt-2 text-green-700">
                  Your team has been successfully registered for Three From The Corner. We will contact you soon with details.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <AnimatedSection>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-lg p-8">
              {/* Team Information */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Team Information
                </h3>
                
                <div className="form-control">
                  <label htmlFor="teamName" className="form-label">
                    Team Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="teamName"
                    type="text"
                    className={`form-input ${errors.teamName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Enter team name"
                    {...register('teamName', { required: 'Team name is required' })}
                  />
                  {errors.teamName && (
                    <p className="form-error">{errors.teamName.message}</p>
                  )}
                </div>
                
                <div className="form-control">
                  <label htmlFor="playerCount" className="form-label">
                    Number of Players <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="playerCount"
                    type="number"
                    min="5"
                    max="15"
                    className={`form-input ${errors.playerCount ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Enter number of players"
                    {...register('playerCount', {
                      required: 'Number of players is required',
                      min: { value: 5, message: 'Minimum 5 players' },
                      max: { value: 15, message: 'Maximum 15 players' }
                    })}
                  />
                  {errors.playerCount && (
                    <p className="form-error">{errors.playerCount.message}</p>
                  )}
                </div>
                
                <div className="form-control">
                  <label className="form-label">Team Logo</label>
                  <div className="flex items-center space-x-4">
                    <div className="flex-1">
                      <label
                        htmlFor="logo"
                        className="cursor-pointer block w-full p-3 border border-gray-300 border-dashed rounded-lg text-center hover:bg-gray-50 transition-colors"
                      >
                        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                        <span className="text-gray-600">
                          {selectedFile ? selectedFile.name : 'Click to upload logo'}
                        </span>
                        <input
                          id="logo"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                    
                    {previewUrl && (
                      <div className="relative w-16 h-16">
                        <img 
                          src={previewUrl} 
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg" 
                        />
                        <button
                          type="button"
                          onClick={clearSelectedFile}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    PNG, JPG or GIF up to 2MB
                  </p>
                </div>
              </div>
              
              {/* Contact Information */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Contact Information
                </h3>
                
                <div className="form-control">
                  <label htmlFor="captainName" className="form-label">
                    Captain's Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="captainName"
                    type="text"
                    className={`form-input ${errors.captainName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Enter captain's full name"
                    {...register('captainName', { required: 'Captain name is required' })}
                  />
                  {errors.captainName && (
                    <p className="form-error">{errors.captainName.message}</p>
                  )}
                </div>
                
                <div className="form-control">
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`form-input ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Enter email address"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Enter a valid email address'
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="form-error">{errors.email.message}</p>
                  )}
                </div>
                
                <div className="form-control">
                  <label htmlFor="phone" className="form-label">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className={`form-input ${errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Enter contact phone"
                    {...register('phone', { required: 'Phone is required' })}
                  />
                  {errors.phone && (
                    <p className="form-error">{errors.phone.message}</p>
                  )}
                </div>
              </div>
              
              {/* Additional Information */}
              <div className="mb-8">
                <div className="form-control">
                  <label htmlFor="message" className="form-label">
                    Additional Notes
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="form-input resize-none"
                    placeholder="Enter additional notes or requirements..."
                    {...register('message')}
                  ></textarea>
                </div>
              </div>
              
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="btn-primary px-8 py-3 text-lg shadow-lg hover:shadow-blue-500/20"
                >
                  Register Team
                </button>
              </div>
            </form>
          </AnimatedSection>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RegistrationForm;