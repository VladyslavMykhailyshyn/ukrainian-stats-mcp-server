import { UkrStatAPIClient } from '../../build/api-client.js';
import {
    handleListDataflows,
    handleGetDataflow,
} from '../../build/tools/dataflows.js';
import {
    handleGetDataStructure,
    handleGetConceptScheme,
} from '../../build/tools/data-structures.js';
import {
    handleListCodelists,
    handleGetCodelist,
} from '../../build/tools/codelists.js';
import {
    handleGetData,
    handleCheckDataAvailability,
} from '../../build/tools/data.js';

export const handler = async (event: any) => {
    // CORS headers
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    };

    // Handle OPTIONS for CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: '',
        };
    }

    try {
        const path = event.path.replace('/.netlify/functions/api', '') || '/';
        const queryParams = event.queryStringParameters || {};
        const body = event.body ? JSON.parse(event.body) : {};

        const apiClient = new UkrStatAPIClient();

        // Root endpoint
        if (path === '/' || path === '') {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    name: 'Ukrainian Statistics MCP Server',
                    version: '1.0.0',
                    description: 'REST API wrapper for Ukrainian Statistics MCP Server',
                    endpoints: {
                        tools: '/api/tools',
                        list_dataflows: '/api/tools/list_dataflows',
                        get_dataflow: '/api/tools/get_dataflow',
                        get_data_structure: '/api/tools/get_data_structure',
                        get_concept_scheme: '/api/tools/get_concept_scheme',
                        list_codelists: '/api/tools/list_codelists',
                        get_codelist: '/api/tools/get_codelist',
                        get_data: '/api/tools/get_data',
                        check_data_availability: '/api/tools/check_data_availability',
                    },
                }),
            };
        }

        // List tools
        if (path === '/api/tools') {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    tools: [
                        { name: 'list_dataflows', endpoint: '/api/tools/list_dataflows', method: 'GET' },
                        { name: 'get_dataflow', endpoint: '/api/tools/get_dataflow', method: 'POST' },
                        { name: 'get_data_structure', endpoint: '/api/tools/get_data_structure', method: 'POST' },
                        { name: 'get_concept_scheme', endpoint: '/api/tools/get_concept_scheme', method: 'POST' },
                        { name: 'list_codelists', endpoint: '/api/tools/list_codelists', method: 'GET' },
                        { name: 'get_codelist', endpoint: '/api/tools/get_codelist', method: 'POST' },
                        { name: 'get_data', endpoint: '/api/tools/get_data', method: 'POST' },
                        { name: 'check_data_availability', endpoint: '/api/tools/check_data_availability', method: 'POST' },
                    ],
                }),
            };
        }

        // Handle tool endpoints
        let result;

        if (path === '/api/tools/list_dataflows') {
            const args: any = {};
            if (queryParams.detail) args.detail = queryParams.detail;
            result = await handleListDataflows(apiClient, args);
        } else if (path === '/api/tools/get_dataflow') {
            result = await handleGetDataflow(apiClient, body);
        } else if (path === '/api/tools/get_data_structure') {
            result = await handleGetDataStructure(apiClient, body);
        } else if (path === '/api/tools/get_concept_scheme') {
            result = await handleGetConceptScheme(apiClient, body);
        } else if (path === '/api/tools/list_codelists') {
            const args: any = {};
            if (queryParams.detail) args.detail = queryParams.detail;
            result = await handleListCodelists(apiClient, args);
        } else if (path === '/api/tools/get_codelist') {
            result = await handleGetCodelist(apiClient, body);
        } else if (path === '/api/tools/get_data') {
            result = await handleGetData(apiClient, body);
        } else if (path === '/api/tools/check_data_availability') {
            result = await handleCheckDataAvailability(apiClient, body);
        } else {
            return {
                statusCode: 404,
                headers,
                body: JSON.stringify({ error: 'Not found' }),
            };
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(result),
        };
    } catch (error: any) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: error.message || 'Internal server error',
                content: [
                    {
                        type: 'text',
                        text: `Error: ${error.message}`,
                    },
                ],
                isError: true,
            }),
        };
    }
};
