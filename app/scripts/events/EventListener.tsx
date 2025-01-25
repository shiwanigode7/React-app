import React, { useEffect, useState } from "react";
import { EventListenerInputModel } from "./NodeEventSubscriberModel";

/** Websocket client to listen to "Events" service */
export const EventListener = (input: EventListenerInputModel) => {
    const HEART_BEAT_TIMEOUT = 30000;
    const HEART_BEAT_MESSAGE: string = "keep alive";
    let webSocket: WebSocket;
    const [keepAlive, setKeepAlive] = useState<boolean>(false);
    const [keepAliveTimeout, setKeepAliveTimeout] = useState<number>(0);

    useEffect(() => {
        if (keepAlive) {
            stopListeningToEvents().then(() => {
                startListeningToEventsService();
            });
        } else if (!webSocket) {
            startListeningToEventsService();
        }
    }, [input.nodePath]);

    useEffect(() => {
        if (keepAlive) {
            webSocket = new WebSocket(getEventsWebSocketURL());
            webSocket.onopen = function () {
                const keepAliveFunc = function () {
                    if (keepAlive && WebSocket.OPEN === webSocket.readyState) {
                        webSocket.send(JSON.stringify({
                            msg: HEART_BEAT_MESSAGE
                        }))
                        setKeepAliveTimeout(setTimeout(keepAliveFunc, HEART_BEAT_TIMEOUT));
                    }
                };
                keepAliveFunc();
            };

            webSocket.onmessage = input.processEvents;

            webSocket.onclose = function () {
                setKeepAlive(false);
                clearTimeout(keepAliveTimeout);
            };
        }
    }, [keepAlive]);

    const getEventsWebSocketURL = (): string => {
        const host = window.location.host.split(".");
        host.splice(0, 1, "events");
        const protocol: string = window.location.protocol == "http:" ? "ws:" : "wss:";
        let target: string = `${protocol}//${host.join(".")}`;
        target += "/api/v1/subscribe/" + input.nodePath;
        const lWebSocketUrl = target + `?filter=${input.filter || "nofilter"}`;
        return lWebSocketUrl;
    };

    const startListeningToEventsService = () => {
        setKeepAlive(true);
    };

    const stopListeningToEvents = (): Promise<void> => {
        setKeepAlive(false);
        clearTimeout(keepAliveTimeout);
        return Promise.resolve();
    };

    return <div></div>
};