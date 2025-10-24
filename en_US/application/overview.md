# Application Integration

EMQX Neuron's (formerly NeuronEX) application integration module is designed to extend the platform's core functionality by seamlessly connecting with third-party services and tools, providing greater flexibility and scalability for your Industrial IoT solutions. It allows you to easily connect data collected and processed by EMQX Neuron with other systems, enabling more complex data processing, custom application logic, and broader ecosystem integration.

Whether you want to leverage existing open-source tools for advanced data flow orchestration or need to integrate EMQX Neuron data into specific enterprise applications, the application integration module provides convenient pathways.

## Core Functional Components

The application integration module currently includes the following core functional components:

*   **[Node-RED Integration](./nodered.md):**
    *   EMQX Neuron integrates the popular open-source visual programming tool Node-RED (v4.0.9) by default in specific Docker image versions.
    *   Users can directly enable the Node-RED service in EMQX Neuron's "Application List" and create and manage data processing flows through its graphical interface.
    *   Supports real-time pushing of data tags or processing results to Node-RED through EMQX Neuron's northbound Websocket application or the REST Sink of the data processing module.
    *   Allows users to leverage Node-RED's extensive node library for complex data transformation, logical judgment, integration with other services (such as databases, message queues, API calls, etc.), and building custom dashboards or alert notifications.