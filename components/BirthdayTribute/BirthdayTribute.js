import { useCallback, useEffect, useMemo, useState } from 'react';

import * as S from '../../styles/BirthdayTribute';

const RECIPIENT_NAME = 'Bhavigna Lakshmi';
const PHOTO_SRC = '/images/1000055971.jpg';
const CONFETTI_COLORS = ['#c9a84c', '#f2c879', '#e9578f', '#fdf8f0', '#8b1a3b'];
const BALLOON_COLORS = [
  ['#e9578f', '#ffb3cf'],
  ['#c9a84c', '#f7dfa0'],
  ['#8b1a3b', '#e2799b'],
];

const buildConfetti = () =>
  Array.from({ length: 36 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    shape: i % 3 === 0 ? 'circle' : 'rect',
    size: 6 + Math.random() * 7,
    delay: Math.random() * 0.6,
    duration: 2.2 + Math.random() * 1.8,
    drift: Math.random() * 180 - 90,
  }));

const buildSparkles = () =>
  Array.from({ length: 30 }, (_, i) => ({
    id: i,
    top: Math.random() * 100,
    left: Math.random() * 100,
    size: 8 + Math.random() * 12,
    delay: Math.random() * 4,
    duration: 2.4 + Math.random() * 2.4,
  }));

const buildBalloons = () => [
  { id: 0, top: 8, left: 10, size: 46, delay: 0, duration: 5.5, color: BALLOON_COLORS[0][0], color2: BALLOON_COLORS[0][1] },
  { id: 1, top: 14, left: 86, size: 38, delay: 0.8, duration: 6.2, color: BALLOON_COLORS[1][0], color2: BALLOON_COLORS[1][1] },
  { id: 2, top: 4, left: 48, size: 30, delay: 1.4, duration: 5, color: BALLOON_COLORS[2][0], color2: BALLOON_COLORS[2][1] },
];

const BirthdayTribute = () => {
  const [phase, setPhase] = useState('closed'); // closed -> opening -> open -> dismissed -> gone
  const [mounted, setMounted] = useState(false);
  const confetti = useMemo(buildConfetti, []);
  const sparkles = useMemo(buildSparkles, []);
  const balloons = useMemo(buildBalloons, []);

  // Random particle positions must only be generated client-side, after
  // hydration, so the server-rendered markup has nothing to mismatch against.
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpen = useCallback(() => {
    setPhase((current) => {
      if (current !== 'closed') return current;
      window.setTimeout(() => setPhase('open'), 650);
      return 'opening';
    });
  }, []);

  const handleVisit = useCallback(() => {
    setPhase('dismissed');
    window.setTimeout(() => setPhase('gone'), 550);
  }, []);

  if (phase === 'gone') return null;

  const isOpening = phase === 'opening';
  const showGift = phase === 'closed' || phase === 'opening';
  const showReveal = phase === 'opening' || phase === 'open' || phase === 'dismissed';

  return (
    <S.Overlay $hidden={phase === 'dismissed'} role="dialog" aria-modal="true" aria-label={`Birthday tribute for ${RECIPIENT_NAME}`}>
      {mounted && (
        <S.SparkleField aria-hidden="true">
          {sparkles.map((s) => (
            <S.Sparkle key={s.id} $top={s.top} $left={s.left} $size={s.size} $delay={s.delay} $duration={s.duration} />
          ))}
        </S.SparkleField>
      )}

      {mounted && showReveal && (
        <>
          {balloons.map((b) => (
            <S.Balloon
              key={b.id}
              $top={b.top}
              $left={b.left}
              $size={b.size}
              $delay={b.delay}
              $duration={b.duration}
              $color={b.color}
              $color2={b.color2}
            />
          ))}
          <S.ConfettiLayer aria-hidden="true">
            {confetti.map((piece) => (
              <S.ConfettiPiece
                key={piece.id}
                $left={piece.left}
                $color={piece.color}
                $shape={piece.shape}
                $size={piece.size}
                $delay={piece.delay}
                $duration={piece.duration}
                $drift={piece.drift}
              />
            ))}
          </S.ConfettiLayer>
        </>
      )}

      {showGift && (
        <S.GiftStage $opening={isOpening}>
          <S.GiftBox type="button" onClick={handleOpen} aria-label="Tap to open the birthday surprise">
            <S.RibbonV $opening={isOpening} />
            <S.RibbonHHalf $side="left" $opening={isOpening} />
            <S.RibbonHHalf $side="right" $opening={isOpening} />
            <S.BowKnot $opening={isOpening} />
            <S.Bow $opening={isOpening} />
          </S.GiftBox>
          <S.ToLabel>To</S.ToLabel>
          <S.NameText>{RECIPIENT_NAME}</S.NameText>
          <S.TapHint type="button" onClick={handleOpen}>
            <S.Chevron aria-hidden="true">^</S.Chevron>
            <span>Tap to open</span>
          </S.TapHint>
        </S.GiftStage>
      )}

      {showReveal && (
        <S.RevealStage>
          <S.RevealItem $show $delay={0}>
            <S.PhotoRingWrap>
              <S.PhotoFrame>
                <img src={PHOTO_SRC} alt={RECIPIENT_NAME} />
              </S.PhotoFrame>
            </S.PhotoRingWrap>
          </S.RevealItem>
          <S.RevealItem $show $delay={0.2}>
            <S.Eyebrow>Happy Birthday</S.Eyebrow>
          </S.RevealItem>
          <S.RevealItem $show $delay={0.35}>
            <S.Heading>Wishing You a Beautiful Year Ahead</S.Heading>
          </S.RevealItem>
          <S.RevealItem $show $delay={0.5}>
            <S.Message>
              &ldquo;May this year bring you the same joy, warmth and grace you bring to everyone
              around you. Here&apos;s to another year of shining bright.&rdquo;
            </S.Message>
          </S.RevealItem>
          <S.RevealItem $show $delay={0.65}>
            <S.VisitButton type="button" onClick={handleVisit}>
              Visit Website
            </S.VisitButton>
          </S.RevealItem>
        </S.RevealStage>
      )}
    </S.Overlay>
  );
};

export default BirthdayTribute;
