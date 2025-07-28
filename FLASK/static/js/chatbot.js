// chatbot.js - Add this file to your static/js/ directory and include it in your HTML templates

// Chatbot CSS (add to your styles.css or include inline)
const chatbotStyles = `
:root {
    --primary-color: #005792;
    --secondary-color: #0077b6;
    --success-color: #28a745;
    --bg-light: #f8f9fa;
    --text-dark: #212529;
    --text-light: #6c757d;
    --border-color: #e9ecef;
}

/* Chatbot Button */
.chatbot-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    border-radius: 50%;
    border: none;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(0, 87, 146, 0.3);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    animation: pulse 2s infinite;
}

.chatbot-button:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 25px rgba(0, 87, 146, 0.4);
}

.chatbot-button svg {
    width: 28px;
    height: 28px;
    fill: white;
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(0, 87, 146, 0.7);
    }
    70% {
        box-shadow: 0 0 0 10px rgba(0, 87, 146, 0);
    }
    100% {
        box-shadow: 0 0 0 0 rgba(0, 87, 146, 0);
    }
}

/* Chatbot Container */
.chatbot-container {
    position: fixed;
    bottom: 90px;
    right: 20px;
    width: 380px;
    height: 500px;
    background: white;
    border-radius: 20px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
    display: none;
    flex-direction: column;
    z-index: 9998;
    overflow: hidden;
    border: 1px solid var(--border-color);
}

.chatbot-container.active {
    display: flex;
    animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Header */
.chatbot-header {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    padding: 15px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.chatbot-header h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
}

.chatbot-close {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 20px;
    padding: 0;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;
}

.chatbot-close:hover {
    background-color: rgba(255, 255, 255, 0.2);
}

/* Messages Area */
.chatbot-messages {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    background: #fafafa;
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.message {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    animation: fadeIn 0.3s ease-in;
}

.message.user {
    flex-direction: row-reverse;
}

.message-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
    flex-shrink: 0;
}

.message.bot .message-avatar {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
}

.message.user .message-avatar {
    background: var(--success-color);
    color: white;
}

.message-content {
    max-width: 75%;
    padding: 12px 16px;
    border-radius: 18px;
    font-size: 14px;
    line-height: 1.4;
    word-wrap: break-word;
}

.message.bot .message-content {
    background: white;
    color: var(--text-dark);
    border-bottom-left-radius: 6px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.message.user .message-content {
    background: var(--primary-color);
    color: white;
    border-bottom-right-radius: 6px;
}

.typing-indicator {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 15px 0;
}

.typing-dots {
    display: flex;
    gap: 4px;
}

.typing-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--primary-color);
    animation: typing 1.4s infinite ease-in-out;
}

.typing-dot:nth-child(1) { animation-delay: -0.32s; }
.typing-dot:nth-child(2) { animation-delay: -0.16s; }

@keyframes typing {
    0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
    40% { transform: scale(1); opacity: 1; }
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Input Area */
.chatbot-input {
    padding: 15px 20px;
    background: white;
    border-top: 1px solid var(--border-color);
    display: flex;
    gap: 10px;
    align-items: flex-end;
}

.chatbot-input textarea {
    flex: 1;
    border: 1px solid var(--border-color);
    border-radius: 20px;
    padding: 10px 15px;
    font-size: 14px;
    resize: none;
    max-height: 80px;
    min-height: 40px;
    font-family: inherit;
    outline: none;
    transition: border-color 0.3s ease;
}

.chatbot-input textarea:focus {
    border-color: var(--primary-color);
}

.send-button {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background: var(--primary-color);
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    flex-shrink: 0;
}

.send-button:hover:not(:disabled) {
    background: var(--secondary-color);
    transform: scale(1.05);
}

.send-button:disabled {
    background: #ccc;
    cursor: not-allowed;
}

.send-button svg {
    width: 16px;
    height: 16px;
    fill: currentColor;
}

/* Quick Actions */
.quick-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 0 20px 10px;
}

.quick-action {
    background: white;
    border: 1px solid var(--border-color);
    border-radius: 15px;
    padding: 6px 12px;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: var(--text-dark);
}

.quick-action:hover {
    background: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
}

/* Notification Badge */
.notification-badge {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #dc3545;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    animation: bounce 1s infinite;
}

@keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
}

/* Responsive */
@media (max-width: 480px) {
    .chatbot-container {
        width: calc(100vw - 40px);
        right: 20px;
        left: 20px;
        height: 70vh;
    }
}
`;

