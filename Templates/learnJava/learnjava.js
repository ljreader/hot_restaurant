var nlCentralList = [
    "Cardinals",
    "Reds",
    "Cubs",
    "Pirates",
    "Brewers",
]

var nlCentralTeams = document.getElementById("mlb-teams");
for (var i = 0; i < nlCentralList.length; i++) {
    var nextTeamDiv = document.createElement("div");
    nextTeamDiv.innerHTML = nlCentralList[i];
    nlCentralTeams.appendChild(nextTeamDiv);
}
