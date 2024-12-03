import { operativeGear } from "../ui/investigate/operativeGear";

// list of scp model asset IDs
const scpObjs = [
    {
        id: "scp-049",
        scale: 6,
        idleAnimation: "049 Idle 2",
        containAnimation: "049 Idle 2",
        killAnimation: "o49 Walking",
        spawnSound: require("../assets/sfx/scps/scp_049_spawnSound.mp3"),
        containSound: require("../assets/sfx/scps/scp_049_containSound.mp3"),
        killSound: require("../assets/sfx/scps/scp_049_killSound.mp3"),
        info: `
      SCP-049, also known as the Plague Doctor, resembles a medieval physician and believes it 
      cures a "pestilence."
      <br /><br />
      It knows how to handle any concoction but has a very frail body. 
    `,
        weakTo: "gun",
    },
    {
        id: "scp-096",
        scale: 6,
        idleAnimation: "Idle",
        containAnimation: "Dying",
        killAnimation: "Sprint",
        spawnSound: require("../assets/sfx/scps/scp_096_spawnSound.mp3"),
        containSound: require("../assets/sfx/scps/scp_096_containSound.mp3"),
        killSound: require("../assets/sfx/scps/scp_096_killSound.mp3"),
        info: `
      SCP-096, referred to as the Shy Guy, is a humanoid entity that becomes enraged when its face 
      is viewed. It moves with deadly speed and extreme aggression, making it highly dangerous.
      <br /><br />
      Shy Guy is scared of his own face.
    `,
        weakTo: "mirror",
    },
    {
        id: "scp-173",
        scale: 35,
        spawnSound: require("../assets/sfx/scps/scp_173_spawnSound.mp3"),
        containSound: require("../assets/sfx/scps/scp_173_containSound.mp3"),
        killSound: require("../assets/sfx/scps/scp_173_killSound.mp3"),
        info: `
      SCP-173, known as the Sculpture, is a motionless entity when observed. 
      It moves instantaneously when unobserved, snapping the necks of its victims. 
      Always keep it in sight.
    `,
        weakTo: "mirror",
    },
    {
        id: "scp-3199",
        scale: 6,
        idleAnimation: "3199_Idle",
        containAnimation: "3199_Die",
        killAnimation: "3199_Attack",
        spawnSound: require("../assets/sfx/scps/scp_3199_spawnSound.mp3"),
        containSound: require("../assets/sfx/scps/scp_3199_containSound.mp3"),
        killSound: require("../assets/sfx/scps/scp_3199_killSound.mp3"),
        info: `
      SCP-3199, or the Humanoid Eggs, is a grotesque creature that reproduces rapidly and shows 
      aggressive behavior. Its strength and speed make it a severe threat.
      <br /><br />
      Although aggressive, it has a very soft and weak body.
    `,
        weakTo: "gun",
    },
    {
        id: "scp-939",
        scale: 6,
        idleAnimation: "939_Rig|939_Idle",
        containAnimation: "939_Rig|939_Die",
        killAnimation: "939_Rig|939_Attack1",
        spawnSound: require("../assets/sfx/scps/scp_939_spawnSound.mp3"),
        containSound: require("../assets/sfx/scps/scp_939_containSound.mp3"),
        killSound: require("../assets/sfx/scps/scp_939_killSound.mp3"),
        info: `
      SCP-939, also known as "With Many Voices", is a blind, carnivorous predator that mimics human 
      speech to lure prey.
      <br /><br />
      It's outer-body is impervious however it's immune system is similar to that of a human.
    `,
        weakTo: "tranq",
    },
];

