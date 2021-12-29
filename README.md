# How to run Sleeper_Chat

You can run this app using development environment. I refered React-Native's official [setup guide](https://reactnative.dev/docs/environment-setup). You can learn how to setup develpment environment in the provided link or simply follow these steps:

## 1. Install `expo-cli`

Assuming you have `node.js` already installed in your machine, run following command in your terminal.

```
npm install -g expo-cli
```

Make sure `expo` command is activated in your terminal.

## 2. Clone the repository

Assuming you have `git` already installed in your machine, run follwing command in your terminal.

```
git clone https://github.com/hoiekim/sleeper_chat.git
```

This command will create a directory called `sleeper_chat` and copy all files in the repository to your local drive.

## 3. Install node packages

Go into the directory you created in step 2 using following command.

```
cd sleeper_chat
```

Install node packages using following command.

```
npm i
```

## 4. Run App

Run following command.

```
npm start
```

Information for connecting to the app will appear in the terminal(including a QR code). In the following steps, I will explain how to connect to the app using your mobile machine(IOS or Android)

## 5. Install `Expo Go` in your mobile machine

Download and install expo client(`Expo Go`) in your mobile machine. You can find the information in your mobile app market or in [this page](https://expo.dev/client).

## 6. Scan QR code in the terminal using your mobile machine

Use QR code reader app on Android or default camera app on IOS. Since you have `Expo Go` installed already, the QR code reader will let you open the app once you scan it.
