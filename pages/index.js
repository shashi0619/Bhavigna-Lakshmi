import { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import PropTypes from 'prop-types';
import { Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';

import Layout from '../components/Layout';
import { getFeatured, COLLECTION_META, COLLECTIONS } from '../data/products';
import { addToCart } from '../store/actions';

const styles = (theme) => ({
  // ── Hero ─────────────────────────────────────────────────────
  hero: {
    position: 'relative',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0D0408 0%, #2C0A1E 45%, #6B1530 75%, #3D0A1A 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  heroPattern: {
    position: 'absolute',
    inset: 0,
    opacity: 0.06,
    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  },
  heroGlow: {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 600,
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(201,168,76,0.15) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
    padding: '0 24px',
    maxWidth: 900,
  },
  heroPre: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.7rem',
    letterSpacing: '0.4em',
    color: '#C9A84C',
    textTransform: 'uppercase',
    fontWeight: 600,
    marginBottom: 24,
  },
  heroGoldBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 32,
  },
  goldLine: {
    flex: 1,
    height: 1,
    maxWidth: 80,
    backgroundColor: 'rgba(201,168,76,0.5)',
  },
  heroTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 'clamp(2.2rem, 6.5vw, 4.8rem)',
    fontWeight: 400,
    color: '#FDF8F0',
    lineHeight: 1.05,
    letterSpacing: '0.04em',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 'clamp(1.2rem, 3vw, 1.8rem)',
    fontWeight: 300,
    fontStyle: 'italic',
    color: 'rgba(253,248,240,0.7)',
    marginBottom: 48,
    letterSpacing: '0.06em',
  },
  heroCtas: {
    display: 'flex',
    gap: 16,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  ctaPrimary: {
    backgroundColor: '#8B1A3B',
    color: '#FDF8F0',
    padding: '14px 40px',
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 600,
    fontSize: '0.72rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    borderRadius: 0,
    border: 'none',
    cursor: 'pointer',
    transition: 'background 0.3s',
    '&:hover': { backgroundColor: '#C9A84C', color: '#1C0C00' },
  },
  ctaSecondary: {
    backgroundColor: 'transparent',
    color: '#FDF8F0',
    padding: '13px 40px',
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 600,
    fontSize: '0.72rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    borderRadius: 0,
    border: '1px solid rgba(201,168,76,0.6)',
    cursor: 'pointer',
    transition: 'all 0.3s',
    '&:hover': { backgroundColor: 'rgba(201,168,76,0.15)', borderColor: '#C9A84C' },
  },
  heroScroll: {
    position: 'absolute',
    bottom: 40,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    color: 'rgba(253,248,240,0.4)',
    fontSize: '0.62rem',
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 500,
  },
  scrollLine: {
    width: 1,
    height: 48,
    backgroundColor: 'rgba(201,168,76,0.4)',
    animation: '$scrollPulse 1.8s ease-in-out infinite',
  },
  '@keyframes scrollPulse': {
    '0%, 100%': { opacity: 0.3, transform: 'scaleY(1)' },
    '50%': { opacity: 1, transform: 'scaleY(0.7)' },
  },

  // ── Marquee banner ────────────────────────────────────────────
  marqueeStrip: {
    backgroundColor: '#8B1A3B',
    overflow: 'hidden',
    padding: '14px 0',
    whiteSpace: 'nowrap',
  },
  marqueeTrack: {
    display: 'inline-block',
    animation: '$marquee 28s linear infinite',
  },
  '@keyframes marquee': {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-50%)' },
  },
  marqueeText: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.65rem',
    letterSpacing: '0.28em',
    textTransform: 'uppercase',
    color: '#FDF8F0',
    fontWeight: 600,
    padding: '0 32px',
  },
  marqueeDot: {
    color: '#C9A84C',
    margin: '0 8px',
  },

  // ── Section shared ────────────────────────────────────────────
  section: {
    padding: '96px 24px',
    [theme.breakpoints.up('md')]: { padding: '120px 48px' },
  },
  sectionInner: {
    maxWidth: 1280,
    margin: '0 auto',
  },
  sectionLabel: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.65rem',
    letterSpacing: '0.35em',
    textTransform: 'uppercase',
    color: '#C9A84C',
    fontWeight: 600,
    marginBottom: 12,
    display: 'block',
  },
  sectionTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 'clamp(2rem, 4vw, 3.2rem)',
    fontWeight: 400,
    color: '#1C0C00',
    lineHeight: 1.2,
    marginBottom: 16,
  },
  sectionSubtitle: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.9rem',
    color: '#6B4C3B',
    lineHeight: 1.8,
    maxWidth: 560,
    marginBottom: 48,
  },
  sectionTitleBar: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 56,
  },
  seeAllLink: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.7rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#8B1A3B',
    textDecoration: 'none',
    borderBottom: '1px solid rgba(139,26,59,0.4)',
    paddingBottom: 2,
    transition: 'border-color 0.2s',
    '&:hover': { borderColor: '#8B1A3B' },
  },

  // ── Collections grid ──────────────────────────────────────────
  collectionsSection: {
    backgroundColor: '#FDF8F0',
  },
  collectionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: 10,
    [theme.breakpoints.up('sm')]: { gridTemplateColumns: 'repeat(3, 1fr)' },
    [theme.breakpoints.up('md')]: { gridTemplateColumns: 'repeat(4, 1fr)' },
    [theme.breakpoints.up('lg')]: { gridTemplateColumns: 'repeat(7, 1fr)' },
  },
  collectionCard: {
    position: 'relative',
    height: 200,
    overflow: 'hidden',
    cursor: 'pointer',
    '&:hover $collectionOverlay': { opacity: 1 },
    '&:hover $collectionBg': { transform: 'scale(1.06)' },
    [theme.breakpoints.up('sm')]: { height: 240 },
    [theme.breakpoints.up('md')]: { height: 270 },
    [theme.breakpoints.up('lg')]: { height: 300 },
  },
  collectionBg: {
    position: 'absolute',
    inset: 0,
    transition: 'transform 0.6s ease',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  collectionOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(28,12,0,0.45)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0,
    transition: 'opacity 0.4s ease',
  },
  collectionCta: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    color: '#FDF8F0',
    border: '1px solid rgba(201,168,76,0.8)',
    padding: '10px 24px',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    marginTop: 12,
    transition: 'all 0.25s',
    '&:hover': { backgroundColor: '#C9A84C', color: '#1C0C00', borderColor: '#C9A84C' },
  },
  collectionInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '24px 20px',
    background: 'linear-gradient(to top, rgba(28,12,0,0.75) 0%, transparent 100%)',
  },
  collectionName: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.35rem',
    fontWeight: 500,
    color: '#FDF8F0',
    letterSpacing: '0.04em',
  },
  collectionTagline: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.68rem',
    color: 'rgba(201,168,76,0.9)',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    marginTop: 2,
    fontWeight: 500,
  },

  // ── Featured products ─────────────────────────────────────────
  featuredSection: {
    backgroundColor: '#FAF5ED',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '8px 8px',
    [theme.breakpoints.up('sm')]: { gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' },
    [theme.breakpoints.up('lg')]: { gridTemplateColumns: 'repeat(4, 1fr)' },
  },
  productCard: {
    position: 'relative',
    cursor: 'pointer',
    backgroundColor: '#fff',
    borderRadius: 14,
    boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: 'box-shadow 0.22s, transform 0.22s',
    '&:hover': { boxShadow: '0 8px 28px rgba(0,0,0,0.14)', transform: 'translateY(-3px)' },
    '&:hover $productImg': { transform: 'scale(1.04)' },
  },
  productImgWrap: {
    overflow: 'hidden',
    paddingBottom: '100%',
    position: 'relative',
    backgroundColor: '#f5f0ea',
  },
  productImg: {
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.45s ease',
  },
  productHover: { display: 'none' },
  productHoverBtn: { display: 'none' },
  productAvailBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#8B1A3B',
    color: '#fff',
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.52rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    fontWeight: 700,
    padding: '3px 10px',
    borderRadius: 20,
    zIndex: 2,
  },
  productMeta: {
    padding: '10px 12px 12px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  productCollection: {
    display: 'inline-block',
    backgroundColor: '#f2f2f2',
    color: '#555',
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.56rem',
    fontWeight: 600,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    padding: '3px 9px',
    borderRadius: 20,
    marginBottom: 8,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  productName: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.83rem',
    fontWeight: 700,
    color: '#111',
    lineHeight: 1.4,
    marginBottom: 4,
  },
  productPriceRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 'auto',
    paddingTop: 8,
    gap: 4,
  },
  productPrice: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '1rem',
    fontWeight: 800,
    color: '#111',
    letterSpacing: '0.01em',
  },
  productAddBtn: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.7rem',
    fontWeight: 700,
    color: '#B8860B',
    backgroundColor: 'transparent',
    border: '1.5px solid #C9A84C',
    borderRadius: 20,
    padding: '5px 14px',
    cursor: 'pointer',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    transition: 'all 0.2s',
    '&:hover': { backgroundColor: '#C9A84C', color: '#fff' },
  },
  productAddedBtn: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.7rem',
    fontWeight: 700,
    color: '#2e6e3e',
    backgroundColor: '#e6f4ea',
    border: '1.5px solid #a8d5b5',
    borderRadius: 20,
    padding: '5px 12px',
    whiteSpace: 'nowrap',
    cursor: 'default',
    flexShrink: 0,
  },

  // ── Brand story ───────────────────────────────────────────────
  storySection: {
    backgroundColor: '#1C0C00',
    color: '#FDF8F0',
  },
  storyGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 64,
    alignItems: 'center',
    [theme.breakpoints.up('md')]: { gridTemplateColumns: '1fr 1fr' },
  },
  storyLabel: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.65rem',
    letterSpacing: '0.35em',
    textTransform: 'uppercase',
    color: '#C9A84C',
    fontWeight: 600,
    marginBottom: 12,
  },
  storyTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
    fontWeight: 400,
    color: '#FDF8F0',
    lineHeight: 1.15,
    marginBottom: 24,
  },
  storyText: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.88rem',
    lineHeight: 1.9,
    color: 'rgba(253,248,240,0.72)',
    marginBottom: 16,
  },
  storyBtn: {
    display: 'inline-block',
    marginTop: 16,
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 600,
    fontSize: '0.7rem',
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: '#C9A84C',
    border: '1px solid rgba(201,168,76,0.6)',
    padding: '12px 32px',
    textDecoration: 'none',
    transition: 'all 0.3s',
    '&:hover': { backgroundColor: '#C9A84C', color: '#1C0C00', borderColor: '#C9A84C' },
  },
  storyVisual: {
    position: 'relative',
  },
  storyImgGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '220px 220px',
    gap: 8,
  },
  storyImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  storyImgTall: {
    gridRow: 'span 2',
  },
  storyAccentBox: {
    position: 'absolute',
    bottom: -24,
    left: -24,
    width: 120,
    height: 120,
    border: '2px solid rgba(201,168,76,0.4)',
    zIndex: 0,
    pointerEvents: 'none',
    [theme.breakpoints.down('sm')]: { display: 'none' },
  },

  // ── Pillars ───────────────────────────────────────────────────
  pillarsSection: {
    backgroundColor: '#FDF8F0',
    position: 'relative',
    overflow: 'hidden',
  },
  pillarsDecorLeft: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: '100%',
    width: 'auto',
    maxWidth: '45%',
    objectFit: 'cover',
    objectPosition: 'right center',
    opacity: 0.18,
    pointerEvents: 'none',
    userSelect: 'none',
    [theme.breakpoints.down('sm')]: {
      left: '50%',
      transform: 'translateX(-50%)',
      maxWidth: '100%',
      opacity: 0.15,
    },
  },
  pillarsDecorRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    height: '100%',
    width: 'auto',
    maxWidth: '45%',
    objectFit: 'cover',
    objectPosition: 'left center',
    opacity: 0.18,
    pointerEvents: 'none',
    userSelect: 'none',
    transform: 'scaleX(-1)',
    [theme.breakpoints.down('sm')]: { display: 'none' },
  },
  pillarsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 40,
    [theme.breakpoints.up('sm')]: { gridTemplateColumns: 'repeat(3, 1fr)' },
  },
  pillar: {
    textAlign: 'center',
    padding: '40px 24px',
  },
  pillarIcon: {
    fontSize: '2.4rem',
    marginBottom: 16,
    display: 'block',
  },
  pillarDivider: {
    width: 32,
    height: 2,
    backgroundColor: '#C9A84C',
    margin: '16px auto',
  },
  pillarTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.3rem',
    fontWeight: 500,
    color: '#1C0C00',
    marginBottom: 12,
  },
  pillarText: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.82rem',
    color: '#6B4C3B',
    lineHeight: 1.8,
  },

  // ── Testimonials ─────────────────────────────────────────────
  testimonialsSection: {
    backgroundColor: '#FAF5ED',
    position: 'relative',
    overflow: 'hidden',
  },
  goldDecorRight: {
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    width: 260,
    opacity: 0.13,
    pointerEvents: 'none',
    userSelect: 'none',
    [theme.breakpoints.down('sm')]: { width: 160 },
  },
  goldDecorLeft: {
    position: 'absolute',
    left: 0,
    top: '50%',
    transform: 'translateY(-50%) scaleX(-1)',
    width: 260,
    opacity: 0.13,
    pointerEvents: 'none',
    userSelect: 'none',
    [theme.breakpoints.down('sm')]: { width: 160 },
  },
  testimonialsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 32,
    [theme.breakpoints.up('sm')]: { gridTemplateColumns: 'repeat(3, 1fr)' },
  },
  testimonialCard: {
    backgroundColor: '#FDF8F0',
    padding: '36px 28px',
    border: '1px solid rgba(201,168,76,0.2)',
    position: 'relative',
  },
  testimonialQuote: {
    position: 'absolute',
    top: 20,
    left: 24,
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '3.5rem',
    color: '#C9A84C',
    lineHeight: 1,
    opacity: 0.3,
  },
  testimonialText: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: '1.05rem',
    fontStyle: 'italic',
    color: '#3D1C00',
    lineHeight: 1.7,
    marginBottom: 20,
    marginTop: 24,
  },
  testimonialStars: {
    color: '#C9A84C',
    fontSize: '0.8rem',
    letterSpacing: 2,
    marginBottom: 12,
  },
  testimonialAuthor: {
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 700,
    fontSize: '0.72rem',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: '#8B1A3B',
  },
  testimonialLocation: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.7rem',
    color: '#9B7B6A',
    marginTop: 2,
  },

  // ── Newsletter ────────────────────────────────────────────────
  newsletterSection: {
    backgroundColor: '#8B1A3B',
    padding: '80px 24px',
    textAlign: 'center',
  },
  newsletterInner: { maxWidth: 560, margin: '0 auto' },
  newsletterLabel: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.62rem',
    letterSpacing: '0.35em',
    textTransform: 'uppercase',
    color: 'rgba(253,248,240,0.6)',
    fontWeight: 600,
    marginBottom: 12,
  },
  newsletterTitle: {
    fontFamily: "'Cormorant Garamond', Georgia, serif",
    fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
    color: '#FDF8F0',
    fontWeight: 400,
    marginBottom: 12,
  },
  newsletterSub: {
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.85rem',
    color: 'rgba(253,248,240,0.7)',
    lineHeight: 1.7,
    marginBottom: 36,
  },
  newsletterForm: {
    display: 'flex',
    gap: 0,
    maxWidth: 460,
    margin: '0 auto',
    [theme.breakpoints.down('xs')]: { flexDirection: 'column', gap: 12 },
  },
  newsletterInput: {
    flex: 1,
    padding: '14px 20px',
    border: 'none',
    borderBottom: '2px solid rgba(253,248,240,0.4)',
    backgroundColor: 'rgba(253,248,240,0.1)',
    color: '#FDF8F0',
    fontFamily: "'Raleway', sans-serif",
    fontSize: '0.85rem',
    outline: 'none',
    '&::placeholder': { color: 'rgba(253,248,240,0.45)' },
    '&:focus': { borderBottomColor: '#C9A84C', backgroundColor: 'rgba(253,248,240,0.15)' },
  },
  newsletterBtn: {
    backgroundColor: '#C9A84C',
    color: '#1C0C00',
    border: 'none',
    padding: '14px 28px',
    fontFamily: "'Raleway', sans-serif",
    fontWeight: 700,
    fontSize: '0.68rem',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    cursor: 'pointer',
    transition: 'background 0.2s',
    '&:hover': { backgroundColor: '#DFC278' },
  },
});

