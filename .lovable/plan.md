# Update homepage hero to generic costume-rental message

## Goal
Replace the festival-specific hero section with a generic costume-rental shop image and message that reflects the site's purpose.

## Current state
- The homepage hero (`src/routes/index.tsx`) currently promotes Navratri & Garba with a festival-specific image (`src/assets/festival-hero.jpg`), "Upcoming Festival" badge, and a "Shop Festival Looks" CTA button.
- The hero sits inside a festive gradient card with a "Book on WhatsApp" button.

## Changes
1. Generate a new generic hero image showing a variety of people wearing costumes (festive, superhero, profession, mythological, etc.) to represent a costume-rental shop.
2. Replace the existing `festival-hero.jpg` asset with the new image (or add a new asset and update the import).
3. Update `src/routes/index.tsx`:
   - Remove the "Upcoming Festival" badge and the `CalendarDays` icon import.
   - Replace the headline and subtext with a generic, inviting message that captures the purpose of the site (e.g., "Celebrate every version of yourself with us — and make the brightest impression on any occasion.").
   - Remove the "Shop Festival Looks" button and the `ArrowRight` import used only for it.
   - Keep the "Book on WhatsApp" button.
   - Update the hero image `alt` text to describe the new generic image.
   - Update the page meta title/description to match the generic purpose instead of a single festival.
4. Run a build to verify the changes compile correctly.

## Out of scope
- Changing the rest of the page layout or category sections.
- Changing the hero gradient or card styling.
- Adding new components or routes.
