# Managing plugins

After you log in, open **Data Collection** -> **Plugin** to see installed plugins. For the full protocol list, see [List of Data Collection Plugins](../introduction/plugin-list/plugin-list.md). For custom development, see the [SDK Tutorial](../dev-guide/sdk-tutorial/sdk-tutorial.md).

## View available plugins

The plugin page lists name, type, category, version, and description. Use the drop-down to filter northbound applications or southbound devices.

![plugin-options](./_assets/plugin_options.png)

Plugin types:

* **System**: shipped with the product, cannot be deleted, can be replaced.
* **Custom**: user or custom-developed, can be deleted or replaced.

## Add a plugin

Click **Add Plugin** in the upper left and upload the local `.so` and `.json` files.

![plugin-options](./_assets/plugin_add.png)

## Replace a plugin

On a plugin card, click **Replace** and upload the new `.so` and `.json`. To replace an official plugin, contact the EMQ business team.

## CNC file upload

Southbound CNC drivers can send files to the device.

![cnc_file](_assets/cnc_file.png)
