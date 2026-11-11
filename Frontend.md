# Interactive Digital Invitations — Frontend Plan

## 1. Product vision

Create a mobile-first invitation website where every template is a small interactive experience, not a static image.

A guest opens a public link and first sees an opening screen. After tapping **Open Invitation**, the invitation reveals itself with optional music and subtle animation such as floating petals, little flowers, sparkles, or an envelope-opening effect. The guest can then scroll through all event information and interact with RSVP, messages, and gifts.

The event owner receives a separate private management link. Guests never need accounts.

## 2. Technology

- Next.js + TypeScript.
- App Router.
- Tailwind CSS.
- Framer Motion for component and reveal animations.
- CSS keyframes for lightweight decorative effects.
- React Hook Form + Zod for forms.
- Fetch or TanStack Query for API access.
- Responsive design, mobile-first.
- Optional sound assets hosted in object storage.

Avoid making GSAP a requirement for the MVP. Use it only if a particular template needs complex timeline choreography.

## 3. Main routes

```text
/
  marketing / template gallery

/create
  create invitation flow

/invite/[slug]
  public interactive invitation

/manage/[token]
  private owner dashboard

/manage/[token]/guests
/manage/[token]/messages
/manage/[token]/gifts
/manage/[token]/settings

/payment/return
  guest payment result
```

The management token should not be placed in analytics events, logs, error reports, or third-party referrer data. Consider exchanging the URL token for a secure, short-lived, HTTP-only session cookie and then redirecting to a clean management URL. Add CSRF protection where needed. Never expose the token to client analytics.

## 4. Public invitation experience

### Stage A — Opening screen
- Full-screen mobile-first composition.
- Template-specific illustration or envelope.
- Couple/host names or event title can appear as a preview.
- Clear **Open Invitation** button.
- Optional “Sound on” indication.
- Keep the call to action accessible and obvious.

### Stage B — Reveal
Triggered only after the guest taps the opening button:
- Envelope opens, curtain parts, or floral frame appears.
- Title and names fade/slide into view.
- Small decorative flowers or petals drift gently.
- Optional background music starts after the tap.
- Show a persistent mute/unmute control.
- Provide a skip/continue option if the reveal is longer than a moment.

### Stage C — Invitation content
A smooth scrollable page containing:
1. Hosts/couple/honoree names.
2. Short invitation wording.
3. Date and time.
4. Countdown (optional).
5. Venue name and address.
6. Map button.
7. Gallery (optional).
8. RSVP form.
9. Guestbook/messages.
10. Gift section, if enabled.

The owner can configure which sections appear. Templates should have sensible defaults.

## 5. Audio and motion rules

- Do not attempt sound autoplay before a user gesture; browsers may block it.
- Start audio from the **Open Invitation** click handler.
- If playback fails, continue without music and do not block the invitation.
- Add visible mute/pause control.
- Default to subtle motion; respect `prefers-reduced-motion`.
- Avoid constant heavy animations that drain mobile battery or distract from details.
- Pause decorative animations when the page is hidden where practical.
- Keep text contrast and touch targets accessible.
- Do not make important information available only through animation or sound.

## 6. Template system

Build templates as registered React components, not arbitrary HTML or JavaScript stored in MongoDB.

Suggested structure:

```text
src/
  components/
    invitation/
      InvitationRenderer.tsx
      InvitationOpening.tsx
      InvitationAudioControl.tsx
      InvitationSection.tsx
      RSVPForm.tsx
      MessageForm.tsx
      GiftForm.tsx
      MapLink.tsx
      Countdown.tsx
      decorations/
  templates/
    registry.ts
    shared/
      FloralPetals.tsx
      Sparkles.tsx
      EnvelopeReveal.tsx
      Typography.tsx
    wedding/
      ElegantFloral.tsx
      RoyalGold.tsx
      MinimalModern.tsx
      GardenRomance.tsx
    engagement/
      RomanticEngagement.tsx
    birthday/
      LuxuryBirthday.tsx
      KidsBirthday.tsx
    graduation/
      GraduationCelebration.tsx
```

Example registry:

```ts
export const invitationTemplates = {
  "elegant-floral": ElegantFloral,
  "royal-gold": RoyalGold,
  "minimal-modern": MinimalModern,
  "garden-romance": GardenRomance,
  "romantic-engagement": RomanticEngagement,
  "luxury-birthday": LuxuryBirthday,
  "kids-birthday": KidsBirthday,
  "graduation-celebration": GraduationCelebration,
} as const;
```

Store a `templateKey`, version, and validated configuration in the event. Keep executable components in the frontend codebase. This gives consistent rendering and safe upgrades.

## 7. Initial interactive template collection

These are implementation briefs. Each template should have its own visual identity, opening animation, decorative motion, typography, and section styling.

### 1. Elegant Floral Wedding
- Palette: warm ivory, champagne, muted sage, soft gold.
- Opening: delicate floral frame and a small invitation card.
- Reveal: card unfolds; tiny petals drift down.
- Content: large couple names, serif typography, date, venue, map, RSVP.
- Motion: slow and subtle.

### 2. Royal Gold Wedding
- Palette: deep emerald or navy, gold, warm cream.
- Opening: formal monogram or ornamental frame.
- Reveal: gold lines draw around the invitation; title fades in.
- Content: formal wording, prominent date, venue, map, RSVP.
- Motion: elegant shimmer used sparingly.

### 3. Minimal Modern Wedding
- Palette: white, sand, charcoal, muted olive.
- Opening: clean typography and a simple “Open invitation” button.
- Reveal: smooth typography transition and a thin line animation.
- Content: names, date, schedule, venue, map, RSVP.
- Motion: restrained; no busy decoration.

