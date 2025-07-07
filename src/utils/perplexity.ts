import axios from 'axios';

const PERPLEXITY_API_URL = 'https://api.perplexity.ai/chat/completions';
const PERPLEXITY_API_KEY = process.env.PERPLEXITY_API_KEY;

export async function generate(prompt: string): Promise<string> {
    const response = await axios.post(
        PERPLEXITY_API_URL,
        {
            model: "sonar",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
            max_tokens: 350
        },
        {
            headers: {
                "Authorization": `Bearer ${PERPLEXITY_API_KEY}`,
                "Content-Type": "application/json",
            },
        }
    )
    return response.data.choices[0].message.content.trim();
}