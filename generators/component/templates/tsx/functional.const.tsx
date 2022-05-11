/**
 * @description <%= description %>
 * @author <%= author %>
 * @email <%= email %>
 * @created_at <%= created_at %>
 */

interface Props {
  value?: string;
}

export const <%- ctx.classify(component_name) %> = (props: Props) => {
  return <div>{props.value}</div>
}
