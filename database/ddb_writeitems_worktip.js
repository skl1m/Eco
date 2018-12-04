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
            "id": { "N" : "2"},
            "tip": { "S": "Recycle all of your used printer toner or ink cartridges."},
            "location": { "S": "work"},
            "support": { "S": "Not recycling your cartidges add to the greenhouse gases being released into the atmosphere."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "20"},
            "tip": { "S": "Establish a reuse stationery system accessible by staff to avoid throwing functioning stationery away."},
            "location": { "S": "work"},
            "support": { "S": "To consume paper isn't only to consume wood, but also water and energy. Producing virgin paper has a high environmental cost compared to recycled paper."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "21"},
            "tip": { "S": "Ensure doors and windows in all air conditioned rooms are kept closed when the air conditioning is on."},
            "location": { "S": "work"}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "22"},
            "tip": { "S": "Replace older toilets with low-flow toilets."},
            "location": { "S": "work"},
            "support": { "S": "Water scarcity is one of the biggest challenges in global sustainability, and toilets are generally the biggest source of water consumption in a typical office environment."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "23"},
            "tip": { "S": "Manually put your device to sleep when you leave your desk if you won't be using it for a period of time"},
            "location": { "S": "work"}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "24"},
            "tip": { "S": "Replace all T12 fluorescent lights with energy efficient lights such as T8s or LEDs."},
            "location": { "S": "work"},
            "support": { "S": "The newest T8 LEDs are around 30% more efficient than T8 fluorescent lights"}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "25"},
            "tip": { "S": "Install occupancy sensors to automatically turn lights off and on in areas where lights do not need to remain on all the time"},
            "location": { "S": "work"}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "26"},
            "tip": { "S": "Install low flow faucet aerators on your bathroom and kitchen sinks to reduce your water usage"},
            "location": { "S": "work"},
            "support": { "S": "If one out of every 100 American homes retrofitted with water-efficient fixtures, we could avoid 80,000 tons of greenhouse gas emissions."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "27"},
            "tip": { "S": "Have at least one paper recycling bin per office."},
            "location": { "S": "work"},
            "support": { "S": "Recycling reduces the load on our country's landfills by re-using the materials instead of throwing them away."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "28"},
            "tip": { "S": "Place paper recycling bins by each photocopier and printer."},
            "location": { "S": "work"},
            "support": { "S": "Recycling reduces our need for mining and processing production to extract materials to replace what doesn't get recycled."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "29"},
            "tip": { "S": "Disable screensaver on your computers."},
            "location": { "S": "work"},
            "support": { "S": "When you use screensavers your display is pretty active and you do not save any energy."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "200"},
            "tip": { "S": "If you are not using an application, then close it out."},
            "location": { "S": "work"},
            "support": { "S": "Having multiple applications open slow down your computer and use more power."}
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