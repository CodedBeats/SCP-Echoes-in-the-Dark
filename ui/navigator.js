import { themeMusicComponent } from "../sfx/background/themeMusic";
import { foundationNarationComponent } from "../sfx/background/foundationNaration";

const navigatorComponent = {
    init() {
        // init audio
        themeMusicComponent.init();
        foundationNarationComponent.init();
        themeMusicComponent.play(); // start music on app load

        // splash screen fanciness (and lying lol)
        const splashScreen = document.getElementById("splash-screen");
        setTimeout(() => {
            splashScreen.classList.add("fadeOut");
            setTimeout(() => {
                splashScreen.style.display = "none";
            }, 1000); // wait for splash fade out
        }, 3000);

        // ref for each pages
        const pages = {
            homePage: document.getElementById("home-page"),
            investigatePage: document.getElementById("investigate-page"),
        };
        // ref for each btn
        const buttons = {
            "home-nav-btn": "homePage",
            "home-killed-btn": "homePage",
            "home-success-btn": "homePage",
            "investigate-nav-btn": "investigatePage",
            "investigate-btn": "investigatePage",
        };

        // handle page navigation
        function navigateTo(pageId) {
            Object.keys(pages).forEach((key) => {
                pages[key].style.display = key === pageId ? "block" : "none";
            });

            // control music for active page
            if (pageId === "investigatePage") {
                themeMusicComponent.stop();
                foundationNarationComponent.play();
            } else {
                themeMusicComponent.play();
                foundationNarationComponent.stop();
            }
        }

        // dynamic event listeners
        Object.entries(buttons).forEach(([buttonId, pageId]) => {
            document
                .getElementById(buttonId)
                .addEventListener("click", () => navigateTo(pageId));
        });
    },
};

export { navigatorComponent };
