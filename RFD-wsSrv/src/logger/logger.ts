import log4js from 'log4js';



log4js.configure({
    appenders: { 
        logger: { 
            type: "file", 
            filename: "./logs/reports.log" 
        } 
    },
    categories: { 
        default: { 
            appenders: ["logger"], 
            level: "info" 
        } 
    },
});


export const logger = log4js.getLogger();