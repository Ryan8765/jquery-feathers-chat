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
    var messagesService = client.service('/messages');

    socket.emit('test', {
        data: "test data"
    });

    client.authenticate().then((response)=>{
        messagesService.create({
            text: 'hello boy'
        });
    }).catch((err)=>{
        alert('error');
    });




    // client.authenticate({
    //   strategy: 'local',
    //   email: 'justin@test.com',
    //   password: 'test'
    // }).then(response => {
    //
    // });






    // function checkUserAuthentication( client ) {
    //
    //     client.passport.getJWT()
    //         .then((token)=>{
    //             var validUser = client.passport.payloadIsValid(token);
    //             if( !validUser ) {
    //                 window.location.href = `${serverurl}/login.html`;
    //             }
    //         }).catch((err)=>{
    //             alert(err);
    //         });
    // }

    $('#logout-icon').on('click', function(){

        client.logout();
        window.location.href = `${serverurl}/login.html`;

    });



    /*
        Functions to run on page load
     */
    // checkUserAuthentication( client );

});
