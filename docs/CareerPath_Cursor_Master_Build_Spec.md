CAREERPATH
Cursor AI Development Guide
Ghana + Nigeria • Two-week MVP • Team Development Playbook
Purpose: a practical guide for building the CareerPath MVP with an AI coding agent, GitHub, Supabase and Vercel, while keeping the project easy to continue in VS Code.
## 1. Product Overview
CareerPath is a personalised career-discovery platform for young people in Ghana and Nigeria. A student completes an assessment based on interests, abilities, hobbies, subjects and preferences. The system recommends career paths, explains them, provides country-specific education/pathway information, creates a roadmap, and allows the student to request guidance from a professional.
Core flow:
Student → Assessment → Career matches → Career details → Roadmap → Mentor request
The supplied BuildLabs capstone document includes Youth School-to-Work Transition as a problem statement and describes the lack of practical experience, career guidance, professional networks and relevant opportunities. CareerPath addresses the career-guidance and network portions of this broader transition problem.
## 2. Recommended Technology Stack
## 3. Accounts and Software to Install
GitHub account: create or use the team's repository.
Cursor: install the desktop application from the official Cursor website. During setup, allow Cursor to install/configure Git if prompted.
Git: install Git if Cursor does not provide a working installation. Verify with `git --version` in a terminal.
Node.js: install the current LTS release. Verify with `node -v` and `npm -v`.
Supabase account: create a project for the CareerPath database.
Vercel account: connect it to GitHub for deployment.
Optional: Figma for interface design.
## 4. Initial Folder Structure
careerpath/
├── app/
│   ├── page.tsx
│   ├── assessment/page.tsx
│   ├── results/page.tsx
│   ├── careers/page.tsx
│   ├── careers/[slug]/page.tsx
│   ├── roadmap/page.tsx
│   ├── mentors/page.tsx
│   ├── login/page.tsx
│   └── dashboard/page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── AssessmentForm.tsx
│   ├── CareerCard.tsx
│   ├── MatchScore.tsx
│   ├── CareerProfile.tsx
│   └── MentorCard.tsx
├── lib/
│   ├── supabase.ts
│   ├── recommendation.ts
│   ├── types.ts
│   └── utils.ts
├── data/
│   └── seed-careers.ts
├── public/
├── supabase/
│   └── migrations/
├── .env.local
├── .env.example
├── .gitignore
├── README.md
├── package.json
└── tsconfig.json
## 5. Database Framework
Use Supabase/PostgreSQL. Keep country-specific information separate from the shared career concept.
profiles: id, name, country, education_level, created_at
countries: id, name, code
careers: id, name, slug, description, category, skills, work_style
career_country_info: career_id, country_id, subjects, qualifications, pathway, notes
institutions: id, country_id, name, type, website
programmes: id, institution_id, career_id, name, entry_requirements
assessment_questions: id, question, category, options, active
assessment_results: id, user_id, answers, created_at
career_matches: id, result_id, career_id, score, explanation
mentors: id, name, country_id, profession, expertise, bio, availability, verified
mentor_requests: id, student_id, mentor_id, preferred_date, topic, status, created_at
Important: do not invent admission requirements, professional requirements or university data. Research and verify country-specific information before publishing it.
## 6. Recommendation Engine — MVP
Start with an explainable scoring system rather than a complex machine-learning model. Map assessment answers to career attributes and calculate a match score. Return the top 3–5 careers and an explanation.
Example:
Student signals:
• Mathematics: high
• Physics: high
• Building/repairing: high
• Coding: medium
• Biology: low

Potential result:
Electrical Engineering — Strong Match
Reason: strong interest in mathematics, physics and practical building/technical activities.
Do not present the score as a definitive aptitude test or tell a student that a career is the only choice. Present it as an exploration aid.
## 7. Country Architecture: Ghana + Nigeria
The assessment engine and career concepts are shared. Country-specific education and pathway information is selected using the student's country.
Example:
Electrical Engineering
 ├── Ghana
 │   ├── subjects
 │   ├── institutions/programmes
 │   └── pathway information
 └── Nigeria
     ├── subjects
     ├── institutions/programmes
     └── pathway information
