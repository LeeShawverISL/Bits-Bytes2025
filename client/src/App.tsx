import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/pages/ui/toaster";
import { AnimatePresence } from "framer-motion";
import NotFound from "@/components/pages/not-found";
import Home from "@/components/pages/home";
import About from "@/components/pages/about";
import ProjectsPage from "@/components/pages/projects";
import Sidebar from "@/components/pages/sidebar";

function Router() {
  const [location] = useLocation();

  return (
    <div>
      <Sidebar />
      <AnimatePresence mode="wait">
        <Switch key={location}>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/projects/:gradeId">
            {(params) => <ProjectsPage gradeId={Number(params.gradeId)} />}
          </Route>
          <Route component={NotFound} />
        </Switch>
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;