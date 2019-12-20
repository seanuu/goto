import {gotoOption, gotoTarget} from './goto';
import {VueConstructor} from 'vue';

declare const install: () => void;

export default install;
export {install};

declare module 'vue/types/vue' {
    interface Vue {
        $goto: (target: gotoTarget, options?: gotoOption) => Promise<number>;
    }
}
