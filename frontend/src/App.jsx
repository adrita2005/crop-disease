// // import { useState, useRef, useCallback } from "react";

// // const API_URL = "http://localhost:8000";

// // const severityColors = {
// //   None    : "bg-green-100  text-green-800  border-green-300",
// //   Low     : "bg-yellow-100 text-yellow-800 border-yellow-300",
// //   Medium  : "bg-orange-100 text-orange-800 border-orange-300",
// //   High    : "bg-red-100    text-red-800    border-red-300",
// //   Critical: "bg-purple-100 text-purple-800 border-purple-300"
// // };

// // export default function App() {
// //   const [image,   setImage]   = useState(null);      // preview URL
// //   const [file,    setFile]    = useState(null);      // actual file
// //   const [result,  setResult]  = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error,   setError]   = useState(null);
// //   const [camera,  setCamera]  = useState(false);

// //   const videoRef    = useRef(null);
// //   const streamRef   = useRef(null);
// //   const fileInputRef= useRef(null);

// //   // ── File upload ───────────────────────────────────────────────────
// //   const handleFileChange = (e) => {
// //     const f = e.target.files[0];
// //     if (!f) return;
// //     setFile(f);
// //     setImage(URL.createObjectURL(f));
// //     setResult(null);
// //     setError(null);
// //   };

// //   // ── Camera open ───────────────────────────────────────────────────
// //   const openCamera = async () => {
// //     setCamera(true);
// //     setResult(null);
// //     setError(null);
// //     try {
// //       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
// //       streamRef.current = stream;
// //       setTimeout(() => {
// //         if (videoRef.current) videoRef.current.srcObject = stream;
// //       }, 100);
// //     } catch {
// //       setError("Camera access denied. Please allow camera permission.");
// //       setCamera(false);
// //     }
// //   };

// //   // ── Capture photo ─────────────────────────────────────────────────
// //   const capturePhoto = useCallback(() => {
// //     const canvas = document.createElement("canvas");
// //     canvas.width  = videoRef.current.videoWidth;
// //     canvas.height = videoRef.current.videoHeight;
// //     canvas.getContext("2d").drawImage(videoRef.current, 0, 0);

// //     canvas.toBlob((blob) => {
// //       const capturedFile = new File([blob], "capture.jpg", { type: "image/jpeg" });
// //       setFile(capturedFile);
// //       setImage(URL.createObjectURL(blob));
// //     }, "image/jpeg");

// //     // Stop camera
// //     streamRef.current?.getTracks().forEach(t => t.stop());
// //     setCamera(false);
// //   }, []);

// //   // ── Predict ───────────────────────────────────────────────────────
// //   const predict = async () => {
// //     if (!file) return;
// //     setLoading(true);
// //     setError(null);

// //     try {
// //       const formData = new FormData();
// //       formData.append("file", file);

// //       const res  = await fetch(`${API_URL}/predict`, {
// //         method: "POST",
// //         body  : formData
// //       });
// //       const data = await res.json();
// //       setResult(data);
// //     } catch {
// //       setError("❌ Cannot connect to server. Make sure backend is running.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // ── Reset ─────────────────────────────────────────────────────────
// //   const reset = () => {
// //     setImage(null);
// //     setFile(null);
// //     setResult(null);
// //     setError(null);
// //     streamRef.current?.getTracks().forEach(t => t.stop());
// //     setCamera(false);
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-100 p-6">
// //       <div className="max-w-2xl mx-auto">

// //         {/* Header */}
// //         <div className="text-center mb-8">
// //           <h1 className="text-3xl font-bold text-green-800">🍋 Citrus Disease Detector</h1>
// //           <p className="text-gray-500 mt-1">Upload or capture a leaf photo to detect disease</p>
// //         </div>

// //         {/* Upload / Camera buttons */}
// //         {!image && !camera && (
// //           <div className="flex gap-4 justify-center mb-6">
// //             <button
// //               onClick={() => fileInputRef.current.click()}
// //               className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
// //             >
// //               📁 Upload Photo
// //             </button>
// //             <button
// //               onClick={openCamera}
// //               className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
// //             >
// //               📷 Use Camera
// //             </button>
// //             <input
// //               ref={fileInputRef}
// //               type="file"
// //               accept="image/*"
// //               className="hidden"
// //               onChange={handleFileChange}
// //             />
// //           </div>
// //         )}

// //         {/* Camera view */}
// //         {camera && (
// //           <div className="text-center mb-6">
// //             <video
// //               ref={videoRef}
// //               autoPlay
// //               playsInline
// //               className="rounded-xl w-full max-h-72 object-cover border-2 border-blue-300"
// //             />
// //             <div className="flex gap-3 justify-center mt-3">
// //               <button
// //                 onClick={capturePhoto}
// //                 className="bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-blue-700"
// //               >
// //                 📸 Capture
// //               </button>
// //               <button
// //                 onClick={reset}
// //                 className="bg-gray-400 text-white px-6 py-2 rounded-xl hover:bg-gray-500"
// //               >
// //                 Cancel
// //               </button>
// //             </div>
// //           </div>
// //         )}

// //         {/* Image preview */}
// //         {image && (
// //           <div className="text-center mb-6">
// //             <img
// //               src={image}
// //               alt="preview"
// //               className="rounded-xl max-h-72 mx-auto border-2 border-green-300 shadow-md object-contain"
// //             />
// //             <div className="flex gap-3 justify-center mt-3">
// //               <button
// //                 onClick={predict}
// //                 disabled={loading}
// //                 className="bg-green-600 text-white px-8 py-2 rounded-xl font-semibold hover:bg-green-700 disabled:opacity-50"
// //               >
// //                 {loading ? "🔍 Analyzing..." : "🔍 Analyze"}
// //               </button>
// //               <button
// //                 onClick={reset}
// //                 className="bg-gray-400 text-white px-6 py-2 rounded-xl hover:bg-gray-500"
// //               >
// //                 Reset
// //               </button>
// //             </div>
// //           </div>
// //         )}

// //         {/* Error */}
// //         {error && (
// //           <div className="bg-red-50 border border-red-300 text-red-700 rounded-xl p-4 mb-4 text-center">
// //             {error}
// //           </div>
// //         )}

// //         {/* Results */}
// //         {result && (
// //           <div className="bg-white rounded-2xl shadow-lg p-6 space-y-5">

// //             {/* Main result */}
// //             <div className="text-center">
// //               <p className="text-gray-500 text-sm">Detected Disease</p>
// //               <h2 className="text-2xl font-bold text-green-800 mt-1">
// //                 {result.predicted_class}
// //               </h2>
// //               <div className="mt-2 inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full font-semibold">
// //                 {result.confidence.toFixed(1)}% Confidence
// //               </div>
// //             </div>

// //             {/* Severity badge */}
// //             <div className={`border rounded-xl p-3 text-center text-sm font-semibold
// //               ${severityColors[result.disease_info.severity]}`}>
// //               Severity: {result.disease_info.severity}
// //             </div>

// //             {/* Disease info */}
// //             <div className="bg-gray-50 rounded-xl p-4 space-y-2">
// //               <p><span className="font-semibold">📌 Description:</span> {result.disease_info.description}</p>
// //               <p><span className="font-semibold">💊 Treatment:</span> {result.disease_info.treatment}</p>
// //             </div>

// //             {/* Probability bars */}
// //             <div>
// //               <p className="font-semibold text-gray-700 mb-2">All Class Probabilities:</p>
// //               {Object.entries(result.all_probabilities)
// //                 .sort((a, b) => b[1] - a[1])
// //                 .map(([cls, prob]) => (
// //                   <div key={cls} className="mb-2">
// //                     <div className="flex justify-between text-sm mb-0.5">
// //                       <span className={cls === result.predicted_class ? "font-bold text-green-700" : "text-gray-600"}>
// //                         {cls}
// //                       </span>
// //                       <span className="text-gray-500">{prob.toFixed(1)}%</span>
// //                     </div>
// //                     <div className="w-full bg-gray-200 rounded-full h-2">
// //                       <div
// //                         className={`h-2 rounded-full transition-all ${
// //                           cls === result.predicted_class ? "bg-green-500" : "bg-gray-400"
// //                         }`}
// //                         style={{ width: `${prob}%` }}
// //                       />
// //                     </div>
// //                   </div>
// //                 ))}
// //             </div>

// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }


// // import { useCallback, useRef, useState } from "react";

// // const API_URL = "http://localhost:8000";

// // const severityConfig = {
// //   None:     { color: "#22c55e", bg: "rgba(34,197,94,0.15)",     label: "✦ Healthy" },
// //   Low:      { color: "#eab308", bg: "rgba(234,179,8,0.15)",     label: "▲ Low Risk" },
// //   Medium:   { color: "#f97316", bg: "rgba(249,115,22,0.15)",    label: "◆ Moderate" },
// //   High:     { color: "#ef4444", bg: "rgba(239,68,68,0.15)",     label: "● High Risk" },
// //   Critical: { color: "#a855f7", bg: "rgba(168,85,247,0.15)",    label: "⬟ Critical" },
// // };

// // export default function App() {
// //   const [image,   setImage]   = useState(null);
// //   const [file,    setFile]    = useState(null);
// //   const [result,  setResult]  = useState(null);
// //   const [loading, setLoading] = useState(false);
// //   const [error,   setError]   = useState(null);
// //   const [camera,  setCamera]  = useState(false);
// //   const [drag,    setDrag]    = useState(false);

// //   const videoRef     = useRef(null);
// //   const streamRef    = useRef(null);
// //   const fileInputRef = useRef(null);

// //   const handleFile = (f) => {
// //     if (!f || !f.type.startsWith("image/")) return;
// //     setFile(f);
// //     setImage(URL.createObjectURL(f));
// //     setResult(null);
// //     setError(null);
// //   };

// //   const handleDrop = (e) => {
// //     e.preventDefault();
// //     setDrag(false);
// //     handleFile(e.dataTransfer.files[0]);
// //   };

// //   const openCamera = async () => {
// //     setCamera(true);
// //     setResult(null);
// //     setError(null);
// //     try {
// //       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
// //       streamRef.current = stream;
// //       setTimeout(() => { if (videoRef.current) videoRef.current.srcObject = stream; }, 100);
// //     } catch {
// //       setError("Camera access denied.");
// //       setCamera(false);
// //     }
// //   };

// //   const capturePhoto = useCallback(() => {
// //     const canvas = document.createElement("canvas");
// //     canvas.width  = videoRef.current.videoWidth;
// //     canvas.height = videoRef.current.videoHeight;
// //     canvas.getContext("2d").drawImage(videoRef.current, 0, 0);
// //     canvas.toBlob((blob) => {
// //       handleFile(new File([blob], "capture.jpg", { type: "image/jpeg" }));
// //     }, "image/jpeg");
// //     streamRef.current?.getTracks().forEach(t => t.stop());
// //     setCamera(false);
// //   }, []);

// //   const predict = async () => {
// //     if (!file) return;
// //     setLoading(true);
// //     setError(null);
// //     try {
// //       const formData = new FormData();
// //       formData.append("file", file);
// //       const res  = await fetch(`${API_URL}/predict`, { method: "POST", body: formData });
// //       const data = await res.json();
// //       setResult(data);
// //     } catch {
// //       setError("Cannot connect to server. Make sure backend is running on port 8000.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const reset = () => {
// //     setImage(null); setFile(null); setResult(null); setError(null);
// //     streamRef.current?.getTracks().forEach(t => t.stop());
// //     setCamera(false);
// //   };

// //   const sev = result ? severityConfig[result.disease_info.severity] : null;
// //   const sortedProbs = result
// //     ? Object.entries(result.all_probabilities).sort((a, b) => b[1] - a[1])
// //     : [];

// //   return (
// //     <>
// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

// //         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

// //         body {
// //           background: #0a0f0a;
// //           font-family: 'DM Sans', sans-serif;
// //           color: #e8f0e8;
// //           min-height: 100vh;
// //         }

// //         .bg-canvas {
// //           position: fixed; inset: 0; z-index: 0; overflow: hidden; pointer-events: none;
// //         }
// //         .orb {
// //           position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.18;
// //         }
// //         .orb-1 { width: 600px; height: 600px; background: #16a34a; top: -200px; left: -200px; }
// //         .orb-2 { width: 500px; height: 500px; background: #15803d; bottom: -150px; right: -150px; }
// //         .orb-3 { width: 300px; height: 300px; background: #84cc16; top: 40%; left: 60%; }

// //         .noise {
// //           position: fixed; inset: 0; z-index: 1; pointer-events: none; opacity: 0.035;
// //           background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
// //           background-size: 200px;
// //         }

// //         .app {
// //           position: relative; z-index: 2;
// //           min-height: 100vh;
// //           display: flex; flex-direction: column; align-items: center;
// //           padding: 48px 20px 80px;
// //         }

// //         /* Header */
// //         .header { text-align: center; margin-bottom: 56px; }
// //         .header-eyebrow {
// //           font-family: 'DM Sans', sans-serif; font-weight: 500; font-size: 11px;
// //           letter-spacing: 0.3em; text-transform: uppercase;
// //           color: #4ade80; margin-bottom: 16px;
// //           display: flex; align-items: center; justify-content: center; gap: 12px;
// //         }
// //         .header-eyebrow::before, .header-eyebrow::after {
// //           content: ''; display: block; width: 32px; height: 1px; background: #4ade80; opacity: 0.5;
// //         }
// //         .header h1 {
// //           font-family: 'Playfair Display', serif;
// //           font-size: clamp(42px, 7vw, 72px);
// //           font-weight: 900; line-height: 1.0;
// //           color: #f0fdf0;
// //           letter-spacing: -0.02em;
// //         }
// //         .header h1 span { color: #4ade80; }
// //         .header-sub {
// //           margin-top: 16px; font-size: 15px; color: #6b8f6b; font-weight: 300;
// //           letter-spacing: 0.01em;
// //         }

