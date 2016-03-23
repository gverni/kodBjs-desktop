# Description

This is a desktop application that allow users to remotely (or locally) modify Video / Audio library from Kodi. It's based on Kodi JSON RPC Interface v6 (more info here: http://kodi.wiki/view/JSON-RPC_API/v6). The app is based on node-webkit.


Code is really a mess. Main branch is alphadev. There are two other working branches:
- alphadev-modules: in this branch i'm trying orgamize the index.html into modules loading from other files. UPDATE: cherrypicked change to make modal into an external module 
- alphadev-backbone: i'm adding backbone into index.html. Started adding Model for MovieDetails. I'll add views and routing as next steps (this may render obsolete alphadev-modules branch). UPDATE: this branch has been merged into alphadev.

# Early screenshots

Main Screen

![MainScreen](https://raw.githubusercontent.com/gverni/kodBjs-desktop/alphadev/screenshot_main.jpg)

# Install

Assumes npm and bower are already installed globally. Execute the following commands:  

 `npm install`

 `bower install`

# Run

 From root directory run:

  `npm start`
