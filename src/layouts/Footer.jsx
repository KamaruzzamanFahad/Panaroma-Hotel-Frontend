import React from 'react';
import { MapPin, Facebook, Twitter, Instagram, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-slate-950 to-black border-t border-slate-700/30">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute top-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 mb-8">
          
          
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="text-white" />
              </div>
              <span className="text-lg font-bold text-white">Panorama</span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm">Book hotels across Bangladesh</p>
          </div>

          
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {['Browse Hotels', 'Destinations', 'Deals'].map((link, i) => (
                <li key={i}>
                  <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-xs sm:text-sm">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Company</h4>
            <ul className="space-y-2">
              {['About', 'Careers', 'Contact'].map((item, i) => (
                <li key={i}>
                  <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors text-xs sm:text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Follow Us</h4>
            <div className="flex gap-2 mb-4">
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Instagram, href: '#' },
                { icon: Linkedin, href: '#' }
              ].map((social, i) => {
                const Icon = social.icon;
                return (
                  <a
                    key={i}
                    href={social.href}
                    className="w-8 h-8 bg-slate-800 hover:bg-cyan-500 text-slate-400 hover:text-white rounded-md flex items-center justify-center transition-all duration-300"
                  >
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>
            <a href="mailto:support@Panorama.com" className="text-slate-400 hover:text-cyan-400 text-xs sm:text-sm flex items-center gap-1">
              <Mail size={12} />
              support@Panorama.com
            </a>
          </div>
        </div>

        
        <div className="border-t border-slate-700/30 my-8"></div>

        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs sm:text-sm">
          <p className="text-slate-400">
            © {currentYear} Panorama. All rights reserved.
          </p>
          <div className="flex gap-4 sm:gap-6">
            <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">Privacy</a>
            <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">Terms</a>
            <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}