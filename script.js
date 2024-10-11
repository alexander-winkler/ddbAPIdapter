document.addEventListener('DOMContentLoaded', function() {

let apiUrl = '';
    
        // Event listener for the Convert button
document.getElementById('convertButton').addEventListener('click', function() {
    const queryUrl = document.getElementById('urlInput').value;
    const apiKey = document.getElementById('apiKeyInput').value.trim() || "API-KEY";
    
    // Update the API URL each time Convert is clicked
    apiUrl = search2API(queryUrl, apiKey);
    
     // Only update the output if a valid API URL was returned
     if (apiUrl) {
        document.getElementById('outputUrl').textContent = apiUrl;

        // Generate and display the curl command in the accordion
        const curlCommand = generateCurlCommand(apiUrl, apiKey);
        document.getElementById('outputCurl').textContent = curlCommand;

        // Generate and display the Python requests code in the accordion
        const pythonCode = generatePythonCode(apiUrl, apiKey);
        document.getElementById('outputPython').textContent = pythonCode;
    }
});

    
// Event listener for copying the API URL
document.getElementById('copyUrlButton').addEventListener('click', function() {
    const output = document.getElementById('outputUrl').textContent.trim();
    if (output === "") {
        alert('The API URL output is empty. Nothing to copy!');
    } else {
        navigator.clipboard.writeText(output).then(() => {
            alert('API URL copied to clipboard!');
        });
    }
});

// Event listener for copying the CURL command
document.getElementById('copyCurlButton').addEventListener('click', function() {
    const output = document.getElementById('outputCurl').textContent.trim();
    if (output === "") {
        alert('The CURL command output is empty. Nothing to copy!');
    } else {
        navigator.clipboard.writeText(output).then(() => {
            alert('CURL command copied to clipboard!');
        });
    }
});

// Event listener for copying the Python requests code
document.getElementById('copyPythonButton').addEventListener('click', function() {
    const output = document.getElementById('outputPython').textContent.trim();
    if (output === "") {
        alert('The Python requests code output is empty. Nothing to copy!');
    } else {
        navigator.clipboard.writeText(output).then(() => {
            alert('Python requests code copied to clipboard!');
        });
    }
});

// Event listener for copying the API result JSON
document.getElementById('copyResultButton').addEventListener('click', function() {
    const apiResult = document.getElementById('apiResult').textContent.trim();
    if (apiResult === "No result yet." || apiResult === "") {
        alert('The API result output is empty. Nothing to copy!');
    } else {
        navigator.clipboard.writeText(apiResult).then(() => {
            alert('API result copied to clipboard!');
        });
    }
});

// Generate the CURL command
function generateCurlCommand(apiUrl, apiKey) {
    // Remove API key from URL for curl command
    const urlWithoutKey = apiUrl.replace(/oauth_consumer_key=[^&]+&?/, '');
    return `curl -X GET "${urlWithoutKey}" \\\n  -H "Accept: application/json" \\\n  -H 'Authorization: OAuth oauth_consumer_key="${apiKey !== "API-KEY" ? apiKey : "YOUR_API_KEY"}"'`;
}

// Generate the Python requests code
function generatePythonCode(apiUrl, apiKey) {
    // Remove API key from URL for Python requests code
    const urlWithoutKey = apiUrl.replace(/oauth_consumer_key=[^&]+&?/, '');
    
    // Split URL into endpoint and query parameters
    const [endpoint, queryString] = urlWithoutKey.split('?');
    const params = {};
    const facets = [];  // List to store multiple facet values
    
    if (queryString) {
        queryString.split('&').forEach(param => {
            let [key, value] = param.split('=');
            let decodedValue = decodeURIComponent(value.replace(/\+/g, ' '));  // Convert "+" to space
            
            if (key === "facet") {
                facets.push(decodedValue);  // Add to facets list
            } else {
                params[key] = decodedValue;
            }
        });
    }

    // Add facets list to params if it contains any elements
    if (facets.length > 0) {
        params['facet'] = facets;
    }

    // Construct the Python code
    return `import requests

endpoint = "${endpoint}"
params = ${JSON.stringify(params, null, 2)}

headers = {
  "Accept": "application/json",
  "Authorization": 'OAuth oauth_consumer_key="${apiKey !== 'API-KEY' ? apiKey : 'YOUR_API_KEY'}"'
}

response = requests.get(endpoint, headers=headers, params=params)
print(response.json())`;
}


// Select the content of the API key input field when it is clicked or focused
document.getElementById('apiKeyInput').addEventListener('click', function() {
    this.select();  // Select the entire content on click
});

    
        // Event listener for the "Try it out!" button
        document.getElementById('tryItButton').addEventListener('click', function() {
            const apiKey = document.getElementById('apiKeyInput').value;
            
            // Check if API key is provided
            if (!apiKey || apiKey === "API-KEY") {
                alert('Please provide a valid API key to run the API call.');
            } else if (apiUrl) {
                fetch(apiUrl)
                    .then(response => response.json())
                    .then(data => {
                        // Format JSON data and highlight it
                        const formattedJson = JSON.stringify(data, null, 2);
                        document.getElementById('apiResult').innerHTML = `<code class="language-json">${Prism.highlight(formattedJson, Prism.languages.json, 'json')}</code>`;
                    })
                    .catch(error => {
                        document.getElementById('apiResult').textContent = 'Error: ' + error;
                    });
            } else {
                document.getElementById('apiResult').textContent = 'Please convert the URL first!';
            }
        });

        function search2API(queryurl, api_key) {
            // Use try-catch to handle potential invalid URL exceptions
            let endpoint = '';
            try {
    const urlParams = new URLSearchParams(new URL(queryurl).search);
    
    
    if (queryurl.includes('search/organization?')) {
        endpoint = "https://api.deutsche-digitale-bibliothek.de/search/organization?";
    } else if (queryurl.includes('search/person?')) {
        endpoint = "https://api.deutsche-digitale-bibliothek.de/search/person?";
    } else {
        endpoint = "https://api.deutsche-digitale-bibliothek.de/search?";
    }

    let defaultValues = [`oauth_consumer_key=${api_key}`];
    
    // Properly encode the 'query' parameter using encodeURIComponent
    if (urlParams.has('query')) {
        const query = urlParams.get('query');
        defaultValues.push(`query=${query}`);
    }

    // Handle facet values properly
    const facetValues = urlParams.getAll('facetValues[]');
    if (facetValues.length > 0) {
        facetValues.forEach(facet => {
            const [fac, val] = facet.split('=');
            defaultValues.push(`facet=${fac}&${fac}=${encodeURIComponent(val)}`);
        });
    }

    // Return the final API call URL with proper encoding
    return endpoint + defaultValues.join('&');
} catch (error) {

        // If an error occurs, display an alert with the error message
        alert('Invalid URL. Please make sure the search URL is correct.');
        return ''; // Return an empty string if the URL is invalid
    }
}
});