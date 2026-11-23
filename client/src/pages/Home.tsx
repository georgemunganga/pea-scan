import { useEffect, useState, type FocusEvent } from "react";
import QRCode from "qrcode";
import {
  ArrowDown,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Pause,
  Phone,
  Play,
  QrCode,
  Share2,
  ShoppingBag,
  X,
} from "lucide-react";

const SHOP_URL = "https://www.pureessenceapothecary.com/shop";
const WEBSITE_URL = "https://www.pureessenceapothecary.com/";
const PHONE_DISPLAY = "+260 97 7883578";
const PHONE_E164 = "+260977883578";
const EMAIL = "customercare@pureessenceapothecary.com";
const WHATSAPP_URL =
  "https://wa.me/260977883578?text=Hello%20Pure%20Essence%20Apothecary%2C%20I%27d%20love%20to%20know%20more.";
const SOCIALS = {
  facebook: "https://www.facebook.com/Beezcraftedsoapandlotions/",
  instagram: "https://www.instagram.com/apothecary_essence2019/",
};

type ShowcaseSlide = {
  id: string;
  kind: "product" | "campaign";
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  action: string;
  image?: string;
  imageAlt?: string;
};

const SHOWCASE_SLIDES: ShowcaseSlide[] = [
  {
    id: "nature-everyday-care",
    kind: "campaign",
    eyebrow: "NATURE’S KISS · CONSUMER BRAND",
    title: "African botanicals. Everyday care.",
    description: "Nature’s Kiss is the consumer brand of Pure Essence Apothecary, with care across face, body, hair, cleansing, oils and butters.",
    href: SHOP_URL,
    image: "/manus-storage/img-000_7ad2b5ad.jpg",
    imageAlt: "Official Pure Essence Apothecary profile cover with skincare imagery and the line African botanicals. Everyday care.",
    action: "Explore the range",
  },
  {
    id: "serum",
    kind: "product",
    eyebrow: "BAOBAB FACE CARE",
    title: "Baobab Nourishing Serum (30 ml)",
    description: "Hyaluronic acid, baobab oil and vitamin E; positioned for hydration and nourishment.",
    href: "https://www.pureessenceapothecary.com/product/110",
    image: "/manus-storage/baobab-nourishing-serum_44128b88.jpeg",
    imageAlt: "Baobab Nourishing Serum bottle",
    action: "View product",
  },
  {
    id: "cleansing-wash",
    kind: "product",
    eyebrow: "BAOBAB FACE CARE",
    title: "Baobab Cleansing Wash (100 ml)",
    description: "Part of a complementary face-care selection with the hydrating cream and serum.",
    href: "https://www.pureessenceapothecary.com/product/109",
    action: "View product",
  },
  {
    id: "hydrating-cream",
    kind: "product",
    eyebrow: "BAOBAB FACE CARE",
    title: "Baobab Hydrating Cream (50 ml)",
    description: "Part of a complementary baobab face-care selection for everyday routines.",
    href: "https://www.pureessenceapothecary.com/product/108",
    action: "View product",
  },
  {
    id: "body-lotion",
    kind: "product",
    eyebrow: "BAOBAB BODY CARE",
    title: "Baobab Body Lotion (250 ml)",
    description: "A moisturising option in the profile’s baobab body-care range.",
    href: "https://www.pureessenceapothecary.com/product/107",
    action: "View product",
  },
  {
    id: "hair-scalp-care",
    kind: "product",
    eyebrow: "HAIR & SCALP CARE",
    title: "Care for hair and scalp.",
    description: "Moringa Hair Shampoo and Hair Growth Super Hair Food complement Mongongo Oil for hair and skin care.",
    href: SHOP_URL,
    action: "Browse the range",
  },
  {
    id: "circular-production",
    kind: "campaign",
    eyebrow: "CIRCULAR PRODUCTION",
    title: "More value from forest fruits and nuts.",
    description: "Baobab and mongongo oils support personal-care formulations; husks can become activated charcoal for soap and body scrubs.",
    href: SHOP_URL,
    action: "Explore the range",
  },
];

const locations = [
  {
    title: "Carousel Mall",
    detail: "Shop #04 · Lusaka",
    fullAddress: "Shop #04, Carousel Mall, Lusaka, Zambia",
    mapQuery: "Shop #04 Carousel Mall, Lusaka, Zambia",
  },
  {
    title: "Genesis Center",
    detail: "Next to old Zambeef · Chilanga",
    fullAddress: "Genesis Center, next to old Zambeef, Chilanga, Lusaka, Zambia",
    mapQuery: "Genesis Center, Chilanga, Lusaka, Zambia",
  },
];

function profileUrl() {
  return new URL(window.location.pathname, window.location.origin).toString();
}

