import { PDFParse } from "pdf-parse";

export class PdfService {
  public async extractText(file: Express.Multer.File): Promise<string> {
    const parser = new PDFParse({ data: file.buffer });
    const result = await parser.getText();

    await parser.destroy();

    return result.text;
  }
}
