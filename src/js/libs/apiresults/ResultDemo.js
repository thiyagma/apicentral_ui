import React from 'react';
import {Results, ResultsControls} from "./";

export default class ResultDemo extends React.Component {
  constructor() {
    super();

    // this.APIResultsData = {
    //   results: [],
    //   resultsAligment: "center",  // start, center, end, spaceAround, spaceBetween
    //   showFilter: true, // true, false,
    //   totalHits: 100,
    //   limitedHits: 20
    // };

    this.ResultsControlsData = {
      totalHits: 100,
      limitedHits: 20,      
      showFilter: true // true, false,
    };

    this.ResultsData = {
      results: [],
      resultsAligment: "center"  // start, center, end, spaceAround, spaceBetween
    };

    var lorem = [];
    lorem[0] = "Lorem ipsum Vitae possimus illo consequatur consectetur veritatis! Animi sapiente, dolores, repudiandae delectus id ullam, nesciunt, itaque rerum eveniet est at quisquam natus placeat.";  
    lorem[1] = "Lorem ipsum Neque sed, est! Praesentium voluptas, culpa vitae. Eum non, facilis amet tempora quis commodi, nulla velit laboriosam, quae tenetur qui incidunt dolor?";  
    lorem[2] = "Lorem ipsum Vero est nostrum, voluptates cumque illo assumenda ratione, odio modi nulla quis nobis. Ducimus, commodi earum alias tempore in perspiciatis quos sit.";  
    lorem[3] = "Lorem ipsum Ab rem labore quam magnam consequuntur ea neque asperiores. Nemo excepturi architecto accusantium laborum, voluptas animi, dignissimos ea placeat cumque a perspiciatis.";  
    lorem[4] = "Lorem ipsum Deserunt vero laboriosam exercitationem! Autem nesciunt excepturi, inventore est voluptates aut veritatis quasi sint dolor ea, adipisci numquam repellat, earum laborum nemo.";  

    let totalItems = 10;
    var keywords = [];
    keywords[0] = "cat|dog|bird|fish";
    keywords[1] = "blue|red|green|yellow";
    keywords[2] = "soup|enchilada|sushi|tacos";
    keywords[3] = "dad|mom|son|daughter";
    keywords[4] = "run|sleep|see|swim";
    for (let i=5; i<totalItems; i++) {    
      keywords[i] = keywords[4];
    }

    var category = [];
    category[0] = "sfdc";
    category[1] = "salesforce";
    category[2] = "crm";
    category[3] = "giftchain";
    category[4] = "catalog";
    for (let i=5; i<totalItems; i++) {    
      category[i] = category[4];
    }

    var author = [];
    author[0] = "Brian@hpe.com";
    author[1] = "Sathish@hpe.com";
    author[2] = "Himanshu@hpe.com";
    author[3] = "Kumar@hpe.com";
    author[4] = "Sanket@hpe.com";
    for (let i=5; i<totalItems; i++) {    
      author[i] = author[4];
    }


    for (let i=0; i<totalItems; i++) {
      this.ResultsData.results.push(
        {
          "provider": "Aasdw222",
          "version": "v1",
          "title": "Title API \u2022 " + i,
          "epr_id": "234223",
          "description": "Description API \u2022 " + lorem[i],
          "summary": "this is a test1 summary",
          "documentation_url": "url myapi1_swagger.json",
          "support_email": "test1@hpe.com",
          "device_specific": false,
          "description_file_type": "Swgger2.0 YAML",
          "environment": "Development",
          "ssl_support": true,
          "auth_model": "None",
          "supported_request_formats": "JSON",
          "supported_response_formats": "JSON",
          "restricted_access": true,
          "create_ts": "+048622-07-05T12:26:40.000Z",
          "create_by": author[i],
          "update_ts": "+048622-07-05T12:26:40.000Z",
          "update_by": "test1@hpe.com",
          "is_active": true,
          "status": "Active",
          "logo": "http://ace.com/abc.gif",
          "license": "https://opensource.org/licenses/MIT",
          "endpoint": {
            "type": "REST",
            "url": "http://myapi.net/myapi1"
          },
          "repository": {
            "name": "GIT",
            "url": "http://githb.com/sample"
          },
          "metadata": [{
            "name": "author",
            "value": "test1.test1@hpe.com"
          }, {
            "name": "keywords",
            "value": keywords[i]
          }, {
            "name": "bip",
            "value": "dev"
          }],
          "value_chain": [{
            "name": "level0",
            "value": "Source, Make & Deliver"
          }, {
            "name": "level1",
            "value": "gift Chain Planning"
          }, {
            "name": "level2",
            "value": "Source, Make & Deliver"
          }, {
            "name": "level3",
            "value": category[i]
          }],
          "data_subject": [{
            "name": "function",
            "value": "enterprise"
          }, {
            "name": "category",
            "value": "address"
          }, {
            "name": "value",
            "value": "address"
          }],
          "api_id": 6
        }
      );
    }
  }

  ResultsControlsFilterChange(filter) {
    console.debug("%cResultsControlsFilterChange", "color: red");
    console.log("filter: %O", JSON.stringify(filter));
  }

  ResultsControlsPaginationChange(itemsPerPage, currentPage, maxPages) {
    console.debug("%cResultsControlsPaginationChange", "color: red");
    console.log("itemsPerPage: %O", itemsPerPage);
    console.log("currentPage: %O", currentPage);
    console.log("maxPages: %O", maxPages);
  }

  ResultsSelect(selectedResult) {
    console.debug("%cResultsSelect", "color: red");
    console.log("selectedResult: %O", selectedResult);
  }

  render() {
    //           onFilterChange={this.APIResultsFilterChange}
    return (
      <div>
        <ResultsControls {...this.ResultsControlsData}
          onFilterChange={this.ResultsControlsFilterChange}
          onPaginationChange={this.ResultsControlsPaginationChange}
        />
        <Results {...this.ResultsData}
          onSelect={this.ResultsSelect}
        />
      </div>
    );
  }
};

