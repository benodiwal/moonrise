import { GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import S3Config from 'config/s3.config';

class S3Service {
  #client: S3Client;

  constructor() {
    const { accessKeyId, secretAccessKey, region } = S3Config;

    this.#client = new S3Client({
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      region,
    });
  }

  async #getUploadUrl(command: PutObjectCommand) {
    return await getSignedUrl(this.#client, command);
  }

  async uploadThumbnail(fileName: string, fileBuffer: Buffer) {
    try {
        const bucket = S3Config.buckets.thumbnails;
        const key = S3Config.generateKeyName('THUMBNAIL', fileName);
        const command = new PutObjectCommand({ Bucket: bucket, Key: key, Body: fileBuffer });
        await this.#client.send(command);
        
        const getCommand = new GetObjectCommand({ Bucket: bucket, Key: key });
        return await this.#getUploadUrl(getCommand);
    } catch (e: unknown) {
        console.error(e);
    }
  }
}

const s3ServiceClient = new S3Service();
export default s3ServiceClient;
