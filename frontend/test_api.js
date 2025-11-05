async function test() {
  // 1️⃣ Login ke Auth Service
  const loginRes = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "user1", password: "StrongPassword123!" })
  });
  const { token } = await loginRes.json();

  console.log("Token:", token);

  // 2️⃣ Akses Lambda API Gateway
  const apiRes = await fetch("https://YOUR_API_ID.execute-api.ap-southeast-1.amazonaws.com/prod/protected", {
    headers: { "Authorization": token }
  });

  const data = await apiRes.json();
  console.log("Response:", data);
}

test();
