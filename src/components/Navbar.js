import { useState } from 'react';

const MENU_ITEMS = [
  { label: 'Home', id: 'home' },
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    const { lenis } = window;

    if (element && lenis) {
      lenis.scrollTo(element, {
        offset: -80, // Offset untuk mencegah navbar menutupi konten
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
      });
      setIsOpen(false);
    } else if (element) {
      // Fallback jika Lenis belum siap
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-darkBg/95 backdrop-blur-md shadow-lg shadow-black/30 z-50 border-b border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold gradient-text">FayyadhTzy</h1>

          {/* Menu Desktop */}
          <ul className="hidden md:flex space-x-6 lg:space-x-8">
            {MENU_ITEMS.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className="text-white/60 hover:text-white transition-smooth font-semibold text-sm lg:text-base"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Tombol Menu Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2 hover:bg-darkCard rounded-lg transition-smooth"
            aria-label="Toggle menu"
          >
            <span className={`w-6 h-0.5 bg-white transition-all ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`w-6 h-0.5 bg-white transition-all ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Menu Mobile */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/[0.06]">
            <ul className="flex flex-col space-y-3 pt-4">
              {MENU_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="w-full text-left px-4 py-2 text-white/60 hover:text-white hover:bg-darkCard rounded-lg transition-smooth font-semibold"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
