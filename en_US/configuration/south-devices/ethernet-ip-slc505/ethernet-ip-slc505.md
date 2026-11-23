# Allen-Bradley SLC 5/05

The Allen-Bradley SLC 5/05 driver reads and writes PLC data through PCCC encapsulated in EtherNet/IP, connecting directly to the SLC 5/05 CPU's Ethernet interface.

For the generic steps, see [Create a Southbound Driver](../south-devices.md) and [Groups and Tags](../../groups-tags/groups-tags.md).

## Add Driver

On **Data Collection → South Devices**, click **Add Device**, and select the **Allen-Bradley SLC 5/05** driver.

Before using the driver, confirm the following:

- The CPU firmware supports EtherNet/IP, and the host running Neuron can reach the PLC's Ethernet interface.
- Only direct Ethernet connections are supported. Routing through a backplane, DH+, or a DF1 gateway is not supported.
- Legacy CSP/PCCC on TCP port 2222 is not supported. Changing the port does not switch the communication protocol.
- The license includes the SLC 5/05 driver entitlement. A MicroLogix 1400 or AB5000 driver entitlement alone does not grant access.

## Connection Parameters

Click the driver card to open the **Device Configuration** page and fill in:

| Field | Description |
| ----- | ----------- |
| PLC IP Address | IPv4 address of the SLC 5/05 CPU's Ethernet interface |
| PLC Port | EtherNet/IP TCP port, default 44818, range 1–65535 |
| Communication Timeout | TCP send/receive timeout in milliseconds, default 3000, range 100–60000 |

For example, a PLC at `192.168.1.10` uses the following connection parameters:

```json
{
  "host": "192.168.1.10",
  "port": 44818,
  "timeout": 3000
}
```

## Tag Configuration

### Data Types

- INT16
- UINT16
- WORD
- FLOAT
- BIT
- BOOL
- STRING

Word reads accept `INT16`, `UINT16`, or `WORD`. Bit reads accept `BIT` or `BOOL` and require a numeric bit suffix or a named status flag. For example, `B3:0` is a word address and cannot be configured directly as `BOOL`.

### PLC Data Address

Addresses are case-insensitive and use PLC data-file addressing.

Regular data files use `FILE_TYPE FILE_NUMBER:ELEMENT`, without spaces, for example `N7:0`. Append `/BIT` to a word address to select a numeric bit from 0 through 15.

| File Type | Identifier | Address Examples | Data Type |
| --------- | ---------- | ---------------- | --------- |
| Output image | O | `O:2`, `O:2.1`, `O:2.1/3` | Word or bit |
| Input image | I | `I:1`, `I:1.0`, `I:1.0/5` | Word or bit |
| Status | S | `S:1`, `S2:1`, `S:1/15` | Word or bit |
| Binary | B | `B3:0`, `B3:0/5`, `B3/17` | Word or bit |
| Integer | N | `N7:0`, `N7:0/15` | Word or bit |
| Float | F | `F8:0` | FLOAT |
| Timer | T | `T4:0`, `T4:0.PRE`, `T4:0.ACC`, `T4:0/EN` | Word or status flag |
| Counter | C | `C5:0`, `C5:0.PRE`, `C5:0.ACC`, `C5:0/DN` | Word or status flag |
| Control | R | `R6:0`, `R6:0.LEN`, `R6:0.POS`, `R6:0/EN` | Word or status flag |
| String | ST | `ST9:0`, `ST9:0.LEN` | STRING for the whole string; word for LEN |
| ASCII | A | `A10:0`, `A10:0/3` | Word or bit; no automatic text conversion |

- I/O addresses use `I:SLOT.WORD_SUBELEMENT` or `O:SLOT.WORD_SUBELEMENT`. The word sub-element defaults to 0 when omitted. The slot and word sub-element must match the PLC project; the driver does not assume a fixed number of words per I/O module.
- The status file number is fixed at 2. `S:1` and `S2:1` are equivalent.
- Binary files also accept linear bit addressing. `B3/17` selects linear bit 17 in file B3 and is equivalent to `B3:1/1`.

### Timer, Counter, and Control Members

