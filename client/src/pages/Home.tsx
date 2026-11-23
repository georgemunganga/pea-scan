import { useEffect, useState } from "react";
import QRCode from "qrcode";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Clock3,
  Droplets,
  Facebook,
  Heart,
  Leaf,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  QrCode,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  X,
} from "lucide-react";

const SHOP_URL = "https://www.pureessenceapothecary.com/shop";
const WEBSITE_URL = "https://www.pureessenceapothecary.com/";
const PHONE_DISPLAY = "+260 97 7883578";
const PHONE_E164 = "+260977883578";
const EMAIL = "customercare@pureessenceapothecary.com";
const INSTAGRAM_URL = "https://www.instagram.com/apothecary_essence2019/";
const FACEBOOK_URL = "https://www.facebook.com/Beezcraftedsoapandlotions/";
const WHATSAPP_URL =
  "https://wa.me/260977883578?text=Hello%20Pure%20Essence%20Apothecary%2C%20I%27d%20love%20to%20know%20more.";

const locations = [
  {
    name: "Carousel Mall",
    number: "01",
    address: "Shop #04, Carousel Mall, Lusaka, Zambia",
    mapQuery: "Shop #04 Carousel Mall, Lusaka, Zambia",
    note: "Shop No. 1",
  },
  {
    name: "Genesis Center",
    number: "02",
    address: "Genesis Center, next to old Zambeef, Chilanga, Lusaka, Zambia",
    mapQuery: "Genesis Center, Chilanga, Lusaka, Zambia",
    note: "Shop No. 2",
  },
];

const principles = [
  {
    icon: Sparkles,
    title: "Quality first",
    description:
      "Products are chosen for their quality, effectiveness, and care for your skin.",
  },
  {
    icon: Heart,
    title: "Personal care",
    description:
      "A friendly team is here to help you find products for your own beauty needs.",
  },
  {
    icon: ShieldCheck,
    title: "Honest choices",
    description:
      "Clear communication about products, ingredients, and practices matters.",
  },
];

const offerings = [
  {
    icon: Droplets,
    title: "Skincare",
    description: "Thoughtfully selected skincare for your everyday routine.",
  },
  {
    icon: Sparkles,
    title: "Makeup & cosmetics",
    description: "Beauty essentials chosen to help you feel confident in your skin.",
  },
];

function createVCard() {
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
    "NOTE:Premium makeup and skincare products",
    "END:VCARD",
  ].join("\r\n");

  const blob = new Blob([vCard], { type: "text/vcard;charset=utf-8" });
  const downloadUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = downloadUrl;
  anchor.download = "pure-essence-apothecary.vcf";
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(downloadUrl);
}