const TESTIMONIALS = [
  {
    text: 'I bought a gold haram and vaddanam set for my daughter\'s wedding from Bhavigna Lakshmi Jewellery. The craftsmanship is stunning — every guest kept asking where we got it. Absolutely worth every rupee.',
    author: 'Padma Venkatesh',
    location: 'Hyderabad',
    stars: '★★★★★',
  },
  {
    text: 'The Panchaloham earrings I ordered arrived beautifully packed and looked even more gorgeous in person. The quality is excellent and the price is very reasonable. Highly recommend to everyone!',
    author: 'Swapna Reddy',
    location: 'Warangal',
    stars: '★★★★★',
  },
  {
    text: 'Bhavigna Lakshmi is my go-to for all festive jewellery. The bridal necklace set I purchased was hallmarked and the finish is simply flawless. Trusted shop with genuine South Indian craftsmanship.',
    author: 'Lakshmi Narayana',
    location: 'Gajwel',
    stars: '★★★★★',
  },
];

const PILLARS = [
  { icon: '💎', title: 'Hallmarked Purity', text: 'Every gold and silver piece we carry is BIS hallmarked, guaranteeing certified purity so you invest with complete confidence and peace of mind.' },
  { icon: '🏺', title: 'Master Goldsmith Craft', text: 'Our jewellery is handcrafted by skilled goldsmiths from the finest artisan communities of South India, preserving centuries of temple and bridal jewellery tradition.' },
  { icon: '👑', title: 'Bridal to Everyday', text: 'From grand bridal sets, harams and vaddanam to delicate everyday earrings and chains — we have the perfect piece for every occasion and every woman.' },
];

