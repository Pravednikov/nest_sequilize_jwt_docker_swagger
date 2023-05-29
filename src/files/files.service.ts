import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';

// TODO create and implement new interface
@Injectable()
export class FilesService {
  // TODO connect to AWS(complete registration)
  // private readonly s3Client = new S3Client({
  //   region: this.configService.getOrThrow('AWS_S3_REGION'),
  // });

  // constructor(private readonly configService: ConfigService) {}

  public async create(file: Express.Multer.File): Promise<string> {
    try {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (error) {
      throw new HttpException(
        'An error occurred while writing the file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // async upload(fileName: string, file: Buffer) {
  //   await this.s3Client.send(
  //     new PutObjectCommand({
  //       Bucket: 'nestjs-uploader',
  //       Key: fileName,
  //       Body: file,
  //     }),
  //   );
  // }
}
