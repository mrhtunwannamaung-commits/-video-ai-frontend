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

    const res = await fetch(backendURL + "/voice-en", {
        method: "POST"
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const a = document.getElementById("engVoiceDownload");
    a.href = url;
    a.download = "english_voice.wav";
    a.textContent = "Download English Voice";
};

document.getElementById("voiceMmBtn").onclick = async () => {

    const res = await fetch(backendURL + "/voice-mm", {
        method: "POST"
    });

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);

    const a = document.getElementById("mmVoiceDownload");
    a.href = url;
    a.download = "myanmar_voice.wav";
    a.textContent = "Download Burmese Voice";
};