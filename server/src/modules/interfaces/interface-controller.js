const { resolve } = require('path');
const { readFileSync } = require('fs');
const { logger } = require('../../middlewares');

/**
 * The InterfaceController.
 *
 * @method home the website with chatbot
 * @method chatbot chatbot window
 */


class InterfaceController {
  async home(req, res) {
    try {
      res.set('Content-Type', 'text/html');

      const data = readFileSync(resolve('./src/views/html/home.html'), 'utf8');

      res.send(data);
    } catch (err) {
      logger.error(err.message);
    }
  }

  async chatbot(req, res) {
    try {
      res.set('Content-Type', 'text/html');
      const data = readFileSync(resolve('./src/views/html/chatbot.html'), 'utf8');

      res.send(data);
    } catch (err) {
      logger.error(err.message);
    }
  }
}

module.exports = InterfaceController;
