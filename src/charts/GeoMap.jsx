import React from 'react';
import Plot from 'react-plotly.js';

export const GeoMap = () => {
  // Данные: регионы и значения (здесь случайные числа для примера)
  const regions = [
    'RU-AD', 'RU-AL', 'RU-BA', 'RU-BU', 'RU-CE', 'RU-CU', 'RU-DA', 'RU-IN', 
    'RU-KB', 'RU-KL', 'RU-KC', 'RU-KR', 'RU-KO', 'RU-ME', 'RU-MO', 'RU-SA', 
    'RU-SE', 'RU-TA', 'RU-TY', 'RU-UD', 'RU-ALT', 'RU-KAM', 'RU-KHA', 'RU-KDA', 
    'RU-KYA', 'RU-PER', 'RU-PRI', 'RU-STA', 'RU-ZAB', 'RU-AMU', 'RU-ARK', 'RU-AST', 
    'RU-BEL', 'RU-BRY', 'RU-VLA', 'RU-VGG', 'RU-VLG', 'RU-VOR', 'RU-IVA', 'RU-IRK', 
    'RU-KGD', 'RU-KLU', 'RU-KEM', 'RU-KIR', 'RU-KOS', 'RU-KGN', 'RU-KRS', 'RU-LEN', 
    'RU-LIP', 'RU-MAG', 'RU-MOS', 'RU-MUR', 'RU-NIZ', 'RU-NGR', 'RU-NVS', 'RU-OMS', 
    'RU-ORE', 'RU-ORL', 'RU-PNZ', 'RU-PSK', 'RU-ROS', 'RU-RYA', 'RU-SAM', 'RU-SAR', 
    'RU-SAK', 'RU-SVE', 'RU-SMO', 'RU-TAM', 'RU-TVE', 'RU-TOM', 'RU-TUL', 'RU-TYU', 
    'RU-ULY', 'RU-CHE', 'RU-YAR', 'RU-MOW', 'RU-SPE', 'RU-YEV', 'RU-CHU', 'RU-KHM', 
    'RU-NEN', 'RU-YAN'
  ];

  // Пример данных (можно заменить на реальные, например, из API)
  const values = regions.map(() => Math.random() * 100);

  const data = [
    {
      type: 'choropleth',
      locations: regions, // Коды регионов в формате ISO 3166-2
      z: values,         // Значения для цветовой шкалы
      text: regions.map(region => `Регион: ${region}`), // Подписи при наведении
      colorscale: 'Viridis',
      autocolorscale: false,
      reversescale: false,
      marker: {
        line: {
          color: 'rgb(180,180,180)',
          width: 0.5
        }
      },
    }
  ];

  const layout = {
    title: 'Карта России по регионам',
    geo: {
      scope: 'russia', // Важно: 'russia' для фокуса на РФ
      projection: {
        type: 'mercator'
      },
      showlakes: true,
      lakecolor: 'rgb(200, 200, 255)',
      showcountries: true,
      countrycolor: 'rgb(150, 150, 150)',
      subunitcolor: 'rgb(217, 217, 217)',
    },
    margin: { t: 50, b: 0, l: 0, r: 0 }
  };

  return (
    <Plot
      data={data}
      layout={layout}
      style={{ width: '100%', height: '700px' }}
      useResizeHandler={true}
    />
  );
};
