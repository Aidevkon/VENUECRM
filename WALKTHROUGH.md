# Firebase Migration Walkthrough

The database has been successfully migrated to Firebase Firestore. The application now uses the Firebase Admin SDK to handle form submissions for Reservations, Contact messages, and Private Events.

## Changes

### 1. Firebase Initialization

- **File**: `src/lib/firebase.ts`
- **Purpose**: Initializes the Firebase Admin SDK using environment variables.

### 2. API Routes

New API routes have been created to replace the previous ones.

#### Reservations

- **Endpoint**: `POST /api/reservations`
- **Collection**: `reservations`
- **Fields**: `name`, `email`, `date`, `guests`, and other form data.

#### Contact

- **Endpoint**: `POST /api/contact`
- **Collection**: `messages`
- **Fields**: `name`, `email`, `subject`, `message`.

#### Private Events

- **Endpoint**: `POST /api/private-events`
- **Collection**: `private-events`
- **Fields**: `eventType`, `guests`, `eventDate`, etc.

## Verification

### 1. Environment Variables

Ensure you have the following environment variables in your `.env` file:

```bash
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."
```

> [!TIP]
> You can get these from the Firebase Console Project Settings > Service Accounts.

### 2. Testing Forms

1. Start the development server: `npm run dev`
2. Navigate to the **Reservations**, **Contact**, and **Private Events** forms.
3. Fill out the forms and submit.
4. Check your Firestore console to see the new documents created in the respective collections.

### 3. Troubleshooting

- If you see "Internal Server Error", check your server logs. It usually means the environment variables are missing or incorrect.
- The `firebase.ts` utility will log a warning if env vars are missing.
