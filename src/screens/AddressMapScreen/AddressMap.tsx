import React, { FC, memo } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { COLORS, YANDEX_API_KEY } from '@constants';

const { primary } = COLORS;

export interface ILatLng {
  latitude: number;
  longitude: number;
}

export interface IProps {
  coords: ILatLng;
  onPressDone: (data: { newAddress: string; newLatitude: number; newLongitude: number }) => void;
  goBack: () => void;
}

const AddressMap: FC<IProps> = ({ coords, onPressDone, goBack }): JSX.Element => {
  const html = `
    <!DOCTYPE html>
    <html lang="ru">
        <head>
          <title>Определение адреса клика на карте с помощью обратного геокодирования</title>
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          
          <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU&amp;coordorder=longlat&amp;apikey=${YANDEX_API_KEY}" type="text/javascript"></script>
          <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
          <style type="text/css">
              html, body, #map {
                  width: 100%;
                  height: 100%;
                  margin: 0;
                  padding: 0;
              }
              .myButton {
                  position: relative;
                  display: flex;
                  flex: 1;
                  align-items: center;
                  justify-content: center;
                  height: 48px;
                  width: 256px;
                  background: #396AD4;
                  border: 0;
                    
                  cursor: pointer;
                  user-select: none;
                  -moz-user-select: none;
                  -ms-user-select: none;
                  -webkit-user-select: none;

                  color: #FFF;
                  font-size: 14px;
                  font-family: 'Roboto', sans-serif;
                  text-transform: uppercase;
                  text-decoration: none;
              }
              .myButtonDisable {
                  opacity: 0.6;
                  pointer-events: none;
              }
              .myButton:active {
                  position: relative;
                  top: 1px;
                  border: 0;
                  background: #396AD4;
              }
              .loader {
                  position: absolute;
                  top: calc(50% - 7.5px);
                  right: 24px;
                  border: 2px solid #396AD4; /* Light grey */
                  border-top: 2px solid #ffffff; /* Blue */
                  border-radius: 50%;
                  width: 15px;
                  height: 15px;
                  animation: spin 2s linear infinite;
                  margin-left: 16px;
              }

              @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
              }
          </style>
        </head>
        <body>
          <div id="map"></div>
        </body>
    </html>
  `;

  const js = `
    ymaps.ready(init);
    function init() {
        var long = ${coords.longitude || 76.940947};
        var lat = ${coords.latitude || 52.285577};
        
        var myPlacemark,
            myMap = new ymaps.Map('map', {
                center: [long, lat],
                zoom: 15,
                controls: ['geolocationControl', 'zoomControl', 'searchControl', 'typeSelector']
            });
            
        var data = {
            newAddress: null,
            newLatitude: null,
            newLongitude: null,
        };
        
        var ButtonLayout = ymaps.templateLayoutFactory.createClass([
            '<div class="myButton >',
            '{% if !state.enabled %} myButtonDisable{% endif %}">',
            '{{ data.content }}',
            '{% if data.isLoading %} <div class="loader"></div> {% endif %}',
            '</div>'
        ].join(''));
            
        var button = new ymaps.control.Button({
            data: {
                content: "Выбрать",
            },
            options: {
                layout: ButtonLayout,
            }
        });

        button.events.add(['click'], function () {
            if (button.state._data.enabled) {
                window.ReactNativeWebView.postMessage(JSON.stringify(data));
            }
        });

        myMap.controls.add(button, {
            float: 'none',
            position: {
                bottom: 48,
                left: 8,
            },
        });
        
        button.disable();
        
        // Определяем адрес по координатам (обратное геокодирование).
        function getAddress(coords) {
            myPlacemark.properties.set('iconCaption', 'Поиск...');
            button.disable();
            button.data.set('isLoading', true);
        
            ymaps.geocode(coords).then(function (res) {
                var firstGeoObject = res.geoObjects.get(0);
                const addressLine = firstGeoObject.getAddressLine();
                
                myPlacemark.properties
                    .set({
                        iconCaption: addressLine,
                        balloonContent: addressLine
                    });
                    
                data.newAddress = addressLine;
                data.newLongitude = coords[0];
                data.newLatitude = coords[1];
                button.data.set('isLoading', false);
    
                if (addressLine) {
                    button.enable();
                }
            });
        }
        
        // Создание метки.
        function createPlacemark(coords) {
            return new ymaps.Placemark(coords, {
                iconCaption: 'Поиск...'
            }, {
                preset: 'islands#violetDotIconWithCaption',
                draggable: true
            });
        }
        
        function highlightResult(coords) {
            if (coords[0]) {
                if (myPlacemark) {
                myPlacemark.geometry.setCoordinates(coords);
              } else {
                  myPlacemark = createPlacemark(coords);
                  myMap.geoObjects.add(myPlacemark);
              }
              getAddress(coords);
            }
        }
        
        myMap.events.add('click', function (e) {
          highlightResult(e.get('coords'));
        });
        
        highlightResult([${
          coords.longitude && coords.latitude ? [coords.longitude, coords.latitude] : undefined
        }]);
    }
    
    true;
  `;

  const onMessage = (event): void => {
    const { data } = event.nativeEvent;
    onPressDone(JSON.parse(data));
    goBack();
  };

  const renderLoading = (): JSX.Element => (
    <ActivityIndicator color={primary} style={styles.activityIndicator} size='large' />
  );

  return (
    <View style={styles.container}>
      <WebView
        source={{
          html,
        }}
        style={styles.webView}
        injectedJavaScript={js}
        onMessage={onMessage}
        renderLoading={renderLoading}
        javaScriptEnabled
        startInLoadingState
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicator: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  webView: {
    flex: 1,
  },
});

export default memo(AddressMap);
