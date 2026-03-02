# 🚀 Installation & Setup Guide

Panduan lengkap untuk setup dan menjalankan portfolio website Anda.

## 📋 Prerequisites

Sebelum mulai, pastikan sudah install:
- **Node.js** (v14+) - Download dari https://nodejs.org
- **npm** (biasanya ter-install dengan Node.js)
- **Code Editor** - VS Code recommended

Verify installation:
```bash
node --version
npm --version
```

## 🎯 Step-by-Step Installation

### Step 1: Install Dependencies

Buka terminal di folder project dan jalankan:

```bash
npm install
```

Ini akan menginstall semua packages yang dibutuhkan:
- React & React DOM
- Tailwind CSS
- PostCSS & Autoprefixer
- Testing libraries

Tunggu hingga selesai (biasanya 2-5 menit).

### Step 2: Verify Installation

Cek apakah dependencies terinstall dengan benar:

```bash
npm list react react-dom tailwindcss
```

Harusnya menunjukkan versi yang terinstall.

### Step 3: Start Development Server

Jalankan server development:

```bash
npm start
```

Server akan otomatis membuka browser di `http://localhost:3000`

✅ Jika berhasil, Anda akan melihat portfolio website berjalan!

## 📝 Project Structure Review

```
src/
├── components/
│   ├── Navbar.js        - Navigation bar
│   ├── Hero.js          - Landing page
│   ├── About.js         - About section
│   ├── Projects.js      - Projects showcase
│   ├── Skills.js        - Skills display
│   ├── Contact.js       - Contact form
│   └── Footer.js        - Footer
├── App.js               - Main component
├── index.js             - Entry point
└── index.css            - Global styles + Tailwind

tailwind.config.js       - Tailwind configuration
postcss.config.js        - PostCSS configuration
package.json             - Dependencies list
```

## 🔧 Configuration Files

### `tailwind.config.js`
Konfigurasi Tailwind CSS:
- Custom colors
- Custom animations
- Utility extensions

### `postcss.config.js`
Process CSS dan tambah vendor prefixes

### `package.json`
Daftar semua dependencies dan scripts

## 🛠️ Available Commands

```bash
# Start development server
npm start

# Build untuk production
npm run build

# Run tests
npm test

# Eject configuration (one-way operation)
npm run eject
```

## 🔍 Troubleshooting

### Error: "Cannot find module 'tailwindcss'"

**Solution:**
```bash
rm -rf node_modules
npm install
```

### Port 3000 Already in Use

**Solution 1 - Windows:**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Solution 2 - Mac/Linux:**
```bash
lsof -ti:3000 | xargs kill -9
```

**Solution 3 - Use different port:**
```bash
npm start -- --port 3001
```

### CSS Not Loading / Tailwind Not Working

**Solution:**
```bash
# Clear cache
npm run build
npm start
```

Verify `tailwind.config.js` has correct content paths.

### Console Errors

Check the console (F12 → Console tab) untuk error details.

Most common issues:
- Wrong import paths
- Missing dependencies
- Syntax errors

## 📱 Testing on Different Devices

### Local Machine
Already done with `npm start`

### Mobile/Tablet Devices
1. Get your machine IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. On mobile device, visit: `http://<YOUR_IP>:3000`
3. Mobile preview tools in browser devtools (F12)

### Different Browsers
Test di:
- Chrome/Chromium
- Firefox
- Safari
- Edge

## 🚀 Before Production Build

### Checklist:
- [ ] Update semua content
- [ ] Test semua links
- [ ] Test contact form
- [ ] Test responsive design
- [ ] Check console for errors
- [ ] Verify page load speed
- [ ] Run `npm run build`

### Build Size Check:
```bash
npm run build
```

Check folder `build/` untuk size file production.

## 📦 Production Build

### Create Build:
```bash
npm run build
```

Output akan di folder `build/`:
- Optimized HTML, CSS, JavaScript
- Minified files
- Source maps (untuk debugging)

### Build Size Target:
- Total: < 200KB
- Main JS: < 100KB
- CSS: < 50KB

## 🌐 Ready for Deployment!

Setelah `npm run build` berhasil, folder `build/` siap di-deploy ke:

- **Vercel**: https://vercel.com/new
- **Netlify**: https://app.netlify.com
- **GitHub Pages**: Enable in repo settings
- **Traditional Hosting**: Upload `build/` folder

## 📚 Next Steps

1. **Customize Content**: Baca [CUSTOMIZE.md](CUSTOMIZE.md)
2. **Pre-Deploy Check**: Baca [DEPLOYMENT.md](DEPLOYMENT.md)
3. **Deploy**: Pilih platform favorit Anda

## 💬 Support & Resources

### Documentation:
- React: https://react.dev/learn
- Tailwind: https://tailwindcss.com/docs
- Web Dev: https://developer.mozilla.org

### Community:
- Stack Overflow
- Reddit: r/reactjs
- Discord communities

## ✅ Success Checklist

- [ ] Node.js & npm installed
- [ ] Dependencies installed (`npm install`)
- [ ] Development server running (`npm start`)
- [ ] Portfolio visible at localhost:3000
- [ ] All sections loading correctly
- [ ] Navigation working
- [ ] Responsive design working

---

**Selamat! Portfolio Anda sudah ready untuk di-customize dan di-deploy! 🎉**

Next: Baca CUSTOMIZE.md untuk mulai personalisasi konten Anda.
