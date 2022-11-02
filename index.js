const mediaSelector = document.getElementById("media");

const webCamContainer =
	document.getElementById("web-cam-container");

let selectedMedia = null;

// This array stores the recorded media data
let chunks = [];

// Handler function to handle the "change" event
// when the user selects some option
mediaSelector.addEventListener("change", (e) => {

	// Takes the current value of the mediaSeletor
	selectedMedia = e.target.value;

	document.getElementById(
		`${selectedMedia}-recorder`)
			.style.display = "block";

	document.getElementById(
			`${otherRecorderContainer(
			selectedMedia)}-recorder`)
		.style.display = "none";
});

function otherRecorderContainer(
	selectedMedia) {

	return selectedMedia === "vid" ?
		"aud" : "vid";
}

// This constraints object tells
// the browser to include only
// the audio Media Track
const audioMediaConstraints = {
	audio: true,
	video: false,
};

// This constraints object tells
// the browser to include
// both the audio and video
// Media Tracks
const videoMediaConstraints = {

	// or you can set audio to
	// false to record
	// only video
	audio: true,
	video: true,
};

// When the user clicks the "Start
// Recording" button this function
// gets invoked
function startRecording(
	thisButton, otherButton) {

	// Access the camera and microphone
	navigator.mediaDevices.getUserMedia(
		selectedMedia === "vid" ?
		videoMediaConstraints :
		audioMediaConstraints)
		.then((mediaStream) => {

		// Create a new MediaRecorder instance
		const mediaRecorder =
			new MediaRecorder(mediaStream);

		//Make the mediaStream global
		window.mediaStream = mediaStream;
		//Make the mediaRecorder global
		window.mediaRecorder = mediaRecorder;

		mediaRecorder.start();

		// Whenever (here when the recorder
		// stops recording) data is available
		// the MediaRecorder emits a "dataavailable"
		// event with the recorded media data.
		mediaRecorder.ondataavailable = (e) => {

			// Push the recorded media data to
			// the chunks array
			chunks.push(e.data);
		};

		// When the MediaRecorder stops
		// recording, it emits "stop"
		// event
		mediaRecorder.onstop = () => {

			/* A Blob is a File like object.
			In fact, the File interface is
			based on Blob. File inherits the
			Blob interface and expands it to
			support the files on the user's
			systemThe Blob constructor takes
			the chunk of media data as the
			first parameter and constructs
			a Blob of the type given as the
			second parameter*/
			const blob = new Blob(
				chunks, {
					type: selectedMedia === "vid" ?
						"video/mp4" : "audio/mpeg"
				});
			chunks = [];

			// Create a video or audio element
			// that stores the recorded media
			const recordedMedia = document.createElement(
				selectedMedia === "vid" ? "video" : "audio");
			recordedMedia.controls = true;

			// You can not directly set the blob as
			// the source of the video or audio element
			// Instead, you need to create a URL for blob
			// using URL.createObjectURL() method.
			const recordedMediaURL = URL.createObjectURL(blob);

			// Now you can use the created URL as the
			// source of the video or audio element
			recordedMedia.src = recordedMediaURL;

			// Create a download button that lets the
			// user download the recorded media
			const downloadButton = document.createElement("a");

			// Set the download attribute to true so that
			// when the user clicks the link the recorded
			// media is automatically gets downloaded.
			downloadButton.download = "Recorded-Media";

			downloadButton.href = recordedMediaURL;
			downloadButton.innerText = "Download it!";

			downloadButton.onclick = () => {

				/* After download revoke the created URL
				using URL.revokeObjectURL() method to
				avoid possible memory leak. Though,
				the browser automatically revokes the
				created URL when the document is unloaded,
				but still it is good to revoke the created
				URLs */
				URL.revokeObjectURL(recordedMedia);
			};

			document.getElementById(
				`${selectedMedia}-recorder`).append(
				recordedMedia, downloadButton);
		};

		if (selectedMedia === "vid") {

			// Remember to use the srcObject
			// attribute since the src attribute
			// doesn't support media stream as a value
			webCamContainer.srcObject = mediaStream;
		}

		document.getElementById(
				`${selectedMedia}-record-status`)
				.innerText = "Recording";

		thisButton.disabled = true;
		otherButton.disabled = false;
	});
}

function stopRecording(thisButton, otherButton) {

	// Stop the recording
	window.mediaRecorder.stop();

	// Stop all the tracks in the
	// received media stream
	window.mediaStream.getTracks()
	.forEach((track) => {
		track.stop();
	});

	document.getElementById(
			`${selectedMedia}-record-status`)
			.innerText = "Recording done!";
	thisButton.disabled = true;
	otherButton.disabled = false;
}
button.addEventListener('pointerup', function(event) {
  // Call navigator.bluetooth.requestDevice
});
navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] })
.then(device => { /* … */ })
.catch(error => { console.error(error); });

