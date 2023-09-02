interface Props {
  children: React.ReactNode;
}

const AuthLayout = (props: Props) => {
  return <div className="h-full flex justify-center items-center">{props.children}</div>;
};

export default AuthLayout;
