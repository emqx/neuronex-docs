# AWS S3 Sink

This operation is used to publish output messages to AWS S3.
To use the AWS S3 Sink connector, click **Data Processing** -> **Rules** -> **Create Rule**, and in the **Actions** area, click **Add**, then select **AWS S3 Bucket** as the Sink.

## Sink Configuration

On the rule page, click **Add Action** and configure the following settings:

- **Bucket Name**: The name of the S3 bucket.
- **Credential Type**: The method for obtaining AWS credentials, supporting the following three forms:
  - **env**: Obtain credentials from environment variables.
  - **file**: Obtain credentials from an AWS IAM configuration file.
  - **key**: Directly provide the Access Key and Secret Key.
- **Credential ID**: Optional parameter. When Credential Type is set to file, it is used to specify which ID from the AWS IAM configuration file to use.
- **Access Key**: Optional parameter. When Credential Type is set to key, it is used to specify the Access Key for AWS S3 permissions.
- **Secret Key**: Optional parameter. When Credential Type is set to key, it is used to specify the Secret Key for AWS S3 permissions.
- **Region**: Optional parameter. When Credential Type is set to key, it is used to specify the AWS S3 service region, e.g., us-east-1.
- **Timeout**: The timeout for the upload operation, in seconds. The default value is 60 seconds.
- **Retry Count**: The number of retries after an upload failure. The default value is 1 time.
- **Compression**: Leave blank by default for no decompression.
- **Ignore Output**: Defaults to False.
- **Send Result Data Per Record**: Defaults to True.
- **Stream Format**: Defaults to json format.
- **Data Template**: Golang template, used to specify the output data format. If no data template is specified, the data will be used as raw input. For a detailed introduction to data templates, see [Data Template](./data_template.md).

After completing the settings, you can click Test Connection to confirm the connection status. Finally, click Submit to complete the setup.