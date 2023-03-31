let fs = require("fs");
var adminList = JSON.parse(
  fs.readFileSync(__dirname + "/adminList.json", "utf8")
);
const numbers = { name: "abc", username: "abc@xyz.com", password: "abxdksahd" };

for (i = 0; i < adminList.length - 1; i++) {
  if (
    adminList[i].name === numbers.name &&
    adminList[i].username === numbers.username
  ) {
    console.log("1");
    break;
  } else {
    console.log("0");
  }
}
