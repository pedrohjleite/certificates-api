import { Injectable, Res } from '@nestjs/common';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { Response } from 'express';
import { CreateCertificateDto } from './dtos/createCertificate.dto';

@Injectable()
export class AppService {
  getCertificatePdf(@Res() response: Response): void {
    const fonts = {
      Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique',
      },
    };

    const printer = new PdfPrinter(fonts);

    const docDefinitions: TDocumentDefinitions = {
      defaultStyle: { font: 'Helvetica', fontSize: 64 },
      pageOrientation: 'landscape',
      content: ['teste'],
    };
    const pdfDoc = printer.createPdfKitDocument(docDefinitions);

    const chunks = [];

    pdfDoc.on('data', (chunk) => {
      chunks.push(chunk);
    });

    pdfDoc.end();

    pdfDoc.on('end', () => {
      const result = Buffer.concat(chunks);
      response.end(result);
    });
  }

  createCertificateRegister(certificate: CreateCertificateDto) {
    return JSON.stringify(certificate);
  }
}
