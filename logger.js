const winston = require("winston");
const remoteLog = new winston.transports.Http({
  host: "localhost",
  port: 5000,
  path: "/errors",
});

const consoleLog = new winston.transports.Console();

module.exports = {
  requestLogger: createRequestLogger([consoleLog]),
  errorLogger: createErrorLogger([remoteLog, consoleLog]),
};

function createRequestLogger(transports) {
  const requestLogger = winston.createLogger({
    format: getRequestLogFormatter(),
    transports: transports,
  });

  return function logRequest(req, res, next) {
    requestLogger.info({ req, res });
    next();
  };
}

function createErrorLogger(transports) {
  const errLogger = winston.createLogger({
    level: "error",
    transports: transports,
  });

  return function logError(err, req, res, next) {
    errLogger.error({ err, req, res });
    next();
  };
}

function getRequestLogFormatter() {
  const { combine, timestamp, printf } = winston.format;

  return combine(
    timestamp(),
    printf((info) => {
      const { req, res } = info.message;
      return `${info.timestamp} ${info.level}: ${req.hostname}${
        req.port || ""
      }${req.originalUrl}`;
    })
  );
}

// const logger = createLogger({
// level: "info",
// format: format.combine(
//   format.timestamp({
//     format: "YYYY-MM-DD HH:mm:ss",
//   }),
//   format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
// ),
// transports: [
//   new transports.Console({
//     level: "info",
//     format: format.combine(
//       format.colorize(),
//       format.printf(
//         (info) => `${info.timestamp} ${info.level}: ${info.message}`
//       )
//     ),
//   }),
// ],
// });

// const { createLogger, format, transports } = require("winston");

// app.use((req, res, next) => {
//   let oldSend = res.send;
//   console.log(res.statusCode);

//   res.send = function (data) {
//     console.log(data);
//     oldSend.apply(res, arguments);
//     // if (res.statusCode == 200) {
// logger.info(
// `Path: ${req.headers.host}${req.originalUrl}Status: ${
//   res.statusCode
// }, Method: ${req.method} Params: ${JSON.stringify(
//   req.params
// )}, Body: ${JSON.stringify(req.body)}, `,
// { ...req.body, status: res.statusCode, data: data }
// );
//     // }
//     // if (res.statusCode == 404) {
//     //   logger.error(
//     //     `Path: ${req.headers.host}${req.originalUrl},Status: ${
//     //       res.statusCode
//     //     },Method: ${req.method} Params: ${JSON.stringify(
//     //       req.params
//     //     )}, Body: ${JSON.stringify(req.body)}, `,
//     //     { ...req.body, status: res.statusCode, data: data }
//     //   );
//     // }
//   };
//   next();
// });
