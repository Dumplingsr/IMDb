/**
 * Person endpoint.
 * 
 * @prop {Object} wrapper - API wrapper core
 * @prop {string} media - Media type
 * @prop {string} base - Endpoint base
 */
class PersonEndpoint {
    /**
     * Create person endpoint.
     * 
     * @param {Object} wrapper API wrapper core
     */
    constructor(wrapper) {
        this.wrapper = wrapper;

        this.media = 'person';
        this.base = `/${this.media}`;
    }
    
    /**
     * Convert a query to a TMDb ID.
     * 
     * @param {string} query - Query
     * @param {boolean} details - Include extra information?
     * @returns {Promise<(string | Object)>} - TMDb ID or API response
     */
    getID(query, details) {
        return this.wrapper.getID(query, { imdb_id: /^(nm)(\d+)$/ }, this.media, details);
    }

    /**
     * Get the primary information for a person.
     * 
     * @param {string} query - Query
     * @param {Object} options - API options
     * @returns {Promise<Object>} - API response
     * 
     * @see https://developers.themoviedb.org/3/people/get-person-details
     */
    async details(query, options) {
        const ID = await this.getID(query);
        if (ID.error) return ID;

        return this.wrapper.getEndpoint(`${this.base}/${ID}`, options);
    }

    /**
     * Get the images that belong to a person.
     * 
     * @param {string} query - Query
     * @param {Object} options - API options
     * @returns {Promise<Object>} - API response
     * 
     * @see https://developers.themoviedb.org/3/people/get-person-images
     */
    async images(query, options) {
        const ID = await this.getID(query);
        if (ID.error) return ID;

        return this.wrapper.getEndpoint(`${this.base}/${ID}/images`, options);
    }

    /**
     * Get the movie and TV credits together in a single response.
     * 
     * @param {string} query - Query
     * @param {Object} options - API options
     * @returns {Promise<Object>} - API response
     * 
     * @see https://developers.themoviedb.org/3/people/get-person-combined-credits
     */
    async credits(query, options) {
        const ID = await this.getID(query);
        if (ID.error) return ID;

        return this.wrapper.getEndpoint(`${this.base}/${ID}/credits`, options);
    }
}

export default PersonEndpoint;
