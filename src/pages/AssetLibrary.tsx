import React, { useState } from 'react';
import { Search, Filter, Grid, List, Download, Edit, Trash2, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const AssetLibrary: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterType, setFilterType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const assets = [
    { id: 1, name: 'Summer Sale Banner', type: 'image', size: '1.2 MB', date: '2025-01-15', url: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x300/F59E0B/FFFFFF?text=Summer+Sale' },
    { id: 2, name: 'Product Demo Video', type: 'video', size: '15.3 MB', date: '2025-01-14', url: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x300/10B981/FFFFFF?text=Demo+Video' },
    { id: 3, name: 'Holiday Campaign Copy', type: 'copy', size: '2 KB', date: '2025-01-13', content: 'Limited time holiday offer! Get 50% off...' },
    { id: 4, name: 'Brand Logo Variation', type: 'image', size: '800 KB', date: '2025-01-12', url: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x300/3B82F6/FFFFFF?text=Logo' },
    { id: 5, name: 'Testimonial Video', type: 'video', size: '22.1 MB', date: '2025-01-11', url: 'https://img-wrapper.vercel.app/image?url=https://placehold.co/400x300/8B5CF6/FFFFFF?text=Testimonial' },
    { id: 6, name: 'CTA Button Copy', type: 'copy', size: '1 KB', date: '2025-01-10', content: 'Shop Now - Limited Time Offer!' },
  ];

  const filteredAssets = assets.filter(asset => {
    const matchesFilter = filterType === 'all' || asset.type === filterType;
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const AssetCard = ({ asset }: { asset: any }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
    >
      {asset.type === 'image' || asset.type === 'video' ? (
        <div className="aspect-video bg-gray-100 flex items-center justify-center">
          <img
            src={asset.url}
            alt={asset.name}
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className="aspect-video bg-gray-50 flex items-center justify-center p-4">
          <p className="text-gray-600 text-sm text-center line-clamp-3">
            {asset.content}
          </p>
        </div>
      )}
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-medium text-gray-900 text-sm">{asset.name}</h3>
          <span className={`px-2 py-1 text-xs rounded-full ${
            asset.type === 'image' ? 'bg-blue-100 text-blue-800' :
            asset.type === 'video' ? 'bg-purple-100 text-purple-800' :
            'bg-green-100 text-green-800'
          }`}>
            {asset.type}
          </span>
        </div>
        
        <div className="text-xs text-gray-500 mb-3">
          <div>{asset.size}</div>
          <div>{asset.date}</div>
        </div>
        
        <div className="flex space-x-2">
          <button className="flex-1 flex items-center justify-center px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded hover:bg-blue-100">
            <Download className="w-3 h-3 mr-1" />
            Download
          </button>
          <button className="flex items-center justify-center px-2 py-1 text-xs bg-gray-50 text-gray-600 rounded hover:bg-gray-100">
            <Edit className="w-3 h-3" />
          </button>
          <button className="flex items-center justify-center px-2 py-1 text-xs bg-red-50 text-red-600 rounded hover:bg-red-100">
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  const AssetRow = ({ asset }: { asset: any }) => (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            {asset.type === 'image' || asset.type === 'video' ? (
              <img className="h-10 w-10 rounded object-cover" src={asset.url} alt={asset.name} />
            ) : (
              <div className="h-10 w-10 rounded bg-green-100 flex items-center justify-center">
                <span className="text-green-600 text-xs font-medium">TXT</span>
              </div>
            )}
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{asset.name}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          asset.type === 'image' ? 'bg-blue-100 text-blue-800' :
          asset.type === 'video' ? 'bg-purple-100 text-purple-800' :
          'bg-green-100 text-green-800'
        }`}>
          {asset.type}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {asset.size}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {asset.date}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex space-x-2">
          <button className="text-blue-600 hover:text-blue-900">
            <Download className="w-4 h-4" />
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            <Edit className="w-4 h-4" />
          </button>
          <button className="text-red-600 hover:text-red-900">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Asset Library</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage all your creative assets in one place
          </p>
        </div>
        <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="mr-2 h-5 w-5" />
          Upload Asset
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Assets</option>
                <option value="image">Images</option>
                <option value="video">Videos</option>
                <option value="copy">Copy</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Assets Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAssets.map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAssets.map((asset) => (
                <AssetRow key={asset.id} asset={asset} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredAssets.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Grid className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No assets found</h3>
          <p className="text-gray-500">
            {searchTerm || filterType !== 'all' 
              ? 'Try adjusting your search or filter criteria'
              : 'Upload your first asset to get started'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default AssetLibrary;
