# Video Follow Up

TV Time-style show tracker (Expo + React Native + TMDB).

This product uses the TMDB API but is not endorsed or certified by TMDB.

## Get the APK (GitHub Actions)
1. Repo Settings > Secrets and variables > Actions > New repository secret
   - Name: `TMDB_KEY`
   - Value: your TMDB v3 API key
2. Go to the Actions tab > "Build Android APK" > Run workflow (it also runs on every push to main)
3. When it finishes (about 10-20 minutes), open the run and download the `video-follow-up-apk` artifact
4. Unzip it and install the .apk on your phone (Android will ask you to allow installs from your browser or file manager)

The APK is built for 64-bit ARM phones (nearly all modern Android devices).

## Run in development
1. Get a free API key (v3) at https://www.themoviedb.org/settings/api
2. `cp .env.example .env` and paste the key
3. `npm install && npx expo install --fix`
4. `npx expo start`, then open in Expo Go

## Known limits
- The key ships inside the app. Fine for personal use; before publishing, route calls through your own backend.
- Watchlist and watched episodes are stored on the device only (no accounts or sync yet).
- Upcoming uses each show's next and latest episode from TMDB; no push notifications yet.
- Movies in an actor's filmography are listed but have no detail page.
