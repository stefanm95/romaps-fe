export const fetchHighways = async () => {
  const res = await fetch("/api/GeoData/highways", {
    mode: "cors",
  });
  if (!res.ok) throw new Error("Failed to fetch highways");
  return res.json();
};

export const fetchBorders = async () => {
  const res = await fetch("/api/GeoData/borders", {
    mode: "cors",
  });
  if (!res.ok) throw new Error("Failed to fetch borders");
  return res.json();
};

export const fetchNationalRoads = async () => {
  const res = await fetch("/api/GeoData/nationalRoads", {
    mode: "cors",
  });
  if (!res.ok) throw new Error("Failed to fetch national roads");
  return res.json();
};

export async function fetchNationalRoadsByRef(ref) {
  const response = await fetch(`/api/GeoData/nationalRoads/filter?refValue=${encodeURIComponent(ref)}`);
  if (!response.ok) throw new Error("Failed to fetch national roads by ref");
  return response.json();
}
