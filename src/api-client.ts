import axios, { AxiosInstance } from 'axios';
import { XMLParser } from 'fast-xml-parser';

/**
 * Client for interacting with Ukrainian Statistics SDMX API v3
 */
export class UkrStatAPIClient {
    private client: AxiosInstance;
    private xmlParser: XMLParser;
    private baseURL = 'https://stat.gov.ua/sdmx/workspaces/default:integration/registry/sdmx/3.0';

    constructor() {
        this.client = axios.create({
            baseURL: this.baseURL,
            timeout: 30000,
            headers: {
                'Accept': 'application/vnd.sdmx.structure+xml;version=3.0.0',
            },
        });

        this.xmlParser = new XMLParser({
            ignoreAttributes: false,
            attributeNamePrefix: '@_',
            textNodeName: '#text',
            parseAttributeValue: true,
            trimValues: true,
        });
    }

    /**
     * Parse XML response to JSON
     */
    private parseXML(xmlData: string): any {
        return this.xmlParser.parse(xmlData);
    }

    /**
     * Make a GET request to the API
     */
    private async get(path: string, params?: Record<string, any>, acceptHeader?: string): Promise<any> {
        try {
            const config: any = { params };
            if (acceptHeader) {
                config.headers = { Accept: acceptHeader };
            }
            const response = await this.client.get(path, config);
            
            // Check content-type to determine response format
            const contentType = response.headers['content-type'] || '';
            const isJSON = contentType.includes('application/json') || contentType.includes('application/vnd.sdmx.data+json');
            
            // Check if response is already JSON (object or string that's valid JSON)
            if (isJSON || (typeof response.data === 'object' && response.data !== null && !Array.isArray(response.data))) {
                // Already parsed JSON
                return response.data;
            }
            
            // Check if response is a JSON string
            if (typeof response.data === 'string') {
                const trimmed = response.data.trim();
                if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
                    try {
                        return JSON.parse(trimmed);
                    } catch {
                        // Not valid JSON, continue to XML parsing
                    }
                }
            }
            
            // Otherwise parse as XML
            return this.parseXML(response.data);
        } catch (error: any) {
            if (error.response) {
                // Include more error details for debugging
                const status = error.response.status;
                const statusText = error.response.statusText;
                const data = error.response.data;
                let errorMessage = `API Error: ${status} - ${statusText}`;
                
                // Try to extract error message from response
                if (data) {
                    if (typeof data === 'string' && data.length < 500) {
                        errorMessage += `\nResponse: ${data}`;
                    } else if (typeof data === 'object') {
                        errorMessage += `\nResponse: ${JSON.stringify(data).substring(0, 500)}`;
                    }
                }
                
                throw new Error(errorMessage);
            }
            throw error;
        }
    }

    /**
     * Get all dataflows
     */
    async listDataflows(detail: string = 'full'): Promise<any> {
        return this.get('/structure/dataflow/all/all/latest', {
            detail,
            references: 'none',
        });
    }

    /**
     * Get specific dataflow
     */
    async getDataflow(
        agencyId: string,
        dataflowId: string,
        version: string = 'latest',
        detail: string = 'full'
    ): Promise<any> {
        return this.get(`/structure/dataflow/${agencyId}/${dataflowId}/${version}`, {
            detail,
            references: 'none',
        });
    }

    /**
     * Get data structure definition (DSD)
     */
    async getDataStructure(
        agencyId: string,
        dsdId: string,
        version: string = 'latest',
        detail: string = 'full',
        references: string = 'descendants'
    ): Promise<any> {
        return this.get(`/structure/datastructure/${agencyId}/${dsdId}/${version}`, {
            detail,
            references,
        });
    }

    /**
     * Get all codelists
     */
    async listCodelists(detail: string = 'full'): Promise<any> {
        return this.get('/structure/codelist/all/all/latest', {
            detail,
            references: 'none',
        });
    }

    /**
     * Get specific codelist
     */
    async getCodelist(
        agencyId: string,
        codelistId: string,
        version: string = 'latest',
        detail: string = 'full'
    ): Promise<any> {
        return this.get(`/structure/codelist/${agencyId}/${codelistId}/${version}`, {
            detail,
            references: 'descendants',
        });
    }

    /**
     * Get statistical data
     */
    async getData(
        context: string,
        agencyId: string,
        resourceId: string,
        version: string,
        key: string = '*',
        filters?: Record<string, any>
    ): Promise<any> {
        const path = `/data/${context}/${agencyId}/${resourceId}/${version}/${key}`;
        // Use data-specific Accept header for data endpoints
        return this.get(path, filters, 'application/vnd.sdmx.data+xml;version=3.0.0, application/vnd.sdmx.data+json;version=3.0.0');
    }

    /**
     * Check data availability
     */
    async checkDataAvailability(
        context: string,
        agencyId: string,
        resourceId: string,
        version: string,
        key: string = '*',
        filters?: Record<string, any>
    ): Promise<any> {
        const path = `/availability/${context}/${agencyId}/${resourceId}/${version}/${key}`;
        // Use data-specific Accept header for availability endpoints
        return this.get(path, { ...filters, mode: 'exact' }, 'application/vnd.sdmx.data+xml;version=3.0.0, application/vnd.sdmx.data+json;version=3.0.0');
    }

    /**
     * Get concept scheme
     */
    async getConceptScheme(
        agencyId: string,
        conceptSchemeId: string,
        version: string = 'latest'
    ): Promise<any> {
        return this.get(`/structure/conceptscheme/${agencyId}/${conceptSchemeId}/${version}`, {
            detail: 'full',
            references: 'none',
        });
    }
}
