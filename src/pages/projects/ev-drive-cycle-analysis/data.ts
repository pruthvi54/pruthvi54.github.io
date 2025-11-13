// Project metadata and content
// Copy this file to your project folder and fill in the details

export const projectData = {
  // ========================================
  // BASIC INFO
  // ========================================
  title: "Your Project Title",
  shortDescription: "One-line description of your project",
  status: "Active", // Options: "Active", "Published", "Completed"
  
  // ========================================
  // PROJECT DETAILS
  // ========================================
  duration: "2024 - Present",
  institution: "Your Institution",
  role: "Your Role",
  teamSize: "X Members",
  
  // ========================================
  // TAGS/TECHNOLOGIES
  // ========================================
  tags: ['Tech1', 'Tech2', 'Tech3', 'Tool1', 'Tool2'],
  
  // ========================================
  // LINKS (Set to null if not available)
  // ========================================
  githubUrl: null, // "https://github.com/username/repo"
  documentationUrl: null,
  paperUrl: null,
  demoUrl: null,
  
  // ========================================
  // OVERVIEW SECTION
  // ========================================
  overview: {
    paragraphs: [
      `First paragraph: Brief introduction to the project. What problem does it solve? 
       What is the main goal?`,
      
      `Second paragraph: Explain the approach or methodology. What makes this project unique 
       or interesting?`
    ]
  },
  
  // ========================================
  // KEY FEATURES
  // ========================================
  // Available colors: blue, purple, green, orange, red, yellow
  features: [
    {
      title: "Feature 1 Name",
      description: `Detailed description of the first key feature. Explain what it does and why 
                    it's important.`,
      color: "blue"
    },
    {
      title: "Feature 2 Name",
      description: `Description of the second feature...`,
      color: "purple"
    },
    {
      title: "Feature 3 Name",
      description: `Description of the third feature...`,
      color: "green"
    },
    {
      title: "Feature 4 Name",
      description: `Description of the fourth feature...`,
      color: "orange"
    }
  ],
  
  // ========================================
  // TECHNICAL IMPLEMENTATION
  // ========================================
  technicalDetails: [
    {
      title: "Technology/Component 1",
      points: [
        "Implementation detail 1",
        "Implementation detail 2",
        "Implementation detail 3",
        "Implementation detail 4"
      ]
    },
    {
      title: "Technology/Component 2",
      points: [
        "Detail about this component",
        "Another detail",
        "Use <strong>HTML tags</strong> for emphasis if needed"
      ]
    },
    {
      title: "Technology/Component 3",
      points: [
        "More technical details",
        "Bullet points are great for lists"
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
      url: null, // "/projects/your-project/videos/demo.mp4" or YouTube URL
      thumbnail: null, // Optional thumbnail image
      caption: "Video caption describing what the demo shows"
    },
    
    // Screenshots/Images (can add more)
    images: [
      {
        url: null, // "/projects/your-project/images/screenshot1.png"
        alt: "Screenshot 1 description",
        caption: "Caption for screenshot 1"
      },
      {
        url: null,
        alt: "Screenshot 2 description",
        caption: "Caption for screenshot 2"
      },
      {
        url: null,
        alt: "Screenshot 3 description",
        caption: "Caption for screenshot 3"
      },
      {
        url: null,
        alt: "Screenshot 4 description",
        caption: "Caption for screenshot 4"
      }
    ]
  },
  
  // ========================================
  // RESULTS & IMPACT
  // ========================================
  results: [
    "Key achievement or result 1",
    "Quantifiable impact if possible (e.g., '50% improvement')",
    "Any recognition, awards, or adoption",
    "Other notable outcomes"
  ],
  
  // ========================================
  // RELATED WORK (Optional)
  // ========================================
  relatedWork: [
    {
      title: "Related Publication 1",
      url: null // Link to paper or publication page
    },
    {
      title: "Related Publication 2",
      url: null
    }
  ]
};

