const operativeGear = {
    init() {
        //
    },
    showScanPopup(title, content) {
        // get scan popup div
        const scanPopup = document.getElementById("scan-popup");
        const scanPopupTitle = document.getElementById("scan-popup-title");
        const scanPopupContent = document.getElementById("scan-popup-content");

        // update the popup with the passed information
        scanPopupTitle.innerHTML = title;
        scanPopupContent.innerHTML = content;

        // show popup
        scanPopup.style.display = "flex";
        scanPopup.style.opacity = 1;
    },
    showContainedPopup(scpID, gear) {
        // get contained popup div
        const containedPopup = document.getElementById("contained-popup");
        const containedPopupContent = document.getElementById(
            "contained-popup-content"
        );

        // update the popup with the passed information
        containedPopupContent.innerHTML = `
        You have successfully used ${gear} to contain ${scpID}. The anomaly is now secured. 
        <br /><br />
        Well done, Agent! 
        Continue your mission with caution.
      `;

        // show popup
        containedPopup.style.display = "flex";
        containedPopup.style.opacity = 1;
    },
    showKilledPopup(scpID, gear) {
        // get killed popup div
        const killedPopup = document.getElementById("killed-popup");
        const killedPopupContent = document.getElementById(
            "killed-popup-content"
        );

        // update the popup with the passed information
        killedPopupContent.innerHTML = `
        ${gear} was noneffective and ${scpID} has overpowered you. It was a swift and brutal end.
        <br /><br />
        Remember, you can scan the scp anomolies to learn how to contain them. 
        <br />
        Stay vigilant for the next mission.
      `;

        // show popup
        killedPopup.style.display = "flex";
        killedPopup.style.opacity = 1;
    },
    showSuccessPopup() {
        // get killed popup div
        const successPopup = document.getElementById("success-popup");

        // show popup
        successPopup.style.display = "flex";
        successPopup.style.opacity = 1;
    },
};

export { operativeGear };
