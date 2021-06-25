const Chatbot = require('../../schema/chatbot-schema');
const { normalization, natural } = require('./chatbot-service');

const GetView = async () => {
  return Chatbot.find().sort({createdAt: 'descending'});
};

const GetAll = async (activate, input) => {
  const question = await normalization(input);

  let data = await Chatbot.find({ activate });
  data = natural(question, data);

  return data;
};

const GetId = async (id) => {
  if (!id) throw new Error('id not informed!');

  return Chatbot.findById(id);
};

const Store = async (activate, input, output) => {
  return Chatbot.create({
    activate,
    input,
    output,
  });
};

const Update = async (_id, activate, input, output) => {
  if (!_id) throw new Error('id not informed!');

  return Chatbot.findByIdAndUpdate(
    _id,
    { activate, input, output },
    { new: true }
  );
};

module.exports = {
  GetView,
  GetAll,
  GetId,
  Store,
  Update,
};
