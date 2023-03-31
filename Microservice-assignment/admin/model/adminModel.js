const { readFileSync } = require("fs");
let loadUser = () => {
  JSON.parse(readFileSync("adminList.json"));
};
module.exports = { loadUser };
