const mbxStatic = require('@mapbox/mapbox-sdk/services/static');
const staticService = mbxStatic({ accessToken: process.env.MAPBOX_ACCESS_TOKEN });

function constructUrl(configObj) {
  const staticReq = staticService.getStaticImage(configObj);

 return staticReq.url()

  /* staticReq.send()
    .then(response => {
      const image = response.body;
      console.log('done');
    },
    err => {
      console.log(err);
    }); */
}

module.exports = constructUrl;
