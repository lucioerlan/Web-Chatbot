const assert = require('assert');
const Chatbot = require('../../src/schema/chatbot-schema');

let chatbot;

describe('Creating Question', () => {
  it('creates a question', (done) => {
    chatbot = new Chatbot({
      active: 1,
      input: 'irmão do seu avô é o que seu',
      output: 'tio-avô'
    });
    chatbot.save().then(() => {
      assert(!chatbot.isNew);
      done();
    });
  });
});

describe('Reading Question', () => {
  it('finds Question with input', (done) => {
    Chatbot.findOne({ input: 'irmão do seu avô é o que seu' }).then(() => {
      assert(chatbot.input === 'irmão do seu avô é o que seu');
      done();
    });
  });
});

describe('Update Question', () => {
  it('update a question', (done) => {
    Chatbot.findOneAndUpdate(
      { input: 'irmão do seu avô é o que seu' },
      { input: 'qualquer' }
    )
      .then(() => Chatbot.findOne({ input: 'qualquer' }))
      .then((res) => {
        assert(res.input === 'qualquer');
        done();
      });
  });
});

describe('Delete Question', async () => {
  it('successful in deleting all records', (done) => {
    Chatbot.deleteMany((error) => {
      if (error) throw error;
    });
    done();
  });
});
