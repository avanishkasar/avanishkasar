import React from 'react';
import GithubCalendar from './ui/retro-space-shooter-git-hub-calendar';

export default function GithubSection() {
  return (
    <section className="py-16 md:py-32 w-full bg-black relative">
      <div className="container">
        <div className="section-label reveal-text mb-12">
          <span className="section-number">03</span>
          <span className="section-label-text">GITHUB CONTRIBUTIONS</span>
        </div>
        
        <div className="w-full flex justify-center reveal-text border border-white/5 bg-[#0a0a0a] rounded-xl py-12 overflow-hidden shadow-[inset_0_0_100px_rgba(0,240,255,0.02)]">
          <GithubCalendar 
            username="avanishkasar" 
            cellSize={16} 
            cellGap={4} 
          />
        </div>
      </div>
    </section>
  );
}
