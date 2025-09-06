import React, { useState } from 'react';
import { Sparkles, Image, Video, FileText, Download, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

const AIGenerator: React.FC = () => {
  const [activeTab, setActiveTab] = useState('image');
  const [generating, setGenerating] = useState(false);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [generatedAssets, setGeneratedAssets] = useState<any[]>([]);

  const tabs = [
    { id: 'image', name: 'AI Images', icon: Image },
    { id: 'video', name: 'AI Videos', icon: Video },
    { id: 'copy', name: 'AI Copy', icon: FileText },
  ];

  const handleGenerate = async () => {
    setGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      const mockAssets = Array.from({ length: 4 }, (_, i) => ({
        id: i + 1,
        type: activeTab,
        url: `https://img-wrapper.vercel.app/image?url=https://placehold.co/400x300/3B82F6/FFFFFF?text=${activeTab === 'image' ? 'AI+Image' : activeTab === 'video' ? 'AI+Video' : 'AI+Copy'}+${i + 1}`,
        title: `Generated ${activeTab} ${i + 1}`,
        description: `AI-generated ${activeTab} for ${productName}`,
      }));
      
      setGeneratedAssets(mockAssets);
      setGenerating(false);
    }, 3000);
  };

  const copyExamples = [
    {
      id: 1,
      type: 'headline',
      content: "🚀 Transform Your Business Today!",
      description: "Attention-grabbing headline"
    },
    {
      id: 2,
      type: 'primary',
      content: "Discover the revolutionary solution that thousands of businesses trust. Get started with our proven system that delivers results in just 30 days. Limited time offer - don't miss out!",
      description: "Primary ad text"
    },
    {
      id: 3,
      type: 'cta',
      content: "Get Started Now →",
      description: "Call-to-action button"
    },
    {
      id: 4,
      type: 'headline',
      content: "💡 The Smart Choice for Modern Businesses",
      description: "Alternative headline"
    }
  ];

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <Sparkles className="h-8 w-8 text-blue-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Content Generator</h1>
          <p className="text-sm text-gray-500">
            Generate stunning visuals, videos, and copy using artificial intelligence
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="mr-2 h-5 w-5" />
              {tab.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Form */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-lg shadow-sm border"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4">Product Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Description
                </label>
                <textarea
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe your product or service"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Target Audience
                </label>
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Young professionals, 25-35"
                />
              </div>

              {activeTab === 'video' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video Style
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Dynamic & Energetic</option>
                    <option>Professional & Clean</option>
                    <option>Fun & Playful</option>
                    <option>Elegant & Minimal</option>
                  </select>
                </div>
              )}

              {activeTab === 'copy' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tone of Voice
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Professional</option>
                    <option>Casual & Friendly</option>
                    <option>Urgent & Persuasive</option>
                    <option>Informative</option>
                  </select>
                </div>
              )}

              <button
                onClick={handleGenerate}
                disabled={generating || !productName.trim()}
                className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {generating ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate {activeTab === 'image' ? 'Images' : activeTab === 'video' ? 'Videos' : 'Copy'}
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Generated Content */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-6 rounded-lg shadow-sm border"
          >
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Generated {activeTab === 'image' ? 'Images' : activeTab === 'video' ? 'Videos' : 'Copy'}
            </h3>

            {generating ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
                  <p className="text-gray-500">AI is creating your content...</p>
                </div>
              </div>
            ) : generatedAssets.length > 0 ? (
              <div className={`grid gap-4 ${activeTab === 'copy' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                {activeTab === 'copy' ? (
                  copyExamples.map((copy) => (
                    <div key={copy.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-xs font-medium text-gray-500 uppercase">
                          {copy.type}
                        </span>
                        <button className="text-blue-600 hover:text-blue-800">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-gray-900 mb-2">{copy.content}</p>
                      <p className="text-xs text-gray-500">{copy.description}</p>
                    </div>
                  ))
                ) : (
                  generatedAssets.map((asset) => (
                    <div key={asset.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={asset.url}
                        alt={asset.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-medium text-gray-900 mb-1">{asset.title}</h4>
                        <p className="text-sm text-gray-500 mb-3">{asset.description}</p>
                        <button className="flex items-center text-blue-600 hover:text-blue-800">
                          <Download className="mr-1 h-4 w-4" />
                          Download
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <Sparkles className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Ready to Generate</h3>
                <p className="text-gray-500">
                  Fill in your product information and click generate to create amazing content with AI
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AIGenerator;
