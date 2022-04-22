# geofindr

Returns geolocation information for the client's IP.

## How it works

A Netlify Function retrieves the client IP and runs it through Maxmind's [GeoLite2 Free Geolocation Database](https://dev.maxmind.com/geoip/geolite2-free-geolocation-data).

It then returns a JSON object with the following structure:

```js
{
  city: string;
  country: {
    code: string;
    name: string;
  };
  subdivision: {
    code: string;
    name: string;
  };
}
```

The latest version of the database is downloaded from Maxmind at build time. The license key required for the download is stored as an environment variable on the site.

**TODO**: The database is updated weekly, every Tuesday. We could use a [scheduled function](https://docs.netlify.com/netlify-labs/experimental-features/scheduled-functions/) to trigger a new deploy every week, so that the updated database is automatically pulled in.
