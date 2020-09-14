const dbsql = require('../database/db-config');
const { datetimeNow } = require('../utils/current-date-time');

/**
 * CRUD CHATBOT
 */

const chatbotFind = async (req, res) => {
  try {
    const result = await dbsql.select('*').from('chatbot');

    if (result) {
      res.send(result);
    } else {
      res.send({
        message: 'data false',
      });
    }
  } catch (err) {
    console.log({
      error: `chatbotFind ${err}`,
    });
  }
};

const chatbotFindId = async (req, res) => {
  try {
    const { code_current } = req.body;

    const result = await dbsql
      .select('*')
      .from('chatbot')
      .where('code_current', code_current);

    if (result) {
      res.send(result);
    } else {
      res.send({
        message: 'data false',
      });
    }

  } catch (err) {
    console.log({
      error: `chatbotFindId ${err}`,
    });
  }
};

const chatbotInsert = async (req, res) => {
  try {
    let {
      code_user,
      activate,
      code_current,
      code_relation,
      code_before,
      input,
      output,
    } = req.body;

    if (!code_current) {
      code_current = datetimeNow();
    }

    await dbsql('chatbot')
      .insert({
        code_user,
        activate,
        code_current: datetimeNow(),
        code_relation,
        code_before,
        input,
        output,
      })
      .returning('*')

      .then((result) => {
        console.log(result);
        res.send(result);
      })
      .catch((err) => {
        res.send({
          message: err,
        });
      });

  } catch (err) {
    console.log({
      error: `chatbotInsert ${err}`,
    });
  }
};

const chatbotUpdate = async (req, res) => {
  try {
    let objJSON = {};
    if (req.body.code_user) objJSON.code_user = Number(req.body.code_user);
    if (req.body.activate) objJSON.activate = Number(req.body.activate);
    if (req.body.code_current)
      objJSON.code_current = Number(req.body.code_current);
    if (req.body.code_relation)
      objJSON.code_relation = Number(req.body.code_relation);
    if (req.body.code_before)
      objJSON.code_before = Number(req.body.code_before);
    if (req.body.input) objJSON.input = req.body.input;
    if (req.body.output) objJSON.output = req.body.output;

    const code_current = objJSON.code_current;

    await dbsql('chatbot').where({code_current: code_current}).update(objJSON)     
     .then(function (result) {
     res.json(result);
   }).catch(err => {
     res.json({ message: err });
   });
   
  } catch (err) {
    console.log({
      error: `chatbotUpdate ${err}`,
    });
  }
};


const chatbotDelete = async (req, res) => {
  try {
    const { code_current } = req.body;

    await dbsql('chatbot')
      .where('code_current', code_current)
      .del()

      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json({
          message: err,
        });
      });

  } catch (err) {
    console.log({
      error: `chatbotDelete ${err}`,
    });
  }
};

const chatbotQuestion = async (req, res) => {
  try {
    let objJSON = {};
    if (req.query.code_user) objJSON.code_user = Number(req.query.code_user);
    else objJSON.code_user = 0;
    if (req.body.activate) objJSON.activate = Number(req.body.activate);
    else objJSON.activate = 1;
    if (req.query.code_before)
      objJSON.code_before = Number(req.query.code_before);
    else objJSON.code_before = 0;
    if (req.query.input) objJSON.input = req.query.input;
    else objJSON.input = '';

    const result = await dbsql.select('*').from('chatbot').where(objJSON);

    if (result.length <= 0) {
      let code_before = Number(objJSON.code_before);
      let objFind = {};
      if (code_before > 0) {
        objFind = {
          code_user: Number(objJSON.code_user),
          code_relation: code_before,
        };
      } else {
        objFind = {
          code_user: Number(objJSON.code_user),
        };
      }

      let result = await dbsql.select('*').from('chatbot').where(objFind);

      if (result.length <= 0) {
        const questionUser = abreviacoes(objJSON.input);

        let result = await dbsql
          .select('*')
          .from('chatbot')
          .where({
            code_user: Number(objJSON.code_user),
          });

        result = nlp(questionUser, result, Number(objJSON.code_user));
        res.send(result);
      } else {
        const questionUser = abreviacoes(objJSON.input);
        result = nlp(questionUser, result, Number(objJSON.code_user));
        res.send(result);
      }
    } else res.send(result);
  } catch (err) {
    console.log({
      error: `chatbotQuestion ${err}`,
    });
  }
};

const abreviacoes = function (Input = '') {
  try {
    Input = Input.toString().trim();
    let result = Input.replace(/ vc /g, 'você');
    result = result.replace(/ tb /g, 'também');
    result = result.replace(/ qts /g, 'quantos');
    result = result.replace(/ oq /g, 'o que');
    result = result.replace(/ td /g, 'tudo');
    result = result.replace(/ pq /g, 'por quê');
    result.toString().trim();
    return result;
  } catch (e) {
    return console.log({
      error: 'erro de requisição 35',
    });
  }
};

const nlp = function (question = '', array = [], code_user = -1) {
  let originalQuestion = question.toString().trim();
  try {
    let findInput = 0;
    let findIndex = 0;

    let documents;
    if (documents) {
      return [
        {
          _id: '0',
          code_user: code_user,
          activate: 1,
          code_current: -1,
          code_relation: -1,
          code_before: -1,
          input: originalQuestion,
          output: 'Ok! Entendido.',
        },
      ];
    } else {
      for (let i = 0; i < array.length; i++) {
        question = question.toString().trim();
        let input = array[i].input.toString().trim();
        if (input.length <= 0) input = array[i].output.toString().trim();
        question = question
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase();
        input = input
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase();
        question = question.replace(/[^a-zA-Z0-9\s]/g, '');
        input = input.replace(/[^a-zA-Z0-9\s]/g, '');

        let tokenizationQuestion = question.split(' ');
        let tokenizationInput = input.split(' ');

        tokenizationQuestion = tokenizationQuestion.map(function (e) {
          if (e.length > 3) return e.substr(0, e.length - 3);
          else return e;
        });
        tokenizationInput = tokenizationInput.map(function (e) {
          if (e.length > 3) return e.substr(0, e.length - 3);
          else return e;
        });

        let words = 0;
        for (let x = 0; x < tokenizationQuestion.length; x++) {
          if (tokenizationInput.indexOf(tokenizationQuestion[x]) >= 0) words++;
        }
        if (words > findInput) {
          findInput = words;
          findIndex = i;
        }
      }

      if (findInput > 0)
        return [
          {
            _id: array[findIndex]._id,
            code_user: array[findIndex].code_user,
            activate: array[findIndex].activate,
            code_current: array[findIndex].code_current,
            code_relation: array[findIndex].code_relation,
            code_before: array[findIndex].code_before,
            input: originalQuestion,
            output: array[findIndex].output,
          },
        ];
      else
        return [
          {
            _id: '0',
            code_user: array[findIndex].code_user,
            activate: array[findIndex].activate,
            code_current: array[findIndex].code_current,
            code_relation: array[findIndex].code_relation,
            code_before: array[findIndex].code_before,
            input: originalQuestion,
            output: 'Desculpe, mas não sei te responder.',
          },
        ];
    }
  } catch (e) {
    return [
      {
        _id: '0',
        code_user: code_user,
        activate: 0,
        code_current: 0,
        code_relation: 0,
        code_before: 0,
        input: originalQuestion,
        output: 'Desculpe, mas não sei te responder.',
      },
    ];
  }
};


module.exports = {
  chatbotFind,
  chatbotFindId,
  chatbotInsert,
  chatbotUpdate,
  chatbotDelete,
  chatbotQuestion,
};
