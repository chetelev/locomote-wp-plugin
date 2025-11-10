<<<<<<< Updated upstream
const endpointBase = process.env.API_URL;
=======
const endpointBase = process.env.API_BASE ;
>>>>>>> Stashed changes

const jsonFetch = async (url, opts = {}) => {
    
    try {
        const res = await fetch(url, opts);
        
        const json = await res.json().catch(() => ({}));
        
        return { ok: res.ok, status: res.status, data: json };
    } catch (error) {
        console.error('ApiService - Fetch error:', error);
        throw error;
    }
};


export default {
    endpointBase,
    jsonFetch,
};