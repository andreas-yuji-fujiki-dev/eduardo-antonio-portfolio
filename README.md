# Portfolio Management API

A **portfolio management API** designed to centralize projects, stacks, images, and categories, providing structured data for both the administrative panel and the public portfolio website.

- 🐳 [How to run the project (Docker)](./docker/README.md)
- 📘 [Backend documentation](./api/README.md)

- 🧱 [Architecture Overview](#architecture-overview)
- 🤝 [Partners Credits](#credits)
- 📞 [Contact ways in case of troubles](#contact)

---

## Architecture Overview

The project architecture is composed of **three main layers**, clearly separated to ensure scalability, maintainability, and a well-defined domain.

---

### API

This layer is responsible for **business rules**, **data persistence**, and **application security**.

It manages:
- Projects and their details  
- Images associated with projects  
- Technology stacks  
- Stack-related images  
- Categories applicable to projects, images, and stacks  

The API ensures consistency between entities and exposes structured data to be consumed by both the admin panel and the public portfolio.

---

### Admin Panel

This layer is responsible for the **complete management of portfolio content**.

#### Project CRUD
- Association of demonstration images  
- Association of stacks used in the project  
- Assignment of categories to projects  

Example categories:
- Study Project  
- Freelance Project  
- Professional Project  

These categories allow proper organization, filtering, and presentation of projects on the public website.

---

#### Image CRUD
- Assignment of categories to images  

Example categories:
- Project demonstration image  
- Stack logo  

This enables image reuse and efficient filtering based on context.

---

#### Stack CRUD
- Assignment of a category to each stack  
- Definition of experience level  
- Association of a representative image (logo)  

This allows stacks to be presented clearly, consistently, and aligned with the developer’s level of expertise.

---

### Portfolio (Public Website)

- Consumes the API to publicly display portfolio data  

---

## Technology Stack

### Backend
- TypeScript  
- Express  
- SQLite  
- Prisma ORM  
- Jest  

### Frontend
- TypeScript  
- Tailwind CSS  
- React  
- Next.js  

---

## Collaboration Workflow

How we use **Git**, **GitHub**, a **Kanban board**, and **Scrum practices** together.

1. Create a **branch** from `main`  
2. Implement the task within your branch  
3. Open a **Pull Request** to `main`  
4. Request a review  
5. If the review fails, the task returns to *Doing* with feedback  
6. If approved, the task is marked as **Done** ✅  

---

## Credits

### **Andreas Yuji Fujiki — Fullstack Engineer**
🔗 https://github.com/andreas-yuji-fujiki-dev  

- Project ideation and technical leadership  
- Overall architecture definition (API, Admin Panel, Portfolio)  
- Database modeling and structure  
- Business rule implementation and security principles  
- Creation and review of unit tests with Jest  
- Docker environment integration and standardization  
- Technical direction, task delegation, and code review  
- Quality assurance, stability, and delivery ownership  

---

### **Eduardo Antonio — Backend Engineer**
🔗 https://github.com/ClancyDeveloper  

- Deep refactoring of API middlewares and controllers  
- Backend type implementation and standardization  
- Full responsibility for API documentation using Swagger  
- Strong contribution to unit tests and route behavior testing  
- Essential support for production-oriented Docker infrastructure  

---

### **Gabrielly Vitória — Frontend Engineer**
🔗 https://github.com/gabriellyv-gb-dev  

- Admin panel integration with a complex business-rule-driven API  
- Structural refactoring of the admin panel frontend  
- Consistent application of TypeScript best practices  
- Development of reusable, scalable, and well-structured components  
- Responsive layouts with a strong focus on user experience  

---

## Contact

For questions or issues:

- **Discord:** sun.dev_  
- **WhatsApp:** +55 11 99235-1116  
- **Email:** andreaspinheirocontato@gmail.com  

---

Good luck,  
grab a coffee ☕  
turn off the lights 🌑  
open your terminal 💻  
put on your best black hoodie 🖤  
and **start hacking!**
