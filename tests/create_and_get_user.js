import http from "k6/http";
import { check, sleep } from "k6";
import RandomData from "../helpers/random_data.js";

const BASE_URL = "http://ec2-34-209-166-136.us-west-2.compute.amazonaws.com:1323";

export let options = {
 stages: [
    { duration: "5s", target: 1 },
    { duration: "10s", target: 2  },
    { duration: "5s", target: 0 },
  ]
};

export default function() {
  // Create User
  let email = RandomData.generateEmail();
  let userCreateRes = http.post(
    BASE_URL + "/user/create",
    JSON.stringify({ email: email }),
    { headers: { "Content-Type": "application/json" } }
  );
  check(userCreateRes, {
    "Status Code is 201": (r) => r.status == 201,
    "Email Matches": (r) => r.json("email") == email
  });
  // Get User
  let userGetRes = http.get(
    BASE_URL + "/user/" + userCreateRes.json("id"),
    JSON.stringify({}),
    { headers: { "Content-Type": "application/json" } }
  );
  check(userGetRes, {
    "Status Code is 200": (r) => r.status == 200,
    "User Id Matches": (r) => r.json("id") == userCreateRes.json("id"),
    "Email Matches": (r) => r.json("email") == userCreateRes.json("email")
  });

  sleep(1);
};
