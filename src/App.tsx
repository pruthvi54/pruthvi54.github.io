import { Route, Switch } from "wouter";
import ErrorBoundary from "@/components/ErrorBoundary";
import NotFound from "@/pages/NotFound";
import HomePage from "@/pages/HomePage";
import ExperiencePage from "@/pages/ExperiencePage";
import ResearchPage from "@/pages/ResearchPage";
import ProjectsPage from "@/pages/ProjectsPage";
import PublicationsPage from "@/pages/PublicationsPage";
import MePage from "@/pages/MePage";
import ContactPage from "@/pages/ContactPage";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/experience" component={ExperiencePage} />
      <Route path="/research" component={ResearchPage} />
      <Route path="/projects" component={ProjectsPage} />
      <Route path="/publications" component={PublicationsPage} />
      <Route path="/me" component={MePage} />
      <Route path="/contact" component={ContactPage} />
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
