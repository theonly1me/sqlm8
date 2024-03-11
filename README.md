## SQLM8

SQLM8 is a web application that allows users to execute SQL queries and visualize the results. Below are the details of the project:

### Deployment

The app is deployed on Vercel at https://sqlm8.vercel.app/
NOTE: Pleas note, I am using free instances @vercel/postgres via a hobby account. The query performance may be slightly degraded depending on various factors (not always the case).

### Walkthrough Video

[Watch the walkthrough video](https://www.loom.com/share/439864795bea41ad9d2141e51794858f?sid=4b7d44d2-5935-40da-bd3e-e385e79a566b) showcasing the implementation details and demonstrating how to execute queries in SQLM8.

### Framework and dependencies

- **Framework**: Next.js 14 (App Router) | React 18
- **Major dependencies**:
  - `@monaco-editor/react` for the SQL query editor
  - `@vercel/postgres` Vercel's wrapper around serverless PostgreSQL instance using Neon
  - `tailwindcss` - for styling
  - `@nextui-org/react` for certain UI components
  - `framer-motion` for animations - requirement for nextui

### Page Load Time

![ligbhthouse benchmarks](./benchmark.png)
![chrome dev tools performance benchmark](./performance.png)

The detailed lighthouse benchmark report can be found here: [benchmark](./benchmarks.html)

### Optimizations

To decrease the load time and increase performance, the following optimizations were implemented:

- **Code Splitting**: Next.js automatically splits the code into smaller chunks, resulting in faster page loads.
- **Lazy Loading**: Components and libraries are lazily loaded to reduce the initial bundle size and improve load times.
- **Minification and Compression**: JavaScript and CSS files are minified and compressed to reduce file sizes and decrease load times.
- **Server-side Rendering (SSR)**: Next.js provides SSR out of the box, improving the perceived performance of the application by rendering pages on the server before sending them to the client. In this case, SSR is primarily used for SQL query execution in the SQLite database.

### Improvements (future scope)

- Add unit & integration tests (I did not have the time to do this)
- Auto suggestions for SQL queries based on tables that are present
- Paginated queries for larger data sets
- Ability to format the SQL code with a button click / keypress

### How to Run

To run the SQLM8 application locally, follow these steps:

1. Clone the repository: `git clone https://github.com/theonly1me/sqlm8.git`
2. Navigate to the project directory: `cd sqlm8`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`
5. Open your browser and visit `http://localhost:3000`

### License

This project is licensed under the MIT License
