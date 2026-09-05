export class Display {
    constructor(canvas) {
        this.canvas = canvas;
        this.resolutions = [
            { width: 1920, height: 1080 },
            { width: 1280, height: 720 }
        ];
        this.current = { width: 1920, height: 1080 };
        this.resize(this.current.width, this.current.height);
    }

    setResolution(width, height) {
        this.current = { width, height };
        this.resize(width, height);
    }

    resize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    enterFullscreen() {
        if (this.canvas.requestFullscreen)
            this.canvas.requestFullscreen();
    }

    exitFullscreen() {
        if (document.exitFullscreen)
            document.exitFullscreen();
    }

    toggleFullscreen() {
        if (this.isFullscreen())
            this.exitFullscreen();
        else
            this.enterFullscreen();
    }

    getResolution() {
        return { ...this.current };
    }

    isFullscreen() {
        return document.fullscreenElement === this.canvas;
    }
}