import fs from 'fs';
import parseUserAgent from 'ua-parser-js';
import { Reader } from '@maxmind/geoip2-node';
import DB from '../../../static/GeoLite2-Country.mmdb.base64?raw';

const IP = Reader.openBuffer(Buffer.from(DB, 'base64'));

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

export async function get(req) {
  let ua = parseUserAgent(req.headers['user-agent']);
  let ip = req.headers['x-forwarded-for'] || '1.1.1.1';
  return {
    body: `
    ${ip}
    ${IP.country(ip).country.isoCode}
    ${JSON.stringify(req.headers, null, 4)}
    ${JSON.stringify(ua, null, 4)}
    `,
  };
}

export async function post(req) {
  let data = JSON.parse(req.body);
  let url = new URL(data.u);
  let referrer = data.r;
  let referrer_source = null;
  let ua = parseUserAgent(req.headers['user-agent']);

  let screen_size = null;
  if (data.w < 576) screen_size = 'Mobile';
  if (data.w < 992) screen_size = 'Tablet';
  if (data.w < 1440) screen_size = 'Laptop';
  if (data.w >= 1440) screen_size = 'Desktop';

  try {
    referrer = new URL(data.r);
    referrer_source = referrer.hostname;
    if (referrer_source.startsWith('www.')) referrer_source = referrer_source.substring(4);
  } catch (err) {
    console.log(err);
  }

  let country_code = req.headers['x-forwarded-for'];
  if (country_code) country_code = IP.country(country_code).country.isoCode;

  // TODO: Fill out the rest of these fields, get them
  // into the form.
  let event = {
    name: data.n,
    hostname: url.hostname,
    pathname: url.pathname,
    referrer_source,
    referrer,
    // utm_medium: '',
    // utm_source: '',
    // utm_campaign: '',
    country_code: country_code,
    operating_system: ua?.os?.name,
    operating_system_version: ua?.os?.version,
    browser: ua?.browser?.name,
    browser_version: ua?.browser?.version,
    screen_size,
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
