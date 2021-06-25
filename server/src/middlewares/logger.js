const { createLogger, format, transports } = require('winston');

const { combine, timestamp, simple, printf } = format;
const chalk = require('chalk');
const { get } = require('node-emoji');
const { datetimeNow } = require('../utils/current');
require('dotenv').config();

/**
 * Gets the logger instance
 * @returns {LoggerInstance} winLogger
 */

const timezonedTime = () => {
  const { datetimeNowFile } = datetimeNow();

  return datetimeNowFile;
};

const consoleFormat = printf(({ level, message }) => {
  if (level === 'error') return chalk` ${get('-1')}  {red ERROR}  ${message}`;
  if (level === 'warn')
    return chalk`${get('warning')}  {yellow WARN}  ${message}`;
  if (level === 'info') return chalk` ${get('+1')}  {green INFO}  ${message}`;
  return chalk` ${get('face_vomiting')}  {cyan ${level}}  ${message}`;
});

const logger = createLogger({
  format: combine(timestamp({ format: timezonedTime }), simple()),
  transports: [
    new transports.Console({
      colorize: true,
      format: consoleFormat,
    }),
    new transports.File({
      filename: 'Chatbot.log',
      maxSize: '50m',
      maxFiles: '20d',
      eol: '\r\n',
    }),
  ],
});

module.exports = {
  logger,
};
