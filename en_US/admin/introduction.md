# Operations

This section is for the administrators and operators who maintain EMQX Neuron day to day, organized by operational task.

## Signing in to the console

Open `http://<gateway address>:8085` in a browser and sign in with the default account **admin** / **0000**. The port can be changed in the startup parameters — see [Startup Parameters and Configuration Files](./conf-management.md).

If the page does not open, check in order:

```bash
ping <gateway address>            # is the host reachable
telnet <gateway address> 8085     # is the port open
systemctl status neuronex         # is the service running
```

In production, change the default password and create read-only accounts as needed — see [User Management](./user.md).

## Routine checks

| What to watch | Where |
| --- | --- |
| Node link states, collection and forwarding volume, rule status | [Operation Monitoring](./data-statistics.md) |
| Automatic notification of driver disconnects, rule failures, and instance restarts | [Monitoring and Alert Management](./alert-monitor-management.md) |
| Tags failing to collect | [Data Monitoring and Device Control](./monitoring.md) |
| Disk usage and log rotation | [Log Management](./log-management.md) |

## Upgrades and backups

1. Take a backup first — see [Backup and Restore](./backup-restore.md).
2. An upgrade does not overwrite `/opt/neuronex/data`. For package upgrades see [Install from a Package · Upgrading](../installation/package.md#upgrading); for containers see [Deploy with Docker](../installation/docker.md).
3. After upgrading, confirm that southbound and northbound nodes return to **Running** and **Connected**, and that rules are healthy.

## Troubleshooting

| Symptom | Where to look |
| --- | --- |
| No data from a device | [Diagnosing a connection](../configuration/south-devices/south-devices.md#diagnosing-a-connection), then the read error counters in [Operation Monitoring](./data-statistics.md) |
| Data is not being forwarded | Confirm the northbound application is running and the subscription exists — see [Subscribe to Southbound Data · Verify](../configuration/subscription.md#verify) |
| A rule produces no output | [Rule testing](../streaming-processing/rule_test.md) |
| Filing a support ticket | Download the logs — see [Log Management](./log-management.md) |

## Configuration and permissions

- [System Configuration](./sys-configuration.md): data processing engine, SSO, network connection test, tracing, backup and restore
- [Startup Parameters and Configuration Files](./conf-management.md): command line, environment variables, configuration files, HTTPS
- [Data Directory and Persistence](./data-persistence.md): directory layout and mounting
- [User Management](./user.md): accounts, roles, and permissions

## High availability

Two instances form a master-backup pair through Keepalived, with the virtual IP failing over automatically when the master goes down. See [Master-Backup Mode](../best-practise/master-backup.md).

## Further reading

For API calls, error codes, measured performance figures, and common questions, see [Reference and Support](../reference/overview.md). For end-to-end walkthroughs of specific scenarios, see [Tutorials and Best Practices](../best-practise/overview.md).
