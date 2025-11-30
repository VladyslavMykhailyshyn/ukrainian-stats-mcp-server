import { UkrStatAPIClient } from '../api-client.js';

/**
 * Tool handlers for data retrieval operations
 */

export const dataTools = {
    get_data: {
        description: 'Retrieve statistical data with flexible filtering. Use dimension filters to narrow down results. The key parameter uses wildcards (*) for each dimension position.',
        inputSchema: {
            type: 'object',
            properties: {
                context: {
                    type: 'string',
                    description: 'Context type',
                    enum: ['dataflow', 'datastructure', 'provisionagreement'],
                    default: 'dataflow',
                },
                agency_id: {
                    type: 'string',
                    description: 'Agency ID (typically "SSSU")',
                    default: 'SSSU',
                },
                resource_id: {
                    type: 'string',
                    description: 'Resource ID (dataflow ID)',
                },
                version: {
                    type: 'string',
                    description: 'Version',
                    default: 'latest',
                },
                key: {
                    type: 'string',
                    description: 'Data key with wildcards (e.g., "*.*.*" or specific values)',
                    default: '*',
                },
                start_period: {
                    type: 'string',
                    description: 'Start time period (e.g., "2020-01")',
                },
                end_period: {
                    type: 'string',
                    description: 'End time period (e.g., "2023-12")',
                },
                dimension_filters: {
                    type: 'object',
                    description: 'Dimension filters as key-value pairs (e.g., {"FREQ": "A", "INDICATOR": "ENERGY_PRODUCTION"})',
                },
            },
            required: ['resource_id'],
        },
    },

    check_data_availability: {
        description: 'Check what data is available for a given query without retrieving the actual data. Useful for exploring available dimensions and values.',
        inputSchema: {
            type: 'object',
            properties: {
                context: {
                    type: 'string',
                    description: 'Context type',
                    enum: ['dataflow', 'datastructure', 'provisionagreement'],
                    default: 'dataflow',
                },
                agency_id: {
                    type: 'string',
                    description: 'Agency ID (typically "SSSU")',
                    default: 'SSSU',
                },
                resource_id: {
                    type: 'string',
                    description: 'Resource ID (dataflow ID)',
                },
                version: {
                    type: 'string',
                    description: 'Version',
                    default: 'latest',
                },
                key: {
                    type: 'string',
                    description: 'Data key with wildcards',
                    default: '*',
                },
            },
            required: ['resource_id'],
        },
    },
};

export async function handleGetData(
    apiClient: UkrStatAPIClient,
    args: any
): Promise<any> {
    const context = args.context || 'dataflow';
    const agencyId = args.agency_id || 'SSSU';
    const resourceId = args.resource_id;
    const version = args.version || 'latest';
    const key = args.key || '*';

    if (!resourceId) {
        throw new Error('resource_id is required');
    }

    const filters: Record<string, any> = {};

    // Add time period filters
    if (args.start_period) {
        filters.startPeriod = args.start_period;
    }
    if (args.end_period) {
        filters.endPeriod = args.end_period;
    }

    // Add dimension filters
    if (args.dimension_filters) {
        for (const [dim, value] of Object.entries(args.dimension_filters)) {
            filters[`c[${dim}]`] = value;
        }
    }

    const result = await apiClient.getData(
        context,
        agencyId,
        resourceId,
        version,
        key,
        Object.keys(filters).length > 0 ? filters : undefined
    );

    return {
        content: [
            {
                type: 'text',
                text: JSON.stringify(result, null, 2),
            },
        ],
    };
}

export async function handleCheckDataAvailability(
    apiClient: UkrStatAPIClient,
    args: any
): Promise<any> {
    const context = args.context || 'dataflow';
    const agencyId = args.agency_id || 'SSSU';
    const resourceId = args.resource_id;
    const version = args.version || 'latest';
    const key = args.key || '*';

    if (!resourceId) {
        throw new Error('resource_id is required');
    }

    const result = await apiClient.checkDataAvailability(
        context,
        agencyId,
        resourceId,
        version,
        key
    );

    return {
        content: [
            {
                type: 'text',
                text: JSON.stringify(result, null, 2),
            },
        ],
    };
}
