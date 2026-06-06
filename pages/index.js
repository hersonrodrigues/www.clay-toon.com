import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
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

// ─── Scroll reveal hook ──────────────────────────────────────────────────────
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  });
}

// ─── Components ──────────────────────────────────────────────────────────────

function Navbar({ t, lang, setLang, menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`}>
      <a href="#" className="nav-logo">
        <img src="/logo.png" alt="Claytoon Studio" />
      </a>

      <button
        className="hamburger"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>

      <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
        <li><a href="#services" onClick={() => setMenuOpen(false)}>{t.nav.services}</a></li>
        <li><a href="#process" onClick={() => setMenuOpen(false)}>{t.nav.portfolio}</a></li>
        <li><a href="#why" onClick={() => setMenuOpen(false)}>{t.nav.about}</a></li>
        <li><a href="#contact" onClick={() => setMenuOpen(false)}>{t.nav.contact}</a></li>
      </ul>

      <div className={`nav-right${menuOpen ? ' open' : ''} nav-cta-wrap`}>
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
        <a href="#quote" className="nav-links a nav-cta" onClick={() => setMenuOpen(false)}>
          {t.nav.getQuote}
        </a>
      </div>
    </nav>
  );
}

function Hero({ t }) {
  return (
    <section className="hero" id="home">
      <div className="hero-bg">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>
      <div className="hero-content">
        <img src="/logo.png" alt="Claytoon" className="hero-logo" />
        <h1 className="hero-tagline">{t.hero.tagline}</h1>
        <p className="hero-subtitle">{t.hero.subtitle}</p>
        <div className="hero-btns">
          <a href="#quote" className="btn-primary">
            ✨ {t.hero.cta}
          </a>
          <a href="#services" className="btn-secondary">
            {t.hero.ctaSecondary} →
          </a>
        </div>
      </div>
    </section>
  );
}

function Services({ t }) {
  return (
    <section className="services" id="services">
      <h2 className="section-title reveal">{t.services.title}</h2>
      <p className="section-subtitle reveal">{t.services.subtitle}</p>
      <div className="services-grid">
        {t.services.items.map((s, i) => (
          <div key={i} className="service-card reveal" style={{ transitionDelay: `${i * 0.12}s` }}>
            <span className="service-emoji">{s.emoji}</span>
            <span className="service-tag">{s.tag}</span>
            <h3 className="service-title">{s.title}</h3>
            <p className="service-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Process({ t }) {
  return (
    <section className="process" id="process">
      <h2 className="section-title reveal">{t.process.title}</h2>
      <div className="process-steps">
        {t.process.steps.map((s, i) => (
          <div key={i} className="process-step reveal" style={{ transitionDelay: `${i * 0.15}s` }}>
            <div className="step-num">{s.num}</div>
            <div className="step-label">{s.label}</div>
            <div className="step-desc">{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Why({ t }) {
  return (
    <section className="why" id="why">
      <h2 className="section-title reveal">{t.why.title}</h2>
      <div className="why-grid">
        {t.why.items.map((item, i) => (
          <div key={i} className="why-card reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
            <span className="why-icon">{item.icon}</span>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function QuoteForm({ t }) {
  const [form, setForm] = useState({
    name: '', email: '', company: '', service: '', budget: '', message: '',
  });
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate form submission (replace with your backend / Formspree / EmailJS)
    await new Promise((r) => setTimeout(r, 1400));
    // For a real form: POST to /api/contact or a third-party service
    setStatus('success');
    setForm({ name: '', email: '', company: '', service: '', budget: '', message: '' });
  };

  const qt = t.quote;

  return (
    <section className="quote" id="quote">
      <div className="quote-wrapper">
        <h2 className="section-title reveal">{qt.title}</h2>
        <p className="section-subtitle reveal">{qt.subtitle}</p>
        <div className="quote-form reveal">
          <form onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label>{qt.name} *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={update('name')}
                  placeholder="Jane Silva"
                />
              </div>
              <div className="form-group">
                <label>{qt.email} *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={update('email')}
                  placeholder="jane@brand.com"
                />
              </div>
            </div>
            <div className="form-group">
              <label>{qt.company}</label>
              <input
                type="text"
                value={form.company}
                onChange={update('company')}
                placeholder="Acme Corp"
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>{qt.service} *</label>
                <select required value={form.service} onChange={update('service')}>
                  <option value="">—</option>
                  {qt.serviceOptions.map((o, i) => (
                    <option key={i} value={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>{qt.budget}</label>
                <select value={form.budget} onChange={update('budget')}>
                  <option value="">—</option>
                  {qt.budgetOptions.map((o, i) => (
                    <option key={i} value={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>{qt.message}</label>
              <textarea
                value={form.message}
                onChange={update('message')}
                placeholder="..."
              />
            </div>
            <button
              type="submit"
              className="form-submit"
              disabled={status === 'sending' || status === 'success'}
            >
              {status === 'sending' ? qt.sending : qt.submit}
            </button>
            {status === 'success' && (
              <div className="form-message success">{qt.success}</div>
            )}
            {status === 'error' && (
              <div className="form-message error">{qt.error}</div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function ContactStrip({ t }) {
  const c = t.contact;
  return (
    <div className="contact-strip" id="contact">
      <h2 className="section-title" style={{ marginBottom: 32 }}>{c.title}</h2>
      <div className="contact-items">
        <div className="contact-item">
          <span style={{ fontSize: '1.4rem' }}>✉️</span>
          <a href={`mailto:${c.email}`}>{c.email}</a>
        </div>
        <div className="contact-item">
          <span style={{ fontSize: '1.4rem' }}>📞</span>
          <a href={`tel:${c.phone.replace(/\s/g, '')}`}>{c.phone}</a>
        </div>
        <div className="contact-item">
          <span style={{ fontSize: '1.4rem' }}>📍</span>
          <span>{c.location}</span>
        </div>
      </div>
    </div>
  );
}

function Footer({ t }) {
  const f = t.footer;
  return (
    <footer>
      <p><strong>Claytoon Studio</strong></p>
      <p>{f.tagline}</p>
      <p style={{ marginTop: 8 }}>{f.copy}</p>
    </footer>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  const [lang, setLang] = useState('en');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setLang(detectLanguage());
  }, []);

  useReveal();

  const t = translations[lang];

  return (
    <>
      <Head>
        <title>Claytoon Studio — {lang === 'pt' ? 'Animação & Vídeos' : 'Animation & Video'}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar
        t={t}
        lang={lang}
        setLang={setLang}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      <Hero t={t} />
      <Services t={t} />
      <Process t={t} />
      <Why t={t} />
      <QuoteForm t={t} />
      <ContactStrip t={t} />
      <Footer t={t} />
    </>
  );
}
