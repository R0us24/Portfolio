import { useMemo } from "react";

// ===== Color Palette =====
const COLORS = {
  transparent: "transparent",
  // Skin
  skin: "#E8C99B",
  skinShadow: "#D4A76A",
  // Merchant
  turbanWhite: "#F5F0E1",
  turbanGold: "#D4A017",
  robeTerra: "#C67B4B",
  robeShadow: "#A0522D",
  robeSand: "#C4A882",
  counter: "#8B6914",
  counterDark: "#6B4F10",
  // Cat
  catOrange: "#E07B3A",
  catDark: "#B85C2A",
  catLight: "#F0A060",
  catNose: "#FF9999",
  catEye: "#2C3E50",
  // Spice vendor
  spiceRed: "#C0392B",
  spiceGold: "#FFD700",
  spiceGreen: "#1ABC9C",
  spiceCloth: "#6C3483",
  // Visitor
  visitorBlue: "#1E6091",
  visitorLight: "#2E86C1",
  visitorBag: "#A0522D",
  charcoal: "#2C3E50",
  night: "#1A1A2E",
  // Shared
  black: "#1A1A2E",
  white: "#F5F0E1",
  eye: "#1A1A2E",
};

// ===== Pixel Data (each row is an array of color keys) =====
// Grid is roughly 8 wide x 12 tall for humanoids, 8x8 for cat

const MERCHANT_PIXELS = [
  // Row 0: turban top
  [null, null, "turbanGold", "turbanWhite", "turbanWhite", "turbanGold", null, null],
  // Row 1: turban middle
  [null, "turbanWhite", "turbanGold", "turbanWhite", "turbanWhite", "turbanGold", "turbanWhite", null],
  // Row 2: face top
  [null, "skin", "skin", "skin", "skin", "skin", "skin", null],
  // Row 3: face with eyes
  [null, "skin", "eye", "skin", "skin", "eye", "skin", null],
  // Row 4: face bottom (smile)
  [null, null, "skin", "skinShadow", "skinShadow", "skin", null, null],
  // Row 5: neck/robe top
  [null, null, "robeTerra", "robeTerra", "robeTerra", "robeTerra", null, null],
  // Row 6: robe body
  [null, "robeTerra", "robeSand", "robeTerra", "robeTerra", "robeSand", "robeTerra", null],
  // Row 7: robe body
  [null, "robeTerra", "robeSand", "robeTerra", "robeTerra", "robeSand", "robeTerra", null],
  // Row 8: robe bottom / arms
  ["skin", "robeTerra", "robeTerra", "robeShadow", "robeShadow", "robeTerra", "robeTerra", "skin"],
  // Row 9: counter top
  ["counter", "counter", "counter", "counter", "counter", "counter", "counter", "counter"],
  // Row 10: counter body
  ["counterDark", "counter", "counterDark", "counter", "counter", "counterDark", "counter", "counterDark"],
  // Row 11: counter bottom
  ["counterDark", "counterDark", "counterDark", "counterDark", "counterDark", "counterDark", "counterDark", "counterDark"],
];

const CAT_PIXELS = [
  // Row 0: ears
  [null, "catOrange", null, null, null, null, "catOrange", null],
  // Row 1: ear + head
  ["catOrange", "catLight", "catOrange", "catOrange", "catOrange", "catOrange", "catLight", "catOrange"],
  // Row 2: head with eyes
  ["catOrange", "catOrange", "catEye", "catOrange", "catOrange", "catEye", "catOrange", "catOrange"],
  // Row 3: nose
  [null, "catOrange", "catOrange", "catNose", "catNose", "catOrange", "catOrange", null],
  // Row 4: body top
  [null, "catOrange", "catLight", "catLight", "catLight", "catLight", "catOrange", null],
  // Row 5: body mid
  [null, null, "catOrange", "catLight", "catLight", "catOrange", null, null],
  // Row 6: paws
  [null, "catDark", "catOrange", "catOrange", "catOrange", "catOrange", "catDark", null],
  // Row 7: tail (separate element handles animation)
  [null, null, null, null, null, null, null, "catDark"],
];

