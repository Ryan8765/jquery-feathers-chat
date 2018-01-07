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


    $("#newUser").submit(function(e) {
        e.preventDefault();

        var userCredentials = getCredentials();
        console.log(userCredentials);

        usersService.create(userCredentials)
            .then((res)=>{
                window.location.href = `${serverurl}/login.html`;
            }).catch((err)=>{
                $('#error-message').text('There was an error processing your request.  Please try a different email.').show();
            });
    });

});