navigator.bluetooth.requestDevice({
  filters: [{
    services: [0x1234, 0x12345678, '99999999-0000-1000-8000-00805f9b34fb']
  }]
})
.then(device => { /* … */ })
.catch(error => { console.error(error); });
navigator.bluetooth.requestDevice({
  filters: [{
    name: 'Francois robot'
  }],
  optionalServices: ['battery_service'] // Required to access service later.
})
.then(device => { /* … */ })
.catch(error => { console.error(error); });
// Filter Bluetooth devices from Google company with manufacturer data bytes
// that start with [0x01, 0x02].
navigator.bluetooth.requestDevice({
  filters: [{
    manufacturerData: [{
      companyIdentifier: 0x00e0,
      dataPrefix: new Uint8Array([0x01, 0x02])
    }]
  }],
  optionalServices: ['battery_service'] // Required to access service later.
})
.then(device => { /* … */ })
.catch(error => { console.error(error); });
navigator.bluetooth.requestDevice({
  acceptAllDevices: true,
  optionalServices: ['battery_service'] // Required to access service later.
})
.then(device => { /* … */ })
.catch(error => { console.error(error); });
navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] })
.then(device => {
  // Human-readable name of the device.
  console.log(device.name);

  // Attempts to connect to remote GATT Server.
  return device.gatt.connect();
})
.then(server => { /* … */ })
.catch(error => { console.error(error); });
navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] })
.then(device => device.gatt.connect())
.then(server => {
  // Getting Battery Service…
  return server.getPrimaryService('battery_service');
})
.then(service => {
  // Getting Battery Level Characteristic…
  return service.getCharacteristic('battery_level');
})
.then(characteristic => {
  // Reading Battery Level…
  return characteristic.readValue();
})
.then(value => {
  console.log(`Battery percentage is ${value.getUint8(0)}`);
})
.catch(error => { console.error(error); })

.then(characteristic => {
  // Set up event listener for when characteristic value changes.
  characteristic.addEventListener('characteristicvaluechanged',
    handleBatteryLevelChanged);
  // Reading Battery Level…
  return characteristic.readValue();
})
.catch(error => { console.error(error); });

function handleBatteryLevelChanged(event) {
  const batteryLevel = event.target.value.getUint8(0);
  console.log('Battery percentage is ' + batteryLevel);
}

navigator.bluetooth.requestDevice({ filters: [{ services: ['heart_rate'] }] })
.then(device => device.gatt.connect())
.then(server => server.getPrimaryService('heart_rate'))
.then(service => service.getCharacteristic('heart_rate_control_point'))
.then(characteristic => {
  // Writing 1 is the signal to reset energy expended.
  const resetEnergyExpended = Uint8Array.of(1);
  return characteristic.writeValue(resetEnergyExpended);
})
.then(_ => {
  console.log('Energy expended has been reset.');
})
.catch(error => { console.error(error); });

navigator.bluetooth.requestDevice({ filters: [{ name: 'Francois robot' }] })
.then(device => {
  // Set up event listener for when device gets disconnected.
  device.addEventListener('gattserverdisconnected', onDisconnected);

  // Attempts to connect to remote GATT Server.
  return device.gatt.connect();
})
.then(server => { /* … */ })
.catch(error => { console.error(error); });

function onDisconnected(event) {
  const device = event.target;
  console.log(`Device ${device.name} is disconnected.`);
}
navigator.bluetooth.requestDevice({ filters: [{ services: ['health_thermometer'] }] })
.then(device => device.gatt.connect())
.then(server => server.getPrimaryService('health_thermometer'))
.then(service => service.getCharacteristic('measurement_interval'))
.then(characteristic => characteristic.getDescriptor('gatt.characteristic_user_description'))
.then(descriptor => descriptor.readValue())
.then(value => {
  const decoder = new TextDecoder('utf-8');
  console.log(`User Description: ${decoder.decode(value)}`);
})
.catch(error => { console.error(error); });

navigator.bluetooth.requestDevice({ filters: [{ services: ['health_thermometer'] }] })
.then(device => device.gatt.connect())
.then(server => server.getPrimaryService('health_thermometer'))
.then(service => service.getCharacteristic('measurement_interval'))
.then(characteristic => characteristic.getDescriptor('gatt.characteristic_user_description'))
.then(descriptor => {
  const encoder = new TextEncoder('utf-8');
  const userDescription = encoder.encode('Defines the time between measurements.');
  return descriptor.writeValue(userDescription);
})
.catch(error => { console.error(error); });
