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
    private async get(path: string, params?: Record<string, any>): Promise<any> {
        try {
            const response = await this.client.get(path, { params });
            return this.parseXML(response.data);
        } catch (error: any) {
            if (error.response) {
                throw new Error(
                    `API Error: ${error.response.status} - ${error.response.statusText}`
                );
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
        return this.get(path, filters);
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
        return this.get(path, { ...filters, mode: 'exact' });
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
