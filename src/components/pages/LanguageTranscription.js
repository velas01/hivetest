// LanguageTranscription.jsx
import React, { useEffect, useState } from 'react';
import DailyIframe from '@daily-co/daily-js';
import './Speech.css'

const LanguageTranscription = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  let recognition;
  let audioContext;

  const handleLanguageChange = () => {
    setSelectedLanguage(document.getElementById("language").value);
  };

  const startTranscription = () => {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    audioContext.resume()
      .then(() => startSpeechRecognition())
      .catch(error => console.error("Error resuming AudioContext:", error));
  };

  const startSpeechRecognition = () => {
    recognition = new window.webkitSpeechRecognition();
    recognition.lang = selectedLanguage;
    recognition.start();

    recognition.onresult = (event) => {
      const result = event.results[event.resultIndex];
      const text = result[0].transcript;
      displayTranscription(text);
    };
  };

  const displayTranscription = (text) => {
    const userLanguage = selectedLanguage;
    const p = document.createElement('p');
    p.textContent = `${text}`;
    document.querySelector('#transcript').appendChild(p);
  };

  useEffect(() => {
    // Load Google Translate script
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    // Initialize Google Translate element
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en' },
        'google_translate_element'
      );
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const callEl = document.querySelector('#call');
    const callFrame = DailyIframe.createFrame(callEl, {
      iframeStyle: { width: '80%', height: '56vw', margin: '0 auto', display: 'block' }
    });

    callFrame.join({
      url: 'https://swethab.daily.co/VLwTnofs795tPJ76oZgl',
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvIjp0cnVlLCJkIjoiZTZhMTkyNTAtNDA3MC00ODlkLTliNzctNmE2NTdmNzA4OTA2IiwiaWF0IjoxNzAxNjQ1MDY3fQ.meDhkWtFOtEuZTErI-1A5Z9AfwLqYXAyfv8qaWODBBc'
    });

    document.querySelector('#stop').addEventListener('click', async () => {
      if (callFrame && callFrame.stopTranscription) {
        try {
          await callFrame.stopTranscription();
          console.log("Transcription stopped successfully");
        } catch (error) {
          console.error("Error stopping transcription:", error);
        }
      }
    });
    
  }, []); // empty dependency array to run the effect only once

  return (
    <div>
      <div id='vc' style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div id='call'></div>
      </div>
      <div id='vc' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <div id='call'></div>
      </div>
      <div id='controls' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <select id="language" className="notranslate" onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="te">Telugu</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="de">German</option>
          <option value="ja">Japanese</option>
          <option value="ko">Korean</option>
          <option value="ru">Russian</option>
          <option value="zh-CN">Chinese (Simplified)</option>
        </select>
        <button id='start' className="notranslate" onClick={startTranscription}>Start Transcription</button>
        <div id="google_translate_element"></div>
        <button id='stop' className="notranslate">Stop Transcription</button>
      </div>
      <div id='text' style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <div id="transcript"></div>
      </div>
    </div>
    
  );
};

export default LanguageTranscription;