// //         /* Card */
// //         .card {
// //           width: 100%; max-width: 640px;
// //           background: rgba(255,255,255,0.03);
// //           border: 1px solid rgba(74,222,128,0.12);
// //           border-radius: 24px;
// //           padding: 40px;
// //           backdrop-filter: blur(20px);
// //           box-shadow: 0 32px 80px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05);
// //         }

// //         /* Upload zone */
// //         .upload-zone {
// //           border: 1.5px dashed rgba(74,222,128,0.25);
// //           border-radius: 16px;
// //           padding: 56px 24px;
// //           text-align: center;
// //           cursor: pointer;
// //           transition: all 0.3s ease;
// //           background: rgba(74,222,128,0.02);
// //         }
// //         .upload-zone:hover, .upload-zone.drag-over {
// //           border-color: #4ade80;
// //           background: rgba(74,222,128,0.06);
// //           transform: translateY(-2px);
// //         }
// //         .upload-icon {
// //           width: 64px; height: 64px; margin: 0 auto 20px;
// //           background: rgba(74,222,128,0.1);
// //           border-radius: 50%; display: flex; align-items: center; justify-content: center;
// //           font-size: 28px;
// //           border: 1px solid rgba(74,222,128,0.2);
// //         }
// //         .upload-title {
// //           font-family: 'Playfair Display', serif;
// //           font-size: 20px; font-weight: 700; color: #e8f0e8; margin-bottom: 8px;
// //         }
// //         .upload-sub { font-size: 13px; color: #4a6b4a; margin-bottom: 28px; }

// //         .btn-row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }

// //         .btn {
// //           display: inline-flex; align-items: center; gap: 8px;
// //           padding: 11px 24px; border-radius: 100px; border: none;
// //           font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500;
// //           cursor: pointer; transition: all 0.2s ease; letter-spacing: 0.02em;
// //         }
// //         .btn-primary {
// //           background: #4ade80; color: #0a0f0a;
// //         }
// //         .btn-primary:hover { background: #22c55e; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(74,222,128,0.3); }
// //         .btn-outline {
// //           background: transparent; color: #e8f0e8;
// //           border: 1px solid rgba(255,255,255,0.15);
// //         }
// //         .btn-outline:hover { border-color: rgba(255,255,255,0.35); background: rgba(255,255,255,0.05); }
// //         .btn-ghost {
// //           background: rgba(255,255,255,0.06); color: #a0b8a0;
// //           border: 1px solid rgba(255,255,255,0.08);
// //         }
// //         .btn-ghost:hover { background: rgba(255,255,255,0.1); }
// //         .btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none !important; }

// //         /* Preview */
// //         .preview-wrap { position: relative; margin-bottom: 20px; }
// //         .preview-img {
// //           width: 100%; max-height: 320px; object-fit: contain;
// //           border-radius: 14px;
// //           border: 1px solid rgba(74,222,128,0.15);
// //           display: block;
// //           background: rgba(0,0,0,0.3);
// //         }
// //         .preview-badge {
// //           position: absolute; top: 12px; right: 12px;
// //           background: rgba(0,0,0,0.6); backdrop-filter: blur(8px);
// //           border: 1px solid rgba(255,255,255,0.1);
// //           border-radius: 100px; padding: 4px 12px;
// //           font-size: 11px; color: #a0b8a0; letter-spacing: 0.05em;
// //         }
// //         .action-row { display: flex; gap: 10px; }
// //         .action-row .btn { flex: 1; justify-content: center; }

// //         /* Video */
// //         .video-el {
// //           width: 100%; border-radius: 14px; display: block; margin-bottom: 16px;
// //           border: 1px solid rgba(74,222,128,0.2);
// //         }

// //         /* Error */
// //         .error-box {
// //           background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.25);
// //           border-radius: 12px; padding: 14px 18px; margin-bottom: 16px;
// //           font-size: 13px; color: #fca5a5; display: flex; align-items: center; gap: 10px;
// //         }

// //         /* Divider */
// //         .divider {
// //           height: 1px; background: rgba(255,255,255,0.06); margin: 32px 0;
// //         }

// //         /* Result */
// //         .result-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 24px; }
// //         .result-label { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #4a6b4a; margin-bottom: 6px; }
// //         .result-disease {
// //           font-family: 'Playfair Display', serif;
// //           font-size: 36px; font-weight: 900; color: #f0fdf0; line-height: 1.1;
// //         }
// //         .confidence-pill {
// //           flex-shrink: 0;
// //           background: rgba(74,222,128,0.1); border: 1px solid rgba(74,222,128,0.25);
// //           border-radius: 100px; padding: 8px 18px;
// //           font-size: 22px; font-weight: 700; color: #4ade80;
// //           font-family: 'Playfair Display', serif;
// //           white-space: nowrap;
// //         }
// //         .confidence-pill span { font-size: 12px; color: #4a6b4a; font-family: 'DM Sans', sans-serif; font-weight: 400; display: block; text-align: center; margin-top: 2px; }

// //         /* Severity */
// //         .severity-tag {
// //           display: inline-flex; align-items: center; gap: 8px;
// //           padding: 8px 16px; border-radius: 100px;
// //           font-size: 12px; font-weight: 500; letter-spacing: 0.05em;
// //           margin-bottom: 24px; border: 1px solid;
// //         }

// //         /* Info grid */
// //         .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 28px; }
// //         .info-cell {
// //           background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.07);
// //           border-radius: 12px; padding: 16px;
// //         }
// //         .info-cell-icon { font-size: 18px; margin-bottom: 8px; }
// //         .info-cell-label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #4a6b4a; margin-bottom: 4px; }
// //         .info-cell-text { font-size: 13px; color: #c8dcc8; line-height: 1.5; }

// //         /* Probability bars */
// //         .prob-section-title {
// //           font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em;
// //           color: #4a6b4a; margin-bottom: 16px;
// //         }
// //         .prob-row { margin-bottom: 10px; }
// //         .prob-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; }
// //         .prob-name { font-size: 13px; color: #a0b8a0; }
// //         .prob-name.active { color: #4ade80; font-weight: 500; }
// //         .prob-val { font-size: 12px; color: #4a6b4a; }
// //         .prob-val.active { color: #4ade80; font-weight: 600; }
// //         .prob-track {
// //           height: 4px; background: rgba(255,255,255,0.06); border-radius: 100px; overflow: hidden;
// //         }
// //         .prob-fill {
// //           height: 100%; border-radius: 100px;
// //           background: rgba(74,222,128,0.3);
// //           transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
// //         }
// //         .prob-fill.active { background: #4ade80; }

// //         /* Loading */
// //         @keyframes spin { to { transform: rotate(360deg); } }
// //         @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
// //         .spinner {
// //           width: 16px; height: 16px; border: 2px solid rgba(10,15,10,0.3);
// //           border-top-color: #0a0f0a; border-radius: 50%;
// //           animation: spin 0.7s linear infinite;
// //         }
// //         .loading-text { animation: pulse 1.5s ease infinite; }

// //         @media (max-width: 480px) {
// //           .card { padding: 28px 20px; }
// //           .info-grid { grid-template-columns: 1fr; }
// //           .result-disease { font-size: 28px; }
// //         }
// //       `}</style>

// //       <div className="bg-canvas">
// //         <div className="orb orb-1" />
// //         <div className="orb orb-2" />
// //         <div className="orb orb-3" />
// //       </div>
// //       <div className="noise" />

// //       <div className="app">
// //         {/* Header */}
// //         <header className="header">
// //           <div className="header-eyebrow">AI-Powered Detection</div>
// //           <h1>Citrus <span>Disease</span><br />Detector</h1>
// //           <p className="header-sub">Upload a leaf photo for instant diagnosis & treatment advice</p>
// //         </header>

// //         <div className="card">
// //           {/* Error */}
// //           {error && (
// //             <div className="error-box">
// //               <span>⚠</span> {error}
// //             </div>
// //           )}

// //           {/* Camera view */}
// //           {camera && (
// //             <div>
// //               <video ref={videoRef} autoPlay playsInline className="video-el" />
// //               <div className="btn-row">
// //                 <button className="btn btn-primary" onClick={capturePhoto}>📸 Capture Photo</button>
// //                 <button className="btn btn-ghost" onClick={reset}>Cancel</button>
// //               </div>
// //             </div>
// //           )}

// //           {/* Upload zone */}
// //           {!image && !camera && (
// //             <div
// //               className={`upload-zone${drag ? " drag-over" : ""}`}
// //               onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
// //               onDragLeave={() => setDrag(false)}
// //               onDrop={handleDrop}
// //               onClick={() => fileInputRef.current.click()}
// //             >
// //               <div className="upload-icon">🍃</div>
// //               <div className="upload-title">Drop your leaf photo here</div>
// //               <div className="upload-sub">Supports JPG, PNG, WEBP · Max 10MB</div>
// //               <div className="btn-row" onClick={e => e.stopPropagation()}>
// //                 <button className="btn btn-primary" onClick={() => fileInputRef.current.click()}>
// //                   📁 Browse Files
// //                 </button>
// //                 <button className="btn btn-outline" onClick={openCamera}>
// //                   📷 Use Camera
// //                 </button>
// //               </div>
// //               <input ref={fileInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={e => handleFile(e.target.files[0])} />
// //             </div>
// //           )}

// //           {/* Image preview */}
// //           {image && !camera && (
// //             <div>
// //               <div className="preview-wrap">
// //                 <img src={image} alt="preview" className="preview-img" />
// //                 <div className="preview-badge">READY TO ANALYZE</div>
// //               </div>
// //               <div className="action-row">
// //                 <button className="btn btn-primary" onClick={predict} disabled={loading}>
// //                   {loading ? (
// //                     <><div className="spinner" /><span className="loading-text">Analyzing...</span></>
// //                   ) : (
// //                     <><span>🔬</span> Analyze Leaf</>
// //                   )}
// //                 </button>
// //                 <button className="btn btn-ghost" onClick={reset}>✕ Reset</button>
// //               </div>
// //             </div>
// //           )}

// //           {/* Results */}
// //           {result && (
// //             <>
// //               <div className="divider" />

// //               {/* Disease + confidence */}
// //               <div className="result-header">
// //                 <div>
// //                   <div className="result-label">Detected Disease</div>
// //                   <div className="result-disease">{result.predicted_class}</div>
// //                 </div>
// //                 <div className="confidence-pill">
// //                   {result.confidence.toFixed(1)}%
// //                   <span>confidence</span>
// //                 </div>
// //               </div>

// //               {/* Severity */}
// //               <div className="severity-tag" style={{
// //                 color: sev.color, background: sev.bg, borderColor: sev.color + "40"
// //               }}>
// //                 {sev.label}
// //               </div>

// //               {/* Info grid */}
// //               <div className="info-grid">
// //                 <div className="info-cell">
// //                   <div className="info-cell-icon">📋</div>
// //                   <div className="info-cell-label">Description</div>
// //                   <div className="info-cell-text">{result.disease_info.description}</div>
// //                 </div>
// //                 <div className="info-cell">
// //                   <div className="info-cell-icon">💊</div>
// //                   <div className="info-cell-label">Treatment</div>
// //                   <div className="info-cell-text">{result.disease_info.treatment}</div>
// //                 </div>
// //               </div>

// //               {/* Probability bars */}
// //               <div className="prob-section-title">All Class Probabilities</div>
// //               {sortedProbs.map(([cls, prob]) => {
// //                 const isActive = cls === result.predicted_class;
// //                 return (
// //                   <div className="prob-row" key={cls}>
// //                     <div className="prob-meta">
// //                       <span className={`prob-name${isActive ? " active" : ""}`}>{cls}</span>
// //                       <span className={`prob-val${isActive ? " active" : ""}`}>{prob.toFixed(1)}%</span>
// //                     </div>
// //                     <div className="prob-track">
// //                       <div className={`prob-fill${isActive ? " active" : ""}`} style={{ width: `${prob}%` }} />
// //                     </div>
// //                   </div>
// //                 );
// //               })}
// //             </>
// //           )}
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// import { useCallback, useEffect, useRef, useState } from "react";

// const API_URL = "http://localhost:8000";

// const severityConfig = {
//   None:     { color: "#22c55e", bg: "rgba(34,197,94,0.15)",   label: "✦ Healthy",   glow: "0 0 20px rgba(34,197,94,0.4)" },
//   Low:      { color: "#eab308", bg: "rgba(234,179,8,0.15)",   label: "▲ Low Risk",  glow: "0 0 20px rgba(234,179,8,0.4)" },
//   Medium:   { color: "#f97316", bg: "rgba(249,115,22,0.15)",  label: "◆ Moderate",  glow: "0 0 20px rgba(249,115,22,0.4)" },
//   High:     { color: "#ef4444", bg: "rgba(239,68,68,0.15)",   label: "● High Risk", glow: "0 0 20px rgba(239,68,68,0.4)" },
//   Critical: { color: "#a855f7", bg: "rgba(168,85,247,0.15)",  label: "⬟ Critical",  glow: "0 0 20px rgba(168,85,247,0.4)" },
// };

// const diseaseColors = {
//   Canker: "#ef4444", Greening: "#a855f7", Gummosis: "#f97316",
//   Healthy: "#22c55e", "Leaf-miner": "#eab308", "Lemon-butterfly": "#3b82f6"
// };

// function Counter({ target, suffix = "", duration = 1500 }) {
//   const [val, setVal] = useState(0);
//   useEffect(() => {
//     let start = 0;
//     const step = target / (duration / 16);
//     const timer = setInterval(() => {
//       start += step;
//       if (start >= target) { setVal(target); clearInterval(timer); }
//       else setVal(Math.floor(start));
//     }, 16);
//     return () => clearInterval(timer);
//   }, [target]);
//   return <span>{val}{suffix}</span>;
// }

