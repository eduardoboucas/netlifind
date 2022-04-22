import { resolve } from "path";

import { Handler } from "@netlify/functions";
import { Reader, ReaderModel } from "@maxmind/geoip2-node";

const DB_PATH = resolve(__dirname, "../../GeoLite2-City.mmdb");

let db: Promise<ReaderModel>;

export const handler: Handler = async (event) => {
  if (db === undefined) {
    db = Reader.open(DB_PATH);
  }

  const ip = event.headers["x-nf-client-connection-ip"];
  const reader = await db;
  const res = reader.city(ip);
  const geo = {
    city: res.city?.names?.en,
    country: {
      code: res.country?.isoCode,
      name: res.country?.names?.en,
    },
    subdivision: {
      code: res.subdivisions[0]?.isoCode,
      name: res.subdivisions[0]?.names?.en,
    },
  };

  return {
    statusCode: 200,
    body: JSON.stringify(geo),
  };
};
