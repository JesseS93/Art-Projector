// Runs marker detection off the main thread so the camera view stays smooth.
importScripts('lib/cv.js', 'lib/aruco.js');
const detector = new AR.Detector({ dictionaryName: 'ARUCO_MIP_36h12', maxHammingDistance: 4 });
onmessage = (e) => {
  const { w, h, buf, k } = e.data;
  let markers = [];
  try {
    markers = detector.detect({ width: w, height: h, data: new Uint8ClampedArray(buf) })
      .filter((m) => m.id <= 2)
      .map((m) => ({ id: m.id, c: m.corners.map((p) => [p.x + 0.5, p.y + 0.5]) }));
  } catch (err) {}
  postMessage({ markers, k });
};
