const isDebug = process.env.DEBUG === 1;

module.exports = message =>
    isDebug ? (console.log(message), true) : false;
