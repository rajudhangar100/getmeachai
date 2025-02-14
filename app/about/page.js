"use client"
import React from 'react';
import Link from 'next/link';
const About = () => {
  return (
    <>
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">Learn More About GetMeaChai</h1>
      <p className="max-w-2xl text-center text-lg mb-6">
        GetMeaChai is a platform designed to help content creators receive support
        from their fans in the form of small contributions, symbolized as a chai.
        Whether you are a developer, artist, writer, or any creative professional,
        your audience can show appreciation for your work with a simple gesture.
      </p>
      
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-3xl text-center">
        <h2 className="text-2xl font-semibold mb-4">How It Works?</h2>
        <ul className="text-lg space-y-3">
          <li>🎨 Creators set up their profile and share their work.</li>
          <li>☕ Fans visit the creator’s page and buy them a chai as a token of support.</li>
          <li>💡 Creators use the support to continue creating amazing content.</li>
        </ul>
      </div>

      <div className="mt-8">
        <button className="bg-purple-600 hover:bg-purple-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition">
          <Link href={"/login"}>Get Started</Link>
        </button>
      </div>
    </div>
    </>
  );
};

export default About;
