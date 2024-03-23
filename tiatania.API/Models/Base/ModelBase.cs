
namespace tiatania.API.Models.Base
{
    public class ModelBase
    {
        public ModelBase()
        {
            Messages = new List<Message>();
        }

        public bool Valid { get { return !Fail; } }
        public bool Success { get { return !Fail; } }
        public bool Fail { get { return Messages != null && Messages.Any(m => m.MessageType == MessageType.Error); } }

        public List<Message>? Errors {  get { return Messages?.Where(m => m.MessageType == MessageType.Error).Select(m => m).ToList(); }}
        public List<Message>? Messages { get; set; }


        public class Message {
            public MessageType MessageType {get; set;}
            public required string Text {get; set;}
            
            public string? Key { get; set; } 
            public string MessageTypeName {get {return MessageType.ToString().ToLower();}}
        }
        
        public enum MessageType
        {

            Fatal,
            Warning,
            Error,
            Information,
            Success
        }

        public void AddError(string message, MessageType MessageType = MessageType.Error)
        {
            if (this.Messages != null)
                this.Messages.Add(new Message() { Text = message, MessageType = MessageType });

        }

        public void AddExceptionError(Exception ex)
        {
            if (this.Messages != null)
                this.Messages.Add(new Message() { Text = string.Format("[{0},{1}]", ex.Message, ex.InnerException?.Message), MessageType = MessageType.Error });

        }

        public void AddFieldError(string message, string key, MessageType messageType = MessageType.Error)
        {
            if (this.Messages != null)
                this.Messages.Add(new Message() { Key = key, Text = message, MessageType = messageType });

        }

        public void AddMessage(string text, MessageType messageType = MessageType.Success)
        {
            if (this.Messages != null)
                this.Messages.Add(new Message() { Text = text, MessageType = messageType});
        }

    }
}

