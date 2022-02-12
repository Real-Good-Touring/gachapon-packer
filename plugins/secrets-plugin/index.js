module.exports = {
  onBuild: () => {
    var fs = require("fs");
    console.log("Generating secrets.json");

    var dictstring = JSON.stringify(process.env);
    fs.writeFile("secrets.json", dictstring);
  },
};
