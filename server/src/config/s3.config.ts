import getEnvVar from "env/index";

export const ResourceTypes = {
  THUMBNAIL: 'thumbnails',
} as const;

const S3Config = {
    accessKeyId: getEnvVar('S3_ACCESS_KEY_ID'),
    secretAccessKey: getEnvVar('S3_SECRET_KEY'),
    region: getEnvVar('S3_REGION'),
    generateKeyName: (resourceType: keyof typeof ResourceTypes, fileName: string) => `${resourceType}-${fileName}`,
    buckets: {
        thumbnails: 'moonrisemoon',
    },
} as const;

export default S3Config;
