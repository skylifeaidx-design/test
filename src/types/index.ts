export interface Restaurant {
    id: string;
    name: string;
    category: string;
    address: string;
    rating: number;
    reviewCount: number;
    imageUrl: string; // URL or local path
    link?: string;
}

export interface Match {
    round: number; // 32, 16, 8, 4, 2, 1 (Final)
    candidates: [Restaurant, Restaurant];
}

export interface GameState {
    currentRoundCandidates: Restaurant[];
    nextRoundCandidates: Restaurant[];
    currentMatchIndex: number;
    hearts: number;
    history: string[]; // IDs of winners
}

export interface WinnerRecord {
    id: string;
    restaurantName: string;
    category: string;
    timestamp: string;
}
