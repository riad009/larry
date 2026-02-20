// // components/selector/DataFetcher.tsx
// import { useState, useEffect, useMemo } from "react";
// import { Option } from "@/types/option";
// import { normalize } from "@/utils/strings";
//
// interface DataFetcherProps {
//     selectedCountry?: string | null;
//     children: (data: {
//         countryOptions: Option[];
//         regionOptions: Option[];
//         isLoading: boolean;
//         error: string | null;
//         refresh: () => void;
//     }) => React.ReactNode;
// }
//
// export function DataFetcher({ selectedCountry, children }: DataFetcherProps) {
//     const [combinedData, setCombinedData] = useState<any[]>([]);
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//
//     const fetchData = async () => {
//         setIsLoading(true);
//         setError(null);
//         try {
//             // The API already maps the data, so we just need the JSON
//             const [lRes, vRes] = await Promise.all([
//                 fetch("/api/lunch", { cache: "no-store" }),
//                 fetch("/api/vineyards", { cache: "no-store" }),
//             ]);
//
//             if (!lRes.ok || !vRes.ok) throw new Error("Server response error");
//
//             const [lData, vData] = await Promise.all([lRes.json(), vRes.json()]);
//
//             // Combine into one master list for easier filtering
//             setCombinedData([...(Array.isArray(lData) ? lData : []), ...(Array.isArray(vData) ? vData : [])]);
//         } catch (err) {
//             console.error("Error fetching options:", err);
//             setError("Failed to load destinations.");
//         } finally {
//             setIsLoading(false);
//         }
//     };
//
//     useEffect(() => {
//         fetchData();
//     }, []);
//
//     // 1. Get Unique Countries
//     const countryOptions = useMemo(() => {
//         const uniqueNames = new Set<string>();
//         combinedData.forEach(item => {
//             if (item.country) uniqueNames.add(item.country);
//         });
//
//         return Array.from(uniqueNames)
//             .sort()
//             .map(name => ({ key: name, name: name }));
//     }, [combinedData]);
//
//     // 2. Get Unique Regions for Selected Country
//     const regionOptions = useMemo(() => {
//         if (!selectedCountry) return [];
//
//         const uniqueRegions = new Set<string>();
//         const normalizedTarget = normalize(selectedCountry);
//
//         combinedData.forEach(item => {
//             if (item.country && normalize(item.country) === normalizedTarget) {
//                 if (item.region) uniqueRegions.add(item.region);
//             }
//         });
//
//         return Array.from(uniqueRegions)
//             .sort()
//             .map(name => ({ key: name, name: name }));
//     }, [combinedData, selectedCountry]);
//
//     return children({
//         countryOptions,
//         regionOptions,
//         isLoading,
//         error,
//         refresh: fetchData,
//     });
// }

/* components/selector/DataFetcher.tsx */

import { useState, useEffect, useMemo } from "react";
import { Option } from "@/types/option";
import { normalize } from "@/utils/strings";

interface DataFetcherProps {
    selectedCountry?: string | null;
    children: (data: {
        countryOptions: Option[];
        regionOptions: Option[];
        isLoading: boolean;
        error: string | null;
        refresh: () => void;
    }) => React.ReactNode;
}

export function DataFetcher({ selectedCountry, children }: DataFetcherProps) {
    // Changed state to only store vineyard data
    const [vineyardData, setVineyardData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Only fetching from the vineyards API now
            const response = await fetch("/api/vineyards", { cache: "no-store" });

            if (!response.ok) throw new Error("Server response error");

            const data = await response.json();
            setVineyardData(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Error fetching options:", err);
            setError("Failed to load destinations.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // 1. Get Unique Countries from vineyards only
    const countryOptions = useMemo(() => {
        const uniqueNames = new Set<string>();
        vineyardData.forEach(item => {
            if (item.country) uniqueNames.add(item.country);
        });

        return Array.from(uniqueNames)
            .sort()
            .map(name => ({ key: name, name: name }));
    }, [vineyardData]);

    // 2. Get Unique Regions from vineyards only
    const regionOptions = useMemo(() => {
        if (!selectedCountry) return [];

        const uniqueRegions = new Set<string>();
        const normalizedTarget = normalize(selectedCountry);

        vineyardData.forEach(item => {
            if (item.country && normalize(item.country) === normalizedTarget) {
                if (item.region) uniqueRegions.add(item.region);
            }
        });

        return Array.from(uniqueRegions)
            .sort()
            .map(name => ({ key: name, name: name }));
    }, [vineyardData, selectedCountry]);

    return children({
        countryOptions,
        regionOptions,
        isLoading,
        error,
        refresh: fetchData,
    });
}