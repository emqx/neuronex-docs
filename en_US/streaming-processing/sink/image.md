# Image Sink

Image Sink is used to save the image to the specified folder.

## Sink configuration

On the rule page, click **Add action** and set the following:

- **Path**: The file path where the result is saved, such as `/tmp`.

- **Image Format**: The image format, supports jpeg, or png.

- **Max Age**: Maximum file storage time (hours). The default value is 72, which means that the picture can be stored for up to 3 days

- **Max count**: The maximum number of stored pictures. The default value is 1000. The earlier pictures will be deleted. The relationship with "Max Age" is OR.