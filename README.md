# 🤖 AI Chat Assistant

Aplikasi web interaktif untuk chat dengan multiple AI models (Gemini, Claude, GPT, Groq).

## 🚀 Fitur

- ✅ Support 4 AI models: Google Gemini, Anthropic Claude, OpenAI GPT, Groq
- ✅ Interface modern dan responsif
- ✅ Chat history dengan localStorage
- ✅ Loading indicator dan error handling
- ✅ Mobile-friendly design
- ✅ Keyboard shortcuts (Ctrl+Enter untuk kirim)
- ✅ Auto-scroll dan retry mechanism

## 📁 Struktur File

\`\`\`
/project
├─ public/
│  ├─ index.html      # Frontend utama
│  ├─ main.js         # JavaScript logic
│  └─ style.css       # Styling
├─ app.py             # Flask backend
├─ requirements.txt   # Python dependencies
└─ README.md          # Dokumentasi
\`\`\`

## 🛠️ Setup & Installation

### 1. Clone/Download Project
\`\`\`bash
# Download semua file ke folder project
\`\`\`

### 2. Setup Backend (Python Flask)
\`\`\`bash
# Install Python dependencies
pip install -r requirements.txt

# Set environment variables untuk API keys
export GEMINI_API_KEY="your-actual-gemini-key"
export CLAUDE_API_KEY="your-actual-claude-key"
export OPENAI_API_KEY="your-actual-openai-key"
export GROQ_API_KEY="your-actual-groq-key"

# Jalankan Flask server
python app.py
\`\`\`

### 3. Setup Frontend
\`\`\`bash
# Serve static files (pilih salah satu):

# Option 1: Python simple server
cd public
python -m http.server 8000

# Option 2: Node.js serve
npx serve public -p 8000

# Option 3: PHP server
cd public
php -S localhost:8000
\`\`\`

### 4. Akses Aplikasi
- Frontend: http://localhost:8000
- Backend API: http://localhost:5000

## 🔧 Konfigurasi API Keys

### Cara mendapatkan API Keys:

1. **Google Gemini**: https://makersuite.google.com/app/apikey
2. **Anthropic Claude**: https://console.anthropic.com/
3. **OpenAI GPT**: https://platform.openai.com/api-keys
4. **Groq**: https://console.groq.com/keys

### Set Environment Variables:

**Linux/Mac:**
\`\`\`bash
export GEMINI_API_KEY="your-key-here"
export CLAUDE_API_KEY="your-key-here"
export OPENAI_API_KEY="your-key-here"
export GROQ_API_KEY="your-key-here"
\`\`\`

**Windows:**
\`\`\`cmd
set GEMINI_API_KEY=your-key-here
set CLAUDE_API_KEY=your-key-here
set OPENAI_API_KEY=your-key-here
set GROQ_API_KEY=your-key-here
\`\`\`

## 📡 API Endpoints

### POST /ask
Kirim pertanyaan ke AI model
\`\`\`json
{
  "question": "Apa itu artificial intelligence?",
  "model": "gemini"
}
\`\`\`

Response:
\`\`\`json
{
  "answer": "AI adalah...",
  "model": "gemini",
  "timestamp": 1234567890,
  "processing_time": 1.23
}
\`\`\`

### GET /models
Get daftar model yang tersedia
\`\`\`json
{
  "models": [
    {
      "id": "gemini",
      "name": "Google Gemini",
      "description": "Google's advanced AI model",
      "available": true
    }
  ]
}
\`\`\`

## 🎯 Cara Penggunaan

1. Buka aplikasi di browser
2. Pilih AI model dari dropdown
3. Ketik pertanyaan di text area
4. Klik "Kirim" atau tekan Ctrl+Enter
5. Lihat respons AI di chat history

## 🔍 Troubleshooting

### Backend tidak jalan:
- Pastikan Flask terinstall: `pip install flask flask-cors`
- Check port 5000 tidak digunakan aplikasi lain
- Lihat error di terminal

### Frontend tidak konek ke backend:
- Pastikan backend jalan di http://localhost:5000
- Check CORS settings di app.py
- Lihat Network tab di browser DevTools

### API Key error:
- Pastikan environment variables sudah di-set
- Check API key valid dan tidak expired
- Lihat logs di terminal backend

## 🚀 Production Deployment

### Backend (Flask):
\`\`\`bash
# Install production server
pip install gunicorn

# Run dengan Gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
\`\`\`

### Frontend:
- Upload file ke web server (Apache/Nginx)
- Update API_BASE_URL di main.js ke production URL

## 📝 Development Notes

- Mock responses digunakan jika API key tidak di-set
- Chat history disimpan di localStorage browser
- Retry mechanism untuk handle network errors
- Responsive design untuk mobile devices

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📄 License

MIT License - bebas digunakan untuk project apapun.