## 8. Master Cursor Prompt
Paste this into a new Cursor project after creating the repository:
You are the lead software engineer for CareerPath, a two-week MVP career-discovery platform for young people in Ghana and Nigeria.

PRODUCT:
CareerPath helps students explore careers based on interests, abilities, hobbies, school subjects and work preferences. It provides career profiles, country-specific education/pathway information, a personalised exploration roadmap and mentor-request functionality.

TECH STACK:
- Next.js with App Router
- React
- TypeScript
- Tailwind CSS
- Supabase/PostgreSQL
- Git/GitHub
- Vercel

CORE USER FLOW:
Landing page → country selection → assessment → career matches → career profile → roadmap → mentor request.

COUNTRY REQUIREMENT:
Support Ghana and Nigeria from the first version. Shared careers and assessment logic should be reusable. Country-specific information must come from country-linked database records.

MVP FEATURES:
1. Responsive landing page.
2. Student registration/login.
3. Ghana/Nigeria selection.
4. 20-question career assessment.
5. Transparent recommendation/scoring engine.
6. Top 3–5 career matches with explanations.
7. Career detail pages.
8. Country-specific pathway information.
9. Personal roadmap.
10. Mentor directory and mentor request form.
11. Basic student dashboard.
12. Basic admin-ready database structure.

ENGINEERING RULES:
- Use TypeScript.
- Keep components modular and reusable.
- Validate all forms.
- Use environment variables for secrets.
- Never hard-code Supabase keys or credentials.
- Do not fabricate career, university or admission information.
- Add clear loading, empty and error states.
- Make the interface mobile responsive.
- Keep the recommendation engine explainable.
- Write a README with setup instructions.
- Make small, testable changes rather than rewriting the entire project.
- Before each major feature, explain the files you will change.
- After implementation, provide commands to test it.
- Do not remove working features without explaining why.

WORKFLOW:
First inspect the repository. Then create a detailed implementation plan. Do not immediately generate every feature. Build in stages:
Stage 1: project setup and UI shell.
Stage 2: Supabase schema and connection.
Stage 3: assessment.
Stage 4: recommendation engine.
Stage 5: career profiles and Ghana/Nigeria data structure.
Stage 6: roadmap.
Stage 7: mentors.
Stage 8: authentication/dashboard.
Stage 9: testing and deployment.