function saveContact() {
  const vCard = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "FN:Pure Essence Apothecary",
    "ORG:Pure Essence Apothecary",
    `TEL;TYPE=WORK,VOICE:${PHONE_E164}`,
    `EMAIL;TYPE=WORK:${EMAIL}`,
    `URL:${WEBSITE_URL}`,
    "ADR;TYPE=WORK:;;Shop #04, Carousel Mall;Lusaka;;;Zambia",
    "ADR;TYPE=WORK:;;Genesis Center, next to old Zambeef;Chilanga, Lusaka;;;Zambia",
    "END:VCARD",
  ].join("\r\n");

  const url = URL.createObjectURL(new Blob([vCard], { type: "text/vcard;charset=utf-8" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "pure-essence-apothecary.vcf";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function Home() {
  const [qrOpen, setQrOpen] = useState(false);
  const [qrData, setQrData] = useState("");
  const [qrError, setQrError] = useState(false);
  const [notice, setNotice] = useState("");
  const [activeShowcaseIndex, setActiveShowcaseIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const [isShowcaseHovered, setIsShowcaseHovered] = useState(false);
  const [isShowcaseFocused, setIsShowcaseFocused] = useState(false);
  const activeSlide = SHOWCASE_SLIDES[activeShowcaseIndex];

  function showPreviousSlide() {
    setActiveShowcaseIndex((index) => (index - 1 + SHOWCASE_SLIDES.length) % SHOWCASE_SLIDES.length);
  }

  function showNextSlide() {
    setActiveShowcaseIndex((index) => (index + 1) % SHOWCASE_SLIDES.length);
  }

  function handleShowcaseBlur(event: FocusEvent<HTMLElement>) {
    const nextTarget = event.relatedTarget;
    if (nextTarget instanceof Node && event.currentTarget.contains(nextTarget)) return;
    setIsShowcaseFocused(false);
  }

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (!isAutoPlaying || isShowcaseHovered || isShowcaseFocused || prefersReducedMotion) return;

    const timer = window.setInterval(showNextSlide, 6800);
    return () => window.clearInterval(timer);
  }, [activeShowcaseIndex, isAutoPlaying, isShowcaseHovered, isShowcaseFocused]);

  useEffect(() => {
    if (!qrOpen) return;

    let active = true;
    setQrData("");
    setQrError(false);
    QRCode.toDataURL(profileUrl(), {
      width: 360,
      margin: 2,
      errorCorrectionLevel: "H",
      color: { dark: "#662609", light: "#fffdf8" },
    })
      .then((data) => active && setQrData(data))
      .catch(() => active && setQrError(true));

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setQrOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      active = false;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [qrOpen]);

  async function shareProfile() {
    const url = profileUrl();
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Pure Essence Apothecary",
          text: "Pure Essence Apothecary — premium beauty and skincare in Lusaka and Chilanga.",
          url,
        });
        return;
      }
      await navigator.clipboard.writeText(url);
      setNotice("Profile link copied");
    } catch {
      setNotice("Use your browser’s share option to send this page");
    }
    window.setTimeout(() => setNotice(""), 2400);
  }

  return (
    <main className="quick-page">
      <div className="quick-layout">
      <article className="contact-card">
        <header className="brand-row">
          <img
            className="brand-logo"
            src="/manus-storage/pure-essence-logo_3c5afcd8.png"
            alt="Pure Essence Apothecary logo"
          />
          <div className="brand-copy">
            <p className="brand-kicker">PURE ESSENCE APOTHECARY</p>
            <h1>Start your glow journey.</h1>
            <p className="brand-subtitle">Premium makeup &amp; skincare · Since 2019</p>
          </div>
        </header>

        <div className="hero-photo" role="img" aria-label="Pure Essence Apothecary beauty and skincare">
          <img src="/manus-storage/hero-glow_144106cd.webp" alt="Smiling woman enjoying her skincare routine" />
          <span>Beauty that feels like you.</span>
        </div>

        <a className="shop-button" href={SHOP_URL} target="_blank" rel="noreferrer">
          <ShoppingBag size={18} aria-hidden="true" />
          <span>Shop online</span>
          <ArrowUpRight size={17} aria-hidden="true" />
        </a>

        <section className="contact-actions" aria-label="Contact Pure Essence Apothecary">
          <a className="contact-button whatsapp-button" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            <MessageCircle size={19} aria-hidden="true" /> WhatsApp
          </a>
          <a className="contact-button" href={`tel:${PHONE_E164}`}>
            <Phone size={18} aria-hidden="true" /> Call
          </a>
          <a className="contact-button" href={`mailto:${EMAIL}`}>
            <Mail size={18} aria-hidden="true" /> Email
          </a>
        </section>
        <p className="phone-line">{PHONE_DISPLAY} <span>·</span> {EMAIL}</p>

        <section className="location-block" aria-labelledby="locations-title">
          <div className="section-heading">
            <h2 id="locations-title">Visit us</h2>
            <span>Lusaka &amp; Chilanga</span>
          </div>
          <div className="location-list">
            {locations.map((location) => (
              <a
                className="location-row"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.mapQuery)}`}
                target="_blank"
                rel="noreferrer"
                key={location.title}
                aria-label={`${location.title}, ${location.fullAddress}. Open directions in Google Maps`}
              >
                <MapPin size={18} aria-hidden="true" />
                <span><strong>{location.title}</strong><small>{location.detail}</small></span>
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            ))}
          </div>
          <p className="hours-line"><strong>Hours</strong> Mon–Fri 9am–6pm <span>·</span> Sat 10am–4pm <span>·</span> Sun closed</p>
        </section>

        <section className="profile-tools" aria-label="Save and share this profile">
          <button type="button" onClick={saveContact}><span className="tool-icon">v</span>Save contact</button>
          <button type="button" onClick={shareProfile}><Share2 size={17} aria-hidden="true" />Share</button>
          <button type="button" onClick={() => setQrOpen(true)}><QrCode size={17} aria-hidden="true" />QR code</button>
        </section>
        {notice && <p className="notice" role="status">{notice}</p>}

        <footer className="card-footer">
          <span>Find us on</span>
          <div className="social-links">
            <a href={SOCIALS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={18} /></a>
            <a href={SOCIALS.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook size={18} /></a>
          </div>
          <span className="footer-location">Zambia</span>
        </footer>
      </article>

      <section
        className="product-showcase"
        aria-labelledby="showcase-title"
        onMouseEnter={() => setIsShowcaseHovered(true)}
        onMouseLeave={() => setIsShowcaseHovered(false)}
        onFocusCapture={() => setIsShowcaseFocused(true)}
        onBlurCapture={handleShowcaseBlur}
      >
        <div className="showcase-heading">
          <div>
            <p>NATURE’S KISS · PURE ESSENCE APOTHECARY</p>
            <h2 id="showcase-title">Care for everyday routines.</h2>
          </div>
          <span className="showcase-count" aria-live="off">
            {String(activeShowcaseIndex + 1).padStart(2, "0")} / {String(SHOWCASE_SLIDES.length).padStart(2, "0")}
          </span>
        </div>

        <a
          key={activeSlide.id}
          className={`showcase-slide ${activeSlide.kind}-slide${activeSlide.image ? " has-photo" : ""}`}
          href={activeSlide.href}
          target="_blank"
          rel="noreferrer"
        >
          {activeSlide.image && (
            <div className="showcase-photo">
              <img src={activeSlide.image} alt={activeSlide.imageAlt ?? activeSlide.title} />
            </div>
          )}
          <div className="showcase-copy">
            <p className="showcase-kicker">{activeSlide.eyebrow}</p>
            <h3>{activeSlide.title}</h3>
            <p className="showcase-description">{activeSlide.description}</p>
            <span className="showcase-cta">{activeSlide.action} <ArrowUpRight size={15} aria-hidden="true" /></span>
          </div>
        </a>

        <div className="showcase-controls" aria-label="Product and brand feature controls">
          <div className="showcase-dots" aria-label="Choose a product or brand feature">
            {SHOWCASE_SLIDES.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                aria-label={`Show ${slide.title}`}
                aria-pressed={index === activeShowcaseIndex}
                onClick={() => setActiveShowcaseIndex(index)}
              />
            ))}
          </div>
          <div className="showcase-buttons">
            <button type="button" aria-label="Previous slide" onClick={showPreviousSlide}><ChevronLeft size={18} /></button>
            <button
              type="button"
              className="showcase-toggle"
              aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
              aria-pressed={!isAutoPlaying}
              onClick={() => setIsAutoPlaying((playing) => !playing)}
            >
              {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button type="button" aria-label="Next slide" onClick={showNextSlide}><ChevronRight size={18} /></button>
          </div>
        </div>
      </section>
      </div>

      <div className="mobile-bar" aria-label="Quick contact actions">
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"><MessageCircle size={18} />WhatsApp</a>
        <a href={`tel:${PHONE_E164}`}><Phone size={18} />Call</a>
        <a href={SHOP_URL} target="_blank" rel="noreferrer"><ShoppingBag size={18} />Shop</a>
      </div>

      {qrOpen && (
        <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setQrOpen(false)}>
          <section className="qr-modal" role="dialog" aria-modal="true" aria-labelledby="qr-title">
            <button className="modal-close" type="button" onClick={() => setQrOpen(false)} aria-label="Close QR code"><X size={20} /></button>
            <QrCode className="modal-qr-icon" size={25} aria-hidden="true" />
            <h2 id="qr-title">Share this profile</h2>
            <p>Scan to open Pure Essence Apothecary.</p>
            <div className="qr-frame">
              {qrData ? <img src={qrData} alt="QR code for this Pure Essence Apothecary profile" /> : qrError ? <span>QR code unavailable. Please try again.</span> : <span>Preparing QR code…</span>}
            </div>
            {qrData && <a className="download-qr" href={qrData} download="pure-essence-apothecary-qr.png">Download QR code <ArrowDown size={16} /></a>}
            <button className="close-text" type="button" onClick={() => setQrOpen(false)}>Close</button>
          </section>
        </div>
      )}
    </main>
  );
}
