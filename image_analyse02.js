'use strict';

const async = require('async');
const fs = require('fs');
const https = require('https');
const path = require("path");
const createReadStream = require('fs').createReadStream
const sleep = require('util').promisify(setTimeout);
const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;

/**
 * AUTHENTICATE
 * This single client is used for all examples.
 */
 var key = 'e69ee81699a44f09b55fc40f1825b30e'
 var endpoint = 'https://imageanalyzer26.cognitiveservices.azure.com/'

const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }), endpoint);
/**
 * END - Authenticate
 */

 module.exports.detect_tags = async (URL)=>{
      /**
       * DETECT TAGS  
       * Detects tags for an image, which returns:
       *     all objects in image and confidence score.
       */
      console.log('-------------------------------------------------');
      console.log('DETECT TAGS');
      console.log();

      //const URL = 'https://c8.alamy.com/comp/2G8W233/new-york-united-states-17th-july-2021-shoppers-walk-in-front-of-an-adidas-store-in-manhattan-photo-by-stephen-zennersopa-imagessipa-usa-credit-sipa-usaalamy-live-news-2G8W233.jpg';

      // Analyze URL image
      console.log('Analyzing tags in image...', URL.split('/').pop());
      const tags = await computerVisionClient.analyzeImage(URL, { visualFeatures: ['Objects','Brands','Faces'] });
      console.log(tags);
      /**
       * END - Detect Tags
       */
      console.log();
      console.log('-------------------------------------------------');
      console.log('End.');
      return JSON.stringify(tags);

    }


//detect_and_save('https://c8.alamy.com/comp/2G8W233/new-york-united-states-17th-july-2021-shoppers-walk-in-front-of-an-adidas-store-in-manhattan-photo-by-stephen-zennersopa-imagessipa-usa-credit-sipa-usaalamy-live-news-2G8W233.jpg');
