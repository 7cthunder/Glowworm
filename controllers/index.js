// index:
const fs = require('fs');
const members = require('./members');

module.exports = {
  'GET /': async (ctx) => {
    ctx.response.redirect('/index');
  },

  'GET /index': async (ctx) => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream(__dirname + '/../index.html');
  },

  'GET /members': async (ctx) => {
    ctx.response.type = 'html';
    ctx.response.body = fs.createReadStream(__dirname + '/../static/html/members.html');
  },
  
  'GET /signin': async (ctx) => {
    ctx.response.type = 'html';
    if (ctx.cookies.get('cid') && ctx.cookies.get('cid') !== 'null') {
      ctx.response.redirect('/index');
    } else {
      ctx.response.body = fs.createReadStream(__dirname + '/../static/html/signin.html');
    }
  },

  'GET /signup': async (ctx) => {
    ctx.response.type = 'html';
    if (ctx.cookies.get('cid') !== 'null') {
      ctx.response.redirect('/index');
    } else {
      ctx.response.body = fs.createReadStream(__dirname + '/../static/html/signup.html');
    }
  }
};