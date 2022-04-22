#!/usr/bin/env bash
curl "https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-City&license_key=$MAXMIND_LICENSE_KEY&suffix=tar.gz" --output maxmind.tar.gz
tar zxvf maxmind.tar.gz --strip-components=1 -C db
rm -rf maxmind.tar.gz