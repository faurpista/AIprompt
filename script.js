document.addEventListener('contextmenu', e => {
    if (!['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
        e.preventDefault();
    }
});

const isImageModel = (model) => model === 'pollinations-image' || model.includes('flux');
const isAudioModel = (model) => model === 'pollinations-audio' || model.includes('audio') || model.includes('music') || model.includes('ace');
const isVideoModel = (model) => 
    model === 'pollinations-video' || 
    model.toLowerCase().includes('video') || 
    model.toLowerCase().includes('t2v') || 
    model.toLowerCase().includes('wan');

// 🌐 Automatikus fordítás Angolra (ha a kiválasztott nyelv nem angol)
async function translateToEnglishIfNeeded(text, sourceLang) {
    if (sourceLang === 'en' || !text.trim()) {
        return text;
    }

    try {
        const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|en`;
        const response = await fetch(apiUrl);
        if (!response.ok) return text;

        const data = await response.json();
        
        if (data && data.responseData && data.responseData.translatedText) {
            const translated = data.responseData.translatedText.trim();
            console.log(`🌐 Fordítás (${sourceLang} -> en): "${text}" ➔ "${translated}"`);
            return translated;
        }
    } catch (error) {
        console.warn("Fordítási hiba, az eredeti promptot használjuk:", error);
    }

    return text;
}

let currentLang = 'hu';

// MODAL/README KEZELŐ
const readmeModal = document.getElementById('readmeModal');
const openReadmeBtn = document.getElementById('openReadmeBtn');
const closeReadmeBtn = document.getElementById('closeReadmeBtn');
const readmeContent = document.getElementById('readmeContent');

openReadmeBtn.addEventListener('click', async () => {
    readmeModal.style.display = 'flex';
    const readmeFileName = currentLang === 'hu' ? './README.md' : `./README_${currentLang}.md`;
    
    try {
        let res = await fetch(readmeFileName);
        if (!res.ok && currentLang !== 'hu') {
            res = await fetch('./README.md');
        }
        if (res.ok) {
            const text = await res.text();
            readmeContent.innerHTML = marked.parse(text);
        } else {
            readmeContent.innerHTML = `<p class="text-red-500 font-bold">README file not found.</p>`;
        }
    } catch (e) {
        readmeContent.innerHTML = `<p class="text-red-500 font-bold">Error loading README: ${e.message}</p>`;
    }
});

closeReadmeBtn.addEventListener('click', () => {
    readmeModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === readmeModal) {
        readmeModal.style.display = 'none';
    }
});

// CSÚSZKA DOKUMENTUM-ESEMÉNY
const paramSlider = document.getElementById('paramSlider');
const paramValueDisplay = document.getElementById('paramValueDisplay');
paramSlider.addEventListener('input', (e) => {
    paramValueDisplay.innerText = e.target.value;
});

/**
 * Biztonságos szöveg- és HTML-beállító segédfüggvény.
 */
function setTxt(id, htmlContent) {
    const el = document.getElementById(id);
    if (el) {
        el.innerHTML = htmlContent;
    }
}

// NYELVVÁLTÁS & MODEL-VÁLTÁS UI
function updateUIForSelectedModel() {
    const t = translations[currentLang] || translations.hu;
    
    // Fejléc és statikus szövegek frissítése
    document.getElementById('mainTitle').innerText = t.mainTitle;
    document.getElementById('mainSubtitle').innerText = t.mainSubtitle;
    document.getElementById('readmeBtnText').innerText = t.readmeBtnText;
    document.getElementById('readmeModalTitle').innerText = t.readmeModalTitle;
    document.getElementById('donateBtn').innerText = t.donateBtn;
    document.getElementById('modelLabel').innerText = t.modelLabel;
    document.getElementById('promptBoxTitle').innerText = t.promptBoxTitle;

    document.getElementById('optGroupText').label = t.optGroupText;
    document.getElementById('optGroupImage').label = t.optGroupImage;
    document.getElementById('optGroupAudio').label = t.optGroupAudio;

    document.getElementById('evalTitle').innerText = t.secEvaluationTitle;
    document.getElementById('feedbackTitle').innerText = t.secEvaluationDesc;
    document.getElementById('aiRespTitle').innerText = t.secAiResponseTitle;

    // Szöveges értékelő statikus elemek
    document.getElementById('lblRole').innerText = t.lblRole;
    document.getElementById('lblContext').innerText = t.lblContext;
    document.getElementById('lblTask').innerText = t.lblTask;
    document.getElementById('lblConstraints').innerText = t.lblConstraints;

    document.getElementById('ratingLabel').innerText = t.ratingWaitTitle;
    document.getElementById('ratingDesc').innerText = t.ratingWaitDesc;
    document.getElementById('feedbackText').innerText = t.feedbackDefault;
    document.getElementById('aiResponse').innerText = t.aiResponseDefault;

    // GYIK szekció fordítások frissítése
    setTxt('faqTitle', t.faqTitle);
    setTxt('faqSubtitle', t.faqSubtitle);
    setTxt('faq1Q', t.faq1Q);
    setTxt('faq1A', t.faq1A);
    setTxt('faq2Q', t.faq2Q);
    setTxt('faq2A', t.faq2A);
    setTxt('faq3Q', t.faq3Q);
    setTxt('faq3A', t.faq3A);
    setTxt('faq4Q', t.faq4Q);
    setTxt('faq4A', t.faq4A);
    setTxt('faq5Q', t.faq5Q);
    setTxt('faq5A', t.faq5A);
    setTxt('faq6Q', t.faq6Q);
    setTxt('faq6A', t.faq6A);
    setTxt('faq7Q', t.faq7Q);
    setTxt('faq7A', t.faq7A);    
    
    // 🎧 Audió gombok és szövegek
    setTxt('submitBtnAudio', t.submitBtnAudio);
    setTxt('audioPlaceholder', t.audioPlaceholder);
    setTxt('generatingAudio', t.generatingAudio);
    setTxt('downloadAudioBtn', t.downloadAudioBtn);
    setTxt('playAudioBtn', t.playAudioBtn);
    setTxt('pauseAudioBtn', t.pauseAudioBtn);
    setTxt('stopAudioBtn', t.stopAudioBtn);
    setTxt('listenAudioBtn', t.listenAudioBtn);

    // ⚙️ Címkék és beállítások
    setTxt('voiceSelectLabel', t.voiceSelectLabel);
    setTxt('audioModelSelect', t.audioModelSelect);
    setTxt('audioSpeedLabel', t.audioSpeedLabel);
    setTxt('audioPitchLabel', t.audioPitchLabel);

    // 💡 Értesítések és hibaüzenetek
    setTxt('audioNotice', t.audioNotice);
    setTxt('msgAudioFallbackNotice', t.msgAudioFallbackNotice);
    setTxt('errAudioPrompt', t.errAudioPrompt);
    setTxt('errAudioApiKey', t.errAudioApiKey);
    setTxt('errAudioFailed', t.errAudioFailed);
    setTxt('errAudioTimeout', t.errAudioTimeout);

    // 🎵 Dalszöveg modul elemeinek frissítése
    setTxt('submitBtnLyrics', t.submitBtnLyrics);
    setTxt('lyricsPlaceholder', t.lyricsPlaceholder);
    setTxt('generatingLyrics', t.generatingLyrics);
    setTxt('downloadLyricsBtn', t.downloadLyricsBtn);
    setTxt('lyricsGenreLabel', t.lyricsGenreLabel);
    setTxt('lyricsMoodLabel', t.lyricsMoodLabel);
    setTxt('lyricsStructureLabel', t.lyricsStructureLabel);
    setTxt('lyricsNotice', t.lyricsNotice);
    setTxt('errLyricsPrompt', t.errLyricsPrompt);

    // 🎤 Ace Dalszöveg elemek frissítése
    setTxt('lyricsLabel', t.lyricsLabel);
    setTxt('genLyricsBtn', t.genLyricsBtn);

    // Textarea placeholder beállítása
    const lyricsInput = document.getElementById('lyricsInput');
    if (lyricsInput) {
        lyricsInput.placeholder = t.lyricsPlaceholder;
    }
    
    // Kép és Zene panel szövegek
    document.getElementById('generatedImgTitle').innerText = t.generatedImgTitle;
    document.getElementById('downloadBtnText').innerText = t.downloadImgBtnText;
    
    const imgPlaceholder = document.getElementById('imagePlaceholderText');
    if (imgPlaceholder) imgPlaceholder.innerText = t.imagePlaceholderText;

    document.getElementById('audioTitle').innerText = t.audioTitle;
    const audioPlaceholder = document.getElementById('audioPlaceholderText');
    if (audioPlaceholder) audioPlaceholder.innerText = t.audioPlaceholderText;

    const selectedModel = document.getElementById("modelSelect").value;
    const apiKeyContainer = document.getElementById('apiKeyContainer');
    const apiKeyLabel = document.getElementById('apiKeyLabel');
    const submitBtn = document.getElementById('submitBtn');
    const apiNoteText = document.getElementById('apiNoteText');
    const promptTipText = document.getElementById('promptTipText');
    const promptInput = document.getElementById('userPrompt');

    const textSection = document.getElementById('textEvalSection');
    const imageSection = document.getElementById('imageEvalSection');
    const audioSection = document.getElementById('audioEvalSection');
    const aiResponseContainer = document.getElementById('aiResponseContainer');
    const videoSection = document.getElementById('videoEvalSection');

    // Csúszka elemei
    const modelParamContainer = document.getElementById('modelParamContainer');
    const paramLabel = document.getElementById('paramLabel');
    const paramDescription = document.getElementById('paramDescription');

    if (isAudioModel(selectedModel)) {
        textSection.classList.add('hidden');
        aiResponseContainer.classList.add('hidden');
        imageSection.classList.add('hidden');
        audioSection.classList.remove('hidden');
        videoSection.classList.add('hidden');

        const aceLyricsContainer = document.getElementById('aceLyricsContainer');
        if (aceLyricsContainer) {
            const isAce = selectedModel.toLowerCase().includes('step');
            aceLyricsContainer.classList.toggle('hidden', !isAce);
        }

        modelParamContainer.classList.remove('hidden');
        paramLabel.innerText = t.paramAudioTitle;
        paramDescription.innerText = t.paramAudioDesc;
        paramSlider.min = "2";
        paramSlider.max = "20";
        paramSlider.step = "0.5";
        if (parseFloat(paramSlider.value) < 2 || parseFloat(paramSlider.value) > 20) {
            paramSlider.value = "10";
        }
        paramValueDisplay.innerText = paramSlider.value;

        if (selectedModel.includes('pollinations')) {
            apiKeyContainer.style.display = 'none';
            apiNoteText.innerText = t.apiNoteFree;
        } else {
            apiKeyContainer.style.display = 'block';
            apiKeyLabel.innerText = t.apiKeyHfLabel;
            apiNoteText.innerText = t.apiNoteHf;
        }

        submitBtn.innerText = t.submitBtnAudio;
        promptTipText.innerText = t.promptBoxTipAudio;
        promptInput.placeholder = t.promptPlaceholderAudio;

    } else if (isImageModel(selectedModel)) {
        textSection.classList.add('hidden');
        aiResponseContainer.classList.add('hidden');
        audioSection.classList.add('hidden');
        imageSection.classList.remove('hidden');
        videoSection.classList.add('hidden');

        modelParamContainer.classList.remove('hidden');
        paramLabel.innerText = t.paramImageTitle;
        paramDescription.innerText = t.paramImageDesc;
        paramSlider.min = "1";
        paramSlider.max = "15";
        paramSlider.step = "0.5";
        if (parseFloat(paramSlider.value) < 1 || parseFloat(paramSlider.value) > 15) {
            paramSlider.value = "7.5";
        }
        paramValueDisplay.innerText = paramSlider.value;

        if (selectedModel.includes('huggingface')) {
            apiKeyContainer.style.display = 'block'; 
            apiKeyLabel.innerText = t.apiKeyHfLabel;
            apiNoteText.innerText = t.apiNoteHf;
        } else {
            apiKeyContainer.style.display = 'none';
            apiNoteText.innerText = t.apiNoteFree;
        }

        submitBtn.innerText = t.submitBtnImg;
        promptTipText.innerText = t.promptBoxTipImg;
        promptInput.placeholder = t.promptPlaceholderImg;

    } else if (isVideoModel(selectedModel)) {
        textSection.classList.add('hidden');
        aiResponseContainer.classList.add('hidden');
        audioSection.classList.add('hidden');
        imageSection.classList.add('hidden');
        videoSection.classList.remove('hidden');

        modelParamContainer.classList.remove('hidden');
        paramLabel.innerText = t.paramVideoTitle;
        paramDescription.innerText = t.paramVideoDesc;
        paramSlider.min = "2";
        paramSlider.max = "10";
        paramSlider.step = "1";
        if (parseFloat(paramSlider.value) < 2 || parseFloat(paramSlider.value) > 10) {
            paramSlider.value = "5";
        }
        paramValueDisplay.innerText = paramSlider.value;

        if (selectedModel.includes('Wan') || selectedModel.includes('huggingface')) {
            apiKeyContainer.style.display = 'block'; 
            apiKeyLabel.innerText = t.apiKeyHfLabel;
            apiNoteText.innerText = t.apiNoteHf;
        } else {
            apiKeyContainer.style.display = 'none';
            apiNoteText.innerText = t.apiNoteFree;
        }

        submitBtn.innerText = t.submitBtnVid;
        promptTipText.innerText = t.promptBoxTipVid;
        promptInput.placeholder = t.promptPlaceholderVid;

    } else {
        textSection.classList.remove('hidden');
        aiResponseContainer.classList.remove('hidden');
        imageSection.classList.add('hidden');
        audioSection.classList.add('hidden');
        videoSection.classList.add('hidden');

        modelParamContainer.classList.remove('hidden');
        paramLabel.innerText = t.paramTextTitle;
        paramDescription.innerText = t.paramTextDesc;
        paramSlider.min = "0.0";
        paramSlider.max = "1.0";
        paramSlider.step = "0.05";
        if (parseFloat(paramSlider.value) > 1.0) {
            paramSlider.value = "0.3";
        }
        paramValueDisplay.innerText = paramSlider.value;

        if (selectedModel === 'pollinations-text') {
            apiKeyContainer.style.display = 'none';
            apiNoteText.innerText = t.apiNoteFree;
        } else {
            apiKeyContainer.style.display = 'block';
            apiKeyLabel.innerText = t.apiKeyLabel;
            apiNoteText.innerText = t.apiNote;
        }

        submitBtn.innerText = t.submitBtn;
        promptTipText.innerText = t.promptBoxTip;
        promptInput.placeholder = t.promptPlaceholder;
    }
}

document.getElementById('modelSelect').addEventListener('change', updateUIForSelectedModel);
document.getElementById('langSelect').addEventListener('change', (e) => {
    currentLang = e.target.value;
    updateUIForSelectedModel();
});

// FŐ GOMB KEZELŐ
window.handleExecution = async function() {
    const selectedModel = document.getElementById("modelSelect").value;
   
    if (isAudioModel(selectedModel)) {
        await generateAudioModel();
        return;
    }
    if (isImageModel(selectedModel)) {
        await generateImageModel();
        return;
    } 
    if (isVideoModel(selectedModel)) {
        await generateVideoModel();
        return;
    }

    await analyzeTextPrompt(selectedModel);
};

async function generateLyrics() {
    const promptInput = document.getElementById("userPrompt") || document.querySelector("textarea[name='prompt']") || document.querySelector("input[type='text']");
    const lyricsInput = document.getElementById("lyricsInput");
    const genLyricsBtn = document.getElementById("genLyricsBtn");

    const rawText = promptInput ? promptInput.value : "";
    const englishPrompt = await translateToEnglishIfNeeded(rawText, currentLang);
    const apiKeyInput = document.getElementById("apiKey") || document.getElementById("hfToken");

    const musicPrompt = englishPrompt ? englishPrompt.trim() : "";
    const hfToken = apiKeyInput ? apiKeyInput.value.trim() : "";

    if (!musicPrompt) {
        alert("Kérlek, először írj be egy zenei promptot/stílust a zene mezőbe!");
        return;
    }

    if (!hfToken) {
        alert("Hugging Face API token szükséges a dalszöveg generálásához is!");
        return;
    }

    const originalBtnText = genLyricsBtn.innerHTML;
    genLyricsBtn.disabled = true;
    genLyricsBtn.classList.add("opacity-50", "cursor-not-allowed");
    genLyricsBtn.innerHTML = `⏳ Dalszöveg írása (Hugging Face)...`;

    try {
        const systemPrompt = `Write creative, catchy song lyrics matching this musical style/theme: "${musicPrompt}". 
Structure it strictly with tags like [Verse 1], [Chorus], [Verse 2], [Chorus], [Outro]. 
Keep it concise and perfect for AI audio synthesis.`;

        const response = await fetch("https://musicgen-proxy.onrender.com/api/generate-text", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                prompt: systemPrompt,
                hfToken: hfToken
            })
        });

        if (!response.ok) {
            let errorMessage = `Szerver hiba: ${response.status}`;
            try {
                const errData = await response.json();
                if (errData.error) errorMessage = errData.error;
            } catch (e) {}
            throw new Error(errorMessage);
        }

        const data = await response.json();

        if (data.result) {
            lyricsInput.value = data.result.trim();
        } else {
            throw new Error("Nem érkezett válasz a szöveggenerátortól.");
        }

    } catch (err) {
        console.error("Dalszöveg generálási hiba:", err);
        alert("Hiba történt a dalszöveg generálásakor: " + err.message);
    } finally {
        genLyricsBtn.disabled = false;
        genLyricsBtn.classList.remove("opacity-50", "cursor-not-allowed");
        genLyricsBtn.innerHTML = originalBtnText;
    }
}

// 🎵 ZENEGENERÁLÁS
async function generateAudioModel() {
    const lang = (typeof currentLang !== 'undefined') ? currentLang : 'hu';
    const transObj = (typeof translations !== 'undefined') ? translations : null;
    const t = (transObj && transObj[lang]) ? transObj[lang] : translations.hu;

    const userPromptInput = document.getElementById('userPrompt');
    const userPrompt = userPromptInput ? userPromptInput.value.trim() : '';
    const selectedModel = document.getElementById("modelSelect") ? document.getElementById("modelSelect").value : 'pollinations-audio';
    const apiKeyInput = document.getElementById('apiKey');

    const submitBtn = document.getElementById('submitBtn');
    const audioPlaceholder = document.getElementById('audioPlaceholder');
    const audioContainer = document.getElementById('audioContainer');
    const audioElement = document.getElementById('generatedAudio');
    const downloadBtn = document.getElementById('downloadAudioBtn');
    const paramSlider = document.getElementById('paramSlider');

    if (!userPrompt) { alert(t.errPrompt); return; }

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = t.generatingAudioBtn;
    }
    if (audioPlaceholder) {
        audioPlaceholder.innerHTML = `<span class="animate-pulse text-purple-400 font-bold">🎶 ${t.generatingAudioBtn}</span>`;
        audioPlaceholder.classList.remove('hidden');
    }
    if (audioContainer) audioContainer.classList.add('hidden');
    if (downloadBtn) downloadBtn.classList.add('hidden');

    try {
        let audioUrl = "";
        const englishPrompt = await translateToEnglishIfNeeded(userPrompt, currentLang);
        const audioDuration = parseFloat(paramSlider?.value) || 10;
        const lyricsText = typeof lyricsInput !== 'undefined' && lyricsInput ? lyricsInput.value.trim() : "";

        if (selectedModel.includes('huggingface') || selectedModel.includes('musicgen') || selectedModel.includes('ace')) {
            const hfToken = apiKeyInput ? apiKeyInput.value.trim() : "";

            if (!hfToken) {
                alert(t.errApiKey || "HuggingFace API token szükséges!");
                if (submitBtn) { 
                    submitBtn.disabled = false; 
                    submitBtn.innerText = t.submitBtnAudio; 
                }
                return;
            }

            if (audioPlaceholder) {
                audioPlaceholder.innerHTML = `<span class="animate-pulse text-purple-400 font-bold">🎶 Zene generálása a szerveren (ACE-Step)...</span>`;
            }
           // 1. 90 másodperces időtúllépési keret beállítása
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 90000);

            let response = await fetch("https://musicgen-proxy.onrender.com/api/generate-free-audio", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt: englishPrompt,
                    hfToken: hfToken,
                    duration: audioDuration || 7,
                    lyrics: lyricsText || ""
                }),
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            if (response.status === 429) {
                console.warn("⚠️ ZeroGPU keret kimerült! Váltás a MusicGen modellre...");
                if (audioPlaceholder) {
                    audioPlaceholder.textContent = "⚠️ ZeroGPU keret kimerült! Váltás MusicGen modellre...";
                }

           // 90 másodperces időkeret beállítása
           const controller = new AbortController();
           const timeoutId = setTimeout(() => controller.abort(), 90000);

           try {
               response = await fetch("/api/generate-audio", { // vagy a saját backend elérési utad
                   method: "POST",
                   headers: { "Content-Type": "application/json" },
                   body: JSON.stringify({
                        prompt: englishPrompt,
                        hfToken: hfToken,
                        duration: audioDuration || 10 // Kliens által kiválasztott időtartam
                   }),
                   signal: controller.signal
              });
            } finally {
                 clearTimeout(timeoutId); // Megállítás, ha időben megérkezett a válasz
            }
            }

            if (!response.ok) {
                let errorMessage = `Szerver hiba: ${response.status}`;
                try {
                    const errData = await response.json();
                    if (errData.error) {
                        errorMessage = errData.error;
                    }
                } catch (e) {}
                throw new Error(errorMessage);
            }

            const audioBlob = await response.blob();
            audioUrl = URL.createObjectURL(audioBlob);
        } else {
            /*
const response = await fetch('https://a-backend-url-ed.onrender.com/api/generate-pollinations-audio', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: 'Hello, ez egy teszt hang.' })
});
const audioBlob = await response.blob();
const audioUrl = URL.createObjectURL(audioBlob);
const audio = new Audio(audioUrl);
audio.play();
    */        
            const response = await fetch("https://text.pollinations.ai/v1/chat/completions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "openai-audio",
                    modalities: ["text", "audio"],
                    audio: { voice: "alloy", format: "mp3" },
                    messages: [{ role: "user", content: englishPrompt }]
                })
            });
/*
        const response = await fetch("https://musicgen-proxy.onrender.com/api/generate-pollinations-audio", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "openai-audio",
                    modalities: ["text", "audio"],
                    audio: { voice: "alloy", format: "mp3" },
                    messages: [{ role: "user", content: englishPrompt }]
                })
            });    
            */
            if (!response.ok) {
                throw new Error(`Pollinations hiba: ${response.status}`);
            }

            const data = await response.json();
            const audioBase64 = data.choices?.[0]?.message?.audio?.data;

            if (!audioBase64) {
                throw new Error("A Pollinations nem küldött audio adatot.");
            }

            audioUrl = `data:audio/mp3;base64,${audioBase64}`;
        }

        if (audioElement) {
            audioElement.src = audioUrl;

            audioElement.oncanplaythrough = () => {
                if (audioPlaceholder) audioPlaceholder.classList.add('hidden');
                if (audioContainer) audioContainer.classList.remove('hidden');

                if (downloadBtn) {
                    downloadBtn.href = audioUrl;
                    downloadBtn.target = "_blank";
                    downloadBtn.download = t.audioFileName || "generated-audio.wav";
                    downloadBtn.classList.remove('hidden');
                }

                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerText = t.submitBtnAudio;
                }

                audioElement.play().catch(() => {});
            };

            audioElement.onerror = () => {
                const errorMsg = t.evalErrorDesc || "Error loading audio.";
                if (audioPlaceholder) {
                    audioPlaceholder.innerHTML = `<span class="text-red-400 font-bold">${t.errPrefix}${errorMsg}</span>`;
                    audioPlaceholder.classList.remove('hidden');
                }
                if (audioContainer) audioContainer.classList.add('hidden');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerText = t.submitBtnAudio;
                }
            };
        }

    } catch (error) {
        console.error("Audio Generation Error:", error);
        if (audioPlaceholder) {
            audioPlaceholder.innerHTML = `<span class="text-red-400 font-bold">${t.errPrefix}${error.message}</span>`;
            audioPlaceholder.classList.remove('hidden');
        }
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = t.submitBtnAudio;
        }
    }
}

// 🎨 KÉPGENERÁLÁS
async function generateImageModel() {
    const t = translations[currentLang] || translations.hu;
    const userPrompt = document.getElementById('userPrompt').value.trim();
    const submitBtn = document.getElementById('submitBtn');
    const imgElem = document.getElementById('generatedImage');
    const placeholder = document.getElementById('imagePlaceholder');
    const downloadBtn = document.getElementById('downloadImgBtn');
    const modelSelect = document.getElementById('modelSelect');
    const apiKeyInput = document.getElementById('apiKey');
    const paramSlider = document.getElementById('paramSlider');

    if (!userPrompt) { alert(t.errPrompt); return; }

    submitBtn.disabled = true;
    submitBtn.innerText = t.generatingBtn;
    placeholder.innerHTML = `<span class="animate-pulse text-xl">🎨 ${t.generatingBtn}</span>`;
    placeholder.classList.remove('hidden');
    imgElem.classList.add('hidden');
    downloadBtn.classList.add('hidden');

    const englishPrompt = await translateToEnglishIfNeeded(userPrompt, currentLang);

    try {
        let finalImageUrl = "";
        const currentModel = modelSelect ? modelSelect.value : "";
        const guidanceScale = parseFloat(paramSlider.value) || 7.5;

        if (currentModel.includes('huggingface')) {
            const hfToken = apiKeyInput ? apiKeyInput.value.trim() : "";

            if (!hfToken) {
                alert(t.errApiKey);
                submitBtn.disabled = false;
                submitBtn.innerText = t.submitBtnImg;
                return;
            }

            const response = await fetch("https://router.huggingface.co/fal-ai/fal-ai/flux/schnell", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${hfToken}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    prompt: englishPrompt,
                    image_size: "square_hd",
                    guidance_scale: guidanceScale
                })
            });

            if (response.status === 401 || response.status === 403) {
                throw new Error(t.errApiKey);
            }

            const result = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(result.error?.message || result.detail || `Hugging Face API error: ${response.status}`);
            }

            if (result.images && result.images[0] && result.images[0].url) {
                finalImageUrl = result.images[0].url;
            } else {
                throw new Error(t.evalErrorDesc);
            }
        } else {
            const encodedPrompt = encodeURIComponent(englishPrompt);
            const seed = Math.floor(Math.random() * 1000000);
            finalImageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&nologo=true&seed=${seed}`;
        }

        imgElem.src = finalImageUrl;
        imgElem.alt = `AI generált kép: ${userPrompt}`;

        imgElem.onload = () => {
            placeholder.classList.add('hidden');
            imgElem.classList.remove('hidden');

            downloadBtn.href = finalImageUrl;
            downloadBtn.download = `generated-image-${Date.now()}.jpg`;
            downloadBtn.classList.remove('hidden');
            submitBtn.disabled = false;
            submitBtn.innerText = t.submitBtnImg;
        };

        imgElem.onerror = () => {
            throw new Error(t.evalErrorDesc);
        };

    } catch (error) {
        console.error("Képgenerálási hiba:", error);
        alert(error.message || t.evalErrorDesc);
        
        placeholder.classList.remove('hidden');
        imgElem.classList.add('hidden');
        downloadBtn.classList.add('hidden');
        submitBtn.disabled = false;
        submitBtn.innerText = t.submitBtnImg;
    }
}

