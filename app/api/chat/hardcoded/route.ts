// app/api/chat/hardcoded/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const { message } = await req.json();
    let response;

    if (message.toLowerCase().includes('hello')) {
        response = "Hello! How can I assist you today?";
    } else {
        response = "Sorry, I didn't understand that. Can you please clarify?";
    }

    return NextResponse.json({ response });
}
