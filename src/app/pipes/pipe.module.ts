import { SearchPipe } from './search/search.pipe';
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import { SortPipe } from './sort/sort.pipe';


@NgModule({
  declarations: [SearchPipe, SortPipe],
  imports: [CommonModule],
  exports: [SearchPipe, SortPipe]
})

export class PipeModule {}
