# Ukrainian Statistics MCP - Usage Examples

This document provides step-by-step examples for common use cases.

## Example 1: Exploring Energy Statistics

### Step 1: List All Available Dataflows

**Natural Language Query**:
```
List all available dataflows from Ukrainian statistics
```

**Tool Call**:
```json
{
  "name": "list_dataflows",
  "arguments": {
    "detail": "full"
  }
}
```

**What to Look For**:
In the response, find dataflows related to energy. You'll see entries like:
```xml
<Dataflow 
  agencyID="SSSU" 
  id="DF_SUPPLY_USE_ENERGY" 
  version="14.0.0">
  <Name xml:lang="uk">Постачання та використання енергії</Name>
  <Name xml:lang="en">Supply and use of energy</Name>
</Dataflow>
```

---

### Step 2: Get Dataflow Details

**Natural Language Query**:
```
Get detailed information about the energy supply and use dataflow DF_SUPPLY_USE_ENERGY
```

**Tool Call**:
```json
{
  "name": "get_dataflow",
  "arguments": {
    "dataflow_id": "DF_SUPPLY_USE_ENERGY",
    "agency_id": "SSSU"
  }
}
```

**What to Look For**:
- Dataflow name in Ukrainian and English
- Reference to the Data Structure Definition (DSD)
- Latest version number

---

### Step 3: Get Data Structure Definition

**Natural Language Query**:
```
Get the data structure for DSD_SUPPLY_USE_ENERGY to understand dimensions
```

**Tool Call**:
```json
{
  "name": "get_data_structure",
  "arguments": {
    "dsd_id": "DSD_SUPPLY_USE_ENERGY",
    "agency_id": "SSSU",
    "references": "descendants"
  }
}
```

**What to Look For**:
- **Dimensions**: The filters you can use (e.g., INDICATOR, YEAR, REGION)
- **Attributes**: Additional metadata (e.g., UNIT, STATUS)
- **Codelists**: References to allowed values for each dimension

Example dimension:
```xml
<Dimension id="INDICATOR" position="0">
  <LocalRepresentation>
    <Enumeration>
      <Ref id="CL_SUPPLY_USE_ENERGY_INDICATOR" />
    </Enumeration>
  </LocalRepresentation>
</Dimension>
```

---

### Step 4: Get Codelist Values

**Natural Language Query**:
```
Get all indicator values from codelist CL_SUPPLY_USE_ENERGY_INDICATOR
```

**Tool Call**:
```json
{
  "name": "get_codelist",
  "arguments": {
    "codelist_id": "CL_SUPPLY_USE_ENERGY_INDICATOR",
    "agency_id": "SSSU"
  }
}
```

**What to Look For**:
- Code IDs (e.g., `ELECTRICITY_USE`, `ENERGY_PRODUCTION`)
- Ukrainian and English names
- Hierarchical structure (if any)

Example code:
```xml
<Code id="ELECTRICITY_USE">
  <Name xml:lang="uk">Обсяг використаної електроенергії</Name>
  <Name xml:lang="en">Amount of electricity used</Name>
</Code>
```

---

### Step 5: Retrieve Actual Data

**Natural Language Query**:
```
Get electricity usage data from DF_SUPPLY_USE_ENERGY for years 2020 to 2023
```

**Tool Call**:
```json
{
  "name": "get_data",
  "arguments": {
    "resource_id": "DF_SUPPLY_USE_ENERGY",
    "agency_id": "SSSU",
    "version": "14.0.0",
    "start_period": "2020",
    "end_period": "2023",
    "dimension_filters": {
      "INDICATOR": "ELECTRICITY_USE"
    }
  }
}
```

---

## Example 2: Working with Time Periods

### Getting Annual Data

```json
{
  "name": "get_data",
  "arguments": {
    "resource_id": "DF_SUPPLY_USE_ENERGY",
    "start_period": "2020",
    "end_period": "2023",
    "dimension_filters": {
      "FREQ": "A"
    }
  }
}
```

### Getting Monthly Data

```json
{
  "name": "get_data",
  "arguments": {
    "resource_id": "DF_SUPPLY_USE_ENERGY",
    "start_period": "2023-01",
    "end_period": "2023-12",
    "dimension_filters": {
      "FREQ": "M"
    }
  }
}
```

---

## Example 3: Checking Data Availability

Before requesting large datasets, check what's available:

**Natural Language Query**:
```
Check what data is available for DF_SUPPLY_USE_ENERGY
```

**Tool Call**:
```json
{
  "name": "check_data_availability",
  "arguments": {
    "resource_id": "DF_SUPPLY_USE_ENERGY",
    "agency_id": "SSSU",
    "version": "14.0.0"
  }
}
```

