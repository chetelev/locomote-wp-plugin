const endpointBase = 'http://localhost:3000/api';


const jsonFetch = async (url, opts = {}) => {
    console.log('ApiService - Making request to:', url);
    console.log('ApiService - Options:', opts);
    
    try {
        const res = await fetch(url, opts);
        console.log('ApiService - Response status:', res.status);
        console.log('ApiService - Response ok:', res.ok);
        
        const json = await res.json().catch(() => ({}));
        console.log('ApiService - Response data:', json);
        
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