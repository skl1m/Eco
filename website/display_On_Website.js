/**
	this javascript function will take place in sustainability information and Leadership board layout page.
	This code will make request from s3 bucket to APIGateway. Than APIGateway will make request to Lambda,
	and Lambda function will make request to Dynamodb table to display the information on the webpage.
	
	In short, this page will helps to display the information on website from dynamodb.
*/
<script>
// declare and initialize newclient.
	var apigClient = apigClientFactory.newClient();

	// sustainableHome displays the database information on website.
    function sustainableHome(){
		// load parameter as table name to display the requested output.
		var formData = {
		'TableName': "eco_Tip"
		};
		
		var params = {'TableName': "eco_Tip",
		};
		var body = {
		
		};
		var additionalParams = {
		headers :{},
		queryParams: {'TableName': "eco_Tip"
		}
		};
		
		// call APIGateway to request the table data from database, and display it.		
		apigClient.webrecourseGet(params, body, additionalParams)
		.then(function(result){		
		
		// convert object to json string.
		var resultStr = JSON.stringify(result.data.Items);
		// display the output on website.
		document.getElementById("demo").innerHTML = resultStr;
		
		// display error if any erros.
		}).catch(function (result){
			console.log("error");
			});
			return false;
	};
</script>