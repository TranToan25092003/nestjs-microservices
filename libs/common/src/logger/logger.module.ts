import { Module } from '@nestjs/common';
import { LoggerModule as pinoLoggerModule } from 'nestjs-pino';
@Module({
  imports: [
    pinoLoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty', // Giúp format log đẹp hơn khi phát triển
          options: {
            colorize: true, // Bật màu trong logs
            translateTime: 'HH:MM:ss Z',
            ignore: 'pid,hostname', // Bỏ bớt các thông tin không cần thiết
          },
        },
      },
    }),
  ],
})
export class LoggerModule {}
