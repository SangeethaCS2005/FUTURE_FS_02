let leads = JSON.parse(localStorage.getItem("leads")) || [];

const leadForm = document.getElementById("leadForm");

leadForm.addEventListener("submit", function(e){

    e.preventDefault();

    const lead = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        source: document.getElementById("source").value,

        status: document.getElementById("status").value

    };

    leads.push(lead);

    localStorage.setItem(
        "leads",
        JSON.stringify(leads)
    );

    leadForm.reset();

    loadTable();
    loadStats();

    alert("Lead Added Successfully!");

});

function loadTable(){

    const table =
    document.getElementById("leadTable");

    table.innerHTML = "";

    leads.forEach((lead,index)=>{

        table.innerHTML += `

        <tr>

            <td>${lead.name}</td>

            <td>${lead.email}</td>

            <td>${lead.source}</td>

            <td>${lead.status}</td>

            <td>

                <button
                class="update-btn"
                onclick="updateLead(${index})">
                Update
                </button>

                <button
                class="delete-btn"
                onclick="deleteLead(${index})">
                Delete
                </button>

            </td>

        </tr>

        `;
    });
}

function updateLead(index){

    let newName =
    prompt("Client Name", leads[index].name);

    if(newName === null) return;

    let newEmail =
    prompt("Client Email", leads[index].email);

    if(newEmail === null) return;

    let newSource =
    prompt("Lead Source", leads[index].source);

    if(newSource === null) return;

    let newStatus =
    prompt(
        "Status (New, Contacted, Converted)",
        leads[index].status
    );

    if(newStatus === null) return;

    leads[index] = {

        name:newName,
        email:newEmail,
        source:newSource,
        status:newStatus

    };

    localStorage.setItem(
        "leads",
        JSON.stringify(leads)
    );

    loadTable();
    loadStats();

    alert("Lead Updated Successfully!");

}

function deleteLead(index){

    if(confirm("Delete this lead?")){

        leads.splice(index,1);

        localStorage.setItem(
            "leads",
            JSON.stringify(leads)
        );

        loadTable();
        loadStats();
    }
}

function loadStats(){

    document.getElementById("totalLeads").innerText =
    leads.length;

    document.getElementById("newLeads").innerText =
    leads.filter(
        lead=>lead.status==="New"
    ).length;

    document.getElementById("contactedLeads").innerText =
    leads.filter(
        lead=>lead.status==="Contacted"
    ).length;

    document.getElementById("convertedLeads").innerText =
    leads.filter(
        lead=>lead.status==="Converted"
    ).length;
}

loadTable();
loadStats();