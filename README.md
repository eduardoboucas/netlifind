# netlifind

Returns geolocation information for the client's IP.

## How it works

A Netlify Edge Function prints the geolocation data exposed in the `geo` property of the [Netlify `context` object](https://docs.netlify.com/netlify-labs/experimental-features/edge-functions/api/#netlify-specific-context-object).