#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    CallToolRequestSchema,
    ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

import { UkrStatAPIClient } from './api-client.js';
import {
    dataflowTools,
    handleListDataflows,
    handleGetDataflow,
} from './tools/dataflows.js';
import {
    dataStructureTools,
    handleGetDataStructure,
    handleGetConceptScheme,
} from './tools/data-structures.js';
import {
    codelistTools,
    handleListCodelists,
    handleGetCodelist,
} from './tools/codelists.js';
import {
    dataTools,
    handleGetData,
    handleCheckDataAvailability,
} from './tools/data.js';

/**
 * Ukrainian Statistics MCP Server
 * Provides access to Ukrainian statistical data via SDMX API v3
 */
class UkrainianStatsMCPServer {
    private server: Server;
    private apiClient: UkrStatAPIClient;

    constructor() {
        this.apiClient = new UkrStatAPIClient();

        this.server = new Server(
            {
                name: 'ukrainian-stats-mcp-server',
                version: '1.0.0',
            },
            {
                capabilities: {
                    tools: {},
                },
            }
        );

        this.setupToolHandlers();

        // Error handling
        this.server.onerror = (error) => {
            console.error('[MCP Error]', error);
        };

        process.on('SIGINT', async () => {
            await this.server.close();
            process.exit(0);
        });
    }

    private setupToolHandlers() {
        // List all available tools
        this.server.setRequestHandler(ListToolsRequestSchema, async () => {
            return {
                tools: [
                    {
                        name: 'list_dataflows',
                        ...dataflowTools.list_dataflows,
                    },
                    {
                        name: 'get_dataflow',
                        ...dataflowTools.get_dataflow,
                    },
                    {
                        name: 'get_data_structure',
                        ...dataStructureTools.get_data_structure,
                    },
                    {
                        name: 'get_concept_scheme',
                        ...dataStructureTools.get_concept_scheme,
                    },
                    {
                        name: 'list_codelists',
                        ...codelistTools.list_codelists,
                    },
                    {
                        name: 'get_codelist',
                        ...codelistTools.get_codelist,
                    },
                    {
                        name: 'get_data',
                        ...dataTools.get_data,
                    },
                    {
                        name: 'check_data_availability',
                        ...dataTools.check_data_availability,
                    },
                ],
            };
        });

        // Handle tool calls
        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            try {
                switch (request.params.name) {
                    case 'list_dataflows':
                        return await handleListDataflows(this.apiClient, request.params.arguments);

                    case 'get_dataflow':
                        return await handleGetDataflow(this.apiClient, request.params.arguments);

                    case 'get_data_structure':
                        return await handleGetDataStructure(this.apiClient, request.params.arguments);

                    case 'get_concept_scheme':
                        return await handleGetConceptScheme(this.apiClient, request.params.arguments);

                    case 'list_codelists':
                        return await handleListCodelists(this.apiClient, request.params.arguments);

                    case 'get_codelist':
                        return await handleGetCodelist(this.apiClient, request.params.arguments);

                    case 'get_data':
                        return await handleGetData(this.apiClient, request.params.arguments);

                    case 'check_data_availability':
                        return await handleCheckDataAvailability(this.apiClient, request.params.arguments);

                    default:
                        throw new Error(`Unknown tool: ${request.params.name}`);
                }
            } catch (error: any) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Error: ${error.message}`,
                        },
                    ],
                    isError: true,
                };
            }
        });
    }

    async run() {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        console.error('Ukrainian Statistics MCP server running on stdio');
    }
}

// Start the server
const server = new UkrainianStatsMCPServer();
server.run().catch(console.error);
