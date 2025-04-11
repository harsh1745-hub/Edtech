import winston from "winston";

const logger=winston.createLogger({
    level:'info',
    format:winston.format.json(),
    transports:[
        new winston.transports.Console(),
        new winston.transports.File({filename:"logs/study-materials.log"})
    ]
})

export default logger;