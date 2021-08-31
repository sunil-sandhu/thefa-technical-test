### Useful resources

- hosting a site on GCP: https://cloud.google.com/appengine/docs/standard/nodejs/building-app

Things I would have done if the task allowed for more time.

- Add TypeScript
- Include player statistics (at both national and club level)
- Include squad selections from previous matches
- Improved UI layout so that equally good to view on mobile, tablet, and desktop. at present, it's
  optimised more towards tablet and desktop, but not so much for mobile.
- would have shown the starting line up in their formation positions, and would have allowed for
  players to be moved around positions eg. moving an LCB to RCB, an LW to RW etc.
- If a position is full in the starting lineup, add subsequent selections in the same position to be
  added to the bench. At the moment you have to fill the starting lineup before players can be added
  to the bench
- I would have segmented some of the Redux reducers and actions further.
- The Redux state could have been segmented further. A lot of data sits inside of the 'formation'
  key which I do not like.
