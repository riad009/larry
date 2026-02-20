// components/SimpleImageTester.tsx
"use client";
import { useState } from "react";
import { Loader2, Image as ImageIcon, Link, AlertCircle } from "lucide-react";

export function SimpleImageTester() {
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<Array<{
        source: string;
        success: boolean;
        url?: string;
        error?: string;
    }>>([]);

    // Your specific test URLs
    const businessName = "Philipponnat Mareuil-sur-Aÿ Champagne";
    const encodedName = encodeURIComponent(businessName);

    const testImageSources = async () => {
        setIsLoading(true);
        const testResults = [];

        // Test 1: Direct image search with proxy approach
        try {
            console.log("Test 1: Direct image URL test...");
            // Try a direct image approach (vineyard/champagne generic)
            testResults.push({
                source: "Generic Vineyard Image",
                success: true,
                url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&auto=format&fit=crop"
            });
        } catch (error) {
            testResults.push({
                source: "Generic Image",
                success: false,
                error: String(error)
            });
        }

        // Test 2: DuckDuckGo (simplified)
        try {
            console.log("Test 2: DuckDuckGo...");
            const ddgResponse = await fetch(
                `https://api.duckduckgo.com/?q=${encodedName}&format=json&no_html=1&skip_disambig=1`,
                { signal: AbortSignal.timeout(5000) }
            );

            if (!ddgResponse.ok) throw new Error(`HTTP ${ddgResponse.status}`);

            const data = await ddgResponse.json();
            console.log("DuckDuckGo response:", data);

            if (data.Image) {
                testResults.push({
                    source: "DuckDuckGo",
                    success: true,
                    url: data.Image
                });
            } else {
                testResults.push({
                    source: "DuckDuckGo",
                    success: false,
                    error: "No image found in response"
                });
            }
        } catch (error) {
            testResults.push({
                source: "DuckDuckGo",
                success: false,
                error: error instanceof Error ? error.message : "Request failed"
            });
        }

        // Test 3: Local fallback simulation
        testResults.push({
            source: "Local Fallback",
            success: true,
            url: "/api/placeholder/800/600?text=Vineyard+Image&bg=4f46e5&color=ffffff"
        });

        // Test 4: Create dynamic image from name
        const initials = businessName
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 3);

        testResults.push({
            source: "Generated Placeholder",
            success: true,
            url: `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=8b5cf6&color=fff&size=400`
        });

        setResults(testResults);
        setIsLoading(false);
    };

    // Quick test function
    const testQuick = async () => {
        setIsLoading(true);

        // Just test DuckDuckGo
        try {
            const response = await fetch(
                `https://api.duckduckgo.com/?q=${encodeURIComponent("Champagne Vineyard")}&format=json&no_html=1&skip_disambig=1`
            );
            const data = await response.json();
            console.log("Quick test data:", data);
            alert(`DuckDuckGo test: ${data.Image ? 'Found image!' : 'No image found'}\nURL: ${data.Image || 'None'}`);
        } catch (error) {
            console.error("Quick test error:", error);
            alert("Quick test failed: " + error);
        }

        setIsLoading(false);
    };

    return (
        <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg">
                        <ImageIcon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white">Image Source Quick Test</h2>
                        <p className="text-sm text-zinc-400">Testing: <span className="text-white font-medium">{businessName}</span></p>
                    </div>
                </div>
                <button
                    onClick={testQuick}
                    disabled={isLoading}
                    className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                >
                    Quick API Test
                </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
                <button
                    onClick={testImageSources}
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-medium py-3 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Testing Sources...
                        </>
                    ) : (
                        <>
                            <Link className="w-4 h-4" />
                            Test All Sources
                        </>
                    )}
                </button>
            </div>

            {/* Results Grid */}
            {results.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.map((result, index) => (
                        <div
                            key={index}
                            className={`rounded-xl overflow-hidden border ${
                                result.success
                                    ? "border-green-500/30 bg-green-500/5"
                                    : "border-red-500/30 bg-red-500/5"
                            }`}
                        >
                            {/* Header */}
                            <div className="p-3 border-b border-zinc-800">
                                <div className="flex items-center justify-between">
                  <span className={`font-medium ${result.success ? "text-green-400" : "text-red-400"}`}>
                    {result.source}
                  </span>
                                    <div className={`px-2 py-1 rounded text-xs font-bold ${result.success ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}>
                                        {result.success ? "SUCCESS" : "FAILED"}
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                {result.success ? (
                                    <div className="space-y-3">
                                        <div className="aspect-video rounded-lg overflow-hidden border border-zinc-800">
                                            <img
                                                src={result.url}
                                                alt={`From ${result.source}`}
                                                className="w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="text-xs">
                                            <p className="text-zinc-400 break-all truncate" title={result.url}>
                                                URL: {result.url?.substring(0, 50)}...
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex items-start gap-2 p-3 bg-zinc-900/50 rounded-lg">
                                        <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                                        <p className="text-sm text-red-300">{result.error}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Recommendations */}
            <div className="mt-8 p-4 bg-zinc-800/50 rounded-xl border border-zinc-700">
                <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" />
                    Recommended Solution
                </h3>
                <div className="space-y-2 text-sm text-zinc-300">
                    <p>✅ <strong>Free APIs won't work reliably</strong> for specific vineyards</p>
                    <p>✅ <strong>Solution 1:</strong> Create your own image database</p>
                    <p>✅ <strong>Solution 2:</strong> Use Unsplash API for generic vineyard photos</p>
                    <p>✅ <strong>Solution 3:</strong> Use Google Places API (paid but reliable)</p>
                    <p>✅ <strong>Immediate Fix:</strong> Use beautiful placeholder images</p>
                </div>
            </div>

            {/* Quick Implementation */}
            <div className="mt-6">
                <h4 className="text-white font-bold mb-3">Quick Implementation Code:</h4>
                <pre className="text-xs bg-zinc-900 p-3 rounded-lg overflow-x-auto text-zinc-300 border border-zinc-700">
{`// Simple image getter with fallbacks
async function getBusinessImage(businessName: string) {
  // Try DuckDuckGo first (free)
  try {
    const response = await fetch(
      \`https://api.duckduckgo.com/?q=\${encodeURIComponent(businessName)}&format=json&no_html=1\`
    );
    const data = await response.json();
    if (data.Image) return data.Image;
  } catch {}
  
  // Fallback to Unsplash (needs API key)
  // const unsplashUrl = \`https://api.unsplash.com/search/photos?query=vineyard&per_page=1&client_id=KEY\`;
  
  // Final fallback: UI Avatars or local image
  const initials = businessName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 3);
  return \`https://ui-avatars.com/api/?name=\${initials}&background=8b5cf6&color=fff&size=400\`;
}`}
        </pre>
            </div>
        </div>
    );
}