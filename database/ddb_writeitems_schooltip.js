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
            "id": { "N" : "3"},
            "tip": { "S": "Bring your food and drink in reusable containers"},
            "location": { "S": "school"},
            "support": { "S": "Reusable dishware will use far less energy and resources over its lifetime than its disposable counterparts."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "30"},
            "tip": { "S": "Don't pack excess food that you will throw away."},
            "location": { "S": "school"},
            "support": { "S": "A third of the world’s food—1.3 billion tonnes—is wasted each year."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "31"},
            "tip": { "S": "Avoid buying and eating pre-packaged items."},
            "location": { "S": "school"}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "32"},
            "tip": { "S": "Reduce using light in the classroom. If there is enough natural light coming in through the window keep the lights turned off."},
            "location": { "S": "school"},
            "support": { "S": "Buildings in the United States consume over 30 percent of total energy and 60 percent of electricity usage."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "33"},
            "tip": { "S": "Make sure to turn the lights off when leaving the classroom."},
            "location": { "S": "school"}
          }
         }
      },
       { 
         PutRequest: {
          Item: {
            "id": { "N" : "34"},
            "tip": { "S": "Try to use less toilet paper if you can!"},
            "location": { "S": "school"},
            "support": { "S": "It takes 37 gallons of water to make one roll of toilet paper."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "35"},
            "tip": { "S": "Replace paper communications to parents, students, and employees with electronic methods."},
            "location": { "S": "school"},
            "support": { "S": "School mailing and paper costs will drop significantly."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "36"},
            "tip": { "S": "Purchase paper with the highest percentage of recycled materials that copier performance allows."},
            "location": { "S": "school"},
            "support": { "S": "Recycled paper use saves resources and reduces the paper industry's impact on the planet."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "4"},
            "tip": { "S": "Boycott products that endanger wildlife."},
            "location": { "S": "general"},
            "support": { "S": "Products made from animals on the endangered species list are illegal to buy, sell, import or trade in the United States, but if a plant or animal hasn’t been listed yet, they can still be harmed for someone’s profit."}
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