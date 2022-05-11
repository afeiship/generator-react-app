/**
 * @description <%= description %>
 * @author <%= author %>
 * @email <%= email %>
 * @created_at <%= created_at %>
 */

interface Props {
  value?: string;
};

export class <%- ctx.classify(component_name) %> extends React.Component<Props> {
  render(){
    return <div>Hello</div>
  }
}
