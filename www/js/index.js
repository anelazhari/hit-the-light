var DEVICE_ID = "00:14:01:17:10:88";

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        this.receivedEvent('deviceready');

        var bright = document.querySelector('.bright');
        var low = document.querySelector('.low');
        bright.onclick = app.bright;
        low.onclick = app.low;

        var div = document.querySelector('.app');
        app.info("Scanning!!");


        bluetoothSerial.connect(DEVICE_ID, app.connectCallback, app.disconnectCallback);

        // scan for any BLE devices for 10 seconds
        // ble.scan([], 10, app.onDeviceDiscovered);

        // ble.connect(DEVICE_ID, app.connectCallback, app.disconnectCallback);
        setTimeout(app.scanComplete, 105000);
    },

    onDeviceDiscovered: function(peripheral) {
        // print peripheral details to the the console and the UI
        //var peripheralString = JSON.stringify(peripheral, null, 2);
        //console.log(peripheralString);
        if (peripheral.id.startsWith('00:14')) {
            var div = document.querySelector('.app');
            var pre = document.createElement('pre');
            pre.innerText = peripheral.name + '/' + peripheral.id;
            div.appendChild(pre);
        }

    },

    info: function(info) {
        // update the UI indicating the scan is complete
        var infotext = document.querySelector('.info-text');
        infotext.innerHTML = info;
    },

    bright: function(info) {
        app.info('BRIGHT');
        bluetoothSerial.write("4", app.log, app.log);
    },

    low: function(info) {
        app.info('LOW');
        bluetoothSerial.write("1", app.log, app.log);

    },

    scanComplete: function() {
        // update the UI indicating the scan is complete
        app.info("Scan Completed!");
    },

    connectCallback: function() {
        // update the UI indicating the scan is complete
        app.info('We found the device!.');
    },

    disconnectCallback: function() {
        // update the UI indicating the scan is complete
        app.info('We did\'nt find the device.');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

var showAlert = function() {
    ons.notification.alert('Alert!');
  };

app.initialize();