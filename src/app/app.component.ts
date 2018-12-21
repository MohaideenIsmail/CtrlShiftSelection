import { Component } from '@angular/core';
import { DATAOBJ } from './data';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  public dataObj = {
    source: {
      available: DATAOBJ,
      selected: []
    },
    destination: {
      available: [],
      selected: []
    }
  };
  public selectedItemShift = {
    source: {
      index: -1
    }
  };

  public onClickOnSource(index, ev, item) {
    if (ev.ctrlKey) {
      this.dataObj.source.selected.push(item);
    } else if (ev.shiftKey) {
      this.dataObj.source.selected.push(item);
    } else {
      this.dataObj.source.selected = [];
      this.dataObj.source.selected.push(item);
    }

    this.shiftSelectionFn(index, ev);
  }
  public onClickOnAddBtn() {
    for (const item of this.dataObj.source.selected) {
      if (!this.isDuplicate(this.dataObj.destination.available, item, 'code')) {
        this.dataObj.destination.available.push(item);
      }
    }
    this.dataObj.source.selected = [];
  }
  public removeAllOnDestination() {
    this.dataObj.destination.available = [];
  }
  public getHighlightedSource(item) {
    const isAvailable = this.dataObj.source.selected.find(function(data) {
      return item.code === data.code ? true : false;
    });
    return isAvailable;
  }

  private shiftSelectionFn(index, ev) {
    if (ev.shiftKey) {
      if (this.selectedItemShift.source.index !== -1) {
        // Select start and end indexes
        const start =
          this.selectedItemShift.source.index < index
            ? this.selectedItemShift.source.index
            : index;
        const end =
          this.selectedItemShift.source.index < index
            ? index
            : this.selectedItemShift.source.index;

        // Pushing to selected items
        for (let i = start; i <= end; i++) {
          if (
            !this.isDuplicate(
              this.dataObj.source.selected,
              this.dataObj.source.available[i],
              'code'
            )
          ) {
            this.dataObj.source.selected.push(this.dataObj.source.available[i]);
          }
        }
      }
    }
    this.selectedItemShift.source.index = index;
  }

  public isDuplicate(
    source,
    destination,
    checkBy,
    checkMarket: boolean = false
  ) {
    let isDuplicate = false;
    for (let i = 0; i < source.length; i++) {
      if (source[i][checkBy] == destination[checkBy]) {
        isDuplicate = true;
        break;
      }
    }
    return isDuplicate;
  }
}
