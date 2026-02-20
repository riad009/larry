/* data/regionalHighlights.ts */

export interface RegionalHighlight {
    regionName: string;
    vineyardCount: string;
    subRegionVarietals: string[];
    closestMajorCity: string;
    closestTravelTime: string;
    pointsOfInterest: string;
    videoUrl: string;
}

export const REGIONAL_HIGHLIGHTS_DATA: Record<string, RegionalHighlight> = {
    "CHAMPAGNE": {
        regionName: "Champagne",
        vineyardCount: "200",
        subRegionVarietals: [
            "Montagne de Reims: Pinot Noir",
            "Vallée de la Marne: Pinot Meunier",
            "Côte des Blancs: Chardonnay",
            "Côte de Sézanne: Chardonnay",
            "Côte des Bar: Pinot Noir"
        ],
        closestMajorCity: "Paris, Gare de l'Est, CDG",
        closestTravelTime: "Paris → Reims: 45m | Paris → Épernay: ~1h20",
        pointsOfInterest: "Reims: Veuve Clicquot, Taittinger, UNESCO Cathedral; Épernay: Avenue de Champagne, Moët; Hautvillers: Dom Pérignon's Tomb",
        videoUrl: "https://www.youtube.com/watch?v=um10vnGXxw4&t=24s"
    },
    "BORDEAUX": {
        regionName: "Bordeaux",
        vineyardCount: "~350",
        subRegionVarietals: [
            "Médoc: Cabernet Sauvignon",
            "Pessac-Léognan: Cabernet/Merlot, Sauvignon/Sémillon whites",
            "Sauternes/Barsac: Sémillon-led sweet whites",
            "Saint-Émilion & Pomerol: Merlot & Cabernet Franc"
        ],
        closestMajorCity: "Bordeaux, Gare St-Jean, BOD",
        closestTravelTime: "Paris → Bordeaux: 2h05",
        pointsOfInterest: "Médoc: Château Margaux; Saint-Émilion: UNESCO medieval village; Pessac-Léognan: Les Sources de Caudalie Spa; Sauternes: Château d'Yquem",
        videoUrl: "https://www.youtube.com/watch?v=EIXKuJSC20o"
    },
    "BURGUNDY": {
        regionName: "Burgundy",
        vineyardCount: "~250",
        subRegionVarietals: [
            "Chablis: Chardonnay",
            "Côte de Nuits: Pinot Noir",
            "Côte de Beaune: Chardonnay",
            "Côte Chalonnaise: Chardonnay",
            "Mâconnais: Chardonnay",
            "Beaujolais: Gamay"
        ],
        closestMajorCity: "Paris, Gare de Lyon",
        closestTravelTime: "Paris → Dijon: 1h35 | Paris → Beaune: ~2h05",
        pointsOfInterest: "Beaune: Hospices; Dijon: Historic centre; Beaujolais: Golden Stones villages",
        videoUrl: "https://www.youtube.com/watch?v=CNQsaRL5v1g"
    },
    "RHONE VALLEY": {
        regionName: "Rhône Valley",
        vineyardCount: "~180",
        subRegionVarietals: [
            "Northern Rhône: Syrah, Viognier, Marsanne, Roussanne",
            "Southern Rhône: Grenache, Syrah, Mourvèdre, Clairette"
        ],
        closestMajorCity: "Lyon (LYS), Avignon TGV",
        closestTravelTime: "Paris → Lyon: 2h | Paris → Avignon: 2h35",
        pointsOfInterest: "Lyon: Vieux Lyon & Gastronomy capital; Châteauneuf-du-Pape; Avignon: Palais des Papes",
        videoUrl: "https://www.youtube.com/watch?v=9seZ7FdA50U"
    },
    "ALSACE": {
        regionName: "Alsace",
        vineyardCount: "~200",
        subRegionVarietals: [
            "Bas-Rhin: Riesling, Pinot Blanc, Sylvaner",
            "Central Alsace: Pinot Gris, Riesling, Gewurztraminer",
            "Haut-Rhin: Gewurztraminer, Pinot Gris, Riesling, Pinot Noir"
        ],
        closestMajorCity: "Strasbourg, SXB",
        closestTravelTime: "Paris → Strasbourg: 1h45 | Paris → Colmar: ~2h15",
        pointsOfInterest: "Strasbourg: Cathedral & Petite France; Colmar: Old Town; Medieval Villages; Haut-Koenigsbourg fortress",
        videoUrl: "https://www.youtube.com/watch?v=aD5zLAN8X9s"
    },
    "LOIRE VALLEY": {
        regionName: "Loire Valley",
        vineyardCount: "~250",
        subRegionVarietals: [
            "Vouvray/Montlouis: Chenin Blanc",
            "Saumur/Chinon: Cabernet Franc & Crémant",
            "Touraine: Sauvignon & Chenin mix"
        ],
        closestMajorCity: "Paris, CDG/ORY",
        closestTravelTime: "Paris → Tours: 1h | Paris → Saumur: 2h15-2h30",
        pointsOfInterest: "Châteaux: Chambord, Chenonceau, Villandry; Clos Lucé; Vouvray: Tuffeau cellars",
        videoUrl: "https://www.youtube.com/watch?v=_Dna5v2B1cg"
    },
    "PROVENCE": {
        regionName: "Provence",
        vineyardCount: "~150",
        subRegionVarietals: [
            "Côtes de Provence: Rosé blends",
            "Bandol: Mourvèdre rosé & reds",
            "Cassis: White blends"
        ],
        closestMajorCity: "Marseille (MRS), Nice (NCE)",
        closestTravelTime: "Paris → Marseille: 3h | Paris → Nice: 5h40-6h15",
        pointsOfInterest: "Cassis & Calanques; Arles & Aix-en-Provence; Matisse Museum, Maeght Foundation",
        videoUrl: "https://www.youtube.com/watch?v=bSdoykuVMFY"
    },
    "SOUTH-WEST": {
        regionName: "South-West",
        vineyardCount: "160",
        subRegionVarietals: [
            "Bergerac/Duras: Merlot/Cabernet",
            "Cahors: Malbec (Côt)",
            "Jurançon: Petit & Gros Manseng",
            "Madiran: Tannat"
        ],
        closestMajorCity: "Toulouse (TLS), Bordeaux (BOD)",
        closestTravelTime: "Paris → Toulouse: 4h30-4h50 | Paris → Bordeaux: 2h05",
        pointsOfInterest: "Rocamadour; Périgord Noir; Cahors medieval bridge",
        videoUrl: "https://www.youtube.com/watch?v=lKpTVo3XVxM"
    },
    "LANGUEDOC-ROUSSILLON": {
        regionName: "Languedoc-Roussillon",
        vineyardCount: "128",
        subRegionVarietals: [
            "Reds/Rosés (blends): Grenache, Syrah, Mourvèdre, Carignan",
            "Signature white: Picpoul",
            "Sparkling (Limoux): Mauzac, Chardonnay, Chenin Blanc",
            "Roussillon sweet/fortified: Grenache, Muscat, Macabeu"
        ],
        closestMajorCity: "Montpellier (MPL), Perpignan (PGF)",
        closestTravelTime: "Paris → Montpellier: 3h12m | Toulouse → Narbonne: 1h12m",
        pointsOfInterest: "Carcassonne (UNESCO World Heritage); Canal du Midi (UNESCO World Heritage)",
        videoUrl: "https://m.youtube.com/watch?v=Q1GzjQuYbVo"
    }
};