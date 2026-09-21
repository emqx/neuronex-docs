# Bulk Configuration and Migration

For configuring a single driver or tag, see [Create a Southbound Driver](./south-devices/south-devices.md) and [Groups and Tags](./groups-tags/groups-tags.md). Real projects usually involve dozens or hundreds of identical devices and thousands of tags per node, where entering them one by one is impractical. This section covers five bulk methods.

## Choosing a method

| Scenario | Method |
| --- | --- |
| Dozens or hundreds of nodes of the same device model | [Template-based configuration](./templates/templates.md) |
| Hundreds or thousands of tags within one node | [Batch tag configuration](./import-export/import-export.md) (Excel import/export) |
| Duplicate a configured driver and change only its connection parameters | [Driver duplication](#driver-duplication) |
| Back up a whole instance, or move it to another one | [Southbound device import and export](#southbound-device-import-and-export) |
| Migrate from KEPServerEX, Litmus Edge, and similar platforms | [Driver Migration Tool](./driver-migration-tool.md) |

## Templates compared with driver duplication

Both produce new nodes quickly, but they suit different cases:

| | Template-based configuration | Driver duplication |
| --- | --- | --- |
| Source | A separately maintained template object | An existing running node |
| Reuse | Reusable indefinitely, and exportable to a file for transfer between instances | One node per duplication |
| Suits | Standardized lines where one configuration is deployed repeatedly over time | Adding one or two similar devices ad hoc |

Templates apply to southbound drivers only, not to northbound applications.

## Driver duplication

On the **South Devices** page, click **Copy** on a driver card to create a new node carrying the original node's full configuration, groups, and tags. Change the new node's connection parameters (IP address, slave ID, and so on) afterwards, or both nodes will address the same device.

## Southbound device import and export

Click **Export** at the top right of the **South Devices** page to export every southbound driver configuration and its tags as a JSON file. **Import** restores that file into the same instance or a different one.

Common uses:

- **Configuration backup**: keep a full copy before an upgrade or a migration.
- **Environment promotion**: validate in a test environment, then import the whole configuration into the on-site instance.
- **Master-backup synchronization**: keep the collection configuration identical on both instances — see [Master-Backup Mode](../best-practise/master-backup.md).

::: tip
The output of the [Driver Migration Tool](./driver-migration-tool.md) is imported here as well.
:::

## Configuration limits

Check the per-instance limits before configuring in bulk — see [Data Collection, Processing and Delivery · Configuration specification](./introduction.md#configuration-specification).
