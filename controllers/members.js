const model = require('../model')

let Members = model.Members;

module.exports = {
  'GET /getMembers': async (ctx) => {
    ctx.response.type = 'application/json';
    let users = await Members.findAll();
    ctx.response.body = {
      status: true,
      data: users
    }
  },

  'POST /signup': async (ctx) => {
    let form = ctx.request.body;
    ctx.response.type = 'application/json';
    if (form.code === 'GLOW-WORM-EDUX') {

      let result = await Members.findAll({
        where: {
          email: form.email
        }
      });

      // Email has been registered
      if (result.length > 0) {
        ctx.response.body = {
          status: false,
          data: 'Email has been registered!'
        }
      }

      // Register successfully
      await Members.create({
        email: form.email,
        name: form.username,
        password: form.password,
        avatar: './static/images/default.png',
        intro: '这个人很懒什么都没留下',
        filepath: ''
      })

      ctx.cookies.set('cid', ctx.request.body.email, {
        path: '/',
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: false,
        overwrite: false
      })

      ctx.response.body = {
        status: true,
        data: {
          email: form.email
        }
      }
    } else {
      ctx.response.body = {
        status: false,
        data: 'Wrong Registration Code!'
      }
    }
  },

  'POST /signin': async (ctx) => {
    let form = ctx.request.body;
    ctx.response.type = 'application/json';
    let result = await Members.findAll({
      where: {
        email: form.email,
        password: form.password
      }
    });

    if (result.length === 0) {
      ctx.response.body = {
        status: false,
        data: 'User doesn\'t exist or password is wrong'
      }
    }

    ctx.cookies.set('cid', ctx.request.body.email, {
      path: '/',
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: false,
      overwrite: false
    })

    ctx.response.body = {
      status: true,
      data: 'Signin successfully!'
    }
  },

  'GET /getUser': async (ctx) => {
    ctx.response.type = 'application/json';
    let key = ctx.cookies.get('cid');
    let user = await Members.findAll({
      where: {
        email: key
      }
    });
    if (user.length > 0) {
      ctx.body = {
        status: true,
        data: {
          email: user[0].email,
          name: user[0].name,
          avatar: user[0].avatar,
          intro: user[0].intro,
          filepath: user[0].filepath
        }
      }
    } else {
      ctx.body = {
        status: false,
        data: 'Get user unsuccessully'
      }
    }
  },

  'POST /updateUser': async (ctx) => {
    ctx.response.type = 'application/json';
    let form = ctx.request.body;
    let user = await Members.findAll({
      where: {
        email: form.email
      }
    });
    if (user.length > 0) {
      user[0].name = form.username;
      user[0].intro = form.intro;
      await user[0].save();
      ctx.body = {
        status: true,
        data: 'Update user info successully'
      }
    } else {
      ctx.body = {
        status: false,
        data: 'Update user info unsuccessully'
      }
    }
  }
}