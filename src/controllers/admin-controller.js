const dbsql = require('../database/db-config');

/**
 * LOGIN  /ADMIN
 */

const adminSearch = async (req, res) => {
  try {
    let { user_name, password } = req.body;

    if (!user_name && !password) {
      user_name = false;
      password = false;
    }

    const result = await dbsql('user')
      .where('user_name', user_name)
      .andWhere('password', password)
      .first();

    if (result) {
      res.send(result);
    } else {
      res.send({ user_name: false, password: false });
    }

  } catch (err) {
    console.log({
      error: `adminSearch ${err}`,
    });
  }
};

module.exports = {
  adminSearch
};
