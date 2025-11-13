// AquaNav: High-Fidelity Surface Vehicle Simulator
// Project metadata and content

export const projectData = {
  // ========================================
  // BASIC INFO
  // ========================================
  title: "AquaNav: High-Fidelity Marine  Vehicle Simulator",
  shortDescription: "Reimagining maritime robotics through simulation - A visually stunning, physically accurate USV simulator built on Unreal Engine 5",
  status: "Published", // Active, Published, or Completed
  
  // ========================================
  // PROJECT DETAILS
  // ========================================
  duration: "2023 - 2024",
  institution: "Indian Institute of Science, Bangalore",
  role: " Research Associate",
  teamSize: "3 Members",
  
  // ========================================
  // TAGS/TECHNOLOGIES
  // ========================================
  tags: ['Unreal Engine 5', 'ROS', 'Computer Vision','Maritime Robotics', 'Simulation', 'Deep Learning', 'Synthetic Data'],
  
  // ========================================
  // LINKS (Set to null if not available)
  // ========================================
  githubUrl: "https://github.com/AIRLabIISc/AquaNav", // "https://github.com/AIRLabIISc/AquaNav
  documentationUrl: null,
  paperUrl: "https://ieeexplore.ieee.org/abstract/document/11104589",
  demoUrl: null,
  
  // ========================================
  // OVERVIEW SECTION
  // ========================================
  overview: {
    paragraphs: [
      `The ocean is one of humanity's last great frontiers—vast, unpredictable, and full of potential. 
       From search-and-rescue missions to scientific exploration, surface and underwater vehicles play an 
       increasingly vital role in unlocking its mysteries. Yet, developing and testing these autonomous 
       maritime systems safely and cost-effectively is a persistent challenge.`,
      
      `AquaNav was born out of this very problem. Designed and developed at the Indian Institute of Science, 
       Bangalore, AquaNav is a high-fidelity Unmanned Surface Vehicle (USV) simulator built on Unreal Engine 5. 
       It provides researchers, engineers, and enthusiasts a visually stunning, physically accurate virtual 
       ocean world where algorithms can learn, adapt, and thrive—before they ever touch real water.`,
       
      `At the heart of AquaNav lies Unreal Engine 5's real-time rendering capabilities. Every ripple, 
       reflection, and shaft of sunlight has been meticulously modeled to replicate the complexities of 
       natural aquatic environments. The simulator includes diverse environments—from calm rivers and docks 
       to dynamic coastal settings—each responding realistically to weather and wave physics.`
    ]
  },
  
  // ========================================
  // KEY FEATURES
  // ========================================
  features: [
    {
      title: "Photorealistic Rendering",
      description: `Built on Unreal Engine 5's cutting-edge real-time rendering, AquaNav delivers stunning 
                    visual fidelity with accurate wave physics, dynamic lighting, and realistic water surface 
                    interactions that mirror real ocean conditions.`,
      color: "blue"
    },
    {
      title: "Dynamic Environmental Control",
      description: `Control geography and time with precision. Select specific latitude, longitude, and time 
                    of day, or change lighting conditions in real-time to test visual perception under bright 
                    daylight, dusky evenings, or fog-laden mornings.`,
      color: "purple"
    },
    {
      title: "Synthetic Data Generation",
      description: `Generate thousands of high-quality, co-registered RGB and depth imagery frames in a single 
                    run. The simulator produces synthetic datasets with ~800 labeled images across object 
                    categories like ships, buoys, and survivors.`,
      color: "green"
    },
    {
      title: "ROS Integration",
      description: `Seamlessly integrates with Robot Operating System (ROS) for real-world applicability. 
                    Teleoperate virtual USVs manually or run autonomous navigation via ROS nodes, enabling 
                    rapid prototyping and testing before real deployment.`,
      color: "orange"
    },
    {
      title: "Multi-Modal Perception",
      description: `Complete sensor suite including RGB cameras, depth sensors, GPS, and IMU. Perfect for 
                    training AI models in detection, segmentation, object tracking, and multimodal perception 
                    tasks.`,
      color: "red"
    },
    {
      title: "Sim-to-Real Transfer",
      description: `Models trained entirely on AquaNav-generated data demonstrate reliable object detection 
                    in real maritime conditions, effectively bridging the sim-to-real gap with high 
                    performance in field deployments.`,
      color: "yellow"
    }
  ],
  
  // ========================================
  // TECHNICAL IMPLEMENTATION
  // ========================================
  technicalDetails: [
    {
      title: "Unreal Engine 5 Integration",
      points: [
        "Real-time photorealistic rendering with Lumen global illumination",
        "Custom water surface physics and wave simulation",
        "Dynamic weather and lighting systems with time-of-day control",
        "Multiple environment presets: rivers, docks, coastal scenes",
        "Optimized performance for both high-end and mid-range hardware"
      ]
    },
    {
      title: "ROS (Robot Operating System) Integration",
      points: [
        "Bidirectional communication between Unreal Engine and ROS",
        "Real-time sensor data streaming (RGB, depth, GPS, IMU)",
        "Manual teleoperation via ROS velocity commands",
        "Autonomous navigation support through ROS nodes",
        "Compatible with ROS Noetic and ROS2 distributions"
      ]
    },
    {
      title: "Synthetic Dataset Generation",
      points: [
        "Co-registered RGB and depth image pairs with pixel-perfect alignment",
        "Automated labeling for object detection and segmentation",
        "~800 labeled images across multiple object classes (ship, buoy, survivor)",
        "Configurable data export formats (COCO, YOLO, Pascal VOC)",
        "Diverse lighting and weather conditions for robust training"
      ]
    },
    {
      title: "Computer Vision Pipeline",
      points: [
        "Object detection models trained on AquaNav synthetic data",
        "Real-time inference integration with ROS",
        "Multi-class detection: ships, survivors, buoys, obstacles",
        "Depth-aware perception for collision avoidance",
        "Performance validation in simulation before field deployment"
      ]
    },
    {
      title: "Environmental Simulation",
      points: [
        "Geographic coordinate system (latitude/longitude) for precise location",
        "Dynamic time-of-day with realistic sun position calculations",
        "Weather variations: clear, foggy, overcast conditions",
        "Wave height and frequency controls",
        "Customizable environmental parameters via configuration files"
      ]
    }
  ],
  
  // ========================================
  // MEDIA FILES
  // ========================================
  // Media placement follows document specification:
  // Video first, then images in order as mentioned in the document
  media: {
    // Main demo video - Placed at the beginning as specified
    demoVideo: {
      url: "/projects/aquanav-surface-simulator/videos/AquaNav_demo.mp4",
      thumbnail: null,
      caption: "AquaNav simulation demo - Watch the simulated waters come alive as waves respond to autonomous navigation algorithms"
    },
    
    // Screenshots/Images - Ordered exactly as specified in document
    images: [
      {
        // IMAGE 1: Simulator environment (River)
        url: "/projects/aquanav-surface-simulator/images/river.png",
        alt: "Simulator environment - River scene",
        caption: "IMAGE 1: Simulator environment (River) - Calm river setting with realistic water dynamics"
      },
      {
        // IMAGE 2: Simulator environment (Dock)
        url: "/projects/aquanav-surface-simulator/images/dock.png",
        alt: "Simulator environment - Dock scene",
        caption: "IMAGE 2: Simulator environment (Dock) - Maritime dock environment with complex structures"
      },
      {
        // IMAGE 3: Combined RGB and depth at different times
        url: "/projects/aquanav-surface-simulator/images/combined_image.png",
        alt: "RGB and depth imagery at different times of day",
        caption: "IMAGE 3: Simulator generated RGB images at different times of day with corresponding depth maps"
      },
      {
        // IMAGE 4: Varied environmental conditions
        url: "/projects/aquanav-surface-simulator/images/scene_change.png",
        alt: "Varied environmental conditions for ship class",
        caption: "IMAGE 4: Varied environmental conditions for ship class detection across different scenarios"
      },
      {
        // IMAGE 5: Object detection - Ship
        url: "/projects/aquanav-surface-simulator/images/ship_detected.png",
        alt: "Object detection - Ship class",
        caption: "IMAGE 5: Object detection – Ship class identified in complex maritime scene"
      },
      {
        // IMAGE 6: Object detection - Survivor
        url: "/projects/aquanav-surface-simulator/images/survivor.png",
        alt: "Object detection - Survivor",
        caption: "IMAGE 6: Object detection – Survivor identified for search-and-rescue operations"
      },
      {
        // Additional: Co-registered RGB and depth (referenced in text)
        url: "/projects/aquanav-surface-simulator/images/rgb_depth_coregistered.png",
        alt: "Co-registered RGB and depth imagery",
        caption: "High-quality co-registered RGB and depth imagery for multimodal perception tasks"
      }
    ]
  },
  
  // ========================================
  // RESULTS & IMPACT
  // ========================================
  results: [
    "Successfully generated <strong>~800 labeled images</strong> across multiple maritime object classes (ship, buoy, survivor)",
    "Achieved <strong>reliable object detection performance</strong> with models trained entirely on synthetic AquaNav data",
    "Demonstrated successful <strong>sim-to-real transfer</strong> with field validation on real USV platforms",
    "Enabled <strong>rapid prototyping and testing</strong> of navigation algorithms without expensive real-world deployments",
    "Reduced development costs and risks by providing a <strong>safe, controllable testing environment</strong>",
    "Integrated with ROS for <strong>seamless transition</strong> from simulation to real robotic systems",
    "Created diverse environmental conditions replicating various <strong>lighting, weather, and geographic scenarios</strong>",
    "Empowered researchers with <strong>infinite data generation capabilities</strong> for training robust AI models"
  ],
  
  // ========================================
  // RELATED WORK (Optional)
  // ========================================
  relatedWork: [
    {
      title: "Maritime Robotics Research Publications",
      url: null
    },
    {
      title: "Synthetic Dataset for Maritime Computer Vision",
      url: null
    }
  ]
};
