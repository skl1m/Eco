var AWS = require("aws-sdk");
var docClient = new AWS.DynamoDB.DocumentClient();

exports.handler = (event,context, callback) => {
    console.log("PARAMS---:" + parseInt(event.params.querystring.location));
    
    var params = {
        TableName : "Sustainibility_location_info",
        Key :{
            "location" : parseInt(event.params.querystring.location)
        }
    };
    
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

{

"body-json":{}
"params":{
	"path":{}
	"querystring":{
		"location":"1"
	}
}
}