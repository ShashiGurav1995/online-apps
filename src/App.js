import React, { useState } from "react";
import "./App.css";
import QRCode from "qrcode.react";
import Head from "./components/head";

function App() {
  const [url, setUrl] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const [message, setMessage] = useState("");

  const handleGenerate = () => {
    if (url !== "") {
      setShowQRCode(true);
    }
  };

  const hideQRCode = () => {
    setShowQRCode(false);
  };

  const handleUrlChange = (e) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    if (newUrl === "") {
      hideQRCode();
    }
  };

  const formatUrl = (inputUrl) => {
    if (!/^https?:\/\//i.test(inputUrl)) {
      return `http://${inputUrl}`;
    }
    return inputUrl;
  };

  const downloadQRCode = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      let downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "qr_code.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      // Set success message
      setMessage("QR code downloaded successfully!");

      // Clear the success message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } else {
      setMessage("No QR code to download.");
    }
  };

  return (
    <>
      <Head />
      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={handleUrlChange}
        id="myurl"
      />
      <button onClick={handleGenerate}>Generate QR Code</button>
      {showQRCode && (
        <div className="myQR">
          <QRCode
            value={formatUrl(url)}
            size={300}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
            level={"L"}
          />
          <button onClick={downloadQRCode}>Download QR Code</button>
          {message && <p>{message}</p>}
        </div>
      )}
    </>
  );
}

export default App;