// function BarChart({ data }) {
//   const max = Math.max(...data.map(d => d.value), 1);
//   return (
//     <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "90px", paddingTop: "8px" }}>
//       {data.map((d, i) => (
//         <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
//           <div style={{
//             width: "100%", height: `${Math.max((d.value / max) * 70, 4)}px`,
//             background: d.color, borderRadius: "4px 4px 0 0",
//             transition: "height 0.8s cubic-bezier(0.4,0,0.2,1)",
//             boxShadow: `0 0 8px ${d.color}60`
//           }} />
//           <div style={{ fontSize: "8px", color: "#4a6b4a", textAlign: "center" }}>
//             {d.label.split("-")[0]}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// function DonutChart({ value, color, size = 80 }) {
//   const r = 30, cx = 40, cy = 40;
//   const circ = 2 * Math.PI * r;
//   const offset = circ - (value / 100) * circ;
//   return (
//     <svg width={size} height={size} viewBox="0 0 80 80">
//       <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
//       <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="8"
//         strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
//         transform="rotate(-90 40 40)"
//         style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)", filter: `drop-shadow(0 0 6px ${color})` }}
//       />
//       <text x={cx} y={cy + 5} textAnchor="middle" fill={color} fontSize="13" fontWeight="700" fontFamily="Georgia,serif">
//         {Math.round(value)}%
//       </text>
//     </svg>
//   );
// }

// function generatePDF(result, imageUrl) {
//   const w = window.open("", "_blank");
//   const sev = severityConfig[result.disease_info.severity];
//   w.document.write(`
//     <html><head><title>Citrus Disease Report</title>
//     <style>
//       body{font-family:Georgia,serif;max-width:700px;margin:40px auto;color:#1a2e1a;padding:0 20px}
//       h1{color:#15803d;font-size:28px;border-bottom:3px solid #15803d;padding-bottom:12px;margin-bottom:8px}
//       .meta{color:#6b8f6b;font-size:13px;margin-bottom:24px}
//       .badge{display:inline-block;padding:4px 14px;border-radius:20px;background:${sev.bg};color:${sev.color};border:1px solid ${sev.color}40;font-size:13px}
//       .grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:20px 0}
//       .cell{background:#f0fdf4;border-radius:8px;padding:16px;border:1px solid #bbf7d0}
//       .label{font-size:11px;text-transform:uppercase;color:#15803d;letter-spacing:0.1em;margin-bottom:4px}
//       img{max-width:280px;border-radius:12px;margin:16px 0;border:2px solid #bbf7d0;display:block}
//       .prob-row{display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid #f0fdf4;font-size:13px}
//       .bar-wrap{height:5px;background:#e0f2e9;border-radius:3px;margin-top:3px}
//       .bar{height:5px;background:#15803d;border-radius:3px}
//       footer{margin-top:40px;color:#6b8f6b;font-size:12px;text-align:center;border-top:1px solid #e0f2e9;padding-top:16px}
//     </style></head><body>
//     <h1>🍋 Citrus Disease Analysis Report</h1>
//     <div class="meta">Generated: ${new Date().toLocaleString()}</div>
//     <img src="${imageUrl}" alt="analyzed leaf"/>
//     <div class="grid">
//       <div class="cell"><div class="label">Disease</div><strong style="font-size:18px;color:#15803d">${result.predicted_class}</strong></div>
//       <div class="cell"><div class="label">Confidence</div><strong style="font-size:18px;color:#15803d">${result.confidence.toFixed(1)}%</strong></div>
//       <div class="cell"><div class="label">Severity</div><span class="badge">${sev.label}</span></div>
//       <div class="cell"><div class="label">Action</div>${result.disease_info.severity === "None" ? "No treatment needed" : "Treatment recommended"}</div>
//     </div>
//     <div class="cell" style="margin-bottom:12px"><div class="label">Description</div><p style="margin:4px 0;font-size:14px">${result.disease_info.description}</p></div>
//     <div class="cell"><div class="label">Recommended Treatment</div><p style="margin:4px 0;font-size:14px">${result.disease_info.treatment}</p></div>
//     <h3 style="margin-top:28px;color:#15803d">All Class Probabilities</h3>
//     ${Object.entries(result.all_probabilities).sort((a,b)=>b[1]-a[1]).map(([cls,prob])=>`
//       <div class="prob-row"><span>${cls}</span><strong>${prob.toFixed(1)}%</strong></div>
//       <div class="bar-wrap"><div class="bar" style="width:${prob}%"></div></div>
//     `).join("")}
//     <footer>Citrus Disease Detector &middot; AI-Powered Plant Health Analysis</footer>
//     </body></html>
//   `);
//   w.document.close();
//   setTimeout(() => w.print(), 500);
// }

// export default function App() {
//   const [image,    setImage]    = useState(null);
//   const [file,     setFile]     = useState(null);
//   const [result,   setResult]   = useState(null);
//   const [loading,  setLoading]  = useState(false);
//   const [error,    setError]    = useState(null);
//   const [camera,   setCamera]   = useState(false);
//   const [drag,     setDrag]     = useState(false);
//   const [theme,    setTheme]    = useState("dark");
//   const [history,  setHistory]  = useState(() => { try { return JSON.parse(localStorage.getItem("scanHistory") || "[]"); } catch { return []; } });
//   const [modal,    setModal]    = useState(null);
//   const [tab,      setTab]      = useState("scan");
//   const [shown,    setShown]    = useState(false);

//   const videoRef     = useRef(null);
//   const streamRef    = useRef(null);
//   const fileInputRef = useRef(null);

//   useEffect(() => { const t = setTimeout(() => setShown(true), 80); return () => clearTimeout(t); }, []);

//   const isDark = theme === "dark";

//   const C = {
//     bg:      isDark ? "#080d08"                      : "#f0fdf4",
//     card:    isDark ? "rgba(255,255,255,0.035)"      : "rgba(255,255,255,0.85)",
//     border:  isDark ? "rgba(74,222,128,0.13)"        : "rgba(21,128,61,0.18)",
//     text:    isDark ? "#e8f0e8"                      : "#1a2e1a",
//     muted:   isDark ? "#4a6b4a"                      : "#6b8f6b",
//     surface: isDark ? "rgba(255,255,255,0.04)"       : "rgba(0,0,0,0.04)",
//     nav:     isDark ? "rgba(8,13,8,0.88)"            : "rgba(240,253,244,0.88)",
//   };

//   const handleFile = (f) => {
//     if (!f || !f.type.startsWith("image/")) return;
//     setFile(f); setImage(URL.createObjectURL(f)); setResult(null); setError(null);
//   };

//   const openCamera = async () => {
//     setCamera(true); setResult(null); setError(null);
//     try {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//       streamRef.current = stream;
//       setTimeout(() => { if (videoRef.current) videoRef.current.srcObject = stream; }, 100);
//     } catch { setError("Camera access denied."); setCamera(false); }
//   };

//   const capturePhoto = useCallback(() => {
//     const c = document.createElement("canvas");
//     c.width = videoRef.current.videoWidth; c.height = videoRef.current.videoHeight;
//     c.getContext("2d").drawImage(videoRef.current, 0, 0);
//     c.toBlob(blob => handleFile(new File([blob], "capture.jpg", { type: "image/jpeg" })), "image/jpeg");
//     streamRef.current?.getTracks().forEach(t => t.stop());
//     setCamera(false);
//   }, []);

//   const predict = async () => {
//     if (!file) return;
//     setLoading(true); setError(null);
//     try {
//       const fd = new FormData(); fd.append("file", file);
//       const res = await fetch(`${API_URL}/predict`, { method: "POST", body: fd });
//       const data = await res.json();
//       setResult(data);
//       const entry = { id: Date.now(), timestamp: new Date().toLocaleString(), image, ...data };
//       const updated = [entry, ...history].slice(0, 20);
//       setHistory(updated);
//       try { localStorage.setItem("scanHistory", JSON.stringify(updated)); } catch {}
//     } catch { setError("Cannot connect to server. Make sure backend is running on port 8000."); }
//     finally { setLoading(false); }
//   };

//   const reset = () => {
//     setImage(null); setFile(null); setResult(null); setError(null);
//     streamRef.current?.getTracks().forEach(t => t.stop());
//     setCamera(false);
//   };

//   const totalScans = history.length;
//   const avgConf = totalScans ? Math.round(history.reduce((a, b) => a + b.confidence, 0) / totalScans) : 0;
//   const diseaseCounts = history.reduce((acc, h) => { acc[h.predicted_class] = (acc[h.predicted_class] || 0) + 1; return acc; }, {});
//   const chartData = Object.entries(diseaseColors).map(([label, color]) => ({ label, color, value: diseaseCounts[label] || 0 }));
//   const sev = result ? severityConfig[result.disease_info.severity] : null;
//   const sortedProbs = result ? Object.entries(result.all_probabilities).sort((a, b) => b[1] - a[1]) : [];

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700;800&family=Syne:wght@400;500;700&display=swap');
//         *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
//         html{scroll-behavior:smooth}
//         body{background:${C.bg};font-family:'Syne','DM Sans',sans-serif;color:${C.text};min-height:100vh;transition:background .4s,color .4s}
//         ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#4ade8030;border-radius:4px}

//         .orb{position:fixed;border-radius:50%;filter:blur(100px);pointer-events:none;z-index:0}
//         .o1{width:700px;height:700px;background:${isDark?"#16a34a":"#bbf7d0"};top:-300px;left:-300px;opacity:${isDark?.12:.45}}
//         .o2{width:500px;height:500px;background:${isDark?"#15803d":"#86efac"};bottom:-200px;right:-200px;opacity:${isDark?.1:.35}}
//         .o3{width:300px;height:300px;background:${isDark?"#84cc16":"#d9f99d"};top:50%;left:55%;opacity:${isDark?.07:.3}}

//         @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
//         @keyframes spin{to{transform:rotate(360deg)}}
//         @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
//         @keyframes pop{0%{opacity:0;transform:scale(.88)}100%{opacity:1;transform:scale(1)}}
//         @keyframes slideIn{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:translateX(0)}}
//         @keyframes glow{0%,100%{box-shadow:0 0 10px rgba(74,222,128,.2)}50%{box-shadow:0 0 24px rgba(74,222,128,.5)}}

//         .r0{animation:fadeUp .7s ease both}
//         .r1{animation:fadeUp .7s .1s ease both}
//         .r2{animation:fadeUp .7s .22s ease both}
//         .r3{animation:fadeUp .7s .38s ease both}
//         .pop-in{animation:pop .4s cubic-bezier(.34,1.56,.64,1) both}
//         .slide-in{animation:slideIn .3s ease both}

//         nav{position:sticky;top:0;z-index:100;backdrop-filter:blur(20px);background:${C.nav};border-bottom:1px solid ${C.border};padding:0 28px;display:flex;align-items:center;justify-content:space-between;height:62px}
//         .logo{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:800;color:#4ade80;letter-spacing:-.02em}
//         .tabs{display:flex;gap:3px}
//         .bottom-nav{display:none}
//         .tab-btn{padding:7px 16px;border-radius:100px;border:none;cursor:pointer;font-family:inherit;font-size:12px;font-weight:500;transition:all .2s;background:transparent;color:${C.muted};letter-spacing:.02em}
//         .tab-btn.on{background:rgba(74,222,128,.13);color:#4ade80;border:1px solid rgba(74,222,128,.25)}
//         .tab-btn:hover:not(.on){background:${C.surface};color:${C.text}}
//         .theme-btn{width:38px;height:38px;border-radius:50%;border:1px solid ${C.border};background:${C.surface};cursor:pointer;font-size:15px;display:flex;align-items:center;justify-content:center;transition:all .2s}
//         .theme-btn:hover{border-color:#4ade80;transform:rotate(20deg)}

//         .page{position:relative;z-index:1;max-width:1080px;margin:0 auto;padding:44px 22px 80px}

//         .hero{text-align:center;margin-bottom:56px}
//         .eyebrow{font-size:10px;letter-spacing:.35em;text-transform:uppercase;color:#4ade80;margin-bottom:18px;display:flex;align-items:center;justify-content:center;gap:14px}
//         .eyebrow::before,.eyebrow::after{content:'';display:block;width:44px;height:1px;background:linear-gradient(90deg,transparent,#4ade80)}
//         h1.big{font-family:'Cormorant Garamond',serif;font-size:clamp(50px,9vw,92px);font-weight:800;line-height:.95;letter-spacing:-.03em;color:${C.text}}
//         h1.big em{color:#4ade80;font-style:normal}
//         .hero-sub{margin-top:18px;font-size:15px;color:${C.muted};max-width:460px;margin-left:auto;margin-right:auto;line-height:1.65}

//         .stats-row{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-bottom:36px}
//         .stat-card{background:${C.card};border:1px solid ${C.border};border-radius:16px;padding:22px;text-align:center;backdrop-filter:blur(12px);transition:all .3s;cursor:default}
//         .stat-card:hover{border-color:rgba(74,222,128,.3);transform:translateY(-3px);box-shadow:0 16px 40px rgba(0,0,0,.2)}
//         .stat-num{font-family:'Cormorant Garamond',serif;font-size:38px;font-weight:800;color:#4ade80;line-height:1}
//         .stat-lbl{font-size:10px;text-transform:uppercase;letter-spacing:.15em;color:${C.muted};margin-top:5px}

//         .grid2{display:grid;grid-template-columns:1fr 1fr;gap:20px;align-items:start}
//         @media(max-width:720px){
//   .grid2{grid-template-columns:1fr}
//   .stats-row{grid-template-columns:1fr 1fr}
//   h1.big{font-size:46px}
//   .tabs{display:none}
//   .page{padding-bottom:88px}
//   .bottom-nav{display:grid!important}
// }

//         .card{background:${C.card};border:1px solid ${C.border};border-radius:20px;padding:28px;backdrop-filter:blur(20px);box-shadow:0 20px 56px rgba(0,0,0,${isDark?.38:.07}),inset 0 1px 0 rgba(255,255,255,${isDark?.05:.7})}
//         .card-title{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:700;color:${C.text};margin-bottom:18px;display:flex;align-items:center;gap:8px}

