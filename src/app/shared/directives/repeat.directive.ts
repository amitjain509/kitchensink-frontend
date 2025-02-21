import {
  Directive,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';

@Directive({
  selector: '[appRepeat]',
  standalone: true
})
export class RepeatDirective implements OnChanges {
  @Input() appRepeat = 1;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appRepeat']) {
      this.render();
    }
  }

  private render(): void {
    this.viewContainer.clear();

    for (let i = 0; i < this.appRepeat; i++) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
