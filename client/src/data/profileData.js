export const profile = {
  name: 'DC Siddharth',
  shortName: 'Siddharth',
  role: 'AI/ML Student · Full-stack Builder · Learner',
  college: 'VNR Vignana Jyothi Institute of Engineering & Technology (VNRVJIET)',
  course: 'B.Tech - Artificial Intelligence & Machine Learning',
  year: '2nd Year, 1st Semester',
  intro:
    'I am a second-year AIML student at VNRVJIET who is deliberately using college to explore where I can do my best work. I am currently undergoing MERN Stack training through college, strengthening C++ and DSA, and building across full-stack development and applied AI/ML instead of choosing a specialization only from theory.',
  philosophy: 'Explore widely. Build consistently. Choose with clarity.',
  heroLine: 'Still exploring. Already building.',
  collegeTraining: {
    title: 'MERN Stack Training',
    provider: 'VNRVJIET',
    summary: 'College-provided full-stack training covering React, Node.js, Express, MongoDB and the flow between frontend, backend and database layers.'
  },
  community: {
    title: 'Street Cause',
    role: 'Student Member · VNRVJIET',
    summary: 'I am part of Street Cause at VNRVJIET. Being involved in a student-run social-impact organisation gives me a space outside academics to work with people, contribute to community-focused initiatives and understand that execution matters beyond technical projects too.',
    organisation: 'Street Cause is a national student-run NGO founded in Hyderabad in 2009 with a mission to develop socially conscious student leaders and create sustainable social impact.',
    areas: ['Community', 'Teamwork', 'Social Impact']
  },
  favoriteProject: {
    title: 'Vigil / investigation-ai',
    kicker: 'THE PROJECT I ENJOYED MOST',
    text: 'Vigil is the project I connected with most because it brought together several things I find interesting at once: AI, graph-based relationships, backend APIs, structured data and an interface that helps make complex information easier to understand. It made me more curious about AI engineering, data systems and how intelligent products are actually built end to end.',
    link: 'https://github.com/SiddharthDC786/investigation-ai'
  },
  aboutDetails: [
    {
      label: 'WHO I AM',
      title: 'A student still choosing his strongest lane',
      text: 'I do not want to force myself into a title like AI Engineer or Full-stack Developer too early. I would rather build enough real projects to understand what I enjoy, what I am good at and where I want to go deeper.'
    },
    {
      label: 'HOW I LEARN',
      title: 'I understand things better when I build them',
      text: 'Projects make me connect the pieces: UI, APIs, databases, authentication, data quality, model integration and failure cases. I try to understand why a tool is being used, not only the syntax needed to make it run.'
    },
    {
      label: 'WHAT I WANT',
      title: 'A strong technical base before specialization',
      text: 'My goal during college is to become technically strong enough to earn a role at a great company and choose a specialization based on evidence from what I have actually built and enjoyed.'
    }
  ],
  currentFocus: [
    {
      index: '01',
      title: 'MERN Stack Training @ VNRVJIET',
      text: 'Learning full-stack development through college training: React, Node.js, Express, MongoDB, REST APIs and frontend-backend integration.',
      tags: ['React', 'Node.js', 'Express', 'MongoDB']
    },
    {
      index: '02',
      title: 'DSA + C++',
      text: 'Strengthening problem-solving fundamentals and getting more comfortable with C++ through coding practice and LeetCode.',
      tags: ['C++', 'DSA', 'LeetCode']
    },
    {
      index: '03',
      title: 'AI / Data Exploration',
      text: 'Using projects to understand whether I want to go deeper into AI engineering, data engineering or backend-oriented systems.',
      tags: ['AI Engineering', 'Data Engineering', 'Backend']
    }
  ],
  learningLoop: ['Learn', 'Build', 'Break', 'Improve', 'Explain'],
  journey: [
    {
      label: 'FOUNDATIONS',
      title: 'Programming + problem solving',
      text: 'Built foundations in C and Python, then started strengthening DSA and C++.'
    },
    {
      label: 'FULL-STACK',
      title: 'College MERN Stack training',
      text: 'Currently learning how React, Node.js, Express and MongoDB work together in complete applications.'
    },
    {
      label: 'APPLIED AI',
      title: 'From CNNs to graph-based systems',
      text: 'Worked on computer-vision and investigation-oriented projects to see how AI fits into real product workflows.'
    },
    {
      label: 'NOW',
      title: 'Building range before choosing depth',
      text: 'Continuing DSA, full-stack and AI/data exploration so I can specialize with more clarity later.'
    }
  ],
  skills: {
    Frontend: ['React', 'Vite', 'HTML', 'CSS', 'JavaScript', 'Tailwind'],
    'Full Stack': ['MERN Stack', 'Node.js', 'Express', 'MongoDB'],
    Programming: ['C', 'C++', 'Python'],
    'Problem Solving': ['DSA', 'LeetCode'],
    'Current Training': ['VNRVJIET MERN Stack Training'],
    'Project Exposure': ['FastAPI', 'PostgreSQL', 'TensorFlow / Keras', 'CNN / Streamlit', 'NLP concepts', 'Neo4j', 'Graph analytics'],
    'Currently Exploring': ['AI Engineering', 'Data Engineering', 'Better full-stack architecture']
  },
  projects: [
    {
      title: 'Vigil / investigation-ai',
      tag: 'Team Project · AI / Graph Analytics',
      description:
        'An AI-powered criminal-network analysis system that turns case data into searchable entities, relationship graphs, timelines and investigation views.',
      contribution:
        'Worked within a team stack spanning the investigation UI, backend APIs, structured case data and graph/NLP concepts while learning how messy records become usable investigation views.',
      problem:
        'Investigation data can be scattered across FIRs, call records and other sources, making relationships between people and events hard to see quickly.',
      approach:
        'Model the information as searchable entities and relationships, then expose it through case search, timelines and interactive network views.',
      decisions: [
        ['FastAPI', 'Python-friendly API layer for data and NLP workflows'],
        ['PostgreSQL', 'Structured case and record data'],
        ['Neo4j', 'Relationship-heavy graph representation'],
        ['Cytoscape.js', 'Interactive network visualisation'],
        ['RapidFuzz / NLP', 'Identity matching and entity-resolution concepts']
      ],
      highlights: ['Cross-source search', 'Relationship graph', 'Case timeline', 'Entity resolution concepts', 'Graph analytics'],
      learned:
        'The difficult part of an AI system is often not the model alone; data quality, identity matching, provenance and explainability matter just as much.',
      tech: ['React', 'Vite', 'FastAPI', 'Python', 'PostgreSQL', 'Neo4j', 'NLP'],
      github: 'https://github.com/SiddharthDC786/investigation-ai',
      proof: 'https://github.com/SiddharthDC786/investigation-ai/blob/main/README.md',
      proofLabel: 'README → Tech Stack',
      live: ''
    },
    {
      title: 'CampusSpace AI',
      tag: 'Collaborative MERN Project',
      description:
        'A campus resource-booking platform for classrooms, labs, seminar halls and other shared spaces, with student and admin workflows.',
      contribution:
        'Collaborated on a full MERN application with authenticated student/admin flows, resource availability, booking conflicts, notifications and validated REST APIs.',
      problem:
        'Shared campus rooms and facilities are difficult to coordinate when availability, approvals and booking conflicts are handled manually.',
      approach:
        'Build one booking system where users can discover spaces, request time slots and receive status updates while admins review conflicts and manage resources.',
      decisions: [
        ['MongoDB + Mongoose', 'Flexible resource, booking and notification models'],
        ['JWT + HTTP-only cookie', 'Authenticated sessions without exposing the token to client JavaScript'],
        ['Zod', 'Strict request validation'],
        ['RBAC', 'Separate USER and ADMIN permissions'],
        ['React / Vite', 'Fast, component-based booking interface']
      ],
      highlights: ['JWT authentication', 'HTTP-only cookies', 'USER / ADMIN RBAC', 'Zod validation', 'Conflict-aware booking', 'Notifications'],
      learned:
        'Full-stack quality comes from enforcing the same business rules at multiple layers, not only from making the interface look complete.',
      tech: ['React', 'Vite', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Zod'],
      github: 'https://github.com/NikithPrasad/campusspace-ai',
      proof: 'https://github.com/NikithPrasad/campusspace-ai/blob/main/README.md',
      proofLabel: 'README → Stack & Security',
      live: ''
    },
    {
      title: 'Malaria Detection System',
      tag: 'AI / Healthcare Project',
      description:
        'A deep-learning system that classifies blood-smear images as parasitized or uninfected and exposes predictions through a Streamlit interface.',
      contribution:
        'Built the Streamlit frontend, integrated CNN inference and worked on image preprocessing and the prediction pipeline, with additional exposure to evaluation and transfer-learning workflows.',
      problem:
        'Blood-smear classification is a useful computer-vision problem for learning how an image model moves from dataset preparation to an interface people can actually use.',
      approach:
        'Preprocess cell images, run CNN-based classification, surface the result and confidence in a Streamlit application, and evaluate model behaviour with standard metrics.',
      decisions: [
        ['TensorFlow / Keras', 'CNN training and inference'],
        ['OpenCV', 'Image loading and preprocessing'],
        ['Streamlit', 'Fast interactive model interface'],
        ['Transfer learning', 'Explore MobileNetV2 / EfficientNetB0 workflows']
      ],
      highlights: ['CNN inference', 'Image preprocessing', 'Streamlit UI', 'Prediction pipeline', 'Model evaluation'],
      learned:
        'A usable ML project needs the entire pipeline—input handling, preprocessing, inference, output communication and evaluation—not only a trained model.',
      tech: ['Python', 'TensorFlow', 'Keras', 'CNN', 'OpenCV', 'Streamlit'],
      github: 'https://github.com/SiddharthDC786/malaria-detection',
      proof: 'https://github.com/SiddharthDC786/malaria-detection/blob/main/README.md',
      proofLabel: 'README → My Contribution',
      live: ''
    },
    {
      title: 'AI Portfolio Assistant',
      tag: 'Personal Project · 2026',
      description:
        'A personal portfolio with an integrated AI assistant that answers questions about my skills, projects, profiles and resume.',
      contribution:
        'Built the React/Vite experience, structured profile data separately from the UI, used a Node/Express AI endpoint and added local fallback responses for demo reliability.',
      problem:
        'A normal portfolio makes an evaluator search for information. I wanted them to be able to ask the portfolio directly while keeping answers grounded in my real profile.',
      approach:
        'Keep profile facts in structured data, send natural-language questions through a server-side Gemini endpoint, and attach deterministic local fallbacks and proof links to important questions.',
      decisions: [
        ['React / Vite', 'Fast, responsive single-page experience'],
        ['Node / Express', 'Keep the API key and model call on the server'],
        ['Structured profile data', 'One source of truth for site and chatbot'],
        ['Local fallback', 'Important demo questions still work if the AI API is unavailable']
      ],
      highlights: ['Grounded answers', 'Server-side API key', 'Local fallback', 'Proof links', 'Rich response cards'],
      learned:
        'AI integration is stronger when the product handles grounding, failure states and user experience instead of treating the model as a magic text box.',
      tech: ['React', 'Vite', 'Node.js', 'Express', 'Gemini API'],
      github: 'https://github.com/SiddharthDC786/siddharth-ai-portfolio',
      proof: 'https://github.com/SiddharthDC786/siddharth-ai-portfolio',
      proofLabel: 'Portfolio Repository',
      live: ''
    }
  ],
  additionalProjects: [
    {
      title: 'ParaDetect-AI',
      description: 'A TensorFlow/Keras CNN prototype for parasitized-vs-uninfected malaria blood-smear classification.',
      github: 'https://github.com/SiddharthDC786/ParaDetect-AI'
    }
  ],
  evidence: {
    neo4j: {
      claim: 'Vigil uses Neo4j for graph-oriented relationship data.',
      source: 'investigation-ai / README.md → Graph Database: Neo4j',
      url: 'https://github.com/SiddharthDC786/investigation-ai/blob/main/README.md'
    },
    mongodb: {
      claim: 'CampusSpace AI uses MongoDB with Mongoose as part of its MERN backend.',
      source: 'campusspace-ai / README.md → Stack & Data model',
      url: 'https://github.com/NikithPrasad/campusspace-ai/blob/main/README.md'
    },
    cnn: {
      claim: 'The malaria project uses TensorFlow/Keras CNN workflows and a Streamlit interface.',
      source: 'malaria-detection / README.md → Technologies & My Contribution',
      url: 'https://github.com/SiddharthDC786/malaria-detection/blob/main/README.md'
    },
    java: {
      claim: 'Java is not listed in Siddharth\'s current portfolio skills.',
      source: 'Portfolio skill data',
      url: ''
    }
  },
  links: {
    github: 'https://github.com/SiddharthDC786',
    linkedin: 'https://www.linkedin.com/in/siddharth-dc-10319a3b3',
    leetcode: 'https://leetcode.com/u/DCSiddharth/',
    resume: '/DC_Siddharth_Resume.pdf'
  },
  interests: ['AI Engineering', 'Data Engineering', 'Full-stack Development', 'DSA', 'Applied Machine Learning']
}
