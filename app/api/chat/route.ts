import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message, userId } = await req.json();

    // Point this to your VPS backend endpoint (e.g., Genie or EternalGuard engine)
    const backendResponse = await fetch('https://your-vps-backend.com/api/message', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.INTERNAL_AGENT_KEY}` 
      },
      body: JSON.stringify({ 
        text: message, 
        user_id: userId,
        platform: 'web_vault' 
      }),
    });

    if (!backendResponse.ok) {
      throw new Error('Backend unreachable');
    }

    const data = await backendResponse.json();
    
    // Returns the AI Agent's response back to the LiveChat component
    return NextResponse.json({ reply: data.reply });
    
  } catch (error) {
    console.error('Chat Bridge Error:', error);
    return NextResponse.json(
      { reply: "I'm having trouble connecting to the secure server. Please try again or reach out on WhatsApp." }, 
      { status: 500 }
    );
  }
}