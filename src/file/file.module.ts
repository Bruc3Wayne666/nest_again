import {Module} from '@nestjs/common';
import {CloudinaryService} from './file.service';
import {CloudinaryProvider} from "@src/file/file.provider";

@Module({
    providers: [CloudinaryProvider, CloudinaryService],
    exports: [CloudinaryProvider, CloudinaryService]
})
export class FileModule {}
