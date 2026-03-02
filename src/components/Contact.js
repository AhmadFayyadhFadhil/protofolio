import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-16 md:py-20 bg-gradient-to-b from-darkBg to-darkCard px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-darkText text-center mb-4 animate-slide-in-up">
          Mari Terhubung
        </h2>
        <p className="text-center text-darkText/70 text-base sm:text-lg mb-10 md:mb-12 animate-slide-in-up px-2">
          Hubungi saya untuk memulai project Anda berikutnya
        </p>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Info */}
          <div className="animate-slide-in-left space-y-6 md:space-y-8">
            <div className="group flex items-start gap-4 p-5 md:p-6 bg-darkCard border border-primary/20 rounded-lg hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-smooth">
              <div className="text-2xl md:text-3xl group-hover:scale-125 transition-smooth flex-shrink-0">📧</div>
              <div className="min-w-0">
                <h3 className="font-bold text-darkText mb-1 text-sm md:text-base">Email</h3>
                <p className="text-darkText/70 text-xs md:text-sm break-all">fadhilahmad1199@gmail.com</p>
              </div>
            </div>

            <div className="group flex items-start gap-4 p-5 md:p-6 bg-darkCard border border-primary/20 rounded-lg hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-smooth">
              <div className="text-2xl md:text-3xl group-hover:scale-125 transition-smooth flex-shrink-0">📱</div>
              <div className="min-w-0">
                <h3 className="font-bold text-darkText mb-1 text-sm md:text-base">Phone</h3>
                <p className="text-darkText/70 text-xs md:text-sm">+62 858 5910 4796</p>
              </div>
            </div>

            <div className="group flex items-start gap-4 p-5 md:p-6 bg-darkCard border border-primary/20 rounded-lg hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-smooth">
              <div className="text-2xl md:text-3xl group-hover:scale-125 transition-smooth flex-shrink-0">📍</div>
              <div className="min-w-0">
                <h3 className="font-bold text-darkText mb-1 text-sm md:text-base">Location</h3>
                <p className="text-darkText/70 text-xs md:text-sm">Sidoarjo, Indonesia</p>
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-4 md:pt-6">
              <h3 className="text-darkText font-bold mb-3 md:mb-4 text-sm md:text-base">Follow Me</h3>
              <div className="flex gap-3 md:gap-4 flex-wrap">
                {[
                  { logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg', label: 'WhatsApp', href: 'https://wa.me/6285859104796' },
                  { logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg', label: 'Instagram', href: 'https://www.instagram.com/fadhillllll15?igsh=cTJ4dGNvbHFtb2t0' },
                  { logo: 'https://upload.wikimedia.org/wikipedia/en/a/a9/TikTok_logo.svg', label: 'TikTok', href: 'https://www.tiktok.com/@dhyl15?_r=1&_t=ZS-93d9UQSj67k' },
                ].map(social => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-12 h-12 md:w-14 md:h-14 bg-darkCard border border-primary/30 hover:bg-primary/10 rounded-lg flex items-center justify-center transition-smooth hover:scale-110 hover:shadow-lg hover:shadow-primary/50 overflow-hidden"
                    title={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={social.logo}
                      alt={social.label}
                      className="w-6 h-6 md:w-8 md:h-8 object-contain filter brightness-90 hover:brightness-100 transition-all duration-300"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="animate-slide-in-right">
            <div className="bg-darkCard border border-primary/20 p-6 md:p-8 rounded-xl">
              <div className="mb-5 md:mb-6">
                <label className="block text-darkText font-semibold mb-2 text-sm md:text-base">Nama</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 md:py-3 bg-darkBg border border-primary/30 text-darkText placeholder-darkText/50 rounded-lg focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-smooth text-sm md:text-base"
                  placeholder="Nama Anda"
                />
              </div>

              <div className="mb-5 md:mb-6">
                <label className="block text-darkText font-semibold mb-2 text-sm md:text-base">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 md:py-3 bg-darkBg border border-primary/30 text-darkText placeholder-darkText/50 rounded-lg focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-smooth text-sm md:text-base"
                  placeholder="Email Anda"
                />
              </div>

              <div className="mb-6 md:mb-8">
                <label className="block text-darkText font-semibold mb-2 text-sm md:text-base">Pesan</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2.5 md:py-3 bg-darkBg border border-primary/30 text-darkText placeholder-darkText/50 rounded-lg focus:outline-none focus:border-primary focus:shadow-lg focus:shadow-primary/30 transition-smooth resize-none text-sm md:text-base"
                  placeholder="Tulis pesan Anda di sini..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 md:py-3 bg-gradient-to-r from-primary to-accent text-darkBg font-bold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-smooth text-sm md:text-base"
              >
                Kirim Pesan
              </button>

              {submitted && (
                <div className="mt-4 p-4 bg-green-500/20 border border-green-500/50 text-green-300 rounded-lg animate-slide-in-up text-sm md:text-base">
                  ✅ Pesan berhasil dikirim!
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
