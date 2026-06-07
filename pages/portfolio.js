import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { translations } from '../lib/translations';

// ─── Language detection ──────────────────────────────────────────────────────
function detectLanguage() {
  if (typeof navigator === 'undefined') return 'en';
  const langs = navigator.languages || [navigator.language || 'en'];
  for (const l of langs) {
    if (l.toLowerCase().startsWith('pt')) return 'pt';
  }
  return 'en';
}

function Navbar({ t, lang, setLang, menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <Link href="/" className="nav-logo">
        <img src="/claytoon-logo-transparent.png" alt="Claytoon Studio" />
      </Link>

      <button
        className="hamburger"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`nav-menu${menuOpen ? ' open' : ''}`}>
        <ul className="nav-links">
          <li><Link href="/#services" onClick={() => setMenuOpen(false)}>{t.nav.services}</Link></li>
          <li><Link href="/portfolio" onClick={() => setMenuOpen(false)}>{t.nav.portfolio}</Link></li>
          <li><Link href="/#why" onClick={() => setMenuOpen(false)}>{t.nav.about}</Link></li>
        </ul>

        <div className="nav-right nav-cta-wrap">
          <div className="lang-toggle">
            <button
              className={`lang-btn${lang === 'en' ? ' active' : ''}`}
              onClick={() => setLang('en')}
            >
              EN
            </button>
            <button
              className={`lang-btn${lang === 'pt' ? ' active' : ''}`}
              onClick={() => setLang('pt')}
            >
              PT
            </button>
          </div>
          <Link href="/#quote" className="nav-links a nav-cta" onClick={() => setMenuOpen(false)}>
            {t.nav.getQuote}
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Footer({ t }) {
  const f = t.footer;
  const currentYear = new Date().getFullYear();
  const copyText = f.copy.replace("2025", currentYear);
  return (
    <footer>
      <p><strong>Claytoon Studio</strong></p>
      <p>{f.tagline}</p>
      <p style={{ marginTop: 8 }}>{copyText}</p>
    </footer>
  );
}

export default function Portfolio() {
  const [lang, setLang] = useState('en');
  const [menuOpen, setMenuOpen] = useState(false);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLang(detectLanguage());
  }, []);

  useEffect(() => {
    fetch('/api/portfolio')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        setVideos(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const t = translations[lang];
  const p = t.portfolioPage;

  return (
    <>
      <Head>
        <title>{p.title} — Claytoon Studio</title>
        <meta name="description" content={p.subtitle} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </Head>

      <Navbar
        t={t}
        lang={lang}
        setLang={setLang}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <main className="portfolio-page">
        <div className="portfolio-header">
          <Link href="/" className="portfolio-back-btn">
            <i className="fa-solid fa-arrow-left"></i> {p.backHome}
          </Link>
          <h1 className="portfolio-title">{p.title}</h1>
          <p className="portfolio-subtitle">{p.subtitle}</p>
        </div>

        {loading && (
          <div className="portfolio-grid">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="portfolio-card skeleton">
                <div className="portfolio-thumb-wrap shimmer" />
                <div className="portfolio-content">
                  <div className="shimmer skeleton-title" />
                  <div className="shimmer skeleton-text" />
                  <div className="shimmer skeleton-text short" />
                  <div className="shimmer skeleton-btn" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="portfolio-error-state">
            <i className="fa-solid fa-triangle-exclamation error-icon"></i>
            <p>{p.error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="portfolio-grid">
            {videos.map((vid) => (
              <a
                key={vid.id}
                href={vid.youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="portfolio-card"
              >
                <div className="portfolio-thumb-wrap">
                  <img src={vid.thumbnail} alt={vid.title} loading="lazy" />
                  <div className="portfolio-play-overlay">
                    <div className="play-button">
                      <i className="fa-solid fa-play"></i>
                    </div>
                  </div>
                </div>
                <div className="portfolio-content">
                  <h3 className="portfolio-card-title">{vid.title}</h3>
                  <p className="portfolio-card-desc">{vid.description}</p>
                  <span className="portfolio-card-btn">
                    <i className="fa-brands fa-youtube"></i> {p.watchYoutube}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </main>

      <Footer t={t} />
    </>
  );
}
