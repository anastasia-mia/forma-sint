function basicAuth(req, res, next) {
  const auth = req.headers.authorization;

  if(!auth || auth.indexOf("Basic ") === -1) {
    return res.status(401).json({message: 'Authentication required!'});
  }

  const base64Credentials = auth.slice("Basic ".length);
  const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
  const [username, password] = credentials.split(':');

  if(username === process.env.BASIC_AUTH_USERNAME && password === process.env.BASIC_AUTH_PASSWORD) {
    next();
  } else {
    return res.status(401).json({message: 'Authentication failed!'});
  }
}

module.exports = basicAuth;