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
    // Ha a felhasználó nyelve már amúgy is angol ('en'), nem fordítunk
    if (sourceLang === 'en' || !text.trim()) {
        return text;
    }

    try {
        // Ingyenes MyMemory Translation API hívás
        const apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|en`;
        
        const response = await fetch(apiUrl);
        if (!response.ok) return text; // Ha a fordító szerver nem válaszol, marad az eredeti

        const data = await response.json();
        
        if (data && data.responseData && data.responseData.translatedText) {
            const translated = data.responseData.translatedText.trim();
            console.log(`🌐 Fordítás (${sourceLang} -> en): "${text}" ➔ "${translated}"`);
            return translated;
        }
    } catch (error) {
        console.warn("Fordítási hiba, az eredeti promptot használjuk:", error);
    }

    // Ha bármi hiba történne, biztonsági tartalékként az eredeti szöveggel megyünk tovább
    return text;
}

    // MULTI-LANGUAGE TRANSLATIONS
    const translations = {
        hu: {
            mainTitle: "AI Prompt Értékelő és Optimalizáló",
            mainSubtitle: "Prompt Mérnök Képző | Tanuld meg a tökéletes prompt felépítését és teszteld a szöveges, kép vagy zene modelleket!",            readmeBtnText: "Segítség / API Kulcsok",
            readmeModalTitle: "Útmutató & API Beállítások",
            donateBtn: "Támogasd a projektet",
            apiKeyLabel: "API Kulcs:",
            apiKeyHfLabel: "Hugging Face API Kulcs:",
            modelLabel: "Válassz modellt:",
            optGroupText: "📝 Szöveges Modellek (API Kulcs kell)",
            optGroupImage: "🎨 Képgeneráló Modell (Ingyenes)",
            optGroupAudio: "🎵 Zenei Modell (Ingyenes)",
            apiNote: "A kulcsod közvetlenül az API-hoz beszél, nem mentődik el.",
            apiNoteFree: "Ehhez a modellhez NEM szükséges API kulcs! Ingyenesen működik.",
            apiNoteHf: "A modell futtatásához ingyenes Hugging Face API kulcs szükséges (hf_...).",
            promptBoxTitle: "Írd ide a promptodat",
            promptBoxTip: "Tipp: Tartalmazzon Szerepkört (Role), Kontextust (Context), Feladatot (Task) és Korlátozásokat (Constraints).",
            promptBoxTipImg: "Tipp képgeneráláshoz: Írj részletes angol leírást!",
            promptBoxTipAudio: "Tipp zene generáláshoz: Írj zenei stílust angolul (pl.: heavy metal guitar beat)!",
            promptPlaceholder: "Pl.: Úgy viselkedj, mint egy tapasztalt marketinges...",
            promptPlaceholderImg: "Pl.: A futuristic cybernetic owl perched on a neon branch...",
            promptPlaceholderAudio: "Pl.: Heavy metal rock music with electric guitar solo...",
            submitBtn: "Tesztelés és Értékelés",
            submitBtnImg: "🎨 Kép Generálása",
            submitBtnAudio: "🎵 Zene Generálása",
            errPrompt: "Kérlek, írj be egy promptot!",
            errApiKey: "A szöveges modellek használatához kérlek adj meg egy API kulcsot!",
            generatingAudioBtn: "🎵 Zene komponálása...",
            generatingBtn: "🎨 Kép generálása...",
            errPrefix: "⚠️ Hiba történt: ",
            audioTitle: "🎵 Generált Zene (Pollinations Audio)",
            audioPlaceholderText: "Írj le egy zenei stílust angolul (pl. heavy metal, synthwave, acoustic guitar), majd kattints a generálásra!",
            downloadAudioBtnText: "Zene Letöltése (.mp3)",
            downloadImgBtnText: "Kép Letöltése",
            audioFileName: "generalt-zene.mp3",
            evaluating: "⏳ Elemzés folyamatban...",
            evaluatingLabel: "Elemzés...",
            evaluatingDesc: "Az AI éppen értékeli a promptot...",
            evaluatingWait: "Generálás...",
            evalErrorTitle: "⚠️ Hiba történt",
            evalErrorDesc: "A kiértékelés megszakadt.",
            errGroqKey: "Érvénytelen Groq API kulcs (401 Unauthorized)! Ellenőrizd a beillesztést.",
            errGeminiKey: "Érvénytelen Google Gemini API kulcs!",
            errNetworkText: "Hálózati/CORS hiba! Győződj meg róla, hogy helyes API kulcsot adtál meg.",
            secEvaluationTitle: "AI KIÉRTÉKELÉS",
            secEvaluationDesc: "Javaslat a javításra:",
            secAiResponseTitle: "HOGYAN VÁLASZOLNA AZ AI?",
            generatedImgTitle: "Generált Kép",
            imagePlaceholderText: "Írj egy leírást angolul a jobb eredményért, majd kattints a generálás gombra!",
            lblRole: "Szerepkör (Role)",
            lblContext: "Kontextus (Context)",
            lblTask: "Feladat (Task)",
            lblConstraints: "Korlátozások (Constraints)",
            ratingWaitTitle: "Várakozás a promptra...",
            ratingWaitDesc: "Kattints a gombra az elemzéshez.",
            feedbackDefault: "Itt fog megjelenni az AI részletes tanácsa...",
            aiResponseDefault: "A promptodra adott tényleges AI válasz itt fog megjelenni...",
            paramTextTitle: "Kreativitás (Temperature):",
            paramTextDesc: "Alacsony érték (0.1 - 0.3): Megfontolt, kiszámítható és tényalapú válaszok. Magas érték (0.7 - 1.0): Kreatív, változatos, szokatlanabb megoldások.",
            paramImageTitle: "Prompt Követés (Guidance Scale / CFG):",
            paramImageDesc: "Alacsony érték: Nagyobb művészi szabadság az AI-nak. Magas érték: Szigorúan a leírt prompthoz való ragaszkodás.",
            faqTitle: "Gyakran Ismételt Kérdések (GYIK)",
faqSubtitle: "Minden, amit az AI prompt értékelésről, a prompt engineeringről és a modellek használatáról tudni érdemes.",
faq1Q: "Mi az az AI Prompt Értékelő és hogyan működik?",
faq1A: "Az AI Prompt Értékelő egy ingyenes online eszköz, amely a Prompt Engineering legjobb gyakorlatai alapján elemzi a szöveges utasításaidat. A kód 4 fő szempontot vizsgál: Szerepkör, Kontextus, Feladat és Korlátozások.",
faq2Q: "Kötelező API kulcsot megadni az eszköz használatához?",
faq2A: "Nem feltétlenül! Az alkalmazás tartalmaz teljesen ingyenes, API kulcs nélkül is működő modelleket (pl. Pollinations AI). A saját kulcsod csak a saját fiókod kvótáját használja.",
faq3Q: "Biztonságban vannak a megadott API kulcsaim?",
faq3A: "Igen, teljes mértékben. Az alkalmazás nem tárolja el a kulcsaidat; azok közvetlenül a böngészödből kommunikálnak a szolgáltatóval HTTPS-en keresztül.",
faq4Q: "Mit jelent a Temperature és a Guidance Scale?",
faq4A: "A Temperature a szöveges válaszok kreativitását és kiszámíthatóságát szabályozza, míg a Guidance Scale a képgenerálásnál határozza meg, hogy a modell mennyire kövesse a promptot.",
faq5Q: "Milyen AI modelleket tesztelhetek az oldalon?",
faq5A: "Tesztelhetsz szöveges modelleket (GPT, Llama, Gemini, DeepSeek), képgenerálókat (Flux), valamint zene- és hanggenerálókat is.",
paramVideoTitle: "Videó hossza (másodperc)",
    paramVideoDesc: "Állítsd be a generálandó videó időtartamát.",
    submitBtnVid: "🎬 Videó Generálása",
    promptBoxTipVid: "💡 Tipp: A jó videó prompt tartalmazza a témát, a mozgást és a kameramozgást (pl. 'drone shot, slow motion').",
    promptPlaceholderVid: "Írd le a videót angolul (pl. 'A futuristic car driving through a rainy cyber city at night, 4k')...",
    errVideoFallback: "A szerver jelenleg túlterhelt, és videó helyett csak képet adott vissza. Próbáld újra 1-2 perc múlva!",
errVideoFormat: "A kapott fájl formátuma nem lejátszható videó.",
errVideoTimeout: "A videó generálása időtúllépés miatt megszakadt.",
msgVideoFallbackNotice: "A videószerverek jelenleg túlterheltek. Videó helyett a generált előnézeti képet jelenítettük meg!",
// 🎧 AUDIÓ MODUL FORDÍTÁSOK (translations.hu)
submitBtnAudio: "Hang generálása",
audioPlaceholder: "A generált hangfelvétel itt fog megjelenni...",
generatingAudio: "Hang generálása folyamatban...",
downloadAudioBtn: "Hangfájl letöltése",
playAudioBtn: "Lejátszás",
pauseAudioBtn: "Szünet",
stopAudioBtn: "Leállítás",
listenAudioBtn: "Meghallgatás",
paramAudioTitle: "Zene hossza (másodperc)",
paramAudioDesc: "Állítsd be a generálandó zene időtartamát.",
            

// Beállítások & Címkék
voiceSelectLabel: "Hang / Narátor kiválasztása",
audioModelSelect: "Audió modell",
audioSpeedLabel: "Beszédsebesség",
audioPitchLabel: "Hangmagasság",

// Értesítések & Figyelmeztetések
audioNotice: "💡 Tipp: A természetesebb beszédhangért használj pontos írásjeleket!",
msgAudioFallbackNotice: "Az audió szerver jelenleg leterhelt, próbáld újra pár perc múlva.",

// Hibaüzenetek
errAudioPrompt: "Kérlek, adj meg szöveget a hang generálásához!",
errAudioApiKey: "A kiválasztott audió modellhez API kulcs megadása szükséges!",
errAudioFailed: "A hang generálása nem sikerült.",
errAudioTimeout: "Időtúllépés történt a hang generálása közben.",
// 🎵 DALSZÖVEG MODUL FORDÍTÁSOK

// 🇭🇺 MAGYAR (translations.hu)
submitBtnLyrics: "Dalszöveg generálása",
lyricsPlaceholder: "A generált dalszöveg itt fog megjelenni...",
generatingLyrics: "Dalszöveg írása folyamatban...",
downloadLyricsBtn: "Dalszöveg letöltése",
lyricsGenreLabel: "Zenei műfaj",
lyricsMoodLabel: "Hangulat",
lyricsStructureLabel: "Szerkezet (Verse, Chorus, Outro)",
lyricsNotice: "💡 Tipp: Add meg a témát, az előadó stílusát és a kívánt műfajt!",
errLyricsPrompt: "Kérlek, adj meg egy témát vagy leírást a dalszöveghez!",
// 🇭🇺 MAGYAR (translations.hu)
lyricsLabel: "🎤 Dalszöveg (ACE-Step-hez):",
genLyricsBtn: "✨ Dalszöveg generálása",
lyricsPlaceholder: "[Verse]\nAz csendes éjszakában, a fénylő ég alatt...\n\n[Chorus]\nÉgnek az elektromos szívek..."
            
            
        

        },
        en: {
            mainTitle: "AI Prompt Evaluator & Optimizer",
            mainSubtitle: "Prompt Engineer Academy | Learn how to build perfect prompts and test text, image, or music models!",
                readmeBtnText: "Help / API Keys",
            readmeModalTitle: "Guide & API Settings",
            donateBtn: "Support the project",
            apiKeyLabel: "API Key:",
            apiKeyHfLabel: "Hugging Face API Key:",
            modelLabel: "Select Model:",
            optGroupText: "📝 Text Models (API Key required)",
            optGroupImage: "🎨 Image Generation Model (Free)",
            optGroupAudio: "🎵 Music Model (Free)",
            apiNote: "Your key is sent directly to the API and not stored.",
            apiNoteFree: "NO API key needed! Completely Free.",
            apiNoteHf: "A free Hugging Face API key is required (hf_...).",
            promptBoxTitle: "Write your prompt here",
            promptBoxTip: "Tip: Include Role, Context, Task, and Constraints.",
            promptBoxTipImg: "Tip for images: Write a detailed description in English!",
            promptBoxTipAudio: "Tip for music: Describe the genre/instruments in English!",
            promptPlaceholder: "E.g.: Act as an experienced marketer...",
            promptPlaceholderImg: "E.g.: A futuristic cybernetic owl perched on a neon branch...",
            promptPlaceholderAudio: "E.g.: Heavy metal rock music with electric guitar solo...",
            submitBtn: "Test and Evaluate",
            submitBtnImg: "🎨 Generate Image",
            submitBtnAudio: "🎵 Generate Music",
            errPrompt: "Please enter a prompt!",
            errApiKey: "Please provide an API key for text models!",
            generatingAudioBtn: "🎵 Generating Music...",
            generatingBtn: "🎨 Generating Image...",
            errPrefix: "⚠️ Error occurred: ",
            audioTitle: "🎵 Generated Music (Pollinations Audio)",
            audioPlaceholderText: "Describe a music style in English, then click generate!",
            downloadAudioBtnText: "Download Music (.mp3)",
            downloadImgBtnText: "Download Image",
            audioFileName: "ai-generated-music.mp3",
            evaluating: "⏳ Analyzing prompt...",
            evaluatingLabel: "Analyzing...",
            evaluatingDesc: "AI is currently evaluating your prompt...",
            evaluatingWait: "Generating...",
            evalErrorTitle: "⚠️ Error occurred",
            evalErrorDesc: "Evaluation interrupted.",
            errGroqKey: "Invalid Groq API Key!",
            errGeminiKey: "Invalid Google Gemini API Key!",
            errNetworkText: "Network error!",
            secEvaluationTitle: "AI EVALUATION",
            secEvaluationDesc: "Suggestions for improvement:",
            secAiResponseTitle: "HOW WOULD THE AI RESPOND?",
            generatedImgTitle: "Generated Image",
            imagePlaceholderText: "Write a description in English for better results, then click generate!",
            lblRole: "Role",
            lblContext: "Context",
            lblTask: "Task",
            lblConstraints: "Constraints",
            ratingWaitTitle: "Waiting for prompt...",
            ratingWaitDesc: "Click the button to analyze.",
            feedbackDefault: "Detailed AI advice will appear here...",
            aiResponseDefault: "The actual AI response to your prompt will appear here...",
            paramTextTitle: "Creativity (Temperature):",
            paramTextDesc: "Low (0.1 - 0.3): Precise, deterministic answers. High (0.7 - 1.0): Creative and diverse responses.",
            paramImageTitle: "Prompt Adherence (Guidance Scale / CFG):",
            paramImageDesc: "Low: More artistic freedom for AI. High: Strict adherence to your written prompt.",
            faqTitle: "Frequently Asked Questions (FAQ)",
faqSubtitle: "Everything you need to know about AI prompt evaluation, prompt engineering, and using the models.",
faq1Q: "What is the AI Prompt Evaluator and how does it work?",
faq1A: "The AI Prompt Evaluator is a free online tool that analyzes your text prompts based on Prompt Engineering best practices. It checks 4 main criteria: Role, Context, Task, and Constraints.",
faq2Q: "Is it mandatory to provide an API key to use the tool?",
faq2A: "Not necessarily! The app includes completely free models that work without an API key (e.g., Pollinations AI). Your own key only uses your personal account quota.",
faq3Q: "Are my API keys safe?",
faq3A: "Yes, completely. The application does not store your keys; they communicate directly from your browser to the provider via HTTPS.",
faq4Q: "What do Temperature and Guidance Scale mean?",
faq4A: "Temperature controls the creativity and predictability of text responses, while Guidance Scale determines how strictly image models follow the prompt.",
faq5Q: "What AI models can I test on the site?",
faq5A: "You can test text models (GPT, Llama, Gemini, DeepSeek), image generators (Flux), and music/audio generators.",
paramVideoTitle: "Video Duration (seconds)",
paramVideoDesc: "Set the duration for the video to be generated.",
submitBtnVid: "🎬 Generate Video",
promptBoxTipVid: "💡 Tip: A good video prompt includes the subject, motion, and camera movement (e.g., 'drone shot, slow motion').",
promptPlaceholderVid: "Describe the video in English (e.g., 'A futuristic car driving through a rainy cyber city at night, 4k')...",
errVideoFallback: "The server is currently overloaded and returned an image instead of a video. Please try again in 1-2 minutes!",
errVideoFormat: "The received file is not a playable video format.",
errVideoTimeout: "Video generation timed out.",
msgVideoFallbackNotice: "Video servers are currently overloaded. Generated preview image displayed instead!",
// 🎧 AUDIO MODULE TRANSLATIONS (translations.en)
submitBtnAudio: "Generate Audio",
audioPlaceholder: "Generated audio will appear here...",
generatingAudio: "Generating audio...",
downloadAudioBtn: "Download Audio",
playAudioBtn: "Play",
pauseAudioBtn: "Pause",
stopAudioBtn: "Stop",
listenAudioBtn: "Listen",
paramAudioTitle: "Music length (seconds)",
paramAudioDesc: "Set the duration of the music to be generated.",
            

// Settings & Labels
voiceSelectLabel: "Select Voice / Narrator",
audioModelSelect: "Audio Model",
audioSpeedLabel: "Speech Speed",
audioPitchLabel: "Voice Pitch",

// Notices & Tips
audioNotice: "💡 Tip: Use proper punctuation for more natural-sounding speech!",
msgAudioFallbackNotice: "The audio server is currently busy, please try again in a few minutes.",

// Error messages
errAudioPrompt: "Please enter text for audio generation!",
errAudioApiKey: "API key is required for the selected audio model!",
errAudioFailed: "Failed to generate audio.",
errAudioTimeout: "Audio generation timed out.",
// 🇬🇧 ENGLISH (translations.en)
submitBtnLyrics: "Generate Lyrics",
lyricsPlaceholder: "Generated lyrics will appear here...",
generatingLyrics: "Writing lyrics...",
downloadLyricsBtn: "Download Lyrics",
lyricsGenreLabel: "Music Genre",
lyricsMoodLabel: "Mood",
lyricsStructureLabel: "Structure (Verse, Chorus, Outro)",
lyricsNotice: "💡 Tip: Specify the topic, artist style, and desired genre!",
errLyricsPrompt: "Please enter a topic or description for the lyrics!",
// 🇬🇧 ENGLISH (translations.en)
lyricsLabel: "🎤 Lyrics (for ACE-Step):",
genLyricsBtn: "✨ Generate Lyrics",
lyricsPlaceholder: "[Verse]\nIn the silent night, under glowing skies...\n\n[Chorus]\nElectric hearts burning bright..."
            
        
            

        },
        de: {
            mainTitle: "KI-Prompt-Bewertung & Optimierer",
            mainSubtitle: "Prompt Engineer Akademie | Lerne die perfekten Prompts zu erstellen und teste Text-, Bild- oder Musik-Modelle!",
                 readmeBtnText: "Hilfe / API-Schlüssel",
            readmeModalTitle: "Anleitung & API-Einstellungen",
            donateBtn: "Projekt unterstützen",
            apiKeyLabel: "API-Schlüssel:",
            apiKeyHfLabel: "Hugging Face API-Schlüssel:",
            modelLabel: "Modell auswählen:",
            optGroupText: "📝 Textmodelle (API-Schlüssel erforderlich)",
            optGroupImage: "🎨 Bildgenerierungsmodell (Kostenlos)",
            optGroupAudio: "🎵 Musikmodell (Kostenlos)",
            apiNote: "Ihr Schlüssel wird direkt an die API gesendet.",
            apiNoteFree: "KEIN API-Schlüssel erforderlich!",
            apiNoteHf: "Ein kostenloser Hugging Face API-Schlüssel ist erforderlich.",
            promptBoxTitle: "Geben Sie Ihren Prompt ein",
            promptBoxTip: "Tipp: Enthält Rolle, Kontext, Aufgabe und Einschränkungen.",
            promptBoxTipImg: "Tipp für Bilder: Detaillierte Beschreibung auf Englisch!",
            promptBoxTipAudio: "Tipp für Musik: Genre auf Englisch beschreiben!",
            promptPlaceholder: "z.B.: Agieren Sie als erfahrener Marketer...",
            promptPlaceholderImg: "z.B.: Cybernetic owl perched on a neon branch...",
            promptPlaceholderAudio: "z.B.: Heavy metal rock music...",
            submitBtn: "Testen und Bewerten",
            submitBtnImg: "🎨 Bild Generieren",
            submitBtnAudio: "🎵 Musik Generieren",
            errPrompt: "Bitte geben Sie einen Prompt ein!",
            errApiKey: "Bitte geben Sie einen API-Schlüssel ein!",
            generatingAudioBtn: "🎵 Musik wird komponiert...",
            generatingBtn: "🎨 Bild wird generiert...",
            errPrefix: "⚠️ Fehler aufgetreten: ",
            audioTitle: "🎵 Generierte Musik",
            audioPlaceholderText: "Beschreiben Sie einen Musikstil auf Englisch...",
            downloadAudioBtnText: "Musik Herunterladen (.mp3)",
            downloadImgBtnText: "Bild Herunterladen",
            audioFileName: "ki-generierte-musik.mp3",
            evaluating: "⏳ Analyse läuft...",
            evaluatingLabel: "Analyse...",
            evaluatingDesc: "KI bewertet Ihren Prompt...",
            evaluatingWait: "Generierung...",
            evalErrorTitle: "⚠️ Fehler aufgetreten",
            evalErrorDesc: "Auswertung abgebrochen.",
            errGroqKey: "Ungültiger Groq API-Schlüssel!",
            errGeminiKey: "Ungültiger Gemini API-Schlüssel!",
            errNetworkText: "Netzwerkfehler!",
            secEvaluationTitle: "KI-BEWERTUNG",
            secEvaluationDesc: "Verbesserungsvorschläge:",
            secAiResponseTitle: "WIE WÜRDE DIE KI ANTWORTEN?",
            generatedImgTitle: "Generiertes Bild",
            imagePlaceholderText: "Schreiben Sie eine Beschreibung auf Englisch für bessere Ergebnisse!",
            lblRole: "Rolle",
            lblContext: "Kontext",
            lblTask: "Aufgabe",
            lblConstraints: "Einschränkungen",
            ratingWaitTitle: "Warten auf Prompt...",
            ratingWaitDesc: "Klicken Sie auf die Schaltfläche zur Analyse.",
            feedbackDefault: "Detaillierte KI-Ratschläge erscheinen hier...",
            aiResponseDefault: "Die tatsächliche KI-Antwort erscheint hier...",
            paramTextTitle: "Kreativität (Temperature):",
            paramTextDesc: "Niedrig (0.1 - 0.3): Präzise Antworten. Hoch (0.7 - 1.0): Kreative Ergebnisse.",
            paramImageTitle: "Prompt-Fokussierung (Guidance Scale):",
            paramImageDesc: "Niedrig: Mehr künstlerische Freiheit. Hoch: Strikte Einhaltung des Prompts.",
            
    // ... (a meglévő német fordítások alá vagy közé)
    faqTitle: "Häufig gestellte Fragen (FAQ)",
    faqSubtitle: "Alles, was Sie über AI-Prompt-Evaluierung, Prompt Engineering und die Nutzung der Modelle wissen müssen.",
    faq1Q: "Was ist der AI Prompt Evaluator und wie funktioniert er?",
    faq1A: "Der AI Prompt Evaluator ist ein kostenloses Online-Tool, das Ihre Text-Prompts basierend auf Best Practices des Prompt Engineering analysiert. Es prüft 4 Hauptkriterien: Rolle (Role), Kontext (Context), Aufgabe (Task) und Einschränkungen (Constraints).",
    faq2Q: "Ist es obligatorisch, einen API-Schlüssel anzugeben, um das Tool zu nutzen?",
    faq2A: "Nicht unbedingt! Die App enthält völlig kostenlose Modelle, die auch ohne API-Schlüssel funktionieren (z. B. Pollinations AI). Ihr eigener Schlüssel nutzt lediglich das Kontingent Ihres persönlichen Kontos.",
    faq3Q: "Sind meine API-Schlüssel sicher?",
    faq3A: "Ja, absolut. Die Anwendung speichert Ihre Schlüssel nicht; sie kommunizieren direkt von Ihrem Browser aus über HTTPS mit dem Anbieter.",
    faq4Q: "Was bedeuten Temperature und Guidance Scale?",
    faq4A: "Temperature steuert die Kreativität und Vorhersehbarkeit von Textantworten, während Guidance Scale bei der Bildgenerierung bestimmt, wie streng das Modell dem Prompt folgt.",
    faq5Q: "Welche KI-Modelle kann ich auf der Website testen?",
    faq5A: "Sie können Textmodelle (GPT, Llama, Gemini, DeepSeek), Bildgeneratoren (Flux) sowie Musik- und Audiogeneratoren testen.",
paramVideoTitle: "Videolänge (Sekunden)",
paramVideoDesc: "Stelle die Dauer des zu generierenden Videos ein.",
submitBtnVid: "🎬 Video generieren",
promptBoxTipVid: "💡 Tipp: Ein guter Video-Prompt enthält das Thema, die Bewegung und die Kamerabewegung (z. B. 'drone shot, slow motion').",
promptPlaceholderVid: "Beschreibe das Video auf Englisch (z. B. 'A futuristic car driving through a rainy cyber city at night, 4k')...",
errVideoFallback: "Der Server ist derzeit überlastet und hat statt eines Videos nur ein Bild zurückgegeben. Bitte versuche es in 1-2 Minuten erneut!",
errVideoFormat: "Das empfangene Dateiformat ist kein abspielbares Video.",
errVideoTimeout: "Die Videogenerierung hat das Zeitlimit überschritten.",
// 🎧 DEUTSCH (translations.de)
submitBtnAudio: "Audio generieren",
audioPlaceholder: "Das generierte Audio wird hier angezeigt...",
generatingAudio: "Audio wird generiert...",
downloadAudioBtn: "Audio herunterladen",
playAudioBtn: "Abspielen",
pauseAudioBtn: "Pause",
stopAudioBtn: "Stopp",
listenAudioBtn: "Anhören",
paramAudioTitle: "Musikdauer (Sekunden)",
paramAudioDesc: "Stelle die Dauer der zu generierenden Musik ein.",
            

// Einstellungen & Labels
voiceSelectLabel: "Stimme / Sprecher auswählen",
audioModelSelect: "Audio-Modell",
audioSpeedLabel: "Sprechgeschwindigkeit",
audioPitchLabel: "Tonhöhe",

// Hinweise & Tipps
audioNotice: "💡 Tipp: Verwenden Sie eine korrekte Interpunktion für eine natürlichere Sprache!",
msgAudioFallbackNotice: "Der Audioserver ist derzeit ausgelastet, bitte versuchen Sie es in wenigen Minuten erneut.",

// Fehlermeldungen
errAudioPrompt: "Bitte geben Sie Text für die Audiogenerierung ein!",
errAudioApiKey: "Für das ausgewählte Audio-Modell ist ein API-Schlüssel erforderlich!",
errAudioFailed: "Audiogenerierung fehlgeschlagen.",
errAudioTimeout: "Zeitüberschreitung bei der Audiogenerierung.",
// 🇩🇪 DEUTSCH (translations.de)
submitBtnLyrics: "Songtext generieren",
lyricsPlaceholder: "Der generierte Songtext wird hier angezeigt...",
generatingLyrics: "Songtext wird geschrieben...",
downloadLyricsBtn: "Songtext herunterladen",
lyricsGenreLabel: "Musikgenre",
lyricsMoodLabel: "Stimmung",
lyricsStructureLabel: "Struktur (Strophe, Refrain, Outro)",
lyricsNotice: "💡 Tipp: Geben Sie Thema, Künstlerstil und gewünschtes Genre an!",
errLyricsPrompt: "Bitte geben Sie ein Thema oder eine Beschreibung für den Songtext ein!",
// 🇩🇪 DEUTSCH (translations.de)
lyricsLabel: "🎤 Songtext (für ACE-Step):",
genLyricsBtn: "✨ Songtext generieren",
lyricsPlaceholder: "[Verse]\nIn der stillen Nacht, unter leuchtendem Himmel...\n\n[Chorus]\nElektrische Herzen brennen hell..."
            
            
            
        },
        fr: {
            mainTitle: "Évaluateur & Optimiseur de Prompt IA",
            mainSubtitle: "Académie de Prompt Engineering | Apprenez à concevoir des prompts parfaits et testez des modèles !",
                  readmeBtnText: "Aide / Clés API",
            readmeModalTitle: "Guide & Paramètres API",
            donateBtn: "Soutenir le projet",
            apiKeyLabel: "Clé API :",
            apiKeyHfLabel: "Clé API Hugging Face :",
            modelLabel: "Sélect. Modèle :",
            optGroupText: "📝 Modèles de texte (Clé API requise)",
            optGroupImage: "🎨 Modèle de génération d'images (Gratuit)",
            optGroupAudio: "🎵 Modèle musical (Gratuit)",
            apiNote: "Votre clé est envoyée directement à l'API.",
            apiNoteFree: "AUCUNE clé API requise !",
            apiNoteHf: "Une clé API Hugging Face requise.",
            promptBoxTitle: "Écrivez votre prompt ici",
            promptBoxTip: "Conseil : Incluez le Rôle, le Contexte, la Tâche et les Contraintes.",
            promptBoxTipImg: "Conseil pour les images : Description en anglais !",
            promptBoxTipAudio: "Conseil pour la musique : Décrivez le style en anglais !",
            promptPlaceholder: "Ex : Agissez en tant que marketeur...",
            promptPlaceholderImg: "Ex : Cybernetic owl perched on a neon branch...",
            promptPlaceholderAudio: "Ex : Heavy metal rock music...",
            submitBtn: "Tester et Évaluer",
            submitBtnImg: "🎨 Générer l'Image",
            submitBtnAudio: "🎵 Générer la Musique",
            errPrompt: "Veuillez entrer un prompt !",
            errApiKey: "Veuillez fournir une clé API !",
            generatingAudioBtn: "🎵 Composition...",
            generatingBtn: "🎨 Génération...",
            errPrefix: "⚠️ Erreur : ",
            audioTitle: "🎵 Musique Générée",
            audioPlaceholderText: "Décrivez un style musical en anglais...",
            downloadAudioBtnText: "Télécharger (.mp3)",
            downloadImgBtnText: "Télécharger l'image",
            audioFileName: "musique-generee.mp3",
            evaluating: "⏳ Analyse en cours...",
            evaluatingLabel: "Analyse...",
            evaluatingDesc: "L'IA évalue votre prompt...",
            evaluatingWait: "Génération...",
            evalErrorTitle: "⚠️ Erreur",
            evalErrorDesc: "Évaluation interrompue.",
            errGroqKey: "Clé Groq invalide !",
            errGeminiKey: "Clé Gemini invalide !",
            errNetworkText: "Erreur réseau !",
            secEvaluationTitle: "ÉVALUATION PAR L'IA",
            secEvaluationDesc: "Suggestions d'amélioration :",
            secAiResponseTitle: "COMMENT L'IA RÉPONDRAIT-ELLE ?",
            generatedImgTitle: "Image Générée",
            imagePlaceholderText: "Écrivez une description en anglais pour de meilleurs résultats !",
            lblRole: "Rôle",
            lblContext: "Contexte",
            lblTask: "Tâche",
            lblConstraints: "Contraintes",
            ratingWaitTitle: "En attente du prompt...",
            ratingWaitDesc: "Cliquez sur le bouton pour analyser.",
            feedbackDefault: "Les conseils détaillés de l'IA apparaîtront ici...",
            aiResponseDefault: "La réponse réelle de l'IA apparaîtra ici...",
            paramTextTitle: "Créativité (Température) :",
            paramTextDesc: "Faible (0.1 - 0.3) : Réponses factuelles. Élevée (0.7 - 1.0) : Réponses créatives.",
            paramImageTitle: "Respect du prompt (Guidance Scale) :",
            paramImageDesc: "Faible : Liberté artistique. Élevée : Respect strict du texte.",
            
    // ... (a meglévő francia fordítások alá vagy közé)
    faqTitle: "Foire Aux Questions (FAQ)",
    faqSubtitle: "Tout ce que vous devez savoir sur l'évaluation des prompts IA, le prompt engineering et l'utilisation des modèles.",
    faq1Q: "Qu'est-ce que l'Évaluateur de Prompts IA et comment ça fonctionne ?",
    faq1A: "L'Évaluateur de Prompts IA est un outil en ligne gratuit qui analyse vos instructions textuelles selon les meilleures pratiques du prompt engineering. Il vérifie 4 critères principaux : Rôle, Contexte, Tâche et Contraintes.",
    faq2Q: "Est-il obligatoire de fournir une clé API pour utiliser l'outil ?",
    faq2A: "Pas nécessairement ! L'application intègre des modèles entièrement gratuits qui fonctionnent sans clé API (ex. Pollinations AI). Votre propre clé utilise uniquement le quota de votre compte personnel.",
    faq3Q: "Mes clés API sont-elles en sécurité ?",
    faq3A: "Oui, tout à fait. L'application ne stocke pas vos clés ; elles communiquent directement depuis votre navigateur vers le fournisseur via HTTPS.",
    faq4Q: "Que signifient la Température et l'Échelle de Guidage (Guidance Scale) ?",
    faq4A: "La température contrôle la créativité et la prédictibilité des réponses textuelles, tandis que l'échelle de guidage détermine à quel point les modèles d'images suivent strictement le prompt.",
    faq5Q: "Quels modèles d'IA puis-je tester sur le site ?",
    faq5A: "Vous pouvez tester des modèles de texte (GPT, Llama, Gemini, DeepSeek), des générateurs d'images (Flux) ainsi que des générateurs de musique et d'audio.",
paramVideoTitle: "Durée de la vidéo (secondes)",
paramVideoDesc: "Définissez la durée de la vidéo à générer.",
submitBtnVid: "🎬 Générer la vidéo",
promptBoxTipVid: "💡 Conseil : Un bon prompt vidéo inclut le sujet, le mouvement et les mouvements de caméra (ex. 'drone shot, slow motion').",
promptPlaceholderVid: "Décrivez la vidéo en anglais (ex. 'A futuristic car driving through a rainy cyber city at night, 4k')...",
errVideoFallback: "Le serveur est actuellement surchargé et a renvoyé une image au lieu d'une vidéo. Veuillez réessayer dans 1 à 2 minutes !",
errVideoFormat: "Le fichier reçu n'est pas un format vidéo jouable.",
errVideoTimeout: "La génération de la vidéo a expiré.",
// 🎧 FRANÇAIS (translations.fr)
submitBtnAudio: "Générer l'audio",
audioPlaceholder: "L'audio généré apparaîtra ici...",
generatingAudio: "Génération de l'audio en cours...",
downloadAudioBtn: "Télécharger l'audio",
playAudioBtn: "Lecture",
pauseAudioBtn: "Pause",
stopAudioBtn: "Arrêter",
listenAudioBtn: "Écouter",
paramAudioTitle: "Durée de la musique (secondes)",
paramAudioDesc: "Définissez la durée de la musique à générer.",
            

// Paramètres & Étiquettes
voiceSelectLabel: "Sélectionner la voix / le narrateur",
audioModelSelect: "Modèle audio",
audioSpeedLabel: "Vitesse d'élocution",
audioPitchLabel: "Hauteur de la voix",

// Notifications & Conseils
audioNotice: "💡 Conseil : Utilisez une ponctuation correcte pour une diction plus naturelle !",
msgAudioFallbackNotice: "Le serveur audio est actuellement surchargé, veuillez réessayer dans quelques minutes.",

// Messages d'erreur
errAudioPrompt: "Veuillez saisir du texte pour la génération audio !",
errAudioApiKey: "Une clé API est requise pour le modèle audio sélectionné !",
errAudioFailed: "Échec de la génération audio.",
errAudioTimeout: "Délai d'attente dépassé pour la génération audio.",
// 🇫🇷 FRANÇAIS (translations.fr)
submitBtnLyrics: "Générer les paroles",
lyricsPlaceholder: "Les paroles générées apparaîtront ici...",
generatingLyrics: "Écriture des paroles en cours...",
downloadLyricsBtn: "Télécharger les paroles",
lyricsGenreLabel: "Genre musical",
lyricsMoodLabel: "Ambiance",
lyricsStructureLabel: "Structure (Couplet, Refrain, Outro)",
lyricsNotice: "💡 Conseil : Précisez le sujet, le style de l'artiste et le genre souhaité !",
errLyricsPrompt: "Veuillez saisir un sujet ou une description pour les paroles !",
// 🇫🇷 FRANÇAIS (translations.fr)
lyricsLabel: "🎤 Paroles (pour ACE-Step):",
genLyricsBtn: "✨ Générer les paroles",
lyricsPlaceholder: "[Verse]\nDans la nuit silencieuse, sous les cieux lumineux...\n\n[Chorus]\nDes cœurs électriques brûlent..."
            
        
            
            
        },
        pl: {
            mainTitle: "Evaluator i Optymalizator Promptów AI",
            mainSubtitle: "Akademia Prompt Engineeringu | Twórz idealne prompty i testuj modele!",
                readmeBtnText: "Pomoc / Klucze API",
            readmeModalTitle: "Przewodnik i Ustawienia API",
            donateBtn: "Wesprzyj projekt",
            apiKeyLabel: "Klucz API:",
            apiKeyHfLabel: "Klucz API Hugging Face:",
            modelLabel: "Wybierz model:",
            optGroupText: "📝 Modele tekstowe (Wymagany klucz API)",
            optGroupImage: "🎨 Model generowania obrazów (Darmowy)",
            optGroupAudio: "🎵 Model muzyczny (Darmowy)",
            apiNote: "Twój klucz jest przesyłany do API.",
            apiNoteFree: "Brak konieczności podawania klucza API!",
            apiNoteHf: "Wymagany jest darmowy klucz HF.",
            promptBoxTitle: "Wpisz swój prompt tutaj",
            promptBoxTip: "Wskazówka: Uwzględnij Rolę, Kontekst, Zadanie i Ograniczenia.",
            promptBoxTipImg: "Wskazówka dla obrazów: Opis po angielsku!",
            promptBoxTipAudio: "Wskazówka dla muzyki: Opisz styl po angielsku!",
            promptPlaceholder: "Np.: Działaj jako marketer...",
            promptPlaceholderImg: "Np.: Cybernetic owl perched on a neon branch...",
            promptPlaceholderAudio: "Np.: Heavy metal rock music...",
            submitBtn: "Testuj i Oceń",
            submitBtnImg: "🎨 Generuj Obraz",
            submitBtnAudio: "🎵 Generuj Muzykę",
            errPrompt: "Proszę wpisać prompt!",
            errApiKey: "Proszę podać klucz API!",
            generatingAudioBtn: "🎵 Tworzenie muzyki...",
            generatingBtn: "🎨 Generowanie obrazu...",
            errPrefix: "⚠️ Błąd: ",
            audioTitle: "🎵 Wygenerowana Muzyka",
            audioPlaceholderText: "Opisz styl muzyczny po angielsku...",
            downloadAudioBtnText: "Pobierz muzykę (.mp3)",
            downloadImgBtnText: "Pobierz obraz",
            audioFileName: "wygenerowana-muzyka.mp3",
            evaluating: "⏳ Analizowanie...",
            evaluatingLabel: "Analizowanie...",
            evaluatingDesc: "AI ocenia Twój prompt...",
            evaluatingWait: "Generowanie...",
            evalErrorTitle: "⚠️ Błąd",
            evalErrorDesc: "Ocena przerwana.",
            errGroqKey: "Nieprawidłowy klucz Groq!",
            errGeminiKey: "Nieprawidłowy klucz Gemini!",
            errNetworkText: "Błąd sieci!",
            secEvaluationTitle: "OCENA AI",
            secEvaluationDesc: "Sugerowane poprawki:",
            secAiResponseTitle: "JAK ODPOWIEDZIAŁOBY AI?",
            generatedImgTitle: "Wygenerowany Obraz",
            imagePlaceholderText: "Wpisz opis po angielsku, aby uzyskać lepsze wyniki!",
            lblRole: "Rola",
            lblContext: "Kontekst",
            lblTask: "Zadanie",
            lblConstraints: "Ograniczenia",
            ratingWaitTitle: "Oczekiwanie na prompt...",
            ratingWaitDesc: "Kliknij przycisk, aby przeanalizować.",
            feedbackDefault: "Szczegółowe porady AI pojawią się tutaj...",
            aiResponseDefault: "Rzeczywistych odpowiedzi AI pojawią się tutaj...",
            paramTextTitle: "Kreatywność (Temperature):",
            paramTextDesc: "Niska (0.1 - 0.3): Precyzyjne odpowiedzi. Wysoka (0.7 - 1.0): Bardziej kreatywne wyniki.",
            paramImageTitle: "Zgodność z promptem (Guidance Scale):",
            paramImageDesc: "Niska: Większa swoboda artystyczna. Wysoka: Ścisłe trzymanie się promptu.",
            faqTitle: "Często Zadawane Pytania (FAQ)",
    faqSubtitle: "Wszystko, co musisz wiedzieć o ocenie promptów AI, inżynierii promptów (prompt engineering) i korzystaniu z modeli.",
    faq1Q: "Czym jest Ewaluator Promptów AI i jak działa?",
    faq1A: "Ewaluator Promptów AI to darmowe narzędzie online, które analizuje Twoje instrukcje tekstowe w oparciu o najlepsze praktyki inżynierii promptów. Sprawdza 4 główne kryteria: Rolę, Kontekst, Zadanie i Ograniczenia.",
    faq2Q: "Czy podanie klucza API jest obowiązkowe, aby korzystać z narzędzia?",
    faq2A: "Niekoniecznie! Aplikacja zawiera całkowicie darmowe modele, które działają bez klucza API (np. Pollinations AI). Twój własny klucz zużywa jedynie limit Twojego osobistego konta.",
    faq3Q: "Czy moje klucze API są bezpieczne?",
    faq3A: "Tak, w pełni. Aplikacja nie przechowuje Twoich kluczy; komunikują się one bezpośrednio z Twojej przeglądarki z dostawcą przez protokół HTTPS.",
    faq4Q: "Co oznacza Temperature (Temperatura) i Guidance Scale (Skala wskazówek)?",
    faq4A: "Temperatura kontroluje kreatywność i przewidywalność odpowiedzi tekstowych, podczas gdy skala wskazówek określa, jak ściśle model obrazu trzyma się promptu.",
    faq5Q: "Jakie modele AI mogę przetestować na stronie?",
    faq5A: "Możesz testować modele tekstowe (GPT, Llama, Gemini, DeepSeek), generatory obrazów (Flux) oraz generatory muzyki i dźwięku.",
 paramVideoTitle: "Długość wideo (sekundy)",
paramVideoDesc: "Ustaw czas trwania generowanego wideo.",
submitBtnVid: "🎬 Generuj wideo",
promptBoxTipVid: "💡 Wskazówka: Dobry prompt wideo zawiera temat, ruch oraz ruch kamery (np. 'drone shot, slow motion').",
promptPlaceholderVid: "Opisz wideo po angielsku (np. 'A futuristic car driving through a rainy cyber city at night, 4k')...",
errVideoFallback: "Serwer jest obecnie przeciążony i zwrócił obraz zamiast wideo. Spróbuj ponownie za 1-2 minuty!",
errVideoFormat: "Otrzymany plik nie jest odtwarzalnym formatem wideo.",
errVideoTimeout: "Przekroczono limit czasu generowania wideo.",
// 🎧 POLSKI (translations.pl)
submitBtnAudio: "Generuj dźwięk",
audioPlaceholder: "Wygenerowane nagranie pojawi się tutaj...",
generatingAudio: "Generowanie dźwięku...",
downloadAudioBtn: "Pobierz plik audio",
playAudioBtn: "Odtwórz",
pauseAudioBtn: "Pauza",
stopAudioBtn: "Zatrzymaj",
listenAudioBtn: "Posłuchaj",
paramAudioTitle: "Długość muzyki (sekundy)",
paramAudioDesc: "Ustaw czas trwania generowanej muzyki.",
            

// Ustawienia i Etykiety
voiceSelectLabel: "Wybierz głos / lektora",
audioModelSelect: "Model audio",
audioSpeedLabel: "Szybkość mowy",
audioPitchLabel: "Wysokość głosu",

// Powiadomienia i Wskazówki
audioNotice: "💡 Wskazówka: Używaj poprawnej interpunkcji, aby uzyskać bardziej naturalny głos!",
msgAudioFallbackNotice: "Serwer audio jest obecnie przeciążony, spróbuj ponownie za kilka minut.",

// Komunikaty o błędach
errAudioPrompt: "Wprowadź tekst do wygenerowania dźwięku!",
errAudioApiKey: "Wymagany jest klucz API dla wybranego modelu audio!",
errAudioFailed: "Nie udało się wygenerować dźwięku.",
errAudioTimeout: "Upłynął limit czasu generowania dźwięku.",
// 🇵🇱 POLSKI (translations.pl)
submitBtnLyrics: "Generuj tekst piosenki",
lyricsPlaceholder: "Wygenerowany tekst piosenki pojawi się tutaj...",
generatingLyrics: "Pisanie tekstu piosenki...",
downloadLyricsBtn: "Pobierz tekst piosenki",
lyricsGenreLabel: "Gatunek muzyczny",
lyricsMoodLabel: "Nastroj",
lyricsStructureLabel: "Struktura (Zwrotka, Refren, Outro)",
lyricsNotice: "💡 Wskazówka: Określ temat, styl wykonawcy i żądany gatunek!",
errLyricsPrompt: "Wprowadź temat lub opis tekstu piosenki!",
// 🇵🇱 POLSKI (translations.pl)
lyricsLabel: "🎤 Tekst piosenki (dla ACE-Step):",
genLyricsBtn: "✨ Generuj tekst piosenki",
lyricsPlaceholder: "[Verse]\nW cichą noc, pod świecącym niebem...\n\n[Chorus]\nElektryczne serca płoną..."            
           

        }
    };

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
 * Megakadályozza, hogy a hiányzó ID-k miatt összeomoljon a JavaScript.
 * 
 * @param {string} id - A HTML elem ID-ja
 * @param {string} htmlContent - A beállítandó szöveg vagy HTML tartalom
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
        //document.getElementById('audioPlaceholderText').innerText = t.audioPlaceholderText;
        const audioPlaceholder = document.getElementById('audioPlaceholderText');
        if (audioPlaceholder) audioPlaceholder.innerText = t.audioPlaceholderText;
      //  document.getElementById('downloadAudioBtnText').innerText = t.downloadAudioBtnText;

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
            // Képeknél megjelenítjük a csúszkát a CFG (Guidance) módosítására
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
    // Szekciók elrejtése / megjelenítése
    textSection.classList.add('hidden');
    aiResponseContainer.classList.add('hidden');
    audioSection.classList.add('hidden');
    imageSection.classList.add('hidden');
    videoSection.classList.remove('hidden');

    // Videóknál a paraméter csúszka beállítása (pl. Videó hossza / Keretszám / Lépésszám)
    modelParamContainer.classList.remove('hidden');
    paramLabel.innerText = t.paramVideoTitle;
    paramDescription.innerText = t.paramVideoDesc;
    paramSlider.min = "2";
    paramSlider.max = "10";
    paramSlider.step = "1";
    if (parseFloat(paramSlider.value) < 2 || parseFloat(paramSlider.value) > 10) {
        paramSlider.value = "5"; // Alapértelmezett 5 mp / paraméter
    }
    paramValueDisplay.innerText = paramSlider.value;

    // API Kulcs mező kezelése (HuggingFace vs Ingyenes modellek)
    if (selectedModel.includes('Wan') || selectedModel.includes('huggingface')) {
        apiKeyContainer.style.display = 'block'; 
        apiKeyLabel.innerText = t.apiKeyHfLabel;
        apiNoteText.innerText = t.apiNoteHf;
    } else {
        apiKeyContainer.style.display = 'none';
        apiNoteText.innerText = t.apiNoteFree;
    }

    // Gombok és feliratok frissítése
    submitBtn.innerText = t.submitBtnVid;
    promptTipText.innerText = t.promptBoxTipVid;
    promptInput.placeholder = t.promptPlaceholderVid;
} else {
            textSection.classList.remove('hidden');
            aiResponseContainer.classList.remove('hidden');
            imageSection.classList.add('hidden');
            audioSection.classList.add('hidden');
videoSection.classList.add('hidden');
            // Szöveges modelleknél megjelenítjük a Temperature csúszkát
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
    // Az API kulcs beviteli mező beazonosítása (módosítsd az ID-t, ha más a te kódban)
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

    // Gomb Töltési (Loading) állapota
    const originalBtnText = genLyricsBtn.innerHTML;
    genLyricsBtn.disabled = true;
    genLyricsBtn.classList.add("opacity-50", "cursor-not-allowed");
    genLyricsBtn.innerHTML = `⏳ Dalszöveg írása (Hugging Face)...`;

    try {
        const systemPrompt = `Write creative, catchy song lyrics matching this musical style/theme: "${musicPrompt}". 
Structure it strictly with tags like [Verse 1], [Chorus], [Verse 2], [Chorus], [Outro]. 
Keep it concise and perfect for AI audio synthesis.`;

        // Szerver hívás a Hugging Face-hez
        const response = await fetch("https://musicgen-proxy.onrender.com/api/generate-text", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                prompt: systemPrompt,
                hfToken: hfToken // 👈 Átadja a HF tokent!
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
// 🟢 1. AUTOMATIKUS FORDÍTÁS ANGOLRA A HÁTTÉRBEN
        // Ha a currentLang pl. 'hu', 'de', 'fr', 'pl', lefordítja angolra a generáláshoz
        const englishPrompt = await translateToEnglishIfNeeded(userPrompt, currentLang);
  // ⏱️ Zene hossza a csúszkáról (alapértelmezett 10 mp, ha nincs kitöltve)
    const audioDuration = parseFloat(paramSlider?.value) || 10;

    // 🎤 Dalszöveg kiolvasása (ha van ilyen input meződ az oldalon)
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
/*
    // A legutóbbi, működő végpont meghívása
    const response = await fetch("https://musicgen-proxy.onrender.com/api/generate-free-audio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            prompt: englishPrompt,
            hfToken: hfToken,
            duration: audioDuration, // 👈 Itt adjuk át a hosszt!
            lyrics: lyricsText    
        })
    });
    */
    // 1. Próbálkozás az ACE-STEP-pel
        let response = await fetch("https://musicgen-proxy.onrender.com/api/generate-free-audio", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                prompt: englishPrompt,
                hfToken: hfToken,
                duration: audioDuration, // 👈 Itt adjuk át a hosszt!
                lyrics: lyricsText
            })
        });

        // 2. Ha kimerült a ZeroGPU keret (429) -> Automatikus váltás MusicGen-re
        if (response.status === 429) {
            console.warn("⚠️ ZeroGPU keret kimerült! Váltás a MusicGen modellre...");
            if (audioPlaceholder) {
                audioPlaceholder.textContent = "⚠️ ZeroGPU keret kimerült! Váltás MusicGen modellre...";
            }

            // Fallback hívás a sima Inference API-ra
            response = await fetch("https://musicgen-proxy.onrender.com/api/generate-audio", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    prompt: englishPrompt,
                    apiKey: apiKey
                })
            });
        }

    if (!response.ok) {
        // Megpróbáljuk kiolvasni a szerver által küldött részletes hibaüzenetet
        let errorMessage = `Szerver hiba: ${response.status}`;
        try {
            const errData = await response.json();
            if (errData.error) {
                errorMessage = errData.error;
            }
        } catch (e) {
            // Ha a válasz nem JSON formátumú, marad a státuszkódos hiba
        }
        throw new Error(errorMessage);
    }

    const audioBlob = await response.blob();
    audioUrl = URL.createObjectURL(audioBlob);
}
 else {
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
// Ha a currentLang pl. 'hu', 'de', 'fr', 'pl', lefordítja angolra a generáláshoz
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
// A generateImageModel() függvényben a kép betöltésekor:
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
// 🔄 Újrapróbálós Pollinations Videó/Animáció Lelkérő
async function fetchPollinationsVideoWithRetry(promptText, maxRetries = 3, delayMs = 2000) {
    const encodedPrompt = encodeURIComponent(promptText);
    let lastImageBlobUrl = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            // Minden próbálkozásnál új seed a cache elkerülésére
            const randomSeed = Math.floor(Math.random() * 1000000);
            const videoUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?model=turbo&animate=true&seed=${randomSeed}&nologo=true`;

            const response = await fetch(videoUrl, { credentials: 'omit' });
            if (!response.ok) throw new Error(`HTTP hiba: ${response.status}`);

            const blob = await response.blob();

            // 🟢 SIKER: Valódi videó vagy animált GIF érkezett
            if (blob.type.includes('video') || blob.type.includes('gif')) {
                return {
                    url: URL.createObjectURL(blob),
                    isVideo: true,
                    mimeType: blob.type
                };
            }

            // 🟡 FALLBACK ELTENYÉSZTÉS: Képet kaptunk videó helyett (elmentjük tartaléknak)
            if (blob.type.includes('image')) {
                if (lastImageBlobUrl) URL.revokeObjectURL(lastImageBlobUrl); // Korábbi Blob törlése
                lastImageBlobUrl = URL.createObjectURL(blob);
            }

            console.warn(`Próbálkozás (${attempt}/${maxRetries}): A szerver képet adott videó helyett, újrapróbáljuk...`);

        } catch (err) {
            console.warn(`Próbálkozás (${attempt}/${maxRetries}) hiba:`, err.message);
        }

        // Várakozás a következő próbálkozás előtt (pl. 2 másodperc)
        if (attempt < maxRetries) {
            await new Promise(resolve => setTimeout(resolve, delayMs));
        }
    }

    // 🟢 HA 3 PRÓBÁLKOZÁSRA SEM JÖTT VIDEÓ, DE KÉP IGEN:
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
    const apiKeyInput = document.getElementById('apiKey');
    const userPromptInput = document.getElementById('userPrompt');
    const submitBtn = document.getElementById('submitVidBtn') || document.getElementById('submitBtn');
    const modelSelect = document.getElementById('modelSelect');
 const fallbackImg = document.getElementById('generatedVideoFallbackImg');
 const noticeElem = document.getElementById('videoNotice');
    const promptText = userPromptInput ? userPromptInput.value.trim() : '';
    const apiKey = apiKeyInput ? apiKeyInput.value.trim() : '';
    const selectedModel = modelSelect ? modelSelect.value : 'pollinations-video';
