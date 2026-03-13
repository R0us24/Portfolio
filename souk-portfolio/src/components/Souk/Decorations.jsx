import { useState, useRef, useCallback, useMemo, useEffect } from "react";

// ===== Shared Colors =====
const COLORS = {
  gold: "#D4A017",
  goldBright: "#FFD700",
  amber: "#E8A020",
  sand: "#C4A882",
  sandLight: "#E8D5B7",
  terra: "#C67B4B",
  terraDark: "#A0522D",
  spiceRed: "#C0392B",
  mint: "#1ABC9C",
  purple: "#6C3483",
  charcoal: "#2C3E50",
  night: "#1A1A2E",
  white: "#F5F0E1",
  mosaic: "#1E6091",
  mosaicLight: "#2E86C1",
  brown: "#6B4226",
  brownDark: "#4A2E1A",
  greenDark: "#0E6E3E",
  greenLight: "#27AE60",
  greenBright: "#2ECC71",
  orange: "#E67E22",
};

// ===== Inject shared keyframes =====
const DECO_STYLE_ID = "souk-decoration-styles";

function injectDecoStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(DECO_STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = DECO_STYLE_ID;
  style.textContent = `
    @keyframes souk-lantern-glow {
      0%, 100% {
        box-shadow:
          0 0 8px 2px rgba(255, 215, 0, 0.4),
          0 0 16px 4px rgba(212, 160, 23, 0.2);
        filter: brightness(1);
      }
      50% {
        box-shadow:
          0 0 12px 4px rgba(255, 215, 0, 0.6),
          0 0 24px 8px rgba(212, 160, 23, 0.3);
        filter: brightness(1.1);
      }
    }
    @keyframes souk-lantern-sway {
      0%, 100% { transform: rotate(-2deg); }
      50% { transform: rotate(2deg); }
    }
    @keyframes souk-carpet-fly {
      0% { transform: perspective(200px) rotateX(0deg) translateY(0); }
      15% { transform: perspective(200px) rotateX(-5deg) translateY(-20px); }
      30% { transform: perspective(200px) rotateX(-10deg) translateY(-60px); }
      50% { transform: perspective(200px) rotateX(-5deg) translateY(-80px) translateX(30px); }
      70% { transform: perspective(200px) rotateX(5deg) translateY(-40px) translateX(-20px); }
      85% { transform: perspective(200px) rotateX(3deg) translateY(-15px); }
      100% { transform: perspective(200px) rotateX(0deg) translateY(0); }
    }
    @keyframes souk-smoke-rise {
      0% {
        opacity: 0.6;
        transform: translateY(0) translateX(0) scale(1);
      }
      50% {
        opacity: 0.3;
        transform: translateY(-20px) translateX(4px) scale(1.3);
      }
      100% {
        opacity: 0;
        transform: translateY(-40px) translateX(-2px) scale(0.8);
      }
    }
    @keyframes souk-smoke-rise-alt {
      0% {
        opacity: 0.5;
        transform: translateY(0) translateX(0) scale(0.8);
      }
      40% {
        opacity: 0.35;
        transform: translateY(-15px) translateX(-5px) scale(1.1);
      }
      100% {
        opacity: 0;
        transform: translateY(-35px) translateX(3px) scale(0.6);
      }
    }
    @keyframes souk-palm-sway {
      0%, 100% { transform: rotate(-1deg); }
      50% { transform: rotate(1deg); }
    }
  `;
  document.head.appendChild(style);
}

// ===== Helper: pixel box-shadow builder =====
function pixelsToBoxShadow(grid, colorMap, px) {
  const shadows = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const key = grid[y][x];
      if (key && colorMap[key]) {
        shadows.push(`${x * px}px ${y * px}px 0 0 ${colorMap[key]}`);
      }
    }
  }
  return shadows.join(", ");
}

// =============================================================
// LANTERN
// =============================================================
const LANTERN_PIXELS = [
  [null, "chain", null],
  [null, "chain", null],
  ["cap", "cap", "cap"],
  ["glass", "glow", "glass"],
  ["glass", "glow", "glass"],
  ["glass", "glow", "glass"],
  ["base", "base", "base"],
];

const LANTERN_COLORS = {
  chain: COLORS.charcoal,
  cap: COLORS.gold,
  glass: COLORS.amber,
  glow: COLORS.goldBright,
  base: COLORS.gold,
};

