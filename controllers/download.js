const send = require('koa-send')
const model = require('../model')

let Members = model.Members;

module.exports = {
  'GET /downloads': async (ctx) => {
    let key = ctx.cookies.get('cid');
    let user = await Members.findAll({
      where: {
        email: key
      }
    });
    if (user.length > 0) {
      let fileName = user[0].filepath;
      ctx.attachment(fileName);
      await send(ctx, fileName, { root: __dirname + '/../static/upload/courseware' });
    }
  }
}