// Inject CSS
function injectChatbotStyles() {
    const styleElement = document.createElement('style');
    styleElement.textContent = chatbotStyles;
    document.head.appendChild(styleElement);
}

// ConQsys Chatbot Class
class ConQsysChatbot {
    constructor() {
        this.isOpen = false;
        this.isTyping = false;
        this.messageHistory = [];
        
        this.knowledgeBase = {
            company: {
                name: "ConQsys",
                description: "A cutting-edge company focusing on embedded systems, electronics, and software design",
                mission: "Empowering Innovation with Embedded Systems & Software Solutions",
                experience: "Years of experience with a passionate team",
                approach: "We blend innovation and technology to deliver reliable solutions"
            },
            services: {
                "embedded systems": {
                    title: "Embedded Systems",
                    description: "Development of reliable and secure embedded solutions tailored to industry needs with cutting-edge microcontroller programming and real-time systems"
                },
                "hardware design": {
                    title: "Hardware Design", 
                    description: "Design and prototyping of PCBs and circuits for specialized applications, from concept to production-ready solutions"
                },
                "software development": {
                    title: "Software Development",
                    description: "Custom software, tools, and utilities for embedded platforms and automation, including web applications and mobile solutions"
                }
            },
            industries: {
                "retail": "We help retail industry players meet customers' expectations through technology, with supply chain optimization, virtual stores, sales analysis, and inventory management solutions",
                "healthcare": "We engineer HIPAA-compliant solutions, simplifying complexities, patient care systems, and extended reach through telemedicine and health monitoring solutions",
                "real estate": "We deliver integrated Real Estate solutions with streamlined processes, inventory management, and property management systems across all stakeholders",
                "e-commerce": "We introduce scalable e-commerce solutions to e-store owners, ensuring optimal, robust and secure omnichannel user experiences with advanced analytics",
                "human resources": "Our IT engineers provide HR domain solutions for human capital investment, integrated recruitment campaigns, and workforce management systems",
                "logistics": "We devise innovative IT services for logistics, with best-in-class ERP solutions, pre-tested supply chain automation and custom BI capabilities"
            },
            technologies: {
                "web services": ["Node.js", "ASP.NET Core", "Django", "Ruby on Rails", "Flask"],
                "web apps": ["Angular", "React.js", "Vue.js", "Next.js"],
                "desktop apps": ["Electron", ".NET Core UWP", "Qt", "Tauri"],
                "mobile apps": ["React Native", "Flutter", "iOS Native", "Android Native"]
            },
            contact: {
                address: "A-161 Sector 63, Noida 201301, India",
                email: "info@conqsys.com",
                phone: "+91-9999653260",
                career_phone: "+91-9999653260"
            },
            stats: {
                clients: "100+",
                users: "1,000,000+",
                retention: "96%",
                projects: "700+"
            }
        };
        
        this.init();
    }

    init() {
        this.createChatbotHTML();
        this.bindEvents();
        this.showNotification();
    }

