// B. Jumps between application's pages.

  //stations
  document.querySelector('#btn-stations-back').addEventListener ('click', function () {
    document.querySelector('#stations').className = 'right';
    document.querySelector('#index').className = 'current';
  });
  //favoritestations
  document.querySelector('#btn-favorite-back').addEventListener ('click', function () {
    document.querySelector('#favorite-stations').className = 'right';
    document.querySelector('#index').className = 'current';
  });
  //neareststations
  document.querySelector('#btn-nearest-back').addEventListener ('click', function () {
    document.querySelector('#nearest-stations').className = 'right';
    document.querySelector('#index').className = 'current';
  });
  //tweets
  document.querySelector('#btn-tweets-back').addEventListener ('click', function () {
    document.querySelector('#tweets').className = 'right';
    document.querySelector('#index').className = 'current';
  });
  //info
  document.querySelector('#btn-info-back').addEventListener ('click', function () {
    document.querySelector('#info').className = 'right';
    document.querySelector('#index').className = 'current';
  });
  //about
  document.querySelector('#btn-about-back').addEventListener ('click', function () {
    document.querySelector('#about').className = 'right';
    document.querySelector('#index').className = 'current';
  });
  //1station
  document.querySelector('#btn-station-back').addEventListener ('click', function () {
    document.querySelector('#station').className = 'right';
  });
    
// C. General functions

  function makeLink(text) // this REGEX converts http(s) links that are embedded in the tweet text into real hyperlinks.
  {  
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;  
    return text.replace(exp,"<a href='$1' target='_blank'>$1</a>");
  }
  
  function getFavoriteStationsAsArray()
  {
    var arrayFavoriteStations = JSON.parse(localStorage.getItem("myfavoritestations"));
    if (arrayFavoriteStations == null ) { arrayFavoriteStations=[]; }
    return arrayFavoriteStations;
  }
  
  function removeFavoriteStation(stationselected)
  {
    var arrayFavoriteStations = getFavoriteStationsAsArray();
    var position = arrayFavoriteStations.indexOf(stationselected);
    if (position != -1)
    {
      arrayFavoriteStations.splice(position,1);
    }
    localStorage.setItem("myfavoritestations",JSON.stringify(arrayFavoriteStations));
  }

