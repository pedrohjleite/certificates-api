import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { CreateCertificateDto } from './dtos/createCertificate.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('certificate')
  getCertificatePdf(@Res() response: Response, @Query('id') id: string) {
    return this.appService.getCertificatePdf(response, id);
  }

  @Post()
  createCertificateRegister(@Body() certificate: CreateCertificateDto) {
    return this.appService.create(certificate);
  }
}
