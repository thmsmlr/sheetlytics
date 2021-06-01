import fs from 'fs';
import { Reader } from '@maxmind/geoip2-node';

/*
      event_attrs = %{
        timestamp: NaiveDateTime.utc_now() |> NaiveDateTime.truncate(:second),
        name: params["name"],
        hostname: strip_www(uri && uri.host),
        pathname: get_pathname(uri, params["hash_mode"]),
        referrer_source: get_referrer_source(query, ref),
        referrer: clean_referrer(ref),
        utm_medium: query["utm_medium"],
        utm_source: query["utm_source"],
        utm_campaign: query["utm_campaign"],
        country_code: country_code,
        operating_system: ua && os_name(ua),
        operating_system_version: ua && os_version(ua),
        browser: ua && browser_name(ua),
        browser_version: ua && browser_version(ua),
        screen_size: calculate_screen_size(params["screen_width"]),
        "meta.key": Map.keys(params["meta"]),
        "meta.value": Map.values(params["meta"]) |> Enum.map(&Kernel.to_string/1)
      }
  */

const IP = Reader.openBuffer(fs.readFileSync('GeoLite2-Country.mmdb'));
export async function get(req) {
  console.log(req);
  let ip = req.headers['x-forwarded-for'];
  return {
    body: `
    ${ip}
    ${IP.country(ip).country.isoCode}
    ${JSON.stringify(req.headers, null, 4)}
    `,
  };
}

export async function post(req) {
  let data = JSON.parse(req.body);
  let url = new URL(data.u);
  let referrer = data.r;
  try {
    referrer = new URL(data.r);
    referrer = referrer.hostname;
    if (referrer.startsWith('www.')) referrer = referrer.substring(4);
  } catch (err) {
    console.log(err);
  }

  let country_code = req.headers['x-forwarded-for'];
  if (country_code) country_code = IP.country(country_code).country.isoCode;

  console.log(req);
  console.log(data);
  console.log(country_code);

  // TODO: Fill out the rest of these fields, get them
  // into the form.
  let event = {
    name: data.n,
    hostname: url.hostname,
    pathname: url.pathname,
    // referrer_source: ,
    referrer: referrer,
    // utm_medium: '',
    // utm_source: '',
    // utm_campaign: '',
    country_code: country_code,
    operating_system: '',
    operating_system_version: '',
    browser: '',
    browser_version: '',
    screen_size: '',
  };
  console.log(event);

  let resp = await fetch(
    'https://docs.google.com/forms/u/1/d/e/1FAIpQLSf6tKe5PMlW2Y8jLtlOZ7cuxPzddus-izVEnkAD0ewBu4dJZQ/formResponse',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'entry.597438737=' + JSON.stringify(event),
    }
  );

  return {
    status: 200,
    body: 'All good!',
  };
}