export function Lantern({ style: externalStyle = {}, pixelSize = 4 }) {
  injectDecoStyles();

  const boxShadow = useMemo(
    () => pixelsToBoxShadow(LANTERN_PIXELS, LANTERN_COLORS, pixelSize),
    [pixelSize]
  );

  const width = 3 * pixelSize;
  const height = LANTERN_PIXELS.length * pixelSize;

  return (
    <div
      role="img"
      aria-label="Hanging lantern decoration"
      style={{
        position: "relative",
        display: "inline-block",
        width: `${width}px`,
        height: `${height}px`,
        animation: "souk-lantern-sway 4s ease-in-out infinite",
        transformOrigin: "top center",
        ...externalStyle,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${pixelSize}px`,
          height: `${pixelSize}px`,
          boxShadow,
          imageRendering: "pixelated",
          animation: "souk-lantern-glow 3s ease-in-out infinite",
          borderRadius: "1px",
        }}
        aria-hidden="true"
      />
    </div>
  );
}

// =============================================================
// CARPET
// =============================================================
const CARPET_VARIANTS = {
  1: {
    primary: COLORS.spiceRed,
    secondary: COLORS.gold,
    accent: COLORS.mosaic,
    border: COLORS.terraDark,
  },
  2: {
    primary: COLORS.mosaic,
    secondary: COLORS.sandLight,
    accent: COLORS.gold,
    border: COLORS.charcoal,
  },
  3: {
    primary: COLORS.purple,
    secondary: COLORS.goldBright,
    accent: COLORS.mint,
    border: COLORS.terraDark,
  }
};

export function Carpet({
  variant = 1,
  style: externalStyle = {},
  onSecretClick,
  width = 120,
  height = 60,
}) {
  injectDecoStyles();

  const clickCountRef = useRef(0);
  const clickTimerRef = useRef(null);
  const [isFlying, setIsFlying] = useState(false);

  const colors = CARPET_VARIANTS[variant] || CARPET_VARIANTS[1];

  const handleClick = useCallback(() => {
    clickCountRef.current += 1;

    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      setIsFlying(true);

      if (onSecretClick) onSecretClick();

      setTimeout(() => setIsFlying(false), 3000);
    } else {
      clickTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 600);
    }
  }, [onSecretClick]);

  const fringeSize = 6;

  return (
    <div
      role="img"
      aria-label="Decorative carpet"
      onClick={handleClick}
      style={{
        position: "relative",
        display: "inline-block",
        width: `${width}px`,
        height: `${height}px`,
        cursor: "pointer",
        animation: isFlying ? "souk-carpet-fly 3s ease-in-out" : undefined,
        ...externalStyle,
      }}
    >
      {/* Carpet body - simple 2D pixel style */}
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: colors.primary,
          border: `4px solid ${colors.border}`,
          boxSizing: "border-box",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          imageRendering: "pixelated",
        }}
        aria-hidden="true"
      >
        {/* Simple inner border */}
        <div
          style={{
            width: "80%",
            height: "60%",
            border: `4px dashed ${colors.secondary}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Center pixel block */}
          <div
            style={{
              width: "16px",
              height: "16px",
              backgroundColor: colors.accent,
            }}
          />
        </div>
      </div>
      {/* Fringe at the bottom */}
      <div
        style={{
          position: "absolute",
          left: "4px",
          right: "4px",
          bottom: `-${fringeSize}px`,
          display: "flex",
          justifyContent: "space-between",
        }}
        aria-hidden="true"
      >
        {Array.from({ length: Math.floor((width - 8) / 8) }).map((_, i) => (
          <div
            key={i}
            style={{
              width: "4px",
              height: `${fringeSize}px`,
              backgroundColor: i % 2 === 0 ? colors.secondary : colors.primary,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// =============================================================
// SPICE POTS
// =============================================================
const POT_COLORS = [
  { bowl: COLORS.terra, spice: COLORS.spiceRed, label: "Red spice" },
  { bowl: COLORS.terraDark, spice: COLORS.goldBright, label: "Gold spice" },
  { bowl: COLORS.brown, spice: COLORS.greenBright, label: "Green spice" },
  { bowl: COLORS.terra, spice: COLORS.orange, label: "Orange spice" },
];

function SpiceBowl({ bowl, spice, label, pixelSize = 3 }) {
  const bowlPixels = [
    [null, "spice", "spice", "spice", null],
    ["bowl", "spice", "spice", "spice", "bowl"],
    ["bowl", "bowl", "bowl", "bowl", "bowl"],
    [null, "bowl", "bowl", "bowl", null],
  ];

  const colorMap = { bowl, spice };
  const boxShadow = pixelsToBoxShadow(bowlPixels, colorMap, pixelSize);

  return (
    <div
      role="img"
      aria-label={label}
      style={{
        position: "relative",
        display: "inline-block",
        width: `${5 * pixelSize}px`,
        height: `${4 * pixelSize}px`,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${pixelSize}px`,
          height: `${pixelSize}px`,
          boxShadow,
          imageRendering: "pixelated",
        }}
        aria-hidden="true"
      />
    </div>
  );
}

export function SpicePots({ style: externalStyle = {}, pixelSize = 3 }) {
  injectDecoStyles();

  return (
    <div
      role="img"
      aria-label="Row of colorful spice pots"
      style={{
        display: "inline-flex",
        alignItems: "flex-end",
        gap: `${pixelSize * 2}px`,
        ...externalStyle,
      }}
    >
      {POT_COLORS.map((pot, i) => (
        <SpiceBowl
          key={i}
          bowl={pot.bowl}
          spice={pot.spice}
          label={pot.label}
          pixelSize={pixelSize}
        />
      ))}
    </div>
  );
}

// =============================================================
// ARCH
// =============================================================
export function Arch({
  children,
  style: externalStyle = {},
  width = 180,
  height = 220,
}) {
  injectDecoStyles();

  const borderWidth = 8;
  const archRadius = width / 2;

  return (
    <div
      role="img"
      aria-label="Decorative arch doorway"
      style={{
        position: "relative",
        display: "inline-block",
        width: `${width}px`,
        height: `${height}px`,
        ...externalStyle,
      }}
    >
      {/* Outer arch frame */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderLeft: `${borderWidth}px solid ${COLORS.terra}`,
          borderRight: `${borderWidth}px solid ${COLORS.terra}`,
          borderBottom: `${borderWidth}px solid ${COLORS.terra}`,
          borderTop: "none",
          boxSizing: "border-box",
        }}
        aria-hidden="true"
      />

      {/* Arch top (horseshoe shape) */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${width}px`,
          height: `${archRadius}px`,
          borderRadius: `${archRadius}px ${archRadius}px 0 0`,
          border: `${borderWidth}px solid ${COLORS.terra}`,
          borderBottom: "none",
          boxSizing: "border-box",
          background: `linear-gradient(180deg, ${COLORS.terraDark} 0%, transparent 100%)`,
          opacity: 0.3,
        }}
        aria-hidden="true"
      />

      {/* Decorative keystone at top center */}
      <div
        style={{
          position: "absolute",
          top: `${borderWidth - 2}px`,
          left: "50%",
          transform: "translateX(-50%)",
          width: `${borderWidth * 3}px`,
          height: `${borderWidth * 2}px`,
          backgroundColor: COLORS.gold,
          clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
        }}
        aria-hidden="true"
      />

      {/* Inner sand-colored bands */}
      <div
        style={{
          position: "absolute",
          top: `${borderWidth}px`,
          left: `${borderWidth}px`,
          width: `${width - borderWidth * 2}px`,
          height: `${archRadius - borderWidth}px`,
          borderRadius: `${archRadius - borderWidth}px ${archRadius - borderWidth}px 0 0`,
          border: `3px solid ${COLORS.sand}`,
          borderBottom: "none",
          boxSizing: "border-box",
        }}
        aria-hidden="true"
      />

      {/* Side pillars texture */}
      {[0, 1].map((side) => (
        <div
          key={side}
          style={{
            position: "absolute",
            top: `${archRadius}px`,
            [side === 0 ? "left" : "right"]: 0,
            width: `${borderWidth}px`,
            height: `${height - archRadius - borderWidth}px`,
            background: `repeating-linear-gradient(
              180deg,
              ${COLORS.terra} 0px,
              ${COLORS.terra} 6px,
              ${COLORS.terraDark} 6px,
              ${COLORS.terraDark} 8px
            )`,
          }}
          aria-hidden="true"
        />
      ))}

      {/* Content area */}
      {children && (
        <div
          style={{
            position: "absolute",
            top: `${archRadius * 0.6}px`,
            left: `${borderWidth + 4}px`,
            right: `${borderWidth + 4}px`,
            bottom: `${borderWidth + 4}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}

// =============================================================
// SMOKE
// =============================================================
export function Smoke({
  style: externalStyle = {},
  particleCount = 5,
  color = "rgba(200, 200, 200, 0.5)",
}) {
  injectDecoStyles();

  const particles = useMemo(
    () =>
      Array.from({ length: particleCount }).map((_, i) => ({
        id: i,
        left: `${(i / particleCount) * 100}%`,
        delay: `${i * 0.6}s`,
        duration: `${2 + (i % 3) * 0.5}s`,
        size: 3 + (i % 3) * 2,
        animation:
          i % 2 === 0 ? "souk-smoke-rise" : "souk-smoke-rise-alt",
      })),
    [particleCount]
  );

  return (
    <div
      role="img"
      aria-label="Incense smoke"
      style={{
        position: "relative",
        display: "inline-block",
        width: "30px",
        height: "40px",
        ...externalStyle,
      }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            bottom: 0,
            left: p.left,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: color,
            borderRadius: "50%",
            animation: `${p.animation} ${p.duration} ease-out infinite`,
            animationDelay: p.delay,
            pointerEvents: "none",
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

// =============================================================
// CLOUD (Improved Minecraft 2D style with variants)
// =============================================================
const CLOUD_VARIANTS = [
  // Variant 0: Wide fluffy cloud
  [
    [null, null, 'hi', 'hi', 'hi', 'hi', null, null, null, null, null],
    [null, 'hi', 'hi', 'hi', 'hi', 'hi', 'hi', null, 'hi', 'hi', null],
    ['hi', 'mid', 'mid', 'mid', 'mid', 'mid', 'hi', 'hi', 'hi', 'hi', 'hi'],
    ['mid', 'mid', 'lo', 'lo', 'mid', 'mid', 'mid', 'mid', 'mid', 'mid', 'mid'],
    [null, 'mid', 'lo', 'lo', 'lo', 'mid', 'mid', 'mid', 'mid', 'mid', null],
    [null, null, null, 'lo', 'lo', 'lo', 'lo', 'lo', null, null, null],
  ],
  // Variant 1: Compact puff
  [
    [null, 'hi', 'hi', 'hi', 'hi', null, null],
    ['hi', 'hi', 'hi', 'hi', 'hi', 'hi', null],
    ['hi', 'mid', 'mid', 'mid', 'hi', 'hi', 'hi'],
    ['mid', 'mid', 'lo', 'mid', 'mid', 'mid', 'mid'],
    [null, 'lo', 'lo', 'lo', 'lo', 'lo', null],
  ],
  // Variant 2: Long flat cloud
  [
    [null, 'hi', 'hi', 'hi', null, null, 'hi', 'hi', null],
    ['hi', 'hi', 'mid', 'hi', 'hi', 'hi', 'hi', 'hi', 'hi'],
    ['mid', 'mid', 'lo', 'mid', 'mid', 'mid', 'mid', 'mid', 'mid'],
    [null, 'lo', 'lo', 'lo', 'lo', 'lo', 'lo', 'lo', null],
  ],
];

export function Cloud({ style: externalStyle = {}, pixelSize = 8, opacity = 0.8, variant = 0 }) {
  const CLOUD_COLORS = {
    hi: '#FFFFFF',
    mid: '#F0F0F0',
    lo: '#E0E0E8',
  };

  const pixels = CLOUD_VARIANTS[variant % CLOUD_VARIANTS.length];

  const boxShadow = useMemo(
    () => pixelsToBoxShadow(pixels, CLOUD_COLORS, pixelSize),
    [pixelSize, variant]
  );

  return (
    <div
      style={{
        position: "absolute",
        width: `${pixelSize}px`,
        height: `${pixelSize}px`,
        boxShadow,
        opacity,
        imageRendering: "pixelated",
        transition: "transform 0.4s ease, opacity 0.3s ease",
        ...externalStyle,
      }}
    />
  );
}

// =============================================================
// CAMEL
// =============================================================
export function Camel({ style: externalStyle = {}, pixelSize = 3, color = "#C67B4B" }) {
  const CAMEL_PIXELS = [
    [null, null, null, null, null, null, null, null, null, 'c', 'c', 'c'],
    [null, null, null, null, null, null, null, null, 'c', 'c', 'eye', 'c'],
    [null, null, 'bag', 'bag', null, 'bag', 'bag', null, 'c', 'c', 'c', 'c'],
    [null, 'c', 'bag', 'c', 'bag', 'c', 'c', 'c', 'c', 'c', null, null],
    ['c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', null, null, null],
    ['c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', 'c', null, null, null],
    [null, 'c', null, 'c', null, null, 'c', null, 'c', null, null, null],
    [null, 'c', null, 'c', null, null, 'c', null, 'c', null, null, null],
  ];
  
  const CAMEL_COLORS = { c: color, eye: '#1A1A2E', bag: '#8E44AD' };
  
  const boxShadow = useMemo(
    () => pixelsToBoxShadow(CAMEL_PIXELS, CAMEL_COLORS, pixelSize),
    [pixelSize, color]
  );

  const width = 12 * pixelSize;
  const height = 8 * pixelSize;

  return (
    <div
      style={{
        position: "relative",
        width: `${width}px`,
        height: `${height}px`,
        ...externalStyle,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${pixelSize}px`,
          height: `${pixelSize}px`,
          boxShadow,
          imageRendering: "pixelated",
        }}
      />
    </div>
  );
}

// =============================================================
// PALM TREE
// =============================================================
const PALM_TRUNK_PIXELS = [
  [null, "trunk", "trunk", null],
  [null, "trunkD", "trunk", null],
  [null, "trunk", "trunkD", null],
  [null, "trunkD", "trunk", null],
  [null, "trunk", "trunkD", null],
  [null, "trunkD", "trunk", null],
  [null, "trunk", "trunk", null],
  [null, "trunk", "trunk", null],
];

const PALM_LEAVES_PIXELS = [
  [null, null, null, "leafD", "leafL", null, null, null, null, null],
  ["leafD", "leafL", "leafD", "leafL", "leafL", "leafD", null, null, null, null],
  [null, "leafL", "leafD", "leafL", "leafL", "leafL", "leafD", "leafL", null, null],
  [null, null, "leafL", "leafL", "leafB", "leafL", "leafL", "leafL", "leafD", null],
  [null, null, null, "leafD", "leafB", "leafD", "leafL", null, "leafL", "leafD"],
  [null, null, "leafD", "leafL", "leafB", "leafL", "leafD", null, null, null],
  [null, "leafL", "leafL", "leafL", "leafL", "leafL", "leafL", "leafD", null, null],
  ["leafD", "leafL", null, null, "leafD", "leafL", "leafL", "leafL", "leafD", null],
  [null, null, null, null, null, "leafD", "leafL", null, null, "leafD"],
];

const PALM_TRUNK_COLORS = {
  trunk: COLORS.brown,
  trunkD: COLORS.brownDark,
};

const PALM_LEAF_COLORS = {
  leafL: COLORS.greenLight,
  leafD: COLORS.greenDark,
  leafB: COLORS.greenBright,
};

export function Palmtree({ style: externalStyle = {}, pixelSize = 3 }) {
  injectDecoStyles();

  const trunkShadow = useMemo(
    () => pixelsToBoxShadow(PALM_TRUNK_PIXELS, PALM_TRUNK_COLORS, pixelSize),
    [pixelSize]
  );

  const leavesShadow = useMemo(
    () => pixelsToBoxShadow(PALM_LEAVES_PIXELS, PALM_LEAF_COLORS, pixelSize),
    [pixelSize]
  );

  const trunkWidth = 4 * pixelSize;
  const trunkHeight = PALM_TRUNK_PIXELS.length * pixelSize;
  const leavesWidth = 10 * pixelSize;
  const leavesHeight = PALM_LEAVES_PIXELS.length * pixelSize;

  return (
    <div
      role="img"
      aria-label="Palm tree"
      style={{
        position: "relative",
        display: "inline-block",
        width: `${leavesWidth}px`,
        height: `${leavesHeight + trunkHeight}px`,
        ...externalStyle,
      }}
    >
      {/* Leaves */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${pixelSize}px`,
          height: `${pixelSize}px`,
          boxShadow: leavesShadow,
          imageRendering: "pixelated",
          animation: "souk-palm-sway 5s ease-in-out infinite",
          transformOrigin: "center bottom",
        }}
        aria-hidden="true"
      />
      {/* Trunk */}
      <div
        style={{
          position: "absolute",
          top: `${leavesHeight - pixelSize}px`,
          left: `${(leavesWidth - trunkWidth) / 2}px`,
          width: `${pixelSize}px`,
          height: `${pixelSize}px`,
          boxShadow: trunkShadow,
          imageRendering: "pixelated",
        }}
        aria-hidden="true"
      />
    </div>
  );
}
