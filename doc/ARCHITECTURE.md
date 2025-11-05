# DataSunrise Architecture Overview

This document describes the two primary components of DataSunrise and their responsibilities:

## Core

- **Purpose**: Processes all live database traffic received through Proxy, Sniffer, Trailing, or Agent.  
- **Tasks**: 
  - **Auditing**: Captures and logs SQL statements based on configured rules.  
  - **Masking**: Dynamically redacts or transforms sensitive data in query results.  
  - **Blocking**: Prevents prohibited operations from executing.  
- **Caching**:
  - **Metadata Cache**: Loads and caches database schema and metadata; memory usage scales with metadata volume.  
  - **Query Cache**: Tracks recognized SQL queries in traffic to speed up repeated processing.

## Backend

- **Purpose**: Manages DataSunrise configuration and performs auxiliary service tasks.  
- **Tasks**:
  - **Configuration Management**: Reads, writes, and validates security policies, rules, and schedules.  
  - **Reporting**: Generates and delivers audit/security/masking reports (via SMTP or other channels).  
  - **Metadata Updates**: Refreshes database metadata in response to schema changes or scheduled scans.  
  - **Data Discovery**: Runs periodic scans to discover sensitive data based on defined attributes.  
- **Workflow**: Operates outside the live traffic path; scheduled or on-demand operations only.

---

By separating traffic-processing (Core) from configuration/service tasks (Backend), DataSunrise ensures high performance for live database protection while maintaining robust administrative and reporting functions.
