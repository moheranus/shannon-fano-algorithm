import React, { useState } from "react";
import "./App.css";

const ShannonFano = () => {
  const [inputText, setInputText] = useState("");
  const [encodedText, setEncodedText] = useState("");
  const [decodedText, setDecodedText] = useState("");
  const [codeTable, setCodeTable] = useState({});

  const handleEncode = () => {
    if (inputText.trim() === "") {
      alert("Input is empty. Please enter some text.");
      return;
    }
    const freqMap = {};
    [...inputText].forEach((char) => {
      freqMap[char] = (freqMap[char] || 0) + 1;
    });

    let charFreqArr = [];
    for (let char in freqMap) {
      if (freqMap.hasOwnProperty(char)) {
        charFreqArr.push({ char, freq: freqMap[char] });
      }
    }

    charFreqArr = charFreqArr.sort((a, b) => b.freq - a.freq);

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

    const generatedCodeTable = buildCodeTable(charFreqArr);
    setCodeTable(generatedCodeTable); // Store the code table in the state

    const encoded = [...inputText]
      .map((char) => generatedCodeTable[char])
      .join("");
    setEncodedText(encoded);
    setDecodedText(""); // reset decoded text when encoding
  };

  const handleDecode = () => {
    if (encodedText) {
      const reversedCodeTable = Object.entries(codeTable).reduce(
        (acc, [char, code]) => {
          acc[code] = char;
          return acc;
        },
        {}
      );

      let decoded = "";
      let buffer = "";
      for (const bit of encodedText) {
        buffer += bit;
        if (reversedCodeTable.hasOwnProperty(buffer)) {
          decoded += reversedCodeTable[buffer];
          buffer = "";
        }
      }
      setDecodedText(decoded);
    } else {
      setDecodedText("");
    }
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
    setEncodedText("");
    setDecodedText(""); // reset encoded and decoded text when input changes
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
                    className="inputs"
                    readOnly
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
                    className="inputs"
                    readOnly
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
            fillOpacity="1"
            d="M0,32L120,48C240,64,480,96,720,90.7C960,85,1200,43,1320,21.3L1440,0L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default ShannonFano;
