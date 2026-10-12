import React from 'react';
import { Navbar } from './Navbar.js';

export const Header: React.FC = () => {
  return <Navbar />;
};

export const MobileMenu: React.FC = () => {
  return null; // Handled directly within Navbar's AnimatePresence for state synchronization
};