const SPICE_VENDOR_PIXELS = [
  // Row 0: headwrap top
  [null, null, "spiceRed", "spiceRed", "spiceRed", "spiceRed", null, null],
  // Row 1: headwrap
  [null, "spiceRed", "spiceGold", "spiceRed", "spiceRed", "spiceGold", "spiceRed", null],
  // Row 2: face
  [null, "skin", "skin", "skin", "skin", "skin", "skin", null],
  // Row 3: face eyes
  [null, "skin", "eye", "skin", "skin", "eye", "skin", null],
  // Row 4: face bottom
  [null, null, "skin", "skin", "skin", "skin", null, null],
  // Row 5: body top
  [null, "spiceCloth", "spiceCloth", "spiceGold", "spiceGold", "spiceCloth", "spiceCloth", null],
  // Row 6: body + holding item
  [null, "spiceCloth", "spiceGreen", "spiceCloth", "spiceCloth", "spiceGreen", "spiceCloth", null],
  // Row 7: body
  ["skin", "spiceCloth", "spiceCloth", "spiceCloth", "spiceCloth", "spiceCloth", "spiceCloth", "skin"],
  // Row 8: held item (bowl)
  ["spiceRed", "spiceGold", "spiceRed", null, null, null, null, null],
  // Row 9: legs
  [null, null, "spiceCloth", "spiceCloth", null, "spiceCloth", "spiceCloth", null],
  // Row 10: feet
  [null, null, "spiceRed", null, null, null, "spiceRed", null],
];

const VISITOR_PIXELS = [
  // Row 0: hat/hair
  [null, null, "charcoal", "charcoal", "charcoal", "charcoal", null, null],
  // Row 1: hair
  [null, "charcoal", "charcoal", "charcoal", "charcoal", "charcoal", "charcoal", null],
  // Row 2: face
  [null, "skin", "skin", "skin", "skin", "skin", "skin", null],
  // Row 3: face eyes
  [null, "skin", "eye", "skin", "skin", "eye", "skin", null],
  // Row 4: face bottom
  [null, null, "skin", "skinShadow", "skinShadow", "skin", null, null],
  // Row 5: shirt top
  [null, "visitorBlue", "visitorLight", "visitorBlue", "visitorBlue", "visitorLight", "visitorBlue", null],
  // Row 6: shirt body
  [null, "visitorBlue", "visitorBlue", "visitorBlue", "visitorBlue", "visitorBlue", "visitorBlue", null],
  // Row 7: shirt + bag strap
  ["skin", "visitorBlue", "visitorBlue", "visitorBlue", "visitorBlue", "visitorBlue", "visitorBag", "visitorBag"],
  // Row 8: legs + bag
  [null, null, "charcoal", "charcoal", null, "charcoal", "visitorBag", "visitorBag"],
  // Row 9: legs
  [null, null, "charcoal", null, null, null, "charcoal", null],
  // Row 10: feet
  [null, null, "visitorBlue", null, null, null, "visitorBlue", null],
];

const CHARACTER_DATA = {
  merchant: MERCHANT_PIXELS,
  cat: CAT_PIXELS,
  spiceVendor: SPICE_VENDOR_PIXELS,
  visitor: VISITOR_PIXELS,
};

/**
 * Convert pixel grid to box-shadow string
 */
function pixelsToBoxShadow(grid, pixelSize) {
  const shadows = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const colorKey = grid[y][x];
      if (colorKey && COLORS[colorKey]) {
        const xPos = x * pixelSize;
        const yPos = y * pixelSize;
        shadows.push(`${xPos}px ${yPos}px 0 0 ${COLORS[colorKey]}`);
      }
    }
  }
  return shadows.join(", ");
}

// ===== CSS Keyframes (injected once) =====
const STYLE_ID = "souk-character-styles";

