# Validation record

Reference update: October 5, 2026 (America/Edmonton).

| Check | Result | Scope |
| --- | --- | --- |
| Strict TypeScript | PASS | `npm run typecheck` without diagnostics |
| Expo ESLint | PASS | `npm run lint` without diagnostics |
| iOS export | PASS | Hermes bundle generated for Expo SDK 57 |
| Android export | PASS | Hermes bundle generated for Expo SDK 57 |
| Web export | PASS | Exported single-page application loaded in Chromium |
| Five bottom tabs | PASS | Search, Favorites, Trips, Inbox and More |
| Stack routes | PASS | Vehicle ID route → checkout → confirmation → Trips |
| Search and destination filters | PASS | No-results reset, Nearby, text match, budget toggle |
| Favorites | PASS | Initial reference fixture, save a second car, remove both, empty state |
| Pricing and date validation | PASS | Invalid date rejected; $86 × 3 plus demo fee/tax = $286.65; duration change updates total |
| Booking and cancellation | PASS | Create local trip, Keep trip, confirmed cancellation |
| Inbox | PASS | Local-only demo message composer |
| Profile and theme | PASS | Invalid email rejected, edited profile saved, dark/light toggle |
| Storage | PASS | Profile, theme, favorites and booking retained after page reload |
| Runtime errors | PASS | No page errors in tested web workflow |
| Small-screen layout | PASS | 390 × 820 and 320 × 700, no horizontal page overflow |
| Reference images | COMPLETE | Three original user-supplied Turo screenshots included unchanged |
| Visual comparison | REVIEWED | Search, Elantra details and Calgary favorites redesigned to follow supplied references |
| 80% fidelity | NOT MEASURED | Exact score remains the instructor's rubric judgment |
| iPhone execution | PENDING | User must test on actual device or simulator; bundle success is not execution proof |
| Android execution | PENDING | User must test on actual device or emulator |
| GitHub and D2L | PENDING | Upload source with references and submit repository URL |

Preview PNGs depict the implementation, while `reference/` contains the original real app screenshots. Static reference trip dates, image count and iOS material effects are documented in `docs/REFERENCE_COMPARISON.md`.
