# CruiseCompare

## Current State
Full cruise comparison site with homepage, search results, deal detail, and Traveltek booking page. 10 mock cruise deals, destination cards, carrier pills, hero search form. Backend has CruiseDeal, Destination, Carrier types plus favorites.

## Requested Changes (Diff)

### Add
- Competitions feature: users can enter prize draws to win cruise credit/vouchers
- Competition data model: id, title, description, prizeAmount (Float), prizeType (Text), entryDeadline (Text), drawDate (Text), status (active/closed/drawn), totalEntries (Nat)
- CompetitionEntry data model: competitionId, entrantName, entrantEmail, userId
- Backend: createCompetition (admin only), getCompetitions, getCompetition(id), enterCompetition(id, name, email), getMyEntries
- `/competitions` page listing all active competitions with prize cards
- `/competitions/:id` detail + entry form page
- Homepage competitions promo banner ("Win up to $2,000 cruise credit!")
- "Win a Cruise" nav link in header

### Modify
- Header nav: add Competitions link
- Homepage: add competitions promo section

### Remove
N/A

## Implementation Plan
1. Backend: Add Competition and CompetitionEntry types with createCompetition (admin), getCompetitions, getCompetition, enterCompetition (one entry per user, captures name + email), getMyEntries.
2. Frontend `/competitions` listing page with prize draw cards.
3. Frontend `/competitions/:id` entry form with name + email input, confirmation state.
4. Homepage promo banner with countdown-style teaser.
5. Nav link update.