Each T, C, or R record occupies three 16-bit words. A bare record address reads the status word, not the whole structure.

| File Type | First Word | Second Word | Third Word | Named Status Flags and Bit Numbers |
| --------- | ---------- | ----------- | ---------- | ---------------------------------- |
| T | Status | PRE | ACC | EN=15, TT=14, DN=13 |
| C | Status | PRE | ACC | CU=15, CD=14, DN=13, OV=12, UN=11, UA=10 |
| R | Status | LEN | POS | EN=15, EU=14, DN=13, EM=12, ER=11, UL=10, IN=9, FD=8 |

Named status flags accept both `.` and `/` notation. For example, `T4:0.DN` and `T4:0/DN` are equivalent and accept `BIT` or `BOOL`. A numeric bit can also select a member word, for example `T4:0.ACC/0`.

### Strings

Use `ST9:0` with the `STRING` type to read or write a whole string. No length or byte-order suffix is required. An SLC string record contains a 16-bit LEN followed by 82 character bytes. The driver handles character order within each word and returns LEN bytes of content. Empty strings are supported, and the maximum content length is 82 bytes.

Use `ST9:0.LEN` with a word type such as `UINT16` to read or write the length separately. Length writes must be between 0 and 82 and do not update the character content. An out-of-range LEN or incomplete response is reported as an error rather than silently truncated.

### Writing Data

Output image (O), binary (B), integer (N), float (F), timer (T), counter (C), control (R), string (ST), and ASCII (A) files support writes, subject to the PLC's access permissions.

- Write words using `INT16`, `UINT16`, or `WORD`, and floating-point values using `FLOAT`.
- Write bits using `BIT` or `BOOL`. `BIT` values must be 0 or 1. The driver uses PCCC masked writes to modify only the selected bit and preserve other bits in the word, rather than reading and rewriting the whole word.
- Write timer, counter, and control members individually, for example `T4:0.PRE`, `C5:0.ACC`, or `R6:0.POS`. Writing a bare record address changes only the status word, not the whole structure.
- A string write updates both LEN and the character content. Overlength strings are rejected, not truncated.

Configure the following tags as **Read/Write** to send values from the data monitoring page and check the readback in a subsequent polling cycle:

| Address | Data Type | Example Value |
| ------- | --------- | ------------- |
| `N7:0` | INT16 | `111` |
| `F8:0` | FLOAT | `12.5` |
| `B3:0/5` | BOOL | `true` |
| `ST9:0` | STRING | `hello` |

Before writing, confirm that modifying the target data is permitted by the PLC application. Output images, record members, and status flags may be updated again by the PLC program during its scan. The driver does not automatically replay a write after a timeout or disconnect. Check the current PLC value before deciding whether to write again.

### Example of Tag Configuration

Set all tags below to **Read**. Adjust file and element numbers to match the actual PLC project.

| Address | Data Type | Description |
| ------- | --------- | ----------- |
| `O:2.1` | WORD | Word sub-element 1 of output image slot 2 |
| `I:1.0/5` | BOOL | Bit 5 of word sub-element 0 in input image slot 1 |
| `S2:1` | WORD | Element 1 of status file 2 |
| `B3:0` | WORD | Element 0 of binary file 3, read as a whole 16-bit word |
| `B3/17` | BIT | Linear bit 17 in binary file 3, equivalent to `B3:1/1` |
| `N7:0` | INT16 | Element 0 of integer file 7 |
| `N7:0/15` | BOOL | Bit 15 of element 0 in integer file 7 |
| `F8:0` | FLOAT | Element 0 of float file 8 |
| `T4:0.PRE` | INT16 | Preset value of timer 0 |
| `T4:0.ACC` | INT16 | Accumulated value of timer 0 |
| `T4:0/DN` | BOOL | Done flag of timer 0 |
| `C5:0.ACC` | INT16 | Accumulated value of counter 0 |
| `R6:0.POS` | UINT16 | Position value of control record 0 |
| `ST9:0` | STRING | Element 0 of string file 9 |
| `ST9:0.LEN` | UINT16 | Length of element 0 in string file 9 |
| `A10:0` | WORD | Element 0 of ASCII file 10, returned as a raw word |