//         .upload-zone{border:1.5px dashed ${isDark?"rgba(74,222,128,.2)":"rgba(21,128,61,.3)"};border-radius:14px;padding:36px 18px;text-align:center;cursor:pointer;transition:all .3s;background:${isDark?"rgba(74,222,128,.02)":"rgba(21,128,61,.03)"}}
//         .upload-zone:hover,.upload-zone.drag{border-color:#4ade80;background:rgba(74,222,128,.06);transform:translateY(-2px)}
//         .upload-icon{width:56px;height:56px;margin:0 auto 14px;background:rgba(74,222,128,.1);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:24px;border:1px solid rgba(74,222,128,.2);transition:all .3s}
//         .upload-zone:hover .upload-icon{transform:scale(1.12) rotate(-8deg);box-shadow:0 0 20px rgba(74,222,128,.3);animation:glow 2s ease infinite}
//         .upload-title{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:700;color:${C.text};margin-bottom:5px}
//         .upload-sub{font-size:11px;color:${C.muted};margin-bottom:20px}

//         .btn-row{display:flex;gap:9px;justify-content:center;flex-wrap:wrap}
//         .btn{display:inline-flex;align-items:center;gap:7px;padding:9px 20px;border-radius:100px;border:none;font-family:inherit;font-size:12px;font-weight:500;cursor:pointer;transition:all .22s;letter-spacing:.02em;white-space:nowrap}
//         .btn-p{background:#4ade80;color:#0a0f0a}
//         .btn-p:hover{background:#22c55e;transform:translateY(-2px);box-shadow:0 8px 24px rgba(74,222,128,.35)}
//         .btn-o{background:transparent;color:${C.text};border:1px solid ${C.border}}
//         .btn-o:hover{border-color:#4ade80;color:#4ade80}
//         .btn-g{background:${C.surface};color:${C.muted};border:1px solid ${C.border}}
//         .btn-g:hover{color:${C.text}}
//         .btn-pdf{background:rgba(59,130,246,.13);color:#60a5fa;border:1px solid rgba(59,130,246,.25)}
//         .btn-pdf:hover{background:rgba(59,130,246,.22);box-shadow:0 0 14px rgba(59,130,246,.2)}
//         .btn-danger{background:rgba(239,68,68,.1);color:#f87171;border:1px solid rgba(239,68,68,.2)}
//         .btn-danger:hover{background:rgba(239,68,68,.2)}
//         .btn:disabled{opacity:.5;cursor:not-allowed;transform:none!important}

//         .preview-img{width:100%;max-height:240px;object-fit:contain;border-radius:12px;border:1px solid ${C.border};display:block;background:${isDark?"rgba(0,0,0,.3)":"rgba(0,0,0,.04)"};margin-bottom:14px}
//         .act-row{display:flex;gap:9px}.act-row .btn{flex:1;justify-content:center}
//         .video-el{width:100%;border-radius:12px;display:block;margin-bottom:12px;border:1px solid rgba(74,222,128,.2)}

//         .err-box{background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.2);border-radius:10px;padding:11px 14px;margin-bottom:14px;font-size:12px;color:#fca5a5;display:flex;gap:7px;align-items:center}

//         .divider{height:1px;background:${C.border};margin:20px 0}

//         .res-hdr{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:16px}
//         .res-lbl{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:${C.muted};margin-bottom:3px}
//         .res-name{font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:800;color:${C.text};line-height:1.1}
//         .sev-tag{display:inline-flex;align-items:center;gap:6px;padding:5px 13px;border-radius:100px;font-size:11px;font-weight:500;border:1px solid;margin-bottom:16px;letter-spacing:.04em}
//         .info-g{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:16px}
//         .info-c{background:${isDark?"rgba(255,255,255,.03)":"rgba(0,0,0,.03)"};border:1px solid ${C.border};border-radius:10px;padding:12px}
//         .info-lbl{font-size:9px;text-transform:uppercase;letter-spacing:.15em;color:${C.muted};margin-bottom:3px}
//         .info-txt{font-size:11px;color:${C.text};line-height:1.5;opacity:.85}

//         .prob-ttl{font-size:9px;text-transform:uppercase;letter-spacing:.2em;color:${C.muted};margin-bottom:10px}
//         .prob-row{margin-bottom:7px}
//         .prob-meta{display:flex;justify-content:space-between;margin-bottom:3px}
//         .prob-nm{font-size:11px;color:${C.muted}}.prob-nm.a{color:#4ade80;font-weight:600}
//         .prob-vl{font-size:11px;color:${C.muted}}.prob-vl.a{color:#4ade80;font-weight:600}
//         .prob-trk{height:3px;background:${isDark?"rgba(255,255,255,.06)":"rgba(0,0,0,.08)"};border-radius:100px;overflow:hidden}
//         .prob-fill{height:100%;border-radius:100px;background:rgba(74,222,128,.3);transition:width 1s cubic-bezier(.4,0,.2,1)}
//         .prob-fill.a{background:#4ade80;box-shadow:0 0 7px rgba(74,222,128,.5)}

//         .spinner{width:13px;height:13px;border:2px solid rgba(10,15,10,.3);border-top-color:#0a0f0a;border-radius:50%;animation:spin .7s linear infinite}
//         .pulsing{animation:pulse 1.2s ease infinite}

//         .h-empty{text-align:center;padding:56px 20px;color:${C.muted}}
//         .h-empty-icon{font-size:44px;margin-bottom:14px;opacity:.3}
//         .h-item{display:flex;align-items:center;gap:12px;padding:12px;background:${C.surface};border:1px solid ${C.border};border-radius:12px;margin-bottom:9px;cursor:pointer;transition:all .2s}
//         .h-item:hover{border-color:rgba(74,222,128,.3);transform:translateX(4px)}
//         .h-thumb{width:48px;height:48px;border-radius:8px;object-fit:cover;border:1px solid ${C.border};flex-shrink:0}
//         .h-dis{font-family:'Cormorant Garamond',serif;font-size:16px;font-weight:700;color:${C.text}}
//         .h-meta{font-size:10px;color:${C.muted};margin-top:2px}
//         .h-conf{font-size:13px;font-weight:700;color:#4ade80;white-space:nowrap}

//         .an-g{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px}
//         @media(max-width:580px){.an-g{grid-template-columns:1fr}}

//         .modal-ov{position:fixed;inset:0;z-index:200;background:rgba(0,0,0,.72);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:18px;animation:fadeIn .2s ease}
//         @keyframes fadeIn{from{opacity:0}to{opacity:1}}
//         .modal{background:${isDark?"#0d1a0d":"#f0fdf4"};border:1px solid ${C.border};border-radius:20px;padding:28px;max-width:480px;width:100%;max-height:82vh;overflow-y:auto;animation:pop .3s cubic-bezier(.34,1.56,.64,1)}
//         .modal-hdr{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px}
//         .modal-ttl{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:800;color:${C.text}}
//         .modal-x{width:30px;height:30px;border-radius:50%;border:1px solid ${C.border};background:${C.surface};cursor:pointer;font-size:14px;color:${C.muted};display:flex;align-items:center;justify-content:center;transition:all .2s}
//         .modal-x:hover{border-color:#ef4444;color:#ef4444}
//         .modal-sec{margin-bottom:18px}
//         .modal-sec-ttl{font-size:9px;text-transform:uppercase;letter-spacing:.2em;color:${C.muted};margin-bottom:7px}
//         .modal-txt{font-size:13px;color:${C.text};line-height:1.65;opacity:.85}
//         .modal-img{width:100%;border-radius:12px;margin-bottom:18px;border:1px solid ${C.border}}

//         .steps{display:flex;flex-direction:column}
//         .step{display:flex;gap:18px;padding:18px 0;border-bottom:1px solid ${C.border}}
//         .step:last-child{border-bottom:none}
//         .step-n{width:38px;height:38px;border-radius:50%;background:rgba(74,222,128,.1);border:1px solid rgba(74,222,128,.25);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:800;color:#4ade80;flex-shrink:0}
//         .step-t{font-size:14px;font-weight:600;color:${C.text};margin-bottom:3px}
//         .step-d{font-size:12px;color:${C.muted};line-height:1.5}
//         .kv-row{display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px solid ${C.border};font-size:12px}
//       `}</style>

//       <div className="orb o1" /><div className="orb o2" /><div className="orb o3" />

//       {/* Navbar */}
//       <nav>
//         <div className="logo">🍋 CitrusAI</div>
//         <div className="tabs">
//           {[["scan","🔬 Scan"],["history","📋 History"],["analytics","📊 Analytics"],["about","ℹ️ About"]].map(([key,label]) => (
//             <button key={key} className={`tab-btn${tab===key?" on":""}`} onClick={() => setTab(key)}>{label}</button>
//           ))}
//         </div>
//         <button className="theme-btn" onClick={() => setTheme(isDark?"light":"dark")}>{isDark?"☀️":"🌙"}</button>
//       </nav>

//       <div className="page">

//         {/* ── SCAN ── */}
//         {tab === "scan" && (
//           <>
//             <div className="hero r0">
//               <div className="eyebrow">AI-Powered Plant Diagnostics</div>
//               <h1 className="big">Citrus <em>Disease</em><br />Detector</h1>
//               <p className="hero-sub">Upload or capture a leaf photo for instant AI diagnosis, treatment advice & downloadable reports.</p>
//             </div>

//             <div className="stats-row r1">
//               {[
//                 { n: totalScans, s: "",  l: "Total Scans" },
//                 { n: avgConf,    s: "%", l: "Avg Confidence" },
//                 { n: 6,          s: "",  l: "Disease Classes" },
//               ].map((x, i) => (
//                 <div className="stat-card" key={i}>
//                   <div className="stat-num"><Counter target={x.n} suffix={x.s} /></div>
//                   <div className="stat-lbl">{x.l}</div>
//                 </div>
//               ))}
//             </div>

//             <div className="grid2 r2">
//               {/* Upload card */}
//               <div className="card">
//                 <div className="card-title">🍃 Upload Leaf</div>
//                 {error && <div className="err-box">⚠ {error}</div>}

//                 {camera && (
//                   <>
//                     <video ref={videoRef} autoPlay playsInline className="video-el" />
//                     <div className="btn-row">
//                       <button className="btn btn-p" onClick={capturePhoto}>📸 Capture</button>
//                       <button className="btn btn-g" onClick={reset}>Cancel</button>
//                     </div>
//                   </>
//                 )}

//                 {!image && !camera && (
//                   <div
//                     className={`upload-zone${drag?" drag":""}`}
//                     onDragOver={e=>{e.preventDefault();setDrag(true)}}
//                     onDragLeave={()=>setDrag(false)}
//                     onDrop={e=>{e.preventDefault();setDrag(false);handleFile(e.dataTransfer.files[0])}}
//                     onClick={()=>fileInputRef.current.click()}
//                   >
//                     <div className="upload-icon">🍃</div>
//                     <div className="upload-title">Drop leaf photo here</div>
//                     <div className="upload-sub">JPG · PNG · WEBP &nbsp;·&nbsp; Drag & drop or click</div>
//                     <div className="btn-row" onClick={e=>e.stopPropagation()}>
//                       <button className="btn btn-p" onClick={()=>fileInputRef.current.click()}>📁 Browse</button>
//                       <button className="btn btn-o" onClick={openCamera}>📷 Camera</button>
//                     </div>
//                     <input ref={fileInputRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>handleFile(e.target.files[0])} />
//                   </div>
//                 )}

//                 {image && !camera && (
//                   <>
//                     <img src={image} alt="preview" className="preview-img" />
//                     <div className="act-row">
//                       <button className="btn btn-p" onClick={predict} disabled={loading}>
//                         {loading?<><div className="spinner"/><span className="pulsing">Analyzing…</span></>:<><span>🔬</span>Analyze</>}
//                       </button>
//                       <button className="btn btn-g" onClick={reset}>✕ Reset</button>
//                     </div>
//                   </>
//                 )}
//               </div>

//               {/* Result card */}
//               <div className="card">
//                 <div className="card-title">📋 Results</div>
//                 {!result ? (
//                   <div style={{textAlign:"center",padding:"44px 20px",color:C.muted}}>
//                     <div style={{fontSize:"44px",marginBottom:"14px",opacity:.25}}>🔍</div>
//                     <div style={{fontSize:"13px"}}>Upload a leaf image and click Analyze</div>
//                   </div>
//                 ) : (
//                   <div className="pop-in">
//                     <div className="res-hdr">
//                       <div>
//                         <div className="res-lbl">Detected Disease</div>
//                         <div className="res-name">{result.predicted_class}</div>
//                       </div>
//                       <DonutChart value={result.confidence} color={sev.color} />
//                     </div>
//                     <div className="sev-tag" style={{color:sev.color,background:sev.bg,borderColor:sev.color+"40",boxShadow:sev.glow}}>
//                       {sev.label}
//                     </div>
//                     <div className="info-g">
//                       <div className="info-c"><div className="info-lbl">📋 Description</div><div className="info-txt">{result.disease_info.description}</div></div>
//                       <div className="info-c"><div className="info-lbl">💊 Treatment</div><div className="info-txt">{result.disease_info.treatment}</div></div>
//                     </div>
//                     <div className="prob-ttl">All Probabilities</div>
//                     {sortedProbs.map(([cls,prob])=>{
//                       const a=cls===result.predicted_class;
//                       return(
//                         <div className="prob-row" key={cls}>
//                           <div className="prob-meta">
//                             <span className={`prob-nm${a?" a":""}`}>{cls}</span>
//                             <span className={`prob-vl${a?" a":""}`}>{prob.toFixed(1)}%</span>
//                           </div>
//                           <div className="prob-trk"><div className={`prob-fill${a?" a":""}`} style={{width:`${prob}%`}}/></div>
//                         </div>
//                       );
//                     })}
//                     <div style={{display:"flex",gap:"8px",marginTop:"18px",flexWrap:"wrap"}}>
//                       <button className="btn btn-pdf" onClick={()=>generatePDF(result,image)}>📄 PDF Report</button>
//                       <button className="btn btn-o" onClick={()=>setModal({type:"detail",data:result,image})}>🔎 Full Details</button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </>
//         )}

