import { motion } from "framer-motion";

export default function Features() {
  return (
    <section className="py-24 bg-muted">
      <div className="container px-4 md:px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            About Bits & Bytes
          </h2>
          <p className="mt-4 text-gray-500 md:text-xl">
            The Bits & Bytes Event is a three-day event taking place from April 28 to April 30, celebrating coding, artificial intelligence (AI), and digital wellness. It aims to explore how technology can enhance learning, well-being, and relationships.
          </p>
          <div className="mt-8 text-left">
            <h3 className="text-xl font-semibold mb-4">During this event you can find:</h3>
            <ul className="space-y-4 text-muted-foreground">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Workshops where students from Grades 1-12 will teach each other about healthy digital habits</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Teacher lunch sessions discussing AI's role in education and digital well-being</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>A student showcase displaying coding projects, AI creations, and digital wellness initiatives</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Student-led parent sessions where Grades 6-10 students will guide parents through AI literacy and teachable machines</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Video Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="aspect-video w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg">
            <iframe
              src="https://drive.google.com/file/d/1LEOnJOAIM1eKl1--or4wyttpyDlF0inO/preview"
              width="100%"
              height="100%"
              allow="autoplay; fullscreen"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </section>
  );
}