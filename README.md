Get a static map URL that completely fits some GeoJSON on it. 

Requirements: 

1. A Mapbox Access Token set to a `MAPBOX_ACCESS_TOKEN` environment variable.

Installation: 

1. Git clone. 
2. `cd` into the repo.
3. `npm install -g`.
4. `staticcenter <filepath>`.

Test out some of the sample GeoJSON files included to get the hang of it. 

```
	Usage
	  $ staticcenter filepath

	Options
    --style, -s  specify a style (defaults to Mapbox Streets)
    --width, -w width of static image
    --height, -h height of static image
    --overlay, -o include an overlay and automatically fit image to overlay

	Examples
	  $ staticcenter ./chicago.geojson --fit --overlay
```
