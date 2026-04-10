import React from 'react';
import Feed from './Feed';
import Sidebar from './Sidebar';

const FeedSection = () => {
  return (
    <div className="w-full px-4 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        <div className="flex-1 order-2 lg:order-1">
          <Feed />
        </div>
        <div className="w-full lg:w-96 order-1 lg:order-2">
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default FeedSection;
