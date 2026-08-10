import styled, { keyframes, css } from 'styled-components';

// ── Keyframes ──────────────────────────────────────────────────
const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(233,120,170,0.35), 0 25px 70px rgba(0,0,0,0.55); }
  50% { box-shadow: 0 0 0 18px rgba(233,120,170,0), 0 25px 70px rgba(0,0,0,0.55); }
`;

const bobChevron = keyframes`
  0%, 100% { transform: translateY(0); opacity: 0.55; }
  50% { transform: translateY(6px); opacity: 1; }
`;

const fall = keyframes`
  0% { transform: translate3d(0, -10vh, 0) rotate(0deg); opacity: 1; }
  100% { transform: translate3d(var(--drift, 0px), 100vh, 0) rotate(540deg); opacity: 0; }
`;

const popIn = keyframes`
  0% { opacity: 0; transform: translateY(22px) scale(0.92); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
`;

const fadeInOverlay = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const twinkle = keyframes`
  0%, 100% { opacity: 0; transform: scale(0.3) rotate(0deg); }
  50% { opacity: 1; transform: scale(1) rotate(45deg); }
`;

const floatY = keyframes`
  0%, 100% { transform: translateY(0) rotate(-3deg); }
  50% { transform: translateY(-22px) rotate(3deg); }
`;

const spin = keyframes`
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
`;

const ringGlow = keyframes`
  0%, 100% { box-shadow: 0 0 25px 4px rgba(242,200,121,0.25); }
  50% { box-shadow: 0 0 42px 10px rgba(242,200,121,0.45); }
`;

const shimmerGold = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const shineSweep = keyframes`
  0% { transform: translateX(-160%) skewX(-20deg); }
  100% { transform: translateX(260%) skewX(-20deg); }
`;

// ── Overlay ────────────────────────────────────────────────────
export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 20px;
  background: radial-gradient(circle at 50% 30%, #2c0a1e 0%, #14060d 55%, #0a0308 100%);
  animation: ${fadeInOverlay} 0.5s ease both;
  transition: opacity 0.5s ease, visibility 0.5s ease;
  overflow: hidden;

  ${({ $hidden }) =>
    $hidden &&
    css`
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    `}
`;
Overlay.displayName = 'Overlay';

export const ConfettiLayer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
`;
ConfettiLayer.displayName = 'ConfettiLayer';

export const ConfettiPiece = styled.span`
  position: absolute;
  top: 0;
  left: ${({ $left }) => $left}%;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size * 0.4}px;
  background: ${({ $color }) => $color};
  border-radius: 2px;
  animation: ${fall} ${({ $duration }) => $duration}s ease-in ${({ $delay }) => $delay}s 1 both;
  --drift: ${({ $drift }) => $drift}px;

  ${({ $shape }) =>
    $shape === 'circle' &&
    css`
      border-radius: 50%;
      height: ${({ $size }) => $size}px;
    `}
`;
ConfettiPiece.displayName = 'ConfettiPiece';

// ── Ambient sparkles & balloons ─────────────────────────────────
export const SparkleField = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
`;
SparkleField.displayName = 'SparkleField';

export const Sparkle = styled.span`
  position: absolute;
  top: ${({ $top }) => $top}%;
  left: ${({ $left }) => $left}%;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  opacity: 0;
  animation: ${twinkle} ${({ $duration }) => $duration}s ease-in-out ${({ $delay }) => $delay}s infinite;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    background: linear-gradient(180deg, #fffbe9, #f2c879 55%, transparent 100%);
    border-radius: 2px;
  }
  &::before {
    width: 100%;
    height: 14%;
    transform: translate(-50%, -50%);
  }
  &::after {
    width: 14%;
    height: 100%;
    transform: translate(-50%, -50%);
  }
`;
Sparkle.displayName = 'Sparkle';

export const Balloon = styled.span`
  position: absolute;
  top: ${({ $top }) => $top}%;
  left: ${({ $left }) => $left}%;
  z-index: 0;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size * 1.2}px;
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  background: radial-gradient(circle at 32% 28%, ${({ $color2 }) => $color2}, ${({ $color }) => $color} 72%);
  box-shadow: 0 14px 30px rgba(0,0,0,0.35);
  opacity: 0.92;
  animation: ${floatY} ${({ $duration }) => $duration}s ease-in-out ${({ $delay }) => $delay}s infinite;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    top: 100%;
    width: 1px;
    height: 30px;
    background: rgba(253,248,240,0.35);
    transform: translateX(-50%);
  }
`;
Balloon.displayName = 'Balloon';

