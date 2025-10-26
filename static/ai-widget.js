/**
 * AI Assistant Widget with vLLM
 * Automatically initializes in the placeholder
 */

(function() {
    'use strict';
    
    let messages = [];
    const MAX_MESSAGES = 6;
    
    // Detect placeholder
    function findPlaceholder() {
        // Try to find placeholder by ID
        let placeholder = document.getElementById('ai-assistant');
        
        if (!placeholder) {
            // Search by class
            placeholder = document.querySelector('.ai-assistant, .ai, .assistant');
        }
        
        if (!placeholder) {
            // Search by comment
            const comments = Array.from(document.createTreeWalker(
                document.body,
                NodeFilter.SHOW_COMMENT,
                null,
                false
            ));
            
            for (const comment of comments) {
                if (comment.textContent.toLowerCase().includes('ai') || 
                    comment.textContent.toLowerCase().includes('assistant')) {
                    placeholder = comment.nextElementSibling;
                    break;
                }
            }
        }
        
        return placeholder;
    }
    
    // Create widget UI
    function createWidget() {
        const widget = document.createElement('div');
        widget.id = 'ai-widget';
        widget.innerHTML = `
            <style>
                #ai-widget {
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(248, 250, 252, 0.9));
                    border: 2px solid rgba(59, 130, 246, 0.3);
                    border-radius: 20px;
                    padding: 1.5rem;
                    max-width: 800px;
                    margin: 2rem auto;
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
                }
                
                #ai-widget-header {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }
                
                #ai-widget-header h3 {
                    margin: 0;
                    color: #3b82f6;
                    font-size: 1.5rem;
                }
                
                #ai-widget-messages {
                    max-height: 400px;
                    overflow-y: auto;
                    margin-bottom: 1rem;
                    padding: 1rem;
                    background: rgba(255, 255, 255, 0.5);
                    border-radius: 10px;
                }
                
                .ai-message {
                    margin-bottom: 1rem;
                    padding: 0.75rem;
                    background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(29, 78, 216, 0.05));
                    border-left: 3px solid #3b82f6;
                    border-radius: 8px;
                }
                
                .user-message {
                    margin-bottom: 1rem;
                    padding: 0.75rem;
                    background: rgba(226, 232, 240, 0.5);
                    border-left: 3px solid #cbd5e1;
                    border-radius: 8px;
                }
                
                .message-label {
                    font-weight: 600;
                    margin-bottom: 0.25rem;
                    font-size: 0.85rem;
                    opacity: 0.7;
                }
                
                .message-text {
                    line-height: 1.5;
                }
                
                #ai-widget-input-container {
                    display: flex;
                    gap: 0.5rem;
                }
                
                #ai-widget-input {
                    flex: 1;
                    padding: 0.75rem;
                    border: 2px solid rgba(226, 232, 240, 0.5);
                    border-radius: 10px;
                    font-size: 1rem;
                }
                
                #ai-widget-input:focus {
                    outline: none;
                    border-color: #3b82f6;
                    box-shadow: 0 0 10px rgba(59, 130, 246, 0.2);
                }
                
                #ai-widget-send {
                    padding: 0.75rem 1.5rem;
                    background: linear-gradient(45deg, #3b82f6, #1d4ed8);
                    color: white;
                    border: none;
                    border-radius: 10px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.3s ease;
                }
                
                #ai-widget-send:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 5px 15px rgba(59, 130, 246, 0.4);
                }
                
                #ai-widget-send:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                }
                
                .loading {
                    display: inline-block;
                    width: 16px;
                    height: 16px;
                    border: 3px solid rgba(255, 255, 255, 0.3);
                    border-radius: 50%;
                    border-top-color: white;
                    animation: spin 1s linear infinite;
                }
                
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                
                .empty-state {
                    text-align: center;
                    padding: 2rem;
                    color: #64748b;
                    opacity: 0.7;
                }
            </style>
            
            <div id="ai-widget-header">
                <span>🤖</span>
                <h3>AI Assistant (Gemini)</h3>
            </div>
            
            <div id="ai-widget-messages"></div>
            
            <div id="ai-widget-input-container">
                <input 
                    type="text" 
                    id="ai-widget-input" 
                    placeholder="Describe your city concern..."
                    maxlength="1024"
                />
                <button id="ai-widget-send">Send</button>
            </div>
        `;
        
        return widget;
    }
    
    // Add message to history
    function addMessage(role, text) {
        messages.push({ role, text, timestamp: Date.now() });
        
        // Keep only the last N messages
        if (messages.length > MAX_MESSAGES) {
            messages.shift();
        }
        
        updateMessagesUI();
    }
    
    // Update messages UI
    function updateMessagesUI() {
        const container = document.getElementById('ai-widget-messages');
        
        if (messages.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    Type a message to start the conversation
                </div>
            `;
            return;
        }
        
        container.innerHTML = messages.map(msg => `
            <div class="${msg.role}-message">
                <div class="message-label">${msg.role === 'user' ? '👤 You' : '🤖 Assistant'}</div>
                <div class="message-text">${msg.text}</div>
            </div>
        `).join('');
        
        // Scroll to end
        container.scrollTop = container.scrollHeight;
    }
    
    // Send message to server
    async function sendMessage() {
        const input = document.getElementById('ai-widget-input');
        const button = document.getElementById('ai-widget-send');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Add user message
        addMessage('user', message);
        input.value = '';
        
        // Disable button and show loading
        button.disabled = true;
        button.innerHTML = '<span class="loading"></span>';
        
        try {
            const response = await fetch('/api/ai', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ input: message })
            });
            
            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            addMessage('assistant', data.reply);
            
        } catch (error) {
            console.error('Error sending message:', error);
            addMessage('assistant', `❌ Error: ${error.message}`);
        } finally {
            // Re-enable button
            button.disabled = false;
            button.innerHTML = 'Send';
        }
    }
    
    // Initialize widget
    function init() {
        const placeholder = findPlaceholder();
        
        if (!placeholder) {
            // Create placeholder in body if it doesn't exist
            const newPlaceholder = document.createElement('div');
            newPlaceholder.id = 'ai-assistant';
            document.body.appendChild(newPlaceholder);
            initWidgetInElement(newPlaceholder);
        } else {
            initWidgetInElement(placeholder);
        }
    }
    
    function initWidgetInElement(element) {
        const widget = createWidget();
        element.appendChild(widget);
        
        // Configure events
        const sendBtn = document.getElementById('ai-widget-send');
        const input = document.getElementById('ai-widget-input');
        
        sendBtn.addEventListener('click', sendMessage);
        
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
        
        // Initialize UI
        updateMessagesUI();
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();

