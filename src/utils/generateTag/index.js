import { Tag } from "antd";

export default function GenerateTag(props) {
  let color = '';
  switch (props) {
    case 'NEW':
      color = 'green'
      break;
    case 'VACATION':
      color = 'red'
      break;
    default:
      color = 'yellow'
      break;
  }
  return <Tag color={color}>{props}</Tag>
}
