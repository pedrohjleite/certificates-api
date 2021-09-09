import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Certificate, CertificateSchema } from './schemas/certificate.schema';
import { ConfigModule } from '@nestjs/config';

/*
TODO
-> Estilizar pdf e error handling
*/

/*
 *CERTIFICATE: {
 *uuid: string;
 *title: string;
 *logo: file | string;
 *text: string;
 *signature: string;
 *signaturePersonTitle: string;
 *}
 */

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_KEY),
    MongooseModule.forFeature([
      {
        name: Certificate.name,
        schema: CertificateSchema,
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
