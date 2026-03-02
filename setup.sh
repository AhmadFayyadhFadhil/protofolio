#!/bin/bash

# Quick Start Script untuk Portfolio Website

echo "🚀 Portfolio Setup Started..."
echo ""

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js tidak terinstall. Silakan install dari https://nodejs.org"
    exit 1
fi

echo "✅ Node.js terdeteksi: $(node --version)"
echo "✅ NPM terdeteksi: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies berhasil diinstall"
    echo ""
    echo "🎉 Setup berhasil!"
    echo ""
    echo "📖 Perintah selanjutnya:"
    echo ""
    echo "  💻 Untuk development:"
    echo "     npm start"
    echo ""
    echo "  🏗️  Untuk production build:"
    echo "     npm run build"
    echo ""
    echo "  📝 Untuk customize portfolio, baca:"
    echo "     CUSTOMIZE.md"
    echo ""
else
    echo "❌ Terjadi error saat install. Coba jalankan:"
    echo "npm install"
    exit 1
fi
