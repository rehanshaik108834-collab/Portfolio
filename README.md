# Rehan Shaik — Portfolio

An ultra-modern, highly interactive personal portfolio engineered for the modern web. Built with a distinctive Neo-Brutalist aesthetic, this project leverages bleeding-edge web technologies to deliver an Awwwards-caliber user experience, complete with 3D rendering, physics-based smooth scrolling, and complex scroll-triggered animations.

---

## ✨ Key Features

- **Advanced 3D Work Gallery:** Features a bespoke `Three.js` integration rendering floating 3D typography along dynamic splines, perfectly synchronized with horizontal GSAP scroll pinning.
- **Neo-Brutalist Design System:** High-contrast, monochromatic layouts with striking, oversized typography and fluid, responsive scaling.
- **Physics-Based Smooth Scrolling:** Integrated `@studio-freight/lenis` for buttery-smooth, momentum-based vertical scrolling that overrides native browser jank.
- **Serverless Contact System:** Form submissions are routed instantly via the **Web3Forms API**, eliminating the need for a dedicated backend.
- **Parallax Section Choreography:** Sections are orchestrated using a custom `<ParallaxSection>` wrapper, allowing them to fluidly slide over one another based on z-index mapping.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript + Vite
- **Styling:** Tailwind CSS + Vanilla CSS Modules
- **Animation Engine:** GSAP (GreenSock) + ScrollTrigger
- **Motion UI:** Framer Motion
- **3D Graphics:** Three.js
- **Scroll Hijacking:** Lenis
- **API Integration:** Web3Forms (Contact)

---

## 🏗️ Architecture Overview

The application is structured to decouple complex animation lifecycles from standard React rendering, preventing memory leaks and dropped frames.

```text
├── src/
│   ├── App.tsx                 # Core orchestrator (Lenis & GSAP ticker sync)
│   ├── components/             
│   │   ├── WorkGallery.tsx     # Three.js WebGL canvas + 2D Canvas grid
│   │   ├── Contact.tsx         # Web3Forms API integration
│   │   ├── Skills.tsx          # Framer Motion infinite marquee
│   │   ├── Footer.tsx          # Scroll-driven responsive branding
│   │   ├── ParallaxSection.tsx # Z-index scroll-overlay wrapper
│   │   └── ...
│   ├── styles.css              # Global Neo-Brutalist tokens
```

### Rendering & Performance
- **GSAP & Lenis Sync:** The native GSAP ticker is intercepted and synced with the Lenis requestAnimationFrame (rAF) loop in `App.tsx` to prevent scroll stuttering.
- **Three.js Garbage Collection:** The `WorkGallery` component explicitly disposes of WebGL renderers, geometry, and materials within its `useEffect` cleanup function to ensure flawless hot-reloading and navigation.

---

## 🚀 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rehanshaik108834-collab/Portfolio.git
   cd Portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   *(Note: This includes heavy packages like `three` and `gsap`)*

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173`.

---

## 📖 Usage & Customization Guide

If you wish to fork or adapt this portfolio, here is how you can customize the core modules:

### 1. Updating the Work Gallery
Navigate to `components/WorkGallery.tsx`. Locate the `projects` array at the top of the file. You can swap out the images, titles, and unique identification codes here. The GSAP horizontal scroll distance (`moveDistance`) dynamically adapts to the number of cards.

### 2. Modifying Skills
Navigate to `components/Skills.tsx`. The `skillCategories` array allows you to add or remove skills. Icons are optional—if omitted, the component falls back to rendering clean typography.

### 3. Configuring the Contact Form
Navigate to `components/Contact.tsx`. The form uses Web3Forms.
- Get an access key from [Web3Forms](https://web3forms.com/).
- Replace the existing `access_key` in the `handleSubmit` payload with your new key.
- Submissions will automatically route to the email address registered with that key.

---

## 📦 Deployment

This project is optimized for deployment on **Vercel**.
1. Run `npm run build` to compile the Vite production bundle.
2. Link the repository to your Vercel account.
3. Vercel will automatically detect the Vite preset and deploy the `dist/` folder.

---

*Designed and engineered by Rehan Shaik.*
