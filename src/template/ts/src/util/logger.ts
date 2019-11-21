import morgan from "morgan";
import rfs from "rotating-file-stream";
import path from "path";
import fs from "fs";

// log directory path
const logDirectory = path.resolve(__dirname, '../../log');

// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

// create a rotating write stream
const accessLogStream = rfs('access.log', {
    interval: '1d',
    path: logDirectory
})

export default {
    dev: morgan('dev'),
    combined: morgan('combined', { stream: accessLogStream })
}