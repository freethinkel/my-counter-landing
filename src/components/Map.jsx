import React from 'react';
import { YMaps, Map as YMap, Placemark } from 'react-yandex-maps';

export default function Map({
  icon,
  zoom,
  coord,
  placeCoord,
  state,
  height = 100
}) {
  return (
    <YMaps>
      <YMap
        width="100%"
        height={height}
        state={state}
        defaultState={{
          center: state ? state : coord,
          zoom
        }}
      >
        <Placemark
          options={{
            iconLayout: 'default#image',
            iconImageHref: icon
          }}
          geometry={placeCoord || coord}
        />
      </YMap>
    </YMaps>
  );
}
