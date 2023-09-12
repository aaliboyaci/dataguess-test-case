# Junior Frontend Developer Assignment Project Documentation

_GraphQL API Integration and Data Filtering_

## Introduction

This documentation provides an overview of the project "dataguess-test-case," which involved developing a web application with GraphQL API integration and data filtering capabilities. This project was completed as part of a given assignment.

## Project Details

**Project Name**: dataguess-test-case **Project Version**: 0.1.0

## Dependencies

**@apollo/client**: `3.8.3`
**@testing-library/jest-dom**: `5.17.0`
**@testing-library/react**: `13.4.0`
**@testing-library/user-event**: `13.5.0`
**@types/jest**: `27.5.2`
**@types/node**: `16.18.50`
**@types/react**: `18.2.21`
**@types/react-dom**: `18.2.7`
**graphql**: `16.8.0`
**react**: `18.2.0`
**react-dom**: `18.2.0`
**react-scripts**: `5.0.1`
**typescript**: `4.9.5`
**web-vitals**: `2.1.4`

## Project Overview

This project aimed to achieve the following tasks:

### 1. Data Retrieval via GraphQL API

The project utilized the Apollo Client and GraphQL to fetch data from the [Countries GraphQL API](https://studio.apollographql.com/public/countries/home?variant=current).

### 2. Displaying Data in a List

The retrieved data was displayed in a list format, with each item representing the country and its own infos.

### 3. Implementing a Text Filter

A text filter was added above the list, enabling users to search and group results based on user-defined criteria.

### 4. Selectable Items

Each list item was made selectable, allowing users to click to select and deselect items.

### 5. Background Color for Selected Items

Selected items had a distinct background color from unselected items, with colors chosen from a predefined set.
Not selected items > #F1F6F9
Latest selected item > #193E8E
Selected item(s) > #212A3E

### 6. Automatic Selection

After loading items and applying group filters, the project automatically selected the 10th item or the last item if there were fewer than 10, considering performance for potentially long lists.

## Assumptions and Notes

- In cases where certain query fields were missing or non-functional in the provided API, these queries and filtering operations were implemented on the client-side.

## Conclusion

This project completed the assigned tasks, demonstrating the integration of a GraphQL API, data filtering capabilities, and user-friendly interactions as specified in the assignment. The technologies used, dependencies, and key functionalities have been documented above for reference.
