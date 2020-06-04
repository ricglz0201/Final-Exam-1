function errorMessage(message, code, res) {
  res.statusMessage = message;
  return res.status(code).end();
}

function fieldMissingInBody(field, res) {
  return errorMessage(
    `${field} is missing in body`, 406, res
  );
}

function fieldsDontMatch(field1, field2, res) {
  return errorMessage(
    `${field1} and ${field2} don't match`, 409, res
  );
}

function fieldsMissing(field1, field2, res) {
  return errorMessage(
    `${field1} and ${field2} are needed, though weren't sent`, 403, res
  );
}

function notFound(record, res) {
  return errorMessage(
    `${record} was not found`, 404, res
  );
}

function alreadyExisted(record, res) {
  return errorMessage(
    `${record} already existed`, 400, res
  );
}

function errorHandler(req, res, next) {
  req.errorMessage = errorMessage;
  req.fieldMissingInBody = fieldMissingInBody;
  req.fieldsDontMatch = fieldsDontMatch;
  req.fieldsMissing = fieldsMissing;
  req.notFound = notFound;
  req.alreadyExisted = alreadyExisted;
  next();
}

module.exports = errorHandler;
