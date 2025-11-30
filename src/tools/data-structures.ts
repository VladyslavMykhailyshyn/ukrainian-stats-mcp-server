import { UkrStatAPIClient } from '../api-client.js';

/**
 * Tool handlers for data structure operations
 */

export const dataStructureTools = {
    get_data_structure: {
        description: 'Get Data Structure Definition (DSD) which describes dimensions, attributes, and measures for a dataset. Essential for understanding how to query the data.',
        inputSchema: {
            type: 'object',
            properties: {
                agency_id: {
                    type: 'string',
                    description: 'Agency ID (typically "SSSU")',
                    default: 'SSSU',
                },
                dsd_id: {
                    type: 'string',
                    description: 'Data Structure Definition ID (e.g., "DSD_SUPPLY_USE_ENERGY")',
                },
                version: {
                    type: 'string',
                    description: 'Version (use "latest" for most recent)',
                    default: 'latest',
                },
                references: {
                    type: 'string',
                    description: 'Include referenced structures',
                    enum: ['none', 'parents', 'children', 'descendants', 'all'],
                    default: 'descendants',
                },
            },
            required: ['dsd_id'],
        },
    },

    get_concept_scheme: {
        description: 'Get concept scheme which defines concepts used in statistical data.',
        inputSchema: {
            type: 'object',
            properties: {
                agency_id: {
                    type: 'string',
                    description: 'Agency ID (typically "SSSU")',
                    default: 'SSSU',
                },
                concept_scheme_id: {
                    type: 'string',
                    description: 'Concept Scheme ID',
                },
                version: {
                    type: 'string',
                    description: 'Version',
                    default: 'latest',
                },
            },
            required: ['concept_scheme_id'],
        },
    },
};

export async function handleGetDataStructure(
    apiClient: UkrStatAPIClient,
    args: any
): Promise<any> {
    const agencyId = args.agency_id || 'SSSU';
    const dsdId = args.dsd_id;
    const version = args.version || 'latest';
    const references = args.references || 'descendants';

    if (!dsdId) {
        throw new Error('dsd_id is required');
    }

    const result = await apiClient.getDataStructure(
        agencyId,
        dsdId,
        version,
        'full',
        references
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

export async function handleGetConceptScheme(
    apiClient: UkrStatAPIClient,
    args: any
): Promise<any> {
    const agencyId = args.agency_id || 'SSSU';
    const conceptSchemeId = args.concept_scheme_id;
    const version = args.version || 'latest';

    if (!conceptSchemeId) {
        throw new Error('concept_scheme_id is required');
    }

    const result = await apiClient.getConceptScheme(agencyId, conceptSchemeId, version);

    return {
        content: [
            {
                type: 'text',
                text: JSON.stringify(result, null, 2),
            },
        ],
    };
}