// D. Content builders for dynamic pages

  function showinformation()
  {
    document.querySelector('#info').className = 'current';
  }
  
  function showabout()
  {
    document.querySelector('#about').className = 'current';
  }
  
  function showliststations()
  {
    var data_trans = "http://api.hackjak.bappedajakarta.go.id/busway/halte?apiKey=sHb9LYwHbVXEQZrzGvF0Wi7Jm1Bm5q6E";
    $.getJSON(data_trans, function(data){
      var list = data.result;
      var map = list.map(function(e, i){
        return {index: i, value: e.halteName.toLowerCase()}
      })
      var htmlstations = "<ul>";
      for (var i in data.result) {
        htmlstations += "<li><a href='javascript:showstation("+map[i].index+")'>";
        htmlstations += '<aside class="icon comms-icon contacts-location"></aside>';
        htmlstations += "<p>"+data.result[i].halteName+"</p></a></li>";
      }
      htmlstations += "</ul>";
      document.querySelector('#list-of-stations').innerHTML = htmlstations;
      document.querySelector('#stations').className = 'current';
    });
    
  }

  function showstationsindirection(stationSelected,routeSelected,directionSelected)
  {
    var htmlstations = '';
    htmlstations += '<h1>';
    htmlstations += applicationData.categories[0].routes[routeSelected].name+'<br>';
    htmlstations += applicationData.categories[0].routes[routeSelected].directions[directionSelected].name;
    htmlstations += '</h1>';
    htmlstations += '<p class="small">';
    var numberStationsInDirectionSelected = applicationData.categories[0].routes[routeSelected].directions[directionSelected].stations.length;
    for (var i=0; i<numberStationsInDirectionSelected; i++)
    {
      stationIterated = applicationData.categories[0].routes[routeSelected].directions[directionSelected].stations[i];
      if (stationIterated === stationSelected)
      htmlstations += '* <u>[ '+applicationData.categories[0].stations[stationIterated].name.toUpperCase()+" ]</u><br>";
      else
      htmlstations += '- '+applicationData.categories[0].stations[stationIterated].name+"<br>";
    }
    htmlstations += '</p>';
    document.querySelector('#list-of-stationsindirection').innerHTML = htmlstations;
    document.querySelector('#stationsindirection').className = 'fade-in';
  }

  function showstationinmap(stationSelected,applicationData)
  {
    var data_trans = "http://api.hackjak.bappedajakarta.go.id/busway/halte?apiKey=sHb9LYwHbVXEQZrzGvF0Wi7Jm1Bm5q6E";
    $.getJSON(data_trans, function(data){
      var htmlstations = '';
      htmlstations += '<h1>';
      htmlstations += data.result[stationSelected].halteName;
      htmlstations += '</h1>';
      if (!navigator.onLine)
      {
        htmlstations += '<p class="small">'+"Usted no está conectado a Internet."+"</p>";
        document.querySelector('#list-of-stationinmap').innerHTML = htmlstations;
      }
      else
      {
        document.querySelector('#list-of-stationinmap').innerHTML = htmlstations;
        Map.init(data.result[stationSelected], '#list-of-stationinmap');
      }
      document.querySelector('#stationinmap').className = 'fade-in';
    });

    // var htmlstations = '';
    // htmlstations += '<h1>';
    // htmlstations += applicationData.categories[0].stations[stationSelected].name;
    // htmlstations += '</h1>';
    // htmlstations += '<p class="small">';
    // htmlstations += applicationData.categories[0].stations[stationSelected].address;
    // htmlstations += '</p>';
    // if (!navigator.onLine)
    // {
    //   htmlstations += '<p class="small">'+"Usted no está conectado a Internet."+"</p>";
    //   document.querySelector('#list-of-stationinmap').innerHTML = htmlstations;
    // }
    // else
    // {
    //   document.querySelector('#list-of-stationinmap').innerHTML = htmlstations;
    //   Map.init(applicationData.categories[0].stations[stationSelected], '#list-of-stationinmap');
    // }
    // document.querySelector('#stationinmap').className = 'fade-in';
  }
  
  function showstation(stationselected)
  {
    // a. Show stations details
    var data_trans = "http://api.hackjak.bappedajakarta.go.id/busway/halte?apiKey=sHb9LYwHbVXEQZrzGvF0Wi7Jm1Bm5q6E";
    $.getJSON(data_trans, function(data){
      var htmlstation = "";
      htmlstation += '<ul><li><aside class="icon comms-icon contacts-location"></aside>';
      htmlstation += '<p>'+data.result[stationselected].halteName+'</p>';
      htmlstation += "</li>";
      if ((getFavoriteStationsAsArray().indexOf(stationselected)) != -1)
        htmlstation += '<li><div id="favoritebutton"><a role="button" href="javascript:removefavoritestation('+stationselected+',applicationData)">'+'Lepas dari favorit'+'</a></div></li>';
      else
        htmlstation += '<li><div id="favoritebutton"><a role="button" href="javascript:addfavoritestation('+stationselected+',applicationData)">'+'Jadikan Favorit'+'</a></div></li>';
        htmlstation += '<li><div id="showmapbutton"><a role="button" href="javascript:showstationinmap('+stationselected+',applicationData)" class="icon icon-view">'+'Tunjukan Peta'+'</a></div></li>';
        htmlstation += '</ul>';
      document.querySelector('#station-details').innerHTML = htmlstation;
      document.querySelector('#station').className = 'current';
    });
  }
  
  function addfavoritestation(stationselected,applicationData)
  {
    //localStorage.setItem("myfavoritestations",stationselected);
    var arrayFavoriteStations = getFavoriteStationsAsArray();
    if (arrayFavoriteStations.indexOf(stationselected) == -1)
    { // if I didn't find it, add it
      arrayFavoriteStations.push(stationselected);
      localStorage.setItem("myfavoritestations",JSON.stringify(arrayFavoriteStations));
    }
    if ("mozNotification" in navigator)
    { // FirefoxOS
      var notification = navigator.mozNotification.createNotification(
        "JakTrek",
        "Halte Favorit: "+applicationData.categories[0].stations[stationselected].name
        );
      notification.onshow = function () { setTimeout(notification.close(), 1000); }
                    notification.show();
    }
    else
    if ("Notification" in navigator)
    { // Firefox +22
      var n = new Notification("JakTrek",{body:"Halte Favorit: "+applicationData.categories[0].stations[stationselected].name});
    }
    else
    { // Other browsers: do nothing
    }
    var htmlbutton = '<a role="button" href="javascript:removefavoritestation('+stationselected+',applicationData)">'+"Lepas dari favorit"+"</a>";
    document.querySelector('#favoritebutton').innerHTML =  htmlbutton;
  }
  
  function removefavoritestation(stationselected,applicationData)
  {
    removeFavoriteStation(stationselected);
    var htmlbutton = '<a role="button" href="javascript:addfavoritestation('+stationselected+',applicationData)">'+"Jadikan Favorit"+"</a>";
    document.querySelector('#favoritebutton').innerHTML =  htmlbutton;
    renderfavoritestations();
  }
  
  function confirmremoveallfavorites()
  {
    localStorage.removeItem('myfavoritestations');
    document.querySelector('#remove-favorite-stations').className = 'fade-out';
    showfavoritestations();
  }
  
  function cancelremoveallfavorites()
  {
    document.querySelector('#remove-favorite-stations').className = 'fade-out';
  }
  
  function cancelstationsindirection()
  {
    document.querySelector('#stationsindirection').className = 'fade-out';
  }
  
  function cancelstationinmap()
  {
    document.querySelector('#stationinmap').className = 'fade-out';
  }
  
  function renderfavoritestations()
  {
    var arrayFavoriteStations = getFavoriteStationsAsArray();
    var htmlfavoritestations = "";
    if (arrayFavoriteStations.length  )
    {
      htmlfavoritestations = "<ul>";
      var numberstations = arrayFavoriteStations.length;
      for (var i=0; i<numberstations; i++)
      {
        htmlfavoritestations += "<li><a href='javascript:showstation("+arrayFavoriteStations[i]+")'>";
        htmlfavoritestations += '<aside class="icon comms-icon contacts-location"></aside>';
        htmlfavoritestations += "<p>"+applicationData.categories[0].stations[arrayFavoriteStations[i]].name+"</p></a></li>";
      }
      htmlfavoritestations += "</ul>";
      htmlfavoritestations += '<a role="button" class="danger" href="javascript:removeallfavorites()">'+"Hapus semua favorit"+"</a>";
    }
    else
    {
      htmlfavoritestations = '<p class="small">'+"Tidak ada Halte Favorit"+"</p>";
    }
    document.querySelector('#list-of-favorite-stations').innerHTML = htmlfavoritestations;
  }
  
  function showfavoritestations()
  { 
    // render fills updated HTML, show really displays
    // if not, weird behaviors occurs (remove a favorite still shows in list of favorites
    // or if add show after remove a favorite in main list displays favorites, not main list
    renderfavoritestations();
    document.querySelector('#favorite-stations').className = 'current';
  }
  
  function removeallfavorites()
  {
    document.querySelector('#remove-favorite-stations').className = 'fade-in';
  }
  
  function showneareststations()
  {
    if (!navigator.onLine)
    {
      document.querySelector('#list-of-nearest-stations').innerHTML = '<p class="small">'+"Anda tidak terhubung ke internet."+"</p>";
      document.querySelector('#nearest-stations').className = 'current';
    }
    else
    {
      var stationsList = document.querySelector('#list-of-nearest-stations');
      stationsList.innerHTML = '<p class="small">'+"Silahkan menunggu ... "+"<progress></progress></p>";
      document.querySelector('#nearest-stations').className = 'current';
      if ("geolocation" in navigator)
      {
        var options = {
          // enableHighAccuracy: true,
          timeout: 30000 //30 sec
          // maximumAge: 0
          };
        function success(pos)
        {
          var crd = pos.coords;
          //console.log('Latitude : ' + crd.latitude);
          //console.log('Longitude: ' + crd.longitude);
          //console.log('More or less ' + crd.accuracy + ' meters.');
          var myLatLong = new LatLon(Geo.parseDMS(crd.latitude), Geo.parseDMS(crd.longitude));
          var numberstations = applicationData.categories[0].stations.length;
          var min_distance;
          var neareststation;
          for (var i=0; i<numberstations; i++)
          {
            var current_station = new LatLon(Geo.parseDMS(applicationData.categories[0].stations[i].coordinatelat), Geo.parseDMS(applicationData.categories[0].stations[i].coordinatelng));
            //console.log(myLatLong);
            var current_distance = myLatLong.distanceTo(current_station);
            //console.log(current_distance);
            if (i==0)
            {
              min_distance = current_distance;
              neareststation = 0;
            }
            if (parseFloat(current_distance) < parseFloat(min_distance))
            {
              min_distance = current_distance;
              neareststation = i;
            }
          }
          // Print info
          var htmlneareststations = '';
          htmlneareststations = '<ul>';
          htmlneareststations += '<li><a href="javascript:showstation('+neareststation+')">';
          htmlneareststations += '<aside class="icon comms-icon contacts-location"></aside>';
          htmlneareststations += '<p>'+applicationData.categories[0].stations[neareststation].name+'</p>';
          htmlneareststations += '<p>'+'+'+min_distance+' Kms.</p>';
          htmlneareststations += '</a></li>';
          // Number of blocks is an arbitrary measure
          htmlneareststations += '<li><aside class="icon comms-icon contacts-sms"></aside>';
          htmlneareststations += '<p></p><p class="small">';
          min_blocks = Math.round(min_distance*10); // I assume 1 block = 100 meters
          if (min_blocks<=10)
            htmlneareststations += 'Anda menemukan '+min_blocks+' blok aprox';
          else if (min_blocks<=100)
            htmlneareststations += 'Terlalu jauh bagi Anda untuk berjalan';
          else
            htmlneareststations += 'Sepertinya Anda tidak di kota yang sama';
          htmlneareststations += '</p></li></ul>';
          
          document.querySelector('#list-of-nearest-stations').innerHTML = htmlneareststations;
          Map.init(applicationData.categories[0].stations, '#list-of-nearest-stations');
          Map.geoSuccess(pos,min_blocks);
        };
        function error(err)
        {
          //console.warn('ERROR(' + err.code + '): ' + err.message);
          var htmlneareststations = '<p class="small">'+"Maaf kami tidak bisa menemukan lokasi Anda"+"</p>";
          document.querySelector('#list-of-nearest-stations').innerHTML = htmlneareststations;
          Map.init(applicationData.categories[0].stations, '#list-of-nearest-stations');
          // I don't center the map in an specific location: it chooses the last coordinate added in applicationData
        };
        navigator.geolocation.getCurrentPosition(success, error, options);
      }
      else
      {
        /* geolocation IS NOT available */
        var htmlneareststations = '<p class="small">'+"Geolocation ini tidak tersedia pada perangkat Anda"+"</p>";
        document.querySelector('#list-of-nearest-stations').innerHTML = htmlneareststations;
      }
    }
  }
  
  function showtweets()
  {
    if (!navigator.onLine)
    {
      document.querySelector('#list-of-tweets').innerHTML = '<p class="small">'+"Anda tidak terhubung internet"+"</p>";
      document.querySelector('#tweets').className = 'current';
    }
    else
    {
      document.querySelector('#list-of-tweets').innerHTML = '<p class="small">'+"Silahkan menunggu ... "+"<progress></progress></p>";
      document.querySelector('#tweets').className = 'current';
      var twitterAccount = "ariestiyansyah";
      
      /* This new code is based on 
       * https://developer.mozilla.org/en-US/docs/AJAX/Getting_Started
       * */
      var httpRequest;
      var url = 'http://mozilla.pe/labs/metropolitano.php'
      //makeRequest('http://mozilla.pe/labs/metropolitano.php');
      if (window.XMLHttpRequest) { // Mozilla, Safari, ...
        httpRequest = new XMLHttpRequest();
      } else if (window.ActiveXObject) { // IE
        try {
          httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } 
        catch (e) {
          try {
            httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
          } 
          catch (e) {}
        }
      }

      if (!httpRequest) {
        console.log('Giving up :( Cannot create an XMLHTTP instance');
        document.querySelector('#list-of-tweets').innerHTML = '<p class="small">'+"Anda tidak dapat menggunakan AJAX di browser ini."+"</p>";
        return false;
      }
      httpRequest.onreadystatechange = function(){
        if (httpRequest.readyState === 4) {
          if (httpRequest.status === 200) {
            var response = JSON.parse(httpRequest.responseText);
            //console.log(response);
            response_length = response.statuses.length;
            if (response_length > 0)
            {
              // First: list only normal tweets, no replies
              listoftweets=[];
              for (var i=0; i < response_length; i++)
              {
                if (response.statuses[i].text.charAt(0)!=='@')
                {
                  date = new Date (response.statuses[i].created_at);
                  listoftweets.push({
                    'screen_name' : response.statuses[i].user.screen_name ,
                    'text' : response.statuses[i].text ,
                    'id_str' : response.statuses[i].id_str,
                    'created_at' : date.toLocaleString(["id","es","en"])
                    });
                }
              }
              //console.log(listoftweets);
              // I always storage the latest tweet
              if (localStorage.getItem("latesttweet"))
              { latesttweet = localStorage.getItem("latesttweet"); }
              else
              { latesttweet = ''; }
              // I'm going to change the way I show a tweet if it was requested before.
              // Since I detect that a tweet was readed before I change a flag.
              tweetsalreadyseen = 0;
              // Now, print tweets
              var htmltweets = "";
              htmltweets = "<ul>";
              listoftweets_length = listoftweets.length;
              if (listoftweets_length)
              {
                for (var i=0; i < listoftweets_length; i++)
                {
                  if (listoftweets[i].id_str === latesttweet)
                  { tweetsalreadyseen = 1; }
                  // Print new statuses with an icon, and past statuses without icon and some opacity
                  // tweetsalreadyseen is a flag to do that
                  htmltweets += '<li>';
                  if (!tweetsalreadyseen)
                  { htmltweets += '<aside class="icon comms-icon contacts-twitter"></aside>'; }
                  else
                  { htmltweets += '<aside class="icon comms-icon contacts-twitter disabled"></aside>'; }
                  htmltweets += '<p>'+listoftweets[i].screen_name+"</p>";
                  htmltweets += '<p class="small">'+makeLink(listoftweets[i].text);
                  htmltweets += '<br>['+listoftweets[i].created_at+']';
                  htmltweets += '<br><a role="button" class="icon icon-view" href="javascript:shareTweetText(\''+twitterAccount+': '+listoftweets[i].text+'\')">Compartir texto de tuit</a></li>';
                }
                localStorage.setItem("latesttweet",listoftweets[0].id_str);
              }
              htmltweets += "</ul>";
              document.querySelector('#list-of-tweets').innerHTML = htmltweets;
            }
          } else {
            console.log('There was a problem with the request.');
            document.querySelector('#list-of-tweets').innerHTML = '<p class="small">'+"Ada masalah dengan permintaan Anda."+"</p>";
          }
        }
      };
      httpRequest.open('GET', url);
      httpRequest.send();
    }
  }
  
  function shareTweetText(tweetText)
  {
    var activity = new MozActivity({
        name: "new",
        data: {
          type: [ "websms/sms","mail" ],
          number: '', // required by websms
          body: tweetText, // required by websms
          url: "mailto:?body=" + tweetText, // required by mail
        }
      });
  }