// ── Closed gift stage ──────────────────────────────────────────
export const GiftStage = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 32px 20px;
  transition: opacity 0.4s ease, transform 0.4s ease;

  ${({ $opening }) =>
    $opening &&
    css`
      opacity: 0;
      transform: scale(1.15);
      pointer-events: none;
    `}
`;
GiftStage.displayName = 'GiftStage';

export const GiftBox = styled.button`
  all: unset;
  cursor: pointer;
  position: relative;
  width: min(300px, 78vw);
  aspect-ratio: 4 / 3;
  border-radius: 22px;
  background:
    radial-gradient(circle, rgba(233,120,170,0.14) 1.4px, transparent 1.6px) 0 0/22px 22px,
    linear-gradient(155deg, #241226 0%, #170a1c 55%, #1c0b16 100%);
  box-shadow: 0 25px 70px rgba(0,0,0,0.55);
  overflow: hidden;
  animation: ${glowPulse} 2.6s ease-in-out infinite;

  &:focus-visible {
    outline: 2px solid #e978aa;
    outline-offset: 4px;
  }
`;
GiftBox.displayName = 'GiftBox';

const ribbonGradient = 'linear-gradient(180deg, #ffa9c6 0%, #e9578f 45%, #b52c68 100%)';

export const RibbonV = styled.span`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 22%;
  transform: translateX(-50%);
  background: ${ribbonGradient};
  box-shadow: inset 6px 0 10px rgba(255,255,255,0.18), inset -6px 0 10px rgba(0,0,0,0.25);
  transition: transform 0.55s cubic-bezier(0.6, 0.05, 0.3, 1), opacity 0.55s ease;

  ${({ $opening }) =>
    $opening &&
    css`
      transform: translateX(-50%) scaleY(0.05);
      opacity: 0;
    `}
`;
RibbonV.displayName = 'RibbonV';

export const RibbonHHalf = styled.span`
  position: absolute;
  top: 50%;
  width: 52%;
  height: 22%;
  transform: translateY(-50%);
  background: ${ribbonGradient};
  box-shadow: inset 0 6px 10px rgba(255,255,255,0.18), inset 0 -6px 10px rgba(0,0,0,0.25);
  transition: transform 0.55s cubic-bezier(0.6, 0.05, 0.3, 1) 0.05s, opacity 0.55s ease 0.05s;

  ${({ $side }) =>
    $side === 'left'
      ? css`
          left: 0;
        `
      : css`
          right: 0;
        `}

  ${({ $opening, $side }) =>
    $opening &&
    css`
      transform: translateY(-50%) translateX(${$side === 'left' ? '-140%' : '140%'});
      opacity: 0;
    `}
`;
RibbonHHalf.displayName = 'RibbonHHalf';

export const Bow = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 74px;
  height: 44px;
  transform: translate(-50%, -50%);
  transition: transform 0.5s cubic-bezier(0.6, 0.05, 0.3, 1), opacity 0.4s ease;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 4px;
    width: 38px;
    height: 34px;
    border-radius: 60% 60% 60% 5%;
    background: linear-gradient(135deg, #ffc1d9 0%, #e9578f 60%, #b52c68 100%);
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
  }
  &::before {
    left: 0;
    transform: rotate(-25deg);
  }
  &::after {
    right: 0;
    border-radius: 60% 60% 5% 60%;
    transform: rotate(25deg);
  }

  ${({ $opening }) =>
    $opening &&
    css`
      transform: translate(-50%, -50%) scale(0) rotate(90deg);
      opacity: 0;
    `}
`;
Bow.displayName = 'Bow';

export const BowKnot = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 16px;
  height: 20px;
  transform: translate(-50%, -50%);
  background: linear-gradient(180deg, #ff9dc2, #c93c73);
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.35);
  z-index: 1;

  ${({ $opening }) =>
    $opening &&
    css`
      transform: translate(-50%, -50%) scale(0);
      opacity: 0;
      transition: transform 0.4s ease, opacity 0.4s ease;
    `}
`;
BowKnot.displayName = 'BowKnot';

export const ToLabel = styled.p`
  margin: 28px 0 6px;
  font-family: 'Raleway', sans-serif;
  font-size: 0.68rem;
  letter-spacing: 0.5em;
  text-transform: uppercase;
  color: rgba(253,248,240,0.55);
`;
ToLabel.displayName = 'ToLabel';

export const NameText = styled.h1`
  margin: 0 0 14px;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-style: italic;
  font-weight: 600;
  font-size: clamp(1.9rem, 5vw, 2.6rem);
  color: #fdf8f0;
  text-align: center;
`;
NameText.displayName = 'NameText';

export const TapHint = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-top: 22px;
  font-family: 'Raleway', sans-serif;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #c9a84c;
`;
TapHint.displayName = 'TapHint';

export const Chevron = styled.span`
  font-size: 1rem;
  animation: ${bobChevron} 1.4s ease-in-out infinite;
`;
Chevron.displayName = 'Chevron';

// ── Reveal stage ───────────────────────────────────────────────
export const RevealStage = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 420px;
  width: 100%;
`;
RevealStage.displayName = 'RevealStage';

export const RevealItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;

  ${({ $show, $delay }) =>
    $show &&
    css`
      animation: ${popIn} 0.65s cubic-bezier(0.2, 0.7, 0.3, 1) ${$delay || 0}s forwards;
    `}
`;
RevealItem.displayName = 'RevealItem';

export const PhotoRingWrap = styled.div`
  position: relative;
  margin-bottom: 26px;
  border-radius: 50%;
  animation: ${ringGlow} 3s ease-in-out infinite;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: calc(100% + 24px);
    height: calc(100% + 24px);
    border-radius: 50%;
    border: 1.5px dashed rgba(242,200,121,0.55);
    animation: ${spin} 20s linear infinite;
  }
`;
PhotoRingWrap.displayName = 'PhotoRingWrap';

export const PhotoFrame = styled.div`
  position: relative;
  width: min(220px, 58vw);
  height: min(220px, 58vw);
  border-radius: 50%;
  padding: 6px;
  background: linear-gradient(135deg, #f2c879, #c9a84c 45%, #8a6a24);
  box-shadow: 0 18px 45px rgba(0,0,0,0.5);

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    display: block;
    border: 3px solid #14060d;
  }
`;
PhotoFrame.displayName = 'PhotoFrame';

export const Eyebrow = styled.p`
  margin: 0 0 8px;
  font-family: 'Raleway', sans-serif;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.45em;
  text-transform: uppercase;
  color: #c9a84c;
`;
Eyebrow.displayName = 'Eyebrow';

export const Heading = styled.h2`
  margin: 0 0 18px;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: clamp(2rem, 6vw, 2.8rem);
  line-height: 1.15;
  background: linear-gradient(90deg, #fdf8f0 0%, #f2c879 22%, #fffbe9 45%, #c9a84c 68%, #fdf8f0 100%);
  background-size: 250% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: ${shimmerGold} 5s linear infinite;
`;
Heading.displayName = 'Heading';

export const Message = styled.p`
  margin: 0 0 32px;
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-style: italic;
  font-size: clamp(1.05rem, 2.6vw, 1.3rem);
  line-height: 1.6;
  color: rgba(253,248,240,0.85);
`;
Message.displayName = 'Message';

export const VisitButton = styled.button`
  all: unset;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  padding: 15px 40px;
  font-family: 'Raleway', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #1c0c00;
  background: linear-gradient(135deg, #f2c879, #c9a84c);
  border-radius: 999px;
  box-shadow: 0 12px 30px rgba(201,168,76,0.35);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 35%;
    height: 100%;
    background: linear-gradient(120deg, transparent, rgba(255,255,255,0.65), transparent);
    animation: ${shineSweep} 3.2s ease-in-out infinite;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 36px rgba(201,168,76,0.5);
  }
  &:active {
    transform: translateY(0);
  }
`;
VisitButton.displayName = 'VisitButton';
