# Real Estate Site

A modern, full-featured real estate platform built with React, TypeScript, and Vite. This project allows users to search, buy, rent, and list properties with advanced filters, voice search, and a beautiful UI inspired by leading real estate websites.

## Features
- Hero section with cityscape background and animated overlays
- Advanced search bar with city, property type, and voice input (Web Speech API)
- Functional search in both hero and navbar
- Property listings fetched from a real estate API
- Featured and recent properties on the landing page
- Responsive design for desktop and mobile
- Pages for Buy, Rent, Projects, PG/Hostels, Plot & Land, Commercial, Agents, and more
- Favorites system and user authentication
- Modern UI components using Tailwind CSS

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/BYAIVAB/RealEstate_Site.git
   cd RealEstate_Site/home-finder-hub
   ```
2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```
3. Configure your real estate API endpoint in `src/lib/realEstateApi.ts`.

### Running Locally
```
npm run dev
# or
yarn dev
```
Visit [http://localhost:8080](http://localhost:8080) in your browser.

## Deployment
You can deploy this project to Vercel, Netlify, or any static hosting platform. Connect your GitHub repository and follow the platform’s instructions.

## Folder Structure
- `src/components/` — UI components
- `src/pages/` — Page components
- `src/lib/` — API integration and utilities
- `src/data/` — Mock data (for development)
- `public/` — Static assets

## Customization
- Update the API endpoint and authentication in `src/lib/realEstateApi.ts`.
- Add or modify pages and components as needed.
- Style with Tailwind CSS and custom classes.

## License
MIT

---
Feel free to contribute or open issues for improvements!

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
