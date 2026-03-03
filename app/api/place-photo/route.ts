import { NextResponse } from "next/server";

const FIND_PLACE_URL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json";
const PLACE_DETAILS_URL = "https://maps.googleapis.com/maps/api/place/details/json";
const PLACE_PHOTO_URL = "https://maps.googleapis.com/maps/api/place/photo";

function parseNum(value: string | null): number | null {
    if (value == null || value.trim() === "") return null;
    const n = Number(value.trim());
    return Number.isFinite(n) ? n : null;
}

async function resolvePlaceId(
    name: string,
    lat: number,
    lng: number,
    apiKey: string
): Promise<string | null> {
    const params = new URLSearchParams({
        input: name,
        inputtype: "textquery",
        fields: "place_id",
        locationbias: `circle:2000@${lat},${lng}`,
        key: apiKey,
    });
    const res = await fetch(`${FIND_PLACE_URL}?${params.toString()}`);
    const data = await res.json();
    const candidates = data?.candidates;
    if (!Array.isArray(candidates) || candidates.length === 0) return null;
    const placeId = candidates[0].place_id;
    return typeof placeId === "string" && placeId.trim().length > 0 ? placeId : null;
}

async function getPhotoReference(placeId: string, apiKey: string): Promise<string | null> {
    const params = new URLSearchParams({
        place_id: placeId,
        fields: "photos",
        key: apiKey,
    });
    const res = await fetch(`${PLACE_DETAILS_URL}?${params.toString()}`);
    const data = await res.json();
    if (data?.status !== "OK") return null;
    const photos = data?.result?.photos;
    if (!Array.isArray(photos) || photos.length === 0) return null;
    const ref = photos[0].photo_reference;
    return typeof ref === "string" && ref.trim().length > 0 ? ref : null;
}

async function fetchPhoto(
    photoReference: string,
    apiKey: string
): Promise<{ body: ArrayBuffer; contentType: string }> {
    const params = new URLSearchParams({
        maxwidth: "800",
        photo_reference: photoReference,
        key: apiKey,
    });

    const res = await fetch(`${PLACE_PHOTO_URL}?${params.toString()}`);

    if (!res.ok) {
        throw new Error("Photo fetch failed");
    }

    const body = await res.arrayBuffer();
    const contentType =
        res.headers.get("content-type")?.trim() || "image/jpeg";

    return { body, contentType };
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name")?.trim() ?? "";
    const lat = parseNum(searchParams.get("lat"));
    const lng = parseNum(searchParams.get("lng"));

    if (!name || lat == null || lng == null) {
        return NextResponse.json(
            { error: "Missing or invalid query: name, lat, and lng are required" },
            { status: 400 }
        );
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    if (!apiKey || typeof apiKey !== "string" || !apiKey.trim()) {
        return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    try {
        const placeId = await resolvePlaceId(name, lat, lng, apiKey);
        if (!placeId) {
            return NextResponse.json({ error: "Place not found" }, { status: 404 });
        }

        const photoReference = await getPhotoReference(placeId, apiKey);
        if (!photoReference) {
            return NextResponse.json({ error: "No photo found for this place" }, { status: 404 });
        }

        const result = await fetchPhoto(photoReference, apiKey);

        return new NextResponse(Buffer.from(result.body), {
            status: 200,
            headers: {
                "Content-Type": result.contentType,
                "Cache-Control": "public, max-age=86400",
            },
        });
    } catch (e) {
        console.error("place-photo error:", e);
        return NextResponse.json({ error: "Failed to fetch place photo" }, { status: 500 });
    }
}
