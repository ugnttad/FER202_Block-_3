
// Function to parse URL query parameters
export const parseQueryParams = (url) => {
  try {
    const urlObj = new URL(url);
    const params = {};
    for (const [key, value] of urlObj.searchParams) {
      params[key] = value;
    }
    return params;
  } catch (error) {
    console.error('Invalid URL:', error);
    return {};
  }
};

// Alternative implementation for older browsers
export const parseQueryParamsManual = (url) => {
  const params = {};
  const queryString = url.includes('?') ? url.split('?')[1] : '';
  
  if (!queryString) return params;
  
  const pairs = queryString.split('&');
  
  pairs.forEach(pair => {
    const [key, value] = pair.split('=');
    if (key && value) {
      params[decodeURIComponent(key)] = decodeURIComponent(value);
    }
  });
  
  return params;
};

// Function to build URL with parameters
export const buildUrlWithParams = (baseUrl, params) => {
  const url = new URL(baseUrl);
  
  Object.keys(params).forEach(key => {
    url.searchParams.set(key, params[key]);
  });
  
  return url.toString();
};

// Example usage and tests
if (typeof window === 'undefined') {
  // Only run tests in Node.js environment
  const testUrl = "https://example.com?name=John&age=30&city=NewYork&hobby=coding";
  console.log("URL Parser Test:", parseQueryParams(testUrl));
  
  const buildExample = buildUrlWithParams("https://api.example.com", {
    page: 1,
    limit: 10,
    search: "javascript"
  });
  console.log("Built URL:", buildExample);
}