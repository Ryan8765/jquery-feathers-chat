$(document).ready(function() {
    // Establish a Socket.io connection
    var socket = io('http://localhost:3030');
    // Initialize our Feathers client application through Socket.io
    // with hooks and authentication.
    var client = feathers();

    client.configure(feathers.socketio(socket));
    // Use localStorage to store our login token
    client.configure(feathers.authentication({
        storage: window.localStorage
    }));

    //obtain the users service
    // var usersService = client.service('/users');
    // var messagesService = client.service('/messages');
    // messagesService.create({ text: 'hello' }) // create message
    //   .catch(err => console.log('ERROR creating message:', err));
    var chatService = client.service('/chat');
    await chatService.create({ text: 'hello' }); // create message

    // console.log(usersService);

    /*
        Get User Credentials
     */
    function getCredentials() {
        var user = {
            email: $('#email').value,
            password: $('#password').value
        }

        return user;
    }


    $("#newUser").submit(function(e) {
        e.preventDefault();

        var userCredentials = getCredentials();

        usersService.create({
            email: 'rmhaas221111@gmail.com',
            password: 'test'
        });
        // var data = {
        //     email: "",
        //     password: ""
        // };
        // var formData = $(this).serializeArray();
        // data.email = formData[0].value;
        // data.password = formData[1].value;
        // data = JSON.stringify(data);
        // console.log(data);
        // $.ajax({
        //         method: 'POST',
        //         url: 'http://localhost:3030/users',
        //         dataType: 'json',
        //         contentType: 'application/json',
        //         data: data,
        //         success: function(response) {
        //             console.log(response);
        //         },
        //         error: function(xhr, ajaxOptions, thrownError) {
        //             console.log(xhr.responseJSON.message);
        //         }
        //     })

    });

});
