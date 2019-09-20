const center = require('@turf/center');
const sm = require('@mapbox/sphericalmercator');
const bboxer = require('@turf/bbox');
const fs = require('fs');

function getCenterAndZoom(filepath) {
  return new Promise((resolve, reject) => {
    let geojson;
    try {
      geojson = JSON.parse(fs.readFileSync(filepath, { encoding: 'utf8' }));
    } catch (err) {
      console.error(err);
    }

    const merc = new sm({
      size: 512
    });

    const centerPoint = center.default(geojson);
    const bbox = bboxer.default(geojson); // bbox extent in minX, minY, maxX, maxY order. getZoom(minX, minY, maxX, maxY)

    function getZoom(bbox) {
      for (let z = 0; z <= 40; z++) {
        const decimalZoom = z / 2;
        const xyzBbox = merc.xyz(bbox, decimalZoom); //Returns {Object} XYZ bounds containing minX, maxX, minY, maxY properties.

        if (xyzBbox.maxY - xyzBbox.minY > 0) {
          if(decimalZoom > 8) {
            return decimalZoom;
          }
          return decimalZoom -1;
        }
      }
    }

    const zoom = getZoom(bbox);

    resolve({
      center: centerPoint,
      zoom: zoom,
      bbox: bbox,
      geojson: geojson
    });
  });
}

module.exports = getCenterAndZoom;