function injectStyles() {
  if (typeof document === "undefined") return;
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    @keyframes souk-char-idle {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-2px); }
    }
    @keyframes souk-char-wave {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(-15deg); }
      75% { transform: rotate(15deg); }
    }
    @keyframes souk-char-sleep {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.02, 0.98); }
    }
    @keyframes souk-char-zzz {
      0% { opacity: 0; transform: translate(0, 0) scale(0.5); }
      50% { opacity: 1; transform: translate(4px, -10px) scale(1); }
      100% { opacity: 0; transform: translate(8px, -20px) scale(0.7); }
    }
    @keyframes souk-char-zzz-delay {
      0% { opacity: 0; transform: translate(0, 0) scale(0.5); }
      50% { opacity: 1; transform: translate(6px, -14px) scale(0.9); }
      100% { opacity: 0; transform: translate(12px, -24px) scale(0.6); }
    }
    @keyframes souk-cat-tail {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(20deg); }
      75% { transform: rotate(-20deg); }
    }
    @keyframes souk-char-walk {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(2px) translateY(-1px); }
      75% { transform: translateX(-2px) translateY(-1px); }
    }
  `;
  document.head.appendChild(style);
}

// ===== Wave Hand Overlay =====
function WaveHand({ pixelSize, type }) {
  const handColor = COLORS.skin;
  const xOffset = type === "cat" ? 0 : 7;
  const yOffset = type === "merchant" ? 8 : type === "cat" ? 5 : 7;

  return (
    <div
      style={{
        position: "absolute",
        left: `${xOffset * pixelSize}px`,
        top: `${yOffset * pixelSize}px`,
        width: `${pixelSize}px`,
        height: `${pixelSize}px`,
        backgroundColor: type === "cat" ? COLORS.catOrange : handColor,
        animation: "souk-char-wave 0.6s ease-in-out infinite",
        transformOrigin: "center bottom",
        imageRendering: "pixelated",
      }}
      aria-hidden="true"
    />
  );
}

// ===== Cat Tail =====
function CatTail({ pixelSize }) {
  return (
    <div
      style={{
        position: "absolute",
        right: 0,
        bottom: `${pixelSize}px`,
        width: `${pixelSize}px`,
        height: `${pixelSize * 3}px`,
        backgroundColor: COLORS.catDark,
        animation: "souk-cat-tail 1s ease-in-out infinite",
        transformOrigin: "bottom center",
        borderRadius: `${pixelSize}px ${pixelSize}px 0 0`,
        imageRendering: "pixelated",
      }}
      aria-hidden="true"
    />
  );
}

// ===== Zzz Overlay =====
function SleepZzz({ pixelSize }) {
  const baseStyle = {
    position: "absolute",
    right: `-${pixelSize * 2}px`,
    fontFamily: '"Press Start 2P", monospace',
    color: COLORS.white,
    pointerEvents: "none",
    imageRendering: "auto",
  };

  return (
    <>
      <span
        style={{
          ...baseStyle,
          top: `-${pixelSize}px`,
          fontSize: `${Math.max(pixelSize * 2, 8)}px`,
          animation: "souk-char-zzz 2s ease-in-out infinite",
        }}
        aria-hidden="true"
      >
        Z
      </span>
      <span
        style={{
          ...baseStyle,
          top: `-${pixelSize * 3}px`,
          fontSize: `${Math.max(pixelSize * 1.5, 6)}px`,
          animation: "souk-char-zzz-delay 2s ease-in-out infinite 0.7s",
        }}
        aria-hidden="true"
      >
        z
      </span>
      <span
        style={{
          ...baseStyle,
          top: `-${pixelSize * 4.5}px`,
          fontSize: `${Math.max(pixelSize, 5)}px`,
          animation: "souk-char-zzz 2s ease-in-out infinite 1.3s",
        }}
        aria-hidden="true"
      >
        z
      </span>
    </>
  );
}

// ===== Main Character Component =====
export default function Character({
  type = "merchant",
  animation = "idle",
  style: externalStyle = {},
  pixelSize = 3,
}) {
  injectStyles();

  const grid = CHARACTER_DATA[type] || CHARACTER_DATA.merchant;

  const boxShadow = useMemo(
    () => pixelsToBoxShadow(grid, pixelSize),
    [grid, pixelSize]
  );

  const gridWidth = (grid[0]?.length || 8) * pixelSize;
  const gridHeight = grid.length * pixelSize;

  const animationMap = {
    idle: "souk-char-idle 2s ease-in-out infinite",
    wave: type === "visitor" ? "souk-char-walk 0.8s ease-in-out infinite" : undefined,
    sleep: "souk-char-sleep 3s ease-in-out infinite",
  };

  const containerAnimation = animationMap[animation] || animationMap.idle;

  const characterNames = {
    merchant: "Merchant character",
    cat: "Cat character",
    spiceVendor: "Spice vendor character",
    visitor: "Visitor character",
  };

  return (
    <div
      role="img"
      aria-label={`${characterNames[type] || "Character"}, ${animation} animation`}
      style={{
        position: "relative",
        display: "inline-block",
        width: `${gridWidth}px`,
        height: `${gridHeight}px`,
        animation: containerAnimation,
        ...externalStyle,
      }}
    >
      {/* Pixel art body rendered via box-shadow */}
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

      {/* Cat tail with wag animation */}
      {type === "cat" && <CatTail pixelSize={pixelSize} />}

      {/* Wave animation overlay (extra animated hand) */}
      {animation === "wave" && type !== "visitor" && (
        <WaveHand pixelSize={pixelSize} type={type} />
      )}

      {/* Sleep Zzz particles */}
      {animation === "sleep" && <SleepZzz pixelSize={pixelSize} />}
    </div>
  );
}
