// src/utils/animations.js
export const animations = {
  slideDown: `
    @keyframes slideDown {
      0% {
        transform: translateY(-100%);
      }
      100% {
        transform: translateY(0);
      }
    }
  `,
  textGlow: `
    @keyframes textGlow {
      0%,
      100% {
        text-shadow: 0 0 10px rgba(255, 255, 255, 0.5),
                     0 0 20px rgba(255, 255, 255, 0.4),
                     0 0 30px rgba(255, 255, 255, 0.3),
                     0 0 40px rgba(255, 255, 255, 0.2);
      }
      50% {
        text-shadow: 0 0 20px rgba(255, 255, 255, 0.7),
                     0 0 40px rgba(255, 255, 255, 0.6),
                     0 0 60px rgba(255, 255, 255, 0.5),
                     0 0 80px rgba(255, 255, 255, 0.4);
      }
    }
  `,
  pulse: `
    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.1);
      }
    }
  `,
  rotate: `
    @keyframes rotate {
      0% {
        transform: rotateY(0deg);
      }
      100% {
        transform: rotateY(360deg);
      }
    }
  `,
  fadeInOut: `
    @keyframes fadeInOut {
      0%, 100% {
        opacity: 1;
      }
      50% {
        opacity: 0.5;
      }
    }
  `,
  slideIn: `
    @keyframes slideIn {
      from {
        transform: translateX(-100%);
      }
      to {
        transform: translateX(0);
      }
    }
  `,
  zoomIn: `
    @keyframes zoomIn {
      from {
        transform: scale(0.5);
      }
      to {
        transform: scale(1);
      }
    }
  `,
  shake: `
    @keyframes shake {
      0% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      50% { transform: translateX(5px); }
      75% { transform: translateX(-5px); }
      100% { transform: translateX(0); }
    }
  `,
  multicolorBlink: `
    @keyframes multicolorBlink {
      0% { color: #2e7d32; }
      25% { color: #ffeb3b; }
      50% { color: #f44336; }
      75% { color: #2196f3; }
      100% { color: #2e7d32; }
    }
  `,
  bounce: `
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { 
        transform: translateY(0); 
      }
      40% { 
        transform: translateY(-30px); 
      }
      60% { 
        transform: translateY(-15px); 
      }
    }
  `,
};
