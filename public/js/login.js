$(document).ready(function() {
    var serverurl = 'http://localhost:3030';
    // Establish a Socket.io connection
    var socket = io( serverurl );
    // Initialize our Feathers client application through Socket.io
    // with hooks and authentication.
    var client = feathers();

    client.configure(feathers.socketio(socket));
    // Use localStorage to store our login token
    client.configure(feathers.authentication({
        storage: window.localStorage
    }));

    //obtain the users service
    var usersService = client.service('/users');

    // var messagesService = client.service('/messages');
    // messagesService.create({ text: 'hello' }) // create message
    //   .catch(err => console.log('ERROR creating message:', err));

    /*
        Get User Credentials
     */
    function getCredentials() {
        var user = {
            email: $('#email').val(),
            password: $('#password').val()
        }

        return user;
    }


    $("#login-user").submit(function(e) {
        e.preventDefault();

        var userCredentials = getCredentials();

        client.authenticate({
            strategy: 'local',
            email: userCredentials.email,
            password: userCredentials.password
        }).then(token => {
            window.location.href = serverurl;
        }).catch(err => {
            console.log(err);
            $('#error-message').text('Error logging in.  Please try again').show();
        });


    });

});
