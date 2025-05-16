import { 
  type ProjectGroup, 
  type Project, 
  type InsertProjectGroup, 
  type InsertProject 
} from "@shared/schema";
import { waitlist, type Waitlist, type InsertWaitlist } from "@shared/schema";

export interface IStorage {
  getProjectGroups(): Promise<ProjectGroup[]>;
  getProjectGroup(id: number): Promise<ProjectGroup | undefined>;
  createProjectGroup(group: InsertProjectGroup): Promise<ProjectGroup>;
  getProjects(groupId: number): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  addToWaitlist(entry: InsertWaitlist): Promise<Waitlist>;
  isEmailRegistered(email: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private groups: Map<number, ProjectGroup>;
  private projects: Map<number, Project>;
  private currentGroupId: number;
  private currentProjectId: number;
  private waitlist: Map<number, Waitlist>;
  private currentId: number;

  constructor() {
    this.groups = new Map();
    this.projects = new Map();
    this.currentGroupId = 1;
    this.currentProjectId = 1;
    this.waitlist = new Map();
    this.currentId = 1;

    // Synchronously initialize data
    this.initializeData();
  }

  private initializeData() {
    console.log("Starting data initialization...");

    // Create all project groups first to ensure consistent IDs
    // Create Grade 4 group - ID: 4 (Custom ID)
    const grade4Group = this.createProjectGroupSync({
      name: "Grade 4",
      description: "Introductory programming projects by Grade 4 students"
    }, 4);
    console.log("Created Grade 4 group with ID:", grade4Group.id);
    
    // Create Grade 5 group - ID: 1
    const grade5Group = this.createProjectGroupSync({
      name: "Grade 5",
      description: "Projects from Grade 5 students exploring global issues through Scratch"
    });
    console.log("Created Grade 5 group with ID:", grade5Group.id);
    
    // Create Grade 8 group - ID: 2
    const grade8Group = this.createProjectGroupSync({
      name: "Grade 8", 
      description: "Game development projects by Grade 8 students"
    });
    console.log("Created Grade 8 group with ID:", grade8Group.id);
    
    // Create Grade 9 group - ID: 3
    const grade9Group = this.createProjectGroupSync({
      name: "Grade 9",
      description: "Digital technology and AI projects by Grade 9 students"
    });
    console.log("Created Grade 9 group with ID:", grade9Group.id);
    
    // Create Grade 10 group - ID: 10 (Custom ID)
    const grade10Group = this.createProjectGroupSync({
      name: "Grade 10",
      description: "Advanced technology and programming projects by Grade 10 students"
    }, 10);
    console.log("Created Grade 10 group with ID:", grade10Group.id);

    // Grade 5 projects
    const grade5Projects = [
      {
        groupId: grade5Group.id,
        title: "Globalization",
        description: "Our Scratch project shows that I understand that globalization can have positive consequences.",
        preview: "https://uploads.scratch.mit.edu/get_image/project/1128558877_480x360.png",
        link: "https://scratch.mit.edu/projects/1128558877/",
        studentName: "Agata and Sofia"
      },
      {
        groupId: grade5Group.id,
        title: "Amazon Cleanup",
        description: "My Scratch project shows I understand that finite resources can harm our water supply.",
        preview: "https://uploads.scratch.mit.edu/get_image/project/1127455345_480x360.png",
        link: "https://scratch.mit.edu/projects/1127455345/",
        studentName: "Julia"
      },
      {
        groupId: grade5Group.id,
        title: "Hunger Games",
        description: "Our Scratch project shows I understand that to prevent world hunger we need solutions that require sustainability.",
        preview: "https://uploads.scratch.mit.edu/get_image/project/1128549512_480x360.png",
        link: "https://scratch.mit.edu/projects/1128549512/",
        studentName: "Josephine, Hayden, David, Sasha"
      },
      {
        groupId: grade5Group.id,
        title: "Joey Moves Out",
        description: "Our Scratch project shows I understand that migrants immigrate from their homes and create multiculturalism.",
        preview: "https://uploads.scratch.mit.edu/get_image/project/1128557839_480x360.png",
        link: "https://scratch.mit.edu/projects/1128557839/",
        studentName: "Zuzanna, Nina, Ilja"
      },
      {
        groupId: grade5Group.id,
        title: "Globalization Game",
        description: "My Scratch project shows I understand that globalization can cause negative consequences",
        preview: "https://uploads.scratch.mit.edu/get_image/project/1128566225_480x360.png",
        link: "https://scratch.mit.edu/projects/1128566225/",
        studentName: "Kostek"
      },
      {
        groupId: grade5Group.id,
        title: "Beach Cleaners",
        description: "Our Scratch project shows I understand that polluting the environment can cause negative consequences.",
        preview: "https://uploads.scratch.mit.edu/get_image/project/1128178937_480x360.png",
        link: "https://scratch.mit.edu/projects/1128178937/",
        studentName: "Semin, Artem, Aironas"
      }
    ];

    // Grade 4 projects - placeholders until real content is available
    const grade4Projects = [
      {
        groupId: grade4Group.id,
        title: "Introduction to Coding",
        description: "Coming soon! Grade 4 students will showcase their introductory programming projects.",
        preview: "https://placehold.co/480x360/4CAF50/ffffff?text=Grade+4+Projects",
        link: "#",
        studentName: "Grade 4 Students"
      },
      {
        groupId: grade4Group.id,
        title: "Digital Citizenship",
        description: "Coming soon! Projects focusing on digital citizenship and online safety.",
        preview: "https://placehold.co/480x360/2196F3/ffffff?text=Digital+Citizenship",
        link: "#",
        studentName: "Grade 4 Students"
      }
    ];
    
    // Add all Grade 4 projects
    for (const project of grade4Projects) {
      const created = this.createProjectSync(project);
      console.log("Created Grade 4 project:", created);
    }
    
    // Add all Grade 5 projects
    for (const project of grade5Projects) {
      const created = this.createProjectSync(project);
      console.log("Created Grade 5 project:", created);
    }



    // 8.1 Projects
    const grade8Projects = [
      {
        groupId: grade8Group.id,
        title: "Biba and Boba",
        description: "In this game players will have the opportunity to choose between 2 games. In the first game players will go on a space adventure with Sonic who will ask questions about shapes when he jumps on the shapes and the objective is to get all questions correct. Second game will give players the ability to fight their laziness by not listening to it and solve problems that will damage it. Let's fight your laziness and go on an adventure with your friend Sonic!",
        preview: "https://uploads.scratch.mit.edu/get_image/project/1145325257_480x360.png",
        link: "https://scratch.mit.edu/projects/1145325257",
        studentName: "Kostas K & Evan S"
      },
      {
        groupId: grade8Group.id,
        title: "Shape guessing game",
        description: "The purpose of the game is for people to learn shapes and improve their knowledge in shape understanding. At first players will have to guess the exact shape from all of the other ones, then they move on to the next level, afterwards they will answer questions like: What shape is this? And then they would have to find one shape from all of the others, like the first task, but a bit challenging.",
        preview: "https://uploads.scratch.mit.edu/get_image/project/1128531344_480x360.png",
        link: "https://scratch.mit.edu/projects/1128531344/",
        studentName: "Sofija K"
      },
      {
        groupId: grade8Group.id,
        title: "Balloon blast",
        description: "This is a fun and fast math game that helps you get better at quick addition You'll see balloons floating up with different numbers and only one of them is the right answer to the question You have to spot it and click it before it reaches the top If you miss it or click the wrong one you lose a life It's a great way to practice math while keeping things exciting and active.",
        preview: "https://uploads.scratch.mit.edu/get_image/project/1132798165_480x360.png",
        link: "https://scratch.mit.edu/projects/1132798165",
        studentName: "Anton S"
      },
      {
        groupId: grade8Group.id,
        title: "UFO Destroyer",
        description: "My learning objective is to make a fun and creative game that educates children about shapes and addition. The Player's objective is to get as much points before they loose all 3 lives. You can get points by shooting down the UFOs. If you shoot down the UFO that the game tells you to shoot, you get 10 points and a math question.",
        preview: "https://uploads.scratch.mit.edu/get_image/project/1121158117_480x360.png",
        link: "https://scratch.mit.edu/projects/1121158117/",
        studentName: "Jēkabs L"
      },
      {
        groupId: grade8Group.id,
        title: "Magic Shapes",
        description: "The learning objective of the game is to learn shapes and how they are different from each other. The player's goal is to earn coins by getting right answers, you can buy accessories and food for your pet by spending your budget.",
        preview: "https://uploads.scratch.mit.edu/get_image/project/1149926733_480x360.png",
        link: "https://scratch.mit.edu/projects/1149926733",
        studentName: "Juliana C & Vika H"
      },
      {
        groupId: grade8Group.id,
        title: "Falling shapes",
        description: "The learning objective is for 2nd graders to learn about the knowledge of shapes. The player's goal in the game is to catch 100 falling shapes and answer questions correctly.",
        preview: "https://uploads.scratch.mit.edu/get_image/project/1130626077_480x360.png",
        link: "https://scratch.mit.edu/projects/1130626077/",
        studentName: "Mariabella V & Varya K"
      },
      {
        groupId: grade8Group.id,
        title: "Alien invasion",
        description: "A space-themed educational game focusing on math and problem-solving skills.",
        preview: "https://uploads.scratch.mit.edu/get_image/project/1132276275_480x360.png",
        link: "https://scratch.mit.edu/projects/1132276275",
        studentName: "Alex G"
      },
      {
        groupId: grade8Group.id,
        title: "Kingdom royal",
        description: "We are trying to teach the 4th graders about multiplication, division and fractions because that's what they are learning in 4th grade and what we learned. The objective of the game is to start on your journey as a knight saving a kingdom from a strong boss, on the way you will encounter many mini-bosses and engage in math combat until eventually, you defeat the boss.",
        preview: "https://uploads.scratch.mit.edu/get_image/project/1132284848_480x360.png",
        link: "https://scratch.mit.edu/projects/1132284848/",
        studentName: "Daniel B & Ged R"
      },
      {
        groupId: grade8Group.id,
        title: "Strawberry mix",
        description: "The point of the game is to improve on their decision making and attention skills by deciding between good and bad strawberries. The Player's objective is to catch all the good strawberries and try to avoid the spoiled ones.",
        preview: "https://uploads.scratch.mit.edu/get_image/project/1121547357_480x360.png",
        link: "https://scratch.mit.edu/projects/1121547357",
        studentName: "Marii L"
      },
      {
        groupId: grade8Group.id,
        title: "Witch game",
        description: "Our goal for the player is to play a fun and interesting game, but still learn math from it. The topic for learning that we choose is math, specifically multiplying,dividing, adding, and subtracting. One success that we have in the game is that the art of our game is really beautiful and kids will be interested because the colors are bright and outstanding and the art is really magical.",
        preview: "https://uploads.scratch.mit.edu/get_image/project/1132279202_480x360.png",
        link: "https://scratch.mit.edu/projects/1132279202/",
        studentName: "Liza Y & Darina K"
      }
    ];

    // Add all Grade 8.1 projects
    for (const project of grade8Projects) {
      const created = this.createProjectSync(project);
      console.log("Created Grade 8.1 project:", created);
    }

    // 8.2 Projects
    const grade8_2Projects = [
      {
        groupId: grade8Group.id,
        title: "Learning Rivals",
        description: "This is a one on one football game where the first to score 5 goals wins. For your goal to count, you must answer a math question that is timed. The learning objective is to get faster and better at math, specifically multiplying and dividing with big numbers.",
        preview: "https://uploads.scratch.mit.edu/get_image/project/1120948421_480x360.png",
        link: "https://scratch.mit.edu/projects/1120948421/",
        studentName: "Alihan S & Adam"
      },
      {
        groupId: grade8Group.id,
        title: "catquest",
        description: "Play as a cat going through a castle quest where there are obstacles and math questions guarding the next level. Complete 3 levels ranging from easy to hard escape the scary castle to get back outside and to pursue your career as a mathematician.",
        preview: "https://uploads.scratch.mit.edu/get_image/project/1127464391_480x360.png",
        link: "https://scratch.mit.edu/projects/1127464391/",
        studentName: "Liev W & Stan T"
      },
      {
        groupId: grade8Group.id,
        title: "Rescue Joey the Beanbag",
        description: "The 5th graders mascot Joey the Beanbag needs your help! Use your multiplication skills to answer questions and get through levels to reach Joey. A success we had making this game was designing the gameplay from an artistic standpoint.",
        preview: "https://uploads.scratch.mit.edu/get_image/project/1132330502_480x360.png",
        link: "https://scratch.mit.edu/projects/1132330502",
        studentName: "Karlina D & Kira D"
      },
      {
        groupId: grade8Group.id,
        title: "Magic Joey",
        description: "The objective of this Magic Joey game is to gain knowledge and improve in 5th grade math class. Your goal is to overcome the monster by shooting at him, but nothing is easy. You need to answer mathematical questions to stay alive.",
        preview: "https://uploads.scratch.mit.edu/get_image/project/1132330691_480x360.png",
        link: "https://scratch.mit.edu/projects/1132330691/",
        studentName: "Anya G & Nika K"
      },
      {
        groupId: grade8Group.id,
        title: "Goblin World",
        description: "Goblin World lets you defeat goblins, and train your brain! You will have the freedom of choice when choosing your character, we have 2 options, Nano a boy, and Giga a girl. Every time you defeat a goblin you get a question, and your answer is what decides if you can move on, or not!",
        preview: "https://uploads.scratch.mit.edu/get_image/project/1132328078_480x360.png",
        link: "https://scratch.mit.edu/projects/1132328078/",
        studentName: "Roman S"
      },
      {
        groupId: grade8Group.id,
        title: "How to Defeat Jerry the Destroyer",
        description: "The aim of this game is to increase English learning skills at a fourth grade level. The player has to go on a quest in order to retrieve an ancient artifact that has been stolen by the extremely powerful monster.",
        preview: "https://uploads.scratch.mit.edu/get_image/project/1126030368_480x360.png",
        link: "https://scratch.mit.edu/projects/1126030368/",
        studentName: "Keira Simms"
      },
      {
        groupId: grade8Group.id,
        title: "The Kidnapper's Castle",
        description: "In my game grade 4 students will be challenged using their english and spelling skills. The student's objective in the game will be to save their sibling from the evil monster, to do this they will have to go through various levels getting harder and harder as it goes.",
        preview: "https://uploads.scratch.mit.edu/get_image/project/1129110496_480x360.png",
        link: "https://scratch.mit.edu/projects/1129110496/",
        studentName: "Alizé M"
      },
      {
        groupId: grade8Group.id,
        title: "To Kill a Gertude",
        description: "In \"To Kill A Gertrude\", players will have to kill the main villain of the game, Gertrude, by answering english questions to defeat Gertrude and their minions. Our hope is that the students will be able to learn english skills while having fun and defeating Gertrude.",
        preview: "https://uploads.scratch.mit.edu/get_image/project/1127454056_480x360.png",
        link: "https://scratch.mit.edu/projects/1127454056/",
        studentName: "Noah I & Elias K"
      }
    ];

    // Add all Grade 8.2 projects
    for (const project of grade8_2Projects) {
      const created = this.createProjectSync(project);
      console.log("Created Grade 8.2 project:", created);
    }
    
    // Grade 9.1 Projects - Matiss, Simona G, Daniels, Jekab F, Ivanna C, Anna T, Masha vJ, Karola T, Mark G
    const grade9aProjects = [
      {
        groupId: grade9Group.id,
        title: "My Mindful Planner",
        description: "My Mindful Planner helps users stay present, focused, and organized in their daily lives. Designed to improve productivity, self-awareness, and emotional well-being, it combines customizable planning tools, daily reflection prompts, mood tracking, and guided mindfulness exercises.",
        preview: "https://placehold.co/480x360/5D4037/ffffff?text=My+Mindful+Planner",
        link: "https://drive.google.com/file/d/1EydN4mHIWKA7ywP4mVAk96gq3FJpGJ3q/view",
        studentName: "Ivanna C"
      },
      {
        groupId: grade9Group.id,
        title: "MindMaze",
        description: "In this interactive game, players make daily habit choices that impact their focus level, learning time management and concentration skills. A dynamic focus bar adjusts based on decisions, making learning fun. Balancing difficulty was a challenge, but I helped refine mechanics.",
        preview: "https://placehold.co/480x360/673AB7/ffffff?text=MindMaze",
        link: "https://scratch.mit.edu/projects/1139822837/",
        studentName: "Jekab F"
      },
      {
        groupId: grade9Group.id,
        title: "GYM BYTE",
        description: "GymByte is an AI-powered fitness assistant designed to help users stay motivated and consistent with their workouts. I learned how to integrate AI for personalized workout and diet plans. A major success was successfully launching the app without errors.",
        preview: "https://placehold.co/480x360/F44336/ffffff?text=GYM+BYTE",
        link: "https://drive.google.com/file/d/1kv-wnIqVLINEOxYhww6r1FsIF6pxoVNy/view?usp=sharing",
        studentName: "Daniels"
      },
      {
        groupId: grade9Group.id,
        title: "LinguaLeap",
        description: "LinguaLeap is a user-friendly web app designed to help users learn and translate languages effortlessly. It supports a wide range of world languages and offers instant translations, interactive lessons, and fun quizzes to reinforce your knowledge.",
        preview: "https://placehold.co/480x360/2196F3/ffffff?text=LinguaLeap",
        link: "https://lingua-leap-leeshawver1.replit.app/",
        studentName: "Simona G"
      },
      {
        groupId: grade9Group.id,
        title: "Ultimate IR Remote Hub",
        description: "This project turns a Raspberry Pi into a smart IR remote that learns, stores, and sends infrared signals. An OLED display shows real-time commands and device info. I learned about IR communication, GPIO control, and I2C displays.",
        preview: "https://placehold.co/480x360/009688/ffffff?text=IR+Remote+Hub",
        link: "https://drive.google.com/file/d/1zyz8OvkrCSkZZC1LkgPyhJiqxMPikWbx/view",
        studentName: "Mark G"
      },
      {
        groupId: grade9Group.id,
        title: "Study Buddy",
        description: "Study Buddy is a student productivity website designed to help users stay organized and manage their workload. It features a task manager and a calendar so students can plan and track their assignments easily. One success was getting the task system to work smoothly.",
        preview: "https://placehold.co/480x360/FF5722/ffffff?text=Study+Buddy",
        link: "https://study-buddy-tools.github.io/StudyBuddy/",
        studentName: "Anna T"
      },
      {
        groupId: grade9Group.id,
        title: "TravelNotes",
        description: "TravelNotes is your ultimate travel journal—write, share, and upload photos from anywhere in the world! We used AI to bring it to life and learned a lot about coding. The notes feature works great, and I'm still improving the map. It's fun, personal, and perfect for every traveler!",
        preview: "https://placehold.co/480x360/E91E63/ffffff?text=TravelNotes",
        link: "https://travelnotes-karolat.replit.app/",
        studentName: "Karola T"
      },
      {
        groupId: grade9Group.id,
        title: "Study Tracker",
        description: "The Study Tracker is a comprehensive, interactive website for high school students to efficiently manage their academic tasks. It features a real-time updated calendar, task tracking with due dates, priority levels, and progress monitoring, and smart reminders for upcoming deadlines.",
        preview: "https://placehold.co/480x360/CDDC39/ffffff?text=Study+Tracker",
        link: "https://task-master-calendar-mjakovleff.replit.app/",
        studentName: "Masha vJ"
      }
    ];
    
    // Add all Grade 9.1 projects
    for (const project of grade9aProjects) {
      const created = this.createProjectSync(project);
      console.log("Created Grade 9.1 project:", created);
    }
    
    // Grade 9.2 Projects - All other Grade 9 students
    const grade9bProjects = [
      {
        groupId: grade9Group.id,
        title: "Model of a Lancia",
        description: "This is my model interpretation of a model toy car of a 1980 Lancia Delta. My goal for this project was to make my toy car have functional lights by using a raspberry pi zero to program them to do commands such as turn them on or off, or stay on for a certain time period.",
        preview: "https://placehold.co/480x360/424242/ffffff?text=Lancia+Model",
        link: "#",
        studentName: "Vincent D"
      },
      {
        groupId: grade9Group.id,
        title: "Heirloom",
        description: "Have you ever had the perfect jewelry piece in mind but no idea where to look? Imagine a website where you can design your dream jewelry and instantly find similar styles to buy—sounds amazing, right? I created a sleek, stylish platform that looks exactly how I envisioned!",
        preview: "https://placehold.co/480x360/FFD700/ffffff?text=Heirloom+Jewelry",
        link: "https://drive.google.com/file/d/1rZcJ5O_mlFyp1SYWogGQKiC3svTQfBOy/view",
        studentName: "Emily Y"
      },
      {
        groupId: grade9Group.id,
        title: "Pokemon Ranking System",
        description: "This Pokemon ranking system is an interactive game, where players can compare Pokemon characters based on their stats, abilities and power scores. The game will give a chance for players to find out more about their favorite Pokemon characters.",
        preview: "https://placehold.co/480x360/FFC107/ffffff?text=Pokemon+Ranking",
        link: "https://replit.com/join/zjwknpquxl-vgirutyte28",
        studentName: "Vilte G"
      },
      {
        groupId: grade9Group.id,
        title: "Digital Wellness Survey",
        description: "My goal is to create a test for high school students about general use AI, and it needs to show the result for each user, and show the statistics based on scores and answers. In my opinion, I reach the goal to create the survey that is following the main topic.",
        preview: "https://placehold.co/480x360/4CAF50/ffffff?text=Digital+Wellness",
        link: "https://docs.google.com/forms/d/e/1FAIpQLScSwhm_2JF5_fUbRAGrsL56ybEgxl1S1LCf780aQZ1oNFTUjQ/viewform?usp=dialog",
        studentName: "Ksenia K"
      },
      {
        groupId: grade9Group.id,
        title: "ReARange",
        description: "ReARange, the future of interior design. Rearrange your room from the comfort of your couch. Made to explore healthy and ethical ways to use AI. As a very beginner level coder I am really proud of my work, yet it was challenging to effectively communicate with the AI.",
        preview: "https://placehold.co/480x360/3F51B5/ffffff?text=ReARange",
        link: "https://vera-k-2025.github.io/ReARange-/",
        studentName: "Vera K"
      },
      {
        groupId: grade9Group.id,
        title: "Maintenance Report Form",
        description: "This project is a web based maintenance reporting system designed to streamline issue tracking and resolution. It features a responsive form that allows users to select categories, specify locations, describe issues, set urgency levels, and upload images.",
        preview: "https://placehold.co/480x360/607D8B/ffffff?text=Maintenance+Reports",
        link: "https://web-build-master-leeshawver1.replit.app/",
        studentName: "Alejandro M & Valts K"
      },
      {
        groupId: grade9Group.id,
        title: "Bathroom Availability Website",
        description: "The Bathroom Availability Website will help ISL staff and teachers find free bathrooms in real time by coded sensors in the door. It resolves bathroom issues with a live school map and a solar-powered system. AI assisted in coding and problem-solving.",
        preview: "https://placehold.co/480x360/795548/ffffff?text=Bathroom+Availability",
        link: "https://1341233sofie314124.github.io/Bathroom-availibility-website-/",
        studentName: "Anna P & Sofie S"
      },
      {
        groupId: grade9Group.id,
        title: "Digital Wellness Page",
        description: "Explore, learn, and have fun while enhancing your comprehension of digital wellness with our interactive quizzes, games, and AI resources! This page was made in the aim to help students improve their knowledge of digital wellbeing concerning AI while having fun.",
        preview: "https://placehold.co/480x360/9C27B0/ffffff?text=Digital+Wellness",
        link: "https://henri2277.github.io/Digital-wellness-page/resources.html",
        studentName: "Henri R"
      },
      {
        groupId: grade9Group.id,
        title: "PassWorld",
        description: "During the work of my project, Our goal for this yearly event in our school is to learn how to effectively collaborate with generative AI and learn and share new skills with computer programming. Thus, one success accumulated in this project was getting all the requirements.",
        preview: "https://placehold.co/480x360/8BC34A/ffffff?text=PassWorld",
        link: "https://wassim1025.github.io/Password-Security/",
        studentName: "Wassim S"
      },
      {
        groupId: grade9Group.id,
        title: "AceIt: Study and Event Planner",
        description: "AceIt is your ultimate study companion, designed to keep you organized and on top of deadlines! Built for the Bits and Bytes event, it showcases AI potential in daily life. A key success of this project was a functional calendar, with extra study reminders.",
        preview: "https://placehold.co/480x360/00BCD4/ffffff?text=AceIt+Planner",
        link: "https://irina470.github.io/AceIt-Online-Planner/",
        studentName: "Irina S"
      }
    ];
    
    // Add all Grade 9.2 projects
    for (const project of grade9bProjects) {
      const created = this.createProjectSync(project);
      console.log("Created Grade 9.2 project:", created);
    }
    
    // Grade 10 projects - placeholders until real content is available
    const grade10Projects = [
      {
        groupId: grade10Group.id,
        title: "AI-Powered Learning Assistant",
        description: "Coming soon! Advanced AI project that helps personalize learning experiences for students.",
        preview: "https://placehold.co/480x360/F44336/ffffff?text=AI+Learning+Assistant",
        link: "#",
        studentName: "Grade 10 Students"
      },
      {
        groupId: grade10Group.id,
        title: "Digital Wellness Dashboard",
        description: "Coming soon! Comprehensive digital wellness tracking and improvement application.",
        preview: "https://placehold.co/480x360/9C27B0/ffffff?text=Digital+Wellness+Dashboard",
        link: "#",
        studentName: "Grade 10 Students"
      },
      {
        groupId: grade10Group.id,
        title: "Sustainable Technology Project",
        description: "Coming soon! Innovative projects focused on environmental sustainability through technology.",
        preview: "https://placehold.co/480x360/4CAF50/ffffff?text=Sustainable+Tech",
        link: "#", 
        studentName: "Grade 10 Students"
      }
    ];
    
    // Add all Grade 10 projects
    for (const project of grade10Projects) {
      const created = this.createProjectSync(project);
      console.log("Created Grade 10 project:", created);
    }

    console.log("Data initialization completed");
    console.log("All groups:", Array.from(this.groups.values()));
    console.log("All projects:", Array.from(this.projects.values()));
  }

  private createProjectGroupSync(group: InsertProjectGroup, customId?: number): ProjectGroup {
    // Allow specifying custom IDs for special cases (Grade 4 = 4, Grade 10 = 10)
    const id = customId !== undefined ? customId : this.currentGroupId++;
    const now = new Date();
    const projectGroup: ProjectGroup = {
      id,
      name: group.name,
      description: group.description || null,
      createdAt: now
    };
    this.groups.set(id, projectGroup);
    return projectGroup;
  }

  private createProjectSync(project: InsertProject): Project {
    const id = this.currentProjectId++;
    const now = new Date();
    const newProject: Project = {
      id,
      groupId: project.groupId!, // Using non-null assertion operator
      title: project.title,
      description: project.description,
      preview: project.preview,
      link: project.link,
      studentName: project.studentName,
      createdAt: now
    };
    this.projects.set(id, newProject);
    return newProject;
  }

  // Async methods for API compatibility
  async getProjectGroups(): Promise<ProjectGroup[]> {
    return Array.from(this.groups.values());
  }

  async getProjectGroup(id: number): Promise<ProjectGroup | undefined> {
    return this.groups.get(id);
  }

  async createProjectGroup(group: InsertProjectGroup): Promise<ProjectGroup> {
    return this.createProjectGroupSync(group);
  }

  async getProjects(groupId: number): Promise<Project[]> {
    console.log("Getting projects for group:", groupId);
    console.log("All projects:", Array.from(this.projects.values()));
    const projects = Array.from(this.projects.values())
      .filter(project => project.groupId === groupId);
    console.log("Filtered projects:", projects);
    return projects;
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(project: InsertProject): Promise<Project> {
    return this.createProjectSync(project);
  }

  async addToWaitlist(entry: InsertWaitlist): Promise<Waitlist> {
    const id = this.currentId++;
    const now = new Date();
    const waitlistEntry: Waitlist = {
      id,
      email: entry.email,
      name: entry.name,
      company: entry.company || null,
      joinedAt: now
    };
    this.waitlist.set(id, waitlistEntry);
    return waitlistEntry;
  }

  async isEmailRegistered(email: string): Promise<boolean> {
    return Array.from(this.waitlist.values()).some(
      (entry) => entry.email === email
    );
  }
}

export const storage = new MemStorage();