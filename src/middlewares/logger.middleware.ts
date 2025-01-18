import { Injectable, NestMiddleware } from '@nestjs/common';
import { format } from 'date-fns';
import { Request, Response, NextFunction } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logFilePath = path.join(__dirname, '../logs/app.log');

  constructor() {
    // Membuat folder logs jika belum ada
    const logDir = path.dirname(this.logFilePath);
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir);
    }
  }

  use(req: Request, res: Response, next: NextFunction): void {
    res.on('finish', () => {
      // Menggunakan date-fns untuk memformat waktu
      const timestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss'); // Format waktu
      const method = req.method;
      const url = req.originalUrl;
      const statusCode = res.statusCode;

      const logMessage = `[${timestamp}] ${method} ${url} ${statusCode}`;

      // Tulis log ke file
      fs.appendFileSync(this.logFilePath, logMessage + '\n', 'utf8');
    });

    next();
  }
}
