# PostViewer

## Getting Started

Start by cloning the github repo :
https://github.com/Chandu9494/post-viewer.git

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.7.

## Development server

To start a local development server, run:

```bash
ng serve
```

Visit http://localhost:4200/ in your browser to see the application running.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## About the structure and design

The app contains mainly two components, PostViewerGridWrapperComponent & PostViewerCardComponent.

PostViewerGridWrapperComponent, as the name suggests, acts as a wrapper to display the cards.

PostViewerCardComponent displays each post as a card ([angular material card ](https://material.angular.io/components/card/overview)), which reacts to clicks to
display properties of the post one by one.

The reset button on top right can be used for resetting all cards to default state (disabled if no posts are selected).

The cards are keyboard accessible. The color palette is also selected considering accessibility (WCAG AA, AAA)

State management is done using NGRX.

Formatting is done using Prettier.
