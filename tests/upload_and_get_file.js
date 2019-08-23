import http from "k6/http";
import { check, sleep } from "k6";
import RandomData from "../helpers/random_data.js";

const BASE_URL = "http://ec2-34-209-166-136.us-west-2.compute.amazonaws.com:1323";
const FILES = JSON.parse(open("../resources/files.json"));

export let options = {
 stages: [
    { duration: "5s", target: 1 },
    { duration: "10s", target: 2 },
    { duration: "5s", target: 0 },
  ]
};

export function setup() {
  // Create User
  let email = RandomData.generateEmail();
  let userCreateRes = http.post(
    BASE_URL + "/user/create",
    JSON.stringify({
      email: email
    }),
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
  check(userCreateRes, {
    "Status Code is 201": (r) => r.status == 201,
    "Email Matches": (r) => r.json("email") == email
  });
  return {
    "user_id": userCreateRes.json("id")
  }
}

export default function(data) {
  // Upload File
  let filename = RandomData.generateFilename();
  let fileCreateRes = http.post(
    BASE_URL + "/user/" + data.user_id + "/file/create",
    JSON.stringify({
      user_id: data.user_id,
      name: filename,
      bytes: FILES.default.bytes
    }),
    {
      headers: {"Content-Type": "application/json" }
    }
  );
  check(fileCreateRes, {
    "Status Code is 201": (r) => r.status == 201,
    "User Id Matches": (r) => r.json("user_id") == data.user_id,
    "File Name Matches": (r) => r.json("name") == filename
  });
  // Pass new data to teardown
  data.file_name = filename;
  data.file_hash = fileCreateRes.json("hash");
};

export function teardown(data) {
  // Get Uploaded File
  let fileGetRes = http.get(
    BASE_URL + "/user/" + data.user_id + "/file/" + data.file_hash,
    JSON.stringify({}),
    { headers: { "Content-Type": "application/json" } }
  );
  check(fileGetRes, {
    "Status Code is 200": (r) => r.status == 200,
    "User Id Matches": (r) => r.json("user_id") == data.user_id,
    "File Name Matches": (r) => r.json("name") == data.file_name,
    "File Hash Matches": (r) => r.json("hash") == data.file_hash,
    "File Bytes Matches": (r) => r.json("bytes") == FILES.default.bytes
  });
}

