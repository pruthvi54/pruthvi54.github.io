// Project metadata and content
// EV Torque Vectoring Control

export const projectData = {
  // ========================================
  // BASIC INFO
  // ========================================
  title: "Intelligent Torque Vectoring for Electric Vehicle Stability",
  shortDescription:
    "Comparative analysis of Sliding Mode Control, LQR, and MPC for lateral stability improvement through differential torque control in four-wheel electric vehicles.",
  status: "Completed", // Options: "Active", "Published", "Completed"

  // ========================================
  // PROJECT DETAILS
  // ========================================
  duration: "2020 - 2022",
  institution: "IIT Guwahati",
  role: "Researcher",
  teamSize: "1",

  // ========================================
  // TAGS/TECHNOLOGIES
  // ========================================
  tags: [
    "Control Theory",
    "LQR",
    "MPC",
    "SMC",
    "EV Dynamics",
    "Torque Vectoring",
    "Vehicle Stability",
    "MATLAB",
    "Simulink"
  ],

  // ========================================
  // LINKS (Set to null if not available)
  // ========================================
  githubUrl: null,
  documentationUrl: null,
  paperUrl: null,
  demoUrl: null,

  // ========================================
  // OVERVIEW SECTION
  // ========================================
  overview: {
    paragraphs: [
      `Electric vehicles with <strong>four in-wheel motors</strong> unlock a new dimension of control. Instead of relying on mechanical differentials or passive stability aids, the vehicle can <strong>actively distribute torque</strong> between wheels to create a stabilizing <strong>yaw moment</strong>. This allows the EV to correct its orientation, maintain stability, and respond intelligently during high-speed lane changes, emergency maneuvers, and sharp cornering.`,

      `During aggressive maneuvers, two variables dictate lateral stability: <strong>side-slip angle</strong> (how much the vehicle slides laterally) and <strong>yaw rate</strong> (how fast the vehicle rotates). If left uncontrolled, these variables can diverge quickly, causing understeer, oversteer, or total loss of control.`,

      `This project investigates how three controllers compute the <strong>external yaw moment</strong> needed to stabilize the vehicle: <strong>Sliding Mode Control (SMC)</strong>, <strong>Linear Quadratic Regulator (LQR)</strong>, and <strong>Model Predictive Control (MPC)</strong>. Each method brings a unique approach to stabilizing the vehicle using torque vectoring.`
    ]
  },

  // ========================================
  // KEY FEATURES
  // ========================================
  // Available colors: blue, purple, green, orange, red, yellow
  features: [
    {
      title: "Sliding Mode Control (SMC)",
      description:
        "SMC is known for its robustness and ability to handle uncertainties. Its focus here is the stabilization of side-slip angle through a switching-based approach.",
      characteristics: [
        "Forces the system states onto a designed sliding surface",
        "Reacts quickly to disturbances",
        "Primarily targets one variable (side-slip)"
      ],
      whatHappens: [
        "Side-slip is handled well, preventing the vehicle from drifting outward",
        "Yaw rate remains largely uncontrolled, making rotation behavior inconsistent",
        "Speed variations magnify yaw-rate fluctuations"
      ],
      color: "blue"
    },
    {
      title: "Linear Quadratic Regulator (LQR)",
      description:
        "LQR optimizes the control action by minimizing a cost function that balances performance and effort.",
      characteristics: [
        "Controls both yaw rate and side-slip",
        "Produces smooth and continuous control inputs",
        "Requires higher control effort than SMC"
      ],
      whatHappens: [
        "Yaw rate becomes more predictable",
        "Side-slip decreases significantly",
        "The yaw moment required is larger, meaning the motors must work harder"
      ],
      color: "purple"
    },
    {
      title: "Model Predictive Control (MPC)",
      description:
        "MPC is the most sophisticated controller tested. It predicts future vehicle behavior and optimizes control over a receding time horizon.",
      characteristics: [
        "Considers constraints (torque limits, states)",
        "Predicts and avoids future instability",
        "Minimizes unnecessary control effort"
      ],
      whatHappens: [
        "Yaw rate becomes smooth and well controlled",
        "Side-slip stays within safe bounds",
        "Yaw moment required is notably lower, resulting in efficient, graceful stability control"
      ],
      color: "green"
    }
  ],

  // ========================================
  // TECHNICAL IMPLEMENTATION
  // ========================================
  technicalDetails: [
    {
      title: "Torque Vectoring Architecture",
      points: [
        "Four independent in-wheel motors enable active torque distribution between wheels.",
        "The system generates an external yaw moment by applying differential torque to left and right wheels.",
        "This software-based approach replaces mechanical differentials and passive stability aids.",
        "Enables rapid corrective actions during high-speed maneuvers and emergency situations."
      ]
    },
    {
      title: "Control Strategy Comparison",
      points: [
        "<strong>SMC:</strong> Robust switching-based control focusing on side-slip stabilization, but struggles with yaw rate control.",
        "<strong>LQR:</strong> Optimizes both yaw rate and side-slip simultaneously, requiring higher control effort but providing balanced performance.",
        "<strong>MPC:</strong> Predictive control with constraint handling, delivering the smoothest and most efficient stability control."
      ]
    },
    {
      title: "System Response Analysis",
      points: [
        "Baseline analysis shows uncontrolled vehicle exhibits oscillatory yaw rate and rapidly increasing side-slip.",
        "High-speed scenarios amplify instability, demonstrating the critical need for active control.",
        "Comparative evaluation reveals trade-offs between control effort, stability performance, and computational complexity.",
        "MPC demonstrates superior performance with lower yaw moment requirements and smoother state trajectories."
      ]
    }
  ],

  // ========================================
  // MEDIA FILES
  // ========================================
  // Place your files in: public/projects/your-project-name/
  media: {
    // Main demo video
    demoVideo: {
      url: null,
      thumbnail: null,
      caption: "Demo video showing torque vectoring control in action"
    },

    // Screenshots/Images
    images: [
      {
        url: "/projects/ev-torque-vectoring/images/Four In-Wheel Motor Vehicle.png",
        alt: "Four In-Wheel Motor Vehicle Configuration",
        caption: "Four In-Wheel Motor Vehicle Configuration"
      },
      {
        url: "/projects/ev-torque-vectoring/images/Lane-Change Steering Input.png",
        alt: "Steering Input Profile – Double Lane Change",
        caption: "Steering Input Profile – Double Lane Change Maneuver"
      },
      {
        url: "/projects/ev-torque-vectoring/images/Side Slip Uncontrolled.jpg",
        alt: "Side-Slip Response - Uncontrolled",
        caption: "Side-Slip Response – Uncontrolled Vehicle"
      },
      {
        url: "/projects/ev-torque-vectoring/images/High-Speed Instability Snapshot.jpg",
        alt: "High-Speed Instability Snapshot",
        caption: "High-Speed Instability Snapshot"
      },
      {
        url: "/projects/ev-torque-vectoring/images/SMC Side-Slip Response.png",
        alt: "SMC Side-Slip Response",
        caption: "SMC Side-Slip Response"
      },
      {
        url: "/projects/ev-torque-vectoring/images/SMC Yaw Rate Response.png",
        alt: "SMC Yaw Rate Response",
        caption: "SMC Yaw Rate Response"
      },
      {
        url: "/projects/ev-torque-vectoring/images/LQR Yaw moment output.jpg",
        alt: "LQR Yaw Moment Output",
        caption: "LQR Yaw Moment Output"
      },
      {
        url: "/projects/ev-torque-vectoring/images/LQR Yaw rate Response.jpg",
        alt: "LQR Yaw Rate Response",
        caption: "LQR Yaw Rate Response"
      },
      {
        url: "/projects/ev-torque-vectoring/images/LQR Side-Slip Response.jpg",
        alt: "LQR Side-Slip Response",
        caption: "LQR Side-Slip Response"
      },
      {
        url: "/projects/ev-torque-vectoring/images/MPC Yaw moment Output.jpg",
        alt: "MPC Yaw Moment Output",
        caption: "MPC Yaw Moment Output"
      },
      {
        url: "/projects/ev-torque-vectoring/images/MPC Yaw rate Response.jpg",
        alt: "MPC Yaw Rate Response",
        caption: "MPC Yaw Rate Response"
      },
      {
        url: "/projects/ev-torque-vectoring/images/MPC Side-slip Response.jpg",
        alt: "MPC Side-Slip Response",
        caption: "MPC Side-Slip Response"
      }
    ]
  },

  // ========================================
  // RESULTS & IMPACT
  // ========================================
  results: [
    "Torque vectoring enables stability through software, allowing rapid corrective yaw moments without mechanical components.",
    "Without control, the vehicle becomes unstable during fast maneuvers, especially at higher speeds.",
    "SMC provides strong side-slip control but cannot manage yaw rate effectively.",
    "LQR stabilizes both variables but demands higher yaw moment and thus more torque.",
    "MPC provides the most refined behavior—smooth, stable, and efficient with lower control effort requirements.",
    "Comparative analysis demonstrates clear trade-offs between robustness, performance, and computational complexity."
  ],

  // ========================================
  // RELATED WORK (Optional)
  // ========================================
  relatedWork: []
};