    createChatbotHTML() {
        const chatbotHTML = `
            <!-- Chatbot Button -->
            <button class="chatbot-button" id="chatbotToggle">
                <svg viewBox="0 0 24 24">
                    <path d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M6,9V7H18V9H6M14,11V13H6V11H14M16,15V17H6V15H16Z"/>
                </svg>
                <div class="notification-badge" id="notificationBadge" style="display: none;">1</div>
            </button>

            <!-- Chatbot Container -->
            <div class="chatbot-container" id="chatbotContainer">
                <div class="chatbot-header">
                    <div>
                        <h3>ConQsys Assistant</h3>
                        <small style="opacity: 0.8;">How can I help you today?</small>
                    </div>
                    <button class="chatbot-close" id="chatbotClose">×</button>
                </div>

                <div class="chatbot-messages" id="chatbotMessages">
                    <div style="text-align: center; padding: 20px; color: #6c757d; font-size: 13px;">
                        <strong>Welcome to ConQsys!</strong><br>
                        I'm here to help you learn about our services, technologies, and how we can assist with your project needs.
                    </div>
                </div>

                <div class="quick-actions" id="quickActions">
                    <button class="quick-action">Our Services</button>
                    <button class="quick-action">Technologies</button>
                    <button class="quick-action">Industries</button>
                    <button class="quick-action">Contact Info</button>
                    <button class="quick-action">Get Quote</button>
                </div>

                <div class="chatbot-input">
                    <textarea 
                        id="messageInput" 
                        placeholder="Type your message here..." 
                        rows="1"
                    ></textarea>
                    <button class="send-button" id="sendButton">
                        <svg viewBox="0 0 24 24">
                            <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    bindEvents() {
        const toggle = document.getElementById('chatbotToggle');
        const close = document.getElementById('chatbotClose');
        const sendButton = document.getElementById('sendButton');
        const messageInput = document.getElementById('messageInput');
        const quickActions = document.getElementById('quickActions');

        toggle.addEventListener('click', () => this.toggleChat());
        close.addEventListener('click', () => this.closeChat());
        sendButton.addEventListener('click', () => this.sendMessage());
        
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });

        messageInput.addEventListener('input', () => {
            this.autoResize(messageInput);
        });

        quickActions.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-action')) {
                this.handleQuickAction(e.target.textContent);
            }
        });
    }

    showNotification() {
        setTimeout(() => {
            const badge = document.getElementById('notificationBadge');
            if (badge) badge.style.display = 'flex';
        }, 3000);
    }

    toggleChat() {
        const container = document.getElementById('chatbotContainer');
        const badge = document.getElementById('notificationBadge');
        
        if (this.isOpen) {
            this.closeChat();
        } else {
            container.classList.add('active');
            this.isOpen = true;
            if (badge) badge.style.display = 'none';
            
            if (this.messageHistory.length === 0) {
                setTimeout(() => {
                    this.addBotMessage("Hello! I'm the ConQsys AI Assistant. I can help you with information about our services, technologies, industries we serve, and much more. What would you like to know?");
                }, 500);
            }
            
            document.getElementById('messageInput').focus();
        }
    }

    closeChat() {
        const container = document.getElementById('chatbotContainer');
        container.classList.remove('active');
        this.isOpen = false;
    }

    autoResize(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 80) + 'px';
    }

    sendMessage() {
        const input = document.getElementById('messageInput');
        const message = input.value.trim();
        
        if (!message || this.isTyping) return;
        
        this.addUserMessage(message);
        input.value = '';
        input.style.height = 'auto';
        
        this.showTyping();
        setTimeout(() => {
            const response = this.generateResponse(message);
            this.hideTyping();
            this.addBotMessage(response);
        }, 1000 + Math.random() * 1000);
    }

    addUserMessage(message) {
        const messagesContainer = document.getElementById('chatbotMessages');
        const messageEl = this.createMessageElement('user', message);
        messagesContainer.appendChild(messageEl);
        this.scrollToBottom();
        this.messageHistory.push({type: 'user', message});
    }

    addBotMessage(message) {
        const messagesContainer = document.getElementById('chatbotMessages');
        const messageEl = this.createMessageElement('bot', message);
        messagesContainer.appendChild(messageEl);
        this.scrollToBottom();
        this.messageHistory.push({type: 'bot', message});
    }

    createMessageElement(type, message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = type === 'bot' ? 'CQ' : 'U';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.innerHTML = this.formatMessage(message);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        
        return messageDiv;
    }

    formatMessage(message) {
        // Convert URLs to links
        message = message.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" style="color: #0077b6;">$1</a>');
        
        // Convert emails to mailto links
        message = message.replace(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, '<a href="mailto:$1" style="color: #0077b6;">$1</a>');
        
        // Convert phone numbers to tel links
        message = message.replace(/(\+?\d{1,3}[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9})/g, '<a href="tel:$1" style="color: #0077b6;">$1</a>');
        
        // Convert line breaks
        message = message.replace(/\n/g, '<br>');
        
        return message;
    }

    showTyping() {
        this.isTyping = true;
        const messagesContainer = document.getElementById('chatbotMessages');
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message bot typing-indicator';
        typingDiv.id = 'typingIndicator';
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = 'CQ';
        
        const typingDots = document.createElement('div');
        typingDots.className = 'typing-dots';
        typingDots.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
        
        typingDiv.appendChild(avatar);
        typingDiv.appendChild(typingDots);
        messagesContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }

    hideTyping() {
        this.isTyping = false;
        const typingIndicator = document.getElementById('typingIndicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    scrollToBottom() {
        const messagesContainer = document.getElementById('chatbotMessages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    handleQuickAction(action) {
        const actionMap = {
            'Our Services': 'Tell me about your services',
            'Technologies': 'What technologies do you use?',
            'Industries': 'Which industries do you serve?',
            'Contact Info': 'How can I contact you?',
            'Get Quote': 'How can I get a quote for my project?'
        };
        
        const message = actionMap[action] || action;
        document.getElementById('messageInput').value = message;
        this.sendMessage();
    }

    generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Greeting responses
        if (this.containsAny(message, ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'])) {
            return "Hello! Welcome to ConQsys. I'm here to help you learn about our embedded systems, software development, and hardware design services. What specific information are you looking for?";
        }
        
        // Services
        if (this.containsAny(message, ['service', 'what do you do', 'offerings', 'solutions'])) {
            return `ConQsys offers three main services:

🔧 **Embedded Systems**: Development of reliable and secure embedded solutions with cutting-edge microcontroller programming and real-time systems.

⚡ **Hardware Design**: Design and prototyping of PCBs and circuits for specialized applications, from concept to production-ready solutions.

💻 **Software Development**: Custom software, tools, and utilities for embedded platforms and automation, including web and mobile applications.

Would you like more details about any specific service?`;
        }
        
        // Embedded Systems
        if (this.containsAny(message, ['embedded', 'microcontroller', 'firmware', 'iot'])) {
            return `Our Embedded Systems expertise includes:

• Microcontroller programming and optimization
• Real-time system development
• IoT device integration
• Secure embedded solutions
• Custom firmware development
• System-on-chip (SoC) design

We work with various platforms and ensure reliable, secure solutions tailored to your industry needs. Would you like to discuss a specific embedded project?`;
        }
        
        // Hardware Design
        if (this.containsAny(message, ['hardware', 'pcb', 'circuit', 'board', 'electronics'])) {
            return `Our Hardware Design services cover:

• PCB design and layout optimization
• Circuit prototyping and testing
• Component selection and sourcing
• Signal integrity analysis
• Power management solutions
• EMC/EMI compliance
• Production-ready designs

We take your concept from initial design through to manufacturing-ready solutions. Do you have a hardware project in mind?`;
        }
        
        // Software Development
        if (this.containsAny(message, ['software', 'web', 'mobile', 'app', 'development', 'programming'])) {
            const techs = this.knowledgeBase.technologies;
            return `Our Software Development expertise spans:

**Web Services**: ${techs['web services'].join(', ')}
**Web Applications**: ${techs['web apps'].join(', ')}
**Mobile Apps**: ${techs['mobile apps'].join(', ')}
**Desktop Applications**: ${techs['desktop apps'].join(', ')}

We create custom software solutions for embedded platforms, automation systems, web applications, and mobile solutions. What type of software project are you considering?`;
        }
        
        // Technologies
        if (this.containsAny(message, ['technology', 'technologies', 'tech stack', 'programming languages', 'frameworks'])) {
            return `ConQsys uses cutting-edge and modern technologies:

**Programming Languages & Frameworks:**
• Web Services: Node.js, ASP.NET Core, Django, Ruby on Rails, Flask
• Frontend: Angular, React.js, Vue.js, Next.js
• Mobile: React Native, Flutter, iOS/Android Native
• Desktop: Electron, .NET Core UWP, Qt, Tauri

We stay updated with the latest technologies to deliver innovative solutions. Which technology area interests you most?`;
        }
        
        // Industries
        if (this.containsAny(message, ['industry', 'industries', 'sectors', 'verticals', 'clients'])) {
            return `ConQsys serves multiple industries with deep expertise:

🛒 **Retail**: Supply chain optimization, virtual stores, sales analysis
🏥 **Healthcare**: HIPAA-compliant solutions, telemedicine, health monitoring
🏠 **Real Estate**: Property management, inventory management systems
🛍️ **E-Commerce**: Scalable solutions, omnichannel experiences, analytics
👥 **Human Resources**: Recruitment systems, workforce management
🚚 **Logistics**: ERP solutions, supply chain automation, BI capabilities

Which industry are you in? I can provide more specific information about our solutions for your sector.`;
        }
        
        // Contact Information
        if (this.containsAny(message, ['contact', 'address', 'phone', 'email', 'location', 'reach', 'get in touch'])) {
            const contact = this.knowledgeBase.contact;
            return `Here's how you can reach ConQsys:

📍 **Address**: ${contact.address}
📧 **Email**: ${contact.email}
📞 **Career Opportunities**: ${contact.career_phone}

You can also fill out the contact form on our website, and our team will get back to you within 24 hours. Are you interested in our services or career opportunities?`;
        }
        
        // Pricing/Quote
        if (this.containsAny(message, ['price', 'cost', 'quote', 'estimate', 'budget', 'pricing'])) {
            return `For accurate pricing and project estimates, I'd recommend:

1. **Free Consultation**: Contact us to discuss your specific requirements
2. **Project Assessment**: We'll analyze your needs and provide a detailed quote
3. **Custom Solutions**: Every project is unique, so pricing varies based on scope

Please fill out our contact form or email us at info@conqsys.com with your project details. Our team will provide a comprehensive quote within 24-48 hours.

What type of project are you planning?`;
        }
        
        // Company Stats
        if (this.containsAny(message, ['stats', 'statistics', 'numbers', 'clients', 'projects', 'experience'])) {
            const stats = this.knowledgeBase.stats;
            return `ConQsys by the numbers:

📊 **${stats.clients} Clients** served across various industries
👥 **${stats.users} Solution Users** benefiting from our applications
🎯 **${stats.retention} Client Retention** rate
🚀 **${stats.projects} Projects Delivered** successfully

Our years of hard work and perpetual zeal to learn have helped us build lasting relationships with clients. We're proud of our track record and continuous growth!`;
        }
        
