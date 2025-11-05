const jwt = require("jsonwebtoken");

exports.handler = async (event) => {
  const token = event.headers?.Authorization || event.headers?.authorization;

  if (!token) {
    return respond(401, { error: "Missing token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "super-secret-key");
    return respond(200, { message: `Hello ${decoded.sub}`, user: decoded });
  } catch (err) {
    return respond(401, { error: "Invalid or expired token" });
  }
};

function respond(status, body) {
  return {
    statusCode: status,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  };
}
