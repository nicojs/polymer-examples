# Polymer

So, web components is the future.

## Setup

```
           -----------------------------------
                    Polymer Lib
Web cmp    -----------------------------------
                    webcomponents js     
                    ------              ----
            ----                 ----
                            ----
            Safari  Chrome   IE  Opera   FF
```

What WCF is to communcation is what angular is to front end
What HTTP REST is to communication is what Polymer is to front end

* Quickstart is not easy. Choose between Yeoman, PolymerCLI, Bower
* Data binding is polymer specific. So components build for polymer cannot be 
reused in XTAG/SkateJS
* Using `Polymer()` to register a component
    * Use `properties` property to describe your properties
        * `type`
        * `compute`
        * `value` - Initial value
* Polymer keeps state on elements itself
    * `_propertyEffects` keeps property data binding
    * `_bindListeners` keeps property event binding
* Changes on your component won't propegate by default (no dirty active checking)
    * Use `notifyPath` to point to the property that changed
      ```javascript
      const newIndex = this.todos.length;
      this.todos.push(newItem);
      this.notifyPath('todos.'+newIndex+'.done')
      ```
    * Use `set` and `push` to handle this more cleanely
      ```javascript
      this.set('todos.1.done', true);
      this.push('todos', newItem);
      ```
    * Use brackets to tell Polymer when your binding needs to be reevaluated
      ```html
      <template is="dom-repeat" items="candidates(candidates.*)">
      </template>
      ```
      Might look like an angular expression, but sure as hell is not!