const https = require('https');

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwF3no5_3qdGcyaVzC_5jVcGNHESD8yLGLyKRvpYbt4XtJgV95ODDwGlqNb3abZPpjj/exec';

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      // Prati redirecte (Google Apps Script uvijek redirectuje)
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchUrl(res.headers.location).then(resolve).catch(reject);
      }

      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error('Invalid JSON: ' + data.substring(0, 200)));
        }
      });
    }).on('error', reject);
  });
}

exports.handler = async function(event, context) {
  try {
    const data = await fetchUrl(APPS_SCRIPT_URL);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};