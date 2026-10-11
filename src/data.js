// Everything shown on the site lives here. Edit this file to update your content.

export const profile = {
  name: 'Pranav More',
  role: 'Full Stack Web Developer',
  email: 'pranavmore2811@gmail.com',
  phone: '+91 89833 00103',
  phoneHref: '+918983300103',
  location: 'Pune, India',
  links: {
    github: 'https://github.com/Pranavm103',
    linkedin: 'https://www.linkedin.com/in/pranavmore103',
    twitter: 'https://x.com/Pranavmore2811',
  },
  tagline: 'A wizard of code, turning concepts into magical solutions.',
  summary:
    'I build web applications end to end with the MERN stack, from clean, responsive interfaces to the APIs and databases behind them. I enjoy collaborating with a team, breaking down problems, and shipping features people can actually use.',
}

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export const facts = [
  { label: 'Based in', value: 'Pune, Maharashtra' },
  { label: 'Education', value: 'BE, Electronics and Computer Engineering' },
  { label: 'CGPA', value: '8.5 / 10' },
  { label: 'Main stack', value: 'React, Node.js, Express, MongoDB' },
]

export const experience = [
  {
    role: 'MERN Stack Developer Trainee',
    company: 'AccioJob',
    place: 'On-site, Pune',
    period: 'Aug 2025 - Jun 2026',
    points: [
      'Built a Learning Management System with React.js, Node.js, Express.js and MongoDB, supporting 50+ simulated users with authentication and course management.',
      'Developed an AI-powered doubt-clearing chatbot that gave instant answers and cut query resolution time by about 70%.',
    ],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
  },
  {
    role: 'Web Development Intern',
    company: 'CODSOFT',
    place: 'On-site, Pune',
    period: 'Jan 2025 - Mar 2025',
    points: [
      'Developed responsive web applications with HTML, CSS, JavaScript and React.js, focusing on clean UI and a smooth user experience.',
      'Created and deployed multiple projects, reducing redundant code by 15%.',
    ],
    tech: ['HTML', 'CSS', 'JavaScript', 'React'],
  },
  {
    role: 'Frontend Developer',
    company: 'Freelance',
    place: '',
    period: 'Jun 2023 - Present',
    points: [
      'Built portfolio and business websites for clients using React.js, Tailwind CSS and RESTful APIs.',
    ],
    tech: ['React', 'Tailwind CSS', 'REST APIs'],
  },
  {
    role: 'Development Intern',
    company: 'Infosys Springboard',
    place: '',
    period: 'Winter 2023',
    points: [
      'Completed a development internship focused on full stack architecture and deployment.',
    ],
    tech: ['Full stack', 'Deployment'],
  },
]

