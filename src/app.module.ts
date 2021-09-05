import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

/*
TODO 
-> Criar instancia mongodb para salvar os registros dos certificados
TODO
-> Pegar dados do banco na rota de GET
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
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
