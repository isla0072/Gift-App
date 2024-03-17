# Gift App

## Overview
The Gift App is a React Native-based application designed to manage and track gift ideas for friends and family efficiently. The app allows users to add people, associate gift ideas with them, and manage these ideas with ease. It leverages global state management and AsyncStorage alongside a Context object for seamless data handling.

## Features
- **PeopleScreen**: Displays a list of people with their names and birthdays, sorted by upcoming birthdays.
- **AddPersonScreen**: Adds a new person with name and date of birth to the list.
- **IdeaScreen**: Lists all gift ideas for a selected person with image thumbnails and delete functionality.
- **AddIdeaScreen**: Adds new gift ideas with text and photo capture for a selected person.

## Data Structure
The app maintains a structured data format for people and their associated gift ideas, utilizing unique IDs for each entry and storing images with detailed metadata.

## Required Features Implementation
- Global state and AsyncStorage management through Context.
- Efficient data display using `FlatList`, sorted by birthdays.
- Navigation and data passing between screens with React Navigation.
- Image capture functionality with aspect ratio control.
- Data validation and error handling within the Context provider.

## Technologies Used
- React Native for cross-platform mobile app development.
- AsyncStorage for local storage.
- React Navigation for screen management.
- Context API for global state management.
  
## Credits
Developed as a midterm project for the Multi-Platform Mobile App Development course.

## Getting Started
Clone the repository and navigate to the project directory. Ensure you have React Native set up in your development environment.

```bash
git clone <https://github.com/isla0072/Gift-App>
cd gift-app
npm install
npx react-native run-android # or run-ios
