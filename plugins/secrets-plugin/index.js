module.exports = {
  onPreBuild: () => {
    var fs = require("fs");
    console.log("Generating secrets.json");
    console.log(process.cwd());

    let secretsObj = {};

    var pattern = /^GOOGLE__/;
    var matchingKeys = Object.keys(process.env).filter(function (key) {
      return pattern.test(key);
    });

    matchingKeys.forEach((x) => {
      secretsObj[x.replace("GOOGLE__", "")] = process.env[x].replace(
        "GOOGLE__",
        ""
      );
    });

    var json = JSON.stringify(secretsObj);

    console.log(json);
    fs.writeFileSync("secrets.json", json);
  },
};
