import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  CmsBreadcrumbsComponent,
  PageMeta,
  PageMetaService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { CmsComponentData } from '../../../cms-structure/page/model/cms-component-data';

@Component({
  selector: 'cx-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbComponent implements OnInit {
  title$: Observable<string>;
  crumbs$: Observable<any[]>;

  constructor(
    public component: CmsComponentData<CmsBreadcrumbsComponent>,
    protected pageMetaService: PageMetaService
  ) {}

  ngOnInit(): void {
    this.setTitle();
    this.setCrumbs();
  }

  private setTitle(): void {
    this.title$ = this.pageMetaService.getMeta().pipe(
      filter(Boolean),
      map((meta: PageMeta) => meta.heading || meta.title)
    );
  }

  private setCrumbs(): void {
    this.crumbs$ = this.pageMetaService
      .getMeta()
      .pipe(
        map((meta: PageMeta) =>
          meta.breadcrumbs ? meta.breadcrumbs : [{ label: 'Home', link: '/' }]
        )
      );
  }
}
