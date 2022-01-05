export const getServerSideProps = async ({
    query
}) => {

    const u = await fetch(`https://jsonplaceholder.typicode.com/users/${query.id}`);
    const userResp = await u.json();


    return {
        props: {
            user: userResp || null
        }
    }
}

const Profile = ({
    user
}) => {

    if(!Object.keys(user).length){
        return <div>Invalid User Id</div>
    }

    return (
        <div className="container">
            {user.name} <br />
            {user.email}
        </div>
    )
}

export default Profile;