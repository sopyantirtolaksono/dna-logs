import { Injectable } from '@nestjs/common';
import { format, isAfter, parse, subHours } from 'date-fns';
import * as fs from 'fs';
import * as readline from 'readline';

@Injectable()
export class LogCountService {
    async countRequestsInLastHour(logFilePath: string): Promise<Record<string, number>> {
        const result: Record<string, number> = {};
    
        // Ambil waktu sekarang (waktu sistem)
        const now = new Date();
        const oneHourAgo = subHours(now, 1);
    
        // Format waktu sistem sesuai format log `[YYYY-MM-DD HH:mm:ss]`
        const nowFormatted = format(now, 'yyyy-MM-dd HH:mm:ss');
        const oneHourAgoFormatted = format(oneHourAgo, 'yyyy-MM-dd HH:mm:ss');
    
        console.log('Current time (formatted):', nowFormatted);
        console.log('One hour ago (formatted):', oneHourAgoFormatted);
    
        // Baca file log
        const fileStream = fs.createReadStream(logFilePath);
        const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });
    
        // Regex untuk parsing log dengan format waktu `[YYYY-MM-DD HH:mm:ss]`
        const logRegex = /^\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\] \w+ (\/.*?) \d+$/;
    
        for await (const line of rl) {
          console.log('Processing line:', line);
    
          // Cek apakah baris log cocok dengan regex
          const logParts = logRegex.exec(line);
    
          if (!logParts) {
            console.log('Regex did not match for line:', line);
            continue;
          }
    
          const [_, timestamp, endpoint] = logParts;
    
          // Parse timestamp log ke dalam bentuk Date
          const logTime = parse(timestamp, 'yyyy-MM-dd HH:mm:ss', new Date());
          console.log('Parsed log time:', logTime);
    
          // Periksa apakah log berada dalam 1 jam terakhir
          if (isAfter(logTime, oneHourAgo)) {
            console.log(`Log is within the last hour: ${line}`);
    
            // Cek apakah endpoint mengandung '/log-count'
            if (endpoint.split('/').includes('log-count') || endpoint === '/api/v1') {
                console.log('Skipping endpoint:', endpoint);
                continue; // Lewati endpoint ini
            }
    
            result[endpoint] = (result[endpoint] || 0) + 1;
          } else {
            console.log(`Log is outside the last hour: ${line}`);
          }
        }
    
        return result;
      }
}