//         {/* ── HISTORY ── */}
//         {tab==="history" && (
//           <div className="r0">
//             <div style={{marginBottom:"28px"}}>
//               <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"38px",fontWeight:800,color:C.text}}>Scan History</h2>
//               <p style={{color:C.muted,marginTop:"6px",fontSize:"13px"}}>{totalScans} scan{totalScans!==1?"s":""} recorded · stored locally</p>
//             </div>
//             {history.length===0?(
//               <div className="h-empty"><div className="h-empty-icon">📋</div><p>No scans yet — go to Scan tab to analyse your first leaf!</p></div>
//             ):(
//               <div style={{maxWidth:"680px"}}>
//                 {history.map((h,i)=>(
//                   <div key={h.id} className="h-item slide-in" style={{animationDelay:`${i*.04}s`}} onClick={()=>setModal({type:"history",data:h,image:h.image})}>
//                     <img src={h.image} className="h-thumb" alt={h.predicted_class} onError={e=>e.target.style.display="none"} />
//                     <div style={{flex:1,minWidth:0}}>
//                       <div className="h-dis">{h.predicted_class}</div>
//                       <div className="h-meta">{h.timestamp} · {h.disease_info?.severity||"—"}</div>
//                     </div>
//                     <div className="h-conf">{h.confidence.toFixed(1)}%</div>
//                     <div style={{color:C.muted,fontSize:"16px"}}>›</div>
//                   </div>
//                 ))}
//                 <button className="btn btn-danger" style={{marginTop:"14px"}} onClick={()=>{setHistory([]);try{localStorage.removeItem("scanHistory")}catch{}}}>
//                   🗑 Clear All History
//                 </button>
//               </div>
//             )}
//           </div>
//         )}

//         {/* ── ANALYTICS ── */}
//         {tab==="analytics" && (
//           <div className="r0">
//             <div style={{marginBottom:"28px"}}>
//               <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"38px",fontWeight:800,color:C.text}}>Analytics</h2>
//               <p style={{color:C.muted,marginTop:"6px",fontSize:"13px"}}>Visual breakdown of your {totalScans} scan{totalScans!==1?"s":""}</p>
//             </div>
//             <div className="an-g">
//               <div className="card">
//                 <div className="card-title">📊 Disease Distribution</div>
//                 {totalScans===0?<p style={{color:C.muted,fontSize:"12px"}}>No scans yet — analyse some leaves first!</p>:<BarChart data={chartData}/>}
//               </div>
//               <div className="card">
//                 <div className="card-title">🎯 Confidence</div>
//                 <div style={{display:"flex",alignItems:"center",gap:"20px"}}>
//                   <DonutChart value={avgConf} color="#4ade80" size={96}/>
//                   <div>
//                     <div style={{fontSize:"12px",color:C.muted,marginBottom:"6px"}}>Average across {totalScans} scan{totalScans!==1?"s":""}</div>
//                     <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"28px",fontWeight:800,color:"#4ade80"}}>{avgConf}%</div>
//                   </div>
//                 </div>
//               </div>
//               <div className="card" style={{gridColumn:"1/-1"}}>
//                 <div className="card-title">🌿 Per-Disease Breakdown</div>
//                 {totalScans===0?<p style={{color:C.muted,fontSize:"12px"}}>No data yet.</p>:
//                   Object.entries(diseaseColors).map(([cls,color])=>{
//                     const count=diseaseCounts[cls]||0;
//                     const pct=totalScans?(count/totalScans)*100:0;
//                     return(
//                       <div className="prob-row" key={cls} style={{marginBottom:"12px"}}>
//                         <div className="prob-meta">
//                           <span style={{fontSize:"13px",color,fontWeight:500}}>{cls}</span>
//                           <span style={{fontSize:"11px",color:C.muted}}>{count} scan{count!==1?"s":""} · {pct.toFixed(0)}%</span>
//                         </div>
//                         <div className="prob-trk" style={{height:"5px"}}>
//                           <div style={{height:"100%",width:`${pct}%`,background:color,borderRadius:"100px",transition:"width 1s ease",boxShadow:`0 0 8px ${color}60`}}/>
//                         </div>
//                       </div>
//                     );
//                   })
//                 }
//               </div>
//               <div className="card" style={{gridColumn:"1/-1"}}>
//                 <div className="card-title">📈 Confidence Timeline</div>
//                 {history.length<2?<p style={{color:C.muted,fontSize:"12px"}}>Need at least 2 scans to show timeline.</p>:(
//                   <div style={{overflowX:"auto"}}>
//                     <svg viewBox={`0 0 ${Math.max(history.length*56,300)} 90`} style={{width:"100%",minWidth:"300px",overflow:"visible"}}>
//                       <defs>
//                         <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
//                           <stop offset="0%" stopColor="#4ade80" stopOpacity="0.28"/>
//                           <stop offset="100%" stopColor="#4ade80" stopOpacity="0"/>
//                         </linearGradient>
//                       </defs>
//                       <path
//                         d={[...history].reverse().map((h,i)=>{const x=i*56+28,y=78-(h.confidence/100)*65;return`${i===0?"M":"L"}${x} ${y}`}).join(" ")+` L ${(history.length-1)*56+28} 78 L 28 78 Z`}
//                         fill="url(#lg)"
//                       />
//                       <polyline
//                         points={[...history].reverse().map((h,i)=>`${i*56+28},${78-(h.confidence/100)*65}`).join(" ")}
//                         fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
//                         style={{filter:"drop-shadow(0 0 4px rgba(74,222,128,.6))"}}
//                       />
//                       {[...history].reverse().map((h,i)=>(
//                         <circle key={i} cx={i*56+28} cy={78-(h.confidence/100)*65} r="4"
//                           fill="#4ade80" stroke={isDark?"#080d08":"#f0fdf4"} strokeWidth="2"
//                           style={{filter:"drop-shadow(0 0 4px rgba(74,222,128,.8))"}}/>
//                       ))}
//                     </svg>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* ── ABOUT ── */}
//         {tab==="about" && (
//           <div className="r0" style={{maxWidth:"680px"}}>
//             <div style={{marginBottom:"28px"}}>
//               <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"38px",fontWeight:800,color:C.text}}>About CitrusAI</h2>
//               <p style={{color:C.muted,marginTop:"6px",fontSize:"13px"}}>How it works · diseases detected · model info</p>
//             </div>
//             <div className="card" style={{marginBottom:"16px"}}>
//               <div className="card-title">⚙️ How It Works</div>
//               <div className="steps">
//                 {[["1","Upload a Photo","Take a clear photo of a citrus leaf or upload one from your device."],
//                   ["2","AI Analysis","Our MobileNetV2 model analyses the image, trained on ~20k citrus disease samples."],
//                   ["3","Get Results","Receive instant diagnosis with disease name, confidence, severity & treatment advice."],
//                   ["4","Download Report","Export a full PDF report for records or consultation with an agronomist."],
//                 ].map(([n,t2,d])=>(
//                   <div className="step" key={n}>
//                     <div className="step-n">{n}</div>
//                     <div><div className="step-t">{t2}</div><div className="step-d">{d}</div></div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//             <div className="card" style={{marginBottom:"16px"}}>
//               <div className="card-title">🦠 Detectable Diseases</div>
//               {Object.entries(diseaseColors).map(([cls,color])=>(
//                 <div key={cls} style={{display:"flex",alignItems:"center",gap:"11px",padding:"9px 0",borderBottom:`1px solid ${C.border}`}}>
//                   <div style={{width:"9px",height:"9px",borderRadius:"50%",background:color,boxShadow:`0 0 7px ${color}`,flexShrink:0}}/>
//                   <span style={{fontSize:"13px",color:C.text,fontWeight:500}}>{cls}</span>
//                 </div>
//               ))}
//             </div>
//             <div className="card">
//               <div className="card-title">🤖 Model Details</div>
//               {[["Architecture","MobileNetV2 + Custom Head"],["Dataset","~19,688 citrus leaf images"],["Input Size","160 × 160 px"],["Classes","6 disease categories"],["Framework","TensorFlow / Keras"],["Backend","FastAPI (Python)"]].map(([k,v])=>(
//                 <div className="kv-row" key={k}>
//                   <span style={{color:C.muted}}>{k}</span>
//                   <span style={{color:C.text,fontWeight:500}}>{v}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Modal */}
//       {modal && (
//         <div className="modal-ov" onClick={()=>setModal(null)}>
//           <div className="modal" onClick={e=>e.stopPropagation()}>
//             <div className="modal-hdr">
//               <div className="modal-ttl">{modal.data.predicted_class}</div>
//               <button className="modal-x" onClick={()=>setModal(null)}>✕</button>
//             </div>
//             {modal.image && <img src={modal.image} alt="leaf" className="modal-img" onError={e=>e.target.style.display="none"}/>}
//             <div className="modal-sec">
//               <div className="modal-sec-ttl">Confidence</div>
//               <div style={{display:"flex",alignItems:"center",gap:"14px"}}>
//                 <DonutChart value={modal.data.confidence} color={severityConfig[modal.data.disease_info?.severity||"None"].color} size={76}/>
//                 <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"30px",fontWeight:800,color:"#4ade80"}}>{modal.data.confidence.toFixed(1)}%</div>
//               </div>
//             </div>
//             <div className="modal-sec"><div className="modal-sec-ttl">Description</div><div className="modal-txt">{modal.data.disease_info?.description}</div></div>
//             <div className="modal-sec"><div className="modal-sec-ttl">Treatment</div><div className="modal-txt">{modal.data.disease_info?.treatment}</div></div>
//             <div className="modal-sec">
//               <div className="modal-sec-ttl">All Probabilities</div>
//               {Object.entries(modal.data.all_probabilities).sort((a,b)=>b[1]-a[1]).map(([cls,prob])=>(
//                 <div className="prob-row" key={cls}>
//                   <div className="prob-meta">
//                     <span style={{fontSize:"12px",color:cls===modal.data.predicted_class?"#4ade80":C.muted}}>{cls}</span>
//                     <span style={{fontSize:"11px",color:C.muted}}>{prob.toFixed(1)}%</span>
//                   </div>
//                   <div className="prob-trk"><div className={`prob-fill${cls===modal.data.predicted_class?" a":""}`} style={{width:`${prob}%`}}/></div>
//                 </div>
//               ))}
//             </div>
//             {modal.image&&(
//               <button className="btn btn-pdf" style={{width:"100%",justifyContent:"center"}} onClick={()=>generatePDF(modal.data,modal.image)}>
//                 📄 Download PDF Report
//               </button>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
import { useCallback, useEffect, useRef, useState } from "react";

const API_URL = "http://localhost:8000";

const severityConfig = {
  None:     { color: "#22c55e", bg: "rgba(34,197,94,0.15)",   label: "✦ Healthy",   glow: "0 0 20px rgba(34,197,94,0.4)" },
  Low:      { color: "#eab308", bg: "rgba(234,179,8,0.15)",   label: "▲ Low Risk",  glow: "0 0 20px rgba(234,179,8,0.4)" },
  Medium:   { color: "#f97316", bg: "rgba(249,115,22,0.15)",  label: "◆ Moderate",  glow: "0 0 20px rgba(249,115,22,0.4)" },
  High:     { color: "#ef4444", bg: "rgba(239,68,68,0.15)",   label: "● High Risk", glow: "0 0 20px rgba(239,68,68,0.4)" },
  Critical: { color: "#a855f7", bg: "rgba(168,85,247,0.15)",  label: "⬟ Critical",  glow: "0 0 20px rgba(168,85,247,0.4)" },
};

const diseaseColors = {
  Canker: "#ef4444", Greening: "#a855f7", Gummosis: "#f97316",
  Healthy: "#22c55e", "Leaf-miner": "#eab308", "Lemon-butterfly": "#3b82f6"
};

// ── Farmer carousel slides ─────────────────────────────────────────────
const CAROUSEL_SLIDES = [
  {
    url: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1400&h=500&fit=crop&q=80",
    title: "Protect Your Citrus Harvest",
    subtitle: "Early detection saves crops. Upload a leaf photo for instant AI diagnosis.",
    tag: "Field Monitoring"
  },
  {
    url: "https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=1400&h=500&fit=crop&q=80",
    title: "AI-Powered Agriculture",
    subtitle: "Trusted by farmers across the region for accurate disease identification.",
    tag: "Smart Farming"
  },
  {
    url: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1400&h=500&fit=crop&q=80",
    title: "Scan. Detect. Treat.",
    subtitle: "Get disease name, severity level and treatment advice in seconds.",
    tag: "Instant Results"
  },
  {
    url: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1400&h=500&fit=crop&q=80",
    title: "Healthier Crops, Better Yield",
    subtitle: "Monitor your orchard health and keep records of every scan.",
    tag: "Crop Health"
  },
];

