// Sample data (later you can connect backend)
const data = [
  {experience: 1, test: 60, interview: 65, selected: 0},
  {experience: 3, test: 80, interview: 78, selected: 1},
  {experience: 2, test: 70, interview: 72, selected: 1},
  {experience: 0.5, test: 50, interview: 55, selected: 0}
];

// Overview
document.getElementById("records").innerText = data.length;
document.getElementById("features").innerText = 4;
document.getElementById("missing").innerText = 0;

// Table
const table = document.querySelector("#dataTable tbody");

data.forEach(row => {
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${row.experience}</td>
    <td>${row.test}</td>
    <td>${row.interview}</td>
    <td>${row.selected}</td>
  `;

  table.appendChild(tr);
});
const selectedCount = data.filter(d => d.selected === 1).length;
const rejectedCount = data.filter(d => d.selected === 0).length;

new Chart(document.getElementById("chart"), {
  type: "bar",
  data: {
    labels: ["Selected", "Rejected"],
    datasets: [{
      label: "Candidates",
      data: [selectedCount, rejectedCount]
    }]
  }
});