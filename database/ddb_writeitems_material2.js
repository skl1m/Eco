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
* Table Name: material
* item : A key for the table - a string that represents the name of the item
* instruction: A string that instructs how to dispose of the item
*
* NOTE: Not all items have to the same attributes, but each item needs the key(s)
*
*/
var params = {
  RequestItems: {
     "material": [
      { 
         PutRequest: {
          Item: {
            "name": { "S": "pencils"},
            "instruction": { "S": "Pencils go in the garbage"}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "hair"},
            "instruction": { "S": "Human hair is a rich source of nitrogen and can be placed in a compost bin. Pet fur can also be placed in the compost bin. Dye-treated hair is acceptable in Compost but do NOT compost synthetic hair extensions or wigs, even if made with real hai. These go into the garbage."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "styrofoam"},
            "instruction": { "S": "Very few recycling programs accept styrofoam because it is very costly and inefficient to recycle. It is non-biodegradable and can sit in a landfill for centuries. If possible, try to limit your use of styrofoam."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "wood"},
            "instruction": { "S": "Small pieces of lumber or sawdust from clean wood can go in the compost bin. If there are nails or paint in the wood, it belongs in the garbage."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "chopsticks"},
            "instruction": { "S": "Wooden chopsticks go in the compost bin while plastic chopsticks go in the recycling bin."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "hangers"},
            "instruction": { "S": "Clothes hangers are reusable or can be donated. It can be difficult to determine what plastics different hangers are made of so they cannot be donated. Metal hangers can be collected for scrap metal, but cannot be recycled because they cause problems with recycling sorting equiptment. "}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "mirrors"},
            "instruction": { "S": "Unlike glass bottles, mirrors melt at a different temperature and are not accepted in traditional recycling bins. Broken mirrors go in the garbage."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "pyrex"},
            "instruction": { "S": "Pyrex glassware is a low-thermal expansion glass that liquidates at a different temperature than regular glass bottles. Broken pyrex should go out in the garbage in a taped up box. Pyrex in good condition may be donated."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "windows"},
            "instruction": { "S": "Windows go in the garbage. They melt at a different temperature than glass bottles and cannot be recycled."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "kleenex"},
            "instruction": { "S": "Soiled kleenex should be composted. Unsoiled kleenex should be disposed of in the recycling bin."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "tissue"},
            "instruction": { "S": "Regardless if it contains mucus, blood, lipstick, et cetera, used tissues go in the compost bin. Unused tissues go in the recycling bin."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "cutlery"},
            "instruction": { "S": "Cutlery is recyclable. Cutlery that are labeled compostable may go in the compost bin, but bio-degradable cutlery cannot."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "plastics"},
            "instruction": { "S": "Dirty plastics and hard plastics are recyclable."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "laundry detergent bottles"},
            "instruction": { "S": "Laundry detergent bottles are recyclable."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "molded plastic packaging"},
            "instruction": { "S": "Molded plastic packaging is recyclable."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "pipette tip boxes"},
            "instruction": { "S": "Pipette tip boxes are recyclable"}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "plastic buckets"},
            "instruction": { "S": "Plastic buckets are recyclable."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "plastic coffee cups lids"},
            "instruction": { "S": "Plastic coffee cup lids are recyclable."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "plastic containers"},
            "instruction": { "S": "Plastic containers are recyclable."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "plastic clamshells"},
            "instruction": { "S": "Plastic clamshells are recyclable."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "plastic corks"},
            "instruction": { "S": "Plastic corks are recyclable."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "plastic cups"},
            "instruction": { "S": "Plastic cups are recyclable."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "plastic flower pots and trays"},
            "instruction": { "S": "Plastic flowers pots and trays are recyclable."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "plastic pots"},
            "instruction": { "S": "Plastic pots are recyclable"}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "plastic trays"},
            "instruction": { "S": "Plastic trays are recyclable"}
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