// EDIT THIS FILE ONLY — the portfolio page (index.html) reads all its content from here.
window.PORTFOLIO = {
  name: "Vijaya Lakshmi R",
  initials: "VL",
  role: "Developer · Data Management Intern",
  tagline: "Building with data and code.",
  // big rotating line in the hero of index.html:  "Every <word> has a story. I find it."
  headline: { lead: "Every", words: ["dataset", "survey", "spreadsheet", "database", "dashboard"], tail: "has a", accent: "story.", end: "I find it." },
  // "Get in touch" form: messages are delivered to links.email through formsubmit.co (free, no account).
  // The very first message sends an activation email to that inbox — click "Activate" once and it works from then on.
  contactForm: true,
  skillGroups: {                                                // used by index.html (falls back to "skills")
    "Languages": ["Python", "R", "SQL", "HTML", "CSS"],
    "Analysis & ML": ["Pandas", "NumPy", "Scikit-learn", "Statistical Analysis", "EDA", "Machine Learning"],
    "Visualisation & BI": ["Power BI", "Excel", "SPSS", "Data Visualization"],
    "Data & Tools": ["Data Management", "Git & GitHub", "VS Code"]
  },
  location: "Chennai, India",
  status: "Open to full-time roles",
  about: [
    "B.Sc. Statistics graduate with a strong foundation in statistics and hands-on experience in data analysis, SQL-based database querying and machine learning.",
    "Currently interning at Binary Holdings in development and data management, and seeking full-time roles in software development, data analytics and database management."
  ],
  links: {
    linkedin: "https://www.linkedin.com/in/vijaya-lakshmi-r-6a5a34290/",
    github: "https://github.com/Vijilax23",
    email: "vijayalakshmir.sbscvv@gmail.com"
  },
  skills: ["Python", "R", "SQL", "Pandas", "NumPy", "Scikit-learn", "Power BI", "Excel", "SPSS", "Statistical Analysis", "EDA", "Machine Learning", "Data Visualization", "Data Management", "HTML", "CSS", "Git & GitHub", "VS Code"],
  projects: [
    { title: "Parental Support & Career Aspirations", desc: "Statistical research using survey data analysis to understand how parental support shapes career aspirations.", tags: ["Statistics", "Survey Analysis", "SPSS"], link: "" },
    { title: "Shopping Preference Analysis", desc: "Consumer behaviour study using R programming and SQL to uncover shopping preferences.", tags: ["R", "SQL", "Consumer Behaviour"], link: "" },
    { title: "Food Demand Forecasting", desc: "Python project on forecasting food demand from historical data.", tags: ["Python", "Forecasting", "GitHub"], link: "https://github.com/Vijilax23/p2-food-demanding-forecasting" },
    { title: "EasyMart Clone", desc: "A shopping web app clone built with TypeScript.", tags: ["TypeScript", "Web", "GitHub"], link: "https://github.com/Vijilax23/EasyMart-clone" }
  ],
  experience: [
    { role: "Development & Data Management Intern", org: "Binary Holdings", when: "Present", points: [
      "Working across software development and data management, applying analytics and coding skills in a real-world business environment.",
      "Organising, cleaning and managing business data to keep it accurate and analysis-ready."
    ] },
    { role: "DS & ML Intern", org: "Infotact Solutions", when: "Mar 2026 – May 2026 · 3 mos", points: [
      "Worked on data science and machine learning projects covering preprocessing, model development and evaluation.",
      "Performed data cleaning, feature engineering and EDA using Python (Pandas, NumPy).",
      "Developed and evaluated ML models for predictive analytics using Scikit-learn.",
      "Extracted and analysed structured datasets with SQL to generate actionable insights.",
      "Built visualizations and dashboards in Power BI and Excel to communicate results."
    ] },
    { role: "Intern", org: "DMS (Directorate of Economics & Statistics), Tamil Nadu Government", when: "Internship", points: [
      "Learned how the Tamil Nadu Government collects, organises and manages large-scale official data.",
      "Gained exposure to census data collection methods and data classification processes.",
      "Studied statistical formulas used in population calculations and demographic analysis.",
      "Prepared and submitted a detailed internship report to the college."
    ] }
  ],
  education: [
    { degree: "B.Sc. Statistics", school: "SDNB Vaishnav College, Chennai · University of Madras", when: "May 2022 – May 2025 · 67%" }
  ],
  certifications: [
    "Data Science for Python — NPTEL · 2024",
    "Data Analysis Program — QSpiders · 2025–2026"
  ]
};
