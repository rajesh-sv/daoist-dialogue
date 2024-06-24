export default function logRequestRoutes(req, res, next) {
  console.log(req.url);
  next();
}
