import { notification } from "antd";

export const openNotification = (type, title, description) => {
  let notiTitle = ''
  switch (type) {
    case 'success':
      notiTitle = 'Success!!!'
      break;
    case 'warning':
      notiTitle = 'Warning!!!'
      break;
    case 'error':
      notiTitle = 'Error!!!'
      break;
    default:
      notiTitle = 'Info'
      break;
  }
  return notification[type]({
    message: title ? title : notiTitle,
    description: description,
  });
}
