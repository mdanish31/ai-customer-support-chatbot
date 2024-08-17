// app/api/chat/groq/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
    const { message } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    try {
        const response = await axios.post(
            'https://api.groq.com/openai/v1/chat/completions',
            {
                messages: [
                    {
                        role: 'user',
                        content: message,
                    },
                ],
                model: 'llama3-8b-8192', // Specify the model you want to use
            },
            {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const chatResponse = response.data.choices[0].message.content;

        return NextResponse.json({ response: chatResponse });
    } catch (error) {
        console.error('Error connecting to Groq API:', error);
        return NextResponse.json({ response: "Sorry, something went wrong. Please try again later." });
    }
}
