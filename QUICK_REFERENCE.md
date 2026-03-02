# ⚡ Quick Reference Guide

Panduan cepat untuk common tasks di portfolio Anda.

## 🚀 Start Development

```bash
npm install
npm start
```

Akses di `http://localhost:3000`

## 📝 File Locations

| Task | File |
|------|------|
| Update navbar | `src/components/Navbar.js` |
| Update hero text | `src/components/Hero.js` |
| Update about | `src/components/About.js` |
| Add projects | `src/components/Projects.js` |
| Update skills | `src/components/Skills.js` |
| Update contact info | `src/components/Contact.js` |
| Update footer links | `src/components/Footer.js` |
| Change colors | `tailwind.config.js` |
| Update global CSS | `src/index.css` |

## 🎨 Quick Color Changes

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: "#06B6D4",    // Your main color
  secondary: "#0F172A",  // Your secondary color
  accent: "#EC4899",     // Your accent color
}
```

## 🎬 Add New Project

Edit `src/components/Projects.js`:

```javascript
{
  id: 2,
  title: "My Project Name",
  description: "Short description",
  tech: ["React", "Node.js"],
  image: "🎯",              // Use any emoji
  color: "from-cyan-400 to-blue-500",
}
```

## ⚙️ Add New Skill

Edit `src/components/Skills.js`:

```javascript
{
  category: "Category Name",
  items: ["Skill 1", "Skill 2", "Skill 3"],
  icon: "🎨",
}
```

## 🔗 Add Social Media Link

Edit `src/components/Footer.js`:

```javascript
{ icon: '💼', label: 'LinkedIn', href: 'https://linkedin.com/in/yours' }
```

## 🎞️ Add New Animation

1. Edit `tailwind.config.js` → `keyframes`:

```javascript
myAnimation: {
  "0%": { transform: "scale(0)" },
  "100%": { transform: "scale(1)" }
}
```

2. Add to `animation`:

```javascript
"my": "myAnimation 0.5s ease-out",
```

3. Use in component:

```jsx
<div className="animate-my">Content</div>
```

## 🎨 Tailwind Classes Cheat Sheet

| Class | Effect |
|-------|--------|
| `bg-cyan-500` | Background color |
| `text-white` | Text color |
| `hover:bg-cyan-600` | Hover state |
| `transition-smooth` | Smooth transition |
| `rounded-lg` | Border radius |
| `shadow-lg` | Drop shadow |
| `flex` | Flexbox |
| `grid` | CSS grid |
| `md:` | Tablet breakpoint |
| `lg:` | Desktop breakpoint |

## 📱 Responsive Design

```javascript
// Mobile-first approach
className="text-base md:text-lg lg:text-xl"

// Grid responsive
className="grid md:grid-cols-2 lg:grid-cols-3"

// Flex responsive
className="flex-col md:flex-row"
```

## 🔍 Test Responsive Design

In browser devtools (F12):
- Click device toolbar icon
- Select different devices
- Rotate to landscape

## 🐛 Check Errors

1. Open browser devtools: `F12`
2. Go to Console tab
3. Fix any red errors

## 📊 Performance Check

In devtools:
1. Go to Lighthouse tab
2. Click "Analyze page load"
3. Check score (target > 90)

## 🏗️ Build for Production

```bash
npm run build
```

Creates optimized `build/` folder ready to deploy.

## 📤 Deploy (Quick)

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

## 🔧 Update Dependencies

```bash
npm update
```

## 🧹 Clean Install

If something breaks:
```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

## 💾 Save Changes

After editing files:
1. Files auto-refresh in browser
2. Check for errors in console
3. Test all features

## 📚 Common Patterns

### Button
```jsx
<button className="btn-primary">Click me</button>
```

### Card with hover
```jsx
<div className="bg-white p-6 rounded-lg hover:shadow-lg transition-smooth">
  Content
</div>
```

### Section with animation
```jsx
<section className="py-20 bg-white">
  <h2 className="animate-slide-in-up">Title</h2>
</section>
```

### Form input
```jsx
<input 
  type="text" 
  className="px-4 py-2 border rounded-lg focus:outline-none focus:border-cyan-500"
  placeholder="Enter text"
/>
```

### Grid layout
```jsx
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>
```

## 🎯 Development Workflow

1. Edit file → Save
2. Browser auto-refreshes
3. Check console (F12) for errors
4. Test in mobile view
5. Commit changes
6. When ready: `npm run build`
7. Deploy!

## 📞 Quick Help

| Problem | Solution |
|---------|----------|
| Changes not showing | Check console, refresh F5, hard refresh Ctrl+Shift+R |
| Styling broken | Check Tailwind config, restart server |
| Error in console | Read error message, check file locations |
| Port in use | Use different port: `npm start -- --port 3001` |
| Build fails | Delete node_modules, `npm install`, try again |

## 🌟 Best Practices

✅ Keep components focused
✅ Use consistent naming
✅ Update content regularly  
✅ Test responsive design
✅ Check performance
✅ Commit to git regularly
✅ Use meaningful commit messages

## 📖 Learn More

- React: https://react.dev
- Tailwind: https://tailwindcss.com/docs
- JavaScript: https://developer.mozilla.org/en-US/docs/Web/JavaScript

---

**For detailed guides, see:**
- [INSTALLATION.md](INSTALLATION.md) - Setup instructions
- [CUSTOMIZE.md](CUSTOMIZE.md) - Customization guide
- [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment checklist
- [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) - Project overview

**Happy coding! 🚀**
