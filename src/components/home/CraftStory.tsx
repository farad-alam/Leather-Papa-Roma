"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./CraftStory.module.css";

const PANELS = [
  {
    id: "material",
    title: "The Material",
    text: "Full-grain leather is the finest, most durable cut from the hide. Unlike corrected or bonded leather, it retains the natural surface — complete with its unique markings and grain. As you use it, it develops a rich patina that makes each piece uniquely yours.",
    image: "/craft-texture.png",
    stat: { value: "100%", label: "Full-Grain Leather" }
  },
  {
    id: "craft",
    title: "The Craft",
    text: "Every Papa Roma product is meticulously crafted. We believe the things you carry every day should earn character, not show wear. Edges are hand-burnished and stitched for strength that outlasts machine alternatives.",
    image: "/products/belt.png", // Using existing images as placeholders for craft shots
    stat: { value: "Hand", label: "Finished" }
  },
  {
    id: "time",
    title: "The Time",
    text: "True craftsmanship cannot be rushed. From the initial cut to the final quality check, each piece is given the time it deserves to ensure it lasts a lifetime.",
    image: "/products/diary.png",
    stat: { value: "10+", label: "Years of Craft" }
  }
];

export default function CraftStory() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className={`section ${styles.section}`} aria-labelledby="craft-heading">
      <div className={`container ${styles.inner}`}>
        
        {/* Left Col: Sticky Image Panel */}
        <div className={styles.imageCol}>
          <div className={styles.stickyWrap}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className={styles.imageWrap}
              >
                <Image
                  src={PANELS[activeIdx].image}
                  alt={PANELS[activeIdx].title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.img}
                />
                <div className={styles.imageOverlay} />
              </motion.div>
            </AnimatePresence>
            
            {/* Floating stat card updates dynamically */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`stat-${activeIdx}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={styles.statCard}
              >
                <span className={styles.statCardValue}>{PANELS[activeIdx].stat.value}</span>
                <span className={styles.statCardLabel}>{PANELS[activeIdx].stat.label}</span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Col: Scrollable Narrative */}
        <div className={styles.textCol}>
          <span className="label-caps">Our Process</span>
          <hr className="divider-gold" style={{ margin: "1rem 0 3rem 0" }} />
          
          <div className={styles.panelsWrap}>
            {PANELS.map((panel, idx) => (
              <motion.div
                key={panel.id}
                className={styles.panel}
                initial={{ opacity: 0.2 }}
                whileInView={{ opacity: 1 }}
                viewport={{ margin: "-45% 0px -45% 0px" }} // Trigger when near middle of screen
                onViewportEnter={() => setActiveIdx(idx)}
                transition={{ duration: 0.5 }}
              >
                <h2 className={styles.title}>
                  <em>{panel.title}</em>
                </h2>
                <p className={styles.body}>{panel.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
