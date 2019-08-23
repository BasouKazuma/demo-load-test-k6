import http from "k6/http";
import { check, sleep } from "k6";

const BASE_URL = "http://ec2-34-209-166-136.us-west-2.compute.amazonaws.com:1323";

export let options = {
 stages: [
    { duration: "10s", target: 10 },
    { duration: "10s", target: 20  },
    { duration: "10s", target: 1 },
    { duration: "10s", target: 0 }
  ]
};

export default function() {
  let res = http.get(BASE_URL + "/");
  check(res, {
    "Status is 200": (r) => r.status == 200
  });
  sleep(1);
}
