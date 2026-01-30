import { NextResponse } from 'next/server';
import { saveGameResult } from '@/lib/storage';
import { WinnerRecord } from '@/types';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        await saveGameResult(body as WinnerRecord);
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}
