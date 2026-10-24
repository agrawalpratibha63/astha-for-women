import React, { useState } from 'react';
import { Camera, MapPin, X, Eye } from 'lucide-react';

export default function WalkingGallery({ t = {} }) {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const gallery = t.gallery || {};
  const filterKeys = ['all', 'correctional', 'community', 'counselling', 'relief'];

  const items = gallery.items || [];
  const filteredItems = activeFilter === 'all'
    ? items
    : items.filter(item => item.category === activeFilter);

  return (
    <section 
      id="gallery" 
      className="py-20 lg:py-28 bg-brand-ivory border-t border-brand-gold/20 relative scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-gold/15 border border-brand-gold/30 text-xs font-semibold text-brand-teal uppercase tracking-[0.2em] mb-4 shadow-xs">
            <Camera className="w-3.5 h-3.5 text-brand-gold" />
            <span>{gallery.badge || "COMMUNITY FIELDWORK"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-brand-teal font-normal tracking-tight mb-4">
            {gallery.title || "Voices From the Field"}
          </h2>
          <p className="text-sm sm:text-base text-brand-charcoal/75 leading-relaxed font-sans max-w-2xl mx-auto">
            {gallery.subtitle || "A photo journal of our authentic community gatherings, prison empowerment, and rural self-reliance clusters."}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto gap-2 pb-3 mb-10 no-scrollbar">
          {filterKeys.map((key) => {
            const filters = gallery.filters || {};
            const label = filters[key] || key;
            const isActive = activeFilter === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveFilter(key)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all whitespace-nowrap cursor-pointer border ${
                  isActive
                    ? 'bg-brand-teal text-white border-brand-teal shadow-xs'
                    : 'bg-white/80 text-brand-charcoal/70 border-brand-gold/25 hover:border-brand-gold hover:text-brand-teal'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Responsive Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group cursor-pointer bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 border border-brand-gold/25 flex flex-col transform hover:-translate-y-1"
            >
              {/* Photo Container */}
              <div className="relative aspect-[4/3] overflow-hidden bg-brand-charcoal/5">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/astha-logo.jpg';
                  }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="bg-white/95 text-brand-charcoal text-xs font-medium px-3.5 py-1.5 rounded-full shadow flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{gallery.viewPhoto || "View Photo"}</span>
                  </span>
                </div>
              </div>

              {/* Info Content */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-[11px] font-sans text-brand-gold font-semibold mb-1">
                    <MapPin className="w-3 h-3 text-brand-gold shrink-0" />
                    <span>{item.location}</span>
                  </div>
                  <h3 className="text-sm font-serif font-medium text-brand-teal leading-snug group-hover:text-brand-charcoal transition-colors">
                    {item.title}
                  </h3>
                </div>

                <p className="text-xs text-brand-charcoal/70 mt-2 line-clamp-2 font-light">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Photo Lightbox Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-white/20 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] bg-black">
              <img 
                src={selectedPhoto.image} 
                alt={selectedPhoto.title} 
                className="w-full h-full object-contain"
              />
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 bg-brand-ivory">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-gold mb-1.5">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>{selectedPhoto.location}</span>
              </div>
              <h3 className="text-xl font-serif font-medium text-brand-teal mb-2">
                {selectedPhoto.title}
              </h3>
              <p className="text-sm text-brand-charcoal/80 leading-relaxed font-sans font-light">
                {selectedPhoto.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
