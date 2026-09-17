<script setup lang="ts">
// Purely presentational — architecture of the Silk Road smart pantry.
</script>

<template>
  <figure class="diagram" role="img"
    aria-label="System architecture: pantry sensors feed an STM32 Nucleo, which talks UART to a Raspberry Pi. The Pi captures images, delegates recognition to a central PC running a ResNet-50 CNN over WiFi, and updates a local MariaDB plus a cloud MySQL database, which an Android app reads through a Flask JSON API.">
    <p class="mono diagram-label">System architecture</p>
    <svg viewBox="0 0 920 560" fill="none" aria-hidden="true">
      <defs>
        <marker id="arr" markerWidth="9" markerHeight="9" refX="6.5" refY="3.5" orient="auto-start-reverse">
          <path d="M0 0L7.5 3.5L0 7" stroke="var(--dim)" stroke-width="1.1" fill="none" />
        </marker>
        <marker id="arrA" markerWidth="9" markerHeight="9" refX="6.5" refY="3.5" orient="auto-start-reverse">
          <path d="M0 0L7.5 3.5L0 7" stroke="var(--accent)" stroke-width="1.1" fill="none" />
        </marker>
      </defs>

      <!-- ======== edges ======== -->
      <!-- pantry -> stm32 -->
      <path class="edge" d="M210 120 H262" marker-end="url(#arr)" />
      <text class="edge-label edge-label--sm" x="240" y="106" text-anchor="middle">I2C · EXTI</text>

      <!-- stm32 <-> raspberry (UART) -->
      <path class="edge edge--accent edge--live" d="M460 120 H502" marker-start="url(#arrA)" marker-end="url(#arrA)" />
      <text class="edge-label edge-label--accent edge-label--sm" x="481" y="106" text-anchor="middle">UART</text>
      <text class="edge-label edge-label--accent edge-label--sm" x="481" y="136" text-anchor="middle">START·OK</text>

      <!-- raspberry <-> central pc (wifi, elbow) -->
      <path class="edge edge--wifi" d="M572 180 V252 H362 V372" marker-start="url(#arr)" marker-end="url(#arr)" />
      <text class="edge-label" x="467" y="238" text-anchor="middle">WIFI · SOCKET + TFTP</text>

      <!-- raspberry <-> local db -->
      <path class="edge" d="M636 180 V372" marker-start="url(#arr)" marker-end="url(#arr)" />
      <text class="edge-label" x="652" y="282">SQL</text>

      <!-- local db -> cloud db -->
      <path class="edge" d="M700 440 H742" marker-start="url(#arr)" marker-end="url(#arr)" />
      <text class="edge-label edge-label--sm" x="721" y="430" text-anchor="middle">SYNC·SQL</text>

      <!-- cloud db <-> app -->
      <path class="edge edge--wifi" d="M825 380 V188" marker-start="url(#arr)" marker-end="url(#arr)" />
      <text class="edge-label edge-label--rot" transform="rotate(-90 810 284)" x="810" y="284" text-anchor="middle">HTTP · JSON — FLASK API</text>

      <!-- ======== nodes ======== -->
      <g class="node">
        <rect x="30" y="60" width="180" height="120" />
        <text class="node-title" x="46" y="94">PANTRY</text>
        <text class="node-sub" x="46" y="122">VL53L0X ToF · limit switch</text>
        <text class="node-sub" x="46" y="141">status LEDs · 3 cameras</text>
      </g>

      <g class="node">
        <rect x="270" y="60" width="190" height="120" />
        <text class="node-title" x="286" y="94">STM32 NUCLEO-F401RE</text>
        <text class="node-sub" x="286" y="122">C firmware · state machine</text>
        <text class="node-sub" x="286" y="141">GPIO · EXTI · I2C</text>
      </g>

      <g class="node">
        <rect x="510" y="60" width="190" height="120" />
        <text class="node-title" x="526" y="94">RASPBERRY PI</text>
        <text class="node-sub" x="526" y="122">Python control core</text>
        <text class="node-sub" x="526" y="141">cameras · DB updates</text>
      </g>

      <g class="node">
        <rect x="750" y="60" width="150" height="120" />
        <text class="node-title" x="766" y="94">ANDROID APP</text>
        <text class="node-sub" x="766" y="122">live inventory</text>
        <text class="node-sub" x="766" y="141">shopping list</text>
      </g>

      <g class="node">
        <rect x="270" y="380" width="190" height="120" />
        <text class="node-title" x="286" y="414">CENTRAL PC</text>
        <text class="node-sub" x="286" y="442">MATLAB · ResNet-50 CNN</text>
        <text class="node-sub" x="286" y="461">≥ 90% frame consensus</text>
      </g>

      <g class="node">
        <rect x="510" y="380" width="190" height="120" />
        <text class="node-title" x="526" y="414">LOCAL DB</text>
        <text class="node-sub" x="526" y="442">MariaDB · on-device</text>
        <text class="node-sub" x="526" y="461">offline fallback copy</text>
      </g>

      <g class="node">
        <rect x="750" y="380" width="150" height="120" />
        <text class="node-title" x="766" y="414">CLOUD DB</text>
        <text class="node-sub" x="766" y="442">MySQL</text>
        <text class="node-sub" x="766" y="461">Google Cloud</text>
      </g>
    </svg>
  </figure>
</template>

<style scoped>
.diagram {
  margin: 0;
}

.diagram-label {
  color: var(--faint);
  font-size: 0.625rem;
  letter-spacing: 0.14em;
  margin-bottom: 1rem;
}

svg {
  display: block;
  width: 100%;
  height: auto;
}

.node rect {
  fill: var(--bg-raise);
  stroke: var(--line);
  stroke-width: 1;
  transition: stroke-color 0.3s ease;
}

.node:hover rect {
  stroke: var(--accent);
}

.node-title {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.14em;
  fill: var(--text);
}

.node-sub {
  font-family: var(--font-mono);
  font-size: 9.5px;
  letter-spacing: 0.06em;
  fill: var(--faint);
}

.edge {
  stroke: var(--dim);
  stroke-width: 1.1;
}

.edge--wifi {
  stroke-dasharray: 5 5;
}

.edge--accent {
  stroke: var(--accent);
}

.edge--live {
  stroke-dasharray: 4 4;
  animation: dash-flow 1.4s linear infinite;
}

@keyframes dash-flow {
  to {
    stroke-dashoffset: -8;
  }
}

.edge-label {
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.12em;
  fill: var(--faint);
}

.edge-label--sm {
  font-size: 8px;
  letter-spacing: 0.1em;
}

.edge-label--accent {
  fill: var(--accent);
}

.edge-label--rot {
  fill: var(--faint);
}
</style>
