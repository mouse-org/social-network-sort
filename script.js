// Only execute this code once the DOM (all other content) is loaded.
document.addEventListener("DOMContentLoaded", function(event) {


  // Generates a list of social networks to choose from:
  var socialNetworkHTML;


  for (i in networkList) {
    socialNetworkHTML = "<li onclick='chooseNetwork(" + i + ")' class='social-network-choice' id='" + networkList[i].name + "'>" + "<img class='logo' src='images/logos/" + networkList[i].imageURL + "'><br>" + networkList[i].name + "</li>";
    socialNetworkList.insertAdjacentHTML("beforeend", socialNetworkHTML);
  }
  
  var statusUpdateHTML;

  updates = availableStatusUpdates;

  statusUpdateHTML = "<div id='status-update-library'><div id='type-updates-buttons'><div class='updates-button' id='text-updates-button'>Text</div><div class='updates-button' id='image-updates-button'>Images</div><div class='updates-button' id='video-updates-button'>Videos</div><div class='updates-button' id='media-updates-button'>Audio</div></div>"


  for (cat in updates){

    console.log(cat + ": " + updates[cat]);

    statusUpdateHTML += "<div class='status-update-category drag-container' id='" + cat + "-updates'>";
  
    for (j = 0; j < updates[cat].length; j++) {
      statusUpdateHTML += "<div class='status-update'><div class='status-avatar'><img src='images/speaking-user.png'></div><div class='status-text'>" + updates[cat][j][0] + "</div>";
      if (updates[cat][j].length > 1) {
        if (updates[cat][j][1] == "text") {
          statusUpdateHTML += "<div class='status-preview'>" + updates[cat][j][2] + "</div>";
        } else {
          statusUpdateHTML += "<div class='status-preview'><img src='" + updates[cat][j][2] + "'></div>";
        }
      }
      statusUpdateHTML += "</div>";
    }

    statusUpdateHTML += "</div>";
  }

  statusUpdateHTML += "</div>";
  statusUpdateList.insertAdjacentHTML("beforeend", statusUpdateHTML);

    // See dragula.js 
  var arraylike = document.getElementsByClassName("drag-container");
  var containers = Array.prototype.slice.call(arraylike);
  dragula({ containers: containers });

});

// This code executes when this file is loaded.

var socialNetworkList = document.getElementById("social-network-list");
var statusUpdateList = document.getElementById("status-list");
var chosenNetworks = document.getElementById("chosen-networks");
var networks = document.getElementById("networks");
var loading = document.getElementById("loading");
var directions = document.getElementById("directions");
var network0 = document.getElementById("network0");
var c0 = document.getElementById("c0");



var socialNetworks = []
var numberOfNetworksChosen = 0;

function chooseNetwork(networkID) {
  socialNetwork = networkList[networkID];
  selectedNetwork = "network" + numberOfNetworksChosen;
  socialNetworks += socialNetwork;

  network = document.getElementById(selectedNetwork);
  networkName = document.getElementById(selectedNetwork + "-name");
  firstStatus = document.getElementById(selectedNetwork + "-first-status");
  $(document.getElementById(socialNetwork.name)).addClass("selected");
  
  network.style.background = socialNetwork.color;
  networkName.insertAdjacentHTML("afterbegin", socialNetwork.name);
  networkName.insertAdjacentHTML("afterend", "<img src='images/logos/" + socialNetwork.imageURL + "' class='logo-small'>");
  firstStatus.insertAdjacentHTML("beforeend", socialNetwork.name);
  
  numberOfNetworksChosen += 1;

  // When the user chooses 3 networks:
  if (numberOfNetworksChosen >= 3) {
    loading.style.display = "inline";
    setTimeout(function(){
      socialNetworkList.style.display = "none";
      loading.style.display = "none";
      chosenNetworks.style.display = "inline";
      directions.innerHTML = "Move statuses from the library into the appropriate network."
    }, 500);
  }

  $('#text-updates-button').click(function(){
      $('.status-update-category').css('display', 'none');
      $('#text-updates').css('display', 'block');
  });

  $('#image-updates-button').click(function(){
      $('.status-update-category').css('display', 'none');
      $('#image-updates').css('display', 'block');
  });

  $('#video-updates-button').click(function(){
      $('.status-update-category').css('display', 'none');
      $('#video-updates').css('display', 'block');
  });

  $('#media-updates-button').click(function(){
      $('.status-update-category').css('display', 'none');
      $('#media-updates').css('display', 'block');
  });

  $('.slider').click(function(){
      $(this).children('.public').toggle();
      $(this).children('.private').toggle();
  });
}



