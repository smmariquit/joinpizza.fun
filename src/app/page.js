"use client";

import { useState } from "react";
import Image from "next/image";
import TypeWriter from "./components/TypeWriter";
import ACTIVITIES from "./data/events.json";

export default function Home() {
  const [slideIndex, setSlideIndex] = useState(-1); // -1 = hero, 0+ = activity
  const [direction, setDirection] = useState("none"); // "left" | "right" | "none"

  const goToActivity = () => {
    if (slideIndex < ACTIVITIES.length - 1) {
      setDirection("left");
      setTimeout(() => {
        setSlideIndex((prev) => prev + 1);
        setDirection("enter-right");
        setTimeout(() => setDirection("none"), 50);
      }, 400);
    } else {
      // Loop back to hero
      setDirection("left");
      setTimeout(() => {
        setSlideIndex(-1);
        setDirection("enter-right");
        setTimeout(() => setDirection("none"), 50);
      }, 400);
    }
  };

  const isHero = slideIndex === -1;
  const activity = !isHero ? ACTIVITIES[slideIndex] : null;

  const slideClass =
    direction === "left"
      ? "slide slide-exit-left"
      : direction === "enter-right"
      ? "slide slide-enter-right"
      : "slide";

  return (
    <div className="viewport-center">
      {/* Pizza icon — always visible, always clickable */}
      <button className="pizza-button" onClick={goToActivity} aria-label="Next slide">
        <Image
          className="hero-pizza"
          src="/pizza_1f355.png"
          alt="🍕"
          width={120}
          height={120}
          priority
        />
        <span className="pizza-hint">tap me ↗</span>
      </button>

      {/* Slide container */}
      <div className="slide-container">
        <div key={slideIndex} className={slideClass}>
          {isHero ? (
            <>
              <div className="hero-title">
                <div className="hero-title-text">
                  <TypeWriter />{" "}
                  <span className="hero-ampersand">&amp;</span>{" "}
                  friends
                </div>
              </div>

              <p className="hero-tagline">
                Unexpectedly a tech community! From dinner meetups to Discord calls, we make cool stuff and try not to take it too seriously.
              </p>

              <div className="cta-row">
                <a className="cta-primary" href="https://discord.gg/TrycsErM4R" target="_blank" rel="noopener noreferrer">
                  Join the table 🍕
                </a>
                <div className="social-icons">
                  <a href="https://instagram.com/pizzaplusfriends" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>
                  </a>
                  <a href="https://facebook.com/pizzaplusfriends" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
                  </a>
                  <a href="https://linkedin.com/company/pizzafriends" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
                  </a>
                </div>
              </div>
            </>
          ) : (
            <div className="activity-slide">
              <div className="activity-image-wrap">
                <Image
                  src={activity.image}
                  alt={activity.title}
                  width={280}
                  height={280}
                  className="activity-image"
                />
              </div>
              <h2 className="activity-title">{activity.title}</h2>
              <span className="activity-date">{activity.date}</span>
              <div className="activity-desc-box">
                <p className="activity-desc">{activity.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Dots indicator */}
      <div className="dots">
        {[...Array(ACTIVITIES.length + 1)].map((_, i) => (
          <span key={i} className={`dot ${i === slideIndex + 1 ? "dot-active" : ""}`} />
        ))}
      </div>

      {/* Contact */}
      <p className="contact-line">
        Questions? Contact <a href="mailto:johnyumul.ph@gmail.com">John</a> or <a href="mailto:semariquit@gmail.com">Simonee</a>
      </p>
    </div>
  );
}
