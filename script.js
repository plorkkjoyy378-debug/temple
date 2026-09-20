// State management
let chatSessions = [];
let currentChatId = null;
let messages = [];

// DOM Elements
const chatMessages = document.getElementById('chatMessages');
const welcomeContainer = document.getElementById('welcomeContainer');
const userInput = document.getElementById('userInput');
const chatHistoryList = document.getElementById('chatHistoryList');
const sidebar = document.getElementById('sidebar');

// Auto resize textarea height as user types
function autoResize(textarea) {
  textarea.style.height = 'auto';
  textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
}

// Toggle Sidebar on mobile/desktop
function toggleSidebar() {
  sidebar.classList.toggle('open');
}

// Start a fresh new chat session
function startNewChat() {
  currentChatId = Date.now().toString();
  messages = [];
  welcomeContainer.style.display = 'block';
  // Clear all message rows except welcome container
  const rows = chatMessages.querySelectorAll('.message-row');
  rows.forEach(row => row.remove());
}

// Quick click on suggestion card
function sendSuggestion(text) {
  userInput.value = text;
  handleSendMessage();
}

// Main message handler
function handleSendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  // Hide welcome card on first message
  if (welcomeContainer.style.display !== 'none') {
    welcomeContainer.style.display = 'none';
  }

  // Clear input box
  userInput.value = '';
  userInput.style.height = 'auto';

  // Append user message to UI
  appendMessage(text, 'user');

  // Simulate AI Thinking / Reply
  setTimeout(() => {
    generateSimulatedAIResponse(text);
  }, 600);
}

// Append message row to chat window
function appendMessage(text, sender) {
  const row = document.createElement('div');
  row.className = `message-row ${sender}`;

  const content = document.createElement('div');
  content.className = 'message-content';

  const avatar = document.createElement('div');
  avatar.className = 'msg-avatar';
  avatar.innerHTML = sender === 'user' ? '<i class="fa-solid fa-user"></i>' : '<i class="fa-solid fa-robot"></i>';

  const msgText = document.createElement('div');
  msgText.className = 'msg-text';
  msgText.innerText = text;

  content.appendChild(avatar);
  content.appendChild(msgText);
  row.appendChild(content);

  chatMessages.appendChild(row);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Simulated ChatGPT response generator (Customizable for Khmer or English)
function generateSimulatedAIResponse(userText) {
  let reply = '';
  
  if (userText.includes('HTML') || userText.includes('កូដ')) {
    reply = 'បាទ/ចាស៎! HTML (HyperText Markup Language) គឺជាភាសាគ្រឹះសម្រាប់បង្កើតโครงสร้างទំព័រเว็บ។ ឧទាហរណ៍កូដសាមញ្ញ:\n\n<!DOCTYPE html>\n<html>\n  <head><title>Page</title></head>\n  <body><h1>Hello World</h1></body>\n</html>';
  } else if (userText.includes('អាជីវកម្ម') || userText.includes('business')) {
    reply = 'គំនិតអាជីវកម្មអនឡាញល្អៗរួមមាន៖ ១. ការលក់ទំនិញតាមរយៈ Live Stream ផ្ទាល់ ២. សេវាកម្មរចនាគេហទំព័រ ឬ Graphic Design ៣. ការបង្កើតមាតិកាអប់រំតាម YouTube ឬ TikTok។';
  } else if (userText.includes('ភាសាអង់គ្លេស') || userText.includes('English')) {
    reply = 'ដើម្បីរៀនភាសាអង់គ្លេសឱ្យបានលឿន៖ ត្រូវហាត់ស្តាប់បទចម្រៀង ឬវីដេអូអង់គ្លេសជារៀងរាល់ថ្ងៃ, អានសៀវភៅកម្រិតងាយៗ, និងហ៊ាននិយាយទោះបីជាខុសវេយ្យាករណ៍ក៏ដោយ។';
  } else {
    reply = `ខ្ញុំបានយល់សំណួររបស់អ្នកហើយ៖ "${userText}"។ ក្នុងនាមជា ChatGPT Clone ខ្ញុំត្រៀមខ្លួនជាស្រេចដើម្បីជួយលោកអ្នកបន្ថែមទៀត! តើមានអ្វីចង់ឱ្យខ្ញុំពន្យល់លម្អិតទេ?`;
  }

  appendMessage(reply, 'assistant');
}

// Handle Enter keypress to submit (Shift+Enter for new line)
userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSendMessage();
  }
});