const multer = require('koa-multer');
const fs = require('fs')
const model = require('../model')

let Members = model.Members;

const storage = multer.diskStorage({
  // file saved path
  destination: function (req, file, cb) {
    cb(null, './static/upload')
  },
  // modify file name
  filename: function (req, file, cb) {
    let fileFormat = (file.originalname).split(".");
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
});

const upload = multer({
  storage
});

module.exports = {
  upload,
  'POST /upload/avatar': async (ctx) => {
    let file = ctx.req.file;
    let fileFormat = (file.originalname).split(".");
    let newName = file.destination + '/avatar/' + ctx.cookies.get('cid') + "." + fileFormat[fileFormat.length - 1];
    fs.renameSync(file.path, newName);
    let key = ctx.cookies.get('cid'),
      avatar = newName;
    let user = await Members.findAll({
      where: {
        email: key
      }
    });
    if (user.length > 0) {
      user[0].avatar = avatar;
      await user[0].save();
      ctx.body = {
        status: true,
        data: 'Update Avatar successully'
      }
    } else {
      ctx.body = {
        status: false,
        data: 'Update Avatar unsuccessully'
      }
    }
  },
  'POST /upload/courseware': async (ctx) => {
    let file = ctx.req.file;
    let fileFormat = (file.originalname).split(".");
    let newName = file.destination + '/courseware/' + ctx.cookies.get('cid') + "." + fileFormat[fileFormat.length - 1];
    fs.renameSync(file.path, newName);
    let key = ctx.cookies.get('cid');
    let user = await Members.findAll({
      where: {
        email: key
      }
    });
    if (user.length > 0) {
      user[0].filepath = ctx.cookies.get('cid') + "." + fileFormat[fileFormat.length - 1];
      await user[0].save();
      ctx.body = {
        status: true,
        data: ctx.cookies.get('cid') + "." + fileFormat[fileFormat.length - 1]
      }
    } else {
      ctx.body = {
        status: false,
        data: 'Upload courseware unsuccessully'
      }
    }
  }
};