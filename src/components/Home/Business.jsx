import React from "react";

const Business = () => {
  return (
      <div className="text-center mt-8">
        <h2 className="text-2xl font-bold">Our Business Summery</h2>
        <div className="stats stats-vertical lg:stats-horizontal shadow bg-gradient-to-r from-green-500 to-yellow-500 p-6 text-white my-4">
          <div className="stat">
            <div className="stat-title text-white">Total Customer</div>
            <div className="stat-value text-white">100+</div>
            <div className="stat-desc text-white">Jan 1st - Feb 1st</div>
          </div>

          <div className="stat">
            <div className="stat-title text-white">Annual Revenue</div>
            <div className="stat-value">125M+</div>
            <div className="stat-desc">↗︎ 400 (22%)</div>
          </div>

          <div className="stat">
            <div className="stat-title text-white">Total tools</div>
            <div className="stat-value text-white">50+</div>
            <div className="stat-desc text-white">↘︎ 90 (14%)</div>
          </div>

          <div className="stat">
            <div className="stat-title text-white">Our client Review</div>
            <div className="stat-value text-white">35k+</div>
            <div className="stat-desc text-white">↘︎ 90 (14%)</div>
          </div>
        </div>
    </div>
  );
};

export default Business;
