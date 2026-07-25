const API = "http://127.0.0.1:8000";

// Load all subjects when the page opens
async function loadSubjects() {

    const response = await fetch(`${API}/subjects`);
    const subjects = await response.json();

    const subjectsDiv = document.getElementById("subjects");

    subjectsDiv.innerHTML = "";

    subjects.forEach(subject => {

        subjectsDiv.innerHTML += `
            <label>
                <input type="checkbox" value="${subject}">
                ${subject}
            </label>
        `;

    });

}

// Search button
document
    .getElementById("searchBtn")
    .addEventListener("click", searchSchools);


// Search schools
async function searchSchools() {

    const checked = document.querySelectorAll("#subjects input:checked");

    const params = new URLSearchParams();

    checked.forEach(box => {
        params.append("subjects", box.value);
    });

    const response = await fetch(
        `${API}/search?${params.toString()}`
    );

    const schools = await response.json();
    console.log(schools);

    const results = document.getElementById("results");

    results.innerHTML = `<h2>${schools.length} schools found</h2>`;

    if (schools.length === 0) {

        results.innerHTML += "<p>No schools found.</p>";
        return;

    }

    schools.forEach(school => {

        let combinationsHTML = "";

        results.innerHTML = `<h2>${schools.length} schools found</h2>`;

schools.forEach(school => {

    results.innerHTML += `
        <div class="school">
            <h3>${school.name}</h3>

            <p>County: ${school.county}</p>

            <p>Cluster: ${school.cluster}</p>

            <p>Gender: ${school.gender}</p>

            <p>Accommodation: ${school.accommodation}</p>

        </div>
    `;

});

        results.innerHTML += `
            <div class="school">

                <h3>${school.name}</h3>

                <p><strong>County:</strong> ${school.county}</p>

                <p><strong>Cluster:</strong> ${school.cluster}</p>

                <p><strong>Gender:</strong> ${school.gender}</p>

                <p><strong>Accommodation:</strong> ${school.accommodation}</p>

                <p><strong>Institution Type:</strong> ${school.institution_type}</p>

                <h4>Matching Subject Combinations</h4>

                <ul>
                    ${combinationsHTML}
                </ul>

            </div>
        `;

    });

}

// Load subjects immediately
loadSubjects();
document
    .getElementById("schoolSearchBtn")
    .addEventListener("click", searchSchool);
    async function searchSchool() {

    const q = document
        .getElementById("schoolSearch")
        .value;

    if (!q) return;

    const response = await fetch(
        `${API}/school-search?q=${encodeURIComponent(q)}`
    );

    const schools = await response.json();

    if (schools.length === 0) {

        document.getElementById("schoolDetails").innerHTML =
            "<p>No school found.</p>";

        return;

    }

    let html = "";

for (const school of schools) {

    const detailsResponse = await fetch(
        `${API}/schools/${school.school_id}`
    );

    const details = await detailsResponse.json();

    html += `
        <div class="school">

            <h2>${details.name}</h2>

            <p><b>County:</b> ${details.county}</p>

            <p><b>Cluster:</b> ${details.cluster}</p>

            <p><b>Gender:</b> ${details.gender}</p>

            <p><b>Accommodation:</b> ${details.accommodation}</p>

            <h3>Subject Combinations</h3>

            <ul>
    `;

    details.subject_combinations.forEach(combo => {

        html += `
            <li>
                <strong>${combo.code}</strong><br>
                ${combo.name}<br>
                <small>${combo.pathway}</small>
            </li>
            <br>
        `;

    });

    html += `
            </ul>

        </div>

        <hr>
    `;

}

document.getElementById("schoolDetails").innerHTML = html;

    details.subject_combinations.forEach(combo => {

        html += `
            <li>
                <strong>${combo.code}</strong><br>
                ${combo.name}<br>
                <small>${combo.pathway}</small>
            </li>
            <br>
        `;

    });

    html += "</ul>";

    document.getElementById("schoolDetails").innerHTML = html;

}