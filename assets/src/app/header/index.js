angular.module( 'sailng.header', [
])

.controller( 'HeaderCtrl', function HeaderController( $scope, $state, config, $http ) {
    $scope.currentUser = config.currentUser;

    var navItems = [
        {title: 'Messages', translationKey: 'navigation:messages', url: '/messages', cssClass: 'fa fa-comments'},
        {title: 'About', translationKey: 'navigation:about', url:'/about',cssClass: 'fa fa-info-circle'}
    ];

    if (!$scope.currentUser) {
        navItems.push({title: 'Register', translationKey: 'navigation:register', url: '/register', cssClass: 'fa fa-briefcase'});
        navItems.push({title: 'Login', translationKey: 'navigation:login', url: '/login', cssClass: 'fa fa-sign-in'});
    }


    $http.get('/get-clients').success(function(data){
        $scope.clients = data;

    })

     $(function () {
         $('ul.list-group, .search-client').on('click', function(event){
            var events = $._data(document, 'events') || {};
            events = events.click || [];
            for(var i = 0; i < events.length; i++) {
                if(events[i].selector) {

                    //Check if the clicked element matches the event selector
                    if($(event.target).is(events[i].selector)) {
                        events[i].handler.call(event.target, event);
                    }

                    // Check if any of the clicked element parents matches the 
                    // delegated event selector (Emulating propagation)
                    $(event.target).parents(events[i].selector).each(function(){
                        events[i].handler.call(this, event);
                    });
                }
            }
            event.stopPropagation(); //Always stop propagation
        });//http://bootsnipp.com/snippets/featured/checked-list-group    

    });

    $scope.navItems = navItems;
});