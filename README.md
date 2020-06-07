# Web

![Image of register](https://github.com/ggmorais/ecoleta/blob/master/web/examples/web_01.png)
![Image of logon](https://github.com/ggmorais/ecoleta/blob/master/web/examples/web_02.png)
![Image of profile](https://github.com/ggmorais/ecoleta/blob/master/web/examples/web_03.png)

# Mobile
<img width="261" height="464" align="left" src="https://github.com/ggmorais/ecoleta/blob/master/mobile/examples/mobile_01_selector.jpeg" />
<img width="261" height="464" align="left" src="https://github.com/ggmorais/ecoleta/blob/master/mobile/examples/mobile_03.jpeg" />
<img width="261" height="464"  src="https://github.com/ggmorais/ecoleta/blob/master/mobile/examples/mobile_02.jpeg" />

# What is it
Its an project that I made in Environment Week for my portfolio and for learning purpose when I participated in Next Level Week from Rocketseat

# Getting it

* Requirements:
  * Node JS
  * npm or yarn
  * git

* `git clone https://github.com/ggmorais/ecoleta`
* `cd ecoleta`

## Server

first `cd server`

* Running:
  * `yarn && yarn dev` or `npm install && npm run dev` in the root

## Web

first `cd web`

* Environment configuration:
  * navigate to `src/services/api.js` and edit the baseUrl port to your backend port (by default is 5000)
* Running:
  * `yarn && yarn start` or `npm install && npm start` in the root


## Mobile

first `cd mobile`

for that you will need an android/ios emulator

* Environment configuration:
  * navigate to `src/services/api.js` and edit the baseUrl port to your backend port (by default is 5000)
* Running:
  * `yarn` or `npm install` in the root
  * Android: `yarn android` or `npm run android`
  * IOS: `yarn ios` or `npm run ios`
