import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

// Grade navigation options
const grades = [
  { id: "4", label: "Grade 4" },
  { id: "1", label: "Grade 5" },
  { id: "2", label: "Grade 8" },
  { id: "3", label: "Grade 9" },
  { id: "10", label: "Grade 10" },
];

// Other navigation options
const navItems = [
  { id: "about", label: "About", path: "/about" },
  { 
    id: "survey", 
    label: "Digital Wellness Survey", 
    path: "https://docs.google.com/forms/d/e/1FAIpQLScSwhm_2JF5_fUbRAGrsL56ybEgxl1S1LCf780aQZ1oNFTUjQ/viewform?usp=dialog",
    external: true 
  },
];

export default function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="w-full bg-muted p-4 border-b">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.href = '/'}>
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
            <span className="text-2xl font-bold">Bits & Bytes 2025</span>
          </div>
          
          {/* Main navigation items */}
          <nav className="flex space-x-2">
            {navItems.map((item) => 
              item.external ? (
                <a
                  key={item.id}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "px-6 py-3 rounded-md transition-colors text-center text-lg hover:bg-accent"
                  )}
                >
                  {item.label}
                </a>
              ) : (
                <div 
                  key={item.id}
                  className={cn(
                    "px-6 py-3 rounded-md transition-colors text-center text-lg cursor-pointer",
                    location === item.path
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-accent"
                  )}
                  onClick={() => window.location.href = item.path}
                >
                  {item.label}
                </div>
              )
            )}
          </nav>
        </div>
        
        {/* Grade navigation */}
        <div className="flex flex-wrap justify-center gap-2">
          {grades.map((grade) => (
            <div
              key={grade.id}
              className={cn(
                "px-5 py-2 rounded-md transition-colors text-center cursor-pointer",
                location === `/projects/${grade.id}`
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-accent"
              )}
              onClick={() => window.location.href = `/projects/${grade.id}`}
            >
              {grade.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}