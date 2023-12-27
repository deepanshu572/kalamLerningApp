var FirebasePlugin;

function onDeviceReady(){
    FirebasePlugin = window.FirebasePlugin;
    var appRootURL = window.location.href.replace("index.html",'');
    window.onerror = function(errorMsg, url, line, col, error) {
        var logMessage = errorMsg;
        var stackTrace = null;
        var sendError = function(){
            FirebasePlugin.logError(logMessage, stackTrace, function(){
            },function(error){
            });
        };

        logMessage += ': url='+url.replace(appRootURL, '')+'; line='+line+'; col='+col;

        if(error && typeof error === 'object'){
            StackTrace.fromError(error).then(function(trace){
                stackTrace = trace;
                sendError()
            });
        }else{
            sendError();
        }
    };

    FirebasePlugin.onMessageReceived(function(message) {
        try{
            if(message.messageType === "notification"){
            }else{
            }
        }catch(e){
        }

    }, function(error) {
    });

    FirebasePlugin.onTokenRefresh(function(token){
    }, function(error) {
    });

    FirebasePlugin.registerAuthStateChangeListener(function(userSignedIn){
    });

    cordova.plugin.customfcmreceiver.registerReceiver(function(message){
    });
    checkNotificationPermission(false);
    checkAutoInit();
    // $('body').addClass(cordova.platformId);
    if(cordova.platformId === "android"){
        initAndroid();
    }else if(cordova.platformId === "ios"){
    }

}
$(document).on('deviceready', onDeviceReady);

var initAndroid = function(){

    var customChannel  = {
        id: "my_channel_id",
        name: "My channel name",
        sound: "blackberry",
        vibration: [300, 200, 300],
        light: true,
        lightColor: "0xFF0000FF",
        importance: 4,
        badge: true,
        visibility: 1
    };

    FirebasePlugin.createChannel(customChannel,
        function() {
            FirebasePlugin.listChannels(
                function(channels) {
                    if(typeof channels == "undefined") return;
                },
                function(error) {
                }
            );
        },
        function(error) {
        }
    );
};

var checkNotificationPermission = function(requested){
    FirebasePlugin.hasPermission(function(hasPermission){
        if(hasPermission){
        }else if(!requested){
            FirebasePlugin.grantPermission(checkNotificationPermission.bind(this, true));
        }else{
        }
    });
};

var checkAutoInit = function(){
    FirebasePlugin.isAutoInitEnabled(function(enabled){
    }, function(error) {
    });
};

var enableAutoInit = function(){
    FirebasePlugin.setAutoInitEnabled(true, function(){
        checkAutoInit();
    }, function(error) {
    });
};

function subscribe(){
    FirebasePlugin.subscribe("my_topic", function(){
        // log("Subscribed to topic");
    },function(error){
        // logError("Failed to subscribe to topic", error);
    });
}