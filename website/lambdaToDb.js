/*
Reading database information from dynamoDB to Lambda function
created by Maulik Patel
*/
var AWS = require("aws-sdk");
// declare and initialize dynamoDB database object.
var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event,context, callback) => {
    console.log("PARAMS---:" + parseInt(event.params.querystring.location));
    
	// pull information from specific table based on specific primary key.
    var params = {
        TableName : "Sustainibility_location_info",
        Key :{
            "location" : parseInt(event.params.querystring.location)
        }
    };
    
	// display error if data is invalid.otherwise, display result.
    docClient.get(params, function(err,data){
        if(err)
        {
            console.error("Unable to read location. Error JSON:" , JSON.stringify(err,null,2));
        }
        else
        {
            callback(null,JSON.parse(JSON.stringify(data,null,2)));
        }
    });
};

// path queryset up for testing.
{

"body-json":{}
"params":{
	"path":{}
	"querystring":{
		"location":"1"
	}
}
}
