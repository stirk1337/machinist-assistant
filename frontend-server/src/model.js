// TEXT TO SPEECH Model

// Initialization
export const xSpeech = {};

// Capture a Web Speech Synthesis Instance
xSpeech.synth = window.speechSynthesis || null;

// Voices available
xSpeech.voices = [];
// Run Button

// Populate the Select Element with Available voices
xSpeech.populateVoiceList = function () {
    // fetch voices
    xSpeech.voices = xSpeech.synth.getVoices();
    // loop through while creating an Option Element for the Select Element
    for(let i = 0; i < xSpeech.voices.length ; i++) {
        // create Option Element
        let option = document.createElement('option');
        // The name and language of the Voice
        option.textContent = xSpeech.voices[i].name + ' (' + xSpeech.voices[i].lang + ')';
        // Check if the current language is Default
        if(xSpeech.voices[i].default) {
            option.textContent += ' -- DEFAULT';
        }
        // Create attributes to store a Voice's specs
        option.setAttribute('data-lang', xSpeech.voices[i].lang);
        option.setAttribute('data-name', xSpeech.voices[i].name);
        // Add it to the Select Menu
        xSpeech.selectMenu.appendChild(option);
    }
};


// Searching and Saving Voices
xSpeech.work = function () {
    // If not Firefox
    xSpeech.populateVoiceList();
    // => Firefox doesn't support SpeechSynthesis.onvoiceschanged, so
    if (speechSynthesis.onvoiceschanged !== undefined) {
        speechSynthesis.onvoiceschanged = xSpeech.populateVoiceList;
    }
};


// Now, Speak
xSpeech.speak = function (anyText) {
    // New Synthesis Instance
    let utterThis = new SpeechSynthesisUtterance(anyText);
    // What is the selected language in the SELECT Element
    let selectedOption = "Microsoft Irina - Russian (Russia)";
    // Loop through searching for the selected Language
    for(let i = 0; i < xSpeech.voices.length ; i++) {
      if(xSpeech.voices[i].name === selectedOption) {
        utterThis.voice = xSpeech.voices[i];
        break;
      }
    }
    // Apply the Pitch of Sound-Voice
    utterThis.pitch = 1
    // Apply the Speech Speed Rate
    utterThis.rate = 1;
    // Finally, Speak
    xSpeech.synth.speak(utterThis);

    // When the running Instance is paused,
    utterThis.onpause = function(event) {
        // Get the current character to be spoken 
        let char = event.utterance.text.charAt(event.charIndex);
        // Log the character
        console.log('Speech paused at character ' + event.charIndex + ' of "' +
        event.utterance.text + '", which is "' + char + '".');
    }

};