import { Injectable, Query, Res } from '@nestjs/common';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { Response } from 'express';
import { CreateCertificateDto } from './dtos/createCertificate.dto';
import { Certificate, CertificateDocument } from './schemas/certificate.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Certificate.name)
    private certificateModel: Model<CertificateDocument>,
  ) {}

  async getCertificatePdf(
    @Res() response: Response,
    @Query() id: string,
  ): Promise<void> {
    const fonts = {
      Helvetica: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique',
      },
    };

    const { logo, signature, signaturePersonTitle, text, title } =
      await this.find(id);

    const printer = new PdfPrinter(fonts);

    const docDefinitions: TDocumentDefinitions = {
      defaultStyle: { font: 'Helvetica', fontSize: 64 },
      pageOrientation: 'landscape',
      content: [logo, signature, signaturePersonTitle, text, title],
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

  async create(
    createCertificateDto: CreateCertificateDto,
  ): Promise<CertificateDocument> {
    const createdCertificate = new this.certificateModel(createCertificateDto);
    return createdCertificate.save();
  }

  async find(id: string): Promise<Certificate> {
    return this.certificateModel.findOne({ _id: id }).exec();
  }
}
