const translations = {

    en: {

        subtitle: "Frontend Developer | Angular | TypeScript",

        aboutTitle: "About Me",

        aboutText:
            "Frontend developer with experience building web applications using Angular, TypeScript and modern JavaScript. I currently work developing enterprise applications where I implement user interfaces and integrate them with backend services through REST APIs. I enjoy creating clean, maintainable code and designing reusable components that help scale large applications.",

        projectsTitle: "Projects",

        project1Title: "E-Commerce Challenge",

        project1Desc:
            "Fullstack e-commerce developed in 7 days during the tryCatch challenge. The project includes product catalog visualization, shopping cart functionality and CRUD operations for products and users. Backend built with Go (Gin framework) and PostgreSQL.",

        project2Title: "Bike Store",

        project2Desc:
            "Fullstack web application for a bicycle store including authentication, product catalog, shopping cart and checkout simulation. Built with React for the frontend and Node.js with PostgreSQL on the backend.",

        project3Title: "SGMI Maintenance System",

        project3Desc:
            "Industrial maintenance management platform designed to track machinery components, maintenance processes and technical records. Built using React, Electron and Node.js with PostgreSQL.",

        skillsTitle: "Technologies",

        viewProjects: "View Projects",

        downloadCV: "Download CV"

    },

    es: {

        subtitle: "Desarrollador Frontend | Angular | TypeScript",

        aboutTitle: "Sobre mí",

        aboutText:
            "Desarrollador frontend con experiencia construyendo aplicaciones web utilizando Angular, TypeScript y JavaScript moderno. Actualmente trabajo desarrollando aplicaciones empresariales donde implemento interfaces de usuario e integro servicios backend mediante APIs REST. Me gusta escribir código limpio, crear componentes reutilizables y diseñar aplicaciones escalables.",

        projectsTitle: "Proyectos",

        project1Title: "Reto E-Commerce",

        project1Desc:
            "E-commerce fullstack desarrollado en 7 días durante el reto tryCatch. El proyecto incluye catálogo de productos, carrito de compras y operaciones CRUD para productos y usuarios. Backend desarrollado en Go (framework Gin) y PostgreSQL.",

        project2Title: "Bike Store",

        project2Desc:
            "Aplicación web fullstack para una tienda de bicicletas con autenticación, catálogo de productos, carrito de compras y simulación de compra. Desarrollada con React en el frontend y Node.js con PostgreSQL en el backend.",

        project3Title: "SGMI - Sistema de Mantenimiento Industrial",

        project3Desc:
            "Plataforma de gestión de mantenimiento industrial diseñada para registrar maquinaria, componentes y procesos de mantenimiento. Construida con React, Electron y Node.js utilizando PostgreSQL.",

        skillsTitle: "Tecnologías",

        viewProjects: "Ver Proyectos",

        downloadCV: "Descargar CV"

    }

}

function setLanguage(lang) {
    document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.getAttribute("data-i18n")
        if (translations[lang][key]) {
            element.innerText = translations[lang][key]
        }
    })

    document.documentElement.lang = lang

}

const userLang = navigator.language.startsWith("es") ? "es" : "en"
setLanguage(userLang)