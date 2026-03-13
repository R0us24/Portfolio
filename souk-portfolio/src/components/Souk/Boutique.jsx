import { useState, useCallback } from "react";
import { motion } from "framer-motion";

// ===== Main Boutique Component =====
export default function Boutique({
  name = "Shop",
  description = "",
  color = "#C67B4B",
  image = "",
  onClick,
  isHighlighted = false,
  ariaLabel,
  index = 0,
}) {
  const [isHovered, setIsHovered] = useState(false);

  const handleKeyDown = useCallback(
    (e) => {
      if ((e.key === "Enter" || e.key === " ") && onClick) {
        e.preventDefault();
        onClick(e);
      }
    },
    [onClick]
  );

  return (
    <motion.div
      role="button"
      tabIndex={0}
      aria-label={ariaLabel || `${name} shop`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.12,
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      style={{
        position: "relative",
        display: "inline-block",
        cursor: onClick ? "pointer" : "default",
        userSelect: "none",
        outline: "none",
        lineHeight: 0,
        overflow: "hidden",
      }}
    >
      {/* The shop image - fills everything */}
      <img
        src={image}
        alt={name}
        draggable="false"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
          imageRendering: "pixelated",
        }}
      />

      {/* Hover overlay — slides up from bottom, text only */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: isHovered ? "0%" : "100%" }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "10px 12px",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: "0.45rem",
            lineHeight: "1.6",
            color: "#FFD700",
            textAlign: "center",
            textShadow: "1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000",
            marginBottom: "4px",
          }}
        >
          {name}
        </div>
        {description && (
          <div
            style={{
              fontFamily: '"VT323", monospace',
              fontSize: "1.1rem",
              lineHeight: "1.3",
              color: "#FFD700",
              textAlign: "center",
              textShadow: "1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000",
            }}
          >
            {description}
          </div>
        )}
      </motion.div>

      {/* Highlighted indicator */}
      {isHighlighted && (
        <div
          style={{
            position: "absolute",
            bottom: "-4px",
            left: "20%",
            right: "20%",
            height: "3px",
            backgroundColor: "#FFD700",
            boxShadow: "0 0 6px #FFD700",
          }}
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
}
