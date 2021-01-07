#!/usr/local/bin/node
const {start, stop, pause, speed} = require("./dft200");
const process = require("process");

args = process.argv;

const [option, param] = args[2].split(" ");

async function execute() {
  switch (option) {
    case "start":
      await start();
      return;

    case "pause":
      await pause();
      return;

    case "stop":
      await stop();
      return;

    case "speed":
      await speed(parseInt(param, 10));
      return;

    default:
      throw new Error(`unknown argument: ${option}`)
  }
}
setInterval(() => {}, 1000)

execute()
.then(() => {
  console.error("done")
  process.exit(0);
})
.catch(err => {
  throw new Error(`error during execution of ${option}: ${err.message}`);
});

