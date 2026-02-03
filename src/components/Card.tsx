"use client";

import { useState, useEffect } from "react";
import { Restaurant } from "@/types";
import styles from "./Card.module.css";
import { motion } from "framer-motion";

interface CardProps {
    restaurant: Restaurant;
    onClick: () => void;
    disabled?: boolean;
}

export default function Card({ restaurant, onClick, disabled }: CardProps) {
    const [imageSrc, setImageSrc] = useState(restaurant.imageUrl);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Reset image immediately when restaurant changes
        setImageSrc(restaurant.imageUrl);

        let isMounted = true;
        (async () => {
            try {
                // Fetch only if it's a placeholder
                if (restaurant.imageUrl.includes('placehold.co')) {
                    setIsLoading(true);
                    // Add '상암' prefix for better accuracy
                    const res = await fetch(`/api/image?query=${encodeURIComponent('상암 ' + restaurant.name)}`);
                    if (res.ok) {
                        const data = await res.json();
                        if (data.imageUrl && isMounted) {
                            setImageSrc(data.imageUrl);
                        }
                    }
                    if (isMounted) setIsLoading(false);
                }
            } catch (e) {
                console.error("Image fetch failed", e);
                if (isMounted) setIsLoading(false);
            }
        })();
        return () => { isMounted = false; };
    }, [restaurant.name, restaurant.imageUrl]);

    return (
        <motion.div
            className={styles.card}
            onClick={!disabled ? onClick : undefined}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
        >
            <img
                src={imageSrc}
                alt={restaurant.name}
                className={styles.imageRequest}
                onError={() => setImageSrc(restaurant.imageUrl)}
            />
            <div className={styles.content}>
                <div>
                    <div className={styles.category}>{restaurant.category}</div>
                    <h3 className={styles.name}>{restaurant.name}</h3>
                    <div className={styles.address}>{restaurant.address}</div>
                </div>

                <div className={styles.details}>
                    <span className={styles.rating}>★ {restaurant.rating}</span>
                    <span style={{ fontSize: '0.8rem', color: '#666' }}>({restaurant.reviewCount} reviews)</span>
                </div>
            </div>
        </motion.div>
    );
}
