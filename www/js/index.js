var currentState = {
    name: '',
    on: true,
    wakeUpTime: '7:30',
    sleepTime: '9.30',
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
        currentState.name = 'Paulo';
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
    },

    updateMoodRange: function (value) {
        if (value <= 12.5) {
            document.getElementById('mood-image').src = "./img/mood/0.png";
            bluetooth.write('S0380471919');
        } else if ( value <= 25) {
            document.getElementById('mood-image').src = "./img/mood/1.png";
            bluetooth.write('S0951372099');
        } else if ( value <= 50) {
            bluetooth.write('S1252060789');
            document.getElementById('mood-image').src = "./img/mood/2.png";
        } else if ( value <= 75) {
            bluetooth.write('S2282400579');
            document.getElementById('mood-image').src = "./img/mood/3.png";
        } else if ( value <= 87.5) {
            bluetooth.write('S2531590179');
            document.getElementById('mood-image').src = "./img/mood/4.png";
        } else {
            document.getElementById('mood-image').src = "./img/mood/5.png";
            bluetooth.write('M0000000009');
        }
    }
};