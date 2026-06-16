let headsTexture;
let tailsTexture;
let sideTexture;
function preload() {
  headsTexture = loadImage("/imgs/heads.jpg");
  tailsTexture = loadImage("/imgs/tails.jpg");
  sideTexture = loadImage("/imgs/edge.jpg");
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  cam = createCamera();
  //cam.roll(-QUARTER_PI/4)
  heads = buildGeometry(createDisk);
  tails = buildGeometry(createDisk);
}

theta = 0;

function draw() {
  background(220);
  orbitControl();

  let angle = frameCount * 0.03;
  //rotateX(-angle);
  //rotateZ(-angle);
  rotateY(angle / 10);

  createCoin(-angle / 2);
}

function createCoin(angleX = 0, angleY = 0, angleZ = 0) {
  push();

  rotateX(angleX);
  rotateX(angleY);
  rotateX(angleZ);

  noStroke();
  let radius = 100;
  let depth = 7.23;
  textureWrap(REPEAT);
  texture(sideTexture);
  cylinder(radius, depth, 50, 1, false, false);

  push();
  translate(0, -depth / 2, 0);
  rotateX(HALF_PI);
  texture(headsTexture);
  model(heads);
  pop();

  push();
  translate(0, depth / 2, 0);
  rotateX(HALF_PI);
  texture(tailsTexture);
  model(tails);
  pop();

  pop();
}

function createDisk(radius = 100, sides = 50) {
  beginShape(TRIANGLE_FAN);
  // Center of the cap
  vertex(0, 0, 0, 0.5, 0.5);

  // Edge vertices
  for (let i = 0; i <= sides; i++) {
    let angle = map(i, 0, sides, 0, TWO_PI);
    let x = cos(angle) * radius;
    let y = sin(angle) * radius;

    // Normalized UV coordinates
    let u = cos(angle) * 0.5 + 0.5;
    let v = sin(angle) * 0.5 + 0.5;

    vertex(x, y, 0, u, v);
  }
  endShape();
}