// ── Carousel component ─────────────────────────────────────────────────
function HeroCarousel({ isDark }) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef(null);

  const goTo = (idx) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 300);
  };

  const next = useCallback(() => goTo((current + 1) % CAROUSEL_SLIDES.length), [current, animating]);
  const prev = () => goTo((current - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);

  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [next]);

  const slide = CAROUSEL_SLIDES[current];

  return (
    <div style={{
      position: "relative", width: "100%", height: "320px",
      borderRadius: "20px", overflow: "hidden",
      marginBottom: "40px",
      boxShadow: isDark ? "0 24px 64px rgba(0,0,0,.6)" : "0 24px 64px rgba(0,0,0,.18)",
    }}>
      {/* Background image */}
      <img
        src={slide.url}
        alt={slide.title}
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", display: "block",
          filter: isDark ? "brightness(0.42) saturate(0.85)" : "brightness(0.52) saturate(0.9)",
          transition: "opacity 0.4s ease",
          opacity: animating ? 0 : 1,
        }}
        onError={e => { e.target.style.display = "none"; }}
      />

      {/* Gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 60%, rgba(0,0,0,0.0) 100%)",
      }} />

      {/* Green tint overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: isDark
          ? "linear-gradient(135deg, rgba(8,13,8,0.5) 0%, transparent 60%)"
          : "linear-gradient(135deg, rgba(15,40,15,0.45) 0%, transparent 60%)",
      }} />

      {/* Content */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "36px 48px",
        opacity: animating ? 0 : 1,
        transform: animating ? "translateY(8px)" : "translateY(0)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}>
        {/* Tag badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: "7px",
          background: "rgba(74,222,128,0.18)", backdropFilter: "blur(8px)",
          border: "1px solid rgba(74,222,128,0.4)",
          borderRadius: "100px", padding: "4px 14px",
          fontSize: "10px", color: "#4ade80", letterSpacing: "0.2em",
          textTransform: "uppercase", fontWeight: 600,
          width: "fit-content", marginBottom: "16px",
        }}>
          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 6px #4ade80", animation: "cPulse 1.5s ease infinite" }} />
          {slide.tag}
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(24px, 4vw, 40px)",
          fontWeight: 800, color: "#fff",
          lineHeight: 1.1, marginBottom: "12px",
          letterSpacing: "-0.02em",
          textShadow: "0 2px 12px rgba(0,0,0,0.4)",
          maxWidth: "520px",
        }}>{slide.title}</h2>

        {/* Subtitle */}
        <p style={{
          fontSize: "14px", color: "rgba(255,255,255,0.78)",
          lineHeight: 1.6, maxWidth: "400px",
          textShadow: "0 1px 6px rgba(0,0,0,0.4)",
        }}>{slide.subtitle}</p>
      </div>

      {/* Prev / Next arrows */}
      {["prev","next"].map(dir => (
        <button key={dir} onClick={dir==="prev"?prev:next} style={{
          position: "absolute", top: "50%", transform: "translateY(-50%)",
          [dir==="prev"?"left":"right"]: "16px",
          width: "36px", height: "36px", borderRadius: "50%",
          background: "rgba(0,0,0,0.45)", backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "#fff", fontSize: "16px", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all .2s", zIndex: 10,
        }}
          onMouseEnter={e => { e.currentTarget.style.background="rgba(74,222,128,0.3)"; e.currentTarget.style.borderColor="rgba(74,222,128,0.5)"; }}
          onMouseLeave={e => { e.currentTarget.style.background="rgba(0,0,0,0.45)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.15)"; }}
        >
          {dir==="prev" ? "‹" : "›"}
        </button>
      ))}

      {/* Dot indicators */}
      <div style={{
        position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)",
        display: "flex", gap: "8px", zIndex: 10,
      }}>
        {CAROUSEL_SLIDES.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{
            width: i === current ? "24px" : "7px",
            height: "7px", borderRadius: "100px",
            background: i === current ? "#4ade80" : "rgba(255,255,255,0.35)",
            border: "none", cursor: "pointer", padding: 0,
            transition: "all 0.35s ease",
            boxShadow: i === current ? "0 0 8px rgba(74,222,128,0.7)" : "none",
          }} />
        ))}
      </div>

      {/* Slide counter */}
      <div style={{
        position: "absolute", top: "16px", right: "16px",
        background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: "100px", padding: "4px 12px",
        fontSize: "11px", color: "rgba(255,255,255,0.7)",
        zIndex: 10,
      }}>
        {current + 1} / {CAROUSEL_SLIDES.length}
      </div>
    </div>
  );
}

function Counter({ target, suffix = "", duration = 1500 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setVal(target); clearInterval(timer); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target]);
  return <span>{val}{suffix}</span>;
}

function BarChart({ data }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "6px", height: "90px", paddingTop: "8px" }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
          <div style={{
            width: "100%", height: `${Math.max((d.value / max) * 70, 4)}px`,
            background: d.color, borderRadius: "4px 4px 0 0",
            transition: "height 0.8s cubic-bezier(0.4,0,0.2,1)",
            boxShadow: `0 0 8px ${d.color}60`
          }} />
          <div style={{ fontSize: "8px", color: "#4a6b4a", textAlign: "center" }}>
            {d.label.split("-")[0]}
          </div>
        </div>
      ))}
    </div>
  );
}

function DonutChart({ value, color, size = 80 }) {
  const r = 30, cx = 40, cy = 40;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <svg width={size} height={size} viewBox="0 0 80 80">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth="8"
        strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
        transform="rotate(-90 40 40)"
        style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)", filter: `drop-shadow(0 0 6px ${color})` }}
      />
      <text x={cx} y={cy + 5} textAnchor="middle" fill={color} fontSize="13" fontWeight="700" fontFamily="Georgia,serif">
        {Math.round(value)}%
      </text>
    </svg>
  );
}

function generatePDF(result, imageUrl) {
  const w = window.open("", "_blank");
  const sev = severityConfig[result.disease_info.severity];
  w.document.write(`
    <html><head><title>Citrus Disease Report</title>
    <style>
      body{font-family:Georgia,serif;max-width:700px;margin:40px auto;color:#1a2e1a;padding:0 20px}
      h1{color:#15803d;font-size:28px;border-bottom:3px solid #15803d;padding-bottom:12px;margin-bottom:8px}
      .meta{color:#6b8f6b;font-size:13px;margin-bottom:24px}
      .badge{display:inline-block;padding:4px 14px;border-radius:20px;background:${sev.bg};color:${sev.color};border:1px solid ${sev.color}40;font-size:13px}
      .grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:20px 0}
      .cell{background:#f0fdf4;border-radius:8px;padding:16px;border:1px solid #bbf7d0}
      .label{font-size:11px;text-transform:uppercase;color:#15803d;letter-spacing:0.1em;margin-bottom:4px}
      img{max-width:280px;border-radius:12px;margin:16px 0;border:2px solid #bbf7d0;display:block}
      .prob-row{display:flex;justify-content:space-between;align-items:center;padding:7px 0;border-bottom:1px solid #f0fdf4;font-size:13px}
      .bar-wrap{height:5px;background:#e0f2e9;border-radius:3px;margin-top:3px}
      .bar{height:5px;background:#15803d;border-radius:3px}
      footer{margin-top:40px;color:#6b8f6b;font-size:12px;text-align:center;border-top:1px solid #e0f2e9;padding-top:16px}
    </style></head><body>
    <h1>🍋 Citrus Disease Analysis Report</h1>
    <div class="meta">Generated: ${new Date().toLocaleString()}</div>
    <img src="${imageUrl}" alt="analyzed leaf"/>
    <div class="grid">
      <div class="cell"><div class="label">Disease</div><strong style="font-size:18px;color:#15803d">${result.predicted_class}</strong></div>
      <div class="cell"><div class="label">Confidence</div><strong style="font-size:18px;color:#15803d">${result.confidence.toFixed(1)}%</strong></div>
      <div class="cell"><div class="label">Severity</div><span class="badge">${sev.label}</span></div>
      <div class="cell"><div class="label">Action</div>${result.disease_info.severity === "None" ? "No treatment needed" : "Treatment recommended"}</div>
    </div>
    <div class="cell" style="margin-bottom:12px"><div class="label">Description</div><p style="margin:4px 0;font-size:14px">${result.disease_info.description}</p></div>
    <div class="cell"><div class="label">Treatment</div><p style="margin:4px 0;font-size:14px">${result.disease_info.treatment}</p></div>
    <h3 style="margin-top:28px;color:#15803d">All Class Probabilities</h3>
    ${Object.entries(result.all_probabilities).sort((a,b)=>b[1]-a[1]).map(([cls,prob])=>`
      <div class="prob-row"><span>${cls}</span><strong>${prob.toFixed(1)}%</strong></div>
      <div class="bar-wrap"><div class="bar" style="width:${prob}%"></div></div>
    `).join("")}
    <footer>Citrus Disease Detector · AI-Powered Plant Health Analysis</footer>
    </body></html>
  `);
  w.document.close();
  setTimeout(() => w.print(), 500);
}

