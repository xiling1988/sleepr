//create prisma.service.ts file in database folder and add the following code
import { PrismaClient } from '@prisma/client';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor(private readonly config: ConfigService) {
    super({
      //specifying the database connection details here allows us to use the ConfigService to access the DATABASE_URL
      // environment variable for connecting to Prisma and not really need to specify it in the schema.prisma file
      datasources: {
        db: {
          url: config.get('DATABASE_URL'),
        },
      },
    });
  }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
  }
}