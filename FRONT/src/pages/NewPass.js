import NewPassword from "../components/NewPassword";
import ResetPassword from "../components/ResetPassword";

export default function NewPass() {
  return (
    <>
      <body className="body-login">
        <NewPassword></NewPassword>
        <ResetPassword></ResetPassword>
      </body>
    </>
  );
}
