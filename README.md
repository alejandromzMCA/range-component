# Project Title: Custom Range Component

## Table of Contents
- [Introduction](#introduction)
- [Objective](#objective)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Components](#components)
- [Testing](#testing)
- [Project Specifications](#project-specifications)

## Introduction
This project demonstrates the creation of a custom `<Range />` component using React and TypeScript. The component supports two modes: a normal range from min to max numbers and a fixed number of options range. This README provides guidance on setting up, installing, and using the project.

## Objective
The objective of this project is to showcase coding skills for everyday problems based on our team's design system needs. Specifically, it focuses on creating a reusable and customizable range component that adheres to specific requirements and use cases.

## Setup and Installation
To run this project locally, follow these steps:

1. Clone the repository:
```
git clone https://github.com/alejandromzMCA/range-component.git
```
2. Navigate to the project directory:
```
cd range-component
```
3. Install dependencies:
```
npm install
```
4. Start the development server:
```
npm run dev
```

## Usage
After starting the development server, navigate to `localhost:3000` in your web browser.
Two buttons appear on this screen to navigate to the rest of the pages. You can also navigate directly to these two pages:

- **Normal Range**: Accessible at `localhost:3000/exercise1`. This page displays a custom range component that allows users to select a range between minimum and maximum values.
- **Fixed Values Range**: Accessible at `localhost:3000/exercise2`. This page features a custom range component that restricts selection to predefined values.

## Components
### Normal Range (`NormalRange.tsx`)
This component allows users to select a range between a minimum and maximum value. Users can interact with the component by dragging bullets along the range line or clicking on the minimum and maximum values to set new ones.

### Fixed Values Range (`FixedValuesRange.tsx`)
This component allows users to select from a predefined set of values. Unlike the normal range, the minimum and maximum values are fixed, and users can only select from the provided options.

## Testing
Unit tests have been implemented by vitest.

## Project Specifications 

### Objective
Know your code skills for an every-day code problem based
on our team design system's needs.

### Exercise
You have to create the following component: <Range />
You have to use React to create the solution.
You do NOT have to use any CLI to create structure and architecture of your application.
This component has two use modes:
1. Normal range from min to max number
2. Fixed number of options range

### Use cases
#### Normal Range:
Provide a localhost:8080/exercise1 route with the following:
– The component CAN'T be a HTML5 input range. It has to be a custom one.
– The user can drag two bullets through the range line.
– The user can click on both currency number label values (min or max) and set a
new value.
– The value will never be less than min or greater than max input values.
– When some bullet is on hover, this bullet has to be bigger and change cursor's type
into draggable.
– Dragging a bullet turns cursor to dragging
– Min value and max value can't be crossed in range
– For this example, provide a mocked http service returning min and max values
that have to be used in the component. Example: {min: 1, max: 100}. Use
https://www.mockable.io/ or a custom mocked
server.
– Do as many unit tests as you can.

#### Fixed values range:
Provide a localhost:8080/exercise2 route with the following:
– The component CAN'T be a HTML5 input range. It has to be a custom one.
– Given a range of values: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99] the user will only
be able to select those values in range
– Provide a mocked http service that returns the array of numbers: [1.99, 5.99,
10.99, 30.99, 50.99, 70.99]. Use h ttps://www.mockable.io/ or a custom mocked
server.
– For this type of range, currency values are not input changable. They have to be
only a label
– The user can drag two bullets through the range line.
– Min value and max value can't be crossed in range
– For this example, provide a mocked service returning min and max values that
have to be used in the component. Example: {rangeValues: []}
– Do as many unit tests as you can.

### Extra:
– You can use any mocked way for provide services data.
– You must give us your solution sending a Git link.