        // About Company
        if (this.containsAny(message, ['about', 'company', 'conqsys', 'who are you', 'what is conqsys'])) {
            return `**About ConQsys:**

ConQsys is a cutting-edge company focusing on embedded systems, electronics, and software design. We blend innovation and technology to deliver reliable solutions for automotive and defense industries.

**Our Mission**: Empowering Innovation with Embedded Systems & Software Solutions

**Our Approach**: With years of experience and a passionate team, we transform complex challenges into elegant solutions. ConQsys is a result of sheer perseverance and determination.

We work across multiple industries and use cutting-edge technologies to deliver innovative solutions. How can we help with your project?`;
        }
        
        // Career/Jobs
        if (this.containsAny(message, ['career', 'job', 'hiring', 'work', 'employment', 'opportunities', 'join'])) {
            return `**Career Opportunities at ConQsys:**

We're always looking for talented individuals to join our innovative team! 

🚀 **Why ConQsys?**
• Work on cutting-edge embedded systems and software projects
• Opportunity to work across multiple industries
• Collaborative and learning-focused environment
• Growth opportunities in emerging technologies

📞 **Career Inquiries**: +91-9999653260
📧 **Send Resume**: info@conqsys.com

What type of role are you interested in? We work with embedded systems engineers, software developers, hardware designers, and more!`;
        }
        
