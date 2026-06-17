export interface Skill {
  name: string;
  url: string;
  cadence: string;
  description: string;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
}

export interface Education {
  degree: string;
  school: string;
  location: string;
  url: string;
}

export interface MediaCard {
  title: string;
  image: string;
  details: string[];
  url?: string;
}

export const currentSkills: Skill[] = [
  {
    name: 'ReactJS',
    url: 'https://github.com/jmarsha82/jm-mern-resume-portal',
    cadence: 'Used Daily',
    description: 'Assorted personal projects including uses in website and implementation using java Spring Framework'
  },
  {
    name: 'Python',
    url: 'https://github.com/jmarsha82/cse-511a-pacman-ai',
    cadence: 'Used Daily',
    description: 'Machine learning projects and neural network research'
  },
  {
    name: 'C++',
    url: 'https://github.com/jmarsha82/jm-gui-cplusplus',
    cadence: 'Used Daily',
    description: 'Executable and Webassembly projects using a SimConnect API and Flight Simulation Software'
  },
  {
    name: 'Jest',
    url: 'https://github.com/jmarsha82/jm-mern-resume-portal/tree/master/frontend/src/test',
    cadence: 'Used Daily',
    description: 'Used to test javascript code in both work and personal projects'
  },
  {
    name: 'Codex',
    url: 'https://openai.com/codex/',
    cadence: 'Used Daily',
    description: 'Go to CLI for coding assitance for both work and personal projects. Use of hooks and skills daily'
  }
];

