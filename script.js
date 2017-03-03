// Only execute this code once the DOM (all other content) is loaded.
document.addEventListener("DOMContentLoaded", function(event) {


  // Generates a list of social networks to choose from:
  var socialNetworkHTML;

  for (i in networkList) {
    socialNetworkHTML = "<li onclick='chooseNetwork(" + i + ")' class='social-network-choice' id='" + networkList[i].name + "'>" + "<img class='logo' src='images/logos/" + networkList[i].imageURL + "'><br>" + networkList[i].name + "</li>";
    socialNetworkList.insertAdjacentHTML("beforeend", socialNetworkHTML);
  }

  // Generates the list of status updates in the library in 4 categories.
  updates = availableStatusUpdates;
  var statusUpdateHTML = "";
  // Generates the buttons to select each category of update.

  // Populates each update category with the available updates.
  for (cat in updates){
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
  statusUpdateLib.insertAdjacentHTML("afterbegin", statusUpdateHTML);

  // See dragula.js
  var arraylike = document.getElementsByClassName("drag-container");
  var placeholders = document.getElementsByClassName("blank-status-update");
  var containers = Array.prototype.slice.call(arraylike);

  dragula(containers, {
    invalid: function (el, handle) {
      if (el.className.includes("blank-status-update")) {
        return true;
      }

    },

    copy: function(el) {
      if(el.className.includes("new-status-update")) {
        return true;
      }
    }
  })
  .on("drop", function(el) {
    $(el).siblings(".blank-status-update").hide();
    if (el.className.includes("new-status-update")) {
      $(el).children("#new-status-text").removeAttr("id");
      $(el).children("#new-status-preview").children("#new-status-image").removeAttr("id");
      $(el).children("#new-status-preview").removeAttr("id");
      $(".new-status-input").val("");
      $("#new-status-text").html("");
      $("#new-status-image").attr("src", "#");
      $("#new-status-preview").hide();

    }
  })
  .on("drag", function(el) {
    sibs = $(el).siblings(".status-update");
    if ($(el).siblings(".status-update").length == 1){
      $(el).siblings(".blank-status-update").show();
    }
  });
});

// This code starts executing when this file is loaded.
var socialNetworkList = document.getElementById("social-network-list");
var statusUpdateLib = document.getElementById("update-categories");
var chosenNetworks = document.getElementById("chosen-networks");
var networks = document.getElementById("networks");
var loading = document.getElementById("loading");
var directions = document.getElementById("directions");
var network0 = document.getElementById("network0");
var c0 = document.getElementById("c0");



var socialNetworks = []
var numberOfNetworksChosen = 0;



//<div class="status-update blank-status-update">
//+
//</div>

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

  $('#new-updates-button').click(function(){
      $('.status-update-category').css('display', 'none');
      $('#new-updates').css('display', 'block');
  });

  $('.slider').click(function(){
      $(this).children('.public').toggle();
      $(this).children('.private').toggle();
  });


}

function populateNewStatus() {
  $("#new-status-text").html($("#new-status-text-input").val());
}

function addImageToStatus() {
  $("#new-status-image").attr("src", $("#new-status-image-input").val());
  $("#new-status-preview").show();
}

function togglePrint() {
  $("#main-container").toggle();
  $("#printer-friendly").toggle();
  $(".print-button").toggle();
}

function addToPrint(html) {
  $("#printer-friendly").append(html);
  $("#printer-friendly").append("<br>");
}

function printList(){

  addToPrint("<h2>My Social Network Sort:</h2>");
  var lists = document.getElementsByClassName("network");
  for (l = 0; l < lists.length; l++) {
    name = lists[l].getElementsByClassName("network-name")[0].innerHTML;
    addToPrint("<h3>" + name + "</h3>");
    updatesList = lists[l].getElementsByClassName("drag-container")[0];
    updates = updatesList.getElementsByClassName("status-update");
    for (u = 0; u < updates.length; u++) {
      anUpdate = updates[u].getElementsByClassName("status-text")[0];
      if (anUpdate) {
        updateText = anUpdate.innerHTML;
        addToPrint((u + 1) + ": " + updateText);
        aPreview = updates[u].getElementsByClassName("status-preview")[0];
        if (aPreview) {
          updatePreview = aPreview.innerHTML;
          addToPrint(updatePreview);
        }
      }
    }
  }
  togglePrint();

}

function backToSort() {
  togglePrint();
  document.getElementById("printer-friendly").innerHTML = "";
}
