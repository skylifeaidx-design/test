"use client";

import { Restaurant } from "@/types";
import styles from "./Card.module.css";
import { motion } from "framer-motion";

interface CardProps {
    restaurant: Restaurant;
    onClick: () => void;
    disabled?: boolean;
}

export default function Card({ restaurant, onClick, disabled }: CardProps) {
    return (
        <motion.div
            className={styles.card}
            onClick={!disabled ? onClick : undefined}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
        >
            <img src={restaurant.imageUrl} alt={restaurant.name} className={styles.imageRequest} />
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
