# DriveRNCC

App that is created using React Native with Expo framework

Sample env.sample is provided on the root directory, add .env file with the contents of the env.sample file

To generate Google Maps API key use this [Link](https://developers.google.com/maps/documentation/javascript/get-api-key)

## Usage

First install expo to build the project

```
npm i -g expo-cli
```

On the root directory of the project run to install dependencies

```
yarn install
```

To run the app using expo run

```
npx expo start
```

then select from choices where to run

```
› Press a │ open Android
› Press i │ open iOS simulator
› Press w │ open web

› Press r │ reload app
› Press m │ toggle menu
› Press d │ show developer tools
```

if errors occurs when running try to show developers tools `(Press d)` and change connection to `Lan`

To directory run to Android device/emulator

```
npx expo start --android
```

To directly run to Simulator

```
npx expo start --ios
```

Or you can download "Expo Go" on GooglePlay or Appstore to run by scanning the QR from this link:

[Expo Go Link](https://expo.dev/preview/update?message=fix%20dependencies&updateRuntimeVersion=1.0.0&createdAt=2024-04-19T21%3A19%3A40.674Z&slug=exp&projectId=5b4d31d6-a7af-4d97-9c15-78d8dc01dbe2&group=650c3fed-85f9-4d6f-9aa9-7d0accc5e3a7)
