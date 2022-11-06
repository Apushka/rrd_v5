import { useState } from "react";
import { Link, Redirect, Route, Switch, useParams } from "react-router-dom";

const UsersLayout = () => {
  const { userId } = useParams();

  return (
    <div>
      <h1>Users Layout</h1>
      <Link to="/">Main Page</Link>

      {userId ? (
        <Switch>
          <Route path={`/users/:userId/profile`} component={UserInfoPage} />
          <Route path={`/users/:userId/edit`} component={EditUserPage} />
          <Route path="/users/*">
            <Redirect to={`/users/${userId}/profile`} />
          </Route>
        </Switch>
      ) : (
        <UserListPage />
      )}
    </div>
  );
};

const UserListPage = () => {
  const [users] = useState([1, 2, 3, 4, 5]);
  return (
    <>
      <h1>Users List Page</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <Link to={`/users/${user}`}>User {user}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

const UserInfoPage = () => {
  const { userId } = useParams();
  return (
    <>
      <h1>User Page</h1>
      <ul>
        <li>
          <Link to="/users">Users List Page</Link>
        </li>
        <li>
          <Link to={`/users/${userId}/edit`}>Edit this user</Link>
        </li>
      </ul>
      <p>userId: {userId}</p>
    </>
  );
};

const EditUserPage = () => {
  const { userId } = useParams();
  return (
    <>
      <h1>Edit User Page</h1>
      <ul>
        <li>
          <Link to={`/users/${userId}/profile`}>User Profile Page</Link>
        </li>
        <li>
          <Link to={`/users/${Number(userId) + 1}/profile`}>Another User</Link>
        </li>
        <li>
          <Link to={`/users`}>Users List Page</Link>
        </li>
      </ul>
    </>
  );
};

const MainPage = () => {
  return <h1>Main Page</h1>;
};

function App() {
  return (
    <>
      <h1>App Layout</h1>
      <Link to="/users">Users List Page</Link>
      <Switch>
        <Route path="/users/:userId?" component={UsersLayout} />
        <Route exact path="/" component={MainPage} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </>
  );
}

export default App;
