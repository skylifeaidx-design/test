"use client";

import { useState, useEffect, useCallback } from "react";
import { Restaurant, WinnerRecord } from "@/types";
import Card from "./Card";
import styles from "./GameInterface.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface GameInterfaceProps {
    initialCandidates: Restaurant[];
}

export default function GameInterface({ initialCandidates }: GameInterfaceProps) {
    const router = useRouter();

    // Game State
    const [candidates, setCandidates] = useState<Restaurant[]>(initialCandidates);
    const [nextRoundCandidates, setNextRoundCandidates] = useState<Restaurant[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [round, setRound] = useState(initialCandidates.length); // 32

    // Status
    const [hearts, setHearts] = useState(3);
    const [timer, setTimer] = useState(100); // 100% (5 seconds)
    const [gameState, setGameState] = useState<"PLAYING" | "FINISHED">("PLAYING");
    const [winner, setWinner] = useState<Restaurant | null>(null);

    // Animations
    const [showHeartLoss, setShowHeartLoss] = useState(false);

    const currentPair = [candidates[currentIndex], candidates[currentIndex + 1]];

    const handleWin = useCallback(async (winner: Restaurant) => {
        setGameState("FINISHED");
        setWinner(winner);
        // Save to API
        try {
            await fetch('/api/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: winner.id,
                    restaurantName: winner.name,
                    category: winner.category,
                    timestamp: new Date().toISOString()
                } as WinnerRecord)
            });
        } catch (e) {
            console.error("Failed to save result", e);
        }
        // Delay then redirect or show summary (For MVP, show summary here)
    }, []);

    const nextMatch = useCallback((roundWinner: Restaurant) => {
        // Reset Timer
        setTimer(100);

        const newNextRound = [...nextRoundCandidates, roundWinner];
        setNextRoundCandidates(newNextRound);

        if (currentIndex + 2 >= candidates.length) {
            // Round Finished
            if (newNextRound.length === 1) {
                handleWin(newNextRound[0]);
            } else {
                // Prepare next round
                setCandidates(newNextRound);
                setNextRoundCandidates([]);
                setCurrentIndex(0);
                setRound(newNextRound.length);
            }
        } else {
            setCurrentIndex(currentIndex + 2);
        }
    }, [candidates, currentIndex, nextRoundCandidates, handleWin]);

    // Timer Effect
    useEffect(() => {
        if (gameState !== "PLAYING") return;

        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 0) {
                    // Timeout
                    return 0;
                }
                return prev - 1; // 5 seconds total (100 ticks * 50ms) -> Wait, 5s = 5000ms. 
                // If we subtract 1 per 50ms, need 100 steps.
            });
        }, 50);

        return () => clearInterval(interval);
    }, [gameState, currentIndex, round]); // Reset on match change? No, handled by nextMatch logic resetting timer.

    // Timeout Handler
    useEffect(() => {
        if (timer === 0 && gameState === "PLAYING") {
            if (hearts > 1) {
                setHearts(hearts - 1);
                setShowHeartLoss(true);
                setTimeout(() => setShowHeartLoss(false), 1000);
                setTimer(100); // Reset timer but repeat match? Or force choice?
                // Rules say: "Unselected in limit -> Heart -1".
                // It doesn't explicitly say "Skip turn". Usually means "Try again" or "Penalty".
                // I'll make it reset timer and let them try again.
            } else {
                // Heart 0 -> Auto Select Logic
                setHearts(0);
                // Logic: Pick higher rating
                const c1 = currentPair[0];
                const c2 = currentPair[1];
                const autoWinner = c1.rating >= c2.rating ? c1 : c2;
                nextMatch(autoWinner);
            }
        }
    }, [timer, hearts, gameState, currentPair, nextMatch]);

    if (gameState === "FINISHED" && winner) {
        return (
            <div className={styles.container}>
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={styles.header}
                >
                    <h1>🏆 오늘의 점심 메뉴 🏆</h1>
                    <div style={{ marginTop: 20 }}>
                        <Card restaurant={winner} onClick={() => { }} disabled />
                    </div>
                    <div style={{ display: 'flex', gap: 10, marginTop: 30 }}>
                        <button
                            onClick={() => router.push('/')}
                            style={{ padding: '15px 30px', fontSize: '1.2rem', borderRadius: 10, background: '#2C3E50', color: 'white' }}
                        >
                            다시 하기
                        </button>
                        <button
                            onClick={() => router.push('/dashboard')}
                            style={{ padding: '15px 30px', fontSize: '1.2rem', borderRadius: 10, background: '#4ECDC4', color: 'white' }}
                        >
                            대시보드 확인
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    // Sanity check
    if (!currentPair[0] || !currentPair[1]) return null;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.round}>{round === 2 ? "결승전" : `${round}강`}</div>
                <div className={styles.stats}>
                    <span>❤️ {hearts}</span>
                    <span>{currentIndex / 2 + 1} / {round / 2} Match</span>
                </div>
                <div className={styles.timerBar}>
                    <div className={styles.timerFill} style={{ width: `${timer}%`, background: timer < 30 ? 'red' : '#FF6B6B' }} />
                </div>
            </header>

            <div className={styles.battlefield}>
                <Card key={currentPair[0].id} restaurant={currentPair[0]} onClick={() => nextMatch(currentPair[0])} />
                <div className={styles.vs}>VS</div>
                <Card key={currentPair[1].id} restaurant={currentPair[1]} onClick={() => nextMatch(currentPair[1])} />
            </div>

            <AnimatePresence>
                {showHeartLoss && (
                    <motion.div
                        className={styles.message}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                    >
                        Time Out! ❤️ -1
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
