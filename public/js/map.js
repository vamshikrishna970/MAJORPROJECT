(() => {
  const mapElement = document.getElementById("map");
  if (!mapElement) return;

  const token = mapElement.dataset.token;
  const coordinates = JSON.parse(mapElement.dataset.coordinates || "[0,0]");

  if (!token || coordinates.every((coordinate) => coordinate === 0)) {
    mapElement.classList.add("map-placeholder");
    mapElement.textContent = "Map preview will appear when MAP_TOKEN is configured.";
    return;
  }

  mapboxgl.accessToken = token;
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: coordinates,
    zoom: 9,
  });

  const popupContent = document.createElement("div");
  const popupTitle = document.createElement("h6");
  const popupDescription = document.createElement("p");
  popupTitle.textContent = mapElement.dataset.title;
  popupDescription.textContent = mapElement.dataset.description;
  popupContent.append(popupTitle, popupDescription);

  new mapboxgl.Marker({ color: "#fe424d" })
    .setLngLat(coordinates)
    .setPopup(
      new mapboxgl.Popup({ offset: 25 }).setDOMContent(popupContent)
    )
    .addTo(map);
})();
