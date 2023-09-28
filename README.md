LinkedIn Clone
-

Project Overview
This project is an educational endeavor focused on enhancing React.js skills and adhering to best practices in UI development. It replicates the core features of LinkedIn, a popular professional networking platform. Please note that this project is for educational purposes only and should not be deployed or used for commercial purposes.

Features
-
-Home Page and Featured Content: Browse and discover featured content on the home page.

-User Profile: Create and customize your professional profile, showcasing your details, experience, and skills.

-Post Interaction: View and interact with posts, including liking, commenting, and sharing.

-Search Functionality: Use the search bar to find job opportunities, posts, and users.

-Authentication: Connect to a server for user registration and login.

-Messaging: Implement a messaging system for communication with connections.

-Groups and Subscriptions: Create and manage groups, explore premium subscription options (not functional).


Tech Stack
-

-HTML

-CSS

-JavaScript

-React

Credits
-
-Icons from React and Material UI.

-The project is designed to be fully responsive.

-Utilizes Material User Interface (MUI).

-Global state management is implemented using createContext and useContext.

Project Context
-
The LinkedIn Clone project aims to create an application that mirrors the core functionalities of LinkedIn, a widely-used professional networking platform. Users can create professional profiles, connect with others, explore job opportunities, and engage with posts.

LinkedIn offers a platform for job searching, professional development, and building professional connections. The LinkedIn clone offers a similar experience, allowing users to create professional profiles, connect with others, and explore job opportunities.

APIs Used
-
To fetch data, the following APIs have been used:

Get a list of posts:
-
fetch('https://academics.newtonschool.co/api/v1/linkedin/post', {
  headers: {
    'projectId': 'PROJECT_ID'
  }
})


Get user details by ID:
-
fetch('https://academics.newtonschool.co/api/v1/linkedin/user/:userId', {
  headers: {
    'projectId': 'PROJECT_ID'
  }
})


Follow/unfollow a user:
-
fetch('https://academics.newtonschool.co/api/v1/linkedin/follow/:userId', {
  headers: {
    'Authorization': 'Bearer YOUR_JWT_TOKEN',
    'projectId': 'PROJECT_ID'
  }
})

Create and manage groups:
-
fetch('https://academics.newtonschool.co/api/v1/linkedin/channel/', {
  headers: {
    'Authorization': 'Bearer YOUR_JWT_TOKEN',
    'projectId': 'PROJECT_ID'
  },
  body: {
    'title': 'postTitle',
    'description': 'postDescription',
    'images': 'postImage',
  }
})

Please note that certain features like sorting are not implemented in this project but can be added in the future.

How to Use
-
Clone the repository and follow the instructions to set up the project locally. Remember that this project is for educational purposes only and should not be deployed or used commercially.
