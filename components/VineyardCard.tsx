// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import { Star, MapPin, ChevronDown, ChevronUp, Loader2, X, ExternalLink, Clock, InstagramIcon } from "lucide-react";
// import { VineyardExperience, VineyardOffer } from "@/types/vineyard";
//
// interface CardProps {
//     vineyard: VineyardExperience;
//     loadOffers: (id: string) => Promise<VineyardOffer[]>;
//     onAdd: (v: VineyardExperience) => void;
//     onRemove: (id: string) => void;
//     isSelected: boolean;
//     adminMode?: boolean;
//     onSave?: (updated: VineyardExperience) => void;
//     onDelete?: (id: string) => void;
// }
//
// export default function VineyardCard({ vineyard, loadOffers, onAdd, onRemove, isSelected, adminMode = false }: CardProps) {
//     const [expanded, setExpanded] = useState(false);
//     const [offers, setOffers] = useState<VineyardOffer[]>([]);
//     const [loading, setLoading] = useState(false);
//
//     const toggleExpand = async () => {
//         const nextState = !expanded;
//         setExpanded(nextState);
//         if (nextState && offers.length === 0) {
//             setLoading(true);
//             const data = await loadOffers(vineyard.id);
//             setOffers(data);
//             setLoading(false);
//         }
//     };
//
//     const priceDisplay = vineyard.lowestCost === 0 && vineyard.highestCost === 0
//         ? "Price N/A"
//         : `€${vineyard.lowestCost} - €${vineyard.highestCost}`;
//
//     const ratingDisplay = vineyard.rating > 0 ? vineyard.rating.toFixed(1) : "—";
//     const location = [vineyard.subRegion, vineyard.commune].filter(Boolean).join(", ");
//
//     const contactLink = (vineyard.gkp ?? vineyard.gkp2 ?? "").trim();
//
//     const cardClasses = `
//         rounded-2xl overflow-hidden border transition-all duration-300 bg-zinc-900/80
//         hover:bg-zinc-900 hover:shadow-lg hover:shadow-zinc-900/30
//         ${isSelected
//         ? "border-green-500/60 shadow-[0_0_20px_rgba(22,163,74,0.25)]"
//         : "border-zinc-800 hover:border-zinc-700"
//     }
//     `;
//
//     return (
//         <div className={cardClasses}>
//             <div className="relative w-full h-48 bg-zinc-800">
//                 <Image
//                     src="/images/vineyard-placeholder2.jpg"
//                     alt={vineyard.name}
//                     fill
//                     sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
//                     className="object-cover opacity-90"
//                     priority={false}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/30 via-transparent to-transparent" />
//
//                 {isSelected && (
//                     <div className="absolute top-3 left-3 bg-gradient-to-r from-green-600 to-emerald-500 px-3 py-1.5 rounded-full text-[11px] font-bold text-white uppercase tracking-wider shadow-lg backdrop-blur-sm">
//                         Selected
//                     </div>
//                 )}
//
//                 {vineyard.rating > 0 && (
//                     <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 border border-white/10">
//                         <Star size={12} className="fill-yellow-500 text-yellow-500" />
//                         <span className="text-white text-xs font-bold">{ratingDisplay}</span>
//                         <span className="text-zinc-400 text-[10px]">({vineyard.ratingUsers})</span>
//                     </div>
//                 )}
//             </div>
//
//             <div className="p-5">
//                 <div className="flex justify-between items-start gap-4 mb-3">
//                     <div className="min-w-0 flex-1">
//                     <div className="flex items-center gap-3 mb-2">
//                         {(vineyard.score ?? 0) > 0 && (
//                             <span className="inline-flex items-center text-[11px] font-bold
//                             bg-emerald-900/30 text-emerald-400 px-3 py-1 rounded-lg
//                             border border-emerald-500/30 shadow-sm">
//                             SCORE: {vineyard.score}
//                             </span>
//                         )}
//
//                         {(vineyard.instagram ?? "").trim().length > 0 && (
//                             <a
//                             href={(vineyard.instagram ?? "").trim()}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white
//                                 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500
//                                 hover:from-pink-600 hover:via-red-600 hover:to-yellow-600
//                                 px-3 py-1 rounded-lg shadow-sm transition-all duration-300"
//                             >
//                             <InstagramIcon size={12} />
//                             Instagram
//                             </a>
//                         )}
//                         </div>
//
//
//                         <h3 className="text-white font-bold text-lg leading-tight mb-2">
//                             {vineyard.name}
//                         </h3>
//
//                         <div className="flex items-center gap-1.5 text-zinc-400 mb-4">
//                             <MapPin size={12} className="text-zinc-500 flex-shrink-0" />
//                             <p className="text-xs truncate italic">{location || "Location not specified"}</p>
//                         </div>
//
//                         {contactLink.length > 0 && (
//                             <button
//                                 onClick={() => window.open(contactLink, "_blank")}
//                                 className="flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-zinc-300
//                                     bg-zinc-800/50 hover:bg-zinc-800 px-3 py-1.5 rounded-lg border border-zinc-700/50
//                                     transition-colors duration-200"
//                             >
//                                 <MapPin size={11} />
//                                 Direct Contact Info
//                             </button>
//                         )}
//                         {/* {(vineyard.instagram ?? "").trim().length > 0 && (
//                             <a
//                                 href={(vineyard.instagram ?? "").trim()}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-zinc-300
//                                     bg-zinc-800/50 hover:bg-zinc-800 px-3 py-1.5 rounded-lg border border-zinc-700/50
//                                     transition-colors duration-200 mt-2"
//                             >
//                                 <ExternalLink size={11} />
//                                 Instagram
//                             </a>
//                         )} */}
//                     </div>
//
//                     <div className="flex flex-col items-end gap-3 mt-1">
//                         <div className="bg-zinc-800/80 px-3 py-2 rounded-lg flex flex-col items-center justify-center border border-zinc-700/50 min-w-[90px]">
//                             <p className="text-white text-sm font-bold text-center leading-tight">
//                                 {priceDisplay.includes("N/A") ? "N/A" : priceDisplay}
//                             </p>
//                             <p className="text-zinc-400 text-[10px] mt-0.5">PRICE RANGE</p>
//                         </div>
//
//                         <div className="w-full">
//                             {!isSelected ? (
//                                 <button
//                                     onClick={() => onAdd(vineyard)}
//                                     className="w-full py-3 px-4 text-xs font-bold uppercase tracking-wider rounded-xl
//                                              bg-gradient-to-r from-white to-zinc-100 text-black
//                                              hover:from-zinc-100 hover:to-zinc-200
//                                              active:scale-[0.98] transition-all duration-200
//                                              shadow-md hover:shadow-lg"
//                                 >
//                                     Add to Trip
//                                 </button>
//                             ) : (
//                                 <div className="flex items-center justify-center w-full py-3 px-4 gap-2
//                                              bg-gradient-to-r from-zinc-800 to-zinc-900 text-red-400
//                                              border border-red-500/20 hover:border-red-500/40
//                                              hover:bg-gradient-to-r hover:from-red-900/30 hover:to-red-900/10
//                                              hover:text-red-300 rounded-xl transition-all duration-200 group cursor-pointer"
//                                      onClick={() => onRemove(vineyard.id)}>
//                                     <span className="text-xs font-bold uppercase tracking-wider">REMOVE</span>
//                                     <X size={14} className="group-hover:text-red-300 transition-colors" />
//                                 </div>
//                             )}
//                         </div>
//
//                         <button
//                             onClick={toggleExpand}
//                             className="text-[11px] font-bold text-green-400 flex items-center gap-1.5
//                                      hover:text-green-300 transition-colors duration-200"
//                         >
//                             {expanded ? "SHOW LESS" : "SEE MORE"}
//                             {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
//                         </button>
//                     </div>
//                 </div>
//
//                 {expanded && (
//                     <div className="mt-4 pt-4 border-t border-zinc-800/50 animate-in slide-in-from-top-2 duration-200">
//                       {(vineyard.highlights?.length ?? 0) > 0 && (
//   <div className="mb-5">
//     <div className="flex items-center gap-2 mb-3">
//       <div className="h-px w-6 bg-green-500/50"></div>
//       <p className="text-[11px] font-black text-green-400 uppercase tracking-widest">
//         Highlights
//       </p>
//     </div>
//
//     <ul className="grid grid-cols-1 gap-2">
//       {vineyard.highlights?.map((h, i) => (
//         <li
//           key={i}
//           className="text-sm text-zinc-300 flex items-start gap-3 p-2 bg-zinc-900/50 rounded-lg"
//         >
//           <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
//           <span>{h}</span>
//         </li>
//       ))}
//     </ul>
//   </div>
// )}
//
//
//                         <div>
//                             <div className="flex items-center gap-2 mb-3">
//                                 <div className="h-px w-6 bg-blue-500/50"></div>
//                                 <p className="text-[11px] font-black text-blue-400 uppercase tracking-widest">
//                                     Available Experiences
//                                 </p>
//                             </div>
//                             {loading ? (
//                                 <div className="flex items-center justify-center gap-3 text-zinc-500 py-4">
//                                     <Loader2 className="animate-spin" size={16} />
//                                     <span className="text-sm font-medium">Loading experiences...</span>
//                                 </div>
//                             ) : (
//                                 <div className="space-y-3">
//                                     {offers.length > 0 ? offers.map(o => (
//                                         <div key={o.id} className="p-4 bg-zinc-800/30 rounded-xl border border-zinc-700/30 hover:border-zinc-600/50 transition-colors">
//                                             <div className="flex justify-between items-start mb-2">
//                                                 <div className="flex-1">
//                                                     <p className="font-bold text-sm text-white mb-1">{o.title}</p>
//                                                     <div className="flex items-center gap-3 text-xs text-zinc-400">
//                                                         {o.duration && (
//                                                             <div className="flex items-center gap-1">
//                                                                 <Clock size={11} />
//                                                                 <span>{o.duration} min</span>
//                                                             </div>
//                                                         )}
//                                                         {o.type && (
//                                                             <span className="px-2 py-0.5 bg-zinc-800/50 rounded text-[10px] font-medium">
//                                                                 {o.type}
//                                                             </span>
//                                                         )}
//                                                     </div>
//                                                 </div>
//                                                 <span className="font-bold text-green-400 text-sm ml-2">
//                                                     {o.price > 0 ? `€${o.price}` : "N/A"}
//                                                 </span>
//                                             </div>
//                                             {o.link && (
//                                                 <a
//                                                     href={o.link}
//                                                     target="_blank"
//                                                     rel="noopener noreferrer"
//                                                     className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
//                                                 >
//                                                     Visit Website
//                                                     <ExternalLink size={12} />
//                                                 </a>
//                                             )}
//                                         </div>
//                                     )) : (
//                                         <div className="p-4 bg-zinc-900/30 rounded-xl border border-zinc-800/50">
//                                             <p className="text-sm italic text-zinc-600 text-center">
//                                                 Contact winery directly for availability.
//                                             </p>
//                                         </div>
//                                     )}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }


