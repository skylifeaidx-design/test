import { getGameHistory } from "@/lib/storage";
import { WinnerRecord } from "@/types";
import Link from "next/link";
import { useMemo } from "react";

// Server Component
export default async function DashboardPage() {
    const history = await getGameHistory();

    // Calculate Stats
    const topWinners = history.reduce((acc, curr) => {
        acc[curr.restaurantName] = (acc[curr.restaurantName] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const sortedWinners = Object.entries(topWinners)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10);

    const categoryDist = history.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const totalGames = history.length;

    return (
        <main style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                <h1>📊 대시보드</h1>
                <Link href="/" style={{ padding: '10px 20px', background: '#eee', borderRadius: '8px' }}>Home</Link>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>

                {/* Top 10 Winners */}
                <div className="glass-panel" style={{ padding: '20px', background: 'white', borderRadius: '16px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                    <h2>🏆 최다 우승 맛집 TOP 10</h2>
                    <ul style={{ marginTop: '20px', listStyle: 'none' }}>
                        {sortedWinners.map(([name, count], idx) => (
                            <li key={name} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' }}>
                                <span>{idx + 1}. {name}</span>
                                <span style={{ fontWeight: 'bold', color: '#FF6B6B' }}>{count}회</span>
                            </li>
                        ))}
                        {sortedWinners.length === 0 && <p style={{ color: '#999' }}>데이터가 없습니다.</p>}
                    </ul>
                </div>

                {/* Category Stats */}
                <div className="glass-panel" style={{ padding: '20px', background: 'white', borderRadius: '16px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                    <h2>🍕 카테고리 선호도</h2>
                    <div style={{ marginTop: '20px' }}>
                        {Object.entries(categoryDist).map(([cat, count]) => (
                            <div key={cat} style={{ marginBottom: '15px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                                    <span>{cat}</span>
                                    <span>{Math.round((count / totalGames) * 100)}%</span>
                                </div>
                                <div style={{ width: '100%', height: '8px', background: '#eee', borderRadius: '4px' }}>
                                    <div style={{ width: `${(count / totalGames) * 100}%`, height: '100%', background: '#4ECDC4', borderRadius: '4px' }} />
                                </div>
                            </div>
                        ))}
                        {history.length === 0 && <p style={{ color: '#999' }}>데이터가 없습니다.</p>}
                    </div>
                </div>

                {/* Recent History */}
                <div className="glass-panel" style={{ padding: '20px', background: 'white', borderRadius: '16px', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                    <h2>🕒 최근 우승 기록 (7일)</h2>
                    <ul style={{ marginTop: '20px', listStyle: 'none' }}>
                        {history.slice(-10).reverse().map((record, i) => (
                            <li key={i} style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>
                                <div style={{ fontWeight: 'bold' }}>{record.restaurantName}</div>
                                <div style={{ fontSize: '0.8rem', color: '#888' }}>
                                    {new Date(record.timestamp).toLocaleDateString()} {new Date(record.timestamp).toLocaleTimeString()}
                                </div>
                            </li>
                        ))}
                        {history.length === 0 && <p style={{ color: '#999' }}>데이터가 없습니다.</p>}
                    </ul>
                </div>

            </div>
        </main>
    );
}
