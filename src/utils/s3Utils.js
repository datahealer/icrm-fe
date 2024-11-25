import AWS from "aws-sdk";
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-south-1",
});

export const uploadFileToS3 = async (file, folder) => {
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: `${folder}/${Date.now()}-${file.name}`,
    Body: file,
    ContentType: file.type,
  };

  try {
    const { Key } = await s3.upload(params).promise();
    const signedUrl = s3.getSignedUrl("getObject", {
      Bucket: process.env.AWS_BUCKET,
      Key,
      Expires: 60 * 60,
    });

    return { path: Key, signedUrl };
  } catch (error) {
    throw error;
  }
};



