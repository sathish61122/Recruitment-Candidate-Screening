async function predict() {
    const experience = document.getElementById("experience").value;
    const test = document.getElementById("test").value;
    const interview = document.getElementById("interview").value;

    // Basic validation
    if (!experience || !test || !interview) {
        alert("Please fill all fields");
        return;
    }

    // Loading state
    document.getElementById("result").innerHTML = "Predicting...";

    try {
        const response = await fetch("http://recruitment-candidate-screening.onrender.com/predict"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                experience: parseFloat(experience),
                test_score: parseFloat(test),
                interview_score: parseFloat(interview)
            })
        });

        const data = await response.json();

        // Show result
        document.getElementById("result").innerHTML = `
            <div class="result-card">
                <h3>${data.recommendation}</h3>
                <p>Confidence: ${data.confidence}%</p>
            </div>
        `;
    } catch (error) {
        document.getElementById("result").innerHTML = "Error connecting to server";
    }
if (!data.experience || !data.test_score || !data.interview_score) {
    showToast("Please fill all fields ⚠️");
    return;
}
}
