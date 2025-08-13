// Konfigurasi aplikasi
const CONFIG = {
  API_BASE_URL: "http://localhost:5000",
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000,
}

// State management
let chatHistory = []
let isLoading = false

// DOM Elements
const chatForm = document.getElementById("chat-form")
const questionInput = document.getElementById("question-input")
const submitBtn = document.getElementById("submit-btn")
const chatHistoryDiv = document.getElementById("chat-history")
const modelSelect = document.getElementById("model-select")
const loadingSpinner = document.getElementById("loading-spinner")

// Initialize aplikasi
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
})

function initializeApp() {
  // Event listeners
  chatForm.addEventListener("submit", handleSubmit)
  questionInput.addEventListener("keydown", handleKeyDown)
  modelSelect.addEventListener("change", handleModelChange)

  // Load chat history dari localStorage
  loadChatHistory()

  // Focus pada input
  questionInput.focus()

  console.log("🚀 AI Chat Assistant initialized")
}

// Handle form submission
async function handleSubmit(e) {
  e.preventDefault()

  const question = questionInput.value.trim()
  if (!question || isLoading) return

  const selectedModel = modelSelect.value

  // Add user message ke chat
  addMessage("user", question)

  // Clear input dan set loading state
  questionInput.value = ""
  setLoadingState(true)

  try {
    // Kirim request ke backend
    const response = await sendQuestionToAPI(question, selectedModel)

    // Add AI response ke chat
    addMessage("ai", response.answer, selectedModel)
  } catch (error) {
    console.error("Error:", error)
    addMessage("ai", `❌ Maaf, terjadi kesalahan: ${error.message}`, selectedModel)
  } finally {
    setLoadingState(false)
    questionInput.focus()
  }
}

// Kirim pertanyaan ke backend API
async function sendQuestionToAPI(question, model) {
  const requestData = {
    question: question,
    model: model,
  }

  let lastError

  // Retry mechanism
  for (let attempt = 1; attempt <= CONFIG.MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(`${CONFIG.API_BASE_URL}/ask`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      return data
    } catch (error) {
      lastError = error
      console.warn(`Attempt ${attempt} failed:`, error.message)

      if (attempt < CONFIG.MAX_RETRIES) {
        await sleep(CONFIG.RETRY_DELAY * attempt)
      }
    }
  }

  throw lastError
}

// Add message ke chat history
function addMessage(type, content, model = null) {
  const message = {
    type: type,
    content: content,
    model: model,
    timestamp: new Date().toISOString(),
  }

  chatHistory.push(message)
  renderMessage(message)
  saveChatHistory()
  scrollToBottom()
}

// Render single message
function renderMessage(message) {
  const messageDiv = document.createElement("div")
  messageDiv.className = `message ${message.type}-message`

  const timestamp = new Date(message.timestamp).toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  })

  let headerText = ""
  if (message.type === "user") {
    headerText = `Anda - ${timestamp}`
  } else {
    const modelName = getModelDisplayName(message.model)
    headerText = `${modelName} - ${timestamp}`
  }

  messageDiv.innerHTML = `
        <div class="message-header">${headerText}</div>
        <div class="message-content">${formatMessageContent(message.content)}</div>
    `

  // Remove welcome message jika ada
  const welcomeMessage = chatHistoryDiv.querySelector(".welcome-message")
  if (welcomeMessage) {
    welcomeMessage.remove()
  }

  chatHistoryDiv.appendChild(messageDiv)
}

// Format message content
function formatMessageContent(content) {
  // Convert line breaks ke <br>
  return content.replace(/\n/g, "<br>")
}

// Get display name untuk model
function getModelDisplayName(model) {
  const modelNames = {
    gemini: "🧠 Google Gemini",
    claude: "🤖 Anthropic Claude",
    gpt: "💡 OpenAI GPT",
    groq: "⚡ Groq",
  }
  return modelNames[model] || "🤖 AI Assistant"
}

// Handle keyboard shortcuts
function handleKeyDown(e) {
  // Ctrl/Cmd + Enter untuk submit
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    e.preventDefault()
    chatForm.dispatchEvent(new Event("submit"))
  }
}

// Handle model change
function handleModelChange(e) {
  const selectedModel = e.target.value
  console.log(`🔄 Model changed to: ${selectedModel}`)

  // Add system message tentang perubahan model
  const modelName = getModelDisplayName(selectedModel)
  addMessage("ai", `Model AI berubah ke ${modelName}. Silakan ajukan pertanyaan Anda!`)
}

// Set loading state
function setLoadingState(loading) {
  isLoading = loading
  submitBtn.disabled = loading

  if (loading) {
    submitBtn.classList.add("loading")
  } else {
    submitBtn.classList.remove("loading")
  }
}

// Scroll ke bottom chat history
function scrollToBottom() {
  chatHistoryDiv.scrollTop = chatHistoryDiv.scrollHeight
}

// Save chat history ke localStorage
function saveChatHistory() {
  try {
    localStorage.setItem("ai-chat-history", JSON.stringify(chatHistory))
  } catch (error) {
    console.warn("Failed to save chat history:", error)
  }
}

// Load chat history dari localStorage
function loadChatHistory() {
  try {
    const saved = localStorage.getItem("ai-chat-history")
    if (saved) {
      chatHistory = JSON.parse(saved)

      // Render messages
      chatHistory.forEach((message) => {
        renderMessage(message)
      })

      if (chatHistory.length > 0) {
        scrollToBottom()
      }
    }
  } catch (error) {
    console.warn("Failed to load chat history:", error)
    chatHistory = []
  }
}

// Utility function untuk sleep
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// Clear chat history (bisa dipanggil dari console)
function clearChatHistory() {
  chatHistory = []
  chatHistoryDiv.innerHTML =
    '<div class="welcome-message"><p>👋 Selamat datang! Silakan ajukan pertanyaan Anda.</p></div>'
  localStorage.removeItem("ai-chat-history")
  console.log("🗑️ Chat history cleared")
}

// Export functions untuk debugging
window.chatApp = {
  clearHistory: clearChatHistory,
  getHistory: () => chatHistory,
  config: CONFIG,
}
