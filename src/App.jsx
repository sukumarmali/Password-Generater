import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  // States
  const [length, setLength] = useState(8); // Password length
  const [numberAllowed, setNumberAllowed] = useState(false); // Allow numbers
  const [charAllowed, setCharAllowed] = useState(false); // Allow special characters
  const [password, setPassword] = useState(''); // Generated password
  const [buttonText, setButtonText] = useState('Copy'); // Button text

  // useRef hook to reference the password input element
  const passwordRef = useRef(null);

  // Function to generate a password
  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*-_+=[]{}~`';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  // Function to copy password to clipboard
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, password.length);
    window.navigator.clipboard.writeText(password);

    // Change the button text to "Copied"
    setButtonText('Copied');

    // Revert the button text to "Copy" after a brief delay (2 seconds)
    setTimeout(() => {
      setButtonText('Copy');
    }, 2000);
  }, [password]);

  // Generate password on initial load and when dependencies change
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-black-500">
      <h1 className="text-white text-center font-bold font-mono my-3">Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="outline-none bg-green-500 text-black px-3 py-0.5 shrink-0 font-bold font-mono"
        >
          {buttonText}
        </button>
      </div>
      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={20}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label className='text-white font-mono'>Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1 text-white">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex items-center gap-x-1 text-white font-mono">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;
