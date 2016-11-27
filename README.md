# redux-action-generator
A module to reduces redux action creators boilerplate, generating it dynamically from a simpler class.

## How to use:
You just need to create a class with the methods you want to expose (the action creators),
and add the `@ActionClass()` decorator.
```js
@ActionClass()
class TestActions {
  getTodos() {}
  
  highlightTodo(id) {
    return id;
  }
  
  createTodo(text, user) {
     return { text, user };
  }
}
```

This will process the class during its creation, producing the equivalent to:
```js
class TestActions {
  static GET_TODOS = '[TestActions] GET_TODOS';
  getTodos() {
    return { 
      type: '[TestActions] GET_TODOS'
    };
  }
  
  static HIGHLIGHT_TODO = '[TestActions] HIGHLIGHT_TODO';
  highlightTodo(id) {
    return { 
      type: '[TestActions] HIGHLIGHT_TODO',
      payload: id
    };
  }
  
  static CREATE_TODO = '[TestActions] CREATE_TODO';
  createTodo(text, user) {
     return {
        type: '[TestActions] CREATE_TODO',
        payload: { text, user }
      };
  }
}
```

## I don't like decorators.
No problem, just use it as a function:
```js
const FinalTestActions = ActionClass()(TestActions);
```

## Motivation

To be honest, this currently is more of a "what if" kinda experiment than a solid project but the aim of this project it's to reduce the
boilerplate associated with redux. 

Being the action creators the part where most of the boilerplate code gets produced, I think that being able to 
write one-line methods makes the developer experience better and it reduces the overwhelming feel that usually 
redux codebases have for newer developers.

## What's coming?
- TESTS
- Eliminate dependencies (currently 'change-case' it's the only one).
- Static typings (Altought this one i'm not sure if it will be posible, due to the property and method names being computed at runtime). 
