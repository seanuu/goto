import {getContainer, getOffset} from './util';
import * as easingPatterns from './easing';
import {gotoOption, gotoTarget} from '../types/goto';
import {VueConstructor} from 'vue';

function goto(target: gotoTarget, option: gotoOption): Promise<number> {
    const settings: gotoOption = {
        container: (document.scrollingElement as HTMLElement | null) || document.body || document.documentElement,
        duration: 500,
        offset: 0,
        easing: 'easeInOutCubic',
        appOffset: true,
        ...option
    };

    const container = getContainer(settings.container);
    const startTime = performance.now();
    let targetLocation: number;

    if (typeof target === 'number') {
        targetLocation = getOffset(target) - settings.offset!;
    } else {
        targetLocation = getOffset(target) - getOffset(container) - settings.offset!;
    }

    const startLocation = container.scrollTop;

    if (targetLocation === startLocation) return Promise.resolve(targetLocation);

    const ease = typeof settings.easing === 'function' ? settings.easing : easingPatterns[settings.easing!];
    if (!ease) throw new TypeError(`Easing function "${settings.easing}" not found.`);

    return new Promise(resolve =>
        requestAnimationFrame(function step(currentTime: number) {
            const timeElapsed = currentTime - startTime;
            const progress = Math.abs(settings.duration ? Math.min(timeElapsed / settings.duration, 1) : 1);

            container.scrollTop = Math.floor(startLocation + (targetLocation - startLocation) * ease(progress));

            const clientHeight = container === document.body ? document.documentElement.clientHeight : container.clientHeight;
            if (progress === 1 || clientHeight + container.scrollTop === container.scrollHeight) {
                return resolve(targetLocation);
            }

            requestAnimationFrame(step);
        })
    );
}

const install = (Vue: VueConstructor) => {
    Vue.prototype.$goto = goto;
};

export default install;

export {install};
