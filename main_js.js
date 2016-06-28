(function($) {
	$(document).ready(function() {
		var url = "https://raw.githubusercontent.com/onaio/ona-tech/master/data/water_points.json";

		$.getJSON(url)
		 .then(function(response){
		 	var data = response;
		 	
		 	var functionalPoints = data.filter(function(item){
		 		return item.water_functioning === "yes";
		 	});

		 	var numberOfFunctionalPoints = functionalPoints.length;

		 	var communities = {};

		 	data.forEach(function(item){
		 		communities[item.communities_villages] = {
		 		 name: item.communities_villages,
		 		 numberOfPoints: 0,
		 		 brokenPoints: 0,
		 		 percentageBrokenPoints: 0,
		 		 rank: 0
		 		};
		 	});

		 	data.forEach(function(data_item) {

		 		for(var community in communities){
		 			if(data_item.communities_villages === community)
		 			{
		 				communities[community].numberOfPoints++;

		 				if(data_item.water_functioning !== "yes"){
		 					communities[community].brokenPoints++;
		 				}

		 				var percentageBrokenPoints = (communities[community].brokenPoints/communities[community].numberOfPoints)*100;

		 				communities[community].percentageBrokenPoints = percentageBrokenPoints;
		 			}

		 		}

		 	});

		 	var communitiesArray = [];
		 	var communitiesRanked = [];

		 	for(var com in communities){
		 		communitiesArray.push(communities[com]);
		 	}

		 	for(var i=0;i<communitiesArray.length;i++)
		 	{
		 		var max = communitiesArray.reduce(function(prev, next){
		 			if(next.percentageBrokenPoints > prev.percentageBrokenPoints)
		 				return next;
		 			else
		 				return prev;
		 		});

		 		var indexOfMax = communitiesArray.indexOf(max);

		 		communitiesRanked.push(max);
		 		communitiesArray.splice(indexOfMax, 1);
		 	}


		 	for(var com in communities){
		 		communities[com].rank = communitiesRanked.indexOf(communities[com])+1;
		 	}

		 	console.log(communities);


		 });
	});
})(jQuery);