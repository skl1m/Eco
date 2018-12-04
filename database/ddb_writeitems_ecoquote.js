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
* Table Name: eco_quote
* id : A key for the table - a number that represents the id of that fact
* quote: A string that is an environmental quote - to leave the user with something to think about.
* support: A string that gives more info pertaining to the fact. 
*
* NOTE: Not all items have to the same attributes, but each item needs the key(s)
*
* Quotes from
* http://wisdomquotes.com/nature-quotes/
* https://blog.arcadiapower.com/10-powerful-climate-change-quotes-world-leaders/
*/
var params = {
  RequestItems: {
     "eco_quote": [
       { 
       	 PutRequest: {
       	 	Item: {
       	 	  "id": { "N" : "1"},
       	 	  "quote": { "S": "Remember we do not inherit the earth from our ancestors, we borrow it from our children."}
       	 	}
       	 }
      },
      { 
       	 PutRequest: {
       	 	Item: {
       	 	  "id": { "N" : "2"},
       	 	  "quote": { "S": "The marks humans leave are too often scars."}
       	 	}
       	 }
      },
      { 
       	 PutRequest: {
       	 	Item: {
       	 	  "id": { "N" : "3"},
       	 	  "quote": { "S": "The earth has music for those who listen."}
       	 	}
       	 }
      },
      { 
       	 PutRequest: {
       	 	Item: {
       	 	  "id": { "N" : "4"},
       	 	  "quote": { "S": "Be the change you wish to see in this world."}
       	 	}
       	 }
      },
      { 
       	 PutRequest: {
       	 	Item: {
       	 	  "id": { "N" : "5"},
       	 	  "quote": { "S": "There is a way that nature speaks, that land speaks. Most of the time we are simply not patient enough, quiet enough, to pay attention to the story."}
       	 	}
       	 }
      },
      { 
       	 PutRequest: {
       	 	Item: {
       	 	  "id": { "N" : "6"},
       	 	  "quote": { "S": "Normality is a paved road; it’s comfortable to walk, but no flowers grow. "}
       	 	}
       	 }
      },
      { 
       	 PutRequest: {
       	 	Item: {
       	 	  "id": { "N" : "7"},
       	 	  "quote": { "S": "The sustainability train has left the station. Get on board or get left behind… Those who fail to bet on the green economy will be living in a grey future."}
       	 	}
       	 }
      },
      { 
       	 PutRequest: {
       	 	Item: {
       	 	  "id": { "N" : "8"},
       	 	  "quote": { "S": "It’s not just an unusually hot summer, it is climate change."}
       	 	}
       	 }
      },
      { 
       	 PutRequest: {
       	 	Item: {
       	 	  "id": { "N" : "9"},
       	 	  "quote": { "S": "Remember we do not inherit the earth from our ancestors, we borrow it from our children."}
       	 	}
       	 }
      },
      { 
       	 PutRequest: {
       	 	Item: {
       	 	  "id": { "N" : "10"},
       	 	  "quote": { "S": "Preservation of the environment, promotion of sustainable development and particular attention to climate change are matters of grave concern for the entire human family."}
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