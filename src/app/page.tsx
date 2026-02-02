import Link from "next/link";

export default function Home() {
    return (
        <main style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            textAlign: 'center',
            background: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)'
        }}>
            <h1 style={{
                fontSize: '4rem',
                color: '#fff',
                marginBottom: '2rem',
                textShadow: '0 4px 10px rgba(0,0,0,0.2)'
            }}>
                🍚 상암 점심 월드컵 🍜
            </h1>
            <p style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.9)', marginBottom: '3rem' }}>
                오늘 점심은 어디서 먹을까요?<br />
                32강 토너먼트로 결정해보세요!
            </p>

            <Link href="/game" style={{
                padding: '20px 50px',
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: '#FF6B6B',
                background: 'white',
                borderRadius: '50px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                transition: 'transform 0.2s',
            }}>
                게임 시작하기 🚀
            </Link>

            <div style={{ marginTop: '2rem' }}>
                <Link href="/dashboard" style={{ color: 'white', textDecoration: 'underline' }}>
                    대시보드 보기
                </Link>
            </div>
        </main>
    );
}
