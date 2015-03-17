angular.module( 'sailng.home', [
])

.config(function config( $stateProvider ) {
	$stateProvider.state( 'home', {
		url: '/home',
		views: {
			"main": {
				controller: 'HomeCtrl',
				templateUrl: 'home/index.tpl.html'
			}
		}
	});
})

.controller( 'HomeCtrl', function HomeController( $scope, titleService, config, $http) {
  $scope.currentUser = config.currentUser;
	titleService.setTitle('Home');

	$scope.map = {
      center: {
        latitude: 32.5851061,
        longitude:-89.8772196
      },
      zoom: 6,
      bounds: {}
    };
    $scope.options = {
      scrollwheel: true
    };
    var createRandomMarker = function(i, bounds, idKey) {
      var lat_min = bounds.southwest.latitude,
        lat_range = bounds.northeast.latitude - lat_min,
        lng_min = bounds.southwest.longitude,
        lng_range = bounds.northeast.longitude - lng_min;

      if (idKey == null) {
        idKey = "id";
      }

      var latitude = lat_min + (Math.random() * lat_range);
      var longitude = lng_min + (Math.random() * lng_range);
      var imagecount = Math.round(i/10); 
      var ret = {
        latitude: latitude,
        longitude: longitude,
        title: 'm' + i,
        icon : "../images/pin"+imagecount+".png"
      };
      ret[idKey] = i;
      return ret;
    };
    $scope.randomMarkers = [];
    // Get the bounds from the map once it's loaded
    $scope.$watch(function() {
      return $scope.map.bounds;
    }, function(nv, ov) {
      // Only need to regenerate once
      if (!ov.southwest && nv.southwest) {
        var markers = [];
        for (var i = 0; i < 50; i++) {
          markers.push(createRandomMarker(i, $scope.map.bounds))
        }
        $scope.randomMarkers = markers;
      }
    }, true);

	$scope.toggleNav = function() {
	    if ($('#site-wrapper').hasClass('show-nav')) {
	      $('#site-wrapper').removeClass('show-nav');
	      $("#map-canvas").css("left","0");
	      $("#map-canvas") .css("width","98%");
	      $(".tab-blur table").removeClass("blur-off")
	      $(".btn_toggle span").removeClass("glyphicon-forward").addClass("glyphicon-backward");
	    } else {
	      $('#site-wrapper').addClass('show-nav');
	      setTimeout(  '$("#map-canvas").css("left","446px"); $(".tab-blur table").addClass("blur-off")',200 );
	      setTimeout( '$("#map-canvas").css("width","66%"); ',200 );
	      $(".btn_toggle span").removeClass("glyphicon-backward").addClass("glyphicon-forward");
	    }
  	}

  	 $('#sideTab a').click(function (e) {
      	e.preventDefault()
      	$(this).tab('show')
    })

  	$('.tab-content').slimScroll({ height: ($('.tab-content').height()-260),wheelStep: 100});
    $('.checked-list-box').slimScroll({ height:'400'});

});