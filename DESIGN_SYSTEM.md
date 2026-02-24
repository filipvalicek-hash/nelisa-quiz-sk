# Unified Design System

This document describes the unified design system for the HR Recruit / Nelisa Learning quiz interface.

## Overview

The design system ensures consistency across all screens with:
- **One fixed button style** for all primary actions
- **One universal card style** for all content
- **Predictable, game-like UI** inspired by Duolingo
- **Clean and minimal** visual language

---

## 🔵 Buttons

### Component
Use `QuizButton` from `/src/app/components/ui/quiz-button.tsx`

### Import
```tsx
import { QuizButton } from '@/app/components/ui/quiz-button';
```

### Usage
```tsx
// Primary button (default)
<QuizButton onClick={handleClick}>
  Pokračovat →
</QuizButton>

// Secondary button
<QuizButton variant="secondary" onClick={handleClick}>
  Cancel
</QuizButton>

// Ghost button (minimal)
<QuizButton variant="ghost" onClick={handleClick}>
  <ArrowLeft className="w-4 h-4" />
  Previous
</QuizButton>
```

### Specifications

#### Size (FIXED - DO NOT CHANGE)
- **Padding**: `px-8 py-4` (32px horizontal, 16px vertical)
- **Font size**: `text-base` (16px)
- **Font weight**: `font-semibold` (600)
- **Border radius**: `rounded-xl` (12px)
- **Gap**: `gap-2.5` (10px between icon and text)

#### Colors (ONLY THESE 3 STATES)