For every stage:
1. State the goal.
2. List files to create/change.
3. Implement.
4. Run checks/tests.
5. Explain what was completed and any remaining issue.
## 9. Prompts to Use After the Master Prompt
### Stage 1 — Setup
Inspect the repository and implement only the project shell, navigation, landing page and placeholder pages. Do not build the database yet. Run the app and fix errors.
### Stage 2 — Supabase
Design and implement the Supabase schema described in the project guide. Create migrations/types where appropriate. Explain how I should add the environment variables. Do not invent seed data.
### Stage 3 — Assessment
Build the assessment UI and data model. Make it mobile friendly. Store answers and validate submissions. Keep questions configurable from the database.
### Stage 4 — Recommendation
Implement an explainable career matching engine. Use weighted attributes and return the top 3–5 matches plus a short explanation for each. Keep scoring logic in lib/recommendation.ts and add tests for it.
### Stage 5 — Career Data
Build reusable career profile pages and country-specific information. Create seed structure for Ghana and Nigeria, but do not fabricate university or admission data.
### Stage 6 — Roadmap
Build a roadmap page that turns a selected career into steps: explore → education/pathway → skills → experience → next actions.
### Stage 7 — Mentors
Build a mentor directory and request form. Add validation, request status and basic database integration. Do not build video calling for the MVP.
### Stage 8 — Auth/Dashboard
Add Supabase authentication and a student dashboard showing profile, assessment result, saved careers and mentor requests.
### Stage 9 — Test/Deploy
Audit the entire application for broken routes, mobile layout problems, security issues, missing environment variables and build errors. Then prepare it for Vercel deployment.
## 10. GitHub Setup and Linking Cursor
Create a new GitHub repository named `careerpath-mvp`.
Open Cursor → Clone Repository (or open the folder after cloning).
Sign in to GitHub in your browser if Cursor asks for authorization.
Clone the repository to your computer.
Open the cloned folder as the Cursor workspace.
After changes, review the Source Control panel, commit with a meaningful message, then push to GitHub.
Use branches for larger features, e.g. `feature/assessment`, `feature/mentors`, `feature/recommendations`.
Useful terminal commands:
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd careerpath-mvp
git status
git add .
git commit -m "Build career assessment"
git push origin main
## 11. Supabase Setup
Create a Supabase project.
Create the database tables/migrations using the schema above.
Obtain the project URL and public/anon key from Supabase project settings.
Create `.env.local` locally and place the values there.
Create `.env.example` containing variable names only, never real secrets.
Add `.env.local` to `.gitignore`.
Ask Cursor to generate typed database helpers if useful.
Example variable names:
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
Never commit `.env.local` or service-role keys to GitHub.
## 12. Moving from Cursor to VS Code
You do not need to migrate the project. Cursor and VS Code both work with the same folder and Git repository.
Commit and push your latest work from Cursor.
Install VS Code.
Clone the same GitHub repository in VS Code, or open the existing project folder.
Install the project's dependencies with `npm install`.
Ensure your local `.env.local` exists; secrets are not stored in GitHub.
Run the development server with `npm run dev`.
Continue coding normally in VS Code.
Your GitHub repository remains the source of truth.
If you want AI assistance in VS Code, install a compatible AI coding extension or use another coding agent. The project itself does not depend on Cursor.
## 13. Two-Week Build Schedule
## 14. Definition of Done for the MVP
A student can open the website on a phone or laptop.
The student can select Ghana or Nigeria.
The student can complete the assessment.
The system returns 3–5 explainable career matches.
The student can open a career profile.
Country-specific information is displayed where verified data exists.
The student can create/view a basic roadmap.
The student can view mentors and submit a mentor request.
User data is stored securely.
The project builds successfully and is deployed.
The GitHub repository contains the source code and README.
Another team member can clone the repository and run it.
## 15. Team Rules for Working with AI
Never paste passwords, API secrets or private keys into Cursor prompts.
Review AI-generated database migrations before applying them.
Commit working versions frequently.
Ask Cursor to explain unfamiliar code instead of blindly accepting it.
Test every major feature immediately after generation.
Keep real career and admission information verified by the team.
Use AI for implementation speed; keep product decisions and factual validation with the team.
Do not add complex features just because the agent can build them. Protect the two-week scope.
## 16. First-Day Checklist
Create GitHub repository.
Install Cursor.
Install Node.js LTS and Git.
Create Supabase project.
Create Vercel account.
Clone repository in Cursor.
Run the starter application locally.
Paste the Master Cursor Prompt.
Approve only Stage 1.
Commit and push the working Stage 1 version.
Then begin Stage 2.
## 17. Reference to the Capstone Problem
The BuildLabs Cohort 2 problem-statement document identifies Youth School-to-Work Transition as a problem involving young people who may have qualifications or skills but struggle to transition into meaningful employment because of gaps including career guidance, professional networks and relevant opportunities. CareerPath is framed as a focused digital intervention within that broader problem space.
Source: BuildLabs Cohort 2 Capstone Problem Statements.
## 18. Important Scope Decision
For the two-week competition/demo, build a polished web MVP rather than a full production platform. Start with 20–30 career profiles and verified Ghana/Nigeria information for those profiles. The architecture should make it possible to add more careers, institutions, mentors and countries later.