const spawnSCPsComponent = {
    // track current SCP to spawn
    scpIndx: 0,
    allSpawned: false,

    init() {
        // get shiz
        const cameraEl = document.getElementById("camera");

        // calc pos behind camera
        const getSpawnPosition = () => {
            const cameraPosition = cameraEl.object3D.position;
            const cameraDirection = new THREE.Vector3();
            cameraEl.object3D.getWorldDirection(cameraDirection);

            // move distance behind the camera
            const distance = -15;
            return {
                x: cameraPosition.x + cameraDirection.x * distance,
                y: 0,
                z: cameraPosition.z + cameraDirection.z * distance,
            };
        };

        // reset investigate scene
        const reset = () => {
            // tracking vars
            this.scpIndx = 0;
            this.allSpawned = false;

            // get all a-entity from scene
            const scene = document.querySelector("a-scene");
            const entities = scene.querySelectorAll("a-entity");

            // remove all a-entity from scene
            entities.forEach((entity) => {
                if (entity.parentNode) {
                    entity.parentNode.removeChild(entity);
                }
            });

            // start spawning again after reset
            setTimeout(() => this.startSpawning(), 2000);
        };

        // spawn scp
        const spawnSCP = () => {
            if (this.allSpawned) {
                operativeGear.showSuccessPopup();
                reset();
                return;
            }

            const scp = scpObjs[this.scpIndx];
            const spawnPos = getSpawnPosition();
            const spawnRotation = Math.floor(Math.random() * 360) + 1;

            // create new entity
            const newSCP = document.createElement("a-entity");

            // visibility false to be loaded in
            newSCP.setAttribute("visible", "false");

            // spawn pos behind camera
            newSCP.setAttribute(
                "position",
                `${spawnPos.x} ${spawnPos.y} ${spawnPos.z}`
            );

            // rotate to look at camera
            newSCP.setAttribute("rotation", `0 ${spawnRotation} 0`);

            // extra
            newSCP.setAttribute("shadow", { receive: false });
            newSCP.setAttribute(
                "scale",
                `${scp.scale} ${scp.scale} ${scp.scale}`
            );
            newSCP.setAttribute("class", "cantap");

            // assign model to new entity
            newSCP.setAttribute("gltf-model", `#${scp.id}`);

            // set idle animation on SCPs that have it
            if (scp.idleAnimation) {
                newSCP.setAttribute("animation-mixer", {
                    clip: scp.idleAnimation,
                    loop: "repeat",
                });
            }

            // sound on spawn
            if (scp.spawnSound) {
                const spawnSound = document.createElement("a-sound");
                spawnSound.setAttribute("src", scp.spawnSound);
                spawnSound.setAttribute(
                    "position",
                    `${spawnPos.x} ${spawnPos.y} ${spawnPos.z}`
                );
                spawnSound.setAttribute("autoplay", "true");
                spawnSound.setAttribute("loop", "false");
                spawnSound.setAttribute("volume", "4");
                // spatial audio model
                spawnSound.setAttribute("distanceModel", "linear");
                // max distance for sound
                spawnSound.setAttribute("maxDistance", "20");
                // how volume decreases with distance
                spawnSound.setAttribute("rolloffFactor", "4");
                this.el.sceneEl.appendChild(spawnSound);

                // remove sound element when finished
                spawnSound.addEventListener("sound-ended", () => {
                    spawnSound.parentNode.removeChild(spawnSound);
                });
            }

            // add data for the scan popup
            newSCP.setAttribute("data-title", scp.id);
            newSCP.setAttribute("data-content", scp.info);

            // add new entity to the scene
            this.el.sceneEl.appendChild(newSCP);

            // next SCP in list
            this.scpIndx++;
            if (this.scpIndx >= scpObjs.length) {
                this.allSpawned = true;
            }

            const removeEntity = (entity) => {
                if (entity.parentNode) {
                    entity.parentNode.removeChild(entity);
                }
            };

            // refined from lots of non - DRY code
            const handleContainment = (scpObj, scpElement) => {
                // play containment sound
                if (scpObj.containSound) {
                    const containSound = document.createElement("a-sound");
                    containSound.setAttribute("src", scpObj.containSound);
                    containSound.setAttribute("autoplay", "true");
                    containSound.setAttribute("loop", "false");
                    containSound.setAttribute("volume", "4");
                    // spatial audio model
                    containSound.setAttribute("distanceModel", "linear");
                    // max distance for sound
                    containSound.setAttribute("maxDistance", "20");
                    // how volume decreases with distance
                    containSound.setAttribute("rolloffFactor", "4");
                    containSound.setAttribute(
                        "position",
                        scpElement.getAttribute("position")
                    );
                    scpElement.appendChild(containSound);
                }

                // play containment animation
                if (scpObj.containAnimation) {
                    scpElement.setAttribute("animation-mixer", {
                        clip: scpObj.containAnimation,
                        loop: "once",
                    });

                    // remove entity elem after animation
                    scpElement.addEventListener("animation-finished", () => {
                        removeEntity(scpElement);
                        setTimeout(() => spawnSCP(), 3000); // spawn next SCP after 3 seconds
                    });
                } else {
                    // no animation -> remove immediately
                    removeEntity(scpElement);
                    setTimeout(() => spawnSCP(), 3000); // spawn next SCP after 3 seconds
                }
            };

            // handle scp attack and kill user
            const handleKilled = (scpObj, scpElement) => {
                // play kill sound
                if (scpObj.containSound) {
                    const killSound = document.createElement("a-sound");
                    killSound.setAttribute("src", scpObj.killSound);
                    killSound.setAttribute("autoplay", "true");
                    killSound.setAttribute("loop", "false");
                    killSound.setAttribute("volume", "4");
                    // spatial audio model
                    killSound.setAttribute("distanceModel", "linear");
                    // max distance for sound
                    killSound.setAttribute("maxDistance", "20");
                    // how volume decreases with distance
                    killSound.setAttribute("rolloffFactor", "4");
                    killSound.setAttribute(
                        "position",
                        scpElement.getAttribute("position")
                    );
                    scpElement.appendChild(killSound);

                    // wait for sound to finish and then reset investigate scene
                    killSound.addEventListener("sound-ended", () => {
                        reset();
                    });
                }

                // play kill animation
                if (scpObj.containAnimation) {
                    scpElement.setAttribute("animation-mixer", {
                        clip: scpObj.killAnimation,
                        loop: "once",
                    });
                }
            };

            // handle gear use
            newSCP.addEventListener("click", (e) => {
                // get active gear ID
                const activeGear = document.querySelector(".active-gear").id;

                // scan
                if (activeGear === "scan-gear") {
                    const clickedElement = e.target;
                    if (
                        clickedElement &&
                        clickedElement.hasAttribute("data-title")
                    ) {
                        // get data from entity
                        const title = clickedElement.getAttribute("data-title");
                        const content =
                            clickedElement.getAttribute("data-content");

                        // use scan gear component function to show popup
                        operativeGear.showScanPopup(title, content);
                    }
                }
                // contain or die to SCP
                else if (activeGear.endsWith("-gear")) {
                    // get gear type
                    const gearType = activeGear.replace("-gear", "");
                    if (scp.weakTo === gearType) {
                        operativeGear.showContainedPopup(scp.id, scp.weakTo);
                        handleContainment(scp, newSCP);
                    } else {
                        setTimeout(() => {
                            operativeGear.showKilledPopup(scp.id, gearType);
                        }, scp.killAnimation.length * 200);
                        handleKilled(scp, newSCP);
                    }
                }
            });

            // visible once loaded
            newSCP.addEventListener("model-loaded", () => {
                newSCP.setAttribute("visible", "true");
                console.log(
                    `${scp.id}`,
                    "\n",
                    `x: ${spawnPos.x}_____z: ${spawnPos.z}`,
                    "\n",
                    `rotation: ${spawnRotation}`,
                    "\n",
                    `scale: ${scp.scale}`,
                    "\n"
                    // `sound: ${scp.spawnSound}`
                );
            });
        };

        // start spawning SCPs on init
        this.startSpawning = () => {
            spawnSCP();
        };

        this.startSpawning();
    },
};

export { spawnSCPsComponent };
