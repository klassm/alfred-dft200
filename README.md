# Alfred Workflow to control your DFT200


Alfred workflow to start, stop, pause and set the speed of your DFT200.

Credits to [leoluk/dft200-go](https://github.com/leoluk/dft200-go) and [machinekoder/deskfit](https://github.com/machinekoder/deskfit)
for finding out how the interface to the DF200 works.

### Installation

* Download the [Artifact](https://nightly.link/klassm/alfred-dft200/workflows/package/master/alfred-dft200.alfredworkflow.zip)
* Double click / install to Alfred
* Make sure to provide Bluetooth permission to Alfred (or otherwise the treadmill will never be found)

The default keyword for your treadmill will be `l`.

The script will try to discover your treadmill. If the treadmill cannot be
discovered, the execution will fail after some seconds.


### Development

* Run `npm install` to install all dependencies
* Run `npm run alfredLink` to link the checked out version to your local Alfred instance.
Whatever changes you do, they will be directly visible within your Alfred instance.
