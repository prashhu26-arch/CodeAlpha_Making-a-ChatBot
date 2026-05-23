document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const themeIcon = themeToggle.querySelector('i');

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    themeToggle.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            updateThemeIcon('light');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateThemeIcon('dark');
        }
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
    }

    // Chatbot Logic
    const chatWindow = document.getElementById('chat-window');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');

    // Predefined Responses
    const botResponses = {
        "hello": "Hi! Welcome to College Help Chatbot.",
        "hi": "Hi! Welcome to College Help Chatbot.",
        "hey": "Hi! Welcome to College Help Chatbot.",
        "college timings": "College timings are 10 AM to 5 PM.",
        "timing": "College timings are 10 AM to 5 PM.",
        "courses": "We offer CSE, AI&DS, ECE, EEE and Mechanical courses.",
        "course": "We offer CSE, AI&DS, ECE, EEE and Mechanical courses.",
        "fees": "Please contact the administration office for fee details.",
        "fee": "Please contact the administration office for fee details.",
        "library": "Library timings are 9 AM to 6 PM.",
        "hostel": "Hostel facilities are available for boys and girls.",
        "contact": "Contact: collegehelp@gmail.com",
    };

    function addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender === 'user' ? 'user-message' : 'bot-message');
        
        const bubble = document.createElement('div');
        bubble.classList.add('msg-bubble');
        bubble.textContent = message;
        
        messageDiv.appendChild(bubble);
        chatWindow.appendChild(messageDiv);
        scrollToBottom();
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('typing-indicator');
        typingDiv.id = 'typing-indicator';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            typingDiv.appendChild(dot);
        }
        
        chatWindow.appendChild(typingDiv);
        scrollToBottom();
    }

    function removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    function scrollToBottom() {
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function getBotResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase().trim();
        
        // Match checking
        let responseFound = null;
        for (const [key, response] of Object.entries(botResponses)) {
            if (lowerCaseMessage.includes(key)) {
                responseFound = response;
                break;
            }
        }

        return responseFound || "I'm sorry, I don't understand that. Try asking about courses, fees, timings, library, or hostel.";
    }

    function handleSend() {
        const message = userInput.value.trim();
        if (message === '') return;

        // User message
        addMessage(message, 'user');
        userInput.value = '';

        // Show typing animation
        showTypingIndicator();

        // Simulate processing delay
        setTimeout(() => {
            removeTypingIndicator();
            const response = getBotResponse(message);
            addMessage(response, 'bot');
        }, 1000); // 1 second delay for typing effect
    }

    // Event Listeners for Chat
    sendBtn.addEventListener('click', handleSend);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    });

    suggestionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            userInput.value = btn.textContent;
            handleSend();
        });
    });

    // Floating Icon to scroll to chatbot
    const floatingIcon = document.getElementById('floating-icon');
    floatingIcon.addEventListener('click', () => {
        document.getElementById('chatbot').scrollIntoView({ behavior: 'smooth' });
    });
});
