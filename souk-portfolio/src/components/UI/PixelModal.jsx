import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const variantConfig = {
  parchment: {
    bg: "#E8D5B7",
    bgInner: "#F5ECD7",
    text: "#2C3E50",
    borderOuter: "#A0522D",
    borderInner: "#C67B4B",
    headerBg: "#C67B4B",
    headerText: "#E8D5B7",
    closeBg: "#A0522D",
    closeHover: "#7A3B1E",
    closeText: "#E8D5B7",
  },
  wood: {
    bg: "#8B5E3C",
    bgInner: "#A0693D",
    text: "#E8D5B7",
    borderOuter: "#5C3A1E",
    borderInner: "#6E4528",
    headerBg: "#5C3A1E",
    headerText: "#D4A017",
    closeBg: "#3E2712",
    closeHover: "#2A1A0D",
    closeText: "#E8D5B7",
  },
  night: {
    bg: "#1A1A2E",
    bgInner: "#222240",
    text: "#E8D5B7",
    borderOuter: "#1E6091",
    borderInner: "#2E86C1",
    headerBg: "#1E6091",
    headerText: "#FFD700",
    closeBg: "#C0392B",
    closeHover: "#962D22",
    closeText: "#E8D5B7",
  },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.6 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 400, damping: 25 },
  },
  exit: {
    opacity: 0,
    scale: 0.6,
    transition: { duration: 0.15 },
  },
};

export default function PixelModal({
  isOpen,
  onClose,
  title = "",
  children,
  variant = "parchment",
}) {
  const colors = variantConfig[variant] || variantConfig.parchment;
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Escape key handler
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      // Focus trap
      if (e.key === "Tab" && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstEl = focusableElements[0];
        const lastEl = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            e.preventDefault();
            lastEl?.focus();
          }
        } else {
          if (document.activeElement === lastEl) {
            e.preventDefault();
            firstEl?.focus();
          }
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";

      // Focus the modal after animation
      const timer = setTimeout(() => {
        const closeBtn = modalRef.current?.querySelector(
          "[data-modal-close]"
        );
        closeBtn?.focus();
      }, 100);

      return () => {
        clearTimeout(timer);
        document.removeEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "";
      };
    } else {
      // Restore focus
      previousFocusRef.current?.focus();
    }
  }, [isOpen, handleKeyDown]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Ornate pixel border style (double border effect)
  const outerBorderStyle = {
    border: `4px solid ${colors.borderOuter}`,
    boxShadow: `
      inset 0 0 0 2px ${colors.borderInner},
      6px 6px 0 0 rgba(0, 0, 0, 0.4),
      inset 0 0 0 6px ${colors.bg}
    `,
    backgroundColor: colors.bgInner,
    color: colors.text,
    imageRendering: "pixelated",
    maxWidth: "640px",
    width: "90vw",
    maxHeight: "85vh",
    display: "flex",
    flexDirection: "column",
  };

  const headerStyle = {
    backgroundColor: colors.headerBg,
    color: colors.headerText,
    fontFamily: '"Press Start 2P", monospace',
    fontSize: "0.7rem",
    padding: "12px 16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: `4px solid ${colors.borderOuter}`,
    flexShrink: 0,
  };

  const closeButtonStyle = {
    fontFamily: '"Press Start 2P", monospace',
    fontSize: "0.65rem",
    color: colors.closeText,
    backgroundColor: colors.closeBg,
    border: `2px solid ${colors.closeText}`,
    padding: "4px 8px",
    cursor: "pointer",
    lineHeight: 1,
    transition: "background-color 0.1s ease",
  };

  const contentStyle = {
    padding: "20px",
    overflowY: "auto",
    flex: 1,
    fontFamily: '"VT323", monospace',
    fontSize: "1.125rem",
    lineHeight: "1.5",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="pixel-modal-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.2 }}
          onClick={handleBackdropClick}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          }}
        >
          <motion.div
            ref={modalRef}
            key="pixel-modal-content"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label={title || "Modal dialog"}
            style={outerBorderStyle}
          >
            {/* Header */}
            <div style={headerStyle}>
              <span
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  marginRight: "12px",
                }}
              >
                {title}
              </span>
              <button
                data-modal-close
                onClick={onClose}
                style={closeButtonStyle}
                aria-label="Close modal"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.closeHover;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.closeBg;
                }}
              >
                X
              </button>
            </div>

            {/* Scrollable content */}
            <div style={contentStyle}>{children}</div>

            {/* Bottom ornamental border bar */}
            <div
              style={{
                height: "8px",
                backgroundColor: colors.headerBg,
                borderTop: `2px solid ${colors.borderInner}`,
                flexShrink: 0,
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
