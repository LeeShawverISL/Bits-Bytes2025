import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Project } from "@shared/schema";
import { motion } from "framer-motion";
import Loading from "@/components/pages/ui/loading";
import { ExternalLink } from "lucide-react";

interface ProjectsPageProps {
  gradeId: number;
}

// Map group IDs to actual grade numbers and subtitles
const gradeMap = {
  4: { number: 4, subtitle: "4" },   // Group ID 4 is Grade 4
  1: { number: 5, subtitle: "5W" },  // Group ID 1 is Grade 5W
  2: { number: 8, subtitle: "8.1" }, // Group ID 2 is Grade 8.1
  3: { number: 9, subtitle: "9.1" },  // Group ID 3 is Grade 9
  10: { number: 10, subtitle: "10" },// Group ID 10 is Grade 10
};

export default function ProjectsPage({ gradeId }: ProjectsPageProps) {
  const { data: projects, isLoading, error } = useQuery<Project[]>({
    queryKey: ["projects", gradeId],
    queryFn: async () => {
      console.log("Fetching projects for grade:", gradeId);
      const response = await fetch(`/api/groups/${gradeId}/projects`);
      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }
      const data = await response.json();
      console.log("Received projects:", data);
      return data;
    }
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background p-8">
        <h2 className="text-2xl text-red-500">Error loading projects: {error.toString()}</h2>
      </div>
    );
  }

  // Get the grade info from the mapping
  const gradeInfo = gradeMap[gradeId as keyof typeof gradeMap] || { number: gradeId, subtitle: "" };

  // For Grade 8, split projects into 8.1 and 8.2
  const isGrade8 = gradeInfo.number === 8;
  // For Grade 9, split projects into 9.1 and 9.2
  const isGrade9 = gradeInfo.number === 9;
  // Check for Grade 4
  const isGrade4 = gradeInfo.number === 4;
  // Check for Grade 10
  const isGrade10 = gradeInfo.number === 10;
  
  // First 10 projects are 8.1, rest are 8.2 for Grade 8
  const firstHalf = isGrade8 ? (projects || []).slice(0, 10) : (isGrade9 ? (projects || []).slice(0, 10) : projects);
  const secondHalf = isGrade8 ? (projects || []).slice(10) : (isGrade9 ? (projects || []).slice(10) : []);
  const firstHalfLength = firstHalf ? firstHalf.length : 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background p-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold">
          Grade {gradeInfo.number} Projects
        </h1>
        <p className="text-muted-foreground mt-2">
          Explore projects from Grade {gradeInfo.number} students
        </p>
      </motion.div>

      {isGrade8 ? (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-semibold mb-8">8.1</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {firstHalf?.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-semibold mb-8">8.2</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {secondHalf?.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index + firstHalfLength} />
              ))}
            </div>
          </motion.div>
        </>
      ) : isGrade9 ? (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-semibold mb-8">9.1</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {firstHalf?.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-semibold mb-8">9.2</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {secondHalf?.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index + firstHalfLength} />
              ))}
            </div>
          </motion.div>
        </>
      ) : isGrade4 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold mb-8">Grade 4</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects?.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </motion.div>
      ) : isGrade10 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold mb-8">Grade 10</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects?.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold mb-8">5W</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {projects?.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const hasValidLink = project.link !== "#";

  const cardContent = (
    <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow border-2 border-muted">
      <div className="aspect-video w-full overflow-hidden relative group">
        <img
          src={project.preview}
          alt={`Preview of ${project.title}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            console.error("Error loading image:", e);
            e.currentTarget.src = "https://placehold.co/480x360/1a1a1a/ffffff?text=Preview+Not+Available";
          }}
        />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-primary text-primary-foreground px-4 py-2 rounded-md flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            <span>{hasValidLink ? "Play Game" : "View Project"}</span>
          </div>
        </div>
      </div>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {project.title}
          {hasValidLink && <ExternalLink className="h-4 w-4 text-muted-foreground" />}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <p className="text-sm text-muted-foreground mb-2 font-medium">
          By {project.studentName}
        </p>
        <div className="min-h-[120px] flex-grow">
          <p className="text-sm">{project.description}</p>
        </div>
        {!hasValidLink && (
          <p className="text-xs text-amber-600 mt-2 italic">Project link coming soon</p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="transition-transform hover:scale-[1.02]"
    >
      {hasValidLink ? (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          {cardContent}
        </a>
      ) : (
        <div onClick={() => window.alert("This project's link is not available yet or is coming soon.")}>
          {cardContent}
        </div>
      )}
    </motion.div>
  );
}