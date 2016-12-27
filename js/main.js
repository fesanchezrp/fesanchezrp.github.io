(function(){
    "use strict";

    $(document).ready(startApplication);

    function startApplication(){
        config();
    }

    function config(){
        $(".button-collapse").sideNav();
    }
})();