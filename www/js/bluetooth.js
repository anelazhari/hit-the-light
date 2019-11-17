var DEVICE_ID = "00:14:01:17:10:88";

var bluetooth = {
    write: function(payload) {
        app.info('Writing...')
        bluetoothSerial.write(payload, bluetooth.writeSuccess, bluetooth.writeError);
    },

    writeSuccess: function () {
        app.info('Write completed!');
    },

    writeError: function (error) {
        app.error('Write Error!');
    },

    connectCallback: function() {
        app.status('Connected');
        bluetooth.write('P2322322323');
    },

    disconnectCallback: function() {
        app.status('Disconnected!');
    },

    disconnect: function () {
        bluetoothSerial.disconnect(bluetooth.disconnectSuccess, bluetooth.disconnectFailure);
    },

    disconnectSuccess: function() {
        app.status('Disconnected!');
    },

    disconnectFailure: function() {
        app.error('Can\'t disconnect!!');
    },

    connect: function () {
        bluetoothSerial.connect(DEVICE_ID, bluetooth.connectCallback, bluetooth.disconnectCallback);
    }
}