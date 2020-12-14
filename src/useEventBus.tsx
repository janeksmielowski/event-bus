import {
    PublishOptions,
    SubscribeOptions,
    Message,
    Handler
} from './useEventBus.types';

const defaultPublishOptions: PublishOptions = {
    targetOrigin: '*',
    targetWindow: window
};

const defaultSubscribeOptions: SubscribeOptions = {
    targetWindow: window
};

const useEventBus = <MessagesMap extends Record<string, any>>() => {
    const publish = <Topic extends keyof MessagesMap>(
        message: Message<MessagesMap, Topic>,
        options: PublishOptions = defaultPublishOptions
    ) => {
        options.targetWindow.postMessage(message, options.targetOrigin);
    };

    const subscribe = <Topic extends keyof MessagesMap>(
        topic: Topic,
        handler: Handler<MessagesMap[Topic]>,
        options: SubscribeOptions = defaultSubscribeOptions
    ) => {
        const messageEventHandler = (
            event: MessageEvent<Message<MessagesMap, Topic>>
        ) => subscriptionHandler(event, topic, handler);

        const attachEventListener = () => {
            options.targetWindow.addEventListener(
                'message',
                messageEventHandler
            );
        };
        const detachEventListener = () => {
            options.targetWindow.removeEventListener(
                'message',
                messageEventHandler
            );
        };

        attachEventListener();
        return { unsubscribe: detachEventListener };
    };

    const subscriptionHandler = <Topic extends keyof MessagesMap>(
        event: MessageEvent<Message<MessagesMap, Topic>>,
        topic: Topic,
        handler: Handler<MessagesMap[Topic]>
    ) => {
        if (event.data.topic === topic) {
            handler(event.data.payload);
        }
    };

    return { publish, subscribe };
};

export default useEventBus;
