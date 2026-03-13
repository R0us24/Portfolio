import { forwardRef } from "react";

const variantStyles = {
  primary: {
    bg: "#C67B4B",
    bgHover: "#A0522D",
    border: "#A0522D",
    shadow: "#7A3B1E",
    text: "#E8D5B7",
  },
  secondary: {
    bg: "#1E6091",
    bgHover: "#17507A",
    border: "#17507A",
    shadow: "#0E3450",
    text: "#E8D5B7",
  },
  gold: {
    bg: "#D4A017",
    bgHover: "#B8890F",
    border: "#B8890F",
    shadow: "#8A650A",
    text: "#1A1A2E",
  },
};

const PixelButton = forwardRef(function PixelButton(
  {
    children,
    onClick,
    variant = "primary",
    className = "",
    disabled = false,
    href,
    ...rest
  },
  ref
) {
  const colors = variantStyles[variant] || variantStyles.primary;

  const baseStyle = {
    fontFamily: '"Press Start 2P", monospace',
    fontSize: "0.625rem",
    lineHeight: "1.6",
    padding: "12px 24px",
    color: colors.text,
    backgroundColor: colors.bg,
    border: `4px solid ${colors.border}`,
    boxShadow: `
      4px 4px 0 0 ${colors.shadow},
      8px 8px 0 0 rgba(0, 0, 0, 0.2)
    `,
    transform: "translate(-4px, -4px)",
    transition: "transform 0.1s ease, box-shadow 0.1s ease, background-color 0.1s ease",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    display: "inline-block",
    textDecoration: "none",
    imageRendering: "pixelated",
    userSelect: "none",
    textAlign: "center",
    whiteSpace: "nowrap",
  };

  const handleMouseEnter = (e) => {
    if (disabled) return;
    e.currentTarget.style.transform = "translate(0px, 0px)";
    e.currentTarget.style.boxShadow = `
      0px 0px 0 0 ${colors.shadow},
      2px 2px 0 0 rgba(0, 0, 0, 0.2)
    `;
    e.currentTarget.style.backgroundColor = colors.bgHover;
  };

  const handleMouseLeave = (e) => {
    if (disabled) return;
    e.currentTarget.style.transform = "translate(-4px, -4px)";
    e.currentTarget.style.boxShadow = `
      4px 4px 0 0 ${colors.shadow},
      8px 8px 0 0 rgba(0, 0, 0, 0.2)
    `;
    e.currentTarget.style.backgroundColor = colors.bg;
  };

  const handleMouseDown = (e) => {
    if (disabled) return;
    e.currentTarget.style.transform = "translate(2px, 2px)";
    e.currentTarget.style.boxShadow = "none";
  };

  const handleMouseUp = (e) => {
    if (disabled) return;
    e.currentTarget.style.transform = "translate(0px, 0px)";
    e.currentTarget.style.boxShadow = `
      0px 0px 0 0 ${colors.shadow},
      2px 2px 0 0 rgba(0, 0, 0, 0.2)
    `;
  };

  const eventHandlers = {
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseDown: handleMouseDown,
    onMouseUp: handleMouseUp,
  };

  if (href && !disabled) {
    return (
      <a
        ref={ref}
        href={href}
        style={baseStyle}
        className={className}
        {...eventHandlers}
        {...rest}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={disabled ? undefined : onClick}
      style={baseStyle}
      className={className}
      disabled={disabled}
      aria-disabled={disabled}
      {...eventHandlers}
      {...rest}
    >
      {children}
    </button>
  );
});

export default PixelButton;
