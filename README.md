<div align="center">
  <img src="https://www.oronium.com/img/logo.svg" alt="Project Logo">
</div>

<div align="center">
  <img src="https://img.icons8.com/plasticine/24/000000/react.png" alt="React">
  <img src="https://img.icons8.com/color/24/000000/next.png" alt="Next.js">
  <img src="https://img.icons8.com/color/24/000000/javascript.png" alt="JavaScript">
  <img src="https://img.icons8.com/color/24/000000/html.png" alt="HTML">
  <img src="https://img.icons8.com/color/24/000000/css.png" alt="CSS">
</div>

# Oronium Next.js Starter template

Please read this: https://probable-joggers-7e7.notion.site/Next-Js-Best-Practices-Oronium-202de579a8a845b380abeef6e35bd481?pvs=4

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Atomic Design Pattern

- src
  - components
    - atoms
      - Button.js
      - Input.js
    - molecules
      - LoginForm.js
    - organisms
      - Navigation.js
      - Footer.js
    - templates
      - DashboardTemplate.js
      - AuthTemplate.js
    - pages
      - Home.js
      - Dashboard.js
  - containers
    - HomeContainer.js
  - utils
    - api.js
  - services
    - userService.js
  - App.js
  - index.js

Explanation:

- The `components` folder contains reusable components categorized under `Common` (generic components) and `Home` (components specific to the Home feature).
- The `containers` folder holds container components that connect to the Redux store or manage state.
- The `atoms` folder consists of basic UI building blocks like buttons and inputs.
- `molecules` combine atoms to form more complex components, such as a login form.
- `organisms` represent higher-level components that combine molecules and atoms to create self-contained components like navigation bars and footers.
- `templates` provide a layout structure for specific pages or sections.
- `pages` contain components that represent individual pages in the application.
- The `utils` folder houses utility functions and helper modules.
- The `services` folder contains modules responsible for APIs, network requests, or other external service integrations.
- The `App.js` and `index.js` files serve as the entry point of the application.
- **Naming Conventions**
  - A component name should always be in a Pascal case like ‘SelectButton’, ’Dashboard’
  - Methods/functions defined inside components should be in Camel case like ‘getApplicationData()’, ‘showText()’ etc.
