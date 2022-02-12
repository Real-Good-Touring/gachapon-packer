module.exports = {
  onBuild: () => {
    var fs = require("fs");
    console.log("Generating secrets.json");
    console.log(process.cwd());
    console.log(__dirname);

    var dictstring = JSON.stringify(process.env);

    console.log(dictstring);
    fs.writeFileSync("./secrets.json", dictstring);
  },
};
