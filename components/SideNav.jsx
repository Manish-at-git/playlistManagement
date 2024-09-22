import React from 'react';

const Sidenav = () => {
  const menuItems = [
    {
      icon: 'profile-icon', // Replace with the actual icon class or path
      label: 'Profile',
    },
    {
      icon: 'dashboard-icon', // Replace with the actual icon class or path
      label: 'Dashboard',
    },
    {
      icon: 'favorite-icon', // Replace with the actual icon class or path
      label: 'Favorite',
    },
    {
      icon: 'chat-icon', // Replace with the actual icon class or path
      label: 'Live Chat',
    },
    {
      icon: 'friends-icon', // Replace with the actual icon class or path
      label: 'Friends',
    },
    {
      icon: 'mobile-app-icon', // Replace with the actual icon class or path
      label: 'Mobile App',
    },
    {
      icon: 'settings-icon', // Replace with the actual icon class or path
      label: 'Settings',
    },
    {
      icon: 'faq-icon', // Replace with the actual icon class or path
      label: 'FAQs',
    },
  ];

  return (
    <div className="bg-gray-900 text-white h-full">
      {/* ... other parts of your component */}
      <div className="border-b border-gray-700 py-2">
        <div className="text-lg font-semibold px-4">Menu</div>
      </div>
      {menuItems.map((item) => (
        <div key={item.label} className="flex items-center px-4 py-2 hover:bg-gray-800">
          <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
            <path d={`M${item.icon}`} />
          </svg>
          <span className="text-base">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

export default Sidenav;