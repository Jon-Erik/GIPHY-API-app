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
		var gif = $("<div>");
		$("#gifs").append(gif);
		for (i = 0; i < response.data.length; i++) {
			var gifImage = $("<div>");
			gifImage.html('<img id="gif-image" src="' + response.data[i].images["480w_still"].url + '" alt="loading" title="loading"/></br>');
			var rating = $("<div>");

			var animated = false;
			$("#gif-image").on("click", function() {
				if (animated === false) {
					console.log(gifImage);
					$("#gif-image").html('<img id="gif-image" src="' + response.data[i].images.downsized.url + '" alt="loading" title="loading"/></br>')
					animated = true;
				} else if (animated === true) {
					$("#gif-image").html('<img id="gif-image" src="' + response.data[i].images["480w_still"].url + '" alt="loading" title="loading"/></br>');
					animated = false;
				}
			})

			rating.html('Rating: ' + response.data[i].rating.toUpperCase() + "<br><br>");
			gif.append(gifImage);
			gif.append(rating);
		}
		
	});

}



$(document).on("click", "#new-button", displayGIFs);

createButtons();