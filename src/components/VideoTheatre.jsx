import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, MapPin, Heart, Film, Maximize2 } from 'lucide-react';

export default function VideoTheatre({ t, onOpenDonate }) {
  const [activeStoryIdx, setActiveStoryIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [progress, setProgress] = useState(38);
  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);

  const stories = t.video.stories;
  const currentStory = stories[activeStoryIdx] || stories[0];

  // Web Audio API ambient soundscape generator for immersive documentary experience
  useEffect(() => {
    if (isAudioOn) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioContextRef.current = ctx;

        // Gentle warm drone chord simulating village morning ambience
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(144, ctx.currentTime); // Grounding F#2 tone

        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        oscillatorRef.current = osc;
      } catch (err) {
        console.error('Web Audio not allowed without user gesture', err);
      }
    } else {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
          oscillatorRef.current.disconnect();
        } catch {}
      }
      if (audioContextRef.current) {
        try {
          audioContextRef.current.close();
        } catch {}
      }
    }

    return () => {
      if (oscillatorRef.current) {
        try { oscillatorRef.current.stop(); } catch {}
      }
      if (audioContextRef.current) {
        try { audioContextRef.current.close(); } catch {}
      }
    };
  }, [isAudioOn]);

  // Video progress animation when playing
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const storyImages = [
    // Sunita Devi: Artisan weaving with dignity
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80",
    // Meena Bai: Strong courageous portrait
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80",
    // Pooja & Aarti: Smiling young girls in rural school
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80"
  ];

  return (
    <section id="video" className="py-20 bg-charcoal text-silk relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sindoor/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-ochre/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-ochre tracking-wider uppercase mb-3">
              <Film className="w-3.5 h-3.5" />
              <span>{t.video.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight">
              {t.video.title}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Ambient Audio Toggle */}
            <button
              onClick={() => setIsAudioOn(!isAudioOn)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border flex items-center gap-2 transition-all ${
                isAudioOn
                  ? 'bg-ochre text-charcoal border-ochre shadow-lg shadow-ochre/20'
                  : 'bg-white/5 text-white/70 border-white/10 hover:bg-white/10'
              }`}
            >
              {isAudioOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span>{isAudioOn ? t.video.audioToggleOn : t.video.audioToggleOff}</span>
            </button>

            {/* Support CTA */}
            <button
              onClick={onOpenDonate}
              className="px-5 py-2 rounded-xl bg-sindoor hover:bg-sindoor-600 text-white text-xs font-bold transition-all shadow-lg flex items-center gap-2"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>{t.video.supportHer}</span>
            </button>
          </div>
        </div>

        {/* Documentary Cinema Player Card */}
        <div className="glass-card-dark rounded-3xl overflow-hidden border border-white/15 shadow-2xl relative">
          {/* Main Visual Screen */}
          <div className="relative aspect-video sm:aspect-[21/9] w-full overflow-hidden bg-black flex items-center justify-center group">
            {/* Cinematic Background Image with Parallax Treatment */}
            <img
              src={storyImages[activeStoryIdx] || storyImages[0]}
              alt={currentStory.name}
              className={`w-full h-full object-cover opacity-65 transition-transform duration-1000 ${
                isPlaying ? 'scale-105 filter brightness-95' : 'scale-100'
              }`}
            />

            {/* Dark Gradient Overlay for High-End Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />

            {/* Real Play / Pause Center Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="absolute z-20 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-sindoor/90 hover:bg-sindoor text-white flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 group-hover:shadow-sindoor/50 cursor-pointer"
              title={isPlaying ? "Pause Documentary" : "Play Full Documentary"}
            >
              {isPlaying ? (
                <Pause className="w-9 h-9 fill-white" />
              ) : (
                <Play className="w-9 h-9 fill-white ml-1.5" />
              )}
            </button>

            {/* Documentary Quote Banner (Bottom Left) */}
            <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-2xl z-20">
              <div className="inline-flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs text-ochre font-semibold mb-2 border border-white/10">
                <MapPin className="w-3.5 h-3.5" />
                <span>{currentStory.location}</span>
                <span className="text-white/30">•</span>
                <span>{currentStory.category}</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-serif font-bold text-white mb-2 leading-tight">
                {currentStory.name}: "{currentStory.title}"
              </h3>
              <p className="text-xs sm:text-base text-silk-warm/90 italic font-light line-clamp-2 sm:line-clamp-none">
                "{currentStory.quote}"
              </p>
            </div>

            {/* Video Controls Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/20 z-30">
              <div
                className="h-full bg-sindoor transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Documentary Vignettes Selector Bar (Bottom Tabs) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10 bg-charcoal-light/80 p-2">
            {stories.map((s, index) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveStoryIdx(index);
                  setIsPlaying(true);
                  setProgress(15);
                }}
                className={`p-4 text-left transition-all rounded-xl flex items-start gap-3.5 ${
                  activeStoryIdx === index
                    ? 'bg-white/10 border-l-4 sm:border-l-0 sm:border-t-4 border-sindoor'
                    : 'hover:bg-white/5 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-white/20 bg-charcoal">
                  <img
                    src={storyImages[index]}
                    alt={s.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-white">{s.name}</h4>
                    <span className="text-[10px] text-ochre font-mono">{s.videoDuration}</span>
                  </div>
                  <p className="text-xs text-silk-linen/70 line-clamp-1 mt-0.5">
                    {s.title}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
