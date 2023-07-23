import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname, join } from 'path';
import { diskStorage } from 'multer';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { uploadFiles } from 'src/decorator';
import { ApiConsumes } from '@nestjs/swagger';

@Controller('/api/vehicles')
export class AutomobileController {
  @Get('/download')
  getFile(@Res({ passthrough: true }) res: Response): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="package.json"',
    });
    return new StreamableFile(file);
  }

  @HttpCode(HttpStatus.CREATED)
  @ApiConsumes('multipart/form-data')
  @uploadFiles('filename')
  @UseInterceptors(FileInterceptor('filename'))
  @Post('/upload-file')
  uploadMyFiles(@UploadedFile() file) {
    console.log(file);
  }

  // step-4
  // file upload controller
  // using multer and disk store
  constructor(@InjectQueue('upload-queue') private fileQueue: Queue) {}

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('csv', {
      storage: diskStorage({
        destination: './csv',
        // generating file name
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async uploadCsv(@UploadedFile() file) {
    console.log(file);
    // adding a job to the queue and we are done

    this.fileQueue.add('csv', { file: file });
  }
}
