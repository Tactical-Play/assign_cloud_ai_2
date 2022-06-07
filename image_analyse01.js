const async = require('async');
const fs = require('fs');
const https = require('https');
const path = require("path");
const createReadStream = require('fs').createReadStream
const sleep = require('util').promisify(setTimeout);
const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;

var key = 'e69ee81699a44f09b55fc40f1825b30e'
var endpoint = 'https://imageanalyzer26.cognitiveservices.azure.com/'

const computerVisionClient = new ComputerVisionClient(
    new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }), endpoint);
  
module.exports.hasAdultCont = async (URL) =>{
    
            /**
             * DETECT Adult Content
             */
            console.log('-------------------------------------------------');
            console.log('VALIDATING IMAGE');
      
            //const URL = 'https://mlresourcestore.blob.core.windows.net/newcontainer/sharer.jpg';
      
            // Analyze URL image
            const res = (await computerVisionClient.analyzeImage(URL, { visualFeatures: ['Adult'] })).adult["isAdultContent"];
            return res;
      
          }

      
