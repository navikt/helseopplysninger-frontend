import {createLogger, LogContexts, LogLevels} from 'bs-logger';

const logger = createLogger({
    context: {namespace: 'http'},
    targets: "stderr:" + LogLevels.info + "%json",
    // @ts-ignore
    translate: msg => {
        return {
            msg: msg.message,
            level: msg.context[LogContexts.logLevel],
            time: msg.time
        };
    }
});
export default logger;
