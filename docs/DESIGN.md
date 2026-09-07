# SynapseAI Dual-Theme Design System Specification

**Version:** 1.0.0  
**Project:** SynapseAI  
**Framework:** React Native CLI (TypeScript)  
**Target:** Light Mode & Dark Mode Adaptive UI  

---

## 1. Overview

**SynapseAI** features a futuristic, highly polished mobile interface optimized for both **Light Mode** and **Dark Mode** environments. The design language blends modern glassmorphic surface elevation, generous rounded corners (`24px` cards, `50px` pills), responsive color tokens, and smooth micro-interactions.

---

## 2. Dual-Theme Color Palettes

### 2.1 Theme Matrix Overview

| Semantic Token | Light Mode (`light`) | Dark Mode (`dark`) | Usage / Application |
|---|---|---|---|
| **`canvas`** | `#F8FAFC` (Slate 50) | `#0F172A` (Midnight Slate 900) | Root screen background floor |
| **`surface-1`** | `#FFFFFF` (Pure White) | `#1E293B` (Slate 800) | Primary cards, message containers, composer |
| **`surface-2`** | `#F1F5F9` (Slate 100) | `#334155` (Slate 700) | Secondary surfaces, item hover/press state |
| **`border`** | `#E2E8F0` (Slate 200) | `#334155` (Slate 700 / `rgba(255,255,255,0.1)`) | Hairline card borders & dividers |
| **`primary`** | `#0284C7` (Sky 600) | `#38BDF8` (Sky 400) | Primary CTA buttons, brand badges, active icons |
| **`primary-glow`** | `rgba(2, 132, 199, 0.15)` | `rgba(56, 189, 248, 0.2)` | Glowing focus rings & drop shadows |
| **`text-primary`** | `#0F172A` (Slate 900) | `#F8FAFC` (Slate 50) | Main headings, body text, active state text |
| **`text-secondary`** | `#64748B` (Slate 500) | `#94A3B8` (Slate 400) | Subtitles, secondary labels, metadata |
| **`text-muted`** | `#94A3B8` (Slate 400) | `#64748B` (Slate 500) | Placeholders, timestamps, disabled labels |
| **`bubble-in`** | `#FFFFFF` (White) | `#1E293B` (Slate 800) | Incoming AI message bubble background |
| **`bubble-in-border`** | `#E2E8F0` (Slate 200) | `#334155` (Slate 700) | Incoming message bubble outline |
| **`bubble-in-text`** | `#0F172A` (Slate 900) | `#F8FAFC` (Slate 50) | Text inside incoming message bubble |
| **`bubble-out`** | `#E0F2FE` (Sky 100) | `#0369A1` (Sky 700) | Outgoing User message bubble background |
| **`bubble-out-text`** | `#0369A1` (Sky 700) | `#F0F9FF` (Sky 50) | Text inside outgoing message bubble |
| **`status-online`** | `#10B981` (Emerald 500) | `#34D399` (Emerald 400) | AI online status indicator badge |
| **`status-error`** | `#EF4444` (Red 500) | `#F87171` (Red 400) | Error banners, failed upload indicator |

---

## 3. Light Mode Specification

* **Page Canvas:** Clean `#F8FAFC` off-white canvas eliminating harsh display glare.
* **Surface Containers:** `#FFFFFF` white cards with subtle hairline borders (`#E2E8F0`) and soft ambient shadows (`shadowColor: "#000"`, `shadowOpacity: 0.08`, `shadowRadius: 16`).
* **Outgoing Bubbles:** Soft sky tint (`#E0F2FE`) paired with crisp deep sky text (`#0369A1`), creating a comfortable conversational contrast without overwhelming the eyes.
* **CTAs & Accents:** Vibrant Sky 600 (`#0284C7`) pills with high-legibility white text.

---

## 4. Dark Mode Specification

* **Page Canvas:** Midnight Slate (`#0F172A`) floor designed for OLED contrast and low-light readability.
* **Surface Containers:** Slate 800 (`#1E293B`) cards with subtle top highlight borders (`#334155`) for glassmorphic depth.
* **Outgoing Bubbles:** Deep Sky 700 (`#0369A1`) paired with bright white-sky text (`#F0F9FF`).
* **CTAs & Accents:** Bright Sky 400 (`#38BDF8`) elements with deep slate text or high-contrast icons.
* **Glow Effects:** Soft cyan/sky radial glow behind key interactive targets.

---

## 5. Typography System

