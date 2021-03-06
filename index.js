const Tail = require("always-tail");
const fs = require("fs");
const player = require("sound-play");
const filename = "C:/SteamGames/steamapps/common/Path of Exile/logs/Client.txt";
const clipboardy = require("clipboardy");

if (!fs.existsSync(filename)) fs.writeFileSync(filename, "");

const tail = new Tail(filename, "\n");

// clipboardy.writeSync("TEST");
console.log("poe-trade-watcher is running");
tail.on("line", function (data) {
  console.log(data);
  if (validate(data)) {
    console.log("Consuming: ", data);
    volume = 0.3;
    player.play("C:/Users/Sam Wang/Desktop/poe-trade-watcher/ping.mp3", volume);
  }
});

tail.on("error", function (data) {
  console.log("error:", data);
});

const validate = (str) => {
  if (str.includes("@From") && str.includes("Hi, I would like")) {
    return true;
  }

  return false;
};
