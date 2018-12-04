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
* Create a JSON object containing the parameters needed to write batches of items
* Inserting items into the eco_fact table, each has the key(s) you want to write 
* for each item, and the attributes along with their values
* Not all items have to the same attributes, but each item needs a key
*
* Facts from 
* https://climate.nasa.gov/evidence/
* http://ecocycle.org/ecofacts
* https://www.conserve-energy-future.com/15-current-environmental-problems.php
* http://www.listofenvironmentalissues.com/environmental-issues-facts-for-kids/
*/
var params = {
  RequestItems: {
    "eco_fact": [
       {
         PutRequest: {
           Item: {
             "id": { "N": "1" },
               "fact": { "S": "Studies show 97% of researchers believe global warming is happening and trends observed over the past century are likely due to human activity." },
               "support": { "S": "According to Nasa, the current warming trend is proceeding at a rate that is unprecedented over decades to millennia." }
           }
         }
       },
       {
         PutRequest: {
           Item: {
             "id": { "N": "2" },
               "fact": { "S": "Arctic sea ice and glaciers are melting." },
               "support": { "S": "Arctic sea ice coverage has shrunk every decade since 1979 by 3.5 to 4.1 per cent." }
           }
         }
       },
       {
         PutRequest: {
           Item: {
             "id": { "N": "3" },
               "fact": { "S": "Sea levels are rising at their fastest rate in 2,000 years." },
               "support": { "S": "Rising sea levels is caused primarily by added water from melting ice sheets and glaciers, as well as the expansion of sea water as it warms." }
           }
         }
       },
       {
       PutRequest: {
           Item: {
             "id": { "N": "4" },
               "fact": { "S": "Climate change leads to a refugee crisis." },
               "support": { "S": "Displacement of people is not a hypothetical, it's already happening. An average of 21.5 million people have been forcibly displaced since 2008 due to climate changed-related weather hazards, according to the United Nations High Commissioner For Refugees." }
           }
         }
       },
       {
        PutRequest: {
           Item: {
             "id": { "N": "5" },
               "fact": { "S": "Two-thirds of the Great Barrier Reef has been damaged by cloral bleaching as a result of climate change." },
               "support": { "S": "Coral bleaching occurs when algae living within the coral tissue are expelled, usually as a result of water temperatures being too high." }
           }
         }
       },
       {
       PutRequest: {
           Item: {
             "id": { "N": "6" },
               "fact": { "S": "Temperatures are breaking records around the world. The 21st century has seen the most temperature records broken in recorded history." },
               "support": { "S": "Most of the warming occurred in the past 35 years, with the five warmest years on record taking place since 2010. Not only was 2016 the warmest year on record, but 8 months of the year were the warmest on record for those respective months. " }
           }
         }
       },
       {
         PutRequest: {
           Item: {
             "id": { "N": "7" },
               "fact": { "S": "Temperatures are rising and the oceans have absorbed much of this increased heat." },
               "support": { "S": "The top 700 meters of ocean show warming of more than 0.4 degrees Fahrenheit since 1969." }
           }
         }
       },
       {
         PutRequest: {
           Item: {
             "id": { "N": "8" },
               "fact": { "S": "The Greenland and Antarctic ice sheets have decreased in mass. The rate of Antarctica ice mass loss has tripled in the last decade." },
               "support": { "S": "Data from NASA's Gravity Recovery and Climate Experiment show Greenland lost an average of 281 billion tons of ice per year between 1993 and 2016, while Antarctica lost about 119 billion tons during the same time period. " }
           }
         }
       },
       {
         PutRequest: {
           Item: {
             "id": { "N": "9" },
               "fact": { "S": "Glaciers are retreating almost everywhere around the world — including in the Alps, Himalayas, Andes, Rockies, Alaska and Africa." }
           }
         }
       },
       {
         PutRequest: {
           Item: {
             "id": { "N": "10" },
               "fact": { "S": "Global sea level rose about 8 inches in the last century. " },
           	   "support": { "S": "The rate in the last two decades, however, is nearly double that of the last century and is accelerating slightly every year." }
           }
         }
       },
        {
         PutRequest: {
           Item: {
             "id": { "N": "11" },
               "fact": { "S": "Both the extent and thickness of Arctic sea ice has declined rapidly over the last several decades." },
           	   "support": { "S": "Arctic sea ice reaches its minimum each September. September Arctic sea ice is now declining at a rate of 12.8 percent per decade, relative to the 1981 to 2010 average. " }
           }
         }
       },
       {
         PutRequest: {
           Item: {
             "id": { "N": "12" },
               "fact": { "S": "The acidity of surface ocean waters has increased by about 30 percent since the industrial revolution as a result of humans emitting more carbon dioxide into the atmosphere." },
           	   "support": { "S": "More carbon dioxide means more being absorbed into the oceans. The amount of carbon dioxide absorbed by the upper layer of the oceans is increasing by about 2 billion tons per year." }
           }
         }
       },
       {
         PutRequest: {
           Item: {
             "id": { "N": "13" },
               "fact": { "S": "In the past 50 years, humans have consumed more resources than in all previous history." }
           }
         }
       },
        {
         PutRequest: {
           Item: {
             "id": { "N": "14" },
               "fact": { "S": "In 1995 over 200 of the world landfills were full." }
           }
         }
       },
       {
         PutRequest: {
           Item: {
             "id": { "N": "15" },
               "fact": { "S": "Each person throws away approximately four pounds of garbage every day." }
           }
         }
       },
       {
         PutRequest: {
           Item: {
             "id": { "N": "16" },
               "fact": { "S": "The garbage in a landfill stays for a for about 30 years." }
           }
         }
       },
       {
         PutRequest: {
           Item: {
             "id": { "N": "17" },
               "fact": { "S": "Most families throw away about 88 pounds of plastic every year." }
           }
         }
       },
       {
       	 PutRequest: {
       	 	Item: {
       	 	  "id": { "N": "18"},
       	 	    "fact": { "S": "The population of the planet is reaching unsustainable levels as it faces shortage of resources like water, fuel and food."}
       	 	}
       	 }
       },
       {
       	 PutRequest: {
       	 	Item: {
       	 	  "id": { "N" : "19"},
       	 	    "fact": { "S": "Human activity is leading to the extinction of species and habitats and and loss of bio-diversity."}
       	 	}
       	 }
       },
       {
       	 PutRequest: {
       	 	Item: {
       	 	  "id": { "N" : "20"},
       	 	    "fact": { "S": "Human activity is leading to the extinction of species and habitats and and loss of bio-diversity."}
       	 	
       	 	}
       	 }
       },
       {
       	 PutRequest: {
       	 	Item: {
       	 	  "id": { "N" : "21"},
       	 	     "fact": { "S": "Presently, forests cover 30% of land but every year tree cover is lost due to growing population demand for more food, shelter and cloth. "},
       	 	     "support": { "S": "Our forests are natural sinks of carbon dioxide and produce fresh oxygen as well as helps in regulating temperature and rainfall. "}
       	 	}
       	 }
       },
       {
       	 PutRequest: {
       	 	Item: {
       	 	  "id": { "N" : "22"},
       	 	   "fact": { "S": "Acid rain occurs due to certain pollutants in the atmosphere. Acid rain can be caused due to combustion of fossil fuels, erupting volcanoes, or rotting vegetation "},
       	 	   "support": { "S": "Acid rain is a known  environmental problem that can have serious effect on human health, wildlife and aquatic species."}
       	 	}
       	 }
       },
       {
       	 PutRequest: {
       	 	Item: {
       	 	  "id": { "N" : "23"},
       	 	   "fact": { "S": "Clean drinking water is becoming a rare commodity. Water is becoming an economic and political issue as the human population fights for this resource."},
       	 	   "support": {"S": "Industrial development is filling our rivers seas and oceans with toxic pollutants which are a major threat to human health."}
       	 	}
       	 }
       },
       {
       	 PutRequest: {
       	 	Item: {
       	 	  "id": { "N" : "24"},
       	 	  "fact": { "S": "The current environmental problems pose a lot of risk to health of humans, and animals. "},
       	 	  "support": { "S": " Dirty water is the biggest health risk of the world and poses threat to the quality of life and public health. Run-off to rivers carries along toxins, chemicals and disease carrying organisms."}
       	 	}
       	 }
       },
       {
       	 PutRequest: {
       	 	Item: {
       	 	  "id": { "N" : "25"},
       	 	  "fact": { "S": "An estimated 80% of the world’s forests have already been lost to deforestation."},
       	 	  "support": { "S": " Dirty water is the biggest health risk of the world and poses threat to the quality of life and public health. Run-off to rivers carries along toxins, chemicals and disease carrying organisms."}
       	 	}
       	 }
       }
    ]
  }
};

/*
* Call the batchWriteItem method of the DynamoDB service object.
*
*/
ddb.batchWriteItem(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data);
  }
});