# Project Folders Mapping

Quick reference for all project folders and their corresponding years.

## Folder Name to Project Title Mapping

| Folder Name | Year | Full Project Title | Status |
|-------------|------|-------------------|---------|
| `aquanav-surface-simulator` | 2025 | AquaNav Surface Vehicle Simulator | Ongoing |
| `asv-manufacturing` | 2025 | ASV Manufacturing | Ongoing |
| `eroas` | 2025 | EROAS (Efficient Robot Operating Area System) | Ongoing |
| `auv-path-planning-ros` | 2024 | AUV Path Planning with ROS Gazebo | Completed |
| `mpc-cbf-auv` | 2024 | MPC-CBF Framework for AUV Obstacle Avoidance | Completed |
| `pinn-obstacle-avoidance` | 2024 | PINN for Underwater Obstacle Avoidance | Completed |
| `auv-gazebo-unreal` | 2024 | Integrating AUV with Gazebo and Unreal Engine | Completed |
| `underwater-synthetic-dataset` | 2024 | Underwater Synthetic Dataset Generation | Completed |
| `vodsonar` | 2023 | VODSONAR: Visual-On-Demand-Sonar Navigation | Published |
| `auv-dynamics-modeling` | 2023 | AUV Dynamics Modeling (MATLAB/Simulink) | Completed |
| `auv-simulation` | 2023 | AUV Dynamics & Simulation Framework | Active (Example) |
| `ev-torque-vectoring` | 2022 | EV Torque Vectoring Control | Published |
| `adaptive-cruise-control` | 2021 | Adaptive Cruise Control for Electric Vehicles | Completed |
| `ev-drive-cycle-analysis` | 2021 | EV Drive Cycle Analysis | Completed |
| `covid-mask-sports` | 2020 | COVID Mask for Sports People | Completed |
| `self-coordinating-robots` | 2019 | Self-Coordinating Manual and Automatic Robots | Completed |
| `agricultural-plant-caretaker` | 2019 | Autonomous Agricultural Plant Caretaker | Published |

## Asset Folders

Each project has corresponding folders in `public/projects/[folder-name]/`:
- `images/` - Screenshots, diagrams, photos
- `videos/` - Demo videos, recordings
- `documents/` - PDFs, papers, reports

## Adding Content to Projects

For each project folder (e.g., `adaptive-cruise-control`):

1. **Add media files**:
```bash
# Images
cp your-image.png public/projects/adaptive-cruise-control/images/

# Videos
cp your-video.mp4 public/projects/adaptive-cruise-control/videos/

# Documents
cp your-paper.pdf public/projects/adaptive-cruise-control/documents/
```

2. **Create data file** (copy from template):
```bash
cp src/pages/projects/_template/data.ts src/pages/projects/adaptive-cruise-control/
```

3. **Create component** (copy from template):
```bash
cp src/pages/projects/_template/index.tsx src/pages/projects/adaptive-cruise-control/
```

4. **Update data.ts** with your project details

5. **Add route in App.tsx**:
```tsx
import AdaptiveCruiseControl from "@/pages/projects/adaptive-cruise-control";
// ...
<Route path="/projects/adaptive-cruise-control" component={AdaptiveCruiseControl} />
```

6. **Enable "Read More" button** in ProjectsPage.tsx:
```tsx
detailsLink: '/projects/adaptive-cruise-control'
```

## Current Status

✅ All project folders created (17 total)
✅ Year-wise organization in ProjectsPage.tsx
✅ Template system ready
✅ Asset folders ready for media

⏳ Waiting for content to be added to each project
⏳ Waiting to enable "Read More" links as content is ready

## Notes

- `auv-simulation` is the example project with full content
- All other projects show as "Detailed page coming soon..."
- Once you add content to a project, update its `detailsLink` in ProjectsPage.tsx

