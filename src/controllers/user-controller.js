const dbsql = require('../database/db-config');
const { datetimeNow } = require('../utils/current-date-time');


/**
 * CRUD USERS
 */

const userSearch = async (req, res) => {
  try {
    const { user_name, password } = req.body;

    const result = await dbsql('user')
      .where('user_name', user_name)
      .andWhere('password', password)
      .first();

    if (result) {
      res.send(result);
    } else {
      res.send({ message: 'data false' });
    }

  } catch (err) {
    console.log({ error: `userSearch ${err}` });
  }
};


const userFind = async (req, res) => {
  try {
    const result = await dbsql
      .select(
        '_id',
        'code_user',
        'activate',
        'full_name',
        'user_name',
        'email',
        'password'
      )
      .from('user');

    if (result) {
      res.send(result);
    } else {
      res.send({ message: 'data false' });
    }

  } catch (err) {
     console.log({ error: `userFind ${err}` });
  }
};


const userFindId = async (req, res) => {
  try {
    const { code_user } = req.body;

    const result = await dbsql
      .select('*')
      .from('user')
      .where('code_user', code_user);

    if (result) {
      res.send(result);
    } else {
      res.send({ message: 'data false' });
    }

  } catch (err) {
     console.log({ error: `userFindId ${err}` });
  }
};

const userInsert = async (req, res) => {
  try {
    let { activate, full_name, user_name, email, password } = req.body;

    await dbsql('user')
      .insert({
        code_user: datetimeNow(),
        activate,
        full_name,
        user_name,
        email,
        password,
      })
      .returning('*')

      .then(result => {
        console.log(result);
        res.send(result);
      })
      .catch(err => {
        console.log(err);
        res.send({ message: err });
      });

  } catch (err) {
     console.log({ error: `userInsert ${err}` });
  }
};


const updateUser = async (req, res) => {

	try {
    let objJSON = {};
    if(req.body.code_user) objJSON.code_user = Number(req.body.code_user);
    if(req.body.activate) objJSON.activate = Number(req.body.activate);
    if(req.body.full_name) objJSON.full_name = req.body.full_name;
    if(req.body.user_name) objJSON.user_name = req.body.user_name;
    if(req.body.email) objJSON.email = req.body.email;
    if(req.body.password) objJSON.password = req.body.password;
    
    const code_user = objJSON.code_user;
     await dbsql('user').where({code_user: code_user}).update(objJSON)     
      .then(function (result) {
      res.json(result);
    }).catch(err => {
      res.json({ message: err });
    });


	}catch(err) {
    console.log({ error: `updateUser ${err}` });
	}
};


const deleteUser = async (req, res) => {
  try {
    const { code_user } = req.body;

    await dbsql('user')
      .where('code_user', code_user)
      .del()

      .then(result => {
        res.json(result);
      }).catch(err => {
        res.json({ message: err });
      });

  } catch (err) {
    console.log({ error: `deleteUser ${err}` });
  }
};


module.exports = {
  userSearch,
  userFind,
  userFindId,
  userInsert,
  updateUser,
  deleteUser
};
