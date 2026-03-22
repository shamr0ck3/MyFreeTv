import { useState } from 'react';
import { Tv, Search, Video, Info } from 'lucide-react';
import { channels, Channel } from './data/channels';
import { VideoPlayer } from './components/VideoPlayer';

function App() {
  const [activeChannel, setActiveChannel] = useState<Channel>(channels[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(channels.map((c) => c.category)))];

  const filteredChannels = channels.filter((channel) => {
    const matchesSearch = channel.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || channel.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800 shadow-xl p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Tv size={28} className="text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              MYFreeTV
            </h1>
            <p className="text-xs text-gray-400 font-medium">Live TV Channels</p>
          </div>
        </div>
        
        <div className="hidden md:flex items-center relative">
          <Search className="absolute left-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search channels..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-64 transition-all"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row lg:overflow-hidden">
        
        {/* Left Column: Player & Info */}
        <div className="w-full lg:w-[65%] xl:w-[70%] p-4 lg:p-6 flex flex-col lg:overflow-y-auto custom-scrollbar">
          
          <div className="mb-6">
            <VideoPlayer url={activeChannel.url} poster={activeChannel.logo} />
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-700">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <img 
                  src={activeChannel.logo} 
                  alt={activeChannel.name} 
                  className="w-16 h-16 object-contain bg-white p-2 rounded-xl border border-gray-200"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/150?text=' + activeChannel.name;
                  }}
                />
                <div>
                  <h2 className="text-2xl font-bold text-white">{activeChannel.name}</h2>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="px-3 py-1 bg-blue-900/50 text-blue-300 text-xs font-semibold rounded-full border border-blue-800">
                      {activeChannel.category}
                    </span>
                    <span className="flex items-center space-x-1 text-red-400 text-xs font-semibold px-2 py-1 bg-red-900/20 rounded-full border border-red-900">
                      <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                      <span>LIVE</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-gray-400 flex items-center space-x-2">
                <Info size={18} className="text-blue-400" />
                <span className="text-sm">Enjoy free live streaming of {activeChannel.name}. Note that some channels may be geo-blocked or temporarily unavailable.</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Channels List */}
        <div className="w-full lg:w-[35%] xl:w-[30%] lg:border-l border-gray-800 bg-gray-900/50 flex flex-col lg:h-[calc(100vh-80px)]">
          
          {/* Mobile Search */}
          <div className="p-4 md:hidden border-b border-gray-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search channels..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="p-4 border-b border-gray-800 overflow-x-auto whitespace-nowrap custom-scrollbar">
            <div className="flex space-x-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                      : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Channels Grid/List */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
              {filteredChannels.length > 0 ? (
                filteredChannels.map(channel => (
                  <button
                    key={channel.id}
                    onClick={() => setActiveChannel(channel)}
                    className={`flex items-center p-3 rounded-xl transition-all duration-200 group text-left w-full
                      ${activeChannel.id === channel.id 
                        ? 'bg-blue-900/30 border-blue-500 border shadow-lg relative overflow-hidden' 
                        : 'bg-gray-800 border-gray-700 border hover:bg-gray-750 hover:border-gray-600 hover:shadow-md'
                      }`}
                  >
                    {activeChannel.id === channel.id && (
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent pointer-events-none" />
                    )}
                    <div className="bg-white rounded-lg p-1.5 shadow-sm min-w-[60px] max-w-[60px] h-[60px] flex items-center justify-center">
                      <img 
                        src={channel.logo} 
                        alt={channel.name} 
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/60?text=' + channel.name;
                        }}
                      />
                    </div>
                    <div className="ml-4 flex-1 overflow-hidden">
                      <h3 className={`font-semibold truncate ${activeChannel.id === channel.id ? 'text-blue-400' : 'text-gray-200 group-hover:text-white'}`}>
                        {channel.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1 truncate">{channel.category}</p>
                    </div>
                    {activeChannel.id === channel.id && (
                      <div className="hidden lg:flex px-2 text-blue-400 animate-pulse">
                        <Video size={18} />
                      </div>
                    )}
                  </button>
                ))
              ) : (
                <div className="col-span-full py-12 text-center text-gray-500">
                  <p>No channels found matching your search.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #374151;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #4b5563;
        }
      `}} />
    </div>
  );
}

export default App;