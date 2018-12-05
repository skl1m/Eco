/**
This is lambda function code. The lambda function takes place between Dynamodb and APIGate way layer.
This code will read data from dyanmod db based on tableName request, and pass data to API Gateway.
*/

// declare and initialize the aws-sdk variable.
var AWS = require("aws-sdk");
// declare and initialize the Dyanamod variable to read data from database.
var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event,context, callback) => {
// display the parameter value that is being passed.
console.log("PARAMS---:" + /*parseInt(*/event.params.querystring.TableName/*)*/);    
    var params = {
        // define the table to display the output.
         "TableName" : event.params.querystring.TableName         
         };

// scan the table and display whole table, or print error message if table doesn't exist.
    docClient.scan(params, function(err,data){
        if(err)
        {
            console.error("Unable to read Id. Error JSON:" , JSON.stringify(err,null,2));
        }
        else
        {
            callback(null,JSON.parse(JSON.stringify(data,null,2)));
        }
    });
    
};
