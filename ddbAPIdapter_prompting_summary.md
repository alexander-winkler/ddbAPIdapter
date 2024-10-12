
# ddbAPIdapter: Tool Creation and Prompting Process

This document outlines the prompting process and conversation involved in creating the **ddbAPIdapter** tool. It includes essential prompts verbatim from the conversation and highlights the steps involved in refining and enhancing the tool.

---

## Phase 1: Initial Tool Concept

### User's Initial Request:

The user provided the following Python function and asked for a simple web interface:

> *"I need a simple javascript html website with 2 input boxes (first for url, second for optional api key; default value 'API-KEY'), a 'convert' button and an output box with a copy icon next to it to make the output copyable. By clicking on the convert button, the inputs should be converted into an output string. queryurl would be the value of the first input box, api_key the value of the second."*

The provided Python function was:

```python
def search2API(queryurl:str, api_key:str) -> str:
    '''
    converts the url generated via the search interface of DDB
    into an API call for the DDB API
    '''
    
    if "search/organization?" in queryurl:
        endpoint = "https://api.deutsche-digitale-bibliothek.de/search/organization?"
    elif "search/person?" in queryurl:
        endpoint = "https://api.deutsche-digitale-bibliothek.de/search/person?"
    else:
        endpoint = "https://api.deutsche-digitale-bibliothek.de/search?"
    parsed_url = urlparse(queryurl)
    queries = parse_qs(parsed_url.query)
    default_values = [f"oauth_consumer_key={api_key}"]
    try:
        query = " ".join(queries.get('query'))
        default_values.append(f"query={quote_plus(query)}")
    except Exception as e:
        print("No query in search url.")
    
    if queries.get('facetValues[]'):
        print("facets:")
        print(queries.get('facetValues[]'))
        for facet in queries.get('facetValues[]'):
                fac, val = facet.split("=")
                default_values.append(f"facet={fac}&{fac}={quote_plus(val)}")

    return endpoint + "&".join(default_values)
```

The goal was to create a web interface based on this logic.

---

## Phase 2: Improving the User Interface

Once the basic tool was set up, the user requested additional functionality:

> *"I want to add a button 'Try it out!'. Clicking on it, the newly created API URL is opened and the result is displayed in an output element below."*

In this phase, we added a button to test the generated API call and display the results directly within the tool. The design was further improved using **Bootstrap**:

> *"Now let's work on the design. Use some bootstrap to make it look nicer. Use a smaller copy symbol next to the output box instead of this large button (maybe 📋). The 'Try it out' button must be under/after the result URL."*

---

## Phase 3: Logo and Favicon

To enhance the tool’s branding, the user requested a custom logo:

> *"I want something based on the DDB logo that has more to do with an adapter."*

After designing the initial logo, further refinement was requested:

> *"No text, just use the seeds of a dandelion morphing into an adapter."*

And finally:

> *"Could you connect the cable with the dandelion?"*

Additionally, the user requested to add a favicon to the tool:

> *"I want to have a favicon at URL/ddbAPIdapter/favicon.ico."*

---

## Phase 4: Code Organization

At this stage, the user asked to move all **JavaScript** and **CSS** code into separate files:

> *"I want to move the javascripts into a separate file."*

And for CSS:

> *"Same for style."*

This helped in organizing the code and maintaining a cleaner HTML file.

---

## Phase 5: Instructions and Disclaimer

To improve user experience, the user requested to include a short explanation of how to use the tool:

> *"Configure your search in the DDB portal, choose filter and search parameters, copy the URL from the browser URL bar, paste it into the box below. If you like, you can also paste your API key and try out the API call here."*

Additionally, a disclaimer was added:

> *"Add a disclaimer that tells the user that the code runs in their browser and data is not stored anywhere."*

---

## Phase 6: README Improvements

Lastly, the user requested a correction for the README file to inform users that the tool needs to be run on a local server for the JavaScript to work properly:

> *"It's not enough to clone the repo and open index. You also have to fire up a server (python -m http.server) and open the localhost:8000 in order for the JavaScript to work."*

---

## Conclusion

This document summarizes the iterative process of creating the **ddbAPIdapter** tool, incorporating feedback and enhancing the tool through various stages of development. The collaborative effort focused on improving both the user interface and technical functionality, resulting in a refined and user-friendly application.
