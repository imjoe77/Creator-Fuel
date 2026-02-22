import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Left */}
        <p className="text-sm">
          © {new Date().getFullYear()} <span className="text-white">CreatorFuel</span>. All rights reserved.
        </p>

        {/* Right */}
        <div className="flex gap-6 text-sm">
          <a href="#" className="hover:text-white transition">Privacy</a>
          <a href="https://github.com/imjoe77/Creator-Fuel" className="hover:text-white transition">Github</a>
          <a href="/about" className="hover:text-white transition">Contact</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