export default function Home() {
  const [qrOpen, setQrOpen] = useState(false);
  const [qrData, setQrData] = useState("");
  const [qrError, setQrError] = useState(false);
  const [shareMessage, setShareMessage] = useState("");

  useEffect(() => {
    if (!qrOpen) return;

    let active = true;
    setQrData("");
    setQrError(false);
    QRCode.toDataURL(window.location.href, {
      width: 360,
      margin: 2,
      errorCorrectionLevel: "H",
      color: { dark: "#244735", light: "#fffdf8" },
    })
      .then((data) => {
        if (active) setQrData(data);
      })
      .catch(() => {
        if (active) setQrError(true);
      });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setQrOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      active = false;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [qrOpen]);

  async function shareProfile() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Pure Essence Apothecary",
          text: "Discover Pure Essence Apothecary — your trusted partner in beauty and skincare.",
          url,
        });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShareMessage("Link copied");
      window.setTimeout(() => setShareMessage(""), 2200);
    } catch {
      setShareMessage("Please use your browser’s share option");
      window.setTimeout(() => setShareMessage(""), 2600);
    }
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="header-inner page-width">
          <a className="brand-lockup" href="#top" aria-label="Pure Essence Apothecary home">
            <img
              className="brand-logo"
              src="/manus-storage/pure-essence-logo_3c5afcd8.png"
              alt="Pure Essence Apothecary"
            />
          </a>
          <nav className="main-nav" aria-label="Main navigation">
            <a href="#story">Our story</a>
            <a href="#collection">The collection</a>
            <a href="#locations">Find us</a>
          </nav>
          <a className="header-contact" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            <span>Let’s talk</span>
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero-section page-width" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> NATURE’S KISS <span className="eyebrow-divider">/</span> SINCE 2019</div>
            <h1 id="hero-title">
              Start your <em>glow</em> journey today.
            </h1>
            <p className="hero-description">
              Your trusted partner in beauty and skincare. Discover carefully curated cosmetics and skincare selected to help you feel confident in your own skin.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href={SHOP_URL} target="_blank" rel="noreferrer">
                Explore the shop <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <a className="button button-text" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                <MessageCircle size={17} aria-hidden="true" /> Chat with us
              </a>
            </div>
            <div className="hero-footnote">
              <MapPin size={15} aria-hidden="true" /> Two locations in Lusaka &amp; Chilanga
            </div>
          </div>

          <div className="hero-art" aria-label="A woman enjoying her skincare routine">
            <div className="hero-sun" />
            <div className="hero-ring hero-ring-one" />
            <div className="hero-ring hero-ring-two" />
            <div className="hero-art-caption"><Leaf size={14} /> Beauty, naturally you</div>
            <img
              className="hero-person"
              src="/manus-storage/hero-glow_144106cd.webp"
              alt="A smiling woman enjoying her skincare routine"
              fetchPriority="high"
            />
            <div className="hero-seal"><span>GLOW</span><small>from within</small></div>
          </div>
        </section>

        <section className="promise-strip" aria-label="What you can expect">
          <div className="promise-inner page-width">
            <div className="promise-item"><Sparkles size={17} /><span>Premium quality</span></div>
            <span className="promise-separator" aria-hidden="true" />
            <div className="promise-item"><Heart size={17} /><span>Thoughtful care</span></div>
            <span className="promise-separator" aria-hidden="true" />
            <div className="promise-item"><Leaf size={17} /><span>Carefully curated</span></div>
          </div>
        </section>

        <section className="story-section section-space" id="story" aria-labelledby="story-title">
          <div className="page-width story-layout">
            <div className="section-kicker"><span>01</span> THE ESSENCE</div>
            <div className="story-content">
              <h2 id="story-title">Beauty that feels <em>like you.</em></h2>
              <div className="story-columns">
                <p>
                  Pure Essence Apothecary was founded with a simple mission: to bring you quality cosmetics and skincare that enhance your natural beauty. We believe everyone deserves to feel confident and beautiful in their own skin.
                </p>
                <p>
                  Each product is selected with care, bringing together thoughtful beauty wisdom and modern innovation. From your daily routine to a little extra glow, we’re here to help you find what feels right for you.
                </p>
              </div>
              <a className="inline-link" href={WEBSITE_URL + "about"} target="_blank" rel="noreferrer">
                Read our story <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="page-width principles-grid">
            {principles.map(({ icon: Icon, title, description }, index) => (
              <article className="principle-card" key={title}>
                <div className="principle-topline"><span>0{index + 1}</span><Icon size={19} aria-hidden="true" /></div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="collection-section section-space" id="collection" aria-labelledby="collection-title">
          <div className="page-width collection-layout">
            <div className="collection-copy">
              <div className="section-kicker"><span>02</span> YOUR ROUTINE</div>
              <h2 id="collection-title">A little care.<br /><em>A lot of glow.</em></h2>
              <p>Explore premium makeup and skincare, thoughtfully chosen for your beauty routine.</p>
              <a className="button button-dark" href={SHOP_URL} target="_blank" rel="noreferrer">
                Browse all products <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
            <div className="offering-list">
              {offerings.map(({ icon: Icon, title, description }, index) => (
                <a className="offering-card" href={SHOP_URL} target="_blank" rel="noreferrer" key={title}>
                  <span className="offering-index">0{index + 1}</span>
                  <span className="offering-icon"><Icon size={22} aria-hidden="true" /></span>
                  <span className="offering-copy"><strong>{title}</strong><small>{description}</small></span>
                  <ArrowUpRight className="offering-arrow" size={18} aria-hidden="true" />
                </a>
              ))}
              <div className="collection-note"><ShoppingBag size={17} /> Shop online for the full current collection and availability.</div>
            </div>
          </div>
        </section>

        <section className="location-section section-space" id="locations" aria-labelledby="location-title">
          <div className="page-width location-header">
            <div>
              <div className="section-kicker"><span>03</span> COME SAY HELLO</div>
              <h2 id="location-title">Find us <em>near you.</em></h2>
            </div>
            <p>Visit us in Lusaka or Chilanga. We’d love to help you find your next favourite.</p>
          </div>
          <div className="page-width location-grid">
            {locations.map((location) => (
              <article className="location-card" key={location.name}>
                <div className="location-card-head">
                  <span className="location-number">{location.number}</span>
                  <span className="location-note">{location.note}</span>
                </div>
                <h3>{location.name}</h3>
                <p className="location-address"><MapPin size={16} aria-hidden="true" /> {location.address}</p>
                <a
                  className="location-directions"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.mapQuery)}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Get directions <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </article>
            ))}
          </div>
          <div className="page-width hours-row">
            <div className="hours-heading"><Clock3 size={17} /> Business hours</div>
            <div className="hours-detail"><span>Monday – Friday</span><strong>9:00 am – 6:00 pm</strong></div>
            <div className="hours-detail"><span>Saturday</span><strong>10:00 am – 4:00 pm</strong></div>
            <div className="hours-detail"><span>Sunday</span><strong>Closed</strong></div>
          </div>
        </section>

        <section className="contact-section" id="contact" aria-labelledby="contact-title">
          <div className="page-width contact-layout">
            <div className="contact-copy">
              <div className="section-kicker section-kicker-light"><span>04</span> WE’RE HERE FOR YOU</div>
              <h2 id="contact-title">Let’s find your <em>glow.</em></h2>
              <p>Questions about a product or your order? Get in touch with our team.</p>
            </div>
            <div className="contact-actions">
              <a className="contact-action" href={`tel:${PHONE_E164}`}>
                <span className="contact-action-icon"><Phone size={19} /></span>
                <span><small>Call us</small><strong>{PHONE_DISPLAY}</strong></span>
                <ArrowUpRight size={17} className="contact-action-arrow" />
              </a>
              <a className="contact-action" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                <span className="contact-action-icon"><MessageCircle size={19} /></span>
                <span><small>WhatsApp</small><strong>Chat with our team</strong></span>
                <ArrowUpRight size={17} className="contact-action-arrow" />
              </a>
              <a className="contact-action" href={`mailto:${EMAIL}`}>
                <span className="contact-action-icon"><Mail size={19} /></span>
                <span><small>Email</small><strong>{EMAIL}</strong></span>
                <ArrowUpRight size={17} className="contact-action-arrow" />
              </a>
              <button className="contact-action contact-action-button" type="button" onClick={createVCard}>
                <span className="contact-action-icon"><ContactIcon /></span>
                <span><small>Save our details</small><strong>Add to your contacts</strong></span>
                <ArrowDown size={17} className="contact-action-arrow" />
              </button>
            </div>
          </div>
        </section>

        <section className="share-section page-width" aria-label="Share this company profile">
          <div className="share-copy">
            <span className="share-icon"><QrCode size={22} /></span>
            <div><strong>Keep Pure Essence close.</strong><p>Share this page or save its QR code for later.</p></div>
          </div>
          <div className="share-actions">
            {shareMessage && <span className="share-feedback" role="status">{shareMessage}</span>}
            <button className="button button-outline" type="button" onClick={shareProfile}>
              <Share2 size={16} /> Share page
            </button>
            <button className="button button-primary" type="button" onClick={() => setQrOpen(true)}>
              <QrCode size={16} /> Get QR code
            </button>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="page-width footer-main">
          <div className="footer-brand">
            <a href="#top" aria-label="Back to top">
              <img src="/manus-storage/pure-essence-logo_3c5afcd8.png" alt="Pure Essence Apothecary" />
            </a>
            <p>Premium makeup and skincare for your beauty needs.</p>
            <div className="social-links" aria-label="Social media">
              <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" aria-label="Pure Essence Apothecary on Facebook"><Facebook size={17} /></a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Pure Essence Apothecary on Instagram"><InstagramIcon /></a>
            </div>
          </div>
          <div className="footer-links">
            <strong>Explore</strong>
            <a href={SHOP_URL} target="_blank" rel="noreferrer">Shop the collection <ArrowUpRight size={13} /></a>
            <a href={WEBSITE_URL + "about"} target="_blank" rel="noreferrer">About the brand <ArrowUpRight size={13} /></a>
            <a href={WEBSITE_URL + "order-tracking"} target="_blank" rel="noreferrer">Track an order <ArrowUpRight size={13} /></a>
          </div>
          <div className="footer-links footer-contact">
            <strong>Get in touch</strong>
            <a href={`tel:${PHONE_E164}`}>{PHONE_DISPLAY}</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a href="#locations">Lusaka &amp; Chilanga, Zambia</a>
          </div>
        </div>
        <div className="page-width footer-bottom">
          <span>© {new Date().getFullYear()} Pure Essence Apothecary</span>
          <span>Made for your everyday glow.</span>
        </div>
      </footer>

      <div className="mobile-quick-actions" aria-label="Quick actions">
        <a href={`tel:${PHONE_E164}`} aria-label="Call Pure Essence Apothecary"><Phone size={19} /><span>Call</span></a>
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" aria-label="WhatsApp Pure Essence Apothecary"><MessageCircle size={19} /><span>WhatsApp</span></a>
        <a href={SHOP_URL} target="_blank" rel="noreferrer" aria-label="Shop Pure Essence Apothecary"><ShoppingBag size={19} /><span>Shop</span></a>
      </div>

      {qrOpen && (
        <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && setQrOpen(false)}>
          <section className="qr-modal" role="dialog" aria-modal="true" aria-labelledby="qr-title">
            <button className="modal-close" type="button" onClick={() => setQrOpen(false)} aria-label="Close QR code"><X size={20} /></button>
            <span className="qr-modal-icon"><QrCode size={22} /></span>
            <div className="section-kicker"><span>SHARE THE GLOW</span></div>
            <h2 id="qr-title">Scan to visit our page.</h2>
            <p>Save this code to share the Pure Essence Apothecary profile.</p>
            <div className="qr-image-wrap">
              {qrData ? <img src={qrData} alt="QR code linking to the Pure Essence Apothecary profile" /> : qrError ? <span className="qr-error">We couldn’t create the QR code. Please try again.</span> : <span className="qr-loading">Preparing your QR code…</span>}
            </div>
            {qrData && <a className="button button-primary qr-download" href={qrData} download="pure-essence-apothecary-qr.png">Download QR code <ArrowDown size={16} /></a>}
            <button className="qr-close-text" type="button" onClick={() => setQrOpen(false)}>Close</button>
          </section>
        </div>
      )}
    </div>
  );
}

function ContactIcon() {
  return <span className="contact-icon-letters" aria-hidden="true">v</span>;
}

function InstagramIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none" />
    </svg>
  );
}
