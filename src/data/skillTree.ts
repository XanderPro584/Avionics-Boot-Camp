import type { SkillNode } from "../types";

// Every track starts only after all four Foundations skills are done.
const FOUNDATION_IDS = [
  "circuit-fundamentals",
  "component-literacy",
  "test-equipment-basics",
  "soldering-skills",
];

export const skillTree: SkillNode[] = [
  // --- Foundations ---
  {
    id: "circuit-fundamentals",
    title: "Circuit Fundamentals",
    category: "foundations",
    description:
      "Ohm's/Kirchhoff's laws, power rails & decoupling, pull-up/pull-down resistors.",
    prerequisiteIds: [],
  },
  {
    id: "component-literacy",
    title: "Component Literacy",
    category: "foundations",
    description:
      "Reading datasheets, abs. max ratings/pinouts, passives/diodes/ICs.",
    prerequisiteIds: [],
  },
  {
    id: "test-equipment-basics",
    title: "Test Equipment Basics",
    category: "foundations",
    description:
      "Multimeter voltage, continuity checks, bench power supply use.",
    prerequisiteIds: [],
  },
  {
    id: "soldering-skills",
    title: "Soldering Skills",
    category: "foundations",
    description: "Through-hole, SMD with iron, hot air/reflow rework.",
    prerequisiteIds: [],
  },

  // --- Track 1: PCB design & layout ---
  {
    id: "schematic-capture",
    title: "Schematic Capture",
    category: "pcb-design",
    description: "Symbols/footprints (KiCad), net labels/sheet hierarchy, ERC.",
    prerequisiteIds: FOUNDATION_IDS,
  },
  {
    id: "pcb-layout",
    title: "PCB Layout",
    category: "pcb-design",
    description: "Trace width for current, ground pours/via stitching, DRC.",
    prerequisiteIds: ["schematic-capture"],
  },
  {
    id: "fab-assembly",
    title: "Fab & Assembly",
    category: "pcb-design",
    description: "Gerbers/drill files, ordering (JLCPCB/PCBWay), BOM & CPL.",
    prerequisiteIds: ["pcb-layout"],
  },
  {
    id: "hardware-testing",
    title: "Hardware Testing",
    category: "pcb-design",
    description:
      "Visual inspection/continuity, smoke test, SWD detect via ST-Link.",
    prerequisiteIds: ["fab-assembly"],
  },
  {
    id: "signal-integrity",
    title: "Signal Integrity (Advanced)",
    category: "pcb-design",
    description:
      "Multi-board hierarchy/KiKit, impedance control/EMI, panelization.",
    prerequisiteIds: ["hardware-testing"],
  },

  // --- Track 2: Firmware & MCU ---
  {
    id: "mcu-configuration",
    title: "MCU Configuration",
    category: "firmware",
    description: "STM32CubeMX (GPIO, clocks), UART/SPI/I2C setup, HAL basics.",
    prerequisiteIds: FOUNDATION_IDS,
  },
  {
    id: "timers-interrupts",
    title: "Timers & Interrupts",
    category: "firmware",
    description: "TIM peripherals/PWM, interrupt-driven code, DMA transfers.",
    prerequisiteIds: ["mcu-configuration"],
  },
  {
    id: "debugging",
    title: "Debugging",
    category: "firmware",
    description:
      "SWD/ST-Link bring-up, SWO trace/printf debug, logic analyzer/scope.",
    prerequisiteIds: ["timers-interrupts"],
  },
  {
    id: "rtos-integration",
    title: "RTOS & Integration (Advanced)",
    category: "firmware",
    description:
      "FreeRTOS task structuring, Simulink glue code, control-loop timing accuracy.",
    prerequisiteIds: ["debugging"],
  },

  // --- Track 3: Sensors & signal processing ---
  {
    id: "sensor-communication",
    title: "Sensor Communication",
    category: "sensors",
    description:
      "SPI/I2C register reads, device ID verification, bus-level debugging.",
    prerequisiteIds: FOUNDATION_IDS,
  },
  {
    id: "imu-baro-interfacing",
    title: "IMU & Baro Interfacing",
    category: "sensors",
    description:
      "Reading raw sensor data, basic calibration, units/coordinate frames.",
    prerequisiteIds: ["sensor-communication"],
  },
  {
    id: "telemetry-logging",
    title: "Telemetry & Logging",
    category: "sensors",
    description: "XBee radio link, SD card logging, data formatting for review.",
    prerequisiteIds: ["imu-baro-interfacing"],
  },
  {
    id: "sensor-fusion",
    title: "Sensor Fusion (Advanced)",
    category: "sensors",
    description:
      "Complementary/Kalman filters, rate matching to control loop, multi-sensor fusion.",
    prerequisiteIds: ["telemetry-logging"],
  },
];
