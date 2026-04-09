const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-darkCard border-t border-primary/20 text-darkText py-12 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-8">
          <div>
            <h3 className="text-xl md:text-2xl font-bold gradient-text mb-4">Portfolio</h3>
            <p className="text-darkText/70 text-sm md:text-base">
              Mewujudkan Setiap Ide Menjadi Kenyataan Digital.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg md:text-xl mb-3 md:mb-4 text-darkText">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: 'Home', href: '#home' },
                { label: 'About', href: '#about' },
                { label: 'Projects', href: '#projects' },
                { label: 'Contact', href: '#contact' }
              ].map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-darkText/70 hover:text-primary transition-smooth text-sm md:text-base"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="sm:col-span-2 md:col-span-1">
            <h4 className="font-bold text-lg md:text-xl mb-3 md:mb-4 text-darkText">Services</h4>
            <ul className="space-y-2 text-darkText/70 text-sm md:text-base">
              <li>Web Development</li>
              <li>UI/UX Design</li>
              <li>Maintenance</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary/20 pt-6 md:pt-8">
          <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4 text-center sm:text-left">
            <p className="text-darkText/70 text-xs md:text-sm">
              © {currentYear} Portfolio. All rights reserved.
            </p>
            <p className="text-darkText/70 text-xs md:text-sm">
              Berani bermimpi, berani berkarya.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
