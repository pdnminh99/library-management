import { Component } from "@angular/core";
import { SearchService } from "../authentication/search.service";

@Component({
  selector: "search-page",
  template: `
    <div style="display: table; width: 100%;">
      <h1 style="display: table-cell; vertical-align: center">
        You are seacrching for {{ searchValue }}
      </h1>
    </div>
  `,
})
export class SearchPage {
  public get searchValue(): string {
    return this.searchService.value;
  }

  constructor(private searchService: SearchService) {}
}
