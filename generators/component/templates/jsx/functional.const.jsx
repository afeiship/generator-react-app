/**
 * @description <%= description %>
 * @author <%= author %>
 * @email <%= email %>
 * @created_at <%= created_at %>
 */

export const <%- ctx.classify(component_name) %> = (props) => {
  return <div>{props.value}</div>
}
