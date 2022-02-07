/**
 * @description
 * <%= description %>
 * @author <%= author %>
 * @email <%= email %>
 * @created_at <%= created_at %>
 */

interface Props {
  value?: string;
}

export const <%=ComponentName%> = (props: Props) => {
  return <div>{props.value}</div>
}
