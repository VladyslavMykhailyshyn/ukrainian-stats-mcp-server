# Ukrainian Statistics MCP Server

> [🇺🇦 Українська версія](./README.uk.md)

A Model Context Protocol (MCP) server that provides AI models with seamless access to Ukrainian statistical data from the State Statistics Service of Ukraine (Державна служба статистики України) via their SDMX API v3.

## Features

- 🇺🇦 Access to official Ukrainian government statistics
- 📊 Support for multiple statistical domains (energy, demographics, trade, etc.)
- 🌐 Bilingual support (Ukrainian and English)
- 🔍 Flexible data filtering and querying
- 📈 Comprehensive metadata exploration (dataflows, structures, codelists)
- ⚡ Fast XML-to-JSON conversion for easy data consumption

## Installation

### Method 1: Install from GitHub (Recommended for Production)

1. **Install globally via npm from GitHub**:

```bash
npm install -g git+https://github.com/YOUR_USERNAME/ukrainian-stats-mcp-server.git
```

2. **Add to Claude Desktop configuration**:

**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`  
**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "ukrainian-stats": {
      "command": "ukrainian-stats-mcp"
    }
  }
}
```

3. **Restart Claude Desktop** - The server will be ready to use!

### Method 2: Install from npm (Once Published)

```bash
npm install -g ukrainian-stats-mcp-server
```

Then use the same Claude Desktop configuration as Method 1.

### Method 3: Local Development Installation

1. **Clone the repository**:

```bash
git clone https://github.com/YOUR_USERNAME/ukrainian-stats-mcp-server.git
cd ukrainian-stats-mcp-server
```

2. **Install dependencies**:

```bash
npm install
```

3. **Build the project**:

```bash
npm run build
```

4. **Add to Claude Desktop configuration** (use absolute path):

```json
{
  "mcpServers": {
    "ukrainian-stats": {
      "command": "node",
      "args": ["/absolute/path/to/ukrainian-stats-mcp-server/build/index.js"]
    }
  }
}
```

## Publishing to GitHub

To make your MCP server available for others:

1. **Create a new repository on GitHub**:
   - Go to https://github.com/new
   - Name it `ukrainian-stats-mcp-server`
   - Choose public or private

2. **Push your code**:

```bash
cd f:/ChargeAfter/stat-mcp
git init
git add .
git commit -m "Initial commit: Ukrainian Statistics MCP Server"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ukrainian-stats-mcp-server.git
git push -u origin main
```

3. **Update package.json** with your GitHub username:
   - Edit the `repository.url` field in `package.json`
   - Replace `YOUR_USERNAME` with your actual GitHub username

4. **Share the installation command**:

```bash
npm install -g git+https://github.com/YOUR_USERNAME/ukrainian-stats-mcp-server.git
```

## Publishing to npm (Optional)

To publish to npm registry:

1. **Create an npm account**: https://www.npmjs.com/signup

2. **Login to npm**:

```bash
npm login
```

3. **Publish the package**:

```bash
npm publish
```

4. **Users can then install via**:

```bash
npm install -g ukrainian-stats-mcp-server
```

> **Note**: Adjust the path to match your installation directory.

After updating the configuration, restart Claude Desktop for the changes to take effect.

## Available Tools

### 1. `list_dataflows`

List all available dataflows (datasets) from the Ukrainian Statistics Service.

**Purpose**: Discover what statistical domains are available (e.g., energy, trade, demographics).

**Parameters**:
- `detail` (optional): Level of detail - `full`, `allstubs`, or `referencestubs` (default: `full`)

**Example**:
```
Please list all available dataflows from Ukrainian statistics.
```

---

### 2. `get_dataflow`

Get detailed information about a specific dataflow.

**Purpose**: Understand the structure and metadata of a specific dataset.

**Parameters**:
- `dataflow_id` (required): The dataflow identifier (e.g., `DF_SUPPLY_USE_ENERGY`)
- `agency_id` (optional): Agency ID (default: `SSSU`)
- `version` (optional): Version (default: `latest`)

**Example**:
```
Get information about the DF_SUPPLY_USE_ENERGY dataflow.
```

---

### 3. `get_data_structure`

Get the Data Structure Definition (DSD) for a dataset.

**Purpose**: Understand dimensions, attributes, and measures - essential for querying data.

**Parameters**:
- `dsd_id` (required): Data Structure Definition ID (e.g., `DSD_SUPPLY_USE_ENERGY`)
- `agency_id` (optional): Agency ID (default: `SSSU`)
- `version` (optional): Version (default: `latest`)
- `references` (optional): Include references - `none`, `parents`, `children`, `descendants`, `all` (default: `descendants`)

**Example**:
```
Get the data structure for DSD_SUPPLY_USE_ENERGY.
```

---

### 4. `get_concept_scheme`

Get concept scheme definitions.

**Purpose**: Understand the concepts used in statistical data.

**Parameters**:
- `concept_scheme_id` (required): Concept Scheme ID
- `agency_id` (optional): Agency ID (default: `SSSU`)
- `version` (optional): Version (default: `latest`)