### 4. Garden Romance Wedding
- Palette: blush, cream, pale green, dusty rose.
- Opening: illustrated garden gate or floral arch.
- Reveal: flowers gently appear around the frame; a few petals float.
- Content: names, invitation message, date, outdoor venue, gallery, RSVP.
- Motion: soft floral movement.

### 5. Romantic Engagement
- Palette: blush pink, cream, rose gold.
- Opening: two rings or intertwined floral shapes.
- Reveal: rings/ornament gently animate into place.
- Content: names, engagement date, venue, map, RSVP, messages.
- Motion: gentle sparkle accents.

### 6. Luxury Birthday
- Palette: black, champagne gold, cream or a configurable jewel tone.
- Opening: elegant birthday title with a small light effect.
- Reveal: confetti or sparkles appear briefly.
- Content: honoree name, age (optional), date, venue, countdown, RSVP.
- Motion: short celebratory burst, then calm page.

### 7. Kids Birthday
- Palette: bright but coordinated colors chosen per theme.
- Opening: playful illustrated balloons or stars.
- Reveal: balloons rise and confetti falls lightly.
- Content: child's name, party theme, date, venue, parent contact (optional), RSVP.
- Motion: playful, but keep the page readable and fast.

### 8. Graduation Celebration
- Palette: navy, ivory, gold, or school colors.
- Opening: graduation cap and simple celebratory title.
- Reveal: cap/tassel movement and a brief confetti effect.
- Content: graduate name, degree/message, date, venue, map, RSVP.
- Motion: celebratory reveal with minimal ongoing animation.

## 8. Invitation builder

Use a guided form, not a drag-and-drop editor.

Suggested flow:
1. Choose event type.
2. Choose a template from a visual gallery.
3. Enter names and event details.
4. Upload optional photos.
5. Choose music from a curated, licensed library or leave music off.
6. Configure animation level and enabled sections.
7. Preview the complete interactive invitation.
8. Save draft and publish.

The preview should use the same template component as the public invitation, with sample or draft data.

## 9. Owner management dashboard

A responsive dashboard accessed through the private management link.

### Overview
- Invitation views.
- Estimated unique visitors.
- Attending RSVPs.
- Total guest seats requested.
- Messages received.
- Successful gifts collected.
- Pending payments.
- Payout/withdrawal status only if enabled.

Clearly distinguish page views from unique visitors and successful payments from pending checkouts.

### Settings
- Event title and names.
- Date and time.
- Venue and address.
- Google Maps URL.
- Template and design options.
- Music and animation settings.
- RSVP/messages/gifts toggles.
- Publish/unpublish.

### Guest list
- Table with name, number of guests, RSVP status, date.
- Search and status filters.
- Pagination.
- Export CSV can be a later enhancement.

### Messages
- Guest name, message, submission date, moderation status.
- Approve/hide actions if public display is enabled.

### Gifts
- Guest name, amount, payment status, transaction date.
- Summary totals for successful, pending, failed, and refunded transactions.
- Never present pending payments as collected money.

## 10. Shared component behavior

- `InvitationRenderer`: selects the registered template and supplies validated event data.
- `InvitationOpening`: handles the initial screen and reveal state.
- `InvitationAudioControl`: plays/pauses audio and handles failure gracefully.
- `RSVPForm`: submits attendance and guest count.
- `MessageForm`: submits a guest message.
- `GiftForm`: starts a provider checkout.
- `Countdown`: calculates time to the event using the event timezone.
- `MapLink`: opens the configured map destination.
- `FloralPetals` / `Sparkles` / `Confetti`: decorative components with reduced-motion support.

## 11. Frontend implementation roadmap

### Phase 1 — Foundation
- Create Next.js + TypeScript app.
- Configure Tailwind, linting, formatting, environment variables.
- Add shared layout, typography, buttons, forms, and API client.

### Phase 2 — Template engine
- Define event and template TypeScript types.
- Implement template registry and renderer.
- Build opening/reveal/audio primitives.
- Implement two initial templates and test on mobile.
- Add remaining templates after the system is stable.

### Phase 3 — Public invitation
- Fetch published invitation by slug.
- Render opening screen and full invitation.
- Add RSVP, message, map, and optional gift sections.
- Add loading, empty, and error states.
- Add social preview metadata and SEO.

### Phase 4 — Invitation builder
- Event details form.
- Template gallery.
- Design settings.
- Music selection.
- Live preview.
- Draft and publish flow.

### Phase 5 — Management dashboard
- Secure management-link session flow.
- Overview analytics.
- Settings editor.
- Guest, message, and gift tables.
- Token rotation/recovery UX.

### Phase 6 — Payment integration
- Integrate only after provider/legal flow is confirmed.
- Checkout, return state, and clear payment statuses.
- Never mark a gift paid based only on frontend redirect.

### Phase 7 — Polish and launch
- Test iOS Safari, Android Chrome, and desktop browsers.
- Test sound blocked, sound muted, reduced motion, slow network, and image failures.
- Optimize image sizes and animation performance.
- Accessibility, privacy, and security review.

## 12. Frontend acceptance criteria

- Every public invitation opens without a guest account.
- The initial screen clearly invites the guest to open the invitation.
- Music starts only after an explicit interaction and can be muted.
- The full event details remain accessible without music or animation.
- Animations are smooth on common mobile devices and respect reduced-motion preferences.
- RSVP and message forms work on mobile.
- The template preview matches the published invitation.
- The management dashboard is private and does not leak its token.
- All dashboard totals use clearly defined backend metrics.
