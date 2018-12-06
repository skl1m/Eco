//Initialize new API client
var apigClient = apigClientFactory.newClient();

//Function to display leaderboard information in an HTML table
function Leaderboard(){
	var formData = {
	'TableName': "Leaderboard"
	};
	var params = {
		'TableName': "Leaderboard",
	};
	var body = {
	};
	var additionalParams = {
		headers :{
		},
		queryParams: {
			'TableName': "Leaderboard"
		}
	};

	var found = false;
	apigClient.webrecourseGet(params, body, additionalParams)
	//This is where we put a success callback
	.then(function(result){		
	//Store string for an HTML table 
	var header = "<table id=\"leaderboard\"><tr><th>User ID</th><th>Name</th><th>Score</th></tr>";
	var resultStr = header;
	//Loop through each item in the result.data.Items array and append to resultStr
	result.data.Items.forEach(function(item){			
			resultStr = resultStr + " "+"<tr><td>"+item.UserID+"</td><td>"+item.Name+"</td><td>"+item.Rank+"</td><tr>"//resultStr + " " +item.Information;
			found = true;
		});
	//Display the values in an HTML table in a paragraph tag labeled as "demo"
	document.getElementById("demo").innerHTML = resultStr;
	
	//This is where we put an error callback
	}).catch(function (result){
		resultStr = "Error! Data is not available.";
		});
		if(found){return resultStr + "</table>"}
		else {return resultStr;}
};

document.getElementById("demo").innerHTML = Leaderboard();