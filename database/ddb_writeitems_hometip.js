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
       	 	  "id": { "N" : "1"},
       	 	  "tip": { "S": "Landscape your own yard with native plants."},
            "location": { "S": "home"},
            "support": { "S": "Native plants grow well in your climate, they are low maintenance, require less water, prevent pollution, and save you money. "}
       	 	}
       	 }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "10"},
            "tip": { "S": "Take shorter showers."},
            "location": { "S": "home"},
            "support": { "S": "An average shower uses about 5 gallons of water per minute. If you shorten your shower by 2 minutes, you can cut your water use by 10 gallons."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "11"},
            "tip": { "S": "Open windows to let in fresh air."},
            "location": { "S": "home"},
            "support": { "S": "Indoor air is often more polluted than outdoor air, even in urban environments. According to the U.S. Environmental Protection Agency, indoor air quality is one of the top five environmental health concerns."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "12"},
            "tip": { "S": "Limit the amount of food that goes bad by eating what you have first before buying more."},
            "location": { "S": "home"},
            "support": { "S": "According to the EPA, 21% of all waste in the landfill is food waste."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "13"},
            "tip": { "S": "Opt for paperless billing."},
            "location": { "S": "home"},
            "support": { "S": "If every American household viewed and paid bills online, it could reduce solid waste in U.S. landfills by more than 800,000 tons a year and help curb the release of greenhouse gases by 2.1 million tons."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "14"},
            "tip": { "S": "Pay your bills electronically."},
            "location": { "S": "home"},
            "support": { "S": "By having your bills delivered electronically and paying them online, every year your household can: save 6 pounds of paper, save 23 pounds of wood, avoid producing 29 pounds of greenhouse gas emissions"}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "15"},
            "tip": { "S": "Growing your own herbs can save you hundreds in the long run."},
            "location": { "S": "home"},
            "support": { "S": "Earth will need to produce 70% more food by 2050 in order to sustain a predicted population of over 9 billion people."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "16"},
            "tip": { "S": "Just as keeping your car in shape improves your fuel efficiency, keeping your home in shape improves your energy efficiency."},
            "location": { "S": "home"}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "17"},
            "tip": { "S": "If you're not using an electronic device, unplug it -- that's the blanket approach to fighting vampire power. You can make this step even easier with a surge protector or power strip."},
            "location": { "S": "home"},
            "support": { "S": "In the United States alone, vampire power costs consumers more than $3 billion a year."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "18"},
            "tip": { "S": "Swap all CFL bulbs for LED in house because LEDs are 90 percent efficient, contain no harmful gases, and can last up to 20 years."},
            "location": { "S": "home"},
            "support": { "S": "LED bulbs used in fixtures inside the home save electricity, remain cool, and save money on replacement costs since LED bulbs last so long."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "19"},
            "tip": { "S": "Wait until you have a full load for laundry on cold wash."},
            "location": { "S": "home"},
            "support": { "S": "This not only extends the lifespan and vibrancy of your clothing it also saves 90% of the energy that would have been used to heat the water."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "110"},
            "tip": { "S": "Make sure the temperature of the room matches the thermostat."},
            "location": { "S": "home"},
            "support": { "S": "If the temperature of the room does not match the thermostat, then move furniture around to allow the heat to circulate more freely and improve the system efficiency by 25 percent."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "111"},
            "tip": { "S": "Unplug all unused electronic devices from outlets to prevent phantom energy."},
            "location": { "S": "home"},
            "support": { "S": "Phantom energy is the electricity that electronics pull from the outlet while plugged in - even when the device is off it can waste as much as 10% of your home’s energy."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "112"},
            "tip": { "S": "Plug all your computer and electronic equipment into a central power strip and use a the switch to turn off all equipment when you're not using them."},
            "location": { "S": "home"},
            "support": { "S": "According to Cornell University, phantom load can cost the average home $200 per year."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "113"},
            "tip": { "S": "Make sure your computer isn’t wasting any unnecessary energy by setting energy saver mode. "},
            "location": { "S": "home"},
            "support": { "S": "This cuts energy consumption and prolongs the computer’s battery life."}
          }
         }
      },
      { 
         PutRequest: {
          Item: {
            "id": { "N" : "114"},
            "tip": { "S": "If you live in an apartment or have a home elevator, opt to take stairs ..... It's good for your health and a good way to save some kWh!"},
            "location": { "S": "home"},
            "support": { "S": "The amount of energy it takes for one person to travel one floor in an elevator is 2.5 Wh, roughly equivalent to charging your cell phone battery a few percentage points."}
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