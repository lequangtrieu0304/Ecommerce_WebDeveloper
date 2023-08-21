import fs from 'fs'; 
import path from 'path';
import formatTime from 'date-format';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const logger = (req, res, next) => {
  
    res.on('finish', () => {
        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const method = req.method;
        const url = req.originalUrl || req.url;
        const status = res.statusCode;
        const error = res.statusMessage;
  
        const logData = `${ip}\t${formatTime("dd/MM/yyyy-hh:mm:ss", new Date())}\t${method}\t${url}\t${error}\t${status} \n`;
        writeLog(logData);
    });
    next();
}
  
const writeLog = async (logData) => {
    try {
        if(!fs.existsSync(path.join(__dirname, '../logs'))){
            fs.mkdirSync(path.join(__dirname, '../logs'))
        }
        
        fs.appendFileSync(path.join(__dirname, '../logs', 'logsEvents.txt'), logData, (err) => {
            if(err) throw err;
        })
    }
    catch (err) {
        console.log(err);
    }
}
  
  