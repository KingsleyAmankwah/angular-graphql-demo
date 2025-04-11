# How to Configure GraphQL in Angular: For Public and Private APIs

[![Article on Dev.to](https://img.shields.io/badge/Read%20Article-Dev.to-black)](https://dev.to/your-username/your-article-slug)

This demo showcases GraphQL implementation in Angular with both public and authenticated API endpoints:

- Public API: Countries data (no token required)
- Private API: GitHub user data (requires personal access token)

## 🚀 Quick Start

1. Clone the repository:

   ```bash
   git clone https://github.com/KingsleyAmankwah/angular-graphql-demo.git
   cd angular-graphql-demo
   ```

2. Install dependencies

   ```bash
       npm or yarn install
   ```

3. Configure the environment:

   ```bash
    src/environments/environment-dev.ts
   ```

4. Environment Variables

   ```
    export const environment = {
   // Public API endpoint (no auth)
   GRAPHQL_URI_NO_TOKEN: 'https://countries.trevorblades.com/',

    // Private API endpoint (requires token)
    GRAPHQL_URI_WITH_TOKEN: 'https://api.github.com/graphql',

    // Base URI for auth redirects
    BASE_URI: 'http://localhost:4200'

    };

   ```

## 🔄 Switching Between APIs

1.  **To use Public API (Countries):**

    - Use `graphql-provider-public-api.config.ts` import
    - Access `/countries` route

2.  **To use Private API (GitHub):**
    - Use `graphql-provider-private-api.config.ts` import
    - Login to profile page with GitHub token on the login page
    - Access `/profile` route

## 📚 Learn More

For detailed implementation explanations, read the companion article:

[How to Configure GraphQL in Angular: For Public And Private APIs](https://dev.to/your-username/your-article-slug)
