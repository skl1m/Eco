var AWS = require("aws-sdk");
AWS.config.update({region: "us-east-1"});

/**
* All table names in the database
**/
const material_table = "material";
const tip_table = "eco_tip";
const quote_table = "eco_quote";
const fact_table = "eco_fact";
const userTableName = "user";

var dbHelper = function () { };
var docClient = new AWS.DynamoDB.DocumentClient();

dbHelper.prototype.updateScore = (name, userID, score) => {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: userTableName,
            Item: {
              'name': name,
              'id': userID,
              'score': score
            }
        };
        docClient.put(params, (err, data) => {
            if (err) {
                console.log("Unable to insert =>", JSON.stringify(err))
                return reject("Unable to insert");
            }
            console.log("Saved Data, ", JSON.stringify(data));
            resolve(data);
        });
    });
}

dbHelper.prototype.getChallenge = (userID, name) => {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: userTableName,
            KeyConditionExpression: "#id = :id",
            ExpressionAttributeNames: {
                "#id": "id",
                "#name" : "name"
            },
            ExpressionAttributeValues: {
                ":id": userID,
                ":name": name
            }
        }
        docClient.query(params, (err, data) => {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
                return reject(JSON.stringify(err, null, 2))
            } 
            console.log("GetItem succeeded:", JSON.stringify(data, null, 2));
            resolve(data.Items)
            
        })
    });
}

dbHelper.prototype.removeChallenge = (challenge, name, userID ) => {
    return new Promise((resolve, reject) => {
        const params = {
            TableName: userTableName,
            Key: {
                "id": userID,
                "name": name,
                "challenge": challenge
            },
            ConditionExpression: "attribute_exists(id)"
        }
        docClient.delete(params, function (err, data) {
            if (err) {
                console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
                return reject(JSON.stringify(err, null, 2))
            }
            console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
            resolve();
        })
    });
}

dbHelper.prototype.getRandomEcoFact = () => {
    return new Promise((resolve, reject) => {
        var params = {
            TableName: fact_table
        };

        var totalFacts, randomFactIndex, randomFact, randomFactSupport; 

        docClient.scan(params, function(err, data) {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                //The JSON.stringify() method converts a JavaScript object or value to a JSON string
                        console.log("scan succeeded:", JSON.stringify(data, null, 2));
                        
                        totalFacts = data.Count; 

                        //Gets a random id to use on the data set of random facts
                        randomFactIndex = Math.floor(Math.random() * totalFacts);

                        //Gets a random fact from the 'data' object
                        randomFact = data.Items[randomFactIndex].fact;

                        //TODO: Delete after done using for testing purposes
                        //console.log(randomFact);
                        
                        //Gets a random fact support
                        randomFactSupport = data.Items[randomFactIndex].support; 

                        if(randomFactSupport == null){
                            randomFactSupport = "Sorry, there's no further information regarding this fact.";
                        }

                        console.log("Get random eco fact succeeded:", JSON.stringify(data, null, 2));
                        const factObj = {
                            fact: randomFact,
                            support: randomFactSupport
                        };
                        resolve(factObj);
            }
        })
    });
}

dbHelper.prototype.getRandomEcoTip = () => {
    return new Promise((resolve, reject) => {
        var params = {
            TableName: tip_table
        };

        var totalTips, randomTipIndex, randomTip, randomTipSupport; 

        docClient.scan(params, function(err, data) {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                        //The JSON.stringify() method converts a JavaScript object or value to a JSON string
                        console.log("Scan succeeded:", JSON.stringify(data, null, 2));
                        
                        totalTips = data.Count; 

                        //Gets a random id to use on the data set of random facts
                        randomTipIndex = Math.floor(Math.random() * totalTips);

                        //Gets a random fact from the 'data' object
                        randomTip = data.Items[randomTipIndex].tip;

                        //TODO: Delete after done using for testing purposes
                        console.log("randomTip:" + randomTip);
                        
                        //Gets a random fact support
                        randomTipSupport = data.Items[randomTipIndex].support;

                        //TODO: Delete after done using for testing purposes
                        console.log("randomTipSupport:" +  randomTipSupport); 

                        if(randomTipSupport == null){
                            randomTipSupport = "Sorry, there's no further information regarding this tip.";
                        }

                        console.log("Get random eco tip succeeded:", JSON.stringify(data, null, 2));
                        const factObj = {
                            tip: randomTip,
                            support: randomTipSupport
                        };
                        resolve(factObj);
            }
        })
    });
}

