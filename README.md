# NgGuideWalkLibApp

Create a custimize guide to your website 

Demo : https://yonia1.github.io/ngx-guide/dist/ng-guide-walk-lib-app/index.html

After install add the module NgGuideWalkLibModule: 

```javascript
@NgModule({
  declarations: [
    AppComponent,
    TestCompComponent
  ],
  imports: [
    BrowserModule,
    NgGuideWalkLibModule
  ],
  entryComponents:[TestCompComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
```


Now add the following directive to the element you would like to set the tour to: 
```javascript
<h2
ngGuideStep="1"  ngGuideStepContent="this is step 1"
>Here are some links to help you start: </h2>

Custom style:

 <div 
  class="tooltip"
  [ngGuideStepStyle]="customStyle"
  ngGuideStep="1" ngGuideStepContent="this is step 1" ngGuideStepLocation='bottom'>

  ```