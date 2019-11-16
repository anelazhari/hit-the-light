class dataStore {
    constructor () {
        this.currentLevel = 0;
    };

    brighter() {
        if (this.currentLevel < 4) {
            this.currentLevel++
        }
    }

    dimmer() {
        if (this.currentLevel > 1) {
            this.currentLevel--
        }
    }
}

const state = new dataStore();

var app = {
    onDeviceReady: function() {
        app.info("Scanning!!");
        bluetooth.connect();
    },

    reconnect: function() {
        bluetooth.connect();
    },

    info: function(info) {
        // update the UI indicating the scan is complete
        var infotext = document.querySelector('.info-text');
        infotext.innerHTML = info;
    },

    status: function(info) {
        // update the UI indicating the scan is complete
        var infotext = document.querySelector('.status-text');
        infotext.innerHTML = info;
    },

    error: function(info) {
        // update the UI indicating the scan is complete
        var infotext = document.querySelector('.error-text');
        infotext.innerHTML = info;
    },

    bright: function() {
        state.brighter();
        var level = state.currentLevel.toString();
        app.info('Update level to' + level);
        bluetooth.write('SXaa');
    },

    low: function() {
        state.dimmer();
        var level = state.currentLevel.toString();
        app.info('Update level to' + level);
        bluetooth.write(level);

    },

    disconnect: function() {
        bluetooth.disconnect();
    },


    showAlert: function () {
        ons.notification.alert('Alert!');

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