**1. Primary (Default)**
- Background: `bg-blue-500` (#3B82F6)
- Hover: `bg-blue-600` (#2563EB)
- Text: `text-white`
- Shadow: `shadow-sm` → `shadow-md` on hover

**2. Disabled**
- Background: `bg-gray-300` (#D1D5DB)
- Text: `text-gray-500` (#6B7280)
- No shadow
- Cursor: `not-allowed`

**3. Hover**
- Slightly darker blue
- Elevated shadow
- Smooth transition (200ms)

#### Variants

**Primary** (default)
- Use for main actions: "Continue", "Confirm Answer", "Start"

**Secondary**
- White background
- Gray border
- Use for alternative actions

**Ghost**
- Transparent background
- Use for back/navigation buttons

### Rules
- ✅ **DO**: Use QuizButton for ALL primary actions
- ✅ **DO**: Keep the default size unchanged
- ❌ **DON'T**: Override padding, font size, or border radius
- ❌ **DON'T**: Add custom colors or gradients
- ❌ **DON'T**: Use Button from ui/button.tsx (old component)

---

## 🎴 Cards

### Component
Use `QuizCard` from `/src/app/components/ui/quiz-card.tsx`

### Import
```tsx
import { QuizCard, QuizCardContent, QuizCardHeader } from '@/app/components/ui/quiz-card';
```

### Usage
```tsx
<QuizCard maxHeight="500px">
  <QuizCardHeader>
    <h3>Question Title</h3>
  </QuizCardHeader>
  <QuizCardContent>
    <p>Card content goes here...</p>
  </QuizCardContent>
</QuizCard>
```

### Specifications

#### Visual Style (FIXED - DO NOT CHANGE)
- **Background**: `bg-white`
- **Border**: `border border-gray-100` (1px solid light gray)
- **Border radius**: `rounded-3xl` (24px)
- **Shadow**: Subtle, consistent across all cards
  ```
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06), 0 0 1px rgba(0, 0, 0, 0.04)'
  ```

#### Layout
- **Padding** (via QuizCardContent): `p-8` (32px all sides)
- **Max height**: Optional, pass as prop if needed for scroll

### Card Components

**QuizCard**
- Main container
- Provides consistent shadow and border

**QuizCardHeader**
- Fixed header at top
- Border bottom: `border-b border-gray-100`
- Padding: `px-8 pt-6 pb-4`

**QuizCardContent**
- Main content area
- Padding: `p-8`

### Rules
- ✅ **DO**: Use QuizCard for all content panels
- ✅ **DO**: Keep consistent padding (p-8)
- ❌ **DON'T**: Create custom card styles per screen
- ❌ **DON'T**: Add heavy shadows or gradients
- ❌ **DON'T**: Use different border radius values

---

## 🎨 Typography

### Text Hierarchy

**Headers**
- H1 (Page title): `text-4xl font-bold text-gray-900`
- H2 (Section): `text-2xl font-bold text-gray-900`
- H3 (Card title): `text-xl font-semibold text-gray-900`

**Body**
- Default: `text-base text-gray-700 leading-relaxed`
- Small: `text-sm text-gray-600`
- Muted: `text-gray-500`

**Labels/Tags**
- Badge: `text-xs font-bold uppercase tracking-wide`

### Line Spacing
- Paragraphs: `space-y-4` (16px between)
- Body text: `leading-relaxed` (1.625)

---

## 🔵 Color Palette

### Primary (Blue)
- **Blue 500**: `#3B82F6` - Main actions
- **Blue 600**: `#2563EB` - Hover state
- **Blue 50**: `#EFF6FF` - Light backgrounds
- **Blue 700**: `#1D4ED8` - Dark accents

### Neutral (Gray)
- **Gray 900**: `#111827` - Primary text
- **Gray 700**: `#374151` - Body text
- **Gray 600**: `#4B5563` - Secondary text
- **Gray 500**: `#6B7280` - Muted text
- **Gray 300**: `#D1D5DB` - Disabled state
- **Gray 100**: `#F3F4F6` - Borders, backgrounds

### Feedback Colors
- **Green** (success): `green-50`, `green-600`
- **Yellow** (warning): `yellow-50`, `yellow-600`
- **Red** (error): `red-50`, `red-600`

### Rules
- ❌ **DON'T**: Introduce new colors
- ❌ **DON'T**: Use gradients (except for button depth)
- ✅ **DO**: Stick to the blue + gray palette

---

## 📐 Spacing

### Standard Units
- **Small**: `gap-2` (8px), `mb-2`, `p-2`
- **Medium**: `gap-4` (16px), `mb-4`, `p-4`
- **Large**: `gap-8` (32px), `mb-8`, `p-8`
- **XL**: `gap-12` (48px), `mb-12`, `p-12`

### Card Padding
- Always: `p-8` (32px)

### Button Padding
- Always: `px-8 py-4`

---

## ✨ Animation

### Transitions
- **Duration**: `duration-200` (200ms) for buttons
- **Easing**: Default ease or `ease-out`
- **Properties**: `transition-all` for hover states

### Motion (Framer Motion)
- Entry animations: Fade + slide (`opacity` + `y`)
- Delays: Stagger by 0.1s - 0.2s
- No bounce or complex spring animations for buttons

---

## 🎮 Duolingo-Inspired Principles

1. **Friendly but professional**
2. **Calm blue color scheme** (not aggressive)
3. **Clean, minimal UI** (no visual noise)
4. **Predictable interactions** (buttons always look the same)
5. **Game-like feel** (but educational, not childish)
6. **Generous whitespace**
7. **Consistent sizing**

---

## 🚫 Anti-Patterns (DON'T DO)

❌ Creating one-off button styles per screen  
❌ Using different font sizes for buttons  
❌ Adding custom shadows to individual components  
❌ Mixing border radius values (rounded-lg vs rounded-xl)  
❌ Overriding QuizButton padding or size  
❌ Using the old `Button` component from ui/button.tsx  
❌ Creating custom card components per screen  
❌ Adding heavy gradients or bright colors  

---

## ✅ Best Practices (DO)

✅ Always use `QuizButton` for primary actions  
✅ Always use `QuizCard` for content panels  
✅ Keep button text clear and action-oriented  
✅ Maintain consistent spacing (p-8, gap-4, etc.)  
✅ Use motion for subtle entry animations only  
✅ Stick to the blue + gray color palette  
✅ Keep UI clean and minimal  

---

## 📦 Component Checklist

When creating a new quiz screen:

- [ ] Import `QuizButton` instead of `Button`
- [ ] Use `QuizCard` for content containers
- [ ] Check all buttons use primary/secondary/ghost variants
- [ ] Verify no custom padding on buttons
- [ ] Ensure consistent card styling (no custom shadows)
- [ ] Use standard spacing units (gap-4, p-8, mb-6)
- [ ] Stick to blue + gray colors
- [ ] Add simple motion animations (optional)

---

## 🔄 Migration Guide

### Replacing old Button with QuizButton

**Before:**
```tsx
import { Button } from '@/app/components/ui/button';

<Button 
  className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 text-lg"
  onClick={onContinue}
>
  Continue
</Button>
```

**After:**
```tsx
import { QuizButton } from '@/app/components/ui/quiz-button';

<QuizButton onClick={onContinue}>
  Continue
</QuizButton>
```

### Replacing custom cards with QuizCard

**Before:**
```tsx
<div className="bg-white rounded-2xl shadow-lg p-10 border">
  <h3>Title</h3>
  <p>Content</p>
</div>
```

**After:**
```tsx
import { QuizCard, QuizCardContent } from '@/app/components/ui/quiz-card';

<QuizCard>
  <QuizCardContent>
    <h3>Title</h3>
    <p>Content</p>
  </QuizCardContent>
</QuizCard>
```

---

## 📞 Questions?

If you're unsure about a design decision:

1. **Check this document first**
2. **Look at existing screens** (StoryScreen, QuizQuestion, CheckpointScreen)
3. **Default to simplicity** (clean, minimal, consistent)
4. **When in doubt, use the unified components** (QuizButton, QuizCard)

Remember: **Consistency over creativity.** The goal is a predictable, game-like UI that feels like one cohesive system.
