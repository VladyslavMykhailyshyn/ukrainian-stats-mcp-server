#!/usr/bin/env node

import express, { Request, Response } from 'express';
import cors from 'cors';
import { UkrStatAPIClient } from './api-client.js';
import {
    handleListDataflows,
    handleGetDataflow,
} from './tools/dataflows.js';
import {
    handleGetDataStructure,
    handleGetConceptScheme,
} from './tools/data-structures.js';
import {
    handleListCodelists,
    handleGetCodelist,
} from './tools/codelists.js';
import {
    handleGetData,
    handleCheckDataAvailability,
} from './tools/data.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize API client
const apiClient = new UkrStatAPIClient();

// Health check endpoint
app.get('/', (req: Request, res: Response) => {
    res.json({
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
    });
});

// List all available tools
app.get('/api/tools', (req: Request, res: Response) => {
    res.json({
        tools: [
            {
                name: 'list_dataflows',
                description: 'List all available dataflows from Ukrainian Statistics Service',
                method: 'GET',
                endpoint: '/api/tools/list_dataflows',
            },
            {
                name: 'get_dataflow',
                description: 'Get detailed information about a specific dataflow',
                method: 'POST',
                endpoint: '/api/tools/get_dataflow',
            },
            {
                name: 'get_data_structure',
                description: 'Get the Data Structure Definition (DSD) for a dataset',
                method: 'POST',
                endpoint: '/api/tools/get_data_structure',
            },
            {
                name: 'get_concept_scheme',
                description: 'Get concept scheme definitions',
                method: 'POST',
                endpoint: '/api/tools/get_concept_scheme',
            },
            {
                name: 'list_codelists',
                description: 'List all available codelists (controlled vocabularies)',
                method: 'GET',
                endpoint: '/api/tools/list_codelists',
            },
            {
                name: 'get_codelist',
                description: 'Get a specific codelist with all values and translations',
                method: 'POST',
                endpoint: '/api/tools/get_codelist',
            },
            {
                name: 'get_data',
                description: 'Retrieve statistical data with flexible filtering',
                method: 'POST',
                endpoint: '/api/tools/get_data',
            },
            {
                name: 'check_data_availability',
                description: 'Check what data is available without retrieving it',
                method: 'POST',
                endpoint: '/api/tools/check_data_availability',
            },
        ],
    });
});

// List dataflows (GET endpoint with query params)
app.get('/api/tools/list_dataflows', async (req: Request, res: Response) => {
    try {
        const args: any = {};
        if (req.query.detail) {
            args.detail = req.query.detail as string;
        }
        const result = await handleListDataflows(apiClient, args);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({
            error: error.message,
            content: [
                {
                    type: 'text',
                    text: `Error: ${error.message}`,
                },
            ],
            isError: true,
        });
    }
});

// Get dataflow (POST endpoint)
app.post('/api/tools/get_dataflow', async (req: Request, res: Response) => {
    try {
        const result = await handleGetDataflow(apiClient, req.body);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({
            error: error.message,
            content: [
                {
                    type: 'text',
                    text: `Error: ${error.message}`,
                },
            ],
            isError: true,
        });
    }
});

// Get data structure (POST endpoint)
app.post('/api/tools/get_data_structure', async (req: Request, res: Response) => {
    try {
        const result = await handleGetDataStructure(apiClient, req.body);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({
            error: error.message,
            content: [
                {
                    type: 'text',
                    text: `Error: ${error.message}`,
                },
            ],
            isError: true,
        });
    }
});

// Get concept scheme (POST endpoint)
app.post('/api/tools/get_concept_scheme', async (req: Request, res: Response) => {
    try {
        const result = await handleGetConceptScheme(apiClient, req.body);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({
            error: error.message,
            content: [
                {
                    type: 'text',
                    text: `Error: ${error.message}`,
                },
            ],
            isError: true,
        });
    }
});

// List codelists (GET endpoint with query params)
app.get('/api/tools/list_codelists', async (req: Request, res: Response) => {
    try {
        const args: any = {};
        if (req.query.detail) {
            args.detail = req.query.detail as string;
        }
        const result = await handleListCodelists(apiClient, args);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({
            error: error.message,
            content: [
                {
                    type: 'text',
                    text: `Error: ${error.message}`,
                },
            ],
            isError: true,
        });
    }
});

// Get codelist (POST endpoint)
app.post('/api/tools/get_codelist', async (req: Request, res: Response) => {
    try {
        const result = await handleGetCodelist(apiClient, req.body);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({
            error: error.message,
            content: [
                {
                    type: 'text',
                    text: `Error: ${error.message}`,
                },
            ],
            isError: true,
        });
    }
});

// Get data (POST endpoint)
app.post('/api/tools/get_data', async (req: Request, res: Response) => {
    try {
        const result = await handleGetData(apiClient, req.body);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({
            error: error.message,
            content: [
                {
                    type: 'text',
                    text: `Error: ${error.message}`,
                },
            ],
            isError: true,
        });
    }
});

// Check data availability (POST endpoint)
app.post('/api/tools/check_data_availability', async (req: Request, res: Response) => {
    try {
        const result = await handleCheckDataAvailability(apiClient, req.body);
        res.json(result);
    } catch (error: any) {
        res.status(500).json({
            error: error.message,
            content: [
                {
                    type: 'text',
                    text: `Error: ${error.message}`,
                },
            ],
            isError: true,
        });
    }
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: any) => {
    console.error('Error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: err.message,
    });
});

// Start server when run directly
// Check if this file is being run directly (not imported)
const isMainModule = process.argv[1] && (
    process.argv[1].endsWith('server.js') || 
    process.argv[1].endsWith('server.ts') ||
    process.argv[1].includes('server')
);

if (isMainModule) {
    app.listen(PORT, () => {
        console.log(`Ukrainian Statistics MCP Server running on port ${PORT}`);
        console.log(`API available at http://localhost:${PORT}/api/tools`);
    });
}

// Export for serverless functions
export default app;

