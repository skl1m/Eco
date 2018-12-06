/**
This file will get called in html file to display the table value for sustainability at work.

created by Maulik Patel
*/
// declare and initialize variables.
	var dataResult;
	var apigClient = apigClientFactory.newClient();

	// sustainableHome: displays the sustainable tip for work.
    function sustainableWork(){
			// pass the table name as parameter.
		var formData = {
		'TableName': "eco_tip"
		};
		
		var params = {'TableName': "eco_tip",
		};
		var body = {
		
		};
		var additionalParams = {
		headers :{},
		queryParams: {'TableName': "eco_tip"
		}
		};
		
		var resultStr = "<ol>";
		
		// call apiGateway to request the information from database and print it.
		apigClient.ecowebresourceGet(params, body, additionalParams)
		.then(function(result){
		dataResult = result.data;
	    // iterate values from object.
		result.data.Items.forEach(function(item){
			// if location value is equal to work than display sustainability tip. otherwise skip.

			if((item.place).localeCompare("work")==0){
				// save result on variable.
				resultStr =   resultStr + "<br><li>" +  item.tip + "</li>";
				}
				// return result.
				return resultStr + "</ol>";
			});
		// go to exception if data doesn't exist in database.
		}).catch(function (result){
			// save error message.
			resultStr = "data not available";
			});
			// return result.
			return resultStr;
	};

	// display result on website.
	document.getElementById("demo").innerHTML = sustainableWork();