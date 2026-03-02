# 🎨 Panduan Kustomisasi Portfolio

## 1. Mengubah Data Pribadi

### Update Navbar
File: `src/components/Navbar.js`
```javascript
<h1 className="text-2xl font-bold gradient-text">Portfolio</h1>
// Ganti "Portfolio" dengan nama Anda
```

### Update Hero Section
File: `src/components/Hero.js`
```javascript
<h2 className="text-6xl md:text-7xl font-bold text-white mb-6">
  Halo! Saya <span className="gradient-text">Developer</span>
</h2>
// Sesuaikan greeting dan profesi
```

### Update About Section
File: `src/components/About.js`
```javascript
<p className="text-lg text-slate-700 leading-relaxed">
  Saya adalah seorang developer yang passionate...
</p>
// Ganti dengan bio Anda
```

### Update Contact Information
File: `src/components/Contact.js`
```javascript
<p className="text-slate-300">your.email@example.com</p>
<p className="text-slate-300">+62 812 3456 7890</p>
<p className="text-slate-300">Jakarta, Indonesia</p>
// Update dengan info Anda
```

## 2. Menambah/Mengubah Projects

File: `src/components/Projects.js`

Buka array `projects` dan tambahkan project baru:

```javascript
const projects = [
  {
    id: 1,
    title: "Nama Project",
    description: "Deskripsi project Anda",
    tech: ["React", "Node.js", "MongoDB"],
    image: "🎯",  // Ganti dengan emoji
    color: "from-cyan-400 to-blue-500",
  },
  // Tambahkan lebih banyak projects...
];
```

## 3. Mengubah Skills

File: `src/components/Skills.js`

### Mengubah Skill Categories
```javascript
const skills = [
  {
    category: "Frontend",
    items: ["React", "JavaScript", "Tailwind CSS"],
    icon: "🎨",
  },
  // Tambahkan kategori lain...
];
```

### Mengubah Proficiency
Cari bagian "Proficiency" dan sesuaikan:
```javascript
{ name: "React", level: 90 },
{ name: "JavaScript", level: 85 },
```

## 4. Mengubah Warna Tema

File: `tailwind.config.js`

Ubah di bagian `colors`:
```javascript
colors: {
  primary: "#06B6D4",    // Warna utama (cyan)
  secondary: "#0F172A",  // Warna sekunder (dark)
  accent: "#EC4899",     // Warna aksen (pink)
}
```

### Kombinasi Warna Populer

**Cool Blue:**
```
primary: "#0EA5E9"
accent: "#3B82F6"
```

**Purple Vibes:**
```
primary: "#A855F7"
accent: "#EC4899"
```

**Green Fresh:**
```
primary: "#10B981"
accent: "#06B6D4"
```

## 5. Menambah/Mengubah Animasi

File: `tailwind.config.js` - Bagian `keyframes`

Contoh menambah animasi baru:
```javascript
pulse: {
  "0%, 100%": { opacity: "1" },
  "50%": { opacity: ".5" },
}
```

Kemudian tambahkan di `animation`:
```javascript
"pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
```

Gunakan di komponen:
```javascript
<div className="animate-pulse">Content</div>
```

## 6. Mengubah Social Media Links

File: `src/components/Footer.js`

Ubah href dan pastikan link social media Anda benar:
```javascript
{ icon: '💼', label: 'LinkedIn', href: 'https://linkedin.com/in/yourprofile' },
{ icon: '🐙', label: 'GitHub', href: 'https://github.com/yourprofile' },
{ icon: '𝕏', label: 'Twitter', href: 'https://twitter.com/yourprofile' },
```

## 7. Mengubah Emoji

Ganti emoji di setiap section sesuai preferensi:

- 💻 = Coding
- 🎨 = Design
- 🚀 = Rocket/Launch
- ⚡ = Speed
- 📱 = Mobile
- 🌟 = Star
- 💡 = Idea

Atau gunakan emoji dari: https://emojipedia.org

## 8. Mengubah Typography

File: `src/index.css`

Ubah font family:
```css
body {
  font-family: 'Segoe UI', Trebuchet MS, sans-serif;
}
```

## 9. Menambah Section Baru

1. Buat file baru di `src/components/YourSection.js`
2. Import di `App.js`
3. Gunakan struktur yang sama dengan section lain

Contoh template:
```javascript
export default function MySection() {
  return (
    <section id="my-section" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="section-title text-center mb-12">
          Section Title
        </h2>
        {/* Konten di sini */}
      </div>
    </section>
  );
}
```

## 10. Tips Desain

✅ **Konsistensi**: Gunakan 1-2 warna utama maksimal 3 warna aksen
✅ **Spacing**: Gunakan padding/margin yang konsisten (multiples of 4)
✅ **Typography**: Max 3 font sizes untuk heading
✅ **Animation**: Jangan lebih dari 0.8s untuk smooth feel
✅ **Contrast**: Pastikan text readable di semua backgrounds

## 11. Performance Tips

- Compress images sebelum upload
- Gunakan lazy loading untuk images
- Minify CSS/JS saat build
- Test di berbagai browser
- Check lighthouse score

---

Butuh bantuan? Periksa React docs: https://react.dev
Tailwind docs: https://tailwindcss.com/docs
