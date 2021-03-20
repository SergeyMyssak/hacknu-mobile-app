import { YANDEX_API_KEY } from '@constants';

export const generateMap = (data: string): string => `
    <!DOCTYPE html>
    <html lang="ru">
    <head>
      <title>Needs Map</title>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

      <script src="https://api-maps.yandex.ru/2.1/?lang=en_US&amp;coordorder=longlat&amp;apikey=${YANDEX_API_KEY}" type="text/javascript"></script>
      <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
      <script>
        var setPlacemarkInitialLayout = undefined;
        function numberWithSpaces(number) {
            return number.toString().replace(/\\B(?=(\\d{3})+(?!\\d))/g, ' ');
        }

        ymaps.ready(init);
        function init() {
            var map = new ymaps.Map('map', {
                center: [71.430411, 51.128207],
                zoom: 15,
                controls: ['geolocationControl', 'zoomControl', 'searchControl', 'typeSelector']
            });

            var objectManager = new ymaps.ObjectManager();

            var geoJson = ${data};
            geoJson.features.forEach(function (obj) {
                obj.options = {
                    fillOpacity: 0.2,
                }
            });
            objectManager.add(geoJson);
            map.geoObjects.add(objectManager);

            var collection = new ymaps.GeoObjectCollection(null, {
                preset: 'islands#yellowIcon'
            });

            ${JSON.stringify(JSON.parse(data).features)}.forEach(function(item) {
                var applications = item.properties.applications;
                var cases = applications ? applications.length : 0;
                var data = JSON.parse(item.properties.description);
                var long = data[0];
                var lat = data[1];
                var district = data[2];
                var len = cases.toString().length;

                var placemarkContentLayout = ymaps.templateLayoutFactory.createClass(
                    \`<div class="placemark \${'size_' + len}"><div class="placemark__content">$[properties.iconContent]</div></div>\`
                );

                var placemarkActiveContentLayout = ymaps.templateLayoutFactory.createClass(
                    \`<div class="placemark placemark--active \${'size_' + len}"><div class="placemark__content placemark__content--active">$[properties.iconContent]</div></div>\`
                );

                var placemark = new ymaps.Placemark([long, lat], {
                    iconContent: numberWithSpaces(cases),
                }, {
                    iconLayout: placemarkContentLayout,
                    iconShape: {
                        type: 'Circle',
                        coordinates: [0, 0],
                        radius: 40
                    }
                });

                placemark.events
                    .add('click', function (e) {
                        setPlacemarkInitialLayout = function() {
                            e.get('target').options.set('iconLayout', placemarkContentLayout);
                        };
                        e.get('target').options.set('iconLayout', placemarkActiveContentLayout);
                        window.ReactNativeWebView.postMessage(JSON.stringify({ applications: applications ? applications : [], district }));
                    });

                collection.add(placemark);
            });

            map.geoObjects.add(collection);
        }
      </script>
      <style>
        html, body, #map {
          width: 100%; height: 100%; padding: 0; margin: 0;
        }

        .placemark {
          position: absolute;

          background-color: #fff;
          border-radius: 50%;
          box-shadow: 0 0 4px rgba(0,0,0,.1);

          cursor: pointer;
        }

        .placemark--active {
          background-color: #396AD4;
        }

        .placemark__content {
          font-size: 12px;
          line-height: 16px;
          font-weight: 500;
          font-family: Roboto, "Open Sans", sans-serif;

          position: absolute;
          top: 2px;
          bottom: 2px;
          left: 2px;
          right: 2px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;
          border: 2px solid #396AD4;
        }

        .placemark__content--active {
          color: #ffffff;
          border-color: #ffffff;
        }

        .size_1 {
          width: 28px;
          height: 28px;
          top: -14px;
          left: -14px;
        }
        .size_2 {
          width: 32px;
          height: 32px;
          top: -16px;
          left: -16px;
        }
        .size_3 {
          width: 40px;
          height: 40px;
          top: -20px;
          left: -20px;
        }
        .size_4 {
          width: 44px;
          height: 44px;
          top: -22px;
          left: -22px;
        }
        .size_5 {
          width: 52px;
          height: 52px;
          top: -26px;
          left: -26px;
        }
        .size_6 {
          width: 56px;
          height: 56px;
          top: -28px;
          left: -28px;
        }
      </style>
    </head>
    <body>
        <div id="map"></div>
    </body>
    </html>
`;
