import { useState, useEffect, useCallback, useRef } from "react";

export default function DialogBox({
  text = "",
  speaker = "",
  onComplete,
  speed = 30,
  avatarSrc = "/images/Qasantini head.png",
}) {
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [showBlink, setShowBlink] = useState(true);
  const [visible, setVisible] = useState(false);
  const intervalRef = useRef(null);
  const textRef = useRef(text);

  // Slide-in from bottom on mount
  useEffect(() => {
    const frame = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  // Reset when text changes
  useEffect(() => {
    textRef.current = text;
    setDisplayedLength(0);
    setIsComplete(false);
  }, [text]);

  // Typewriter effect
  useEffect(() => {
    if (isComplete) return;

    intervalRef.current = setInterval(() => {
      setDisplayedLength((prev) => {
        if (prev >= textRef.current.length) {
          clearInterval(intervalRef.current);
          setIsComplete(true);
          return prev;
        }
        return prev + 1;
      });
    }, speed);

    return () => clearInterval(intervalRef.current);
  }, [speed, isComplete, text]);

  // Notify parent when complete
  useEffect(() => {
    if (isComplete && onComplete) {
      onComplete();
    }
  }, [isComplete, onComplete]);

  // Blinking cursor / arrow
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setShowBlink((prev) => !prev);
    }, 500);
    return () => clearInterval(blinkInterval);
  }, []);

  // Click to skip
  const handleClick = useCallback(() => {
    if (!isComplete) {
      clearInterval(intervalRef.current);
      setDisplayedLength(text.length);
      setIsComplete(true);
    }
  }, [isComplete, text.length]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "24px",
        left: "50%",
        transform: visible
          ? "translateX(-50%) translateY(0)"
          : "translateX(-50%) translateY(80px)",
        opacity: visible ? 1 : 0,
        transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.3s ease-out",
        width: "min(92vw, 720px)",
        zIndex: 900,
        imageRendering: "pixelated",
        cursor: "pointer",
        userSelect: "none",
      }}
      onClick={handleClick}
      role="status"
      aria-live="polite"
    >
      {/* Speaker name label - positioned above the box */}
      {speaker && (
        <div
          style={{
            position: "absolute",
            top: "-18px",
            left: "16px",
            fontFamily: '"Press Start 2P", monospace',
            fontSize: "0.55rem",
            color: "#4A2E18",
            backgroundColor: "#F5E6D3",
            border: "3px solid #C4A882",
            boxShadow: "inset 0 0 0 1px #D4B896",
            padding: "5px 10px",
            lineHeight: 1,
            zIndex: 2,
          }}
        >
          {speaker}
        </div>
      )}

      {/* Main dialog box -- light beige parchment style */}
      <div
        style={{
          backgroundColor: "#F5E6D3",
          border: "4px solid #C4A882",
          boxShadow:
            "inset 0 0 0 2px #D4B896, 6px 6px 0 0 rgba(0, 0, 0, 0.3)",
          padding: "14px 16px",
          position: "relative",
          minHeight: "88px",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          gap: "14px",
        }}
      >
        {/* Character portrait -- no frame, bigger */}
        <div
          style={{
            flexShrink: 0,
            width: "110px",
            height: "110px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <img
            src={avatarSrc}
            alt={speaker || "Speaker"}
            draggable="false"
            style={{
              width: "110px",
              height: "110px",
              objectFit: "contain",
              imageRendering: "pixelated",
              userSelect: "none",
              WebkitUserDrag: "none",
            }}
          />
        </div>

        {/* Text area */}
        <div
          style={{
            flex: 1,
            minHeight: "60px",
            position: "relative",
            paddingBottom: "10px",
          }}
        >
          <div
            style={{
              fontFamily: '"VT323", monospace',
              fontSize: "1.25rem",
              lineHeight: 1.5,
              color: "#3E2723",
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              marginTop: speaker ? "4px" : "0",
            }}
          >
            {text.slice(0, displayedLength)}

            {/* Blinking underscore cursor while typing */}
            {!isComplete && (
              <span
                style={{
                  color: "#4A2E18",
                  opacity: showBlink ? 0.9 : 0,
                  transition: "opacity 0.08s",
                }}
              >
                _
              </span>
            )}
          </div>

          {/* Blinking golden triangle when complete */}
          {isComplete && (
            <div
              style={{
                position: "absolute",
                bottom: "0",
                right: "0",
                fontFamily: '"Press Start 2P", monospace',
                fontSize: "0.55rem",
                color: "#C67B4B",
                opacity: showBlink ? 1 : 0,
                transition: "opacity 0.1s",
                pointerEvents: "none",
              }}
            >
              &#9660;
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
