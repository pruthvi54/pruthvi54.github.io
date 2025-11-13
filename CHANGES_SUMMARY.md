# Changes Summary - Year-wise Project Organization

## ✅ What Was Done

### 1. **Year-wise Project Organization (2019-2025)**

Projects page now displays all projects organized by year in descending order:
- **2025**: 3 Ongoing projects
- **2024**: 5 Completed projects  
- **2023**: 2 Published/Completed projects
- **2022**: 1 Published project
- **2021**: 2 Completed projects
- **2020**: 1 Completed project
- **2019**: 2 Completed/Published projects

**Total: 16 projects** across 7 years

### 2. **All Project Folders Created**

Created organized folder structure for ALL 16 projects:

```
src/pages/projects/
├── aquanav-surface-simulator/
├── asv-manufacturing/
├── eroas/
├── auv-path-planning-ros/
├── mpc-cbf-auv/
├── pinn-obstacle-avoidance/
├── auv-gazebo-unreal/
├── underwater-synthetic-dataset/
├── vodsonar/
├── auv-dynamics-modeling/
├── ev-torque-vectoring/
├── adaptive-cruise-control/
├── ev-drive-cycle-analysis/
├── covid-mask-sports/
├── self-coordinating-robots/
└── agricultural-plant-caretaker/

public/projects/
└── [same 16 folders with images/, videos/, documents/ subfolders]
```

### 3. **Project Details Added**

Each project now has:
- ✅ Full title
- ✅ Short description
- ✅ Detailed description
- ✅ Technology tags
- ✅ Status (Ongoing/Completed/Published)
- ✅ Year classification
- ✅ Placeholder for "Read More" links

### 4. **Project Statistics Dashboard**

Added summary section showing:
- Total Projects: 16
- Ongoing: 3
- Published: 3
- Years Active: 7

### 5. **Visual Improvements**

- 📅 Year headers with calendar icons
- 🎨 Color-coded status badges (Green=Ongoing, Purple=Published, Blue=Completed)
- 📊 Project count per year
- 🔗 "Detailed page coming soon..." for projects without content yet
- 📈 Statistics dashboard at bottom

---

## 📁 Project List (Year-wise)

### 2025 - Ongoing Projects

1. **AquaNav Surface Vehicle Simulator**
   - Folder: `aquanav-surface-simulator`
   - Status: Ongoing
   - Tags: Simulation, Maritime, Unreal Engine

2. **ASV Manufacturing**
   - Folder: `asv-manufacturing`
   - Status: Ongoing
   - Tags: Hardware, Manufacturing, ASV, Design

3. **EROAS** (See arXiv paper)
   - Folder: `eroas`
   - Status: Ongoing
   - Tags: Robotics, Path Planning, Research

### 2024 - Completed Projects

4. **AUV Path Planning with ROS Gazebo**
   - Folder: `auv-path-planning-ros`
   - Tags: ROS2, Gazebo, Path Planning, AUV

5. **MPC-CBF Framework for AUV Obstacle Avoidance**
   - Folder: `mpc-cbf-auv`
   - Tags: MPC, CBF, Safety, Control Theory

6. **PINN for Underwater Obstacle Avoidance**
   - Folder: `pinn-obstacle-avoidance`
   - Tags: Deep Learning, PINN, Obstacle Avoidance, AI

7. **AUV Gazebo-Unreal Engine Integration**
   - Folder: `auv-gazebo-unreal`
   - Tags: Gazebo, Unreal Engine 5, Simulation, Dataset
   - **Has "Read More" button enabled** ✓

8. **Underwater Synthetic Dataset Generation**
   - Folder: `underwater-synthetic-dataset`
   - Tags: Dataset, Computer Vision, Image Enhancement

### 2023 - Published/Completed

9. **VODSONAR: Visual-On-Demand-Sonar Navigation**
   - Folder: `vodsonar`
   - Status: Published
   - Tags: Sonar, Computer Vision, Sensor Fusion

10. **AUV Dynamics Modeling** (MATLAB/Simulink)
    - Folder: `auv-dynamics-modeling`
    - **Has "Read More" button enabled** ✓
    - Tags: MATLAB, Simulink, Dynamics, Modeling

### 2022

11. **EV Torque Vectoring Control**
    - Folder: `ev-torque-vectoring`
    - Status: Published
    - Tags: Control Theory, LQR, MPC, SMC

### 2021

12. **Adaptive Cruise Control for Electric Vehicles**
    - Folder: `adaptive-cruise-control`
    - Tags: MATLAB, Simulink, Control Systems, ADAS

13. **EV Drive Cycle Analysis**
    - Folder: `ev-drive-cycle-analysis`
    - Tags: Drive Cycle, EV, Data Analysis

### 2020

14. **COVID Mask for Sports People**
    - Folder: `covid-mask-sports`
    - Tags: Product Design, Healthcare, Ergonomics

### 2019

15. **Self-Coordinating Manual and Automatic Robots**
    - Folder: `self-coordinating-robots`
    - Tags: Robotics, Automation, Coordination, Robocon

16. **Autonomous Agricultural Plant Caretaker**
    - Folder: `agricultural-plant-caretaker`
    - Status: Published
    - Tags: SolidWorks, Automation, Agriculture, Robocon

---

## 🎯 Next Steps (When You're Ready)

### To Add Content to Any Project:

1. **Navigate to project folder:**
```bash
cd src/pages/projects/[project-name]/
```

2. **Copy template files:**
```bash
cp ../\_template/data.ts .
cp ../\_template/index.tsx .
```

3. **Edit `data.ts`** - Add your content, media paths, etc.

4. **Edit `index.tsx`** - Rename the component to match project

5. **Add media files:**
```bash
cp your-image.jpg public/projects/[project-name]/images/
```

6. **Add route in `App.tsx`**

7. **Enable "Read More"** in `ProjectsPage.tsx` by setting `detailsLink`

---

## 📊 Current Status

✅ **Files Modified:**
- `src/pages/ProjectsPage.tsx` - Complete year-wise reorganization
- `src/pages/ContactPage.tsx` - Your recent changes
- `src/pages/HomePage.tsx` - Photo added
- `src/pages/MePage.tsx` - Your recent changes

✅ **Files Created:**
- All 16 project folders with asset subfolders
- `PROJECT_MAPPING.md` - Reference guide
- `CHANGES_SUMMARY.md` - This file

✅ **Build Status:** ✓ Successful

⏳ **Not Pushed Yet** - Waiting for your command

---

## 🚀 When Ready to Deploy

Simply run:
```bash
./quick-deploy.sh "Reorganize projects year-wise (2019-2025) with 16 projects"
```

---

## 📝 Notes

- Template system is ready for all projects
- You can add content gradually to each project
- "Read More" buttons will appear as you add content
- Two projects already have detailed pages as examples:
  - `auv-simulation` (original example)
  - `auv-gazebo-unreal` (linked in 2024 section)

---

**Everything is organized and ready! Add content to projects at your own pace.** 🎯

