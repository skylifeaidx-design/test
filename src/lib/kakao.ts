const KAKAO_API_KEY = process.env.KAKAO_API_KEY;

export interface ImageSearchResult {
    documents: {
        thumbnail_url: string;
        image_url: string;
        display_sitename: string;
        doc_url: string;
    }[];
}

export async function searchRestaurantImage(query: string): Promise<string | null> {
    if (!KAKAO_API_KEY) {
        console.warn("KAKAO_API_KEY is not set");
        return null;
    }

    try {
        // Add timeout to prevent hanging requests
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

        const res = await fetch(`https://dapi.kakao.com/v2/search/image?query=${encodeURIComponent(query)}&sort=accuracy&page=1&size=1`, {
            headers: {
                Authorization: `KakaoAK ${KAKAO_API_KEY}`,
            },
            signal: controller.signal,
            next: { revalidate: 3600 } // Cache for 1 hour
        });

        clearTimeout(timeoutId);

        if (!res.ok) throw new Error(`Kakao API Error: ${res.status}`);

        const data = await res.json() as ImageSearchResult;
        return data.documents[0]?.image_url || null;
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            console.warn("Image search timed out for:", query);
        } else {
            console.error("Failed to fetch image:", error);
        }
        return null;
    }
}
