import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold tracking-tighter">About Bits & Bytes 2025</h1>
          <p className="mt-4 text-gray-500 md:text-xl">
            A celebration of digital creativity at ISL (International School of Latvia)
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-3xl mx-auto mb-16"
        >
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Event Overview</h2>
              <p className="mb-6 text-muted-foreground">
                Bits & Bytes is the International School of Latvia's annual celebration of digital learning, creativity, and innovation. 
                The 2025 edition showcases student projects focusing on coding, artificial intelligence, 
                and digital wellness across multiple grade levels.
              </p>
              
              <h3 className="text-xl font-semibold mb-3">During this event you can find:</h3>
              <ul className="space-y-2 list-disc pl-6 mb-6">
                <li>PYP Students will share their Digital Citizenship learning from the year</li>
                <li>Teacher lunch sessions discussing AI's role in education</li>
                <li>A student showcase in the International School of Latvia lobby and here on this website displaying coding projects, AI creations, and digital wellness initiatives from Grades 4, 5, 8, 9, and 10</li>
                <li>Student-led sessions where MYP students will guide parents through AI literacy and teachable machines</li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        <h2 className="text-3xl font-bold text-center mb-8">Website Development Team</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Tymur's Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="h-[300px] overflow-hidden rounded-lg mb-4 bg-muted">
                  <img
                    src="/assets/tymur-profile.jpg"
                    alt="Tymur's Picture"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      console.error("Error loading Tymur's image:", e);
                      const img = e.currentTarget;
                      img.style.display = 'block';
                      img.style.backgroundColor = '#f3f4f6';
                    }}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">Tymur</h3>
                <p className="text-gray-500">
                  Lead Developer at Bits & Bytes, bringing innovative solutions to life.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Artemii's Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="h-[300px] overflow-hidden rounded-lg mb-4 bg-muted">
                  <img
                    src="/assets/artemii-new.jpg"
                    alt="Artemii's Picture"
                    className="w-full h-full object-cover object-top"
                    onError={(e) => {
                      console.error("Error loading Artemii's image:", e);
                      const img = e.currentTarget;
                      img.style.backgroundColor = '#f3f4f6';
                    }}
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">Artemii</h3>
                <p className="text-gray-500">
                  Creative Director at Bits & Bytes, designing the future of technology.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}