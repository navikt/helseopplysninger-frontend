const querystring = require('querystring');
const request = require('sync-request');
const cheerio = require('cheerio');
const os = require('os');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

function getTmpFile(filename) {
  const dir = path.join(os.tmpdir(), 'dekorator-cache');
  !fs.existsSync(dir) && fs.mkdirSync(dir);
  return path.join(dir, filename);
}

function fileAge(filename) {
  const stats = fs.statSync(filename);
  return (new Date().getTime() - stats.mtime.getTime()) / 1000;
}

function fetchCached(url, ttlSeconds) {
  const filename = crypto.createHash('md5').update(url).digest('hex');
  const cacheFilepath = getTmpFile(filename);
  if (!fs.existsSync(cacheFilepath) || fileAge(cacheFilepath) > ttlSeconds) {
    console.log(filename + ' not cached, fetching a new file.');
    const data = request('GET', url).getBody();
    fs.writeFileSync(cacheFilepath, data, 'utf-8');
  }
  return fs.readFileSync(cacheFilepath, 'utf-8');
}

function getDekoratorUrl(queryParams) {
  const urlBase = (process.env.NODE_ENV === 'production' || true) ?
      'https://www.nav.no/dekoratoren/' :
      'https://dekoratoren.dev.nav.no/';
  const url = new URL(urlBase);
  url.search = querystring.stringify(queryParams);
  return url.toString();
}

function fetchDekoratorParts(options, isDevelop) {
  const url = getDekoratorUrl(options);
  let dekoratorSrc = fetchCached(url);
  dekoratorSrc = dekoratorSrc.replace(/\s+/g, ' ');
  const $ = cheerio.load(dekoratorSrc);
  const dekoratorenEnvUrl = $('#decorator-env').attr('data-src');
  let dekoratorenEnvContent = fetchCached(dekoratorenEnvUrl);
  const localHostDecoratorEnvUrl = '/dekoratoren/env';
  if (isDevelop) {
    $('#decorator-env').attr('data-src', localHostDecoratorEnvUrl);
  }
  return {
    localHostDecoratorEnvUrl,
    DECORATOR_URL: url,
    DECORATOR_ENV: JSON.parse(dekoratorenEnvContent),
    replacements: {
      DECORATOR_FOOTER: $.html($('#decorator-footer')),
      DECORATOR_HEADER: $.html($('#decorator-header')),
      DECORATOR_SCRIPTS: $('#scripts').eq(0).html(),
      DECORATOR_STYLES: $('#styles').eq(0).html(),
    },
  };
}

module.exports = {
  overrideWebpackConfig: ({webpackConfig, cracoConfig, pluginOptions, context: {env}}) => {
    const InterpolateHtmlPlugin = webpackConfig.plugins.find(d => d.replacements);
    const decorator = fetchDekoratorParts(pluginOptions.dekorator, env === 'development');
    InterpolateHtmlPlugin.replacements = Object.assign(InterpolateHtmlPlugin.replacements, decorator.replacements);
    return webpackConfig;
  },
  overrideDevServerConfig: ({devServerConfig, cracoConfig, pluginOptions, context: {env}}) => {
    if (env === 'development') {
      const decorator = fetchDekoratorParts(pluginOptions.dekorator, true);
      const originalBefore = devServerConfig.before || function() {};
      console.log('capturing url', decorator.localHostDecoratorEnvUrl);
      devServerConfig.before = function(app, server, compiler) {
        originalBefore(app, server, compiler);
        app.get(decorator.localHostDecoratorEnvUrl, function(req, res) {
          decorator.DECORATOR_ENV.APP_URL = '/dekoratoren';
          res.json(decorator.DECORATOR_ENV);
        });
        app.get('/dekoratoren/api/auth', function(req, res) {
          res.json({
            authenticated: pluginOptions.authenticated,
            name: 'Phil Svanson',
            securityLevel: pluginOptions.dekorator.level === 'Level4' ? 4 : 3,
          });
        });
        app.get('/dekoratoren/api/varsler/varsler', function(req, res) {
          res.json({
            uleste: 0,
            antall: 2,
            nyesteId: 123,
            varsler: '<div>hello</div>',
          });
        });
        app.get('/dekoratoren/*', function(req, res) {
          const targetUrl = new URL(decorator.DECORATOR_ENV.APP_BASE_URL);
          targetUrl.pathname = req.originalUrl;
          res.redirect(301, targetUrl.toString());
        });
      };
    }
    return devServerConfig;
  },
}
