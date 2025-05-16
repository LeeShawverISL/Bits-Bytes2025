
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Switch, Route, Link } from "wouter";

const queryClient = new QueryClient();

function ProjectCard({ project }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition">
      <img src={project.preview} alt={project.title} className="w-full h-48 object-cover rounded" />
      <h3 className="text-xl font-bold mt-2">{project.title}</h3>
      <p className="text-gray-600">{project.description}</p>
      <p className="text-sm mt-2">By {project.studentName}</p>
      <a href={project.link} className="text-blue-500 hover:underline mt-2 block">
        View Project
      </a>
    </div>
  );
}

function ProjectsPage({ gradeId }) {
  const { data: projects } = useQuery({
    queryKey: ["projects", gradeId],
    queryFn: () => fetch(`/api/groups/${gradeId}/projects`).then(r => r.json())
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {projects?.map(project => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <Link href="/">
              <a className="text-xl font-bold">Project Gallery</a>
            </Link>
          </div>
        </nav>
        <main className="max-w-7xl mx-auto py-6">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/projects/:grade">
              {params => <ProjectsPage gradeId={params.grade} />}
            </Route>
          </Switch>
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
