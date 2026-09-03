# FAQ

## The device can ping through, but EMQX Neuron shows that the connection is broken

* PLC TCP mode only runs one port for one connection, so make sure that only one of EMQX Neuron's device connections is being accessed.