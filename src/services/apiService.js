const endpointBase = process.env.API_BASE || "http://3.224.136.158:3000/api";

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