import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white py-4 ">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm mb-2 md:mb-0">
          © {new Date().getFullYear()} IT Support System. All rights reserved.
        </div>

        <div className="flex space-x-4 text-sm">
          <a href="/privacy" className="hover:text-blue-400">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-blue-400">
            Terms of Service
          </a>
          <a href="/contact" className="hover:text-blue-400">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
