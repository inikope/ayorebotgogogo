'use strict';
const line = require('@line/bot-sdk');
const express = require('express');
var request = require("request");

// create LINE SDK config from env variables
const config = {
   channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
   channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express: https://expressjs.com/
const app = express();

app.get('/', (req, res) => {
    res.send('Res send!');
  });
  
  // register a webhook handler with middleware
  // about the middleware, please refer to doc
  app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result));
  });
  
  // event handler
  function handleEvent(event) {
    const sendHelp = { type: 'text', text:"RE:BOT dapat melakukan beberapa hal loh...\nCoba yuk command-command RE:BOT berikut ini!\n\n\n/𝐡𝐞𝐥𝐩 - Untuk melihat command yang kami punya\n/𝐯𝐢𝐝𝐞𝐨𝐢𝐠 - Untuk menyimpan video dari instagram\n/𝐟𝐨𝐭𝐨𝐢𝐠 - Untuk menyimpan foto dari instagram\n/𝐜𝐞𝐤𝐢𝐠 - Untuk mengecek profil instagram\n/𝐬𝐭𝐨𝐫𝐲𝐢𝐠 - Untuk menyimpan foto atau video dari instastory\n\n\n(star)"};
    const tutorFoto = { type: 'text', text:"Begini nih cara menggunakan commandnya\n\n/fotoig (link post instagram)"};
    const tutorVid = { type: 'text', text:"Begini nih cara menggunakan commandnya\n\n/videoig (link post instagram)"};
    const tutorStory = { type: 'text', text:"Begini nih cara menggunakan commandnya\n\n/storyig (username instagram)"};
    const tutorCek = { type: 'text', text:"Begini nih cara menggunakan commandnya\n\n/cekig (username instagram)"};
    const errormess = { type: 'text', text:"Terima kasih atas pesannya(blush)\nSayang sekali, akun ini masih goblok(hm)"};
    const sendIntro = { type: 'text', text: "RE:BOT dapat melakukan beberapa hal loh..\nCoba yuk!\nKetik /help untuk melihat command."};

    if (event.type !== 'message' || event.message.type !== 'text') {
      // ignore non-text-message event
      return client.replyMessage(event.replyToken, sendIntro);
    } else {
        const receivedMessage = event.message.text;
        if (receivedMessage.split(" ").length === 2){
            const splittedText = receivedMessage.split(" ");
            const inicommand = splittedText[0];
            const link = Number(splittedText[1]);
            switch (inicommand) {
                case '/videoig':
                    return client.replyMessage(event.replyToken, errormess);
                    break;
                case '/fotoig':
                    return client.replyMessage(event.replyToken, errormess);
                    break;
                case '/storyig':
                    return client.replyMessage(event.replyToken, errormess);
                    break;
                case '/cekig':
                    return client.replyMessage(event.replyToken, errormess);
                    break;
                default:
                    return client.replyMessage(event.replyToken, errormess);
                    break;
            }
        } else {
            if (receivedMessage.equals("/help")){
                return client.replyMessage(event.replyToken, sendHelp);
            } else if (receivedMessage.equals("/videoig")) {
                return client.replyMessage(event.replyToken, tutorVid);
            } else if (receivedMessage.equals("/fotoig")) {
                return client.replyMessage(event.replyToken, tutorFoto);
            } else if (receivedMessage.equals("/cekig")) {
                return client.replyMessage(event.replyToken, tutorCek);
            } else if (receivedMessage.equals("/storyig")) {
                return client.replyMessage(event.replyToken, tutorStory);
        }
    }
  }
  }  
  // listen on port
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`listening on ${port}`);
  });