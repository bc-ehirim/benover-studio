# BENOVER Studio

Build a production-quality static, one-page React + TypeScript + Tailwind content-generation app called “BENOVER Content Studio.” This must have no database, auth, user accounts, backend, API keys, or network calls. Use Framer Motion for restrained premium animations. It should feel like Apple + Linear + Notion: minimal luxury, mobile-first, fast and polished. Dark mode default. Brand colors: #0B0B0B black, #F59E0B golden orange, #6D28D9 purple, white. Use tasteful gradients/glows, clean typography, rounded 2xl panels, soft shadows, visual hierarchy. Build actual functional client-side mock generation, copying, and txt downloading.

Primary user flow (all on one page, smooth-scroll): Hero → Studio generator → generated Preview → output actions. Hero headline “Never run out of content again.” subhead “Generate Facebook, Instagram and TikTok content in seconds.” Buttons “Generate Content” (scroll to generator) and “Explore Features.” Include subtle animated orb/grid background and a premium nav/logo. 

Studio must be the main focus. One-thumb mobile navigation, large touch targets, ample bottom spacing, sticky mobile Generate button. Platform cards Facebook, Instagram, TikTok; only one selectable. Content type cards Educational, Promotional, Storytelling, Sales, Behind the Scenes, Tips, Motivation, Product Showcase, Customer Testimonial, Trending Style. Niche dropdown populated with Phones, Laptops, Graphic Design, Printing, Web Design, Fashion, Food, Real Estate plus a custom niche text input. Default preset pack selection should foreground phones, laptops, accessories, graphic design, branding, printing, web development. Tone selector Professional, Street Nigerian, Luxury, Funny, Emotional, Corporate, Gen Z. Add Business / target audience / CTA optional compact inputs. Show intentional weekly content calendar strip that derives today's recommended type: Monday Tips, Tuesday Product Showcase, Wednesday Storytelling, Thursday Educational, Friday Sales, Saturday Behind the Scenes, Sunday Community; “Generate Today’s Content” should select/use that day type, not randomize.

The local generator should assemble deterministic, high-quality BENOVERTECH-oriented content based on choices. On generate, show 0.8–1.5 sec skeleton loading then elegant ResultCard. Seed/example for Phones: title “3 Mistakes People Make Before Buying a Used iPhone”, opening hook, polished full social caption, exactly 15 relevant hashtags including #LagosBusiness #iPhoneNigeria #BenoverTech, CTA “Send us a WhatsApp message today.” Caption needs visible character counter. Also generate comprehensive image prompt like premium black/gold iPhone 14 Pro reflective luxury surface, and an AI video prompt usable in Veo, Kling, Hailuo, Sora, Runway, InVideo AI with opening hook, Scene 1/2/3, text overlays, camera movements, and ending CTA. Clearly show publishing remains manual (“Copy, create media elsewhere, then post manually.”).

Action buttons should truly work: Copy Caption, Copy Hashtags, Copy Image Prompt, Copy Video Prompt with clipboard fallback + toast notification; Download TXT emits benover-content.txt containing entire result. Use reusable components named Hero, PlatformCard, ContentTypeCard, ToneSelector, ResultCard, PromptCard, CopyButton, DownloadButton, AnimatedButton, FeatureCard. Organize source into suitable /components, /features, /services, /utils, /types folders. Add inactive placeholder service modules for OpenAI, Gemini, Claude in AI Provider, reusable prompt-engine templates structured Platform, Content Type, Tone, Business, Target Audience, CTA, Output Format, content templates and export utility. They must not make calls.

Below studio include a “Built for your daily workflow” sequence to reinforce generate/download/manual publish. Include coming-soon disabled feature cards, each labeled Coming Soon: AI Image Generation, AI Video Generation, Content Calendar, Brand Voice Memory, WhatsApp CTA Builder, Facebook Auto Scheduler, Analytics Dashboard. Do not build backend functionality for these.

Animations: fade-ins, slide-ups, hover scale/card lift on desktop, button ripple, page transitions; keep it restrained and respect reduced-motion. No excessive dependencies. Verify it compiles. Do not add database, authentication, or scheduling/backend code.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a95dfba5-01f8-4e21-8ce1-c46a5447acc9).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