This returns available dimension values without the actual data.

---

## Example 4: Multiple Dimension Filters

Get specific data with multiple filters:

**Natural Language Query**:
```
Get annual electricity production data for Ukraine from 2015 to 2023
```

**Tool Call**:
```json
{
  "name": "get_data",
  "arguments": {
    "resource_id": "DF_SUPPLY_USE_ENERGY",
    "start_period": "2015",
    "end_period": "2023",
    "dimension_filters": {
      "FREQ": "A",
      "INDICATOR": "ENERGY_PRODUCTION",
      "REF_AREA": "UA"
    }
  }
}
```

---

## Example 5: Wildcard Queries

Use wildcards to get all data:

**Tool Call**:
```json
{
  "name": "get_data",
  "arguments": {
    "resource_id": "DF_SUPPLY_USE_ENERGY",
    "key": "*",
    "start_period": "2023"
  }
}
```

This retrieves all available data for 2023 across all dimensions.

---

## Example 6: Exploring All Statistics Domains

**Step-by-Step Workflow**:

1. **List all dataflows**
   ```
   Show me all available statistical datasets
   ```

2. **Filter by topic** (in your query)
   ```
   Which dataflows are related to demographics or population?
   ```

3. **Get structure** for interesting dataflow
   ```
   What dimensions are available in the population dataflow?
   ```

4. **Retrieve data**
   ```
   Get population data by region for 2020-2023
   ```

---

## Common Filter Patterns

### By Frequency
```json
"dimension_filters": {
  "FREQ": "A"  // Annual
}
```

```json
"dimension_filters": {
  "FREQ": "M"  // Monthly
}
```

```json
"dimension_filters": {
  "FREQ": "Q"  // Quarterly
}
```

### By Geographic Area
```json
"dimension_filters": {
  "REF_AREA": "UA"  // Ukraine
}
```

### By Indicator
```json
"dimension_filters": {
  "INDICATOR": "GDP"
}
```

### Combined Filters
```json
"dimension_filters": {
  "FREQ": "A",
  "REF_AREA": "UA",
  "INDICATOR": "POPULATION",
  "SEX": "T"  // Total (both sexes)
}
```

---

## Tips for Effective Queries

1. **Start broad, then narrow**: List dataflows → get structure → get codelists → retrieve data

2. **Use data availability** to explore large datasets before downloading

3. **Check versions**: Use `"version": "latest"` to always get the most recent data

4. **Bilingual support**: Response data includes both Ukrainian (`xml:lang="uk"`) and English (`xml:lang="en"`) labels

5. **Understand dimensions**: Each dimension in the key corresponds to a position. Use wildcards (`*`) for dimensions you don't want to filter.

6. **Time periods**: Format depends on frequency:
   - Annual: `"2023"`
   - Monthly: `"2023-01"` to `"2023-12"`
   - Quarterly: `"2023-Q1"` to `"2023-Q4"`

---

## Advanced: Direct Key Notation

Instead of `dimension_filters`, you can use the `key` parameter directly:

```json
{
  "name": "get_data",
  "arguments": {
    "resource_id": "DF_SUPPLY_USE_ENERGY",
    "key": "A.ELECTRICITY_USE.UA.*.*.*"
  }
}
```

Where each position corresponds to a dimension:
- Position 0: `A` (Annual frequency)
- Position 1: `ELECTRICITY_USE` (Indicator)
- Position 2: `UA` (Ukraine)
- Position 3-5: `*` (All values for remaining dimensions)

**Note**: The dimension order comes from the DSD, so check the data structure first!

---

## Troubleshooting Examples

### Problem: Empty response

**Solution**: Check data availability first
```json
{
  "name": "check_data_availability",
  "arguments": {
    "resource_id": "DF_SUPPLY_USE_ENERGY"
  }
}
```

### Problem: Unknown dimension values

**Solution**: Get the codelist
```json
{
  "name": "get_codelist",
  "arguments": {
    "codelist_id": "CL_INDICATOR"
  }
}
```

### Problem: Don't know the dataflow ID

**Solution**: List all dataflows and search by name
```json
{
  "name": "list_dataflows"
}
```

---

## Real-World Use Cases

### Use Case 1: Energy Analysis
"Compare electricity production and consumption in Ukraine from 2015 to 2023"

### Use Case 2: Economic Trends
"Get quarterly GDP data for the last 5 years"

### Use Case 3: Demographic Research
"Analyze population changes by age group and region since 2010"

### Use Case 4: Trade Statistics
"Show export and import volumes by country for 2022-2023"

Each of these can be accomplished by:
1. Finding the right dataflow
2. Understanding its structure
3. Applying appropriate filters
4. Retrieving the data

The AI assistant will guide you through each step!
