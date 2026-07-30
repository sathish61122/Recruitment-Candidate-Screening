async function predict() {
    console.log("Button clicked");

    const age = document.getElementById("age").value;
    const experience = document.getElementById("experience").value;
    const education = document.getElementById("education").value;
    const skills = document.getElementById("skills").value;

    try {
        const res = await fetch("https://recruitment-candidate-screening.onrender.com/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                age: Number(age),
                experience: Number(experience),
                education: Number(education),
                skills: Number(skills)
            })
        });

        const data = await res.json();
        console.log(data);

        document.getElementById("resultText").innerText =
            "Prediction: " + data.prediction;

        document.getElementById("confidenceText").innerText =
            "Confidence: " + (data.confidence * 100).toFixed(2) + "%";

        document.getElementById("resultCard").classList.remove("hidden");

    } catch (error) {
        console.error(error);
        alert("API error");
    }
}