        // Project Process
        if (this.containsAny(message, ['process', 'how do you work', 'methodology', 'approach', 'steps'])) {
            return `**Our Project Approach:**

1️⃣ **Discovery**: Understanding your requirements and challenges
2️⃣ **Planning**: Detailed project planning and timeline
3️⃣ **Design**: Creating optimal solutions architecture
4️⃣ **Development**: Agile development with regular updates
5️⃣ **Testing**: Comprehensive testing and quality assurance
6️⃣ **Deployment**: Seamless deployment and go-live support
7️⃣ **Support**: Ongoing maintenance and support

We maintain transparent communication throughout the project lifecycle. Would you like to discuss starting a project with us?`;
        }
        
        // Support/Maintenance
        if (this.containsAny(message, ['support', 'maintenance', 'help', 'after deployment', 'post launch'])) {
            return `**Our Support Services:**

🔧 **Technical Support**: Ongoing technical assistance
🛠️ **Maintenance**: Regular updates and maintenance
📊 **Monitoring**: System monitoring and performance optimization
🚀 **Upgrades**: Feature enhancements and technology upgrades
📞 **24/7 Support**: Critical issue resolution
📚 **Documentation**: Comprehensive documentation and training

We believe in long-term partnerships with our clients. Our 96% client retention rate speaks to our commitment to ongoing support!`;
        }
        
        // Quality/Standards
        if (this.containsAny(message, ['quality', 'standards', 'certification', 'compliance', 'testing'])) {
            return `**Quality & Standards at ConQsys:**

✅ **Quality Assurance**: Rigorous testing protocols
🔒 **Security Standards**: Industry-standard security practices
📋 **Compliance**: HIPAA-compliant solutions for healthcare
🎯 **Best Practices**: Following industry best practices
📊 **Performance**: Optimized for performance and scalability
🛡️ **Reliability**: 96% client retention demonstrates our reliability

We ensure all our solutions meet the highest quality standards. What specific compliance requirements do you have?`;
        }
        
