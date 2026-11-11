# Interactive Digital Invitations — Backend Plan

## 1. Product vision

Build a platform for interactive digital invitations. An event owner creates an invitation and shares a public URL. A guest opens it, taps **Open Invitation**, sees a short animated reveal with optional music, and then explores the full event details.

The guest does not need an account. The event owner uses a separate private management link.

The platform initially targets Egypt and supports weddings, engagements, birthdays, graduations, baby showers, anniversaries, and other celebrations.

## 2. Core user journeys

### Event owner
1. Create an invitation.
2. Select an interactive template.
3. Enter event details, names, date, time, venue, map link, and optional photos.
4. Configure music, animation, RSVP, messages, and gifts.
5. Preview the invitation.
6. Publish and receive:
   - Public invitation URL.
   - Private management URL.
7. Share the public URL.
8. Use the management dashboard to edit event details and view visitors, RSVPs, messages, gifts, and payment totals.

### Guest
1. Open the public URL.
2. See the template's opening screen.
3. Tap **Open Invitation**. This user gesture can start audio playback where browser policy permits.
4. Watch the reveal animation and hear optional music.
5. Scroll through the event details.
6. RSVP, send a message, or make a gift payment.

No guest registration or login is required.

## 3. Architecture

- Runtime: Node.js + Express.js + TypeScript.
- Database: MongoDB Atlas + Mongoose.
- API prefix: `/api/v1`.
- Validation: Zod.
- File storage: Cloudflare R2 or equivalent object storage.
- Background jobs: optional Redis + BullMQ for notifications and payment follow-up.
- Payments: provider adapter; investigate Paymob's current marketplace/collection and payout offering before committing to a flow.
- Logging: structured logs with request IDs.
- Tests: Vitest/Jest + Supertest.

Use a modular monolith for the MVP. Suggested modules:

```text
src/
  app.ts
  server.ts
  config/
  common/
    errors/
    middleware/
    validation/
    security/
  modules/
    events/
    templates/
    visits/
    rsvps/
    messages/
    contributions/
    payments/
    payouts/
    analytics/
    webhooks/
```

## 4. Important product decisions

### No traditional user accounts
Do not build a `users` collection or guest authentication for the MVP.

The owner receives a high-entropy private management token. Store only its cryptographic hash in MongoDB. The raw token appears in the management URL and should be shown to the owner only when created or rotated.

Treat the management URL as a password: anyone who has it can manage the event. Add token rotation/revocation and a recovery strategy before production. An optional email/phone one-time recovery flow can be added later without introducing passwords.

### Event-owner identity and payouts
Website management access and financial identity verification are separate concerns. A payment provider may require the recipient to complete KYC and verify a bank account or wallet before receiving payouts. Do not assume a private dashboard link is sufficient for financial onboarding.

### Audio and browser restrictions
Browsers generally block autoplay with sound until the guest interacts with the page. Therefore, use an explicit **Open Invitation** button. Start music after that tap, provide a visible mute/pause control, and respect reduced-motion preferences. The invitation must remain understandable if audio is unavailable or disabled.

### Money representation
Store amounts as integer minor units (piastres), never floating-point values. For example, EGP 100.50 is stored as `10050`. Store currency explicitly, initially `EGP`.

### Payment truth
Only mark a payment as successful after validating the payment provider's server-to-server webhook or performing a trusted server-side verification. Never trust a browser redirect alone.

## 5. MongoDB collections

### `events`
Suggested fields:

```ts
{
  _id: ObjectId,
  title: string,
  type: "WEDDING" | "ENGAGEMENT" | "BIRTHDAY" |
        "GRADUATION" | "BABY_SHOWER" | "ANNIVERSARY" | "OTHER",
  slug: string,
  managementTokenHash: string,
  details: {
    hosts: string[],
    honoreeNames?: string[],
    date: Date,
    startTime: string,
    endTime?: string,
    timezone: string,
    venueName: string,
    address: string,
    googleMapsUrl?: string,
    description?: string
  },
  design: {
    templateKey: string,
    templateVersion: number,
    primaryColor?: string,
    secondaryColor?: string,
    fontKey?: string,
    musicAssetId?: string,
    coverImageAssetId?: string,
    galleryAssetIds: string[],
    animationLevel: "NONE" | "SUBTLE" | "FULL"
  },
  settings: {
    allowRsvp: boolean,
    allowMessages: boolean,
    allowGifts: boolean,
    showGiftAmounts: boolean,
    showGuestMessagesPublicly: boolean
  },
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED",
  publishedAt?: Date,
  createdAt: Date,
  updatedAt: Date
}
```

