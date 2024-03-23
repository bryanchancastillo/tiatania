import { notificationMessage } from '../interfaces/notificationMessage';
import { Store, iNotification } from 'react-notifications-component';
import notification from './helpers/notifications';

export function renderNotifications(notificationMessages : Array<notificationMessage>) {

    Array.from(notificationMessages).forEach((m: notificationMessage) => {

        const object: Partial<iNotification> = {};
        
        Store.addNotification(Object.assign(object, notification, {
            content: renderCustomNotificationContent(m.type, m.message)
        }));

     });
}

export function renderNotificationsFromBackEnd(responseResult : any) {

  if(responseResult == null || responseResult == undefined || responseResult.messages == null || responseResult.messages.length < 1)
    return;

  const notificationMessages = responseResult.messages.map((v) => ({message: v.text, title: v.messageTypeName, type: v.messageTypeName, messageType: v.messageType})) as notificationMessage[];

  Array.from(notificationMessages).forEach((m: notificationMessage) => {

    const object: Partial<iNotification> = {};
    
    Store.addNotification(Object.assign(object, notification, {
        content: renderCustomNotificationContent(m.type, m.message)
    }));
    
 });

}

function renderCustomNotificationContent(type : string, message : string) {

  let iconClassName: string = "";
  const convertedType = getNotificationType(type);

  switch (type) {
    case "success":
      iconClassName = "bi bi-check-circle-fill";
      break;
  
    case "error":
      iconClassName = "bi bi-exclamation-circle-fill";
      break;

    case "warning":
      iconClassName = "bi bi-exclamation-triangle";
      break;
      
    default:
      break;
  }

    return (
      <div className={`notification__custom--${convertedType}`}>
        <div className="notification__custom-icon">
          <i className={iconClassName} />
        </div>
        <div className="notification__custom">
            <div className='notification__custom-title'>
                <p>{type}</p>
            </div>
            <div className='notification__custom-message'>
                <p className="rnc__notification-message">{message}</p>
            </div>
    
        </div>
      </div>
    )
}

function getNotificationType(type: string) {

  if(type == "success" || type == "warning")
    return type;

  if(type == "error")
    return "danger";

}