The typography scale uses system sans-serif (`Inter`, `-apple-system`, `Roboto`) with distinct weight and size hierarchies:

| Variant | Size | Weight | Line Height | Application |
|---|---|---|---|---|
| **`display-xl`** | `32px` | `700` (Bold) | `38px` | Main titles, hero headings |
| **`display-lg`** | `26px` | `700` (Bold) | `32px` | Screen header titles |
| **`heading-md`** | `20px` | `600` (SemiBold) | `26px` | Section titles, modal headers |
| **`heading-sm`** | `16px` | `600` (SemiBold) | `22px` | Sub-headers, button text |
| **`body-lg`** | `16px` | `400` (Regular) | `24px` | Primary chat messages, body text |
| **`body-md`** | `14px` | `400` (Regular) | `20px` | Secondary text, input fields |
| **`caption`** | `12px` | `500` (Medium) | `16px` | Timestamps, status indicators |
| **`micro`** | `10px` | `500` (Medium) | `14px` | Small badges, file size tags |

---

## 6. Shape & Corner Radius Scale

SynapseAI avoids sharp corners (`4px` / `8px`) in favor of generous curves and pill silhouettes:

* **`radius.none` (`0px`):** Full-bleed screen backgrounds.
* **`radius.sm` (`12px`):** Small badges, tag pills, media thumbnails.
* **`radius.bubble` (`18px`):** Chat message bubbles (with trailing anchor corner set to `4px`).
* **`radius.card` (`24px`):** Primary surface cards, preview modal containers, upload cards.
* **`radius.pill` (`50px`):** Buttons, composer input field, search bars.
* **`radius.full` (`50%` / `9999px`):** User & AI avatars, circular icon buttons, status indicator dots.

---

## 7. Component Style Token Reference

### 7.1 `ChatHeader`
* **Background:** Canvas fill (`#F8FAFC` light / `#0F172A` dark) with bottom border (`#E2E8F0` / `#334155`).
* **Title:** `display-lg` (`26px` / `700`) in `text-primary`.
* **Subtitle / Status:** `caption` (`12px` / `500`) in `text-secondary` with a `8px` `status-online` dot.

### 7.2 `MessageBubble`
* **Incoming (AI):** Surface fill (`#FFFFFF` / `#1E293B`), `1px` border (`#E2E8F0` / `#334155`), `radius.bubble` (`18px`), text in `text-primary`.
* **Outgoing (User):** Tint fill (`#E0F2FE` light / `#0369A1` dark), `radius.bubble` (`18px`), text in `bubble-out-text`.

### 7.3 `Composer`
* **Container:** Surface fill (`#FFFFFF` / `#1E293B`), `radius.pill` (`50px`), `1px` border (`#E2E8F0` / `#334155`).
* **Input Text:** `body-lg` (`16px`), placeholder in `text-muted`.
* **Send Button:** `primary` fill (`#0284C7` / `#38BDF8`), circular (`44px` diameter).

### 7.4 `ButtonPrimary`
* **Fill:** `primary` color (`#0284C7` light / `#38BDF8` dark).
* **Text:** `#FFFFFF` in Light Mode / `#0F172A` in Dark Mode, `heading-sm` (`16px` / `600`).
* **Radius:** `radius.pill` (`50px`).

### 7.5 `ButtonSecondary`
* **Fill:** Surface-2 (`#F1F5F9` light / `#334155` dark).
* **Text:** `text-primary` (`#0F172A` light / `#F8FAFC` dark).
* **Radius:** `radius.pill` (`50px`).

---

## 8. Do's and Don'ts

### Do's
* **Do** use `useColorScheme()` or `useTheme()` hook to dynamically switch tokens between Light and Dark mode.
* **Do** maintain high contrast ratios (minimum 4.5:1) for all body text against card and canvas backgrounds.
* **Do** apply generous padding (`16px` to `24px`) inside cards to maintain a spacious, uncluttered aesthetic.
* **Do** round interactive buttons to `50px` pill shapes and main containers to `24px`.

### Don'ts
* **Don't** hardcode raw hex values in individual component files — always reference theme tokens.
* **Don't** use stark pure black (`#000000`) for dark mode background floor; use Midnight Slate (`#0F172A`) for a more premium look.
* **Don't** mix sharp `4px` or `8px` radii into main card containers.
* **Don't** drop harsh heavy black drop shadows in dark mode; use subtle border highlights and soft glowing shadows instead.
