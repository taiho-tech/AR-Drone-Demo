# AR-Drone-Demo
## Useage
### Install
1. node.js  
We need node.js 7.5+ to active [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) feature.  
Down load newest Node.js [here](https://nodejs.org/en/download/current/) or use tools like [NVM](https://github.com/creationix/nvm) or [nodenv](https://github.com/nodenv/nodenv)   
2. Dependencies   
Use `npm i` to install all dependencies.  
This app need to download [jQuery](https://jquery.com/) and [jQuery Mobile](http://jquerymobile.com/) from CDN once  
so open `localhost:3000` once under normal wifi before connect to Drone  

### Start Flying
1. Run `node drone01.js` under under normal wifi, and open `localhost:3000` in a [modern browser](http://outdatedbrowser.com/en)
2. When page shown, plz stop node server promptly, and connect to Drone's wifi
3. Run `node drone01.js` again, refresh page `localhost:3000`, and enjoy your air trip ;)

## License
MIT