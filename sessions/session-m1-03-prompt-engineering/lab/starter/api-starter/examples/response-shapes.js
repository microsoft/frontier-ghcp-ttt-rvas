function success(data) {
  return { data };
}

function failure(message) {
  return { error: message };
}

module.exports = { failure, success };