Indexes:
- Unique index on `slug`.
- Index on `status` and `createdAt`.
- Do not expose `managementTokenHash` in any public response.

### `templates`
Store metadata, not arbitrary executable code or user-provided HTML.

```ts
{
  _id: ObjectId,
  key: string,                 // e.g. "floral-romance"
  name: string,
  description: string,
  supportedEventTypes: string[],
  componentKey: string,        // maps to a frontend-registered component
  version: number,
  thumbnailAssetId: string,
  defaultConfig: object,
  configurableFields: string[],
  isActive: boolean,
  sortOrder: number
}
```

### `visits`
```ts
{
  _id: ObjectId,
  eventId: ObjectId,
  visitorKeyHash?: string,     // optional pseudonymous, privacy-conscious identifier
  sessionId?: string,
  referrer?: string,
  deviceCategory?: "MOBILE" | "TABLET" | "DESKTOP" | "UNKNOWN",
  visitedAt: Date
}
```
Track page views without collecting unnecessary personal data. Define retention and consent practices appropriate to applicable privacy rules. Avoid invasive fingerprinting.

### `rsvps`
```ts
{
  _id: ObjectId,
  eventId: ObjectId,
  guestName: string,
  phone?: string,
  status: "ATTENDING" | "NOT_ATTENDING" | "MAYBE",
  numberOfGuests: number,
  note?: string,
  createdAt: Date,
  updatedAt: Date
}
```

### `messages`
```ts
{
  _id: ObjectId,
  eventId: ObjectId,
  guestName: string,
  message: string,
  status: "PENDING" | "APPROVED" | "HIDDEN",
  createdAt: Date
}
```

### `contributions`
Represents the guest's gift intent/record associated with an event.

```ts
{
  _id: ObjectId,
  eventId: ObjectId,
  guestName: string,
  amountMinor: number,
  currency: "EGP",
  paymentTransactionId?: ObjectId,
  status: "PENDING" | "PAID" | "FAILED" | "REFUNDED",
  createdAt: Date
}
```

### `paymentTransactions`
```ts
{
  _id: ObjectId,
  eventId: ObjectId,
  contributionId: ObjectId,
  provider: string,
  providerTransactionId?: string,
  amountMinor: number,
  currency: "EGP",
  status: "CREATED" | "PENDING" | "SUCCEEDED" | "FAILED" | "REFUNDED",
  idempotencyKey: string,
  providerPayloadSafe?: object,
  createdAt: Date,
  updatedAt: Date
}
```

### `payouts` (only if approved payout flow exists)
```ts
{
  _id: ObjectId,
  eventId: ObjectId,
  amountMinor: number,
  currency: "EGP",
  destinationReference: string,
  providerPayoutId?: string,
  status: "REQUESTED" | "PROCESSING" | "PAID" | "FAILED" | "CANCELLED",
  createdAt: Date,
  updatedAt: Date
}
```

For a real-money product, add an immutable ledger and reconciliation process before enabling payouts. Do not calculate withdrawable funds by simply summing client-visible contribution records.

## 6. API design

### Public invitation
- `GET /api/v1/public/invitations/:slug`
  - Return published event details, safe design configuration, and enabled guest actions.
  - Never return management token data, private payout data, or internal provider payloads.
- `POST /api/v1/public/invitations/:slug/visits`
  - Record a privacy-conscious visit.
- `POST /api/v1/public/invitations/:slug/rsvps`
  - Validate guest name, attendance status, and guest count.
- `POST /api/v1/public/invitations/:slug/messages`
  - Validate and sanitize message; optionally queue for moderation.
- `POST /api/v1/public/invitations/:slug/contributions`
  - Create a pending contribution and payment checkout session.

### Payment
- `POST /api/v1/public/payments/checkout`
  - Create checkout using a server-selected provider and amount.
- `POST /api/v1/webhooks/payments/:provider`
  - Verify signature/authenticity, enforce idempotency, update transaction and contribution state.
- `GET /api/v1/public/payments/:transactionId/status`
  - Return a safe payment status for the guest return page.

