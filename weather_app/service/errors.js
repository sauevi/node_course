const errorResponse = (place = '', code = 500) => ({
  error: true,
  info:
    code === 404 ? `${place}, was not found` : 'Opps... something went wrong'
});

// eslint-disable-next-line import/no-commonjs
module.exports.errorResponse = errorResponse;
