# File

<span style="background:green;color:white;">Stream</span>        <span style="background:green;color:white">Scan table</span>


The NeuronEX data processing module can receive data from files through the `File` type data source. The File type can be used as a data source for streams and scan tables, and supports monitoring files or folders. When the monitored object is a folder, NeuronEX will read files in alphabetical order of file names.

::: tip
If the monitored location is a folder, the file types in the folder must be the same.
:::

Supported File types:

- json: standard JSON array format file. If the file format is a line-delimited JSON string, it needs to be defined in the `lines` format
- csv: supports comma-delimited csv files and also supports custom delimiters
- lines: Line-delimited file. The decoding method for each line can be defined via the `format` parameter in the stream definition. For example, for a line-delimited JSON string file, the file type should be set to `lines` and the format should be set to `json`, indicating that a single line is formatted as JSON.
- cime: A file format for power system models and data.
- raw: Raw data, no parsing is performed. When this type is selected, the stream format must be set to `binary`.

Some files may have most of the data in a standard format, but have some metadata at the beginning and end of the file. Users can use the **ignoreStartLines` and `ignoreEndLines`) parameters to remove non-standard beginning and end non-standard parts in order to parse the above file types.


## Create stream

Log in to NeuronEX and click **Data Processing** -> **Source**. On the **Stream** tab, click **Create Stream**.

In the pop-up **Source Magement**/**Create** page, enter the following configuration:

- **Stream Name**: Enter the stream name
- **Whether the schema stream**: Check to confirm whether it is a structured stream. If it is a structured stream, you need to add further stream fields. It can be unchecked by default.
- **Stream type**: Select file.
- **Data source**: Specify the relative address of the file or directory. Note: Please enter the file name without a path, such as `my.json`.
- **Configuration key**: You can use the default configuration key. If you want to customize the configuration key, you can click the Add Configuration key button and make the following settings in the pop-up dialog box. 
   - **Name**: Required, enter the name of the configuration key.
   - **File type**: Defines the type of file, which can be json, csv or lines.
   - **Folder Path**: Required, the path to the folder where the file is located. But the file name should not be included here. The file name should be defined in the data source field. For example `data/uploads`
   - **Interval**: The time interval for reading files, in milliseconds. If set to 0, it is read only once.
   - **Sending interval**: The time interval for sending events, in milliseconds.
   - **Post-read action**: Operation after file reading. You can choose 0 (keep the file), 1 (delete the file), or 2 (move the file to another location).
   - **Move Position**: If the post-read action is set to 2 (move file), the target location to which the file is moved is defined here.
   - **Whether to include header files**: For csv files, define whether there is a file header. If set to **True**, then the first line of the file will be parsed as the file header.
   - **Field list**: Define the columns of the file here. If the file header is defined, the settings here will be overridden.
   - **Number of lines to ignore at the beginning of the file**: Ignore the lines at the beginning of the file. For example, if set to 3, the first three lines of the file will be ignored.
   - **Number of lines to ignore at the end of the file**: Ignore the lines at the end of the file. Note that the last blank line of the file is not counted.
- **Stream format**: supports json, binary, protobuf, delimited, custom.

- **Shared**: Check to confirm whether to share the source.

## Create scan table

File sources support scanning tables. Log in to NeuronEX and click **Data Processing** -> **Source**. On the **Scan Table** tab, click **Create Scan Table**.

- **Table Name**: Enter the table name
- **Whether the schema stream**: Check to confirm whether it is a structured table. If it is a structured table, you need to add further table fields. It can be unchecked by default.
- **Table type**: Select file.
- **Data source**: Specify the relative address of the file or directory. Note: Please enter the file name without a path, such as test.json.
- **Configuration key**: You can use the default configuration key. If you want to customize the configuration key, please refer to the [Create Stream](#Create Stream) section
- **Table format**: supports json, binary, delimited, custom.
- **Retain size**: Specify the size of the table snapshot, used to store historical data.


## Example

The file source involves parsing the file content, and the parsing format is related to the format definition in the data stream. We use some examples to describe how to combine file types and format settings to parse file sources.

### Read CSV files with custom delimiters

For standard csv files, the delimiter is a comma, but there are a large number of files that use a csv-like format but use custom delimiters. Also, some csv-like files have column names defined on the first line instead of data, as shown in the example below.

```csv
id name age
1 John 56
2 Jane 34
```

The first line of the file is the file header, which defines the column name of the file. When reading such a file, the configuration file is as follows, and you need to specify that the file has a header.

```yaml
csv:
   fileType: csv
   hasHeader: true
```

In the stream definition, set the stream data to `DELIMITED` format, specifying the delimiter as a space using the `DELIMITER` parameter.

```SQL
create
stream cscFileDemo () WITH (FORMAT="DELIMITED", DATASOURCE="abc.csv", TYPE="file", DELIMITER=" ", CONF_KEY="csv"
```

### Read multiple lines of JSON data

For a standard JSON file, the entire file should be a JSON object or an array. In practice, we often need to parse files containing multiple JSON objects. These files themselves are not actually in legal JSON format, but each line is in legal JSON format and can be considered as multi-line JSON data.

```text
{"id": 1, "name": "John Doe"}
{"id": 2, "name": "Jane Doe"}
{"id": 3, "name": "John Smith"}
```

When reading files in this format, the file type in the configuration is set to `lines`.

```yaml
jsonlines:
   fileType: lines
```

In the stream definition, set the stream data to `JSON` format.

```SQL
create stream linesFileDemo () WITH (FORMAT="JSON", TYPE="file", CONF_KEY="jsonlines"
```

Additionally, the lines file type can be combined with any format. For example, if you set the format to protobuf and configure the mode, it can be used to parse data containing multiple Protobuf-encoded lines.