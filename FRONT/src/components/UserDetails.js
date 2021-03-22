export default function userDetails(props) {
  const perfil = async (data) => {
    await props.getUserInfo(data.name, data.avatar);
  };

  console.log(perfil);

  return <h1>UserDetails</h1>;
}
