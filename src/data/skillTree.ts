import type { SkillNode } from "../types";

const FOUNDATION_IDS = [
  "circuit-fundamentals",
  "component-literacy",
  "test-equipment-basics",
  "soldering-skills",
];

export const skillTree: SkillNode[] = [
  // --- Foundations (required before branching into any track) ---
  {
    id: "circuit-fundamentals",
    title: "Circuit Fundamentals",
    category: "foundations",
    description:
      "Ohm's/Kirchhoff's laws, power rails & decoupling, pull-up/pull-down resistors.",
    prerequisiteIds: [],
    lessonId: "circuit-fundamentals",
    position: { x: 0, y: 0 },
  },
  {
    id: "component-literacy",
    title: "Component Literacy",
    category: "foundations",
    description:
      "Reading datasheets, abs. max ratings/pinouts, passives/diodes/ICs.",
    prerequisiteIds: [],
    lessonId: "component-literacy",
    position: { x: 0, y: 160 },
  },
  {
    id: "test-equipment-basics",
    title: "Test Equipment Basics",
    category: "foundations",
    description:
      "Multimeter voltage, continuity checks, bench power supply use.",
    prerequisiteIds: [],
    lessonId: "test-equipment-basics",
    position: { x: 0, y: 320 },
  },
  {
    id: "soldering-skills",
    title: "Soldering Skills",
    category: "foundations",
    description:
      "Through-hole, SMD with iron, hot air/reflow rework.",
    prerequisiteIds: [],
    lessonId: "soldering-skills",
    position: { x: 0, y: 480 },
  },

  // --- Track 1: PCB design & layout ---
  {
    id: "schematic-capture",
    title: "Schematic Capture",
    category: "pcb-design",
    description:
      "Symbols/footprints (KiCad), net labels/sheet hierarchy, ERC.",
    prerequisiteIds: FOUNDATION_IDS,
    lessonId: "schematic-capture",
    position: { x: 360, y: 0 },
  },
  {
    id: "pcb-layout",
    title: "PCB Layout",
    category: "pcb-design",
    description:
      "Trace width for current, ground pours/via stitching, DRC.",
    prerequisiteIds: ["schematic-capture"],
    lessonId: "pcb-layout",
    position: { x: 680, y: 0 },
  },
  {
    id: "fab-assembly",
    title: "Fab & Assembly",
    category: "pcb-design",
    description:
      "Gerbers/drill files, ordering (JLCPCB/PCBWay), BOM & CPL.",
    prerequisiteIds: ["pcb-layout"],
    lessonId: "fab-assembly",
    position: { x: 1000, y: 0 },
  },
  {
    id: "hardware-testing",
    title: "Hardware Testing",
    category: "pcb-design",
    description:
      "Visual inspection/continuity, smoke test, SWD detect via ST-Link.",
    prerequisiteIds: ["fab-assembly"],
    lessonId: "hardware-testing",
    position: { x: 1320, y: 0 },
  },
  {
    id: "signal-integrity",
    title: "Signal Integrity (Advanced)",
    category: "pcb-design",
    description:
      "Multi-board hierarchy/KiKit, impedance control/EMI, panelization.",
    prerequisiteIds: ["hardware-testing"],
    lessonId: "signal-integrity",
    position: { x: 1640, y: 0 },
  },

  // --- Track 2: Firmware & MCU ---
  {
    id: "mcu-configuration",
    title: "MCU Configuration",
    category: "firmware",
    description:
      "STM32CubeMX (GPIO, clocks), UART/SPI/I2C setup, HAL basics.",
    prerequisiteIds: FOUNDATION_IDS,
    lessonId: "mcu-configuration",
    position: { x: 360, y: 240 },
  },
  {
    id: "timers-interrupts",
    title: "Timers & Interrupts",
    category: "firmware",
    description:
      "TIM peripherals/PWM, interrupt-driven code, DMA transfers.",
    prerequisiteIds: ["mcu-configuration"],
    lessonId: "timers-interrupts",
    position: { x: 680, y: 240 },
  },
  {
    id: "debugging",
    title: "Debugging",
    category: "firmware",
    description:
      "SWD/ST-Link bring-up, SWO trace/printf debug, logic analyzer/scope.",
    prerequisiteIds: ["timers-interrupts"],
    lessonId: "debugging",
    position: { x: 1000, y: 240 },
  },
  {
    id: "rtos-integration",
    title: "RTOS & Integration (Advanced)",
    category: "firmware",
    description:
      "FreeRTOS task structuring, Simulink glue code, control-loop timing accuracy.",
    prerequisiteIds: ["debugging"],
    lessonId: "rtos-integration",
    position: { x: 1320, y: 240 },
  },

  // --- Track 3: Sensors & signal processing ---
  {
    id: "sensor-communication",
    title: "Sensor Communication",
    category: "sensors",
    description:
      "SPI/I2C register reads, device ID verification, bus-level debugging.",
    prerequisiteIds: FOUNDATION_IDS,
    lessonId: "sensor-communication",
    position: { x: 360, y: 480 },
  },
  {
    id: "imu-baro-interfacing",
    title: "IMU & Baro Interfacing",
    category: "sensors",
    description:
      "Reading raw sensor data, basic calibration, units/coordinate frames.",
    prerequisiteIds: ["sensor-communication"],
    lessonId: "imu-baro-interfacing",
    position: { x: 680, y: 480 },
  },
  {
    id: "telemetry-logging",
    title: "Telemetry & Logging",
    category: "sensors",
    description:
      "XBee radio link, SD card logging, data formatting for review.",
    prerequisiteIds: ["imu-baro-interfacing"],
    lessonId: "telemetry-logging",
    position: { x: 1000, y: 480 },
  },
  {
    id: "sensor-fusion",
    title: "Sensor Fusion (Advanced)",
    category: "sensors",
    description:
      "Complementary/Kalman filters, rate matching to control loop, multi-sensor fusion.",
    prerequisiteIds: ["telemetry-logging"],
    lessonId: "sensor-fusion",
    position: { x: 1320, y: 480 },
  },
];

export const skillTreeById: Record<string, SkillNode> = Object.fromEntries(
  skillTree.map((node) => [node.id, node]),
);

export const categoryLabels: Record<SkillNode["category"], string> = {
  foundations: "Foundations",
  "pcb-design": "PCB Design & Layout",
  firmware: "Firmware & MCU",
  sensors: "Sensors & Signal Processing",
};
