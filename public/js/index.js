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

    /**
     * Async function to create a new message
     */
    // var createMessage = async ()=> {
    //   await messagesService.create({
    //       text: 'hello boy2'
    //   });
    // };



    class Message {

      constructor( msgText ) {
          this.msgText = msgText
      }

      getMessageHtmlString() {
          var msgHTMLString = `
            <div class="media">
                <div class="media-left">
                  <a href="#">
                      <img alt="64x64" class="media-object" src="http://icons.iconarchive.com/icons/mahm0udwally/all-flat/256/User-icon.png" style="width: 64px; height: 64px;">
                  </a>
                </div>
                <div class="media-body">
                  <div class="pull-right">
                      <span class="delete-comment"><i class="fa fa-times" aria-hidden="true"></i></span>
                  </div>
                  <h4 class="media-heading">Media heading</h4>
                  <span class="comment-date">03-04-2016 10:43am</span>
                  <br>
                  <br>
                  ${this.msgText}
                </div>
            </div>
          `;

          return msgHTMLString;
      }

  }//end class

  /**
   * Authenticate user and create a new message
   */
  client.authenticate().then((response)=>{
      createMessage();
      console.log("went ahead and created a message");

      $('#submit-message-form').submit(function(e){
          e.preventDefault();

          var $msgText = $('#msg-text');
          var message = $msgText.val();
          $msgText.val('');
          if( message.trim().length ) {
              messagesService.create({
                  text: message
              });
          }
      });


  }).catch((err)=>{
      window.location.href = `${serverurl}/login.html`
  });

  var oneMessage = new Message( 'Hello how are you' );
  console.log(oneMessage.getMessageHtmlString());




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
