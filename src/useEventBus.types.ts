export interface Message<M extends Record<string, any>, T extends keyof M> {
    topic: T;
    payload: M[T];
}

export interface PublishOptions {
    targetOrigin: string;
    targetWindow: Window;
}

export interface SubscribeOptions {
    targetWindow: Window;
}

export type Handler<Payload extends any> = (payload: Payload) => void;
