import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  // Ensure loaded before accessing isAuthenticated property
  if (isLoading) {
    return <div>Loading ...</div>;
  }



  return (
    // Check to make sure Auth0 has authenticated user before showing user info
    isAuthenticated && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
};

export default Profile;