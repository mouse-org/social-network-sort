// Only execute this code once the DOM (all other content) is loaded.
document.addEventListener("DOMContentLoaded", function(event) {


  // Generates a list of social networks to choose from:
  var socialNetworkHTML;

  for (i in availableSocialNetworks) {
    socialNetworkHTML = "<li onclick='chooseNetwork(" + i + ")' class='social-network-choice' id='" + availableSocialNetworks[i][0] + "'>" + "<img class='logo' src='images/" + availableSocialNetworks[i][1] + "'><br>" + availableSocialNetworks[i][0] + "</li>";
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

var availableSocialNetworks =
    [
      ["Facebook", "facebook.png", "#3b5998"],
      ["Flickr", "flickr.jpeg", "#ff0084"], 
      ["Instagram","instagram.png", "#bc2a8d"],
      ["LinkedIn", "linkedin.jpeg", "#007bb5"],
      ["Periscope", "periscope.jpeg", "#D95343"],
      ["Pinterest", "pintrest.jpeg", "#cb2027"],
      ["Snapchat", "snapchat.png", "#fffc00"],
      ["SoundCloud", "soundcloud.png", "#f50"],
      ["Tumblr", "tumblr.png", "#32506d"],
      ["Twitter", "twitter.jpeg", "#55acee"],
      ["Vine", "vine.jpeg", "#00bf8f"],
      ["YouTube", "youtube.png", "#bb0000"]
    ]

var availableStatusUpdates = 
    {
      text: [
        ["just failed another math quiz, I think mrs. smith hates me hsxfdf"],
        ["GO COUGARS BASKETBALL!!!!!"],
        ["know i should apply for summer jobs, but i’m just gonna watch movies all day instead lol"],
        ["Hey everyone! i wrote an article for the school blog on the new tablets we’re getting in the computer lab. check it out!", "text", 
         "Cougars Blog: Computer Lab gets Brand New Tablets! Have you ever thought that having a tablet at school would make school easier? *Click here* to keep reading…"],
        ["ms. garcia just asked me to be the computer lab assistant after school every monday, so come by if you need help with any tech!"],
        ["lost my phone and all my contacts, so text your number to my new phone: 555-012-3456."],
        ["ate garlic fries at lunch and now i have the worst breath :/"],
        ["🏊 🏖 🍔 🌞 🕕 🕙 🕓 🕥 🕞 😟 😖 😫"],
        ["Everytime I eat 5 hotdogs in a row I get the worst stomach ache. #doingitanyway"],
        ["I finally got the video game I’ve been saving for! Homework can wait right?"]
      ],

      image: [
        ["Reading about Tetris for my history report, makes me want to play!", "image", "images/tetris.png"],
        ["Beagles are my favorite kind of dog! So cute!", "image", "images/beagle.jpg"],
        ["Finally finished my Arduino project for my computer science class!", "image", "images/arduino.jpg"],
        ["My family is all packed up for our summer trip, going to miss our house being gone for a month!", "image", "images/house.jpg"],
        ["Look at this amazing picture of the sunset I took!", "image", "images/sunset.jpg"],
        ["I found this old picture of our school in a book. Wow things have changed!", "image", "images/oldschool.jpg"],
        


      ],
      video: [
        ["Hey @tommie and @gracie, just uploaded that hilarious video I took at your pool party! LOL!", "image", "images/pool.png"],
        ["Coding all day, learning a lot!", "image", "images/terminal.gif"],
        ["This is my favorite new dance!", "image", "images/dancing.gif"],
        ["Making an electronics project", "image", "images/circuit.gif"],
        ["OMG wut???!!1!!1", "image", "images/hamburger.png"],
        ["Can't stop watching 👀", "image", "images/tesseract.gif"],
        ["TFW I'm skipping math class cause ¯\\_(ツ)_/¯", "image", "images/walk.gif"],
        ["Game last night was soooo close ⚽️😅", "image", "images/soccer.gif"],
        ["My lunch lol", "image", "images/food.gif"]

      ],

      media: [
        ["remixed a beatles song. Tell me if you like it!", "image", "images/bulldog.png"],
        ["Sampling this trombone sound in my new song", "image", "images/trombone.png"],
        ["I like to program electronic drums, this is my newest track:", "image", "images/drums.png"],
        ["My new favorite song!", "image", "images/song2.png"],
        ["This Ghandi recording is so inspiring!!", "image", "images/ghandi.png"]

      ]
    }

var socialNetworks = []
var numberOfNetworksChosen = 0;

function chooseNetwork(networkID) {
  socialNetwork = availableSocialNetworks[networkID]
  selectedNetwork = "network" + numberOfNetworksChosen;
  socialNetworks += socialNetwork;
  
  network = document.getElementById(selectedNetwork);
  networkName = document.getElementById(selectedNetwork + "-name");
  firstStatus = document.getElementById(selectedNetwork + "-first-status");
  $(document.getElementById(socialNetwork[0])).addClass("selected");
  
  network.style.background = socialNetwork[2];
  networkName.insertAdjacentHTML("afterbegin", socialNetwork[0]);
  networkName.insertAdjacentHTML("afterend", "<img src='images/" + socialNetwork[1] + "' class='logo-small'>");
  firstStatus.insertAdjacentHTML("beforeend", socialNetwork[0]);
  
  numberOfNetworksChosen += 1;
  if (numberOfNetworksChosen >= 3) {
    loading.style.display = "inline";
    setTimeout(function(){
      socialNetworkList.style.display = "none";
      loading.style.display = "none";
      chosenNetworks.style.display = "inline";
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


