const backendURL = "https://video-ai-backend-ft6x.onrender.com";

document.getElementById("generateBtn").onclick = async () => {
    const file = document.getElementById("videoInput").files[0];
    if (!file) return alert("Please upload a video");

    const form = new FormData();
    form.append("video", file);

    const res = await fetch(backendURL + "/generate-script", {
        method: "POST",
        body: form
    });

    const data = await res.json();
    document.getElementById("engOutput").textContent = data.english;
    document.getElementById("mmOutput").textContent = data.myanmar;
};

document.getElementById("voiceEngBtn").onclick = async () => {
    const text = document.getElementById("engOutput").textContent;

    const res = await fetch(backendURL + "/voice-en", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
    });

    const blob = await res.blob();
    document.getElementById("engVoiceDownload").href = URL.createObjectURL(blob);
};

document.getElementById("voiceMmBtn").onclick = async () => {
    const text = document.getElementById("mmOutput").textContent;

    const res = await fetch(backendURL + "/voice-mm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
    });

    const blob = await res.blob();
    document.getElementById("mmVoiceDownload").href = URL.createObjectURL(blob);
};