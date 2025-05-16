import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

const grades = [
  { id: 4, name: "Grade 4" },
  { id: 5, name: "Grade 5" },
  { id: 7, name: "Grade 7" },
  { id: 8, name: "Grade 8" },
  { id: 9, name: "Grade 9" },
  { id: 10, name: "Grade 10" },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="w-full bg-muted p-4 border-b">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center gap-2">
            <div className="w-12 h-12 flex items-center justify-center">
              <img
                src="/assets/bb-logo.png"
                alt="Bits & Bytes Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  console.error("Error loading logo:", e);
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <span className="text-2xl font-bold">Bits & Bytes</span>
          </a>
        </Link>
        <nav className="flex space-x-2">
          {grades.map((grade) => (
            <Link key={grade.id} href={`/projects/grade-${grade.id}`}>
              <a
                className={cn(
                  "px-4 py-2 rounded-md transition-colors",
                  location === `/projects/grade-${grade.id}`
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent"
                )}
              >
                {grade.name}
              </a>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}