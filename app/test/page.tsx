// app/test-simple/page.tsx
"use client";
import { useState } from "react";

export default function SimpleTestPage() {
    const [imageUrl, setImageUrl] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const testDuckDuckGo = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                "https://api.duckduckgo.com/?q=Champagne+Vineyard+France&format=json&no_html=1"
            );
            const data = await response.json();
            console.log("Full response:", data);

            if (data.Image) {
                setImageUrl(data.Image);
                alert(`Success! Found image: ${data.Image}`);
            } else {
                alert(`No image found. Response had: ${Object.keys(data).join(", ")}`);
            }
        } catch (error) {
            alert(`Error: ${error}`);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-black p-8 text-white">
            <h1 className="text-2xl font-bold mb-6">Simple API Test</h1>

            <button
                onClick={testDuckDuckGo}
                disabled={loading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium mb-6"
            >
                {loading ? "Testing..." : "Test DuckDuckGo API"}
            </button>

            {imageUrl && (
                <div className="mt-6">
                    <img src={imageUrl} alt="Result" className="max-w-md rounded-lg" />
                    <p className="mt-2 text-sm text-gray-400">{imageUrl}</p>
                </div>
            )}

            <div className="mt-8 p-4 bg-gray-900 rounded-lg">
                <h2 className="font-bold mb-2">Debug Info:</h2>
                <p className="text-sm text-gray-400">
                    Check browser console for full response. If this fails, free APIs won't work for specific vineyards.
                </p>
            </div>
        </div>
    );
}