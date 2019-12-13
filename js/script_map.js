var map;
var service;
var infowindow;
var markers = [];

function initMap(){
// new map centered on nyc
        var options = {
            zoom:12.5, 
            // gestureHandling: 'greedy',
            scrollwheel: false,
            center: {lat: 40.7813, lng: -73.9712}, //nyc
            mapTypeControlOptions: {
                mapTypeIds: ['roadmap']
            },
            streetViewControl: false,
            styles:
            [
                {
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#f5f5f5"
                    }
                  ]
                },
                {
                  "elementType": "geometry.fill",
                  "stylers": [
                    {
                      "color": "#fff0cc"
                    },
                    {
                      "saturation": -30
                    }
                  ]
                },
                {
                  "elementType": "labels.icon",
                  "stylers": [
                    {
                      "visibility": "off"
                    }
                  ]
                },
                {
                  "elementType": "labels.text",
                  "stylers": [
                    {
                      "color": "#4b88d8"
                    },
                    {
                      "saturation": -50
                    }
                  ]
                },
                {
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#4b88d8"
                    },
                    {
                      "saturation": -50
                    }
                  ]
                },
                {
                  "elementType": "labels.text.stroke",
                  "stylers": [
                    {
                      "color": "#f5f5f5"
                    }
                  ]
                },
                {
                  "featureType": "administrative.land_parcel",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#bdbdbd"
                    }
                  ]
                },
                {
                  "featureType": "poi",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#eeeeee"
                    }
                  ]
                },
                {
                  "featureType": "poi",
                  "elementType": "geometry.fill",
                  "stylers": [
                    {
                      "color": "#fff0cc"
                    },
                    {
                      "saturation": -50
                    },
                    {
                      "lightness": -5
                    }
                  ]
                },
                {
                  "featureType": "poi",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#757575"
                    }
                  ]
                },
                {
                  "featureType": "poi.park",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#e5e5e5"
                    }
                  ]
                },
                {
                  "featureType": "poi.park",
                  "elementType": "geometry.fill",
                  "stylers": [
                    {
                      "color": "#fff0cc"
                    },
                    {
                      "saturation": -50
                    },
                    {
                      "lightness": -5
                    }
                  ]
                },
                {
                  "featureType": "poi.park",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#4b88d8"
                    }
                  ]
                },
                {
                  "featureType": "road",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#ffffff"
                    }
                  ]
                },
                {
                  "featureType": "road",
                  "elementType": "geometry.fill",
                  "stylers": [
                    {
                      "color": "#4b88d8"
                    },
                    {
                      "weight": 0.5
                    }
                  ]
                },
                {
                  "featureType": "road.arterial",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#757575"
                    }
                  ]
                },
                {
                  "featureType": "road.highway",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#dadada"
                    }
                  ]
                },
                {
                  "featureType": "road.highway",
                  "elementType": "geometry.fill",
                  "stylers": [
                    {
                      "color": "#4b88d8"
                    }
                  ]
                },
                {
                  "featureType": "road.highway",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "saturation": -50
                    }
                  ]
                },
                {
                  "featureType": "road.local",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#9e9e9e"
                    }
                  ]
                },
                {
                  "featureType": "transit.line",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#e5e5e5"
                    }
                  ]
                },
                {
                  "featureType": "transit.station",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#eeeeee"
                    }
                  ]
                },
                {
                  "featureType": "water",
                  "elementType": "geometry",
                  "stylers": [
                    {
                      "color": "#c9c9c9"
                    }
                  ]
                },
                {
                  "featureType": "water",
                  "elementType": "geometry.fill",
                  "stylers": [
                    {
                      "color": "#fff0cc"
                    },
                    {
                      "lightness": 75
                    }
                  ]
                },
                {
                  "featureType": "water",
                  "elementType": "labels.text.fill",
                  "stylers": [
                    {
                      "color": "#9e9e9e"
                    }
                  ]
                }
              ]
        }
        map = new google.maps.Map(document.getElementById('map'), options);
        infowindow = new google.maps.InfoWindow({
          maxWidth: 200
        });

        

// find place thru search
        var nyc = new google.maps.LatLng(40.7813,-73.9712);

        //find the first  7places
        function findplaces(input){
            var request = {
              location: nyc,
              radius: '500',
              // type: 'tea',
              query: input
            };

            service = new google.maps.places.PlacesService(map);
            service.textSearch(request, callback);
            

            function callback(results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        var place = results[i];
                        createMarker(results[i]);
                      }
                  }
             }
          }
      // find The alley
        function findplacefromquery(input){
          var request = {
            query: input,
            fields: ['name', 'geometry'],
          };
        
          var service = new google.maps.places.PlacesService(map);
        
          service.findPlaceFromQuery(request, function(results, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
              for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
              }
              map.setCenter(results[0].geometry.location);
            }
          });
        }
        function showallmarkers(){
          findplaces("Gong Cha");
          findplaces("CoCo Fresh Tea & Juice");
          findplaces("KOI the");
          findplaces("Boba Guys");
          findplaces("Tiger Sugar");
          findplaces("YiFang Taiwan Fruit Tea");
          findplaces("Kung Fu Tea");
          findplaces("Tea and Milk");
        }
        
        showallmarkers();

        
        let teashops = $('.btn-show');

        teashops.each(
          function(){
          $(this).click(function(){
            name = $(this).siblings('.shop-name').html();
            // console.log($(this));
            hideallmarker();
            findplaces(name);
          })
        });

        // for(i=0; i<teashops.length-1; i++){
        //   teashops.eq(i).click(function(e){
        //     name = $(e.target).siblings('.shop-name').html();
        //     // console.log($(this));
        //     hideallmarker();
        //     findplaces(name);
        //   })
        // }
        // teashops.eq(7).click(
        //   function(e){
        //     name = $(e.target).siblings('.shop-name').html();
        //     hideallmarker();
        //     findplacefromquery(name);
        //   }
        // )

        
        $('#showall').click(function(){
          console.log($(this));  
          showallmarkers();
        });



}
//——————map init() ends—————//

// create marker based on search result
        function createMarker(place) {
              var marker = new google.maps.Marker({
                map: map,
                position: place.geometry.location,
                icon:{
                  path: 'M10.5,0l3.2,6.6L21,7.6l-5.3,5.1L17,20l-6.5-3.4L4,20l1.2-7.2L0,7.6l7.3-1.1L10.5,0z', // star
                  scale:1,
                  strokeWeight: 1.1,
                  strokeColor: 'rgb(75, 136, 216)', //blue
                  fillColor: 'rgb(255,204,38)', //yellow
                  fillOpacity: 1
                  }
              });
              markers.push(marker); 

              var contentString = `<h6>${place.name}</h6> <p class="mapaddress">${place.formatted_address}</p>`;

              google.maps.event.addListener(marker, 'click', function() {
                infowindow.setContent(contentString);
                infowindow.open(map, this);
              });
        }

        function hideallmarker(){
          for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
          } 
        }
// hide markers 
        






      
      



            
