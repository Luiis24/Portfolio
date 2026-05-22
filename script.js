const translations = {

    en: {

        subtitle: "Full Stack Developer | Angular | Java | Spring Boot",

        aboutTitle: "About Me",

        aboutText:
            "Full Stack Web Developer with over 2 years of experience in production environments, building and maintaining enterprise-grade web applications. My core expertise lies in designing scalable frontend architectures with Angular and building robust, secure backend services with Java and Spring Boot. I am deeply committed to writing Clean Code, applying SOLID principles, and collaborating under Agile methodologies to deliver high-quality software.",

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

        subtitle: "Desarrollador Full Stack | Angular | Java | Spring Boot",

        aboutTitle: "Sobre mí",

        aboutText:
            "Desarrollador Web Full Stack con más de 2 años de experiencia en entornos de producción, construyendo y manteniendo aplicaciones web empresariales. Mi especialidad se centra en el diseño de arquitecturas frontend escalables con Angular y el desarrollo de servicios backend robustos con Java y Spring Boot. Estoy altamente comprometido con la escritura de Código Limpio (Clean Code), la aplicación de principios SOLID y el trabajo bajo metodologías ágiles para asegurar software de alta calidad.",

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
