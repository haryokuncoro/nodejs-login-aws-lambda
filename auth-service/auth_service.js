import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import AWS from "aws-sdk";

const app = express();
app.use(express.json());

const SECRET = process.env.JWT_SECRET || "super-secret-key";
const dynamo = new AWS.DynamoDB.DocumentClient({ region: "ap-southeast-2" });
const USERS_TABLE = process.env.USERS_TABLE || "Users";

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await dynamo.get({
      TableName: USERS_TABLE,
      Key: { username },
    }).promise();

    if (!result.Item) return res.status(401).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, result.Item.passwordHash);
    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    const payload = {
      sub: username,
      role: result.Item.role,
    };

    const token = jwt.sign(payload, SECRET, { expiresIn: "2h" });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(5000, () => console.log("✅ Auth service running on port 5000"));
