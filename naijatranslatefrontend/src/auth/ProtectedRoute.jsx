// import { Route, Redirect } from "react-router-dom";
// import { getAccessToken } from "./yourAccessTokenUtils"; // Import a function to retrieve the access token

// const ProtectedRoute = ({ component: Component, ...rest }) => {
//   const accessToken = getAccessToken(); // Replace this with your function to retrieve the access token
//   const isAuthenticated = !!accessToken; // Check if there's an access token

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         isAuthenticated ? (
//           <Component {...props} />
//         ) : (
//           <Redirect to="/logincontainer" />
//         )
//       }
//     />
//   );
// };

// return default ProtectedRoute;
