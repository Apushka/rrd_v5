import { useState } from "react";
import {
  Link,
  Redirect,
  Route,
  Switch,
  useParams,
  useRouteMatch,
} from "react-router-dom";

const UsersLayout = () => {
  const { path } = useRouteMatch();
  return (
    <div>
      <h1>Users Layout</h1>
      <Link to="/">Main Page</Link>

      <Switch>
        <Route path={path + "/:userId/profile"} component={UserInfoPage} />
        <Route path={path + "/:userId/edit"} component={EditUserPage} />
        <Route exact path={path} component={UserListPage} />
        <Redirect from={path + "/:userId"} to={path + "/:userId/profile"} />
      </Switch>
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
        <Route path="/users" component={UsersLayout} />
        <Route exact path="/" component={MainPage} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  );
}

export default App;
