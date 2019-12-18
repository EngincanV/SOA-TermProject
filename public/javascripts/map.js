// $(document).ready(function() {
//   ymaps.ready(init);
//   function getLocate(locations) {
//     myMap.geoObjects.add(new ymaps.Placemark(locations));
//   }
//   function init() {
//     var coords = [];
//     var myMap = new ymaps.Map('map', {
//       center: [51.52026933, -0.095],
//       zoom: 10,
//     });
//     searchKey = window.location.search.substring(1).split('=')[1];
//     if (searchKey !== undefined) {
//       $('#searchKey').val(searchKey);
//       var myGeocoder = ymaps.geocode(searchKey, {
//         boundedBy: myMap.getBounds(), // [[50.259998, -5.269000],[54.906101, -1.080278 ]],
//         strictBounds: true,
//       });
//       myGeocoder.then(function(res) {
//         locationCount = res.metaData.geocoder.results;
//         for (let i = 0; i < locationCount; i++) {
//           var name =
//             res.geoObjects.get(i).properties.get('name') +
//             ' - ' +
//             res.geoObjects.get(i).properties.get('description');
//           $('.results').append(
//             '<div class="result-list">' +
//               ' <div class="result-list-numbering">' +
//               (i + 1) +
//               '.</div>' +
//               ' <div class="result-list-text">' +
//               '        <div class="result-list-link">' +
//               name +
//               '</div>' +
//               ' </div>' +
//               ' <div class="result-list-icon" ><a class="locate"><i class="icon ion-md-locate" data-location="' +
//               res.geoObjects.get(i).geometry.getCoordinates() +
//               '"></i></a></div>' +
//               '<div>',
//           );
//           myMap.geoObjects.add(
//             new ymaps.Placemark(
//               res.geoObjects.get(i).geometry.getCoordinates(),
//             ),
//           );
//         }
//       });
//     }
//     $('.results').click(function(e) {
//       if (e.target.localName === 'i') {
//         console.log(e.target.dataset.location.split(','));
//         myMap.setCenter(e.target.dataset.location.split(','));
//         myMap.setZoom(15, { duration: 1000 });
//       }
//     });
//     $('.next-btn').click(function(e) {
//       window.location.href = 'LondonMaps?s=' + $('#searchKey').val();
//     });
//     $.ajax({
//       type: 'POST',
//       url: '/LondonMaps/',
//       dataType: 'json',
//       success: function(data) {
//         for (let i = 0; i < data.locations.length; i++) {
//           myMap.geoObjects.add(
//             new ymaps.Polygon(
//               [JSON.parse(data.locations[i])],
//               {
//                 hintContent: data.lad[i],
//               },
//               {
//                 fillColor: '#00FF0088',
//                 strokeWidth: 1,
//                 region: data.lad[i],
//               },
//             ),
//           );
//           console.log(data.locations[i]);
//         }
//       },
//       error: function(err) {
//         console.log(err);
//       },
//     });
//     myMap.geoObjects.events.add('click', function(e) {
//       // Getting a reference to the child object where the event occurred.
//       var object = e.get('target');
//       console.log(object);
//       alert(object.options._options.region);
//     });
//   }
// });
