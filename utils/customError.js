// Reference: https://levelup.gitconnected.com/node-js-best-practices-error-handling-50719c42504f

class customError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

export default customError;
