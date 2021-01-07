const noble = require('@abandonware/noble');

// see https://github.com/leoluk/dft200-go/blob/master/cmd/dft-cli/dft-cli.go
const commandStart = 0x01;
const commandStop = 0x02;
const commandSetSpeed = 0x03;
const commandPause = 0x04;

// rxChar receives notifications from the device
const rxCharUUID = "0000fff1-0000-1000-8000-00805f9b34fb"
// txChar sends commands to the device
const txCharUUID = "0000fff2-0000-1000-8000-00805f9b34fb"

async function sleep(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

async function findTreadmill() {
  console.error("finding treadmill");
  const handle = setInterval(() => console.error("still living"), 1000);
  return new Promise(async (resolve) => {
    noble.on('discover', async (peripheral) => {
      console.error("peripheral found " + peripheral.address)
      clearInterval(handle);
      if (!peripheral?.advertisement?.localName?.includes("V-RUN")) {
        return;
      }
      await noble.stopScanningAsync();
      resolve(peripheral);
    });
    console.error("start scanning for peripherals")
    await noble.startScanningAsync([], false);
  })
}

function calculateChecksum(array) {
  return array.reduce((a, b) => a + b) % 256;
}

async function executeCommand(command, arg) {
  const values = [0xf0, 0xc3, 0x03, command, arg ?? 0, 0];
  const checksum = calculateChecksum(values);
  const buffer = Buffer.from([...values, checksum]);

  const treadmill = await findTreadmill()

  console.error("treadmill found")

  await treadmill.connectAsync();

  const {characteristics} = await treadmill.discoverSomeServicesAndCharacteristicsAsync(
      ["fff0"], []);
  const writeCharacteristic = characteristics.find(
      characteristic => characteristic.uuid === "fff2");

  await sleep(1);

  await writeCharacteristic.writeAsync(buffer, true);
  await sleep(1);

  await treadmill.disconnectAsync();
}

async function executeWithTimeout(command, arg) {
  return Promise.race(
      [executeCommand(command, arg),
        sleep(4).then(() => {
          throw new Error("command timed out")
        })]
  )
}

async function start() {
  await executeWithTimeout(commandStart);
}

async function stop() {
  await executeWithTimeout(commandStop);
}

async function pause() {
  await executeWithTimeout(commandPause);
}

async function speed(speedLevel) {
  await executeWithTimeout(commandSetSpeed, speedLevel);
}

module.exports = {
  start, stop, pause, speed
};
