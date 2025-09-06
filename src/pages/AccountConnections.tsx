import React, { useState } from 'react';
import { Link as LinkIcon, Check, AlertCircle, RefreshCw, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { connectionColorStyles } from '../utils/colorUtils';

const AccountConnections: React.FC = () => {
  const [connections, setConnections] = useState([
    {
      id: 1,
      platform: 'Facebook',
      accountName: 'My Business Page',
      status: 'connected',
      lastSync: '2025-01-15 10:30 AM',
      adAccounts: ['Ad Account 1', 'Ad Account 2'],
      color: 'blue'
    },
    {
      id: 2,
      platform: 'TikTok',
      accountName: 'Not Connected',
      status: 'disconnected',
      lastSync: null,
      adAccounts: [],
      color: 'purple'
    }
  ]);

  const handleConnect = (platformId: number) => {
    setConnections(connections.map(conn => 
      conn.id === platformId 
        ? { ...conn, status: 'connecting' }
        : conn
    ));

    // Simulate OAuth flow
    setTimeout(() => {
      setConnections(connections.map(conn => 
        conn.id === platformId 
          ? { 
              ...conn, 
              status: 'connected',
              accountName: conn.platform === 'TikTok' ? 'My TikTok Business' : conn.accountName,
              lastSync: new Date().toLocaleString(),
              adAccounts: conn.platform === 'TikTok' ? ['TikTok Ad Account 1'] : conn.adAccounts
            }
          : conn
      ));
    }, 2000);
  };

  const handleDisconnect = (platformId: number) => {
    setConnections(connections.map(conn => 
      conn.id === platformId 
        ? { 
            ...conn, 
            status: 'disconnected',
            accountName: 'Not Connected',
            lastSync: null,
            adAccounts: []
          }
        : conn
    ));
  };

  const ConnectionCard = ({ connection }: { connection: any }) => {
    const colors = connectionColorStyles[connection.color] || { bg: 'bg-gray-100', text: 'text-gray-600' };
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm border p-6"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center`}>
              <span className={`${colors.text} font-bold text-lg`}>
                {connection.platform.charAt(0)}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">{connection.platform}</h3>
              <p className="text-sm text-gray-500">{connection.accountName}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {connection.status === 'connected' && (
              <div className="flex items-center text-green-600">
                <Check className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">Connected</span>
              </div>
            )}
            {connection.status === 'disconnected' && (
              <div className="flex items-center text-red-600">
                <AlertCircle className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">Disconnected</span>
              </div>
            )}
            {connection.status === 'connecting' && (
              <div className="flex items-center text-blue-600">
                <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
                <span className="text-sm font-medium">Connecting...</span>
              </div>
            )}
          </div>
        </div>

        {connection.status === 'connected' && (
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Last Sync</h4>
                <p className="text-sm text-gray-600">{connection.lastSync}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Ad Accounts</h4>
                <div className="space-y-1">
                  {connection.adAccounts.map((account: string, index: number) => (
                    <p key={index} className="text-sm text-gray-600">{account}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex space-x-3">
          {connection.status === 'connected' ? (
            <>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <RefreshCw className="w-4 h-4 inline mr-2" />
                Sync Data
              </button>
              <button 
                onClick={() => handleDisconnect(connection.id)}
                className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                Disconnect
              </button>
            </>
          ) : (
            <button 
              onClick={() => handleConnect(connection.id)}
              disabled={connection.status === 'connecting'}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <LinkIcon className="w-4 h-4 inline mr-2" />
              {connection.status === 'connecting' ? 'Connecting...' : 'Connect Account'}
            </button>
          )}
        </div>
      </motion.div>
    )
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Account Connections</h1>
          <p className="mt-1 text-sm text-gray-500">
            Connect your social media accounts to start creating and managing campaigns
          </p>
        </div>
        <button className="mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="mr-2 h-5 w-5" />
          Add Platform
        </button>
      </div>

      {/* Connection Status Overview */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Connection Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {connections.filter(c => c.status === 'connected').length}
            </div>
            <div className="text-sm text-gray-500">Connected</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {connections.filter(c => c.status === 'disconnected').length}
            </div>
            <div className="text-sm text-gray-500">Disconnected</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {connections.reduce((acc, c) => acc + c.adAccounts.length, 0)}
            </div>
            <div className="text-sm text-gray-500">Ad Accounts</div>
          </div>
        </div>
      </div>

      {/* Platform Connections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {connections.map((connection) => (
          <ConnectionCard key={connection.id} connection={connection} />
        ))}
      </div>

      {/* Setup Instructions */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <h3 className="text-lg font-medium text-blue-900 mb-4">Setup Instructions</h3>
        <div className="space-y-3 text-sm text-blue-800">
          <div className="flex items-start space-x-2">
            <span className="font-semibold">1.</span>
            <span>Click "Connect Account" for each platform you want to use</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="font-semibold">2.</span>
            <span>You'll be redirected to authenticate with Facebook or TikTok</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="font-semibold">3.</span>
            <span>Grant permissions for ad management and data access</span>
          </div>
          <div className="flex items-start space-x-2">
            <span className="font-semibold">4.</span>
            <span>Your account data will be synced automatically</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountConnections;
