//Initialize new API client
var apigClient = apigClientFactory.newClient();

//Function to display an ordered list of recycling information from DynamoDB in HTML
function recycling_info(){
    //Pass table name as parameters to API
    var formData = {
      'TableName': "material"
    };
    var params = {
      'TableName': "material",
    };
    var body = {
    };
    var additionalParams = {
    headers :{
    },
    queryParams: {
      'TableName': "material"
    }
  };

  //Create a string for the opening tag for an HTML ordered list 
  var resultStr = "<ol>";
  
  //Call API to get recycling material information from database table
  apigClient.ecowebresourceGet(params, body, additionalParams)
  //This is where we put a success callback
  .then(function(result){
  dataResult = result.data;
  //Loop through each item and surrounded with list tags and closing ordered list tag to display in HTML
  result.data.Items.forEach(function(item){

    resultStr =   resultStr + "<br><li>" +  item.instruction + "</li>";
    return resultStr + "</ol>";
  });
  //Display the values in an HTML table in a paragraph tag labeled as "demo
  document.getElementById("demo").innerHTML = resultStr;
    
  //This is where we put an error callback
  }).catch(function (result){
  var error = "Sorry! Data is not available";
  });
  return resultStr;
};
