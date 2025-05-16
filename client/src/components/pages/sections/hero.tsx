import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function Hero() {
  const [, navigate] = useLocation();

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center space-y-4"
          >
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Welcome to Bits & Bytes 2025
              </h1>
              <h2 className="text-xl font-semibold text-primary sm:text-2xl mb-2">
                International School of Latvia
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Explore our showcase of innovative student projects from Grades 4, 5, 8, 9, and 10. 
                Discover creative applications of technology, coding, and digital wellness initiatives.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button 
                onClick={() => navigate("/about")} 
                variant="default" 
                size="lg"
              >
                About the Event
              </Button>
              <Button 
                onClick={() => navigate("/projects/3")} 
                variant="outline" 
                size="lg"
              >
                Browse Projects
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto aspect-video overflow-hidden rounded-xl"
          >
            <img
              src="https://images.unsplash.com/photo-1531297484001-80022131f5a1"
              alt="Product showcase"
              className="object-cover w-full h-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}