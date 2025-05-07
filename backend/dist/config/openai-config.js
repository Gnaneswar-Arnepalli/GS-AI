import axios from 'axios';
export const configureOpenAI = () => {
    return {
        async createChatCompletion(options) {
            try {
                const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
                    model: options.model || "openai/gpt-3.5-turbo",
                    messages: options.messages,
                }, {
                    headers: {
                        'Authorization': `Bearer ${process.env.OPEN_AI_SECRET}`,
                        'HTTP-Referer': 'http://localhost:5173',
                        'X-Title': 'My Chat App',
                        'Content-Type': 'application/json'
                    }
                });
                return { data: response.data };
            }
            catch (error) {
                console.error("OpenRouter API Error:", error.response?.data || error.message);
                throw error;
            }
        }
    };
};
//# sourceMappingURL=openai-config.js.map