export const experiences: Experience[] = [
  {
    company: 'Boeing',
    role: 'Senior Programmer',
    period: 'June 2019 - Present',
    location: 'St. Louis MO',
    bullets: [
      'Developed several mod packages using C++ web assembly capable of accessing internal APIs and allowing for interaction.',
      'Developed flight component logic using C++ for virtual versions of the 737Max8 737Max9 and 737NG planes.',
      'Implemented a CI/CD pipeline yaml in Azure DevOps and Gitlab which integrated automated unit tests, code scanning using Coverity and SonarQube and move code between environments.',
      'Designed and implemented logic for the Primary Flight Display, Multifunction Flight Display and Flight Management Computer using Typescript, HTML, and CSS.',
      'Developed over 4000 unit test cases using Jest for supplier provided code in the span of 5 months',
      'Designed and implemented a integration test application used Catch2 in C++ to test flight lessons',
      'Act as a Dev Lead for the 737Max8 MOD team where I am responsible for reviewing and testing all code before it is migrated to production.',
      'Developed custom components with Boeings Common Simulation Framework and integrated Boeings SimBinary packages with the corresponding planes in ESP, Microsoft Flight Simulator X, and Microsoft Flight Simulator 2020.',
      'Implemented a Simulation State Control Service that uses SimConnect to interact with Microsoft Flight Simulator 2020 using C++.',
      'Work with Third Party Simulation Code and gain experience in Game development and integration.',
      'Assisted in Onboarding multiple resources by resolving any issues with software installation, plugin setup, plugin execution and a general explanation of the application architecture.',
      'Developed a large-scale request and workflow tracking system for the treasury organization at Boeing using ReactJS and Kotlin.',
      'Implemented a CI/CD pipeline in Gitlab',
      'Practiced Test Driven development on a Treasury application using Jest and JUnit.',
      'Developed an interactive dashboard that allowed all Boeing employees to have a better user experience on the internal Boeing Homepage using Javascript, Thymeleaf and Java.',
      'Used Spring Boot Framework and pushed application into Cloud based storage.',
      'Worked in a single and paired programming environment and used Agile development standards.'
    ]
  },
  {
    company: 'Boeing',
    role: 'System and Data Analyst',
    period: 'July 2015 - June 2019',
    location: 'St. Louis MO',
    bullets: [
      'Worked as scrum master for multiple product teams on multiple applications.',
      'Became a specialist at using Team Foundation Server and coached other teams to use agile methodologies through the work tracking application.',
      'Acted as production focal and worked with customers and developers to fix any issues that occurred with the application in a timely manner.',
      'Interacted with testing and work item tracking with Gitlab.',
      'Assisted in the development of low level web pages and web applilcations.',
      'Created dynamic interactive dashboards using Team Foundation Server displaying code coverage and work item statuses for leadership.',
      'Prepared requirements and documentation for multiple security and quality audits.',
      'Assisted in the retirement of numerous applications as part of a department tech debt reduction.',
      'Prepared development schedules and program milestones for multiple projects.',
      'Transitioned from an analyst to developer role in the creation of an application which interfaces with several other apps and improves user experience using an interactive desktop.'
    ]
  },
  {
    company: 'Accenture',
    role: 'Senior Systems Specialist',
    period: 'June 2013 - July 2015',
    location: 'St. Louis MO',
    bullets: [
      'Acted as Proxy Product Owner on Scrum Team working on a multimillion-dollar billing application.',
      'Used a variety of development software for SQL/PLSQL and XML.',
      'Managed changes to VersionOne to track Scrum team members progress and burn down.',
      'Updated requirements, defects, and test scripts in ALM.',
      'Clarified and refined requirements to assist in testing efforts of defects and application enhancements.',
      'Validated system functionality against specifications and managed testing effort.',
      'Challenged new members of the Scrum team with complex tasks and helped them work through issues.',
      'Assembled and gave several presentations on new functionality to members of the System Integration Testing team.',
      'Communicated issues and devoted time daily to the Client Application Test team and their efforts.',
      'Participated in several conference calls a day to discuss issues and timelines with other teams and business representatives.',
      'Maintained working relationship with developers and management.',
      'Played a key role in the Agile and Waterfall methods of the Software Development Lifecycle.',
      'Using the Agile Sprint method, all defects and application enhancements were completed at or under a two week timeframe.',
      'Created and maintained relationships with Product Owners and business representatives of the United States Postal Service in Washington D.C. to clarify issues with requirements.'
    ]
  },
  {
    company: 'Phillips 66',
    role: 'Production Associate',
    period: 'August 2008 - June 2013',
    location: 'Hartford IL',
    bullets: [
      'Production Associate capable of running and maintaining several production systems.',
      'One of six Safety Core Team Leaders responsible for internal audits, safety initiatives, and plant wide presentations.',
      'Became fluent in SAP computer system while organizing inbound outbound freight.',
      'Accomplished annual Online Based Training concerning all aspects of safety protocol.',
      'Pulling and loading orders for outbound trucks.',
      'Co-managed the Behavior Based Safety Team which contributed to Hartford Lubes Recertification',
      'Created and gave several presentations on safety issues throughout the plant.'
    ]
  }
];

export const education: Education[] = [
  {
    degree: 'Masters in Computer Engineering',
    school: 'Washington University of St. Louis',
    location: 'St.Louis MO',
    url: 'https://wustl.edu/'
  },
  {
    degree: 'Masters in Business Administration with a Specialization in Management Information Systems',
    school: 'Southern Illinois University at Edwardsville',
    location: 'Edwardsville IL',
    url: 'https://www.siue.edu/'
  },
  {
    degree: 'Bachelor of Liberal Studies with an Emphasis in Art',
    school: 'Southern Illinois University at Edwardsville',
    location: 'Edwardsville IL',
    url: 'https://www.siue.edu/'
  }
];

