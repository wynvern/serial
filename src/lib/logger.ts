import * as fs from 'fs';
import * as path from 'path';

class Logger {
    private logFilePath: string;

    constructor() {
        const rootDir = path.resolve(__dirname, '../../../');
        this.logFilePath = path.join(rootDir, 'main.log');
        this.ensureLogFileExists();
    }

    private ensureLogFileExists(): void {
        if (!fs.existsSync(this.logFilePath)) {
            fs.writeFileSync(this.logFilePath, '', { encoding: 'utf8' });
        }
    }

    private writeLog(level: 'info' | 'error', message: string): void {
        const timestamp = new Date().toISOString();
        const logMessage = `[${timestamp}] [${level}]: ${message}\n`;
        fs.appendFileSync(this.logFilePath, logMessage, { encoding: 'utf8' });
    }

    public d(message: string): void {
        this.writeLog('info', message);
    }

    public e(message: string): void {
        this.writeLog('error', message);
    }
}

export const logger = new Logger();