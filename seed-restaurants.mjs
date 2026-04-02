import { MongoClient } from "mongodb";

const uri = "mongodb+srv://workspace:xckkHX5pp1nUGYAQ@cluster0.sqke7to.mongodb.net/vineyard";

const restaurants = [
  // Champagne - Épernay
  { "Restaurant ID": "R001", "Restaurants": "Le Théâtre", "Country": "France", "Region": "Champagne", "Sub Region": "Épernay", "Commune": "Épernay", "Type": "Fine Dining", "Short Description": "Elegant dining with seasonal French cuisine and an extensive champagne list.", "G": 4.5, "Latitude": 49.0420, "Longitude": 3.9530, "Lunch Cost (€)": 55, "Bracket": "€€€", "Open": "Tue–Sat" },
  { "Restaurant ID": "R002", "Restaurants": "La Grillade Gourmande", "Country": "France", "Region": "Champagne", "Sub Region": "Épernay", "Commune": "Épernay", "Type": "Bistro", "Short Description": "Popular local bistro with grilled meats and regional specialties.", "G": 4.3, "Latitude": 49.0410, "Longitude": 3.9520, "Lunch Cost (€)": 28, "Bracket": "€€", "Open": "Mon–Sat" },
  // Champagne - Reims
  { "Restaurant ID": "R003", "Restaurants": "Le Foch", "Country": "France", "Region": "Champagne", "Sub Region": "Reims", "Commune": "Reims", "Type": "Fine Dining", "Short Description": "Michelin-starred restaurant with creative French cuisine and garden terrace.", "G": 4.7, "Latitude": 49.2530, "Longitude": 3.9900, "Lunch Cost (€)": 75, "Bracket": "€€€", "Open": "Tue–Sat" },
  { "Restaurant ID": "R004", "Restaurants": "Café du Palais", "Country": "France", "Region": "Champagne", "Sub Region": "Reims", "Commune": "Reims", "Type": "Brasserie", "Short Description": "Art Deco gem serving classic French brasserie dishes since 1930.", "G": 4.4, "Latitude": 49.2520, "Longitude": 3.9880, "Lunch Cost (€)": 32, "Bracket": "€€", "Open": "Daily" },
  { "Restaurant ID": "R005", "Restaurants": "Le Jardin Les Crayères", "Country": "France", "Region": "Champagne", "Sub Region": "Reims", "Commune": "Reims", "Type": "Fine Dining", "Short Description": "Brasserie in the grounds of a luxury château hotel, elegant garden setting.", "G": 4.6, "Latitude": 49.2300, "Longitude": 3.9950, "Lunch Cost (€)": 65, "Bracket": "€€€", "Open": "Daily" },
  // Bordeaux - Médoc
  { "Restaurant ID": "R006", "Restaurants": "Le Lion d'Or", "Country": "France", "Region": "Bordeaux", "Sub Region": "Médoc", "Commune": "Margaux", "Type": "Bistro", "Short Description": "Charming village bistro near the famous châteaux, local wines by the glass.", "G": 4.2, "Latitude": 45.0450, "Longitude": -0.6750, "Lunch Cost (€)": 22, "Bracket": "€€", "Open": "Tue–Sun" },
  // Bordeaux - Pauillac
  { "Restaurant ID": "R007", "Restaurants": "Café Lavinal", "Country": "France", "Region": "Bordeaux", "Sub Region": "Pauillac", "Commune": "Pauillac", "Type": "Bistro", "Short Description": "Lynch-Bages village bistro with vineyard views and Bordeaux classics.", "G": 4.4, "Latitude": 45.2010, "Longitude": -0.7510, "Lunch Cost (€)": 35, "Bracket": "€€", "Open": "Daily" },
  // Burgundy - Côte de Nuits
  { "Restaurant ID": "R008", "Restaurants": "Ma Cuisine", "Country": "France", "Region": "Burgundy", "Sub Region": "Côte de Nuits", "Commune": "Beaune", "Type": "Wine Bar", "Short Description": "Legendary wine bar with 600+ Burgundy references and simple market cuisine.", "G": 4.6, "Latitude": 47.0230, "Longitude": 4.8380, "Lunch Cost (€)": 30, "Bracket": "€€", "Open": "Mon–Fri" },
  { "Restaurant ID": "R009", "Restaurants": "Le Charlemagne", "Country": "France", "Region": "Burgundy", "Sub Region": "Côte de Nuits", "Commune": "Pernand-Vergelesses", "Type": "Fine Dining", "Short Description": "Panoramic vineyard views and refined Burgundian cuisine.", "G": 4.7, "Latitude": 47.0800, "Longitude": 4.8500, "Lunch Cost (€)": 80, "Bracket": "€€€", "Open": "Wed–Sun" },
  // Tuscany - Chianti Classico
  { "Restaurant ID": "R010", "Restaurants": "Rinuccio 1180", "Country": "Italy", "Region": "Tuscany", "Sub Region": "Chianti Classico", "Commune": "San Casciano", "Type": "Trattoria", "Short Description": "Antinori's panoramic restaurant with Tuscan menu and estate wines.", "G": 4.5, "Latitude": 43.6580, "Longitude": 11.1860, "Lunch Cost (€)": 45, "Bracket": "€€€", "Open": "Daily" },
  // Tuscany - Montalcino
  { "Restaurant ID": "R011", "Restaurants": "La Taverna dei Barbi", "Country": "Italy", "Region": "Tuscany", "Sub Region": "Montalcino", "Commune": "Montalcino", "Type": "Trattoria", "Short Description": "Rustic farmhouse dining with homemade pasta and Brunello pairings.", "G": 4.4, "Latitude": 42.8920, "Longitude": 11.4820, "Lunch Cost (€)": 30, "Bracket": "€€", "Open": "Daily" },
  // Spain - Rioja Alavesa
  { "Restaurant ID": "R012", "Restaurants": "Restaurante Marqués de Riscal", "Country": "Spain", "Region": "Rioja", "Sub Region": "Rioja Alavesa", "Commune": "Elciego", "Type": "Fine Dining", "Short Description": "Frank Gehry hotel restaurant with innovative Basque-Riojan cuisine.", "G": 4.6, "Latitude": 42.5090, "Longitude": -2.6130, "Lunch Cost (€)": 70, "Bracket": "€€€", "Open": "Daily" },
];

async function seed() {
  console.log("Connecting to MongoDB...");
  const client = await MongoClient.connect(uri);
  const db = client.db("smartRoute");
  const col = db.collection("restaurants");

  const count = await col.countDocuments();
  if (count === 0) {
    const result = await col.insertMany(restaurants);
    console.log(`✅ Seeded ${result.insertedCount} restaurants`);
  } else {
    console.log(`Already has ${count} restaurants, skipping seed`);
  }

  await client.close();
  console.log("Done!");
}

seed().catch(e => { console.error("Error:", e.message); process.exit(1); });
