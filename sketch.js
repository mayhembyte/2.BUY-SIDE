///sketch.js - buy_side



/// 2. BUY-SIDE

let t = 0;
let phase = 0;
let totalDuration = 7 * 60; // 7 segundos em frames (~60fps)
let phasesCount = 3;
let durationPerPhase = totalDuration / phasesCount;

let circlePositions = [-1.5, -0.5, 0.5, 1.5];
let baseRadius = 150; // raio para círculo de ~300px diâmetro
let maxOffset = 60;   // distância máxima para expansão lateral

function setup() {
  createCanvas(500, 500);
  noFill();
  stroke(255);
  strokeWeight(1.5);
}

function draw() {
  background(20);
  translate(width / 2, height / 2);

  // Calcula progresso na fase atual [0..1]
  let progress = constrain((t % durationPerPhase) / durationPerPhase, 0, 1);
  let eased = easeInOutCubic(progress);

  if (phase === 0) {
    // Fase 0: círculos expandem lateralmente
    let offset = eased * maxOffset;
    for (let i = 0; i < 4; i++) {
      let x = circlePositions[i] * offset;
      ellipse(x, 0, baseRadius * 2);
    }
  } else if (phase === 1) {
    // Fase 1: círculos retornam ao centro
    let offset = (1 - eased) * maxOffset;
    for (let i = 0; i < 4; i++) {
      let x = circlePositions[i] * offset;
      ellipse(x, 0, baseRadius * 2);
    }
  } else if (phase === 2) {
    // Fase 2: círculos concêntricos pulsam
    let pulse = 0.5 + 0.5 * sin(PI * progress); // varia de 1 → 0.5 → 1
    for (let i = 0; i < 4; i++) {
      let scale = 1 - i * 0.2 * pulse;
      ellipse(0, 0, baseRadius * 2 * scale);
    }
  }

  // Atualiza tempo e controla mudança de fase
  t++;
  if (t % durationPerPhase === 0) {
    phase = (phase + 1) % phasesCount;
  }
}

// Easing cúbico suave
function easeInOutCubic(t) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - pow(-2 * t + 2, 3) / 2;
}

//// TEMPO TOTAL DA ANIMAÇÃO: 7s