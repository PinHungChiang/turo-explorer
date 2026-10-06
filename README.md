# Turo Explorer

An Expo SDK 57 and TypeScript classroom recreation based on three supplied Turo mobile screenshots. Seven functional screens combine five floating bottom tabs with a vehicle-details and checkout stack. Dark mode is the initial theme to match the references.

## Start

Use Node.js 22.13 or newer. Open this folder in VS Code:

```sh
npm ci
npx expo start --clear
```

Press `w` for the browser preview. A compatible Expo Go or development build can open the QR code. Keep the terminal running. If Expo Go reports an SDK mismatch, use a compatible version or development build.

This revision changes the entry point to `expo-router/entry`. Extract it into a new folder rather than combining it with the previous project. Then install dependencies using the included lockfile.

## Screens and interactions

| Screen | Navigation | Behavior |
| --- | --- | --- |
| Search | Tab | Horizontal recent cars and airport recommendations, text search, destination filters, budget filtering, vehicle selection |
| Favorites | Tab | Calgary list, stable vehicle IDs, remove/add favorites, list settings, trip dates, view details |
| Trips | Tab | Local demo bookings, vehicle details, cancel/keep confirmation |
| Inbox | Tab | Local demo message composer; sends no external messages |
| More | Tab | Profile editing with validation, saved counts, light/dark toggle |
| Vehicle details | Stack | Typed vehicle ID, features, specs, favorite toggle, share action, editable booking flow |
| Checkout | Stack | Date validation, 1–14 days, fee/tax breakdown, demo confirmation, return to Trips |

Routes live in `src/app/`. Root `_layout.tsx` defines the Stack; `(tabs)/_layout.tsx` defines the Tabs and custom floating tab bar. Screen implementations stay outside the route directory. The vehicle ID is passed as a URL/navigation parameter.

## Component organization

- `RecommendationCard` is shared by horizontally scrolling recommendation sections; compact and full layouts share typed vehicle data.
- `VehicleCard` renders searchable results, while `BookingCard` isolates trip and cancellation UI.
- `PriceSummary` keeps pricing presentation separate from checkout behavior.
- `FloatingTabBar` owns the five-tab presentation and uses the navigator's tab-press events.
- `UI.tsx` groups related small shared primitives such as Icon, Button and EmptyState.
- `RecommendationSection` and `Spec` stay with their parent screens because they are small helpers used by only one parent.
- `AppContext` owns favorites, bookings, profile and theme, with AsyncStorage hydration and persistence.
- `types.ts` defines props/models; `utils/booking.ts` owns date and pricing logic.

Icons come from Ionicons through `@expo/vector-icons`. All list keys use stable item IDs or unique feature labels, never array indexes. Large screen sections are organized into components rather than a single JSX block.

## References

The original screenshots are included under `reference/`:

1. `01-search.jpg`: dark Search home with recent cars and airport recommendations.
2. `02-vehicle-details.jpg`: Hyundai Elantra Hybrid details with specs, trip dates and sticky price bar.
3. `03-favorites.jpg`: Calgary list with Ford Mustang and floating navigation.

Reference text, colors, layout structure and car photos inform the implementation. Reference photos were cropped from the supplied images for educational use. Native status bars, iOS glass effects and exact font metrics differ by platform. Only one actual photo is available per demo vehicle; the photo count is therefore honestly shown as `1 of 1`. No claim of measured 80% similarity is made. See `docs/REFERENCE_COMPARISON.md` for the comparison and `docs/app-screenshots/` for implementation previews.

## Demo data and storage

The first launch shows one saved Mustang, as in the reference. Other listing specifications, hosts and prices are illustrative. The reference's static October 23–26 dates appear on details; checkout accepts your own valid dates. The flat $15 fee and 5% tax are classroom calculations, not Turo's fee schedule. No payment or real reservation is created.

This revision uses the `turo-explorer-v2` local storage key so the reference demo starts consistently; old v1 data is not deleted. New favorites, theme, profile and trips persist on the current device. Inbox messages last only while this screen is mounted.

## Checks

```sh
npm run typecheck
npm run lint
npm run export:all
```

See `VALIDATION.md` for the actual completed checks. Native bundle success does not replace iPhone and Android device testing.

## Submission

Upload the source, `package-lock.json`, and all three real reference screenshots to GitHub. Exclude `node_modules`, `dist` and `.expo`. Submit the repository URL to Brightspace. Keep genuine development commits grouped by complete changes; do not fabricate historical commits. Review and understand your implementation, and follow your instructor's AI-use rules.

## Documentation and sources

- https://docs.expo.dev/versions/v57.0.0/
- https://docs.expo.dev/router/installation/
- https://docs.expo.dev/router/advanced/tabs/
- https://docs.expo.dev/router/basics/navigation/
- Turo reference application: https://turo.com/
- See `ASSET_CREDITS.md` for images and icons.
