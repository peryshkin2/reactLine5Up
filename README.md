# reactLine5Up

June 25th, 2020
New branch started to save game in Redis DB, Jenkins is used to manage game in 2 or 3 Docker containers.
Development is done in Windows Laptop.

New rules of the game:
1. first player have to create game with name.
2. second player have to join this game.
3. Redis is used to save position and keep track of turns.

//==============================================================================================
game development was moved to Google Cloud url to invoke: https://line-5-up-95561.uc.r.appspot.com/

May 9th, 2020
Development was done in Linux virtual machine. 
local version server starts from:
/home/peryshkin/nodejs/node-v14.1.0-linux-x64/react2
node ../server.js &   // port 8081

compiler for JSX runs :
npx babel --watch src --out-dir . --presets react-app/prod  &

working at /home/peryshkin/nodejs/node-v14.1.0-linux-x64/react2

//--------------------------
/home/peryshkin/nodejs/node-v14.1.0-linux-x64/my-app/src
starting server port 3000 for one file index.js

npx create-react-app my-app
cd my-app
npm start

source code in ./src in index.js file

