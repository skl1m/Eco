/**
* This program's purpose is writing batches of items to a DynamoDB table
**/

// Load the SDK for JavaScript
var AWS = require('aws-sdk');

// Set the region 
AWS.config.update({region: 'us-east-1'});

/*
* Create DynamoDB service object 
* To access DynamoDB
*/
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

/*
* Creating a JSON object containing the parameters needed to write batches of items
* 
* Inserting items into the eco_fact table, each has the key(s) you want to write 
* for each item, and the attributes along with their values.
*
* Table Name: eco_tip
* id : A key for the table - a number that represents the id of that tip
* tip: A string that is an environmental tip.
* location: A string that is indicative of the tip's relevance - either home, school, or work.
* support: A string that gives more info pertaining to the tip. 
*
* NOTE: Not all items have to the same attributes, but each item needs the key(s)
*
*/
var params = {
  RequestItems: {
     "eco_tip": [
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "4"},
            "tip": { "S": "Boycott products that endanger wildlife."},
            "location": { "S": "general"},
            "support": { "S": "Products made from animals on the endangered species list are illegal to buy, sell, import or trade in the United States, but if a plant or animal hasn’t been listed yet, they can still be harmed for someone’s profit."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "40"},
            "tip": { "S": "Walk, bike, carpool or use public transportation whenever possible. Combine errands to make fewer trips."},
            "location": { "S": "general"},
            "support": { "S": "The transportation sector is responsible for a third of greenhouse gas emissions in the United States, 95 percent is made up of climate-altering carbon dioxide."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "41"},
            "tip": { "S": "Instead of buying physical copies, read magazines, newspapers and other publications online."},
            "location": { "S": "general"}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "42"},
            "tip": { "S": "Unplug at least once a day so that can reduce your energy usage."},
            "location": { "S": "general"},
            "support": { "S": "Take some time to enjoy nature and the environment around."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "43"},
            "tip": { "S": "Buy recycled paper."},
            "location": { "S": "general"},
            "support": { "S": "It takes 60 percent less energy to manufacture paper from recycled stock than from virgin materials."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "44"},
            "tip": { "S": "Buy recycled paper."},
            "location": { "S": "general"},
            "support": { "S": "It takes 60 percent less energy to manufacture paper from recycled stock than from virgin materials."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "45"},
            "tip": { "S": "Find alternatives to mail. Avoid printing on paper when a phone call, email, or text will do."},
            "location": { "S": "general"}
          }
         }
      }
    ]
  }
};

/*
* Call the batchWriteItem method of the DynamoDB service object.
* 
* Puts multiple items in one table (eco_quote).
*
*/
ddb.batchWriteItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});