// import the aws sdk
const AWS = require("aws-sdk");
//instaniate a dynamodb and specify the region and version of dynamo used
const dynamodb = new AWS.DynamoDB({
region: "us-east-1",
  apiVersion: "2012-08-10"
});
exports.handler = (event, context, callback) => {
  //specify table name that will be read
  const params = {
    TableName: "Scores"
  };
  // a function to scan the table
  //prams take the name of the table and err that will be returned if table does not exist 
  dynamodb.scan(params, (err, data) => {
    //if table doesn't exist, return error
    if (err) {
      console.log(err);
      callback(err);
    } 
    //if table exist get the times in the table
    else {
        const scores = data.Items.map(item => {
          //return the name of item specifying name of item and dataType of the item.
          return { name: item.name.S, score: item.score.N };
        });
        callback(null, scores);    }
  });
};
