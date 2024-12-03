let themeMusic = null; // init

const themeMusicComponent = {
    // fades
    fadeInDuration: 2000,
    fadeOutDuration: 1000,

    init() {
        if (!themeMusic) {
            // Only initialize once
            themeMusic = new window.Howl({
                src: [
                    require("../../assets/sfx/background/Whispers_in_the_Abyss.mp3"),
                ],
                autoplay: false,
                loop: true,
                volume: 0, // start at 0 for fade-in
            });
        }
    },

    play() {
        if (!themeMusic) {
            // console.error('theme music not initized')
            return;
        }

        if (!themeMusic.playing()) {
            // console.log('playing')
            themeMusic.fade(themeMusic.volume(), 0.1, this.fadeInDuration);
            themeMusic.play();
        }
    },

    stop() {
        if (!themeMusic) {
            // console.error('theme music not initized')
            return;
        }

        if (themeMusic.playing()) {
            // console.log('stopping')
            themeMusic.fade(themeMusic.volume(), 0, this.fadeOutDuration);
            setTimeout(() => {
                themeMusic.stop();
            }, this.fadeOutDuration);
        }
    },
};

export { themeMusicComponent };
