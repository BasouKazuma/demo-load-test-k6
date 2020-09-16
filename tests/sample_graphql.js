import http from "k6/http";
import { check, sleep } from "k6";

const BASE_URL = "https://graphql.anilist.co";

export let options = {
  stages: [
     { duration: "3s", target: 1 },
     { duration: "3s", target: 2 },
     { duration: "3s", target: 0 },
   ]
 };

export function setup() {
  // setup code
  return {}
}

export default function() {
  let query = `
  {
    SiteStatistics{
      anime(sort: DATE, page: 1, perPage: 10) {
        pageInfo {
          total
          perPage
          currentPage
          lastPage
          hasNextPage
        }
      }
    }
  }`;
  let res = http.post(
    BASE_URL,
    JSON.stringify({ query: query }),
    { headers: { "Content-Type": "application/json" } }
  );
  check(res, {
    "Status is 200": (r) => r.status == 200
  });
}

export function teardown(data) {
    // teardown code
}
