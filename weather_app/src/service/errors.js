// eslint-disable-next-line import/no-commonjs
module.exports = (place = '', code = 500) => {
  const errorResp = {
    error: true,
    info: 'Opps... something went wrong'
  };

  switch (code) {
    case 404:
      errorResp.info = `${place}, was not found`;
      break;
    case 400:
      errorResp.info = `${place}, is not valid`;
      break;

    case 500:
    default:
      break;
  }

  return errorResp;
};
