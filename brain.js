document.getElementById("issueForm").addEventListener("submit", saveIssue)

function saveIssue(e) {
    var empname = document.getElementById("name").value
    var empid = document.getElementById("empid").value
    var department = document.getElementById("department").value
	var description = document.getElementById("description").value

    var issueId = chance.guid()
	var ticketNo = chance.zip()
	
	var assignedFirst = chance.first()
	var assignedLast = chance.last()
	var assigned = assignedFirst + " " + assignedLast
	var assignedContact = assignedFirst.toLowerCase() + assignedLast.toLowerCase()
    
	var issueStatus = "Open"

	// console.log(empname)
	// console.log(empid)
	// console.log(department)
	// console.log(description)
	// console.log(issueId)
	// console.log(ticketNo)

    var issue = {
        id: issueId,
        ticket: ticketNo,
		name: empname,
        empid: empid,
        dep: department,
		desc: description,
		assist: assigned,
		assistEmail: assignedContact,
        status: issueStatus
    }

    if (localStorage.getItem("issues") == null) {
        var issues = []
        issues.push(issue)
        localStorage.setItem("issues", JSON.stringify(issues))
    } else {
        var issues = JSON.parse(localStorage.getItem("issues"))
        issues.push(issue);
        localStorage.setItem("issues", JSON.stringify(issues))
    }

    document.getElementById("issueForm").reset()

	e.preventDefault()

    getAllIssues()
}

var setStatusClosed = (id) => {
    var issues = JSON.parse(localStorage.getItem("issues"))

    for (var i = 0; i < issues.length; i++) {
		if (issues[i].id == id) {
			issues[i].status = "Closed"
		}
    }

    localStorage.setItem("issues", JSON.stringify(issues))

    getAllIssues()
}

var deleteIssue = (id) => {
	var issues = JSON.parse(localStorage.getItem("issues"))

	for (var i = 0; i < issues.length; i++) {
		if (issues[i].id == id) {
			issues.splice(i, 1);
		}
	}

	localStorage.setItem("issues", JSON.stringify(issues))

	getAllIssues()
}

var validateBtn = () => {
	var empname = document.getElementById("name").value
    var empid = document.getElementById("empid").value
    var department = document.getElementById("department").value
	var description = document.getElementById("description").value

	var submitBtn = document.getElementById("mainBtn")
	var mustMessage = document.getElementById("must")

	if(empname != "" && empid != "" && department != "none" && description != "") {
		submitBtn.disabled = false
		mustMessage.innerHTML = ""
	} else {
		submitBtn.disabled = true
		mustMessage.innerHTML = "asterick (*) marked fields are required!"
	}
}

// var copyTicket = () => {
// 	var copyText = document.getElementById("ticket")
// 	navigator.clipboard.writeText(copyText.value)
// }

var getAllIssues = () => {
	var issues = JSON.parse(localStorage.getItem("issues"))
	var issuesList = document.getElementById("issuesList")

	issuesList.innerHTML = ''

  	for (var i = 0; i < issues.length; i++) {
		// var assignedFirst = chance.first()
		// var assignedLast = chance.last()
		// var assigned = assignedFirst + " " + assignedLast
		// var assignedContact = assignedFirst.toLowerCase() + assignedLast.toLowerCase()
		// console.log(assignedContact)

		if(issues[i].status == "Open") {
			issuesList.innerHTML += '<div class="card">' +
										// '<h3 class="card-header">' + issues[i].desc + '</h3>' +
										'<div class="card-body">'+
											'<h6>Issue ID: ' + issues[i].id + '</h6>' +
											'<h5>Ticket No.: <span id="ticket">' + issues[i].ticket + '</span></h5>' +
											'<p><span class="badge rounded-pill bg-success text-light">' + issues[i].status + '</span></p>' +
											'<h3>' + issues[i].desc + '</h3>' +
											'<p><b>Issued By</b>: ' + issues[i].name + ' - ' + issues[i].empid + '</p>' +
											// '<p><b>Assigned To</b>: <a href="' + assignedContact + '@gmail.com">' + assigned + '</a></p>' +
											'<p><b>Assigned To</b>: ' + issues[i].assist + ' (' + issues[i].assistEmail + '@gmail.com)</p>' +
											'<button class="btn btn-warning" onclick="setStatusClosed(\''+ issues[i].id +'\')">Close</button> ' +
											'<button class="btn btn-danger" onclick="deleteIssue(\''+ issues[i].id +'\')">Delete</button> ' +
											// '<button class="btn btn-primary" onclick="copyTicket()"><i class="fas fa-copy"></i></button>'
										'</div>' +
									'</div><br>'
		} else {
			issuesList.innerHTML += '<div class="card">' + 
										'<div class="card-body">'+
											'<h6>Issue ID: ' + issues[i].id + '</h6>' +
											'<h5>Ticket No.: ' + issues[i].ticket + '</h5>' +
											'<p><span class="badge rounded-pill bg-danger text-light">' + issues[i].status + '</span></p>' +
											'<h3>' + issues[i].desc + '</h3>' +
											'<p><b>Issued By:</b> ' + issues[i].name + ' - ' + issues[i].empid + '</p>' +
											// '<p><b>Assigned To</b>: <a href="' + assignedContact + '@gmail.com">' + assigned + '</a></p>' +
											'<p><b>Assigned To</b>: ' + issues[i].assist + ' (' + issues[i].assistEmail + '@gmail.com)</p>' +
											'<button class="btn btn-danger" onclick="deleteIssue(\''+ issues[i].id +'\')">Delete</button>' +
										'</div>' +
									'</div><br>'
		}
  	}
}