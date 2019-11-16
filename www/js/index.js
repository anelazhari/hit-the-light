var currentState = {
    name: '',
    currentLevel: 0,
    brighter() {
        if (currentState.currentLevel < 4) {
            currentState.currentLevel++
        }
    },
    dimmer() {
        if (currentState.currentLevel > 1) {
            currentState.currentLevel--
        }
    }
}

var app = {
    onDeviceReady: function() {
        currentState.name = 'Anubis Sr,'
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
        currentState.brighter();
        var level = currentState.currentLevel.toString();
        app.info('Update level to' + level);
        bluetooth.write('S2552552550');
    },

    low: function() {
        currentState.dimmer();
        var level = currentState.currentLevel.toString();
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