$( document ).ready(function() {
    $( "#logo" ).hover(
        function() {
            console.log("HOVER ALERT!!");
            $('#logo').attr("src", "./img/logo-small-animated.gif");
        }, function() {
            $('#logo').attr("src", "./img/logo-small-static.gif");
        }
    );
});