// Initialize map centered on Oran, Algeria
var map = L.map('map').setView([35.697, -0.634], 13);

// OpenStreetMap base layer
var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Esri Satellite
var satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  maxZoom: 19,
  attribution: 'Tiles © Esri — Maxar, Earthstar Geographics'
});

// Carto Dark Mode
var dark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  maxZoom: 20,
  subdomains: 'abcd',
  attribution: '&copy; OpenStreetMap & CartoDB'
});

// Add layer switcher
L.control.layers({
  "OpenStreetMap": osm,
  "Satellite (Esri)": satellite,
  "Dark Mode": dark
}).addTo(map);

// Load and add GeoJSON roads
fetch('oran_roads.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      style: {
        color: 'red',
        weight: 2
      }
    }).addTo(map);
  })
  .catch(err => console.error("GeoJSON load error:", err));
