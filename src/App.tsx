import { Route, Switch } from "wouter";
import ErrorBoundary from "@/components/ErrorBoundary";
import NotFound from "@/pages/NotFound";
import HomePage from "@/pages/HomePage";
import ExperiencePage from "@/pages/ExperiencePage";
import ProjectsPage from "@/pages/ProjectsPage";
import PublicationsPage from "@/pages/PublicationsPage";
import MePage from "@/pages/MePage";
import RequestCVPage from "@/pages/RequestCVPage";
import RequestSuccessPage from "@/pages/RequestSuccessPage";
import InsightsPage from "@/pages/InsightsPage";

// Project detail pages
import AuvSimulationProject from "@/pages/projects/auv-simulation";
import AquaNavSurfaceSimulator from "@/pages/projects/aquanav-surface-simulator";
import AsvManufacturing from "@/pages/projects/asv-manufacturing";
import Eroas from "@/pages/projects/eroas";
import AuvPathPlanningRos from "@/pages/projects/auv-path-planning-ros";
import MpcCbfAuv from "@/pages/projects/mpc-cbf-auv";
import PinnObstacleAvoidance from "@/pages/projects/pinn-obstacle-avoidance";
import AuvGazeboUnreal from "@/pages/projects/auv-gazebo-unreal";
import UnderwaterSyntheticDataset from "@/pages/projects/underwater-synthetic-dataset";
import Vodsonar from "@/pages/projects/vodsonar";
import AuvDynamicsModeling from "@/pages/projects/auv-dynamics-modeling";
import EvTorqueVectoring from "@/pages/projects/ev-torque-vectoring";
import AdaptiveCruiseControl from "@/pages/projects/adaptive-cruise-control";
import EvDriveCycleAnalysis from "@/pages/projects/ev-drive-cycle-analysis";
import CovidMaskSports from "@/pages/projects/covid-mask-sports";
import SelfCoordinatingRobots from "@/pages/projects/self-coordinating-robots";
import AgriculturalPlantCaretaker from "@/pages/projects/agricultural-plant-caretaker";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/experience" component={ExperiencePage} />
      <Route path="/projects" component={ProjectsPage} />
      
      {/* 2025 Projects */}
      <Route path="/projects/aquanav-surface-simulator" component={AquaNavSurfaceSimulator} />
      <Route path="/projects/asv-manufacturing" component={AsvManufacturing} />
      <Route path="/projects/eroas" component={Eroas} />
      
      {/* 2024 Projects */}
      <Route path="/projects/auv-path-planning-ros" component={AuvPathPlanningRos} />
      <Route path="/projects/mpc-cbf-auv" component={MpcCbfAuv} />
      <Route path="/projects/pinn-obstacle-avoidance" component={PinnObstacleAvoidance} />
      <Route path="/projects/auv-gazebo-unreal" component={AuvGazeboUnreal} />
      <Route path="/projects/underwater-synthetic-dataset" component={UnderwaterSyntheticDataset} />
      
      {/* 2023 Projects */}
      <Route path="/projects/vodsonar" component={Vodsonar} />
      <Route path="/projects/auv-dynamics-modeling" component={AuvDynamicsModeling} />
      <Route path="/projects/auv-simulation" component={AuvSimulationProject} />
      
      {/* 2022 Projects */}
      <Route path="/projects/ev-torque-vectoring" component={EvTorqueVectoring} />
      
      {/* 2021 Projects */}
      <Route path="/projects/adaptive-cruise-control" component={AdaptiveCruiseControl} />
      <Route path="/projects/ev-drive-cycle-analysis" component={EvDriveCycleAnalysis} />
      
      {/* 2020 Projects */}
      <Route path="/projects/covid-mask-sports" component={CovidMaskSports} />
      
      {/* 2019 Projects */}
      <Route path="/projects/self-coordinating-robots" component={SelfCoordinatingRobots} />
      <Route path="/projects/agricultural-plant-caretaker" component={AgriculturalPlantCaretaker} />
      
      <Route path="/publications" component={PublicationsPage} />
      <Route path="/me" component={MePage} />
      <Route path="/insights" component={InsightsPage} />
      <Route path="/request-cv" component={RequestCVPage} />
      <Route path="/request-success" component={RequestSuccessPage} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  );
}

export default App;
