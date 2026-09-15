# Master-Backup Mode

## How it works

Deploy EMQX Neuron on two servers and let Keepalived handle failure detection and failover. If the EMQX Neuron service on the primary node fails, or the whole server goes down, the backup node takes over; when the primary recovers, the role switches back.

<style>
.nxm            { width: 100%; height: auto; display: block; margin: 24px 0; }
.nxm .t         { font-family: -apple-system, "Segoe UI", "Helvetica Neue", Arial, sans-serif; fill: #1f2d3d; }
.nxm .h         { font-size: 15px; font-weight: 600; }
.nxm .m         { font-size: 14px; font-weight: 600; }
.nxm .sub       { font-size: 12px; fill: #4a5b6e; }
.nxm .tiny      { font-size: 11.5px; fill: #6b7c8f; }
.nxm .lbl       { font-size: 12px; font-weight: 600; fill: #2a6ebb; }
.nxm .on        { fill: #00b173; font-size: 13px; font-weight: 600; }
.nxm .off       { fill: #8b98a6; font-size: 13px; font-weight: 600; }
.nxm .bg        { fill: #f7fafd; }
.nxm .box       { fill: #ffffff; stroke: #ccd8e4; stroke-width: 1.5; }
.nxm .node      { fill: #eaf2fb; stroke: #2a6ebb; stroke-width: 2; }
.nxm .nodeoff   { fill: #f2f5f8; stroke: #a9b8c7; stroke-width: 2; stroke-dasharray: 6 4; }
.nxm .card      { fill: #ffffff; stroke: #ccd8e4; stroke-width: 1.5; }
.nxm .flow      { stroke: #2a6ebb; stroke-width: 2; }
.nxm .idle      { stroke: #a9b8c7; stroke-width: 2; stroke-dasharray: 6 4; }
.nxm .vrrp      { stroke: #00b173; stroke-width: 2; }
.nxm .ah        { fill: #2a6ebb; }
.nxm .ah-i      { fill: #a9b8c7; }
.nxm .ah-v      { fill: #00b173; }

html.dark .nxm .t       { fill: #d7dee6; }
html.dark .nxm .sub     { fill: #9db0c4; }
html.dark .nxm .tiny    { fill: #8496a8; }
html.dark .nxm .lbl     { fill: #7fb4ea; }
html.dark .nxm .on      { fill: #3ecf9a; }
html.dark .nxm .off     { fill: #7d8b99; }
html.dark .nxm .bg      { fill: #161c24; }
html.dark .nxm .box     { fill: #1d2631; stroke: #3b4857; }
html.dark .nxm .node    { fill: #1a2938; stroke: #5a9fe0; }
html.dark .nxm .nodeoff { fill: #1a1f27; stroke: #4a5866; }
html.dark .nxm .card    { fill: #1d2631; stroke: #3b4857; }
html.dark .nxm .flow    { stroke: #7fb4ea; }
html.dark .nxm .idle    { stroke: #56646f; }
html.dark .nxm .vrrp    { stroke: #3ecf9a; }
html.dark .nxm .ah      { fill: #7fb4ea; }
html.dark .nxm .ah-i    { fill: #56646f; }
html.dark .nxm .ah-v    { fill: #3ecf9a; }
</style>

<svg class="nxm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1060 430" role="img" aria-label="Master-backup topology: on the primary node Keepalived is MASTER with priority 100 and EMQX Neuron is running, collecting from field devices and forwarding upstream; on the backup node Keepalived is BACKUP with priority 90 and nopreempt enabled, and EMQX Neuron is stopped; the two nodes exchange VRRP unicast advertisements, and the backup takes over when the primary fails">
  <defs>
    <marker id="nxmA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="ah" d="M0 0 L10 5 L0 10 z"/></marker>
    <marker id="nxmI" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="ah-i" d="M0 0 L10 5 L0 10 z"/></marker>
    <marker id="nxmV" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="ah-v" d="M0 0 L10 5 L0 10 z"/></marker>
  </defs>
  <rect class="bg" x="0" y="0" width="1060" height="430" rx="10"/>

  <rect class="box" x="24" y="80" width="150" height="280" rx="8"/>
  <text class="t h" x="99" y="200" text-anchor="middle">Field devices</text>
  <text class="t sub" x="99" y="226" text-anchor="middle">PLC · CNC · meters</text>

  <line class="flow" x1="182" y1="115" x2="242" y2="115" marker-end="url(#nxmA)"/>
  <text class="t lbl" x="212" y="104" text-anchor="middle">Collect</text>
  <line class="idle" x1="182" y1="325" x2="242" y2="325" marker-end="url(#nxmI)"/>
  <text class="t tiny" x="212" y="314" text-anchor="middle">on failover</text>

  <rect class="node" x="250" y="40" width="520" height="150" rx="10"/>
  <text class="t h" x="510" y="66" text-anchor="middle">Primary  10.0.0.127</text>
  <rect class="card" x="270" y="82" width="230" height="90" rx="6"/>
  <text class="t m" x="385" y="106" text-anchor="middle">Keepalived</text>
  <text class="t sub" x="385" y="128" text-anchor="middle">MASTER · priority 100</text>
  <text class="t tiny" x="385" y="150" text-anchor="middle">check_alive.sh every 5s</text>
  <rect class="card" x="520" y="82" width="230" height="90" rx="6"/>
  <text class="t m" x="635" y="112" text-anchor="middle">EMQX Neuron</text>
  <text class="t on" x="635" y="140" text-anchor="middle">● running</text>

  <line class="vrrp" x1="385" y1="196" x2="385" y2="244" marker-start="url(#nxmV)" marker-end="url(#nxmV)"/>
  <text class="t sub" x="404" y="216" >VRRP unicast</text>
  <text class="t tiny" x="404" y="236" >every 1s</text>

  <rect class="nodeoff" x="250" y="250" width="520" height="150" rx="10"/>
  <text class="t h" x="510" y="276" text-anchor="middle">Backup  10.0.0.223</text>
  <rect class="card" x="270" y="292" width="230" height="90" rx="6"/>
  <text class="t m" x="385" y="316" text-anchor="middle">Keepalived</text>
  <text class="t sub" x="385" y="338" text-anchor="middle">BACKUP · priority 90</text>
  <text class="t tiny" x="385" y="360" text-anchor="middle">nopreempt</text>
  <rect class="card" x="520" y="292" width="230" height="90" rx="6"/>
  <text class="t m" x="635" y="322" text-anchor="middle">EMQX Neuron</text>
  <text class="t off" x="635" y="350" text-anchor="middle">○ stopped</text>

  <line class="flow" x1="778" y1="115" x2="838" y2="115" marker-end="url(#nxmA)"/>
  <text class="t lbl" x="808" y="104" text-anchor="middle">Forward</text>
  <line class="idle" x1="778" y1="325" x2="838" y2="325" marker-end="url(#nxmI)"/>

  <rect class="box" x="846" y="80" width="150" height="280" rx="8"/>
  <text class="t h" x="921" y="200" text-anchor="middle">Upstream</text>
  <text class="t sub" x="921" y="226" text-anchor="middle">MQTT · SCADA</text>
</svg>

::: warning The two nodes are mutually exclusive
**Only one node collects data at a time.** The backup keeps its EMQX Neuron service stopped and starts it only when taking over. Running both at once produces duplicate collection. This is also why a short window of data loss and duplication exists around a switchover — see [Data loss and duplication](#data-loss-and-duplication).
:::

## Environment

| Item | Requirement |
| --- | --- |
| Servers | 2, one primary and one backup |
| Resources per server | At least 1 CPU core and 1 GB memory |
| Operating system | Ubuntu 18.04 or later, or CentOS 7 or later |
| Software | EMQX Neuron (deb, rpm, or Docker) and Keepalived |
| Network | Internal connectivity between the two nodes; security groups and firewalls must allow VRRP and the EMQX Neuron service port |

The examples below use two Ubuntu 22.04 x86_64 servers:

| Role | Internal IP | Interface |
| --- | --- | --- |
| Primary | `10.0.0.127` | `eth0` |
| Backup | `10.0.0.223` | `eth0` |

Replace the IP addresses and interface names in the configuration with your own.

## Installing and configuring EMQX Neuron

### Installation

Install EMQX Neuron on both nodes — see [Installing from a Package](../installation/package.md) or [Docker](../installation/docker.md). Then enable it at boot:

```bash
sudo systemctl enable neuronex
```

### Configuring data collection

Both nodes need an **identical** collection setup so the backup can take over seamlessly.

1. Configure collection on the primary — for example a Modbus TCP southbound driver — and confirm it collects data.
2. Copy `/opt/neuronex/data/` from the primary to the same path on the backup, overwriting what is there. You can also configure the backup by hand.
3. Stop the EMQX Neuron service on the backup to reach the initial state of "primary running, backup standing by":

   ```bash
   sudo systemctl stop neuronex
   ```

::: tip
Configuration is **not synchronized automatically** between the two nodes. When the primary's configuration changes later, sync it manually — see [Configuration file synchronization](#configuration-file-synchronization).
:::

## Keepalived Installation and Configuration

### Keepalived Installation
Install Keepalived on both the master and backup nodes:

```bash
# Install Keepalived
sudo apt-get install keepalived
```


### Keepalived Configuration on Master Node

Create `keepalived.conf`, `master.sh`, `fault.sh`, `check_alive.sh` files in the `/etc/keepalived/` directory of the master node.

1. Configure Keepalived on the master node, the configuration file is `/etc/keepalived/keepalived.conf`, the content is as follows:

```shell
! Configuration File for keepalived
global_defs {
   vrrp_skip_check_adv_addr
   #vrrp_strict
   vrrp_garp_interval 0
   vrrp_gna_interval 0
}

# Define the script content for the instance execution
vrrp_script check_ex_alived {
        script "/etc/keepalived/check_alive.sh"
        interval 5
        fall 3 # require 3 failures for KO
}


# Define a virtual router instance
vrrp_instance VI_1 {
    # Define the initial state, which can be MASTER or BACKUP
    state MASTER
    # nopreempt
    # Define the working interface
    interface eth0

    virtual_router_id 51
	# Define the weight
    priority 100
	# Define the advert frequency, unit is second
    advert_int 1
	# Define the communication authentication mechanism
    authentication {
        auth_type PASS
        auth_pass abcdefgh
    }

    # Define the virtual VIP address, which is not used
    virtual_ipaddress {
        192.160.127.254/17
    }
    unicast_peer {
        10.0.0.223  # Backup node IP address
    }
    # Track script, usually used to execute the script content defined in the vrrp_script
    track_script {
        check_ex_alived
    }

    # Notify script, which will be executed after the host state becomes Master|Backup|Fault
    notify_fault "/etc/keepalived/fault.sh"
    notify_master "/etc/keepalived/master.sh"
}

```

::: tip

Since the IP address of the backup node in this example is `10.0.0.223`, `unicast_peer` in the keepalived.conf file is `10.0.0.223`, please modify it according to actual conditions.

Since the network card bound to the host IP address `10.0.0.127` is `eth0`, `interface` in the keepalived.conf file is `eth0`. Please modify it according to the actual situation.

:::


2. Configure `master.sh` script on the master node, the configuration file directory is `/etc/keepalived/master.sh`, the content is as follows:

```shell
#!/bin/bash

systemctl start neuronex
```

3. Configure `fault.sh` script on the master node, the configuration file directory is `/etc/keepalived/fault.sh`, the content is as follows:

```shell
#!/bin/bash

systemctl stop neuronex
```

4. Configure `check_alive.sh` script on the master node, the configuration file directory is `/etc/keepalived/check_alive.sh`, the content is as follows:

```shell
#!/bin/bash

if ! curl 127.0.0.1:8085  >/dev/null 2>&1; then echo "neuronex start failed"; exit 1; fi
```

5. Start Keepalived on the master node

```shell
sudo systemctl start keepalived

# Set to start automatically on boot
sudo systemctl enable keepalived
```


### Configuring Keepalived on the backup node

The backup node's `keepalived.conf` is **mostly the same** as the primary's. Copy it over and change the following:

| Setting | Primary | Backup |
| --- | --- | --- |
| `state` | `MASTER` | `BACKUP` |
| `priority` | `100` | `90` |
| `nopreempt` | commented out (preemption on) | enabled |
| `unicast_peer` | `10.0.0.223` (the peer) | `10.0.0.127` (the peer) |
| `vrrp_script` / `track_script` | required | **remove** — the backup does not monitor its own service |
| Notify scripts | `notify_fault` + `notify_master` | `notify_master` + `notify_backup` |

The resulting `vrrp_instance` block on the backup:

```shell
vrrp_instance VI_1 {
    state BACKUP
    nopreempt
    interface eth0
    virtual_router_id 51
    priority 90
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass abcdefgh
    }
    virtual_ipaddress {
        192.160.127.254/17
    }
    unicast_peer {
        10.0.0.127  # the primary node's IP
    }
    notify_master "/etc/keepalived/master.sh"
    notify_backup "/etc/keepalived/backup.sh"
}
```

The backup needs only two scripts in `/etc/keepalived/`:

| Script | Contents | When it runs |
| --- | --- | --- |
| `master.sh` | `systemctl start neuronex` | The backup is promoted to MASTER and starts serving |
| `backup.sh` | `systemctl stop neuronex` | The backup is demoted to BACKUP and stands down |

Start Keepalived and enable it at boot:

```bash
sudo systemctl start keepalived
sudo systemctl enable keepalived
```

## Master-Backup Switch Logic

After the above configuration steps, both the master and backup nodes have started the Keepalived service, and the master node is in the `MASTER` state, and the backup node is in the `BACKUP` state. The master node EMQX Neuron service is running normally, and the backup node EMQX Neuron service is stopped. When the following situations occur:

1. **Master Node EMQX Neuron Service Failure**

  - Fault detection:

    Keepalived periodically executes the `check_alive.sh` script through vrrp_script to detect the status of the EMQX Neuron service.

    If the `check_alive.sh` script detects that the EMQX Neuron service fails, it returns a failure status.

    Keepalived confirms the service failure within the specified time (15 seconds in this example) based on the interval and fall parameters.

  - Priority adjustment:

    Keepalived lowers the priority of the master node.

    Keepalived executes the `fault.sh` script to stop the master node EMQX Neuron service.

    The master node sends a VRRP announcement, announcing its new priority.

  - Backup node switch:

    The backup node receives the VRRP announcement from the master node and finds that the priority of the master node is lower than its own priority (for example, 0 < 90).

    The backup node switches to the `MASTER` state.

    The backup node executes the `master.sh` script to start the EMQX Neuron service and take over the workload of the master node.


2. **Master Node Server Failure**

  - Fault detection:

    The master node server completely crashes, and both Keepalived and EMQX Neuron stop running.

    The master node cannot send a VRRP announcement, and the backup node cannot receive the status information from the master node.

  - Backup node switch:

    The backup node does not receive the VRRP announcement from the master node within the advert_int * 3 time (3 seconds in this example), and considers the master node to be faulty.

    The backup node automatically switches to the `MASTER` state.

    The backup node executes the `master.sh` script to start the EMQX Neuron service and take over the workload of the master node.


3. **Master Node Recovery**

  - Service recovery:

    The EMQX Neuron service of the master node recovers, and the `check_alive.sh` script detects that the EMQX Neuron is running normally, returning a successful status.

    Keepalived restores the priority of the master node.

    The master node sends a VRRP announcement, announcing its priority.

  - Master node becomes `MASTER`:

    The backup receives the primary's VRRP advertisement, sees that its priority (100) is higher than its own (90), and steps down to `BACKUP`.

    The backup runs `backup.sh` to stop its own EMQX Neuron service.

    The primary becomes `MASTER` again and takes over the workload.

::: tip About preemption
On the primary, `nopreempt` is commented out, so **preemption is on** — once it recovers, its higher priority wins `MASTER` back automatically.

On the backup, `nopreempt` **is** enabled, which stops it from seizing `MASTER` from a primary that is already running when Keepalived starts.

If you would rather the primary not take over automatically — to avoid the data churn of a second switchover — uncomment `nopreempt` on the primary as well.
:::


## Test and Verification

### Simulate Master Node EMQX Neuron Service Failure

1. Stop the master node EMQX Neuron service through the following command:

    ```shell
    sudo systemctl stop neuronex
    ```

2. Check the EMQX Neuron status of the master node and the backup node through the following command:

    ```shell
    sudo systemctl status neuronex
    ```

3. Access the backup node EMQX Neuron Dashboard page, the backup node EMQX Neuron service runs normally, and the southbound driver collects data normally. Access the master node EMQX Neuron Dashboard page, the master node EMQX Neuron service stops.

    - Backup node EMQX Neuron service runs normally
![alt text](_assets/backup_run.png)

    - Master node EMQX Neuron service stops
![alt text](_assets/master_down.png)

### Simulate Master Node Server Failure

1. Turn off the master node server, and check the EMQX Neuron status of the backup node through the following command:

    ```shell
    sudo systemctl status neuronex
    ```

2. Access the backup node EMQX Neuron Dashboard page, the backup node EMQX Neuron service runs normally, and the southbound driver collects data normally. Access the master node EMQX Neuron Dashboard page, the master node EMQX Neuron service stops.


### Master Node Recovery

1. Power on the master node server. Because Keepalived and EMQX Neuron were configured to start automatically in the previous steps, the master node starts both services on boot. Check the EMQX Neuron status of the master node through the following command:

    ```shell
    sudo systemctl status neuronex
    ```

2. Access the master node EMQX Neuron Dashboard page, the master node EMQX Neuron service runs normally.

3. Access the backup node EMQX Neuron Dashboard page, the backup node EMQX Neuron service has stopped.


## Other Notes

### Deployment Mode

This guide deploys with systemd, so the scripts use `systemctl`.

With a Docker deployment, swap the commands in `master.sh`, `backup.sh`, and `fault.sh` for their Docker equivalents:

| Script | systemd | Docker |
| --- | --- | --- |
| `master.sh` | `systemctl start neuronex` | `docker start neuronex` |
| `backup.sh` / `fault.sh` | `systemctl stop neuronex` | `docker stop neuronex` |

### Configuration file synchronization

The master-backup mode does not support automatic synchronization of configuration files between the master and backup EMQX Neuron. If you need the configuration files of the master and backup EMQX Neuron to be consistent, you need to manually synchronize the configuration files.

If the configuration file of the master node EMQX Neuron has changed after running for a period of time, and you do not want to start both the master and backup EMQX Neuron services at the same time (this will cause duplicate data collection), then you can manually synchronize the configuration file while keeping the backup node EMQX Neuron service stopped:

- Package installation Mode:  

    Copy the configuration file `/opt/neuronex/data/` of the master node EMQX Neuron to the same directory of the backup node.

- Docker deployment Mode:

    Copy the configuration file `/opt/neuronex/data/` of the master node EMQX Neuron to the directory mounted to the host by the docker container.


### Data loss and duplication

To build a complete high-availability function for EMQX Neuron, the complete high-availability means that any single EMQX Neuron node failure will not lose or duplicate data. This requires configuring three EMQX Neuron services, implementing data high availability through distributed databases and cluster modes. This method requires a high cost and requires the factory equipment and network to support high availability to be fully effective. In actual factory scenarios, it is often difficult to meet this condition, that is, the PLC does not support master-backup or the factory network does not support master-backup, and there is still a single point of failure, which cannot achieve full data link high availability.

The high-availability solution in the current example still has some data loss or duplication issues.

About the data loss issue, when the EMQX Neuron on the master node fails, keepalived needs some time to detect it, where the detection interval and failure count can be configured, as follows:

```shell

vrrp_script check_ex_alived {
        script "/etc/keepalived/check_alive.sh"
        interval 5
        fall 3 # require 3 failures for KO
}
```

The current configuration is to detect every 5 seconds and trigger the master-backup switch after 3 failures. Therefore, during this period, the EMQX Neuron on both the `MASTER` and `BACKUP` nodes is not running, resulting in short-term data loss.

In addition, about the data duplication issue, after the master node recovers, the backup node detects the master node recovery and stops its own EMQX Neuron, so there will be a short period of time when both nodes' EMQX Neuron are running, causing short-term duplicate data collection.

## Common Issues


- You can use the `ping` command to check if the master and backup nodes are communicating normally.

- You can check the status of the master and backup nodes and whether they are switching normally by viewing the keepalived log.

    ```shell
    journalctl -u keepalived -f
    ``` 

- Master node log example:
![alt text](_assets/master_log.png)


- Backup node log example:
![alt text](_assets/backup_log.png)