dbHelper.prototype.getTipLocation = (place) => {
    return new Promise((resolve, reject) => {

        var params = {
            TableName: tip_table,
            FilterExpression: "#place= :place",
            ExpressionAttributeNames: {
                "#place": "place", //{#variable: attribute_name}
            },
            ExpressionAttributeValues: {
                ":place": place,
            }
        };


        var totalTips, randomLocTipIndex, randomLocTip, randomLocTipSupport; 

        /**
        * The scan method reads every item in the table, and returns all the data in the table. 
        * You can provide an optional filter_expression, so that only the items matching your criteria are returned. 
        * However, the filter is only applied after the entire table has been scanned.
        * 
        * ProjectionExpression specifies the attributes you want in the scan result.
        * FilterExpression specifies a condition that returns only items that satisfy the condition. All other items are discarded.
        *
        * Documentation Link: https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GettingStarted.NodeJs.04.html#GettingStarted.NodeJs.04.Scan
        **/
        docClient.scan(params, function(err, data) {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                        //The JSON.stringify() method converts a JavaScript object or value to a JSON string
                        console.log("Scan succeeded:", JSON.stringify(data, null, 2));
                        
                        //TODO: Delete after done using for testing purposes
                        console.log("Data in getTipLocation: " + data);

                        totalTips = data.Count; 

                        //Gets a random id to use on the data set of random facts
                        randomLocTipIndex = Math.floor(Math.random() * totalTips);

                        //Gets a random fact from the 'data' object
                        randomLocTip = data.Items[randomLocTipIndex].tip;

                        //TODO: Delete after done using for testing purposes
                        console.log("Random Location Tip:" + randomLocTip);
                        
                        //Gets a random fact support
                        randomLocTipSupport = data.Items[randomLocTipIndex].support; 

                        //TODO: Delete after done using for testing purposes
                        console.log("Random Location Tip Support: " + randomLocTipSupport);

                        if(randomLocTipSupport == null){
                            randomLocTipSupport = "Sorry, there's no further information regarding this tip.";
                        }

                        console.log("Get random eco tip succeeded:", JSON.stringify(data, null, 2));
                        const factObj = {
                            tip: randomLocTip,
                            support: randomLocTipSupport
                        };
                        resolve(factObj);
            }
        })
    });
}

dbHelper.prototype.getRecycleTip = (material) => {
    return new Promise((resolve, reject) => {
        /**
        *
        * https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-example-document-client.html
        **/
        var params = {
            TableName: material_table,
            Key: {'material_name': material}
        };

        var recycleTip;
        console.log("getting recycle tip");

        docClient.get(params, function(err, data) {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                        //The JSON.stringify() method converts a JavaScript object or value to a JSON string
                        console.log("Scan succeeded:", JSON.stringify(data, null, 2));
                        
                        //TODO: Delete after done using for testing purposes
                        console.log("Data in getRecycleTip: " + data);

                        //Gets a random tip from the 'data' object
                        recycleTip = data.Item.instruction;

                        //TODO: Delete after done using for testing purposes
                        console.log("Recycle Tip:" + recycleTip);
                        
                        console.log("Get recycle tip succeeded:", JSON.stringify(data, null, 2));
                        
                        resolve(recycleTip);
            }
        })
    });
}

dbHelper.prototype.getRecycleMaterial = () => {
    return new Promise((resolve, reject) => {
        /**
        *
        * https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/dynamodb-example-document-client.html
        **/
        var params = {
            TableName: material_table,
        };

        docClient.scan(params, function(err, data) {
            if (err) {
                console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                
                totalMaterials = data.Count; 

                //Gets a random id to use on the data set of random facts
                randomMaterialIndex = Math.floor(Math.random() * totalMaterials);

                //Gets a random fact from the 'data' object
                randomMaterial = data.Items[randomMaterialIndex].material_name;

                //TODO: Delete after done using for testing purposes
                console.log("Random Material: --------" + randomMaterial);

                resolve(randomMaterial);
            }
        })
    });
}

module.exports = new dbHelper();