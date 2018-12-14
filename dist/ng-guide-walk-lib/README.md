# NgGuideWalkLibApp

Create a custimize guide to your website 

Install: 
yarn:
```javascript
 yarn add ng-guide-walk
 ```
npm:
```javascript
 npm install ng-guide-walk --save
 ```

[See Demo here](https://yonia1.github.io/ngx-guide/dist/ng-guide-walk-lib-app/index.html)

After install add the module NgGuideWalkLibModule: 

```javascript

import { NgGuideWalkLibModule } from 'ng-guide-walk';

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
Inject the guide service into your component and just trigger the guide when ever you want:

```javascript
import { NgGuideWalkLibService } from 'ng-guide-walk';
constructor(private guideSerivce: NgGuideWalkLibService) {
    setTimeout(() => this.guideSerivce.startGuide(), 2000);
  }

```  

  And you are done!

