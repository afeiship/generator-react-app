/**
 * @description <%= description %>
 * @author <%= author %>
 * @email <%= email %>
 * @created_at <%= created_at %>
 */

interface Props {
  value?: string;
};

export default (props:Props) => {
  return <div>{props.value}</div>
}