// 🔄 Újrapróbálós Pollinations Videó/Animáció Lekérő
async function fetchPollinationsVideoWithRetry(promptText, maxRetries = 3, delayMs = 2000) {
    const encodedPrompt = encodeURIComponent(promptText);
    let lastImageBlobUrl = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            const randomSeed = Math.floor(Math.random() * 1000000);
            const videoUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?model=turbo&animate=true&seed=${randomSeed}&nologo=true`;

            const response = await fetch(videoUrl, { credentials: 'omit' });
            if (!response.ok) throw new Error(`HTTP hiba: ${response.status}`);

            const blob = await response.blob();

            if (blob.type.includes('video') || blob.type.includes('gif')) {
                return {
                    url: URL.createObjectURL(blob),
                    isVideo: true,
                    mimeType: blob.type
                };
            }

            if (blob.type.includes('image')) {
                if (lastImageBlobUrl) URL.revokeObjectURL(lastImageBlobUrl);
                lastImageBlobUrl = URL.createObjectURL(blob);
            }

            console.warn(`Próbálkozás (${attempt}/${maxRetries}): A szerver képet adott videó helyett, újrapróbáljuk...`);

        } catch (err) {
            console.warn(`Próbálkozás (${attempt}/${maxRetries}) hiba:`, err.message);
        }

        if (attempt < maxRetries) {
            await new Promise(resolve => setTimeout(resolve, delayMs));
        }
    }

    if (lastImageBlobUrl) {
        return {
            url: lastImageBlobUrl,
            isVideo: false,
            mimeType: 'image/jpeg'
        };
    }

    throw new Error("A videószerver jelenleg nem érhető el. Próbáld újra később!");
}

async function generateVideoModel() {
    const t = translations[currentLang] || translations.hu;
    const videoEvalSection = document.getElementById('videoEvalSection');
    const videoElem = document.getElementById('generatedVideo');
    const placeholder = document.getElementById('videoPlaceholder');
    const downloadBtn = document.getElementById('downloadVidBtn');
    const downloadBtnText = document.getElementById('downloadVidBtnText');
    const apiKeyInput = document.getElementById('apiKey');
    const userPromptInput = document.getElementById('userPrompt');
    const submitBtn = document.getElementById('submitVidBtn') || document.getElementById('submitBtn');
    const modelSelect = document.getElementById('modelSelect');
    const fallbackImg = document.getElementById('generatedVideoFallbackImg');
    const noticeElem = document.getElementById('videoNotice');

    const promptText = userPromptInput ? userPromptInput.value.trim() : '';
    const apiKey = apiKeyInput ? apiKeyInput.value.trim() : '';
    const selectedModel = modelSelect ? modelSelect.value : 'pollinations-video';

    if (!promptText) {
        alert(t.promptRequiredError || "Kérlek adj meg egy leírást!");
        return;
    }

    const englishPrompt = await translateToEnglishIfNeeded(promptText, currentLang);

    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerText = t.generatingText || "Generálás...";
    }
    if (videoEvalSection) videoEvalSection.classList.remove('hidden');

    placeholder.classList.remove('hidden');
    videoElem.classList.add('hidden');
    downloadBtn.classList.add('hidden');

    try {
        let finalVideoUrl = "";

        if (selectedModel === 'pollinations-video') {
            if (placeholder) placeholder.classList.remove('hidden');
            if (videoElem) { 
                videoElem.classList.add('hidden'); 
                videoElem.pause(); 
                videoElem.src = ''; 
            }
            if (fallbackImg) { 
                fallbackImg.classList.add('hidden'); 
                fallbackImg.src = ''; 
            }
            if (noticeElem) { 
                noticeElem.classList.add('hidden'); 
                noticeElem.innerText = ''; 
            }
            if (downloadBtn) downloadBtn.classList.add('hidden');

            try {
                const result = await fetchPollinationsVideoWithRetry(englishPrompt, 3, 2000);

                if (placeholder) {
                    placeholder.classList.add('hidden');
                    placeholder.style.display = 'none';
                }

                if (result.isVideo) {
                    await new Promise((resolve, reject) => {
                        videoElem.onloadeddata = () => resolve();
                        videoElem.onerror = () => reject(new Error(t.errVideoFormat || "A videó nem lejátszható."));
                        videoElem.src = result.url;
                    });

                    videoElem.classList.remove('hidden');

                    downloadBtn.href = result.url;
                    downloadBtn.download = `generated-video-${Date.now()}.mp4`;
                    if (downloadBtnText) downloadBtnText.innerText = t.downloadVidBtnText || "Videó Letöltése";
                    downloadBtn.classList.remove('hidden');

                } else {
                    if (noticeElem) {
                        noticeElem.innerText = `⚠️ ${t.msgVideoFallbackNotice || 'A videószerverek leterheltsége miatt videó helyett az előnézeti képet jelenítettük meg.'}`;
                        noticeElem.classList.remove('hidden');
                    }

                    if (fallbackImg) {
                        fallbackImg.src = result.url;
                        fallbackImg.classList.remove('hidden');
                        fallbackImg.style.display = 'block';
                    }

                    downloadBtn.href = result.url;
                    downloadBtn.download = `generated-preview-${Date.now()}.jpg`;
                    if (downloadBtnText) downloadBtnText.innerText = t.downloadImgBtnText || "Kép Letöltése";
                    downloadBtn.classList.remove('hidden');
                }

            } catch (error) {
                console.error("Generálási hiba:", error);
                alert(error.message || t.evalErrorDesc || "Hiba történt a generálás során.");
                if (placeholder) placeholder.classList.remove('hidden');
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerText = t.submitBtnVid || "🎬 Videó Generálása";
                }
            }
        } else {
            if (!apiKey) {
                throw new Error(t.apiKeyRequiredError || "A kiválasztott modellhez Hugging Face API kulcs szükséges!");
            }

            const response = await fetch(`https://api-inference.huggingface.co/models/${selectedModel}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ inputs: englishPrompt }),
            });

            if (response.status === 503) {
                const errorData = await response.json().catch(() => ({}));
                const waitTime = Math.ceil(errorData.estimated_time || 30);
                throw new Error(`A modell épp alvó állapotban van. Várj kb. ${waitTime} másodpercet, majd próbáld újra!`);
            }

            if (!response.ok) {
                const errorText = await response.text().catch(() => "");
                throw new Error(`HF API Hiba (${response.status}): ${errorText || 'A HF nem tudta feldolgozni a videót (CORS vagy időtúllépés).'}`);
            }

            const videoBlob = await response.blob();
            if (!videoBlob.type.includes('video')) {
                throw new Error("A Hugging Face válasza nem érvényes videó fájl.");
            }
            finalVideoUrl = URL.createObjectURL(videoBlob);
        }

        await new Promise((resolve, reject) => {
            videoElem.onloadeddata = () => resolve();
            videoElem.onerror = () => reject(new Error(t.evalErrorDesc || "A videó formátuma érvénytelen vagy nem tölthető be."));
            videoElem.src = finalVideoUrl;
        });

        placeholder.classList.add('hidden');
        videoElem.classList.remove('hidden');

        downloadBtn.href = finalVideoUrl;
        downloadBtn.download = `generated-video-${Date.now()}.mp4`;
        downloadBtn.classList.remove('hidden');

    } catch (error) {
        console.error("Videógenerálási hiba:", error);
        alert(error.message || t.evalErrorDesc || "Hiba történt a videó generálása során.");
        
        placeholder.classList.remove('hidden');
        videoElem.classList.add('hidden');
        downloadBtn.classList.add('hidden');
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = t.submitBtnVid || "🎬 Videó Generálása";
        }
    }
}

