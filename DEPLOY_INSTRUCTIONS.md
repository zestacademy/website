
# 🔒 Security Rules Update Required

To make the new **Quiz** and **Leaderboard** features work, you must update your Firebase Security Rules.
We have already updated the `firestore.rules` file locally.

## How to Deploy

Run this command in your terminal:

```bash
npx firebase deploy --only firestore:rules
```

If you are not logged in, run:
```bash
npx firebase login
```

## What Changed?
1. **Quiz Attempts**: Added permission for users to save their quiz results.
2. **Leaderboards**: Added permission for users to post their scores to the public leaderboard.

After deploying, the "Missing or insufficient permissions" error will disappear.
