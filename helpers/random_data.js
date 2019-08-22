'use strict';

module.exports = {
  generateEmail,
  generateFilename
};

const FILES = JSON.parse(open("../resources/files.json"));
import Faker from "cdnjs.com/libraries/Faker";

function generateEmail() {
  // generate data with Faker:
  let base_email = Faker.internet.exampleEmail();
  let timestamp = Math.round((new Date()).getTime() / 1000);
  let emailParts = base_email.split('@');
  let email = emailParts[0] + "+" + timestamp + "@" + emailParts[1];
  return email;
}

function generateFilename() {
  // generate data with Faker:
  let base_filename = Faker.system.fileName();
  let timestamp = Math.round((new Date()).getTime() / 1000);
  let filenameParts = base_filename.split('.');
  let filename = filenameParts[0] + "_" + timestamp + "." + filenameParts[1];
  return filename;
}