## Making GitHub the Home of CareerPath
GitHub should be the central source of truth for the CareerPath project. Cursor, VS Code, or another coding agent should be treated as development tools that work on the code stored in the GitHub repository—not as the permanent home of the application.
Recommended team structure:
GitHub Organization: CareerPath
Repository: careerpath-mvp
Main branch: the official, stable version of the project
Feature branches: separate branches such as feature/assessment, feature/mentors, and feature/career-data
Team members: added as collaborators or organization members according to the team's access needs
Vercel: connected to the GitHub repository for deployment
Supabase: separate project for the CareerPath database and authentication
### Recommended Development Workflow
1. A team member creates or checks out a feature branch from the GitHub repository.
2. The member develops the feature in Cursor or VS Code.
3. The member tests the feature locally.
4. Changes are committed and pushed to GitHub.
5. A Pull Request is opened for review.
6. After review, the feature is merged into main.
7. Vercel can automatically deploy the updated main branch.
### Project Ownership and Continuity
Keeping the source code in GitHub means the project does not depend on a particular coding tool or one person's computer. If the team stops using Cursor, the repository can still be cloned and developed with VS Code, another IDE, or another coding agent.
### What Belongs Where
### Security Rule
Never commit .env.local, Supabase service-role keys, API keys, passwords, or other secrets to GitHub. Use environment variables locally and secure environment-variable settings on deployment platforms.
### Suggested Repository Structure
careerpath-mvp/
├── app/
├── components/
├── lib/
├── data/
├── supabase/
├── public/
├── package.json
├── README.md
└── .gitignore
Recommended principle: GitHub is the project's source of truth; Cursor is a tool for building it; Supabase provides backend/database services; and Vercel can host and deploy the application.

## CURSOR MASTER BUILD SPECIFICATION
Purpose: This section is designed to be given to Cursor as the main build specification for the CareerPath MVP. The goal is to minimize the amount of manual coding and repeated prompting required from the student/team. Cursor should inspect the repository, create the necessary files, implement the features in stages, run checks, and explain only what requires human decisions.
### IMPORTANT: HOW TO USE THIS DOCUMENT IN CURSOR
Open the CareerPath repository in Cursor. Add this document to the project/workspace so Cursor can read it. Then give Cursor the short instruction:
“Read the CareerPath Cursor Master Build Specification in this project and execute it. Start by inspecting the repository, then follow the implementation order in the document. Do not wait for me to rewrite the specification as individual prompts. Ask me only when a decision, credential, verification, or external account action is genuinely required.”
### MASTER INSTRUCTION FOR CURSOR
You are the lead full-stack engineer for CareerPath, a two-week MVP career-discovery platform for young people in Ghana and Nigeria.

PRODUCT PURPOSE
CareerPath helps students explore possible careers based on their interests, abilities, hobbies, school subjects, and work preferences. It should provide explainable career matches, career information, country-specific education/pathway information, a personal exploration roadmap, and access to professional mentors.

TARGET USERS
Primary users are secondary-school students and other young people in Ghana and Nigeria who need better career exploration and guidance.

CORE USER JOURNEY
Landing page → choose Ghana or Nigeria → create account / continue → complete career assessment → receive 3–5 explainable career matches → open a career profile → see country-specific pathway information → create/use a personal roadmap → explore/request a mentor.

TECH STACK
- Next.js with App Router
- React
- TypeScript
- Tailwind CSS
- Supabase for PostgreSQL database and authentication
- GitHub for source control
- Vercel for deployment
- Cursor as the coding/development agent

IMPORTANT PRODUCT PRINCIPLES
1. Build a working MVP, not an over-engineered platform.
2. Mobile-first responsive design.
3. Support Ghana and Nigeria from the first version.
4. Use shared career logic and country-specific education/pathway records.
5. Recommendations must be explainable and must not claim to determine a student's one correct career.
6. Do not fabricate university requirements, admission requirements, fees, professional requirements, salary figures, or other factual claims.
7. Important factual education information must include a source URL, verification status, and verification date.
8. If verified information is unavailable, display that it needs verification instead of inventing it.
9. Keep the code modular and maintainable.
10. Use environment variables for secrets.
11. Do not commit .env.local, service-role keys, passwords, or API keys.
12. Make reasonable implementation decisions without asking unnecessary questions.
13. When a human decision is genuinely required, stop at that point and clearly state exactly what is needed.

