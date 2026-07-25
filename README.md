# Docwise

Docwise is a React Native mobile application configured for multi-client Android releases. The app supports client-specific flavors for Mahuat, Omcuat, and Skruat, with client-specific environment values and separate Android package IDs.

## Overview

- React Native application with Android multi-flavor support
- Client-specific environment configuration through the app's config layer
- CI/CD pipeline for:
  - Firebase App Distribution for internal testing
  - Google Play Store internal testing via Fastlane
- GitHub Actions-based automation for build, packaging, and release

## Project structure

- android/ – Android native project, Gradle config, Fastlane setup, signing files
- android/app/build.gradle – product flavors and package IDs for each client
- android/fastlane/Fastfile – Fastlane lane for Google Play internal uploads
- .github/workflows/android-build.yml – GitHub Actions pipeline for Firebase and Play releases
- config/clients.yml – client metadata used to map flavors, package names, and Firebase apps
- src/config/env.js – runtime environment values generated during CI builds

## Prerequisites

- Node.js 22+
- Java 17
- Ruby 3.2+ with Bundler
- Android SDK and React Native environment configured
- Access to Firebase App Distribution and Google Play Console

## Local setup

1. Install JavaScript dependencies
   ```bash
   npm ci
   ```

2. Install Android Ruby dependencies
   ```bash
   cd android
   bundle install
   ```

3. Create the client environment file
   ```bash
   mkdir -p src/config
   ```

   Example:
   ```js
   // src/config/env.js
   export const BASE_URL = "https://your-api-url";
   export const CLIENT_NAME = "Mahuat";
   ```

4. Add Android signing files
   - Create android/keystore.properties
   - Place the release keystore at android/app/docwise-release.keystore

## Run locally

Start Metro:
```bash
npm start
```

Run the app on Android:
```bash
npm run android
```

## Build commands

Build a specific Android flavor:
```bash
cd android
./gradlew assembleMahuatRelease
./gradlew assembleSkruatRelease
./gradlew assembleOmcuatRelease
```

Build an Android App Bundle for Google Play:
```bash
cd android
./gradlew bundleSkruatRelease -PVERSION_CODE=100 -PVERSION_NAME=1.0.100
```

## CI/CD deployment flow

The release pipeline is defined in .github/workflows/android-build.yml.

### 1. Firebase App Distribution for internal testing

Before the app is published to Google Play, the workflow builds client-specific APKs and uploads them to Firebase App Distribution.

Flow:
- The workflow runs a matrix build for each enabled client
- It creates a client-specific environment file from GitHub secrets
- It builds an APK for the client flavor
- It uploads the APK to Firebase App Distribution with the group qa-testing

This step is used to quickly distribute internal builds to testers before final Play Store approval.

### 2. Google Play internal testing via Fastlane

After QA approval, the workflow builds an AAB and uploads it to Google Play internal testing using Fastlane.

The lane in android/fastlane/Fastfile performs the following:
- Finds the generated AAB for the selected client
- Uploads it to the Google Play internal track
- Uses the service account JSON from the Play Console

## Required GitHub secrets

The workflow expects the following secrets:

- FIREBASE_SERVICE_ACCOUNT
- KEYSTORE_PROPERTIES
- KEYSTORE_BASE64
- PLAY_ACCOUNT_JSON
- MAHUAT_BASE_URL
- OMCUAT_BASE_URL
- SKRUAT_BASE_URL

## Multi-client release model

The app is built with three Android product flavors:

- mahuat → com.docwise.mahuat
- omcuat → com.docwise.omcuat
- skruat → com.docwise.skruat

Each flavor can be released independently for internal testing and production rollout.

## Notes for maintainers

- Keep client-specific secrets in GitHub Actions secrets, not in source control
- Ensure the Firebase app IDs and Play package names match the intended client configuration
- Verify the generated AAB path before running the Fastlane deployment lane


## Architecture 
+---------------------------+
|        Developer          |
+-------------+-------------+
              |
              v
+----------------------------------------+
|          GitHub Actions CI/CD         |
|                                        |
|  Stage 1: APK Release Pipeline        |
|  - Build client-specific APKs         |
|  - Upload to Firebase App Distribution|
|  - Send to QA testers                 |
+------------------+---------------------+
                   |
                   v
+---------------------------+
|      QA Testing Phase     |
|  - Manual testing         |
|  - QA review              |
+-----------+---------------+
            |
            v
+---------------------------+
|  GitHub Environment Approval |
|  - Manual approval gate   |
+-----------+---------------+
            |
            v
+----------------------------------------+
|   Stage 2: Play Store Release Pipeline |
|  - Build AAB for each client          |
|  - Fastlane uploads to Play Store    |
|  - Deploy to Internal Testing track  |
+------