const Index = ({ pathname, collections }) => {
  const [email, setEmail] = useState('');
  const featured = getFeatured();

  const formatPrice = (p) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(p);

  return (
    <Layout
      pathname={pathname}
      collections={collections}
      title="Bhavigna Lakshmi Collections | Indian Ethnic Wear"
      description="Exquisite Indian ethnic wear — sarees, lehengas, and designer blouses crafted with heritage artisanship. Kanjivaram, Banarasi, Chanderi, and more."
    >
      {/* ── Hero ─────────────────────────────────────────────── */}
      <HeroSection />

      {/* ── Marquee ──────────────────────────────────────────── */}
      <MarqueeStrip />

      {/* ── Collections ──────────────────────────────────────── */}
      <CollectionsSection />

      {/* ── Featured Products ────────────────────────────────── */}
      <FeaturedSection featured={featured} formatPrice={formatPrice} />

      {/* ── Brand Story ──────────────────────────────────────── */}
      <StorySection />

      {/* ── Pillars ──────────────────────────────────────────── */}
      <PillarsSection />

      {/* ── Testimonials ─────────────────────────────────────── */}
      <TestimonialsSection />

      {/* ── Newsletter ───────────────────────────────────────── */}
      <NewsletterSection email={email} setEmail={setEmail} />
    </Layout>
  );
};

