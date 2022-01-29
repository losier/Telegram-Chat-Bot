const express = require('express');
const telegramBot = require('node-telegram-bot-api');
const fetch = require('node-fetch');

const TOKEN = process.env['TOKEN'];
const apiKey = process.env['apiKey'];

const bot = new telegramBot(TOKEN, {polling: true});

const app = express()
app.get("/", (req, res) => {
  res.send("Lets's Fucking Go xD!")
})

app.listen(3000, () => {
  console.log('READY');
})

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];

  bot.sendMessage(chatId, resp);
});

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  
  try {
    fetch(`https://api.monkedev.com/fun/chat?msg=${msg.text}&uid=${msg.chat.id}&key=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        bot.sendMessage(chatId, data.response)
      })
  } catch (error) {
    console.log(error)
    bot.sendMessage(chatId, `Sorry, Something went wrong try again... \n or contact [Dev]mailto:nishu@duck.com`)
  }
});

