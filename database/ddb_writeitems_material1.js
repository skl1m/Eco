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
* name : A key for the table - a string that represents the name of the item
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
            "name": { "S": "paper"},
            "instruction": { "S": "Paper is recyclable. This includes craft paper, mixed paper, newspapers, newspapers inserts, cleaner office paper, packing paper wrapping paper"}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "book"},
            "instruction": { "S": "Text books and other books can be donated if they are current. Otherwise, hardcover and paperback books are both recycleable."}
          }
        }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "card board"},
            "instruction": { "S": "Flatten all cardboard before placing it in your recycling bin. If it is too large, flatten it and place it beside your bin."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "cereal boxes"},
            "instruction": { "S": "Cereal Boxes go in the recycling bin or the compost bin if it is soiled. Be sure to remove and throw away the inner lining in the garbage."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "egg cartons"},
            "instruction": { "S": "Clean egg cartons may go in the recycling bin or the compost bin. Soiled egg cartons must be composted."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "envelopes"},
            "instruction": { "S": "Envelopes are recyclable. Envelopes lined with bubble wrap or other plastic linings must go in the garbage."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "file folder"},
            "instruction": { "S": "File folders that are in good condition can be donated. Old file folders may be recycled. Metal tabbed folders may be recycled, but be sure to dispose of any plastic tabs in the garbage."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "glossy paper"},
            "instruction": { "S": "Glossy paper is recyclable."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "junk mail"},
            "instruction": { "S": "Junk mail is recyclable."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "magazines"},
            "instruction": { "S": "Magazines are recyclable."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "mailer envelopes"},
            "instruction": { "S": "Mailer envelopes are recycable that are made without plastic."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "pendaflex hanging folder"},
            "instruction": { "S": "Pendaflex hanging folders are recycable."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "phonebooks"},
            "instruction": { "S": "Phone books are recyclable. How are phonebooks still a thing?"}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "post-it"},
            "instruction": { "S": "post-its go in to the recycling bin."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "sticky notes"},
            "instruction": { "S": "Sticky notes are recycable."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "animal cages"},
            "instruction": { "S": "Animal cages made of different materials should be thrown in the garbage. The amount of energy required to separate them makes recycling impractical. 100 percent plastic cages are recyclable, but please make sure they are clean."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "plastic bottles"},
            "instruction": { "S": "Plastic bottles are recycable.",}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "dvd cases"},
            "instruction": { "S": "DVD cases are recycable. Make sure they don't contain any confidential information!"}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "cd rom cases"},
            "instruction": { "S": "CDROM cases are recycable."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "plexi-glass"},
            "instruction": { "S": "Plexi-glass items in good condition may be donated. Otherwise, they should go in the recycling bin."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "pipettes"},
            "instruction": { "S": "Pipettes go in the garbage."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "bricks"},
            "instruction": { "S": "Bricks are a heavy and bulky landfill , so reuse them whenever possible. Bricks are made from clay and cannot be placed in any of the traditional three stream containers. Call your local recycling center to see if they can recycle bricks."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "floss"},
            "instruction": { "S": "Dental floss goes in the garbage."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "batteries"},
            "instruction": { "S": "Single use batteries contain a number of s that are recyclable. You can recycle them by dropping them off at a local facility or by participating in the many mail-in or take back programs that are available."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "name": { "S": "pens"},
            "instruction": { "S": "Pens go in the garbage"}
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