        // Timeline/Duration
        if (this.containsAny(message, ['timeline', 'duration', 'how long', 'time', 'delivery', 'when'])) {
            return `**Project Timelines:**

Project duration depends on scope and complexity:

⚡ **Simple Projects**: 2-4 weeks
🔧 **Medium Complexity**: 1-3 months  
🚀 **Large Systems**: 3-6 months
🏗️ **Enterprise Solutions**: 6-12 months

**Fast-Track Options Available**:
• Dedicated team allocation
• Parallel development streams
• Agile methodology for faster delivery

We provide detailed timelines during project planning. What's your target timeline for your project?`;
        }
        
        // Why Choose ConQsys
        if (this.containsAny(message, ['why', 'choose', 'better', 'advantage', 'benefit', 'different'])) {
            return `**Why Choose ConQsys?**

🏆 **Proven Track Record**: 700+ successful projects delivered
👥 **Expert Team**: Years of experience in embedded systems & software
🔧 **Full-Stack Solutions**: Hardware + Software + Support
🌍 **Industry Expertise**: Deep knowledge across 6+ industries
⚡ **Modern Tech Stack**: Cutting-edge technologies and frameworks
🤝 **96% Client Retention**: Long-term partnerships and satisfaction
🚀 **Innovation Focus**: Transforming complex challenges into elegant solutions

We don't just deliver projects - we build lasting partnerships. Ready to start your innovation journey with us?`;
        }
        
        // Thanks/Appreciation
        if (this.containsAny(message, ['thank', 'thanks', 'appreciate', 'helpful', 'great'])) {
            return `You're very welcome! I'm glad I could help. 😊

ConQsys is here to support your innovation journey. Whether you need embedded systems, hardware design, or software development, we're ready to transform your ideas into reality.

Feel free to ask me anything else, or if you're ready to start a project:
• Fill out our contact form
• Email us at info@conqsys.com  
• Call us at +91-9999653260

What else would you like to know about ConQsys?`;
        }
        
        // Goodbye
        if (this.containsAny(message, ['bye', 'goodbye', 'see you', 'talk later', 'thanks bye'])) {
            return `Goodbye! It was great talking with you about ConQsys and our services. 👋

Remember, we're here whenever you need:
• Embedded systems solutions
• Hardware design expertise  
• Software development services

Don't hesitate to reach out when you're ready to start your next innovative project. Have a wonderful day!`;
        }
        
        // Default response with intelligent fallback
        return this.generateIntelligentResponse(message);
    }

    containsAny(text, keywords) {
        return keywords.some(keyword => text.includes(keyword));
    }

    generateIntelligentResponse(message) {
        // Try to identify key topics in the message
        const topics = [];
        
        if (this.containsAny(message, ['embedded', 'microcontroller', 'firmware'])) topics.push('embedded systems');
        if (this.containsAny(message, ['hardware', 'pcb', 'circuit'])) topics.push('hardware design');  
        if (this.containsAny(message, ['software', 'web', 'mobile', 'app'])) topics.push('software development');
        if (this.containsAny(message, ['retail', 'healthcare', 'ecommerce', 'logistics'])) topics.push('industries');
        if (this.containsAny(message, ['node', 'react', 'angular', 'flutter'])) topics.push('technologies');
        
        if (topics.length > 0) {
            return `I understand you're interested in ${topics.join(' and ')}. Let me help you with that!

ConQsys specializes in delivering innovative solutions across these areas. Could you tell me more specifically what you'd like to know? For example:
• Technical capabilities and expertise
• Project examples and case studies  
• How we can help with your specific needs
• Timeline and pricing information

Feel free to ask me anything about ConQsys services!`;
        }
        
        // General fallback response
        return `I'd be happy to help you learn more about ConQsys! 

Here are some topics I can assist with:
🔧 **Services**: Embedded Systems, Hardware Design, Software Development
🏭 **Industries**: Retail, Healthcare, E-commerce, Logistics, and more
💻 **Technologies**: Modern programming languages and frameworks
📞 **Contact**: How to get in touch and start your project
💼 **Company**: About ConQsys, our experience, and achievements

What specific information would you like to know about? Just ask me anything!`;
    }
}

// Initialize chatbot when page loads
function initConQsysChatbot() {
    // Inject styles first
    injectChatbotStyles();
    
    // Initialize chatbot
    new ConQsysChatbot();
}

// Auto-initialize if DOM is already loaded, otherwise wait for it
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initConQsysChatbot);
} else {
    initConQsysChatbot();
}