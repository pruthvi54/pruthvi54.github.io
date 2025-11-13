// Project metadata and content
export const projectData = {
  // Basic Info
  title: "AUV Dynamics & Simulation Framework",
  shortDescription: "6-DoF underactuated AUV modeling and ROS-based simulation environment",
  status: "Active", // "Active" | "Published" | "Completed"
  
  // Project Details
  duration: "2023 - Present",
  institution: "IISc Bangalore",
  role: "Research Assistant",
  teamSize: "3 Members",
  
  // Tags/Technologies
  tags: ['MATLAB', 'Simulink', 'ROS2', 'Gazebo', 'Unreal Engine 5', 'Python', 'C++'],
  
  // Links
  githubUrl: null, // Add your GitHub URL when ready
  documentationUrl: null,
  paperUrl: null,
  demoUrl: null,
  
  // Content Sections
  overview: {
    paragraphs: [
      `This project focuses on developing a comprehensive simulation framework for Autonomous Underwater Vehicles (AUVs). 
       The framework includes complete 6-DoF dynamics modeling, sensor integration, and multiple simulation environments 
       ranging from MATLAB/Simulink for control design to Unreal Engine 5 for photorealistic visualization.`,
      
      `The system enables rapid prototyping of navigation algorithms, controller validation, and generation of 
       synthetic underwater datasets for machine learning applications.`
    ]
  },
  
  // Key Features with descriptions
  features: [
    {
      title: "6-DoF Dynamics Modeling",
      description: `Complete mathematical model including added mass, drag coefficients, and hydrodynamic forces 
                    for realistic underwater vehicle behavior.`,
      color: "blue" // blue, purple, green, orange, red, yellow
    },
    {
      title: "Multi-Sensor Integration",
      description: `Integrated IMU, camera, DVL (Doppler Velocity Log), and sonar sensors with realistic noise models 
                    and update rates matching commercial hardware.`,
      color: "purple"
    },
    {
      title: "ROS2 & Gazebo Environment",
      description: `Full ROS2 integration with custom message types, tf2 transforms, and Gazebo simulation 
                    for hardware-in-the-loop testing and algorithm validation.`,
      color: "green"
    },
    {
      title: "Unreal Engine 5 Visualization",
      description: `Photorealistic underwater environment with dynamic lighting, water caustics, and marine life 
                    for synthetic dataset generation and demos.`,
      color: "orange"
    }
  ],
  
  // Technical Implementation Details
  technicalDetails: [
    {
      title: "Dynamics Modeling (MATLAB/Simulink)",
      points: [
        "Implemented Fossen's equations for underwater vehicle dynamics",
        "Added mass matrix and hydrodynamic damping coefficients",
        "Thruster allocation matrix for underactuated configuration",
        "Current disturbances and environmental effects"
      ]
    },
    {
      title: "ROS2 Integration",
      points: [
        "Custom message types for AUV state and sensor data",
        "TF2 transforms for coordinate frame management",
        "Gazebo plugins for realistic sensor simulation",
        "RViz visualization for real-time monitoring"
      ]
    },
    {
      title: "Sensor Suite",
      points: [
        "<strong>IMU:</strong> 100Hz update rate with gyro/accel noise",
        "<strong>DVL:</strong> Bottom-lock velocity measurements with 0.1 m/s accuracy",
        "<strong>Camera:</strong> 30fps stereo camera pair for vision tasks",
        "<strong>Sonar:</strong> Forward-looking sonar with 30m range"
      ]
    }
  ],
  
  // Media files (add your files to public/projects/auv-simulation/)
  media: {
    // Main demo video
    demoVideo: {
      url: null, // "/projects/auv-simulation/videos/demo.mp4" or YouTube URL
      thumbnail: null,
      caption: "Video demonstration showing the AUV navigating through an underwater environment"
    },
    
    // Screenshots/Images
    images: [
      {
        url: null, // "/projects/auv-simulation/images/simulink-model.png"
        alt: "MATLAB Simulink Model",
        caption: "Screenshot 1: MATLAB Simulink Model"
      },
      {
        url: null,
        alt: "Gazebo Simulation",
        caption: "Screenshot 2: Gazebo Simulation"
      },
      {
        url: null,
        alt: "Unreal Engine View",
        caption: "Screenshot 3: Unreal Engine View"
      },
      {
        url: null,
        alt: "RViz Visualization",
        caption: "Screenshot 4: RViz Visualization"
      }
    ]
  },
  
  // Results and Impact
  results: [
    "Successfully validated dynamics model against real AUV test data with <5% error",
    "Generated 10,000+ synthetic underwater images for deep learning training",
    "Reduced hardware testing time by 60% through comprehensive simulation",
    "Framework adopted by 3 other research projects at IISc"
  ],
  
  // Related work/publications
  relatedWork: [
    {
      title: "Sonar-based Obstacle Avoidance Paper",
      url: null
    },
    {
      title: "MS Thesis (In Progress)",
      url: null
    }
  ]
};