### Private management
All routes below require management-token authorization:
- `GET /api/v1/manage/event`
- `PATCH /api/v1/manage/event`
- `PATCH /api/v1/manage/event/design`
- `PATCH /api/v1/manage/event/settings`
- `GET /api/v1/manage/analytics/summary`
- `GET /api/v1/manage/rsvps`
- `GET /api/v1/manage/messages`
- `PATCH /api/v1/manage/messages/:messageId`
- `GET /api/v1/manage/contributions`
- `GET /api/v1/manage/payments`
- `POST /api/v1/manage/management-link/rotate`

Use pagination, filtering, and sorting for all tables.

## 7. Management dashboard metrics

Return separate, clearly defined metrics:
- Total invitation page views.
- Unique/estimated visitors (define the methodology; do not imply perfect person-level uniqueness).
- RSVP attending count.
- Total number of guests attending (`sum(numberOfGuests)` for attending RSVPs).
- Not attending and maybe counts.
- Message count, with pending/approved breakdown.
- Successful gifts total.
- Pending and failed payment totals.
- Refunds.
- Net amount and withdrawable balance only when supported by a correct ledger and provider settlement data.

Do not label initiated or pending payments as money collected.

## 8. Security and abuse prevention

- Hash management tokens with a strong one-way hash; generate high-entropy random tokens.
- Use constant-time token comparison where applicable.
- Rate-limit public RSVP, message, gift, and visit endpoints.
- Add CAPTCHA or another friction mechanism when abuse is detected.
- Validate all request bodies with schemas.
- Sanitize displayed guest content and escape output.
- Add message moderation and reporting.
- Prevent duplicate payment processing with idempotency keys.
- Verify webhook signatures and reject replayed events.
- Keep secrets in environment variables/secret management.
- Do not expose phone numbers, payout destinations, provider payloads, or management tokens publicly.
- Add audit records for management changes, token rotation, refunds, and payouts.
- Use HTTPS only.
- Configure CORS narrowly.
- Define retention/deletion policies for visitor and guest data.

## 9. Payment and legal readiness

Before launching gifts or payouts in Egypt:
1. Confirm the provider supports the intended platform/marketplace model.
2. Confirm who is merchant of record and who legally receives the money.
3. Confirm recipient onboarding, KYC, settlement, refunds, chargebacks, fees, and payout timing.
4. Obtain appropriate Egyptian legal/compliance advice on collection, holding, and disbursement of funds and personal-data handling.
5. Build reconciliation, audit logs, refund handling, and support workflows.

Do not independently hold or distribute customer funds unless the provider arrangement and legal requirements permit it. Keep gifts disabled or use a compliant provider-hosted flow until this is resolved.

## 10. Backend implementation roadmap

### Phase 1 — Foundation
- Initialize Express + TypeScript.
- Configure MongoDB, environment validation, logging, error handling.
- Add request validation and API versioning.
- Add automated tests and CI.

### Phase 2 — Templates and events
- Create template registry metadata.
- Build event CRUD and slug generation.
- Generate and hash private management token.
- Implement public event read endpoint.
- Implement management authorization middleware.

### Phase 3 — Guest interaction
- Implement visit tracking.
- Implement RSVP creation/listing.
- Implement message submission, moderation, and management listing.
- Add rate limits and abuse controls.

### Phase 4 — Owner dashboard APIs
- Event settings update.
- Analytics summary.
- Paginated RSVP, message, and contribution lists.
- Token rotation.

### Phase 5 — Gifts and payments
- Confirm provider/legal model first.
- Implement provider adapter.
- Create checkout and verified webhook handling.
- Add idempotency, payment status, refunds, reconciliation, and ledger.
- Add payout workflow only after provider approval.

### Phase 6 — Production readiness
- Security review and penetration testing.
- Load and failure testing.
- Backups and restore test.
- Monitoring, alerting, audit logs.
- Privacy policy, terms, and support process.

## 11. Backend acceptance criteria

- A guest can open a published invitation without an account.
- A guest can submit an RSVP and message without registration.
- The owner can manage the event only with the private management credential.
- Public API responses never expose private management or payout data.
- Dashboard metrics distinguish views, RSVP people, guest count, pending payments, and successful payments.
- Payment success is webhook-verified and idempotent.
- A rotated management token invalidates the previous token.
- The invitation remains usable with music disabled and reduced motion enabled.