MVP FEATURES TO BUILD
1. Professional landing page
2. Ghana/Nigeria country selection
3. Student registration and login
4. 20–25 question career assessment
5. Explainable rule-based recommendation engine
6. Top 3–5 career matches
7. Explanation for each match
8. Career directory
9. Individual career profile pages
10. Country-specific education/pathway information
11. Personal career roadmap
12. Mentor directory
13. Mentor request form
14. Student dashboard
15. Basic admin-ready database structure
16. Loading, error, empty, and success states
17. Responsive mobile and desktop UI
18. README with setup instructions
19. Tests for important recommendation logic and core functionality

CAREER DATA
Start with approximately 20–30 career paths rather than trying to cover every career. Suggested initial careers include:
Medicine, Nursing, Pharmacy, Electrical Engineering, Mechanical Engineering, Civil Engineering, Computer Science, Software Engineering, Data Science, Accounting, Law, Architecture, Agriculture, Environmental Science, Business Administration, Education, Marketing, Economics, Psychology, Public Health, Information Technology, Renewable Energy Engineering, and related major paths where verified information can be provided.

DATABASE
Use Supabase/PostgreSQL. Design the schema so that the following concepts are supported:
- profiles
- countries
- careers
- career_country_info
- institutions
- programmes
- assessment_questions
- assessment_results
- career_matches
- mentors
- mentor_requests
- sources / verification metadata where useful

For important factual records, support fields such as:
source_url
source_title
source_type
verification_status
verified_at
verified_by
next_review_at

VERIFICATION RULE
Verified institution information supplied by the project team is authoritative project data. Store it in the database with its source and verification metadata. Do not silently rewrite, embellish, or replace verified information. Cursor is an implementation tool and is not itself the source of truth.

RECOMMENDATION ENGINE
Implement a transparent weighted scoring system in lib/recommendation.ts or an equivalent dedicated module.

Assessment dimensions may include:
- interests
- school subjects
- preferred activities
- work environment
- problem-solving preference
- people/data/things preference
- creativity
- technology interest
- practical/hands-on preference
- communication preference
- social impact interest

Map answers to career attributes, calculate weighted compatibility, return the top 3–5 matches, and generate a short explanation based on the student's answers.

Do not describe the result as a scientific aptitude test or guarantee career success.

UI
Create a clean, modern, trustworthy interface suitable for students. Use accessible typography, clear navigation, cards, progress indicators, buttons, forms, and responsive layouts. Avoid excessive animations.

PAGES
- /
- /assessment
- /results
- /careers
- /careers/[slug]
- /roadmap
- /mentors
- /login
- /signup
- /dashboard

PROJECT STRUCTURE
Use a sensible structure such as:
app/
components/
lib/
data/
public/
supabase/
tests/
and appropriate configuration files.

IMPLEMENTATION ORDER
Stage 1: Inspect repository and establish Next.js/Tailwind project structure.
Stage 2: Build the global layout, navigation, landing page, country selection, and reusable UI components.
Stage 3: Create Supabase configuration, schema/migrations, types, and secure environment-variable handling.
Stage 4: Implement authentication and profiles.
Stage 5: Implement the assessment and answer persistence.
Stage 6: Implement and test the recommendation engine.
Stage 7: Implement career directory, career profiles, and country-specific information.
Stage 8: Implement the personal roadmap.
Stage 9: Implement mentor directory and mentor requests.
Stage 10: Implement dashboard.
Stage 11: Add validation, error handling, accessibility improvements, tests, and responsive QA.
Stage 12: Prepare README, deployment configuration, and production build.