// 📝 SZÖVEG ELEMZÉS
async function analyzeTextPrompt(selectedModel) {
    const t = translations[currentLang] || translations.hu;
    const apiKey = document.getElementById('apiKey').value.trim();
    const userPrompt = document.getElementById('userPrompt').value.trim();
    const submitBtn = document.getElementById('submitBtn');
    const paramSlider = document.getElementById('paramSlider');
    
    const scoreText = document.getElementById('scoreText');
    const ratingLabel = document.getElementById('ratingLabel');
    const ratingDesc = document.getElementById('ratingDesc');
    const feedbackText = document.getElementById('feedbackText');
    const aiResponse = document.getElementById('aiResponse');

    if (!userPrompt) { alert(t.errPrompt); return; }
    if (selectedModel !== 'pollinations-text' && !apiKey) {
        alert(t.errApiKey);
        return;
    }

    const temperatureVal = parseFloat(paramSlider.value) || 0.3;

    submitBtn.disabled = true;
    submitBtn.innerText = t.evaluating;
    ratingLabel.innerText = t.evaluatingLabel;
    ratingDesc.innerText = t.evaluatingDesc;
    feedbackText.innerText = t.evaluating;
    aiResponse.innerText = t.evaluatingWait;

    const langNames = { hu: "Hungarian", en: "English", de: "German", fr: "French", pl: "Polish" };
    const targetLangName = langNames[currentLang] || "Hungarian";

    const systemInstruction = `
You are a prompt engineering expert evaluator. Analyze the user's prompt based on 4 criteria (0-100% score for each):
1. Role
2. Context
3. Task
4. Constraints

CRITICAL: You MUST reply strictly with a valid JSON object. No extra markdown, no commentary outside JSON.
Required JSON Structure:
{
  "role": 80,
  "context": 60,
  "task": 90,
  "constraints": 40,
  "overall": 68,
  "rating": "Short rating title",
  "feedback": "Detailed advice on how to improve the prompt",
  "ai_response": "Sample ideal AI response executing the user's prompt"
}

IMPORTANT LANGUAGE RULE: All output values ("rating", "feedback", "ai_response") MUST BE WRITTEN IN THE FOLLOWING LANGUAGE: ${targetLangName}.
`;

    try {
        let responseText = "";
        if (selectedModel === 'pollinations-text') {
            const fullPrompt = `${systemInstruction}\nÉrtékelendő prompt:\n"${userPrompt}"`;

            const response = await fetch("https://musicgen-proxy.onrender.com/api/generate-text", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt: fullPrompt,
                    temperature: temperatureVal
                })
            });

            if (!response.ok) {
                throw new Error(`Render hiba: ${response.status}`);
            }

            const data = await response.json();
            responseText = data.result;

        } else if (
            selectedModel.includes('llama') || 
            selectedModel.includes('deepseek') || 
            selectedModel.includes('mixtral') || 
            selectedModel.includes('gpt-oss') || 
            selectedModel.includes('qwen')
        ) {
            const enforcedSystemInstruction = systemInstruction.includes("JSON") 
                ? systemInstruction 
                : `${systemInstruction}\n\nIMPORTANT: Return ONLY a valid JSON object. No markdown, no commentary.`;

            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    model: selectedModel,
                    messages: [
                        { role: "system", content: enforcedSystemInstruction },
                        { role: "user", content: `Prompt to evaluate: "${userPrompt}"` }
                    ],
                    temperature: temperatureVal,
                    response_format: { type: "json_object" }
                })
            });

            if (response.status === 401) {
                throw new Error(t.errGroqKey);
            }

            if (!response.ok) {
                const errData = await response.json().catch(() => null);
                throw new Error(errData?.error?.message || `Groq API Error: ${response.status}`);
            }

            const data = await response.json();
            let rawContent = data.choices[0].message.content;

            rawContent = rawContent.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/, '').trim();
            responseText = rawContent;

        } else if (selectedModel.includes('gemini')) {
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${selectedModel}:generateContent?key=${apiKey}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: `${systemInstruction}\n\nUser prompt: "${userPrompt}"` }]
                    }],
                    generationConfig: { 
                        responseMimeType: "application/json",
                        temperature: temperatureVal
                    }
                })
            });

            if (response.status === 400 || response.status === 403) {
                throw new Error(t.errGeminiKey);
            }

            if (!response.ok) {
                throw new Error(`Gemini API Error: ${response.status}`);
            }

            const data = await response.json();
            responseText = data.candidates[0].content.parts[0].text;
        }

        let cleanText = responseText.trim();

        if (cleanText.includes('</think>')) {
            cleanText = cleanText.split('</think>').pop().trim();
        }

        if (cleanText.includes('```')) {
            cleanText = cleanText.replace(/```json/gi, '').replace(/```/g, '').trim();
        }

        const firstBracket = cleanText.indexOf('{');
        const lastBracket = cleanText.lastIndexOf('}');

        if (firstBracket !== -1 && lastBracket !== -1) {
            cleanText = cleanText.substring(firstBracket, lastBracket + 1);
        }

        const evalData = JSON.parse(cleanText);

        document.getElementById('p-role').innerText = `${evalData.role}%`;
        document.getElementById('b-role').style.width = `${evalData.role}%`;

        document.getElementById('p-context').innerText = `${evalData.context}%`;
        document.getElementById('b-context').style.width = `${evalData.context}%`;

        document.getElementById('p-task').innerText = `${evalData.task}%`;
        document.getElementById('b-task').style.width = `${evalData.task}%`;

        document.getElementById('p-constraints').innerText = `${evalData.constraints}%`;
        document.getElementById('b-constraints').style.width = `${evalData.constraints}%`;

        scoreText.innerText = `${evalData.overall}%`;
        ratingLabel.innerText = evalData.rating || "OK";
        ratingDesc.innerText = "";
        feedbackText.innerText = evalData.feedback || "";
        aiResponse.innerText = evalData.ai_response || "";

    } catch (error) {
        console.error("Text Eval Error:", error);
        
        let errMsg = error.message;
        if (error.name === 'TypeError' || errMsg.includes('Failed to fetch')) {
            errMsg = t.errNetworkText;
        }

        ratingLabel.innerText = t.evalErrorTitle;
        ratingDesc.innerText = t.evalErrorDesc;
        feedbackText.innerText = errMsg;
        aiResponse.innerText = "-";
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = t.submitBtn;
    }
}

// Kezdő nézet inicializálása
updateUIForSelectedModel();
