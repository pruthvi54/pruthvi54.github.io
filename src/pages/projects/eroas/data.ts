// EROAS: Forward-Looking Sonar Based AUV Obstacle Avoidance
// Project metadata and content

export const projectData = {
  // ========================================
  // BASIC INFO
  // ========================================
  title: "EROAS: Forward-Looking Sonar Based AUV Obstacle Avoidance",
  shortDescription: "Intelligent Navigation Beneath the Waves - A real-time, computationally lightweight obstacle avoidance framework for AUVs using forward-looking sonar",
  status: "Published", // Active, Published, or Completed
  
  // ========================================
  // PROJECT DETAILS
  // ========================================
  duration: "2023 - 2024",
  institution: "Indian Institute of Science, Bangalore",
  role: "Research Associate",
  teamSize: "4 Members",
  
  // ========================================
  // TAGS/TECHNOLOGIES
  // ========================================
  tags: ['ROS', 'Gazebo', 'DAVE Simulator', 'Control Theory', 'Sonar', 'AUV', 'Obstacle Avoidance', 'Real-Time Systems'],
  
  // ========================================
  // LINKS (Set to null if not available)
  // ========================================
  githubUrl: "https://github.com/AIRLabIISc/EROAS",
  documentationUrl: null,
  paperUrl: "https://arxiv.org/abs/2411.05516",
  
  // ========================================
  // OVERVIEW SECTION
  // ========================================
  overview: {
    paragraphs: [
      `Autonomous Underwater Vehicles (AUVs) are transforming how we explore and operate beneath the surface—supporting missions in inspection, surveillance, and environmental monitoring. Yet, the underwater world remains one of the hardest environments for autonomy: low visibility, dynamic currents, and unpredictable obstacles make safe navigation a constant challenge.`,
      
      `EROAS (Efficient Reactive Obstacle Avoidance Strategy) is an innovative solution developed at the Indian Institute of Science (IISc), Bangalore) to address precisely this problem. It introduces a real-time, computationally lightweight obstacle avoidance framework for AUVs using a forward-looking sonar (FLS)—a sensor robust to poor visibility and suitable for deep-sea operation.`
    ]
  },
  
  // ========================================
  // KEY FEATURES
  // ========================================
  features: [
    {
      title: "Reinventing Sonar Perception",
      description: `Unlike cameras or lidars, sonar remains reliable in turbid or dark underwater conditions. However, conventional FLS systems provide only 2D range information, lacking vertical awareness of obstacles. EROAS overcomes this limitation through a mechanically pivoted sonar setup that allows the FLS to sweep vertically, transforming 2D scans into a 2.5D spatial perception. This enables the AUV to recognize elevation gaps in its surroundings, helping it decide whether to turn, rise, or dive safely. This compact sensing strategy delivers depth context without the computational load of full 3D sonar systems—making EROAS both energy-efficient and real-time capable.`,
      color: "blue"
    },
    {
      title: "Sonar Profile-Guided Directional Decision Control (SPD²C)",
      description: `This module analyzes sonar range profiles to identify feasible navigation directions. It detects gaps between obstacles and classifies them as safe or unsafe, generating velocity commands for both horizontal and vertical maneuvers. SPD²C also adapts intelligently to the curvature of obstacles—distinguishing between convex and concave surfaces—to prevent entrapment.`,
      color: "purple"
    },
    {
      title: "Spatial Context Generator (SCG)",
      description: `Underwater sonar perception is limited by a narrow field of view. SCG mitigates this by maintaining a local memory map of recently detected obstacles. This memory helps the vehicle maintain situational awareness even when objects temporarily move out of the sonar's view, ensuring continuous safe navigation.`,
      color: "green"
    },
    {
      title: "Spatio-Temporal Control Barrier Function (ST-CBF)",
      description: `The ST-CBF layer ensures mathematical safety guarantees for all motion commands. It filters velocity inputs from SPD²C to maintain a safe distance from detected obstacles, ensuring smooth, collision-free trajectories in dynamic simulated environments.`,
      color: "orange"
    }
  ],
  
  // ========================================
  // TECHNICAL IMPLEMENTATION
  // ========================================
  technicalDetails: [
    {
      title: "Simulation Environment",
      points: [
        "High-fidelity underwater simulation using DAVE simulator (ROS + Gazebo)",
        "REXROV2 AUV model for realistic dynamics",
        "Multiple static and non-convex obstacles for comprehensive testing",
        "Performance metrics: trajectory length, navigation time, control smoothness"
      ]
    },
    {
      title: "Real-Time Performance",
      points: [
        "Control and decision-making modules maintain steady real-time performance (≈8 Hz)",
        "Faster than sonar's 4 Hz acquisition rate",
        "Lightweight architecture suitable for embedded AUV deployment",
        "Energy-efficient operation for long-duration missions"
      ]
    },
    {
      title: "Performance Results",
      points: [
        "10–16% shorter trajectories compared to baseline methods",
        "13–27% faster navigation times",
        "Significantly smoother control commands (lower yaw rate oscillations)",
        "Outperforms Dynamic Window Approach (DWA) and Artificial Potential Field (APF)"
      ]
    }
  ],
  
  // ========================================
  // MEDIA FILES
  // ========================================
  media: {
    demoVideo: {
      url: "/projects/eroas/videos/EROAS_Demo.mp4",
      thumbnail: null,
      caption: "EROAS in action - Watch the AUV scanning, detecting, and dynamically avoiding underwater obstacles within a simulated environment"
    },
    images: [
      { 
        url: "/projects/eroas/images/sonar_beam_structure.png", 
        alt: "Forward-looking sonar beam structure", 
        caption: "IMAGE 1: Forward-looking sonar beam structure - The mechanical pivoting mechanism enables vertical scanning for 2.5D perception" 
      },
      { 
        url: "/projects/eroas/images/auv_navigating.png", 
        alt: "AUV navigating a cluttered simulated underwater environment", 
        caption: "IMAGE 2: AUV navigating a cluttered simulated underwater environment - Demonstrating real-time obstacle avoidance capabilities" 
      },
      { 
        url: "/projects/eroas/images/Block_diagram_final_2.jpeg", 
        alt: "EROAS control framework schematic", 
        caption: "IMAGE 3: EROAS control framework schematic - Architecture showing SPD²C, SCG, and ST-CBF modules working together" 
      },
      { 
        url: "/projects/eroas/images/spatial_context.png", 
        alt: "Spatial context memory maintained by SCG", 
        caption: "IMAGE 4: Spatial context memory maintained by SCG - Local memory map of recently detected obstacles for continuous awareness" 
      },
      { 
        url: "/projects/eroas/images/simulated_environment.png", 
        alt: "Simulated 3D environment with cluttered obstacles", 
        caption: "IMAGE 5: Simulated 3D environment with cluttered obstacles - High-fidelity DAVE simulator setup for comprehensive testing" 
      },
      { 
        url: "/projects/eroas/images/auv_trajectory.png", 
        alt: "AUV trajectory in simulation demonstrating avoidance behavior", 
        caption: "IMAGE 6: AUV trajectory in simulation demonstrating avoidance behavior - Smooth, collision-free path through complex obstacles" 
      },
      // Fig 11 and side.png - two views of the same result (displayed side by side)
      { 
        url: "/projects/eroas/images/EROAS_Fig_11_a.jpg", 
        alt: "EROAS Figure 11 - Top view of trajectory results", 
        caption: "Figure 11: EROAS trajectory results - Top view" 
      },
      { 
        url: "/projects/eroas/images/side.png", 
        alt: "EROAS side view of trajectory results", 
        caption: "Side view: EROAS trajectory results - Side perspective" 
      }
    ]
  },
  
  // ========================================
  // RESULTS & IMPACT
  // ========================================
  results: [
    "10–16% shorter trajectories compared to baseline methods (DWA, APF)",
    "13–27% faster navigation times in cluttered environments",
    "Significantly smoother control commands with lower yaw rate oscillations",
    "Real-time performance (≈8 Hz) suitable for embedded AUV deployment",
    "Energy-efficient operation enabling long-duration missions",
    "Open-source implementation enabling research extensions for underwater mapping and inspection"
  ],
  
  // ========================================
  // RELATED WORK (Optional)
  // ========================================
  relatedWork: [
    {
      title: "EROAS: 3D Efficient Reactive Obstacle Avoidance System for Autonomous Underwater Vehicles using 2.5 D Forward-Looking Sonar",
      url: "https://arxiv.org/abs/2411.05516"
    }
  ]
};