export const projects = [
  {
    featured: true,
    title: 'CourseCraft AI',
    kind: 'Learning Management System',
    period: 'Mar 2026 - Jun 2026',
    description:
      'A MERN-based LMS with secure authentication, role-based access, course enrollment and video streaming. An integrated AI chatbot answers student doubts in real time.',
    highlights: ['95% accuracy in AI transcription', '30% higher course completion'],
    tech: ['React', 'Express', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    github: '',
    live: 'https://coursecraft-ai.netlify.app/',
  },
  {
    featured: true,
    title: 'Employee Management System',
    kind: 'Admin and employee dashboards',
    period: 'Jun 2025 - Aug 2025',
    description:
      'Separate dashboards for admins and employees, with task assignment and completion tracking across 50+ simulated employee records.',
    highlights: ['60% less manual effort', 'Responsive, component-based UI'],
    tech: ['React', 'Tailwind CSS'],
    github: 'https://github.com/Pranavm103/EMS',
    live: 'https://corporate-work-ems.vercel.app/',
  },
  {
    featured: true,
    title: 'Diabetes Detection from ECG',
    kind: 'Neural network research project',
    period: 'Aug 2024 - Apr 2025',
    description:
      'An AI-driven system that uses ECG signals and RNNs for real-time heart rate analysis and diabetes risk assessment, with sensor-based ECG acquisition.',
    highlights: ['1000+ ECG samples analysed', '70% less manual screening'],
    tech: ['React', 'Python'],
    github: '',
    live: '',
  },
  {
    title: 'Previous Portfolio',
    kind: 'Personal website',
    description:
      'My earlier portfolio website, showcasing my projects, skills, work experience and contact details.',
    tech: ['React', 'CSS'],
    live: 'https://pranavmore.netlify.app/',
  },
  {
    title: 'SmartInvest',
    kind: 'Freelance project',
    description:
      'A React.js app for managing and tracking stock portfolios, with a responsive interface.',
    tech: ['React'],
    live: 'https://tradewithvss.netlify.app/',
  },
  {
    title: 'Diabetes Diet Website',
    kind: 'Health website',
    description:
      'A website guiding diabetic diets and meal plans, with an intuitive UI and clear sections on nutrition.',
    tech: ['React'],
    github: 'https://github.com/Pranavm103/healthy-life-app',
    live: 'https://gohealthylife.netlify.app/',
  },
  {
    title: 'Weather Application',
    kind: 'React app',
    description:
      'Shows real-time weather for selected cities using the OpenWeatherMap API, with a clear, styled interface.',
    tech: ['React', 'OpenWeatherMap API'],
    github: 'https://github.com/Pranavm103/weather-react-app',
  },
  {
    title: 'Notes Keeper',
    kind: 'React app',
    description:
      'A note-taking app to create, view and delete personal notes with quick interactions.',
    tech: ['React'],
    github: 'https://github.com/Pranavm103/Notes-Keeper-App',
  },
  {
    title: 'Agency Landing Page',
    kind: 'Static website',
    description:
      'A responsive, modern landing page for a digital agency, built with HTML, CSS and Bootstrap.',
    tech: ['HTML', 'CSS', 'Bootstrap'],
    github: 'https://github.com/Pranavm103/Landing-page',
  },
  {
    title: 'Room Booking',
    kind: 'Booking interface',
    description:
      'A simple hotel room booking interface that handles guest data and room IDs with a mobile-friendly layout.',
    tech: ['HTML', 'CSS', 'JavaScript'],
  },
]

export const skills = [
  { group: 'Front end', items: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind CSS', 'Bootstrap', 'EJS'] },
  { group: 'Back end', items: ['Node.js', 'Express', 'RESTful APIs'] },
  { group: 'Databases', items: ['MongoDB', 'PostgreSQL', 'MySQL'] },
  { group: 'Languages', items: ['JavaScript', 'Java', 'Python', 'C', 'C++'] },
  { group: 'Tools', items: ['Git', 'GitHub', 'Postman', 'pgAdmin', 'MongoDB Compass'] },
  { group: 'Working style', items: ['Teamwork', 'Communication', 'Analytical thinking', 'Decision-making'] },
]

export const education = [
  {
    school: 'PES Modern College of Engineering',
    place: 'Pune',
    degree: 'BE in Electronics and Computer Engineering',
    period: 'Jun 2021 - May 2025',
    score: 'CGPA 8.5 / 10',
  },
  {
    school: 'Kalasagar Academy and Junior College',
    place: 'Wai',
    degree: 'Higher Secondary Certificate (HSC)',
    period: 'Jun 2019 - Apr 2021',
    score: '90.33%',
  },
  {
    school: 'Joy Childrens Academy',
    place: 'Wai',
    degree: 'Secondary School Certificate (SSC)',
    period: 'Jun 2018 - Apr 2019',
    score: '90.60%',
  },
]

export const certifications = [
  { title: 'MERN Stack Development', issuer: 'AccioJob' },
  { title: 'The Complete Web Development Bootcamp', issuer: 'Udemy' },
  { title: 'Python for Data Science, AI and Development', issuer: 'Coursera (IBM)' },
]
