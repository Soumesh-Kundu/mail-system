# Mail system

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

## Enviormental Variable

Needed Variables to run the app:

```bash
# url of the development server or deployed website
NUXT_BASE_URL

# MongoDB Realm api key Provided by API KEY Authentication in Realm app
NUXT_SERVER_API_KEY

# MongoDB Realm App ID
NUXT_APP_ID

# MongoDB Database name
NUXT_DB

# MongoDB Collection name for the database
NUXT_COLLECTION

# JSON Web Token secret : anything you like
NUXT_JWT_SECRET
```

## Prerequisites

### Devloper 

MongoDB:

1. Set up the MongoDB Realm App
2. Enable the API KEY Authentication
3. Get a API KEY from Realm
4. Set the API KEY with its associated ENV varialbe
5. Add "Read And Write All" rule to your collection of your chosen database

Any help follow MongoDB Realm [Docs](https://www.mongodb.com/docs/realm/)

### User(Vistor of website)

Google Cloud Console:

1. Should have an app Already Setup in their console (So the user can use the OAuth Credentials)
2. Make a OAuth Credentials
3. Give Redirect URI to the OAuth Credentials as the Home page/Authorize page state in the Our mail website
4. User should have enabled Gmail api in their console
5. User the Client ID and Client Secret give by the OAuth Credentials to Authroze to use the app

Note: This app uses a JWT token for secure api calls so any other user who have not authroize can't access that. JWT token will be set Cookies so the session will be temporary for the user. after closing the browser if the user comes again then he/she should have again authorize themselve with the correct credentials that they have previously given