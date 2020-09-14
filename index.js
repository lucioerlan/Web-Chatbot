const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const ip = require('ip');
require('dotenv').config();
require('colors');
const {
  responseMiddleware,
  unauthorizedMiddleware,
} = require('./src/middlewares');

const PORT = process.env.PORT;


const interfaceRoutes = require('./src/routes/interface-routes');
const adminRoutes = require('./src/routes/admin-routes');
const userRoutes = require('./src/routes/user-routes ');
const chatbotRoutes = require('./src/routes/chatbot-routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static(__dirname + '/src/views'));
app.use('/', [interfaceRoutes, adminRoutes, userRoutes, chatbotRoutes]);
app.use(responseMiddleware);
app.use(unauthorizedMiddleware);


// catch 404
app.use((req, res) =>
res.parseReturn({ status: 404, errors: [{ message: 'check route' }] })
);

// error handlers
app.use((err, req, res) => {
  // set locals, only providing error in development
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;

  // respond to client
  return res.status(status).json(error);
});


app.listen(PORT, () => {
  console.log(
    `Server is running at port ${PORT}, see more about the application on: http://${ip.address()}:${PORT}`
      .bgBlue
  );
});
