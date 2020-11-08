jQuery(($) => {

    i18next
    .use(window.i18nextBrowserLanguageDetector)
    .init({
        fallbackLng: 'en',
        resources: {
          en: {
            translation: {
              "welcome": "Welcome to my website",
              "profession": "Technical consultant & programmer",
              "personal-description": `
                Technology Enthusiast with more than 6 years helping
                to create and implement software products as a developer,
                consultant and technology advisor.
              `,
              "work-title":"With my knowledge, I help:",
              "business-work-title" : "Businesses",
              "business-work-description" : `
                Boost business in a sustained way over time, with software
                focused on generating ongoing profits and reducing costs
              `,
              "entrepreneur-work-title":"Entrepreneur",
              "entrepreneur-work-description":`
                Make new business ideas a reality, using cost-effective technologies
                and software as a vehicle to reach success
              `,
              "people-work-title":"People",
              "people-work-description": `
                Allow a satisfying and fulfilling life with people-focused software.
              `,
              "contact-title": "Let's work together!",
              "contact-description" : "Get in touch with me and let's explore how far we can go together:",
              "email-label" : "Email:",
              "copyright-icon": "Icons Designed by Freepik and Google",
              "copyright-own":"©2020 Fernando Sánchez, all right reserved"
            }
          },
          es: {
              translation: {
                "welcome" : "Bienvenido a mi sitio web",
                "profession": "Consultor técnico y programador",
                "personal-description": `
                    Profesional de tecnología con mas de 6 años ayudando a crear e implementar
                    productos de software como programador, consultor y asesor de tecnología. 
                `,
                "work-title":"Con mi conocimiento, ayudo a:",
                "business-work-title" : "Empresas",
                "business-work-description" : `
                    Impulsar el negocio de forma sostenida en el tiempo, 
                    con software enfocado en generar ganancias recurrentes
                    y reducir costos
                `,
                "entrepreneur-work-title":"Emprendedores",
                "entrepreneur-work-description":`
                    Hacer realidad nuevas ideas de negocio, utilizando tecnologías y software
                    costos-efectivos como vehiculo para alcanzar el éxito 
                `,
                "people-work-title":"Personas",
                "people-work-description": `
                  Permitir una vida más satisfactoria y plena con software enfocado en las personas.
                `,
                "contact-title": "¡Trabajemos juntos!",
                "contact-description" : "Contactame por las siguientes vias y exploremos que tan lejos podemos llegar juntos:",
                "email-label" : "Correo:",
                "copyright-icon": "Iconos diseñados por Freepik y Google",
                "copyright-own":"©2020 Fernando Sánchez, todos los derechos reservados"
                }
          }
        }
      }, function(err, t) {
        // for options see
        // https://github.com/i18next/jquery-i18next#initialize-the-plugin
        jqueryI18next.init(i18next, $);

        // start localizing, details:
        // https://github.com/i18next/jquery-i18next#usage-of-selector-function
        renderTranslation();
      });

      //Listener de banderas de idioma
      $('#spanish-flag').on('click', () => changeLocale('es'));
      $('#us-flag').on('click', () => changeLocale('en'));

      //Permite cambiar el idioma de la interfaz,
      //Es importante que el las traducciones y el 
      //idioma esté configurado previamente
      function changeLocale(locale){
        i18next.changeLanguage(locale);
        renderTranslation();
      }

      function renderTranslation(){
        $('header').localize();
        $('.about').localize();
        $('.contact').localize();
      }
});