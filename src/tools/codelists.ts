import { UkrStatAPIClient } from '../api-client.js';

/**
 * Tool handlers for codelist operations
 */

export const codelistTools = {
    list_codelists: {
        description: 'List all available codelists. Codelists contain controlled vocabularies (e.g., list of countries, indicators, time periods).',
        inputSchema: {
            type: 'object',
            properties: {
                detail: {
                    type: 'string',
                    description: 'Level of detail',
                    enum: ['full', 'allstubs'],
                    default: 'full',
                },
            },
        },
    },

    get_codelist: {
        description: 'Get specific codelist with all values and their translations in Ukrainian and English. Essential for understanding allowed values for dimensions.',
        inputSchema: {
            type: 'object',
            properties: {
                agency_id: {
                    type: 'string',
                    description: 'Agency ID (typically "SSSU")',
                    default: 'SSSU',
                },
                codelist_id: {
                    type: 'string',
                    description: 'Codelist ID (e.g., "CL_SUPPLY_USE_ENERGY_INDICATOR")',
                },
                version: {
                    type: 'string',
                    description: 'Version',
                    default: 'latest',
                },
            },
            required: ['codelist_id'],
        },
    },
};

export async function handleListCodelists(
    apiClient: UkrStatAPIClient,
    args: any
): Promise<any> {
    const detail = args.detail || 'full';
    const result = await apiClient.listCodelists(detail);

    return {
        content: [
            {
                type: 'text',
                text: JSON.stringify(result, null, 2),
            },
        ],
    };
}

export async function handleGetCodelist(
    apiClient: UkrStatAPIClient,
    args: any
): Promise<any> {
    const agencyId = args.agency_id || 'SSSU';
    const codelistId = args.codelist_id;
    const version = args.version || 'latest';

    if (!codelistId) {
        throw new Error('codelist_id is required');
    }

    const result = await apiClient.getCodelist(agencyId, codelistId, version);

    return {
        content: [
            {
                type: 'text',
                text: JSON.stringify(result, null, 2),
            },
        ],
    };
}
