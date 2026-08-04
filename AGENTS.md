# AGENTS.md — MabaGuide Development Directives (v2.0: Neo-Utility Edition)

This document is the absolute source of truth for all AI agents, coding assistants, and developers working on the **MabaGuide** codebase. 

## 1. Core Mandate: The "Neo-Utility" UI Paradigm
MabaGuide is NOT a generic B2B SaaS dashboard. It is a tactile, highly-accessible, and bold "Campus Survival Guide" for new students. 
**Your primary goal is to ELIMINATE "AI-Slop" (generic soft UI) and replace it with Neo-Utility design.**

### 🚫 STRICTLY BANNED (The "AI-Slop" Blacklist)
Do **NOT** use any of the following Tailwind patterns. If you see them in existing code, **REMOVE THEM**:
1. **Soft Borders:** `border-border/50`, `border-white/10`, `border-white/[0.08]`.
2. **Soft Shadows:** `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-2xl`. (Exception: Drop shadows in Framer Motion variants if mimicking physical depth).
3. **Floating/Cinematic Glows:** `blur-2xl`, `blur-3xl`, `bg-gradient-to-r`, `bg-gradient-to-b` (especially with purple/indigo/cyan).
4. **Washed-out Backgrounds:** `bg-white/5`, `bg-black/10` for structural cards.
5. **Rounded Monotony:** Relying solely on `rounded-2xl` with dark gray backgrounds (`bg-card` without borders).

### ✅ REQUIRED UI PATTERNS (Neo-Utility)
1. **Bold & Crisp Borders:** Use `border-2 border-foreground` for all interactive elements (cards, buttons, inputs).
2. **Solid/Hard Shadows (Tactile Feel):**
   - Light Mode: `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]` or `shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]`.
   - Dark Mode: `dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]` or remove shadow completely if using offset borders.
3. **Tactile Micro-Interactions:** ALL clickable items (`<Link>`, `<button>`, Cards) MUST have active press states:
   - `active:translate-y-[2px] active:shadow-none` (to simulate a physical button press).
4. **Solid Pop Colors for Badges:** Use the CSS variables defined in `globals.css` (`bg-cat-academic`, `bg-cat-bureaucracy`, etc.) with contrasting text.

---

## 2. Codebase-Specific Refactoring Rules

When refactoring the current codebase, apply these strict transformations:

### A. Inputs & Search Bars (`app/search`, `HomeHeader`, `Directory`)
- Remove `focus:ring-primary/20`. 
- Apply thick borders: `border-2 border-foreground`.
- Add tactile focus states: `focus:translate-y-[2px] focus:shadow-none`.
- Make placeholder text high-contrast and readable.

### B. Cards & Bento Boxes (`app/page.tsx`, `QuickMenu`, `TopArticles`)
- Transform generic grid items into physical "Index Cards".
- Remove transparent overlays (`bg-white/10`).
- Ensure every card has a distinct border (`border-2 border-foreground`) and hover state (`hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`).

### C. Forms & Modals (`app/onboarding`)
- The onboarding experience must look like filling out a physical "Kartu Tanda Mahasiswa" (Student ID).
- Remove all decorative blurs. Use sharp, high-contrast layouts.
- `<select>` dropdowns must have solid borders and clear typography.

### D. Typography System
- **Headings (`h1`, `h2`, `h3`):** Must use `--font-heading` (`Space Grotesk`) with strict tracking (`tracking-tight` or `tracking-tighter`).
- **Body:** Must use `--font-sans` (`Plus Jakarta Sans`).
- **Tags/Badges:** Use uppercase, extra bold, with wide tracking (`text-[10px] font-bold uppercase tracking-widest`).

---

## 3. TypeScript & Data Architecture Rules
1. **Zero `any` Policy:** Do not use `any`. Define strict interfaces for all data structures (e.g., Markdown frontmatter, Supabase payloads).
2. **Component Mapping:** When working with `MDXRemote` (e.g., in `app/faq/[...slug]/page.tsx`), always map custom Neo-Utility components (like `<CustomCallout />`) to the `components` object.
3. **State Management:** Use `localStorage` purely for initial sync (like `mabaguide_faculty`), but rely on URL Query Params for easily shareable state (like Search queries).

## 4. Execution Protocol for AI Agents
- **Iterative Updates:** Do not attempt to rewrite the entire app at once. Focus on one file/component at a time.
- **Check Your Work:** Before outputting code, verify that NO banned Tailwind classes (like `shadow-sm` or `border-border/50`) are present in your output.
- **Tone:** Keep hardcoded Indonesian copy casual, encouraging, and tailored for college freshmen.