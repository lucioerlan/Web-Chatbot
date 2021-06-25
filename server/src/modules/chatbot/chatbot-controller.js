const Util = require('../../utils/Utils');
const { GetView, GetAll, GetId, Store, Update, } = require('./chatbot-models');

const util = new Util();

/**
 * The ChatbotController.
 *
 * @method view select all records
 * @method index select all outputs by input
 * @method show select a record by id
 * @method store create record 
 * @method update update record 
 */


class ChatbotController {
  async view(req, res) {
    try {
      const data = await GetView();

      if (data) {
        util.setSuccess(200, data);
      } else {
        util.setError(400, 'no data!');
      }

      return util.send(res);
    } catch (err) {
      util.setError(500, err.message);
      return util.send(res);
    }
  }

  async index(req, res) {
    try {
      const { input, activate } = req.query;

      const data = await GetAll(activate, input);

      if (data) {
        util.setSuccess(200, data);
      } else {
        util.setError(400, 'no data!');
      }

      return util.send(res);
    } catch (err) {
      util.setError(500, err.message);
      return util.send(res);
    }
  }

  async show(req, res) {
    try {
      const { id } = req.query;

      const data = await GetId(id);

      if (data) {
        util.setSuccess(200, data);
      } else {
        util.setError(400, 'no data!');
      }

      return util.send(res);
    } catch (err) {
      util.setError(500, err.message);
      return util.send(res);
    }
  }

  async store(req, res) {
    try {
      const { activate, input, output } = req.body;

      const data = await Store(activate, input, output);

      if (data) {
        util.setSuccess(200, data);
      }

      req.io.emit('chatbot', data);
      return util.send(res);
    } catch (err) {
      util.setError(500, err.message);
      return util.send(res);
    }
  }

  async update(req, res) {
    try {
      const { _id, activate, input, output } = req.body;

      const data = await Update(_id, activate, input, output);

      if (data) {
        util.setSuccess(200, data);
      }

      req.io.emit('chatbot', data);
      return util.send(res);
    } catch (err) {
      util.setError(500, err.message);
      return util.send(res);
    }
  }
}

module.exports = ChatbotController;
