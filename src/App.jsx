import { useState, useCallback, useEffect, useRef } from "react";

function App() {

  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*";


    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }


    setPassword(pass);
  }, [length, number, charAllowed, setPassword]);

  const copyPasswordToClipBoard = useCallback (()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,100);
    window.navigator.clipboard.writeText(password)
  },[password ])


  useEffect(() => {
    passwordGenerator();
  }, [length, number, charAllowed, passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto shadow-full rounded-lg px-6 py-6 my-10 text-orange-500 bg-gray-700">
      <h1 className="text-center text-white">Password Generator</h1>
      <div className="flex-shadow rounded-full px-2 py-2 my-4 overflow-hidden mb-100">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref = {passwordRef}
        />
        <button 
        onClick={copyPasswordToClipBoard}
        className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">
          copy
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={8}
            max={100}
            value={length}
            className="cursor pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length:{length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={number}
            id="numberInput"
            onChange={() => {
              setNumber((prev) => !prev);
            }}
          />
          <label>Number:{number}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="charInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
