# React Event Bus hook

This library provides easy-to-use React hook, for dispatching messages, via JavaScript `postMessage` function.
It is implemented using event bus design pattern, which is based on publish/subscription model.

## Basic usage

1. Create a file for event bus message types (skip if you're not using TypeScript):

```ts
export interface LoaderVisibilityMessage {
    visible: boolean;
}

// ... more message structures here

export interface EventBusMessages {
    LoaderVisibility: LoaderVisibilityMessage;
    // ... rest of messages here
}
```
Let's pretend you have some SPA application, that will show some microservice in a frame. For better user experience, you would like to show some loader on it, before the service will finish loading.

For this reason, you will need to create `LoaderVisibilityMessage`, that will carry loader visibility state. Finally, you put all message structures, that your app will use, into a single `EventBusMessages` interface.

2. Subscribe for a topic in your <i>subscriber</i> component:

```ts
import { EventBusMessages } from 'EventBus.types.ts';

const SubscriberComponent: FunctionComponent = () => {
    const eventBus = useEventBus<EventBusMessages>();
    const [loaderVisible, setLoaderVisible] = useState(true);

    useEffect(() => {
        const loaderListener = eventBus.subscribe('LoaderVisibility', handler);
        return () => {
            loaderListener.unsubscribe();
        };
    }, []);

    const handler = (message: LoaderVisibilityMessage) => {
        setLoaderVisible(message.visible);
    };

    return <div>{loaderVisible && 'Loading...'}</div>;
}
```

This will be the code for your SPA application. The subscriber will 'listen' to any message with topic `LoaderVisibility`. When the message comes, the event bus will fire `handler` function and pass incoming message payload.

<b>Important:</b> Always remember to unsubscribe from the event. Event bus works with listeners, so you wouldn't like to have any 'zombie' listeners in your application.

2. Publish message from your <i>publisher</i> component:

```ts
import { EventBusMessages } from 'EventBus.types.ts';

const PublisherComponent: FunctionComponent = () => {
    const eventBus = useEventBus<EventBusMessages>();

    useEffect(() => {
        eventBus.publish({
            topic: 'LoaderVisibility',
            payload: { visible: false }
        });
        return () => {
            eventBus.publish({
                topic: 'LoaderVisibility',
                payload: { visible: true }
            });
        };
    }, []);

    return <div>Hello from microservice!</div>;
}
```

Once the microservice application renders, it will automatically publish message indicating, that it doesn't need loader to be visible.

<b>Note:</b> We're also publishing the message to show the loader back again, when the component will unmount or reload.

## Learn more

This project was bootstrapped with [React TypeScript Library Template](https://github.com/janeksmielowski/react-ts-library)
