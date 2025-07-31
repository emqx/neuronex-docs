# File Sink

File Sink saves the analysis results to the specified file. The specified file already exists, and the result will be overwritten. [Data Source - File](../file.md) is a reverse connector that can read the output of the file sink.

## File Type

File sinks can write data to different types of files, such as:

- lines: This is the default type. It writes a line-delimited file decoded by the format parameter in the stream definition. For example, to write a line-delimited JSON string, set the file type to lines and the format to json.
- json: This type writes to the standard JSON array format file.
- csv: This type writes comma-delimited csv files. You can also use custom separators. To use this file type, set format to delimited.

If you want to use the File Sink connector, click **Data Processing** -> **Rules** -> **Create Rule**, in the **Action** area, click **Add**, **Sink** Select **File**.

## Sink Configuration

On the page that pops up, make the following settings:

- **Path**: The path to save the result file, e.g., `/tmp/result.txt`.
- **File Type**: The type of file, supporting `json`, `csv`, or `lines`. The default value is `lines`.
- **Has Header**: Specifies whether to generate a file header. Currently, this is only effective when the file type is `csv`. The file header is inferred from the first received data record, and the inferred keys are sorted alphabetically.
- **Rolling Interval**: One of the properties defining the [Rolling Strategy](#rolling-strategy). The minimum time interval (in milliseconds) before rolling to a new file. The check frequency is controlled by `checkInterval`.
- **Check Interval**: One of the properties defining the [Rolling Strategy](#rolling-strategy). The interval (in milliseconds) for checking time-based rolling policies, used to control how frequently to check if a file should be rolled over.
- **Rolling Count**: One of the properties defining the [Rolling Strategy](#rolling-strategy). The maximum message count before a file rolls over.
- **Rolling Name Pattern**: One of the properties defining the [Rolling Strategy](#rolling-strategy). Specifies how the timestamp is placed when creating rolling files. The timestamp can be a "prefix", "suffix", or "none".
- **Rolling Hook**: Rolls the file to AWS S3.
- **Rolling Hook Properties**: Properties for rolling the file to AWS S3.
  - **Bucket Name**: The name of the S3 bucket.
  - **Credential Type**: The method for obtaining AWS credentials, supporting the following three forms:
    - **env**: Obtain credentials from environment variables.
    - **file**: Obtain credentials from an AWS IAM configuration file.
    - **key**: Directly provide the Access Key and Secret Key.
  - **Credential ID**: Optional parameter. When **Credential Type** is set to `file`, it is used to specify which ID from the AWS IAM configuration file to use.
  - **AccessKey**: Optional parameter. When **Credential Type** is set to `key`, it is used to specify the Access Key for AWS S3 permissions.
  - **SecretKey**: Optional parameter. When **Credential Type** is set to `key`, it is used to specify the Secret Key for AWS S3 permissions.
  - **Region**: Optional parameter. When **Credential Type** is set to `key`, it is used to specify the AWS S3 service region, e.g., `us-east-1`.
  - **Timeout**: The timeout for the upload operation, in seconds. The default value is `60` seconds.
  - **retryCount**: The number of retries after an upload failure. The default value is `1` time.
- **Ignore Output**: Defaults to `False`.
- **Send Result Data Per Record**: Defaults to `True`.
- **Stream Format**: Defaults to `json`.
- **Data Template**: Golang template, used to specify the output data format. If no data template is specified, the data will be used as raw input. For a detailed introduction to data templates, see [Data Template](./data_template.md).


## Rolling Strategy

The file sink supports rolling strategy to control the file size and the number of files. The rolling strategy is
controlled by the following properties: rollingInterval, checkInterval, rollingCount and rollingNamePattern.

The file rolling could be based on time or based on message count or both.

1. Time based rolling: The rollingInterval and checkInterval properties are used to control the time based rolling. The
   rollingInterval is the minimum time interval to roll to a new file. The checkInterval is the interval for checking
   time based rolling policies. This controls the frequency to check whether a part file should rollover. For example,
   if checkInterval is 1 hour and rollingInterval is 1 day, then the file sink will check each open file for each hour,
   if the file has opened more than 1 hour, the file will be rolled over. So the actual rolling interval could be bigger
   than rollingInterval property. To use time based rolling, set the rollingInterval property to a positive value and
   set rollingCount to 0. Example combination: rollingInterval=1 day, checkInterval=1 hour, rollingCount=0.
2. Message count based rolling: The rollingCount property is used to control the message count based rolling. The file
   sink will check the message count for each open file, if the message count is greater than rollingCount, the file
   will be rolled over. To use message count based rolling, set the rollingCount property to a positive value and set
   rollingInterval to 0. Example combination: rollingInterval=0, rollingCount=1000.
3. Both time and message count based rolling: The file sink will check both time and message count for each open file,
   if either one is satisfied, the file will be rolled over. To use both time and message count based rolling, set the
   rollingInterval and rollingCount properties to positive values. Example combination: rollingInterval=1 day,
   checkInterval=1 hour, rollingCount=1000.

## Sample Usage

Below is a sample for selecting temperature greater than 50 degree, and save the result into file `/tmp/result.txt` with
every 5 seconds.

```json
{
  "sql": "SELECT * from demo where temperature>50",
  "actions": [
    {
      "file": {
        "path": "/tmp/result.txt",
        "checkInterval": 5000,
        "fileType": "lines",
        "format": "json"
      }
    }
  ]
}
```

Below is another example to write the result into multiple files based on the `device` field in the payload. Each file
will roll over every 1 hour or have more than 10000 messages. The rolling file name will have a prefix of the creation
timestamp like `1699888888_deviceName.csv`.

```json
{
  "sql": "SELECT * from demo where temperature>50",
  "actions": [
    {
      "file": {
        "path": "{{.device}}.csv",
        "fileType": "csv",
        "format": "delimited",
        "hasHeader": true,
        "delimiter": ",",
        "rollingInterval": 3600000,
        "checkInterval": 600000,
        "rollingCount": 10000,
        "rollingNamePattern": "prefix"
      }
    }
  ]
}
```