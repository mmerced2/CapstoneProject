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
  if(data?.user){
    const {username,email, first_name, last_name }=data.user
    return (
        <section className="padding account">
          <h2>Profile Info:
          </h2>
          <div>
            <p>
              {/* using spans so we can capitalize with CSS */}
              Name: <span>{`${first_name}`}</span>
              <span>{` ${last_name}`}</span>
            </p>
            <p>Username: {username}</p>
            <p>Email: {email}</p>
          </div>
        </section>
      );
    }
  
  return (
    <section>
      <h3>Not found!</h3>
    </section>
  );
}

