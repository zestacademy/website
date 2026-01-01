# SendX Integration Setup

## ✅ Status: Ready for Deployment
The Firebase Cloud Function for sending SendX welcome emails has been fully coded and configured.

**Completed Steps:**
1. Created `functions` directory with TypeScript setup.
2. Implemented `onNewUserSignup` trigger in `functions/src/index.ts`.
3. Configured SendX API integration:
   - Triggers on new user creation.
   - Adds tag `welcome`.
   - Adds to list `336914`.
4. Set the API key in Firebase config (`sendx.api_key` has been set).
5. Updated `firebase.json` to include functions.

## 🚀 How to Resume
Once you have upgraded your Firebase project (**zest-academy**) to the **Blaze (Pay as you go)** plan:

1. **Open your terminal** to the project root:
   ```bash
   cd "d:\websites\git clone\e-academy"
   ```

2. **Deploy the functions**:
   ```bash
   firebase deploy --only functions
   ```

## 📋 Configuration Details
- **Trigger**: `auth.user().onCreate`
- **API Endpoint**: `POST https://app.sendx.io/api/v1/subscribers`
- **Environment config key**: `functions.config().sendx.api_key`

## 🧪 Testing
After deployment:
1. Go to the Firebase Console -> Authentication.
2. Manually add a new user (or sign up via your app).
3. Check the **SendX Dashboard** to see if the new contact appears with the tag `welcome`.
4. Check **Firebase Console -> Functions -> Logs** for success/error messages.