// Ha a currentLang pl. 'hu', 'de', 'fr', 'pl', lefordítja angolra a 

    if (!promptText) {
        alert(t.promptRequiredError || "Kérlek adj meg egy leírást!");
        return;
    }
// Ha a currentLang pl. 'hu', 'de', 'fr', 'pl', lefordítja angolra a generáláshoz
        const englishPrompt = await translateToEnglishIfNeeded(promptText, currentLang);

    // Felület előkészítése
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

        // 1. Pollinations Ingyenes Videó Modell (Wan 2.1)
        if (selectedModel === 'pollinations-video') {
          // Média elemek tiszta alaphelyzetbe állítása
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
        // 🔄 Újrapróbálós hívás (Max 3 próbálkozás, próbálkozások között 2000 ms szünet)
        const result = await fetchPollinationsVideoWithRetry(englishPrompt, 3, 2000);

        if (placeholder) {
            placeholder.classList.add('hidden');
            placeholder.style.display = 'none'; // 🟢 Inline style az átfedések megakadályozására
        }
        if (result.isVideo) {
            // =========================================================
            // A) VALÓDI VIDEÓ ESETÉN
            // =========================================================
            await new Promise((resolve, reject) => {
                videoElem.onloadeddata = () => resolve();
                videoElem.onerror = () => reject(new Error(t.errVideoFormat || "A videó nem lejátszható."));
                videoElem.src = result.url;
            });

            videoElem.classList.remove('hidden');

            // Letöltés beállítása videóhoz (.mp4)
            downloadBtn.href = result.url;
            downloadBtn.download = `generated-video-${Date.now()}.mp4`;
            if (downloadBtnText) downloadBtnText.innerText = t.downloadVidBtnText || "Videó Letöltése";
            downloadBtn.classList.remove('hidden');

        } else {
            // =========================================================
            // B) KÉP FALLBACK ESETÉN (A <video> REJTVE MARAD!)
            // =========================================================
            
            // 1. Tájékoztató doboz megjelenítése
            if (noticeElem) {
                noticeElem.innerText = `⚠️ ${t.msgVideoFallbackNotice || 'A videószerverek leterheltsége miatt videó helyett az előnézeti képet jelenítettük meg.'}`;
                noticeElem.classList.remove('hidden');
            }

            // 2. Csak a kép megjelenítése
            if (fallbackImg) {
                fallbackImg.src = result.url;
                fallbackImg.classList.remove('hidden');
                fallbackImg.style.display = 'block'; // 🟢 Csak a kép jelenik meg a dobozban!
            }

            // 3. Letöltő gomb feliratának és kiterjesztésének frissítése (.jpg)
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
        } 
        // 2. Hugging Face Modellek
        else {
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

        // ----------------------------------------------------
        // BIZTONSÁGOS VIDEÓ BETÖLTÉS PROMISE-SZAL (Elkapja a hibaágat)
        // ----------------------------------------------------
        await new Promise((resolve, reject) => {
            videoElem.onloadeddata = () => resolve();
            videoElem.onerror = () => reject(new Error(t.evalErrorDesc || "A videó formátuma érvénytelen vagy nem tölthető be."));
            videoElem.src = finalVideoUrl;
        });

        // Sikeres betöltés frissítése
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

                const response = await fetch(
                    "https://musicgen-proxy.onrender.com/api/generate-text",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            prompt: fullPrompt,
                            temperature: temperatureVal
                        })
                    }
                );

                if (!response.ok) {
                    throw new Error(`Render hiba: ${response.status}`);
                }

                const data = await response.json();
                responseText = data.result;

            } else if (selectedModel.includes('llama') || 
    selectedModel.includes('deepseek') || 
    selectedModel.includes('mixtral') || 
    selectedModel.includes('gpt-oss') || 
    selectedModel.includes('qwen')) {

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
    
