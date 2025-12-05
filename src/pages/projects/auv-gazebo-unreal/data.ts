// Project metadata and content
// Copy this file to your project folder and fill in the details

export const projectData = {
  // ========================================
  // BASIC INFO
  // ========================================
  title: "AUV Gazebo–Unreal Engine Integration",
  shortDescription:
    "Bridging Gazebo physics and Unreal Engine 5 visuals to generate co-registered underwater datasets for AUV perception and sim-to-real research.",
  status: "Completed", // Options: "Active", "Published", "Completed"

  // ========================================
  // PROJECT DETAILS
  // ========================================
  duration: "2024",
  institution: "Indian Institute of Science (IISc), Bengaluru",
  role: "Research Engineer – Underwater Robotics & Simulation",
  teamSize: "1–2 Members",

  // ========================================
  // TAGS/TECHNOLOGIES
  // ========================================
  tags: [
    "ROS",
    "ROS 2",
    "Gazebo",
    "Unreal Engine 5",
    "Simulation",
    "AUV",
    "Underwater Robotics",
    "Co-registered Dataset"
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
      `This project builds a bridge between <strong>Gazebo</strong> and <strong>Unreal Engine 5 (UE5)</strong> to combine
      accurate underwater physics with high-fidelity rendering for autonomous underwater vehicle (AUV) research.
      The goal is to create a repeatable pipeline for generating <strong>co-registered multimodal datasets</strong> that can be
      used for perception, control, and sim-to-real transfer.`,

      `Gazebo is used as the source of truth for <strong>vehicle dynamics, sensor poses, and ground-truth labels</strong>,
      while UE5 handles <strong>photorealistic underwater visuals, lighting, and scene composition</strong>. A custom bridge
      synchronizes the two simulators so that each Gazebo timestep corresponds to an identically posed camera
      and scene in UE5.`,

      `The resulting datasets enable training and evaluation of underwater perception algorithms (e.g., image
      enhancement, depth estimation, detection) under controlled conditions while staying physically meaningful.
      This forms a key building block in a larger pipeline for <strong>sim-to-real AUV autonomy</strong>.`
    ]
  },

  // ========================================
  // KEY FEATURES
  // ========================================
  // Available colors: blue, purple, green, orange, red, yellow
  features: [
    {
      title: "Dual-Simulator Architecture",
      description:
        "Uses Gazebo for dynamics and ground truth, and Unreal Engine 5 for photorealistic underwater rendering, combining the strengths of both simulators.",
      color: "blue"
    },
    {
      title: "Time-Synchronized Pose Bridging",
      description:
        "Implements a bridge that forwards AUV and sensor poses from Gazebo to UE5 with consistent timestamps, ensuring perfectly aligned frames.",
      color: "purple"
    },
    {
      title: "Co-Registered Dataset Generation",
      description:
        "Generates synchronized RGB frames, depth, segmentation, and metadata suitable for training and benchmarking underwater perception models.",
      color: "green"
    },
    {
      title: "Configurable Underwater Scenarios",
      description:
        "Supports different scenes, lighting conditions, and water properties to simulate varied underwater environments and mission profiles.",
      color: "orange"
    }
  ],

  // ========================================
  // TECHNICAL IMPLEMENTATION
  // ========================================
  technicalDetails: [
    {
      title: "Gazebo Underwater World & AUV Model",
      points: [
        "Modeled the AUV and its sensors in Gazebo with realistic underwater dynamics and buoyancy.",
        "Defined sensor frames and topics for cameras and other perception modules.",
        "Used Gazebo as the authoritative source for vehicle state, ground truth, and control inputs.",
        "Exposed all required transforms via ROS/ROS 2 for downstream logging and bridging."
      ]
    },
    {
      title: "Unreal Engine 5 Rendering Pipeline",
      points: [
        "Built an underwater UE5 scene with appropriate lighting, fog, and material properties.",
        "Configured virtual cameras in UE5 to match the intrinsics and extrinsics of Gazebo sensors.",
        "Used UE5’s rendering capabilities to produce high-resolution RGB frames for each pose.",
        "Exported rendered frames and metadata for offline dataset packaging."
      ]
    },
    {
      title: "ROS–Gazebo–UE5 Bridge & Dataset Tooling",
      points: [
        "Implemented a bridge node that subscribes to Gazebo poses and forwards them to UE5.",
        "Ensured consistent time stamps and indexing across Gazebo logs and UE5 renders.",
        "Created scripts to assemble RGB, depth/labels (when available), and ground truth into a coherent dataset.",
        "Designed the pipeline so it can be reused for future underwater simulation and perception projects."
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
      url: "/projects/auv-gazebo-unreal/videos/UE5_Gazebo_Underwater.mp4",
      thumbnail: null,
      caption:
        "Demo of the Gazebo–UE5 bridge showing an AUV navigating an underwater scene while generating co-registered visual data."
    },

    // Screenshots/Images (can add more)
    images: [
      {
        url: "/projects/auv-gazebo-unreal/images/RGB.png",
        alt: "RGB underwater view from the co-registered dataset",
        caption: "RGB underwater view from the co-registered dataset"
      },
      {
        url: "/projects/auv-gazebo-unreal/images/Depth.png",
        alt: "Depth map from the co-registered dataset",
        caption: "Depth map from the co-registered dataset"
      },
      {
        url: "/projects/auv-gazebo-unreal/images/sonar.jpg",
        alt: "Sonar view from the co-registered dataset",
        caption: "Sonar view from the co-registered dataset"
      }
    ]
  },

  // ========================================
  // RESULTS & IMPACT
  // ========================================
  results: [
    "Established a reusable pipeline for generating co-registered underwater datasets using Gazebo and Unreal Engine 5.",
    "Enabled controlled experiments for underwater perception tasks such as image enhancement, depth estimation, and detection.",
    "Provided a simulation backbone that can be extended towards end-to-end sim-to-real AUV autonomy workflows.",
    "Documented the integration steps so that future projects in the lab can build on the same Gazebo–UE5 bridge."
  ],

  // ========================================
  // RELATED WORK (Optional)
  // ========================================
  relatedWork: [
    {
      title: "Bridging ROS-Gazebo physics with Unreal Engine 5 visuals for underwater robotics",
      url: "https://www.linkedin.com/posts/pruthviraj-mane_simulation-unrealengine-rosgazebo-activity-7273612559923003393-Y8wh?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAB7p0l0BJtwvHhI4dkaV0q11qltxWLgJvCc"
    }
  ]
};

