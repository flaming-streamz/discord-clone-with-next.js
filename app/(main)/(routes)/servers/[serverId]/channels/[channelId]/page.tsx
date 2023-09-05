interface Props {
  params: { channelId: string };
}
const ChannelPage = (props: Props) => {
  console.log(props);
  return <div>Channel page</div>;
};

export default ChannelPage;
