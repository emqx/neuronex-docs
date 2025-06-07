# Data Insights

The Data Insights module in NeuronEX is your core tool for understanding industrial historical data and discovering its value. It integrates powerful data querying, interactive analysis, and customizable visualization dashboard features, helping you easily understand equipment behavior, optimize production processes, and make smarter decisions based on data.

Whether you need to delve deep into the root causes of specific events or wish to continuously monitor Key Performance Indicators (KPIs), the Data Insights module provides robust support.

## Core Functional Components

The Data Insights module primarily consists of the following two core functional components:

*   **[Data Analysis](./data_analysis.md):**
    *   A unified interface that allows you to browse stored data points through an intuitive tree directory.
    *   Provides an intelligent SQL editor with syntax highlighting and keyword suggestions, enabling you to accurately query the data you need.
    *   Integrates an AI Data Analysis Assistant that can drive the generation and iterative correction of complex SQL queries through natural language, significantly lowering the barrier to data querying.
    *   Query results can be flexibly displayed in table or chart form, with support for chart interactions (zoom, download).

*   **[Dashboards](./dashboards.md):**
    *   Allows you to create and customize personalized data visualization dashboards.
    *   By configuring multiple Panels, with each Panel bound to one or more SQL queries, key data can be centrally displayed in various forms such as line charts, bar charts, statistical values, or tables.
    *   Supports flexible time range selection and automatic refresh mechanisms, ensuring you always focus on the latest data dynamics.
    *   Create views that best suit your monitoring needs by dragging and dropping to adjust Panel layout and size.

## Why Use the Data Insights Module?

*   **Deeply Understand Historical Data:** Trace back historical events and analyze equipment performance trends using flexible query and analysis tools.
*   **Quickly Identify Issues:** Rapidly find data anomalies and potential problems by combining AI assistance with intuitive chart displays.
*   **Drive Optimization Decisions:** Discover opportunities for process improvement, energy efficiency enhancement, and maintenance optimization based on data analysis results.
*   **Real-time Situational Awareness:** Build a real-time monitoring center using customizable dashboards to grasp key operational indicators.
*   **Lower the Barrier to Data Usage:** The AI Data Analysis Assistant enables users unfamiliar with SQL to easily extract value from data.

## Getting Started

Starting from NeuronEX v3.6.0, the **Datalayers time-series database is integrated by packaging**. This means various installation package forms, such as `deb`, `rpm`, `zip`, `docker`, etc., have the Datalayers time-series database built-in.

To start using the Data Insights module:

1.  Ensure you have enabled [Time-Series Data Storage](../admin/sys-configuration.md#data-storage-configuration) in NeuronEX. Datalayers does not start with NeuronEX by default. You need to enable this service as needed in NeuronEX's system configuration.
2.  Enable the northbound DataStorage plugin and add subscriptions for the southbound data tags you want to store to this plugin.
3.  Explore the [**Data Analysis**](./data_analysis.md) page to browse data tags, write SQL queries, or use the AI Data Analysis features.
4.  Learn how to create and configure your first **[Dashboards](./dashboards.md)** to monitor the metrics you care about most.

Unleash the true potential of your industrial data with NeuronEX's Data Insights module!