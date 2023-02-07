export default class Animate {
    constructor(public car: SVGAElement, private distance: number, private velocity: number) {
        this.car = car;
        this.distance = distance;
        this.velocity = velocity;
        this.getSuccess = this.getSuccess.bind(this);
    }
    success = true;
    timing(timeFraction: number): number {
        return timeFraction ** 2;
    }

    draw(progress: number, car: SVGAElement): void {
        const width = document.documentElement.clientWidth - 140;
        car.style.left = progress * width + 'px';
    }
    getSuccess() {
        return this.success;
    }
    animate(
        timing: (timeFraction: number) => number,
        draw: (progress: number, car: SVGAElement) => void,
        idCar: number
    ) {
        const start = performance.now();
        const duration = this.distance / this.velocity;
        const car = this.car;
        const status = this.getSuccess;
        let requestId = requestAnimationFrame(function animate(time) {
            const success = status();
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;
            const progress = timing(timeFraction);
            draw(progress, car);
            if (timeFraction < 1) requestId = requestAnimationFrame(animate);
            if (success === false) {
                cancelAnimationFrame(requestId);
            }
        });
        document.addEventListener('click', async (event) => {
            const target = event.target as HTMLElement;
            if (target.closest(`#control-stop-${idCar}`)) {
                cancelAnimationFrame(requestId);
                car.style.left = '0px';
            }
        });
    }
}
