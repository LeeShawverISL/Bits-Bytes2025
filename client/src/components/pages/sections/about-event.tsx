import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Rocket,
  Shield,
  Zap,
  Users,
  School,
  Code
} from "lucide-react";

const features = [
  {
    icon: School,
    title: "PYP Digital Citizenship",
    description: "PYP Students share their Digital Citizenship learning from the year."
  },
  {
    icon: Zap,
    title: "AI in Education",
    description: "Teacher lunch sessions discussing AI's role in education."
  },
  {
    icon: Code,
    title: "Student Showcase",
    description: "Projects from Grades 4, 5, 8, 9, and 10 displayed in the ISL lobby and on this website."
  },
  {
    icon: Users,
    title: "MYP Student Sessions",
    description: "Student-led guidance for parents on AI literacy and teachable machines."
  }
];

export default function AboutEvent() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter mb-2">Digital Wellness Day 2025</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Join us for a celebration of student innovation, digital literacy, and technology at ISL
          </p>
        </motion.div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}