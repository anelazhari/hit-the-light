class dataStore {
    constructor () {
        this.currentLevel = 0;
        this.name = ''
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
        bluetooth.connect();
    },

    reconnect: function() {
        bluetooth.connect();
    },

    info: function(info) {
    },

    status: function(info) {
    },

    error: function(message) {
        ons.notification.alert(message)
    },

    bright: function() {
        state.brighter();
        var level = state.currentLevel.toString();
        app.info('Update level to' + level);
        bluetooth.write('S2552552550');
    },

    low: function() {
        state.dimmer();
        var level = state.currentLevel.toString();
        app.info('Update level to' + level);
        bluetooth.write('S0000500500');

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