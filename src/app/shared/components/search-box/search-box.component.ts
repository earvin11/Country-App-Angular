import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, Subscription, debounceTime } from 'rxjs';

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: [
  ]
})
export class SearchBoxComponent implements OnInit, OnDestroy {
 
  private debauncer: Subject<string> = new Subject<string>();
  private debouncerSubcripcion?: Subscription

  @Input()
  public placeholder: string = '';

  @Input()
  public initialValue: string = '';

  @Output()
  public onValue = new EventEmitter<string>();

  @Output()
  public onDebounce = new EventEmitter<string>();

  ngOnInit(): void {
    this.debouncerSubcripcion = this.debauncer
      .pipe(
        debounceTime(500)
      )
      .subscribe( value => {
        this.onDebounce.emit(value);
      });
  }

  // desubscribirse del observable al destruir el component
  ngOnDestroy(): void {
    this.debouncerSubcripcion?.unsubscribe();
  }

  emitValue( value: string ) {
    this.onValue.emit( value );
  }

  onKeyPress( searchTerm: string ) {
    this.debauncer.next( searchTerm )
  }

}
