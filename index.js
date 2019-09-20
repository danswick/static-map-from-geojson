#!/usr/bin/env node

const getCz = require('./get-cz-from-geojson');
const makeUrl = require('./construct-url');
const meow = require('meow');

// ./index.js geojson.geojson "style/style-id" width height fit overlay

const cli = meow(`
	Usage
	  $ staticcenter filepath

	Options
    --style, -s  specify a style (defaults to Mapbox Streets)
    --width, -w width of static image
    --height, -h height of static image
    --overlay, -o include an overlay and automatically fit image to overlay

	Examples
	  $ staticcenter ./chicago.geojson --fit --overlay
	  
`, {
	flags: {
		style: {
			type: 'string',
			alias: 's'
    },
    width: {
      type: 'string',
      alias: 'w'
    },
    height: {
      type: 'string',
      alias: 'h'
    },
    overlay: {
      type: 'boolean',
      alias: 'o'
    }
	}
});

function run(path, flags) {
  const STYLE = flags.s || 'mapbox/streets-v11';
  const WIDTH = flags.w || 600;
  const HEIGHT = flags.h || 400;
  const OVERLAY = flags.o || false;


  getCz(path)
  .then(cz => {
    let position, overlay;

    if (OVERLAY) {
      overlay = cz.geojson;
      position = "auto";
    } else {
      overlay = 'none';
      position = {
        coordinates: cz.center.geometry.coordinates,
        zoom: cz.zoom
      };
    }

    const configObj = {
      ownerId: STYLE.split('/')[0],
      styleId: STYLE.split('/')[1],
      width: parseInt(WIDTH),
      height: parseInt(HEIGHT),
      position: position,
      overlays: [{ geoJson: overlay }]
    };
    
    if (configObj.overlays[0].geoJson === 'none') {
      delete configObj.overlays;
      const url = makeUrl(configObj);
      console.log(`✨  ${url}`);
    } else {
      const url = makeUrl(configObj);
      console.log(`✨  ${url}`);
    }
  })
  .catch(err => {
    console.error(err);
  });
}

run(cli.input[0], cli.flags);
