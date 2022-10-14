import { ssrWindow, extend } from 'ssr-window';

extend(ssrWindow, {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    postMessage: (message: any, targetOrigin: any, transfer?: any) => {}
});
