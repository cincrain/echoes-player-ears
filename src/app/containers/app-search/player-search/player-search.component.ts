import {
  Component, OnInit, Input, Output, EventEmitter
  , ChangeDetectionStrategy, OnChanges, SimpleChanges
  , ViewChild, ViewEncapsulation, OnDestroy
} from '@angular/core';
import {
  Response, RequestOptionsArgs, Jsonp, URLSearchParams
} from '@angular/http';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';


@Component ({
  selector: 'player-search',
  template: `
  <form class="navbar-form form-search" id="media-explorer"
    [formGroup]="searchForm" >
    <div class="form-group clearfix">
      <input type="search" name="mediaSearch" id="media-search"
        placeholder="Find My Echoes..." autocomplete="off"
        class="form-control"
        formControlName="searchInput"
        #mediaSearch
        ngxTypeahead
        [taUrl]="'//suggestqueries.google.com/complete/search'"
        [taParams]="params"
        (taSelected)="handleSelectSuggestion ($event)"
      >
      <button class="btn btn-transparent btn-submit"
        tooltip="search with echoes"
        (click)="onSearch ()" >
        <icon name="search"></icon>
      </button>
    </div>
  </form>
  `,
  styleUrls: ['./player-search.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PlayerSearchComponent implements OnInit, OnDestroy, OnChanges {
  @Input  () query;
  @Output () queryChange = new EventEmitter<string> ();
  @Output () search      = new EventEmitter ();

  @ViewChild ('mediaSearch') mediaSearch;

  searchForm:   FormGroup;
  formState$:   Subscription;

  params = {
    hl:     'en',
    ds:     'yt',
    xhr:    't',
    client: 'youtube'
  };

  constructor (private fb: FormBuilder) {
    this.searchForm = this.fb.group ({
      searchInput:  this.query
    });
    this.formState$ = this.searchForm.valueChanges.pipe (
      debounceTime (400)
      , filter (value => !value.hasOwnProperty ('isTrusted'))
    )
    .subscribe (formState => 
      this.onQueryChange (formState.searchInput)
    );
  }//e constructor
  ngOnInit () {
  }//e ngOnInit


  ngOnChanges (changes: SimpleChanges) {
    const changedQuery = changes && changes.query;
    if (
      changedQuery
      && changedQuery.currentValue
      && changedQuery.currentValue.hasOwnProperty ('length')
    ) {
      this.patchSearchInput (changedQuery.currentValue);
    }
  }//e ngOnChanges


  patchSearchInput (searchInput: string) {
    this.searchForm.patchValue ({ searchInput }, { emitEvent: false });
  }//e patchSearchInput


  onQueryChange (query: string) {
    this.queryChange.emit (query);
  }//e onQueryChange


  onSearch () {
    const searchFormState = this.searchForm.value;
    this.selectSuggestion ( searchFormState.searchInput);
  }//e onSearch


  handleSelectSuggestion (suggestion: string) {
    this.selectSuggestion (suggestion);
  }//e handleSelectSuggestion


  selectSuggestion (suggestion: string) {
    if (suggestion && !suggestion.hasOwnProperty ('isTrusted')) {
      this.search.emit (suggestion);
    }
  }//e selectSuggestion


  ngOnDestroy () {
    this.formState$.unsubscribe ();
  }//e ngOnDestroy
}
//e class
