const investigateComponent = {
    init() {
        // popup shiz
        const popup = document.getElementById("search-instructions-container");
        const closeBtn = document.getElementById(
            "close-search-instructions-btn"
        );
        closeBtn.addEventListener("click", () => {
            popup.style.setProperty("transform", "translateY(500px)");
        });

        // hide popup div on btn press
        const scanPopup = document.getElementById("scan-popup");
        const scanPopupCloseBtn = document.getElementById(
            "close-scan-popup-btn"
        );
        scanPopupCloseBtn.addEventListener("click", () => {
            scanPopup.style.opacity = 0;
            setTimeout(() => {
                scanPopup.style.display = "none";
            }, 500);
        });
        const containedPopup = document.getElementById("contained-popup");
        const containedPopupCloseBtn = document.getElementById(
            "close-contained-popup-btn"
        );
        containedPopupCloseBtn.addEventListener("click", () => {
            containedPopup.style.opacity = 0;
            setTimeout(() => {
                containedPopup.style.display = "none";
            }, 500);
        });
        const killedPopup = document.getElementById("killed-popup");
        const killedPopupCloseBtn = document.getElementById("home-killed-btn");
        killedPopupCloseBtn.addEventListener("click", () => {
            killedPopup.style.opacity = 0;
            setTimeout(() => {
                killedPopup.style.display = "none";
            }, 500);
        });
        const successPopup = document.getElementById("success-popup");
        const successPopupCloseBtn =
            document.getElementById("home-success-btn");
        successPopupCloseBtn.addEventListener("click", () => {
            successPopup.style.opacity = 0;
            setTimeout(() => {
                successPopup.style.display = "none";
            }, 500);
        });

        // handle gear swapping
        const scanGear = document.getElementById("scan-gear");
        const mirrorGear = document.getElementById("mirror-gear");
        const tranqGear = document.getElementById("tranq-gear");
        const gunGear = document.getElementById("gun-gear");
        const operativeGear = [scanGear, mirrorGear, tranqGear, gunGear];
        // default gear
        let activeGear = "scan";

        const setActiveGear = (selectedGear, selectedElement) => {
            // remove active-gear class from all operativeGear
            operativeGear.forEach((gear) =>
                gear.classList.remove("active-gear")
            );

            // add active-gear class to selected gear
            selectedElement.classList.add("active-gear");
            activeGear = selectedGear;
        };

        // add click logic
        scanGear.addEventListener("click", () =>
            setActiveGear("scan", scanGear)
        );
        mirrorGear.addEventListener("click", () =>
            setActiveGear("mirror", mirrorGear)
        );
        tranqGear.addEventListener("click", () =>
            setActiveGear("tranq", tranqGear)
        );
        gunGear.addEventListener("click", () => setActiveGear("gun", gunGear));
    },
};

export { investigateComponent };
