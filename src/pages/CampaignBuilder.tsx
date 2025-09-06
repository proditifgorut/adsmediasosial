import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Target, Users, DollarSign, Calendar, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

const CampaignBuilder: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState({
    objective: '',
    platform: '',
    audienceAge: [18, 65],
    interests: [],
    budget: '',
    schedule: 'now',
    creative: null,
  });

  const steps = [
    { id: 1, name: 'Objective', icon: Target },
    { id: 2, name: 'Audience', icon: Users },
    { id: 3, name: 'Budget', icon: DollarSign },
    { id: 4, name: 'Creative', icon: Eye },
    { id: 5, name: 'Review', icon: Calendar },
  ];

  const objectives = [
    { id: 'conversions', name: 'Conversions', description: 'Drive sales and purchases' },
    { id: 'traffic', name: 'Traffic', description: 'Send people to your website' },
    { id: 'awareness', name: 'Brand Awareness', description: 'Increase brand recognition' },
    { id: 'engagement', name: 'Engagement', description: 'Get more likes, comments, shares' },
  ];

  const platforms = [
    { id: 'facebook', name: 'Facebook', color: 'blue' },
    { id: 'tiktok', name: 'TikTok', color: 'purple' },
    { id: 'both', name: 'Both Platforms', color: 'green' },
  ];

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Campaign Objective</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {objectives.map((objective) => (
                  <button
                    key={objective.id}
                    onClick={() => setCampaignData({ ...campaignData, objective: objective.id })}
                    className={`p-4 border-2 rounded-lg text-left transition-colors ${
                      campaignData.objective === objective.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <h4 className="font-medium text-gray-900">{objective.name}</h4>
                    <p className="text-sm text-gray-500 mt-1">{objective.description}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Platform</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {platforms.map((platform) => (
                  <button
                    key={platform.id}
                    onClick={() => setCampaignData({ ...campaignData, platform: platform.id })}
                    className={`p-4 border-2 rounded-lg text-center transition-colors ${
                      campaignData.platform === platform.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <h4 className="font-medium text-gray-900">{platform.name}</h4>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Target Audience</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age Range
                  </label>
                  <div className="flex items-center space-x-4">
                    <input
                      type="number"
                      min="13"
                      max="65"
                      value={campaignData.audienceAge[0]}
                      onChange={(e) => setCampaignData({
                        ...campaignData,
                        audienceAge: [parseInt(e.target.value), campaignData.audienceAge[1]]
                      })}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <span>to</span>
                    <input
                      type="number"
                      min="13"
                      max="65"
                      value={campaignData.audienceAge[1]}
                      onChange={(e) => setCampaignData({
                        ...campaignData,
                        audienceAge: [campaignData.audienceAge[0], parseInt(e.target.value)]
                      })}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option>All</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Interests & Behaviors
                </label>
                <input
                  type="text"
                  placeholder="e.g., fitness, technology, fashion"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Budget & Schedule</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Type
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option>Daily Budget</option>
                    <option>Lifetime Budget</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount ($)
                  </label>
                  <input
                    type="number"
                    value={campaignData.budget}
                    onChange={(e) => setCampaignData({ ...campaignData, budget: e.target.value })}
                    placeholder="50"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Schedule
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="schedule"
                      value="now"
                      checked={campaignData.schedule === 'now'}
                      onChange={(e) => setCampaignData({ ...campaignData, schedule: e.target.value })}
                      className="mr-2"
                    />
                    Start immediately
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="schedule"
                      value="later"
                      checked={campaignData.schedule === 'later'}
                      onChange={(e) => setCampaignData({ ...campaignData, schedule: e.target.value })}
                      className="mr-2"
                    />
                    Schedule for later
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Creative Assets</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                    <div className="h-32 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                      <span className="text-gray-400">Image {i + 1}</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      Select Creative
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-2">Ad Copy</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Headline</label>
                    <input
                      type="text"
                      placeholder="Grab attention with a compelling headline"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary Text</label>
                    <textarea
                      rows={3}
                      placeholder="Write your main ad text here"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Call to Action</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option>Learn More</option>
                      <option>Shop Now</option>
                      <option>Sign Up</option>
                      <option>Get Quote</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Campaign Review</h3>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Campaign Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Objective:</span>
                        <span className="capitalize">{campaignData.objective}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Platform:</span>
                        <span className="capitalize">{campaignData.platform}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Budget:</span>
                        <span>${campaignData.budget}/day</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Audience</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Age Range:</span>
                        <span>{campaignData.audienceAge[0]}-{campaignData.audienceAge[1]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Estimated Reach:</span>
                        <span>50K - 100K</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-sm">
                  ✓ Campaign is ready to launch. Your ads will go live immediately after confirmation.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Create New Campaign</h1>
        <p className="text-sm text-gray-500 mt-1">
          Follow the steps below to create and launch your campaign
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              currentStep >= step.id 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-500'
            }`}>
              {currentStep > step.id ? (
                <span className="text-sm">✓</span>
              ) : (
                <step.icon className="w-4 h-4" />
              )}
            </div>
            <span className={`ml-2 text-sm font-medium ${
              currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
            }`}>
              {step.name}
            </span>
            {index < steps.length - 1 && (
              <div className={`w-16 h-0.5 mx-4 ${
                currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white p-8 rounded-lg shadow-sm border"
      >
        {renderStepContent()}
      </motion.div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </button>

        {currentStep === steps.length ? (
          <button className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
            Launch Campaign
          </button>
        ) : (
          <button
            onClick={nextStep}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default CampaignBuilder;
