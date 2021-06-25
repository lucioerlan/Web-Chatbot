
/**
  * The Chatbot [functions]
  *
  * @function normalization convert nonverbal language
  * @function tokenizer Transfer of functions
  * @function natural Natural Language Processing Algorithm
  *
  */

const normalization = (input) => {
  try {
    let result = input.toString().trim();
    const mapObj = {
      ctz: 'certeza',
      dq: 'deque',
      oq: 'oque',
      pq: 'porquê',
      tb: 'também',
      td: 'tudo',
      vc: 'você',
      vdd: 'verdade',
    };
    result = result.replace(
      /\b(?:ctz|dq|oq|pq|tb|td|vc|vdd)\b/gi,
      matched => mapObj[matched]
    );

    return result;
  } catch (e) {
    return input;
  }
};

const cutStr = (value) => {
  const cutValue = !value ?
    new Error('error in cutting string') :
    value.map((e) => {
      if (e.length > 3) return e.substr(0, e.length - 3);

      return e;
    });

  return cutValue;
};

const formatStr = (value) => {
  const formattedValue = !value ?
    new Error('error formatting string') :
    value
    .toString()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-zA-Z0-9\s]/g, '')
    .toLowerCase()
    .split(' ');

  return formattedValue;
};

const tokenizer = (input, question) => {
  let questionF = formatStr(question);
  let inputF = formatStr(input);

  questionF = cutStr(questionF);
  inputF = cutStr(inputF);

  return {
    questionF,
    inputF,
  };
};

const natural = async (question, data) => {
  try {

    let findInput = 0;
    let findIndex = 0;

    for (let i = 0; i < data.length; i+=1) {
      const { input } = data[i];
      const { questionF, inputF } = tokenizer(input, question);

      let words = 0;
      for (let x = 0; x < questionF.length; x+=1) {
        if (inputF.indexOf(questionF[x]) >= 0) words+=1;
      }

      if (words > findInput) {
        findInput = words;
        findIndex = i;
      }
    }

    if (findInput > 0)
      return [{
        input: question,
        output: data[findIndex].output,
      }];

    return [{
      input: question,
      output: 'Desculpe, mas não sei te responder.',
    }];

  } catch (e) {
    return [{
      input: question,
      output: 'Desculpe, mas não sei te responder.',
    }];
  }
};


module.exports = {
  normalization,
  natural,
};