---

### 5. `list_codelists`

List all available codelists (controlled vocabularies).

**Purpose**: Discover available reference lists for dimensions (countries, indicators, etc.).

**Parameters**:
- `detail` (optional): Level of detail - `full` or `allstubs` (default: `full`)

**Example**:
```
List all available codelists.
```

---

### 6. `get_codelist`

Get a specific codelist with all values and translations.

**Purpose**: Understand allowed values for dimensions (essential for filtering data).

**Parameters**:
- `codelist_id` (required): Codelist ID (e.g., `CL_SUPPLY_USE_ENERGY_INDICATOR`)
- `agency_id` (optional): Agency ID (default: `SSSU`)
- `version` (optional): Version (default: `latest`)

**Example**:
```
Get the codelist CL_SUPPLY_USE_ENERGY_INDICATOR with all values.
```

---

### 7. `get_data`

Retrieve statistical data with flexible filtering.

**Purpose**: Get actual statistical time series and observations.

**Parameters**:
- `resource_id` (required): Resource/dataflow ID
- `context` (optional): Context type - `dataflow`, `datastructure`, `provisionagreement` (default: `dataflow`)
- `agency_id` (optional): Agency ID (default: `SSSU`)
- `version` (optional): Version (default: `latest`)
- `key` (optional): Data key with wildcards (default: `*` for all data)
- `start_period` (optional): Start time period (e.g., `2020-01`)
- `end_period` (optional): End time period (e.g., `2023-12`)
- `dimension_filters` (optional): Dimension filters as object (e.g., `{"FREQ": "A", "INDICATOR": "ENERGY_PRODUCTION"}`)

**Example**:
```
Get annual energy data from DF_SUPPLY_USE_ENERGY for 2020 to 2023.
```

---

### 8. `check_data_availability`

Check what data is available without retrieving it.

**Purpose**: Explore available dimensions and values before querying large datasets.

**Parameters**:
- `resource_id` (required): Resource/dataflow ID
- `context` (optional): Context type (default: `dataflow`)
- `agency_id` (optional): Agency ID (default: `SSSU`)
- `version` (optional): Version (default: `latest`)
- `key` (optional): Data key with wildcards (default: `*`)

**Example**:
```
Check data availability for DF_SUPPLY_USE_ENERGY.
```

---

## Common Usage Workflows

### Workflow 1: Exploring a New Dataset

1. **List dataflows** to find interesting datasets
   ```
   List all dataflows
   ```

2. **Get dataflow details** to understand what the dataset contains
   ```
   Get dataflow DF_SUPPLY_USE_ENERGY
   ```

3. **Get data structure** to see dimensions and attributes
   ```
   Get data structure DSD_SUPPLY_USE_ENERGY
   ```

4. **Get codelists** to see allowed values for dimensions
   ```
   Get codelist CL_SUPPLY_USE_ENERGY_INDICATOR
   ```

5. **Retrieve data** with appropriate filters
   ```
   Get data from DF_SUPPLY_USE_ENERGY for 2020-2023
   ```

### Workflow 2: Quick Data Retrieval

If you already know the dataflow ID:

```
Get energy supply and use data from DF_SUPPLY_USE_ENERGY for the last 3 years
```

The AI will use the appropriate tools to fetch the data.

## Data Format

All responses are returned in JSON format, converted from the original SDMX XML responses. The JSON structure follows the SDMX standard with attributes prefixed with `@_`.

## API Information

This MCP server uses the SDMX API v3 from:
- **API Documentation**: https://stat.gov.ua/uk/development-api/sdmx-api-v3
- **Examples**: https://stat.gov.ua/uk/development-api/step-by-step-example
- **Base URL**: `https://stat.gov.ua/sdmx/workspaces/default:integration/registry/sdmx/3.0`

## Troubleshooting

### Server not appearing in Claude Desktop

1. Check that the path in `claude_desktop_config.json` is correct
2. Ensure you've built the project with `npm run build`
3. Restart Claude Desktop
4. Check Claude Desktop logs for errors

### API Request Failures

- The Ukrainian Statistics API may have rate limits
- Some datasets might be temporarily unavailable
- Network connectivity to stat.gov.ua is required

### XML Parsing Errors

If you encounter XML parsing errors, the API response format may have changed. Please report this as an issue.

## Development

### Project Structure

```
stat-mcp/
├── src/
│   ├── index.ts              # Main MCP server entry point
│   ├── api-client.ts         # Ukrainian Stats API client
│   └── tools/
│       ├── dataflows.ts      # Dataflow tools
│       ├── data-structures.ts # DSD and concept scheme tools
│       ├── codelists.ts      # Codelist tools
│       └── data.ts           # Data retrieval tools
├── build/                    # Compiled JavaScript (generated)
├── package.json
└── tsconfig.json
```

### Running in Development Mode

```bash
# Watch mode - auto-rebuild on changes
npm run watch

# In another terminal
node build/index.js
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

## Contact

For questions about the Ukrainian Statistics API, please visit the official documentation at https://stat.gov.ua/uk/development-api/
