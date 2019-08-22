
# Load Testing Demo using K6.io

Uses a sample API defined here:

https://documenter.getpostman.com/view/8371151/SVYrseFN?version=latest

## Notes

* Run all commands below from the root directory of the project

## Setup

* Install Node.js - ([download](https://nodejs.org/en/download/))
* Install K6 - ([download](https://docs.k6.io/docs/installation))


## Run Tests

* Open the terminal to the root directory of this project

### Check Single Endpoint

`k6 run tests/sample.js`

### Create and Get Account

`k6 run tests/create_and_get_user.js`

### Upload and Get File

`k6 run tests/upload_and_get_file.js`
