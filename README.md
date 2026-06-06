# 🎨 Claytoon Studio — Landing Page

A colourful, animated Next.js landing page for Claytoon Studio — bilingual (EN/PT) with auto language detection.

## 🚀 Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Add the logo
Copy your logo image file to:
```
public/logo.png
```
(The attached `1780709963712_image.png` → rename/copy to `public/logo.png`)

### 3. Run development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### 4. Build for production
```bash
npm run build
npm start
```

---

## 🌍 Language Detection

The page automatically detects the visitor's browser language (`navigator.languages`):
- If Portuguese is detected → PT version loads
- Otherwise → EN version loads

Users can also manually switch via the **EN | PT** toggle in the navbar.

---

## 📬 Form Integration

The quote form currently simulates submission. To make it live, replace the `handleSubmit` function in `pages/index.js` with one of these options:

### Option A — Formspree (easiest, free tier available)
```js
const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(form),
});
if (res.ok) setStatus('success'); else setStatus('error');
```

### Option B — Your own API route
Create `pages/api/contact.js`:
```js
export default async function handler(req, res) {
  // Send email via Nodemailer, SendGrid, Resend, etc.
  res.status(200).json({ ok: true });
}
```

---

## 📁 Project Structure

```
claytoon/
├── lib/
│   └── translations.js    ← All EN/PT copy
├── pages/
│   ├── _app.js
│   ├── _document.js
│   └── index.js           ← Main landing page
├── public/
│   └── logo.png           ← ← Add your logo here!
├── styles/
│   └── globals.css        ← All styles
└── package.json
```

---

## 🎨 Customisation

- **Colours**: Edit CSS variables at the top of `styles/globals.css`
- **Copy/Text**: Edit `lib/translations.js`
- **Services/Sections**: All in `pages/index.js`
- **Contact email**: Update in `lib/translations.js` → `contact.email`

---

## 📦 Deploy

### Vercel (recommended — free)
```bash
npx vercel
```

### Netlify
```bash
npm run build
# Upload the `.next` folder
```
