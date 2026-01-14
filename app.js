const backendURL = "https://video-ai-backend-ft6x.onrender.com";

document.getElementById("generateBtn").onclick = async () => {
    const file = document.getElementById("videoInput").files[0];
    if (!file) return alert("Please upload a video first!");

    const form = new FormData();
    form.append("video", file);

    const res = await fetch(backendURL + "/generate-script", {
        method: "POST",
        body: form
    });

    const data = await res.json();
    console.log(data);

    document.getElementById("engOutput").textContent = data.english || "No English script.";
    document.getElementById("mmOutput").textContent = data.myanmar || "No Myanmar script.";
};


document.getElementById("voiceEngBtn").onclick = async () => {
    const text = document.getElementById("engOutput").textContent;
    if (!text) return alert("Please generate the English script first!");

    const res = await fetch(backendURL + "/voice-en", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
    });

    const blob = await res.blob();
    document.getElementById("engVoiceDownload").href = URL.createObjectURL(blob);
    document.getElementById("engVoiceDownload").download = "english_voice.wav";
};


document.getElementById("voiceMmBtn").onclick = async () => {
    const text = document.getElementById("mmOutput").textContent;
    if (!text) return alert("Please generate the Myanmar script first!");

    const res = await fetch(backendURL + "/voice-mm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
    });

    const blob = await res.blob();
    document.getElementById("mmVoiceDownload").href = URL.createObjectURL(blob);
    document.getElementById("mmVoiceDownload").download = "myanmar_voice.wav";
};