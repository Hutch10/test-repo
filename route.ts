import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { getDb } from '@/lib/db';

export async function POST(req: Request) {
    try {
        if (!process.env.GOOGLE_GENAI_API_KEY) {
            return NextResponse.json({ error: 'Gemini API Key is not configured.' }, { status: 500 });
        }

        const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_GENAI_API_KEY });
        const body = await req.json();
        const { goal } = body;

        if (!goal) {
            return NextResponse.json({ error: 'Goal is required' }, { status: 400 });
        }

        const prompt = `
    You are an AI autonomous business strategy generator.
    The user wants to achieve this goal: "${goal}"

    Provide a concise, symbiotic growth plan detailing active steps.
    You MUST structure your response strictly into two distinct sections:
    1. 'Mycelial (Foundational Automation)'
    2. 'Ecological (Visible Growth)'
    
    In your response, cite principles from 'Mycology to Your Ecology'.
    Keep the whole response tightly formatted and under 200 words.
    `;

        const response = await ai.models.generateContent({
            model: 'gemini-1.5-flash',
            contents: prompt
        });

        const strategyText = response.text || '';

        try {
            const db = await getDb();
            await db.run('INSERT INTO blueprints (goal, strategy) VALUES (?, ?)', [goal, strategyText]);
        } catch (dbError) {
            console.error('Failed to save to database:', dbError);
        }

        return NextResponse.json({ text: strategyText });

    } catch (error: any) {
        console.error('Error generating strategy:', error);
        return NextResponse.json({ error: error.message || 'An error occurred' }, { status: 500 });
    }
}
