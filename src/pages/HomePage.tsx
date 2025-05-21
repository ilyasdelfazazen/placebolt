import React, { useState } from 'react';
import { Home, Activity, Globe, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ExplorationMode } from '../types';
import { samplePlaces, sampleActivities } from '../data/samples';

const categories = [
  { value: 'all', label: 'All Categories' },
  { value: 'health', label: 'Health' },
  { value: 'education', label: 'Education' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'sports', label: 'Sports' },
  { value: 'culture', label: 'Culture' },
  { value: 'business', label: 'Business' }
];

const HomePage: React.FC = () => {
  const [mode, setMode] = useState<ExplorationMode>('place');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPlacesSidebarOpen, setIsPlacesSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This would be managed by your auth system

  const filteredContent = mode === 'place' 
    ? samplePlaces.filter(place => 
        (selectedCategory === 'all' || place.domains.includes(selectedCategory)) &&
        (searchQuery === '' || 
          place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          place.description.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : sampleActivities.filter(activity =>
        (selectedCategory === 'all' || activity.classification.level1.toLowerCase() === selectedCategory.toLowerCase()) &&
        (searchQuery === '' || 
          activity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          activity.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-b border-slate-200 py-3 px-4 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left section */}
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">Place</span>
              <span className="text-2xl font-bold text-slate-800">2</span>
            </Link>

            {/* Navigation Icons */}
            <div className="flex items-center gap-2">
              <Link to="/" className="p-2 rounded-md hover:bg-slate-100 transition-colors">
                <Home size={24} className="text-slate-700" />
              </Link>
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-md hover:bg-slate-100 transition-colors"
              >
                <Activity size={24} className="text-slate-700" />
              </button>
              <button
                onClick={() => setIsPlacesSidebarOpen(true)}
                className="p-2 rounded-md hover:bg-slate-100 transition-colors"
              >
                <Globe size={24} className="text-slate-700" />
              </button>
            </div>
          </div>

          {/* Center section - Search */}
          <div className="flex-1 max-w-2xl mx-6">
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder={`Search in ${selectedCategory === 'all' ? 'all categories' : selectedCategory}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Right section - Auth */}
          <div>
            {isLoggedIn ? (
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Sign Out
              </button>
            ) : (
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 mt-16 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mode === 'place' ? (
              // Places Grid
              filteredContent.map((place) => (
                <div key={place.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative h-48">
                    <img 
                      src={place.media?.images[0]}
                      alt={place.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-white font-semibold text-lg">{place.name}</h3>
                      <p className="text-white/90 text-sm">{place.location.city}, {place.location.country}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-slate-600 text-sm mb-3">{place.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {place.categories.map((category, index) => (
                        <span key={index} className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Activities Grid
              filteredContent.map((activity) => (
                <div key={activity.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <div className="relative h-48">
                    <img 
                      src="https://images.pexels.com/photos/3755755/pexels-photo-3755755.jpeg"
                      alt={activity.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-white font-semibold text-lg">{activity.name}</h3>
                      <p className="text-white/90 text-sm">{activity.classification.level1}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-slate-600 text-sm mb-3">{activity.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {activity.context.map((ctx, index) => (
                        <span key={index} className="text-xs px-2 py-1 rounded-full bg-teal-100 text-teal-800">
                          {ctx}
                        </span>
                      ))}
                    </div>
                    <div className="mt-3 flex justify-between text-xs text-slate-500">
                      <span>Duration: {activity.duration?.min}-{activity.duration?.max} {activity.duration?.unit}</span>
                      <span>Frequency: {activity.frequency}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;