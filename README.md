# React Firebase Auth

This is a prototype replacement for the current Bowers login page hosted in Magento at [https://shop.bowerswilkins.com/customer/account/login/](https://shop.bowerswilkins.com/customer/account/login/).

It is designed to work in conjunction with the Magento extension in the [Magento Bowers Login](https://github.com/bowerswilkins/magento-bowers-login) project.

## Setup

This app requires the Firebase js sdk and a Firebase application config. [Click here](https://console.firebase.google.com/u/1/project/bowers-services/settings/general/web:NTZkMmQ5ODktOGZiNi00NzFjLTg1ODktMjExNTVmODA4MTVm) to go to the Firebase console for the project.

Install the project dependencies.

```shell
npm i
```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run prodbuild`

Generates a minified production build.