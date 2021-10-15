function createErrorMessage(message) {
  return {
    success: false,
    message,
  };
}

module.exports = {
  createErrorMessage,
};
