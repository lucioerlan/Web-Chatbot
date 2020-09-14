const { resolve } = require('path');
const fs = require('fs');
const dbsql = require('../database/db-config');

const inicioInterface = async (req, res) => {
  try {
    res.set('Content-Type', 'text/html');
    const data = fs.readFileSync(
      resolve('./src/views/html/login.html'),
      'utf8'
    );
    res.send(data);
  } catch (err) {
    console.log({
      error: `loginInterface ${err}`,
    });
  }
};


const adminInterface = async (req, res) => {
  try {
    res.set('Content-Type', 'text/html');
    const data = fs.readFileSync(
      resolve('./src/views/html/admin.html'),
      'utf8'
    );
    res.send(data);
  } catch (err) {
    console.log({
      error: `adminInterface ${err}`,
    });
  }
};


const dashboardInterface = async (req, res) => {
  try {
    let { user_name, password } = req.query;

    if (!user_name && !password) {
      user_name = false;
      password = false;
    }

    const result = await dbsql('user')
      .where('user_name', user_name)
      .andWhere('password', password)
      .first();

    if (result && result.activate == 1) {
      let code_user = Number(result.code_user);
      res.set('Content-Type', 'text/html');
      let data = fs.readFileSync(
        resolve('./src/views/html/index.html'),
        'utf8'
      );
      data = data.replace('[code_user]', code_user);
      data = data.replace('[code_user]', code_user);
      data = data.replace('[code_user]', code_user);
      res.send(data);
    } else {
      res.set('Content-Type', 'text/html');
      const data = fs.readFileSync(
        resolve('./src/views/html/login.html'),
        'utf8'
      );
      res.send(data);
    }
  } catch (err) {
    console.log({
      error: `dashboardInterface ${err}`,
    });
  }
};

// Janela do Chatbot
const chatbotInterface = async (req, res) => {
  try {
    let code_user = -1;
    if (req.query.code_user) code_user = Number(req.query.code_user);
    res.set('Content-Type', 'text/html');
    let data = fs.readFileSync(
      resolve('./src/views/html/chatbot.html'),
      'utf8'
    );
    data = data.replace('[code_user]', code_user);
    res.send(data);
  } catch (err) {
    console.log({
      error: `dashboardInterface ${err}`,
    });
  }
};

const testeInterface = async (req, res) => {
  try {
    res.set('Content-Type', 'text/html');
    const data = fs.readFileSync(
      resolve('./src/views/html/teste.html'),
      'utf8'
    );
    res.send(data);
  } catch (err) {
    console.log({
      error: `testeInterface ${err}`,
    });
  }
};


module.exports = {
  inicioInterface,
  adminInterface,
  dashboardInterface,
  chatbotInterface,
  testeInterface
};
