var dataResult;
var apigClient = apigClientFactory.newClient();

function sustainableHome(){
var formData = {
'TableName': "material"
};

var params = {'TableName': "material",
};
var body = {

};
var additionalParams = {
headers :{},
queryParams: {'TableName': "material"
}
};

var resultStr = "<ol>";

apigClient.ecowebresourceGet(params, body, additionalParams)
.then(function(result){
console.log(result.data);
console.log(result.data.Items);

console.log("after log for result.");
dataResult = result.data;
console.log(resultStr);
result.data.Items.forEach(function(item){

  resultStr =   resultStr + "<br><li>" +  item.instruction + "</li>";
  
  return resultStr + "</ol>";
});
console.log("after log for resultStr.");
document.getElementById("demo").innerHTML = resultStr;
}).catch(function (result){
var error = "data not available";
});
return resultStr;
};

document.getElementById("demo").innerHTML = sustainableHome();