// ── Sub-components (styled via inline or withStyles) ─────────────

const HeroSectionBase = ({ classes }) => (
  <section className={classes.hero}>
    <div className={classes.heroPattern} />
    <div className={classes.heroGlow} />
    <div className={classes.heroContent}>
      <p className={classes.heroPre}>Est. 2018 · Gajwel, Telangana, India</p>
      <div className={classes.heroGoldBar}>
        <div className={classes.goldLine} />
        <span style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C9A84C', fontSize: '0.8rem', letterSpacing: '0.3em', fontStyle: 'italic' }}>
          Where tradition meets grace
        </span>
        <div className={classes.goldLine} />
      </div>
      <h1 className={classes.heroTitle}>
        Bhavigna Lakshmi<br />Collections
      </h1>
      <p className={classes.heroSubtitle}>
        South Indian Jewellery &amp; Bridal Adornments
      </p>
      <div className={classes.heroCtas}>
        <button className={classes.ctaPrimary} onClick={() => Router.push('/gallery')}>
          Explore Collections
        </button>
        <button className={classes.ctaSecondary} onClick={() => Router.push('/about')}>
          Our Story
        </button>
      </div>
    </div>
    <div className={classes.heroScroll}>
      <div className={classes.scrollLine} />
      <span>Scroll</span>
    </div>
  </section>
);
const HeroSection = withStyles(styles)(HeroSectionBase);

