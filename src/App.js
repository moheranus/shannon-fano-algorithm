import React, { useState } from "react";
import "./App.css";
const buildCodeTable = (charFreqArr, codeTable = {}, prefix = "") => {
  if (charFreqArr.length === 1) {
    const [charFreq] = charFreqArr;
    codeTable[charFreq.char] = prefix;
    return codeTable;
  }

  const totalFreq = charFreqArr.reduce((acc, curr) => acc + curr.freq, 0);
  let currentFreq = 0;
  let i = 0;
  while (currentFreq < totalFreq / 2 && i < charFreqArr.length) {
    currentFreq += charFreqArr[i].freq;
    i++;
  }
  const [left, right] = [charFreqArr.slice(0, i), charFreqArr.slice(i)];

  buildCodeTable(left, codeTable, prefix + "0");
  buildCodeTable(right, codeTable, prefix + "1");

  return codeTable;
};

const ShannonFano = () => {
  const [inputText, setInputText] = useState("");
  const [encodedText, setEncodedText] = useState("");
  const [decodedText, setDecodedText] = useState("");

  const encode = (text) => {
    const freqMap = {};
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      if (freqMap[char]) {
        freqMap[char]++;
      } else {
        freqMap[char] = 1;
      }
    }

    const charFreqArr = Object.entries(freqMap).map((entry) => ({
      char: entry[0],
      freq: entry[1],
    }));

    const codeTable = buildCodeTable(charFreqArr);

    let encoded = "";
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      encoded += codeTable[char];
    }

    setEncodedText(encoded);
  };

  const decode = (text, codeTable) => {
    let decoded = "";
    let currentCode = "";
    for (let i = 0; i < text.length; i++) {
      currentCode += text[i];
      const char = Object.entries(codeTable).find(
        (entry) => entry[1] === currentCode
      )?.[0];
      if (char) {
        decoded += char;
        currentCode = "";
      }
    }

    setDecodedText(decoded);
  };

  const handleEncode = () => {
    encode(inputText);
  };

  const handleDecode = () => {
    const freqMap = {};
    for (let i = 0; i < inputText.length; i++) {
      const char = inputText[i];
      if (freqMap[char]) {
        freqMap[char]++;
      } else {
        freqMap[char] = 1;
      }
    }
    const charFreqArr = Object.entries(freqMap).map((entry) => ({
      char: entry[0],
      freq: entry[1],
    }));
    const codeTable = buildCodeTable(charFreqArr);
    decode(encodedText, codeTable);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleEncodedChange = (event) => {
    setEncodedText(event.target.value);
  };

  const handleDecodedChange = (event) => {
    setDecodedText(event.target.value);
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div>
          <div className="formWrap">
            <div className="title">
              <h2>SHANNON-FANO CODING ALGORITHM</h2>
            </div>
            <div className="formCont">
              <label htmlFor="inputText" className="lable">
                Input Text:
              </label>
              <input
                type="text"
                id="inputText"
                value={inputText}
                onChange={handleInputChange}
                className="inputs"
              />
              <button onClick={handleEncode} className="shadow__btn">
                Encode
              </button>

              {encodedText && (
                <div>
                  <label htmlFor="encodedText" className="lable">
                    Encoded Text:
                  </label>
                  <input
                    type="text"
                    id="encodedText"
                    value={encodedText}
                    onChange={handleEncodedChange}
                    className="inputs"
                  />
                </div>
              )}
              {decodedText && (
                <div>
                  <label htmlFor="decodedText" className="lable">
                    Decoded Text:
                  </label>
                  <input
                    type="text"
                    id="decodedText"
                    value={decodedText}
                    onChange={handleDecodedChange}
                    className="inputs"
                  />
                </div>
              )}
              {encodedText && !decodedText && (
                <button onClick={handleDecode} className="shadow__btn">
                  Decode
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="svg">
        <div className="presentation">Developed by: Daniel Shobe</div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#0099ff"
            fill-opacity="1"
            d="M0,32L120,48C240,64,480,96,720,90.7C960,85,1200,43,1320,21.3L1440,0L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default ShannonFano;
