# Benover Tech Gadget Content Generator

Benover Tech is a private, local-first social-content generator for gadget marketing. It creates publishing drafts for iPhones, Samsung phones, laptops, accessories, tablets, smartwatches, earbuds and audio, chargers and power banks, and monitors.

The app has no database, authentication, user accounts, backend API, API keys, or product uploads. Copy generation is deterministic and runs on the device. Users can create platform-specific captions for Facebook, Instagram, TikTok, and WhatsApp, plus hashtags, image prompts, video prompts, and TXT exports. Image generation is optional and uses a free online service; supplied image prompts and product facts are sent only when that action is selected.

## Product scope

- Benover Tech branding and gadget-focused copy
- Product-category-aware captions and prompts
- Professional, luxury, funny, emotional, corporate, Street Nigerian, and Gen Z tones
- Exactly 15 unique hashtags per result
- Clipboard copy with browser fallback
- Client-side TXT downloads
- Responsive mobile-first interface with native keyboard-accessible radio controls

The app intentionally does not include product inventory, prices, stock, checkout, scheduling, accounts, or server-side AI calls.

## Development

```sh
npm install
npm run dev
```

Useful commands:

```sh
npm test       # Run unit tests
npm run build  # Build client, SSR, and Nitro output
npm run verify # Run tests and production build
npm run lint   # Run ESLint
```

The production deployment target is configured by the existing TanStack Start and Nitro setup. The public site metadata uses `https://benovertech.com` as the canonical origin.
