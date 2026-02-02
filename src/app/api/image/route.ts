import { NextResponse } from 'next/server';
import { searchRestaurantImage } from '@/lib/kakao';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
        return NextResponse.json({ error: 'Query required' }, { status: 400 });
    }

    const imageUrl = await searchRestaurantImage(query); // e.g., "상암동 [식당이름]"

    return NextResponse.json({ imageUrl });
}
