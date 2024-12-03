let naration = null; // init

const foundationNarationComponent = {
    // fades
    fadeDuration: 500,

    init() {
        if (!naration) {
            // Only initialize once
            naration = new window.Howl({
                src: [
                    require("../../assets/sfx/background/foundation_naration.mp3"),
                ],
                autoplay: false,
                loop: false,
                volume: 0, // start at 0 for fade-in
            });
        }
    },

    play() {
        if (!naration) {
            return;
        }

        if (!naration.playing()) {
            naration.fade(naration.volume(), 0.5, this.fadeDuration);
            naration.play();
        }
    },

    stop() {
        if (!naration) {
            return;
        }

        if (naration.playing()) {
            naration.fade(naration.volume(), 0, this.fadeDuration);
            setTimeout(() => {
                naration.stop();
            }, this.fadeDuration);
        }
    },
};

export { foundationNarationComponent };
