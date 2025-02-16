'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="glass-effect fixed w-full z-50 top-0 left-0 border-b border-white/5">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3">
          <span className="self-center text-2xl font-semibold text-gradient">Aiden</span>
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-[#87fafd]/50"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}>
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 md:mt-0">
            <li>
              <Link
                href="/dashboard"
                className="block py-2 pl-3 pr-4 text-white/90 rounded hover:text-accent md:p-0 transition-colors"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/agents"
                className="block py-2 pl-3 pr-4 text-white/90 rounded hover:text-accent md:p-0 transition-colors"
              >
                My Agents
              </Link>
            </li>
            <li>
              <Link
                href="/analytics"
                className="block py-2 pl-3 pr-4 text-white/90 rounded hover:text-accent md:p-0 transition-colors"
              >
                Analytics
              </Link>
            </li>
            <li>
              <button className="button-primary">Connect Wallet</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
