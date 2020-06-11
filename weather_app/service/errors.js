const errorResponse = (location = '', code = 500) => ({
  success: false,
  data: {
    info:
      code === 404
        ? `${location}, was not found`
        : 'Opps... something went wrong'
  }
});

// eslint-disable-next-line import/no-commonjs
module.exports.errorResponse = errorResponse;
