

# 🧩 AWS Lambda REST API with JWT Authentication (Auth Service + API Gateway)

This project demonstrates a **secure REST API** architecture using:

* **AWS Lambda** for serverless compute
* **API Gateway** for routing HTTP requests
* **DynamoDB** for user storage
* **JWT Authentication** for access control

---

## 📦 Project Overview

### 🔐 Auth Service (Lambda)

Handles user registration and login:

* `add-user` → create dummy user
* `auth-service` → validate credentials, return JWT

### ⚙️ API Service (Lambda)

Handles protected endpoints:

* Requires header:
  `Authorization: Bearer <JWT_TOKEN>`
* Verifies token using the same `JWT_SECRET`

---

## 🧠 Architecture Flow

```
+-------------+         +-------------------+         +---------------------+
|   Frontend  | <-----> |  Auth Service     | <-----> |   DynamoDB Users    |
| (React/Vue) |   JWT   |  (Lambda + API GW)|         | username, password  |
+-------------+         +-------------------+         +---------------------+
       |
       |  Authorization: Bearer <JWT>
       v
+------------------+
| Protected Lambda |
| (API Gateway)    |
+------------------+
```

---

## 🧱 DynamoDB Table Schema

| Attribute    | Type   | Key  |
| ------------ | ------ | ---- |
| username     | String | HASH |
| passwordHash | String | -    |

---

## Run
```
npm install
cd auth-service
node add_user.js
node auth_service.js

cd frontend
node test_api.js
```
