let lightbox = document.getElementById('lightbox')
let songInfo = document.getElementById('song-info')
let addSong = document.getElementById('add-song')

let search = document.getElementById('search-box')
let searchBox = search.children[1]
const activeSearch = search.children[3];

let searchTerm = ""

let table = document.getElementById('item-table')
let tableItems = document.getElementsByClassName('item')

let registerTitle = ""
let registerArtist = ""
let registerName = ""

let selectedTitle = document.getElementById('selected-item')
let selectedArtist = document.getElementById('selected-artist')

let itemTitle = ""
let itemArtist = ""

let registration = false;
let toggleResults = false;

const allItems = []

let queueItems = []
let queuePerformers = []

const queueDiv = document.getElementById('queue')

const form = document.querySelector("#song-info");

async function sendData() {
  // Associate the FormData object with the form element
  const formData = new FormData(form);

  try {
    const response = await fetch("https://example.org/post", {
      method: "POST",
      // Set the FormData instance as the request body
      body: formData,
    });
    console.log(await response.json());
  } catch (e) {
    console.error(e);
  }
}

// Take over form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();
  sendData();
});


function openRegistration(){
	lightbox.style.display = "block";
	//itemTitle = document.createTextNode(registerTitle);
	//itemArtist = document.createTextNode(registerArtist);
	selectedTitle.textContent = registerTitle;
	selectedArtist.textContent = registerArtist;
}

function closeRegistration(){
	lightbox.style.display = "none";
	selectedTitle.textContent = "";
	selectedArtist.textContent = "";
}

function loadList(){
	//console.log(tableItems.length);
	activeSearch.textContent = ""
	lightbox.style.display = "none";
	for (let i = 0; i < tableItems.length; i++) {
	  //console.log(tableItems[i])
	  allItems.push(tableItems[i].children[0].textContent + ", " + tableItems[i].children[1].textContent)
	  tableItems[i].addEventListener("click", function (e) {
		registerTitle = this.children[0].textContent;
		registerArtist = this.children[1].textContent;
		//console.log(registerTitle + ", " + registerArtist);
		registration = true;
		//console.log(registration)
		openRegistration();
	  });
	}
};

function displayQueue(){
	const queueItem = document.createElement("div");
	const newTitle = document.createElement("h4");
	const newArtist = document.createElement("h5");
	const newPerformer = document.createElement("h3")
	queueDiv.appendChild(queueItem)
	queueItem.appendChild(newPerformer)
	queueItem.appendChild(newTitle)
	queueItem.appendChild(newArtist)
	let itemCount = queueItems.length;
	let performerCount = queuePerformers.length;
	const splitSongInfo = queueItems[itemCount - 1].split(", ");
	console.log(splitSongInfo)
	newTitle.textContent = splitSongInfo[0]
	newArtist.textContent = splitSongInfo[1]
	newPerformer.textContent = queuePerformers[performerCount - 1]
	queueItem.classList.add("queue-item")
	newTitle.classList.add("queue")
	newArtist.classList.add("queue")
	newPerformer.classList.add("queue")
}

function registerSong() {
	let newTitle = songInfo.children[2].textContent
	let newArtist = songInfo.children[3].textContent
	let submitError = false;
	registerName = songInfo.children[5].value;
	const nameError = document.createElement("p");
	const brk = document.createElement("br");
	if (registerName !== "") {
		console.log(registerName)
		console.log("Success")
		submitError = false;
		registration = false;
		songInfo.children[5].value = ""
		//console.log(newTitle + ", " + newArtist)
		queueItems.push(newTitle + ", " + newArtist)
		queuePerformers.push(registerName)
		let itemCount = queueItems.length;
		console.log(queueItems[itemCount - 1])
		console.log(queuePerformers[itemCount - 1])
		displayQueue();
		loadList();
		console.log(forminfo)
		//itemTitle.parentNode.removeChild(itemTitle);
		//itemArtist.parentNode.removeChild(itemArtist);
		if (submitError == false){
			songInfo.replaceChild(brk, document.getElementById('err'))
			songInfo.children[7].style.marginTop = "20px";
		}
		
		const form = document.querySelector("#song-info");

		async function sendData() {
		// Associate the FormData object with the form element
		const formData = new FormData(form);

		try {
			const response = await fetch("https://projects.happyplacedesign.co", {
			method: "POST",
			// Set the FormData instance as the request body
			body: formData,
			});
			console.log(await response.json());
		} catch (e) {
			console.error(e);
		}
		}

		// Take over form submission
		form.addEventListener("submit", (event) => {
		event.preventDefault();
		sendData();
		});
		
	} else {
		console.log("Fail")
		console.log(songInfo.children[5])
		
		nameError.textContent = "Please enter your name"
		nameError.style.color = "red";
		nameError.id = "err"
		songInfo.replaceChild(nameError, songInfo.children[6]);
		songInfo.children[7].style.marginTop = "0px";
		submitError = true;
	}
	songInfo.children[5].value = ""
}



function searchItems(){
	const noResults = document.createElement("h3");
	console.log(searchBox.value);
	searchTerm = searchBox.value;
	if (searchTerm == ""){
		activeSearch.textContent = ""
	} else {
		activeSearch.textContent = "Searching For: " + searchTerm;
	}
	
	searchBox.value = "";
	let empty = 0;
	
	for (let i = 0; i < allItems.length; i++) {
		//console.log(allItems[i])
		if (allItems[i].includes(searchTerm) == true) {
			console.log (tableItems[i])
			tableItems[i].style.display = "table-row";
			
		} else {
			tableItems[i].style.display = "none";
			empty++
		}
	}
	
	if (empty >= tableItems.length){
		let removeNote = document.getElementById('no-results')
		if (toggleResults == false){
			noResults.textContent = 'No Results Found for "' + searchTerm + '"'
			noResults.id = "no-results"
			table.appendChild(noResults);
			console.log("Alert!")
			toggleResults = true;
		} else if (toggleResults == true && removeNote.parentNode){
			removeNote.parentNode.removeChild(removeNote);
			toggleResults = false;
			noResults.textContent = 'No Results Found for "' + searchTerm + '"'
			noResults.id = "no-results"
			table.appendChild(noResults);
			toggleResults = true;
		}
	} else {
		let removeNote = document.getElementById('no-results')
		if (removeNote.parentNode){
			removeNote.parentNode.removeChild(removeNote);
			toggleResults = false;
		}
	}

}


