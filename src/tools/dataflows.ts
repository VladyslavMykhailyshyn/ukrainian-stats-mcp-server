import { UkrStatAPIClient } from '../api-client.js';

/**
 * Tool handlers for dataflow-related operations
 */

export const dataflowTools = {
    list_dataflows: {
        description: 'List all available dataflows from Ukrainian Statistics Service. Dataflows represent datasets covering specific domains (e.g., energy, trade, demographics).',
        inputSchema: {
            type: 'object',
            properties: {
                detail: {
                    type: 'string',
                    description: 'Level of detail in response',
                    enum: ['full', 'allstubs', 'referencestubs'],
                    default: 'full',
                },
            },
        },
    },

    get_dataflow: {
        description: 'Get detailed information about a specific dataflow including its structure reference, name, and description in Ukrainian and English.',
        inputSchema: {
            type: 'object',
            properties: {
                agency_id: {
                    type: 'string',
                    description: 'Agency ID (typically "SSSU" for State Statistics Service of Ukraine)',
                    default: 'SSSU',
                },
                dataflow_id: {
                    type: 'string',
                    description: 'Dataflow identifier (e.g., "DF_SUPPLY_USE_ENERGY")',
                },
                version: {
                    type: 'string',
                    description: 'Version of the dataflow (use "latest" for most recent)',
                    default: 'latest',
                },
            },
            required: ['dataflow_id'],
        },
    },
};

export async function handleListDataflows(
    apiClient: UkrStatAPIClient,
    args: any
): Promise<any> {
    const detail = args.detail || 'full';
    const result = await apiClient.listDataflows(detail);

    return {
        content: [
            {
                type: 'text',
                text: JSON.stringify(result, null, 2),
            },
        ],
    };
}

export async function handleGetDataflow(
    apiClient: UkrStatAPIClient,
    args: any
): Promise<any> {
    const agencyId = args.agency_id || 'SSSU';
    const dataflowId = args.dataflow_id;
    const version = args.version || 'latest';

    if (!dataflowId) {
        throw new Error('dataflow_id is required');
    }

    const result = await apiClient.getDataflow(agencyId, dataflowId, version);

    return {
        content: [
            {
                type: 'text',
                text: JSON.stringify(result, null, 2),
            },
        ],
    };
}
