// giphy api key: yFIvDL56RXCgLx9oqZXU1GSTTFg1qAXC

var musicalInstruments = ["piccolo", "flute", "oboe", "english horn",
						  "clarinet", "bassoon", "french horn", "trumpet",
						  "trombone", "tuba", "timpani", "violin", "viola",
						  "cello", "double bass"];

function createButtons() {
	$("#api-buttons").empty();
	for (i = 0; i < musicalInstruments.length; i++) {
		var newButton = $("<button class='btn' id='new-button'>");
		newButton.text(musicalInstruments[i]);
		newButton.attr("name", musicalInstruments[i]);
		$("#api-buttons").append(newButton);
	}
}

$("#submit").on("click", function() {
	event.preventDefault();
	var input = $("#button-input").val().trim();
	if (input) {
		musicalInstruments.push(input);
		createButtons();
	}
	$("#button-input").val("");
});

$("#clear-results").on("click", function() {
	$("#gifs").empty();
});

function displayGIFs() {
	var buttonName = $(this).attr("name");
	console.log(buttonName);

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + buttonName + "&api_key=yFIvDL56RXCgLx9oqZXU1GSTTFg1qAXC&limit=10"

	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function(response) {
		console.log(response);
		$("#gifs").empty();
		for (i = 0; i < response.data.length; i++) {
			var gifImage = $("<img class='gif'>");
			gifImage.attr('src', response.data[i].images.downsized_still.url);
			gifImage.attr('data-still', response.data[i].images.downsized_still.url);
			gifImage.attr('data-animated', response.data[i].images.downsized.url);
			gifImage.attr('data-state', 'still');
			
			var rating = $("<div>");
			rating.html('Rating: ' + response.data[i].rating.toUpperCase() + "<br><br>");
			$("#gifs").append(gifImage);
			$("#gifs").append(rating);
		}

			$(".gif").on("click", function() {
				
				var state = $(this).attr("data-state");
				
				if (state === 'still') {
					$(this).attr('src', $(this).attr('data-animated'));
					$(this).attr('data-state', 'animated');
				} else {
					$(this).attr("src", $(this).attr("data-still"));
					$(this).attr('data-state', 'still');
				}
			})
		
	});

}

$(document).on("click", "#new-button", displayGIFs);

createButtons();