"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Star, MapPin, ChevronDown, ChevronUp, Loader2, ExternalLink, Clock, InstagramIcon } from "lucide-react";
import { VineyardExperience, VineyardOffer } from "@/types/vineyard";
import MapPopup from "./MapPopup";
import GoogleIcon from "../public/google-icon.webp"

interface CardProps {
    vineyard: VineyardExperience;
    loadOffers: (id: string) => Promise<VineyardOffer[]>;
    onAdd: (v: VineyardExperience) => void;
    onRemove: (id: string) => void;
    isSelected: boolean;
    adminMode?: boolean;
    onSave?: (updated: VineyardExperience) => void;
    onDelete?: (id: string) => void;
}


const VINEYARD_PLACEHOLDER = "/images/vineyard-placeholder2.jpg";

export default function VineyardCard({ vineyard, loadOffers, onAdd, onRemove, isSelected, adminMode = false }: CardProps) {
    const [expanded, setExpanded] = useState(false);
    const [offers, setOffers] = useState<VineyardOffer[]>([]);
    const [loading, setLoading] = useState(false);
    const [showMapPopup, setShowMapPopup] = useState(false);
    const name = (vineyard as any).Vineyard ?? vineyard.name ?? "";
    const lat = typeof vineyard.latitude === "number" && Number.isFinite(vineyard.latitude) ? vineyard.latitude : null;
    const lng = typeof vineyard.longitude === "number" && Number.isFinite(vineyard.longitude) ? vineyard.longitude : null;
    const [imgSrc, setImgSrc] = useState<string>(() =>
        name && String(name).trim() && lat != null && lng != null
            ? `/api/place-photo?name=${encodeURIComponent(String(name).trim())}&lat=${lat}&lng=${lng}`
            : VINEYARD_PLACEHOLDER
    );

    const toggleExpand = async () => {
        const nextState = !expanded;
        setExpanded(nextState);
        if (nextState && offers.length === 0) {
            setLoading(true);
            const data = await loadOffers(vineyard.id);
            setOffers(data);
            setLoading(false);
        }
    };

    const priceDisplay = vineyard.lowestCost === 0 && vineyard.highestCost === 0
        ? "Price N/A"
        : `€${vineyard.lowestCost} - €${vineyard.highestCost}`;

    const ratingDisplay = vineyard.rating > 0 ? vineyard.rating.toFixed(1) : "—";
    const location = [vineyard.subRegion, vineyard.commune].filter(Boolean).join(", ");

    const contactLink = (vineyard.gkp ?? vineyard.gkp2 ?? "").trim();

    const cardClasses = `
        rounded-2xl overflow-hidden border transition-all duration-300 bg-white
        hover:shadow-md
        ${isSelected
        ? "border-black shadow-md ring-2 ring-black/20"
        : "border-[#E0E0E0] hover:border-[#9E9E9E]"
    }
    `;

    return (
        <div className={`${cardClasses} max-w-full`}>
            <div className="relative w-full max-w-full h-48 bg-[#F5F5F5] overflow-hidden">
                <Image
                    src={imgSrc}
                    alt={vineyard.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className="object-cover opacity-90 w-full h-full"
                    priority={false}
                    onError={() => setImgSrc(VINEYARD_PLACEHOLDER)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

                {isSelected && (
                    <div className="absolute top-3 left-3 bg-black text-white rounded-full px-3 py-1 text-xs font-medium">
                        ✓ Selected
                    </div>
                )}

                {(vineyard.score ?? 0) > 0 && (
                    <span className="text-xs absolute bottom-3 left-3 flex items-center gap-1.5 tracking-tight text-white border border-[#E0E0E0] bg-black/80 px-2.5 py-1.5 rounded-lg">
                WINE SCORE {vineyard.score}
                     </span>
                )}

                {vineyard.rating > 0 && (
                    <div className="absolute bottom-3 right-3 bg-black/80 px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 border border-[#E0E0E0]">
                        <Image src={GoogleIcon} alt={"Icon"} width={12} height={12} />
                        <span className="text-white text-xs font-bold">{ratingDisplay}</span>
                        <span className="text-[#E0E0E0] text-[10px]">({vineyard.ratingUsers})</span>
                    </div>
                )}
            </div>

            <div className="p-5">
                <div className="flex justify-between items-start gap-4 mb-3">
                    <div className="min-w-0 flex-1">
            {/*            <div className="flex items-center gap-3 mb-2">*/}
            {/*/!*                /!* Score Badge - More subtle, clean emerald *!/*!/*/}
            {/*/!*                {(vineyard.score ?? 0) > 0 && (*!/*/}
            {/*/!*                    <span className="inline-flex items-center text-[10px] font-bold tracking-tight*!/*/}
            {/*/!*bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-md*!/*/}
            {/*/!*border border-emerald-500/20">*!/*/}
            {/*/!*    {vineyard.score} SCORE*!/*/}
            {/*/!*</span>*!/*/}
            {/*/!*                )}*!/*/}

            {/*                {(vineyard.instagram ?? "").trim().length > 0 && (*/}
            {/*                    <a*/}
            {/*                        href={(vineyard.instagram ?? "").trim()}*/}
            {/*                        target="_blank"*/}
            {/*                        rel="noopener noreferrer"*/}
            {/*                        className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white*/}
            {/*                        bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500*/}
            {/*                        hover:from-pink-600 hover:via-red-600 hover:to-yellow-600*/}
            {/*                        px-3 py-2 rounded-sm shadow-sm transition-all duration-300"*/}
            {/*                    >*/}
            {/*                        <InstagramIcon size={13} />*/}

            {/*                    </a>*/}
            {/*                )}*/}

            {/*                /!* Map Button *!/*/}
            {/*                {vineyard.latitude && vineyard.longitude && (*/}
            {/*                    <button*/}
            {/*                        onClick={() => setShowMapPopup(true)}*/}
            {/*                        className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white*/}
            {/*                        bg-gradient-to-r from-blue-600 to-cyan-500*/}
            {/*                        hover:from-blue-700 hover:to-cyan-600*/}
            {/*                        px-3 py-2 rounded-sm shadow-sm transition-all duration-300"*/}
            {/*                    >*/}
            {/*                        <MapPin size={12} />*/}
            {/*                        View Map*/}
            {/*                    </button>*/}
            {/*                )}*/}
            {/*            </div>*/}

                        <h3 className="text-black font-bold text-lg leading-tight mb-2">
                            {vineyard.name}
                        </h3>

                        <div className="flex items-center gap-1.5 text-[#424242] mb-4">
                            <MapPin size={12} className="text-black flex-shrink-0" />
                            <p className="text-black text-sm truncate italic">{location || "Location not specified"}</p>
                        </div>

                        <div className="flex items-center gap-1.5 mb-2">
                            {(vineyard.instagram ?? "").trim().length > 0 && (
                                <a
                                    href={(vineyard.instagram ?? "").trim()}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center p-1.5 text-black bg-white border border-[#E0E0E0] hover:bg-[#F5F5F5] rounded-sm transition-all duration-300 min-h-[32px]"
                                    aria-label="Instagram"
                                    title="Instagram"
                                >
                                    <InstagramIcon size={14} />
                                </a>
                            )}

                            {vineyard.latitude && vineyard.longitude && (
                                <button
                                    onClick={() => setShowMapPopup(true)}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 text-black text-[11px] font-medium bg-white border border-[#E0E0E0] hover:bg-[#F5F5F5] rounded-sm transition-all duration-300 min-h-[32px]"
                                    aria-label="Quick Map"
                                >
                                    <MapPin size={12} />
                                    Quick Map
                                </button>
                            )}
                        </div>
                        {contactLink.length > 0 && (
                            <button
                                onClick={() => window.open(contactLink, "_blank")}
                                className="flex items-center gap-1.5 text-xs font-bold text-black hover:bg-[#F5F5F5] bg-white px-3 py-1.5 rounded-lg border border-[#E0E0E0] transition-colors duration-200"
                            >
                                <MapPin size={11} />
                                Direct Contact
                            </button>
                        )}
                    </div>

                    <div className="flex flex-col items-end gap-3 mt-1">
                        <div className="bg-[#F5F5F5] px-3 py-2 rounded-lg flex flex-col items-center justify-center border border-[#E0E0E0] min-w-[90px]">
                            <p className="text-black text-sm font-bold text-center leading-tight">
                                {priceDisplay.includes("N/A") ? "N/A" : `${priceDisplay} pp`}
                            </p>
                        </div>

                        <div className="w-full">
                            {!isSelected ? (
                                <button
                                    onClick={() => onAdd(vineyard)}
                                    className="w-full py-3 px-4 text-sm font-bold uppercase tracking-wider rounded-xl bg-white text-black border border-black hover:bg-[#F5F5F5] active:scale-[0.98] transition-all duration-200 shadow-sm"
                                >
                                    Add to Trip
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => onRemove(vineyard.id)}
                                    className="w-full py-3 px-4 text-sm font-bold uppercase tracking-wider rounded-xl bg-black text-white hover:bg-[#222] active:scale-[0.98] transition-all duration-200 shadow-sm"
                                >
                                    Selected
                                </button>
                            )}
                        </div>

                        <button
                            onClick={toggleExpand}
                            className="text-[11px] font-bold text-black flex items-center gap-1.5 hover:underline transition-colors duration-200"
                        >
                            {expanded ? "SHOW LESS" : "SEE MORE"}
                            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>
                    </div>
                </div>

                {expanded && (
                    <div className="mt-4 pt-4 border-t border-[#E0E0E0] animate-in slide-in-from-top-2 duration-200">
                        {(vineyard.highlights?.length ?? 0) > 0 && (
                            <div className="mb-5">
                                <div className="flex items-center gap-2 mb-3">
                                    <div className="h-px w-6 bg-black"></div>
                                    <p className="text-[11px] font-black text-black uppercase tracking-widest">
                                        Highlights
                                    </p>
                                </div>

                                <ul className="grid grid-cols-1 gap-2">
                                    {vineyard.highlights?.map((h, i) => (
                                        <li
                                            key={i}
                                            className="text-sm text-black flex items-start gap-3 p-2 bg-[#F5F5F5] rounded-lg border border-[#E0E0E0]"
                                        >
                                            <div className="w-1.5 h-1.5 rounded-full bg-black mt-1.5 flex-shrink-0"></div>
                                            <span>{h}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <div className="h-px w-6 bg-black"></div>
                                <p className="text-[11px] font-black text-black uppercase tracking-widest">
                                    Available Experiences
                                </p>
                            </div>
                            {loading ? (
                                <div className="flex items-center justify-center gap-3 text-[#424242] py-4">
                                    <Loader2 className="animate-spin" size={16} />
                                    <span className="text-sm font-medium">Loading experiences...</span>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {offers.length > 0 ? offers.map(o => (
                                        <div key={o.id} className="p-4 bg-white rounded-xl border border-[#E0E0E0] hover:border-[#9E9E9E] transition-colors">
                                            <div className="flex justify-between items-start mb-2">
                                                <div className="flex-1">
                                                    <p className="font-bold text-sm text-black mb-1">{o.title}</p>
                                                    <div className="flex items-center gap-3 text-xs text-[#424242]">
                                                        {o.duration && (
                                                            <div className="flex items-center gap-1">
                                                                <Clock size={11} />
                                                                <span>{o.duration} min</span>
                                                            </div>
                                                        )}
                                                        {o.type && (
                                                            <span className="px-2 py-0.5 bg-[#F5F5F5] border border-[#E0E0E0] rounded text-[10px] font-medium">
                                                                {o.type}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <span className="font-bold text-black text-sm ml-2">
                                                    {o.price > 0 ? `€${o.price}` : "N/A"}
                                                </span>
                                            </div>
                                        </div>
                                    )) : (
                                        <div className="p-4 bg-[#F5F5F5] rounded-xl border border-[#E0E0E0]">
                                            <p className="text-sm italic text-[#424242] text-center">
                                                Contact winery directly for availability.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Map Popup */}
            {showMapPopup && vineyard.latitude && vineyard.longitude && (
                <MapPopup
                    latitude={vineyard.latitude}
                    longitude={vineyard.longitude}
                    vineyardName={vineyard.name}
                    onClose={() => setShowMapPopup(false)}
                />
            )}
        </div>
    );
}