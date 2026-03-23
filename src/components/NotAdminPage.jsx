import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


const NotAdminPage = () => {
  const navigate = useNavigate();
  const [role] = useState('user'); // simulate user role

  if (role === 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50 text-center">
        <div className="bg-white p-10 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-green-600 mb-4 animate-pulse">Welcome, Admin!</h1>
          <p className="text-gray-700">You have full access to this page 🚀</p>
        </div>
      </div>
    );
  }

  return (


    <div>
      <button
        onClick={() => navigate(-1)}
        className="bg-gray-700 text-white px-4 py-2 rounded"
      >
        ⬅ Back
      </button>

      <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 px-4">

        {/* Bouncing Lock Icon */}
        <div className="text-6xl animate-bounce mb-4">🔒</div>

        {/* Shaking Access Denied Text */}
        <h1 className="text-3xl font-bold text-red-600 mb-2 animate-wiggle">
          Access Denied!
        </h1>

        <p className="text-gray-700 text-center max-w-sm">
          Sorry, this page is for <span className="font-semibold">admins only</span>.
          You look more like a <span className="italic">cool user 😎</span>.
        </p>
      </div>
    </div>
  );
};

export default NotAdminPage;