const MarqueeStripBase = ({ classes }) => {
  const items = ['Gold Earrings', 'Bridal Sets', 'Vaddanam', 'Jadabilla', 'Chandraharam', 'CZ Jewellery', 'Nakshi Jewellery', 'Diamond Finish', 'Long Harams', 'Blackbeads', 'Panchaloham', 'Beads Collections'];
  const repeated = [...items, ...items];
  return (
    <div className={classes.marqueeStrip}>
      <div className={classes.marqueeTrack}>
        {repeated.map((t, i) => (
          <span key={i} className={classes.marqueeText}>
            {t}
            {i < repeated.length - 1 && <span className={classes.marqueeDot}>✦</span>}
          </span>
        ))}
      </div>
    </div>
  );
};
const MarqueeStrip = withStyles(styles)(MarqueeStripBase);

const CollectionsSectionBase = ({ classes }) => (
  <section className={`${classes.section} ${classes.collectionsSection}`}>
    <div className={classes.sectionInner}>
      <div className={classes.sectionTitleBar}>
        <div>
          <span className={classes.sectionLabel}>Curated for you</span>
          <h2 className={classes.sectionTitle}>Our Collections</h2>
        </div>
        <Link href="/gallery" passHref>
          <a className={classes.seeAllLink}>View All</a>
        </Link>
      </div>
      <div className={classes.collectionsGrid}>
        {COLLECTIONS.map((col) => {
          const meta = COLLECTION_META[col] || { label: col, tagline: '', gradient: 'linear-gradient(135deg,#3D0A1A,#8B1A3B)' };
          return (
            <div
              key={col}
              className={classes.collectionCard}
              onClick={() => Router.push(`/gallery?collection=${col}`, `/gallery/${col}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && Router.push(`/gallery?collection=${col}`)}
            >
              <div
                className={classes.collectionBg}
                style={meta.image ? {
                  backgroundImage: `${meta.gradient}, url(${meta.image})`,
                } : { background: meta.gradient }}
              />
              <div className={classes.collectionOverlay}>
                <button className={classes.collectionCta}>Explore</button>
              </div>
              <div className={classes.collectionInfo}>
                <div className={classes.collectionName}>{meta.label}</div>
                <div className={classes.collectionTagline}>{meta.tagline}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);
const CollectionsSection = withStyles(styles)(CollectionsSectionBase);

const FeaturedSectionBase = ({ classes, featured, formatPrice, cart, addToCartRedux }) => (
  <section className={`${classes.section} ${classes.featuredSection}`}>
    <div className={classes.sectionInner}>
      <div className={classes.sectionTitleBar}>
        <div>
          <span className={classes.sectionLabel}>Handpicked for you</span>
          <h2 className={classes.sectionTitle}>Featured Pieces</h2>
        </div>
        <Link href="/gallery" passHref>
          <a className={classes.seeAllLink}>Shop All</a>
        </Link>
      </div>
      <div className={classes.productsGrid}>
        {featured.map((item) => (
          <div
            key={item._id}
            className={classes.productCard}
            onClick={() => Router.push(`/piece?slug=${item.slug}`, `/piece/${item.slug}`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && Router.push(`/piece?slug=${item.slug}`, `/piece/${item.slug}`)}
          >
            <div className={classes.productImgWrap}>
              <img src={item.frontImage} alt={item.name} className={classes.productImg} />
              <div className={classes.productHover}>
                <button className={classes.productHoverBtn}>View Details</button>
              </div>
              {item.available && (
                <span className={classes.productAvailBadge}>Available</span>
              )}
            </div>
            <div className={classes.productMeta}>
              <div className={classes.productName} title={item.name}>{item.name.length > 32 ? item.name.slice(0, 32).trimEnd() + '…' : item.name}</div>
              <div className={classes.productCollection}>
                {COLLECTION_META[item.group]?.label || item.group}
              </div>
              <div className={classes.productPriceRow}>
                <span className={classes.productPrice}>{formatPrice(item.price)}</span>
                {cart.some((c) => c._id === item._id) ? (
                  <button
                    className={classes.productAddedBtn}
                    onClick={(e) => e.stopPropagation()}
                  >✓ Added</button>
                ) : (
                  <button
                    className={classes.productAddBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCartRedux(item);
                      window.dispatchEvent(new CustomEvent('open-cart-drawer'));
                    }}
                  >Add</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
const FeaturedSection = connect(
  (state) => ({ cart: state.cart }),
  (dispatch) => ({ addToCartRedux: (item) => dispatch(addToCart(item)) })
)(withStyles(styles)(FeaturedSectionBase));

const StorySectionBase = ({ classes }) => (
  <section className={`${classes.section} ${classes.storySection}`}>
    <div className={classes.sectionInner}>
      <div className={classes.storyGrid}>
        <div>
          <div className={classes.storyLabel}>The Heart Behind Every Piece</div>
          <h2 className={classes.storyTitle}>
            A Legacy Crafted in Gold &amp; Gemstones
          </h2>
          <p className={classes.storyText}>
            Bhavigna Lakshmi Jewellery was born from a deep reverence for India's extraordinary jewellery heritage.
            Founded in Gajwel, we curate handcrafted pieces sourced directly from the finest goldsmith
            communities across South India — from temple jewellery to bridal sets and everyday adornments.
          </p>
          <p className={classes.storyText}>
            Every piece we carry is a testament to the artisan who crafted it — countless hours of skill, patience,
            and love translated into gold and gemstones. We believe that wearing Indian jewellery is an act of
            preserving living art and celebrating timeless tradition.
          </p>
          <Link href="/about" passHref>
            <a className={classes.storyBtn}>Discover Our Story</a>
          </Link>
        </div>
        <div className={classes.storyVisual}>
          <div className={classes.storyImgGrid}>
            <div className={classes.storyImgTall}>
              <img
                src="https://images.unsplash.com/photo-1601821765780-754fa98637c1?auto=format&fit=crop&w=600&h=750&q=80"
                alt="Handloom weaving"
                className={classes.storyImg}
                style={{ height: '100%' }}
              />
            </div>
            <img src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=600&h=750&q=80" alt="Artisan at work" className={classes.storyImg} />
            <img src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&h=750&q=80" alt="Silk threads" className={classes.storyImg} />
          </div>
          <div className={classes.storyAccentBox} />
        </div>
      </div>
    </div>
  </section>
);
const StorySection = withStyles(styles)(StorySectionBase);

const PillarsSectionBase = ({ classes }) => (
  <section className={`${classes.section} ${classes.pillarsSection}`}>
    <img src="/images/Beige And Gold .png" alt="" className={classes.pillarsDecorLeft} aria-hidden="true" />
    <img src="/images/Beige And Gold .png" alt="" className={classes.pillarsDecorRight} aria-hidden="true" />
    <div className={classes.sectionInner}>
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <span className={classes.sectionLabel}>Why Choose Us</span>
        <h2 className={classes.sectionTitle}>The Bhavigna Promise</h2>
      </div>
      <div className={classes.pillarsGrid}>
        {PILLARS.map((p) => (
          <div key={p.title} className={classes.pillar}>
            <span className={classes.pillarIcon}>{p.icon}</span>
            <div className={classes.pillarDivider} />
            <h3 className={classes.pillarTitle}>{p.title}</h3>
            <p className={classes.pillarText}>{p.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
const PillarsSection = withStyles(styles)(PillarsSectionBase);

const TestimonialsSectionBase = ({ classes }) => (
  <section className={`${classes.section} ${classes.testimonialsSection}`}>
    <img src="/images/Gold.png" alt="" className={classes.goldDecorLeft} aria-hidden="true" />
    <img src="/images/Gold.png" alt="" className={classes.goldDecorRight} aria-hidden="true" />
    <div className={classes.sectionInner}>
      <div style={{ textAlign: 'center', marginBottom: 64 }}>
        <span className={classes.sectionLabel}>What Our Customers Say</span>
        <h2 className={classes.sectionTitle}>Loved Across India</h2>
      </div>
      <div className={classes.testimonialsGrid}>
        {TESTIMONIALS.map((t) => (
          <div key={t.author} className={classes.testimonialCard}>
            <div className={classes.testimonialQuote}>&ldquo;</div>
            <div className={classes.testimonialStars}>{t.stars}</div>
            <p className={classes.testimonialText}>{t.text}</p>
            <div className={classes.testimonialAuthor}>{t.author}</div>
            <div className={classes.testimonialLocation}>{t.location}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
const TestimonialsSection = withStyles(styles)(TestimonialsSectionBase);

const NewsletterSectionBase = ({ classes, email, setEmail }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for subscribing with ${email}!`);
    setEmail('');
  };
  return (
    <section className={classes.newsletterSection}>
      <div className={classes.newsletterInner}>
        <div className={classes.newsletterLabel}>Join Our Circle</div>
        <h2 className={classes.newsletterTitle}>Be the First to Shine</h2>
        <p className={classes.newsletterSub}>
          Subscribe for first access to new jewellery arrivals, exclusive bridal collection previews, gold care tips, and festive offers from Bhavigna Lakshmi Jewellery.
        </p>
        <form className={classes.newsletterForm} onSubmit={handleSubmit}>
          <input
            className={classes.newsletterInput}
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className={classes.newsletterBtn}>Subscribe</button>
        </form>
      </div>
    </section>
  );
};
const NewsletterSection = withStyles(styles)(NewsletterSectionBase);

Index.propTypes = {
  pathname: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  collections: PropTypes.arrayOf(PropTypes.string),
};

Index.getInitialProps = async ({ pathname }) => ({ pathname });

export default Index;