export default function App() {
  const [image,   setImage]   = useState(null);
  const [file,    setFile]    = useState(null);
  const [result,  setResult]  = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);
  const [camera,  setCamera]  = useState(false);
  const [drag,    setDrag]    = useState(false);
  const [theme,   setTheme]   = useState("dark");
  const [history, setHistory] = useState(() => { try { return JSON.parse(localStorage.getItem("scanHistory") || "[]"); } catch { return []; } });
  const [modal,   setModal]   = useState(null);
  const [tab,     setTab]     = useState("scan");

  const videoRef     = useRef(null);
  const streamRef    = useRef(null);
  const fileInputRef = useRef(null);

  const isDark = theme === "dark";
  const C = {
    bg:      isDark ? "#080d08"                 : "#f0fdf4",
    card:    isDark ? "rgba(255,255,255,0.035)" : "rgba(255,255,255,0.85)",
    border:  isDark ? "rgba(74,222,128,0.13)"   : "rgba(21,128,61,0.18)",
    text:    isDark ? "#e8f0e8"                 : "#1a2e1a",
    muted:   isDark ? "#4a6b4a"                 : "#6b8f6b",
    surface: isDark ? "rgba(255,255,255,0.04)"  : "rgba(0,0,0,0.04)",
    nav:     isDark ? "rgba(8,13,8,0.92)"       : "rgba(240,253,244,0.92)",
  };

  const handleFile = (f) => {
    if (!f || !f.type.startsWith("image/")) return;
    setFile(f); setImage(URL.createObjectURL(f)); setResult(null); setError(null);
  };

  const openCamera = async () => {
    setCamera(true); setResult(null); setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      setTimeout(() => { if (videoRef.current) videoRef.current.srcObject = stream; }, 100);
    } catch { setError("Camera access denied."); setCamera(false); }
  };

  const capturePhoto = useCallback(() => {
    const c = document.createElement("canvas");
    c.width = videoRef.current.videoWidth; c.height = videoRef.current.videoHeight;
    c.getContext("2d").drawImage(videoRef.current, 0, 0);
    c.toBlob(blob => handleFile(new File([blob], "capture.jpg", { type: "image/jpeg" })), "image/jpeg");
    streamRef.current?.getTracks().forEach(t => t.stop());
    setCamera(false);
  }, []);

  const predict = async () => {
    if (!file) return;
    setLoading(true); setError(null);
    try {
      const fd = new FormData(); fd.append("file", file);
      const res = await fetch(`${API_URL}/predict`, { method: "POST", body: fd });
      const data = await res.json();
      setResult(data);
      const entry = { id: Date.now(), timestamp: new Date().toLocaleString(), image, ...data };
      const updated = [entry, ...history].slice(0, 20);
      setHistory(updated);
      try { localStorage.setItem("scanHistory", JSON.stringify(updated)); } catch {}
    } catch { setError("Cannot connect to server. Make sure backend is running on port 8000."); }
    finally { setLoading(false); }
  };

  const reset = () => {
    setImage(null); setFile(null); setResult(null); setError(null);
    streamRef.current?.getTracks().forEach(t => t.stop());
    setCamera(false);
  };

  const totalScans  = history.length;
  const avgConf     = totalScans ? Math.round(history.reduce((a, b) => a + b.confidence, 0) / totalScans) : 0;
  const diseaseCounts = history.reduce((acc, h) => { acc[h.predicted_class] = (acc[h.predicted_class] || 0) + 1; return acc; }, {});
  const chartData   = Object.entries(diseaseColors).map(([label, color]) => ({ label, color, value: diseaseCounts[label] || 0 }));
  const sev         = result ? severityConfig[result.disease_info.severity] : null;
  const sortedProbs = result ? Object.entries(result.all_probabilities).sort((a, b) => b[1] - a[1]) : [];

  const NAV_ITEMS = [["scan","🔬","Scan"],["history","📋","History"],["analytics","📊","Stats"],["about","ℹ️","About"]];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700;800&family=Syne:wght@400;500;700&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{background:${C.bg};font-family:'Syne','DM Sans',sans-serif;color:${C.text};min-height:100vh;transition:background .4s,color .4s}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:#4ade8030;border-radius:4px}

        .orb{position:fixed;border-radius:50%;filter:blur(100px);pointer-events:none;z-index:0}
        .o1{width:700px;height:700px;background:${isDark?"#16a34a":"#bbf7d0"};top:-300px;left:-300px;opacity:${isDark?.12:.45}}
        .o2{width:500px;height:500px;background:${isDark?"#15803d":"#86efac"};bottom:-200px;right:-200px;opacity:${isDark?.1:.35}}
        .o3{width:300px;height:300px;background:${isDark?"#84cc16":"#d9f99d"};top:50%;left:55%;opacity:${isDark?.07:.3}}

        @keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
        @keyframes cPulse{0%,100%{opacity:1;box-shadow:0 0 6px #4ade80}50%{opacity:.6;box-shadow:0 0 12px #4ade80}}
        @keyframes pop{0%{opacity:0;transform:scale(.88)}100%{opacity:1;transform:scale(1)}}
        @keyframes slideIn{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:translateX(0)}}
        @keyframes glow{0%,100%{box-shadow:0 0 10px rgba(74,222,128,.2)}50%{box-shadow:0 0 24px rgba(74,222,128,.5)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}

        .r0{animation:fadeUp .7s ease both}
        .r1{animation:fadeUp .7s .12s ease both}
        .r2{animation:fadeUp .7s .24s ease both}
        .pop-in{animation:pop .4s cubic-bezier(.34,1.56,.64,1) both}
        .slide-in{animation:slideIn .3s ease both}
        .pulsing{animation:pulse 1.2s ease infinite}

        /* Topbar */
        .topbar{position:sticky;top:0;z-index:100;backdrop-filter:blur(20px);background:${C.nav};border-bottom:1px solid ${C.border};padding:0 24px;display:flex;align-items:center;justify-content:space-between;height:60px}
        .logo{font-family:'Cormorant Garamond',serif;font-size:21px;font-weight:800;color:#4ade80;letter-spacing:-.02em}
        .desktop-tabs{display:flex;gap:3px}
        .tab-btn{padding:7px 15px;border-radius:100px;border:none;cursor:pointer;font-family:inherit;font-size:12px;font-weight:500;transition:all .2s;background:transparent;color:${C.muted};letter-spacing:.02em}
        .tab-btn.on{background:rgba(74,222,128,.13);color:#4ade80;border:1px solid rgba(74,222,128,.25)}
        .tab-btn:hover:not(.on){background:${C.surface};color:${C.text}}
        .theme-btn{width:36px;height:36px;border-radius:50%;border:1px solid ${C.border};background:${C.surface};cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0}
        .theme-btn:hover{border-color:#4ade80;transform:rotate(20deg)}

        /* Mobile bottom nav */
        .bottom-nav{display:none;position:fixed;bottom:0;left:0;right:0;z-index:100;backdrop-filter:blur(20px);background:${C.nav};border-top:1px solid ${C.border};padding:6px 0 10px}
        .bnav-inner{display:grid;grid-template-columns:repeat(4,1fr)}
        .bnav-btn{display:flex;flex-direction:column;align-items:center;gap:3px;background:transparent;border:none;cursor:pointer;padding:6px 4px;font-family:inherit;font-size:10px;font-weight:500;transition:all .2s}

        /* Page */
        .page{position:relative;z-index:1;max-width:1080px;margin:0 auto;padding:32px 20px 80px}

        /* Hero text */
        .hero{text-align:center;margin-bottom:32px}
        .eyebrow{font-size:10px;letter-spacing:.35em;text-transform:uppercase;color:#4ade80;margin-bottom:14px;display:flex;align-items:center;justify-content:center;gap:14px}
        .eyebrow::before,.eyebrow::after{content:'';display:block;width:40px;height:1px;background:linear-gradient(90deg,transparent,#4ade80)}
        h1.big{font-family:'Cormorant Garamond',serif;font-size:clamp(40px,8vw,82px);font-weight:800;line-height:.95;letter-spacing:-.03em;color:${C.text}}
        h1.big em{color:#4ade80;font-style:normal}
        .hero-sub{margin-top:14px;font-size:14px;color:${C.muted};max-width:420px;margin-left:auto;margin-right:auto;line-height:1.65}

        /* Stats */
        .stats-row{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:32px}
        .stat-card{background:${C.card};border:1px solid ${C.border};border-radius:16px;padding:20px;text-align:center;backdrop-filter:blur(12px);transition:all .3s}
        .stat-card:hover{border-color:rgba(74,222,128,.3);transform:translateY(-3px);box-shadow:0 16px 40px rgba(0,0,0,.2)}
        .stat-num{font-family:'Cormorant Garamond',serif;font-size:36px;font-weight:800;color:#4ade80;line-height:1}
        .stat-lbl{font-size:10px;text-transform:uppercase;letter-spacing:.15em;color:${C.muted};margin-top:4px}

        /* Grids */
        .grid2{display:grid;grid-template-columns:1fr 1fr;gap:18px;align-items:start}
        .an-g{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px}

        /* Card */
        .card{background:${C.card};border:1px solid ${C.border};border-radius:20px;padding:26px;backdrop-filter:blur(20px);box-shadow:0 20px 56px rgba(0,0,0,${isDark?.38:.07}),inset 0 1px 0 rgba(255,255,255,${isDark?.05:.7})}
        .card-title{font-family:'Cormorant Garamond',serif;font-size:19px;font-weight:700;color:${C.text};margin-bottom:16px;display:flex;align-items:center;gap:8px}

        /* Upload */
        .upload-zone{border:1.5px dashed ${isDark?"rgba(74,222,128,.2)":"rgba(21,128,61,.3)"};border-radius:14px;padding:34px 16px;text-align:center;cursor:pointer;transition:all .3s;background:${isDark?"rgba(74,222,128,.02)":"rgba(21,128,61,.03)"}}
        .upload-zone:hover,.upload-zone.drag{border-color:#4ade80;background:rgba(74,222,128,.06);transform:translateY(-2px)}
        .upload-icon{width:54px;height:54px;margin:0 auto 13px;background:rgba(74,222,128,.1);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:23px;border:1px solid rgba(74,222,128,.2);transition:all .3s}
        .upload-zone:hover .upload-icon{transform:scale(1.12) rotate(-8deg);box-shadow:0 0 20px rgba(74,222,128,.3);animation:glow 2s ease infinite}
        .upload-title{font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:700;color:${C.text};margin-bottom:4px}
        .upload-sub{font-size:11px;color:${C.muted};margin-bottom:18px}

        /* Buttons */
        .btn-row{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}
        .btn{display:inline-flex;align-items:center;gap:7px;padding:9px 19px;border-radius:100px;border:none;font-family:inherit;font-size:12px;font-weight:500;cursor:pointer;transition:all .22s;letter-spacing:.02em;white-space:nowrap}
        .btn-p{background:#4ade80;color:#0a0f0a}.btn-p:hover{background:#22c55e;transform:translateY(-2px);box-shadow:0 8px 22px rgba(74,222,128,.35)}
        .btn-o{background:transparent;color:${C.text};border:1px solid ${C.border}}.btn-o:hover{border-color:#4ade80;color:#4ade80}
        .btn-g{background:${C.surface};color:${C.muted};border:1px solid ${C.border}}.btn-g:hover{color:${C.text}}
        .btn-pdf{background:rgba(59,130,246,.13);color:#60a5fa;border:1px solid rgba(59,130,246,.25)}.btn-pdf:hover{background:rgba(59,130,246,.22)}
        .btn-danger{background:rgba(239,68,68,.1);color:#f87171;border:1px solid rgba(239,68,68,.2)}.btn-danger:hover{background:rgba(239,68,68,.2)}
        .btn:disabled{opacity:.5;cursor:not-allowed;transform:none!important}

        /* Preview */
        .preview-img{width:100%;max-height:230px;object-fit:contain;border-radius:12px;border:1px solid ${C.border};display:block;background:${isDark?"rgba(0,0,0,.3)":"rgba(0,0,0,.04)"};margin-bottom:13px}
        .act-row{display:flex;gap:8px}.act-row .btn{flex:1;justify-content:center}
        .video-el{width:100%;border-radius:12px;display:block;margin-bottom:12px;border:1px solid rgba(74,222,128,.2)}
        .err-box{background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.2);border-radius:10px;padding:10px 13px;margin-bottom:13px;font-size:12px;color:#fca5a5;display:flex;gap:7px;align-items:center}

        /* Results */
        .res-hdr{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:14px}
        .res-lbl{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:${C.muted};margin-bottom:3px}
        .res-name{font-family:'Cormorant Garamond',serif;font-size:30px;font-weight:800;color:${C.text};line-height:1.1}
        .sev-tag{display:inline-flex;align-items:center;gap:6px;padding:5px 12px;border-radius:100px;font-size:11px;font-weight:500;border:1px solid;margin-bottom:14px}
        .info-g{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px}
        .info-c{background:${isDark?"rgba(255,255,255,.03)":"rgba(0,0,0,.03)"};border:1px solid ${C.border};border-radius:10px;padding:11px}
        .info-lbl{font-size:9px;text-transform:uppercase;letter-spacing:.15em;color:${C.muted};margin-bottom:3px}
        .info-txt{font-size:11px;color:${C.text};line-height:1.5;opacity:.85}
        .prob-ttl{font-size:9px;text-transform:uppercase;letter-spacing:.2em;color:${C.muted};margin-bottom:9px}
        .prob-row{margin-bottom:7px}
        .prob-meta{display:flex;justify-content:space-between;margin-bottom:3px}
        .prob-nm{font-size:11px;color:${C.muted}}.prob-nm.a{color:#4ade80;font-weight:600}
        .prob-vl{font-size:11px;color:${C.muted}}.prob-vl.a{color:#4ade80;font-weight:600}
        .prob-trk{height:3px;background:${isDark?"rgba(255,255,255,.06)":"rgba(0,0,0,.08)"};border-radius:100px;overflow:hidden}
        .prob-fill{height:100%;border-radius:100px;background:rgba(74,222,128,.3);transition:width 1s cubic-bezier(.4,0,.2,1)}
        .prob-fill.a{background:#4ade80;box-shadow:0 0 7px rgba(74,222,128,.5)}

        /* Spinner */
        .spinner{width:13px;height:13px;border:2px solid rgba(10,15,10,.3);border-top-color:#0a0f0a;border-radius:50%;animation:spin .7s linear infinite}

        /* History */
        .h-empty{text-align:center;padding:52px 20px;color:${C.muted}}
        .h-empty-icon{font-size:42px;margin-bottom:13px;opacity:.3}
        .h-item{display:flex;align-items:center;gap:11px;padding:11px;background:${C.surface};border:1px solid ${C.border};border-radius:12px;margin-bottom:8px;cursor:pointer;transition:all .2s}
        .h-item:hover{border-color:rgba(74,222,128,.3);transform:translateX(4px)}
        .h-thumb{width:46px;height:46px;border-radius:8px;object-fit:cover;border:1px solid ${C.border};flex-shrink:0}
        .h-dis{font-family:'Cormorant Garamond',serif;font-size:15px;font-weight:700;color:${C.text}}
        .h-meta{font-size:10px;color:${C.muted};margin-top:2px}
        .h-conf{font-size:13px;font-weight:700;color:#4ade80;white-space:nowrap}

        /* Modal */
        .modal-ov{position:fixed;inset:0;z-index:200;background:rgba(0,0,0,.72);backdrop-filter:blur(10px);display:flex;align-items:center;justify-content:center;padding:16px;animation:fadeIn .2s ease}
        .modal{background:${isDark?"#0d1a0d":"#f0fdf4"};border:1px solid ${C.border};border-radius:20px;padding:26px;max-width:480px;width:100%;max-height:84vh;overflow-y:auto;animation:pop .3s cubic-bezier(.34,1.56,.64,1)}
        .modal-hdr{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:18px}
        .modal-ttl{font-family:'Cormorant Garamond',serif;font-size:23px;font-weight:800;color:${C.text}}
        .modal-x{width:29px;height:29px;border-radius:50%;border:1px solid ${C.border};background:${C.surface};cursor:pointer;font-size:13px;color:${C.muted};display:flex;align-items:center;justify-content:center;transition:all .2s}
        .modal-x:hover{border-color:#ef4444;color:#ef4444}
        .modal-sec{margin-bottom:16px}
        .modal-sec-ttl{font-size:9px;text-transform:uppercase;letter-spacing:.2em;color:${C.muted};margin-bottom:6px}
        .modal-txt{font-size:13px;color:${C.text};line-height:1.65;opacity:.85}
        .modal-img{width:100%;border-radius:12px;margin-bottom:16px;border:1px solid ${C.border}}

        /* About */
        .steps{display:flex;flex-direction:column}
        .step{display:flex;gap:16px;padding:16px 0;border-bottom:1px solid ${C.border}}.step:last-child{border-bottom:none}
        .step-n{width:36px;height:36px;border-radius:50%;background:rgba(74,222,128,.1);border:1px solid rgba(74,222,128,.25);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:16px;font-weight:800;color:#4ade80;flex-shrink:0}
        .step-t{font-size:13px;font-weight:600;color:${C.text};margin-bottom:3px}
        .step-d{font-size:12px;color:${C.muted};line-height:1.5}
        .kv-row{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid ${C.border};font-size:12px}

        /* Responsive */
        @media(max-width:720px){
          .grid2{grid-template-columns:1fr}
          .an-g{grid-template-columns:1fr}
          .stats-row{grid-template-columns:1fr 1fr}
          h1.big{font-size:40px}
          .desktop-tabs{display:none}
          .bottom-nav{display:block}
          .page{padding-bottom:96px}
          .info-g{grid-template-columns:1fr}
        }
      `}</style>

      <div className="orb o1"/><div className="orb o2"/><div className="orb o3"/>

      {/* Topbar */}
      <nav className="topbar">
        <div className="logo">🍋 CitrusAI</div>
        <div className="desktop-tabs">
          {NAV_ITEMS.map(([key,icon,label])=>(
            <button key={key} className={`tab-btn${tab===key?" on":""}`} onClick={()=>setTab(key)}>{icon} {label}</button>
          ))}
        </div>
        <button className="theme-btn" onClick={()=>setTheme(isDark?"light":"dark")}>{isDark?"☀️":"🌙"}</button>
      </nav>

      {/* Mobile bottom nav */}
      <div className="bottom-nav">
        <div className="bnav-inner">
          {NAV_ITEMS.map(([key,icon,label])=>(
            <button key={key} className="bnav-btn" onClick={()=>setTab(key)} style={{color:tab===key?"#4ade80":C.muted}}>
              <span style={{fontSize:"22px"}}>{icon}</span>
              <span style={{fontWeight:tab===key?700:400}}>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="page">

        {/* ══ SCAN TAB ══ */}
        {tab==="scan" && (
          <>
            {/* ── Farmer Carousel ── */}
            <HeroCarousel isDark={isDark} />

            {/* Hero text */}
            <div className="hero r0">
              <div className="eyebrow">AI-Powered Plant Diagnostics</div>
              <h1 className="big">Citrus <em>Disease</em><br/>Detector</h1>
              <p className="hero-sub">Upload or capture a leaf photo for instant AI diagnosis, treatment advice & downloadable reports.</p>
            </div>

            {/* Stats */}
            <div className="stats-row r1">
              {[{n:totalScans,s:"",l:"Total Scans"},{n:avgConf,s:"%",l:"Avg Confidence"},{n:6,s:"",l:"Disease Classes"}].map((x,i)=>(
                <div className="stat-card" key={i}>
                  <div className="stat-num"><Counter target={x.n} suffix={x.s}/></div>
                  <div className="stat-lbl">{x.l}</div>
                </div>
              ))}
            </div>

            <div className="grid2 r2">
              {/* Upload */}
              <div className="card">
                <div className="card-title">🍃 Upload Leaf</div>
                {error&&<div className="err-box">⚠ {error}</div>}

                {camera&&(
                  <>
                    <video ref={videoRef} autoPlay playsInline className="video-el"/>
                    <div className="btn-row">
                      <button className="btn btn-p" onClick={capturePhoto}>📸 Capture</button>
                      <button className="btn btn-g" onClick={reset}>Cancel</button>
                    </div>
                  </>
                )}

                {!image&&!camera&&(
                  <div
                    className={`upload-zone${drag?" drag":""}`}
                    onDragOver={e=>{e.preventDefault();setDrag(true)}}
                    onDragLeave={()=>setDrag(false)}
                    onDrop={e=>{e.preventDefault();setDrag(false);handleFile(e.dataTransfer.files[0])}}
                    onClick={()=>fileInputRef.current.click()}
                  >
                    <div className="upload-icon">🍃</div>
                    <div className="upload-title">Drop leaf photo here</div>
                    <div className="upload-sub">JPG · PNG · WEBP &nbsp;·&nbsp; Drag & drop or click</div>
                    <div className="btn-row" onClick={e=>e.stopPropagation()}>
                      <button className="btn btn-p" onClick={()=>fileInputRef.current.click()}>📁 Browse</button>
                      <button className="btn btn-o" onClick={openCamera}>📷 Camera</button>
                    </div>
                    <input ref={fileInputRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>handleFile(e.target.files[0])}/>
                  </div>
                )}

                {image&&!camera&&(
                  <>
                    <img src={image} alt="preview" className="preview-img"/>
                    <div className="act-row">
                      <button className="btn btn-p" onClick={predict} disabled={loading}>
                        {loading?<><div className="spinner"/><span className="pulsing">Analyzing…</span></>:<><span>🔬</span>Analyze</>}
                      </button>
                      <button className="btn btn-g" onClick={reset}>✕ Reset</button>
                    </div>
                  </>
                )}
              </div>

              {/* Results */}
              <div className="card">
                <div className="card-title">📋 Results</div>
                {!result?(
                  <div style={{textAlign:"center",padding:"42px 20px",color:C.muted}}>
                    <div style={{fontSize:"42px",marginBottom:"12px",opacity:.22}}>🔍</div>
                    <div style={{fontSize:"13px"}}>Upload a leaf image and click Analyze</div>
                  </div>
                ):(
                  <div className="pop-in">
                    <div className="res-hdr">
                      <div>
                        <div className="res-lbl">Detected Disease</div>
                        <div className="res-name">{result.predicted_class}</div>
                      </div>
                      <DonutChart value={result.confidence} color={sev.color}/>
                    </div>
                    <div className="sev-tag" style={{color:sev.color,background:sev.bg,borderColor:sev.color+"40",boxShadow:sev.glow}}>
                      {sev.label}
                    </div>
                    <div className="info-g">
                      <div className="info-c"><div className="info-lbl">📋 Description</div><div className="info-txt">{result.disease_info.description}</div></div>
                      <div className="info-c"><div className="info-lbl">💊 Treatment</div><div className="info-txt">{result.disease_info.treatment}</div></div>
                    </div>
                    <div className="prob-ttl">All Probabilities</div>
                    {sortedProbs.map(([cls,prob])=>{
                      const a=cls===result.predicted_class;
                      return(
                        <div className="prob-row" key={cls}>
                          <div className="prob-meta">
                            <span className={`prob-nm${a?" a":""}`}>{cls}</span>
                            <span className={`prob-vl${a?" a":""}`}>{prob.toFixed(1)}%</span>
                          </div>
                          <div className="prob-trk"><div className={`prob-fill${a?" a":""}`} style={{width:`${prob}%`}}/></div>
                        </div>
                      );
                    })}
                    <div style={{display:"flex",gap:"8px",marginTop:"16px",flexWrap:"wrap"}}>
                      <button className="btn btn-pdf" onClick={()=>generatePDF(result,image)}>📄 PDF Report</button>
                      <button className="btn btn-o" onClick={()=>setModal({type:"detail",data:result,image})}>🔎 Details</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* ══ HISTORY TAB ══ */}
        {tab==="history"&&(
          <div className="r0">
            <div style={{marginBottom:"26px"}}>
              <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"36px",fontWeight:800,color:C.text}}>Scan History</h2>
              <p style={{color:C.muted,marginTop:"6px",fontSize:"13px"}}>{totalScans} scan{totalScans!==1?"s":""} · stored locally on this device</p>
            </div>
            {history.length===0?(
              <div className="h-empty"><div className="h-empty-icon">📋</div><p style={{fontSize:"14px"}}>No scans yet — go to Scan tab to analyse your first leaf!</p></div>
            ):(
              <div style={{maxWidth:"660px"}}>
                {history.map((h,i)=>(
                  <div key={h.id} className="h-item slide-in" style={{animationDelay:`${i*.04}s`}} onClick={()=>setModal({type:"history",data:h,image:h.image})}>
                    <img src={h.image} className="h-thumb" alt={h.predicted_class} onError={e=>e.target.style.display="none"}/>
                    <div style={{flex:1,minWidth:0}}>
                      <div className="h-dis">{h.predicted_class}</div>
                      <div className="h-meta">{h.timestamp} · {h.disease_info?.severity||"—"}</div>
                    </div>
                    <div className="h-conf">{h.confidence.toFixed(1)}%</div>
                    <div style={{color:C.muted}}>›</div>
                  </div>
                ))}
                <button className="btn btn-danger" style={{marginTop:"12px"}} onClick={()=>{setHistory([]);try{localStorage.removeItem("scanHistory")}catch{}}}>
                  🗑 Clear All History
                </button>
              </div>
            )}
          </div>
        )}

        {/* ══ ANALYTICS TAB ══ */}
        {tab==="analytics"&&(
          <div className="r0">
            <div style={{marginBottom:"26px"}}>
              <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"36px",fontWeight:800,color:C.text}}>Analytics</h2>
              <p style={{color:C.muted,marginTop:"6px",fontSize:"13px"}}>Visual breakdown of your {totalScans} scan{totalScans!==1?"s":""}</p>
            </div>
            <div className="an-g">
              <div className="card">
                <div className="card-title">📊 Disease Distribution</div>
                {totalScans===0?<p style={{color:C.muted,fontSize:"12px"}}>No scans yet!</p>:<BarChart data={chartData}/>}
              </div>
              <div className="card">
                <div className="card-title">🎯 Confidence</div>
                <div style={{display:"flex",alignItems:"center",gap:"18px"}}>
                  <DonutChart value={avgConf} color="#4ade80" size={92}/>
                  <div>
                    <div style={{fontSize:"12px",color:C.muted,marginBottom:"5px"}}>Avg across {totalScans} scan{totalScans!==1?"s":""}</div>
                    <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"26px",fontWeight:800,color:"#4ade80"}}>{avgConf}%</div>
                  </div>
                </div>
              </div>
              <div className="card" style={{gridColumn:"1/-1"}}>
                <div className="card-title">🌿 Per-Disease Breakdown</div>
                {totalScans===0?<p style={{color:C.muted,fontSize:"12px"}}>No data yet.</p>:
                  Object.entries(diseaseColors).map(([cls,color])=>{
                    const count=diseaseCounts[cls]||0;
                    const pct=totalScans?(count/totalScans)*100:0;
                    return(
                      <div className="prob-row" key={cls} style={{marginBottom:"11px"}}>
                        <div className="prob-meta">
                          <span style={{fontSize:"13px",color,fontWeight:500}}>{cls}</span>
                          <span style={{fontSize:"11px",color:C.muted}}>{count} scan{count!==1?"s":""} · {pct.toFixed(0)}%</span>
                        </div>
                        <div className="prob-trk" style={{height:"5px"}}>
                          <div style={{height:"100%",width:`${pct}%`,background:color,borderRadius:"100px",transition:"width 1s ease",boxShadow:`0 0 7px ${color}60`}}/>
                        </div>
                      </div>
                    );
                  })
                }
              </div>
              <div className="card" style={{gridColumn:"1/-1"}}>
                <div className="card-title">📈 Confidence Timeline</div>
                {history.length<2?<p style={{color:C.muted,fontSize:"12px"}}>Need at least 2 scans to show the timeline.</p>:(
                  <div style={{overflowX:"auto"}}>
                    <svg viewBox={`0 0 ${Math.max(history.length*56,300)} 90`} style={{width:"100%",minWidth:"280px",overflow:"visible"}}>
                      <defs>
                        <linearGradient id="lg" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#4ade80" stopOpacity="0.28"/>
                          <stop offset="100%" stopColor="#4ade80" stopOpacity="0"/>
                        </linearGradient>
                      </defs>
                      <path d={[...history].reverse().map((h,i)=>{const x=i*56+28,y=78-(h.confidence/100)*65;return`${i===0?"M":"L"}${x} ${y}`}).join(" ")+` L ${(history.length-1)*56+28} 78 L 28 78 Z`} fill="url(#lg)"/>
                      <polyline points={[...history].reverse().map((h,i)=>`${i*56+28},${78-(h.confidence/100)*65}`).join(" ")} fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{filter:"drop-shadow(0 0 4px rgba(74,222,128,.6))"}}/>
                      {[...history].reverse().map((h,i)=>(
                        <circle key={i} cx={i*56+28} cy={78-(h.confidence/100)*65} r="4" fill="#4ade80" stroke={isDark?"#080d08":"#f0fdf4"} strokeWidth="2" style={{filter:"drop-shadow(0 0 4px rgba(74,222,128,.8))"}}/>
                      ))}
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ══ ABOUT TAB ══ */}
        {tab==="about"&&(
          <div className="r0" style={{maxWidth:"660px"}}>
            <div style={{marginBottom:"26px"}}>
              <h2 style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"36px",fontWeight:800,color:C.text}}>About CitrusAI</h2>
              <p style={{color:C.muted,marginTop:"6px",fontSize:"13px"}}>How it works · diseases detected · model info</p>
            </div>
            <div className="card" style={{marginBottom:"14px"}}>
              <div className="card-title">⚙️ How It Works</div>
              <div className="steps">
                {[["1","Upload a Photo","Take a clear photo of a citrus leaf or upload one from your device."],
                  ["2","AI Analysis","MobileNetV2 model analyses the image, trained on ~20k citrus disease samples."],
                  ["3","Get Results","Instant diagnosis with disease name, confidence, severity & treatment advice."],
                  ["4","Download Report","Export a full PDF report for records or agronomist consultation."],
                ].map(([n,t2,d])=>(
                  <div className="step" key={n}>
                    <div className="step-n">{n}</div>
                    <div><div className="step-t">{t2}</div><div className="step-d">{d}</div></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card" style={{marginBottom:"14px"}}>
              <div className="card-title">🦠 Detectable Diseases</div>
              {Object.entries(diseaseColors).map(([cls,color])=>(
                <div key={cls} style={{display:"flex",alignItems:"center",gap:"10px",padding:"8px 0",borderBottom:`1px solid ${C.border}`}}>
                  <div style={{width:"8px",height:"8px",borderRadius:"50%",background:color,boxShadow:`0 0 6px ${color}`,flexShrink:0}}/>
                  <span style={{fontSize:"13px",color:C.text,fontWeight:500}}>{cls}</span>
                </div>
              ))}
            </div>
            <div className="card">
              <div className="card-title">🤖 Model Details</div>
              {[["Architecture","MobileNetV2 + Custom Head"],["Dataset","~19,688 citrus leaf images"],["Input Size","160 × 160 px"],["Classes","6 disease categories"],["Framework","TensorFlow / Keras"],["Backend","FastAPI (Python)"]].map(([k,v])=>(
                <div className="kv-row" key={k}>
                  <span style={{color:C.muted}}>{k}</span>
                  <span style={{color:C.text,fontWeight:500}}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {modal&&(
        <div className="modal-ov" onClick={()=>setModal(null)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div className="modal-hdr">
              <div className="modal-ttl">{modal.data.predicted_class}</div>
              <button className="modal-x" onClick={()=>setModal(null)}>✕</button>
            </div>
            {modal.image&&<img src={modal.image} alt="leaf" className="modal-img" onError={e=>e.target.style.display="none"}/>}
            <div className="modal-sec">
              <div className="modal-sec-ttl">Confidence</div>
              <div style={{display:"flex",alignItems:"center",gap:"14px"}}>
                <DonutChart value={modal.data.confidence} color={severityConfig[modal.data.disease_info?.severity||"None"].color} size={72}/>
                <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"28px",fontWeight:800,color:"#4ade80"}}>{modal.data.confidence.toFixed(1)}%</div>
              </div>
            </div>
            <div className="modal-sec"><div className="modal-sec-ttl">Description</div><div className="modal-txt">{modal.data.disease_info?.description}</div></div>
            <div className="modal-sec"><div className="modal-sec-ttl">Treatment</div><div className="modal-txt">{modal.data.disease_info?.treatment}</div></div>
            <div className="modal-sec">
              <div className="modal-sec-ttl">All Probabilities</div>
              {Object.entries(modal.data.all_probabilities).sort((a,b)=>b[1]-a[1]).map(([cls,prob])=>(
                <div className="prob-row" key={cls}>
                  <div className="prob-meta">
                    <span style={{fontSize:"12px",color:cls===modal.data.predicted_class?"#4ade80":C.muted}}>{cls}</span>
                    <span style={{fontSize:"11px",color:C.muted}}>{prob.toFixed(1)}%</span>
                  </div>
                  <div className="prob-trk"><div className={`prob-fill${cls===modal.data.predicted_class?" a":""}`} style={{width:`${prob}%`}}/></div>
                </div>
              ))}
            </div>
            {modal.image&&(
              <button className="btn btn-pdf" style={{width:"100%",justifyContent:"center"}} onClick={()=>generatePDF(modal.data,modal.image)}>
                📄 Download PDF Report
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
