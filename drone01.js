'use strict';

const arDrone = require('ar-drone');
const client = arDrone.createClient();

const pngStream = client.getPngStream();
let lastPng;

pngStream.on('error', console.log)
  .on('data', function(pngBuffer) {
    lastPng = pngBuffer;
  });

const delay = async (ms) => new Promise(resolve => { setTimeout(resolve, ms); });


const http = require('http');
const Koa = require('koa');
const app = new Koa();

const Router = require('koa-router');
const router = new Router();
app.use(router.routes()).use(router.allowedMethods());

const staticServer = require('koa-static');
app.use(staticServer(__dirname + '/public'));

router.get('/png', (ctx, next) => {
  if (lastPng) {
    //ctx.is('image/png')
    ctx.body= lastPng;
  } else {
    ctx.body='not ready';
  }
})

router.get('/api/:key', (ctx, next) => {
  // ctx.router available
  let key = ctx.params.key;
  // console.log(key);

  if (key === 'takeoff') {
    client.takeoff();
    console.log('TAKEOFF');
  } else if (key === 'land') {
    client.land();
    console.log('LAND');
  } else if (key === 'counterClockwise') {
    client.counterClockwise(0.5)
    client.after(100, function() {
        this.stop();
      })
  } else if (key === 'clockwise') {
    client.clockwise(0.5);
    client.after(100, function() {
        this.stop();
    })
  }
  else if (client[key]) {

    client[key](0.5);
    // .after(0, function() {
    //   this[key](0.5);
    // })
    client.after(100, function() {
      this.stop();
    })

  }

  /*
  switch (key) {
    case 'left':
      client
      .after(10, function() {
        this.left(0.5);
      })
      .after(500, function() {
        this.stop();
      })
      console.log(key);
      break;
    case 'right':
    client
    .after(10, function() {
      this(0.5);
    })
    .after(500, function() {
      this.stop();
    })
      console.log(key);
      break;
    case 'up':
      console.log(key);
      break;
    case 'down':
      console.log(key);
      break;
    case 'forward':
      console.log(key);
      break;
    case 'back':
      console.log(key);
      break;
    case 'takeoff':
      // client.takeoff();
      console.log(key);
      break;
    case 'land':
      console.log(key);
      break;
    default:

  }*/
  ctx.body = `<h2>Method ${key}</h2> `;
});


http.createServer(app.callback()).listen(3000);

/*
// client.takeoff();
// client.createRepl();

(async () => {
  // client.createRepl();
  //client.takeoff();

  await delay(2000);
  client.front(0.01);

  await delay(2000);
  client.back(0.01);

  await delay(2000);
  client.clockwise(0.01);

  await delay(2000);
  client.counterClockwise(0.01);

  await delay(2000);
  client.left(0.01);

  await delay(2000);
  client.right(0.01);

  await delay(2000);
  client.stop();

  await delay(2000);
  client.land();
})().catch( e => {console.error(e);});
*/