FOR EACH STAGE
- Inspect existing code first.
- Reuse existing components where appropriate.
- State briefly what you will change.
- Implement the feature.
- Run lint/type checks/tests/build where applicable.
- Fix errors before moving on.
- Do not overwrite working features unnecessarily.
- Keep commits small and descriptive if Git is available.
- At the end of each stage, report what was completed and any human action required.

GITHUB
Treat GitHub as the source of truth for the project. The repository should be usable independently of Cursor. Do not store secrets in the repository.

SUPABASE
Use environment variables such as:
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
Do not invent credentials. If credentials are missing, create the integration structure and clearly tell the human where the values must be added.

VERCEL
Prepare the application for Vercel deployment. Do not claim deployment is complete unless the deployment has actually been performed and verified.

QUALITY CHECK
Before declaring the MVP complete:
- npm install works
- development server starts
- TypeScript checks pass
- linting passes where configured
- production build passes
- assessment can be completed
- results are generated
- at least 3 career matches can be displayed
- career profiles work
- Ghana and Nigeria paths are distinguishable
- roadmap works
- mentor request flow works
- authentication works
- database operations work
- no secrets are committed
- README explains setup
- app works on mobile and desktop

IMPORTANT: Do not stop after generating a plan. Execute the implementation. Do not ask the user to manually type code that you can create yourself. Ask only for information or actions that require the human, such as Supabase credentials, GitHub authentication, verified institution data, or a product decision that cannot safely be inferred.
### HUMAN INPUTS CURSOR MAY NEED
Supabase project URL and public/anon key (entered through environment variables, never committed).
GitHub authentication/permission when Git operations require it.
Verified institution/programme information and its official source URL.
Final project/team branding such as logo, project name changes, or colors if different from the default.
Any BuildLabs-specific submission requirements not contained in this specification.
### DO NOT ASK THE USER TO TYPE THESE MANUALLY
Cursor should create the application files, components, routes, database migrations, TypeScript types, recommendation logic, tests, README sections, and configuration files itself. The user should mainly review the work, provide credentials through secure environment settings, supply verified factual data, and approve important product decisions.
### REALISTIC LIMITATION
This specification can greatly reduce manual prompting, but it cannot safely eliminate all human involvement. Cursor cannot independently create or verify external accounts, decide which institutional facts are true, obtain private credentials, or take responsibility for factual admission information. The team must review generated code, test the application, verify factual content, and approve the final product before submission.

| Layer | Tool | Purpose |
| --- | --- | --- |
| AI development | Cursor | AI-assisted coding, debugging, refactoring and project navigation |
| Frontend | Next.js + React + TypeScript | Responsive web application |
| Styling | Tailwind CSS | Fast, consistent UI |
| Backend/database | Supabase | PostgreSQL database, authentication and backend services |
| Recommendation engine | TypeScript initially | Transparent rules/scoring for the MVP |
| Version control | Git + GitHub | Team collaboration and backup |
| Deployment | Vercel | Hosting the web app |
| Design (optional) | Figma | Wireframes/UI planning |

| Time | Deliverable |
| --- | --- |
| Days 1–2 | Requirements, wireframes, repository, Next.js setup, Supabase project |
| Days 3–4 | Landing page, navigation, authentication foundation |
| Days 5–6 | Assessment UI + database |
| Days 7–8 | Recommendation engine + results |
| Days 9–10 | Career profiles + Ghana/Nigeria country data structure |
| Day 11 | Roadmap |
| Day 12 | Mentor directory/request |
| Day 13 | Testing with students + bug fixing |
| Day 14 | Deployment, demo data, pitch and final QA |

| Component | Home / Service |
| --- | --- |
| Source code | GitHub |
| Database and authentication | Supabase |
| Live website/deployment | Vercel |
| Development environment | Cursor / VS Code / other IDE |
| Domain | Project/business domain registrar |
| Secrets and API keys | Environment variables / platform secret settings, not GitHub |
