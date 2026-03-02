# 🚀 Portfolio Website

Website portfolio modern yang elegan dengan animasi menarik, dibangun menggunakan React dan Tailwind CSS.

## ✨ Fitur Utama

- ✅ **Hero Section** - Landing page yang memukau dengan animasi floating
- ✅ **About Section** - Profil dengan cards informatif
- ✅ **Projects** - Showcase project dengan gradient effects
- ✅ **Skills** - Menampilkan skills dengan progress bar
- ✅ **Contact Form** - Form kontak yang fully functional
- ✅ **Responsive Design** - Mobile-friendly di semua ukuran layar
- ✅ **Smooth Animations** - Animasi slide-in, fade-in, bounce, dan lainnya
- ✅ **Modern UI** - Menggunakan Tailwind CSS untuk styling yang konsisten

## 🛠️ Tech Stack

- **Frontend**: React 19
- **Styling**: Tailwind CSS 3
- **Build Tool**: Create React App
- **CSS Animation**: Custom Tailwind animations

## 📦 Instalasi

1. **Install dependencies:**
```bash
npm install
```

2. **Jalankan development server:**
```bash
npm start
```

Server akan berjalan di [http://localhost:3000](http://localhost:3000)

## 🎨 Struktur Project

```
src/
├── components/
│   ├── Navbar.js       - Navigation bar dengan smooth scroll
│   ├── Hero.js         - Landing page section
│   ├── About.js        - Tentang saya section
│   ├── Projects.js     - Project showcase
│   ├── Skills.js       - Skills dan proficiency
│   ├── Contact.js      - Contact form
│   └── Footer.js       - Footer
├── App.js              - Main component
├── index.js            - Entry point
└── index.css           - Global styles & Tailwind directives
```

## 🎯 Cara Customize

### Mengubah Data

Buka file komponen yang ingin di-edit di folder `src/components/`:

**Projects.js** - Edit array `projects` untuk menambah/mengurangi project
**Skills.js** - Sesuaikan skills dan proficiency level
**Contact.js** - Update informasi kontak Anda

### Mengubah Warna

Edit `tailwind.config.js` di bagian `theme.extend.colors`:

```javascript
colors: {
  primary: "#06B6D4",    // Cyan
  secondary: "#0F172A",  // Dark blue
  accent: "#EC4899",     // Pink
}
```

### Menambah Animasi

Buat animasi baru di `tailwind.config.js` bagian `keyframes`:

```javascript
myAnimation: {
  "0%": { /* start */ },
  "100%": { /* end */ }
}
```

## 📱 Responsive Breakpoints

- Mobile: 320px - 640px
- Tablet: 641px - 1024px
- Desktop: 1025px+

## 🚀 Build untuk Production

```bash
npm run build
```

File akan di-generate di folder `build/` dan siap untuk di-deploy.

## 🌐 Deploy

Anda bisa deploy ke:
- **Vercel** (recommended): https://vercel.com
- **Netlify**: https://netlify.com
- **GitHub Pages**: https://pages.github.com

## 📝 Catatan

- Update informasi pribadi di setiap komponen (nama, email, skills, projects)
- Tambahkan link social media yang real di Footer
- Ganti emoji dengan image/icon sesuai preferensi
- Pastikan CV file tersedia jika ada button "Download CV"

## 📄 License

Free to use for personal and commercial projects.

---

Made with ❤️ using React & Tailwind CSS

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
