import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';
import { CreateCertificateDto } from './dtos/createCertificate.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getCertificatePdf(@Res() response: Response) {
    return this.appService.getCertificatePdf(response);
  }

  @Post()
  createCertificateRegister(@Body() certificate: CreateCertificateDto) {
    return this.appService.createCertificateRegister(certificate);
  }
}
