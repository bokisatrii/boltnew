// netlify/functions/blog.js
const fetch = require('node-fetch');

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwF3no5_3qdGcyaVzC_5jVcGNHESD8yLGLyKRvpYbt4XtJgV95ODDwGlqNb3abZPpjj/exec';

exports.handler = async function(event, context) {
  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      redirect: 'follow'
    });

    const data = await response.json();

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