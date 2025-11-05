import bcrypt from "bcrypt";
import AWS from "aws-sdk";

const dynamo = new AWS.DynamoDB.DocumentClient({ region: "ap-southeast-2" });
const USERS_TABLE = "Users";

async function addUser(username, password, role = "user") {
  const passwordHash = await bcrypt.hash(password, 10);
  await dynamo.put({
    TableName: USERS_TABLE,
    Item: { username, passwordHash, role },
  }).promise();
  console.log(`✅ User ${username} added`);
}

addUser("user1", "StrongPassword123!", "user");
