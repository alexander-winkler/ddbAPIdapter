
  <h1><img src="logo.png" alt="ddbAPIdapter Logo" width="150" style="vertical-align: middle; margin-right: 10px;">ddbAPIdapter</h1>

ddbAPIdapter is a simple web tool that converts a search URL from the [Deutsche Digitale Bibliothek (DDB)](https://www.deutsche-digitale-bibliothek.de) into a corresponding DDB API call. This allows users to translate their search queries into API requests and test them out easily.

## Features

- **Convert DDB search URLs to API Calls:** Automatically converts valid search URLs from the DDB into corresponding API requests.
- **API Key Input:** Users can optionally provide an API key to execute the API call.
- **Interactive Try It Out Button:** Once the API URL is generated, users can run the call and see the API response directly on the webpage.
- **Copy to Clipboard:** The generated API URL can be copied with a single click.

## Demo

![Screenshot](screenshot.png)

You can try the tool [here](https://alexander-winkler.github.io/ddbAPIdapter) by providing a DDB search URL, and the tool will generate an API URL for you. If you provide a valid API key, you can even run the request and see the results.

## Getting Started

### Prerequisites

To run this project, you simply need a modern web browser like Chrome, Firefox, or Edge.

### Installation

1. **Clone this repository to your local machine:**

    ```bash
    git clone git@github.com:alexander-winkler/ddbAPIdapter.git # via ssh
    ```

    or
    ```bash
    git clone https://github.com/alexander-winkler/ddbAPIdapter.git # via https
    ```

2. **Navigate to the project directory:**

    ```bash
    cd ddbAPIdapter
    ```

3. **Start a local server:** You need to run a local server for the JavaScript to function correctly. You can use Python's built-in HTTP server:

    ```bash
    python -m http.server
    ```

4. **Open the tool in your browser:** After starting the server, open your browser and go to:

    ```bash
    http://localhost:8000
    ```
5. **Follow the instructions in the interface** to paste your DDB search URL and (optionally) your API key.


## Technical Details

- **HTML5, JavaScript**: Core functionality to input the DDB search URL, handle the conversion, and process the API request.
- **Bootstrap 4**: For styling and responsive design.
- **Fetch API**: Used to make API requests to the DDB API endpoint.
- **Clipboard API**: Allows easy copying of the generated API URL.
- **Error Handling**: Alerts the user if no API key is provided or if there is an error during the API request.


## Credits

This application was created using ChatGPT 4.0. Prompting and development direction by **Alexander Winkler** (ORCID: [0000\-0002\-9145\-7238](https://orcid.org/0000-0002-9145-7238)).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.