export const devBooks: MediaCard[] = [
  { title: 'Expert C Programming: Deep C Secrets', image: '/img/developer/deep_c_secrets.jpg', details: ['Peter van der Linden', '1994', 'Explains some of the hardest concepts of C programming.', 'ISBN : 9780131774292'] },
  { title: 'Growing Object-Oriented Software, Guided by Tests.', image: '/img/developer/growing_OO_tests.jpg', details: ['Steve Freeman, Nat Pryce', '2009', 'Complete walkthrough of TDD.', 'ISBN : 9780321503626'] },
  { title: 'Computer Security: A Hands-On Approach', image: '/img/developer/computer_sec_hands_on.jpg', details: ['Wenliang Du', '2017', 'Great walkthrough. Learn a lot of C in the process. Get the newest edition.', 'ISBN : 9781548367947'] },
  { title: 'Code: The Hidden Language of Computer Hardware and Software', image: '/img/developer/code_book.jpg', details: ['Charles Petzold', '2022', 'Great explanation of how computers work at their most basic. Get the newest edition.', 'ISBN : 9780735611313'] },
  { title: 'The Linux Programming Interface', image: '/img/developer/linux_prog.jpg', details: ['Michael Kerrisk', '2010', 'Complete guide to Linux OS with lots of C examples.', 'ISBN : 9781593272203'] },
  { title: "Clean Architecture: A Craftsman's Guide to Software Structure and Design", image: '/img/developer/clean_architecture.jpg', details: ['Robert Martin', '2017', 'Understanding of how applications should be designed.', 'ISBN : 9780134494164'] },
  { title: 'Extreme Programming Explained: Embrace Change', image: '/img/developer/extreme_program.jpg', details: ['Kent Beck, Cynthia Andres', '2004', 'Overview of agile and how dev teams should interact.', 'ISBN : 9780321278654'] }
];

export const devLinks: MediaCard[] = [
  { title: 'CodinGame', image: '/img/developer/codin_game.jpg', url: 'https://www.codingame.com/start', details: ['Great way to build your skills and a lot of fun. Recommend creating a free account.'] },
  { title: "O'Reilly", image: '/img/developer/o_reilly.jpg', url: 'https://learning.oreilly.com/home/', details: ['Great resource for training if you have an account.'] },
  { title: 'Data Structure Visualizations', image: '/img/developer/data_stuct_visual.jpg', url: 'https://www.cs.usfca.edu/~galles/visualization/', details: ['Helpful way to understand how certain algorithms work.'] },
  { title: 'JSON Placeholder', image: '/img/developer/json_placeholder.jpg', url: 'https://jsonplaceholder.typicode.com/', details: ['Really good way to fake a backend for testing.'] },
  { title: 'Replit', image: '/img/developer/replit.jpg', url: 'https://replit.com/', details: ['Online taylored IDEs with built in development tools.'] },
  { title: 'W3 Schools', image: '/img/developer/w3_schools.jpg', url: 'https://www.w3schools.com/default.asp', details: ['All around good aid for simple web dev issues'] },
  { title: 'NinjaMock', image: '/img/developer/ninjamock.jpg', url: 'https://ninjamock.com/', details: ['Great tool if you find yourself as your own UX Designer'] },
  { title: 'Trello', image: '/img/developer/trello.jpg', url: 'https://trello.com/en', details: ['Free online WIP board for organizing projects'] },
  { title: 'HackerRank', image: '/img/developer/hackerrank.jpg', url: 'https://www.hackerrank.com/dashboard', details: ['Varitey of coding challenges for different languages'] },
  { title: 'Spring', image: '/img/developer/spring.jpg', url: 'https://spring.io/guides', details: ['Starting point for implementing Spring Framework'] },
  { title: 'React', image: '/img/developer/react.jpg', url: 'https://react.dev/', details: ['Starting point for implementing React Framework'] },
  { title: 'Angular', image: '/img/developer/angular.jpg', url: 'https://angular.io/', details: ['Starting point for implementing Angular Framework'] },
  { title: 'LeetCode', image: '/img/developer/leetcode.jpg', url: 'https://leetcode.com/', details: ['Great way to practice coding problems and interview questions'] },
  { title: 'Claude AI', image: '/img/developer/claudeai.jpg', url: 'https://claude.ai/', details: ['Great AI tool for answering coding questions'] }
];
