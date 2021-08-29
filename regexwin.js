var backgroundPage = browser.extension.getBackgroundPage();
var search_but = document.getElementById("search-regexwin");
var gather_but = document.getElementById("gather-regexwin");
var resultcount = document.getElementById("result-count");

search_but.addEventListener("click", function(e) {
  let x = document.getElementById("regexwin-input").value;
  backgroundPage.find(x);
  e.preventDefault();
});

gather_but.addEventListener("click", function(e) {
  let x = document.getElementById("regexwin-input").value;
  backgroundPage.move(x);
  e.preventDefault();
});

function handleMessage(request, sender, response) {
  // Handle responses coming back from the background page.
  if (request.msg === "found-results") {
    // Print the count
    resultcount.innerText = `${request.count} matches.`;
  }
  if (request.msg === "gather-tabs") {
    console.log("GATHER TABS TRIGGERED IN HANDLE MESSAGE");
  }
}

browser.runtime.onMessage.addListener(handleMessage);
