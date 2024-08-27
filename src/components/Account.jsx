import { useGetUserQuery } from "../redux/api";
import Typography from "@mui/material/Typography";

export default function Account({token}){

const {data , error, isLoading} =useGetUserQuery(token);

if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }

    return(
        <section>
        {data && (
          <table>
            <thead>
              <tr>
                <th colSpan="3">Current Users</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Username</td>
                <td>Email</td>
              </tr>
              {data &&
                data.users.map((user) => <UserRow key={user.id} user={user} />)}
            </tbody>
          </table>
        )}
      </section>
    )
}

;