//E. Maps

(function(){
  window.Map = {
    map: null,

    init: function(station, el){
      this.cleanMap();
      this.insertMapEl(el);
      var that = this;
      if (station instanceof Array) {
        //setTimeout(function(){
          var stations = station;
          that.initMap();
          for(var i=0;i<stations.length; i++){
            that.addMarker(stations[i], that.map);
          };
        //}, 2000);
      } else {
        //setTimeout(function(){
          that.initMap();
          that.addMarker(station, that.map);
        //}, 2000);
      }
    },

    initMap: function() {
      var mapEl = document.getElementById('map');
      this.map = L.mapbox.map('map', 'examples.map-9ijuk24y');
      this.showMap(mapEl);
    },

    cleanMap: function(){
      var map = document.getElementById('map');
      if (map !== (undefined || null )) {
        map.parentElement.removeChild(map);
      }
    },

    insertMapEl: function(el){
      var mapEl = document.createElement('div');
      var container = document.querySelector(el);
      mapEl.setAttribute('id', 'map');
      container.appendChild(mapEl);
    },

    addMarker: function(place, map){
      var lat = place.lat;
      var lng = place.long;
      L.mapbox.markerLayer({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [lng, lat]
        },
        properties: {
          title: place.name,
          'marker-color': '#FF4E00'
        }
      }).addTo(map);
      map.setView([lat,lng], 15);
      map.invalidateSize(false);
    },

    showMap: function(el){
      if ( el.classList.contains('on') ){
        el.classList.remove('on');
      } else {
        el.classList.add('on');
      }
    },

    geoSuccess: function(position,min_blocks){
      var that = this;
      //setTimeout(function(){
      /*  var lat = position.coords.latitude,
            lng = position.coords.longitude;
        var marker = L.marker([lat, lng]).addTo(that.map);
        that.map.setView([lat, lng], 15);*/
      //}, 3000);
      // Adding new marker with current position (and different color)
      var lat = position.coords.latitude;
      var lng = position.coords.longitude;
      L.mapbox.markerLayer({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [lng, lat]
        },
        properties: {
          title: 'Usted está aquí',
          'marker-color': '#16AECF'
        }
      }).addTo(that.map);
      // Stablishing the zoom level
      if (min_blocks<=6)
      { that.map.setView([lat,lng], 15); }
      else if (min_blocks<=12)
      { that.map.setView([lat,lng], 14); }
      else if (min_blocks<=24)
      { that.map.setView([lat,lng], 13); }
      else if (min_blocks<=48)
      { that.map.setView([lat,lng], 12); }
      else if (min_blocks<=96)
      { that.map.setView([lat,lng], 11); }
      else
      { that.map.setView([lat,lng], 10); }
    }
  }
})();
