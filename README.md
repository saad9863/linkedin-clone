**LinkedIn Clone**

This project is hosted on Firebase :https://linked-in-clone-91950.web.app/

**Overview**

This project is a LinkedIn clone built with React.js, Firebase, and Styled Components. It allows users to log in using their Google account, post photos, and share YouTube videos. The data is stored in Firestore, and images are stored in Firebase Storage.

**Features**

- Google Authentication: Users can log in with their Google accounts for a seamless and secure experience.

- Profile Creation: Upon logging in, users can create and customize their profiles by adding personal information, a profile picture, and a cover photo.

- Post Creation: Users can create posts by uploading photos or sharing YouTube videos using the React Player component.

- Real-time Updates: Posts are updated in real-time thanks to Firestore, providing a dynamic and interactive user experience.

**Technologies Used**

- React.js: The frontend of the application is built using React.js to create a responsive and dynamic user interface.

- Firebase Authentication: Google authentication is implemented using Firebase Authentication for secure and seamless user logins.

- Firestore: Firestore is used as the database to store user profiles and posts, providing real-time updates.

- Firebase Storage: Firebase Storage is used to store user-uploaded images.

- Styled Components: Styled Components are utilized for styling, providing a modular and maintainable styling solution.

**Getting Started**

- Clone the repository:
- bash
- Copy code
- git clone <https://github.com/your-username/linkedin-clone.git>

- Install dependencies:
- Bash
- Copy code
- cd linkedin-clone
- npm install

- Set up Firebase:
- Create a new Firebase project on the Firebase Console.
- Enable Google authentication in the Authentication section.
- Set up Firestore and Firebase Storage for data storage.
- Configure Firebase in the project:

- Create a file and add your Firebase configuration:
- env
- REACT\_APP\_FIREBASE\_API\_KEY=your-api-key
- REACT\_APP\_FIREBASE\_AUTH\_DOMAIN=your-auth-domain
- REACT\_APP\_FIREBASE\_PROJECT\_ID=your-project-id
- REACT\_APP\_FIREBASE\_STORAGE\_BUCKET=your-storage-bucket
- REACT\_APP\_FIREBASE\_MESSAGING\_SENDER\_ID=your-messaging-sender-id
- REACT\_APP\_FIREBASE\_APP\_ID=your-app-id


- Run the application:
- bash
- Copy code
- npm start

The app should now be running on http://localhost:3000

Contributing

Contributions are welcome! If you'd like to contribute to the project, please follow the standard GitHub fork and pull request workflow.
