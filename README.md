# NgGuideWalkLibApp

Create a custimize guide to your website 
Install 
Yarn add ng-guide-walk-lib-app
npm install ng-guide-walk-lib-app -s
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
  ```

For Custom style:
```javascript
 <div 
  class="tooltip"
  [ngGuideStepStyle]="customStyle"
  ngGuideStep="1" ngGuideStepContent="this is step 1" ngGuideStepLocation='bottom'>

  ```
  In the Component just add the css rules you would like to use 
```javascript
   customStyle = {
    'background-color': 'red',
    'color' : 'green',
    'border-radius': '50%'
  };

  ```

  And you are done!