// app/api/chat/genAI/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: NextRequest) {
    const { message } = await req.json();

    // Mocked AI model response (replace with actual API integration)
    const response = `You asked: "${message}". Here’s an AI-generated response.`;

    return NextResponse.json({ response });
}
